import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validators/lead";
import { getSupabaseAdmin, submitLeadToDatabase } from "@/lib/supabase/client";
import {
  sendResourceDeliveryEmail,
  sendDiagnosisConfirmationEmail,
  sendAdminLeadAlertEmail,
} from "@/lib/resend/client";

export const dynamic = "force-dynamic";

// Lista de dominios de correos temporales / desechables bloqueados
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "tempmail.com",
  "10minutemail.com",
  "yopmail.com",
  "sharklasers.com",
  "trashmail.com",
  "getairmail.com",
  "throwawaymail.com",
  "temp-mail.org",
  "fakeinbox.com",
  "dispostable.com",
  "burnermail.io",
  "crazymailing.com",
]);

function isDisposableEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? DISPOSABLE_EMAIL_DOMAINS.has(domain) : false;
}

export async function GET() {
  try {
    const db = getSupabaseAdmin();
    const { data: leads, error } = await db
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !leads) {
      return NextResponse.json({ success: true, leads: [] });
    }

    const formatted = leads.map((l) => ({
      id: l.folio || l.id,
      realId: l.id,
      fullName: l.full_name,
      companyName: l.company_name,
      corporateEmail: l.corporate_email,
      phoneWhatsApp: l.phone_whatsapp,
      businessType: l.business_type,
      dailyVolume: l.daily_volume,
      currentERP: l.current_erp,
      primaryBottleneck: l.primary_bottleneck,
      serviceNeeded: l.service_needed,
      status: l.status,
      source: l.source,
      createdAt: new Date(l.created_at).toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" }),
    }));

    return NextResponse.json({ success: true, leads: formatted });
  } catch (err) {
    console.error("[GET /api/leads Error]", err);
    return NextResponse.json({ success: true, leads: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = getSupabaseAdmin();

    // ── 🛡️ PROTECCIÓN ANTI-BOTS: Honeypot ──
    if (body.hp_website || body.honeypot || body.fax_number) {
      // Trampa para bots: responden con éxito falso para no alertar al bot
      return NextResponse.json(
        { success: true, message: "Recurso procesado con éxito." },
        { status: 200 }
      );
    }

    // ── 1. CASO: DESCARGA DE TOOLKIT (LEAD MAGNET CON REGLAS Y RATE LIMITING) ──
    if (body.fullName && body.fullName.startsWith("Lead Toolkit")) {
      const email = body.email ? body.email.trim().toLowerCase() : "";

      if (!email || !email.includes("@")) {
        return NextResponse.json(
          { success: false, message: "Por favor ingresa un correo electrónico válido." },
          { status: 400 }
        );
      }

      // 🛡️ Filtro contra correos temporales desechables
      if (isDisposableEmail(email)) {
        return NextResponse.json(
          { success: false, message: "Por favor ingresa un correo corporativo o personal real (no temporal)." },
          { status: 400 }
        );
      }

      const resourceId = body.resourceId || body.companyName?.replace("Toolkit: ", "").toLowerCase();
      const cleanId = resourceId ? resourceId.replace(/^res-/, "") : "";

      // 1.1 Obtener detalles del recurso desde la BD
      let resourceData: any = null;
      if (resourceId) {
        const { data: res } = await db
          .from("academy_resources")
          .select("*")
          .or(`id.eq.${resourceId},id.eq.${cleanId},slug.eq.${resourceId},slug.eq.${cleanId}`)
          .single();
        resourceData = res;
      }

      const targetResourceId = resourceData?.id || cleanId || resourceId;
      const resourceTitle = resourceData?.title || `Recurso Operativo ${resourceId?.toUpperCase() || ""}`;
      const resourceTag = resourceData?.tag || "TOOLKIT OPERATIVO";
      const resourceFormat = resourceData?.format || "PDF / Plantilla Editable";
      const resourceDesc = resourceData?.description || "Activo de arquitectura operativa y estandarización para restaurantes.";
      const fileUrl = resourceData?.file_url || "https://inteligencianeuronal.com/academy#toolkit";

      // ── 🛡️ REGLA: RATE LIMITING & 1 DESCARGA POR CORREO ──
      // Verificamos si este correo ya descargó este recurso específico previamente
      const { data: existingDownloads } = await db
        .from("resource_downloads")
        .select("id, created_at")
        .eq("email", email)
        .eq("resource_id", targetResourceId)
        .order("created_at", { ascending: false });

      if (existingDownloads && existingDownloads.length > 0) {
        const lastDownload = new Date(existingDownloads[0].created_at).getTime();
        const minutesAgo = (Date.now() - lastDownload) / (1000 * 60);

        // Si lo solicitó hace menos de 15 minutos: Bloqueo anti-spam
        if (minutesAgo < 15) {
          return NextResponse.json(
            {
              success: true,
              alreadyDownloaded: true,
              message: "Ya hemos enviado este recurso a tu correo recientemente. Por favor revisa tu bandeja de entrada o spam.",
            },
            { status: 200 }
          );
        }

        // Si lo solicitó hace más de 15 minutos: Reenviamos el correo sin duplicar lead ni inflar métricas
        try {
          await sendResourceDeliveryEmail({
            to: email,
            resourceTitle,
            resourceTag,
            resourceFormat,
            resourceDescription: resourceDesc,
            downloadUrl: fileUrl,
          });
        } catch (e) {
          console.warn("[Resend Re-delivery Warning]", e);
        }

        return NextResponse.json(
          {
            success: true,
            alreadyDownloaded: true,
            message: "Te hemos reenviado el recurso a tu correo electrónico.",
          },
          { status: 200 }
        );
      }

      // ── 🛡️ PROTECCIÓN GLOBAL: Máximo 4 descargas en 10 minutos por el mismo email ──
      const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
      const { data: recentUserDownloads } = await db
        .from("resource_downloads")
        .select("id")
        .eq("email", email)
        .gte("created_at", tenMinutesAgo);

      if (recentUserDownloads && recentUserDownloads.length >= 4) {
        return NextResponse.json(
          {
            success: false,
            message: "Has alcanzado el límite de descargas simultáneas. Por favor espera unos minutos.",
          },
          { status: 429 }
        );
      }

      // 1.2 Registro de Lead Nuevo y Único en Supabase
      const randomNum = Math.floor(10000 + Math.random() * 90000);
      const generatedFolio = `IN-TOOLKIT-${randomNum}`;

      const { data: insertedLead } = await db
        .from("leads")
        .insert([
          {
            folio: generatedFolio,
            lead_type: "toolkit_download",
            full_name: body.fullName,
            company_name: body.companyName || "Descarga Toolkit",
            corporate_email: email,
            phone_whatsapp: body.phone || "-",
            business_type: "B2C Lead Magnet",
            daily_volume: "-",
            current_erp: "-",
            primary_bottleneck: body.currentChallenge || `Descarga de recurso: ${resourceTitle}`,
            service_needed: `Toolkit Download: ${resourceTitle}`,
            resource_id: targetResourceId,
            status: "Enviado Secuencia Email",
            source: "academy_toolkit",
          },
        ])
        .select()
        .single();

      // 1.3 Registrar en tabla de descargas
      await db.from("resource_downloads").insert([
        {
          resource_id: targetResourceId,
          lead_id: insertedLead?.id,
          email: email,
        },
      ]);

      // Incrementar contador de descargas reales en academy_resources
      if (resourceData?.id) {
        try {
          await db
            .from("academy_resources")
            .update({ downloads_count: (resourceData.downloads_count || 0) + 1 })
            .eq("id", resourceData.id);
        } catch (e) {
          // ignore
        }
      }

      // 1.4 Enviar Correo con Resend
      try {
        const resendResult = await sendResourceDeliveryEmail({
          to: email,
          resourceTitle,
          resourceTag,
          resourceFormat,
          resourceDescription: resourceDesc,
          downloadUrl: fileUrl,
        });
        console.log("[Resend Resource Delivery Result]", resendResult);
      } catch (err) {
        console.error("[Resend Resource Dispatch Error]", err);
      }

      return NextResponse.json(
        {
          success: true,
          leadId: generatedFolio,
          message: "Recurso enviado a tu correo electrónico con éxito.",
        },
        { status: 201 }
      );
    }

    // ── 2. CASO: DIAGNÓSTICO B2B COMPLETO ──
    const validationResult = leadSchema.safeParse(body);

    if (!validationResult.success) {
      const errorFormatted = validationResult.error.format();
      return NextResponse.json(
        {
          success: false,
          message: "Datos de formulario inválidos",
          errors: errorFormatted,
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Filtro contra correos temporales en auditorías
    if (isDisposableEmail(validatedData.corporateEmail)) {
      return NextResponse.json(
        { success: false, message: "Por favor ingresa un correo corporativo válido para coordinar la auditoría." },
        { status: 400 }
      );
    }

    const dbResponse = await submitLeadToDatabase(validatedData);

    // 2.1 Enviar Correo de Confirmación al Cliente con Resend
    if (validatedData.corporateEmail) {
      try {
        const clientEmailRes = await sendDiagnosisConfirmationEmail({
          to: validatedData.corporateEmail,
          fullName: validatedData.fullName,
          companyName: validatedData.companyName,
          serviceNeeded: "Auditoría de Ecosistema Digital & Automatización",
          folio: dbResponse.leadId || `IN-AUDIT-${Date.now()}`,
          businessType: validatedData.businessType,
          dailyVolume: validatedData.dailyVolume,
        });
        console.log("[Resend Client Confirmation Result]", clientEmailRes);
      } catch (err) {
        console.error("[Resend Client Confirmation Error]", err);
      }
    }

    // 2.2 Enviar Alerta Inmediata al Administrador con Resend
    try {
      await sendAdminLeadAlertEmail({
        folio: dbResponse.leadId || `IN-AUDIT-${Date.now()}`,
        fullName: validatedData.fullName,
        companyName: validatedData.companyName,
        corporateEmail: validatedData.corporateEmail,
        phoneWhatsApp: validatedData.phoneWhatsApp,
        businessType: validatedData.businessType,
        dailyVolume: validatedData.dailyVolume,
        currentERP: validatedData.currentERP,
        primaryBottleneck: validatedData.primaryBottleneck,
        serviceNeeded: "Auditoría de Ecosistema Digital",
      });
    } catch (err) {
      console.error("[Resend Admin Alert Error]", err);
    }

    // 2.3 Webhook opcional CRM / n8n
    const webhookUrl = process.env.WEBHOOK_CRM_URL;
    if (webhookUrl) {
      try {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            event: "lead.created",
            leadId: dbResponse.leadId,
            timestamp: new Date().toISOString(),
            data: validatedData,
          }),
        }).catch((err) => console.warn("[Webhook CRM Dispatch Warning]", err));
      } catch (e) {
        console.warn("[Webhook Error]", e);
      }
    }

    return NextResponse.json(
      {
        success: true,
        leadId: dbResponse.leadId,
        registeredAt: dbResponse.registeredAt,
        message: "Diagnóstico agendado con éxito. Hemos enviado la confirmación a tu correo.",
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("[POST /api/leads Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error interno del servidor al procesar la solicitud",
      },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, message: "ID del lead requerido" }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const isUuid = body.id.includes("-") && body.id.length > 20 && !body.id.startsWith("IN-");

    const query = isUuid
      ? db.from("leads").update({ status: body.status }).eq("id", body.id)
      : db.from("leads").update({ status: body.status }).eq("folio", body.id);

    const { error } = await query;
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Estado de lead actualizado" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID requerido para eliminar" }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const isUuid = id.includes("-") && id.length > 20 && !id.startsWith("IN-");

    const query = isUuid
      ? db.from("leads").delete().eq("id", id)
      : db.from("leads").delete().eq("folio", id);

    const { error } = await query;
    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Lead eliminado" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
