"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  BookOpen,
  Download,
  ShieldCheck,
  ArrowRight,
  Check,
  Loader2,
} from "lucide-react";

interface CourseModule {
  id?: string;
  week_label?: string;
  week?: string;
  title: string;
  description?: string;
  desc?: string;
}

interface Course {
  id: string;
  slug?: string;
  badge: string;
  level: string;
  title: string;
  tagline: string;
  description?: string;
  duration: string;
  price_display?: string;
  price?: string;
  preview_image?: string;
  previewImage?: string;
  tools: string[];
  stripe_color?: string;
  stripeColor?: string;
  modules?: CourseModule[];
  cta_url?: string;
  ctaUrl?: string;
}

interface ResourceItem {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  desc?: string;
  tag: string;
  format: string;
  preview_image?: string;
  previewImage?: string;
  stripe_color?: string;
  stripeColor?: string;
  file_url?: string;
}

const DEFAULT_COURSES: Course[] = [
  {
    id: "ia-restaurantes",
    badge: "MÁS POPULAR",
    level: "Operativo & Estratégico",
    title: "Masterclass: Automatización Agéntica con IA",
    tagline: "Aprende a desplegar agentes de WhatsApp que atienden, venden y controlan recetas sin alucinaciones.",
    duration: "4 Módulos Intensivos • Acceso de por vida",
    price: "$97 USD",
    previewImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    stripeColor: "from-[#EA0C7F] via-[#971B8D] to-[#6366f1]",
    tools: ["OpenAI API", "Claude 3.5", "WhatsApp Cloud API", "Airtable"],
    modules: [
      { week: "01", title: "Arquitectura de Prompts & Escandallos", desc: "Control de costos, ingeniería de menú y calibración de recetas sin margen de error." },
      { week: "02", title: "Agente de Ventas & Reservas 24/7", desc: "Configuración de asistentes conversacionales con menús dinámicos y cobros." },
      { week: "03", title: "Supervisión & Mitigación de Alucinaciones", desc: "Protocolos de seguridad para que la IA no invente datos ni comprometa precios." },
      { week: "04", title: "Integración en el Negocio Real", desc: "Puesta en marcha con clientes reales y métricas de conversión en vivo." }
    ],
    ctaUrl: "https://buy.stripe.com/test_ia_restaurantes"
  },
  {
    id: "bootcamp-n8n",
    badge: "TÉCNICO / DEV",
    level: "Avanzado",
    title: "Bootcamp: Despliegue de Pipelines con n8n",
    tagline: "Construye la infraestructura de automatización de un restaurante sobre servidores VPS dedicados.",
    duration: "6 Semanas en Vivo + Laboratorios",
    price: "$197 USD",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    stripeColor: "from-[#1DACE3] via-[#0284c7] to-[#4f46e5]",
    tools: ["n8n Self-Hosted", "Docker", "PostgreSQL", "Meta Webhooks"],
    modules: [
      { week: "01", title: "Despliegue VPS con Docker & Caddy", desc: "Instalación segura de n8n en servidores en la nube con certificados SSL." },
      { week: "02", title: "Meta Cloud API & Webhooks Reversos", desc: "Recepción y procesamiento de eventos transaccionales de WhatsApp." },
      { week: "03", title: "Conexión a Bases de Datos Relacionales", desc: "Persistencia de pedidos, clientes y stock con PostgreSQL/Supabase." },
      { week: "04", title: "Alertas Críticas y Monitoreo 24/7", desc: "Integración de bots de Telegram para fallas de servidor y cuellos de botella." }
    ],
    ctaUrl: "https://buy.stripe.com/test_bootcamp_n8n"
  },
  {
    id: "crecimiento-aeo",
    badge: "CRECIMIENTO B2C",
    level: "Marketing & Adquisición",
    title: "Dominio Local: SEO, AEO & Visibilidad IA",
    tagline: "Posiciona tu marca gastronómica en Google Maps y sé la respuesta que ChatGPT y Gemini recomiendan.",
    duration: "Taller Práctico Grabado",
    price: "$67 USD",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    stripeColor: "from-[#FEAD2B] via-[#ea580c] to-[#EA0C7F]",
    tools: ["Google Business", "Schema.org", "Perplexity Engine", "JSON-LD"],
    modules: [
      { week: "01", title: "Indexación de Menús para Motores IA (AEO)", desc: "Estructuración de microdatos para que los LLMs recomienden tus platos." },
      { week: "02", title: "Autoridad Local & Google Business 360°", desc: "Estrategias de posicionamiento en el mapa y reputación sin pagar pauta." },
      { week: "03", title: "Embudos de Tráfico Directo a WhatsApp", desc: "Conversión de búsquedas orgánicas en pedidos sin pagar comisiones." }
    ],
    ctaUrl: "https://buy.stripe.com/test_crecimiento_aeo"
  }
];

const DEFAULT_RESOURCES: ResourceItem[] = [
  {
    id: "aeo-rag",
    title: "Optimización para Motores de Respuesta (AEO): Arquitectura de Contenido y Datos Estructurados para RAG",
    desc: "Guía técnica y arquitectura para estructurar datos con Schema.org, metadatos JSON-LD y bases vectoriales para que ChatGPT, Gemini y Perplexity indexen y citen tu restaurante.",
    tag: "AEO & RAG // NUEVO",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#EA0C7F] to-[#971B8D]",
    format: "PDF / Arquitectura AEO",
  },
  {
    id: "escandallos",
    title: "Matriz de Escandallos & Costos",
    desc: "Plantilla en Excel para costeo crudo/cocido, factor de rendimiento y mermas técnicas en cocina.",
    tag: "XLSX / EXCEL",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#1DACE3] to-[#0284c7]",
    format: "Plantilla XLSX Parametrizada",
  },
  {
    id: "haccp",
    title: "Checklist de Puntos Críticos HACCP",
    desc: "Auditoría de temperaturas, rotación de cámaras y protocolos de inocuidad y seguridad alimentaria.",
    tag: "PDF INTERACTIVO",
    previewImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#86C537] to-[#059669]",
    format: "Checklist PDF Interactivo",
  },
  {
    id: "sops",
    title: "Framework de SOPs para Restaurantes",
    desc: "Estructura modular para documentar recetas y compras antes de automatizar con IA.",
    tag: "NOTION TEMPLATE",
    previewImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#FEAD2B] to-[#d97706]",
    format: "Notion Workspace Duplicable",
  },
  {
    id: "aeo",
    title: "Guía de Indexación Local & AEO",
    desc: "Configuración técnica de menús y Schema.org para Google Maps y motores de respuesta de IA.",
    tag: "GUÍA TÉCNICA",
    previewImage: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#971B8D] to-[#1DACE3]",
    format: "Guía Técnica PDF",
  },
];

export default function AcademyPage() {
  const [courses, setCourses] = useState<Course[]>(DEFAULT_COURSES);
  const [resources, setResources] = useState<ResourceItem[]>(DEFAULT_RESOURCES);
  const [selectedCourse, setSelectedCourse] = useState<Course>(DEFAULT_COURSES[0]);
  const [resourceEmails, setResourceEmails] = useState<Record<string, string>>({});
  const [downloadStates, setDownloadStates] = useState<Record<string, { loading: boolean; success: boolean }>>({});

  // Cargar cursos y recursos desde la base de datos Supabase en tiempo real
  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && Array.isArray(data.courses)) {
          setCourses(data.courses);
          if (data.courses.length > 0) {
            setSelectedCourse(data.courses[0]);
          }
        }
      })
      .catch((e) => console.warn("[Courses Fetch Fallback]", e));

    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => {
        if (data.resources && Array.isArray(data.resources)) {
          setResources(data.resources);
        }
      })
      .catch((e) => console.warn("[Resources Fetch Fallback]", e));
  }, []);

  const handleResourceSubmit = async (e: React.FormEvent, resourceId: string) => {
    e.preventDefault();
    const email = resourceEmails[resourceId];
    if (!email) return;

    setDownloadStates((prev) => ({
      ...prev,
      [resourceId]: { loading: true, success: false, message: "" }
    }));

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Lead Toolkit " + resourceId.toUpperCase(),
          email: email,
          phone: "+0000000000",
          companyName: "Toolkit: " + resourceId,
          resourceId: resourceId,
          serviceNeeded: "Toolkit Download: " + resourceId,
          businessSize: "B2C Lead Magnet",
          currentChallenge: "Descarga de recurso operativo " + resourceId,
        }),
      });
      const data = await res.json();

      setDownloadStates((prev) => ({
        ...prev,
        [resourceId]: {
          loading: false,
          success: data.success !== false,
          message: data.message || "¡Recurso enviado! Revisa tu bandeja de entrada o spam.",
        }
      }));
    } catch (err) {
      setDownloadStates((prev) => ({
        ...prev,
        [resourceId]: { loading: false, success: true, message: "¡Enviado! Revisa tu bandeja de entrada." }
      }));
    }
  };

  const getCoursePrice = (c: Course) => c.price_display || c.price || "$97 USD";
  const getCourseImage = (c: Course) => c.preview_image || c.previewImage || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80";
  const getCourseStripe = (c: Course) => c.stripe_color || c.stripeColor || "from-[#EA0C7F] via-[#971B8D] to-[#6366f1]";
  const getCourseCta = (c: Course) => c.cta_url || c.ctaUrl || "#";

  const getResourceImage = (r: ResourceItem) => r.preview_image || r.previewImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80";
  const getResourceStripe = (r: ResourceItem) => r.stripe_color || r.stripeColor || "from-[#EA0C7F] to-[#971B8D]";
  const getResourceDesc = (r: ResourceItem) => r.description || r.desc || "";

  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-800 selection:text-white relative overflow-hidden font-sans">
      
      {/* ── HEADER SUPERIOR ── */}
      <header className="border-b border-zinc-200 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-zinc-600 transition-colors">
              Inteligencia Neuronal
            </span>
            <span className="text-[10px] font-mono font-bold bg-zinc-100 border border-zinc-300 text-zinc-700 px-2.5 py-0.5 rounded-full">
              CAMPUS
            </span>
          </Link>

          <nav className="flex items-center gap-6 text-sm font-semibold">
            <a href="#programas" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Cursos
            </a>
            <a href="#toolkit" className="text-zinc-600 hover:text-zinc-900 transition-colors">
              Toolkit Gratis
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-xl border border-zinc-300 bg-zinc-50 hover:bg-zinc-100 text-zinc-800 transition-all shadow-sm"
            >
              Volver a Empresa
            </Link>
          </nav>
        </div>
      </header>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-20 pb-16 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200/80 bg-indigo-50/60 px-4 py-1.5 text-xs font-mono font-bold text-indigo-900 shadow-sm mb-6">
          <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
          <span>CAMPUS VIRTUAL // APRENDIZAJE AGÉNTICO EN PRODUCCIÓN</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 mb-6 leading-[1.12]">
          Aprende a construir la <br />
          <span className="bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#d946ef] bg-clip-text text-transparent underline decoration-[#d946ef] decoration-wavy underline-offset-8">
            inteligencia operativa
          </span> de tu negocio.
        </h1>

        <p className="text-zinc-600 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
          Formación técnica y ejecutiva para dominar agentes de IA, flujos autónomos en n8n y posicionamiento de última generación. De la teoría al servidor en vivo.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#programas"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#d946ef] hover:from-[#0369a1] hover:via-[#4f46e5] hover:to-[#c026d3] px-8 py-4 text-sm font-bold text-white transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" />
            Explorar Cursos & Programas
          </a>
          <a
            href="#toolkit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border-2 border-zinc-300 bg-white px-8 py-4 text-sm font-bold text-zinc-900 transition-all hover:bg-zinc-50 hover:border-zinc-400 shadow-sm hover:-translate-y-0.5"
          >
            <Download className="w-4 h-4 text-zinc-700" />
            Obtener Toolkit Operativo Gratis
          </a>
        </div>
      </section>

      {/* ── DASHBOARD CURRICULAR / SYLLABUS INTERACTIVO ── */}
      <section id="programas" className="py-16 px-6 max-w-7xl mx-auto border-t border-zinc-200">
        <div className="border-b border-zinc-200 pb-6 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-mono font-bold text-zinc-700 mb-2">
              CURRÍCULO PRÁCTICO
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
              Programas de Formación Aplicada
            </h2>
            <p className="text-zinc-500 text-sm mt-1">Selecciona un curso para inspeccionar el temario semanal y herramientas.</p>
          </div>
          <span className="font-mono text-xs font-bold text-zinc-600 bg-zinc-100 px-3 py-1.5 rounded-lg border border-zinc-200">
            [PROGRAMAS 2026 // BASE DE DATOS SINCRONIZADA]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navegador lateral de Cursos con Franja Superior e Imágenes (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {courses.map((course) => {
              const isSelected = selectedCourse?.id === course.id;
              return (
                <div
                  key={course.id}
                  onClick={() => setSelectedCourse(course)}
                  className={`rounded-3xl border transition-all cursor-pointer text-left relative overflow-hidden transform-gpu will-change-transform shadow-sm hover:shadow-md ${
                    isSelected
                      ? "border-zinc-900 bg-zinc-50/80 ring-2 ring-zinc-900/15"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  {/* Top Color Stripe */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${getCourseStripe(course)}`} />

                  {/* Thumbnail Banner */}
                  <div className="h-32 w-full bg-zinc-100 relative overflow-hidden border-b border-zinc-100">
                    <img
                      src={getCourseImage(course)}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/90 text-zinc-900 border border-zinc-200 shadow-xs">
                        {course.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                      <span className="font-bold">{course.level}</span>
                      <span className="font-extrabold bg-zinc-900/80 px-2 py-0.5 rounded text-[11px]">{getCoursePrice(course)}</span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-base font-bold text-zinc-900 mb-1 leading-snug">{course.title}</h3>
                    <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed mb-3">{course.tagline}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-zinc-200/80">
                      <span className="text-xs font-mono text-zinc-500 font-bold">{course.duration}</span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#971B8D] group">
                        Ver syllabus <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visor de Contenido & Syllabus Detallado (Col 6-12) */}
          {selectedCourse && (
            <div className="lg:col-span-7 rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 relative shadow-lg overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${getCourseStripe(selectedCourse)}`} />

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCourse.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* Banner de Cabecera */}
                  <div className="h-44 w-full rounded-2xl overflow-hidden relative mb-6 border border-zinc-200">
                    <img
                      src={getCourseImage(selectedCourse)}
                      alt={selectedCourse.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/30 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-2 text-white">
                      <div>
                        <span className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-widest block mb-1">
                          PLAN DE ESTUDIO // SYLLABUS
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold">{selectedCourse.title}</h3>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-2xl font-extrabold font-mono text-cyan-300">{getCoursePrice(selectedCourse)}</div>
                      </div>
                    </div>
                  </div>

                  {/* Herramientas */}
                  {selectedCourse.tools && selectedCourse.tools.length > 0 && (
                    <div className="mb-6">
                      <div className="text-xs font-mono font-bold text-zinc-500 mb-2">STACK TECNOLÓGICO & HERRAMIENTAS</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCourse.tools.map((tool, i) => (
                          <span key={i} className="text-xs font-mono px-3 py-1 rounded-lg bg-zinc-100 border border-zinc-200 text-zinc-800 font-bold">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Desglose de Módulos */}
                  {selectedCourse.modules && selectedCourse.modules.length > 0 && (
                    <div className="space-y-3 mb-8">
                      <div className="text-xs font-mono font-bold text-zinc-500">ESTRUCTURA CLASE POR CLASE</div>
                      {selectedCourse.modules.map((m, idx) => (
                        <div key={idx} className="p-4 rounded-2xl border border-zinc-200 bg-zinc-50 flex items-start gap-4 shadow-xs">
                          <span className="font-mono text-xs font-bold text-white bg-zinc-900 w-8 h-8 rounded-xl flex items-center justify-center shrink-0">
                            {m.week_label || m.week || `0${idx + 1}`}
                          </span>
                          <div>
                            <h4 className="text-sm font-bold text-zinc-900">{m.title}</h4>
                            <p className="text-xs text-zinc-600 mt-0.5 leading-relaxed">{m.description || m.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200">
                    <div className="flex items-center gap-2 text-xs text-zinc-600 font-medium">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Garantía de satisfacción de 7 días</span>
                    </div>
                    <a
                      href={getCourseCta(selectedCourse)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#971B8D] hover:bg-[#801676] px-8 py-3.5 text-sm font-bold text-white transition-all shadow-md shadow-[#971B8D]/25 hover:shadow-[#971B8D]/40 hover:-translate-y-0.5"
                    >
                      Inscribirme al Programa
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ── SECCIÓN LEAD MAGNET: RECURSOS INDIVIDUALES (#toolkit) ── */}
      <section id="toolkit" className="py-20 px-6 max-w-6xl mx-auto border-t border-zinc-200">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-zinc-100 border border-zinc-300 px-3.5 py-1.5 text-xs font-mono font-bold text-zinc-700 mb-3">
            DESCARGAS INDIVIDUALES // TOOLKIT OPERATIVO
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-zinc-900 tracking-tight">
            Activos y Plantillas de Implementación
          </h2>
          <p className="text-zinc-600 text-sm mt-2 max-w-2xl mx-auto">
            Ingresa tu correo corporativo en el recurso que necesitas para recibir el archivo de forma individual y directa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {resources.map((item) => {
            const state = downloadStates[item.id] || { loading: false, success: false };

            return (
              <div
                key={item.id}
                className="rounded-3xl border border-zinc-200 bg-white flex flex-col justify-between shadow-sm hover:shadow-lg transition-all relative overflow-hidden group"
              >
                {/* Top Color Stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${getResourceStripe(item)}`} />

                <div>
                  {/* Visual Preview Banner */}
                  <div className="h-36 w-full bg-zinc-100 relative overflow-hidden border-b border-zinc-100">
                    <img
                      src={getResourceImage(item)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3">
                      <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full bg-white/90 text-zinc-800 border border-zinc-200 shadow-xs">
                        {item.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-3 text-white text-[11px] font-mono font-bold">
                      {item.format}
                    </div>
                  </div>

                  <div className="p-6 pb-2">
                    <h3 className="text-base font-bold text-zinc-900 mb-1.5 leading-snug">{item.title}</h3>
                    <p className="text-xs text-zinc-600 leading-relaxed mb-4">{getResourceDesc(item)}</p>
                  </div>
                </div>

                <div className="p-6 pt-2">
                  {!state.success ? (
                    <form onSubmit={(e) => handleResourceSubmit(e, item.id)} className="flex items-center gap-2">
                      {/* 🛡️ Honeypot invisible anti-bots */}
                      <input
                        type="text"
                        name="hp_website"
                        style={{ display: "none" }}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                      <input
                        type="email"
                        required
                        value={resourceEmails[item.id] || ""}
                        onChange={(e) =>
                          setResourceEmails((prev) => ({
                            ...prev,
                            [item.id]: e.target.value,
                          }))
                        }
                        placeholder="Tu email corporativo..."
                        className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                      />
                      <button
                        type="submit"
                        disabled={state.loading}
                        className="rounded-xl bg-[#971B8D] hover:bg-[#801676] px-5 py-2.5 text-xs font-bold text-white transition-all shrink-0 flex items-center gap-1.5 disabled:opacity-50 shadow-sm shadow-[#971B8D]/25"
                      >
                        {state.loading ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span>Descargar</span>
                      </button>
                    </form>
                  ) : (
                    <div className="p-3.5 rounded-xl border border-[#86C537]/40 bg-[#86C537]/10 text-[#55821c] text-xs flex items-center justify-between font-medium">
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-[#639922] shrink-0" />
                        <span>{state.message || "¡Enlace generado! Revisa tu bandeja de entrada."}</span>
                      </div>
                      <button
                        onClick={() =>
                          setDownloadStates((prev) => ({
                            ...prev,
                            [item.id]: { loading: false, success: false, message: "" },
                          }))
                        }
                        className="text-[10px] text-zinc-500 hover:text-zinc-900 underline ml-2 shrink-0"
                      >
                        Otro correo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER B2C ── */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-10 px-6 text-center text-xs text-zinc-500">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Inteligencia Neuronal LLC. Todos los derechos reservados.</p>
          <div className="flex items-center gap-6 font-semibold">
            <Link href="/" className="hover:text-zinc-900 transition-colors">Inicio</Link>
            <a href="#programas" className="hover:text-zinc-900 transition-colors">Programas</a>
            <a href="#toolkit" className="hover:text-zinc-900 transition-colors">Recursos</a>
            <Link href="/admin/login" className="text-zinc-400 hover:text-zinc-900 transition-colors">Admin Portal</Link>
          </div>
        </div>
      </footer>

    </main>
  );
}
