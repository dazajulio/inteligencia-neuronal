import { NextRequest, NextResponse } from "next/server";
import { leadSchema } from "@/lib/validators/lead";
import { submitLeadToDatabase } from "@/lib/supabase/client";

// In-memory server-side buffer of captured leads
// (persisted across requests during server runtime, syncs with Supabase when available)
declare global {
  var __LEADS_BUFFER__: any[] | undefined;
}

if (!global.__LEADS_BUFFER__) {
  global.__LEADS_BUFFER__ = [
    {
      id: "IN-AUDIT-98214",
      fullName: "Roberto Valenzuela",
      companyName: "Grupo Gastronómico Altamira",
      corporateEmail: "roberto@grupoaltamira.com",
      phoneWhatsApp: "+58 414 8817137",
      businessType: "Cadena de Restaurantes",
      dailyVolume: "2,000 - 10,000 órdenes / día",
      currentERP: "Oracle Micros / Simphony",
      primaryBottleneck: "Fugas en Food Cost de proteínas y lentitud en despacho KDS horas pico.",
      serviceNeeded: "Auditoría de Ecosistema Digital ($450 USD)",
      status: "Nuevo",
      source: "solicitar_diagnostico",
      createdAt: "19 Ago 2026, 05:30 AM",
    },
    {
      id: "IN-AUDIT-98213",
      fullName: "Carlos Mendoza",
      companyName: "Bistro Gourmet 54",
      corporateEmail: "gerencia@bistro54.mx",
      phoneWhatsApp: "+52 55 4912 3456",
      businessType: "Dark Kitchen / Cocina Central",
      dailyVolume: "500 - 2,000 órdenes / día",
      currentERP: "Toast POS",
      primaryBottleneck: "Demoras en WhatsApp y órdenes de compras manuales a proveedores.",
      serviceNeeded: "Sistemas Agénticos Autónomos",
      status: "En Evaluación",
      source: "hero_soy_empresa",
      createdAt: "18 Ago 2026, 08:45 PM",
    },
    {
      id: "IN-AUDIT-98212",
      fullName: "Valeria Gómez",
      companyName: "Burger Lab Express",
      corporateEmail: "operaciones@burgerlab.co",
      phoneWhatsApp: "+57 310 987 6543",
      businessType: "Franquicia Multisede",
      dailyVolume: "> 10,000 órdenes / día (Enterprise)",
      currentERP: "Soft Restaurant",
      primaryBottleneck: "Altas comisiones pagadas a plataformas de delivery externas.",
      serviceNeeded: "Infraestructura & Plataformas FoodTech",
      status: "Contactado",
      source: "soluciones_card",
      createdAt: "18 Ago 2026, 02:15 PM",
    },
  ];
}

export async function GET() {
  return NextResponse.json({
    success: true,
    leads: global.__LEADS_BUFFER__ || [],
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if it's a toolkit download lead or diagnosis lead
    if (body.fullName && body.fullName.startsWith("Lead Toolkit")) {
      const toolkitLead = {
        id: `IN-TOOLKIT-${Math.floor(100000 + Math.random() * 900000)}`,
        fullName: body.fullName,
        companyName: body.companyName || "Descarga Toolkit",
        corporateEmail: body.email,
        phoneWhatsApp: body.phone || "-",
        businessType: "B2C Lead Magnet",
        dailyVolume: "-",
        currentERP: "-",
        primaryBottleneck: body.currentChallenge || "Descarga de recurso",
        serviceNeeded: body.serviceNeeded || "Toolkit Download",
        status: "Enviado Secuencia Email",
        source: "academy_toolkit",
        createdAt: new Date().toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" }),
      };

      global.__LEADS_BUFFER__?.unshift(toolkitLead);

      return NextResponse.json(
        { success: true, leadId: toolkitLead.id, message: "Lead registrado" },
        { status: 201 }
      );
    }

    // 1. Validate payload with Zod for full diagnosis
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

    const newLead = {
      id: dbResponse.leadId,
      fullName: validatedData.fullName,
      companyName: validatedData.companyName,
      corporateEmail: validatedData.corporateEmail,
      phoneWhatsApp: validatedData.phoneWhatsApp,
      businessType: validatedData.businessType,
      dailyVolume: validatedData.dailyVolume,
      currentERP: validatedData.currentERP,
      primaryBottleneck: validatedData.primaryBottleneck || "No especificado",
      serviceNeeded: "Auditoría & Diagnóstico de Automatización",
      status: "Nuevo",
      source: validatedData.source || "diagnostico_modal",
      createdAt: new Date().toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" }),
    };

    global.__LEADS_BUFFER__?.unshift(newLead);

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

