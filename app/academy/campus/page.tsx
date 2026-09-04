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
  },
  "crecimiento-aeo": {
    id: "crecimiento-aeo",
    title: "Dominio Local: SEO, AEO & Visibilidad en Motores de IA",
    badge: "Lo más vendido",
    tagline: "Posiciona tu marca en Google Maps y sé la primera recomendación que ChatGPT, Gemini y Perplexity sugieren a clientes potenciales.",
    duration: "6 Módulos Prácticos • Acceso de por vida",
    modules: [
      {
        id: "aeo-mod-1",
        title: "Módulo 01: Fundamentos de la Visibilidad en la Era de la IA (SEO + AEO + GEO)",
        lessons: [
          {
            id: "aeo-1-1",
            title: "1.1 Cómo Buscan tus Clientes Hoy: Google Tradicional vs. IA Overviews vs. ChatGPT Search",
            duration: "22 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Comprende la transformación radical del comportamiento de búsqueda. Descubre por qué los usuarios ya no solo hacen clic en enlaces azules, sino que le piden a la IA que tome decisiones por ellos (Google AI Overviews, Perplexity y ChatGPT Search), y cómo tu negocio puede ser la respuesta directa.",
            content_text: `### ¿Cómo eligen las IAs qué negocio recomendar?

Durante más de dos décadas, el SEO tradicional se basó en una premisa sencilla: repetir palabras clave y conseguir enlaces hacia una página web. Hoy, los motores de búsqueda impulsados por Inteligencia Artificial funcionan bajo un modelo de **Recuperación Semántica y Generación (RAG)**.

Cuando un cliente escribe en ChatGPT o en Google: *"¿Cuál es el mejor restaurante familiar con terraza en el centro de la ciudad?"*, el motor de IA no solo revisa palabras clave; realiza un análisis en tres capas:

1. **Reconocimiento de Entidades:** Identifica si tu negocio está registrado como una entidad real, verificada y con datos consistentes en la web abierta.
2. **Extracción de Señales de Confianza:** Analiza reseñas recientes, menciones en artículos locales, fotografías con geoetiquetado y atributos específicos (como 'terraza', 'menú infantil', 'estacionamiento').
3. **Generación de Respuesta Sintetizada:** Elige entre 2 y 3 opciones máximas y redacta una recomendación explicada con enlaces directos de citación.

> **Objetivo de este módulo:** Pasar de ser un negocio 'invisible para los algoritmos' a convertirte en la entidad de referencia en tu ciudad.`,
            prompts: [
              `Actúa como un Auditor Senior de SEO Local y Motores de IA. Realiza un diagnóstico de presencia digital para mi negocio con los siguientes datos:
- Nombre del Negocio: [Tu Negocio]
- Rubro / Especialidad: [Ej: Odontología / Restaurante / Taller]
- Ciudad y Zona: [Ej: Valencia, España / Bogotá, Colombia]
- Página Web: [URL de tu web o 'No tengo web']
- Ficha de Google Maps: [Enlace o 'Activa']

Evalúa:
1. ¿Qué información fidedigna existe actualmente en los índices de búsqueda de IA sobre mi negocio?
2. ¿Qué tres competidores directos en mi ciudad tienen mayor probabilidad de ser recomendados por ChatGPT y Perplexity?
3. Entrega una tabla de 5 acciones prioritarias para posicionar mi marca en el Top 3 local.`
            ],
            downloads: [
              { name: "Guia_Comparativa_Motores_Busqueda_IA_2026.pdf", type: "PDF Técnico", url: "#" },
              { name: "Checklist_Diagnostico_Inicial_Presencia.xlsx", type: "Excel", url: "#" }
            ]
          },
          {
            id: "aeo-1-2",
            title: "1.2 El Grafo de Conocimiento y las Entidades de tu Marca",
            duration: "26 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Aprende qué es el Google Knowledge Graph y cómo los modelos LLM identifican negocios como 'Entidades Semánticas' (sujeto, relación, atributos) para nunca confundirte con otro negocio.",
            content_text: `### La diferencia entre palabras clave y 'Entidades'

Una **Entidad** es cualquier cosa, concepto o negocio que está claramente definido, es único y se distingue de otros. Para Google y OpenAI, tu negocio no es solo un dominio web: es un nodo en un mapa de conocimiento gigante.

Un nodo de entidad sólido contiene:
* **Identificador Único:** Nombre comercial exacto y coherente.
* **Ubicación Física Precisa:** Coordenadas de latitud y longitud, código postal y dirección normalizada.
* **Relaciones con el Ecosistema:** Enlaces oficiales a redes sociales, perfiles en cámaras de comercio, directorios verificados y menciones en prensa.
* **Catálogo Semántico:** Menús, listas de servicios con precios y horarios en tiempo real.`,
            prompts: [
              `Eres un Arquitecto de Datos Semánticos para Google Knowledge Graph. Toma la siguiente información de mi empresa:
- Nombre Comercial: [Nombre]
- Dirección Exacta: [Dirección completa]
- Servicios Principales: [Servicio 1, Servicio 2, Servicio 3]
- Redes Sociales: [Instagram, LinkedIn, Facebook]
- Fundador / Especialista Principal: [Nombre del fundador]

Genera un documento de definición de Entidad Semántica en formato estructurado (Triples de Conocimiento: Sujeto -> Predicado -> Objeto) listo para ser indexado por rastreadores de IA.`
            ],
            downloads: [
              { name: "Plantilla_Mapeo_Entidades_Semanticas.docx", type: "Plantilla Word", url: "#" }
            ]
          },
          {
            id: "aeo-1-3",
            title: "1.3 Auditoría de Visibilidad Local y Detección de Fugas de Tráfico",
            duration: "24 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Metodología práctica para auditar en 15 minutos en qué posición apareces en tu ciudad, qué dice la IA de ti y dónde estás perdiendo clientes frente a tus competidores locales.",
            content_text: `### Pasos de la Auditoría Rápida de 15 Minutos

1. **Prueba de Modo Incógnito en Google Maps:** Búsquedas por necesidad sin mencionar tu nombre comercial (Ej: *"urgencias dentales cerca de mí"*, *"comida italiana artesanal"*).
2. **Prueba de Consulta Conversacional en Perplexity & ChatGPT Search:** Preguntar por recomendaciones contextuales de tu sector y analizar qué fuentes cita la IA en las notas al pie.
3. **Detección de Brechas de Competencia:** Analizar qué atributos (fotos 360, menú digital, respuestas a reseñas, consistencia de horarios) tienen los 3 primeros clasificados que a ti te faltan.`,
            prompts: [
              `Compara a mi negocio con mis dos principales competidores locales:
- Mi Negocio: [Nombre y ciudad]
- Competidor 1: [Nombre]
- Competidor 2: [Nombre]

Analiza:
1. Fortalezas y debilidades percibidas en reseñas públicas de Google.
2. Nivel de claridad en la oferta de servicios y precios en la web.
3. Sugiere 3 ventajas competitivas desatendidas que mi marca puede adueñarse para destacar en las respuestas de IA.`
            ],
            downloads: [
              { name: "Matriz_Auditoria_Share_Of_Voice_Local.xlsx", type: "Excel Parametrizado", url: "#" }
            ]
          }
        ],
        quiz: {
          enabled: true,
          passingScore: 75,
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
            },
            {
              question: "¿Por qué es peligroso tener direcciones o teléfonos distintos en diferentes páginas de Internet?",
              options: [
                "Porque la inconsistencia en los datos (NAP) hace que los algoritmos duden de la veracidad del negocio y reduzcan su visibilidad.",
                "Porque el servidor web se apaga automáticamente.",
                "Porque los clientes no pueden abrir archivos PDF."
              ],
              correctIndex: 0,
              explanation: "La coherencia NAP (Nombre, Dirección, Teléfono) es el factor de confianza base que utilizan tanto Google como los LLMs para validar que un negocio es legítimo."
            }
          ]
        }
      },
      {
        id: "aeo-mod-2",
        title: "Módulo 02: Optimización Maestra de Google Business Profile & Citaciones 360",
        lessons: [
          {
            id: "aeo-2-1",
            title: "2.1 Configuración de Alta Conversión en tu Ficha de Google Maps",
            duration: "32 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Cómo configurar cada campo de Google Business Profile para maximizar llamadas y visitas: Categoría Primaria (el factor #1), categorías secundarias, catálogos visuales y atributos de confianza.",
            content_text: `### El checklist de oro para Google Business Profile

* **Categoría Principal:** Es el factor de mayor peso algorítmico. Debe reflejar exactamente tu actividad principal (ej. *'Restaurante italiano'* en lugar de solo *'Restaurante'*).
* **Categorías Secundarias:** Añade entre 3 y 5 categorías complementarias verificadas.
* **Nombre Comercial Limpio:** Evita acumular palabras clave artificiales en el nombre para prevenir suspensiones automáticas de Google.
* **Catálogo de Servicios y Productos:** Cada servicio debe incluir descripción persuasiva, precio orientativo y enlace directo a WhatsApp o reservas.
* **Atributos Específicos:** Marca todos los atributos que apliquen (WiFi, accesibilidad, terraza, entrega a domicilio, métodos de pago).`,
            prompts: [
              `Actúa como un Copywriter Especialista en Fichas de Google Business. Redacta una descripción de 750 caracteres para mi negocio:
- Rubro: [Ej: Clínica de Fisioterapia y Rehabilitación Deportiva]
- Ciudad y Barrio: [Ej: Madrid, Barrio de Salamanca]
- Propuesta de Valor: [Ej: Atención personalizada, tecnología láser y citas en menos de 24h]
- Llamado a la Acción: [Ej: Reserva por WhatsApp o llamada directa]

Asegúrate de que suene cercana, profesional e incluya de forma natural los términos que los clientes buscan en Google Maps.`
            ],
            downloads: [
              { name: "Guia_Categorias_Estrategicas_Google_Business.pdf", type: "PDF", url: "#" },
              { name: "Plantilla_Ficha_Optimizada_Google.docx", type: "Plantilla Word", url: "#" }
            ]
          },
          {
            id: "aeo-2-2",
            title: "2.2 Fotografías de Alto Impacto, Geotagging y Google Posts",
            duration: "28 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Estrategia visual para Google Maps: por qué los negocios con más de 100 fotos reciben 520% más llamadas, cómo geoetiquetar imágenes con coordenadas GPS y cómo crear publicaciones semanales de ofertas.",
            content_text: `### Estrategia de Contenido Visual en Mapas

Las imágenes con metadatos de ubicación (coordenadas EXIF) envían señales de relevancia geográfica a Google.

**Tipos de fotos indispensables:**
1. **Fachada exterior:** Tomada a la luz del día y de noche para facilitar la llegada de clientes.
2. **Ambiente interior y equipo:** Genera confianza y humaniza la marca.
3. **Productos estrella en alta resolución:** Platos, instalaciones o trabajos realizados.
4. **Google Posts semanales:** Novedades, descuentos y eventos con botón de acción (*Llamar ahora* o *Reservar*).`,
            prompts: [
              `Crea un calendario de 4 publicaciones para Google Business Profile para el próximo mes para mi negocio:
- Negocio: [Tu Negocio]
- Objetivo: [Conseguir reservas para el fin de semana / Promocionar nuevo servicio]

Para cada publicación incluye:
- Gancho de atención (primeras 2 líneas)
- Cuerpo del mensaje (máximo 80 palabras)
- Llamado a la acción claro (CTA)
- Sugerencia de fotografía a adjuntar.`
            ],
            downloads: [
              { name: "Calendario_Publicaciones_Google_Maps.xlsx", type: "Excel", url: "#" },
              { name: "Manual_Geotagging_Fotografias.pdf", type: "Guía PDF", url: "#" }
            ]
          },
          {
            id: "aeo-2-3",
            title: "2.3 Sincronización de Citaciones: Apple Maps, Bing Places y Waze",
            duration: "25 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Cómo clonar tu presencia en Apple Maps (para usuarios de iPhone y Siri), Bing Places (para búsquedas con Copilot) y aplicaciones de navegación como Waze en una sola sesión de trabajo.",
            content_text: `### Por qué Apple Maps y Bing Places son críticos para la IA

* **Apple Maps alimenta a Siri y Apple Intelligence:** Cuando un usuario de iPhone pregunta *"Siri, busca un café cerca"*, la respuesta proviene 100% de Apple Business Connect.
* **Bing Places alimenta a Microsoft Copilot y ChatGPT:** Las búsquedas integradas en Windows y herramientas de Microsoft toman como fuente primaria el directorio de Bing.`,
            prompts: [
              `Genera la ficha estandarizada para dar de alta mi negocio en Apple Business Connect, Bing Places y directorios locales sin errores:
- Nombre: [Nombre]
- Dirección: [Dirección]
- Teléfono: [Teléfono]
- Horario: [Lunes a Domingo]
- Descripción Corta: [Breve resumen]
- Enlaces Oficiales: [Web y WhatsApp]`
            ],
            downloads: [
              { name: "Directorio_Top_50_Citaciones_Locales.xlsx", type: "Excel", url: "#" },
              { name: "Checklist_Consistencia_NAP.pdf", type: "PDF", url: "#" }
            ]
          }
        ],
        quiz: {
          enabled: true,
          passingScore: 75,
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
            },
            {
              question: "¿Por qué es importante reclamar y optimizar la ficha en Apple Business Connect?",
              options: [
                "Porque alimenta directamente las búsquedas de Siri, Apple Maps y el ecosistema de usuarios iPhone.",
                "Porque duplica la memoria de los teléfonos móviles.",
                "Porque elimina los impuestos locales."
              ],
              correctIndex: 0,
              explanation: "Millones de usuarios buscan comercios directamente mediante Siri y Apple Maps; no tener presencia en Apple Business Connect deja ese segmento en manos de la competencia."
            }
          ]
        }
      },
      {
        id: "aeo-mod-3",
        title: "Módulo 03: Arquitectura Técnica On-Page, Microdatos JSON-LD & RAG Readiness",
        lessons: [
          {
            id: "aeo-3-1",
            title: "3.1 Microdatos JSON-LD (Schema.org): El DNI Digital de tu Negocio",
            duration: "35 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Aprende qué es el código Schema.org en formato JSON-LD y cómo insertarlo en tu página web (WordPress, Shopify, Next.js o HTML) para que Google y ChatGPT lean tus horarios, dirección, precios y redes sociales sin equivocarse.",
            content_text: `### ¿Qué es JSON-LD y por qué lo adoran los motores de búsqueda?

JSON-LD es un bloque de datos estructurados invisible para el visitante humano, pero extremadamente legible para los rastreadores de Google y los modelos de lenguaje (LLMs).

Permite declarar de forma explícita tu nombre, dirección, coordenadas, horarios y redes sociales oficiales en un solo bloque estructurado.`,
            prompts: [
              `Actúa como un Ingeniero de Datos Estructurados Schema.org. Genera un script JSON-LD completo y validado para el tipo 'LocalBusiness' (o subtipo específico como Restaurant, Dentist, LegalService) con los siguientes datos:
- Nombre: [Nombre de la empresa]
- Tipo de Negocio: [Ej: Restaurant / MedicalClinic / AccountingService]
- Dirección, Ciudad, Código Postal, País: [Datos]
- Coordenadas Latitud y Longitud: [Latitud, Longitud]
- Teléfono y Email de Contacto: [Teléfono, Email]
- Enlaces a Redes Sociales (sameAs): [URLs]
- Horarios de Apertura: [Días y horas]
- Rango de Precios: [Ej: €€ o $$]

Entrega el código listo para insertar dentro de la etiqueta <head> de mi página web y explica cómo validarlo con la herramienta oficial de Rich Results de Google.`
            ],
            downloads: [
              { name: "Schema_LocalBusiness_Maestro_Template.json", type: "JSON Schema", url: "#" },
              { name: "Guia_Validacion_Google_Rich_Results.pdf", type: "PDF", url: "#" }
            ]
          },
          {
            id: "aeo-3-2",
            title: "3.2 Páginas de Aterrizaje Hiperlocales (Landing Pages por Zona)",
            duration: "30 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Cómo crear páginas específicas para diferentes barrios, distritos o ciudades satélite sin caer en contenido duplicado, captando clientes que buscan servicios en zonas cercanas.",
            content_text: `### Estructura de una Landing Page Hiperlocal de Alta Conversión

1. **Encabezado H1 Contextual:** [Servicio Principal] en [Nombre del Barrio / Ciudad].
2. **Mapa de Google Embebido:** Con la ubicación y el radio de servicio.
3. **Testimonios de Clientes de esa Zona:** Genera prueba social inmediata.
4. **Instrucciones de Acceso y Estacionamiento:** Información práctica que los usuarios aprecian (estaciones de metro cercanas, aparcamiento gratuito).
5. **Llamado a la Acción Directo:** Botón flotante de WhatsApp y formulario rápido.`,
            prompts: [
              `Redacta el contenido de una Landing Page Hiperlocal para mi negocio enfocada en el barrio [Nombre del Barrio / Distrito]:
- Negocio: [Tu Negocio]
- Servicio Destacado: [Ej: Implantes Dentales / Reparación de Coches / Catering]
- Barrio Objetivo: [Nombre]
- Hitos de Referencia: [Cerca de la plaza central / a 5 min de la estación]

Incluye títulos H1, H2, H3, tres beneficios clave, sección de preguntas frecuentes y llamadas a la acción.`
            ],
            downloads: [
              { name: "Estructura_Landing_Local_Alta_Conversion.docx", type: "Documento Word", url: "#" },
              { name: "Wireframe_Visual_Pagina_Local.png", type: "Imagen / Diagrama", url: "#" }
            ]
          },
          {
            id: "aeo-3-3",
            title: "3.3 RAG-Readiness: Menús, Precios y FAQs que la IA Puede Citar",
            duration: "27 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Cómo organizar tus tablas de precios y preguntas frecuentes (con Schema FAQPage) para que ChatGPT y Perplexity citen tus respuestas directamente sin inventar costos ni alucinar.",
            content_text: `### El estándar FAQPage para aparecer en los resultados enriquecidos

Cuando añades preguntas y respuestas frecuentes estructuradas con microdatos, Google muestra acordeones interactivos en los resultados de búsqueda, multiplicando tu porcentaje de clics (CTR).

Además, los motores generativos como Perplexity usan estas secciones de preguntas y respuestas para redactar sus resúmenes directos a los usuarios.`,
            prompts: [
              `Eres un Especialista en Optimización para Motores de Respuesta (AEO). Genera 5 Preguntas Frecuentes (FAQs) de alto impacto con sus respuestas concisas y profesionales para mi negocio:
- Rubro: [Tu actividad]
- Dudas más habituales de mis clientes: [Precios, tiempos de entrega, formas de pago, garantías]

Entrega también el bloque de código Schema FAQPage en formato JSON-LD correspondiente para implementarlo de inmediato.`
            ],
            downloads: [
              { name: "Plantilla_Schema_FAQPage_Listo.json", type: "JSON Schema", url: "#" },
              { name: "Guia_Optimizacion_Tablas_Precios_IA.pdf", type: "Guía PDF", url: "#" }
            ]
          }
        ],
        quiz: {
          enabled: true,
          passingScore: 75,
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
            },
            {
              question: "¿Para qué sirve el marcado Schema FAQPage en una página web de servicios locales?",
              options: [
                "Para que las preguntas y respuestas aparezcan desplegables en Google y los modelos de IA las usen como respuestas directas.",
                "Para enviar correos masivos a clientes desconocidos.",
                "Para bloquear el acceso a los competidores."
              ],
              correctIndex: 0,
              explanation: "Las preguntas frecuentes con marcado Schema aumentan el espacio visual que ocupa tu resultado en Google y facilitan la extracción de datos por parte de los LLMs."
            }
          ]
        }
      },
      {
        id: "aeo-mod-4",
        title: "Módulo 04: Optimización para Motores Generativos (GEO) & Citación en ChatGPT, Gemini y Perplexity",
        lessons: [
          {
            id: "aeo-4-1",
            title: "4.1 Cómo Seleccionan Fuentes Perplexity, ChatGPT Search y Gemini",
            duration: "31 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Descubre los algoritmos de búsqueda en tiempo real de los asistentes de IA: cómo rastrean la web abierta, qué peso le dan a los foros, notas de prensa y directorios, y cómo lograr que te elijan como recomendación principal.",
            content_text: `### El pipeline de respuesta de un Motor Generativo (GEO)

Cuando un usuario pregunta en Perplexity: *"¿Dónde puedo hacerme un chequeo dental de confianza en Valencia?"*, el motor ejecuta el siguiente flujo en milisegundos:

1. **Reescritura de Consulta:** Transforma la frase del usuario en múltiples búsquedas paralelas.
2. **Scraping & Ingesta Rápida:** Rastrea los resultados más relevantes de Google Maps, Yelp, foros locales y artículos de prensa.
3. **Filtro de Autoridad y Coherencia:** Descarta fuentes contradictorias o desactualizadas y prioriza negocios con opiniones positivas contrastadas y fichas verificadas.
4. **Generación con Citas:** Redacta el párrafo recomendando las mejores opciones e inserta las citas con enlaces hacia las webs oficiales.`,
            prompts: [
              `Simula una búsqueda en profundidad como si fueras Perplexity Pro o ChatGPT Search para la consulta:
'Recomienda los 3 mejores [tu tipo de negocio] en [tu ciudad] explicando por qué destacan'.

Analiza:
1. ¿Qué fuentes y directorios son los más citados en este sector?
2. ¿Qué factores de confianza justifican la recomendación de cada negocio?
3. ¿Qué elementos debo publicar en mi web y redes para que la IA me incluya en su próxima síntesis?`
            ],
            downloads: [
              { name: "Mapa_Fuentes_Ingesta_Motores_IA_2026.pdf", type: "PDF", url: "#" }
            ]
          },
          {
            id: "aeo-4-2",
            title: "4.2 Menciones de Autoridad en la Web Abierta y Estrategia Comunitaria",
            duration: "29 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Cómo conseguir menciones orgánicas en medios locales, blogs de la ciudad, comunidades de Reddit y directorios gremiales para nutrir la memoria de los modelos de inteligencia artificial.",
            content_text: `### La importancia del 'E-E-A-T' (Experiencia, Especialización, Autoridad y Confianza)

Para que los modelos de lenguaje consideren a tu negocio como una referencia, necesitan encontrar menciones desinteresadas en terceros:
* **Artículos en periódicos o blogs de tu ciudad:** Guías de recomendaciones locales.
* **Comentarios genuinos en Reddit y foros:** Los LLMs otorgan una alta puntuación de autenticidad a los debates públicos en Reddit.
* **Entrevistas o colaboraciones con medios del sector:** Refuerzan la autoridad de los fundadores y profesionales de la empresa.`,
            prompts: [
              `Actúa como un Especialista en Relaciones Públicas Digitales Locales. Redacta 2 plantillas de mensaje para contactar a redactores de blogs locales y guías turísticas de mi ciudad:
- Mi Negocio: [Nombre y rubro]
- Ángulo de Noticia / Novedad: [Ej: Apertura de nuevo espacio sostenible / Lanzamiento de servicio innovador con IA / 10 años de trayectoria]

El mensaje debe ser respetuoso, conciso (menos de 150 palabras) y ofrecer valor real al periodista o redactor.`
            ],
            downloads: [
              { name: "Plantillas_Outreach_Medios_Locales.docx", type: "Word", url: "#" },
              { name: "Guia_Estrategia_Reddit_Comunidades.pdf", type: "PDF", url: "#" }
            ]
          },
          {
            id: "aeo-4-3",
            title: "4.3 Monitoreo de Marca y Corrección de Alucinaciones en IA",
            duration: "26 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Protocolo para auditar periódicamente lo que ChatGPT, Claude y Gemini afirman sobre tu empresa, y pasos exactos para corregir datos erróneos de precios, cartas o ubicaciones.",
            content_text: `### Cómo corregir si una IA entrega datos falsos sobre tu negocio

1. **Auditoría Mensual de Prompts:** Realizar consultas de prueba sobre tus horarios festivos, carta y precios.
2. **Actualización de la Fuente Primaria:** Si la IA dice que no abres los domingos, actualiza primero Google Business Profile y el Schema JSON-LD de tu web.
3. **Creación de una Página de 'Aclaraciones y Datos Oficiales':** Un apartado en tu web titulado 'Datos Oficiales y Preguntas Frecuentes' donde se listen de forma inequívoca las políticas vigentes.`,
            prompts: [
              `Eres un Auditor de Veracidad de Marca en Modelos de Lenguaje. Diseña una batería de 10 prompts de prueba para evaluar la precisión de la información que los asistentes de IA tienen sobre mi negocio:
- Negocio: [Tu Negocio]
- Ubicación: [Tu Ciudad]
- Puntos Críticos a Verificar: [Horarios, precios, reservas, políticas de cancelación, especialidades]`
            ],
            downloads: [
              { name: "Protocolo_Correccion_Datos_IA.pdf", type: "PDF", url: "#" }
            ]
          }
        ],
        quiz: {
          enabled: true,
          passingScore: 75,
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
            },
            {
              question: "¿Qué debes hacer si detectas que ChatGPT está indicando un horario de atención incorrecto para tu empresa?",
              options: [
                "Actualizar de inmediato Google Business Profile, tu web con Schema JSON-LD y tus redes principales con el horario verificado.",
                "Dejar de usar Internet en tu negocio.",
                "Cambiar de nombre comercial."
              ],
              correctIndex: 0,
              explanation: "Al corregir y sincronizar las fuentes primarias que la IA rastrea periódicamente, el modelo actualizará su memoria en las siguientes iteraciones de búsqueda."
            }
          ]
        }
      },
      {
        id: "aeo-mod-5",
        title: "Módulo 05: Automatización de Reseñas 5 Estrellas & Embudos Directos a WhatsApp",
        lessons: [
          {
            id: "aeo-5-1",
            title: "5.1 El Bucle de Reseñas con Tarjetas NFC y Códigos QR Dinámicos",
            duration: "33 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Cómo multiplicar tus reseñas positivas en Google Maps usando tecnología táctil NFC (acercar el móvil en mesa o mostrador), códigos QR de enlace directo a 5 estrellas y el momento psicológico exacto para pedirlas.",
            content_text: `### La regla del menor esfuerzo para conseguir reseñas

El 80% de los clientes satisfechos no deja una reseña porque el proceso tradicional requiere abrir la app, buscar el negocio y hacer clic varias veces.

**La Solución de Fricción Cero:**
* **Tarjetas y Placas NFC:** El cliente solo apoya su móvil y se le abre directamente la pantalla de 5 estrellas con el cursor listo para escribir.
* **Códigos QR de Enlace Directo:** Generar el enlace oficial de Google Maps con el parámetro de reseña precargado.
* **El Momento 'Peak-End':** Solicitar la reseña justo después de una experiencia positiva (al entregar la cuenta con un detalle, al finalizar un tratamiento exitoso o al entregar un pedido impecable).`,
            prompts: [
              `Actúa como un Diseñador de Experiencia de Cliente y Redactor Estratégico. Crea 3 guiones de 2 frases para que mi personal de atención solicite amablemente una reseña a clientes satisfechos:
- Negocio: [Ej: Restaurante / Salón de Belleza / Taller Mecánico]
- Soporte: [Tarjeta NFC en mesa / Código QR en el ticket]

Los guiones deben sonar naturales, amables, sin presionar y transmitiendo cómo su opinión apoya al equipo local.`
            ],
            downloads: [
              { name: "Plantilla_Diseno_Tarjetas_NFC_Google_Maps.pdf", type: "Plantilla de Diseño", url: "#" },
              { name: "Guia_Implementacion_QR_Dinamico.docx", type: "Guía Word", url: "#" }
            ]
          },
          {
            id: "aeo-5-2",
            title: "5.2 Filtro de Reseñas y Prevención de Calificaciones Negativas",
            duration: "28 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Implementación de un embudo inteligente de satisfacción: si el cliente está feliz se le envía a Google Maps; si tuvo un inconveniente, se abre un canal privado de WhatsApp para resolverlo antes de que impacte tu reputación pública.",
            content_text: `### El Embudo de Derivación Inteligente

1. **Paso 1:** El cliente escanea el QR y ve una pregunta sencilla: *'¿Cómo fue tu experiencia hoy?'* con 5 estrellas interactivas.
2. **Si califica con 4 o 5 estrellas:** Se le redirige inmediatamente a la ficha pública de Google Maps para publicar su opinión.
3. **Si califica con 1, 2 o 3 estrellas:** Se abre un formulario privado o enlace directo a WhatsApp con el Gerente de Operaciones: *'Lamentamos mucho que tu experiencia no haya sido perfecta. ¿Qué podemos hacer ahora mismo para solucionarlo?'*.
4. **Resultado:** Resuelves el problema del cliente, evitas la reseña negativa pública y blindas tu promedio de 4.9 estrellas.`,
            prompts: [
              `Diseña el flujo conversacional y los mensajes para un sistema de resolución rápida de quejas por WhatsApp:
- Empresa: [Tu Negocio]
- Responsable: [Gerente de Servicio / Atención al Cliente]

Incluye:
- Mensaje automático de bienvenida y disculpa empática.
- Preguntas breves para entender el problema.
- Propuesta de solución inmediata (reembolso parcial, cortesía en próxima visita o llamada directa).`
            ],
            downloads: [
              { name: "Flujo_Filtro_Satisfaccion_Cliente.png", type: "Diagrama de Flujo", url: "#" },
              { name: "Script_Atencion_Clientes_WhatsApp.docx", type: "Word", url: "#" }
            ]
          },
          {
            id: "aeo-5-3",
            title: "5.3 Respuestas a Reseñas con IA y Conversión a Ventas por WhatsApp",
            duration: "30 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Cómo responder el 100% de las reseñas en segundos con IA incluyendo palabras clave locales de forma natural, y cómo convertir las visitas de tu ficha en clientes directos de WhatsApp sin pagar comisiones de plataformas.",
            content_text: `### Por qué responder reseñas mejora tu posicionamiento

Google premia a los negocios que responden activamente a sus reseñas porque demuestra actividad constante. Además, cuando respondes mencionando sutilmente tus especialidades (*'¡Gracias por destacar nuestra paella de mariscos en el centro de Valencia!'*), estás reforzando las palabras clave del negocio.`,
            prompts: [
              `Actúa como el Gerente de Reputación Online de mi negocio [Tu Negocio]. Redacta 3 respuestas personalizadas, empáticas y profesionales para las siguientes reseñas de clientes:
1. Reseña 5 Estrellas elogiosa: [Texto de la reseña]
2. Reseña 4 Estrellas con una sugerencia de mejora: [Texto de la reseña]
3. Reseña 2 Estrellas injusta o crítica: [Texto de la reseña]

Asegúrate de que cada respuesta incluya agradecimiento, mencione sutilmente el nombre del plato o servicio y demuestre compromiso con la excelencia.`
            ],
            downloads: [
              { name: "Banco_50_Respuestas_Resenas_IA.docx", type: "Word", url: "#" }
            ]
          }
        ],
        quiz: {
          enabled: true,
          passingScore: 75,
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
            },
            {
              question: "¿Cuál es el objetivo principal del 'Filtro de Reseñas' mediante WhatsApp?",
              options: [
                "Capturar a tiempo los problemas de clientes insatisfechos en privado para solucionarlos antes de que se conviertan en reseñas públicas negativas.",
                "Cobrarle dinero a los clientes insatisfechos.",
                "Bloquear el internet del cliente."
              ],
              correctIndex: 0,
              explanation: "El canal directo privado permite solucionar fricciones operativas con empatía, recuperando al cliente y protegiendo el promedio público del negocio."
            }
          ]
        }
      },
      {
        id: "aeo-mod-6",
        title: "Módulo 06: Telemetría, Geo-Grid Rank Tracking y Proyecto de Certificación",
        lessons: [
          {
            id: "aeo-6-1",
            title: "6.1 Medición de Rankings con Mapas de Calor (Geo-Grid Tracking)",
            duration: "34 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Aprende a usar herramientas de seguimiento Geo-Grid (como Local Falcon o alternativas de bajo coste) para visualizar en un mapa de calor exactamente en qué calles apareces en el Top 3 y en cuáles caes de posición, trazando un plan de expansión de tu radio de clientes.",
            content_text: `### ¿Qué es un mapa de calor Geo-Grid?

Tu posición en Google Maps no es fija: cambia según la esquina exacta desde donde el cliente hace la búsqueda.

Un mapa Geo-Grid coloca una cuadrícula de 7x7 o 9x9 pines sobre tu ciudad:
* **Pines Verdes (1, 2, 3):** Tu negocio aparece en el codiciado Top 3 (el 'Local Pack').
* **Pines Amarillos (4 a 9):** Estás visible pero requieres hacer clic en 'Ver más'.
* **Pines Rojos (+10):** Eres invisible para los clientes de esa zona.

> Con este módulo aprenderás a convertir los pines rojos y amarillos en verdes expandiendo tu radio de influencia de 1 km a más de 10 km a la redonda.`,
            prompts: [
              `Analiza los siguientes resultados de mi mapa de calor Geo-Grid:
- Mi Negocio: [Tu Negocio]
- Radio Actual: [Ej: 5 km alrededor de mi local]
- Zonas Fuertes (Verdes): [Zona Norte y Centro]
- Zonas Débiles (Rojas/Amarillas): [Zona Sur y Distrito Financiero]

Diseña un plan de 30 días para expandir mi relevancia hacia las zonas débiles mediante optimización de contenido, publicaciones geolocalizadas y citaciones específicas.`
            ],
            downloads: [
              { name: "Guia_Interpretacion_GeoGrid_Rankings.pdf", type: "Guía PDF", url: "#" },
              { name: "Checklist_Expansion_Radio_Visibilidad.xlsx", type: "Excel", url: "#" }
            ]
          },
          {
            id: "aeo-6-2",
            title: "6.2 Dashboard Simple de KPIs: Medición del Retorno de Inversión",
            duration: "27 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Las 5 métricas que realmente importan para el bolsillo de tu negocio: Llamadas directas, Solicitudes de indicaciones de cómo llegar, Clics a tu web, Mensajes de WhatsApp y Clientes nuevos conseguidos a coste de publicidad CERO.",
            content_text: `### Las 5 Métricas Clave de Negocio

1. **Llamadas telefónicas iniciadas:** Tasa de cierre promedio de llamadas.
2. **Solicitudes de ruta (Direcciones):** Intención de visita física inmediata.
3. **Clics al sitio web / Menú digital:** Tráfico de alta intención de compra.
4. **Conversión a WhatsApp:** Contactos que inician conversación directa.
5. **Ahorro en Publicidad Pagada:** Cuánto te habría costado conseguir esas mismas visitas pagando anuncios en Google Ads o Meta Ads.`,
            prompts: [
              `Actúa como un Analista de Crecimiento de Negocios Locales. Toma las métricas del último mes de mi ficha de Google Business:
- Búsquedas Totales: [Ej: 14,200]
- Llamadas Realizadas: [Ej: 185]
- Solicitudes de Ruta: [Ej: 420]
- Clics a la Web: [Ej: 610]
- Ticket Promedio del Cliente: [Ej: 35 € o $]

Calcula el valor económico generado por la presencia orgánica local y redacta un reporte ejecutivo de 1 página destacando el Retorno de Inversión (ROI).`
            ],
            downloads: [
              { name: "Dashboard_Excel_KPIs_Visibilidad_Local.xlsx", type: "Excel con Fórmulas", url: "#" },
              { name: "Plantilla_Reporte_Mensual_Ejecutivo.pptx", type: "PowerPoint Editable", url: "#" }
            ]
          },
          {
            id: "aeo-6-3",
            title: "6.3 Proyecto Final de Graduación y Emisión de tu Certificación Oficial",
            duration: "30 min",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0",
            summary: "Instrucciones detalladas para completar tu auditoría e implementación final en tu propio negocio o en el de un cliente, envío de evidencias y emisión automática de tu Diploma Oficial con Código QR de Verificación Digital.",
            content_text: `### Requisitos para la Certificación Oficial

Para graduarte y obtener tu Diploma Verificable con ID único:
1. **Completar el 100% de las lecciones del programa.**
2. **Aprobar los quizes evaluativos de los 6 módulos (calificación mínima: 75%).**
3. **Implementar al menos 3 de las herramientas del curso:**
   - Ficha de Google Business Profile optimizada al 100%.
   - Código Schema JSON-LD insertado y validado en Google Rich Results.
   - Sistema de captación de reseñas (NFC o QR dinámico) activo.
4. **Hacer clic en 'Emitir Certificado Oficial' dentro de tu panel de estudiante.**`,
            prompts: [
              `Eres el Tutor Académico de Inteligencia Neuronal. Revisa los siguientes entregables de mi proyecto de certificación:
- Enlace de mi Ficha de Google Maps: [URL]
- Enlace a mi Web con Schema JSON-LD: [URL]
- Foto o evidencia de mi sistema de captura de reseñas: [Descripción]

Evalúa cada punto según la rúbrica oficial de graduación y entrega retroalimentación constructiva para maximizar mi puntuación.`
            ],
            downloads: [
              { name: "Guia_Proyecto_Graduacion_Certificacion.pdf", type: "Guía PDF", url: "#" },
              { name: "Rubrica_Evaluacion_Final.pdf", type: "PDF", url: "#" }
            ]
          }
        ],
        quiz: {
          enabled: true,
          passingScore: 75,
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
            },
            {
              question: "¿Cuál es el valor comercial de contar con una presencia sólida en motores de IA y Google Maps?",
              options: [
                "Generar un flujo predecible y continuo de clientes potenciales con alta intención de compra a coste de adquisición cero sin depender de comisiones.",
                "Tener muchos seguidores en redes que nunca compran.",
                "Pagar más facturas de publicidad cada mes."
              ],
              correctIndex: 0,
              explanation: "El posicionamiento orgánico en mapas y motores de IA genera el tráfico más rentable y con mayor tasa de conversión del marketing digital."
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

  // Generar y enviar certificado automáticamente al completar el 100%
  const [certGeneratedCode, setCertGeneratedCode] = useState<string>("IN-2026-OFICIAL");

  useEffect(() => {
    if (isProgramFullyCompleted && studentEmail) {
      fetch("/api/campus/certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentEmail,
          studentName: studentProfile.fullName,
          courseId: selectedProgramId,
          courseTitle: currentProgram.title,
          avgScore: 98,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.certificate) {
            setCertGeneratedCode(data.certificate.certificate_code);
          }
        })
        .catch((e) => console.warn("Auto cert error", e));
    }
  }, [isProgramFullyCompleted, studentEmail, selectedProgramId]);

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
                onClick={() => {
                    const certUrl = '/certificados/' + certGeneratedCode;
                    window.open(certUrl, '_blank');
                  }}
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
