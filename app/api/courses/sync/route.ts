import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

const OFFICIAL_COURSES = [
  {
    id: "bootcamp-n8n",
    slug: "bootcamp-n8n",
    badge: "Lo más vendido",
    level: "Intermedio a Avanzado",
    title: "Bootcamp: Arquitectura de Pipelines con n8n & Agentes IA",
    tagline: "Aprende a desplegar infraestructura empresarial de automatización sobre servidores VPS dedicados, orquestando agentes autónomos, PostgreSQL y WhatsApp Cloud API.",
    description: "Aprende a desplegar infraestructura empresarial de automatización sobre servidores VPS dedicados, orquestando agentes autónomos, PostgreSQL y WhatsApp Cloud API.",
    duration: "6 Semanas Intensivas",
    price_usd: 197.0,
    price_display: "$197 USD",
    preview_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    stripe_color: "from-[#1DACE3] via-[#0284c7] to-[#4f46e5]",
    cta_url: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
    status: "ACTIVO",
    students_enrolled: 0,
    order_index: 1,
    tools: {
      stack: ["n8n Self-Hosted", "Docker & Caddy", "PostgreSQL", "Meta Cloud API", "LangChain / LLMs"],
      outcomes: [
        "Instalar y asegurar n8n en servidores VPS con Docker, certificados SSL y copias de seguridad automáticas.",
        "Conectar y validar Webhooks de Meta (WhatsApp, Instagram) con manejo de colas y sin caídas.",
        "Modelar bases de datos relacionales en PostgreSQL con aislamiento multi-inquilino (Row-Level Security).",
        "Construir agentes autónomos con memoria persistente y llamadas a funciones (Tool Calling) en producción.",
      ],
      includes: [
        "6 Semanas en vivo + grabaciones en HD",
        "24 Sesiones técnicas y laboratorios",
        "Acceso de por vida a plantillas y flujos",
        "Certificado oficial de finalización con código QR",
      ],
      requirements: [
        "Conocimientos básicos de computación y terminal.",
        "Cuenta en un proveedor VPS (Hetzner, DigitalOcean o similar).",
      ],
      audience: [
        "Desarrolladores y consultores de automatización.",
        "Arquitectos de software y líderes técnicos.",
      ],
      instructor: {
        name: "Julio Daza",
        role: "Arquitecto de Sistemas & Fundador",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      original_price: "$390 USD",
      discount: "50% OFF",
      rating: 4.9,
      reviews_count: 140,
      hours_video: "24 horas de laboratorio y sesiones",
      articles_count: 24,
      resources_count: 30,
      last_updated: "8/2026",
      language: "Español",
    },
    modules: [
      {
        week_label: "01",
        title: "Módulo 01: Despliegue VPS con Docker, n8n & Caddy SSL",
        description: "Arquitectura de infraestructura soberana, configuración de variables de entorno y optimización de concurrencia.",
        summary: "Aprovisionamiento de servidor Linux VPS, Docker Compose y persistencia de volúmenes, proxy inverso con Caddy y HTTPS automático.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Laboratorio 01: Hardening de VPS y Docker Compose\n\n1. Instalar paquetes esenciales: `sudo apt update && sudo apt install docker.io docker-compose -y`\n2. Configurar el archivo Caddyfile con tu dominio de producción.\n3. Desplegar n8n con persistencia en volumen host.",
        prompts: ["Genera un script bash de aprovisionamiento seguro para Ubuntu 24.04 con Docker, Caddy y puertos 80/443 abiertos."],
        downloads: [
          { name: "docker-compose-n8n-caddy.yml", type: "Docker YAML", url: "#" },
          { name: "Script_Setup_VPS_Ubuntu.sh", type: "Bash Script", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Por qué es crucial vincular un volumen persistente en el contenedor de n8n?",
              options: [
                "Para evitar que se borren los flujos y credenciales al reiniciar o actualizar la imagen Docker.",
                "Para aumentar la velocidad de la memoria RAM del servidor.",
                "Para poder ejecutar comandos de Windows en Linux.",
              ],
              correctIndex: 0,
              explanation: "Los contenedores Docker son efímeros por defecto; el volumen garantiza que los flujos y credenciales se conserven.",
            },
          ],
        },
      },
      {
        week_label: "02",
        title: "Módulo 02: Meta Cloud API & Webhooks Reversos",
        description: "Ingeniería de conexión oficial con WhatsApp Cloud API y recepción de eventos transaccionales.",
        summary: "Handshake de verificación de webhooks, manejo de estados de mensajes, envío de plantillas interactivas y botones.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Laboratorio 02: Handshake con Meta Developers\n\nConfigura el nodo Code en n8n para responder con hub.challenge a las peticiones GET de Meta.",
        prompts: ["Construye un nodo Code en JavaScript que extraiga hub.challenge de los query parameters de Meta."],
        downloads: [{ name: "Meta_Webhook_Handshake_Node.json", type: "n8n Sub-Flow", url: "#" }],
        quiz_data: {
          enabled: true,
          passing_score: 100,
          questions: [
            {
              question: "¿Cuál es el código de respuesta HTTP requerido por Meta para validar un Webhook?",
              options: ["HTTP 200 con el hub.challenge en el cuerpo", "HTTP 301 Redirect", "HTTP 500 Error"],
              correctIndex: 0,
              explanation: "Meta exige que el endpoint devuelva exactamente el valor de hub.challenge con status 200.",
            },
          ],
        },
      },
      {
        week_label: "03",
        title: "Módulo 03: Bases de Datos Relacionales & Row-Level Security",
        description: "Persistencia de leads, pedidos y catálogos en PostgreSQL y Supabase con políticas RLS.",
        summary: "Modelado relacional para operaciones, consultas SQL optimizadas en nodos n8n, aislamiento de datos multi-tenant.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Laboratorio 03: Políticas RLS en Supabase y Consultas n8n",
        prompts: ["Diseña una tabla de pedidos con políticas RLS por organización."],
        downloads: [{ name: "schema_restaurante_rls.sql", type: "SQL Schema", url: "#" }],
      },
      {
        week_label: "04",
        title: "Módulo 04: Orquestación de Agentes Autónomos LLM",
        description: "Integración de modelos Gemini y Claude como cerebros decisorios conectados a bases de datos.",
        summary: "Configuración de nodos AI Agent en n8n, estructuración de herramientas (Tools & Functions), mitigación de alucinaciones y guardrails.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Laboratorio 04: Agente con Tool Calling en n8n",
        prompts: ["Define el esquema JSON Schema para que el agente consulte disponibilidad de mesas."],
        downloads: [{ name: "agent_tool_definition.json", type: "JSON", url: "#" }],
      },
      {
        week_label: "05",
        title: "Módulo 05: Monitoreo, Telemetría & Alertas 24/7",
        description: "Construcción de bots supervisores en Telegram para detección de fallos y cuellos de botella.",
        summary: "Manejo de errores por sub-flujos, telemetría de tiempo de ejecución y memoria, protocolos de contingencia en vivo.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Laboratorio 05: Bot de Alertas Críticas",
        prompts: ["Crea un subflujo de captura de errores que envíe trazas formateadas a un canal privado de Telegram."],
        downloads: [{ name: "telegram_alert_subflow.json", type: "n8n Flow", url: "#" }],
      },
      {
        week_label: "06",
        title: "Módulo 06: Proyecto Final, Auditoría y Certificación",
        description: "Defensa técnica de un pipeline completo en producción y emisión del diploma con ID único.",
        summary: "Revisión de arquitectura uno a uno, pruebas de estrés y carga, entrega de credencial verificable.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Proyecto Final de Graduación y Emisión de Credencial",
        prompts: ["Genera una lista de verificación pre-despliegue para sistemas agénticos en producción."],
        downloads: [{ name: "checklist_auditoria_produccion.pdf", type: "PDF", url: "#" }],
      },
    ],
  },
  {
    id: "ia-restaurantes",
    slug: "ia-restaurantes",
    badge: "Lo más vendido",
    level: "Operativo & Estratégico",
    title: "Masterclass: Automatización Agéntica con IA para Restaurantes",
    tagline: "Aprende a implementar agentes inteligentes que atienden por WhatsApp, capturan pedidos y calculan escandallos sin alucinaciones.",
    description: "Aprende a implementar agentes inteligentes que atienden por WhatsApp, capturan pedidos y calculan escandallos sin alucinaciones.",
    duration: "4 Módulos Grabados",
    price_usd: 97.0,
    price_display: "$97 USD",
    preview_image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    stripe_color: "from-[#EA0C7F] via-[#971B8D] to-[#6366f1]",
    cta_url: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
    status: "ACTIVO",
    students_enrolled: 0,
    order_index: 2,
    tools: {
      stack: ["WhatsApp Cloud API", "Gemini Pro", "Airtable", "Escandallos XLSX", "KDS Prompts"],
      outcomes: [
        "Parametrizar prompts con rigor físico y matemático para que la IA nunca invente precios ni recetas.",
        "Configurar un asistente de WhatsApp 24/7 con catálogo dinámico de platos y horarios.",
        "Integrar matrices de costos crudo/cocido en tiempo real sin requerir software caro.",
        "Implementar un protocolo de contingencia y desvío a agentes humanos para casos críticos.",
      ],
      includes: [
        "4 Módulos grabados en alta definición",
        "Plantilla Excel de escandallos automatizada",
        "Acceso directo a la comunidad privada",
        "Certificado oficial con verificación digital",
      ],
      requirements: [
        "Conexión a Internet y navegador web.",
        "No se requieren conocimientos previos de programación.",
      ],
      audience: [
        "Dueños de restaurantes, bares y dark kitchens.",
        "Gerentes de operaciones y consultores gastronómicos.",
      ],
      instructor: {
        name: "Julio Daza",
        role: "Consultor de Inteligencia Operativa",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      original_price: "$197 USD",
      discount: "50% OFF",
      rating: 4.8,
      reviews_count: 112,
      hours_video: "8 horas de contenido práctico",
      articles_count: 16,
      resources_count: 12,
      last_updated: "8/2026",
      language: "Español",
    },
    modules: [
      {
        week_label: "01",
        title: "Módulo 01: Arquitectura de Prompts & Escandallos de Cocina",
        description: "Ingeniería de menú, control de factores de rendimiento y calibración de recetas sin margen de error.",
        summary: "Estructura de prompts sin alucinaciones, cálculo de mermas y macronutrientes, plantilla de costeo automatizada.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Guía 01: Auditoría de Food Cost y Fugas de Margen\n\n1. Mapear compras semanales vs comandas emitidas en el POS.\n2. Aplicar factor de merma por ingrediente limpio.\n3. Aislar platos con margen bruto menor al 68%.",
        prompts: ["Actúa como un Director de Operaciones Gastronómicas y analiza el siguiente listado de compras semanales..."],
        downloads: [
          { name: "Matriz_Diagnostico_FoodCost.xlsx", type: "Excel", url: "#" },
          { name: "Checklist_Auditoria_Recepcion.pdf", type: "PDF", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Cómo se calcula correctamente el Food Cost Teórico de una receta?",
              options: [
                "Costo de ingredientes limpios considerando merma dividido entre el precio de venta sin IVA.",
                "Multiplicando el precio de compra del ingrediente por 3.",
                "Restando el alquiler del local al ticket promedio.",
              ],
              correctIndex: 0,
              explanation: "El Food Cost Teórico debe contemplar el factor de rendimiento y la merma técnica.",
            },
          ],
        },
      },
      {
        week_label: "02",
        title: "Módulo 02: Agente de Ventas & Reservas por WhatsApp",
        description: "Configuración del flujo conversacional para atender comensales y procesar reservas en segundos.",
        summary: "Flujo de bienvenida y menú dinámico, captura de datos y confirmación automática, gestión de restricciones alimentarias.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Guía 02: Configuración de Flujos de Reserva por WhatsApp",
        prompts: ["Prompt de atención telefónica y WhatsApp para reservas de mesas con confirmación de comensales."],
        downloads: [{ name: "flujo_reservas_whatsapp.json", type: "Flujo", url: "#" }],
      },
      {
        week_label: "03",
        title: "Módulo 03: Supervisión, Seguridad & Mitigación de Errores",
        description: "Reglas inquebrantables para impedir que el agente ofrezca descuentos no autorizados o datos falsos.",
        summary: "Guardrails de precios y políticas, filtros de sentimiento y derivación humana, auditoría de logs de conversación.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Guía 03: Guardrails y Seguridad Conversacional",
        prompts: ["Configura un validador que detecte intentos de inyección de prompt por parte del cliente."],
        downloads: [{ name: "guardrails_template.json", type: "Config", url: "#" }],
      },
      {
        week_label: "04",
        title: "Módulo 04: Puesta en Marcha en Negocio Real & Métricas",
        description: "Estrategias de lanzamiento con clientes reales y medición del incremento en tasa de conversión.",
        summary: "Lanzamiento controlado en horario valle, medición de tiempos de respuesta, retorno de inversión del agente.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Guía 04: Métricas de Conversión y Retorno de Inversión",
        prompts: ["Calcula el retorno de inversión del agente comparando horas hombre ahorradas vs coste de API."],
        downloads: [{ name: "calculadora_roi_ia.xlsx", type: "Excel", url: "#" }],
      },
    ],
  },
  {
    id: "crecimiento-aeo",
    slug: "crecimiento-aeo",
    badge: "Lo más vendido",
    level: "Marketing & Adquisición",
    title: "Dominio Local: SEO, AEO & Visibilidad en Motores de IA",
    tagline: "Posiciona tu marca en Google Maps y sé la primera recomendación que ChatGPT, Gemini y Perplexity sugieren a clientes potenciales.",
    description: "Posiciona tu marca en Google Maps y sé la primera recomendación que ChatGPT, Gemini y Perplexity sugieren a clientes potenciales.",
    duration: "3 Módulos Prácticos",
    price_usd: 67.0,
    price_display: "$67 USD",
    preview_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    stripe_color: "from-[#FEAD2B] via-[#ea580c] to-[#e11d48]",
    cta_url: "https://buy.stripe.com/test_crecimiento_aeo",
    status: "ACTIVO",
    students_enrolled: 0,
    order_index: 3,
    tools: {
      stack: ["Google Business Profile", "Microdatos JSON-LD", "ChatGPT Search", "Schema.org", "Perplexity API"],
      outcomes: [
        "Optimizar tu ficha de Google Maps para aparecer en el Top 3 local.",
        "Implementar esquemas JSON-LD semánticos para citación en IA generativa.",
        "Generar reseñas orgánicas automatizadas mediante WhatsApp.",
        "Monitorear la cuota de visibilidad frente a competidores directos.",
      ],
      includes: [
        "3 Módulos prácticos intensivos",
        "Plantillas de esquemas JSON-LD listos para usar",
        "Guía de optimización de perfil de negocio",
        "Certificado de finalización oficial",
      ],
      requirements: [
        "Acceso a la cuenta de Google de tu negocio.",
        "Conocimientos básicos de administración web.",
      ],
      audience: [
        "Emprendedores, negocios locales y franquicias.",
        "Especialistas en marketing digital y SEO.",
      ],
      instructor: {
        name: "Julio Daza",
        role: "Especialista en AEO & Crecimiento",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      original_price: "$134 USD",
      discount: "50% OFF",
      rating: 4.9,
      reviews_count: 88,
      hours_video: "6 horas de video paso a paso",
      articles_count: 12,
      resources_count: 10,
      last_updated: "8/2026",
      language: "Español",
    },
    modules: [
      {
        week_label: "01",
        title: "Módulo 01: Optimización de Perfil de Negocio en Google",
        description: "Factores de posicionamiento local, categorías estratégicas y gestión de señales de confianza.",
        summary: "Configuración precisa de categorías, geolocalización de fotos y menú, estrategia de palabras clave locales.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 01: Checklist de Optimización Google Maps",
        prompts: ["Genera una lista de palabras clave semánticas locales para posicionar un restaurante en Madrid."],
        downloads: [{ name: "checklist_google_maps_top3.pdf", type: "PDF", url: "#" }],
      },
      {
        week_label: "02",
        title: "Módulo 02: Arquitectura de Datos para Motores de Respuesta (AEO)",
        description: "Estructuración de microdatos JSON-LD para que los modelos LLM entiendan tu catálogo y oferta.",
        summary: "Creación de esquemas Restaurant & LocalBusiness, validación en Google Rich Results, optimización semántica de FAQs.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 02: Microdatos JSON-LD para Citación IA",
        prompts: ["Crea un esquema JSON-LD Schema.org completo de tipo Restaurant con menú y horarios."],
        downloads: [{ name: "schema_restaurant_aeo.json", type: "JSON", url: "#" }],
      },
      {
        week_label: "03",
        title: "Módulo 03: Automatización de Reseñas y Reputación 5 Estrellas",
        description: "Funnels de fidelización que incentivan opiniones verificadas de clientes reales.",
        summary: "Flujos de feedback post-consumo, plantillas de respuesta rápida con IA, auditoría de sentimiento de marca.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 03: Funnel de Captación de Reseñas 5 Estrellas",
        prompts: ["Genera respuestas profesionales y empáticas a reseñas positivas y críticas constructivas."],
        downloads: [{ name: "plantillas_respuestas_resenas.pdf", type: "PDF", url: "#" }],
      },
    ],
  },
  {
    id: "claude-code",
    slug: "claude-code",
    badge: "Lo más vendido",
    level: "Desarrollo & Automatización",
    title: "Curso Completo de Claude Code: Crea Aplicaciones con IA",
    tagline: "Domina Claude Code a nivel profesional y crea aplicaciones reales y seguras con Agentes de IA, MCP, Hooks, Skills y terminal autónoma.",
    description: "Domina Claude Code a nivel profesional y crea aplicaciones reales y seguras con Agentes de IA, MCP, Hooks, Skills y terminal autónoma.",
    duration: "12 Secciones • 15h 7m",
    price_usd: 97.0,
    price_display: "$97 USD",
    preview_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    stripe_color: "from-[#EA0C7F] via-[#971B8D] to-[#1DACE3]",
    cta_url: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
    status: "ACTIVO",
    students_enrolled: 0,
    order_index: 4,
    tools: {
      stack: ["Claude Code CLI", "Claude 3.7 Sonnet", "Node.js", "Git & GitHub", "Docker"],
      outcomes: [
        "Configurar y dominar la terminal con Claude Code para programar y refactorizar en segundos.",
        "Diseñar flujos de trabajo autónomos donde la IA inspecciona código y ejecuta tests de forma segura.",
        "Crear scripts y herramientas personalizadas con APIs agénticas.",
        "Integrar el stack agéntico en tus flujos de trabajo diarios para multiplicar tu productividad x10.",
      ],
      includes: [
        "15 horas de video bajo demanda",
        "112 Clases prácticas y laboratorios",
        "Configuraciones avanzadas de MCP y Hooks",
        "Certificado oficial de finalización con código QR",
      ],
      requirements: [
        "Conocimientos básicos de desarrollo web o scripting.",
        "Computadora con Node.js y Git instalados.",
      ],
      audience: [
        "Desarrolladores, programadores e ingenieros de software.",
        "Fundadores técnicos y creadores de producto.",
      ],
      instructor: {
        name: "Julio Daza",
        role: "Arquitecto de Sistemas & Fundador",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      original_price: "$197 USD",
      discount: "50% OFF",
      rating: 4.9,
      reviews_count: 96,
      hours_video: "15 horas 7 minutos",
      articles_count: 35,
      resources_count: 40,
      last_updated: "8/2026",
      language: "Español",
    },
    modules: [
      {
        week_label: "01",
        title: "Módulo 01: Configuración de Entorno & Claude CLI",
        description: "Instalación, claves de API, configuración de permisos y seguridad de ejecución.",
        summary: "Arquitectura de Claude Code, tokens y presupuestos de costo, primeros comandos y diagnósticos.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 01: Configuración de Claude Code CLI\n\n1. Instalación global: `npm install -g @anthropic-ai/claude-code`\n2. Configuración de API Key de Anthropic.\n3. Configuración de permisos de archivos y terminal.",
        prompts: ["Configura una regla de arquitectura para que Claude Code siga las directrices del proyecto."],
        downloads: [{ name: "claude_project_config.json", type: "JSON", url: "#" }],
      },
      {
        week_label: "02",
        title: "Módulo 02: Ingeniería de Prompts en Terminal & Multi-Turn",
        description: "Dirección precisa de agentes para tareas de programación complejas.",
        summary: "Contextos de código amplios, refactorización dirigida, generación de pruebas automáticas.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 02: Refactorización y Pruebas Unitarias con Agentes",
        prompts: ["Instruye al agente para inspeccionar el módulo de autenticación y añadir pruebas de integración."],
        downloads: [{ name: "prompt_templates_claude.md", type: "Markdown", url: "#" }],
      },
      {
        week_label: "03",
        title: "Módulo 03: Integración con Git, CI/CD y APIs Externas",
        description: "Agentes que revisan pull requests y despliegan a producción.",
        summary: "Automatización de commits y changelogs, pipelines de verificación, herramientas de inspección.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 03: Flujo de Trabajo con Git y GitHub Actions",
        prompts: ["Crea un workflow de GitHub Actions que invoque un agente para revisar la calidad del código en cada PR."],
        downloads: [{ name: "ci_cd_agent_workflow.yml", type: "YAML", url: "#" }],
      },
      {
        week_label: "04",
        title: "Módulo 04: Proyecto Práctico: Agente Fullstack Desplegado",
        description: "Construcción completa de una aplicación interactiva guiada por IA.",
        summary: "Diseño de arquitectura, desarrollo iterativo acelerado, entrega y certificación final.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 04: Despliegue de Aplicación Completa Fullstack",
        prompts: ["Diseña un plan de implementación completo para una API con autenticación y base de datos relacional."],
        downloads: [{ name: "starter_fullstack_kit.zip", type: "ZIP", url: "#" }],
      },
    ],
  },
];

export async function POST() {
  try {
    const db = getSupabaseAdmin();
    const results = [];

    for (const course of OFFICIAL_COURSES) {
      const { modules, ...courseData } = course;

      // Upsert course
      const { data: upsertedCourse, error: courseError } = await db
        .from("courses")
        .upsert(
          {
            id: courseData.id,
            slug: courseData.slug,
            title: courseData.title,
            badge: courseData.badge,
            level: courseData.level,
            tagline: courseData.tagline,
            description: courseData.description,
            duration: courseData.duration,
            price_usd: courseData.price_usd,
            price_display: courseData.price_display,
            preview_image: courseData.preview_image,
            stripe_color: courseData.stripe_color,
            tools: courseData.tools,
            cta_url: courseData.cta_url,
            status: courseData.status,
            students_enrolled: courseData.students_enrolled,
            order_index: courseData.order_index,
          },
          { onConflict: "id" }
        )
        .select()
        .single();

      if (courseError) {
        console.error(`[Sync Course Error for ${course.id}]`, courseError);
        continue;
      }

      // Re-insert course modules
      if (modules && modules.length > 0) {
        await db.from("course_modules").delete().eq("course_id", course.id);

        const moduleInserts = modules.map((m: any, idx: number) => ({
          course_id: course.id,
          week_label: m.week_label || `0${idx + 1}`,
          title: m.title,
          description: m.description,
          video_url: m.video_url || "",
          summary: m.summary || m.description || "",
          content_text: m.content_text || "",
          prompts: m.prompts || [],
          downloads: m.downloads || [],
          quiz_data: m.quiz_data || { enabled: false, passing_score: 80, questions: [] },
          order_index: idx + 1,
        }));

        await db.from("course_modules").insert(moduleInserts);
      }

      results.push(upsertedCourse);
    }

    return NextResponse.json({
      success: true,
      message: `Se han sincronizado ${results.length} cursos y sus módulos exitosamente con Supabase.`,
      courses: results,
    });
  } catch (err: any) {
    console.error("[POST /api/courses/sync Error]", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
