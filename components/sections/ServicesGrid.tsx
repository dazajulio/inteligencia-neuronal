"use client";

import React, { useState } from "react";
import { ArrowRight, RotateCw, CheckCircle2, Search, Bot, Server, Sparkles, CreditCard, Touchpad } from "lucide-react";
import { useLeadStore } from "@/store/useLeadStore";

interface SolutionCardData {
  id: string;
  stepNumber: string;
  stripeColor: string;
  front: {
    badge: string;
    title: string;
    subtitle?: string;
    description: string;
    icon: React.ReactNode;
    microText: string;
  };
  back: {
    badge: string;
    title: string;
    points: { title: string; desc: string }[];
    deliverable?: string;
    microText: string;
  };
  externalCta?: {
    label: string;
    price: string;
    actionLabel: string;
  };
}

export function ServicesGrid() {
  const { openModal } = useLeadStore();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const solutions: SolutionCardData[] = [
    {
      id: "auditoria",
      stepNumber: "01",
      stripeColor: "from-[#1DACE3] via-[#0284c7] to-[#971B8D]",
      front: {
        badge: "PASO 01 // AUDITORÍA",
        title: "Auditoría de Ecosistema Digital",
        description:
          "Análisis profundo de la infraestructura tecnológica y operativa de la empresa. Presencia online completa (Google, mapas, motores de IA). Cómo funciona tu empresa hoy para detectar qué procesos te están costando clientes, márgenes de ganancia y horas de trabajo manual. Te entregamos un plan claro y sin complicaciones técnicas para saber qué corregir y por dónde empezar a modernizarte.",
        icon: <Search className="w-6 h-6 text-sky-600" />,
        microText: "Toca para ver qué evaluamos ⟳",
      },
      back: {
        badge: "QUÉ EVALUAMOS EN TU NEGOCIO",
        title: "¿Qué incluye este diagnóstico?",
        points: [
          {
            title: "Visibilidad & Búsqueda (SEO / AEO)",
            desc: "Auditamos cómo te encuentran en Google, Google Maps, directorios clave y motores de IA (ChatGPT, Gemini). Revisamos sitemaps, indexación y robots.",
          },
          {
            title: "Captura de Pedidos & Fricción",
            desc: "Medimos la velocidad de conversión a mesa o pedido real y el margen cedido a intermediarios de delivery.",
          },
          {
            title: "Datos & Automatización",
            desc: "Identificamos procesos repetitivos de atención o gestión para delegar en sistemas autónomos.",
          },
        ],
        deliverable:
          "Desplegamos un equipo de agentes digitales en tu infraestructura privada que no solo responden, sino que escriben en tu CRM, gestionan incidencias, trackean inventario y facturan.",
        microText: "Toca para volver al resumen ⟲",
      },
      externalCta: {
        label: "1. Auditoría de Ecosistema Digital",
        price: "$450 USD",
        actionLabel: "Contratar Ya",
      },
    },
    {
      id: "automatizacion",
      stepNumber: "02",
      stripeColor: "from-[#971B8D] via-[#EA0C7F] to-[#FEAD2B]",
      front: {
        badge: "PASO 02 // IMPLEMENTACIÓN",
        title: "Sistemas Agénticos Autónomos",
        subtitle: "Asistentes de Inteligencia Artificial que trabajan 24/7 en tu operación.",
        description:
          "Ponemos a trabajar un equipo de agentes inteligentes en tu negocio. Atienden clientes en WhatsApp, toman pedidos, controlan tus compras y organizan tus datos en tiempo real para que tu equipo humano se enfoque en cocinar y atender con excelencia.",
        icon: <Bot className="w-6 h-6 text-fuchsia-600" />,
        microText: "Toca para conocer a tus agentes ⟳",
      },
      back: {
        badge: "EQUIPO DIGITAL DISPONIBLE",
        title: "¿Qué hacen estos agentes por ti?",
        points: [
          {
            title: "Agente de Ventas & WhatsApp",
            desc: "Responde al instante, toma pedidos directos con menú interactivo, agenda reservas y cobra sin demoras.",
          },
          {
            title: "Agente de Compras & Abastecimiento",
            desc: "Monitorea stock en tiempo real, predice ingredientes según ventas y prepara órdenes a proveedores.",
          },
          {
            title: "Agente de Control & Datos (CRM/ERP)",
            desc: "Organiza automáticamente datos de clientes y ventas en base de datos segura sin hojas de cálculo.",
          },
        ],
        deliverable:
          "Infraestructura digital configurada, entrenada y lista para operar de inmediato en tu empresa.",
        microText: "Toca para volver al resumen ⟲",
      },
      externalCta: {
        label: "2. Sistemas Agénticos Autónomos",
        price: "$450 - $950 USD",
        actionLabel: "Contratar Ya",
      },
    },
    {
      id: "infraestructura",
      stepNumber: "03",
      stripeColor: "from-[#FEAD2B] via-[#ea580c] to-[#1DACE3]",
      front: {
        badge: "PASO 03 // INFRAESTRUCTURA",
        title: "Infraestructura & Plataformas FoodTech",
        subtitle: "Tu propia tecnología para vender sin intermediarios ni comisiones.",
        description:
          "Desarrollamos la plataforma digital completa y privada de tu marca. Menús QR interactivos, sistema de pedidos directos para delivery/takeaway, pantallas de cocina (KDS) en tiempo real y paneles de control gerenciales para supervisar tus ventas desde cualquier lugar.",
        icon: <Server className="w-6 h-6 text-amber-600" />,
        microText: "Toca para ver módulos de software ⟳",
      },
      back: {
        badge: "ECOSISTEMA PROPIETARIO",
        title: "Módulos de tu Plataforma Digital",
        points: [
          {
            title: "Canal Directo & Menú QR",
            desc: "Catálogo interactivo en mesa/takeaway con pasarela de pagos integrada directamente a tu cuenta.",
          },
          {
            title: "Kitchen Display System (KDS)",
            desc: "Pantallas de cocina en milisegundos. Elimina impresoras térmicas, comandas y errores de pase.",
          },
          {
            title: "Dashboard Gerencial & Datos",
            desc: "Métricas financieras, geofencing de reparto y servidores dedicados con bases de datos aisladas.",
          },
        ],
        deliverable:
          "Aplicación web y móvil desplegada bajo tu propio dominio y marca.",
        microText: "Toca para volver al resumen ⟲",
      },
      externalCta: {
        label: "3. Infraestructura & Plataformas FoodTech",
        price: "$1,150 - $5,000 USD",
        actionLabel: "Contratar Ya",
      },
    },
  ];

  return (
    <section id="soluciones" className="pt-16 pb-24 sm:pt-20 sm:pb-32 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-mono font-bold text-sky-800 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>01 // SOLUCIONES OPERATIVAS // HIGH-TICKET B2B</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Soluciones Tecnológicas
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Arquitectura de servicios y agentes inteligentes diseñados para blindar la rentabilidad y soberanía operativa de tu marca gastronómica.
          </p>
          <div className="inline-block md:hidden text-[11px] font-mono text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            💡 Toca cualquier tarjeta para girarla y ver detalles técnicos
          </div>
        </div>

        {/* 3 Cards Grid with 3D Flip Card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {solutions.map((card) => {
            const isFlipped = !!flippedCards[card.id];

            return (
              <div key={card.id} className="flex flex-col gap-4">
                {/* 3D Flip Container */}
                <div
                  onClick={() => toggleFlip(card.id)}
                  className="perspective-1000 w-full min-h-[500px] sm:min-h-[530px] cursor-pointer group"
                >
                  <div
                    className={`relative w-full h-full duration-500 transform-style-3d transform-gpu will-change-transform transition-transform ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                  >
                    
                    {/* ── CARA FRONTAL (FRONT) ── */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.05)] group-hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)] group-hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                      {/* Top Color Stripe */}
                      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${card.stripeColor}`} />
                      
                      <div>
                        {/* Header Badge & Icon */}
                        <div className="flex items-center justify-between gap-2 mb-4 pt-1">
                          <span className="font-mono text-[11px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                            {card.front.badge}
                          </span>
                          <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                            {card.front.icon}
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <h3 className="text-xl font-bold text-slate-900 tracking-tight leading-snug mb-2">
                          {card.front.title}
                        </h3>

                        {card.front.subtitle && (
                          <p className="text-xs font-semibold text-indigo-600 mb-3">
                            {card.front.subtitle}
                          </p>
                        )}

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                          {card.front.description}
                        </p>
                      </div>

                      {/* Bottom Micro-text & Action */}
                      <div className="pt-4 border-t border-slate-100 space-y-3">
                        <div className="flex items-center justify-between text-xs font-mono font-medium text-slate-500 bg-slate-50 p-2 rounded-xl border border-slate-100">
                          <span className="flex items-center gap-1.5">
                            <RotateCw className="w-3.5 h-3.5 text-indigo-600 animate-spin-slow" />
                            {card.front.microText}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal();
                          }}
                          className="w-full text-xs font-bold flex items-center justify-center gap-2 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                        >
                          <span>Solicitar Diagnóstico</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                    {/* ── CARA POSTERIOR (BACK) ── */}
                    <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl border border-slate-800 bg-slate-950 text-white p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden">
                      {/* Top Color Stripe */}
                      <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${card.stripeColor}`} />
                      
                      <div>
                        {/* Header Badge */}
                        <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                          <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-cyan-300 border border-cyan-400/30">
                            {card.back.badge}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 font-bold">DETALLES TÉCNICOS</span>
                        </div>

                        <h4 className="text-lg font-bold text-white mb-3">
                          {card.back.title}
                        </h4>

                        {/* Points List */}
                        <div className="space-y-2.5">
                          {card.back.points.map((pt, idx) => (
                            <div key={idx} className="text-left">
                              <div className="flex items-start gap-1.5 text-xs font-bold text-slate-200">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{pt.title}</span>
                              </div>
                              <p className="text-[11px] text-slate-400 pl-5 leading-relaxed">
                                {pt.desc}
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Deliverable note */}
                        {card.back.deliverable && (
                          <p className="text-[10px] font-mono text-cyan-300/90 mt-3 pt-2.5 border-t border-white/10 leading-relaxed">
                            {card.back.deliverable}
                          </p>
                        )}
                      </div>

                      {/* Bottom Micro-text & Action */}
                      <div className="pt-3 border-t border-white/10 space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-mono font-medium text-cyan-300 bg-white/5 p-2 rounded-xl border border-white/10">
                          <span className="flex items-center gap-1.5">
                            <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                            {card.back.microText}
                          </span>
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal();
                          }}
                          className="w-full text-xs font-bold flex items-center justify-center gap-2 cursor-pointer bg-white hover:bg-slate-100 text-slate-950 px-5 py-3 rounded-xl shadow-md transition-all font-bold"
                        >
                          <span>Solicitar Diagnóstico</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>

                  </div>
                </div>

                {/* External Decoupled Button */}
                {card.externalCta && (
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex items-center justify-between gap-3">
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-900">{card.externalCta.label}</div>
                      <div className="text-sm font-extrabold text-slate-900 font-mono">{card.externalCta.price}</div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal();
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#d946ef] hover:from-[#0369a1] hover:via-[#4f46e5] hover:to-[#c026d3] text-white text-xs font-bold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 hover:-translate-y-0.5 transition-all shrink-0"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>{card.externalCta.actionLabel}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
