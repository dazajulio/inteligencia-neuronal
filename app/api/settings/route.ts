import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export interface PaymentSettings {
  pagoMovil: {
    banco: string;
    bancoCodigo: string;
    cedulaRif: string;
    telefono: string;
    whatsapp: string;
    tasaInfo: string;
  };
  lemonSqueezy: {
    storeName: string;
    storeUrl: string;
    courseLinks: {
      iaRestaurantes: string;
      bootcampN8n: string;
      crecimientoAeo: string;
    };
  };
}

const DEFAULT_SETTINGS: PaymentSettings = {
  pagoMovil: {
    banco: "Banesco",
    bancoCodigo: "0134",
    cedulaRif: "V-12.345.678",
    telefono: "0414-881-7137",
    whatsapp: "584148817137",
    tasaInfo: "Calculado a Tasa Oficial BCV del día",
  },
  lemonSqueezy: {
    storeName: "Inteligencia Neuronal",
    storeUrl: "https://inteligencia-neuronal.lemonsqueezy.com",
    courseLinks: {
      iaRestaurantes: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
      bootcampN8n: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
      crecimientoAeo: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
    },
  },
};

const LOCAL_STORAGE_FILE = path.join(process.cwd(), "data", "payment_settings.json");

function getLocalSettings(): PaymentSettings {
  try {
    if (fs.existsSync(LOCAL_STORAGE_FILE)) {
      const raw = fs.readFileSync(LOCAL_STORAGE_FILE, "utf8");
      const parsed = JSON.parse(raw);
      return {
        pagoMovil: { ...DEFAULT_SETTINGS.pagoMovil, ...(parsed.pagoMovil || {}) },
        lemonSqueezy: {
          ...DEFAULT_SETTINGS.lemonSqueezy,
          ...(parsed.lemonSqueezy || {}),
          courseLinks: {
            ...DEFAULT_SETTINGS.lemonSqueezy.courseLinks,
            ...(parsed.lemonSqueezy?.courseLinks || {}),
          },
        },
      };
    }
  } catch (err) {
    console.warn("[Settings Local Read Fallback]", err);
  }
  return DEFAULT_SETTINGS;
}

function saveLocalSettings(settings: PaymentSettings) {
  try {
    const dir = path.dirname(LOCAL_STORAGE_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(LOCAL_STORAGE_FILE, JSON.stringify(settings, null, 2), "utf8");
  } catch (err) {
    console.warn("[Settings Local Write Fallback]", err);
  }
}

export async function GET() {
  let settings = getLocalSettings();

  try {
    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from("app_settings")
      .select("value")
      .eq("key", "payment_gateways")
      .single();

    if (!error && data?.value) {
      settings = {
        pagoMovil: { ...DEFAULT_SETTINGS.pagoMovil, ...(data.value.pagoMovil || {}) },
        lemonSqueezy: {
          ...DEFAULT_SETTINGS.lemonSqueezy,
          ...(data.value.lemonSqueezy || {}),
          courseLinks: {
            ...DEFAULT_SETTINGS.lemonSqueezy.courseLinks,
            ...(data.value.lemonSqueezy?.courseLinks || {}),
          },
        },
      };
      saveLocalSettings(settings);
    }
  } catch (err) {
    console.warn("[Settings GET Supabase Fallback]", err);
  }

  return NextResponse.json({ success: true, settings });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const newSettings: PaymentSettings = {
      pagoMovil: {
        ...DEFAULT_SETTINGS.pagoMovil,
        ...(body.pagoMovil || {}),
      },
      lemonSqueezy: {
        ...DEFAULT_SETTINGS.lemonSqueezy,
        ...(body.lemonSqueezy || {}),
        courseLinks: {
          ...DEFAULT_SETTINGS.lemonSqueezy.courseLinks,
          ...(body.lemonSqueezy?.courseLinks || {}),
        },
      },
    };

    saveLocalSettings(newSettings);

    try {
      const db = getSupabaseAdmin();
      await db.from("app_settings").upsert(
        {
          key: "payment_gateways",
          value: newSettings,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" }
      );
    } catch (e) {
      console.warn("[Settings POST Supabase Upsert Warning]", e);
    }

    return NextResponse.json({
      success: true,
      message: "Configuración de pasarelas de pago guardada exitosamente.",
      settings: newSettings,
    });
  } catch (error: any) {
    console.error("[Settings POST Error]", error);
    return NextResponse.json(
      { success: false, message: "Error al guardar configuración" },
      { status: 500 }
    );
  }
}
