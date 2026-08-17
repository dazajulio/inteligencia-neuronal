"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Activity, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLeadStore } from "@/store/useLeadStore";

interface FloatingTag {
  id: string;
  title: string;
  badge: string;
  metric: string;
  subMetric: string;
  positionClasses: string;
}

export function HeroSection() {
  const { openModal } = useLeadStore();
  const [hoveredTag, setHoveredTag] = useState<string | null>(null);

  // 4 Gourmet dish tags only (LOGÍSTICA BoH removed as requested)
  const tags: FloatingTag[] = [
    {
      id: "steak",
      title: "Corte Steak Prime",
      badge: "BoH_101 Set",
      metric: "Food Cost: 28.2%",
      subMetric: "Rendimiento: 88.8%",
      positionClasses: "bottom-[12%] left-[36%] lg:bottom-[16%] lg:left-[43%]",
    },
    {
      id: "vegetables",
      title: "Vegetales Glaseados",
      badge: "BoH_102 Set",
      metric: "Food Cost: 16.5%",
      subMetric: "Merma Cocción: 4.2%",
      positionClasses: "bottom-[10%] left-[55%] lg:bottom-[12%] lg:left-[64%]",
    },
    {
      id: "seafood",
      title: "Camarones & Mariscos",
      badge: "BoH_103 Set",
      metric: "Food Cost: 26.4%",
      subMetric: "PO Auto a Proveedor",
      positionClasses: "bottom-[22%] left-[64%] lg:bottom-[25%] lg:left-[70%]",
    },
    {
      id: "dessert",
      title: "Tarta Artesanal",
      badge: "BoH_104 Set",
      metric: "Margen Bruto: 81.5%",
      subMetric: "Alérgenos Auditados OK",
      positionClasses: "bottom-[14%] left-[78%] lg:bottom-[15%] lg:left-[83%]",
    },
  ];

  return (
    <section className="relative w-full min-h-[92vh] lg:min-h-[96vh] bg-white overflow-hidden flex items-center">
      
      {/* ── FULL-BLEED PANORAMIC HERO BACKGROUND (100vw, Unboxed) ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-main.jpg"
          alt="Inteligencia Neuronal - Inteligencia Operativa y Automatización Gastronómica"
          fill
          priority
          className="object-cover object-right lg:object-center select-none"
        />

        {/* Lateral Soft Reading Gradient on Left (x: 0-40%) to ensure pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 sm:via-white/60 to-transparent w-full lg:w-1/2 pointer-events-none" />

        {/* Seamless bottom transition into Services */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc]/40 to-transparent pointer-events-none" />
      </div>

      {/* ── LEFT COLUMN: Text Content & CTA (x: 0-45%) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-16 lg:py-24">
        <div className="max-w-xl space-y-6 text-left">
          
          {/* Tag Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100/90 backdrop-blur-sm border border-zinc-200 text-xs font-bold text-zinc-800 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-zinc-800 animate-pulse" />
            <span>ARQUITECTURA TECNOLÓGICA & DASHBOARDS</span>
          </div>

          {/* H1 Exact Headline */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.85rem] font-bold tracking-tight text-slate-900 leading-[1.12]">
            Arquitectura Tecnológica y Automatización para la Industria de la Gastronomía.
          </h1>

          {/* H2 Subtitle */}
          <h2 className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed">
            Transformamos operaciones en ecosistemas precisos, escalables y altamente rentables mediante Inteligencia Artificial.
          </h2>

          {/* CTA Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={openModal}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="text-base font-bold shadow-lg px-8 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white"
            >
              Me Interesa
            </Button>

            <a
              href="#servicios"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-slate-700 hover:text-slate-900 rounded-xl border border-slate-300 bg-white/90 backdrop-blur-sm hover:bg-white transition-colors shadow-sm"
            >
              Ver Servicios
            </a>
          </div>

          {/* Trust Assurances */}
          <div className="pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-600">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-zinc-700" /> NDA Confidencial
            </span>
            <span className="flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-emerald-600" /> Monitoreo 24/7
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#c49258]" /> Zero-Training Policy
            </span>
          </div>

        </div>
      </div>

      {/* ── 3D HOLOGRAPHIC OVERLAY ON DISHES (Glubbi badge & Kitchen tag removed) ── */}
      <div className="absolute inset-0 z-20 pointer-events-none hidden md:block">
        
        {/* Floating Data Tags Over Dishes */}
        {tags.map((tag) => {
          const isHovered = hoveredTag === tag.id;
          return (
            <div
              key={tag.id}
              className={`absolute ${tag.positionClasses} pointer-events-auto cursor-pointer transition-all duration-300`}
              onMouseEnter={() => setHoveredTag(tag.id)}
              onMouseLeave={() => setHoveredTag(null)}
            >
              <div
                className={`p-2.5 rounded-2xl backdrop-blur-md border transition-all duration-300 shadow-2xl flex flex-col gap-0.5 ${
                  isHovered
                    ? "bg-slate-950/95 border-cyan-300 scale-110 shadow-[0_0_25px_rgba(0,229,255,0.4)]"
                    : "bg-slate-900/85 border-cyan-400/40 hover:border-cyan-300"
                }`}
              >
                <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                  <span className="text-cyan-300 font-bold tracking-wider">{tag.badge}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                </div>

                <div className="text-xs font-bold text-white tracking-tight font-sans">
                  {tag.title}
                </div>

                <div className="flex items-center justify-between gap-3 pt-1 border-t border-slate-700/60 text-[10px] font-mono">
                  <span className="text-emerald-400 font-bold">{tag.metric}</span>
                  <span className="text-zinc-300">{tag.subMetric}</span>
                </div>
              </div>

              {/* Pinpoint Connection Line */}
              <div className="w-[1px] h-3.5 bg-gradient-to-b from-cyan-400/80 to-transparent mx-auto mt-0.5" />
            </div>
          );
        })}

      </div>

    </section>
  );
}
