"use client";

import React, { useState, useRef, useEffect } from "react";
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
  ArrowLeft,
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
  Smartphone,
  Loader2,
} from "lucide-react";

export default function CursoLandingPage() {
  const formRef = useRef<HTMLDivElement>(null);

  // Estados del formulario y flujo de checkout
  const [selectedTier, setSelectedTier] = useState<"ula" | "camara" | "general" | "online">("general");
  const [checkoutStep, setCheckoutStep] = useState<"form" | "pagomovil" | "success">("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organizationOrId, setOrganizationOrId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"lemon" | "pagomovil">("pagomovil");
  
  // Datos específicos de confirmación Pago Móvil
  const [originBank, setOriginBank] = useState("Banco de Venezuela (BDV)");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentReference, setPaymentReference] = useState("");
  const [paidAmountBs, setPaidAmountBs] = useState("");
  const [includeAcademyAddon, setIncludeAcademyAddon] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Datos dinámicos de pasarelas y BCV
  const [bcvRate, setBcvRate] = useState<number>(40.50);
  const [paymentSettings, setPaymentSettings] = useState<{
    pagoMovil: {
      banco: string;
      bancoCodigo: string;
      cedulaRif: string;
      telefono: string;
      whatsapp: string;
      tasaInfo: string;
    };
  }>({
    pagoMovil: {
      banco: "Banco de Venezuela",
      bancoCodigo: "0102",
      cedulaRif: "V-12.517.086",
      telefono: "0414-881-7137",
      whatsapp: "584148817137",
      tasaInfo: "Calculado a Tasa Oficial BCV del día",
    },
  });

  // Estado de envío y confirmación
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registeredFolio, setRegisteredFolio] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // FAQs acordeón
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Cargar Tasa BCV y Parámetros
  useEffect(() => {
    fetch("/api/bcv")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.rate) {
          setBcvRate(data.rate);
        }
      })
      .catch((e) => console.warn("[BCV fetch fallback]", e));

    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings?.pagoMovil) {
          setPaymentSettings(data.settings);
        }
      })
      .catch((e) => console.warn("[Settings fetch fallback]", e));
  }, []);

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

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "ula":
        return "TARIFA PREFERENCIAL ULA";
      case "camara":
        return "TARIFA GREMIAL CÁMARA";
      case "general":
        return "ENTRADA GENERAL PRESENCIAL";
      case "online":
        return "VERSIÓN 100% ONLINE (CAMPUS)";
      default:
        return "TALLER OFICIAL MÉRIDA";
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

  const totalUSD = calculateTotal();
  const calculatedTotalBs = (totalUSD * bcvRate).toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const scrollToForm = (tier?: "ula" | "camara" | "general" | "online") => {
    if (tier) setSelectedTier(tier);
    setCheckoutStep("form");
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  // Manejar el submit del paso 1 (Formulario)
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Por favor ingresa tu nombre completo.");
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      setErrorMessage("Por favor ingresa un correo electrónico válido.");
      return;
    }

    if (phone.trim().length < 7) {
      setErrorMessage("Por favor ingresa un número de teléfono o WhatsApp válido.");
      return;
    }

    if (paymentMethod === "lemon") {
      // Registrar Lead y Redirigir a Lemon Squeezy
      setIsSubmitting(true);
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
            amount: `$${totalUSD} USD`,
            paymentMethod: "Lemon Squeezy (Tarjeta Internacional / Apple Pay)",
            paymentReference: "Checkout Lemon Squeezy",
            notes: includeAcademyAddon ? "Incluye Add-on Campus Academy (+10 USD)" : "",
          }),
        });

        const data = await res.json();
        const baseLemonUrl = "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407";
        const folio = data?.folio || `IN-${Date.now()}`;
        const prefilledLemonUrl = `${baseLemonUrl}?checkout[email]=${encodeURIComponent(email)}&checkout[name]=${encodeURIComponent(fullName)}&checkout[custom][phone]=${encodeURIComponent(phone)}&checkout[custom][folio]=${encodeURIComponent(folio)}`;
        
        window.location.href = prefilledLemonUrl;
      } catch (err) {
        setIsSubmitting(false);
        setErrorMessage("Error al conectar con la pasarela. Intenta de nuevo o elige Pago Móvil.");
      }
    } else {
      // Pasar a la pantalla de Pago Móvil con instrucciones y coordenadas
      setPaidAmountBs(`Bs. ${calculatedTotalBs}`);
      setCheckoutStep("pagomovil");
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Manejar el submit final de Pago Móvil
  const handlePagoMovilConfirm = async () => {
    setErrorMessage("");

    if (!paymentReference.trim()) {
      setErrorMessage("Por favor ingresa el número de referencia del Pago Móvil.");
      return;
    }

    setIsSubmitting(true);

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
          amount: `$${totalUSD} USD (Bs. ${paidAmountBs || calculatedTotalBs})`,
          paymentMethod: `Pago Móvil - ${paymentSettings.pagoMovil.banco} (Emisor: ${originBank})`,
          paymentReference: paymentReference.trim(),
          notes: `Fecha: ${paymentDate} | Tasa BCV: Bs. ${bcvRate} | ${includeAcademyAddon ? "Incluye Add-on Campus Academy (+10 USD)" : ""}`,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const generatedFolio = data.folio || `IN-MERIDA-${Math.floor(10000 + Math.random() * 90000)}`;
        setRegisteredFolio(generatedFolio);
        
        const cleanWhatsApp = (paymentSettings.pagoMovil.whatsapp || "584148817137").replace(/\D/g, "");
        const message = `👋 Hola Julio, acabo de registrar mi Pago Móvil para el taller *Dominio Local: AEO & SEO* en Mérida.\n\n*Datos del Alumno:*\n• Folio: *${generatedFolio}*\n• Nombre: ${fullName}\n• Correo: ${email}\n• WhatsApp: ${phone}\n• Entrada: ${getTierName(selectedTier)} ($${totalUSD} USD / ${paidAmountBs || "Bs. " + calculatedTotalBs})\n• Banco Emisor: ${originBank}\n• Nro. Referencia: ${paymentReference}\n\nAdjunto capture del comprobante. ¡Nos vemos en el taller!`;
        
        setWhatsappLink(`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(message)}`);
        setCheckoutStep("success");
        formRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        setErrorMessage(data.message || "Ocurrió un error al registrar el pago. Intenta de nuevo.");
      }
    } catch (err) {
      setErrorMessage("Error de conexión al enviar el comprobante. Puedes enviarlo directamente por WhatsApp.");
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
              <Image src="/logo.png" alt="Inteligencia Neuronal" fill className="object-contain" priority />
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
                <span>Geolocalización técnica de platos y cartas en alta resolución.</span>
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

      {/* ── 4. TABLA DE INVERSIÓN (3 TIERS) ── */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Tarifas Especiales de Lanzamiento
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white">
            Tarifas de Inversión
          </h2>
          <p className="text-sm text-slate-400">
            Aceptamos Pago Móvil (a tasa oficial BCV) y Lemon Squeezy (Tarjeta Internacional / Apple Pay).
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
              className="mt-6 w-full py-3 rounded-xl text-xs font-bold bg-sky-500 hover:bg-sky-600 text-white transition-all text-center cursor-pointer"
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
              className="mt-6 w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:opacity-90 text-white transition-all text-center cursor-pointer"
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
              className="mt-6 w-full py-3 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all text-center cursor-pointer"
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

      {/* ── 5. PASARELA DE PAGO & CHECKOUT PROFESIONAL ── */}
      <section ref={formRef} id="registro" className="py-20 bg-slate-900/70 border-t border-slate-800">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-900">
            
            {/* 1. Header Bar de Registro */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                  Inscripción // Inteligencia Neuronal Academy
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-bold">
                Cupos Disponibles
              </span>
            </div>

            {/* 2. Course & Tier Summary Dark Card (Match Exact Modal Design) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-md flex items-center justify-between gap-4 border border-slate-800">
              <div className="space-y-1 text-left">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-cyan-400/20">
                  {getTierBadge(selectedTier)}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  Dominio Local: AEO & SEO en Motores de IA
                </h3>
                <p className="text-xs text-slate-300">
                  {selectedTier === "online"
                    ? "Acceso Vitalicio Campus • Lecciones HD • Bonuses"
                    : "4 Horas Prácticas • Laboratorio • Coffee Break • Bonuses • Certificado QR"}
                </p>
              </div>
              <div className="text-right shrink-0">
                <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300">
                  ${totalUSD} <span className="text-xs text-slate-300 font-sans">USD</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block">
                  Pago único ({bcvRate ? `Bs. ${calculatedTotalBs}` : "BCV"})
                </span>
              </div>
            </div>

            {/* Selector de Categoría Rápido */}
            <div className="space-y-1.5 text-left">
              <label className="text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wider block">
                Selecciona tu Categoría de Entrada:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTier("ula")}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    selectedTier === "ula"
                      ? "bg-sky-50 border-sky-600 text-sky-950 ring-2 ring-sky-600/20"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="text-[9px] text-sky-700 font-mono">ESTUDIANTE</div>
                  <div className="text-xs">ULA ($15)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTier("camara")}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    selectedTier === "camara"
                      ? "bg-fuchsia-50 border-fuchsia-600 text-fuchsia-950 ring-2 ring-fuchsia-600/20"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="text-[9px] text-fuchsia-700 font-mono">GREMIAL</div>
                  <div className="text-xs">Cámara ($20)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTier("general")}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    selectedTier === "general"
                      ? "bg-indigo-50 border-indigo-600 text-indigo-950 ring-2 ring-indigo-600/20"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="text-[9px] text-indigo-700 font-mono">GENERAL</div>
                  <div className="text-xs">Presencial ($25)</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTier("online")}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all ${
                    selectedTier === "online"
                      ? "bg-cyan-50 border-cyan-600 text-cyan-950 ring-2 ring-cyan-600/20"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <div className="text-[9px] text-cyan-700 font-mono">DIGITAL</div>
                  <div className="text-xs">Online ($17)</div>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-left">
                {errorMessage}
              </div>
            )}

            {/* ── STEP 1: FORMULARIO Y SELECTOR DE PASARELAS ── */}
            {checkoutStep === "form" && (
              <form onSubmit={handleStep1Submit} className="space-y-5 text-left">
                
                {/* Campos Principales */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1.5">
                      Nombre Completo del Alumno *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Ej: Carlos Mendoza"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1.5">
                        Correo Electrónico (Material & Campus) *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="carlos@empresa.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1.5">
                        Teléfono / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+58 414 000-0000"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1.5">
                      {selectedTier === "ula"
                        ? "Cédula / Carnet ULA (Opcional)"
                        : selectedTier === "camara"
                        ? "Nombre del Restaurante / Comercio Afiliado"
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
                          : "Ej: Mi Negocio"
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                    />
                  </div>

                  {/* Add-on Opcional */}
                  {selectedTier !== "online" && (
                    <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200/80 flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="addon-checkout"
                        checked={includeAcademyAddon}
                        onChange={(e) => setIncludeAcademyAddon(e.target.checked)}
                        className="mt-0.5 rounded text-indigo-600 focus:ring-0 cursor-pointer"
                      />
                      <label htmlFor="addon-checkout" className="text-xs cursor-pointer">
                        <span className="font-bold text-indigo-950">
                          Añadir acceso vitalicio a las grabaciones en el Campus Virtual (+ $10 USD)
                        </span>
                        <p className="text-indigo-800 text-[11px] mt-0.5">
                          Incluye todas las clases en video HD, actualizaciones y recursos descargables para repasar cuando quieras.
                        </p>
                      </label>
                    </div>
                  )}
                </div>

                {/* ── SELECTOR DE PASARELAS SIDE-BY-SIDE (MATCHING MODAL EXACTLY) ── */}
                <div className="space-y-3 pt-1">
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
                    Selecciona la Vía de Pago:
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    
                    {/* Opción 1: Lemon Squeezy */}
                    <div
                      onClick={() => setPaymentMethod("lemon")}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                        paymentMethod === "lemon"
                          ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-indigo-600" />
                          <span className="text-xs font-bold text-slate-900">Internacional (USD)</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "lemon" ? "border-indigo-600 bg-indigo-600" : "border-slate-300"}`}>
                          {paymentMethod === "lemon" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Tarjeta de Crédito/Débito, Apple Pay, PayPal vía Lemon Squeezy.
                      </p>
                    </div>

                    {/* Opción 2: Pago Móvil */}
                    <div
                      onClick={() => setPaymentMethod("pagomovil")}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                        paymentMethod === "pagomovil"
                          ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20 shadow-sm"
                          : "border-slate-200 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-bold text-slate-900">Pago Móvil (Bs.)</span>
                        </div>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "pagomovil" ? "border-indigo-600 bg-indigo-600" : "border-slate-300"}`}>
                          {paymentMethod === "pagomovil" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-tight">
                        Transferencia bancaria o Pago Móvil en Venezuela a Tasa Oficial BCV.
                      </p>
                    </div>

                  </div>
                </div>

                {/* Botón de Acción Paso 1 */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#d946ef] hover:from-[#0369a1] hover:via-[#4f46e5] hover:to-[#c026d3] text-white text-sm font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Procesando inscripción...</span>
                      </>
                    ) : paymentMethod === "lemon" ? (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Continuar al Pago Seguro (Lemon Squeezy)</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <Smartphone className="w-4 h-4" />
                        <span>Ver Coordenadas de Pago Móvil</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono mt-3">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Garantía de satisfacción
                    </span>
                    <span>•</span>
                    <span>🔒 Conexión Cifrada SSL 256-bit</span>
                  </div>
                </div>

              </form>
            )}

            {/* ── STEP 2: COORDENADAS DE PAGO MÓVIL & CONFIRMACIÓN DIRECTA ── */}
            {checkoutStep === "pagomovil" && (
              <div className="space-y-5 text-left animate-in fade-in slide-in-from-right-4 duration-200">
                
                {/* Header Coordenadas */}
                <div className="text-center space-y-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>COORDENADAS DE PAGO MÓVIL (VENEZUELA)</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-600 font-mono pt-1">
                    <span>Tasa Oficial BCV:</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Bs. {bcvRate?.toFixed(2) || "40.50"} / USD
                    </span>
                  </div>
                </div>

                {/* Data Card with Copy Buttons */}
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-500 font-sans">Banco Receptor:</span>
                    <span className="font-bold text-slate-900">
                      {paymentSettings.pagoMovil.banco}{" "}
                      {paymentSettings.pagoMovil.bancoCodigo ? `(${paymentSettings.pagoMovil.bancoCodigo})` : ""}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-500 font-sans">Cédula / RIF:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{paymentSettings.pagoMovil.cedulaRif}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(paymentSettings.pagoMovil.cedulaRif.replace(/\D/g, ""), "ci")}
                        className="text-indigo-600 hover:text-indigo-800 p-1 hover:bg-slate-200 rounded cursor-pointer"
                        title="Copiar Cédula"
                      >
                        {copiedField === "ci" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                    <span className="text-slate-500 font-sans">Teléfono Receptor:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{paymentSettings.pagoMovil.telefono}</span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(paymentSettings.pagoMovil.telefono.replace(/\D/g, ""), "phone")}
                        className="text-indigo-600 hover:text-indigo-800 p-1 hover:bg-slate-200 rounded cursor-pointer"
                        title="Copiar Teléfono"
                      >
                        {copiedField === "phone" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-slate-500 font-sans">Monto Exacto en Bs.:</span>
                    <div className="text-right">
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono text-sm block">
                        Bs. {calculatedTotalBs}
                      </span>
                      <span className="text-[10px] text-slate-400 font-sans">Equivalente a ${totalUSD} USD a Tasa BCV</span>
                    </div>
                  </div>
                </div>

                {/* Extended Confirmation Fields */}
                <div className="space-y-3 bg-white p-4 rounded-2xl border border-slate-200">
                  <span className="font-mono text-[11px] font-bold text-slate-800 uppercase block border-b border-slate-100 pb-2">
                    Datos de Confirmación de tu Pago:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                        Banco Emisor (Desde dónde pagaste) *
                      </label>
                      <select
                        value={originBank}
                        onChange={(e) => setOriginBank(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none cursor-pointer"
                      >
                        <option value="Banco de Venezuela (BDV)">Banco de Venezuela (BDV)</option>
                        <option value="Banesco">Banesco</option>
                        <option value="Mercantil">Mercantil</option>
                        <option value="BBVA Provincial">BBVA Provincial</option>
                        <option value="Bancamiga">Bancamiga</option>
                        <option value="BNC (Banco Nacional de Crédito)">BNC</option>
                        <option value="Bancaribe">Bancaribe</option>
                        <option value="Pago Móvil Interbancario (Otro)">Pago Móvil Interbancario (Otro)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                        Fecha del Pago *
                      </label>
                      <input
                        type="date"
                        required
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1">
                        Monto Pagado (Bs.) *
                      </label>
                      <input
                        type="text"
                        value={paidAmountBs}
                        onChange={(e) => setPaidAmountBs(e.target.value)}
                        placeholder={`Ej: Bs. ${calculatedTotalBs}`}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-slate-50 text-xs text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none font-mono font-bold text-emerald-800"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase mb-1 flex items-center justify-between">
                        <span>Nro. de Referencia *</span>
                        <span className="text-[9px] text-indigo-600 font-bold">Requerido</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentReference}
                        onChange={(e) => setPaymentReference(e.target.value)}
                        placeholder="Ej: 849201 ó últimos 6 dígitos"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:outline-none font-mono font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Banner de Matrícula Inmediata */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-start gap-2.5 text-xs text-indigo-950">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <span className="font-bold block">Confirmación & Aseguramiento de Cupo:</span>
                    <p className="text-[11px] text-indigo-800 leading-relaxed">
                      Al confirmar tu pago, tu registro quedará guardado de inmediato. Recibirás tu recibo en <strong>{email}</strong> y serás conectado con el canal oficial de alumnos.
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-1">
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handlePagoMovilConfirm}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#1DACE3] via-[#971B8D] to-[#EA0C7F] hover:opacity-95 text-white text-sm font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Validando y registrando pago...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span>Confirmar Pago Móvil & Asegurar Cupo</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setCheckoutStep("form")}
                    className="w-full py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Modificar datos o vía de pago</span>
                  </button>
                </div>

              </div>
            )}

            {/* ── STEP 3: PANTALLA DE ÉXITO & WHATSAPP ── */}
            {checkoutStep === "success" && (
              <div className="space-y-6 text-center py-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-slate-900">¡Inscripción Registrada con Éxito!</h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    Hemos registrado tu cupo para <strong>Dominio Local: AEO & SEO</strong>. Te enviamos la confirmación a <strong>{email}</strong>.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 max-w-sm mx-auto">
                  <div className="text-[11px] font-mono text-indigo-600 font-bold uppercase tracking-wider">
                    FOLIO DE REGISTRO
                  </div>
                  <div className="text-2xl font-mono font-black text-slate-900 tracking-wider mt-1">
                    {registeredFolio}
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-1">
                    {getTierName(selectedTier)} • ${totalUSD} USD
                  </div>
                </div>

                <div className="pt-2 space-y-3 max-w-md mx-auto">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-500/25 transition-all hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-5 h-5 fill-current" />
                    <span>Confirmar Comprobante por WhatsApp</span>
                  </a>
                  <p className="text-[11px] text-slate-500">
                    Haz clic para notificar directamente a Julio Daza y recibir los accesos al grupo exclusivo del taller.
                  </p>
                </div>
              </div>
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
