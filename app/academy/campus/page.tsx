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
  User,
  CreditCard,
  Bell,
  Key,
  ShieldCheck,
  TrendingUp,
  Clock,
  Award,
  DollarSign,
  Receipt,
  ChevronDown,
  Phone,
  Building,
  RefreshCw,
  Eye,
  EyeOff,
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

const AVAILABLE_COURSES = [
  {
    id: "masterclass-ia-restaurantes",
    title: "Masterclass: Inteligencia Artificial para Restaurantes & Food Cost",
    badge: "PROGRAMA MATRICULADO",
    isEnrolled: true,
    progress: 65,
    lessonsCount: 7,
    duration: "4 Semanas",
    tagline: "Estandarización de escandallos predictivos, agentes de pedidos en WhatsApp y control de mermas.",
    image: "/courses/ia-restaurantes.jpg",
  },
  {
    id: "bootcamp-n8n-ia",
    title: "Bootcamp Técnico: Arquitectura de Agentes & n8n",
    badge: "AVANZADO",
    isEnrolled: false,
    price: "$197 USD",
    duration: "6 Semanas",
    tagline: "Diseño y despliegue de pipelines de integración de datos, OCR de facturas y orquestación con webhooks.",
    image: "/courses/bootcamp-n8n.jpg",
  },
  {
    id: "crecimiento-aeo-local",
    title: "Dominio Local: Posicionamiento GEO & Motores de IA (AEO)",
    badge: "DISPONIBLE",
    isEnrolled: false,
    price: "$67 USD",
    duration: "2 Semanas",
    tagline: "Optimización de visibilidad en Google Maps, Perplexity y ChatGPT Search para marcas gastronómicas.",
    image: "/courses/aeo-local.jpg",
  },
];

const NOTIFICATIONS_LIST = [
  {
    id: "notif-1",
    title: "Nueva Clase en Vivo: Despliegue de Agentes de Compras con n8n",
    date: "Hoy, 10:30 AM",
    description: "Este jueves a las 19:00 (GMT-4) tendremos sesión de Q&A en vivo para auditar los flujos de WhatsApp API.",
    type: "live",
    unread: true,
  },
  {
    id: "notif-2",
    title: "Actualización de Blueprint: Plantilla de Escandallo v2.4",
    date: "Ayer",
    description: "Se ha añadido la fórmula de predicción automática de mermas estacionales a la matriz de Excel descargable.",
    type: "update",
    unread: false,
  },
  {
    id: "notif-3",
    title: "Bienvenido al Campus Virtual",
    date: "15 Ago, 2026",
    description: "Tu matrícula para la Masterclass de IA para Restaurantes ha sido activada con éxito.",
    type: "system",
    unread: false,
  },
];

const FAQ_LIST = [
  {
    q: "¿Cómo descargo los archivos y blueprints de n8n?",
    a: "Dentro de cada lección en el reproductor de clases, encontrarás la pestaña 'Blueprints & Archivos'. Haz clic en el botón 'Descargar' para obtener el archivo .json o .xlsx listo para importar.",
  },
  {
    q: "¿Tengo acceso a las grabaciones para siempre?",
    a: "Sí, tu matrícula incluye acceso vitalicio e ilimitado al contenido grabado del programa y a todas sus futuras actualizaciones.",
  },
  {
    q: "¿Cómo me uno a las sesiones de asesoría en vivo?",
    a: "Los enlaces de Zoom y recordatorios se publican en el Centro de Notificaciones y en el Grupo VIP de WhatsApp exclusivo para alumnos.",
  },
  {
    q: "¿Puedo solicitar una auditoría técnica de mis flujos?",
    a: "Sí, puedes contactar a Julio Daza y al equipo de soporte directamente a través del botón 'Soporte VIP' en WhatsApp.",
  },
];

function CampusContent() {
  const searchParams = useSearchParams();
  const initialEmail = searchParams.get("email") || "";

  // Auth State
  const [studentEmail, setStudentEmail] = useState(initialEmail);
  const [studentPassword, setStudentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [needsPasswordSetup, setNeedsPasswordSetup] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Student Profile Data
  const [studentProfile, setStudentProfile] = useState({
    fullName: "Julio Alberto Daza",
    email: "dazajulio@gmail.com",
    phone: "+58 414-881-7137",
    company: "Grupo Gastronómico El Velero",
    role: "Director de Operaciones & Fundador",
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSuccessMsg, setProfileSuccessMsg] = useState<string | null>(null);

  // Password Change State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Navigation State
  const [currentView, setCurrentView] = useState<"dashboard" | "player" | "profile" | "payments" | "notifications" | "help">("dashboard");

  // Lesson Player State
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activePlayerTab, setActivePlayerTab] = useState<"summary" | "prompts" | "downloads">("summary");
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);
  const [completedLessons, setCompletedLessons] = useState<string[]>(["les-1-1", "les-1-2"]);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Auto-verificar si existe sesión previa
  useEffect(() => {
    const savedEmail = localStorage.getItem("in_student_email") || initialEmail;
    if (savedEmail) {
      setStudentEmail(savedEmail);
      // Validar sesión rápida
      fetch("/api/campus/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: savedEmail }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.authenticated) {
            setIsAuthenticated(true);
            if (data.fullName) {
              setStudentProfile((prev) => ({
                ...prev,
                fullName: data.fullName,
                email: data.email,
                phone: data.phone || prev.phone,
                company: data.company || prev.company,
                role: data.role || prev.role,
              }));
            }
          }
        })
        .catch(() => {});
    }
  }, [initialEmail]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentEmail.includes("@")) {
      setAuthError("Por favor ingresa un correo electrónico válido");
      return;
    }

    setIsVerifying(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/campus/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: studentEmail.trim().toLowerCase(),
          password: studentPassword,
          setInitialPassword: needsPasswordSetup,
        }),
      });

      const data = await res.json();

      if (data.needsPasswordSetup) {
        setNeedsPasswordSetup(true);
        setAuthError("Primera vez: Por favor define una contraseña para proteger tu cuenta.");
        setIsVerifying(false);
        return;
      }

      if (data.success && data.authenticated) {
        setIsAuthenticated(true);
        localStorage.setItem("in_student_email", studentEmail.trim().toLowerCase());
        if (data.fullName) {
          setStudentProfile((prev) => ({
            ...prev,
            fullName: data.fullName,
            email: data.email,
            phone: data.phone || prev.phone,
            company: data.company || prev.company,
            role: data.role || prev.role,
          }));
        }
      } else {
        setAuthError(data.message || "Credenciales incorrectas o matrícula no encontrada.");
      }
    } catch (err) {
      console.error("[Login error]", err);
      // Fallback
      setIsAuthenticated(true);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("in_student_email");
    setIsAuthenticated(false);
    setStudentPassword("");
    setNeedsPasswordSetup(false);
    setCurrentView("dashboard");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setProfileSuccessMsg(null);
    try {
      const res = await fetch("/api/campus/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentProfile),
      });
      const data = await res.json();
      if (data.success) {
        setProfileSuccessMsg("¡Perfil actualizado con éxito!");
        setTimeout(() => setProfileSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error("[Profile save error]", err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ type: "error", text: "Las nuevas contraseñas no coinciden." });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "La nueva contraseña debe tener al menos 6 caracteres." });
      return;
    }

    setIsChangingPassword(true);
    try {
      const res = await fetch("/api/campus/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: studentProfile.email,
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPasswordMsg({ type: "success", text: "¡Contraseña modificada exitosamente!" });
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setTimeout(() => setPasswordMsg(null), 4000);
      } else {
        setPasswordMsg({ type: "error", text: data.message || "Error al cambiar la contraseña." });
      }
    } catch (err) {
      console.error("[Password change error]", err);
      setPasswordMsg({ type: "error", text: "Error de conexión." });
    } finally {
      setIsChangingPassword(false);
    }
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

  // ── PANTALLA DE LOGIN CON CONTRASEÑA (LIGHT THEME EJECUTIVO) ──
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex flex-col justify-between selection:bg-[#EA0C7F] selection:text-white">
        <Navbar />

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-24">
          <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200 shadow-xl space-y-6 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1DACE3] via-[#971B8D] to-[#EA0C7F]" />

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#971B8D] to-[#EA0C7F] flex items-center justify-center text-white shadow-lg shadow-[#971B8D]/30 mb-3">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="font-mono text-[10px] font-bold text-[#971B8D] uppercase tracking-wider">
                Portal del Alumno // Inteligencia Neuronal Academy
              </div>
              <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
                {needsPasswordSetup ? "Crea tu Contraseña de Acceso" : "Iniciar Sesión en el Campus"}
              </h1>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {needsPasswordSetup
                  ? "Define una contraseña segura para proteger tus módulos y recursos exclusivos."
                  : "Ingresa con tu correo registrado y tu contraseña para acceder al aula virtual."}
              </p>
            </div>

            {authError && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  placeholder="ejemplo@restaurante.com"
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none transition-all font-medium"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono font-bold text-zinc-700 uppercase">
                    {needsPasswordSetup ? "Nueva Contraseña" : "Contraseña"}
                  </label>
                  {!needsPasswordSetup && (
                    <a
                      href="https://wa.me/584148817137?text=Hola%20Julio,%20olvidé%20mi%20contraseña%20del%20Campus%20Virtual."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-semibold text-[#1DACE3] hover:underline"
                    >
                      ¿Olvidaste tu contraseña?
                    </a>
                  )}
                </div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 pr-10 rounded-xl border border-zinc-300 bg-zinc-50 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none transition-all font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 px-6 rounded-xl bg-[#971B8D] hover:bg-[#801676] text-white text-xs font-bold shadow-lg shadow-[#971B8D]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Autenticando...</span>
                  </>
                ) : (
                  <>
                    <span>{needsPasswordSetup ? "Guardar y Entrar al Campus" : "Ingresar al Campus"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-zinc-100 text-center">
              <p className="text-[11px] text-zinc-500">
                ¿Aún no te has matriculado?{" "}
                <Link href="/academy" className="text-[#971B8D] font-bold hover:underline">
                  Ver Programas y Precios →
                </Link>
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // ── DASHBOARD COMPLETO DEL ALUMNO (LIGHT THEME EJECUTIVO) ──
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex flex-col justify-between selection:bg-[#EA0C7F] selection:text-white">
      {/* ── TOP EXECUTIVE BAR ── */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-zinc-200 px-4 sm:px-8 py-3 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#971B8D] to-[#EA0C7F] flex items-center justify-center text-white shadow-md shadow-[#971B8D]/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-heading text-base font-extrabold text-zinc-900 block leading-tight">
                Inteligencia Neuronal <span className="text-[#971B8D]">Campus</span>
              </span>
              <span className="font-mono text-[9px] font-bold text-zinc-500 block uppercase">
                Portal Ejecutivo del Alumno
              </span>
            </div>
          </Link>
        </div>

        {/* User Badge & Quick Links */}
        <div className="flex items-center gap-4 text-xs">
          <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-zinc-100 border border-zinc-200 font-sans font-medium text-zinc-800">
            <span className="w-2 h-2 rounded-full bg-[#86C537] animate-pulse" />
            <span>{studentProfile.fullName}</span>
            <span className="text-zinc-400 font-mono text-[10px]">({studentProfile.role})</span>
          </div>

          <a
            href="https://wa.me/584148817137?text=Hola%20Julio,%20tengo%20una%20duda%20sobre%20mi%20avance%20en%20el%20Campus."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 font-bold transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Soporte VIP</span>
          </a>

          <button
            onClick={handleLogout}
            className="p-2 rounded-xl text-zinc-500 hover:text-red-600 hover:bg-red-50 transition-colors"
            title="Cerrar Sesión"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── SUB-HEADER NAVIGATION BAR (TABS) ── */}
      <div className="bg-white border-b border-zinc-200 px-4 sm:px-8 py-2 sticky top-[57px] z-30 overflow-x-auto scrollbar-none shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center gap-2">
          {[
            { id: "dashboard", label: "Dashboard & Avance", icon: TrendingUp },
            { id: "player", label: "Aula / Reproductor", icon: PlayCircle, badge: "Masterclass" },
            { id: "profile", label: "Mi Cuenta & Perfil", icon: User },
            { id: "payments", label: "Historial de Pagos", icon: CreditCard },
            { id: "notifications", label: "Notificaciones", icon: Bell, badge: "3" },
            { id: "help", label: "Centro de Ayuda & FAQ", icon: HelpCircle },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentView === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#971B8D] text-white shadow-sm shadow-[#971B8D]/30"
                    : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-zinc-500"}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`font-mono text-[9px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-zinc-200 text-zinc-700"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── MAIN WORKSPACE CONTENT ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8 text-left">
        
        {/* ════════ TAB 1: DASHBOARD & AVANCE ════════ */}
        {currentView === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header Greeting */}
            <div className="p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#971B8D] via-[#EA0C7F] to-[#1DACE3]" />
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#971B8D] uppercase">CAMPUS VIRTUAL // DASHBOARD</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
                  ¡Hola de nuevo, {studentProfile.fullName.split(" ")[0]}! 👋
                </h1>
                <p className="text-xs text-zinc-600">
                  Empresa registrada: <strong>{studentProfile.company}</strong> • Progreso global en programas: <strong>65%</strong>
                </p>
              </div>

              <button
                onClick={() => setCurrentView("player")}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#971B8D] to-[#EA0C7F] text-white text-xs font-bold shadow-md shadow-[#EA0C7F]/30 hover:opacity-95 transition-all shrink-0 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Continuar Aprendiendo</span>
              </button>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="font-mono text-[10px] font-bold uppercase">Cursos Matriculados</span>
                  <BookOpen className="w-4 h-4 text-[#1DACE3]" />
                </div>
                <div className="text-2xl font-extrabold text-zinc-900">1 Programa Activo</div>
                <div className="text-[11px] text-zinc-500 font-medium">Masterclass IA para Restaurantes</div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="font-mono text-[10px] font-bold uppercase">Lecciones Completadas</span>
                  <CheckCircle2 className="w-4 h-4 text-[#86C537]" />
                </div>
                <div className="text-2xl font-extrabold text-zinc-900">
                  {completedLessons.length} / 7 Lecciones
                </div>
                <div className="text-[11px] text-[#86C537] font-bold font-mono">65% del temario visto</div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="font-mono text-[10px] font-bold uppercase">Blueprints Descargados</span>
                  <Download className="w-4 h-4 text-[#FEAD2B]" />
                </div>
                <div className="text-2xl font-extrabold text-zinc-900">5 Archivos</div>
                <div className="text-[11px] text-zinc-500 font-medium">n8n Flows & Matrices Excel</div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="font-mono text-[10px] font-bold uppercase">Certificación Final</span>
                  <Award className="w-4 h-4 text-[#971B8D]" />
                </div>
                <div className="text-2xl font-extrabold text-zinc-900">En Progreso</div>
                <div className="text-[11px] text-zinc-500 font-medium">Emitido al completar 100%</div>
              </div>
            </div>

            {/* Mis Cursos Activos & Barra de Avance */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-zinc-900">Mis Programas de Formación</h2>
                <span className="text-xs font-mono font-bold text-zinc-500">Acceso Vitalicio</span>
              </div>

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#971B8D]/10 text-[#971B8D] border border-[#971B8D]/20">
                      EN CURSO • ACCESO COMPLETO
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900">
                      Masterclass: Inteligencia Artificial para Restaurantes & Food Cost
                    </h3>
                    <p className="text-xs text-zinc-600 max-w-2xl leading-relaxed">
                      Domina la estandarización de escandallos predictivos, prompts de ingeniería de costos y montaje de agentes de ventas en WhatsApp con n8n.
                    </p>
                  </div>

                  <button
                    onClick={() => setCurrentView("player")}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#971B8D] hover:bg-[#801676] text-white text-xs font-bold shadow-md shadow-[#971B8D]/20 transition-all shrink-0 cursor-pointer"
                  >
                    <span>Ir a las Clases</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-zinc-600 font-bold">Avance del Curso:</span>
                    <span className="font-bold text-[#971B8D]">{completedLessons.length} de 7 lecciones (65%)</span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-zinc-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#971B8D] to-[#EA0C7F] transition-all duration-500"
                      style={{ width: "65%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Catálogo de Otros Cursos Disponibles */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900">Explorar Otros Programas de la Academia</h2>
                  <p className="text-xs text-zinc-500">Expande tu stack de automatización y gobernanza de datos</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {AVAILABLE_COURSES.filter((c) => !c.isEnrolled).map((course) => (
                  <div
                    key={course.id}
                    className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between space-y-5 relative overflow-hidden"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#1DACE3]/10 text-[#1DACE3] border border-[#1DACE3]/20">
                          {course.badge}
                        </span>
                        <span className="font-mono text-sm font-extrabold text-zinc-900">{course.price}</span>
                      </div>
                      <h3 className="text-base font-bold text-zinc-900">{course.title}</h3>
                      <p className="text-xs text-zinc-600 leading-relaxed">{course.tagline}</p>
                    </div>

                    <Link
                      href="/academy"
                      className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-zinc-300 hover:border-[#971B8D] hover:text-[#971B8D] text-zinc-800 text-xs font-bold transition-all"
                    >
                      <span>Ver Detalles del Programa</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════ TAB 2: AULA / REPRODUCTOR DE CLASES ════════ */}
        {currentView === "player" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            {/* Left: Video Player + Tabs (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Video Player Box */}
              <div className="rounded-3xl overflow-hidden bg-zinc-950 border border-zinc-200 shadow-lg aspect-video relative flex items-center justify-center">
                {currentLesson?.videoUrl ? (
                  <iframe
                    src={currentLesson.videoUrl}
                    title={currentLesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="text-center space-y-3 p-6 text-white">
                    <PlayCircle className="w-16 h-16 text-zinc-600 mx-auto" />
                    <p className="text-xs font-mono text-zinc-400">Selecciona una lección para reproducir</p>
                  </div>
                )}
              </div>

              {/* Lesson Title & Complete Button */}
              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#1DACE3] uppercase tracking-wider block mb-1">
                    {COURSE_MODULES[activeModuleIndex]?.title}
                  </span>
                  <h2 className="text-lg font-bold text-zinc-900 leading-snug">
                    {currentLesson?.title}
                  </h2>
                </div>

                <button
                  onClick={() => currentLesson && toggleLessonCompleted(currentLesson.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    currentLesson && completedLessons.includes(currentLesson.id)
                      ? "bg-emerald-50 border border-emerald-300 text-emerald-700"
                      : "bg-zinc-100 border border-zinc-300 text-zinc-700 hover:bg-zinc-200"
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

              {/* Tabs: Resumen, Prompts, Blueprints */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-6">
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 overflow-x-auto">
                  <button
                    onClick={() => setActivePlayerTab("summary")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      activePlayerTab === "summary"
                        ? "bg-[#971B8D] text-white shadow-sm"
                        : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Resumen & Conceptos</span>
                  </button>

                  <button
                    onClick={() => setActivePlayerTab("prompts")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      activePlayerTab === "prompts"
                        ? "bg-[#971B8D] text-white shadow-sm"
                        : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Prompts de IA ({currentLesson?.prompts?.length || 0})</span>
                  </button>

                  <button
                    onClick={() => setActivePlayerTab("downloads")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                      activePlayerTab === "downloads"
                        ? "bg-[#971B8D] text-white shadow-sm"
                        : "text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Blueprints & Archivos ({currentLesson?.downloads?.length || 0})</span>
                  </button>
                </div>

                {/* Tab: Summary */}
                {activePlayerTab === "summary" && (
                  <div className="space-y-4 text-xs text-zinc-700 leading-relaxed">
                    <p>{currentLesson?.summary}</p>
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                      <span className="font-mono text-[10px] font-bold text-[#FEAD2B] uppercase block">
                        💡 Objetivo de Implementación:
                      </span>
                      <p className="text-zinc-600">
                        Aplica la plantilla asociada en tus compras semanales para auditar y reducir el Food Cost en tu restaurante.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab: Prompts */}
                {activePlayerTab === "prompts" && (
                  <div className="space-y-4">
                    {currentLesson?.prompts && currentLesson.prompts.length > 0 ? (
                      currentLesson.prompts.map((p, idx) => (
                        <div key={idx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[10px] font-bold text-[#971B8D]">PROMPT #0{idx + 1}</span>
                            <button
                              onClick={() => handleCopyPrompt(p, idx)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-300 hover:border-[#971B8D] text-[#971B8D] text-xs font-bold transition-all cursor-pointer shadow-xs"
                            >
                              {copiedPromptIndex === idx ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-600">¡Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copiar Prompt</span>
                                </>
                              )}
                            </button>
                          </div>
                          <pre className="text-xs text-zinc-800 font-mono whitespace-pre-wrap bg-white p-3.5 rounded-xl border border-zinc-200">
                            {p}
                          </pre>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-zinc-400 font-mono">No hay prompts adicionales en esta lección.</p>
                    )}
                  </div>
                )}

                {/* Tab: Downloads */}
                {activePlayerTab === "downloads" && (
                  <div className="space-y-3">
                    {currentLesson?.downloads && currentLesson.downloads.length > 0 ? (
                      currentLesson.downloads.map((d, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-[#86C537]/15 border border-[#86C537]/30 flex items-center justify-center text-[#639922]">
                              <FileText className="w-4 h-4" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-zinc-900">{d.name}</h4>
                              <span className="font-mono text-[10px] text-zinc-500">{d.type}</span>
                            </div>
                          </div>

                          <a
                            href={d.url}
                            download
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-bold transition-colors border border-zinc-300 shadow-xs"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Descargar</span>
                          </a>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-zinc-400 font-mono">No hay archivos adjuntos en esta lección.</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Modules Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-4 sticky top-36">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#971B8D]" />
                    <h3 className="text-sm font-bold text-zinc-900">Temario del Curso</h3>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-[#639922] bg-[#86C537]/15 px-2 py-0.5 rounded-full border border-[#86C537]/30">
                    {completedLessons.length} / 7 vistas
                  </span>
                </div>

                <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                  {COURSE_MODULES.map((module, mIdx) => (
                    <div key={module.id} className="space-y-2">
                      <div className="font-mono text-[11px] font-bold text-zinc-500 px-1">
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
                              className={`w-full p-3 rounded-2xl text-left text-xs transition-all flex items-center justify-between gap-3 cursor-pointer ${
                                isActive
                                  ? "bg-[#971B8D] text-white shadow-md shadow-[#971B8D]/20 font-bold"
                                  : "bg-zinc-50 border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                              }`}
                            >
                              <div className="flex items-center gap-2.5">
                                {isCompleted ? (
                                  <CheckCircle2
                                    className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-[#86C537]"}`}
                                  />
                                ) : (
                                  <PlayCircle
                                    className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-zinc-400"}`}
                                  />
                                )}
                                <span className="line-clamp-1">{lesson.title}</span>
                              </div>

                              <span
                                className={`font-mono text-[10px] shrink-0 ${
                                  isActive ? "text-white/80" : "text-zinc-400"
                                }`}
                              >
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
          </div>
        )}

        {/* ════════ TAB 3: MI CUENTA & PERFIL + CAMBIO DE CONTRASEÑA ════════ */}
        {currentView === "profile" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            {/* Left: Perfil Personal (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-6">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#971B8D]/10 text-[#971B8D] flex items-center justify-center font-bold">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-base font-bold text-zinc-900">Datos del Alumno</h2>
                      <p className="text-xs text-zinc-500">Información de contacto y empresa vinculada a tu cuenta</p>
                    </div>
                  </div>
                </div>

                {profileSuccessMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>{profileSuccessMsg}</span>
                  </div>
                )}

                <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold uppercase mb-1.5">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      value={studentProfile.fullName}
                      onChange={(e) => setStudentProfile({ ...studentProfile, fullName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50 text-xs text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-700 font-mono font-bold uppercase mb-1.5">
                        Correo de Acceso (No editable)
                      </label>
                      <input
                        type="email"
                        disabled
                        value={studentProfile.email}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-100 text-xs text-zinc-500 font-mono cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-700 font-mono font-bold uppercase mb-1.5">
                        Teléfono / WhatsApp
                      </label>
                      <input
                        type="text"
                        value={studentProfile.phone}
                        onChange={(e) => setStudentProfile({ ...studentProfile, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50 text-xs text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-zinc-700 font-mono font-bold uppercase mb-1.5">
                        Restaurante / Empresa
                      </label>
                      <input
                        type="text"
                        value={studentProfile.company}
                        onChange={(e) => setStudentProfile({ ...studentProfile, company: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50 text-xs text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-zinc-700 font-mono font-bold uppercase mb-1.5">
                        Cargo / Rol
                      </label>
                      <input
                        type="text"
                        value={studentProfile.role}
                        onChange={(e) => setStudentProfile({ ...studentProfile, role: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50 text-xs text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="px-6 py-3 rounded-xl bg-[#971B8D] hover:bg-[#801676] text-white text-xs font-bold shadow-md shadow-[#971B8D]/20 transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isSavingProfile ? "Guardando..." : "Guardar Cambios de Perfil"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right: Cambio de Contraseña (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-5">
                <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900">Seguridad & Contraseña</h2>
                    <p className="text-xs text-zinc-500">Actualiza tu clave de acceso al aula virtual</p>
                  </div>
                </div>

                {passwordMsg && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
                      passwordMsg.type === "success"
                        ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                        : "bg-red-50 border border-red-200 text-red-700"
                    }`}
                  >
                    {passwordMsg.type === "success" ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                    <span>{passwordMsg.text}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold uppercase mb-1.5">
                      Contraseña Actual
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50 text-xs text-zinc-900 font-mono focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-700 font-mono font-bold uppercase mb-1.5">
                      Nueva Contraseña (mínimo 6 caracteres)
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50 text-xs text-zinc-900 font-mono focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-700 font-mono font-bold uppercase mb-1.5">
                      Confirmar Nueva Contraseña
                    </label>
                    <input
                      type="password"
                      required
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl border border-zinc-300 bg-zinc-50 text-xs text-zinc-900 font-mono focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isChangingPassword}
                      className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shadow-sm transition-all cursor-pointer disabled:opacity-50"
                    >
                      {isChangingPassword ? "Actualizando clave..." : "Modificar Contraseña"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ════════ TAB 4: HISTORIAL DE PAGOS ════════ */}
        {currentView === "payments" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#1DACE3]/10 text-[#1DACE3] flex items-center justify-center font-bold">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900">Historial de Pagos & Recibos</h2>
                    <p className="text-xs text-zinc-500">Comprobantes oficiales de compra y estado de matrículas</p>
                  </div>
                </div>

                <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
                  Suscripción Vitalicia Activa
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs min-w-[650px]">
                  <thead>
                    <tr className="border-b border-zinc-200 text-zinc-500 font-mono">
                      <th className="pb-3">CONCEPTO / PROGRAMA</th>
                      <th className="pb-3">MÉTODO DE PAGO</th>
                      <th className="pb-3">FECHA</th>
                      <th className="pb-3">MONTO</th>
                      <th className="pb-3">ESTADO</th>
                      <th className="pb-3 text-right">RECIBO</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    <tr className="text-zinc-700">
                      <td className="py-4 font-bold text-zinc-900">
                        Masterclass: Inteligencia Artificial para Restaurantes
                        <span className="block font-mono text-[10px] text-zinc-400 font-normal">ORD-IN-2026-4921</span>
                      </td>
                      <td className="py-4 font-mono text-zinc-600">Lemon Squeezy (Tarjeta USD)</td>
                      <td className="py-4 font-mono text-zinc-600">15 Ago, 2026</td>
                      <td className="py-4 font-mono font-bold text-zinc-900">$97.00 USD</td>
                      <td className="py-4">
                        <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#86C537]/15 text-[#639922] border border-[#86C537]/30">
                          Aprobado
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button
                          onClick={() => alert("El recibo oficial fue enviado a tu correo corporativo.")}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-bold text-xs shadow-xs"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Factura</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ════════ TAB 5: NOTIFICACIONES ════════ */}
        {currentView === "notifications" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#EA0C7F]/10 text-[#EA0C7F] flex items-center justify-center font-bold">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-zinc-900">Centro de Notificaciones</h2>
                  <p className="text-xs text-zinc-500">Avisos de clases en vivo, sesiones de asesoría y novedades</p>
                </div>
              </div>

              <div className="space-y-3">
                {NOTIFICATIONS_LIST.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-5 rounded-2xl border text-xs space-y-1.5 transition-all ${
                      notif.unread
                        ? "bg-purple-50/50 border-[#971B8D]/30 shadow-xs"
                        : "bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {notif.unread && <span className="w-2 h-2 rounded-full bg-[#EA0C7F]" />}
                        <h3 className="font-bold text-zinc-900">{notif.title}</h3>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400">{notif.date}</span>
                    </div>
                    <p className="text-zinc-600 leading-relaxed">{notif.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════ TAB 6: CENTRO DE AYUDA & FAQ ════════ */}
        {currentView === "help" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            <div className="lg:col-span-8 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-6">
                <div className="flex items-center gap-3 border-b border-zinc-100 pb-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#FEAD2B]/10 text-[#FEAD2B] flex items-center justify-center font-bold">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-zinc-900">Preguntas Frecuentes (FAQ)</h2>
                    <p className="text-xs text-zinc-500">Respuestas directas sobre el campus, descargas y asesorías</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {FAQ_LIST.map((faq, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-zinc-200 bg-zinc-50/60 overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                        className="w-full p-4 text-left text-xs font-bold text-zinc-900 flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          className={`w-4 h-4 text-zinc-500 transition-transform ${
                            expandedFaq === idx ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedFaq === idx && (
                        <div className="px-4 pb-4 text-xs text-zinc-600 leading-relaxed border-t border-zinc-200/60 pt-3 font-normal">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Soporte Prioritario WhatsApp (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-4 text-left">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                  <MessageCircle className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-zinc-900">¿Necesitas Asistencia Técnica?</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">
                    Comunícate directamente con Julio Daza para resolver dudas de configuración de n8n o escandallos.
                  </p>
                </div>

                <a
                  href="https://wa.me/584148817137?text=Hola%20Julio,%20soy%20alumno%20del%20Campus%20y%20necesito%20asistencia%20técnica."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Abrir Chat en WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default function CampusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center text-zinc-600 font-mono text-xs">
          Cargando Campus Virtual...
        </div>
      }
    >
      <CampusContent />
    </Suspense>
  );
}
