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
        title: "Módulo 03: Bases de Datos Relacionales & Row-Level Security (PostgreSQL / Supabase)",
        description: "Persistencia de leads, pedidos y catálogos en PostgreSQL y Supabase con políticas RLS.",
        summary: "Modelado relacional para operaciones, consultas SQL optimizadas en nodos n8n, aislamiento de datos multi-tenant.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Laboratorio 03: Políticas RLS en Supabase y Consultas n8n\n\n1. Crear tablas normalizadas con claves foráneas.\n2. Parametrizar nodos Postgres en n8n con sentencias Upsert.\n3. Habilitar RLS y políticas por tenant.",
        prompts: ["Escribe un script SQL completo para PostgreSQL / Supabase que cree las tablas normalizadas con RLS..."],
        downloads: [
          { name: "Esquema_SQL_Relacional_Pipeline.sql", type: "SQL Script", url: "#" },
          { name: "Politicas_RLS_MultiTenant_Template.sql", type: "SQL Script", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Para qué se utiliza la sentencia SQL 'ON CONFLICT DO UPDATE' (Upsert) al procesar leads de WhatsApp?",
              options: [
                "Para insertar el contacto si es nuevo o actualizar su última hora de conexión si ya existía en la base de datos sin generar un error de duplicado.",
                "Para borrar la base de datos cada 24 horas.",
                "Para apagar el servidor si el cliente no responde.",
              ],
              correctIndex: 0,
              explanation: "El Upsert evita duplicados y errores de clave única garantizando la integridad referencial de los contactos.",
            },
            {
              question: "¿Qué función cumple Row-Level Security (RLS) en PostgreSQL/Supabase?",
              options: [
                "Aislar los registros a nivel de fila para que un cliente o inquilino solo pueda acceder a sus propios datos.",
                "Hacer que las tablas tengan filas de diferentes colores.",
                "Aumentar el tamaño del disco duro del servidor.",
              ],
              correctIndex: 0,
              explanation: "RLS restringe qué filas puede consultar o modificar un usuario específico según reglas de autorización inquebrantables en el motor de base de datos.",
            },
          ],
        },
      },
      {
        week_label: "04",
        title: "Módulo 04: Orquestación de Agentes Autónomos LLM en n8n",
        description: "Integración de modelos Gemini y Claude como cerebros decisorios conectados a bases de datos.",
        summary: "Configuración de nodos AI Agent en n8n, estructuración de herramientas (Tools & Functions), mitigación de alucinaciones y guardrails.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Laboratorio 04: Agente con Tool Calling en n8n\n\n1. Configurar AI Agent con Claude 3.5 Sonnet y memoria PostgreSQL.\n2. Conectar Custom Tools para consultas SQL y pasarelas.\n3. Implementar RAG documental con pgvector.",
        prompts: ["Configura el System Prompt para un AI Agent en n8n conectado a herramientas de gestión operativa..."],
        downloads: [
          { name: "Flujo_AI_Agent_Con_Memoria_Postgres.json", type: "n8n Workflow", url: "#" },
          { name: "Custom_Tool_Consulta_Postgres.json", type: "n8n Tool", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Cómo decide un AI Agent en n8n cuándo debe ejecutar una herramienta (Tool Calling)?",
              options: [
                "El modelo analiza la intención del usuario y la descripción semántica de cada herramienta disponible para elegir cuál invocar con los parámetros adecuados.",
                "Ejecuta todas las herramientas a la vez al azar.",
                "El programador debe escribir un IF manual para cada palabra del diccionario.",
              ],
              correctIndex: 0,
              explanation: "El LLM lee las descripciones y esquemas de parámetros de las herramientas disponibles y decide autónomamente si necesita invocar una para responder al usuario.",
            },
            {
              question: "¿Qué ventaja ofrece la arquitectura RAG frente a meter todo el texto en el prompt de sistema?",
              options: [
                "Reduce el consumo de tokens, elimina límites de contexto y permite consultar miles de páginas de manuales con respuestas precisas basadas en fuentes reales.",
                "Hace que la IA invente datos más creativos.",
                "Aumenta la factura de la API sin beneficios.",
              ],
              correctIndex: 0,
              explanation: "RAG recupera solo los fragmentos relevantes para cada pregunta, reduciendo costos de tokens y garantizando respuestas fundamentadas en documentos reales.",
            },
          ],
        },
      },
      {
        week_label: "05",
        title: "Módulo 05: Telemetría, Sub-Flujos de Error & Alertas 24/7 en Telegram",
        description: "Construcción de bots supervisores en Telegram para detección de fallos y cuellos de botella.",
        summary: "Manejo de errores por sub-flujos, telemetría de tiempo de ejecución y memoria, protocolos de contingencia en vivo.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Laboratorio 05: Bot de Alertas Críticas y Queue Mode\n\n1. Vincular Error Trigger en cada flujo de producción.\n2. Formatear alertas enriquecidas con enlaces de depuración en Telegram.\n3. Configurar Redis y workers para Queue Mode.",
        prompts: ["Escribe un flujo de error en n8n que reciba el payload de 'Error Trigger' y formatee un mensaje estructurado..."],
        downloads: [
          { name: "Workflow_Error_Handler_Maestro.json", type: "n8n Workflow", url: "#" },
          { name: "Telegram_Alert_Bot_Template.json", type: "n8n Workflow", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Qué ventaja ofrece vincular un 'Error Workflow' en la configuración de flujos en n8n?",
              options: [
                "Captura cualquier falla o caída de nodos en producción y dispara alertas automáticas en Telegram con el enlace directo para depuración inmediata.",
                "Hace que los errores desaparezcan por arte de magia.",
                "Borra el servidor para que nadie se entere del fallo.",
              ],
              correctIndex: 0,
              explanation: "El Error Workflow garantiza observabilidad total, notificando al equipo técnico al instante con el contexto exacto de la falla.",
            },
            {
              question: "¿Cuándo es necesario configurar n8n en 'Queue Mode' con Redis?",
              options: [
                "Cuando el volumen de ejecuciones concurrentes crece y se necesita distribuir la carga entre múltiples workers paralelos para no saturar la RAM.",
                "Cuando solo se tiene 1 flujo simple al día.",
                "Para poder instalar juegos en el servidor.",
              ],
              correctIndex: 0,
              explanation: "Queue Mode permite desacoplar la recepción de webhooks de la ejecución pesada, escalando horizontalmente con workers dedicados.",
            },
          ],
        },
      },
      {
        week_label: "06",
        title: "Módulo 06: Proyecto Final, Auditoría de Infraestructura y Certificación",
        description: "Defensa técnica de un pipeline completo en producción y emisión del diploma con ID único.",
        summary: "Revisión de arquitectura uno a uno, pruebas de estrés y carga, entrega de credencial verificable.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Proyecto Final de Graduación y Emisión de Credencial\n\n1. Hardening final y backups automáticos a S3/R2.\n2. Verificación E2E de WhatsApp -> IA -> Postgres -> Telegram.\n3. Emisión automática de diploma verificable.",
        prompts: ["Genera una lista de verificación pre-despliegue para sistemas agénticos en producción..."],
        downloads: [
          { name: "Script_Backup_Postgres_S3.sh", type: "Bash Script", url: "#" },
          { name: "Pipeline_Empresarial_E2E_Completo.json", type: "n8n Workflow", url: "#" },
          { name: "Guia_Proyecto_Final_Bootcamp_n8n.pdf", type: "PDF", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Cuál es el principal valor de contar con una infraestructura de automatización propia (self-hosted) frente a herramientas SaaS?",
              options: [
                "Control total de los datos, costos fijos predecibles sin importar el volumen de operaciones y libertad total para conectar modelos de IA y bases de datos.",
                "Tener que pagar más facturas cada mes.",
                "No poder conectar aplicaciones web.",
              ],
              correctIndex: 0,
              explanation: "El autoalojamiento (self-hosting) otorga soberanía tecnológica absoluta, privacidad para datos sensibles y escalabilidad económica ilimitada.",
            },
            {
              question: "¿Por qué es crucial implementar copias de seguridad automáticas en un bucket externo (S3/R2)?",
              options: [
                "Para garantizar la recuperación completa de flujos, credenciales y bases de datos ante cualquier desastre o fallo de hardware en el VPS.",
                "Para ocupar espacio en internet.",
                "Para borrar los archivos del cliente.",
              ],
              correctIndex: 0,
              explanation: "Los backups externos garantizan continuidad del negocio y resiliencia total frente a caídas o incidencias en el proveedor de servidores.",
            },
          ],
        },
      },
    ],
  },
  {
    id: "ia-restaurantes",
    slug: "ia-restaurantes",
    badge: "OPERATIVO & ESTRATÉGICO",
    level: "Operativo & Estratégico",
    title: "Masterclass: Automatización Agéntica con IA para Restaurantes",
    tagline: "Aprende a implementar agentes inteligentes que atienden por WhatsApp, capturan pedidos, controlan recetas y calculan escandallos sin alucinaciones.",
    description: "Aprende a implementar agentes inteligentes que atienden comensales por WhatsApp, toman reservas directas, controlan mermas de cocina, calculan escandallos y automatizan órdenes de compras a proveedores.",
    duration: "5 Módulos Intensivos • Acceso de por vida",
    price_usd: 97.0,
    price_display: "$97 USD",
    preview_image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    stripe_color: "from-[#EA0C7F] via-[#971B8D] to-[#6366f1]",
    cta_url: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
    status: "ACTIVO",
    students_enrolled: 0,
    order_index: 2,
    tools: {
      stack: ["WhatsApp Cloud API", "Gemini Pro", "Airtable", "Escandallos XLSX", "KDS Prompts", "Zero-Hallucination Guardrails", "HACCP Digital"],
      outcomes: [
        "Parametrizar prompts con rigor físico y matemático para que la IA nunca invente precios ni recetas.",
        "Configurar un asistente de WhatsApp 24/7 con catálogo dinámico de platos, horarios y alérgenos.",
        "Integrar matrices de costos crudo/cocido en tiempo real y optimizar la ingeniería de menú (BCG).",
        "Blindar el sistema con guardrails de precios y protocolo de derivación a humanos para casos críticos.",
        "Automatizar la estimación de demanda semanal y generación de órdenes de compra a proveedores.",
      ],
      includes: [
        "5 Módulos intensivos con metodología paso a paso",
        "15 Lecciones con blueprints, prompts y descargables",
        "Plantilla maestra de escandallos y matriz de Food Cost en Excel",
        "System Prompts oficiales y flujos de conversación de WhatsApp",
        "Quizes evaluativos con explicaciones formativas por módulo",
        "Certificado oficial con verificación digital y código QR único",
      ],
      requirements: [
        "Conexión a Internet y computadora o tableta.",
        "Tener un restaurante, bar, cafetería o negocio gastronómico (o clientes del sector a quienes asesorar).",
        "No se requieren conocimientos previos de programación.",
      ],
      audience: [
        "Dueños de restaurantes, cafeterías, bares y dark kitchens.",
        "Gerentes de operaciones, directores de A&B y chefs ejecutivos.",
        "Emprendedores gastronómicos y consultores que buscan optimizar la rentabilidad del sector.",
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
      hours_video: "12 horas de contenido práctico",
      articles_count: 15,
      resources_count: 18,
      last_updated: "8/2026",
      language: "Español",
    },
    modules: [
      {
        week_label: "01",
        title: "Módulo 01: Fundamentos de IA Gastronómica & Control de Food Cost",
        description: "Diagnóstico de fugas operativas, matriz BCG de menú y escandallos con factor de rendimiento crudo/cocido.",
        summary: "Descubre cómo erradicar los cuellos de botella del restaurante: mensajes sin responder, descontrol de mermas y comisiones de delivery.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Guía 01: Auditoría de Food Cost y Fugas de Margen\n\n1. Mapear compras semanales vs comandas emitidas en el POS.\n2. Aplicar factor de merma por ingrediente limpio.\n3. Aislar platos con margen bruto menor al 68% y aplicar neuromarketing sensorial.",
        prompts: [
          "Actúa como un Consultor Senior de Operaciones Gastronómicas. Realiza una auditoría rápida de rentabilidad para mi restaurante...",
        ],
        downloads: [
          { name: "Guia_Fundamentos_IA_Gastronomica_2026.pdf", type: "PDF", url: "#" },
          { name: "Calculadora_Ahorro_FoodCost_Objetivo.xlsx", type: "Excel", url: "#" },
          { name: "Plantilla_Escandallos_Parametrizada_2026.xlsx", type: "Excel", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Qué es el 'Factor de Rendimiento' en un escandallo gastronómico?",
              options: [
                "La relación matemática entre el peso neto aprovechable de un insumo y su peso bruto de compra tras aplicar las mermas.",
                "La velocidad a la que el mozo entrega el plato en la mesa.",
                "El número de seguidores que tiene el restaurante en Instagram.",
              ],
              correctIndex: 0,
              explanation: "El factor de rendimiento mide qué porcentaje real del insumo pagado llega al plato final, permitiendo calcular el costo exacto por porción.",
            },
            {
              question: "En la Matriz BCG de Menú, ¿qué acción estratégica se recomienda para un plato 'Rompecabezas' (alta rentabilidad pero baja venta)?",
              options: [
                "Mejorar su visibilidad en carta y reescribir su descripción con neuromarketing sensorial para estimular su pedido.",
                "Eliminarlo de la carta inmediatamente sin consultar a nadie.",
                "Duplicarle el precio para que nadie lo compre.",
              ],
              correctIndex: 0,
              explanation: "Dado que el plato tiene un excelente margen de ganancia, el objetivo es hacerlo más atractivo y visible para que más comensales lo elijan.",
            },
          ],
        },
      },
      {
        week_label: "02",
        title: "Módulo 02: Agente de Ventas & Reservas 24/7 en WhatsApp",
        description: "Configuración del System Prompt maestro, gestión de alérgenos y estrategias de upselling gastronómico.",
        summary: "Construye un anfitrión virtual con voz de marca cálida que atiende consultas, valida intolerancias y eleva el ticket promedio.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Guía 02: Flujo Conversacional y Manejo de Alérgenos\n\n1. Definir voz de marca y catálogo de platos insignia.\n2. Configurar la matriz de 14 alérgenos reglamentarios.\n3. Implementar reglas de maridaje y venta sugerida contextual.",
        prompts: [
          "Actúa como un Diseñador de Agentes de IA para Hostelería. Construye el System Prompt completo para el asistente de WhatsApp...",
        ],
        downloads: [
          { name: "System_Prompt_Maestro_Restaurante.txt", type: "TXT", url: "#" },
          { name: "Matriz_Oficial_14_Alergenos_Reglamentarios.pdf", type: "PDF", url: "#" },
          { name: "Guia_Upselling_Gastronomico_IA.pdf", type: "PDF", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Cómo debe actuar el agente de IA si un cliente consulta por un plato apto para celíacos severos y no hay certeza de contaminación cruzada en cocina?",
              options: [
                "Advertir transparentemente sobre el riesgo de trazas y derivar la consulta al encargado de cocina para garantizar la seguridad del cliente.",
                "Decirle que sí a todo para no perder la venta.",
                "Inventar que todos los platos son 100% libres de gluten.",
              ],
              correctIndex: 0,
              explanation: "La seguridad alimentaria es inviolable; ante riesgo de contaminación cruzada se debe informar con total transparencia.",
            },
            {
              question: "¿Cuál es la clave para un Upselling efectivo por WhatsApp?",
              options: [
                "Hacer sugerencias contextuales y personalizadas que complementen el plato elegido por el comensal sin resultar invasivo.",
                "Enviar la lista de los 50 platos de la carta en un solo mensaje gigante.",
                "Obligar al cliente a comprar un postre.",
              ],
              correctIndex: 0,
              explanation: "El upselling efectivo aporta valor real al comensal recomendando combinaciones armoniosas y relevantes.",
            },
          ],
        },
      },
      {
        week_label: "03",
        title: "Módulo 03: Blindaje del Sistema: Guardrails, Anti-Alucinaciones y Seguridad",
        description: "Reglas inquebrantables de precios, detección de fricciones y derivación a gerencia humana (Human-in-the-Loop).",
        summary: "Parametriza límites estrictos para que la IA nunca invente platos ni descuentos falsos y transfiera quejas al instante.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Guía 03: Guardrails y Seguridad Conversacional\n\n1. Regla de inmutabilidad de precios oficiales.\n2. Filtros de jailbreak defense contra inyección de prompts.\n3. Disparadores de alerta para eventos corporativos y quejas.",
        prompts: [
          "Actúa como un Ingeniero de Seguridad de IA. Redacta el bloque de 'GUARDRAILS & REGLAS INQUEBRANTABLES'...",
        ],
        downloads: [
          { name: "Guardrails_Seguridad_Agentes_Hosteleria.json", type: "JSON", url: "#" },
          { name: "Protocolo_Zero_Alucinaciones_Gastronomia.pdf", type: "PDF", url: "#" },
          { name: "Scripts_Atencion_Gerencial_WhatsApp.docx", type: "Word", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Cuál es la función primordial de los Guardrails de seguridad en un agente de restaurante?",
              options: [
                "Impedir que el modelo alucine, conceda descuentos no autorizados o acepte reservas fuera de las políticas del local.",
                "Hacer que el agente hable en verso rimado.",
                "Desconectar el internet del restaurante por la noche.",
              ],
              correctIndex: 0,
              explanation: "Los guardrails establecen límites inviolables para que la IA opere con total rigor financiero y operativo.",
            },
            {
              question: "¿Qué debe ocurrir cuando un cliente expresa una queja o frustración en el chat de WhatsApp?",
              options: [
                "El sistema debe pausar al agente y transferir la conversación de inmediato a un supervisor humano con una notificación de alerta.",
                "El agente debe discutir con el cliente y bloquear su número.",
                "Ignorar el mensaje y esperar a que el cliente se calme solo.",
              ],
              correctIndex: 0,
              explanation: "Las quejas requieren empatía y resolución humana inmediata para proteger la reputación y fidelidad del comensal.",
            },
          ],
        },
      },
      {
        week_label: "04",
        title: "Módulo 04: Automatización de Compras, Proveedores y Operaciones de Cocina",
        description: "Pronóstico de demanda según clima y días, órdenes automáticas a proveedores y estandarización de SOPs/HACCP.",
        summary: "Automatiza la reposición de materia prima perecedera y estandariza los procesos de cocina para asegurar calidad idéntica.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Guía 04: Compras Predictivas y Estandarización de Cocina\n\n1. Proyectar demanda según históricos y factores climáticos.\n2. Calcular faltantes contra stock de seguridad y generar órdenes de compra.\n3. Implementar checklists digitales de apertura, cierre y control HACCP.",
        prompts: [
          "Eres el Asistente de Compras de mi restaurante. Compara mi inventario actual contra el Stock Mínimo de Seguridad...",
        ],
        downloads: [
          { name: "Modelo_Estimacion_Demanda_Restaurantes.xlsx", type: "Excel", url: "#" },
          { name: "Formato_Ordenes_Compra_Automatizadas.docx", type: "Word", url: "#" },
          { name: "Checklist_HACCP_Inocuidad_Digital.pdf", type: "PDF", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Cuál es el principal beneficio de cruzar pronósticos de clima y eventos locales con la planificación de compras en cocina?",
              options: [
                "Ajustar con precisión las cantidades de insumos perecederos para evitar tanto mermas por sobrecompra como roturas de stock en salón.",
                "Saber si los cocineros necesitan llevar paraguas.",
                "Pagarle menos dinero a los proveedores.",
              ],
              correctIndex: 0,
              explanation: "El pronóstico de demanda permite optimizar el capital de trabajo comprando solo la materia prima que realmente se va a transformar y vender.",
            },
            {
              question: "¿Por qué son indispensables los SOPs (Procedimientos Operativos Estándar) en la cocina de un restaurante?",
              options: [
                "Porque garantizan que la calidad, porción y sabor del plato sean exactamente iguales sin importar quién esté de turno en la brigada.",
                "Para llenar carpetas de papel que nadie lee.",
                "Para prohibir el uso de cuchillos en cocina.",
              ],
              correctIndex: 0,
              explanation: "Los SOPs aseguran consistencia operativa, facilitan el entrenamiento de nuevo personal y reducen errores y desperdicios.",
            },
          ],
        },
      },
      {
        week_label: "05",
        title: "Módulo 05: Puesta en Marcha en el Negocio Real, KPIs y Proyecto de Certificación",
        description: "Plan de despliegue en 3 fases, cuadro de mando financiero (EBITDA, Food Cost %) y proyecto de certificación oficial.",
        summary: "Lanza el sistema en tu restaurante sin fricciones con el personal, mide el retorno de inversión y obtén tu Diploma Oficial.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Guía 05: Despliegue, Métricas de Negocio y Certificación\n\n1. Fase 1 Sandbox interno con el equipo de sala.\n2. Fase 2 Horario valle y calibración.\n3. Fase 3 Operación plena y cuadro de mando financiero.\n4. Entrega de proyecto final y emisión del certificado oficial.",
        prompts: [
          "Actúa como el Asesor Financiero del restaurante. Genera un reporte ejecutivo de Retorno de Inversión (ROI) mensual...",
        ],
        downloads: [
          { name: "Roadmap_Despliegue_30_Dias_Restaurantes.pdf", type: "PDF", url: "#" },
          { name: "Dashboard_Financiero_EBITDA_Restaurantes.xlsx", type: "Excel", url: "#" },
          { name: "Guia_Proyecto_Final_Certificacion_Restaurantes.pdf", type: "PDF", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Por qué es crucial implementar una fase de prueba interna ('Sandbox') con el personal antes de lanzar el agente al público general?",
              options: [
                "Para que el equipo ponga a prueba al asistente con casos reales, detecte posibles dudas y se familiarice con el sistema sin riesgo con clientes reales.",
                "Para que los empleados pierdan el tiempo jugando.",
                "Para cambiar la contraseña del WiFi del local.",
              ],
              correctIndex: 0,
              explanation: "El sandbox interno permite calibrar el comportamiento del agente y lograr que el equipo de sala se sienta seguro y aliado de la tecnología.",
            },
            {
              question: "¿Cómo impacta la automatización inteligente en la valoración y rentabilidad (EBITDA) de un restaurante?",
              options: [
                "Incrementa el margen neto al reducir desperdicios de materia prima, captura ventas directas sin comisiones y eleva el ticket medio de consumo.",
                "Reduce los clientes porque nadie quiere comer en restaurantes modernos.",
                "Hace que la comida se enfríe más rápido.",
              ],
              correctIndex: 0,
              explanation: "El control milimétrico de costos y la captura directa de pedidos maximizan el flujo de caja y la salud financiera del negocio.",
            },
          ],
        },
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
