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
    description: "Aprende el sistema paso a paso para liderar las búsquedas en Google Maps y convertirte en la opción recomendada por motores de Inteligencia Artificial (ChatGPT, Gemini y Perplexity) captando clientes locales a coste de adquisición cero.",
    duration: "6 Módulos Prácticos • Acceso de por vida",
    price_usd: 67.0,
    price_display: "$67 USD",
    preview_image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    stripe_color: "from-[#FEAD2B] via-[#ea580c] to-[#e11d48]",
    cta_url: "https://buy.stripe.com/test_crecimiento_aeo",
    status: "ACTIVO",
    students_enrolled: 0,
    order_index: 3,
    tools: {
      stack: ["Google Business Profile", "Microdatos JSON-LD", "ChatGPT Search", "Schema.org", "Perplexity API", "Apple Business", "NFC & QR"],
      outcomes: [
        "Posicionar tu negocio en el codiciado Top 3 de Google Maps en tu ciudad o zona.",
        "Implementar microdatos JSON-LD (Schema.org) sin programar para que las IAs entiendan tus horarios, precios y servicios.",
        "Lograr que ChatGPT, Perplexity y Gemini citen y recomienden tu marca a clientes potenciales.",
        "Automatizar un bucle de reseñas 5 estrellas con tarjetas NFC, códigos QR y filtros inteligentes por WhatsApp.",
        "Medir rankings con mapas de calor Geo-Grid y expandir tu radio de clientes a coste de publicidad CERO."
      ],
      includes: [
        "6 Módulos prácticos intensivos paso a paso",
        "18 Lecciones con blueprints y esquemas listos para usar",
        "Plantillas oficiales de Schema JSON-LD y prompts de auditoría",
        "Quizes interactivos de autoevaluación por módulo",
        "Certificado oficial de finalización con código QR de verificación"
      ],
      requirements: [
        "Un negocio propio, local comercial o servicio profesional (o clientes a quienes brindar el servicio).",
        "Acceso a una computadora con conexión a Internet (no se requiere experiencia técnica previa)."
      ],
      audience: [
        "Dueños de negocios, comercios, clínicas, restaurantes y servicios locales.",
        "Emprendedores y profesionales independientes que buscan más clientes sin gastar en anuncios.",
        "Consultores de marketing y agencias que desean ofrecer servicios de SEO Local y AEO de vanguardia."
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
      hours_video: "6 Módulos • 18 Lecciones Prácticas",
      articles_count: 18,
      resources_count: 24,
      last_updated: "8/2026",
      language: "Español",
    },
    modules: [
      {
        week_label: "01",
        title: "Módulo 01: Fundamentos de la Visibilidad en la Era de la IA (SEO + AEO + GEO)",
        description: "Cómo buscan tus clientes hoy, el Grafo de Conocimiento y diagnóstico de visibilidad de tu marca frente a competidores.",
        summary: "Diferencias técnicas entre Google tradicional, AI Overviews, Perplexity y ChatGPT Search. Mapeo de entidades semánticas y auditoría rápida.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 01: Auditoría y Entidades Semánticas\n\n1. Comprender la búsqueda generativa (RAG) vs palabras clave tradicionales.\n2. Mapear tu negocio como una Entidad única en el Google Knowledge Graph.\n3. Ejecutar la auditoría de Share of Voice en Perplexity y ChatGPT Search.",
        prompts: [
          "Actúa como un Auditor Senior de SEO Local y Motores de IA. Realiza un diagnóstico de presencia digital para mi negocio...",
          "Eres un Arquitecto de Datos Semánticos para Google Knowledge Graph. Genera un documento de definición de Entidad..."
        ],
        downloads: [
          { name: "Guia_Comparativa_Motores_Busqueda_IA_2026.pdf", type: "PDF Técnico", url: "#" },
          { name: "Checklist_Diagnostico_Inicial_Presencia.xlsx", type: "Excel", url: "#" },
          { name: "Plantilla_Mapeo_Entidades_Semanticas.docx", type: "Word", url: "#" }
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Cuál es la diferencia fundamental entre el SEO clásico y la optimización para motores de IA (AEO / GEO)?",
              options: [
                "El SEO tradicional busca posicionar enlaces por palabras clave; el AEO/GEO busca que la IA entienda tu negocio como una entidad confiable y te cite como la mejor respuesta directa.",
                "El AEO solo funciona si pagas anuncios en Google Ads.",
                "No hay ninguna diferencia, ambos usan únicamente metaetiquetas HTML."
              ],
              correctIndex: 0,
              explanation: "Los modelos de IA procesan lenguaje natural y buscan entidades estructuradas y verificadas para sintetizar recomendaciones personalizadas."
            }
          ]
        }
      },
      {
        week_label: "02",
        title: "Módulo 02: Optimización Maestra de Google Business Profile & Citaciones 360",
        description: "Configuración estratégica de tu ficha de Google Maps, geotagging de fotos, Google Posts y sincronización con Apple Maps y Bing.",
        summary: "Selección de categoría principal, atributos de alta conversión, metadatos EXIF en fotografías y consistencia NAP en directorios.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 02: Google Business Profile y Consistencia NAP\n\n1. Configurar la categoría principal y secundarias con máximo peso algorítmico.\n2. Geotagging de fotografías con coordenadas GPS reales.\n3. Reclamar y sincronizar Apple Business Connect y Bing Places.",
        prompts: [
          "Actúa como un Copywriter Especialista en Fichas de Google Business. Redacta una descripción de 750 caracteres para mi negocio...",
          "Crea un calendario de 4 publicaciones para Google Business Profile para el próximo mes..."
        ],
        downloads: [
          { name: "Guia_Categorias_Estrategicas_Google_Business.pdf", type: "PDF", url: "#" },
          { name: "Calendario_Publicaciones_Google_Maps.xlsx", type: "Excel", url: "#" },
          { name: "Directorio_Top_50_Citaciones_Locales.xlsx", type: "Excel", url: "#" }
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Cuál es el factor individual con mayor peso para posicionar en el Top 3 del mapa de Google?",
              options: [
                "Elegir con precisión la Categoría Principal correcta en Google Business Profile.",
                "Poner el número de teléfono en mayúsculas.",
                "Crear 10 perfiles duplicados en la misma dirección."
              ],
              correctIndex: 0,
              explanation: "La Categoría Primaria le indica al algoritmo la naturaleza exacta de tu servicio y define las búsquedas en las que tu ficha tiene prioridad de aparición."
            }
          ]
        }
      },
      {
        week_label: "03",
        title: "Módulo 03: Arquitectura Técnica On-Page, Microdatos JSON-LD & RAG Readiness",
        description: "Implementación de Schema.org LocalBusiness, páginas de aterrizaje hiperlocales por barrio y tablas de precios legibles para IA.",
        summary: "El DNI digital de tu web en JSON-LD, landing pages de alta conversión por zona geográfica y marcado de Schema FAQPage.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 03: Microdatos JSON-LD y Páginas Hiperlocales\n\n1. Generar código Schema.org validado para LocalBusiness.\n2. Estructurar landing pages por barrio o ciudad sin contenido duplicado.\n3. Implementar acordeones de preguntas frecuentes con Schema FAQPage.",
        prompts: [
          "Actúa como un Ingeniero de Datos Estructurados Schema.org. Genera un script JSON-LD completo y validado para LocalBusiness...",
          "Redacta el contenido de una Landing Page Hiperlocal para mi negocio enfocada en el barrio [Nombre]..."
        ],
        downloads: [
          { name: "Schema_LocalBusiness_Maestro_Template.json", type: "JSON Schema", url: "#" },
          { name: "Estructura_Landing_Local_Alta_Conversion.docx", type: "Word", url: "#" },
          { name: "Plantilla_Schema_FAQPage_Listo.json", type: "JSON Schema", url: "#" }
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Qué ventaja tiene implementar el microdato Schema 'LocalBusiness' en formato JSON-LD en tu web?",
              options: [
                "Le permite a Google, Perplexity y ChatGPT leer con 100% de certeza tu ubicación, horarios, teléfono y servicios sin ambigüedades.",
                "Hace que tu página web sea gratis para siempre.",
                "Descarga automáticamente fotos a los dispositivos de los usuarios."
              ],
              correctIndex: 0,
              explanation: "El código JSON-LD es el estándar internacional que los motores de búsqueda y LLMs utilizan para validar datos estructurados oficiales."
            }
          ]
        }
      },
      {
        week_label: "04",
        title: "Módulo 04: Optimización para Motores Generativos (GEO) & Citación en ChatGPT, Gemini y Perplexity",
        description: "Mecánicas de citación de los LLMs, menciones de autoridad en Reddit y medios locales, y corrección de alucinaciones sobre tu negocio.",
        summary: "Cómo los asistentes de IA rastrean la web en tiempo real, construcción de autoridad E-E-A-T y auditoría de veracidad en modelos LLM.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 04: GEO y Autoridad en Motores de Respuesta\n\n1. Analizar las fuentes que cita Perplexity en tu sector.\n2. Estrategia de menciones orgánicas en Reddit y medios comunitarios.\n3. Protocolo para corregir datos erróneos que la IA diga sobre tu negocio.",
        prompts: [
          "Simula una búsqueda en profundidad como si fueras Perplexity Pro o ChatGPT Search para la consulta...",
          "Actúa como un Especialista en Relaciones Públicas Digitales Locales. Redacta 2 plantillas de mensaje para medios locales..."
        ],
        downloads: [
          { name: "Mapa_Fuentes_Ingesta_Motores_IA_2026.pdf", type: "PDF", url: "#" },
          { name: "Plantillas_Outreach_Medios_Locales.docx", type: "Word", url: "#" },
          { name: "Protocolo_Correccion_Datos_IA.pdf", type: "PDF", url: "#" }
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿De dónde extraen los motores como ChatGPT Search y Perplexity la información para recomendar un negocio local?",
              options: [
                "De la combinación en tiempo real de Google Maps, directorios de autoridad, webs oficiales y foros comunitarios como Reddit.",
                "De una base de datos secreta que solo tienen los gobiernos.",
                "De mensajes privados de WhatsApp."
              ],
              correctIndex: 0,
              explanation: "Los motores de respuesta rastrean la web abierta en tiempo real, cotejando múltiples fuentes públicas para verificar la reputación de cada opción."
            }
          ]
        }
      },
      {
        week_label: "05",
        title: "Módulo 05: Automatización de Reseñas 5 Estrellas & Embudos Directos a WhatsApp",
        description: "Tarjetas NFC táctiles, códigos QR de reseña instantánea, filtros de quejas por WhatsApp y respuestas a reseñas asistidas por IA.",
        summary: "El bucle de reseñas de fricción cero, derivación inteligente de clientes insatisfechos y generación de respuestas profesionales con palabras clave.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 05: Reputación y Conversión a WhatsApp\n\n1. Diseñar placas NFC y códigos QR directos a 5 estrellas.\n2. Implementar el embudo de derivación privada para clientes insatisfechos.\n3. Responder al 100% de las reseñas potenciando el posicionamiento.",
        prompts: [
          "Actúa como un Diseñador de Experiencia de Cliente y Redactor Estratégico. Crea 3 guiones de 2 frases para pedir reseñas...",
          "Actúa como el Gerente de Reputación Online de mi negocio. Redacta 3 respuestas personalizadas y empáticas para reseñas..."
        ],
        downloads: [
          { name: "Plantilla_Diseno_Tarjetas_NFC_Google_Maps.pdf", type: "PDF", url: "#" },
          { name: "Flujo_Filtro_Satisfaccion_Cliente.png", type: "Imagen", url: "#" },
          { name: "Banco_50_Respuestas_Resenas_IA.docx", type: "Word", url: "#" }
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Por qué es crucial responder al 100% de las reseñas (positivas y negativas) en Google Maps?",
              options: [
                "Porque Google premia a los perfiles activos y las respuestas permiten reforzar palabras clave y generar confianza en futuros clientes.",
                "Porque si no respondes, Google borra tu cuenta bancaria.",
                "Porque las respuestas solo las pueden leer los robots."
              ],
              correctIndex: 0,
              explanation: "La tasa y calidad de respuesta a reseñas es una señal directa de calidad y atención al cliente que evalúan tanto los clientes como los algoritmos."
            }
          ]
        }
      },
      {
        week_label: "06",
        title: "Módulo 06: Telemetría, Geo-Grid Rank Tracking y Proyecto de Certificación",
        description: "Mapas de calor de posicionamiento por radio de kilómetros, dashboard simple de KPIs y entrega del proyecto de graduación.",
        summary: "Visualización de ranking con cuadrículas Geo-Grid, cálculo del ROI de llamadas y clics orgánicos, y emisión del certificado oficial.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 06: Geo-Grid Tracking y Certificación Oficial\n\n1. Mapear tu visibilidad en cuadrículas de kilómetros con Local Falcon.\n2. Medir las 5 métricas de impacto en ventas (llamadas, rutas, WhatsApp).\n3. Defender el proyecto de implementación y obtener el Diploma Oficial.",
        prompts: [
          "Analiza los siguientes resultados de mi mapa de calor Geo-Grid y diseña un plan de 30 días para expandir mi radio...",
          "Eres el Tutor Académico de Inteligencia Neuronal. Revisa los siguientes entregables de mi proyecto de certificación..."
        ],
        downloads: [
          { name: "Guia_Interpretacion_GeoGrid_Rankings.pdf", type: "PDF", url: "#" },
          { name: "Dashboard_Excel_KPIs_Visibilidad_Local.xlsx", type: "Excel", url: "#" },
          { name: "Guia_Proyecto_Graduacion_Certificacion.pdf", type: "PDF", url: "#" }
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Qué indica un mapa de calor Geo-Grid con pines verdes alrededor de tu local comercial?",
              options: [
                "Que tu negocio aparece en el Top 3 de Google Maps en esa zona y se lleva la mayoría de los clics y visitas de clientes cercanos.",
                "Que la conexión a internet está fallando.",
                "Que debes cerrar tu local los fines de semana."
              ],
              correctIndex: 0,
              explanation: "Los pines verdes indican liderazgo local absoluto en el Top 3 (Local Pack), captando la inmensa mayoría de las intenciones de compra."
            }
          ]
        }
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
