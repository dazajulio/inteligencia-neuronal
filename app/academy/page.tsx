"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  BookOpen,
  Download,
  ShieldCheck,
  ArrowRight,
  Check,
  Loader2,
  Star,
  Clock,
  Award,
  Video,
  FileCode2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Users2,
  Flame,
  Terminal,
  BadgeCheck
} from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckoutStore";
import { CourseCheckoutModal } from "@/components/ui/CourseCheckoutModal";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface CourseModule {
  id?: string;
  week?: string;
  title: string;
  desc?: string;
  lessons?: string[];
}

interface Course {
  id: string;
  slug?: string;
  type: "PROGRAMA INTENSIVO" | "MASTERCLASS";
  badge: string;
  level: string;
  title: string;
  tagline: string;
  description?: string;
  duration: string;
  lessonsCount: string;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  instructor: {
    name: string;
    role: string;
    avatar: string;
  };
  price_display?: string;
  price: string;
  originalPrice: string;
  preview_image?: string;
  previewImage: string;
  tools: string[];
  stripeColor: string;
  accentColor: string;
  modules: CourseModule[];
  learningOutcomes: string[];
  ctaUrl?: string;
}

interface ResourceItem {
  id: string;
  slug?: string;
  title: string;
  desc: string;
  tag: string;
  format: string;
  previewImage: string;
  stripeColor: string;
}

// ── EXACTAMENTE LOS 2 PRODUCTOS EDUCATIVOS ACTIVOS (1 PROGRAMA Y 1 CURSO) ──
const REAL_COURSES: Course[] = [
  {
    id: "bootcamp-n8n",
    type: "PROGRAMA INTENSIVO",
    badge: "CARRERA TÉCNICA // EN VIVO",
    level: "Intermedio a Avanzado",
    title: "Bootcamp: Arquitectura de Pipelines con n8n & Agentes IA",
    tagline: "Aprende a desplegar infraestructura empresarial de automatización sobre servidores VPS dedicados, orquestando agentes autónomos, PostgreSQL y WhatsApp Cloud API.",
    duration: "6 Semanas Intensivas",
    lessonsCount: "24 Sesiones + Laboratorios",
    rating: 5.0,
    reviewsCount: 48,
    studentsCount: 140,
    instructor: {
      name: "Julio Daza",
      role: "Arquitecto de Sistemas & Fundador",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    price: "$197 USD",
    originalPrice: "$390 USD",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    stripeColor: "from-[#1DACE3] via-[#0284c7] to-[#4f46e5]",
    accentColor: "#0284c7",
    tools: ["n8n Self-Hosted", "Docker & Caddy", "PostgreSQL", "Meta Cloud API", "LangChain / LLMs"],
    learningOutcomes: [
      "Instalar y asegurar n8n en servidores VPS con Docker, certificados SSL y copias de seguridad automáticas.",
      "Conectar y validar Webhooks de Meta (WhatsApp, Instagram) con manejo de colas y sin caídas.",
      "Modelar bases de datos relacionales en PostgreSQL con aislamiento multi-inquilino (Row-Level Security).",
      "Construir agentes autónomos con memoria persistente y llamadas a funciones (Tool Calling) en producción."
    ],
    modules: [
      {
        week: "Módulo 01",
        title: "Despliegue VPS con Docker, n8n & Caddy SSL",
        desc: "Arquitectura de infraestructura soberana, configuración de variables de entorno y optimización de concurrencia.",
        lessons: ["Aprovisionamiento de servidor Linux VPS", "Docker Compose y persistencia de volúmenes", "Proxy inverso con Caddy y HTTPS automático"]
      },
      {
        week: "Módulo 02",
        title: "Meta Cloud API & Webhooks Reversos",
        desc: "Ingeniería de conexión oficial con WhatsApp Cloud API y recepción de eventos transaccionales.",
        lessons: ["Handshake de verificación de webhooks", "Manejo de estados de mensajes", "Envío de plantillas interactivas y botones"]
      },
      {
        week: "Módulo 03",
        title: "Bases de Datos Relacionales & Row-Level Security",
        desc: "Persistencia de leads, pedidos y catálogos en PostgreSQL y Supabase con políticas RLS.",
        lessons: ["Modelado relacional para operaciones", "Consultas SQL optimizadas en nodos n8n", "Aislamiento de datos multi-tenant"]
      },
      {
        week: "Módulo 04",
        title: "Orquestación de Agentes Autónomos LLM",
        desc: "Integración de modelos Gemini y Claude como cerebros decisorios conectados a bases de datos.",
        lessons: ["Configuración de nodos AI Agent en n8n", "Estructuración de herramientas (Tools & Functions)", "Mitigación de alucinaciones y guardrails"]
      },
      {
        week: "Módulo 05",
        title: "Monitoreo, Telemetría & Alertas 24/7",
        desc: "Construcción de bots supervisores en Telegram para detección de fallos y cuellos de botella.",
        lessons: ["Manejo de errores por sub-flujos", "Telemetría de tiempo de ejecución y memoria", "Protocolos de contingencia en vivo"]
      },
      {
        week: "Módulo 06",
        title: "Proyecto Final, Auditoría y Certificación",
        desc: "Defensa técnica de un pipeline completo en producción y emisión del diploma con ID único.",
        lessons: ["Revisión de arquitectura uno a uno", "Pruebas de estrés y carga", "Entrega de credencial verificable"]
      }
    ]
  },
  {
    id: "ia-restaurantes",
    type: "MASTERCLASS",
    badge: "ALTA DEMANDA // ACCESO INMEDIATO",
    level: "Operativo & Estratégico",
    title: "Masterclass: Automatización Agéntica con IA para Restaurantes",
    tagline: "Aprende a implementar agentes inteligentes que atienden por WhatsApp, capturan pedidos y calculan escandallos sin alucinaciones.",
    duration: "4 Módulos Grabados",
    lessonsCount: "16 Lecciones + Plantillas XLSX",
    rating: 4.9,
    reviewsCount: 112,
    studentsCount: 380,
    instructor: {
      name: "Julio Daza",
      role: "Consultor de Inteligencia Operativa",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    price: "$97 USD",
    originalPrice: "$197 USD",
    previewImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    stripeColor: "from-[#EA0C7F] via-[#971B8D] to-[#6366f1]",
    accentColor: "#EA0C7F",
    tools: ["WhatsApp Cloud API", "Gemini Pro", "Airtable", "Escandallos XLSX", "KDS Prompts"],
    learningOutcomes: [
      "Parametrizar prompts con rigor físico y matemático para que la IA nunca invente precios ni recetas.",
      "Configurar un asistente de WhatsApp 24/7 con catálogo dinámico de platos y horarios.",
      "Integrar matrices de costos crudo/cocido en tiempo real sin requerir software caro.",
      "Implementar un protocolo de contingencia y desvío a agentes humanos para casos críticos."
    ],
    modules: [
      {
        week: "Módulo 01",
        title: "Arquitectura de Prompts & Escandallos de Cocina",
        desc: "Ingeniería de menú, control de factores de rendimiento y calibración de recetas sin margen de error.",
        lessons: ["Estructura de prompts sin alucinaciones", "Cálculo de mermas y macronutrientes", "Plantilla de costeo automatizada"]
      },
      {
        week: "Módulo 02",
        title: "Agente de Ventas & Reservas por WhatsApp",
        desc: "Configuración del flujo conversacional para atender comensales y procesar reservas en segundos.",
        lessons: ["Flujo de bienvenida y menú dinámico", "Captura de datos y confirmación automática", "Gestión de restricciones alimentarias"]
      },
      {
        week: "Módulo 03",
        title: "Supervisión, Seguridad & Mitigación de Errores",
        desc: "Reglas inquebrantables para impedir que el agente ofrezca descuentos no autorizados o datos falsos.",
        lessons: ["Guardrails de precios y políticas", "Filtros de sentimiento y derivación humana", "Auditoría de logs de conversación"]
      },
      {
        week: "Módulo 04",
        title: "Puesta en Marcha en Negocio Real & Métricas",
        desc: "Estrategias de lanzamiento con clientes reales y medición del incremento en tasa de conversión.",
        lessons: ["Lanzamiento controlado en horario valle", "Medición de tiempos de respuesta", "Retorno de inversión del agente"]
      }
    ]
  }
];

const DEFAULT_RESOURCES: ResourceItem[] = [
  {
    id: "escandallos",
    title: "Matriz Maestra de Escandallos & Costos Gastronómicos",
    desc: "Plantilla en Excel totalmente formulada para costeo crudo/cocido, factor de rendimiento y mermas técnicas de cocina industrial.",
    tag: "XLSX PARAMETRIZADO",
    format: "Plantilla Excel Parametrizada",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#1DACE3] to-[#0284c7]",
  },
  {
    id: "sops",
    title: "Framework de Manuales Operativos (SOPs) y Checklists",
    desc: "Estructura modular para estandarizar procesos de cocina, compras y apertura/cierre antes de integrar automatizaciones agénticas.",
    tag: "WORKSPACE NOTION",
    format: "Plantilla Notion Duplicable",
    previewImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#FEAD2B] to-[#ea580c]",
  },
  {
    id: "haccp",
    title: "Checklist de Auditoría de Puntos Críticos HACCP",
    desc: "Plantilla de control de temperaturas, rotación de inventarios y protocolos de inocuidad según estándares internacionales.",
    tag: "PDF INTERACTIVO",
    format: "Guía de Auditoría PDF",
    previewImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#86C537] to-[#059669]",
  },
  {
    id: "aeo-rag",
    title: "Guía de Indexación para Motores de Respuesta IA (AEO & RAG)",
    desc: "Arquitectura técnica para estructurar microdatos JSON-LD y Schema.org para que ChatGPT, Gemini y Perplexity indexen tu negocio.",
    tag: "GUÍA TÉCNICA",
    format: "Manual de Arquitectura AEO",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#EA0C7F] to-[#971B8D]",
  }
];

export default function AcademyPage() {
  const { openCheckout } = useCheckoutStore();
  const [courses, setCourses] = useState<Course[]>(REAL_COURSES);
  const [resources, setResources] = useState<ResourceItem[]>(DEFAULT_RESOURCES);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>("bootcamp-n8n");
  const [expandedModule, setExpandedModule] = useState<string | null>("bootcamp-n8n-Módulo 01");
  const [resourceEmails, setResourceEmails] = useState<Record<string, string>>({});
  const [downloadStates, setDownloadStates] = useState<Record<string, { loading: boolean; success: boolean; message?: string }>>({});

  // Sincronización en vivo con la Base de Datos Supabase (Panel Admin)
  useEffect(() => {
    fetch("/api/courses")
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && Array.isArray(data.courses) && data.courses.length > 0) {
          const mapped = data.courses.map((c: any) => ({
            id: c.id,
            type: c.badge?.includes("CARRERA") || c.badge?.includes("BOOTCAMP") || c.duration?.includes("Semana") ? "PROGRAMA INTENSIVO" : "MASTERCLASS",
            badge: c.badge || "PROGRAMA OFICIAL",
            level: c.level || "Intermedio",
            title: c.title,
            tagline: c.tagline || c.description,
            duration: c.duration || "Acceso de por vida",
            lessonsCount: c.lessons_count || (c.modules?.length ? `${c.modules.length} Módulos` : "Acceso Completo"),
            rating: Number(c.rating) || 5.0,
            reviewsCount: Number(c.reviews_count) || (c.students_enrolled ? Math.round(c.students_enrolled * 0.3) : 48),
            studentsCount: Number(c.students_enrolled) || 120,
            instructor: {
              name: "Julio Daza",
              role: "Director de Arquitectura",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            price: c.price_display || `$${c.price_usd || 97} USD`,
            originalPrice: `$${(Number(c.price_usd) || 97) * 2} USD`,
            previewImage: c.preview_image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            stripeColor: c.stripe_color || "from-[#1DACE3] via-[#0284c7] to-[#4f46e5]",
            accentColor: "#0284c7",
            tools: Array.isArray(c.tools) ? c.tools : (c.tools ? String(c.tools).split(",") : ["n8n", "Docker", "IA"]),
            learningOutcomes: [
              "Despliegue y aseguramiento de infraestructura en producción.",
              "Conexión con WhatsApp Cloud API y Webhooks en tiempo real.",
              "Persistencia en bases de datos relacionales con Row-Level Security.",
              "Orquestación agéntica con mitigación de alucinaciones."
            ],
            modules: (c.modules || []).map((m: any) => ({
              week: m.week_label || "Módulo",
              title: m.title,
              desc: m.description,
              lessons: [m.description || "Implementación práctica y laboratorio"]
            }))
          }));
          setCourses(mapped);
        }
      })
      .catch((err) => console.warn("[Courses DB Sync Fallback]", err));

    fetch("/api/resources")
      .then((res) => res.json())
      .then((data) => {
        if (data.resources && Array.isArray(data.resources) && data.resources.length > 0) {
          const mappedRes = data.resources.map((r: any) => ({
            id: r.id,
            title: r.title,
            desc: r.description,
            tag: r.tag || "RECURSO",
            format: r.format || "PDF / Plantilla",
            previewImage: r.preview_image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
            stripeColor: r.stripe_color || "from-[#1DACE3] to-[#0284c7]",
          }));
          setResources(mappedRes);
        }
      })
      .catch((err) => console.warn("[Resources DB Sync Fallback]", err));
  }, []);

  const filteredCourses = courses.filter((c) => {
    if (activeCategory === "BOOTCAMP") return c.type === "PROGRAMA INTENSIVO";
    if (activeCategory === "MASTERCLASS") return c.type === "MASTERCLASS";
    return true;
  });

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
    } catch {
      setDownloadStates((prev) => ({
        ...prev,
        [resourceId]: { loading: false, success: true, message: "¡Enviado! Revisa tu bandeja de entrada." }
      }));
    }
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-[#0284c7] selection:text-white font-sans antialiased">
      <Navbar />

      {/* ── HERO SECTION ESTILO G-TALENT / UDEMY ENTERPRISE ── */}
      <section className="relative pt-32 pb-20 border-b border-zinc-200 bg-gradient-to-b from-zinc-50 via-white to-white overflow-hidden">
        {/* Glow de Marca Superior con Paleta Oficial */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-[#1DACE3]/10 via-[#EA0C7F]/10 to-[#FEAD2B]/10 blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Badge de Autoridad */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 shadow-sm text-xs font-mono text-zinc-700">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-zinc-900">Campus Virtual Oficial</span>
              <span className="text-zinc-300">•</span>
              <span className="text-zinc-500">Cero Humo • 100% Ingeniería en Producción</span>
            </div>

            {/* Título Principal */}
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
              Aprende a Construir <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DACE3] via-[#EA0C7F] to-[#FEAD2B]">
                Infraestructura de Automatización Real
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-zinc-600 leading-relaxed">
              Programas técnicos de alta especialización para ingenieros, consultores y directivos gastronómicos. Domina n8n self-hosted, agentes LLM autónomos y arquitecturas de negocio sin promesas vacías.
            </p>

            {/* Métricas de Impacto Flotantes (Inspiradas en G-Talent) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-sm text-left">
                <div className="flex items-center gap-2 text-[#0284c7] font-bold text-xs font-mono mb-1">
                  <Flame className="w-4 h-4 text-[#EA0C7F]" />
                  <span>METODOLOGÍA</span>
                </div>
                <div className="text-2xl font-extrabold text-zinc-900 font-heading">100% Práctica</div>
                <div className="text-xs text-zinc-500">Backends en producción</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-sm text-left">
                <div className="flex items-center gap-2 text-[#0284c7] font-bold text-xs font-mono mb-1">
                  <Star className="w-4 h-4 text-[#FEAD2B] fill-[#FEAD2B]" />
                  <span>VALORACIÓN</span>
                </div>
                <div className="text-2xl font-extrabold text-zinc-900 font-heading">4.95 / 5.0</div>
                <div className="text-xs text-zinc-500">Reseñas verificadas</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-sm text-left">
                <div className="flex items-center gap-2 text-[#0284c7] font-bold text-xs font-mono mb-1">
                  <Award className="w-4 h-4 text-emerald-600" />
                  <span>CERTIFICACIÓN</span>
                </div>
                <div className="text-2xl font-extrabold text-zinc-900 font-heading">Oficial</div>
                <div className="text-xs text-zinc-500">Con ID y QR único</div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-zinc-200/80 shadow-sm text-left">
                <div className="flex items-center gap-2 text-[#0284c7] font-bold text-xs font-mono mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#1DACE3]" />
                  <span>GARANTÍA</span>
                </div>
                <div className="text-2xl font-extrabold text-zinc-900 font-heading">14 Días</div>
                <div className="text-xs text-zinc-500">100% de devolución</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── BARRA DE FILTROS & CATEGORÍAS (ESTILO UDEMY) ── */}
      <section className="border-b border-zinc-200 bg-white sticky top-20 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <span className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mr-2 hidden sm:inline">
              Filtrar por:
            </span>
            <button
              onClick={() => setActiveCategory("ALL")}
              className={"px-4 py-2 rounded-full text-xs font-bold transition-all " + (activeCategory === "ALL" ? "bg-zinc-900 text-white shadow-sm" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200")}
            >
              Todos los Programas ({courses.length})
            </button>
            <button
              onClick={() => setActiveCategory("BOOTCAMP")}
              className={"px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 " + (activeCategory === "BOOTCAMP" ? "bg-[#0284c7] text-white shadow-sm" : "bg-sky-50 text-[#0284c7] hover:bg-sky-100")}
            >
              <Terminal className="w-3.5 h-3.5" />
              Bootcamp n8n & Infraestructura (1)
            </button>
            <button
              onClick={() => setActiveCategory("MASTERCLASS")}
              className={"px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 " + (activeCategory === "MASTERCLASS" ? "bg-[#EA0C7F] text-white shadow-sm" : "bg-pink-50 text-[#EA0C7F] hover:bg-pink-100")}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Masterclass IA Restaurantes (1)
            </button>
          </div>

          <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Acceso inmediato a Campus Virtual</span>
          </div>
        </div>
      </section>

      {/* ── GRID DE PROGRAMAS EDUCATIVOS (JERARQUÍA VISUAL PRO) ── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        <div className="space-y-12">
          {filteredCourses.map((course) => {
            const isExpanded = expandedCourseId === course.id;

            return (
              <div
                key={course.id}
                id={course.id}
                className="rounded-3xl border border-zinc-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Franja de Color de Marca Superior */}
                <div className={"h-2 w-full bg-gradient-to-r " + course.stripeColor} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10">
                  
                  {/* Columna Izquierda: Video Thumbnail & Metadata Comercial (Col 1-5) */}
                  <div className="lg:col-span-5 space-y-6">
                    
                    <div className="relative aspect-video rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-900 group">
                      <Image
                        src={course.previewImage}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                      
                      {/* Badge Flotante */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900/90 text-white backdrop-blur-md border border-white/20">
                          {course.badge}
                        </span>
                      </div>

                      {/* Info overlay inferior */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#FEAD2B]" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center gap-1 text-emerald-400 font-bold">
                          <BadgeCheck className="w-4 h-4" />
                          <span>Certificado Incluido</span>
                        </div>
                      </div>
                    </div>

                    {/* Precios & Botón de Compra */}
                    <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-4">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-3xl font-extrabold text-zinc-900 font-heading">
                            {course.price}
                          </span>
                          <span className="text-sm line-through text-zinc-400 ml-2 font-mono">
                            {course.originalPrice}
                          </span>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 font-mono">
                          50% DESCUENTO
                        </span>
                      </div>

                      <button
                        onClick={() =>
                          openCheckout({
                            id: course.id,
                            title: course.title,
                            price: course.price,
                            tagline: course.tagline,
                            duration: course.duration,
                            badge: course.badge,
                          })
                        }
                        className={"w-full py-4 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r " + course.stripeColor + " hover:opacity-95 active:scale-[0.99]"}
                      >
                        <span>Inscribirme Ahora</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-zinc-500 font-mono">
                        <div className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Acceso de por vida</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Blueprints y plantillas</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Canal privado de dudas</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Garantía de 14 días</span>
                        </div>
                      </div>
                    </div>

                    {/* Instructor Card */}
                    <div className="flex items-center gap-3 p-3.5 rounded-xl border border-zinc-200/80 bg-white">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#1DACE3] to-[#EA0C7F] p-0.5 flex-shrink-0">
                        <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold text-xs">
                          JD
                        </div>
                      </div>
                      <div>
                        <div className="text-xs font-bold text-zinc-900 flex items-center gap-1">
                          <span>Instructor: {course.instructor.name}</span>
                          <BadgeCheck className="w-3.5 h-3.5 text-[#0284c7]" />
                        </div>
                        <div className="text-[11px] text-zinc-500">{course.instructor.role}</div>
                      </div>
                    </div>

                  </div>

                  {/* Columna Derecha: Contenido Pedagógico & Syllabus (Col 6-12) */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Header del Curso */}
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-zinc-100 text-zinc-800 border border-zinc-200">
                          {course.level}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span>{course.rating.toFixed(1)}</span>
                          <span className="text-zinc-400 font-normal">({course.reviewsCount} reseñas)</span>
                        </div>
                        <span className="text-zinc-300">•</span>
                        <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                          <Users2 className="w-3.5 h-3.5" />
                          {course.studentsCount} profesionales formados
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-heading">
                        {course.title}
                      </h2>

                      <p className="text-sm text-zinc-600 leading-relaxed">
                        {course.tagline}
                      </p>
                    </div>

                    {/* Herramientas & Stack Cubierto */}
                    <div className="space-y-2">
                      <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider">
                        Stack Tecnológico y Herramientas Cubiertas:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {course.tools.map((tool, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-zinc-100 text-zinc-800 border border-zinc-200"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Lo que aprenderás (Estilo Udemy) */}
                    <div className="p-5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
                      <div className="text-xs font-mono font-bold text-[#0284c7] uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Lo que dominarás al finalizar:</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {course.learningOutcomes.map((outcome, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-zinc-700">
                            <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                            <span>{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Temario / Syllabus Desplegable */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-zinc-900 uppercase font-mono tracking-wider flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-zinc-500" />
                          <span>Temario del Programa ({course.modules.length} Módulos)</span>
                        </h3>
                        <button
                          onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                          className="text-xs font-mono font-bold text-[#0284c7] hover:underline flex items-center gap-1"
                        >
                          <span>{isExpanded ? "Contraer temario" : "Expandir temario completo"}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      {/* Lista de Módulos */}
                      <div className="space-y-2">
                        {course.modules.slice(0, isExpanded ? course.modules.length : 3).map((mod, mIdx) => {
                          const modKey = course.id + "-" + mod.week;
                          const isModOpen = expandedModule === modKey;

                          return (
                            <div
                              key={mIdx}
                              className="rounded-xl border border-zinc-200 bg-white overflow-hidden transition-colors"
                            >
                              <button
                                onClick={() => setExpandedModule(isModOpen ? null : modKey)}
                                className="w-full p-3.5 text-left flex items-center justify-between gap-4 hover:bg-zinc-50 transition-colors"
                              >
                                <div className="flex items-center gap-3">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-100 text-zinc-700">
                                    {mod.week}
                                  </span>
                                  <span className="text-xs sm:text-sm font-bold text-zinc-900">
                                    {mod.title}
                                  </span>
                                </div>
                                <div className="text-zinc-400 flex-shrink-0">
                                  {isModOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                </div>
                              </button>

                              {isModOpen && (
                                <div className="px-4 pb-4 pt-1 bg-zinc-50/50 border-t border-zinc-100 text-xs text-zinc-600 space-y-2">
                                  <p className="italic text-zinc-500">{mod.desc}</p>
                                  {mod.lessons && (
                                    <ul className="space-y-1.5 pt-1 pl-2">
                                      {mod.lessons.map((l, lIdx) => (
                                        <li key={lIdx} className="flex items-center gap-2 text-zinc-700">
                                          <Video className="w-3.5 h-3.5 text-[#0284c7]" />
                                          <span>{l}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* ── SECCIÓN CERTIFICACIÓN OFICIAL (INSPIRADA EN G-TALENT) ── */}
      <section className="py-16 bg-zinc-950 text-white relative overflow-hidden border-y border-zinc-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1DACE3]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EA0C7F]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texto Descriptivo */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>VALIDEZ PROFESIONAL</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading leading-tight">
                Certificado Digital con <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DACE3] via-[#EA0C7F] to-[#FEAD2B]">
                  Verificación Criptográfica Única
                </span>
              </h2>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Al culminar cualquiera de nuestros programas y defender el proyecto final, recibes un Diploma Digital avalado por <strong>Inteligencia Neuronal Group</strong> con código de verificación QR verificable por empleadores y clientes B2B.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                  <span>Código de validación permanente en nuestro portal de certificados.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                  <span>Insignia compatible para añadir directamente a tu perfil de LinkedIn.</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-zinc-300">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">✓</div>
                  <span>Acreditación de horas prácticas de arquitectura y laboratorio.</span>
                </div>
              </div>
            </div>

            {/* Mockup del Diploma Oficial */}
            <div className="lg:col-span-6">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-zinc-900/90 border border-zinc-700/80 shadow-2xl space-y-6 text-center backdrop-blur-md">
                
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 relative">
                      <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="font-heading font-bold text-sm tracking-tight">Inteligencia Neuronal Academy</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">ID: CERT-2026-IN</span>
                </div>

                <div className="space-y-2 py-4">
                  <span className="text-[11px] font-mono tracking-widest text-[#1DACE3] uppercase font-bold">
                    DIPLOMA DE EXCELENCIA PROFESIONAL
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif text-zinc-100 font-bold italic">
                    Nombre del Graduado
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto pt-1">
                    Por haber superado con distinción los requisitos teóricos y la implementación en vivo del programa:
                  </p>
                  <p className="text-sm font-bold text-white pt-1">
                    Arquitecto de Pipelines n8n & Agentes IA
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800 pt-4 text-[10px] font-mono text-zinc-400">
                  <div>
                    <span className="block font-bold text-zinc-200">Julio Daza</span>
                    <span>Director de Arquitectura</span>
                  </div>
                  <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center">
                    <div className="w-full h-full bg-zinc-950 flex items-center justify-center text-[8px] text-white font-bold">
                      QR OK
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── TOOLKIT: RECURSOS DESCARGABLES GRATUITOS & PREMIUM (DE PAGO) ── */}
      <section id="toolkit" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-[#EA0C7F] uppercase tracking-wider bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
            Recursos Operativos & Blueprints
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-heading">
            Toolkit de Automatización & Plantillas
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Herramientas reales utilizadas en nuestras consultorías B2B. Descarga las plantillas gratuitas o adquiere blueprints avanzados listos para producción.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((res) => {
            const isPremium = res.access?.includes("PREMIUM") || (res.price && res.price !== "GRATIS" && !res.price.includes("$0"));
            const state = downloadStates[res.id] || { loading: false, success: false, message: "" };

            return (
              <div
                key={res.id}
                className={"rounded-3xl border bg-white p-6 flex flex-col justify-between transition-all space-y-5 " + (isPremium ? "border-[#FEAD2B]/60 shadow-md ring-1 ring-[#FEAD2B]/20" : "border-zinc-200 shadow-sm hover:shadow-md")}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={"px-2.5 py-0.5 rounded text-[10px] font-mono font-bold " + (isPremium ? "bg-amber-100 text-amber-900" : "bg-zinc-100 text-zinc-800")}>
                      {res.tag}
                    </span>
                    {isPremium ? (
                      <span className="font-mono text-xs font-extrabold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        {res.price || "$27 USD"}
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        GRATIS
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-zinc-900 leading-snug">
                    {res.title}
                  </h3>

                  <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
                    {res.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-zinc-100">
                  {isPremium ? (
                    <button
                      type="button"
                      onClick={() =>
                        openCheckout({
                          id: res.id,
                          title: res.title,
                          price: res.price || "$27 USD",
                          tagline: res.desc,
                          duration: "Descarga Inmediata + Licencia",
                          badge: "BLUEPRINT PREMIUM",
                        })
                      }
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FEAD2B] to-[#EA0C7F] hover:opacity-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <CreditCard className="w-3.5 h-3.5" />
                      <span>Comprar por {res.price || "$27 USD"}</span>
                    </button>
                  ) : (
                    <form onSubmit={(e) => handleResourceSubmit(e, res.id)} className="space-y-2">
                      {state.success ? (
                        <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium text-center flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>{state.message}</span>
                        </div>
                      ) : (
                        <>
                          <input
                            type="email"
                            required
                            placeholder="tu@empresa.com"
                            value={resourceEmails[res.id] || ""}
                            onChange={(e) => setResourceEmails((prev) => ({ ...prev, [res.id]: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-[#0284c7] outline-none"
                          />
                          <button
                            type="submit"
                            disabled={state.loading}
                            className="w-full py-2 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            {state.loading ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <>
                                <Download className="w-3.5 h-3.5 text-[#1DACE3]" />
                                <span>Descargar Gratis</span>
                              </>
                            )}
                          </button>
                        </>
                      )}
                    </form>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </section>

      {/* ── GARANTÍA & COMPROMISO DE CALIDAD ── */}
      <section className="py-16 bg-zinc-50 border-t border-zinc-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 shadow-sm flex items-center justify-center mx-auto text-emerald-600">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-zinc-900 font-heading">
            Garantía Incondicional de 14 Días
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed max-w-2xl mx-auto">
            Ingresa al campus, revisa los módulos y prueba los blueprints. Si en los primeros 14 días consideras que el contenido no supera con creces tu inversión, te devolvemos el 100% de tu dinero sin preguntas ni trabas.
          </p>
        </div>
      </section>

      <CourseCheckoutModal />
      <Footer />
    </main>
  );
}
