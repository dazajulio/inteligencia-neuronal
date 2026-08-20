import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validators/lead";
import { getSupabaseAdmin, submitLeadToDatabase } from "@/lib/supabase/client";

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

    // Caso 1: Descarga de Toolkit (Lead Magnet)
    if (body.fullName && body.fullName.startsWith("Lead Toolkit")) {
      const generatedFolio = `IN-TOOLKIT-${Math.floor(10000 + Math.random() * 90000)}`;
      const resourceId = body.resourceId || body.companyName?.replace("Toolkit: ", "").toLowerCase();

      // Guardar Lead en Supabase
      const { data: insertedLead } = await db
        .from("leads")
        .insert([
          {
            folio: generatedFolio,
            lead_type: "toolkit_download",
            full_name: body.fullName,
            company_name: body.companyName || "Descarga Toolkit",
            corporate_email: body.email,
            phone_whatsapp: body.phone || "-",
            business_type: "B2C Lead Magnet",
            daily_volume: "-",
            current_erp: "-",
            primary_bottleneck: body.currentChallenge || "Descarga de recurso",
            service_needed: body.serviceNeeded || `Toolkit Download: ${resourceId}`,
            resource_id: resourceId,
            status: "Enviado Secuencia Email",
            source: "academy_toolkit",
          },
        ])
        .select()
        .single();

      // Registrar en resource_downloads
      if (resourceId) {
        await db.from("resource_downloads").insert([
          {
            resource_id: resourceId,
            lead_id: insertedLead?.id,
            email: body.email,
          },
        ]);

        // Incrementar contador de descargas
        try {
          const { data: currentRes } = await db.from("academy_resources").select("downloads_count").eq("id", resourceId).single();
          if (currentRes) {
            await db.from("academy_resources").update({ downloads_count: (currentRes.downloads_count || 0) + 1 }).eq("id", resourceId);
          }
        } catch (e) {
          // ignore
        }
      }

      return NextResponse.json(
        { success: true, leadId: generatedFolio, message: "Descarga de recurso registrada" },
        { status: 201 }
      );
    }

    // Caso 2: Diagnóstico B2B Completo
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
    const dbResponse = await submitLeadToDatabase(validatedData);

    // Webhook opcional CRM / n8n
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
        message: "Diagnóstico agendado con éxito.",
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
