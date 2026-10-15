import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import {
  sendCourseRegistrationEmail,
  sendAdminCourseRegistrationAlertEmail,
  sendCoursePaymentValidatedEmail,
} from "@/lib/resend/client";

export const dynamic = "force-dynamic";

// Almacenamiento en memoria como caché de respaldo
let inMemoryCourseRegistrations: any[] = [];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filterStatus = searchParams.get("status");
    const searchQuery = searchParams.get("search")?.toLowerCase().trim();

    const db = getSupabaseAdmin();
    const map = new Map<string, any>();

    // 1. Consultar app_settings (Almacén persistente JSON indestructible en Supabase)
    try {
      const { data: settingsData } = await db
        .from("app_settings")
        .select("value")
        .eq("key", "workshop_registrations")
        .single();

      if (Array.isArray(settingsData?.value)) {
        settingsData.value.forEach((item: any) => {
          const key = item.folio || item.id || item.email;
          if (key) map.set(key, item);
        });
      }
    } catch (e) {
      console.warn("[GET /api/course-register app_settings notice]", e);
    }

    // 2. Consultar academy_orders (Tabla relacional oficial de compras)
    try {
      const { data: ordersData } = await db
        .from("academy_orders")
        .select("*")
        .or("course_id.eq.workshop-ia-gastronomia,course_title.ilike.%workshop%,course_title.ilike.%IA%");

      if (ordersData && Array.isArray(ordersData)) {
        ordersData.forEach((o: any) => {
          const key = o.folio || o.id || o.customer_email;
          if (key && !map.has(key)) {
            const isUla = o.course_title?.toLowerCase().includes("ula");
            const isCamara = o.course_title?.toLowerCase().includes("cámara") || o.course_title?.toLowerCase().includes("camara");
            const tier = isUla ? "ula" : isCamara ? "camara" : "general";
            const tierLabel = isUla ? "Estudiantes ULA ($15)" : isCamara ? "Agremiados Cámara Gastronómica ($20)" : "Público General ($25)";
            const org = o.course_title?.includes("(") ? o.course_title.split("(")[1]?.split(")")[0] : "No especificado";

            map.set(key, {
              id: o.id || o.folio,
              folio: o.folio || `IN-IA-${o.id.slice(0, 5)}`,
              full_name: o.customer_name || "Alumno Registrado",
              email: o.customer_email,
              phone_whatsapp: o.customer_phone || "",
              tier,
              tier_label: tierLabel,
              organization_or_id: org,
              modality: "presencial",
              cohort_date: "Viernes 23 de Octubre de 2026 - 8:00 AM",
              amount: o.amount || "$25 USD",
              amount_bs: o.amount_bs || "",
              bcv_rate: o.bcv_rate ? o.bcv_rate.toString() : "",
              origin_bank: o.origin_bank || "Banco de Venezuela",
              payment_method: o.payment_method || "Pago Móvil - Banco de Venezuela",
              payment_reference: o.reference_number || "S/R",
              payment_date: o.payment_date || (o.created_at ? o.created_at.split("T")[0] : ""),
              status: o.status === "ACTIVO" || o.status === "confirmado" ? "confirmado" : o.status === "cancelado" ? "cancelado" : "pendiente_verificacion",
              notes: o.notes || "",
              created_at: o.created_at || new Date().toISOString(),
              updated_at: o.updated_at || new Date().toISOString(),
            });
          }
        });
      }
    } catch (e) {
      console.warn("[GET /api/course-register academy_orders notice]", e);
    }

    // 3. Consultar tabla 'course_registrations' en caso de que exista
    try {
      const { data: regData, error: regError } = await db
        .from("course_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!regError && regData && Array.isArray(regData)) {
        regData.forEach((r: any) => {
          const key = r.folio || r.id || r.email;
          if (key && !map.has(key)) {
            map.set(key, r);
          }
        });
      }
    } catch (e) {
      // Ignorar si no existe
    }

    // 4. Consultar tabla 'leads' como fuente secundaria
    try {
      const { data: leadsData } = await db
        .from("leads")
        .select("*")
        .or("source.eq.landing_ia,source.eq.landing_curso_merida,business_type.ilike.%workshop%")
        .order("created_at", { ascending: false });

      if (leadsData && Array.isArray(leadsData)) {
        leadsData.forEach((lead: any) => {
          const key = lead.folio || lead.id || lead.corporate_email;
          if (key && !map.has(key)) {
            map.set(key, {
              id: lead.id,
              folio: lead.folio || `IN-LEGACY-${lead.id.slice(0, 6)}`,
              full_name: lead.full_name || "Alumno Registrado",
              email: lead.corporate_email || lead.email,
              phone_whatsapp: lead.phone_whatsapp || lead.phone,
              tier: lead.business_type?.toLowerCase().includes("ula") ? "ula" : "general",
              tier_label: lead.company_name?.startsWith("Inscrito: ") ? lead.company_name.replace("Inscrito: ", "") : "Público General",
              organization_or_id: lead.company_name || "No especificado",
              modality: "presencial",
              cohort_date: "Viernes 23 de Octubre de 2026 - 8:00 AM",
              amount: lead.daily_volume || "$25 USD",
              payment_method: lead.current_erp || "Pago Móvil - Banco de Venezuela",
              payment_reference: lead.primary_bottleneck?.replace("Ref: ", "").split("|")[0]?.trim() || "Por Validar",
              status: lead.status?.toLowerCase().includes("cerrado") || lead.status?.toLowerCase().includes("confirmado")
                ? "confirmado"
                : "pendiente_verificacion",
              notes: lead.notes || "",
              created_at: lead.created_at || new Date().toISOString(),
            });
          }
        });
      }
    } catch (err) {
      console.warn("[GET fallback leads notice]", err);
    }

    // 5. Fusionar con memoria local
    [...inMemoryCourseRegistrations].forEach((item) => {
      const key = item.folio || item.id || item.email;
      if (key && !map.has(key)) {
        map.set(key, item);
      }
    });

    let result = Array.from(map.values()).sort(
      (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );

    // 6. Filtrar por estado si aplica
    if (filterStatus && filterStatus !== "all") {
      result = result.filter((item) => item.status?.toLowerCase() === filterStatus.toLowerCase());
    }

    // 7. Filtrar por búsqueda si aplica
    if (searchQuery) {
      result = result.filter(
        (item) =>
          item.full_name?.toLowerCase().includes(searchQuery) ||
          item.email?.toLowerCase().includes(searchQuery) ||
          item.folio?.toLowerCase().includes(searchQuery) ||
          item.phone_whatsapp?.toLowerCase().includes(searchQuery) ||
          item.payment_reference?.toLowerCase().includes(searchQuery) ||
          item.organization_or_id?.toLowerCase().includes(searchQuery)
      );
    }

    // Estadísticas
    const allItems = Array.from(map.values());
    const totalCount = allItems.length;
    const confirmedCount = allItems.filter((i) => i.status === "confirmado" || i.status === "ACTIVO").length;
    const pendingCount = allItems.filter((i) => i.status === "pendiente_verificacion" || i.status === "PENDIENTE").length;
    const cancelledCount = allItems.filter((i) => i.status === "cancelado").length;

    const totalUsd = allItems
      .filter((i) => i.status === "confirmado" || i.status === "ACTIVO")
      .reduce((acc, curr) => {
        const val = parseFloat((curr.amount || "").replace(/[^0-9.]/g, "")) || 0;
        return acc + val;
      }, 0);

    return NextResponse.json({
      success: true,
      registrations: result,
      stats: {
        total: totalCount,
        confirmed: confirmedCount,
        pending: pendingCount,
        cancelled: cancelledCount,
        capacity: 25,
        available: Math.max(0, 25 - confirmedCount),
        revenueUsd: totalUsd,
      },
    });
  } catch (err: any) {
    console.error("[GET /api/course-register Error]", err);
    return NextResponse.json({
      success: true,
      registrations: inMemoryCourseRegistrations,
      stats: {
        total: inMemoryCourseRegistrations.length,
        confirmed: 0,
        pending: inMemoryCourseRegistrations.length,
        cancelled: 0,
        capacity: 25,
        available: 25,
        revenueUsd: 0,
      },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validaciones
    const fullName = body.fullName?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const tier = body.tier || "general";
    const tierLabel = body.tierLabel || "Público General / Freelancers ($25 USD)";
    const organizationOrId = body.organizationOrId?.trim() || "No especificado";
    const modality = body.modality || "presencial";
    const amount = body.amount || "$25 USD";
    const amountBs = body.amountBs || "";
    const bcvRate = body.bcvRate || "";
    const paymentMethod = body.paymentMethod || "Pago Móvil - Banco de Venezuela (0102)";
    const originBank = body.originBank || "Banco de Venezuela";
    const paymentReference = body.paymentReference?.trim() || "Por validar";
    const paymentDate = body.paymentDate || new Date().toISOString().split("T")[0];
    const notes = body.notes?.trim() || "";
    const carnetBase64 = body.carnetBase64 || "";

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Nombre completo, correo y WhatsApp son campos obligatorios." },
        { status: 400 }
      );
    }

    if (!email.includes("@") || email.length < 5) {
      return NextResponse.json(
        { success: false, message: "Por favor ingresa un correo electrónico válido." },
        { status: 400 }
      );
    }

    // 2. Generar Folio Único
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const folio = `IN-IA-${randomNum}`;
    const nowIso = new Date().toISOString();

    const registrationRecord: any = {
      id: folio,
      folio,
      full_name: fullName,
      customer_name: fullName,
      email,
      customer_email: email,
      phone_whatsapp: phone,
      customer_phone: phone,
      tier,
      tier_label: tierLabel,
      organization_or_id: organizationOrId,
      modality,
      cohort_date: "Viernes 23 de Octubre de 2026 - 8:00 AM",
      course_id: "workshop-ia-gastronomia",
      course_title: `IA Gastronomía Workshop: Del Concepto al Ecosistema Digital Completo`,
      amount,
      amount_bs: amountBs,
      bcv_rate: bcvRate,
      origin_bank: originBank,
      payment_method: paymentMethod,
      payment_reference: paymentReference,
      reference_number: paymentReference,
      payment_date: paymentDate,
      status: "pendiente_verificacion",
      notes: notes + (bcvRate ? ` | Tasa BCV: Bs. ${bcvRate}` : "") + (amountBs ? ` | Monto Bs: ${amountBs}` : ""),
      attachment_url: carnetBase64 ? "carnet_adjuntado_data_url" : null,
      created_at: nowIso,
      updated_at: nowIso,
    };

    const db = getSupabaseAdmin();

    // 3. PERSISTENCIA 1: Guardar en app_settings (JSON Array persistente e inmune a errores de schema)
    try {
      const { data: currentSettings } = await db
        .from("app_settings")
        .select("value")
        .eq("key", "workshop_registrations")
        .single();

      const list: any[] = Array.isArray(currentSettings?.value) ? currentSettings.value : [];
      list.unshift(registrationRecord);

      await db.from("app_settings").upsert({
        key: "workshop_registrations",
        value: list,
        updated_at: nowIso,
      });
    } catch (e: any) {
      console.warn("[app_settings workshop upsert notice]", e.message);
    }

    // 4. PERSISTENCIA 2: Guardar en academy_orders (Tabla SQL oficial de pedidos)
    try {
      await db.from("academy_orders").upsert(
        {
          folio: registrationRecord.folio,
          customer_name: fullName,
          customer_email: email,
          customer_phone: phone,
          course_id: "workshop-ia-gastronomia",
          course_title: `IA Gastronomía Workshop (${organizationOrId !== "No especificado" ? organizationOrId : tierLabel})`,
          amount,
          amount_bs: amountBs,
          bcv_rate: parseFloat(bcvRate) || null,
          origin_bank: originBank,
          payment_method: paymentMethod,
          reference_number: paymentReference,
          payment_date: paymentDate,
          status: "PENDIENTE",
          created_at: nowIso,
          updated_at: nowIso,
        },
        { onConflict: "folio" }
      );
    } catch (e: any) {
      console.warn("[academy_orders workshop upsert notice]", e.message);
    }

    // 5. PERSISTENCIA 3: Guardar en leads con lead_type y status válidos
    try {
      await db.from("leads").upsert(
        {
          folio,
          lead_type: "contacto_general",
          full_name: fullName,
          company_name: organizationOrId !== "No especificado" ? organizationOrId : `Inscrito: ${tierLabel}`,
          corporate_email: email,
          phone_whatsapp: phone,
          business_type: "IA Gastronomía Workshop (Fullcowork)",
          daily_volume: amount,
          current_erp: paymentMethod,
          primary_bottleneck: `Ref: ${paymentReference} | Banco: ${originBank} | ${tierLabel}`,
          service_needed: "IA Gastronomía Workshop (Viernes 23 Octubre)",
          source: "landing_ia",
          status: "Nuevo",
          notes: notes || null,
        },
        { onConflict: "folio" }
      );
    } catch (e: any) {
      console.warn("[leads workshop upsert notice]", e.message);
    }

    // 6. PERSISTENCIA 4: Intentar en tabla dedicada 'course_registrations' si existe
    try {
      await db.from("course_registrations").insert([
        {
          folio: registrationRecord.folio,
          full_name: registrationRecord.full_name,
          email: registrationRecord.email,
          phone_whatsapp: registrationRecord.phone_whatsapp,
          tier: registrationRecord.tier,
          tier_label: registrationRecord.tier_label,
          organization_or_id: registrationRecord.organization_or_id,
          modality: registrationRecord.modality,
          cohort_date: registrationRecord.cohort_date,
          amount: registrationRecord.amount,
          payment_method: registrationRecord.payment_method,
          payment_reference: registrationRecord.payment_reference,
          status: registrationRecord.status,
          notes: registrationRecord.notes,
        },
      ]);
    } catch (e) {
      // Ignorar si no existe
    }

    // Guardar también en memoria
    inMemoryCourseRegistrations.unshift(registrationRecord);

    const whatsappMessage = `👋 Hola Julio, acabo de registrar mi inscripción para el *IA Gastronomía Workshop* en Mérida (Fullcowork).\n\n*Mis Datos:*\n• Folio: *${folio}*\n• Alumno: ${fullName}\n• Correo: ${email}\n• WhatsApp: ${phone}\n• Tarifa: ${tierLabel} (${amount})\n• Banco Emisor: ${originBank}\n• Nro. Referencia: ${paymentReference}\n\nAdjunto comprobante de pago móvil para validación.`;

    const whatsappDirectUrl = `https://wa.me/584148817137?text=${encodeURIComponent(whatsappMessage)}`;

    // 7. Disparar Correo al Alumno con Resend
    try {
      await sendCourseRegistrationEmail({
        to: email,
        fullName,
        courseTitle: "IA Gastronomía Workshop: Del Concepto al Ecosistema Digital Completo",
        folio,
        tierLabel,
        amount: `${amount} ${amountBs ? `(${amountBs})` : ""}`,
        paymentMethod: `${paymentMethod} (Banco Emisor: ${originBank})`,
        paymentReference,
        eventDate: "Viernes 23 de Octubre de 2026",
        eventTime: "8:00 AM a 12:00 PM (4 Horas Prácticas)",
        eventLocation: "Edificio Fullcowork, Calle 34 entre Av 4 y Don Tulio # 4-32, Salón VIP, Mérida",
        whatsappGroupUrl: whatsappDirectUrl,
      });
    } catch (err) {
      console.warn("[Resend Student Course Registration Warning]", err);
    }

    // 8. Disparar Alerta al Administrador con Resend
    try {
      await sendAdminCourseRegistrationAlertEmail({
        folio,
        fullName,
        email,
        phone,
        tier: tierLabel,
        amount: `${amount} ${amountBs ? `(${amountBs})` : ""}`,
        paymentMethod: `${paymentMethod} - Ref: ${paymentReference}`,
        paymentReference,
        organizationOrId,
        modality: "Presencial Mérida (Viernes 23 Octubre, Fullcowork)",
      });
    } catch (err) {
      console.warn("[Resend Admin Course Alert Warning]", err);
    }

    return NextResponse.json(
      {
        success: true,
        folio,
        registeredAt: nowIso,
        whatsappDirectUrl,
        message: "¡Inscripción registrada con éxito! Hemos enviado los detalles a tu correo electrónico.",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("[POST /api/course-register Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error interno al procesar la inscripción. Por favor intenta de nuevo o escríbenos por WhatsApp.",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, folio, status, notes, sendEmailNotification = true } = body;

    if (!id && !folio) {
      return NextResponse.json(
        { success: false, message: "Se requiere 'id' o 'folio' para actualizar el registro." },
        { status: 400 }
      );
    }

    const newStatus = status ? status.toLowerCase() : "confirmado";
    const nowIso = new Date().toISOString();
    const db = getSupabaseAdmin();
    let targetRegistration: any = null;

    // 1. Actualizar en app_settings (JSON Store)
    try {
      const { data: currentSettings } = await db
        .from("app_settings")
        .select("value")
        .eq("key", "workshop_registrations")
        .single();

      if (Array.isArray(currentSettings?.value)) {
        const list = currentSettings.value.map((item: any) => {
          if (item.id === id || item.folio === folio) {
            targetRegistration = { ...item, status: newStatus, updated_at: nowIso };
            if (notes !== undefined) targetRegistration.notes = notes;
            return targetRegistration;
          }
          return item;
        });

        await db.from("app_settings").upsert({
          key: "workshop_registrations",
          value: list,
          updated_at: nowIso,
        });
      }
    } catch (e) {
      console.warn("[PUT app_settings update notice]", e);
    }

    // 2. Actualizar en academy_orders
    try {
      const orderStatus = newStatus === "confirmado" ? "ACTIVO" : newStatus.toUpperCase();
      await db
        .from("academy_orders")
        .update({ status: orderStatus, updated_at: nowIso })
        .or(`folio.eq.${folio || id},id.eq.${id || folio}`);
    } catch (e) {
      // ignore
    }

    // 3. Actualizar en leads
    try {
      const leadStatus = newStatus === "confirmado" ? "Cerrado / Pagado" : "Nuevo";
      await db
        .from("leads")
        .update({ status: leadStatus, updated_at: nowIso })
        .or(`folio.eq.${folio || id},id.eq.${id || folio}`);
    } catch (e) {
      // ignore
    }

    // 4. Actualizar en course_registrations si existe
    try {
      await db
        .from("course_registrations")
        .update({ status: newStatus, updated_at: nowIso, ...(notes !== undefined ? { notes } : {}) })
        .or(`id.eq.${id || folio},folio.eq.${folio || id}`);
    } catch (e) {
      // ignore
    }

    // 5. Actualizar en memoria
    inMemoryCourseRegistrations = inMemoryCourseRegistrations.map((item) => {
      if (item.id === id || item.folio === folio) {
        return { ...item, status: newStatus, updated_at: nowIso };
      }
      return item;
    });

    // 6. Si se confirmó el pago, enviar correo oficial al alumno
    if (newStatus === "confirmado" && sendEmailNotification && targetRegistration?.email) {
      try {
        await sendCoursePaymentValidatedEmail({
          to: targetRegistration.email,
          fullName: targetRegistration.full_name || targetRegistration.customer_name,
          courseTitle: "IA Gastronomía Workshop: Del Concepto al Ecosistema Digital Completo",
          folio: targetRegistration.folio || folio,
          tierLabel: targetRegistration.tier_label || "Entrada Oficial",
          amount: targetRegistration.amount,
          eventDate: "Viernes 23 de Octubre de 2026",
          eventTime: "8:00 AM a 12:00 PM (4 Horas Prácticas)",
          eventLocation: "Edificio Fullcowork, Calle 34 entre Av 4 y Don Tulio # 4-32, Salón VIP, Mérida",
        });
      } catch (mailErr) {
        console.warn("[Send validated email warning]", mailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Inscripción actualizada a estado '${newStatus}' exitosamente.`,
      registration: targetRegistration,
    });
  } catch (error: any) {
    console.error("[PUT /api/course-register Error]", error);
    return NextResponse.json(
      { success: false, message: "Error al actualizar el registro de inscripción." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const folio = searchParams.get("folio");

    if (!id && !folio) {
      return NextResponse.json(
        { success: false, message: "Se requiere 'id' o 'folio' para eliminar la inscripción." },
        { status: 400 }
      );
    }

    const db = getSupabaseAdmin();

    // 1. Eliminar de app_settings
    try {
      const { data: currentSettings } = await db
        .from("app_settings")
        .select("value")
        .eq("key", "workshop_registrations")
        .single();

      if (Array.isArray(currentSettings?.value)) {
        const filtered = currentSettings.value.filter(
          (item: any) => item.id !== id && item.folio !== folio
        );

        await db.from("app_settings").upsert({
          key: "workshop_registrations",
          value: filtered,
          updated_at: new Date().toISOString(),
        });
      }
    } catch (e) {
      // ignore
    }

    // 2. Eliminar de academy_orders
    try {
      await db
        .from("academy_orders")
        .delete()
        .or(`folio.eq.${folio || id},id.eq.${id || folio}`);
    } catch (e) {
      // ignore
    }

    // 3. Eliminar de leads
    try {
      await db
        .from("leads")
        .delete()
        .or(`folio.eq.${folio || id},id.eq.${id || folio}`);
    } catch (e) {
      // ignore
    }

    // 4. Eliminar de course_registrations si existe
    try {
      await db
        .from("course_registrations")
        .delete()
        .or(`id.eq.${id || folio},folio.eq.${folio || id}`);
    } catch (e) {
      // ignore
    }

    // 5. Eliminar de memoria
    inMemoryCourseRegistrations = inMemoryCourseRegistrations.filter(
      (item) => item.id !== id && item.folio !== folio
    );

    return NextResponse.json({
      success: true,
      message: "Inscripción eliminada correctamente.",
    });
  } catch (error: any) {
    console.error("[DELETE /api/course-register Error]", error);
    return NextResponse.json(
      { success: false, message: "Error interno al eliminar la inscripción." },
      { status: 500 }
    );
  }
}
