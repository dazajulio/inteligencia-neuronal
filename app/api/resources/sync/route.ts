import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

const OFFICIAL_RESOURCES = [
  {
    id: "sops",
    slug: "sops",
    title: "Framework de Manuales Operativos (SOPs) y Checklists",
    description: "Estructura modular en Notion para estandarizar procesos de cocina, compras, servicio y apertura/cierre antes de integrar automatizaciones agénticas.",
    tag: "WORKSPACE NOTION",
    format: "Plantilla Notion Duplicable",
    preview_image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    stripe_color: "from-[#FEAD2B] to-[#ea580c]",
    file_url: "https://notion.so/",
    access_type: "GRATUITO (LEAD)",
    price_display: "GRATIS",
    price_usd: 0,
    downloads_count: 0,
    is_active: true,
    order_index: 1,
  },
  {
    id: "haccp",
    slug: "haccp",
    title: "Checklist de Auditoría de Puntos Críticos HACCP",
    description: "Plantilla interactiva de control de temperaturas, rotación FIFO/PEPS, matriz de límites críticos y protocolos de inocuidad según estándares internacionales.",
    tag: "PDF INTERACTIVO",
    format: "Guía de Auditoría PDF",
    preview_image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    stripe_color: "from-[#86C537] to-[#059669]",
    file_url: "/downloads/checklist-haccp.pdf",
    access_type: "GRATUITO (LEAD)",
    price_display: "GRATIS",
    price_usd: 0,
    downloads_count: 0,
    is_active: true,
    order_index: 2,
  },
  {
    id: "aeo-rag",
    slug: "aeo-rag",
    title: "Guía de Indexación para Motores de Respuesta IA (AEO & RAG)",
    description: "Manual de arquitectura técnica para estructurar microdatos JSON-LD y Schema.org para que ChatGPT, Gemini y Perplexity indexen y citen tu negocio.",
    tag: "GUÍA TÉCNICA",
    format: "Manual de Arquitectura AEO",
    preview_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    stripe_color: "from-[#EA0C7F] to-[#971B8D]",
    file_url: "/downloads/guia-aeo-rag.pdf",
    access_type: "PREMIUM (PAGO)",
    price_display: "$5 USD",
    price_usd: 5,
    downloads_count: 0,
    is_active: true,
    order_index: 3,
  },
  {
    id: "escandallos",
    slug: "escandallos",
    title: "Matriz Maestra de Escandallos & Costos Gastronómicos",
    description: "Plantilla en Excel totalmente formulada para costeo crudo/cocido, factor de rendimiento, mermas técnicas y cálculo de precio sugerido por Food Cost.",
    tag: "XLSX PARAMETRIZADO",
    format: "Plantilla Excel Parametrizada",
    preview_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    stripe_color: "from-[#1DACE3] to-[#0284c7]",
    file_url: "/downloads/matriz-escandallos.xlsx",
    access_type: "GRATUITO (LEAD)",
    price_display: "GRATIS",
    price_usd: 0,
    downloads_count: 0,
    is_active: true,
    order_index: 4,
  },
];

export async function POST() {
  try {
    const db = getSupabaseAdmin();
    const results = [];

    for (const res of OFFICIAL_RESOURCES) {
      const { data: upsertedRes, error } = await db
        .from("academy_resources")
        .upsert(res, { onConflict: "id" })
        .select()
        .single();

      if (error) {
        console.error(`[Sync Resource Error for ${res.id}]`, error);
        continue;
      }
      results.push(upsertedRes);
    }

    return NextResponse.json({
      success: true,
      message: `Se han sincronizado ${results.length} recursos exitosamente con Supabase.`,
      resources: results,
    });
  } catch (err: any) {
    console.error("[POST /api/resources/sync Error]", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
