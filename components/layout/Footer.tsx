"use client";

import React from "react";
import Link from "next/link";
import { Timer, Phone, ShieldCheck, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLeadStore } from "@/store/useLeadStore";

export function Footer() {
  const { openModal } = useLeadStore();

  return (
    <footer id="agencia" className="w-full bg-slate-900 text-slate-400 font-sans pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Central Wide Footer CTA (~50% viewport width) */}
        <div className="text-center max-w-2xl mx-auto space-y-5 bg-slate-800/80 p-8 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-500/30 text-xs font-semibold text-cyan-300">
            <span>SOPORTE E INFRAESTRUCTURA DEDICADA</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            ¿Listo para blindar tus operaciones y márgenes?
          </h3>
          <p className="text-sm text-slate-300">
            Agenda una sesión de diagnóstico técnico con un especialista en ingeniería gastronómica.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={openModal}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto px-10 py-4 text-base font-bold shadow-[0_4px_20px_0_rgba(2,132,199,0.5)]"
            >
              Obtener IT Soporte
            </Button>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center relative">
                <Timer className="w-4 h-4 text-white" />
                <div className="absolute -top-1 w-2 h-1 bg-white rounded-sm" />
              </div>
              <span className="font-script text-3xl sm:text-4xl font-bold tracking-tight text-white select-none leading-none">
                Inteligencia Neuronal
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Firma de arquitectura tecnológica y automatización operativa especializada en cadenas de restaurantes, dark kitchens y plantas de alimentos.
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#0284c7]" />
                <span>Teléfono Directo: +58(414) 881-7137</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Acuerdos de Confidencialidad (NDA) Corporativos</span>
              </div>
            </div>
          </div>

          {/* Col 2: Servicios */}
          <div className="space-y-3 text-sm">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Servicios
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Automatización de Compras
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Rentabilidad y Estandarización
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Ecosistemas Propios (KDS)
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Motores de Adquisición
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Metodología */}
          <div className="space-y-3 text-sm">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Como Trabajo
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#como-trabajo" className="hover:text-white transition-colors">
                  Fase 1: Diagnóstico de Fugas
                </a>
              </li>
              <li>
                <a href="#como-trabajo" className="hover:text-white transition-colors">
                  Fase 2: Arquitectura & SOPs
                </a>
              </li>
              <li>
                <a href="#como-trabajo" className="hover:text-white transition-colors">
                  Fase 3: Despliegue en Vivo
                </a>
              </li>
              <li>
                <a href="#como-trabajo" className="hover:text-white transition-colors">
                  Fase 4: Infraestructura AaaS
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Seguridad */}
          <div className="space-y-3 text-sm">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Seguridad & Legal
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                <span>Blindaje de Recetas Maestras</span>
              </li>
              <li>Aislamiento Multi-Tenant (RLS)</li>
              <li>Cumplimiento HACCP Digital</li>
              <li>SLA de Disponibilidad 99.98%</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Inteligencia Neuronal. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#0284c7] font-semibold">Infraestructura Enterprise 2026</span>
            <span>&bull;</span>
            <span>Zero-Training Data Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
