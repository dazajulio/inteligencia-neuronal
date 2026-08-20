"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  GraduationCap,
  PlayCircle,
  CheckCircle2,
  Lock,
  Download,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  MessageCircle,
  FileText,
  Code2,
  Layers,
  ChevronRight,
  LogOut,
  ExternalLink,
  BookOpen,
  HelpCircle,
  Search,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ── DATA DE MÓDULOS Y LECCIONES REALES DEL PROGRAMA ──
interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  summary: string;
  prompts?: string[];
  downloads?: { name: string; type: string; url: string }[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

const COURSE_MODULES: Module[] = [
  {
    id: "mod-1",
    title: "Módulo 01: Fundamentos de Arquitectura & Diagnóstico de Fugas",
    lessons: [
      {
        id: "les-1-1",
        title: "1.1 Diagnóstico de Food Cost y Fugas Ocultas de Margen",
        duration: "28 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
        summary: "Aprende a mapear la cadena de suministro de tu restaurante, identificar variaciones entre compras y consumo real, y aislar los cuellos de botella que erosionan el EBITDA.",
        prompts: [
          `Actúa como un Director de Operaciones Gastronómicas y Auditor Financiero. Analiza el siguiente listado de compras semanales y compáralo con las ventas registradas para calcular la varianza de Food Cost y detectar potenciales fugas en inventario:\n[PEGA AQUÍ TUS DATOS DE COMPRAS Y VENTAS]`,
        ],
        downloads: [
          { name: "Matriz_Diagnostico_FoodCost.xlsx", type: "Excel", url: "#" },
          { name: "Checklist_Auditoria_Recepcion_MateriaPrima.pdf", type: "PDF", url: "#" },
        ],
      },
      {
        id: "les-1-2",
        title: "1.2 Configuración del Ecosistema de Inteligencia de Datos",
        duration: "35 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
        summary: "Estructura de bases de datos operativas en Supabase / Google Sheets y conexión de webhooks para ingesta automática de comandas.",
        prompts: [
          `Genera una estructura de base de datos normalizada para un restaurante que gestione: Platos, Ingredientes con factor de merma, Recetas base (sub-recetas) y Proveedores con precios actualizados.`,
        ],
        downloads: [
          { name: "Esquema_Base_Datos_Restaurante.sql", type: "SQL / Supabase", url: "#" },
        ],
      },
    ],
  },
  {
    id: "mod-2",
    title: "Módulo 02: Prompt Engineering & Escandallos Predictivos con IA",
    lessons: [
      {
        id: "les-2-1",
        title: "2.1 Modelado de Fichas Técnicas Dinámicas con GPT-4o",
        duration: "42 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
        summary: "Cómo crear un asistente de escandallos que actualice automáticamente el coste teórico de cada plato ante fluctuaciones de precios de proveedores.",
        prompts: [
          `Eres un Chef Ejecutivo e Ingeniero de Costes. Toma la siguiente receta tradicional y genera una Ficha Técnica Profesional con: Gramaje neto, % de merma cocción/limpieza, Coste unitario y Precio de venta recomendado con margen bruto del 72%:\nPlato: [NOMBRE DEL PLATO]\nIngredientes: [LISTA CON PRECIOS]`,
        ],
        downloads: [
          { name: "Plantilla_Ficha_Tecnica_Dinamica.xlsx", type: "Excel", url: "#" },
          { name: "System_Prompt_Chef_Costos_GPT4.txt", type: "Prompt Blueprint", url: "#" },
        ],
      },
      {
        id: "les-2-2",
        title: "2.2 Predicción de Demanda y Optimización de Compras",
        duration: "38 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
        summary: "Uso de modelos predictivos y series temporales para estimar compras según histórico de ventas, días de la semana y eventos meteorológicos.",
        prompts: [
          `Analiza la serie temporal de ventas de las últimas 12 semanas y proyecta la orden de compra semanal para carnes y vegetales considerando un buffer de seguridad del 8%:\n[DATOS]`,
        ],
        downloads: [
          { name: "Algoritmo_Prediccion_Compras_n8n.json", type: "n8n Blueprint", url: "#" },
        ],
      },
    ],
  },
  {
    id: "mod-3",
    title: "Módulo 03: Agentes Autónomos en n8n & WhatsApp API",
    lessons: [
      {
        id: "les-3-1",
        title: "3.1 Montaje del Agente de Ventas y Menú en n8n",
        duration: "55 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
        summary: "Construcción paso a paso del flujo de automatización en n8n que conecta Meta WhatsApp Cloud API con OpenAI para atención y toma de pedidos sin intervención humana.",
        prompts: [
          `Eres el asistente virtual de [NOMBRE RESTAURANTE]. Responde a los clientes con tono cálido, presenta el menú segmentado, sugiere maridajes o postres (upselling) y toma los datos de entrega de forma estructurada en formato JSON.`,
        ],
        downloads: [
          { name: "Workflow_Completo_Agente_WhatsApp_n8n.json", type: "n8n JSON Flow", url: "#" },
          { name: "Guia_Setup_Meta_Cloud_API.pdf", type: "PDF Guía", url: "#" },
        ],
      },
      {
        id: "les-3-2",
        title: "3.2 Integración con KDS, Notificaciones y Alertas",
        duration: "48 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
        summary: "Enrutamiento de pedidos automáticos a cocina (KDS/Impresora térmica) y envío de confirmaciones transaccionales con enlaces de pago.",
        downloads: [
          { name: "Template_Notificaciones_Telegram_Cocina.json", type: "n8n Flow", url: "#" },
        ],
      },
    ],
  },
  {
    id: "mod-4",
    title: "Módulo 04: Auditoría, Despliegue & Escalado Multisede",
    lessons: [
      {
        id: "les-4-1",
        title: "4.1 Auditoría de Resultados y Control de Margen EBITDA",
        duration: "30 min",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
        summary: "Cuadro de mando en tiempo real para visualizar ahorro de horas/hombre, incremento en ticket promedio y reducción del Food Cost en 30 días.",
        downloads: [
          { name: "Dashboard_KPIs_Operaciones_LookerStudio.pdf", type: "Template", url: "#" },
        ],
      },
    ],
  },
];

function CampusContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  const [studentEmail, setStudentEmail] = useState(initialEmail);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studentName, setStudentName] = useState("Alumno");
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Lesson Player State
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"summary" | "prompts" | "downloads">("summary");
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  // Auto-verificar si viene el email por parámetro o guardado
  useEffect(() => {
    const savedEmail = localStorage.getItem("in_student_email") || initialEmail;
    if (savedEmail) {
      setStudentEmail(savedEmail);
      verifyAccess(savedEmail);
    }
  }, [initialEmail]);

  const verifyAccess = async (emailToVerify: string) => {
    if (!emailToVerify || !emailToVerify.includes("@")) {
      setAuthError("Por favor ingresa un correo electrónico válido");
      return;
    }

    setIsVerifying(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/campus/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailToVerify.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (data.success && data.authenticated) {
        setIsAuthenticated(true);
        setStudentName(data.fullName || "Alumno");
        localStorage.setItem("in_student_email", emailToVerify.trim().toLowerCase());
      } else {
        setAuthError(data.message || "No encontramos una matrícula activa para este correo.");
      }
    } catch (err) {
      console.error("[Auth error]", err);
      // Fallback amigable
      setIsAuthenticated(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("in_student_email");
    setIsAuthenticated(false);
    setStudentEmail("");
  };

  const currentLesson = COURSE_MODULES[activeModuleIndex]?.lessons[activeLessonIndex];

  const handleCopyPrompt = (promptText: string, idx: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptIndex(idx);
    setTimeout(() => setCopiedPromptIndex(null), 2500);
  };

  const toggleLessonCompleted = (lessonId: string) => {
    setCompletedLessons((prev) =>
      prev.includes(lessonId) ? prev.filter((id) => id !== lessonId) : [...prev, lessonId]
    );
  };

  // ── PANTALLA DE ACCESO / LOGIN SIN FRICCIÓN ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0E131F] text-white flex flex-col justify-between selection:bg-[#EA0C7F] selection:text-white">
        <Navbar />

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-20">
          <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-[#1A2234] border border-slate-800 shadow-2xl space-y-6 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1DACE3] via-[#971B8D] to-[#EA0C7F]" />

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#971B8D] to-[#EA0C7F] flex items-center justify-center text-white shadow-lg shadow-[#971B8D]/30 mb-4">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="font-mono text-[10px] font-bold text-[#1DACE3] uppercase tracking-wider">
                Portal del Alumno // Inteligencia Neuronal Academy
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Acceso al Campus Virtual</h1>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ingresa con el correo electrónico con el que te matriculaste en el programa para acceder a tus clases y descargables.
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold">
                {authError}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyAccess(studentEmail);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-mono font-bold text-slate-300 uppercase mb-1.5">
                  Correo del Alumno
                </label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="tu-correo@empresa.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-700 bg-slate-900 text-sm text-white placeholder-slate-500 focus:border-[#971B8D] focus:outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#971B8D] to-[#EA0C7F] text-white text-xs font-bold shadow-lg shadow-[#EA0C7F]/30 hover:opacity-95 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verificando Matrícula...</span>
                  </>
                ) : (
                  <>
                    <span>Ingresar al Aula Virtual</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-slate-800 text-center">
              <p className="text-[11px] text-slate-400">
                ¿Aún no estás inscrito?{" "}
                <Link href="/academy" className="text-[#1DACE3] hover:underline font-bold">
                  Ver Programas Disponibles →
                </Link>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ── CAMPUS VIRTUAL ACTIVO / REPRODUCTOR & LECCIONES ──
  return (
    <div className="min-h-screen bg-[#0C101A] text-white flex flex-col justify-between selection:bg-[#EA0C7F] selection:text-white">
      {/* Header Campus Bar */}
      <header className="sticky top-0 z-40 bg-[#141A28]/95 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#971B8D] to-[#EA0C7F] flex items-center justify-center text-white shadow-md shadow-[#971B8D]/30">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-heading text-sm font-bold text-white block leading-tight">
                Inteligencia Neuronal <span className="text-[#1DACE3]">Campus</span>
              </span>
              <span className="font-mono text-[9px] font-bold text-slate-400 block">
                Masterclass: IA para Restaurantes & Food Cost
              </span>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Alumno: {studentName}</span>
          </div>

          <a
            href="https://wa.me/584148817137?text=Hola%20Julio,%20tengo%20una%20duda%20sobre%20el%20Campus%20Virtual."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 font-bold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Soporte VIP</span>
          </a>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-800 transition-colors"
            title="Cerrar sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Campus Interface (Player + Sidebar) */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT / MAIN COLUMN: VIDEO PLAYER & LESSON DETAILS (8 cols) */}
        <div className="lg:col-span-8 space-y-6 text-left">
          
          {/* Video Player Box */}
          <div className="rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl aspect-video relative flex items-center justify-center group">
            {currentLesson?.videoUrl ? (
              <iframe
                src={currentLesson.videoUrl}
                title={currentLesson.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="text-center space-y-3 p-6">
                <PlayCircle className="w-16 h-16 text-slate-600 mx-auto group-hover:text-[#EA0C7F] transition-colors" />
                <p className="text-xs text-slate-400 font-mono">Selecciona una lección para reproducir</p>
              </div>
            )}
          </div>

          {/* Lesson Header & Mark Completed Button */}
          <div className="p-6 rounded-3xl bg-[#141A28] border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[10px] font-bold text-[#1DACE3] uppercase tracking-wider block mb-1">
                {COURSE_MODULES[activeModuleIndex]?.title}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                {currentLesson?.title}
              </h2>
            </div>

            <button
              onClick={() => currentLesson && toggleLessonCompleted(currentLesson.id)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                currentLesson && completedLessons.includes(currentLesson.id)
                  ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                  : "bg-slate-900 border border-slate-700 text-slate-300 hover:border-slate-500"
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {currentLesson && completedLessons.includes(currentLesson.id)
                  ? "Lección Completada"
                  : "Marcar como Completada"}
              </span>
            </button>
          </div>

          {/* Content Tabs (Resumen, Prompts IA, Descargables) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#141A28] border border-slate-800 space-y-6">
            
            {/* Tabs Header */}
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
              <button
                onClick={() => setActiveTab("summary")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === "summary"
                    ? "bg-[#971B8D] text-white shadow-md shadow-[#971B8D]/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Resumen & Conceptos</span>
              </button>

              <button
                onClick={() => setActiveTab("prompts")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === "prompts"
                    ? "bg-[#971B8D] text-white shadow-md shadow-[#971B8D]/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-[#1DACE3]" />
                <span>Prompts de IA ({currentLesson?.prompts?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab("downloads")}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  activeTab === "downloads"
                    ? "bg-[#971B8D] text-white shadow-md shadow-[#971B8D]/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Download className="w-3.5 h-3.5 text-[#86C537]" />
                <span>Blueprints & Archivos ({currentLesson?.downloads?.length || 0})</span>
              </button>
            </div>

            {/* Tab 1: Summary */}
            {activeTab === "summary" && (
              <div className="space-y-4 text-xs text-slate-300 leading-relaxed animate-in fade-in">
                <p>{currentLesson?.summary}</p>
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <span className="font-mono text-[10px] font-bold text-[#FEAD2B] uppercase block">
                    💡 Objetivo de Implementación Operativa:
                  </span>
                  <p className="text-slate-400">
                    Aplica la plantilla asociada a esta lección en tus hojas de compras o en tu nodo de n8n para auditar la desviación semanal de materia prima.
                  </p>
                </div>
              </div>
            )}

            {/* Tab 2: Prompts */}
            {activeTab === "prompts" && (
              <div className="space-y-4 animate-in fade-in">
                {currentLesson?.prompts && currentLesson.prompts.length > 0 ? (
                  currentLesson.prompts.map((p, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-[#1DACE3]">PROMPT #0{idx + 1}</span>
                        <button
                          onClick={() => handleCopyPrompt(p, idx)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#971B8D]/20 text-[#EA0C7F] hover:bg-[#971B8D]/40 text-xs font-bold transition-all cursor-pointer"
                        >
                          {copiedPromptIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">¡Copiado!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copiar Prompt</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
                        {p}
                      </pre>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 font-mono">No hay prompts adicionales en esta lección.</p>
                )}
              </div>
            )}

            {/* Tab 3: Downloads */}
            {activeTab === "downloads" && (
              <div className="space-y-3 animate-in fade-in">
                {currentLesson?.downloads && currentLesson.downloads.length > 0 ? (
                  currentLesson.downloads.map((d, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{d.name}</h4>
                          <span className="font-mono text-[10px] text-slate-400">{d.type}</span>
                        </div>
                      </div>

                      <a
                        href={d.url}
                        download
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors border border-slate-700"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Descargar</span>
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 font-mono">No hay archivos adjuntos en esta lección.</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: MODULES & LESSONS PLAYLIST SIDEBAR (4 cols) */}
        <div className="lg:col-span-4 space-y-4 text-left">
          <div className="p-6 rounded-3xl bg-[#141A28] border border-slate-800 shadow-xl space-y-4 sticky top-20">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#EA0C7F]" />
                <h3 className="text-sm font-bold text-white">Temario del Programa</h3>
              </div>
              <span className="font-mono text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                {completedLessons.length} /{" "}
                {COURSE_MODULES.reduce((acc, m) => acc + m.lessons.length, 0)} lecciones
              </span>
            </div>

            {/* Modules Accordion */}
            <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
              {COURSE_MODULES.map((module, mIdx) => (
                <div key={module.id} className="space-y-2">
                  <div className="font-mono text-[11px] font-bold text-slate-400 px-2">
                    {module.title}
                  </div>

                  <div className="space-y-1.5">
                    {module.lessons.map((lesson, lIdx) => {
                      const isActive = activeModuleIndex === mIdx && activeLessonIndex === lIdx;
                      const isCompleted = completedLessons.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setActiveModuleIndex(mIdx);
                            setActiveLessonIndex(lIdx);
                          }}
                          className={`w-full p-3 rounded-2xl text-left text-xs transition-all flex items-center justify-between gap-3 ${
                            isActive
                              ? "bg-gradient-to-r from-[#971B8D]/30 to-[#EA0C7F]/20 border border-[#971B8D] text-white shadow-md"
                              : "bg-slate-900/80 border border-slate-800/80 text-slate-300 hover:bg-slate-900 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            ) : (
                              <PlayCircle
                                className={`w-4 h-4 shrink-0 ${
                                  isActive ? "text-[#EA0C7F]" : "text-slate-500"
                                }`}
                              />
                            )}
                            <span className="line-clamp-1 font-semibold">{lesson.title}</span>
                          </div>

                          <span className="font-mono text-[10px] text-slate-500 shrink-0">
                            {lesson.duration}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default function CampusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C101A] flex items-center justify-center text-white font-mono text-xs">Cargando Campus Virtual...</div>}>
      <CampusContent />
    </Suspense>
  );
}
