"use client";

import React, { useState, useEffect } from "react";
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
  BadgeCheck,
  CreditCard,
  X,
  Lock,
  Layers,
  Globe,
  FileText,
  Smartphone
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
  discount?: string;
  preview_image?: string;
  previewImage: string;
  tools: string[];
  stripeColor: string;
  accentColor: string;
  modules: CourseModule[];
  learningOutcomes: string[];
  courseIncludes?: string[];
  requirements?: string[];
  targetAudience?: string[];
  hoursVideo?: string;
  articlesCount?: number;
  resourcesCount?: number;
  lastUpdated?: string;
  language?: string;
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
  access?: string;
  price?: string;
  fileUrl?: string;
  downloads?: string;
}

// ── CATÁLOGO BASE DE CURSOS ──
const REAL_COURSES: Course[] = [
  {
    id: "bootcamp-n8n",
    type: "PROGRAMA INTENSIVO",
    badge: "Lo más vendido",
    level: "Intermedio a Avanzado",
    title: "Bootcamp: Arquitectura de Pipelines con n8n & Agentes IA",
    tagline: "Aprende a desplegar infraestructura empresarial de automatización sobre servidores VPS dedicados, orquestando agentes autónomos, PostgreSQL y WhatsApp Cloud API.",
    duration: "6 Semanas Intensivas",
    lessonsCount: "24 Sesiones + Laboratorios",
    rating: 4.9,
    reviewsCount: 140,
    studentsCount: 0,
    instructor: {
      name: "Julio Daza",
      role: "Arquitecto de Sistemas & Fundador",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    price: "$197 USD",
    originalPrice: "$390 USD",
    discount: "50% OFF",
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
    badge: "OPERATIVO & ESTRATÉGICO",
    level: "Operativo & Estratégico",
    title: "Masterclass: Automatización Agéntica con IA para Restaurantes",
    tagline: "Aprende a implementar agentes inteligentes que atienden por WhatsApp, capturan pedidos, controlan recetas y calculan escandallos sin alucinaciones.",
    duration: "5 Módulos Intensivos • Acceso de por vida",
    lessonsCount: "15 Lecciones + Plantillas XLSX",
    rating: 4.8,
    reviewsCount: 112,
    studentsCount: 0,
    instructor: {
      name: "Julio Daza",
      role: "Consultor de Inteligencia Operativa",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    price: "$97 USD",
    originalPrice: "$197 USD",
    discount: "50% OFF",
    previewImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    stripeColor: "from-[#EA0C7F] via-[#971B8D] to-[#6366f1]",
    accentColor: "#EA0C7F",
    tools: ["WhatsApp Cloud API", "Gemini Pro", "Airtable", "Escandallos XLSX", "KDS Prompts", "Zero-Hallucination Guardrails", "HACCP Digital"],
    learningOutcomes: [
      "Parametrizar prompts con rigor físico y matemático para que la IA nunca invente precios ni recetas.",
      "Configurar un asistente de WhatsApp 24/7 con catálogo dinámico de platos, horarios y alérgenos.",
      "Integrar matrices de costos crudo/cocido en tiempo real y optimizar la ingeniería de menú (BCG).",
      "Blindar el sistema con guardrails de precios y protocolo de derivación a humanos para casos críticos.",
      "Automatizar la estimación de demanda semanal y generación de órdenes de compra a proveedores."
    ],
    modules: [
      {
        week: "Módulo 01",
        title: "Fundamentos de IA Gastronómica & Control de Food Cost",
        desc: "Diagnóstico de fugas operativas, matriz BCG de menú y escandallos con factor de rendimiento crudo/cocido.",
        lessons: [
          "1.1 La Revolución de la IA en la Gastronomía y el Margen Operativo",
          "1.2 Ingeniería de Menú con IA: Matriz BCG de Platos y Precios",
          "1.3 Escandallos Automatizados: Factor de Rendimiento Crudo/Cocido y Mermas"
        ]
      },
      {
        week: "Módulo 02",
        title: "Agente de Ventas & Reservas 24/7 en WhatsApp",
        desc: "Configuración del System Prompt maestro, gestión de alérgenos y estrategias de upselling gastronómico.",
        lessons: [
          "2.1 Personalidad, Tono y Menú Conversacional del Agente",
          "2.2 Gestión de Reservas, Alérgenos y Restricciones Dietéticas",
          "2.3 Upselling y Venta Cruzada Automática en Cada Interacción"
        ]
      },
      {
        week: "Módulo 03",
        title: "Blindaje del Sistema: Guardrails, Anti-Alucinaciones y Seguridad",
        desc: "Reglas inquebrantables de precios, detección de fricciones y derivación a gerencia humana (Human-in-the-Loop).",
        lessons: [
          "3.1 Blindaje de Precios y Reglas Inquebrantables (Zero Hallucinations)",
          "3.2 Detección de Fricciones y Desvío Inteligente a Humanos (Human-in-the-Loop)",
          "3.3 Auditoría de Logs y Calibración Continua de Conversaciones"
        ]
      },
      {
        week: "Módulo 04",
        title: "Automatización de Compras, Proveedores y Operaciones de Cocina",
        desc: "Pronóstico de demanda según clima y días, órdenes automáticas a proveedores y estandarización de SOPs/HACCP.",
        lessons: [
          "4.1 Predicción de Demanda e Inventario según Clima y Días de la Semana",
          "4.2 Asistente para Generación de Órdenes de Compra a Proveedores",
          "4.3 SOPs de Cocina, Checklists Digitales y Control HACCP"
        ]
      },
      {
        week: "Módulo 05",
        title: "Puesta en Marcha en el Negocio Real, KPIs y Proyecto de Certificación",
        desc: "Plan de despliegue en 3 fases, cuadro de mando financiero (EBITDA, Food Cost %) y proyecto de certificación oficial.",
        lessons: [
          "5.1 Plan de Despliegue en 3 Fases y Capacitación del Personal de Sala",
          "5.2 Métricas de Impacto Financiero: EBITDA, Food Cost % y Retorno de Inversión",
          "5.3 Proyecto Final de Certificación y Emisión de tu Diploma Oficial"
        ]
      }
    ]
  },
  {
    id: "crecimiento-aeo",
    type: "MASTERCLASS",
    badge: "Lo más vendido",
    level: "Marketing & Adquisición",
    title: "Dominio Local: SEO, AEO & Visibilidad en Motores de IA",
    tagline: "Posiciona tu marca en Google Maps y sé la primera recomendación que ChatGPT, Gemini y Perplexity sugieren a clientes potenciales.",
    duration: "6 Módulos Prácticos • Acceso de por vida",
    lessonsCount: "18 Lecciones + Laboratorios y Blueprints",
    rating: 4.9,
    reviewsCount: 88,
    studentsCount: 0,
    instructor: {
      name: "Julio Daza",
      role: "Especialista en AEO & Crecimiento",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    price: "$67 USD",
    originalPrice: "$134 USD",
    discount: "50% OFF",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    stripeColor: "from-[#FEAD2B] via-[#ea580c] to-[#e11d48]",
    accentColor: "#FEAD2B",
    tools: ["Google Business Profile", "Microdatos JSON-LD", "ChatGPT Search", "Schema.org", "Perplexity API", "Apple Business", "NFC & QR"],
    learningOutcomes: [
      "Posicionar tu negocio en el Top 3 de Google Maps en tu ciudad o zona geográfica.",
      "Implementar microdatos JSON-LD (Schema.org) sin saber programar para que las IAs entiendan tus horarios, precios y servicios.",
      "Lograr que ChatGPT, Perplexity y Gemini citen y recomienden tu marca a clientes potenciales.",
      "Automatizar un bucle de reseñas 5 estrellas con tarjetas NFC, códigos QR y filtros inteligentes por WhatsApp.",
      "Medir rankings con mapas de calor Geo-Grid y expandir tu radio de clientes a coste de publicidad CERO."
    ],
    modules: [
      {
        week: "Módulo 01",
        title: "Fundamentos de la Visibilidad en la Era de la IA (SEO + AEO + GEO)",
        desc: "Cómo buscan tus clientes hoy, el Grafo de Conocimiento y diagnóstico de visibilidad de tu marca frente a competidores.",
        lessons: [
          "Cómo buscan tus clientes hoy: Google vs. IA Overviews vs. ChatGPT Search",
          "El Grafo de Conocimiento y las Entidades de tu Marca",
          "Auditoría de Visibilidad Local y Share of Voice en Motores de IA"
        ]
      },
      {
        week: "Módulo 02",
        title: "Optimización Maestra de Google Business Profile & Citaciones 360",
        desc: "Configuración estratégica de tu ficha de Google Maps, geotagging de fotos, Google Posts y sincronización con Apple Maps y Bing.",
        lessons: [
          "Configuración de Alta Conversión en tu Ficha de Google Maps",
          "Fotografías de Alto Impacto, Geotagging y Google Posts",
          "Sincronización de Citaciones: Apple Maps, Bing Places y Waze"
        ]
      },
      {
        week: "Módulo 03",
        title: "Arquitectura Técnica On-Page, Microdatos JSON-LD & RAG Readiness",
        desc: "Implementación de Schema.org LocalBusiness, páginas de aterrizaje hiperlocales por barrio y tablas de precios legibles para IA.",
        lessons: [
          "Microdatos JSON-LD (Schema.org): El DNI Digital de tu Negocio",
          "Páginas de Aterrizaje Hiperlocales (Landing Pages por Zona)",
          "RAG-Readiness: Menús, Precios y FAQs que la IA Puede Citar"
        ]
      },
      {
        week: "Módulo 04",
        title: "Optimización para Motores Generativos (GEO) & Citación en ChatGPT, Gemini y Perplexity",
        desc: "Mecánicas de citación de los LLMs, menciones de autoridad en Reddit y medios locales, y corrección de alucinaciones sobre tu negocio.",
        lessons: [
          "Cómo Seleccionan Fuentes Perplexity, ChatGPT Search y Gemini",
          "Menciones de Autoridad en la Web Abierta y Estrategia Comunitaria",
          "Monitoreo de Marca y Corrección de Alucinaciones en IA"
        ]
      },
      {
        week: "Módulo 05",
        title: "Automatización de Reseñas 5 Estrellas & Embudos Directos a WhatsApp",
        desc: "Tarjetas NFC táctiles, códigos QR de reseña instantánea, filtros de quejas por WhatsApp y respuestas a reseñas asistidas por IA.",
        lessons: [
          "El Bucle de Reseñas con Tarjetas NFC y Códigos QR Dinámicos",
          "Filtro de Reseñas y Prevención de Calificaciones Negativas",
          "Respuestas a Reseñas con IA y Conversión a Ventas por WhatsApp"
        ]
      },
      {
        week: "Módulo 06",
        title: "Telemetría, Geo-Grid Rank Tracking y Proyecto de Certificación",
        desc: "Mapas de calor de posicionamiento por radio de kilómetros, dashboard simple de KPIs y entrega del proyecto de graduación.",
        lessons: [
          "Medición de Rankings con Mapas de Calor (Geo-Grid Tracking)",
          "Dashboard Simple de KPIs: Medición del Retorno de Inversión",
          "Proyecto Final de Graduación y Emisión de tu Certificación Oficial"
        ]
      }
    ]
  },
  {
    id: "antigravity",
    slug: "antigravity",
    type: "MASTERCLASS",
    badge: "LO MÁS VENDIDO // VANGUARDIA",
    level: "Desarrollo Agéntico & Fullstack",
    title: "Curso Completo de Google Antigravity: Crea Software y Agentes con IA",
    tagline: "Domina el entorno de desarrollo agéntico de Google DeepMind: IDE visual, subagentes concurrentes, Skills, Hooks, Generative UI y despliegue fullstack continuo.",
    duration: "6 Módulos Intensivos • Acceso de por vida",
    lessonsCount: "18 Lecciones + Blueprints & Laboratorios",
    rating: 4.9,
    reviewsCount: 96,
    studentsCount: 0,
    instructor: {
      name: "Julio Daza",
      role: "Arquitecto de Sistemas & Fundador",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
    },
    price: "$97 USD",
    originalPrice: "$197 USD",
    discount: "50% OFF",
    previewImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    stripeColor: "from-[#EA0C7F] via-[#971B8D] to-[#1DACE3]",
    accentColor: "#EA0C7F",
    tools: ["Google Antigravity (AGY)", "Gemini 2.0 Flash / Pro", "Subagentes & Skills", "Generative UI", "Model Context Protocol (MCP)", "Next.js 14 & Supabase", "Git & Vercel"],
    learningOutcomes: [
      "Planificar, programar y desplegar aplicaciones web completas con el IDE agéntico de Google DeepMind.",
      "Orquestar equipos de subagentes concurrentes para investigar, refactorizar y probar código en paralelo.",
      "Crear Skills personalizadas (SKILL.md) y Hooks de validación automática para blindar la calidad del software.",
      "Diseñar prototipos interactivos en tiempo real con Generative UI y diagramas técnicos en Mermaid.",
      "Construir y desplegar un SaaS Fullstack con autenticación, base de datos PostgreSQL y pagos en Vercel."
    ],
    modules: [
      {
        week: "Módulo 01",
        title: "Fundamentos de Antigravity, Arquitectura Agéntica & Entorno de Trabajo",
        desc: "Diferencia entre copilotos pasivos y desarrollo agéntico autónomo, workspace y reglas maestras de proyecto.",
        lessons: [
          "1.1 La Revolución Agéntica: De los Copilotos Pasivos al Desarrollo Autónomo",
          "1.2 Instalación, Configuración de Workspace y Modos de Ejecución",
          "1.3 El Sistema de Reglas de Proyecto (.antigravity/rules) y Memoria Persistente"
        ]
      },
      {
        week: "Módulo 02",
        title: "Orquestación de Subagentes & Delegación Concurrente",
        desc: "Delegación de tareas pesadas en paralelo con subagentes aislados, roles especializados y mensajería reactiva.",
        lessons: [
          "2.1 Arquitectura de Subagentes (invoke_subagent) y Procesamiento en Paralelo",
          "2.2 Definición de Subagentes Especializados (define_subagent) y Roles a Medida",
          "2.3 Comunicación Inter-Agéntica (send_message) y Gestión de Tareas Asíncronas"
        ]
      },
      {
        week: "Módulo 03",
        title: "Custom Skills, Hooks & Conectividad Externa (MCP)",
        desc: "Creación de paquetes SKILL.md, interceptores de calidad pre/post ejecución y protocolo universal MCP.",
        lessons: [
          "3.1 Creación de Skills Modulares (SKILL.md) y Herramientas Reutilizables",
          "3.2 Hooks de Pre y Post-Ejecución: Linters, Pruebas y Sanitización Automática",
          "3.3 Integración de Servidores MCP (Model Context Protocol) en Antigravity"
        ]
      },
      {
        week: "Módulo 04",
        title: "Generative UI, Artefactos Interactivos & Navegación Web en Vivo",
        desc: "Prototipado interactivo inline con Generative UI, planes ejecutivos con Mermaid y navegación RAG en tiempo real.",
        lessons: [
          "4.1 Generative UI: Prototipado y Renderizado de Componentes en Tiempo Real",
          "4.2 Dominio de Artefactos (implementation_plan.md, walkthrough.md y Mermaid)",
          "4.3 Navegación Web en Vivo, Extracción de Documentación y APIs"
        ]
      },
      {
        week: "Módulo 05",
        title: "Construcción de una Aplicación Web Fullstack de Extremo a Extremo",
        desc: "Construcción paso a paso de un SaaS real con Next.js 14, Tailwind, Supabase, webhooks de pago y despliegue Vercel.",
        lessons: [
          "5.1 De la Idea al MVP en Minutos con Next.js, Tailwind y Supabase",
          "5.2 Implementación Acelerada de Backend, Autenticación y Pagos",
          "5.3 Control de Versiones con Git y Despliegue Continuo en Vercel"
        ]
      },
      {
        week: "Módulo 06",
        title: "Auditoría de Seguridad, Optimización de Contexto & Certificación Oficial",
        desc: "Auditoría de dependencias, telemetría y eficiencia de tokens, y entrega de proyecto con diploma verificable.",
        lessons: [
          "6.1 Auditoría de Código, Detección de Vulnerabilidades y Guardrails",
          "6.2 Telemetría, Gestión de Tokens y Rendimiento en Proyectos Grandes",
          "6.3 Proyecto Final de Graduación, Auditoría y Emisión de tu Diploma Oficial"
        ]
      }
    ]
  }
];

// ── CATÁLOGO BASE DE RECURSOS ──
const DEFAULT_RESOURCES: ResourceItem[] = [
  {
    id: "sops",
    title: "Framework de Manuales Operativos (SOPs) y Checklists",
    desc: "Estructura modular en Notion para estandarizar procesos de cocina, compras, servicio y apertura/cierre antes de integrar automatizaciones agénticas.",
    tag: "WORKSPACE NOTION",
    format: "Plantilla Notion Duplicable",
    previewImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#FEAD2B] to-[#ea580c]",
    access: "GRATIS",
    price: "GRATIS",
    fileUrl: "https://notion.so/",
    downloads: "0",
  },
  {
    id: "haccp",
    title: "Checklist de Auditoría de Puntos Críticos HACCP",
    desc: "Plantilla interactiva de control de temperaturas, rotación FIFO/PEPS, matriz de límites críticos y protocolos de inocuidad según estándares internacionales.",
    tag: "PDF INTERACTIVO",
    format: "Guía de Auditoría PDF",
    previewImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#86C537] to-[#059669]",
    access: "GRATIS",
    price: "GRATIS",
    fileUrl: "/downloads/checklist-haccp.pdf",
    downloads: "0",
  },
  {
    id: "aeo-rag",
    title: "Guía de Indexación para Motores de Respuesta IA (AEO & RAG)",
    desc: "Manual de arquitectura técnica para estructurar microdatos JSON-LD y Schema.org para que ChatGPT, Gemini y Perplexity indexen y citen tu negocio.",
    tag: "GUÍA TÉCNICA",
    format: "Manual de Arquitectura AEO",
    previewImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#EA0C7F] to-[#971B8D]",
    access: "PREMIUM",
    price: "$5 USD",
    fileUrl: "/downloads/guia-aeo-rag.pdf",
    downloads: "0",
  },
  {
    id: "escandallos",
    title: "Matriz Maestra de Escandallos & Costos Gastronómicos",
    desc: "Plantilla en Excel totalmente formulada para costeo crudo/cocido, factor de rendimiento, mermas técnicas y cálculo de precio sugerido por Food Cost.",
    tag: "XLSX PARAMETRIZADO",
    format: "Plantilla Excel Parametrizada",
    previewImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
    stripeColor: "from-[#1DACE3] to-[#0284c7]",
    access: "GRATIS",
    price: "GRATIS",
    fileUrl: "/downloads/matriz-escandallos.xlsx",
    downloads: "0",
  }
];

export default function AcademyPage() {
  const { openCheckout } = useCheckoutStore();
  const [courses, setCourses] = useState<Course[]>(REAL_COURSES);
  const [resources, setResources] = useState<ResourceItem[]>(DEFAULT_RESOURCES);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");

  // Modales de detalle y descarga
  const [selectedModalCourse, setSelectedModalCourse] = useState<Course | null>(null);
  const [selectedResourceForDownload, setSelectedResourceForDownload] = useState<ResourceItem | null>(null);
  const [downloadEmail, setDownloadEmail] = useState<string>("");
  const [downloadState, setDownloadState] = useState<{ loading: boolean; success: boolean; message?: string }>({
    loading: false,
    success: false,
    message: ""
  });

  // Módulo de temario expandido dentro del modal
  const [expandedModuleId, setExpandedModuleId] = useState<number | null>(0);

  // Sincronización en vivo con la Base de Datos Supabase
  useEffect(() => {
    fetch("/api/courses", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && Array.isArray(data.courses) && data.courses.length > 0) {
          const mapped = data.courses.map((c: any) => ({
            id: c.id,
            type: c.badge?.includes("CARRERA") || c.badge?.includes("BOOTCAMP") || c.duration?.includes("Semana") ? "PROGRAMA INTENSIVO" : "MASTERCLASS",
            badge: c.badge || "Lo más vendido",
            level: c.level || "Intermedio",
            title: c.title,
            tagline: c.tagline || c.description,
            description: c.description || "",
            duration: c.duration || "Acceso de por vida",
            lessonsCount: c.lessons_count || (c.modules?.length ? `${c.modules.length} Módulos` : "Acceso Completo"),
            rating: Number(c.rating) || 4.9,
            reviewsCount: Number(c.reviews_count) || (c.students_enrolled ? Math.round(c.students_enrolled * 0.4) : 0),
            studentsCount: Number(c.students_enrolled) || 0,
            instructor: c.instructor || {
              name: "Julio Daza",
              role: "Arquitecto de Sistemas & Fundador",
              avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            price: c.price_display || `$${c.price_usd || 97} USD`,
            originalPrice: c.original_price || `$${(Number(c.price_usd) || 97) * 2} USD`,
            discount: c.discount || "50% OFF",
            previewImage: c.preview_image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
            stripeColor: c.stripe_color || "from-[#1DACE3] via-[#0284c7] to-[#4f46e5]",
            accentColor: "#0284c7",
            tools: Array.isArray(c.tools) ? c.tools : (Array.isArray(c.stack) ? c.stack : ["IA", "Automatización"]),
            learningOutcomes: c.learning_outcomes && c.learning_outcomes.length > 0 ? c.learning_outcomes : [
              "Despliegue y aseguramiento de infraestructura en producción.",
              "Conexión con APIs y Webhooks en tiempo real sin caídas.",
              "Persistencia en bases de datos relacionales con Row-Level Security.",
              "Orquestación agéntica con mitigación de alucinaciones."
            ],
            courseIncludes: c.course_includes && c.course_includes.length > 0 ? c.course_includes : [
              "Video bajo demanda en HD",
              "Recursos descargables y plantillas",
              "Acceso en dispositivos móviles y de escritorio",
              "Certificado oficial de finalización con código QR"
            ],
            requirements: c.requirements && c.requirements.length > 0 ? c.requirements : [
              "Una computadora con conexión a Internet.",
              "Ganas de experimentar y construir con IA aplicada."
            ],
            targetAudience: c.target_audience && c.target_audience.length > 0 ? c.target_audience : [
              "Desarrolladores, programadores y consultores técnicos.",
              "Emprendedores que buscan acelerar el desarrollo de sus productos."
            ],
            hoursVideo: c.hours_video || "12 horas de video bajo demanda",
            articlesCount: c.articles_count || 20,
            resourcesCount: c.resources_count || 25,
            lastUpdated: c.last_updated || "8/2026",
            language: c.language || "Español",
            ctaUrl: c.cta_url || "#",
            modules: (c.modules || []).map((m: any, idx: number) => ({
              week: m.week_label || `Módulo 0${idx + 1}`,
              title: m.title,
              desc: m.description,
              lessons: m.summary ? [m.summary] : (m.description ? [m.description] : ["Implementación práctica y laboratorio"])
            }))
          }));
          setCourses(mapped);
        }
      })
      .catch((err) => console.warn("[Courses DB Sync Fallback]", err));

    fetch("/api/resources", { cache: "no-store" })
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
            access: r.access_type?.includes("PREMIUM") ? "PREMIUM" : "GRATIS",
            price: r.price_display || (r.price_usd ? `$${r.price_usd} USD` : (r.access_type?.includes("PREMIUM") ? "$5 USD" : "GRATIS")),
            fileUrl: r.file_url || (r.id === 'escandallos' ? '/downloads/matriz-escandallos.xlsx' : r.id === 'haccp' ? '/downloads/checklist-haccp.pdf' : r.id === 'aeo-rag' ? '/downloads/guia-aeo-rag.pdf' : 'https://notion.so/'),
            downloads: `${r.downloads_count || 0}`,
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

  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedResourceForDownload || !downloadEmail) return;

    setDownloadState({ loading: true, success: false, message: "" });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: "Lead Toolkit " + selectedResourceForDownload.id.toUpperCase(),
          email: downloadEmail,
          phone: "+0000000000",
          companyName: "Toolkit: " + selectedResourceForDownload.id,
          resourceId: selectedResourceForDownload.id,
          serviceNeeded: "Toolkit Download: " + selectedResourceForDownload.title,
          businessSize: "B2C Lead Magnet",
          currentChallenge: "Descarga de recurso operativo " + selectedResourceForDownload.id,
        }),
      });
      const data = await res.json();

      setDownloadState({
        loading: false,
        success: data.success !== false,
        message: data.message || "¡Recurso enviado! Revisa tu bandeja de entrada o spam.",
      });
    } catch {
      setDownloadState({
        loading: false,
        success: true,
        message: "¡Enviado! Revisa tu bandeja de entrada.",
      });
    }
  };

  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-[#0284c7] selection:text-white font-sans antialiased">
      <Navbar />

      {/* ── 1. HERO SECTION MEJORADO CON IMAGEN REALISTA Y MENSAJE COMERCIAL ── */}
      <section className="relative min-h-[580px] lg:min-h-[660px] flex items-center justify-center pt-28 pb-20 overflow-hidden text-white">
        {/* Imagen de fondo completa y realista de estudiantes */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/academy-hero.jpg"
            alt="Jóvenes estudiantes de Inteligencia Neuronal Academy con aspiraciones de formación y logro"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          {/* Capas de degradado para garantizar legibilidad óptima y sofisticación visual */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/85 to-zinc-950/65" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/80" />
          {/* Acentos de iluminación de marca */}
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-[#1DACE3]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#EA0C7F]/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-6">
            
            {/* Badge de Autoridad y Formación */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg text-xs font-mono text-white">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold tracking-wide">Campus Virtual Oficial</span>
              <span className="text-white/40">•</span>
              <span className="text-zinc-300">Habilidades con Mayor Demanda Laboral</span>
            </div>

            {/* Título Principal */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Aprende las habilidades esenciales y más actuales{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1DACE3] via-[#EA0C7F] to-[#FEAD2B]">
                con mayor demanda en el mercado laboral.
              </span>
            </h1>

            {/* Subtítulo */}
            <p className="text-base sm:text-lg text-zinc-200 leading-relaxed font-normal max-w-2xl">
              Accede a cursos y recursos. Te ayudamos a desarrollar rápidamente habilidades demandadas para impulsar tu carrera profesional en el cambiante mercado laboral.
            </p>

            {/* Botones de acción rápida */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#cursos"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#1DACE3] to-[#0284c7] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Cursos</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#recursos"
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white font-bold text-sm tracking-wide transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Download className="w-4 h-4 text-[#FEAD2B]" />
                <span>Ver Recursos & Plantillas</span>
              </a>
            </div>

            {/* Métricas flotantes de impacto */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/15 max-w-2xl">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-white font-heading">100%</span>
                <span className="text-xs text-zinc-400">Práctica en vivo</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-amber-400 font-heading">5.0 ★</span>
                <span className="text-xs text-zinc-400">Calidad certificada</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-emerald-400 font-heading">Oficial</span>
                <span className="text-xs text-zinc-400">Certificado con QR</span>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-cyan-300 font-heading">24/7</span>
                <span className="text-xs text-zinc-400">Acceso al campus</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. SECCIÓN CURSOS (ESTILO FICHAS / TARJETAS UDEMY) ── */}
      <section id="cursos" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24">
        
        {/* Header de Sección Cursos */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#0284c7] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-4 h-4" />
              <span>Programas y Especializaciones</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight font-heading">
              Cursos en tendencia
            </h2>
            <p className="text-sm text-zinc-600 mt-1">
              Desarrolla habilidades altamente demandadas con programas prácticos en entornos reales.
            </p>
          </div>

          {/* Filtros de Categoría */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory("ALL")}
              className={"px-3.5 py-1.5 rounded-full text-xs font-bold transition-all " + (activeCategory === "ALL" ? "bg-zinc-900 text-white shadow-sm" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200")}
            >
              Todos ({courses.length})
            </button>
            <button
              onClick={() => setActiveCategory("BOOTCAMP")}
              className={"px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 " + (activeCategory === "BOOTCAMP" ? "bg-[#0284c7] text-white shadow-sm" : "bg-sky-50 text-[#0284c7] hover:bg-sky-100")}
            >
              <Terminal className="w-3.5 h-3.5" />
              Bootcamps
            </button>
            <button
              onClick={() => setActiveCategory("MASTERCLASS")}
              className={"px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 " + (activeCategory === "MASTERCLASS" ? "bg-[#EA0C7F] text-white shadow-sm" : "bg-pink-50 text-[#EA0C7F] hover:bg-pink-100")}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Masterclasses
            </button>
          </div>
        </div>

        {/* Grid de Tarjetas de Cursos (4 Columnas responsivas) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group rounded-2xl border border-zinc-200/90 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail 16:9 con zoom hover */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={course.previewImage}
                    alt={course.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  {/* Badge de Nivel */}
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-zinc-900/85 text-white backdrop-blur-md border border-white/20">
                      {course.level}
                    </span>
                  </div>

                  {/* Duración */}
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 text-[10px] font-mono font-medium text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                    <Clock className="w-3 h-3 text-[#FEAD2B]" />
                    <span>{course.duration}</span>
                  </div>
                </div>

                {/* Cuerpo de la Tarjeta */}
                <div className="p-4 space-y-2">
                  {/* Título */}
                  <h3 className="font-bold text-sm sm:text-[15px] text-zinc-900 leading-snug line-clamp-2 min-h-[2.6rem] group-hover:text-[#0284c7] transition-colors">
                    {course.title}
                  </h3>

                  {/* Instructor */}
                  <p className="text-xs text-zinc-500 line-clamp-1">
                    {course.instructor.name} • {course.instructor.role}
                  </p>

                  {/* Fila de Insignia y Calificación */}
                  <div className="flex items-center gap-2 pt-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#E6F4F1] text-[#007765]">
                      {course.studentsCount > 0 ? "Lo más vendido" : "Inscripciones Abiertas"}
                    </span>

                    <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                      <span>{course.rating ? course.rating.toFixed(1) : "5.0"}</span>
                      <div className="flex text-amber-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>

                    <span className="text-[11px] text-zinc-400">
                      {course.studentsCount > 0 ? `(${course.reviewsCount} reseñas)` : "Nuevo lanzamiento"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Pie de Tarjeta con Precios y Botones */}
              <div className="px-4 pb-4 pt-2 border-t border-zinc-100 space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-black text-zinc-900 font-heading">
                      {course.price}
                    </span>
                    <span className="text-xs line-through text-zinc-400 font-mono">
                      {course.originalPrice}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    50% OFF
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedModalCourse(course);
                      setExpandedModuleId(0);
                    }}
                    className="py-2 px-2 rounded-xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                    <span>Temario</span>
                  </button>

                  <button
                    type="button"
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
                    className="py-2 px-2 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Inscribirme</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ── 3. SECCIÓN RECURSOS (ESTILO FICHAS / TARJETAS) ── */}
      <section id="recursos" className="py-20 bg-zinc-50/70 border-y border-zinc-200 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Header de Sección Recursos */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200/80 pb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#EA0C7F] uppercase tracking-wider mb-1.5">
                <Download className="w-4 h-4" />
                <span>Blueprints, Plantillas & Herramientas</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 tracking-tight font-heading">
                Recursos y Plantillas
              </h2>
              <p className="text-sm text-zinc-600 mt-1">
                Descarga plantillas operativas listas para producción o adquiere blueprints de ingeniería.
              </p>
            </div>

            <div className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Descargas inmediatas verificadas</span>
            </div>
          </div>

          {/* Grid de Tarjetas de Recursos (4 Columnas responsivas) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {resources.map((res) => {
              const isPremium = res.access?.includes("PREMIUM") || (res.price && res.price !== "GRATIS" && !res.price.includes("$0"));

              return (
                <div
                  key={res.id}
                  className={"group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between " + (isPremium ? "border-[#FEAD2B]/60 ring-1 ring-[#FEAD2B]/20" : "border-zinc-200/90")}
                >
                  <div>
                    {/* Thumbnail 16:9 con preview */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-900">
                      <Image
                        src={res.previewImage}
                        alt={res.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-60" />

                      {/* Badge Superior */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className={"px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider backdrop-blur-md border " + (isPremium ? "bg-amber-900/85 text-amber-200 border-amber-400/30" : "bg-emerald-900/85 text-emerald-200 border-emerald-400/30")}>
                          {res.tag}
                        </span>
                      </div>
                    </div>

                    {/* Cuerpo de la Tarjeta */}
                    <div className="p-4 space-y-2">
                      <h3 className="font-bold text-sm sm:text-[15px] text-zinc-900 leading-snug line-clamp-2 min-h-[2.6rem] group-hover:text-[#EA0C7F] transition-colors">
                        {res.title}
                      </h3>

                      <p className="text-xs text-zinc-500 line-clamp-1">
                        {res.format}
                      </p>

                      {/* Fila de Insignia y Calificación */}
                      <div className="flex items-center gap-2 pt-1 flex-wrap">
                        <span className={"px-2 py-0.5 rounded text-[11px] font-bold " + (isPremium ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800")}>
                          {isPremium ? "Blueprint Pro" : "Descarga Gratuita"}
                        </span>

                        <div className="flex items-center gap-1 text-xs font-bold text-amber-700">
                          <span>4.9</span>
                          <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                        </div>

                        <span className="text-[11px] text-zinc-400">
                          {Number(res.downloads) > 0 ? `(${res.downloads} descargas)` : "Disponible"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Pie de Tarjeta con Precios y Botón de Acción */}
                  <div className="px-4 pb-4 pt-2 border-t border-zinc-100 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        {isPremium ? (
                          <>
                            <span className="text-lg font-black text-amber-600 font-heading">
                              {res.price || "$27 USD"}
                            </span>
                            <span className="text-xs line-through text-zinc-400 font-mono">
                              $54 USD
                            </span>
                          </>
                        ) : (
                          <>
                            <span className="text-lg font-black text-emerald-600 font-heading">
                              GRATIS
                            </span>
                            <span className="text-xs line-through text-zinc-400 font-mono">
                              $29 USD
                            </span>
                          </>
                        )}
                      </div>

                      <span className={"text-[10px] font-mono font-bold px-2 py-0.5 rounded " + (isPremium ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800")}>
                        {isPremium ? "LICENCIA PRO" : "ACCESO LIBRE"}
                      </span>
                    </div>

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
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FEAD2B] to-[#EA0C7F] hover:opacity-95 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Comprar por {res.price || "$27 USD"}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedResourceForDownload(res);
                          setDownloadEmail("");
                          setDownloadState({ loading: false, success: false, message: "" });
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5 text-[#1DACE3]" />
                        <span>Descargar Gratis</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── 4. SECCIÓN CERTIFICACIÓN OFICIAL ── */}
      <section className="py-20 bg-zinc-950 text-white relative overflow-hidden border-y border-zinc-800">
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
                  <span>Código de validación permanente en nuestro portal oficial de certificados.</span>
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

            {/* Mockup del Diploma Oficial de Vanguardia */}
            <div className="lg:col-span-6">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#121824] via-[#0E131D] to-[#080B10] border-2 border-[#1DACE3]/40 shadow-2xl space-y-6 text-center backdrop-blur-md overflow-hidden">
                
                {/* Guilloche decorativo */}
                <div className="absolute inset-2 border border-[#1DACE3]/20 rounded-2xl pointer-events-none" />
                <div className="absolute inset-3 border border-dashed border-[#EA0C7F]/20 rounded-2xl pointer-events-none" />

                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 relative">
                      <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="font-heading font-bold text-sm tracking-tight text-white">Inteligencia Neuronal Academy</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#FEAD2B] bg-[#FEAD2B]/10 px-2.5 py-0.5 rounded-full border border-[#FEAD2B]/20">ID: IN-2026-OFICIAL</span>
                </div>

                <div className="space-y-2 py-2 relative z-10">
                  <span className="text-[10px] font-mono tracking-widest text-[#1DACE3] uppercase font-bold bg-[#1DACE3]/10 px-3 py-1 rounded-full border border-[#1DACE3]/30 inline-block">
                    DIPLOMA DE EXCELENCIA & ACREDITACIÓN PROFESIONAL
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-white to-zinc-300 font-extrabold italic pt-2">
                    Julio Alberto Daza
                  </h3>
                  <p className="text-xs text-zinc-400 max-w-md mx-auto pt-1 leading-relaxed">
                    Por haber superado con distinción técnica el 100% de los laboratorios en producción y quizes del programa:
                  </p>
                  <p className="text-sm font-extrabold text-[#1DACE3] pt-1">
                    Bootcamp: Arquitectura de Pipelines con n8n & Agentes IA
                  </p>
                </div>

                {/* Reseña de Competencias */}
                <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-left text-[11px] text-zinc-300 space-y-1.5 relative z-10">
                  <span className="text-[9px] font-mono font-bold text-[#FEAD2B] uppercase tracking-wider block">COMPETENCIAS CERTIFICADAS:</span>
                  <div className="grid grid-cols-2 gap-1 text-[10px]">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">VPS & Docker Hardening</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">Meta Cloud API Webhooks</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">PostgreSQL con RLS</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                      <span className="truncate">Agentes Autónomos LLM</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-800 pt-4 text-[10px] font-mono text-zinc-400 relative z-10">
                  <div className="text-left">
                    <span className="block font-bold text-zinc-100 font-serif italic text-xs">Julio Daza</span>
                    <span className="text-[9px] text-zinc-500">Director de Arquitectura</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-12 bg-white p-1 rounded-xl flex items-center justify-center">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=https://www.inteligencianeuronal.com/certificados/IN-2026-OFICIAL"
                        alt="QR Demo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 5. GARANTÍA & COMPROMISO DE CALIDAD ── */}
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

      {/* ── MODAL: DETALLES COMPLETOS DEL PROGRAMA & TEMARIO OFICIAL (ESTILO UDEMY) ── */}
      {selectedModalCourse && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-zinc-950/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedModalCourse(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-white border border-zinc-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-zinc-900"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar del Modal */}
            <div className="flex items-center justify-between px-6 py-3.5 border-b border-zinc-100 bg-zinc-50/90 shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-wider text-zinc-600 font-bold">
                  {selectedModalCourse.type} // Temario & Ficha Académica Oficial
                </span>
              </div>

              <button
                onClick={() => setSelectedModalCourse(null)}
                className="p-1.5 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors cursor-pointer"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contenido scrolleable completo */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
              
              {/* 1. HERO DEL CURSO (ESTILO UDEMY DARK HEADER) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white space-y-5 border border-zinc-800 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-cyan-500/10 via-pink-500/5 to-transparent blur-3xl pointer-events-none" />

                <div className="space-y-3 relative z-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-cyan-300 border border-white/15">
                      {selectedModalCourse.level}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/15">
                      {selectedModalCourse.duration}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black font-heading text-white leading-tight">
                    {selectedModalCourse.title}
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                    {selectedModalCourse.tagline}
                  </p>

                  {/* Fila de Social Proof & Metadatos */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-2 text-xs text-zinc-300">
                    <span className="px-2.5 py-0.5 rounded font-bold text-[11px] bg-[#E6F4F1] text-[#007765]">
                      {selectedModalCourse.badge || "Lo más vendido"}
                    </span>

                    <div className="flex items-center gap-1.5 font-bold text-amber-400">
                      <span>★ {selectedModalCourse.rating.toFixed(1)}</span>
                      <span className="text-zinc-400 font-normal">({selectedModalCourse.reviewsCount} calificaciones)</span>
                    </div>

                    <span className="text-zinc-400">
                      • {selectedModalCourse.studentsCount > 0 ? `${selectedModalCourse.studentsCount.toLocaleString()} estudiantes` : "Inscripciones Abiertas"}
                    </span>

                    <span className="text-zinc-300">
                      • Creado por <strong className="text-white font-semibold">{selectedModalCourse.instructor.name}</strong>
                    </span>

                    <div className="flex items-center gap-3 text-zinc-400 text-[11px] font-mono">
                      <span>Actualizado: {selectedModalCourse.lastUpdated || "8/2026"}</span>
                      <span>🌐 {selectedModalCourse.language || "Español"}</span>
                    </div>
                  </div>
                </div>

                {/* Caja de Precio y Garantía integrada en el Header */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-white font-heading">
                      {selectedModalCourse.price}
                    </span>
                    <span className="text-sm line-through text-zinc-400 font-mono">
                      {selectedModalCourse.originalPrice}
                    </span>
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      {selectedModalCourse.discount || "50% OFF"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-zinc-300">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                      <span className="font-semibold text-white">Garantía de reembolso de 14 días</span>
                    </div>
                    <span className="text-zinc-500">•</span>
                    <span className="text-zinc-300">Acceso de por vida</span>
                  </div>
                </div>
              </div>

              {/* 2. LO QUE APRENDERÁS (ESTILO UDEMY LEARNING OUTCOMES) */}
              <div className="p-6 rounded-3xl bg-sky-50/50 border border-sky-200/70 space-y-4">
                <h3 className="text-base sm:text-lg font-bold font-heading text-zinc-900 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#0284c7]" />
                  <span>Lo que aprenderás</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedModalCourse.learningOutcomes.map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-800 leading-snug">
                      <span className="text-emerald-600 font-bold text-base mt-[-2px]">✓</span>
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. ESTE CURSO INCLUYE (ICONOS Y ENTREGABLES) */}
              <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-4">
                <h3 className="text-base font-bold font-heading text-zinc-900">
                  Este curso incluye:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-zinc-700">
                  <div className="flex items-center gap-2.5">
                    <Video className="w-4 h-4 text-[#0284c7]" />
                    <span>{selectedModalCourse.hoursVideo || "12 horas de video bajo demanda"}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <FileCode2 className="w-4 h-4 text-purple-600" />
                    <span>{selectedModalCourse.articlesCount || 20} artículos y laboratorios técnicos</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Download className="w-4 h-4 text-emerald-600" />
                    <span>{selectedModalCourse.resourcesCount || 25} recursos descargables y plantillas</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Acceso de por vida sin cuotas mensuales</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-pink-600" />
                    <span>Acceso en dispositivos móviles y de escritorio</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Award className="w-4 h-4 text-[#FEAD2B]" />
                    <span>Certificado oficial con código de verificación QR</span>
                  </div>
                </div>
              </div>

              {/* 4. CONTENIDO DEL CURSO (SYLLABUS INTERACTIVO DESPLEGABLE) */}
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-zinc-200 pb-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-heading text-zinc-900">
                      Contenido del curso
                    </h3>
                    <p className="text-xs text-zinc-500">
                      {selectedModalCourse.modules.length} secciones • {selectedModalCourse.modules.length * 4} clases • {selectedModalCourse.duration}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-[#0284c7] font-bold">
                    Temario 100% Práctico
                  </span>
                </div>

                <div className="space-y-2.5">
                  {selectedModalCourse.modules.map((mod, mIdx) => {
                    const isOpen = expandedModuleId === mIdx;

                    return (
                      <div
                        key={mIdx}
                        className="rounded-2xl border border-zinc-200 bg-white overflow-hidden transition-all shadow-xs"
                      >
                        <button
                          type="button"
                          onClick={() => setExpandedModuleId(isOpen ? null : mIdx)}
                          className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-zinc-50/80 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-zinc-100 text-zinc-800 border border-zinc-200/80">
                              {mod.week}
                            </span>
                            <span className="text-xs sm:text-sm font-bold text-zinc-900">
                              {mod.title}
                            </span>
                          </div>
                          <div className="text-zinc-400 flex-shrink-0">
                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 pt-2 bg-zinc-50/50 border-t border-zinc-100 text-xs text-zinc-600 space-y-3">
                            {mod.desc && (
                              <p className="text-xs text-zinc-600 italic leading-relaxed">
                                {mod.desc}
                              </p>
                            )}

                            {mod.lessons && (
                              <div className="space-y-2 pt-1">
                                {mod.lessons.map((lesson, lIdx) => (
                                  <div
                                    key={lIdx}
                                    className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-zinc-100 text-zinc-800"
                                  >
                                    <div className="flex items-center gap-2.5">
                                      <Video className="w-3.5 h-3.5 text-[#0284c7] shrink-0" />
                                      <span className="text-xs font-medium">{lesson}</span>
                                    </div>
                                    <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                                      Laboratorio
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5. REQUISITOS */}
              <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-3">
                <h3 className="text-base font-bold font-heading text-zinc-900">
                  Requisitos
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
                  {(selectedModalCourse.requirements && selectedModalCourse.requirements.length > 0
                    ? selectedModalCourse.requirements
                    : [
                        "Una computadora (Mac, Windows o Linux) con conexión a Internet.",
                        "Ganas de experimentar y construir software con las herramientas de IA más avanzadas."
                      ]
                  ).map((req, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2">
                      <span className="text-zinc-400 mt-0.5">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 6. DESCRIPCIÓN COMPLETA (CARTA PEDAGÓGICA Y COMERCIAL) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-zinc-200 space-y-4">
                <h3 className="text-base sm:text-lg font-bold font-heading text-zinc-900">
                  Descripción del Programa
                </h3>

                <div className="text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-4 whitespace-pre-line font-sans">
                  {selectedModalCourse.description || selectedModalCourse.tagline}
                </div>
              </div>

              {/* 7. ¿PARA QUIÉN ES ESTE CURSO? */}
              <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-200 space-y-3">
                <h3 className="text-base font-bold font-heading text-zinc-900">
                  ¿Para quién es este curso?
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700">
                  {(selectedModalCourse.targetAudience && selectedModalCourse.targetAudience.length > 0
                    ? selectedModalCourse.targetAudience
                    : [
                        "Desarrolladores y profesionales técnicos que quieren crear aplicaciones reales con IA.",
                        "Emprendedores que buscan acelerar la entrega de productos de software.",
                        "Equipos de ingeniería que desean elevar la productividad y seguridad de sus flujos."
                      ]
                  ).map((aud, aIdx) => (
                    <li key={aIdx} className="flex items-start gap-2">
                      <span className="text-[#0284c7] font-bold mt-0.5">→</span>
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 8. INSTRUCTOR PROFILE */}
              <div className="p-6 rounded-3xl bg-zinc-900 text-white space-y-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedModalCourse.instructor.avatar}
                    alt={selectedModalCourse.instructor.name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-white/20"
                  />
                  <div>
                    <h4 className="text-base font-bold text-white font-heading">
                      {selectedModalCourse.instructor.name}
                    </h4>
                    <p className="text-xs text-cyan-300 font-mono">
                      {selectedModalCourse.instructor.role}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Fundador y arquitecto técnico en Inteligencia Neuronal. Especialista en orquestación agéntica, infraestructura de automatización en servidores dedicados y desarrollo de software asistido por IA.
                </p>
              </div>

            </div>

            {/* Footer Fijo con Precios y CTA de Inscripción */}
            <div className="p-4 sm:p-6 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between gap-4 shrink-0">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-zinc-900 font-heading">
                  {selectedModalCourse.price}
                </span>
                <span className="text-xs sm:text-sm text-zinc-400 line-through font-mono">
                  {selectedModalCourse.originalPrice}
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  {selectedModalCourse.discount || "50% OFF"}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedModalCourse(null)}
                  className="hidden sm:block py-3 px-4 rounded-xl border border-zinc-300 text-zinc-700 font-semibold text-xs hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Cerrar
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const c = selectedModalCourse;
                    setSelectedModalCourse(null);
                    openCheckout({
                      id: c.id,
                      title: c.title,
                      price: c.price,
                      tagline: c.tagline,
                      duration: c.duration,
                      badge: c.badge,
                    });
                  }}
                  className="py-3 px-6 sm:px-8 rounded-xl bg-gradient-to-r from-[#0284c7] via-[#1DACE3] to-[#0284c7] hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-sky-500/25 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <span>Inscribirme Ahora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── MODAL: DESCARGA DE RECURSO GRATUITO ── */}
      {selectedResourceForDownload && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-zinc-950/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedResourceForDownload(null)}
        >
          <div
            className="relative w-full max-w-md bg-white border border-zinc-200 rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 text-zinc-900 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <span className="text-xs font-mono font-bold text-[#0284c7] uppercase">
                Descarga de Recurso Gratuito
              </span>
              <button
                onClick={() => setSelectedResourceForDownload(null)}
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-left">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 inline-block">
                {selectedResourceForDownload.tag}
              </span>
              <h3 className="text-base font-bold text-zinc-900 leading-snug">
                {selectedResourceForDownload.title}
              </h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                {selectedResourceForDownload.desc}
              </p>
            </div>

            {downloadState.success ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-3 text-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto" />
                <p className="font-bold">{downloadState.message}</p>
                <p className="text-[11px] text-emerald-700">
                  Si no lo visualizas en tu correo en 2 minutos, también puedes descargarlo directamente aquí:
                </p>
                <a
                  href={selectedResourceForDownload.fileUrl || `/downloads/${selectedResourceForDownload.id === 'escandallos' ? 'matriz-escandallos.xlsx' : selectedResourceForDownload.id === 'haccp' ? 'checklist-haccp.pdf' : selectedResourceForDownload.id === 'aeo-rag' ? 'guia-aeo-rag.pdf' : 'framework-sops-checklists.pdf'}`}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors w-full"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Archivo Ahora</span>
                </a>
              </div>
            ) : (
              <form onSubmit={handleResourceSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-zinc-700 mb-1.5">
                    INGRESA TU CORREO DE CONTACTO
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tu@empresa.com"
                    value={downloadEmail}
                    onChange={(e) => setDownloadEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-[#0284c7] outline-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={downloadState.loading}
                  className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {downloadState.loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Enviando enlace...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#1DACE3]" />
                      <span>Enviar Enlace de Descarga Inmediata</span>
                    </>
                  )}
                </button>
              </form>
            )}

            <div className="text-[10px] text-zinc-400 font-mono text-center pt-2">
              🔒 Cero Spam • Privacidad garantizada por Inteligencia Neuronal
            </div>
          </div>
        </div>
      )}

      <CourseCheckoutModal />
      <Footer />
    </main>
  );
}
