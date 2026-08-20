import React from "react";
import { AlertTriangle, TrendingDown, Clock, ShieldAlert, ArrowDown } from "lucide-react";

export function DiagnosisSection() {
  const painPoints = [
    {
      icon: <TrendingDown className="w-5 h-5 text-rose-600" />,
      badge: "Fuga de Margen",
      title: "Comisiones y Fricción",
      description:
        "Hasta un 30% del margen cedido a intermediarios de delivery y pérdidas constantes por falta de canal de venta directo.",
    },
    {
      icon: <Clock className="w-5 h-5 text-amber-600" />,
      badge: "Desgaste Humano",
      title: "Tareas Manuales y Errores",
      description:
        "Equipos colapsados respondiendo WhatsApp, gestionando comandas en papel y cuadrando inventarios en hojas de cálculo.",
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-indigo-600" />,
      badge: "Vulnerabilidad",
      title: "Sin Infraestructura Propia",
      description:
        "Negocios gastronómicos que dependen de la memoria del personal, sin sistemas autónomos que sostengan la expansión.",
    },
  ];

  return (
    <section
      id="diagnostico"
      className="w-full py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-slate-100/60 to-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-rose-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-xs font-mono font-bold text-rose-700 shadow-sm">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>00 // EL DIAGNÓSTICO DEL SECTOR</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
            El crecimiento en la industria gastronómica colapsa sin sistemas.
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            El talento humano se desgasta en tareas repetitivas, el control falla y la experiencia del cliente se fractura. Nosotros construimos la{" "}
            <span className="font-bold text-slate-900 underline decoration-indigo-400 decoration-2 underline-offset-4">
              infraestructura invisible
            </span>{" "}
            que sostiene la expansión y protege tus márgenes.
          </p>
        </div>

        {/* 3 Diagnostic Pain Points Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {painPoints.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between text-left space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Directional Callout to Solutions */}
        <div className="pt-2 text-center">
          <a
            href="#soluciones"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50/80 hover:bg-indigo-100 px-5 py-2.5 rounded-full border border-indigo-200 transition-all shadow-sm"
          >
            <span>Conoce nuestra arquitectura de soluciones</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
