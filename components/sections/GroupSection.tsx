"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Sparkles, ArrowUpRight, Building2, Layers, Globe } from "lucide-react";

interface GroupCompany {
  name: string;
  domain: string;
  url: string;
  tag: string;
  description: string;
  badge: string;
  accentGradient: string;
}

const COMPANIES: GroupCompany[] = [
  {
    name: "Inteligencia Neuronal",
    domain: "www.inteligencianeuronal.com",
    url: "https://www.inteligencianeuronal.com",
    tag: "IA & INGENIERÍA OPERATIVA",
    description:
      "Arquitectura tecnológica, automatización agéntica con IA y optimización de márgenes operativos para cadenas y marcas gastronómicas.",
    badge: "HOLDING MATRIZ",
    accentGradient: "from-blue-600 via-indigo-600 to-fuchsia-600",
  },
  {
    name: "Glubbi",
    domain: "www.glubbi.app",
    url: "https://www.glubbi.app",
    tag: "SISTEMA OPERATIVO FOODTECH",
    description:
      "Plataforma SaaS de canal directo, menús QR interactivos, Kitchen Display Systems (KDS) en tiempo real y fidelización de clientes.",
    badge: "SOFTWARE SAAS",
    accentGradient: "from-cyan-500 to-blue-600",
  },
  {
    name: "Julio Daza Celis",
    domain: "www.dazajulio.com",
    url: "https://www.dazajulio.com",
    tag: "DIRECCIÓN EJECUTIVA & DEV",
    description:
      "Consultoría de alta dirección, arquitectura de software enterprise y liderazgo en ingeniería gastronómica e inteligencia artificial.",
    badge: "CONSULTORÍA & LEADERSHIP",
    accentGradient: "from-fuchsia-600 to-rose-500",
  },
];

export function GroupSection() {
  return (
    <section id="grupo" className="py-16 sm:py-28 bg-slate-50 border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-300 text-xs font-mono font-bold text-slate-800 shadow-sm">
            <Building2 className="w-3.5 h-3.5 text-slate-700" />
            <span>05 // ECOSISTEMA CORPORATIVO // HOLDING GROUP</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
            Inteligencia Neuronal Group
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Ecosistema de empresas de tecnología, plataformas SaaS e ingeniería operativa dedicadas al desarrollo de software y transformación gastronómica.
          </p>
        </div>

        {/* 3 Brand Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {COMPANIES.map((company, index) => (
            <a
              key={index}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-7 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-left"
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${company.accentGradient}`} />

              <div>
                <div className="flex items-center justify-between mb-5 pt-1">
                  <span className="font-mono text-[10px] font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                    {company.badge}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 group-hover:text-slate-900 transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1 group-hover:text-indigo-600 transition-colors">
                  {company.name}
                </h3>

                <div className="font-mono text-xs font-bold text-sky-600 mb-4 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{company.domain}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {company.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-800 group-hover:text-slate-900">
                <span className="font-mono text-[11px] text-slate-500 uppercase tracking-wider">{company.tag}</span>
                <span className="flex items-center gap-1 group-hover:underline underline-offset-4 text-indigo-600 font-bold">
                  Visitar web <ExternalLink className="w-3 h-3" />
                </span>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
