import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 3600; // Cache de 1 hora

let cachedRate = {
  rate: 40.50,
  lastUpdated: new Date().toISOString(),
};

export async function GET() {
  try {
    // 1. Intentar consultar API pública de tasa oficial BCV
    const sources = [
      "https://ve.dolarapi.com/v1/dolares/oficial",
      "https://pydolarve.org/api/v1/dollar?page=bcv",
    ];

    let liveRate: number | null = null;
    let sourceName = "API BCV Oficial";

    for (const url of sources) {
      try {
        const res = await fetch(url, { next: { revalidate: 3600 }, headers: { "User-Agent": "InteligenciaNeuronal/1.0" } });
        if (res.ok) {
          const data = await res.json();
          const rateVal = parseFloat(data.promedio || data.price || data.monitors?.usd?.price || data.tasa);
          if (!isNaN(rateVal) && rateVal > 0) {
            liveRate = rateVal;
            sourceName = url;
            break;
          }
        }
      } catch (err) {
        // Fallback al siguiente proveedor
      }
    }

    if (liveRate) {
      cachedRate = {
        rate: liveRate,
        lastUpdated: new Date().toISOString(),
      };
    }

    return NextResponse.json({
      success: true,
      rate: cachedRate.rate,
      symbol: "Bs.",
      source: "Banco Central de Venezuela (BCV)",
      lastUpdated: cachedRate.lastUpdated,
      formattedRate: `Bs. ${cachedRate.rate.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    });
  } catch (error: any) {
    console.error("[BCV API Error]", error);
    return NextResponse.json({
      success: true,
      rate: cachedRate.rate,
      symbol: "Bs.",
      source: "Tasa Referencial BCV",
      lastUpdated: cachedRate.lastUpdated,
      formattedRate: `Bs. ${cachedRate.rate.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    });
  }
}
