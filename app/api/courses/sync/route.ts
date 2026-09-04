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
    id: "antigravity",
    slug: "antigravity",
    badge: "LO MÁS VENDIDO // VANGUARDIA",
    level: "Desarrollo Agéntico & Fullstack",
    title: "Curso Completo de Google Antigravity: Crea Software y Agentes con IA",
    tagline: "Domina el entorno de desarrollo agéntico de Google DeepMind: IDE visual, subagentes concurrentes, Skills, Hooks, Generative UI y despliegue fullstack continuo.",
    description: "Aprende a construir aplicaciones web completas, SaaS y agentes autónomos sin fricción técnica utilizando Google Antigravity, subagentes en paralelo, Skills modulares y CI/CD en Vercel.",
    duration: "6 Módulos Intensivos • Acceso de por vida",
    price_usd: 97.0,
    price_display: "$97 USD",
    preview_image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    stripe_color: "from-[#EA0C7F] via-[#971B8D] to-[#1DACE3]",
    cta_url: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
    status: "ACTIVO",
    students_enrolled: 0,
    order_index: 4,
    tools: {
      stack: ["Google Antigravity (AGY)", "Gemini 2.0 Flash / Pro", "Subagentes & Skills", "Generative UI", "Model Context Protocol (MCP)", "Next.js 14 & Supabase", "Git & Vercel"],
      outcomes: [
        "Planificar, programar y desplegar aplicaciones web completas con el IDE agéntico de Google DeepMind.",
        "Orquestar equipos de subagentes concurrentes para investigar, refactorizar y probar código en paralelo.",
        "Crear Skills personalizadas (SKILL.md) y Hooks de validación automática para blindar la calidad del software.",
        "Diseñar prototipos interactivos en tiempo real con Generative UI y diagramas técnicos en Mermaid.",
        "Construir y desplegar un SaaS Fullstack con autenticación, base de datos PostgreSQL y pagos en Vercel.",
      ],
      includes: [
        "6 Módulos Intensivos con 18 Lecciones Maestras",
        "Blueprints descargables, Skills y esquemas SQL listos para usar",
        "Banco de Prompts profesionales de arquitectura y refactorización",
        "Quizes interactivos por módulo con explicaciones formativas",
        "Certificado Oficial de Finalización con Código QR y validación digital",
      ],
      requirements: [
        "No se requiere experiencia previa en programación avanzada; el curso cubre desde conceptos básicos hasta arquitectura agéntica.",
        "Computadora con conexión a internet y navegador web moderno.",
      ],
      audience: [
        "Emprendedores, fundadores de startups y creadores de producto que quieren construir sus propias aplicaciones sin barreras técnicas.",
        "Desarrolladores, programadores e ingenieros que buscan acelerar su productividad x10 con ingeniería agéntica.",
        "Consultores y agencias que desean ofrecer soluciones de software asistidas por IA de última generación.",
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
      hours_video: "18 horas de clases prácticas y laboratorios",
      articles_count: 24,
      resources_count: 36,
      last_updated: "8/2026",
      language: "Español",
    },
    modules: [
      {
        week_label: "01",
        title: "Módulo 01: Fundamentos de Antigravity, Arquitectura Agéntica & Entorno de Trabajo",
        description: "Comprende la diferencia entre copilotos pasivos y desarrollo agéntico autónomo, configuración de workspace y reglas de proyecto persistentes.",
        summary: "Arquitectura del planificador agéntico, modos de ejecución (Planning Mode vs. Fast Mode) y configuración de .antigravity/rules.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 01: Fundamentos de Google Antigravity\n\n1. Arquitectura de planificación y ejecución agéntica autónoma.\n2. Configuración de workspace, permisos seguros y atajos de teclado.\n3. Implementación de reglas maestras en .antigravity/rules.",
        prompts: [
          "Actúa como un Arquitecto de Software Senior y Tutor de Antigravity. Analiza la siguiente idea de aplicación para mi negocio...",
          "Escribe un archivo de Reglas de Proyecto (.antigravity/rules/code-standards.md) profesional para mi aplicación...",
        ],
        downloads: [
          { name: "Guia_Fundamentos_Google_Antigravity.pdf", type: "PDF", url: "#" },
          { name: "CheatSheet_Atajos_SlashCommands_Antigravity.pdf", type: "PDF", url: "#" },
          { name: "Template_Project_Rules_Maestro.md", type: "Markdown", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Cuál es la diferencia principal entre un copiloto tradicional y el sistema agéntico de Google Antigravity?",
              options: [
                "Antigravity planifica de forma autónoma, edita múltiples archivos coordinadamente, ejecuta comandos y verifica los resultados en tiempo real.",
                "Los copilotos tradicionales solo funcionan en teléfonos móviles.",
                "Antigravity no utiliza modelos de inteligencia artificial.",
              ],
              correctIndex: 0,
              explanation: "Antigravity es un entorno agéntico completo capaz de investigar, planificar, ejecutar y auto-corregir código sin requerir constantes intervenciones manuales.",
            },
            {
              question: "¿Para qué sirve configurar archivos de Reglas de Proyecto (.antigravity/rules)?",
              options: [
                "Para definir estándares de arquitectura, estilo y seguridad que el agente respeta automáticamente en todas sus intervenciones.",
                "Para borrar el historial de Git cada semana.",
                "Para bloquear el acceso a internet de la computadora.",
              ],
              correctIndex: 0,
              explanation: "Las reglas fijan convenciones persistentes de código, garantizando coherencia arquitectónica en todo el proyecto.",
            },
          ],
        },
      },
      {
        week_label: "02",
        title: "Módulo 02: Orquestación de Subagentes & Delegación Concurrente",
        description: "Delegación de tareas pesadas en paralelo con subagentes aislados, definición de roles especializados y comunicación inter-agéntica.",
        summary: "Invocación de subagentes (invoke_subagent), definición con define_subagent y mensajería reactiva con send_message.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 02: Orquestación de Subagentes\n\n1. Patrón Director de Proyecto vs. Subagentes Especialistas.\n2. Creación de subagentes de investigación, seguridad y base de datos.\n3. Gestión de tareas asíncronas y reactividad sin bloqueo.",
        prompts: [
          "Configura una instrucción para que el agente invoque un subagente de investigación...",
          "Escribe la definición de un subagente especializado llamado 'SQL_Optimizer'...",
        ],
        downloads: [
          { name: "Diagrama_Arquitectura_Subagentes.png", type: "Imagen", url: "#" },
          { name: "Banco_Definiciones_Subagentes_Especializados.json", type: "JSON", url: "#" },
          { name: "Guia_Coordinacion_Equipos_Agenticos.pdf", type: "PDF", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Qué ventaja principal aporta el uso de Subagentes (invoke_subagent) en Antigravity?",
              options: [
                "Permite delegar tareas pesadas de investigación y pruebas en paralelo sin saturar la memoria de contexto del agente principal.",
                "Hace que la computadora consuma menos electricidad de la pared.",
                "Convierte archivos TypeScript en archivos de texto sin formato.",
              ],
              correctIndex: 0,
              explanation: "Los subagentes operan con contextos independientes, aislando la exploración y permitiendo paralelismo eficiente de tareas.",
            },
            {
              question: "¿Por qué es útil definir roles específicos para los subagentes (como un Auditor de Seguridad de solo lectura)?",
              options: [
                "Para garantizar que cada agente opere con los permisos y foco exactos requeridos, minimizando riesgos y maximizando la precisión.",
                "Para que el código tenga más colores en el editor.",
                "Porque los subagentes no saben hacer más de una cosa a la vez.",
              ],
              correctIndex: 0,
              explanation: "La especialización con permisos controlados previene modificaciones accidentales y mejora la calidad del código.",
            },
          ],
        },
      },
      {
        week_label: "03",
        title: "Módulo 03: Custom Skills, Hooks & Conectividad Externa (MCP)",
        description: "Creación de Skills modulares reutilizables, blindaje de calidad con Hooks pre/post ejecución e integración con servidores MCP.",
        summary: "Estructura SKILL.md, validadores automáticos post-edición y conexión universal con bases de datos y APIs mediante MCP.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 03: Custom Skills, Hooks y Protocolo MCP\n\n1. Creación y estructura de paquetes de conocimiento SKILL.md.\n2. Configuración de interceptores automáticos de linter y tests.\n3. Integración de servidores MCP de PostgreSQL, GitHub y APIs.",
        prompts: [
          "Escribe un archivo SKILL.md completo para una nueva habilidad llamada 'seo-geo-audit'...",
          "Configura el archivo mcp_config.json para Antigravity con servidores PostgreSQL y GitHub...",
        ],
        downloads: [
          { name: "Estructura_Base_Skill_Template.zip", type: "ZIP", url: "#" },
          { name: "Configuracion_Hooks_Produccion.json", type: "JSON", url: "#" },
          { name: "mcp_servers_config_template.json", type: "JSON", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Qué ventaja ofrece el sistema de Skills (SKILL.md) frente a incluir todas las instrucciones en el prompt inicial?",
              options: [
                "Permite empaquetar conocimientos especializados que solo se cargan en memoria cuando la tarea lo requiere, ahorrando tokens y manteniendo el contexto limpio.",
                "Hace que el editor de código sea más pesado.",
                "Impide que el agente use internet.",
              ],
              correctIndex: 0,
              explanation: "Las Skills proporcionan modularidad y eficiencia extrema, activando capacidades avanzadas solo cuando son pertinentes.",
            },
            {
              question: "¿Cuál es la función principal de los servidores MCP (Model Context Protocol)?",
              options: [
                "Estandarizar la conexión segura de la IA con bases de datos, APIs externas, sistemas de archivos y herramientas de terceros.",
                "Borrar contraseñas del navegador.",
                "Apagar los servidores por la noche.",
              ],
              correctIndex: 0,
              explanation: "MCP es el protocolo estándar de la industria para dotar a los agentes de acceso a datos y herramientas externas de forma segura y unificada.",
            },
          ],
        },
      },
      {
        week_label: "04",
        title: "Módulo 04: Generative UI, Artefactos Interactivos & Navegación Web en Vivo",
        description: "Renderizado de componentes HTML/React interactivos inline, diseño de planes y walkthroughs ejecutivos, y navegación web en tiempo real.",
        summary: "Prototipado a la velocidad del pensamiento con Generative UI, diagramas Mermaid y extracción RAG de documentación web actualizada.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 04: Generative UI y Artefactos\n\n1. Validación visual interactiva de componentes sin levantar servidor local.\n2. Redacción de implementation_plan.md y walkthroughs con diagramas Mermaid.\n3. Navegación en vivo para alimentar al agente con documentación sin alucinaciones.",
        prompts: [
          "Utiliza Generative UI para crear un widget interactivo de cálculo de ROI para mi SaaS...",
          "Genera un implementation_plan.md profesional para añadir autenticación OAuth con Google...",
        ],
        downloads: [
          { name: "Catalogo_Componentes_GenerativeUI.html", type: "HTML", url: "#" },
          { name: "Plantilla_Implementation_Plan_Ejecutivo.md", type: "Markdown", url: "#" },
          { name: "Guia_Investigacion_Web_Segura.pdf", type: "PDF", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Qué valor aporta la capacidad de 'Generative UI' durante la fase de desarrollo?",
              options: [
                "Permite visualizar e interactuar con componentes y prototipos en tiempo real dentro del chat antes de integrarlos al código final.",
                "Hace que la pantalla de la computadora brille más.",
                "Reemplaza la necesidad de tener un navegador web para siempre.",
              ],
              correctIndex: 0,
              explanation: "Generative UI acelera el ciclo de diseño y aprobación, permitiendo validar la experiencia de usuario de forma interactiva.",
            },
            {
              question: "¿Por qué es crucial crear un 'implementation_plan.md' antes de realizar refactorizaciones o proyectos grandes?",
              options: [
                "Para alinear requerimientos técnicos, documentar decisiones de arquitectura y evitar modificaciones destructivas no planificadas.",
                "Para gastar más espacio en el disco duro.",
                "Porque es obligatorio por ley en todos los países.",
              ],
              correctIndex: 0,
              explanation: "El plan de implementación clarifica la estrategia técnica y permite revisiones formales antes de la ejecución de cambios.",
            },
          ],
        },
      },
      {
        week_label: "05",
        title: "Módulo 05: Construcción de una Aplicación Web Fullstack de Extremo a Extremo",
        description: "Construcción paso a paso de un SaaS real con Next.js 14, Tailwind, Supabase PostgreSQL, pagos con Stripe/LemonSqueezy y despliegue en Vercel.",
        summary: "De la idea al MVP desplegado: base de datos relacional, pasarela de pagos con verificación de firma HMAC y pipeline de CI/CD.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 05: Aplicación Fullstack Desplegada\n\n1. Modelado de datos y maquetación de UI con Next.js y Tailwind.\n2. Integración de pagos con webhooks seguros y firma criptográfica.\n3. Pipeline de despliegue continuo con GitHub y Vercel en 90 segundos.",
        prompts: [
          "Construye el esquema inicial para una plataforma SaaS de gestión de membresías...",
          "Crea el Route Handler /api/webhooks/lemonsqueezy en Next.js App Router...",
        ],
        downloads: [
          { name: "Starter_Kit_Fullstack_SaaS_Next14.zip", type: "ZIP", url: "#" },
          { name: "Webhook_LemonSqueezy_Stripe_Handler.ts", type: "TypeScript", url: "#" },
          { name: "Checklist_Despliegue_Produccion_Vercel.pdf", type: "PDF", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Por qué es crucial validar la firma criptográfica (HMAC) en los Webhooks de pago (Stripe/LemonSqueezy)?",
              options: [
                "Para verificar con 100% de certeza que el mensaje proviene legítimamente de la pasarela de pagos y no de un atacante intentando activar cuentas gratis.",
                "Para que el banco no cobre comisiones de transferencia.",
                "Para cambiar el color de la página web.",
              ],
              correctIndex: 0,
              explanation: "La validación criptográfica de la firma del webhook es el estándar de oro de seguridad financiera para evitar ataques de suplantación.",
            },
            {
              question: "¿Cuál es la mejor práctica antes de hacer push a producción en un proyecto asistido por IA?",
              options: [
                "Ejecutar un build local ('npm run build') y los tests unitarios para certificar que no existen errores de tipado o compilación.",
                "Borrar la carpeta node_modules y no volver a instalarla.",
                "Apagar el servidor de producción durante 2 horas.",
              ],
              correctIndex: 0,
              explanation: "El build local garantiza que el código sea sintácticamente válido y esté listo para compilar en los servidores de despliegue continuo.",
            },
          ],
        },
      },
      {
        week_label: "06",
        title: "Módulo 06: Auditoría de Seguridad, Optimización de Contexto & Certificación Oficial",
        description: "Auditoría estática de vulnerabilidades, optimización de consumo de tokens en repositorios masivos y entrega del proyecto de graduación.",
        summary: "Decálogo de seguridad OWASP, mapas de arquitectura y emisión del Diploma Oficial con Código QR de verificación digital.",
        video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
        content_text: "### Módulo 06: Seguridad, Rendimiento y Certificación\n\n1. Análisis estático de vulnerabilidades y sanitización de inputs.\n2. Gestión eficiente de memoria y tokens en bases de código corporativas.\n3. Defensa del proyecto final y emisión del Certificado Oficial.",
        prompts: [
          "Actúa como un Auditor de Ciberseguridad OWASP. Revisa el código de mis rutas de API...",
          "Eres el Tutor Académico de Inteligencia Neuronal. Evalúa la entrega de mi proyecto final...",
        ],
        downloads: [
          { name: "Guia_Seguridad_OWASP_Agentic_Coding.pdf", type: "PDF", url: "#" },
          { name: "Manual_Optimizacion_Contexto_Grandes_Codebases.pdf", type: "PDF", url: "#" },
          { name: "Guia_Proyecto_Final_Antigravity.pdf", type: "PDF", url: "#" },
        ],
        quiz_data: {
          enabled: true,
          passing_score: 75,
          questions: [
            {
              question: "¿Cuál es la principal ventaja de utilizar Google Antigravity para el desarrollo de software frente a la programación manual tradicional?",
              options: [
                "Multiplica la velocidad de desarrollo x10 permitiendo a emprendedores y desarrolladores planificar, construir, auditar y desplegar aplicaciones completas con soporte agéntico continuo.",
                "Elimina la necesidad de tener computadoras para programar.",
                "Hace que los programas funcionen sin conexión a internet en cualquier lugar.",
              ],
              correctIndex: 0,
              explanation: "Antigravity democratiza y acelera el desarrollo de software profesional, uniendo planificación inteligente, ejecución autónoma y verificación en tiempo real.",
            },
            {
              question: "¿Qué elemento garantiza la autenticidad y validez internacional del Certificado Oficial emitido por Inteligencia Neuronal?",
              options: [
                "El código de verificación digital único y código QR que enlaza al registro oficial en la base de datos de la plataforma.",
                "El color del marco del diploma.",
                "El tamaño de la tipografía utilizada.",
              ],
              correctIndex: 0,
              explanation: "El código QR y el ID único permiten a clientes y empleadores comprobar instantáneamente la autenticidad del diploma en la plataforma.",
            },
          ],
        },
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
