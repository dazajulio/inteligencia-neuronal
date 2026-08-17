"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Layers, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLeadStore } from "@/store/useLeadStore";

interface PhaseData {
  number: string;
  name: string;
  tagline: string;
  description: string;
  deliverables: string[];
  timeline: string;
  kpiTarget: string;
}

const phases: PhaseData[] = [
  {
    number: "01",
    name: "Fase 1: Diagnóstico de Fugas Operativas",
    tagline: "Auditoría profunda de inventario, recetas y mermas",
    description:
      "Auditoría técnica y de campo en tus sucursales para mapear fugas en rendimientos crudo/cocido, compras urgentes a sobreprecio y tiempos de pase en línea caliente.",
    deliverables: [
      "Mapeo de mermas y variaciones reales de Food Cost",
      "Auditoría de endpoints de tu POS/ERP (Micros, Toast, SoftRestaurant)",
      "Proyección de ROI y plazo exacto de amortización",
      "Firma de Acuerdo de Confidencialidad (NDA) para recetarios",
    ],
    timeline: "Semana 1",
    kpiTarget: "Identificación de hasta un 15% de sobrecostes operativos",
  },
  {
    number: "02",
    name: "Fase 2: Arquitectura & Estandarización",
    tagline: "Diseño de recetarios maestros y pipelines agénticos",
    description:
      "Construcción de bases de datos deterministas, manuales operativos inmutables y conectores asíncronos con tus proveedores habituales.",
    deliverables: [
      "Fichas técnicas y escandallos maestros estandarizados",
      "Configuración de órdenes de compra automáticas en ERP",
      "Diseño de pantallas KDS para pase de cocina caliente/fría",
      "Integración de canal WhatsApp directo (0% comisiones a terceros)",
    ],
    timeline: "Semana 2 - 3",
    kpiTarget: "Estandarización 100% libre de errores humanos",
  },
  {
    number: "03",
    name: "Fase 3: Despliegue en Producción sin Fricción",
    tagline: "Implementación en sede piloto durante servicio real",
    description:
      "Despliegue de los sistemas en entornos de producción seguros, sin detener el flujo diario ni interrumpir los turnos de comida o cena.",
    deliverables: [
      "Despliegue en servidores e instancias VPS dedicadas",
      "Pruebas de estrés y validación en horas pico de servicio",
      "Capacitación a chefs ejecutivos, gerentes de cocina y compras",
      "Monitoreo de latencia y sincronización de comandas en tiempo real",
    ],
    timeline: "Semana 4 - 6",
    kpiTarget: "Cero fricción ni paros operativos en la línea",
  },
  {
    number: "04",
    name: "Fase 4: Infraestructura como Servicio (AaaS)",
    tagline: "Mantenimiento continuo, observabilidad y soporte 24/7",
    description:
      "Acompañamiento permanente, re-calibración de menús por estacionalidad y observabilidad técnica bajo modelo corporativo.",
    deliverables: [
      "Monitoreo 24/7 de telemetría y cumplimiento HACCP",
      "Actualización continua según cambios en la carta o proveedores",
      "Reportes ejecutivos mensuales de EBITDA protegido",
      "SLA de disponibilidad del 99.98% con soporte directo",
    ],
    timeline: "Continuo (SLA Corporativo)",
    kpiTarget: "Disponibilidad del 99.98% y maximización de margen neto",
  },
];

export function ProcessSection() {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const { openModal } = useLeadStore();
  const currentPhase = phases[activePhaseIndex];

  return (
    <section id="como-trabajo" className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Como Trabajo
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Un método estructurado en 4 fases que garantiza la estandarización y automatización de tu negocio gastronómico sin detener el servicio ni un solo día.
          </p>
        </div>

        {/* 4-Phase Stepper */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Step Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {phases.map((p, index) => {
              const isActive = activePhaseIndex === index;
              return (
                <div
                  key={p.number}
                  onClick={() => setActivePhaseIndex(index)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                    isActive
                      ? "bg-white border-zinc-900 shadow-md ring-2 ring-zinc-900/20"
                      : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-colors ${
                      isActive
                        ? "bg-zinc-900 text-white shadow-sm"
                        : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {p.number}
                  </div>

                  <div className="space-y-1">
                    <h4 className={`text-base font-bold transition-colors ${isActive ? "text-slate-900" : "text-slate-700"}`}>
                      {p.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {p.tagline}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Phase Details Card */}
          <div className="lg:col-span-7 bg-slate-50/80 rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            
            {/* Header info */}
            <div className="space-y-2 pb-6 border-b border-slate-200">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-900 font-bold">
                <span>FASE {currentPhase.number} &bull; {currentPhase.timeline}</span>
                <span className="text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm">
                  {currentPhase.tagline}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                {currentPhase.name}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {currentPhase.description}
              </p>
            </div>

            {/* Deliverables Grid */}
            <div className="space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 font-bold flex items-center gap-2">
                <Layers className="w-4 h-4 text-zinc-900" />
                <span>Entregables Técnicos Clave</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentPhase.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700 font-medium shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4 text-zinc-900 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Metric Box */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
              <div className="space-y-0.5">
                <div className="text-[11px] font-mono uppercase text-zinc-900 font-bold">
                  Objetivo de Impacto:
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {currentPhase.kpiTarget}
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={openModal}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Iniciar Fase {currentPhase.number}
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
