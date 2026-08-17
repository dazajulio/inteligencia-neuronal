"use client";

import React from "react";
import { BookOpen, Code, LineChart, FileSpreadsheet, Calculator, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLeadStore } from "@/store/useLeadStore";

const programs = [
  {
    title: "Masterclass de IA para Restaurantes",
    description: "Automatización de la Operación y Servicio al Cliente mediante Inteligencia Artificial.",
    icon: <BookOpen className="w-5 h-5" />,
    level: "Avanzado",
    time: "4 Semanas",
  },
  {
    title: "Bootcamp Técnico",
    description: "Despliegue de Arquitecturas con n8n: Conectando la Cocina con el Flujo de Caja.",
    icon: <Code className="w-5 h-5" />,
    level: "Experto",
    time: "6 Semanas",
  },
  {
    title: "Gestión de Crecimiento",
    description: "SEO Local y Dominio Digital para Marcas Gastronómicas.",
    icon: <LineChart className="w-5 h-5" />,
    level: "Intermedio",
    time: "2 Semanas",
  }
];

const assets = [
  {
    title: "Arquitectura de Menú",
    description: "Plantillas de Fichas Técnicas Avanzadas y Estandarización de Recetas.",
    icon: <FileSpreadsheet className="w-5 h-5" />,
    type: "Plantilla Excel/Notion",
  },
  {
    title: "Control de Rentabilidad",
    description: "Matrices de Costeo y Parametrización de Macronutrientes (Raw-to-Cooked).",
    icon: <Calculator className="w-5 h-5" />,
    type: "Sistema Automatizado",
  },
  {
    title: "Protección Operativa",
    description: "Sistemas HACCP Listos para Implementación y Checklists de Apertura/Cierre.",
    icon: <ShieldCheck className="w-5 h-5" />,
    type: "Protocolo Operativo",
  }
];

export function AcademySection() {
  const { openModal } = useLeadStore();

  return (
    <section id="academy" className="py-24 sm:py-32 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Academy Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-200/50 border border-zinc-300 text-sm font-bold text-zinc-600 uppercase tracking-widest">
            Inteligencia Neuronal Academy
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-tight">
            Transferencia de Conocimiento: <br className="hidden sm:block" /><span className="text-sky-500">El Estándar Operativo del Futuro.</span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-600 font-medium leading-relaxed max-w-3xl mx-auto">
            Capacitación ejecutiva, sistemas de Inteligencia Artificial y recursos de ingeniería de menú diseñados para dueños, gerentes y operadores gastronómicos que buscan el control total de sus márgenes.
          </p>
          <div className="pt-4">
            <Button
              size="lg"
              className="px-8 shadow-xl hover:-translate-y-1 transition-transform bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => {
                document.getElementById('programas')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explorar Programas y Recursos
            </Button>
          </div>
        </div>

        {/* Content Blocks */}
        <div id="programas" className="space-y-16">
          
          {/* Bloque 1: Programas de Formación */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 pb-4 border-b border-zinc-200">
              <h3 className="font-heading text-2xl font-bold text-zinc-900">Programas de Formación (Cursos Estratégicos)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {programs.map((prog, idx) => (
                <div key={idx} className="bg-white border border-zinc-200 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-zinc-100 rounded-2xl flex items-center justify-center text-zinc-700 mb-6 group-hover:bg-[#3c3c3c] group-hover:text-white transition-colors">
                    {prog.icon}
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 mb-3 leading-snug">{prog.title}</h4>
                  <p className="text-sm text-zinc-600 mb-6 min-h-[60px]">{prog.description}</p>
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-500 border-t border-zinc-100 pt-4">
                    <span>Nivel: {prog.level}</span>
                    <span>{prog.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bloque 2: Activos Operativos */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 pb-4 border-b border-zinc-200">
              <h3 className="font-heading text-2xl font-bold text-zinc-900">Activos Operativos (Recursos y Plantillas)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Card 1: Cyan/Azul Claro */}
              <div className="bg-white border-2 border-sky-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-sky-400 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-400/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-sky-600 mb-6 group-hover:bg-sky-500 group-hover:text-white transition-colors">
                    {assets[0].icon}
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 mb-3 leading-snug">{assets[0].title}</h4>
                  <p className="text-sm text-zinc-600 mb-6 min-h-[60px]">{assets[0].description}</p>
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-sky-600 border-t border-sky-100 pt-4">
                    <span>{assets[0].type}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Card 2: Magenta/Rosa */}
              <div className="bg-white border-2 border-pink-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-pink-500 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center text-pink-600 mb-6 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                    {assets[1].icon}
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 mb-3 leading-snug">{assets[1].title}</h4>
                  <p className="text-sm text-zinc-600 mb-6 min-h-[60px]">{assets[1].description}</p>
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-pink-600 border-t border-pink-100 pt-4">
                    <span>{assets[1].type}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Card 3: Naranja/Amarillo */}
              <div className="bg-white border-2 border-orange-100 p-8 rounded-3xl shadow-sm hover:shadow-xl hover:border-orange-400 hover:-translate-y-1.5 transition-all duration-300 group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                    {assets[2].icon}
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 mb-3 leading-snug">{assets[2].title}</h4>
                  <p className="text-sm text-zinc-600 mb-6 min-h-[60px]">{assets[2].description}</p>
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-orange-600 border-t border-orange-100 pt-4">
                    <span>{assets[2].type}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* El Cierre Estratégico (Upsell B2B) */}
        <div className="mt-20 p-10 sm:p-14 bg-white border border-zinc-200 rounded-3xl shadow-lg text-center max-w-5xl mx-auto space-y-8">
          <h3 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-900">
            ¿Prefiere que nuestro equipo despliegue estos sistemas en su operación?
          </h3>
          <p className="text-base sm:text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            La teoría transforma mentes, pero la implementación transforma resultados. Descubra cómo Inteligencia Neuronal puede auditar e integrar esta tecnología directamente en su restaurante.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={openModal}
              className="px-8"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Agendar Sesión de Diagnóstico B2B
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
}
