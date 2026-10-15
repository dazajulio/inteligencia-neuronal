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
  Copy,
  Check,
  MessageCircle,
  HelpCircle,
  ChevronDown,
  Building,
  GraduationCap,
  Store,
  CreditCard,
  Bot,
  Activity,
  FileCode,
  LineChart,
  Loader2,
  Upload,
  Flame,
  Search,
  Cpu,
  BadgeCheck,
  Send,
  PhoneCall,
} from "lucide-react";

export default function WorkshopIaLandingPage() {
  const formRef = useRef<HTMLDivElement>(null);

  // Estados del embudo y checkout
  const [selectedTier, setSelectedTier] = useState<"ula" | "camara" | "general">("general");
  const [checkoutStep, setCheckoutStep] = useState<"form" | "pagomovil" | "success">("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [organizationOrId, setOrganizationOrId] = useState("");
  const [carnetFileName, setCarnetFileName] = useState("");
  const [carnetBase64, setCarnetBase64] = useState("");

  // Datos específicos de confirmación Pago Móvil
  const [originBank, setOriginBank] = useState("Banco de Venezuela (BDV)");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentReference, setPaymentReference] = useState("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Tasa BCV y Coordenadas Pago Móvil
  const [bcvRate, setBcvRate] = useState<number>(40.5);
  const [paymentSettings, setPaymentSettings] = useState({
    pagoMovil: {
      banco: "Banco de Venezuela (0102)",
      bancoCodigo: "0102",
      cedulaRif: "V-12517086",
      telefono: "0414-8817137",
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
          setPaymentSettings({
            pagoMovil: {
              ...data.settings.pagoMovil,
              cedulaRif: "V-12517086",
              telefono: "0414-8817137",
              banco: "Banco de Venezuela (0102)",
            },
          });
        }
      })
      .catch((e) => console.warn("[Settings fetch fallback]", e));
  }, []);

  const getTierPrice = (tier: "ula" | "camara" | "general") => {
    switch (tier) {
      case "ula":
        return 15;
      case "camara":
        return 20;
      case "general":
        return 25;
      default:
        return 25;
    }
  };

  const getTierLabel = (tier: "ula" | "camara" | "general") => {
    switch (tier) {
      case "ula":
        return "Estudiantes ULA ($15 USD)";
      case "camara":
        return "Agremiados Cámara Gastronómica ($20 USD)";
      case "general":
        return "Público General / Freelancers ($25 USD)";
      default:
        return "Público General ($25 USD)";
    }
  };

  const totalUSD = getTierPrice(selectedTier);
  const calculatedTotalBs = (totalUSD * bcvRate).toLocaleString("es-VE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const scrollToForm = (tier?: "ula" | "camara" | "general") => {
    if (tier) setSelectedTier(tier);
    setCheckoutStep("form");
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleCarnetFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("El archivo del carnet no debe superar los 5MB.");
        return;
      }
      setCarnetFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setCarnetBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Paso 1: Validar Formulario y pasar a Pago Móvil
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim()) {
      setErrorMessage("Por favor ingresa tu nombre y apellido completo.");
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

    if (selectedTier === "camara" && !organizationOrId.trim()) {
      setErrorMessage("Por favor indica el nombre de tu restaurante o comercio afiliado a la Cámara.");
      return;
    }

    setCheckoutStep("pagomovil");
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Paso 2: Registrar Pago Móvil
  const handlePagoMovilSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!paymentReference.trim()) {
      setErrorMessage("Por favor ingresa los dígitos de la referencia de tu Pago Móvil.");
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
          tierLabel: getTierLabel(selectedTier),
          organizationOrId:
            organizationOrId ||
            (selectedTier === "ula"
              ? carnetFileName
                ? `Carnet ULA: ${carnetFileName}`
                : "Estudiante ULA"
              : "No especificado"),
          modality: "presencial",
          amount: `$${totalUSD} USD`,
          amountBs: `Bs. ${calculatedTotalBs}`,
          bcvRate: bcvRate.toString(),
          paymentMethod: "Pago Móvil - Banco de Venezuela (0102)",
          originBank,
          paymentReference: paymentReference.trim(),
          paymentDate,
          carnetBase64,
          notes: carnetFileName ? `Carnet ULA: ${carnetFileName}` : "",
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const generatedFolio = data.folio || `IN-IA-${Math.floor(10000 + Math.random() * 90000)}`;
        setRegisteredFolio(generatedFolio);

        const cleanWhatsApp = "584148817137";
        const message = `👋 Hola Julio, acabo de registrar mi Pago Móvil para el *IA Gastronomía Workshop* en Mérida (Fullcowork).\n\n*Mis Datos:*\n• Folio: *${generatedFolio}*\n• Alumno: ${fullName}\n• Correo: ${email}\n• WhatsApp: ${phone}\n• Tarifa: ${getTierLabel(selectedTier)} ($${totalUSD} USD / Bs. ${calculatedTotalBs})\n• Banco Emisor: ${originBank}\n• Nro. Referencia: ${paymentReference.trim()}\n\nAdjunto capture del comprobante para su validación. ¡Nos vemos el 23 de Octubre!`;

        setWhatsappLink(`https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(message)}`);
        setCheckoutStep("success");
        formRef.current?.scrollIntoView({ behavior: "smooth" });
      } else {
        setErrorMessage(data.message || "Ocurrió un error al registrar el pago. Por favor intenta de nuevo.");
      }
    } catch (err) {
      setErrorMessage("Error de conexión. Puedes contactarnos directamente por WhatsApp para concretar tu cupo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const syllabusPoints = [
    {
      num: "01",
      title: "Transformación Digital Real en Gastronomía",
      desc: "Dejar atrás métodos obsoletos y entender la cadena de valor digital que impacta directamente en las ventas y la rentabilidad del restaurante.",
      icon: Zap,
    },
    {
      num: "02",
      title: "Auditoría Digital de Marca",
      desc: "Diagnóstico profundo de presencia digital, velocidad de carga, legibilidad para buscadores y consistencia en canales de atención.",
      icon: Search,
    },
    {
      num: "03",
      title: "Diseño del Ecosistema de Marca asistido por IA",
      desc: "Uso estratégico de modelos de lenguaje para sintetizar la propuesta de valor, tono comunicativo y arquitectura visual de la marca.",
      icon: Cpu,
    },
    {
      num: "04",
      title: "Agentes de IA para Diseñar y Programar la Web Oficial",
      desc: "Implementación práctica de herramientas como Antigravity y Claude para generar código limpio, estructura semántica y módulos web en minutos.",
      icon: Bot,
    },
    {
      num: "05",
      title: "Estructuración de Datos Locales: Schema.org",
      desc: "Marcado de datos JSON-LD específico para gastronomía (menús, horarios, geolocalización, coordenadas, platos insignia) para Google.",
      icon: FileCode,
    },
    {
      num: "06",
      title: "Indexación, Robots.txt, Sitemaps y Analytics",
      desc: "Configuración técnica para que los rastreadores de Google encuentren tu negocio y recopiles métricas de visitas reales con Google Analytics 4.",
      icon: Activity,
    },
    {
      num: "07",
      title: "Posicionamiento Dual: SEO para Google y AEO para IA",
      desc: "Cómo aparecer no solo en los resultados de búsqueda clásicos, sino ser la respuesta recomendada en ChatGPT, Perplexity, Gemini y Claude.",
      icon: LineChart,
    },
    {
      num: "08",
      title: "Instalación de Mapa de Calor Web",
      desc: "Telemetría con Microsoft Clarity para observar dónde hacen clic los clientes, qué secciones leen y en qué punto abandonan el menú.",
      icon: Flame,
    },
    {
      num: "09",
      title: "Automatización de Delivery Online",
      desc: "Estrategias de pedidos directos sin comisiones excesivas conectando botones de WhatsApp inteligentes y pasarelas de pago.",
      icon: Store,
    },
    {
      num: "10",
      title: "Atrae Clientes Reales y Cierra Ventas",
      desc: "Ecosistema unificado de conversión: del buscador a la mesa y al pedido delivery recurrente.",
      icon: BadgeCheck,
    },
  ];

  const faqs = [
    {
      q: "¿Necesito saber programar para aprovechar el workshop?",
      a: "No. El taller está diseñado con un enfoque práctico y accesible. Aprenderás a utilizar herramientas de Inteligencia Artificial que escriben y estructuran el código por ti, paso a paso.",
    },
    {
      q: "¿Qué debo llevar al taller presencial en Fullcowork?",
      a: "Debes traer tu laptop con su cargador. Trabajaremos en tiempo real sobre tu propia marca o proyecto.",
    },
    {
      q: "¿Hay garantía de luz e internet durante el evento?",
      a: "Sí, absolutamente. El Edificio Fullcowork (Salón VIP) cuenta con respaldo 100% de planta eléctrica y conexión de fibra óptica simétrica de alta velocidad.",
    },
    {
      q: "¿Cómo aplico a la tarifa de Estudiante ULA o Agremiado a la Cámara?",
      a: "Al llenar el formulario, selecciona la categoría correspondiente. Si eres estudiante ULA puedes adjuntar tu carnet en el formulario o presentarlo al ingresar. Si eres de la Cámara Gastronómica, solo indica el nombre de tu comercio afiliado.",
    },
    {
      q: "¿Cómo se calcula el monto en Bolívares?",
      a: "El monto se liquida a la Tasa Oficial del Banco Central de Venezuela (BCV) del día mediante Pago Móvil al Banco de Venezuela (0102).",
    },
    {
      q: "¿Qué incluye mi entrada?",
      a: "Incluye las 4 horas intensivas de laboratorio presencial, refrigerio ejecutivo, material digital de soporte con plantillas listas para usar y certificado digital oficial de participación.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F141C] text-zinc-100 font-sans selection:bg-[#EA0C7F] selection:text-white">
      {/* ── BARRA SUPERIOR DE URGENCIA Y TASA BCV ── */}
      <div className="bg-gradient-to-r from-[#1DACE3]/20 via-[#971B8D]/25 to-[#EA0C7F]/20 border-b border-white/10 py-2.5 px-4 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span className="font-extrabold uppercase tracking-wider text-amber-300">
              SOLO 25 CUPOS DISPONIBLES
            </span>
            <span className="text-zinc-400 hidden sm:inline">•</span>
            <span className="text-zinc-300 hidden sm:inline">
              Viernes 23 de Octubre — 8:00 AM (Mérida)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-white/10 font-mono text-[11px] text-zinc-300">
              <span className="text-emerald-400 font-bold">BCV Oficial:</span>
              <span>Bs. {bcvRate.toFixed(2)}</span>
            </div>
            <button
              onClick={() => scrollToForm()}
              className="bg-[#EA0C7F] hover:bg-[#EA0C7F]/90 text-white font-bold px-3 py-1 rounded-full text-xs transition-all shadow-md shadow-[#EA0C7F]/30"
            >
              Inscribirme
            </button>
          </div>
        </div>
      </div>

      {/* ── NAVBAR ── */}
      <nav className="border-b border-white/5 py-4 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1DACE3] via-[#971B8D] to-[#EA0C7F] p-0.5 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white group-hover:text-[#1DACE3] transition-colors">
              Inteligencia <span className="text-[#EA0C7F]">Neuronal</span>
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/584148817137?text=Hola%20Julio%2C%20tengo%20una%20duda%20sobre%20el%20IA%20Gastronom%C3%ADa%20Workshop"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-zinc-300 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full border border-white/10"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">WhatsApp:</span> 0414-8817137
            </a>
            <button
              onClick={() => scrollToForm()}
              className="hidden md:inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white text-zinc-900 font-bold text-xs hover:bg-zinc-200 transition-all"
            >
              <span>Asegurar Cupo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative overflow-hidden pt-12 pb-16 px-4 sm:px-6 lg:pt-20 lg:pb-24">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-br from-[#1DACE3]/15 via-[#971B8D]/20 to-[#EA0C7F]/15 blur-[120px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Columna Izquierda: Información Principal */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Badges superiores */}
              <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
                <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-[#EA0C7F]/20 text-[#EA0C7F] border border-[#EA0C7F]/30">
                  WORKSHOP PRESENCIAL • MÉRIDA
                </span>
                <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  Solo 25 Cupos VIP
                </span>
              </div>

              {/* Título Principal */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
                  IA GASTRONOMÍA{" "}
                  <span className="bg-gradient-to-r from-[#FEAD2B] via-[#EA0C7F] to-[#1DACE3] bg-clip-text text-transparent">
                    WORKSHOP
                  </span>
                </h1>
                <p className="text-lg sm:text-xl font-bold text-zinc-300">
                  Del Concepto al Ecosistema Digital Completo
                </p>
              </div>

              {/* Propuesta de Valor */}
              <p className="text-base sm:text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Posiciona, impulsa y digitaliza tu marca. Construye la presencia web de tu restaurante o negocio gastronómico con <strong className="text-white">Agentes de IA, SEO/AEO local y Analítica Digital</strong>.
              </p>

              {/* Coordenadas Clave del Evento */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold block">
                      Fecha & Horario
                    </span>
                    <strong className="text-white text-sm block">Viernes 23 de Octubre</strong>
                    <span className="text-xs text-zinc-400">8:00 AM a 12:00 PM (4 Horas)</span>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#1DACE3]/10 border border-[#1DACE3]/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#1DACE3]" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold block">
                      Ubicación VIP
                    </span>
                    <strong className="text-white text-sm block">Edificio Fullcowork</strong>
                    <span className="text-xs text-zinc-400">Calle 34 entre Av 4 y Don Tulio, Salón VIP</span>
                  </div>
                </div>
              </div>

              {/* Beneficios Incluidos */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1 text-xs text-zinc-300">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <Coffee className="w-4 h-4 text-amber-400" />
                  <span>Incluye Refrigerio</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Certificado Digital Oficial</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <Zap className="w-4 h-4 text-[#1DACE3]" />
                  <span>Planta Eléctrica & Fibra Óptica</span>
                </div>
              </div>

              {/* Botón CTA Principal */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => scrollToForm()}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FEAD2B] via-[#EA0C7F] to-[#971B8D] text-white font-extrabold text-base shadow-xl shadow-[#EA0C7F]/30 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>Reservar Cupo VIP</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <div className="text-xs text-zinc-400 font-mono">
                  Tarifas desde <strong className="text-emerald-400 text-sm">$15 USD</strong> a Tasa BCV
                </div>
              </div>

            </div>

            {/* Columna Derecha: Tarjeta Visual del Flyer */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md bg-gradient-to-b from-[#1C2333] to-[#121620] border-2 border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EA0C7F]/20 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-inner bg-black/40">
                    <Image
                      src="/images/workshop/flyer-hero.png"
                      alt="IA Gastronomía Workshop Flyer"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>

                  <div className="bg-black/40 rounded-2xl p-4 border border-white/10 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400 font-medium">Inversión Preferencial:</span>
                      <span className="text-amber-400 font-mono font-bold">TASA OFICIAL BCV</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-white">Estudiantes ULA</span>
                      <span className="text-lg font-black text-emerald-400 font-mono">$15 USD</span>
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-bold text-white">Cámara Gastronómica</span>
                      <span className="text-lg font-black text-emerald-400 font-mono">$20 USD</span>
                    </div>
                    <div className="flex items-baseline justify-between border-t border-white/10 pt-2">
                      <span className="text-sm font-bold text-white">Público General</span>
                      <span className="text-xl font-black text-white font-mono">$25 USD</span>
                    </div>
                  </div>

                  <button
                    onClick={() => scrollToForm()}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#1DACE3] to-[#971B8D] text-white font-bold text-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-[#1DACE3]/20"
                  >
                    <span>Inscribirme con Pago Móvil</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── PROGRAMA COMPLETO (10 MÓDULOS) ── */}
      <section className="py-20 px-4 sm:px-6 bg-black/40 border-y border-white/5 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-[#1DACE3] bg-[#1DACE3]/10 border border-[#1DACE3]/20 uppercase tracking-widest">
              TEMARIO PRÁCTICO EN VIVO
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Workshop: Del Concepto al Ecosistema Digital Completo
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base">
              10 módulos estructurados para que en 4 horas intensivas salgas con la arquitectura digital y los agentes de IA de tu marca listos para operar.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {syllabusPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.num}
                  className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-2xl p-5 hover:border-[#1DACE3]/40 transition-all hover:bg-white/[0.06] flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#1DACE3]/10 group-hover:border-[#1DACE3]/30 transition-all">
                    <Icon className="w-6 h-6 text-[#1DACE3] group-hover:text-white transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-amber-400">
                        MÓDULO {point.num}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-[#1DACE3] transition-colors">
                      {point.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gradient-to-r from-amber-500/10 via-[#EA0C7F]/10 to-[#1DACE3]/10 border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <h4 className="text-lg font-bold text-white">
                ¿Todo listo para transformar la presencia de tu marca gastronómica?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400">
                Asegura uno de los 25 cupos exclusivos en el Salón VIP de Fullcowork Mérida.
              </p>
            </div>
            <button
              onClick={() => scrollToForm()}
              className="px-6 py-3 rounded-xl bg-white text-zinc-950 font-extrabold text-sm hover:bg-zinc-200 transition-all shrink-0 cursor-pointer shadow-lg"
            >
              Completar Inscripción
            </button>
          </div>

        </div>
      </section>

      {/* ── FACILITADOR (JULIO DAZA CELIS) ── */}
      <section className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-[#182030] to-[#0E131E] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Foto / Flyer Facilitador */}
              <div className="lg:col-span-5 text-center">
                <div className="relative mx-auto max-w-xs aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#FEAD2B]/30 shadow-2xl bg-black/60">
                  <Image
                    src="/images/workshop/flyer-facilitador.png"
                    alt="Julio Daza Celis Facilitador"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-4 inline-flex items-center gap-2 bg-[#86C537]/15 border border-[#86C537]/30 text-[#86C537] px-4 py-1.5 rounded-full text-xs font-bold font-mono">
                  <Award className="w-4 h-4" />
                  <span>INCLUYE CERTIFICADO DIGITAL</span>
                </div>
              </div>

              {/* Credenciales y Perfil */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                    FACILITADOR PRINCIPAL
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    Julio Daza Celis
                  </h2>
                  <p className="text-sm font-semibold text-[#1DACE3] mt-1">
                    Estratega Digital & Desarrollador Senior de Soluciones IA
                  </p>
                </div>

                {/* Lista de Logros y Credenciales */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-zinc-300">
                  {[
                    "CEO & Founder de inteligencianeuronal.com",
                    "Desarrollador y Founder de glubbi.app",
                    "Presidente Cámara Gastronómica Estado Mérida",
                    "Profesional ULA en Gestión Gastronómica",
                    "Top Rated Plus Desarrollador IA en Upwork.com",
                    "Facilitador ULA Cursos IA aplicada a Gastronomía",
                    "Miembro de la comunidad Google Developers",
                    "Desarrollador certificado Antigravity",
                    "Desarrollador certificado n8n",
                  ].map((cred, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 bg-white/[0.03] p-2.5 rounded-xl border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-4 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-zinc-400" />
                    <span>Mérida, Venezuela</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="w-4 h-4 text-zinc-400" />
                    <span>0414-8817137</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-zinc-400" />
                    <span>RIF: V-12517086-9</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── TARIFAS Y TABLA DE PRECIOS ── */}
      <section className="py-20 px-4 sm:px-6 bg-black/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 uppercase tracking-widest">
              INVIERTE EN TI • SOLO 25 CUPOS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Tarifas Transparentes a Tasa Oficial BCV
            </h2>
            <p className="text-zinc-400 text-sm">
              Selecciona tu categoría para desbloquear el formulario y las coordenadas oficiales de Pago Móvil.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Tarifa 1: Estudiantes ULA */}
            <div
              onClick={() => setSelectedTier("ula")}
              className={`rounded-3xl p-6 transition-all cursor-pointer relative border-2 flex flex-col justify-between ${
                selectedTier === "ula"
                  ? "bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-[#1DACE3] shadow-xl shadow-[#1DACE3]/20 scale-[1.02]"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1DACE3] bg-[#1DACE3]/10 px-2.5 py-1 rounded-full border border-[#1DACE3]/20">
                    TARIFA PREFERENCIAL
                  </span>
                  <GraduationCap className="w-5 h-5 text-[#1DACE3]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Estudiantes ULA</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Para alumnos regulares de pregrado y posgrado de la Universidad de Los Andes.
                  </p>
                </div>
                <div className="space-y-1 pt-2">
                  <div className="text-3xl font-black text-white font-mono">$15 <span className="text-xs font-normal text-zinc-400">USD</span></div>
                  <div className="text-xs text-emerald-400 font-mono">
                    ≈ Bs. {(15 * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Tasa BCV)
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300 border-t border-white/10 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Acceso al taller presencial de 4 horas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Incluye Refrigerio ejecutivo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Certificado Digital Oficial</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Validación con Carnet ULA</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToForm("ula");
                }}
                className={`mt-6 w-full py-3 rounded-xl font-bold text-xs transition-all ${
                  selectedTier === "ula"
                    ? "bg-[#1DACE3] text-white shadow-md shadow-[#1DACE3]/30"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {selectedTier === "ula" ? "Seleccionado ✓" : "Elegir Tarifa ULA"}
              </button>
            </div>

            {/* Tarifa 2: Agremiados Cámara Gastronómica */}
            <div
              onClick={() => setSelectedTier("camara")}
              className={`rounded-3xl p-6 transition-all cursor-pointer relative border-2 flex flex-col justify-between ${
                selectedTier === "camara"
                  ? "bg-gradient-to-b from-[#1E293B] to-[#0F172A] border-amber-400 shadow-xl shadow-amber-400/20 scale-[1.02]"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    TARIFA GREMIAL
                  </span>
                  <Store className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Cámara Gastronómica</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Exclusivo para restaurantes, cafés y comercios afiliados a la Cámara de Mérida.
                  </p>
                </div>
                <div className="space-y-1 pt-2">
                  <div className="text-3xl font-black text-white font-mono">$20 <span className="text-xs font-normal text-zinc-400">USD</span></div>
                  <div className="text-xs text-emerald-400 font-mono">
                    ≈ Bs. {(20 * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Tasa BCV)
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300 border-t border-white/10 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Acceso al taller presencial de 4 horas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Incluye Refrigerio ejecutivo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Certificado Digital Oficial</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Plantillas de Automatización Delivery</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToForm("camara");
                }}
                className={`mt-6 w-full py-3 rounded-xl font-bold text-xs transition-all ${
                  selectedTier === "camara"
                    ? "bg-amber-500 text-zinc-950 font-black shadow-md shadow-amber-500/30"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {selectedTier === "camara" ? "Seleccionado ✓" : "Elegir Tarifa Gremial"}
              </button>
            </div>

            {/* Tarifa 3: Público General / Freelancers (Destacada) */}
            <div
              onClick={() => setSelectedTier("general")}
              className={`rounded-3xl p-6 transition-all cursor-pointer relative border-2 flex flex-col justify-between ${
                selectedTier === "general"
                  ? "bg-gradient-to-b from-[#2B1B2D] to-[#14101A] border-[#EA0C7F] shadow-2xl shadow-[#EA0C7F]/30 scale-[1.03]"
                  : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#EA0C7F] to-[#971B8D] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-lg">
                MÁS POPULAR
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#EA0C7F] bg-[#EA0C7F]/10 px-2.5 py-1 rounded-full border border-[#EA0C7F]/20">
                    ENTRADA GENERAL VIP
                  </span>
                  <Users className="w-5 h-5 text-[#EA0C7F]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Público / Freelancers</h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Emprendedores, consultores, desarrolladores y dueños de negocio independientes.
                  </p>
                </div>
                <div className="space-y-1 pt-2">
                  <div className="text-3xl font-black text-white font-mono">$25 <span className="text-xs font-normal text-zinc-400">USD</span></div>
                  <div className="text-xs text-emerald-400 font-mono">
                    ≈ Bs. {(25 * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} (Tasa BCV)
                  </div>
                </div>
                <ul className="space-y-2 text-xs text-zinc-300 border-t border-white/10 pt-4">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Acceso al taller presencial de 4 horas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Incluye Refrigerio ejecutivo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Certificado Digital Oficial</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Blueprints de IA y Códigos Schema.org</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Soporte post-taller en WhatsApp</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  scrollToForm("general");
                }}
                className={`mt-6 w-full py-3 rounded-xl font-bold text-xs transition-all ${
                  selectedTier === "general"
                    ? "bg-[#EA0C7F] text-white shadow-lg shadow-[#EA0C7F]/40"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {selectedTier === "general" ? "Seleccionado ✓" : "Elegir Tarifa General"}
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ── EMBUDO INTERACTIVO & CHECKOUT PAGO MÓVIL ── */}
      <section ref={formRef} className="py-20 px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto">
          
          <div className="bg-gradient-to-b from-[#171F2C] to-[#0F141D] border-2 border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            
            {/* Header del Embudo */}
            <div className="text-center space-y-2 mb-8 border-b border-white/10 pb-6">
              <span className="text-[11px] font-mono font-bold text-[#EA0C7F] uppercase tracking-widest">
                INSCRIPCIÓN OFICIAL • MÉRIDA
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Formulario de Reserva & Pago Móvil
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400">
                Paso {checkoutStep === "form" ? "1 de 2: Tus Datos" : checkoutStep === "pagomovil" ? "2 de 2: Pago Móvil" : "Completado"}
              </p>

              {/* Barra de progreso */}
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#1DACE3] via-[#971B8D] to-[#EA0C7F] h-full transition-all duration-300"
                  style={{
                    width: checkoutStep === "form" ? "50%" : checkoutStep === "pagomovil" ? "90%" : "100%",
                  }}
                />
              </div>
            </div>

            {errorMessage && (
              <div className="mb-6 bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-xl text-xs flex items-center gap-2">
                <span className="font-bold">Error:</span> {errorMessage}
              </div>
            )}

            {/* ── PASO 1: FORMULARIO DE DATOS ── */}
            {checkoutStep === "form" && (
              <form onSubmit={handleStep1Submit} className="space-y-5">
                
                {/* Selector de Entrada */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    1. Categoría de Entrada Seleccionada
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(["ula", "camara", "general"] as const).map((tierKey) => (
                      <button
                        type="button"
                        key={tierKey}
                        onClick={() => setSelectedTier(tierKey)}
                        className={`p-3 rounded-xl border text-xs font-bold transition-all text-left flex flex-col justify-between ${
                          selectedTier === tierKey
                            ? "bg-white/15 border-white text-white shadow-md"
                            : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                        }`}
                      >
                        <span className="capitalize">{tierKey === "ula" ? "Estudiante ULA" : tierKey === "camara" ? "Cámara Gastr." : "General"}</span>
                        <span className="font-mono text-emerald-400 mt-1">${getTierPrice(tierKey)} USD</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Nombre y Apellido */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    2. Nombre y Apellido Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#EA0C7F] transition-colors"
                  />
                </div>

                {/* Correo Electrónico */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    3. Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ej. carlos@tuempresa.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#EA0C7F] transition-colors"
                  />
                  <span className="text-[11px] text-zinc-500 mt-1 block">
                    Aquí recibirás tu folio de inscripción y tu certificado digital.
                  </span>
                </div>

                {/* Teléfono / WhatsApp */}
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                    4. Número de WhatsApp Móvil *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Ej. 0414-1234567 o +58 414 1234567"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#EA0C7F] transition-colors font-mono"
                  />
                </div>

                {/* Campo condicional para Cámara Gastronómica */}
                {selectedTier === "camara" && (
                  <div>
                    <label className="block text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                      5. Nombre del Restaurante / Comercio Afiliado a la Cámara *
                    </label>
                    <input
                      type="text"
                      required
                      value={organizationOrId}
                      onChange={(e) => setOrganizationOrId(e.target.value)}
                      placeholder="Ej. Pizzería Bella Vista / Café Tulio"
                      className="w-full bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                )}

                {/* Campo condicional para Estudiante ULA */}
                {selectedTier === "ula" && (
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
                    <label className="block text-xs font-bold text-[#1DACE3] uppercase tracking-wider">
                      5. Carnet ULA o Comprobante de Estudio (Opcional en este paso)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 border border-white/10">
                        <Upload className="w-4 h-4 text-[#1DACE3]" />
                        <span>Adjuntar Carnet / Foto</span>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleCarnetFileChange}
                          className="hidden"
                        />
                      </label>
                      <span className="text-xs text-zinc-400 truncate max-w-xs">
                        {carnetFileName || "Sin archivo seleccionado (puedes mostrarlo en persona el día del evento)"}
                      </span>
                    </div>
                  </div>
                )}

                {/* Resumen de Inversión */}
                <div className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-400 block">Total a Cancelar:</span>
                    <strong className="text-lg font-black text-white font-mono">${totalUSD} USD</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-zinc-400 font-mono block">En Bolívares (Tasa BCV):</span>
                    <strong className="text-base font-bold text-emerald-400 font-mono">
                      Bs. {calculatedTotalBs}
                    </strong>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#1DACE3] via-[#971B8D] to-[#EA0C7F] text-white font-extrabold text-sm sm:text-base hover:opacity-95 shadow-xl shadow-[#EA0C7F]/20 flex items-center justify-center gap-3 cursor-pointer transition-all"
                >
                  <span>Continuar a Coordenadas de Pago Móvil</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

              </form>
            )}

            {/* ── PASO 2: COORDENADAS PAGO MÓVIL ── */}
            {checkoutStep === "pagomovil" && (
              <form onSubmit={handlePagoMovilSubmit} className="space-y-6">
                
                {/* Botón Volver */}
                <button
                  type="button"
                  onClick={() => setCheckoutStep("form")}
                  className="flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Modificar mis datos personales</span>
                </button>

                {/* Coordenadas Oficiales */}
                <div className="bg-gradient-to-br from-[#1C2536] to-[#131A26] border-2 border-[#1DACE3]/30 rounded-2xl p-5 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#1DACE3]" />
                      <h3 className="font-bold text-white text-sm sm:text-base">
                        Datos Oficiales de Pago Móvil
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      TASA BCV OFICIAL
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    
                    {/* Banco */}
                    <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-bold">Banco Receptor</span>
                        <strong className="text-white text-xs">{paymentSettings.pagoMovil.banco}</strong>
                      </div>
                      <span className="font-mono text-zinc-400 text-xs font-bold">0102</span>
                    </div>

                    {/* Cédula / RIF */}
                    <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-bold">Cédula / RIF</span>
                        <strong className="text-white text-xs font-mono">{paymentSettings.pagoMovil.cedulaRif}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(paymentSettings.pagoMovil.cedulaRif, "cedula")}
                        className="text-zinc-400 hover:text-white p-1 rounded transition-colors"
                        title="Copiar"
                      >
                        {copiedField === "cedula" ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Teléfono */}
                    <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-bold">Teléfono Celular</span>
                        <strong className="text-white text-xs font-mono">{paymentSettings.pagoMovil.telefono}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(paymentSettings.pagoMovil.telefono, "telefono")}
                        className="text-zinc-400 hover:text-white p-1 rounded transition-colors"
                        title="Copiar"
                      >
                        {copiedField === "telefono" ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Monto exacto en Bs */}
                    <div className="bg-black/30 p-3 rounded-xl border border-white/5 flex items-center justify-between">
                      <div>
                        <span className="text-zinc-500 block text-[10px] uppercase font-bold">Monto Exacto (Bs.)</span>
                        <strong className="text-emerald-400 text-xs font-mono font-black">
                          Bs. {calculatedTotalBs}
                        </strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(calculatedTotalBs, "monto")}
                        className="text-zinc-400 hover:text-white p-1 rounded transition-colors"
                        title="Copiar"
                      >
                        {copiedField === "monto" ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                  </div>

                  <p className="text-[11px] text-zinc-400 text-center font-mono">
                    Realiza el pago móvil desde tu banco por el monto exacto de <strong>Bs. {calculatedTotalBs}</strong>.
                  </p>
                </div>

                {/* Formulario de Confirmación */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-zinc-300 uppercase tracking-wider">
                    Registrar Comprobante de Pago
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                        Banco Emisor (Desde dónde pagas)
                      </label>
                      <select
                        value={originBank}
                        onChange={(e) => setOriginBank(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#1DACE3]"
                      >
                        <option value="Banco de Venezuela (BDV)" className="bg-zinc-900">Banco de Venezuela</option>
                        <option value="Banesco" className="bg-zinc-900">Banesco</option>
                        <option value="Mercantil" className="bg-zinc-900">Banco Mercantil</option>
                        <option value="BBVA Provincial" className="bg-zinc-900">BBVA Provincial</option>
                        <option value="Bancaribe" className="bg-zinc-900">Bancaribe</option>
                        <option value="BNC" className="bg-zinc-900">Banco Nacional de Crédito (BNC)</option>
                        <option value="Banplus" className="bg-zinc-900">Banplus</option>
                        <option value="Otro Banco" className="bg-zinc-900">Otro Banco</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                        Fecha del Pago
                      </label>
                      <input
                        type="date"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#1DACE3]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-zinc-400 uppercase mb-1">
                      Número de Referencia del Pago Móvil *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      placeholder="Ej. 123456 (los últimos dígitos del comprobante)"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white font-mono focus:outline-none focus:border-emerald-400 transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-[#86C537] to-teal-500 text-zinc-950 font-black text-sm sm:text-base hover:opacity-95 shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 cursor-pointer transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Registrando tu Pago...</span>
                    </>
                  ) : (
                    <>
                      <span>Confirmar Inscripción y Pago</span>
                      <Check className="w-5 h-5" />
                    </>
                  )}
                </button>

              </form>
            )}

            {/* ── PASO 3: CONFIRMACIÓN EXITOSA ── */}
            {checkoutStep === "success" && (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-white">
                    ¡Inscripción Registrada con Éxito!
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto">
                    Hemos recibido tus datos y el número de referencia. Tu cupo VIP ha sido reservado para el <strong className="text-white">Viernes 23 de Octubre</strong> en Fullcowork.
                  </p>
                </div>

                {/* Folio */}
                <div className="bg-black/40 border border-white/10 rounded-2xl p-4 max-w-sm mx-auto space-y-1">
                  <span className="text-[10px] font-mono uppercase text-[#1DACE3] font-bold block">
                    Tu Folio Oficial de Registro
                  </span>
                  <div className="text-2xl font-black font-mono text-white tracking-wider">
                    {registeredFolio}
                  </div>
                </div>

                {/* Botón WhatsApp */}
                <div className="pt-2 max-w-md mx-auto space-y-3">
                  <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 rounded-2xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-extrabold text-sm sm:text-base shadow-xl shadow-green-500/30 flex items-center justify-center gap-3 transition-all"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Enviar Comprobante por WhatsApp</span>
                  </a>

                  <p className="text-[11px] text-zinc-500">
                    Al hacer clic se abrirá un chat directo con Julio Daza (+58 414-8817137) con tus datos listos para adjuntar la captura del pago.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <button
                    onClick={() => {
                      setCheckoutStep("form");
                      setPaymentReference("");
                      setFullName("");
                      setEmail("");
                      setPhone("");
                    }}
                    className="text-xs text-zinc-400 hover:text-white transition-colors"
                  >
                    Registrar a otra persona
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* ── PREGUNTAS FRECUENTES (FAQ) ── */}
      <section className="py-20 px-4 sm:px-6 bg-black/40 border-t border-white/5">
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="text-center space-y-3">
            <span className="text-xs font-mono font-bold text-[#EA0C7F] uppercase tracking-widest">
              RESOLVEMOS TUS DUDAS
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white hover:text-[#1DACE3] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#1DACE3]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── FOOTER CORPORATIVO ── */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 bg-black">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#1DACE3] to-[#EA0C7F] flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <strong className="text-zinc-300 block">Inteligencia Neuronal</strong>
              <span>RIF: V-12517086-9 • Mérida, Venezuela</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://wa.me/584148817137"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>0414-8817137</span>
            </a>
            <Link href="/terminos" className="hover:text-white transition-colors">
              Términos
            </Link>
            <Link href="/privacidad" className="hover:text-white transition-colors">
              Privacidad
            </Link>
          </div>

        </div>
      </footer>
    </div>
  );
}
