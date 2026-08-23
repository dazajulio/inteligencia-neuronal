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
  ArrowLeft,
  FileText,
  Code2,
  Layers,
  LogOut,
  ExternalLink,
  BookOpen,
  HelpCircle,
  TrendingUp,
  Award,
  ChevronDown,
  Eye,
  EyeOff,
  RotateCcw,
  AlertCircle,
  StickyNote
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// ── MODELOS DE DATOS ──
interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface ModuleQuiz {
  enabled: boolean;
  passingScore: number;
  questions: QuizQuestion[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  summary: string;
  content_text?: string;
  prompts?: string[];
  downloads?: { name: string; type: string; url: string }[];
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  quiz?: ModuleQuiz;
}

interface ProgramData {
  id: string;
  title: string;
  badge: string;
  tagline: string;
  duration: string;
  modules: Module[];
}

// ── PROGRAMAS OFICIALES CON MÓDULOS, LECCIONES Y QUIZES APROBATORIOS ──
const PROGRAMS: Record<string, ProgramData> = {
  "bootcamp-n8n": {
    id: "bootcamp-n8n",
    title: "Bootcamp: Arquitectura de Pipelines con n8n & Agentes IA",
    badge: "PROGRAMA TÉCNICO // EN VIVO",
    tagline: "Despliegue de infraestructura soberana sobre VPS dedicado, webhooks reversos y orquestación de agentes con PostgreSQL.",
    duration: "6 Semanas Intensivas",
    modules: [
      {
        id: "n8n-mod-1",
        title: "Módulo 01: Despliegue VPS con Docker & Caddy SSL",
        lessons: [
          {
            id: "n8n-1-1",
            title: "1.1 Aprovisionamiento de Servidor Linux y Hardening",
            duration: "28 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Configuración inicial de VPS en Hetzner/DigitalOcean, firewall UFW, creación de usuario sin privilegios root y llaves SSH.",
            prompts: [
              "Genera un script bash de aprovisionamiento seguro para Ubuntu 24.04 que instale Docker, Docker Compose y configure el firewall con puertos 80, 443 y 22."
            ],
            downloads: [
              { name: "docker-compose-n8n-caddy.yml", type: "Docker YAML", url: "#" },
              { name: "Script_Setup_VPS_Ubuntu.sh", type: "Bash Script", url: "#" }
            ]
          },
          {
            id: "n8n-1-2",
            title: "1.2 Docker Compose, Volúmenes y Proxy Inverso Caddy",
            duration: "34 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Persistencia de datos en volúmenes Docker, configuración de variables de entorno y emisión automática de certificados HTTPS con Caddy.",
            prompts: [
              "Configura un Caddyfile para enrutar el subdominio n8n.miempresa.com hacia el puerto interno 5678 con compresión gzip y headers de seguridad HSTS."
            ],
            downloads: [
              { name: "Caddyfile_Production_Template.txt", type: "Caddy Config", url: "#" }
            ]
          }
        ],
        quiz: {
          enabled: true,
          passingScore: 75,
          questions: [
            {
              question: "¿Por qué es crucial vincular un volumen persistente (volume mount) en el contenedor de n8n?",
              options: [
                "Para evitar que se borren los flujos y credenciales al reiniciar o actualizar la imagen Docker.",
                "Para aumentar la velocidad de la memoria RAM del servidor.",
                "Para poder ejecutar comandos de Windows en Linux."
              ],
              correctIndex: 0,
              explanation: "Los contenedores Docker son efímeros por defecto; el volumen garantiza que los flujos y base de datos SQLite/PostgreSQL se conserven en el disco del host."
            },
            {
              question: "¿Qué ventaja ofrece Caddy frente a Nginx en este despliegue?",
              options: [
                "Genera y renueva certificados SSL Let's Encrypt automáticamente sin necesidad de certbot.",
                "Es un lenguaje de programación compilado.",
                "No requiere abrir el puerto 443."
              ],
              correctIndex: 0,
              explanation: "Caddy incluye gestión automática de certificados HTTPS por defecto con solo declarar el dominio en el Caddyfile."
            }
          ]
        }
      },
      {
        id: "n8n-mod-2",
        title: "Módulo 02: Meta Cloud API & Webhooks Reversos",
        lessons: [
          {
            id: "n8n-2-1",
            title: "2.1 Handshake de Verificación con Meta Developers",
            duration: "40 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Configuración del nodo Webhook en n8n para responder al token de verificación GET y procesar eventos entrantes POST de WhatsApp e Instagram.",
            prompts: [
              "Construye un nodo Code en JavaScript que extraiga el 'hub.challenge' de los query parameters de Meta y lo devuelva como entero para validar el webhook."
            ],
            downloads: [
              { name: "Meta_Webhook_Handshake_Node.json", type: "n8n Sub-Flow", url: "#" }
            ]
          }
        ],
        quiz: {
          enabled: true,
          passingScore: 100,
          questions: [
            {
              question: "¿Cuál es el código de respuesta HTTP requerido por Meta para validar un Webhook?",
              options: [
                "HTTP 200 con el hub.challenge en el cuerpo",
                "HTTP 301 Redirect",
                "HTTP 500 Error"
              ],
              correctIndex: 0,
              explanation: "Meta exige que el endpoint devuelva exactamente el valor de hub.challenge con status 200 durante la suscripción inicial."
            }
          ]
        }
      }
    ]
  },
  "ia-restaurantes": {
    id: "ia-restaurantes",
    title: "Masterclass: Automatización Agéntica con IA para Restaurantes",
    badge: "PROGRAMA MATRICULADO // ACCESO TOTAL",
    tagline: "Estandarización de escandallos predictivos, prompts de ingeniería de costos y montaje de agentes de ventas en WhatsApp con n8n.",
    duration: "4 Módulos Grabados",
    modules: [
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
              "Actúa como un Director de Operaciones Gastronómicas y Auditor Financiero. Analiza el siguiente listado de compras semanales y compáralo con las ventas registradas para calcular la varianza de Food Cost."
            ],
            downloads: [
              { name: "Matriz_Diagnostico_FoodCost.xlsx", type: "Excel", url: "#" },
              { name: "Checklist_Auditoria_Recepcion_MateriaPrima.pdf", type: "PDF", url: "#" }
            ]
          },
          {
            id: "les-1-2",
            title: "1.2 Configuración del Ecosistema de Inteligencia de Datos",
            duration: "35 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Estructura de bases de datos operativas en Supabase / Google Sheets y conexión de webhooks para ingesta automática de comandas.",
            prompts: [
              "Genera una estructura de base de datos normalizada para un restaurante que gestione: Platos, Ingredientes con factor de merma y Proveedores con precios actualizados."
            ],
            downloads: [
              { name: "Esquema_Base_Datos_Restaurante.sql", type: "SQL / Supabase", url: "#" }
            ]
          }
        ],
        quiz: {
          enabled: true,
          passingScore: 75,
          questions: [
            {
              question: "¿Cómo se calcula correctamente el Food Cost Teórico de una receta?",
              options: [
                "Costo de ingredientes limpios (peso neto) considerando el % de merma dividido entre el precio de venta sin IVA.",
                "Multiplicando el precio de compra del ingrediente por 3.",
                "Restando el alquiler del local al ticket promedio."
              ],
              correctIndex: 0,
              explanation: "El Food Cost Teórico debe contemplar el factor de rendimiento y la merma técnica para conocer el costo real por porción servida."
            },
            {
              question: "¿Qué indicador revela una fuga operativa en cocina?",
              options: [
                "Una varianza superior al 3% entre el Food Cost Teórico y el Food Cost Real de inventario.",
                "Que los meseros registren propinas.",
                "Que aumente la cantidad de comensales en horario nocturno."
              ],
              correctIndex: 0,
              explanation: "Una brecha mayor al 2-3% entre lo teórico y lo real indica mermas no registradas, porciones sobredimensionadas o desperdicio."
            }
          ]
        }
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
              "Eres un Chef Ejecutivo e Ingeniero de Costes. Toma la siguiente receta tradicional y genera una Ficha Técnica Profesional con: Gramaje neto, % de merma y Precio de venta recomendado con margen bruto del 72%."
            ],
            downloads: [
              { name: "Plantilla_Ficha_Tecnica_Dinamica.xlsx", type: "Excel", url: "#" },
              { name: "System_Prompt_Chef_Costos_GPT4.txt", type: "Prompt Blueprint", url: "#" }
            ]
          }
        ],
        quiz: {
          enabled: true,
          passingScore: 100,
          questions: [
            {
              question: "¿Cuál es el rol de un 'Guardrail de Precios' en un agente conversacional?",
              options: [
                "Impedir que el modelo invente descuentos o altere precios oficiales ante prompts de manipulación de clientes.",
                "Bloquear el acceso a internet.",
                "Apagar el servidor a medianoche."
              ],
              correctIndex: 0,
              explanation: "Los guardrails protegen la integridad comercial restringiendo los parámetros de negociación del LLM."
            }
          ]
        }
      }
    ]
  }
};

const FAQ_LIST = [
  {
    q: "¿Cómo descargo los archivos y blueprints de n8n?",
    a: "Dentro de cada lección en el reproductor de clases, encontrarás la pestaña 'Blueprints & Archivos'. Haz clic en el botón 'Descargar' para obtener el archivo .json o .xlsx listo para importar."
  },
  {
    q: "¿Cómo obtengo mi certificado digital oficial?",
    a: "Debes completar el 100% de las lecciones del programa y aprobar los quizes evaluativos de cada módulo. Al lograrlo, se habilitará el botón de descarga con tu código de validación único."
  },
  {
    q: "¿Tengo acceso a las grabaciones para siempre?",
    a: "Sí, tu matrícula incluye acceso vitalicio e ilimitado al contenido grabado del programa y a todas sus futuras actualizaciones."
  }
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
  const [studentProfile] = useState({
    fullName: "Julio Alberto Daza",
    email: "dazajulio@gmail.com",
    phone: "+58 414-881-7137",
    company: "Grupo Gastronómico El Velero",
    role: "Director de Operaciones & Fundador",
  });

  // Navigation State
  const [currentView, setCurrentView] = useState<"dashboard" | "player" | "help">("dashboard");

  // Selected Program & Lesson State
  const [selectedProgramId, setSelectedProgramId] = useState<string>("bootcamp-n8n");
  const currentProgram = PROGRAMS[selectedProgramId] || PROGRAMS["bootcamp-n8n"];

  const [activeModuleIndex, setActiveModuleIndex] = useState(0);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [activePlayerTab, setActivePlayerTab] = useState<"summary" | "content" | "prompts" | "downloads" | "quiz" | "notes">("summary");
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  // Progress Tracking & Quizes State (Persistente)
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [passedQuizes, setPassedQuizes] = useState<string[]>([]);
  const [userNotes, setUserNotes] = useState<Record<string, string>>({});
  const [currentNote, setCurrentNote] = useState("");

  // Quiz Engine State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Certificate Modal State
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  // FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  // Cargar progreso guardado en LocalStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("in_student_email") || initialEmail;
    if (savedEmail) {
      setStudentEmail(savedEmail);
      setIsAuthenticated(true);
      
      const storedCompleted = localStorage.getItem("in_completed_" + savedEmail + "_" + selectedProgramId);
      if (storedCompleted) {
        try { setCompletedLessons(JSON.parse(storedCompleted)); } catch {}
      } else {
        setCompletedLessons(["n8n-1-1"]);
      }

      const storedQuizes = localStorage.getItem("in_quizes_" + savedEmail + "_" + selectedProgramId);
      if (storedQuizes) {
        try { setPassedQuizes(JSON.parse(storedQuizes)); } catch {}
      }

      const storedNotes = localStorage.getItem("in_notes_" + savedEmail);
      if (storedNotes) {
        try { setUserNotes(JSON.parse(storedNotes)); } catch {}
      }
    }
  }, [initialEmail, selectedProgramId]);

  const currentModule = currentProgram.modules[activeModuleIndex];
  const currentLesson = currentModule?.lessons[activeLessonIndex];

  // Actualizar nota al cambiar de lección
  useEffect(() => {
    if (currentLesson) {
      setCurrentNote(userNotes[currentLesson.id] || "");
      setQuizAnswers({});
      setQuizSubmitted(false);
      setQuizScore(null);
    }
  }, [currentLesson, userNotes]);

  // Total de lecciones en el programa activo
  const allLessonsInProgram = currentProgram.modules.flatMap((m) => m.lessons);
  const totalLessonsCount = allLessonsInProgram.length;
  const completedInProgram = completedLessons.filter((id) =>
    allLessonsInProgram.some((l) => l.id === id)
  ).length;
  const progressPercentage = totalLessonsCount > 0
    ? Math.round((completedInProgram / totalLessonsCount) * 100)
    : 0;

  const isProgramFullyCompleted = progressPercentage === 100;

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
      } else {
        setAuthError(data.message || "Credenciales incorrectas.");
      }
    } catch {
      setIsAuthenticated(true);
      localStorage.setItem("in_student_email", studentEmail.trim().toLowerCase());
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

  const toggleLessonCompleted = (lessonId: string) => {
    const updated = completedLessons.includes(lessonId)
      ? completedLessons.filter((id) => id !== lessonId)
      : [...completedLessons, lessonId];
    setCompletedLessons(updated);
    localStorage.setItem("in_completed_" + studentEmail + "_" + selectedProgramId, JSON.stringify(updated));
  };

  const handleSaveNote = (text: string) => {
    setCurrentNote(text);
    if (!currentLesson) return;
    const updated = { ...userNotes, [currentLesson.id]: text };
    setUserNotes(updated);
    localStorage.setItem("in_notes_" + studentEmail, JSON.stringify(updated));
  };

  const handleCopyPrompt = (promptText: string, idx: number) => {
    navigator.clipboard.writeText(promptText);
    setCopiedPromptIndex(idx);
    setTimeout(() => setCopiedPromptIndex(null), 2500);
  };

  // Navegación secuencial de lecciones (Udemy style)
  const handleNextLesson = () => {
    if (activeLessonIndex < currentModule.lessons.length - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    } else if (activeModuleIndex < currentProgram.modules.length - 1) {
      setActiveModuleIndex(activeModuleIndex + 1);
      setActiveLessonIndex(0);
    }
  };

  const handlePrevLesson = () => {
    if (activeLessonIndex > 0) {
      setActiveLessonIndex(activeLessonIndex - 1);
    } else if (activeModuleIndex > 0) {
      setActiveModuleIndex(activeModuleIndex - 1);
      setActiveLessonIndex(currentProgram.modules[activeModuleIndex - 1].lessons.length - 1);
    }
  };

  // Evaluación de Quiz
  const handleAnswerSelect = (qIdx: number, oIdx: number) => {
    if (quizSubmitted) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleEvaluateQuiz = () => {
    if (!currentModule?.quiz) return;
    const questions = currentModule.quiz.questions;
    let correct = 0;
    questions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correct++;
      }
    });

    const calculatedScore = Math.round((correct / questions.length) * 100);
    setQuizScore(calculatedScore);
    setQuizSubmitted(true);

    if (calculatedScore >= currentModule.quiz.passingScore) {
      const updatedQuizes = Array.from(new Set([...passedQuizes, currentModule.id]));
      setPassedQuizes(updatedQuizes);
      localStorage.setItem("in_quizes_" + studentEmail + "_" + selectedProgramId, JSON.stringify(updatedQuizes));
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(null);
  };

  // Pantalla de Login si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex flex-col justify-between selection:bg-[#0284c7] selection:text-white">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-24">
          <div className="w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white border border-zinc-200 shadow-xl space-y-6 text-left relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1DACE3] via-[#EA0C7F] to-[#FEAD2B]" />

            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#1DACE3] to-[#0284c7] flex items-center justify-center text-white shadow-lg mb-3">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="font-mono text-[10px] font-bold text-[#0284c7] uppercase tracking-wider">
                Portal del Alumno // Inteligencia Neuronal Academy
              </div>
              <h1 className="text-2xl font-extrabold text-zinc-900 tracking-tight">
                {needsPasswordSetup ? "Crea tu Contraseña" : "Ingresar al Campus Virtual"}
              </h1>
              <p className="text-xs text-zinc-600 leading-relaxed">
                {needsPasswordSetup
                  ? "Define tu contraseña para acceder a tus lecciones y evaluaciones."
                  : "Ingresa con tu correo registrado para continuar con tus clases."}
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">CORREO DEL ALUMNO</label>
                <input
                  type="email"
                  required
                  placeholder="alumno@empresa.com"
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-[#0284c7] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-zinc-700 mb-1">CONTRASEÑA</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={studentPassword}
                    onChange={(e) => setStudentPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 text-xs focus:ring-2 focus:ring-[#0284c7] outline-none pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 text-xs"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>{isVerifying ? "Verificando..." : "Ingresar a mis Clases"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-zinc-900 flex flex-col justify-between selection:bg-[#0284c7] selection:text-white font-sans">
      <Navbar />

      {/* ── SUB-HEADER DEL CAMPUS CON NAVEGACIÓN Y PERFIL ── */}
      <header className="bg-white border-b border-zinc-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1DACE3] to-[#0284c7] flex items-center justify-center text-white shadow-sm">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-zinc-900 flex items-center gap-1.5">
                <span>Campus Virtual</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-emerald-100 text-emerald-800">
                  ALUMNO ACTIVO
                </span>
              </div>
              <div className="text-[11px] text-zinc-500 font-mono">
                {studentProfile.fullName} • {studentProfile.company}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={"px-3.5 py-2 rounded-xl text-xs font-bold transition-all " + (currentView === "dashboard" ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100")}
            >
              Dashboard
            </button>
            <button
              onClick={() => setCurrentView("player")}
              className={"px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 " + (currentView === "player" ? "bg-[#0284c7] text-white" : "text-zinc-600 hover:bg-zinc-100")}
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Aula Virtual</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-zinc-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Cerrar Sesión"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── CONTENIDO PRINCIPAL SEGÚN VISTA ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ════════ TAB 1: DASHBOARD DEL ALUMNO ════════ */}
        {currentView === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            
            {/* Header del Dashboard */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="space-y-2">
                <span className="font-mono text-[10px] font-bold text-[#0284c7] uppercase tracking-wider">
                  Panel de Aprendizaje
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-heading">
                  Bienvenido de nuevo, {studentProfile.fullName.split(" ")[0]}
                </h1>
                <p className="text-xs text-zinc-600">
                  Programa seleccionado: <strong>{currentProgram.title}</strong>
                </p>
              </div>

              <div className="flex items-center gap-3">
                {isProgramFullyCompleted && (
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all cursor-pointer animate-bounce"
                  >
                    <Award className="w-4 h-4" />
                    <span>Ver Certificado Oficial</span>
                  </button>
                )}
                <button
                  onClick={() => setCurrentView("player")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Continuar Clases</span>
                </button>
              </div>
            </div>

            {/* KPIs Calculados Matemáticamente en Tiempo Real */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="font-mono text-[10px] font-bold uppercase">Progreso Global</span>
                  <TrendingUp className="w-4 h-4 text-[#0284c7]" />
                </div>
                <div className="text-2xl font-extrabold text-zinc-900">{progressPercentage}%</div>
                <div className="w-full h-2 rounded-full bg-zinc-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#0284c7] transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="font-mono text-[10px] font-bold uppercase">Lecciones Vistas</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-2xl font-extrabold text-zinc-900">
                  {completedInProgram} / {totalLessonsCount}
                </div>
                <div className="text-[11px] text-zinc-500">Registradas con persistencia</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="font-mono text-[10px] font-bold uppercase">Quizes Aprobados</span>
                  <Award className="w-4 h-4 text-[#EA0C7F]" />
                </div>
                <div className="text-2xl font-extrabold text-zinc-900">
                  {passedQuizes.length} Evaluaciones
                </div>
                <div className="text-[11px] text-zinc-500">Aprobadas con ≥ 75%</div>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-1.5">
                <div className="flex items-center justify-between text-zinc-500">
                  <span className="font-mono text-[10px] font-bold uppercase">Diploma Oficial</span>
                  <Award className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-extrabold text-zinc-900">
                  {isProgramFullyCompleted ? "Desbloqueado" : "En Progreso"}
                </div>
                <div className="text-[11px] text-zinc-500">
                  {isProgramFullyCompleted ? "Listo para descargar" : "Requiere 100% de avance"}
                </div>
              </div>
            </div>

            {/* Selector de Programa / Mis Cursos */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-zinc-900 uppercase font-mono tracking-wider">
                Mis Programas Matriculados
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.values(PROGRAMS).map((prog) => {
                  const isSelected = prog.id === selectedProgramId;

                  return (
                    <div
                      key={prog.id}
                      onClick={() => {
                        setSelectedProgramId(prog.id);
                        setActiveModuleIndex(0);
                        setActiveLessonIndex(0);
                      }}
                      className={"p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 " + (isSelected ? "bg-white border-[#0284c7] ring-2 ring-[#0284c7]/20 shadow-md" : "bg-zinc-50/50 border-zinc-200 hover:bg-white hover:border-zinc-300")}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                            {prog.badge}
                          </span>
                          {isSelected && (
                            <span className="font-mono text-[10px] font-bold text-[#0284c7] flex items-center gap-1">
                              <Check className="w-3.5 h-3.5" />
                              ACTIVO AHORA
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-zinc-900">{prog.title}</h3>
                        <p className="text-xs text-zinc-600 line-clamp-2">{prog.tagline}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-100 text-xs">
                        <span className="font-mono text-zinc-500">{prog.modules.length} Módulos</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProgramId(prog.id);
                            setActiveModuleIndex(0);
                            setActiveLessonIndex(0);
                            setCurrentView("player");
                            if (typeof window !== "undefined") {
                              window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                          }}
                          className="font-bold text-white bg-[#0284c7] hover:bg-[#0369a1] px-3.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <span>Entrar al Aula</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Preguntas Frecuentes */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-zinc-900 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#0284c7]" />
                <span>Preguntas Frecuentes del Alumno</span>
              </h2>

              <div className="space-y-2">
                {FAQ_LIST.map((faq, idx) => (
                  <div key={idx} className="border border-zinc-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                      className="w-full p-4 text-left text-xs font-bold text-zinc-800 flex justify-between items-center hover:bg-zinc-50"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown className={"w-4 h-4 text-zinc-400 transition-transform " + (expandedFaq === idx ? "rotate-180" : "")} />
                    </button>
                    {expandedFaq === idx && (
                      <div className="p-4 bg-zinc-50 border-t border-zinc-200 text-xs text-zinc-600 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* ════════ TAB 2: AULA / REPRODUCTOR DE CLASES & QUIZES ════════ */}
        {currentView === "player" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-in fade-in duration-200">
            
            {/* Columna Izquierda: Video Player + Controles + Tabs (8 cols) */}
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

              {/* Controles de Navegación Rápida (Udemy style) */}
              <div className="p-5 rounded-3xl bg-white border border-zinc-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] font-bold text-[#0284c7] uppercase tracking-wider block mb-1">
                    {currentModule?.title}
                  </span>
                  <h2 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
                    {currentLesson?.title}
                  </h2>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handlePrevLesson}
                    disabled={activeModuleIndex === 0 && activeLessonIndex === 0}
                    className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Lección Anterior"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => currentLesson && toggleLessonCompleted(currentLesson.id)}
                    className={"inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all " + (currentLesson && completedLessons.includes(currentLesson.id) ? "bg-emerald-50 border border-emerald-300 text-emerald-700" : "bg-zinc-900 text-white hover:bg-zinc-800")}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {currentLesson && completedLessons.includes(currentLesson.id)
                        ? "Completada"
                        : "Marcar Completada"}
                    </span>
                  </button>

                  <button
                    onClick={handleNextLesson}
                    disabled={
                      activeModuleIndex === currentProgram.modules.length - 1 &&
                      activeLessonIndex === currentModule.lessons.length - 1
                    }
                    className="p-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                    title="Siguiente Lección"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tabs: Resumen, Prompts, Blueprints, Quiz del Módulo, Notas */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-6">
                
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-3 overflow-x-auto">
                  <button
                    onClick={() => setActivePlayerTab("summary")}
                    className={"flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 " + (activePlayerTab === "summary" ? "bg-zinc-900 text-white shadow-xs" : "text-zinc-600 hover:bg-zinc-100")}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Resumen</span>
                  </button>

                  <button
                    onClick={() => setActivePlayerTab("content")}
                    className={"flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 " + (activePlayerTab === "content" ? "bg-zinc-900 text-white shadow-xs" : "text-zinc-600 hover:bg-zinc-100")}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Guía Escrita</span>
                  </button>

                  <button
                    onClick={() => setActivePlayerTab("prompts")}
                    className={"flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 " + (activePlayerTab === "prompts" ? "bg-zinc-900 text-white shadow-xs" : "text-zinc-600 hover:bg-zinc-100")}
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>Prompts ({currentLesson?.prompts?.length || 0})</span>
                  </button>

                  <button
                    onClick={() => setActivePlayerTab("downloads")}
                    className={"flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 " + (activePlayerTab === "downloads" ? "bg-zinc-900 text-white shadow-xs" : "text-zinc-600 hover:bg-zinc-100")}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargas ({currentLesson?.downloads?.length || 0})</span>
                  </button>

                  {currentModule?.quiz?.enabled && (
                    <button
                      onClick={() => setActivePlayerTab("quiz")}
                      className={"flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 " + (activePlayerTab === "quiz" ? "bg-[#EA0C7F] text-white shadow-xs" : "bg-pink-50 text-[#EA0C7F] hover:bg-pink-100")}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Quiz Aprobatorio</span>
                      {passedQuizes.includes(currentModule.id) && (
                        <CheckCircle2 className="w-3 h-3 text-emerald-500 ml-1" />
                      )}
                    </button>
                  )}

                  <button
                    onClick={() => setActivePlayerTab("notes")}
                    className={"flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 " + (activePlayerTab === "notes" ? "bg-zinc-900 text-white shadow-xs" : "text-zinc-600 hover:bg-zinc-100")}
                  >
                    <StickyNote className="w-3.5 h-3.5" />
                    <span>Mis Apuntes</span>
                  </button>
                </div>

                {/* Tab: Resumen */}
                {activePlayerTab === "summary" && (
                  <div className="space-y-4 text-xs text-zinc-700 leading-relaxed">
                    <p className="text-zinc-800 text-sm leading-relaxed">{currentLesson?.summary}</p>
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-2">
                      <span className="font-mono text-[10px] font-bold text-[#0284c7] uppercase block">
                        💡 Objetivo de Aprendizaje:
                      </span>
                      <p className="text-zinc-600">
                        Aplica los conceptos técnicos, consulta la pestaña <strong>Guía Escrita</strong> y descarga los blueprints asociados para probarlos en tu propio entorno.
                      </p>
                    </div>
                  </div>
                )}

                {/* Tab: Guía Escrita / Manual de la Unidad */}
                {activePlayerTab === "content" && (
                  <div className="space-y-4 text-xs text-zinc-800 leading-relaxed">
                    <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200 whitespace-pre-wrap font-sans text-xs leading-relaxed">
                      {currentLesson?.content_text || currentLesson?.summary || "Esta lección incluye el reproductor de video interactivo y materiales descargables en las pestañas superiores."}
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
                            <span className="font-mono text-[10px] font-bold text-[#0284c7]">PROMPT #0{idx + 1}</span>
                            <button
                              onClick={() => handleCopyPrompt(p, idx)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-zinc-300 hover:border-[#0284c7] text-[#0284c7] text-xs font-bold transition-all"
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

                {/* Tab: Descargas */}
                {activePlayerTab === "downloads" && (
                  <div className="space-y-3">
                    {currentLesson?.downloads && currentLesson.downloads.length > 0 ? (
                      currentLesson.downloads.map((d, idx) => (
                        <div
                          key={idx}
                          className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
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
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-zinc-100 text-zinc-800 text-xs font-bold transition-colors border border-zinc-300"
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

                {/* Tab: Quiz Aprobatorio Interactivo */}
                {activePlayerTab === "quiz" && currentModule?.quiz && (
                  <div className="space-y-6">
                    <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-[#EA0C7F]">
                          Evaluación Técnica: {currentModule.title}
                        </span>
                        <p className="text-[11px] text-zinc-600">
                          Responde las preguntas y obtén al menos {currentModule.quiz.passingScore}% para aprobar el módulo.
                        </p>
                      </div>
                      {passedQuizes.includes(currentModule.id) && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800">
                          MÓDULO APROBADO ✓
                        </span>
                      )}
                    </div>

                    <div className="space-y-6">
                      {currentModule.quiz.questions.map((q, qIdx) => {
                        return (
                          <div key={qIdx} className="space-y-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-200">
                            <h4 className="text-xs font-bold text-zinc-900">
                              {qIdx + 1}. {q.question}
                            </h4>

                            <div className="space-y-2">
                              {q.options.map((opt, oIdx) => {
                                const isChosen = quizAnswers[qIdx] === oIdx;
                                const isCorrect = q.correctIndex === oIdx;

                                let optionStyle = "bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-100";
                                if (isChosen && !quizSubmitted) {
                                  optionStyle = "bg-zinc-900 text-white border-zinc-900 font-bold";
                                } else if (quizSubmitted) {
                                  if (isCorrect) {
                                    optionStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold";
                                  } else if (isChosen && !isCorrect) {
                                    optionStyle = "bg-red-50 border-red-300 text-red-800 line-through";
                                  }
                                }

                                return (
                                  <button
                                    key={oIdx}
                                    type="button"
                                    onClick={() => handleAnswerSelect(qIdx, oIdx)}
                                    className={"w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between " + optionStyle}
                                  >
                                    <span>{opt}</span>
                                    {quizSubmitted && isCorrect && (
                                      <Check className="w-4 h-4 text-emerald-600" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>

                            {quizSubmitted && (
                              <div className="p-3 rounded-xl bg-white border border-zinc-200 text-[11px] text-zinc-600 space-y-1">
                                <span className="font-bold text-zinc-800">💡 Explicación Técnica:</span>
                                <p>{q.explanation}</p>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Botón de Enviar / Reintentar */}
                    <div className="flex items-center justify-between pt-2">
                      {!quizSubmitted ? (
                        <button
                          onClick={handleEvaluateQuiz}
                          disabled={Object.keys(quizAnswers).length < currentModule.quiz.questions.length}
                          className="px-6 py-3 rounded-xl bg-[#EA0C7F] hover:bg-[#c7096b] disabled:opacity-50 text-white font-bold text-xs transition-colors shadow-md flex items-center gap-2"
                        >
                          <span>Calificar Evaluación</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <div className="text-xs font-bold">
                            Tu puntaje:{" "}
                            <span className={quizScore! >= currentModule.quiz.passingScore ? "text-emerald-600" : "text-red-600"}>
                              {quizScore}% ({quizScore! >= currentModule.quiz.passingScore ? "Aprobado 🎉" : "No alcanzaste el mínimo requerido"})
                            </span>
                          </div>
                          <button
                            onClick={handleResetQuiz}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-zinc-300 text-xs font-bold hover:bg-zinc-50 transition-colors"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Reintentar Quiz</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tab: Apuntes del Alumno */}
                {activePlayerTab === "notes" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-zinc-900">
                        Notas personales para: {currentLesson?.title}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">Autoguardado local activo</span>
                    </div>
                    <textarea
                      rows={6}
                      value={currentNote}
                      onChange={(e) => handleSaveNote(e.target.value)}
                      placeholder="Escribe tus apuntes, comandos o dudas aquí..."
                      className="w-full p-4 rounded-2xl border border-zinc-200 text-xs focus:ring-2 focus:ring-[#0284c7] outline-none font-mono"
                    />
                  </div>
                )}

              </div>

            </div>

            {/* Columna Derecha: Sidebar de Módulos y Lecciones (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-6 rounded-3xl bg-white border border-zinc-200 shadow-sm space-y-4 sticky top-36">
                
                <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#0284c7]" />
                    <h3 className="text-sm font-bold text-zinc-900">Temario del Programa</h3>
                  </div>
                  <span className="font-mono text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {completedInProgram} / {totalLessonsCount} vistas
                  </span>
                </div>

                <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
                  {currentProgram.modules.map((module, mIdx) => (
                    <div key={module.id} className="space-y-2">
                      <div className="font-mono text-[11px] font-bold text-zinc-500 px-1 flex items-center justify-between">
                        <span className="line-clamp-1">{module.title}</span>
                        {passedQuizes.includes(module.id) && (
                          <span className="text-[9px] text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded font-bold">
                            QUIZ OK
                          </span>
                        )}
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
                              className={"w-full p-3 rounded-2xl text-left text-xs transition-all flex items-center justify-between gap-3 cursor-pointer " + (isActive ? "bg-zinc-900 text-white shadow-md font-bold" : "bg-zinc-50 border border-zinc-200 text-zinc-700 hover:bg-zinc-100")}
                            >
                              <div className="flex items-center gap-2.5">
                                {isCompleted ? (
                                  <CheckCircle2
                                    className={"w-4 h-4 shrink-0 " + (isActive ? "text-emerald-400" : "text-emerald-600")}
                                  />
                                ) : (
                                  <PlayCircle
                                    className={"w-4 h-4 shrink-0 " + (isActive ? "text-white" : "text-zinc-400")}
                                  />
                                )}
                                <span className="line-clamp-1">{lesson.title}</span>
                              </div>

                              <span
                                className={"font-mono text-[10px] shrink-0 " + (isActive ? "text-white/80" : "text-zinc-400")}
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

      </main>

      {/* ── MODAL DEL CERTIFICADO OFICIAL INTERACTIVO ── */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-zinc-900 border border-zinc-700 p-8 rounded-3xl text-white space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-[#0284c7]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider">
                  Certificación Oficial Emitida
                </span>
              </div>
              <button
                onClick={() => setShowCertificateModal(false)}
                className="text-zinc-400 hover:text-white text-xs font-mono"
              >
                Cerrar ✕
              </button>
            </div>

            <div className="text-center space-y-3 py-4">
              <span className="text-[11px] font-mono tracking-widest text-[#1DACE3] uppercase font-bold">
                DIPLOMA DE EXCELENCIA PROFESIONAL
              </span>
              <h2 className="text-2xl font-serif italic text-zinc-100 font-bold">
                {studentProfile.fullName}
              </h2>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Por haber completado con distinción el 100% de los laboratorios y quizes aprobatorios del programa:
              </p>
              <p className="text-sm font-bold text-white">
                {currentProgram.title}
              </p>
              <div className="text-[10px] font-mono text-zinc-500 pt-2">
                ID de Verificación: CERT-2026-IN • Emisión: Agosto 2026
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-800 pt-4">
              <div className="text-[11px] text-zinc-400">
                <span>Director de Arquitectura: </span>
                <strong className="text-white">Julio Daza</strong>
              </div>
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1DACE3] to-[#0284c7] text-white font-bold text-xs shadow-md hover:opacity-95"
              >
                Imprimir / Guardar PDF
              </button>
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function CampusPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-xs">Cargando Campus Virtual...</div>}>
      <CampusContent />
    </Suspense>
  );
}
