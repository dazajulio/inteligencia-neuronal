import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import {
  sendCourseRegistrationEmail,
  sendAdminCourseRegistrationAlertEmail,
} from "@/lib/resend/client";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validaciones básicas
    const fullName = body.fullName?.trim();
    const email = body.email?.trim().toLowerCase();
    const phone = body.phone?.trim();
    const tier = body.tier || "general";
    const tierLabel = body.tierLabel || "Público General";
    const organizationOrId = body.organizationOrId?.trim() || "No especificado";
    const modality = body.modality || "presencial";
    const amount = body.amount || "$50 USD";
    const paymentMethod = body.paymentMethod || "pago_movil";
    const paymentReference = body.paymentReference?.trim() || "Por validar";
    const notes = body.notes?.trim() || "";

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Nombre, correo y WhatsApp son campos obligatorios." },
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
    const folio = `IN-MERIDA-${randomNum}`;

    const db = getSupabaseAdmin();

    // 3. Persistir en la tabla 'course_registrations' (o fallback a 'leads')
    let registrationSaved = false;
    try {
      const { data, error } = await db
        .from("course_registrations")
        .insert([
          {
            folio,
            full_name: fullName,
            email,
            phone_whatsapp: phone,
            tier,
            tier_label: tierLabel,
            organization_or_id: organizationOrId,
            modality,
            cohort_date: "Sábado 10 de Octubre de 2026",
            amount,
            payment_method: paymentMethod,
            payment_reference: paymentReference,
            status: "pendiente_verificacion",
            notes,
          },
        ])
        .select()
        .single();

      if (!error && data) {
        registrationSaved = true;
      } else if (error) {
        console.warn("[course_registrations table insert notice]", error.message);
      }
    } catch (e) {
      console.warn("[course_registrations error, trying fallback to leads]", e);
    }

    // Si la tabla dedicada no existe aún en Supabase, guardamos como lead calificado
    if (!registrationSaved) {
      try {
        await db.from("leads").insert([
          {
            folio,
            lead_type: "course_registration",
            full_name: fullName,
            company_name: organizationOrId !== "No especificado" ? organizationOrId : `Inscrito: ${tierLabel}`,
            corporate_email: email,
            phone_whatsapp: phone,
            business_type: modality === "presencial" ? "Curso Presencial Mérida" : "Curso Online Academy",
            daily_volume: amount,
            current_erp: paymentMethod,
            primary_bottleneck: `Ref: ${paymentReference} | Tier: ${tierLabel}`,
            service_needed: "Dominio Local: AEO & SEO (Octubre)",
            source: "landing_curso_merida",
            status: "Pendiente Pago / Verificación",
          },
        ]);
      } catch (err) {
        console.warn("[Fallback leads insert error]", err);
      }
    }

    const whatsappGroupUrl = "https://wa.me/584148817137?text=" + encodeURIComponent(
      `Hola Julio, me acabo de registrar en el curso presencial de Mérida "Dominio Local: AEO & SEO". Mi folio es ${folio} (${tierLabel}). Adjunto mi comprobante de pago.`
    );

    // 4. Disparar Correo de Confirmación al Alumno con Resend
    try {
      await sendCourseRegistrationEmail({
        to: email,
        fullName,
        courseTitle: "Dominio Local: AEO & SEO. Visibilidad en Motores de IA",
        folio,
        tierLabel,
        amount,
        paymentMethod,
        paymentReference,
        eventDate: "Sábado 10 de Octubre de 2026",
        eventTime: "8:30 AM a 12:30 PM (4 Horas Prácticas)",
        eventLocation: "Coworking Mérida (Respaldo Eléctrico & Fibra Óptica)",
        whatsappGroupUrl,
      });
    } catch (err) {
      console.warn("[Resend Student Course Email Dispatch Warning]", err);
    }

    // 5. Disparar Alerta Inmediata al Administrador
    try {
      await sendAdminCourseRegistrationAlertEmail({
        folio,
        fullName,
        email,
        phone,
        tier: tierLabel,
        amount,
        paymentMethod,
        paymentReference,
        organizationOrId,
        modality: modality === "presencial" ? "Presencial Mérida (10 Oct)" : "Online Academy",
      });
    } catch (err) {
      console.warn("[Resend Admin Course Alert Dispatch Warning]", err);
    }

    return NextResponse.json(
      {
        success: true,
        folio,
        registeredAt: new Date().toISOString(),
        whatsappGroupUrl,
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
