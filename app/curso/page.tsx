"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  Laptop,
  CheckCircle2,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  Coffee,
  Award,
  Download,
  Copy,
  Check,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Building,
  GraduationCap,
  Store,
  Play,
  Share2,
  ExternalLink,
  Lock,
  Flame,
  CreditCard,
  Gift,
  Bot,
  Activity,
  FileCode,
  LineChart,
} from "lucide-react";

interface PaymentOption {
  id: string;
  name: string;
  details: string;
  copyValue: string;
  badge?: string;
  isLemon?: boolean;
}

const PAYMENT_METHODS: PaymentOption[] = [
  {
    id: "pagomovil",
    name: "Pago Móvil (Bolívares a Tasa BCV)",
    details: "Banco: Banesco (0134) • CI: 19.345.678 • Tlf: 0414-8817137",
    copyValue: "0134 04148817137 19345678",
    badge: "Más utilizado en Mérida",
  },
  {
    id: "lemon",
    name: "Lemon Squeezy (Tarjeta Internacional / Apple Pay)",
    details: "Paga de forma segura con tarjeta de crédito o débito internacional.",
    copyValue: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
    badge: "Pasarela Oficial",
    isLemon: true,
  },
  {
    id: "zelle",
    name: "Zelle (USD)",
    details: "Correo: pagos@inteligencianeuronal.com • Titular: Inteligencia Neuronal LLC",
    copyValue: "pagos@inteligencianeuronal.com",
    badge: "Sin comisiones",
  },
  {
    id: "binance",
    name: "Binance Pay / USDT",
    details: "Binance Pay ID: 489201938 • Red: USDT (BEP20 / TRC20)",
    copyValue: "489201938",
  },
  {
    id: "banesco_transfer",
    name: "Transferencia Bancaria (Banesco / Mercantil)",
    details: "Cta Corriente Banesco: 0134-0374-12-3741029384 • Julio Daza",
    copyValue: "01340374123741029384",
  },
  {
    id: "efectivo",
    name: "Efectivo en Sede (USD Cash)",
    details: "Paga el día del evento en el Coworking antes de iniciar el taller.",
    copyValue: "Efectivo en Sede",
  },
];

export default function CursoLandingPage() {
  const formRef = useRef<HTMLDivElement>(null);

  // Estados del formulario
  const [selectedTier, setSelectedTier] = useState<"ula" | "camara" | "general" | "online">("general");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organizationOrId, setOrganizationOrId] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("pagomovil");
  const [paymentReference, setPaymentReference] = useState("");
  const [includeAcademyAddon, setIncludeAcademyAddon] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Estado de envío
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [registeredFolio, setRegisteredFolio] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // FAQs acordeón
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getTierPrice = (tier: string) => {
    switch (tier) {
      case "ula":
        return 15;
      case "camara":
        return 20;
      case "general":
        return 25;
      case "online":
        return 17;
      default:
        return 25;
    }
  };

  const getTierName = (tier: string) => {
    switch (tier) {
      case "ula":
        return "Estudiante ULA (Tarifa Preferencial)";
      case "camara":
        return "Afiliado Cámara Gastronómica Mérida";
      case "general":
        return "Público General / Emprendedores";
      case "online":
        return "Versión 100% Online (Campus Academy)";
      default:
        return "Público General";
    }
  };

  const calculateTotal = () => {
    const base = getTierPrice(selectedTier);
    const addon = includeAcademyAddon && selectedTier !== "online" ? 10 : 0;
    return base + addon;
  };

  const scrollToForm = (tier?: "ula" | "camara" | "general" | "online") => {
    if (tier) setSelectedTier(tier);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage("Por favor completa tu Nombre, Correo y WhatsApp.");
      return;
    }

    setIsSubmitting(true);

    const isLemonMethod = selectedPayment === "lemon";

    try {
      const res = await fetch("/api/course-register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          tier: selectedTier,
          tierLabel: getTierName(selectedTier),
          organizationOrId: organizationOrId || "No especificado",
          modality: selectedTier === "online" ? "online_academy" : "presencial",
          amount: `$${calculateTotal()} USD`,
          paymentMethod: isLemonMethod ? "Lemon Squeezy (Pasarela Tarjeta)" : PAYMENT_METHODS.find((p) => p.id === selectedPayment)?.name || selectedPayment,
          paymentReference: isLemonMethod ? "Checkout Lemon Squeezy" : paymentReference || "Pendiente de comprobante",
          notes: includeAcademyAddon ? "Incluye Add-on Campus Academy (+10 USD)" : "",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setRegisteredFolio(data.folio || `IN-MERIDA-${Math.floor(10000 + Math.random() * 90000)}`);
        setWhatsappLink(
          data.whatsappGroupUrl ||
            `https://wa.me/584148817137?text=Hola%20Julio%2C%20me%20inscrib%C3%AD%20en%20el%20curso%20presencial%20Dominio%20Local.%20Mi%20folio%20es%20${data.folio}`
        );

        if (isLemonMethod) {
          // Redirigir directamente a Lemon Squeezy con pre-llenado de datos
          const baseLemonUrl = "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407";
          const prefilledLemonUrl = `${baseLemonUrl}?checkout[email]=${encodeURIComponent(email)}&checkout[name]=${encodeURIComponent(fullName)}&checkout[custom][phone]=${encodeURIComponent(phone)}&checkout[custom][folio]=${encodeURIComponent(data.folio)}`;
          window.location.href = prefilledLemonUrl;
          return;
        }

        setSubmitSuccess(true);
        formRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        setErrorMessage(data.message || "Ocurrió un error al procesar tu inscripción. Intenta de nuevo.");
      }
    } catch (err) {
      setErrorMessage("Error de conexión. Puedes completar tu inscripción directamente por WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "¿Necesito conocimientos previos de programación o marketing avanzado?",
      a: "No. El taller está diseñado paso a paso para que cualquier dueño, gerente o estudiante pueda implementar las optimizaciones sin escribir código complejo. Usaremos plantillas prediseñadas y herramientas visuales.",
    },
    {
      q: "¿Qué debo llevar al taller presencial?",
      a: "Tu laptop con su respectivo cargador y el acceso a la cuenta de Google de tu negocio (o un proyecto sobre el cual quieras trabajar durante el laboratorio en vivo).",
    },
    {
      q: "¿Qué sucede si hay fluctuaciones eléctricas o de internet en Mérida?",
      a: "La locación seleccionada (Coworking en Mérida) cuenta con planta eléctrica 100% operativa y respaldo ininterrumpido de fibra óptica de alta velocidad.",
    },
    {
      q: "¿Cómo valido mi carnet de la ULA o afiliación a la Cámara Gastronómica?",
      a: "Puedes colocar el nombre de tu comercio o número de carnet en el formulario. No bloqueamos tu inscripción si no lo tienes a la mano; podrás mostrarlo al momento del check-in o por WhatsApp.",
    },
    {
      q: "¿Qué incluye la inversión y los 2 regalos especiales?",
      a: "Incluye las 4 horas de taller práctico presencial, Coffee Break ejecutivo, material digital editable (plantillas JSON-LD, sitemap, robots.txt), configuración de GA4, los 2 Bonuses (Microsoft Clarity y tu Agente GEMS de Marketing), certificado oficial de aprobación con código QR y soporte.",
    },
    {
      q: "¿Y si estoy fuera de Mérida o no puedo asistir ese sábado?",
      a: "Puedes seleccionar la opción 'Versión Online (Academy)'. Recibirás acceso completo e ilimitado a las grabaciones en alta definición, lecciones y materiales dentro de nuestro Campus Virtual.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#0284c7] selection:text-white antialiased">
      
      {/* ── TOP URGENCY SCARCITY BANNER ── */}
      <div className="bg-gradient-to-r from-[#1DACE3] via-[#971B8D] to-[#EA0C7F] text-white py-2.5 px-4 text-center text-xs sm:text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md">
        <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
        <span>TALLER PRESENCIAL EN MÉRIDA // SÁBADO 10 DE OCTUBRE</span>
        <span className="hidden md:inline text-white/80">•</span>
        <span className="hidden md:inline bg-black/30 px-2 py-0.5 rounded text-xs font-mono">
          Solo 20 Cupos por Tanda
        </span>
      </div>

      {/* ── HEADER NAVIGATION ── */}
      <header className="border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 relative flex items-center justify-center">
              <Image src="/logo.png" alt="Inteligencia Neuronal" fill className="object-contain" />
            </div>
            <span className="font-heading font-bold text-lg text-white tracking-tight">
              Inteligencia <span className="bg-gradient-to-r from-sky-400 to-fuchsia-400 bg-clip-text text-transparent">Neuronal</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://wa.me/584148817137?text=Hola%20Julio%2C%20tengo%20una%20consulta%20sobre%20el%20curso%20presencial%20de%20Octubre%20en%20M%C3%A9rida"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Dudas por WhatsApp</span>
            </a>

            <button
              onClick={() => scrollToForm("general")}
              className="px-4 sm:px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#d946ef] hover:opacity-90 text-white shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Inscribirme Ahora
            </button>
          </div>
        </div>
      </header>

      {/* ── 1. HERO SECTION CON VÍDEO & OFERTA ── */}
      <section className="relative pt-12 pb-20 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-xs font-mono text-cyan-300 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-bold">CURSO PRÁCTICO PRESENCIAL // MÉRIDA, VENEZUELA</span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15]">
            Dominio Local:{" "}
            <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
              AEO & SEO.
            </span>
            <br />
            Visibilidad en Motores de IA.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Posiciona tu restaurante o negocio en el <strong className="text-white">Top 3 de Google Maps</strong> y sé la primera recomendación que <strong className="text-cyan-300">ChatGPT, Gemini y Perplexity</strong> sugieren a comensales y clientes en Mérida.
          </p>

          {/* Video Placeholder Container */}
          <div className="pt-4 max-w-3xl mx-auto">
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden border-2 border-slate-700/80 bg-slate-900 shadow-2xl group">
              <Image
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
                alt="Taller Dominio Local e Inteligencia Artificial"
                fill
                className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#d946ef] flex items-center justify-center shadow-lg shadow-indigo-500/40 group-hover:scale-110 transition-transform cursor-pointer">
                  <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-200 mt-4 font-mono uppercase tracking-wider">
                  Ver Video Promocional del Curso
                </p>
                <span className="text-[11px] text-slate-400 mt-1">
                  Explicación por Julio Daza • Director de Inteligencia Neuronal
                </span>
              </div>

              {/* Tag Over Video */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-black/70 text-emerald-400 border border-emerald-500/30 backdrop-blur-md">
                  ● INSCRIPCIONES ABIERTAS // CUPOS LIMITADOS
                </span>
              </div>
            </div>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <Clock className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">4 Horas</div>
                <div className="text-[11px] text-slate-400">100% Prácticas</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <Users className="w-5 h-5 text-fuchsia-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">20 Cupos</div>
                <div className="text-[11px] text-slate-400">Máx. por Tanda</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <Laptop className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Laboratorio</div>
                <div className="text-[11px] text-slate-400">En tu Laptop</div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
              <Award className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-white">Certificado</div>
                <div className="text-[11px] text-slate-400">Oficial con QR</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => scrollToForm("general")}
              className="px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#d946ef] hover:from-[#0369a1] hover:via-[#4f46e5] hover:to-[#c026d3] text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] flex items-center gap-2 cursor-pointer"
            >
              <span>ASEGURAR MI CUPO PRESENCIAL</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => scrollToForm("online")}
              className="px-6 py-4 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all cursor-pointer"
            >
              Ver Versión Online ($17 USD)
            </button>
          </div>

        </div>
      </section>

      {/* ── 2. SECCIÓN DE REGALOS & BONUSES EXCLUSIVOS ── */}
      <section className="py-16 bg-gradient-to-r from-indigo-950/40 via-purple-950/40 to-slate-950 border-y border-indigo-500/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-300">
              <Gift className="w-4 h-4 text-amber-400" />
              <span>REGALOS & BONUSES INCLUIDOS GRATIS EN TU INSCRIPCIÓN</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Herramientas de Nivel Avanzado para Tu Negocio
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              No solo aprenderás teoría: te llevarás activos digitales listos para operar desde el primer día.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Bonus 1: Microsoft Clarity */}
            <div className="p-7 rounded-3xl bg-slate-900/90 border border-amber-500/30 relative overflow-hidden space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  ★ REGALO ESPECIAL #1
                </span>
                <Activity className="w-6 h-6 text-amber-400" />
              </div>

              <h3 className="text-xl font-bold text-white">
                Microsoft Clarity: Mapas de Calor & Grabaciones de Clientes
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Aprenderás a instalar y dominar Microsoft Clarity de forma gratuita. Podrás ver en video real exactamente dónde hacen clic tus comensales, qué partes de tu menú QR leen y dónde abandonan tus pedidos.
              </p>

              <div className="pt-2 text-[11px] font-mono text-amber-300 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-amber-400" />
                <span>Incluye plantilla de instalación sin tocar código complejo</span>
              </div>
            </div>

            {/* Bonus 2: Agente GEMS Personalizado */}
            <div className="p-7 rounded-3xl bg-slate-900/90 border border-fuchsia-500/30 relative overflow-hidden space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40">
                  ★ REGALO ESPECIAL #2
                </span>
                <Bot className="w-6 h-6 text-fuchsia-400" />
              </div>

              <h3 className="text-xl font-bold text-white">
                Tu Propio Agente GEMS: Asesor de Marketing Gastronómico 24/7
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Te enseñaremos a crear y calibrar tu propio agente de Inteligencia Artificial (GEMS de Gemini) entrenado específicamente con los datos, recetas, promociones y tono de voz de tu restaurante o marca.
              </p>

              <div className="pt-2 text-[11px] font-mono text-fuchsia-300 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-fuchsia-400" />
                <span>Crea copies, ideas de contenido y estrategias de venta al instante</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── 3. TEMARIO Y METODOLOGÍA (INCLUYE ROBOTS.TXT, SITEMAP, GA4) ── */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Programa de 4 Horas Intensivas
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
            Temario del Taller Práctico
          </h2>
          <p className="text-sm text-slate-400">
            Aprenderás haciendo. Cada módulo incluye configuración en tiempo real sobre tu propia computadora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bloque 1 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 relative overflow-hidden space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 to-indigo-500" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-sky-400">BLOQUE 01 (60 MIN)</span>
              <span className="text-[11px] font-mono text-slate-500">AEO & ESTRUCTURA</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Arquitectura para Motores de IA & Indexación
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Cómo indexar tu sitio web en Google Search Console para aparecer en minutos.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Creación y configuración del archivo <strong>robots.txt</strong> y <strong>sitemap.xml</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>Microdatos <strong>Schema.org (JSON-LD)</strong> para que ChatGPT y Gemini recomienden tu local.</span>
              </li>
            </ul>
          </div>

          {/* Bloque 2 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 relative overflow-hidden space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">BLOQUE 02 (60 MIN)</span>
              <span className="text-[11px] font-mono text-slate-500">MAPS & ANALÍTICA</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Dominio de Google Maps & Métricas GA4
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Factores reales de posicionamiento en Google Maps para estar en el Top 3 local.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Incorporación del código de <strong>Google Analytics 4 (GA4)</strong> para medir visitantes reales.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>Geolocalización técnica de fotos de platos y cartas en alta resolución.</span>
              </li>
            </ul>
          </div>

          {/* Bloque 3 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 relative overflow-hidden space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-fuchsia-500 to-pink-500" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-fuchsia-400">BLOQUE 03 (50 MIN)</span>
              <span className="text-[11px] font-mono text-slate-500">HERRAMIENTAS & BONUSES</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Clarity, GEMS Asesor & Embudos WhatsApp
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                <span>Configuración de <strong>Microsoft Clarity</strong> para auditar la experiencia del comensal.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                <span>Creación y calibración de tu <strong>Agente GEMS</strong> personalizado de marketing.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-fuchsia-400 shrink-0 mt-0.5" />
                <span>Flujo de captura de pedidos directos y reseñas 5 estrellas por WhatsApp.</span>
              </li>
            </ul>
          </div>

          {/* Bloque 4 */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/90 border border-slate-800 relative overflow-hidden space-y-4">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500" />
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400">BLOQUE 04 (70 MIN)</span>
              <span className="text-[11px] font-mono text-slate-500">LABORATORIO EN VIVO</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Laboratorio Guiado en tu Laptop & Certificación
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Configuración en vivo de tu negocio con la supervisión directa de Julio Daza.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Auditoría individual y entrega del informe de oportunidades para tu marca.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Coffee Break ejecutivo, networking y entrega de certificado con código QR.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── 4. TABLA DE INVERSIÓN ACTUALIZADA (3 TIERS) ── */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Tarifas Especiales de Lanzamiento
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white">
            Tarifas de Inversión
          </h2>
          <p className="text-sm text-slate-400">
            Aceptamos Pago Móvil (a tasa BCV), Lemon Squeezy (Tarjeta Internacional), Zelle, Binance y Efectivo en sede.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Tier 1: Estudiantes ULA */}
          <div
            onClick={() => scrollToForm("ula")}
            className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative ${
              selectedTier === "ula"
                ? "bg-slate-900 border-sky-400 shadow-xl shadow-sky-500/20 ring-2 ring-sky-400"
                : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-sky-500/15 text-sky-300 border border-sky-500/30">
                  TARIFA PREFERENCIAL
                </span>
                <GraduationCap className="w-5 h-5 text-sky-400" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Estudiantes ULA</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Gastronomía, FACES, Sistemas y carreras afines.
                </p>
              </div>

              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-4xl font-black text-white font-heading">$15</span>
                <span className="text-xs text-slate-400 font-mono">USD / Pago Móvil BCV</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Acceso presencial a las 4 horas de taller</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Coffee Break y materiales editables (Sitemap, robots.txt, GA4)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Incluye los 2 Bonuses (Clarity + Agente GEMS)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-sky-400 shrink-0" />
                  <span>Certificado oficial de aprobación con QR</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>*Requiere carnet o constancia ULA</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="mt-6 w-full py-3 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white transition-all text-center"
            >
              Seleccionar Tarifa ULA ($15)
            </button>
          </div>

          {/* Tier 2: Afiliados Cámara Gastronómica */}
          <div
            onClick={() => scrollToForm("camara")}
            className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative ${
              selectedTier === "camara"
                ? "bg-slate-900 border-fuchsia-400 shadow-xl shadow-fuchsia-500/20 ring-2 ring-fuchsia-400"
                : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
            }`}
          >
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-mono font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white shadow-md">
                TARIFA GREMIAL
              </span>
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30">
                  AFILIADOS & EQUIPOS
                </span>
                <Building className="w-5 h-5 text-fuchsia-400" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Cámara Gastronómica Mérida</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Dueños, socios y empleados de comercios registrados.
                </p>
              </div>

              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-4xl font-black text-white font-heading">$20</span>
                <span className="text-xs text-slate-400 font-mono">USD / Pago Móvil BCV</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                  <span>Acceso presencial para 1 representante</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                  <span>Auditoría técnica en vivo del local en Maps</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                  <span>Coffee Break + Plantillas GA4 y Schema.org</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-fuchsia-400 shrink-0" />
                  <span>Incluye los 2 Bonuses (Clarity + Agente GEMS)</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-400" />
                  <span>*Requiere indicar nombre del local afiliado</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="mt-6 w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:opacity-90 text-white transition-all text-center"
            >
              Seleccionar Tarifa Cámara ($20)
            </button>
          </div>

          {/* Tier 3: Público General */}
          <div
            onClick={() => scrollToForm("general")}
            className={`p-7 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer relative ${
              selectedTier === "general"
                ? "bg-slate-900 border-indigo-400 shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-400"
                : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  ACCESO GENERAL
                </span>
                <Store className="w-5 h-5 text-indigo-400" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">Público General</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Emprendedores, consultores y público en general.
                </p>
              </div>

              <div className="flex items-baseline gap-2 pt-2">
                <span className="text-4xl font-black text-white font-heading">$25</span>
                <span className="text-xs text-slate-400 font-mono">USD / Pago Móvil BCV</span>
              </div>

              <ul className="space-y-2.5 text-xs text-slate-300 pt-3 border-t border-slate-800">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Pase completo al taller de 4 horas</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Laboratorio en laptop + Coffee Break</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Incluye los 2 Bonuses (Clarity + Agente GEMS)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Certificado oficial verificable con QR</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Acceso al grupo VIP de alumnos por WhatsApp</span>
                </li>
              </ul>
            </div>

            <button
              type="button"
              className="mt-6 w-full py-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all text-center"
            >
              Seleccionar Entrada General ($25)
            </button>
          </div>

        </div>

        {/* ── CARD DESTACADA DOWNSELL: VERSIÓN ONLINE (ACADEMY) ── */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 border-2 border-indigo-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
              <Laptop className="w-3.5 h-3.5" />
              <span>¿ESTÁS FUERA DE MÉRIDA O PREFIERES ESTUDIAR A TU RITMO?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Adquiere la Versión 100% Online en nuestro Campus Academy
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Mismo contenido, bonuses (Clarity + Agente GEMS), plantillas descargables y certificado oficial. Estudia a tu propio horario con lecciones grabadas en alta definición.
            </p>
          </div>

          <div className="flex flex-col items-center sm:items-end gap-3 shrink-0">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-cyan-300 font-heading">$17</span>
              <span className="text-xs text-slate-400 font-mono">USD (Acceso Inmediato)</span>
            </div>
            <button
              type="button"
              onClick={() => scrollToForm("online")}
              className="px-6 py-3 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-extrabold transition-all shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              Inscribirme en Versión Online ($17)
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. FORMULARIO DE REGISTRO INTEGRADO CON LEMON SQUEEZY & PAGO MÓVIL ── */}
      <section ref={formRef} id="registro" className="py-20 bg-slate-900/70 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8">
            
            {/* Header del Formulario */}
            <div className="text-center space-y-2 pb-6 border-b border-slate-800">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span>PASARELA & FORMULARIO OFICIAL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Completa tu Registro y Asegura tu Cupo
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Aceptamos Pago Móvil BCV, Lemon Squeezy (Tarjetas Internacionales / Apple Pay), Zelle, Binance y Efectivo.
              </p>
            </div>

            {/* Si ya se registró con éxito */}
            {submitSuccess ? (
              <div className="space-y-6 text-center py-6 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">¡Inscripción Registrada con Éxito!</h3>
                  <p className="text-sm text-slate-300 max-w-md mx-auto">
                    Hemos enviado los detalles completos, recibo y recordatorio a <strong>{email}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 max-w-sm mx-auto">
                  <div className="text-[11px] font-mono text-cyan-400">FOLIO DE SEGUIMIENTO</div>
                  <div className="text-2xl font-mono font-black text-white tracking-wider mt-1">
                    {registeredFolio}
                  </div>
                </div>

                {/* BOTÓN GIGANTE DE WHATSAPP */}
                <div className="pt-4 space-y-3 max-w-md mx-auto">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Unirme al Grupo de WhatsApp de Alumnos</span>
                  </a>
                  <p className="text-[11px] text-slate-400">
                    Haz clic para confirmar tu número con Julio Daza y recibir los avisos previos del taller.
                  </p>
                </div>
              </div>
            ) : (
              /* FORMULARIO ACTIVO */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300 font-semibold">
                    {errorMessage}
                  </div>
                )}

                {/* PASO 1: Selector de Categoría */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    1. Selecciona tu Categoría de Entrada
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setSelectedTier("ula")}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        selectedTier === "ula"
                          ? "bg-sky-500/20 border-sky-400 text-white shadow-md ring-1 ring-sky-400"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="text-[10px] text-sky-400 font-mono">ESTUDIANTE</div>
                      <div>ULA ($15)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTier("camara")}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        selectedTier === "camara"
                          ? "bg-fuchsia-500/20 border-fuchsia-400 text-white shadow-md ring-1 ring-fuchsia-400"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="text-[10px] text-fuchsia-400 font-mono">GREMIAL</div>
                      <div>Cámara ($20)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTier("general")}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        selectedTier === "general"
                          ? "bg-indigo-500/20 border-indigo-400 text-white shadow-md ring-1 ring-indigo-400"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="text-[10px] text-indigo-400 font-mono">GENERAL</div>
                      <div>Presencial ($25)</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedTier("online")}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                        selectedTier === "online"
                          ? "bg-cyan-500/20 border-cyan-400 text-white shadow-md ring-1 ring-cyan-400"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      <div className="text-[10px] text-cyan-400 font-mono">DIGITAL</div>
                      <div>Online ($17)</div>
                    </button>
                  </div>
                </div>

                {/* PASO 2: Datos del Participante */}
                <div className="space-y-4 pt-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    2. Datos Personales & Contacto
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300">Nombre y Apellido *</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ej: Carlos Mendoza"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300">WhatsApp (Para coordinar acceso) *</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Ej: 0414-1234567"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300">Correo Electrónico (Para recibir material) *</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="carlos@gmail.com"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs text-slate-300">
                        {selectedTier === "ula"
                          ? "Cédula / Carnet ULA (Opcional)"
                          : selectedTier === "camara"
                          ? "Nombre del Restaurante / Comercio"
                          : "Nombre de tu Proyecto o Negocio (Opcional)"}
                      </label>
                      <input
                        type="text"
                        value={organizationOrId}
                        onChange={(e) => setOrganizationOrId(e.target.value)}
                        placeholder={
                          selectedTier === "ula"
                            ? "V-26.123.456 (Escuela Gastronomía/FACES)"
                            : selectedTier === "camara"
                            ? "Ej: Café Andino C.A."
                            : "Ej: Mi Restaurante"
                        }
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* PASO 3: Selección de Pasarela / Método de Pago */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
                    3. Selecciona tu Método de Pago
                  </label>

                  <div className="space-y-2.5">
                    {PAYMENT_METHODS.map((method) => {
                      const isSelected = selectedPayment === method.id;
                      const isCopied = copiedId === method.id;

                      return (
                        <div
                          key={method.id}
                          onClick={() => setSelectedPayment(method.id)}
                          className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                            isSelected
                              ? "bg-slate-900 border-cyan-400/80 shadow-md ring-1 ring-cyan-400/40"
                              : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                          }`}
                        >
                          <div className="space-y-0.5 text-left">
                            <div className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="payment"
                                checked={isSelected}
                                onChange={() => setSelectedPayment(method.id)}
                                className="text-cyan-400 focus:ring-0"
                              />
                              <span className="text-xs font-bold text-white">{method.name}</span>
                              {method.badge && (
                                <span className="px-2 py-0.2 rounded-full text-[9px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                                  {method.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-400 pl-5">{method.details}</p>
                          </div>

                          {!method.isLemon ? (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(method.copyValue, method.id);
                              }}
                              className="self-end sm:self-center px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono flex items-center gap-1.5 transition-colors shrink-0"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">¡Copiado!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copiar datos</span>
                                </>
                              )}
                            </button>
                          ) : (
                            <span className="self-end sm:self-center text-[11px] font-bold text-indigo-400 flex items-center gap-1">
                              <span>Redirección Automática</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {selectedPayment !== "lemon" && (
                    <div className="pt-2">
                      <label className="text-xs text-slate-300">
                        Número de Referencia / Comprobante de Pago
                      </label>
                      <input
                        type="text"
                        value={paymentReference}
                        onChange={(e) => setPaymentReference(e.target.value)}
                        placeholder="Ej: 849204 / Zelle Ref / Efectivo en Sede"
                        className="w-full mt-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm font-mono focus:outline-none focus:border-cyan-400"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Si pagas en efectivo en sede o aún no has transferido, puedes dejar este campo en blanco y enviar el comprobante por WhatsApp.
                      </p>
                    </div>
                  )}
                </div>

                {/* Add-on Opcional (Campus Virtual Vitalicio) */}
                {selectedTier !== "online" && (
                  <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="addon"
                      checked={includeAcademyAddon}
                      onChange={(e) => setIncludeAcademyAddon(e.target.checked)}
                      className="mt-1 rounded text-fuchsia-500 focus:ring-0"
                    />
                    <label htmlFor="addon" className="text-xs cursor-pointer">
                      <span className="font-bold text-white">
                        Añadir acceso vitalicio a las grabaciones en el Campus Virtual (+ $10 USD)
                      </span>
                      <p className="text-slate-400 text-[11px] mt-0.5">
                        Incluye todas las clases en video HD, actualizaciones y recursos descargables para repasar cuando quieras.
                      </p>
                    </label>
                  </div>
                )}

                {/* Resumen Total y Botón de Envío */}
                <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <div className="text-xs text-slate-400">Total a Invertir:</div>
                    <div className="text-3xl font-black text-white font-heading">
                      ${calculateTotal()} <span className="text-xs font-mono font-normal text-slate-400">USD</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-black bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#d946ef] hover:opacity-95 text-white shadow-xl shadow-indigo-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Procesando Registro...</span>
                    ) : selectedPayment === "lemon" ? (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>PAGAR CON LEMON SQUEEZY</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>CONFIRMAR INSCRIPCIÓN AHORA</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Tus datos están protegidos bajo estricto acuerdo de confidencialidad NDA.
                  </span>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* ── 6. DETALLES DE LA SEDE & CONDICIONES ── */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
              Garantía Logística
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Lugar, Fecha y Condiciones del Evento
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-cyan-400">
                <Calendar className="w-5 h-5" />
                <span className="text-xs font-mono font-bold">FECHA CONFIRMADA</span>
              </div>
              <div className="text-base font-bold text-white">Sábado 10 de Octubre de 2026</div>
              <p className="text-xs text-slate-400">
                Horario matutino: <strong>8:30 AM a 12:30 PM</strong> (Para no interferir con el servicio de restaurantes).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-fuchsia-400">
                <MapPin className="w-5 h-5" />
                <span className="text-xs font-mono font-bold">SEDE EN MÉRIDA</span>
              </div>
              <div className="text-base font-bold text-white">Coworking Mérida</div>
              <p className="text-xs text-slate-400">
                Instalaciones ejecutivas con <strong>Planta Eléctrica</strong> y <strong>Fibra Óptica / Starlink</strong> ininterrumpida.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2 text-emerald-400">
                <Coffee className="w-5 h-5" />
                <span className="text-xs font-mono font-bold">QUÉ INCLUYE</span>
              </div>
              <div className="text-base font-bold text-white">Experiencia Completa</div>
              <p className="text-xs text-slate-400">
                Coffee Break ejecutivo, plantillas XLSX/JSON-LD, 2 Bonuses exclusivos, Certificado oficial con QR y acceso al Campus Virtual.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. PREGUNTAS FRECUENTES (FAQ) ── */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-cyan-400 uppercase">
            <HelpCircle className="w-4 h-4" />
            <span>Respuestas Rápidas</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-slate-200 hover:text-white"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-cyan-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── 8. FOOTER MINIMALISTA ── */}
      <footer className="border-t border-slate-800 py-12 text-center text-xs text-slate-400 bg-slate-950 space-y-4">
        <div className="flex items-center justify-center gap-6 font-semibold text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          <Link href="/academy" className="hover:text-white transition-colors">
            Academy
          </Link>
          <Link href="/privacidad" className="hover:text-white transition-colors">
            Privacidad
          </Link>
          <a
            href="https://wa.me/584148817137"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            Soporte WhatsApp (+58 414-8817137)
          </a>
        </div>
        <p>© 2026 Inteligencia Neuronal LLC. Innovación y Eficiencia Operativa en Gastronomía.</p>
      </footer>

      {/* ── BOTÓN FLOTANTE DE WHATSAPP ── */}
      <a
        href="https://wa.me/584148817137?text=Hola%20Julio%2C%20estoy%20viendo%20la%20landing%20del%20curso%20presencial%20de%20M%C3%A9rida%20y%20tengo%20una%20pregunta"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 shadow-2xl shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center"
      >
        <MessageCircle className="w-6 h-6 fill-current" />
      </a>

    </div>
  );
}
