"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Timer, Phone, ShieldCheck, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLeadStore } from "@/store/useLeadStore";

export function Footer() {
  const { openModal } = useLeadStore();

  return (
    <footer id="agencia" className="w-full bg-zinc-950 text-zinc-400 font-sans pt-16 pb-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Central Wide Footer CTA */}
        <div className="text-center max-w-2xl mx-auto space-y-5 bg-zinc-900/80 p-8 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-xs font-semibold text-zinc-300">
            <span>SOPORTE E INFRAESTRUCTURA DEDICADA</span>
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
            ¿Listo para blindar tus operaciones y márgenes?
          </h3>
          <p className="text-sm text-zinc-400">
            Agenda una sesión de diagnóstico técnico con un especialista en ingeniería gastronómica.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={openModal}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto px-10 py-4 text-base font-bold shadow-lg bg-zinc-100 hover:bg-white text-zinc-900"
            >
              Obtener IT Soporte
            </Button>
          </div>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-zinc-900">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex items-center justify-center">
                <Image src="/logo.png" alt="Inteligencia Neuronal Logo" fill className="object-contain" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-white select-none">
                Inteligencia Neuronal
              </span>
            </Link>
            
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
              Firma de arquitectura tecnológica y automatización operativa especializada en cadenas de restaurantes, dark kitchens y plantas de alimentos.
            </p>

            <div className="space-y-2 pt-2 text-xs font-mono text-zinc-500">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-zinc-600" />
                <span>Teléfono Directo: +58(414) 881-7137</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-zinc-600" />
                <span>Acuerdos de Confidencialidad (NDA) Corporativos</span>
              </div>
            </div>
          </div>

          {/* Col 2: Servicios */}
          <div className="space-y-3 text-sm">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Servicios
            </h4>
            <ul className="space-y-2 text-zinc-500">
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Auditoría Inteligente
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Automatización (RPA & IA)
                </a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-white transition-colors">
                  Infraestructura FoodTech
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Metodología */}
          <div className="space-y-3 text-sm">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Como Trabajo
            </h4>
            <ul className="space-y-2 text-zinc-500">
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
            <ul className="space-y-2 text-zinc-500">
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-zinc-600" />
                <span>Blindaje de Recetas Maestras</span>
              </li>
              <li>Aislamiento Multi-Tenant (RLS)</li>
              <li>Cumplimiento HACCP Digital</li>
              <li>SLA de Disponibilidad 99.98%</li>
            </ul>
          </div>

        </div>

        {/* B2C Exit - Agencia Academy */}
        <div className="text-center py-6 border-b border-zinc-900/50">
          <p className="text-sm text-zinc-500">
            ¿Buscas capacitar a tu equipo interno o formarte en la implementación tecnológica?{" "}
            <a href="#" className="text-zinc-300 underline underline-offset-4 hover:text-white transition-colors">
              Explora nuestros recursos y bases de conocimiento en Agencia Academy.
            </a>
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600">
          <div>
            &copy; {new Date().getFullYear()} Inteligencia Neuronal. Todos los derechos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-semibold text-zinc-500">Infraestructura Enterprise 2026</span>
            <span>&bull;</span>
            <a href="https://www.dazajulio.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-white rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5">
              Powered By. www.dazajulio.com
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
