"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Code, LineChart, Download, ArrowRight, RotateCw, CheckCircle2, Sparkles, FileSpreadsheet, ShieldCheck, Layers, Cpu } from "lucide-react";

export function AcademySection() {
  const [flippedCourse, setFlippedCourse] = useState<Record<string, boolean>>({});
  const [flippedToolkit, setFlippedToolkit] = useState(false);

  const toggleCourseFlip = (id: string) => {
    setFlippedCourse((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const courses = [
    {
      id: "ia-restaurantes",
      badge: "MÁS POPULAR",
      level: "Operativo & Estratégico",
      title: "Masterclass de IA para Restaurantes",
      subtitle: "Automatización de la Operación mediante Inteligencia Artificial.",
      description: "Aprende a desplegar asistentes de IA que atienden clientes por WhatsApp, toman pedidos directos, controlan mermas de cocina y blindan tus recetas.",
      price: "$97 USD",
      icon: <BookOpen className="w-6 h-6 text-zinc-700" />,
      tools: ["OpenAI API", "Claude 3.5", "WhatsApp API", "Airtable"],
      modules: [
        "Arquitectura de Prompts & Escandallos",
        "Agente de Ventas & Reservas 24/7",
        "Supervisión & Mitigación de Alucinaciones",
        "Integración en el Negocio Real",
      ],
    },
    {
      id: "bootcamp-n8n",
      badge: "TÉCNICO / DEV",
      level: "Avanzado",
      title: "Bootcamp Técnico",
      subtitle: "Despliegue de Arquitecturas con n8n: Conectando tu negocio con agentes de automatizacion.",
      description: "Aprende a montar la infraestructura digital y de automatización sobre servidores VPS propios con Docker, bases de datos PostgreSQL y webhooks de Meta.",
      price: "$197 USD",
      icon: <Code className="w-6 h-6 text-zinc-700" />,
      tools: ["n8n Self-Hosted", "Docker", "PostgreSQL", "Meta Webhooks"],
      modules: [
        "Despliegue VPS con Docker & SSL",
        "Meta Cloud API & Webhooks Reversos",
        "Conexión a Bases de Datos Relacionales",
        "Alertas Críticas y Monitoreo 24/7",
      ],
    },
    {
      id: "gestion-crecimiento",
      badge: "CRECIMIENTO B2C",
      level: "Marketing & Adquisición",
      title: "Gestión de Crecimiento",
      subtitle: "SEO/AEO Local y Dominio Digital para Marcas Gastronómicas.",
      description: "Domina la presencia de tu restaurante en Google Maps y sé la opción prioritaria recomendada por motores de Inteligencia Artificial como ChatGPT y Gemini.",
      price: "$67 USD",
      icon: <LineChart className="w-6 h-6 text-zinc-700" />,
      tools: ["Google Business", "Schema.org", "Perplexity", "JSON-LD"],
      modules: [
        "Indexación de Menús para Motores IA (AEO)",
        "Autoridad Local & Google Maps 360°",
        "Embudos de Tráfico Directo a WhatsApp",
      ],
    },
  ];

  return (
    <section id="academy" className="py-24 sm:py-32 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Academy Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-200/60 border border-zinc-300 text-xs font-bold text-zinc-700 uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-zinc-700" />
            <span>Inteligencia Neuronal Academy</span>
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-zinc-900 tracking-tight leading-tight">
            Transferencia de Conocimiento: <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#d946ef] bg-clip-text text-transparent">
              El Estándar Operativo del Futuro.
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-zinc-600 font-medium leading-relaxed max-w-3xl mx-auto">
            Capacitación ejecutiva, sistemas de Inteligencia Artificial y recursos de ingeniería de menú diseñados para dueños, gerentes y operadores gastronómicos que buscan el control total de sus márgenes.
          </p>
          <div className="pt-4">
            <Link
              href="/academy"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#d946ef] hover:from-[#0369a1] hover:via-[#4f46e5] hover:to-[#c026d3] text-white"
            >
              <span>EXPLORAR PROGRAMAS Y RECURSOS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Content Blocks */}
        <div id="programas" className="space-y-20">
          
          {/* Bloque 1: Programas de Formación */}
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-zinc-200">
              <div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-900">
                  Programas de Formación (Cursos Estratégicos)
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Haz clic en cualquier tarjeta para explorar el temario y herramientas del curso.
                </p>
              </div>
              <Link
                href="/academy#programas"
                className="text-xs font-mono font-bold text-zinc-700 hover:text-zinc-900 flex items-center gap-1"
              >
                <span>Ver Campus Virtual</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {courses.map((course) => {
                const isFlipped = !!flippedCourse[course.id];

                return (
                  <div
                    key={course.id}
                    onClick={() => toggleCourseFlip(course.id)}
                    className="perspective-1000 w-full h-[530px] cursor-pointer group"
                  >
                    <div
                      className={`relative w-full h-full duration-500 transform-style-3d transform-gpu will-change-transform transition-transform ${
                        isFlipped ? "rotate-y-180" : ""
                      }`}
                    >
                      {/* Cara Frontal */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl border border-zinc-200 bg-white p-7 sm:p-8 flex flex-col justify-between shadow-[0_4px_25px_rgba(0,0,0,0.04)] group-hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] group-hover:-translate-y-1 transition-all duration-300">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-4">
                            <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-800 border border-zinc-200">
                              {course.badge}
                            </span>
                            <span className="text-[11px] font-mono text-zinc-500">{course.level}</span>
                          </div>

                          <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center mb-4">
                            {course.icon}
                          </div>

                          <h4 className="text-xl font-bold text-zinc-900 mb-2 leading-snug">
                            {course.title}
                          </h4>
                          <p className="text-xs font-semibold text-zinc-700 mb-3">
                            {course.subtitle}
                          </p>
                          <p className="text-xs text-zinc-600 leading-relaxed line-clamp-4">
                            {course.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-zinc-100 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold font-mono text-zinc-900">{course.price}</span>
                            <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                              <span>(Toca para temario ⟳)</span>
                              <RotateCw className="w-3 h-3 text-zinc-500" />
                            </div>
                          </div>

                          <Link
                            href="/academy#programas"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full text-xs font-bold flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-3 rounded-xl shadow-md transition-all"
                          >
                            <span>IR AL PROGRAMA</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>

                      {/* Cara Posterior */}
                      <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl border border-zinc-300 bg-zinc-900 text-white p-7 sm:p-8 flex flex-col justify-between shadow-2xl">
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/10 text-cyan-300 border border-cyan-400/30">
                              TEMARIO DEL PROGRAMA
                            </span>
                            <span className="font-mono text-sm font-bold text-cyan-400">{course.price}</span>
                          </div>

                          <h4 className="text-lg font-bold text-white mb-3">
                            {course.title}
                          </h4>

                          <div className="space-y-2 mb-4">
                            {course.modules.map((m, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                <span>{m}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 border-t border-white/10">
                            <div className="text-[10px] font-mono text-zinc-400 mb-1.5">STACK & HERRAMIENTAS:</div>
                            <div className="flex flex-wrap gap-1.5">
                              {course.tools.map((t, idx) => (
                                <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/10 space-y-2.5">
                          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                            <span>(Toca para volver ⟲)</span>
                            <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
                          </div>

                          <Link
                            href="/academy#programas"
                            onClick={(e) => e.stopPropagation()}
                            className="w-full text-xs font-bold flex items-center justify-center gap-2 bg-white hover:bg-zinc-100 text-zinc-900 px-5 py-3 rounded-xl shadow-md transition-all"
                          >
                            <span>IR AL PROGRAMA</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bloque 2: Activos Operativos (Recursos y Plantillas) */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 pb-4 border-b border-zinc-200">
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-zinc-900">
                Activos Operativos (Recursos y Plantillas)
              </h3>
            </div>

            {/* Single 3D Flip Card for Toolkit */}
            <div className="max-w-2xl mx-auto">
              <div
                onClick={() => setFlippedToolkit(!flippedToolkit)}
                className="perspective-1000 w-full h-[530px] cursor-pointer group"
              >
                <div
                  className={`relative w-full h-full duration-500 transform-style-3d transform-gpu will-change-transform transition-transform ${
                    flippedToolkit ? "rotate-y-180" : ""
                  }`}
                >
                  {/* Cara Frontal Toolkit */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl border-2 border-zinc-300 bg-white p-8 sm:p-10 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.06)] group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.1)] group-hover:-translate-y-1 transition-all duration-300">
                    <div>
                      <div className="inline-block rounded-full bg-emerald-50 border border-emerald-300 px-3 py-1 text-xs font-mono font-bold text-emerald-700 mb-4">
                        Activos Operativos (Gratis Recursos y Plantillas)
                      </div>

                      <h4 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mb-2 leading-tight">
                        Kit de Estandarización & Arquitectura Gastronómica
                      </h4>

                      <p className="text-sm font-semibold text-zinc-700 mb-4">
                        Las herramientas exactas para auditar y controlar tu cocina hoy mismo.
                      </p>

                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        Descarga el paquete de plantillas operativas y matrices de cálculo utilizadas en auditorías profesionales de alto nivel. Diseñado para directores de operaciones y chefs que buscan eliminar mermas, proteger el costo de sus recetas y preparar su negocio para la automatización agéntica.
                      </p>
                    </div>

                    <div className="pt-6 border-t border-zinc-100 space-y-4">
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                        <span>(Toca la tarjeta para ver los recursos incluidos ⟳)</span>
                        <RotateCw className="w-4 h-4 text-zinc-600" />
                      </div>

                      <Link
                        href="/academy#toolkit"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-xs font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-700 hover:via-pink-700 hover:to-rose-600 text-white px-6 py-3.5 rounded-xl shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all hover:-translate-y-0.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>DESCARGAR RECURSOS GRATIS</span>
                      </Link>
                    </div>
                  </div>

                  {/* Cara Posterior Toolkit */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl border border-zinc-400 bg-zinc-900 text-white p-8 sm:p-10 flex flex-col justify-between shadow-2xl">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="font-mono text-[10px] font-bold px-3 py-1 rounded-full bg-fuchsia-950/80 text-fuchsia-300 border border-fuchsia-500/40">
                          CONTENIDO DEL PAQUETE
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">DESCARGA INMEDIATA</span>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-4">
                        Recursos Listos para Implementar
                      </h4>

                      <div className="space-y-2.5 text-xs">
                        <div className="text-left">
                          <div className="flex items-center gap-2 font-bold text-fuchsia-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                            <span>Optimización para Motores de Respuesta (AEO & RAG)</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 pl-5">
                            Arquitectura de contenido y datos estructurados Schema.org para indexación en ChatGPT y Gemini.
                          </p>
                        </div>

                        <div className="text-left">
                          <div className="flex items-center gap-2 font-bold text-fuchsia-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                            <span>Matriz de Ingeniería de Menú & Escandallos</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 pl-5">
                            Hoja de cálculo parametrizada para costeo en crudo/cocido, mermas técnicas y margen neto.
                          </p>
                        </div>

                        <div className="text-left">
                          <div className="flex items-center gap-2 font-bold text-fuchsia-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                            <span>Plantilla de Auditoría HACCP & Puntos Críticos</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 pl-5">
                            Checklist de control de temperaturas, higiene de líneas y límites de seguridad.
                          </p>
                        </div>

                        <div className="text-left">
                          <div className="flex items-center gap-2 font-bold text-fuchsia-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-fuchsia-400 shrink-0" />
                            <span>Framework de Mapeo de Flujos (SOPs)</span>
                          </div>
                          <p className="text-[11px] text-zinc-400 pl-5">
                            Estructura base para documentar recetas y compras antes de integrar flujos de IA.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                        <span>(Toca para volver al resumen ⟲)</span>
                        <RotateCw className="w-4 h-4 text-fuchsia-400" />
                      </div>

                      <Link
                        href="/academy#toolkit"
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-xs font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-rose-500 hover:from-fuchsia-700 hover:via-pink-700 hover:to-rose-600 text-white px-6 py-3.5 rounded-xl shadow-lg shadow-fuchsia-500/25 hover:shadow-fuchsia-500/40 transition-all hover:-translate-y-0.5"
                      >
                        <Download className="w-4 h-4" />
                        <span>DESCARGAR RECURSOS GRATIS</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

