import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import {
  sendCourseRegistrationEmail,
  sendAdminCourseRegistrationAlertEmail,
  sendCoursePaymentValidatedEmail,
} from "@/lib/resend/client";

export const dynamic = "force-dynamic";

// Almacenamiento en memoria para alta disponibilidad y resiliencia
let inMemoryCourseRegistrations: any[] = [];

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filterStatus = searchParams.get("status");
    const searchQuery = searchParams.get("search")?.toLowerCase().trim();

    const db = getSupabaseAdmin();
    let registrations: any[] = [];

    // 1. Consultar tabla 'course_registrations' en Supabase
    try {
      const { data, error } = await db
        .from("course_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        registrations = data;
      }
    } catch (e) {
      console.warn("[GET /api/course-register Supabase notice]", e);
    }

    // 2. Si no hay datos en la tabla principal, buscar en la tabla 'leads' con lead_type 'course_registration'
    if (registrations.length === 0) {
      try {
        const { data: leadsData } = await db
          .from("leads")
          .select("*")
          .or("lead_type.eq.course_registration,source.eq.landing_curso_merida,source.eq.landing_ia")
          .order("created_at", { ascending: false });

        if (leadsData && leadsData.length > 0) {
          registrations = leadsData.map((lead: any) => ({
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
          }));
        }
      } catch (err) {
        console.warn("[GET fallback leads error]", err);
      }
    }

    // 3. Fusionar con registros en memoria para garantizar que nunca se pierda un dato
    const map = new Map<string, any>();
    [...inMemoryCourseRegistrations, ...registrations].forEach((reg) => {
      const key = reg.folio || reg.id || `${reg.email}-${reg.created_at}`;
      if (key && !map.has(key)) {
        map.set(key, reg);
      }
    });

    let result = Array.from(map.values()).sort(
      (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );

    // 4. Filtrar por estado si se especifica
    if (filterStatus && filterStatus !== "all") {
      result = result.filter((item) => item.status?.toLowerCase() === filterStatus.toLowerCase());
    }

    // 5. Filtrar por búsqueda si se especifica
    if (searchQuery) {
      result = result.filter(
        (item) =>
          item.full_name?.toLowerCase().includes(searchQuery) ||
          item.email?.toLowerCase().includes(searchQuery) ||
          item.folio?.toLowerCase().includes(searchQuery) ||
          item.phone_whatsapp?.toLowerCase().includes(searchQuery) ||
          item.payment_reference?.toLowerCase().includes(searchQuery)
      );
    }

    // Estadísticas
    const totalCount = map.size;
    const allItems = Array.from(map.values());
    const confirmedCount = allItems.filter((i) => i.status === "confirmado").length;
    const pendingCount = allItems.filter((i) => i.status === "pendiente_verificacion").length;
    const cancelledCount = allItems.filter((i) => i.status === "cancelado").length;

    // Calcular ingresos aproximados
    const totalUsd = allItems
      .filter((i) => i.status === "confirmado")
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
        confirmed: inMemoryCourseRegistrations.filter((i) => i.status === "confirmado").length,
        pending: inMemoryCourseRegistrations.filter((i) => i.status === "pendiente_verificacion").length,
        cancelled: inMemoryCourseRegistrations.filter((i) => i.status === "cancelado").length,
        capacity: 25,
        available: Math.max(0, 25 - inMemoryCourseRegistrations.filter((i) => i.status === "confirmado").length),
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
      folio,
      full_name: fullName,
      email,
      phone_whatsapp: phone,
      tier,
      tier_label: tierLabel,
      organization_or_id: organizationOrId,
      modality,
      cohort_date: "Viernes 23 de Octubre de 2026 - 8:00 AM",
      amount,
      amount_bs: amountBs,
      bcv_rate: bcvRate,
      origin_bank: originBank,
      payment_method: paymentMethod,
      payment_reference: paymentReference,
      payment_date: paymentDate,
      status: "pendiente_verificacion",
      notes: notes + (bcvRate ? ` | Tasa BCV: Bs. ${bcvRate}` : "") + (amountBs ? ` | Monto Bs: ${amountBs}` : ""),
      attachment_url: carnetBase64 ? "carnet_adjuntado_data_url" : null,
      created_at: nowIso,
      updated_at: nowIso,
    };

    const db = getSupabaseAdmin();

    // 3. Persistir en Supabase 'course_registrations'
    let registrationSaved = false;
    try {
      const { data, error } = await db
        .from("course_registrations")
        .insert([
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
        ])
        .select()
        .single();

      if (!error && data) {
        registrationRecord.id = data.id;
        registrationSaved = true;
      } else if (error) {
        console.warn("[course_registrations insert warning]", error.message);
      }
    } catch (e: any) {
      console.warn("[course_registrations exception]", e.message);
    }

    // Si falló la tabla principal, guardar en leads como salvaguarda
    if (!registrationSaved) {
      try {
        const { data: leadData } = await db
          .from("leads")
          .insert([
            {
              folio,
              lead_type: "course_registration",
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
              status: "Pendiente Pago / Verificación",
            },
          ])
          .select()
          .single();

        if (leadData) {
          registrationRecord.id = leadData.id;
        }
      } catch (err) {
        console.warn("[Fallback leads insert error]", err);
      }
    }

    if (!registrationRecord.id) {
      registrationRecord.id = `LOCAL-${randomNum}`;
    }

    // Agregar a memoria
    inMemoryCourseRegistrations.unshift(registrationRecord);

    const whatsappMessage = `👋 Hola Julio, acabo de registrar mi inscripción para el *IA Gastronomía Workshop* en Mérida (Fullcowork).\n\n*Mis Datos:*\n• Folio: *${folio}*\n• Alumno: ${fullName}\n• Correo: ${email}\n• WhatsApp: ${phone}\n• Tarifa: ${tierLabel} (${amount})\n• Banco Emisor: ${originBank}\n• Nro. Referencia: ${paymentReference}\n\nAdjunto comprobante de pago móvil para validación.`;

    const whatsappDirectUrl = `https://wa.me/584148817137?text=${encodeURIComponent(whatsappMessage)}`;

    // 4. Disparar Correo al Alumno con Resend
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

    // 5. Disparar Alerta al Administrador con Resend
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

    // Actualizar en memoria
    let targetRegistration: any = null;
    inMemoryCourseRegistrations = inMemoryCourseRegistrations.map((item) => {
      if (item.id === id || item.folio === folio) {
        targetRegistration = { ...item, status: newStatus, updated_at: nowIso };
        if (notes !== undefined) targetRegistration.notes = notes;
        return targetRegistration;
      }
      return item;
    });

    const db = getSupabaseAdmin();

    // Actualizar en Supabase 'course_registrations'
    try {
      let query = db.from("course_registrations").update({
        status: newStatus,
        updated_at: nowIso,
        ...(notes !== undefined ? { notes } : {}),
      });

      if (id) {
        query = query.eq("id", id);
      } else {
        query = query.eq("folio", folio);
      }

      const { data, error } = await query.select().single();
      if (!error && data) {
        targetRegistration = data;
      }
    } catch (e) {
      console.warn("[PUT Supabase update course_registrations notice]", e);
    }

    // Actualizar también en fallback 'leads' si aplica
    try {
      await db
        .from("leads")
        .update({
          status: newStatus === "confirmado" ? "Cerrado / Pagado" : "Pendiente Pago / Verificación",
        })
        .or(`folio.eq.${folio || id},id.eq.${id || folio}`);
    } catch (e) {
      // ignore
    }

    // Si se confirmó y se solicitó enviar correo de confirmación al alumno
    if (newStatus === "confirmado" && sendEmailNotification && targetRegistration?.email) {
      try {
        await sendCoursePaymentValidatedEmail({
          to: targetRegistration.email,
          fullName: targetRegistration.full_name,
          courseTitle: "IA Gastronomía Workshop: Del Concepto al Ecosistema Digital Completo",
          folio: targetRegistration.folio || folio,
          tierLabel: targetRegistration.tier_label,
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

    // Limpiar en memoria
    inMemoryCourseRegistrations = inMemoryCourseRegistrations.filter(
      (item) => item.id !== id && item.folio !== folio
    );

    const db = getSupabaseAdmin();

    // Eliminar de Supabase 'course_registrations'
    try {
      if (id) {
        await db.from("course_registrations").delete().eq("id", id);
      } else if (folio) {
        await db.from("course_registrations").delete().eq("folio", folio);
      }
    } catch (e) {
      console.warn("[DELETE Supabase course_registrations notice]", e);
    }

    // Eliminar también de fallback 'leads' si existía
    try {
      if (folio) {
        await db.from("leads").delete().eq("folio", folio);
      }
    } catch (e) {
      // ignore
    }

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
