import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validators/lead";
import { submitLeadToDatabase } from "@/lib/supabase/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validate payload with Zod
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

    // 2. Persist to Database (Supabase with RLS)
    const dbResponse = await submitLeadToDatabase(validatedData);

    // 3. Webhook bridge for external CRM / n8n orchestrator
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
