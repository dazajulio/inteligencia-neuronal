"use client";

import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLeadStore } from "@/store/useLeadStore";

interface PhaseData {
  number: string;
  name: string;
  enfoque: string;
  description: string;
  deliverables: string[];
  kpiTarget: string;
}

const phases: PhaseData[] = [
  {
    number: "01",
    name: "Fase 1: Diagnóstico de Ecosistema & Fugas",
    enfoque: "Auditoría 360° de presencia digital, visibilidad y operaciones.",
    description:
      "Evaluamos tu posicionamiento en Google, mapas y motores de IA (SEO/AEO), medimos la fricción en la toma de pedidos, calculamos pérdidas por comisiones de intermediarios y detectamos descontrol en mermas y recetas.",
    deliverables: [
      "Reporte de Indexación & Visibilidad (SEO/AEO): Auditoría técnica de robots, sitemaps y respuesta de modelos de IA.",
      "Matriz de Rendimiento y Fricción Transaccional: Mapeo del embudo de conversión y cálculo de margen cedido.",
      "Diagnóstico de Estandarización & Costos: Análisis de desvíos en fichas técnicas y mermas operativas.",
      "Hoja de Ruta de Arquitectura Digital: Plan de acción priorizado con ROI estimado.",
    ],
    kpiTarget: "Entrega de la hoja de ruta con las prioridades exactas para tapar fugas de capital de inmediato.",
  },
  {
    number: "02",
    name: "Fase 2: Implementación de Sistemas Agénticos (IA & RPA)",
    enfoque: "Despliegue de tu fuerza de trabajo digital autónoma 24/7.",
    description:
      "Construcción y puesta a punto de los 3 agentes clave: el Agente de Ventas y WhatsApp para capturar pedidos directos y reservas, el Agente de Compras y Abastecimiento para predicción de stock, y el Agente de Control de Datos para sincronización automática con tu CRM/ERP.",
    deliverables: [
      "Agente de Ventas & WhatsApp en Producción: Flujo en API oficial con menú interactivo y pagos directos.",
      "Agente de Compras & Abastecimiento: Módulo predictivo de stock y generación de órdenes de compra.",
      "Canales de Sincronización CRM/ERP: Conectores automatizados para registro de clientes y pedidos.",
      "Entorno de Ejecución en Servidor Dedicado: Despliegue en contenedores aislados con variables seguras.",
    ],
    kpiTarget: "Automatizar la atención y el control de insumos sin depender del error humano.",
  },
  {
    number: "03",
    name: "Fase 3: Despliegue de Infraestructura FoodTech & Producción",
    enfoque: "Lanzamiento de tu plataforma propia y sincronización operativa en vivo.",
    description:
      "Puesta en marcha de tu canal propio de venta (Menú QR, Delivery y Takeaway) con pasarela de pagos integrada, instalación de pantallas de cocina (KDS) en tiempo real y configuración del panel gerencial sin interrumpir los turnos de servicio.",
    deliverables: [
      "Plataforma de Menú Digital & Delivery: Aplicación web propia con pagos integrados y geofencing.",
      "Módulo KDS (Kitchen Display System): Pantalla de comandas en tiempo real con baja latencia.",
      "Panel de Control Gerencial: Dashboard con métricas financieras y gestión de pedidos en vivo.",
      "Base de Datos Aislada con RLS: Almacenamiento seguro y aislamiento de datos de clientes.",
    ],
    kpiTarget: "Independencia tecnológica total, eliminación de comandas de papel y recuperación del margen de ganancia.",
  },
  {
    number: "04",
    name: "Fase 4: Infraestructura como Servicio (AaaS) & Transferencia de Conocimiento",
    enfoque: "Operatividad continua, blindaje técnico y autonomía para tu equipo.",
    description:
      "Alojamiento en servidores VPS dedicados, gestión de cómputo/tokens de IA, monitoreo de latencia 24/7 y actualizaciones de seguridad. Integramos un programa intensivo de capacitación técnica y operativa para que tu personal domine el ecosistema sin fricción.",
    deliverables: [
      "Alojamiento & Telemetría Activa: Servidores dedicados, bases de datos RLS y mantenimiento preventivo.",
      "Actualización de Modelos: Calibración continua de agentes ante cambios de menú y promociones.",
      "Capacitación Ejecutiva & Operativa: Formación a directores de operaciones, chefs y gerentes de compras.",
      "Transferencia Técnica (IT / Administración): Entrenamiento para gestión autónoma del panel y roles.",
    ],
    kpiTarget: "Operatividad continua blindada 24/7 y soberanía tecnológica total de tu equipo.",
  },
];

export function ProcessSection() {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const { openModal } = useLeadStore();
  const currentPhase = phases[activePhaseIndex];

  return (
    <section id="desarrollo" className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono font-bold text-zinc-800">
            <Sparkles className="w-3.5 h-3.5 text-zinc-700" />
            <span>METODOLOGÍA DE TRABAJO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Desarrollo
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Un método estructurado en 4 fases que garantiza la digitalización, automatización y soberanía tecnológica de tu negocio gastronómico sin detener el servicio ni un solo día.
          </p>
        </div>

        {/* 4-Phase Stepper */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Step Selectors */}
          <div className="lg:col-span-5 space-y-3">
            {phases.map((p, index) => {
              const isActive = activePhaseIndex === index;

              // Distinct color styles per phase
              const phaseColors = [
                {
                  activeBox: "bg-sky-600 text-white shadow-md shadow-sky-500/25",
                  inactiveBox: "bg-sky-50 text-sky-700 border border-sky-200",
                  activeBorder: "border-sky-600 ring-2 ring-sky-500/20 bg-sky-50/40",
                  badge: "bg-sky-100 text-sky-800 border-sky-200",
                },
                {
                  activeBox: "bg-indigo-600 text-white shadow-md shadow-indigo-500/25",
                  inactiveBox: "bg-indigo-50 text-indigo-700 border border-indigo-200",
                  activeBorder: "border-indigo-600 ring-2 ring-indigo-500/20 bg-indigo-50/40",
                  badge: "bg-indigo-100 text-indigo-800 border-indigo-200",
                },
                {
                  activeBox: "bg-fuchsia-600 text-white shadow-md shadow-fuchsia-500/25",
                  inactiveBox: "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200",
                  activeBorder: "border-fuchsia-600 ring-2 ring-fuchsia-500/20 bg-fuchsia-50/40",
                  badge: "bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200",
                },
                {
                  activeBox: "bg-emerald-600 text-white shadow-md shadow-emerald-500/25",
                  inactiveBox: "bg-emerald-50 text-emerald-700 border border-emerald-200",
                  activeBorder: "border-emerald-600 ring-2 ring-emerald-500/20 bg-emerald-50/40",
                  badge: "bg-emerald-100 text-emerald-800 border-emerald-200",
                },
              ][index];

              return (
                <div
                  key={p.number}
                  onClick={() => setActivePhaseIndex(index)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
                    isActive
                      ? `bg-white shadow-md ${phaseColors.activeBorder}`
                      : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm shrink-0 transition-all ${
                      isActive ? phaseColors.activeBox : phaseColors.inactiveBox
                    }`}
                  >
                    {p.number}
                  </div>

                  <div className="space-y-1">
                    <h4 className={`text-sm sm:text-base font-bold transition-colors ${isActive ? "text-slate-900" : "text-slate-700"}`}>
                      {p.name}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1">
                      {p.enfoque}
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
                <span>0{activePhaseIndex + 1} // FASE {currentPhase.number}</span>
                <span className="text-slate-700 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-sm text-[11px]">
                  {currentPhase.enfoque}
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

              <div className="grid grid-cols-1 gap-2.5">
                {currentPhase.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white rounded-xl border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700 font-medium shadow-sm leading-relaxed"
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
                <div className="text-xs sm:text-sm font-bold text-slate-900">
                  {currentPhase.kpiTarget}
                </div>
              </div>

              <Button
                variant="primary"
                size="sm"
                onClick={openModal}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="shrink-0"
              >
                Solicitar Diagnóstico
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

