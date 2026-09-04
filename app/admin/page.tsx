'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderDown,
  GraduationCap,
  Users,
  CreditCard,
  Bot,
  Bell,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ShieldAlert,
  Activity,
  DownloadCloud,
  CheckCircle,
  RefreshCw,
  Search,
  LogOut,
  Power,
  ExternalLink,
  Edit2,
  Trash2,
  X,
  Phone,
  Mail,
  Building,
  Send,
  Eye,
  Check,
  Image as ImageIcon,
  Paperclip,
  FileText,
  DollarSign,
  Calendar,
  Layers,
  Sparkles,
  Link2,
  UploadCloud,
  UserPlus,
  BookOpen,
  HelpCircle,
  CheckSquare,
  Sliders,
} from 'lucide-react';
import Link from 'next/link';

// ── LOGO BRAND COLOR CONSTANTS ──
const BRAND = {
  magenta: '#EA0C7F',
  purple: '#971B8D',
  cyan: '#1DACE3',
  green: '#86C537',
  yellow: '#FEAD2B',
  darkSidebar: '#1F242D',
  lightBg: '#F8F9FA',
};

interface ResourceItem {
  id: string;
  name: string;
  format: string;
  access: string;
  price?: string;
  downloads: number;
  tag: string;
  fileUrl?: string;
  previewImage?: string;
  description?: string;
}

export interface QuizQuestionForm {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ModuleQuizForm {
  enabled: boolean;
  passing_score: number;
  questions: QuizQuestionForm[];
}

export interface CourseModuleForm {
  id?: string;
  week_label: string;
  title: string;
  description: string;
  video_url?: string;
  summary?: string;
  content_text?: string;
  prompts?: string[];
  downloads?: { name: string; type?: string; url: string }[];
  quiz?: ModuleQuizForm;
}

interface CourseItem {
  id: string;
  title: string;
  badge: string;
  level: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  rating?: number;
  reviewsCount?: number;
  duration: string;
  tagline: string;
  description?: string;
  previewImage?: string;
  stripeColor?: string;
  tools: string[];
  modulesCount: number;
  studentsEnrolled: number;
  ctaUrl: string;
  status: 'ACTIVO' | 'BORRADOR' | 'ARCHIVADO';
  instructorName?: string;
  instructorRole?: string;
  instructorAvatar?: string;
  hoursVideo?: string;
  articlesCount?: number;
  resourcesCount?: number;
  lastUpdated?: string;
  language?: string;
  outcomes?: string[];
  includes?: string[];
  requirements?: string[];
  audience?: string[];
  modules?: CourseModuleForm[];
}

interface AgentData {
  id: string;
  name: string;
  trigger: string;
  status: 'ONLINE' | 'IDLE' | 'OFFLINE';
  executionsToday: number;
  errorRate: string;
  tokensConsumed: string;
}

interface AuditNotification {
  id: string;
  fullName: string;
  companyName: string;
  corporateEmail: string;
  phoneWhatsApp: string;
  businessType: string;
  dailyVolume: string;
  currentERP: string;
  primaryBottleneck: string;
  serviceNeeded: string;
  status: 'Nuevo' | 'En Evaluación' | 'Contactado' | 'Cerrado / Pagado';
  source: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'resources' | 'leads' | 'billing' | 'agents' | 'audits'>('overview');
  const [syncingN8n, setSyncingN8n] = useState(false);
  const [syncingCourses, setSyncingCourses] = useState(false);
  const [syncingResources, setSyncingResources] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [timeFilter, setTimeFilter] = useState<'today' | '7d' | '30d' | 'all'>('30d');
  
  // Search Filters
  const [searchResource, setSearchResource] = useState('');
  const [searchCourse, setSearchCourse] = useState('');
  const [searchLead, setSearchLead] = useState('');
  const [searchAudit, setSearchAudit] = useState('');

  // ── 1. NOTIFICACIONES & AUDITORÍAS STATE (DATOS REALES) ──
  const [notifications, setNotifications] = useState<AuditNotification[]>([]);

  const [selectedNotificationForModal, setSelectedNotificationForModal] = useState<AuditNotification | null>(null);

  // Sync with API leads, courses, and resources
  const fetchAllData = () => {
    // 1. Leads
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads && Array.isArray(data.leads) && data.leads.length > 0) {
          const audits = data.leads.filter((l: any) => !l.fullName?.startsWith('Lead Toolkit'));
          if (audits.length > 0) {
            setNotifications(audits);
          }
          const toolkitLeads = data.leads
            .filter((l: any) => l.fullName?.startsWith('Lead Toolkit'))
            .map((l: any, idx: number) => ({
              id: idx + 1,
              email: l.corporateEmail,
              resource: l.serviceNeeded || 'Toolkit Asset',
              date: l.createdAt?.split(',')[0] || 'Hoy',
              source: l.source || 'Academy',
              status: l.status || 'Enviado Secuencia Email',
            }));
          if (toolkitLeads.length > 0) {
            setLeadsList(toolkitLeads);
          }
        }
      })
      .catch((e) => console.warn('API leads fetch fallback', e));

    // 2. Cursos
    fetch('/api/courses', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && Array.isArray(data.courses)) {
          setCoursesList(
            data.courses.map((c: any) => ({
              id: c.id,
              title: c.title,
              badge: c.badge || 'Lo más vendido',
              level: c.level || 'Intermedio',
              price: c.price_display || `$${c.price_usd || 97} USD`,
              originalPrice: c.original_price || `$${(Number(c.price_usd) || 97) * 2} USD`,
              discount: c.discount || '50% OFF',
              rating: Number(c.rating) || 4.9,
              reviewsCount: Number(c.reviews_count) || 0,
              duration: c.duration || '4 Semanas',
              tagline: c.tagline || '',
              description: c.description || '',
              previewImage: c.preview_image || c.previewImage,
              stripeColor: c.stripe_color || 'from-[#1DACE3] via-[#0284c7] to-[#4f46e5]',
              tools: Array.isArray(c.tools) ? c.tools : [],
              modulesCount: c.modules?.length || 4,
              studentsEnrolled: c.students_enrolled || 0,
              ctaUrl: c.cta_url || c.ctaUrl || '#',
              status: c.status || 'ACTIVO',
              instructorName: c.instructor?.name || 'Julio Daza',
              instructorRole: c.instructor?.role || 'Arquitecto de Sistemas & Fundador',
              instructorAvatar: c.instructor?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
              hoursVideo: c.hours_video || '12 horas de video bajo demanda',
              articlesCount: c.articles_count || 20,
              resourcesCount: c.resources_count || 25,
              lastUpdated: c.last_updated || '8/2026',
              language: c.language || 'Español',
              outcomes: c.learning_outcomes || [],
              includes: c.course_includes || [],
              requirements: c.requirements || [],
              audience: c.target_audience || [],
              modules: (c.modules || []).map((m: any, idx: number) => ({
                id: m.id,
                week_label: m.week_label || `0${idx + 1}`,
                title: m.title || `Módulo ${idx + 1}`,
                description: m.description || '',
                video_url: m.video_url || '',
                summary: m.summary || '',
                content_text: m.content_text || '',
                prompts: Array.isArray(m.prompts) ? m.prompts : [],
                downloads: Array.isArray(m.downloads) ? m.downloads : [],
                quiz: m.quiz_data || { enabled: false, passing_score: 80, questions: [] },
              })),
            }))
          );
        }
      })
      .catch((e) => console.warn('API courses fetch fallback', e));

    // 3. Recursos
    fetch('/api/resources', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.resources && Array.isArray(data.resources)) {
          setResourcesList(
            data.resources.map((r: any) => ({
              id: r.id,
              name: r.title || r.name,
              format: r.format,
              access: r.access_type || r.access || 'GRATUITO (LEAD)',
              price: r.price_display || r.price || (r.access_type?.includes('PREMIUM') ? '$27 USD' : 'GRATIS'),
              downloads: r.downloads_count || r.downloads || 0,
              tag: r.tag,
              fileUrl: r.file_url || r.fileUrl,
              previewImage: r.preview_image || r.previewImage,
              description: r.description,
            }))
          );
        }
      })
      .catch((e) => console.warn('API resources fetch fallback', e));

    // 4. Pasarelas de Pago & Configuración
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings) {
          setPaymentSettings(data.settings);
        }
      })
      .catch((e) => console.warn('API settings fetch fallback', e));

    // 5. Alumnos Matriculados en el Campus
    fetch('/api/campus/enroll')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.enrollments)) {
          setStudentsList(data.enrollments);
        }
      })
      .catch((e) => console.warn('API students fetch fallback', e));
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ── 2. GESTOR DE CURSOS STATE & CRUD ──
  const [coursesList, setCoursesList] = useState<CourseItem[]>([
    {
      id: 'bootcamp-n8n',
      title: 'Bootcamp: Arquitectura de Pipelines con n8n & Agentes IA',
      badge: 'Lo más vendido',
      level: 'Intermedio a Avanzado',
      price: '$197 USD',
      originalPrice: '$390 USD',
      discount: '50% OFF',
      rating: 4.9,
      reviewsCount: 140,
      duration: '6 Semanas Intensivas',
      tagline: 'Aprende a desplegar infraestructura empresarial de automatización sobre servidores VPS dedicados, orquestando agentes autónomos, PostgreSQL y WhatsApp Cloud API.',
      description: 'Aprende a desplegar infraestructura empresarial de automatización sobre servidores VPS dedicados, orquestando agentes autónomos, PostgreSQL y WhatsApp Cloud API.',
      previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      stripeColor: 'from-[#1DACE3] via-[#0284c7] to-[#4f46e5]',
      tools: ['n8n Self-Hosted', 'Docker & Caddy', 'PostgreSQL', 'Meta Cloud API', 'LangChain / LLMs'],
      modulesCount: 6,
      studentsEnrolled: 0,
      ctaUrl: 'https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407',
      status: 'ACTIVO',
      instructorName: 'Julio Daza',
      instructorRole: 'Arquitecto de Sistemas & Fundador',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      hoursVideo: '24 horas de laboratorio y sesiones',
      articlesCount: 24,
      resourcesCount: 30,
      lastUpdated: '8/2026',
      language: 'Español',
      outcomes: [
        'Instalar y asegurar n8n en servidores VPS con Docker, certificados SSL y copias de seguridad automáticas.',
        'Conectar y validar Webhooks de Meta (WhatsApp, Instagram) con manejo de colas y sin caídas.',
        'Modelar bases de datos relacionales en PostgreSQL con aislamiento multi-inquilino (Row-Level Security).',
        'Construir agentes autónomos con memoria persistente y llamadas a funciones (Tool Calling) en producción.',
      ],
      includes: [
        '6 Semanas en vivo + grabaciones en HD',
        '24 Sesiones técnicas y laboratorios',
        'Acceso de por vida a plantillas y flujos',
        'Certificado oficial de finalización con código QR',
      ],
      requirements: [
        'Conocimientos básicos de computación y terminal.',
        'Cuenta en un proveedor VPS (Hetzner, DigitalOcean o similar).',
      ],
      audience: [
        'Desarrolladores y consultores de automatización.',
        'Arquitectos de software y líderes técnicos.',
      ],
      modules: [
        {
          week_label: '01',
          title: 'Módulo 01: Despliegue VPS con Docker, n8n & Caddy SSL',
          description: 'Arquitectura de infraestructura soberana, configuración de variables de entorno y optimización de concurrencia.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Aprovisionamiento de servidor Linux VPS en Hetzner/DigitalOcean, Docker Compose, volúmenes persistentes y proxy inverso Caddy con HTTPS.',
          content_text: '### Laboratorio 01: Hardening de VPS y Docker Compose\n\n1. Instalar paquetes esenciales: `sudo apt update && sudo apt install docker.io docker-compose -y`\n2. Configurar el archivo Caddyfile con tu dominio de producción.\n3. Desplegar n8n con persistencia en volumen host.',
          prompts: ['Genera un script bash de aprovisionamiento seguro para Ubuntu 24.04 con Docker, Caddy y puertos 80/443 abiertos.'],
          downloads: [
            { name: 'docker-compose-n8n-caddy.yml', type: 'Docker YAML', url: '#' },
            { name: 'Script_Setup_VPS_Ubuntu.sh', type: 'Bash Script', url: '#' },
            { name: 'Caddyfile_Production_Template.txt', type: 'Caddy Config', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Por qué es crucial vincular un volumen persistente en el contenedor de n8n?',
                options: [
                  'Para evitar que se borren los flujos y credenciales al reiniciar o actualizar la imagen Docker.',
                  'Para aumentar la velocidad de la memoria RAM del servidor.',
                  'Para poder ejecutar comandos de Windows en Linux.',
                ],
                correctIndex: 0,
                explanation: 'Los contenedores Docker son efímeros por defecto; el volumen garantiza que los flujos y credenciales se conserven.',
              },
              {
                question: '¿Qué ventaja clave ofrece Caddy frente a Nginx tradicional en este despliegue?',
                options: [
                  'Genera y renueva certificados SSL Let\'s Encrypt automáticamente sin necesidad de certbot.',
                  'Es un lenguaje de programación compilado.',
                  'No requiere abrir el puerto 443.',
                ],
                correctIndex: 0,
                explanation: 'Caddy incluye gestión automática de certificados HTTPS por defecto con solo declarar el dominio en el Caddyfile.',
              },
            ],
          },
        },
        {
          week_label: '02',
          title: 'Módulo 02: Meta Cloud API & Webhooks Reversos de WhatsApp',
          description: 'Ingeniería de conexión oficial con WhatsApp Cloud API y recepción de eventos transaccionales.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Handshake de verificación de webhooks, manejo de estados de mensajes, envío de plantillas interactivas y botones.',
          content_text: '### Laboratorio 02: Handshake con Meta Developers\n\nConfigura el nodo Code en n8n para responder con hub.challenge a las peticiones GET de Meta.',
          prompts: ['Construye un nodo Code en JavaScript que extraiga hub.challenge de los query parameters de Meta.'],
          downloads: [
            { name: 'Meta_Webhook_Handshake_Node.json', type: 'n8n Sub-Flow', url: '#' },
            { name: 'Parser_WhatsApp_Payload_Node.json', type: 'n8n Node Code', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Cuál es el código de respuesta HTTP requerido por Meta para validar un Webhook?',
                options: ['HTTP 200 con el hub.challenge en el cuerpo', 'HTTP 301 Redirect', 'HTTP 500 Error'],
                correctIndex: 0,
                explanation: 'Meta exige que el endpoint devuelva exactamente el valor de hub.challenge con status 200.',
              },
              {
                question: '¿Por qué es fundamental filtrar los eventos de tipo \'statuses\' en el webhook de WhatsApp?',
                options: [
                  'Para evitar que el flujo se dispare innecesariamente cuando un mensaje solo cambia de estado a \'entregado\' o \'leído\'.',
                  'Para cobrarle a Meta por cada mensaje.',
                  'Porque los statuses bloquean la base de datos.',
                ],
                correctIndex: 0,
                explanation: 'Meta notifica cada cambio de estado; si no se filtran, tu flujo respondería a lecturas en vez de a mensajes reales.',
              },
            ],
          },
        },
        {
          week_label: '03',
          title: 'Módulo 03: Bases de Datos Relacionales & Row-Level Security (PostgreSQL / Supabase)',
          description: 'Persistencia de leads, pedidos y catálogos en PostgreSQL y Supabase con políticas RLS.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Modelado relacional para operaciones, consultas SQL optimizadas en nodos n8n, aislamiento de datos multi-tenant.',
          content_text: '### Laboratorio 03: Políticas RLS en Supabase y Consultas n8n\n\n1. Crear tablas normalizadas con claves foráneas.\n2. Parametrizar nodos Postgres en n8n con sentencias Upsert.\n3. Habilitar RLS y políticas por tenant.',
          prompts: ['Escribe un script SQL completo para PostgreSQL / Supabase que cree las tablas normalizadas con RLS...'],
          downloads: [
            { name: 'Esquema_SQL_Relacional_Pipeline.sql', type: 'SQL Script', url: '#' },
            { name: 'Politicas_RLS_MultiTenant_Template.sql', type: 'SQL Script', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Para qué se utiliza la sentencia SQL \'ON CONFLICT DO UPDATE\' (Upsert) al procesar leads de WhatsApp?',
                options: [
                  'Para insertar el contacto si es nuevo o actualizar su última hora de conexión si ya existía en la base de datos sin generar un error de duplicado.',
                  'Para borrar la base de datos cada 24 horas.',
                  'Para apagar el servidor si el cliente no responde.',
                ],
                correctIndex: 0,
                explanation: 'El Upsert evita duplicados y errores de clave única garantizando la integridad referencial de los contactos.',
              },
              {
                question: '¿Qué función cumple Row-Level Security (RLS) en PostgreSQL/Supabase?',
                options: [
                  'Aislar los registros a nivel de fila para que un cliente o inquilino solo pueda acceder a sus propios datos.',
                  'Hacer que las tablas tengan filas de diferentes colores.',
                  'Aumentar el tamaño del disco duro del servidor.',
                ],
                correctIndex: 0,
                explanation: 'RLS restringe qué filas puede consultar o modificar un usuario específico según reglas de autorización inquebrantables en el motor de base de datos.',
              },
            ],
          },
        },
        {
          week_label: '04',
          title: 'Módulo 04: Orquestación de Agentes Autónomos LLM en n8n',
          description: 'Integración de modelos Gemini y Claude como cerebros decisorios conectados a bases de datos.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Configuración de nodos AI Agent en n8n, estructuración de herramientas (Tools & Functions), mitigación de alucinaciones y guardrails.',
          content_text: '### Laboratorio 04: Agente con Tool Calling en n8n\n\n1. Configurar AI Agent con Claude 3.5 Sonnet y memoria PostgreSQL.\n2. Conectar Custom Tools para consultas SQL y pasarelas.\n3. Implementar RAG documental con pgvector.',
          prompts: ['Configura el System Prompt para un AI Agent en n8n conectado a herramientas de gestión operativa...'],
          downloads: [
            { name: 'Flujo_AI_Agent_Con_Memoria_Postgres.json', type: 'n8n Workflow', url: '#' },
            { name: 'Custom_Tool_Consulta_Postgres.json', type: 'n8n Tool', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Cómo decide un AI Agent en n8n cuándo debe ejecutar una herramienta (Tool Calling)?',
                options: [
                  'El modelo analiza la intención del usuario y la descripción semántica de cada herramienta disponible para elegir cuál invocar con los parámetros adecuados.',
                  'Ejecuta todas las herramientas a la vez al azar.',
                  'El programador debe escribir un IF manual para cada palabra del diccionario.',
                ],
                correctIndex: 0,
                explanation: 'El LLM lee las descripciones y esquemas de parámetros de las herramientas disponibles y decide autónomamente si necesita invocar una para responder al usuario.',
              },
              {
                question: '¿Qué ventaja ofrece la arquitectura RAG frente a meter todo el texto en el prompt de sistema?',
                options: [
                  'Reduce el consumo de tokens, elimina límites de contexto y permite consultar miles de páginas de manuales con respuestas precisas basadas en fuentes reales.',
                  'Hace que la IA invente datos más creativos.',
                  'Aumenta la factura de la API sin beneficios.',
                ],
                correctIndex: 0,
                explanation: 'RAG recupera solo los fragmentos relevantes para cada pregunta, reduciendo costos de tokens y garantizando respuestas fundamentadas en documentos reales.',
              },
            ],
          },
        },
        {
          week_label: '05',
          title: 'Módulo 05: Telemetría, Sub-Flujos de Error & Alertas 24/7 en Telegram',
          description: 'Construcción de bots supervisores en Telegram para detección de fallos y cuellos de botella.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Manejo de errores por sub-flujos, telemetría de tiempo de ejecución y memoria, protocolos de contingencia en vivo.',
          content_text: '### Laboratorio 05: Bot de Alertas Críticas y Queue Mode\n\n1. Vincular Error Trigger en cada flujo de producción.\n2. Formatear alertas enriquecidas con enlaces de depuración en Telegram.\n3. Configurar Redis y workers para Queue Mode.',
          prompts: ['Escribe un flujo de error en n8n que reciba el payload de \'Error Trigger\' y formatee un mensaje estructurado...'],
          downloads: [
            { name: 'Workflow_Error_Handler_Maestro.json', type: 'n8n Workflow', url: '#' },
            { name: 'Telegram_Alert_Bot_Template.json', type: 'n8n Workflow', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Qué ventaja ofrece vincular un \'Error Workflow\' en la configuración de flujos en n8n?',
                options: [
                  'Captura cualquier falla o caída de nodos en producción y dispara alertas automáticas en Telegram con el enlace directo para depuración inmediata.',
                  'Hace que los errores desaparezcan por arte de magia.',
                  'Borra el servidor para que nadie se entere del fallo.',
                ],
                correctIndex: 0,
                explanation: 'El Error Workflow garantiza observabilidad total, notificando al equipo técnico al instante con el contexto exacto de la falla.',
              },
              {
                question: '¿Cuándo es necesario configurar n8n en \'Queue Mode\' con Redis?',
                options: [
                  'Cuando el volumen de ejecuciones concurrentes crece y se necesita distribuir la carga entre múltiples workers paralelos para no saturar la RAM.',
                  'Cuando solo se tiene 1 flujo simple al día.',
                  'Para poder instalar juegos en el servidor.',
                ],
                correctIndex: 0,
                explanation: 'Queue Mode permite desacoplar la recepción de webhooks de la ejecución pesada, escalando horizontalmente con workers dedicados.',
              },
            ],
          },
        },
        {
          week_label: '06',
          title: 'Módulo 06: Proyecto Final, Auditoría de Infraestructura y Certificación',
          description: 'Defensa técnica de un pipeline completo en producción y emisión del diploma con ID único.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Revisión de arquitectura uno a uno, pruebas de estrés y carga, entrega de credencial verificable.',
          content_text: '### Proyecto Final de Graduación y Emisión de Credencial\n\n1. Hardening final y backups automáticos a S3/R2.\n2. Verificación E2E de WhatsApp -> IA -> Postgres -> Telegram.\n3. Emisión automática de diploma verificable.',
          prompts: ['Genera una lista de verificación pre-despliegue para sistemas agénticos en producción...'],
          downloads: [
            { name: 'Script_Backup_Postgres_S3.sh', type: 'Bash Script', url: '#' },
            { name: 'Pipeline_Empresarial_E2E_Completo.json', type: 'n8n Workflow', url: '#' },
            { name: 'Guia_Proyecto_Final_Bootcamp_n8n.pdf', type: 'PDF', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Cuál es el principal valor de contar con una infraestructura de automatización propia (self-hosted) frente a herramientas SaaS?',
                options: [
                  'Control total de los datos, costos fijos predecibles sin importar el volumen de operaciones y libertad total para conectar modelos de IA y bases de datos.',
                  'Tener que pagar más facturas cada mes.',
                  'No poder conectar aplicaciones web.',
                ],
                correctIndex: 0,
                explanation: 'El autoalojamiento (self-hosting) otorga soberanía tecnológica absoluta, privacidad para datos sensibles y escalabilidad económica ilimitada.',
              },
              {
                question: '¿Por qué es crucial implementar copias de seguridad automáticas en un bucket externo (S3/R2)?',
                options: [
                  'Para garantizar la recuperación completa de flujos, credenciales y bases de datos ante cualquier desastre o fallo de hardware en el VPS.',
                  'Para ocupar espacio en internet.',
                  'Para borrar los archivos del cliente.',
                ],
                correctIndex: 0,
                explanation: 'Los backups externos garantizan continuidad del negocio y resiliencia total frente a caídas o incidencias en el proveedor de servidores.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'ia-restaurantes',
      title: 'Masterclass: Automatización Agéntica con IA para Restaurantes',
      badge: 'OPERATIVO & ESTRATÉGICO',
      level: 'Operativo & Estratégico',
      price: '$97 USD',
      originalPrice: '$197 USD',
      discount: '50% OFF',
      rating: 4.8,
      reviewsCount: 112,
      duration: '5 Módulos Intensivos • Acceso de por vida',
      tagline: 'Aprende a implementar agentes inteligentes que atienden por WhatsApp, capturan pedidos, controlan recetas y calculan escandallos sin alucinaciones.',
      description: 'Aprende a implementar agentes inteligentes que atienden comensales por WhatsApp, toman reservas directas, controlan mermas de cocina, calculan escandallos y automatizan órdenes de compras a proveedores.',
      previewImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      stripeColor: 'from-[#EA0C7F] via-[#971B8D] to-[#6366f1]',
      tools: ['WhatsApp Cloud API', 'Gemini Pro', 'Airtable', 'Escandallos XLSX', 'KDS Prompts', 'Zero-Hallucination Guardrails', 'HACCP Digital'],
      modulesCount: 5,
      studentsEnrolled: 0,
      ctaUrl: 'https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407',
      status: 'ACTIVO',
      instructorName: 'Julio Daza',
      instructorRole: 'Consultor de Inteligencia Operativa',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      hoursVideo: '12 horas de contenido práctico',
      articlesCount: 15,
      resourcesCount: 18,
      lastUpdated: '8/2026',
      language: 'Español',
      outcomes: [
        'Parametrizar prompts con rigor físico y matemático para que la IA nunca invente precios ni recetas.',
        'Configurar un asistente de WhatsApp 24/7 con catálogo dinámico de platos, horarios y alérgenos.',
        'Integrar matrices de costos crudo/cocido en tiempo real y optimizar la ingeniería de menú (BCG).',
        'Blindar el sistema con guardrails de precios y protocolo de derivación a humanos para casos críticos.',
        'Automatizar la estimación de demanda semanal y generación de órdenes de compra a proveedores.',
      ],
      includes: [
        '5 Módulos intensivos con metodología paso a paso',
        '15 Lecciones con blueprints, prompts y descargables',
        'Plantilla maestra de escandallos y matriz de Food Cost en Excel',
        'System Prompts oficiales y flujos de conversación de WhatsApp',
        'Quizes evaluativos con explicaciones formativas por módulo',
        'Certificado oficial con verificación digital y código QR único',
      ],
      requirements: [
        'Conexión a Internet y computadora o tableta.',
        'Tener un restaurante, bar, cafetería o negocio gastronómico (o clientes del sector a quienes asesorar).',
        'No se requieren conocimientos previos de programación.',
      ],
      audience: [
        'Dueños de restaurantes, cafeterías, bares y dark kitchens.',
        'Gerentes de operaciones, directores de A&B y chefs ejecutivos.',
        'Emprendedores gastronómicos y consultores que buscan optimizar la rentabilidad del sector.',
      ],
      modules: [
        {
          week_label: '01',
          title: 'Módulo 01: Fundamentos de IA Gastronómica & Control de Food Cost',
          description: 'Diagnóstico de fugas operativas, matriz BCG de menú y escandallos con factor de rendimiento crudo/cocido.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Descubre cómo erradicar los cuellos de botella del restaurante: mensajes sin responder, descontrol de mermas y comisiones de delivery.',
          content_text: '### Guía 01: Auditoría de Food Cost y Fugas de Margen\n\n1. Mapear compras semanales vs comandas emitidas en el POS.\n2. Aplicar factor de merma por ingrediente limpio.\n3. Aislar platos con margen bruto menor al 68% y aplicar neuromarketing sensorial.',
          prompts: ['Actúa como un Consultor Senior de Operaciones Gastronómicas. Realiza una auditoría rápida de rentabilidad para mi restaurante...'],
          downloads: [
            { name: 'Guia_Fundamentos_IA_Gastronomica_2026.pdf', type: 'PDF', url: '#' },
            { name: 'Calculadora_Ahorro_FoodCost_Objetivo.xlsx', type: 'Excel', url: '#' },
            { name: 'Plantilla_Escandallos_Parametrizada_2026.xlsx', type: 'Excel', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Qué es el \'Factor de Rendimiento\' en un escandallo gastronómico?',
                options: [
                  'La relación matemática entre el peso neto aprovechable de un insumo y su peso bruto de compra tras aplicar las mermas.',
                  'La velocidad a la que el mozo entrega el plato en la mesa.',
                  'El número de seguidores que tiene el restaurante en Instagram.',
                ],
                correctIndex: 0,
                explanation: 'El factor de rendimiento mide qué porcentaje real del insumo pagado llega al plato final, permitiendo calcular el costo exacto por porción.',
              },
              {
                question: 'En la Matriz BCG de Menú, ¿qué acción estratégica se recomienda para un plato \'Rompecabezas\' (alta rentabilidad pero baja venta)?',
                options: [
                  'Mejorar su visibilidad en carta y reescribir su descripción con neuromarketing sensorial para estimular su pedido.',
                  'Eliminarlo de la carta inmediatamente sin consultar a nadie.',
                  'Duplicarle el precio para que nadie lo compre.',
                ],
                correctIndex: 0,
                explanation: 'Dado que el plato tiene un excelente margen de ganancia, el objetivo es hacerlo más atractivo y visible para que más comensales lo elijan.',
              },
            ],
          },
        },
        {
          week_label: '02',
          title: 'Módulo 02: Agente de Ventas & Reservas 24/7 en WhatsApp',
          description: 'Configuración del System Prompt maestro, gestión de alérgenos y estrategias de upselling gastronómico.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Construye un anfitrión virtual con voz de marca cálida que atiende consultas, valida intolerancias y eleva el ticket promedio.',
          content_text: '### Guía 02: Flujo Conversacional y Manejo de Alérgenos\n\n1. Definir voz de marca y catálogo de platos insignia.\n2. Configurar la matriz de 14 alérgenos reglamentarios.\n3. Implementar reglas de maridaje y venta sugerida contextual.',
          prompts: ['Actúa como un Diseñador de Agentes de IA para Hostelería. Construye el System Prompt completo para el asistente de WhatsApp...'],
          downloads: [
            { name: 'System_Prompt_Maestro_Restaurante.txt', type: 'TXT', url: '#' },
            { name: 'Matriz_Oficial_14_Alergenos_Reglamentarios.pdf', type: 'PDF', url: '#' },
            { name: 'Guia_Upselling_Gastronomico_IA.pdf', type: 'PDF', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Cómo debe actuar el agente de IA si un cliente consulta por un plato apto para celíacos severos y no hay certeza de contaminación cruzada en cocina?',
                options: [
                  'Advertir transparentemente sobre el riesgo de trazas y derivar la consulta al encargado de cocina para garantizar la seguridad del cliente.',
                  'Decirle que sí a todo para no perder la venta.',
                  'Inventar que todos los platos son 100% libres de gluten.',
                ],
                correctIndex: 0,
                explanation: 'La seguridad alimentaria es inviolable; ante riesgo de contaminación cruzada se debe informar con total transparencia.',
              },
              {
                question: '¿Cuál es la clave para un Upselling efectivo por WhatsApp?',
                options: [
                  'Hacer sugerencias contextuales y personalizadas que complementen el plato elegido por el comensal sin resultar invasivo.',
                  'Enviar la lista de los 50 platos de la carta en un solo mensaje gigante.',
                  'Obligar al cliente a comprar un postre.',
                ],
                correctIndex: 0,
                explanation: 'El upselling efectivo aporta valor real al comensal recomendando combinaciones armoniosas y relevantes.',
              },
            ],
          },
        },
        {
          week_label: '03',
          title: 'Módulo 03: Blindaje del Sistema: Guardrails, Anti-Alucinaciones y Seguridad',
          description: 'Reglas inquebrantables de precios, detección de fricciones y derivación a gerencia humana (Human-in-the-Loop).',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Parametriza límites estrictos para que la IA nunca invente platos ni descuentos falsos y transfiera quejas al instante.',
          content_text: '### Guía 03: Guardrails y Seguridad Conversacional\n\n1. Regla de inmutabilidad de precios oficiales.\n2. Filtros de jailbreak defense contra inyección de prompts.\n3. Disparadores de alerta para eventos corporativos y quejas.',
          prompts: ['Actúa como un Ingeniero de Seguridad de IA. Redacta el bloque de \'GUARDRAILS & REGLAS INQUEBRANTABLES\'...'],
          downloads: [
            { name: 'Guardrails_Seguridad_Agentes_Hosteleria.json', type: 'JSON', url: '#' },
            { name: 'Protocolo_Zero_Alucinaciones_Gastronomia.pdf', type: 'PDF', url: '#' },
            { name: 'Scripts_Atencion_Gerencial_WhatsApp.docx', type: 'Word', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Cuál es la función primordial de los Guardrails de seguridad en un agente de restaurante?',
                options: [
                  'Impedir que el modelo alucine, conceda descuentos no autorizados o acepte reservas fuera de las políticas del local.',
                  'Hacer que el agente hable en verso rimado.',
                  'Desconectar el internet del restaurante por la noche.',
                ],
                correctIndex: 0,
                explanation: 'Los guardrails establecen límites inviolables para que la IA opere con total rigor financiero y operativo.',
              },
              {
                question: '¿Qué debe ocurrir cuando un cliente expresa una queja o frustración en el chat de WhatsApp?',
                options: [
                  'El sistema debe pausar al agente y transferir la conversación de inmediato a un supervisor humano con una notificación de alerta.',
                  'El agente debe discutir con el cliente y bloquear su número.',
                  'Ignorar el mensaje y esperar a que el cliente se calme solo.',
                ],
                correctIndex: 0,
                explanation: 'Las quejas requieren empatía y resolución humana inmediata para proteger la reputación y fidelidad del comensal.',
              },
            ],
          },
        },
        {
          week_label: '04',
          title: 'Módulo 04: Automatización de Compras, Proveedores y Operaciones de Cocina',
          description: 'Pronóstico de demanda según clima y días, órdenes automáticas a proveedores y estandarización de SOPs/HACCP.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Automatiza la reposición de materia prima perecedera y estandariza los procesos de cocina para asegurar calidad idéntica.',
          content_text: '### Guía 04: Compras Predictivas y Estandarización de Cocina\n\n1. Proyectar demanda según históricos y factores climáticos.\n2. Calcular faltantes contra stock de seguridad y generar órdenes de compra.\n3. Implementar checklists digitales de apertura, cierre y control HACCP.',
          prompts: ['Eres el Asistente de Compras de mi restaurante. Compara mi inventario actual contra el Stock Mínimo de Seguridad...'],
          downloads: [
            { name: 'Modelo_Estimacion_Demanda_Restaurantes.xlsx', type: 'Excel', url: '#' },
            { name: 'Formato_Ordenes_Compra_Automatizadas.docx', type: 'Word', url: '#' },
            { name: 'Checklist_HACCP_Inocuidad_Digital.pdf', type: 'PDF', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Cuál es el principal beneficio de cruzar pronósticos de clima y eventos locales con la planificación de compras en cocina?',
                options: [
                  'Ajustar con precisión las cantidades de insumos perecederos para evitar tanto mermas por sobrecompra como roturas de stock en salón.',
                  'Saber si los cocineros necesitan llevar paraguas.',
                  'Pagarle menos dinero a los proveedores.',
                ],
                correctIndex: 0,
                explanation: 'El pronóstico de demanda permite optimizar el capital de trabajo comprando solo la materia prima que realmente se va a transformar y vender.',
              },
              {
                question: '¿Por qué son indispensables los SOPs (Procedimientos Operativos Estándar) en la cocina de un restaurante?',
                options: [
                  'Porque garantizan que la calidad, porción y sabor del plato sean exactamente iguales sin importar quién esté de turno en la brigada.',
                  'Para llenar carpetas de papel que nadie lee.',
                  'Para prohibir el uso de cuchillos en cocina.',
                ],
                correctIndex: 0,
                explanation: 'Los SOPs aseguran consistencia operativa, facilitan el entrenamiento de nuevo personal y reducen errores y desperdicios.',
              },
            ],
          },
        },
        {
          week_label: '05',
          title: 'Módulo 05: Puesta en Marcha en el Negocio Real, KPIs y Proyecto de Certificación',
          description: 'Plan de despliegue en 3 fases, cuadro de mando financiero (EBITDA, Food Cost %) y proyecto de certificación oficial.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Lanza el sistema en tu restaurante sin fricciones con el personal, mide el retorno de inversión y obtén tu Diploma Oficial.',
          content_text: '### Guía 05: Despliegue, Métricas de Negocio y Certificación\n\n1. Fase 1 Sandbox interno con el equipo de sala.\n2. Fase 2 Horario valle y calibración.\n3. Fase 3 Operación plena y cuadro de mando financiero.\n4. Entrega de proyecto final y emisión del certificado oficial.',
          prompts: ['Actúa como el Asesor Financiero del restaurante. Genera un reporte ejecutivo de Retorno de Inversión (ROI) mensual...'],
          downloads: [
            { name: 'Roadmap_Despliegue_30_Dias_Restaurantes.pdf', type: 'PDF', url: '#' },
            { name: 'Dashboard_Financiero_EBITDA_Restaurantes.xlsx', type: 'Excel', url: '#' },
            { name: 'Guia_Proyecto_Final_Certificacion_Restaurantes.pdf', type: 'PDF', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Por qué es crucial implementar una fase de prueba interna (\'Sandbox\') con el personal antes de lanzar el agente al público general?',
                options: [
                  'Para que el equipo ponga a prueba al asistente con casos reales, detecte posibles dudas y se familiarice con el sistema sin riesgo con clientes reales.',
                  'Para que los empleados pierdan el tiempo jugando.',
                  'Para cambiar la contraseña del WiFi del local.',
                ],
                correctIndex: 0,
                explanation: 'El sandbox interno permite calibrar el comportamiento del agente y lograr que el equipo de sala se sienta seguro y aliado de la tecnología.',
              },
              {
                question: '¿Cómo impacta la automatización inteligente en la valoración y rentabilidad (EBITDA) de un restaurante?',
                options: [
                  'Incrementa el margen neto al reducir desperdicios de materia prima, captura ventas directas sin comisiones y eleva el ticket medio de consumo.',
                  'Reduce los clientes porque nadie quiere comer en restaurantes modernos.',
                  'Hace que la comida se enfríe más rápido.',
                ],
                correctIndex: 0,
                explanation: 'El control milimétrico de costos y la captura directa de pedidos maximizan el flujo de caja y la salud financiera del negocio.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'crecimiento-aeo',
      title: 'Dominio Local: SEO, AEO & Visibilidad en Motores de IA',
      badge: 'Lo más vendido',
      level: 'Marketing & Adquisición',
      price: '$67 USD',
      originalPrice: '$134 USD',
      discount: '50% OFF',
      rating: 4.9,
      reviewsCount: 88,
      duration: '6 Módulos Prácticos • Acceso de por vida',
      tagline: 'Posiciona tu marca en Google Maps y sé la primera recomendación que ChatGPT, Gemini y Perplexity sugieren a clientes potenciales.',
      description: 'Aprende el sistema paso a paso para liderar las búsquedas en Google Maps y convertirte en la opción recomendada por motores de Inteligencia Artificial (ChatGPT, Gemini y Perplexity) captando clientes locales a coste de adquisición cero.',
      previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      stripeColor: 'from-[#FEAD2B] via-[#ea580c] to-[#e11d48]',
      tools: ['Google Business Profile', 'Microdatos JSON-LD', 'ChatGPT Search', 'Schema.org', 'Perplexity API', 'Apple Business', 'NFC & QR'],
      modulesCount: 6,
      studentsEnrolled: 0,
      ctaUrl: 'https://buy.stripe.com/test_crecimiento_aeo',
      status: 'ACTIVO',
      instructorName: 'Julio Daza',
      instructorRole: 'Especialista en AEO & Crecimiento',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      hoursVideo: '6 Módulos • 18 Lecciones Prácticas',
      articlesCount: 18,
      resourcesCount: 24,
      lastUpdated: '8/2026',
      language: 'Español',
      outcomes: [
        'Posicionar tu negocio en el codiciado Top 3 de Google Maps en tu ciudad o zona.',
        'Implementar microdatos JSON-LD (Schema.org) sin programar para que las IAs entiendan tus horarios, precios y servicios.',
        'Lograr que ChatGPT, Perplexity y Gemini citen y recomienden tu marca a clientes potenciales.',
        'Automatizar un bucle de reseñas 5 estrellas con tarjetas NFC, códigos QR y filtros inteligentes por WhatsApp.',
        'Medir rankings con mapas de calor Geo-Grid y expandir tu radio de clientes a coste de publicidad CERO.',
      ],
      includes: [
        '6 Módulos prácticos intensivos paso a paso',
        '18 Lecciones con blueprints y esquemas listos para usar',
        'Plantillas oficiales de Schema JSON-LD y prompts de auditoría',
        'Quizes interactivos de autoevaluación por módulo',
        'Certificado oficial de finalización con código QR de verificación',
      ],
      requirements: [
        'Un negocio propio, local comercial o servicio profesional (o clientes a quienes brindar el servicio).',
        'Acceso a una computadora con conexión a Internet (no se requiere experiencia técnica previa).',
      ],
      audience: [
        'Dueños de negocios, comercios, clínicas, restaurantes y servicios locales.',
        'Emprendedores y profesionales independientes que buscan más clientes sin gastar en anuncios.',
        'Consultores de marketing y agencias que desean ofrecer servicios de SEO Local y AEO de vanguardia.',
      ],
      modules: [
        {
          week_label: '01',
          title: 'Módulo 01: Fundamentos de la Visibilidad en la Era de la IA (SEO + AEO + GEO)',
          description: 'Cómo buscan tus clientes hoy, el Grafo de Conocimiento y diagnóstico de visibilidad de tu marca frente a competidores.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Diferencias técnicas entre Google tradicional, AI Overviews, Perplexity y ChatGPT Search. Mapeo de entidades semánticas y auditoría rápida.',
          content_text: '### Módulo 01: Auditoría y Entidades Semánticas\n\n1. Comprender la búsqueda generativa (RAG) vs palabras clave tradicionales.\n2. Mapear tu negocio como una Entidad única en el Google Knowledge Graph.\n3. Ejecutar la auditoría de Share of Voice en Perplexity y ChatGPT Search.',
          prompts: [
            'Actúa como un Auditor Senior de SEO Local y Motores de IA. Realiza un diagnóstico de presencia digital para mi negocio...',
            'Eres un Arquitecto de Datos Semánticos para Google Knowledge Graph. Genera un documento de definición de Entidad...',
          ],
          downloads: [
            { name: 'Guia_Comparativa_Motores_Busqueda_IA_2026.pdf', type: 'PDF', url: '#' },
            { name: 'Checklist_Diagnostico_Inicial_Presencia.xlsx', type: 'Excel', url: '#' },
            { name: 'Plantilla_Mapeo_Entidades_Semanticas.docx', type: 'Word', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Cuál es la diferencia fundamental entre el SEO clásico y la optimización para motores de IA (AEO / GEO)?',
                options: [
                  'El SEO tradicional busca posicionar enlaces por palabras clave; el AEO/GEO busca que la IA entienda tu negocio como una entidad confiable y te cite como la mejor respuesta directa.',
                  'El AEO solo funciona si pagas anuncios en Google Ads.',
                  'No hay ninguna diferencia, ambos usan únicamente metaetiquetas HTML.',
                ],
                correctIndex: 0,
                explanation: 'Los modelos de IA procesan lenguaje natural y buscan entidades estructuradas y verificadas para sintetizar recomendaciones personalizadas.',
              },
            ],
          },
        },
        {
          week_label: '02',
          title: 'Módulo 02: Optimización Maestra de Google Business Profile & Citaciones 360',
          description: 'Configuración estratégica de tu ficha de Google Maps, geotagging de fotos, Google Posts y sincronización con Apple Maps y Bing.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Selección de categoría principal, atributos de alta conversión, metadatos EXIF en fotografías y consistencia NAP en directorios.',
          content_text: '### Módulo 02: Google Business Profile y Consistencia NAP\n\n1. Configurar la categoría principal y secundarias con máximo peso algorítmico.\n2. Geotagging de fotografías con coordenadas GPS reales.\n3. Reclamar y sincronizar Apple Business Connect y Bing Places.',
          prompts: [
            'Actúa como un Copywriter Especialista en Fichas de Google Business. Redacta una descripción de 750 caracteres para mi negocio...',
            'Crea un calendario de 4 publicaciones para Google Business Profile para el próximo mes...',
          ],
          downloads: [
            { name: 'Guia_Categorias_Estrategicas_Google_Business.pdf', type: 'PDF', url: '#' },
            { name: 'Calendario_Publicaciones_Google_Maps.xlsx', type: 'Excel', url: '#' },
            { name: 'Directorio_Top_50_Citaciones_Locales.xlsx', type: 'Excel', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Cuál es el factor individual con mayor peso para posicionar en el Top 3 del mapa de Google?',
                options: [
                  'Elegir con precisión la Categoría Principal correcta en Google Business Profile.',
                  'Poner el número de teléfono en mayúsculas.',
                  'Crear 10 perfiles duplicados en la misma dirección.',
                ],
                correctIndex: 0,
                explanation: 'La Categoría Primaria le indica al algoritmo la naturaleza exacta de tu servicio y define las búsquedas en las que tu ficha tiene prioridad de aparición.',
              },
            ],
          },
        },
        {
          week_label: '03',
          title: 'Módulo 03: Arquitectura Técnica On-Page, Microdatos JSON-LD & RAG Readiness',
          description: 'Implementación de Schema.org LocalBusiness, páginas de aterrizaje hiperlocales por barrio y tablas de precios legibles para IA.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'El DNI digital de tu web en JSON-LD, landing pages de alta conversión por zona geográfica y marcado de Schema FAQPage.',
          content_text: '### Módulo 03: Microdatos JSON-LD y Páginas Hiperlocales\n\n1. Generar código Schema.org validado para LocalBusiness.\n2. Estructurar landing pages por barrio o ciudad sin contenido duplicado.\n3. Implementar acordeones de preguntas frecuentes con Schema FAQPage.',
          prompts: [
            'Actúa como un Ingeniero de Datos Estructurados Schema.org. Genera un script JSON-LD completo y validado para LocalBusiness...',
            'Redacta el contenido de una Landing Page Hiperlocal para mi negocio enfocada en el barrio [Nombre]...',
          ],
          downloads: [
            { name: 'Schema_LocalBusiness_Maestro_Template.json', type: 'JSON Schema', url: '#' },
            { name: 'Estructura_Landing_Local_Alta_Conversion.docx', type: 'Word', url: '#' },
            { name: 'Plantilla_Schema_FAQPage_Listo.json', type: 'JSON Schema', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Qué ventaja tiene implementar el microdato Schema \'LocalBusiness\' en formato JSON-LD en tu web?',
                options: [
                  'Le permite a Google, Perplexity y ChatGPT leer con 100% de certeza tu ubicación, horarios, teléfono y servicios sin ambigüedades.',
                  'Hace que tu página web sea gratis para siempre.',
                  'Descarga automáticamente fotos a los dispositivos de los usuarios.',
                ],
                correctIndex: 0,
                explanation: 'El código JSON-LD es el estándar internacional que los motores de búsqueda y LLMs utilizan para validar datos estructurados oficiales.',
              },
            ],
          },
        },
        {
          week_label: '04',
          title: 'Módulo 04: Optimización para Motores Generativos (GEO) & Citación en ChatGPT, Gemini y Perplexity',
          description: 'Mecánicas de citación de los LLMs, menciones de autoridad en Reddit y medios locales, y corrección de alucinaciones sobre tu negocio.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Cómo los asistentes de IA rastrean la web en tiempo real, construcción de autoridad E-E-A-T y auditoría de veracidad en modelos LLM.',
          content_text: '### Módulo 04: GEO y Autoridad en Motores de Respuesta\n\n1. Analizar las fuentes que cita Perplexity en tu sector.\n2. Estrategia de menciones orgánicas en Reddit y medios comunitarios.\n3. Protocolo para corregir datos erróneos que la IA diga sobre tu negocio.',
          prompts: [
            'Simula una búsqueda en profundidad como si fueras Perplexity Pro o ChatGPT Search para la consulta...',
            'Actúa como un Especialista en Relaciones Públicas Digitales Locales. Redacta 2 plantillas de mensaje para medios locales...',
          ],
          downloads: [
            { name: 'Mapa_Fuentes_Ingesta_Motores_IA_2026.pdf', type: 'PDF', url: '#' },
            { name: 'Plantillas_Outreach_Medios_Locales.docx', type: 'Word', url: '#' },
            { name: 'Protocolo_Correccion_Datos_IA.pdf', type: 'PDF', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿De dónde extraen los motores como ChatGPT Search y Perplexity la información para recomendar un negocio local?',
                options: [
                  'De la combinación en tiempo real de Google Maps, directorios de autoridad, webs oficiales y foros comunitarios como Reddit.',
                  'De una base de datos secreta que solo tienen los gobiernos.',
                  'De mensajes privados de WhatsApp.',
                ],
                correctIndex: 0,
                explanation: 'Los motores de respuesta rastrean la web abierta en tiempo real, cotejando múltiples fuentes públicas para verificar la reputación de cada opción.',
              },
            ],
          },
        },
        {
          week_label: '05',
          title: 'Módulo 05: Automatización de Reseñas 5 Estrellas & Embudos Directos a WhatsApp',
          description: 'Tarjetas NFC táctiles, códigos QR de reseña instantánea, filtros de quejas por WhatsApp y respuestas a reseñas asistidas por IA.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'El bucle de reseñas de fricción cero, derivación inteligente de clientes insatisfechos y generación de respuestas profesionales con palabras clave.',
          content_text: '### Módulo 05: Reputación y Conversión a WhatsApp\n\n1. Diseñar placas NFC y códigos QR directos a 5 estrellas.\n2. Implementar el embudo de derivación privada para clientes insatisfechos.\n3. Responder al 100% de las reseñas potenciando el posicionamiento.',
          prompts: [
            'Actúa como un Diseñador de Experiencia de Cliente y Redactor Estratégico. Crea 3 guiones de 2 frases para pedir reseñas...',
            'Actúa como el Gerente de Reputación Online de mi negocio. Redacta 3 respuestas personalizadas y empáticas para reseñas...',
          ],
          downloads: [
            { name: 'Plantilla_Diseno_Tarjetas_NFC_Google_Maps.pdf', type: 'PDF', url: '#' },
            { name: 'Flujo_Filtro_Satisfaccion_Cliente.png', type: 'Imagen', url: '#' },
            { name: 'Banco_50_Respuestas_Resenas_IA.docx', type: 'Word', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Por qué es crucial responder al 100% de las reseñas (positivas y negativas) en Google Maps?',
                options: [
                  'Porque Google premia a los perfiles activos y las respuestas permiten reforzar palabras clave y generar confianza en futuros clientes.',
                  'Porque si no respondes, Google borra tu cuenta bancaria.',
                  'Porque las respuestas solo las pueden leer los robots.',
                ],
                correctIndex: 0,
                explanation: 'La tasa y calidad de respuesta a reseñas es una señal directa de calidad y atención al cliente que evalúan tanto los clientes como los algoritmos.',
              },
            ],
          },
        },
        {
          week_label: '06',
          title: 'Módulo 06: Telemetría, Geo-Grid Rank Tracking y Proyecto de Certificación',
          description: 'Mapas de calor de posicionamiento por radio de kilómetros, dashboard simple de KPIs y entrega del proyecto de graduación.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Visualización de ranking con cuadrículas Geo-Grid, cálculo del ROI de llamadas y clics orgánicos, y emisión del certificado oficial.',
          content_text: '### Módulo 06: Geo-Grid Tracking y Certificación Oficial\n\n1. Mapear tu visibilidad en cuadrículas de kilómetros con Local Falcon.\n2. Medir las 5 métricas de impacto en ventas (llamadas, rutas, WhatsApp).\n3. Defender el proyecto de implementación y obtener el Diploma Oficial.',
          prompts: [
            'Analiza los siguientes resultados de mi mapa de calor Geo-Grid y diseña un plan de 30 días para expandir mi radio...',
            'Eres el Tutor Académico de Inteligencia Neuronal. Revisa los siguientes entregables de mi proyecto de certificación...',
          ],
          downloads: [
            { name: 'Guia_Interpretacion_GeoGrid_Rankings.pdf', type: 'PDF', url: '#' },
            { name: 'Dashboard_Excel_KPIs_Visibilidad_Local.xlsx', type: 'Excel', url: '#' },
            { name: 'Guia_Proyecto_Graduacion_Certificacion.pdf', type: 'PDF', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Qué indica un mapa de calor Geo-Grid con pines verdes alrededor de tu local comercial?',
                options: [
                  'Que tu negocio aparece en el Top 3 de Google Maps en esa zona y se lleva la mayoría de los clics y visitas de clientes cercanos.',
                  'Que la conexión a internet está fallando.',
                  'Que debes cerrar tu local los fines de semana.',
                ],
                correctIndex: 0,
                explanation: 'Los pines verdes indican liderazgo local absoluto en el Top 3 (Local Pack), captando la inmensa mayoría de las intenciones de compra.',
              },
            ],
          },
        },
      ],
    },
    {
      id: 'antigravity',
      title: 'Curso Completo de Google Antigravity: Crea Software y Agentes con IA',
      badge: 'LO MÁS VENDIDO // VANGUARDIA',
      level: 'Desarrollo Agéntico & Fullstack',
      price: '$97 USD',
      originalPrice: '$197 USD',
      discount: '50% OFF',
      rating: 4.9,
      reviewsCount: 96,
      duration: '6 Módulos Intensivos • Acceso de por vida',
      tagline: 'Domina el entorno de desarrollo agéntico de Google DeepMind: IDE visual, subagentes concurrentes, Skills, Hooks, Generative UI y despliegue fullstack continuo.',
      description: 'Aprende a construir aplicaciones web completas, SaaS y agentes autónomos sin fricción técnica utilizando Google Antigravity, subagentes en paralelo, Skills modulares y CI/CD en Vercel.',
      previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      stripeColor: 'from-[#EA0C7F] via-[#971B8D] to-[#1DACE3]',
      tools: ['Google Antigravity (AGY)', 'Gemini 2.0 Flash / Pro', 'Subagentes & Skills', 'Generative UI', 'Model Context Protocol (MCP)', 'Next.js 14 & Supabase', 'Git & Vercel'],
      modulesCount: 6,
      studentsEnrolled: 0,
      ctaUrl: 'https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407',
      status: 'ACTIVO',
      instructorName: 'Julio Daza',
      instructorRole: 'Arquitecto de Sistemas & Fundador',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      hoursVideo: '18 horas de clases prácticas y laboratorios',
      articlesCount: 24,
      resourcesCount: 36,
      lastUpdated: '8/2026',
      language: 'Español',
      outcomes: [
        'Planificar, programar y desplegar aplicaciones web completas con el IDE agéntico de Google DeepMind.',
        'Orquestar equipos de subagentes concurrentes para investigar, refactorizar y probar código en paralelo.',
        'Crear Skills personalizadas (SKILL.md) y Hooks de validación automática para blindar la calidad del software.',
        'Diseñar prototipos interactivos en tiempo real con Generative UI y diagramas técnicos en Mermaid.',
        'Construir y desplegar un SaaS Fullstack con autenticación, base de datos PostgreSQL y pagos en Vercel.',
      ],
      includes: [
        '6 Módulos Intensivos con 18 Lecciones Maestras',
        'Blueprints descargables, Skills y esquemas SQL listos para usar',
        'Banco de Prompts profesionales de arquitectura y refactorización',
        'Quizes interactivos por módulo con explicaciones formativas',
        'Certificado Oficial de Finalización con Código QR y validación digital',
      ],
      requirements: [
        'No se requiere experiencia previa en programación avanzada; el curso cubre desde conceptos básicos hasta arquitectura agéntica.',
        'Computadora con conexión a internet y navegador web moderno.',
      ],
      audience: [
        'Emprendedores, fundadores de startups y creadores de producto que quieren construir sus propias aplicaciones sin barreras técnicas.',
        'Desarrolladores, programadores e ingenieros que buscan acelerar su productividad x10 con ingeniería agéntica.',
        'Consultores y agencias que desean ofrecer soluciones de software asistidas por IA de última generación.',
      ],
      modules: [
        {
          week_label: '01',
          title: 'Módulo 01: Fundamentos de Antigravity, Arquitectura Agéntica & Entorno de Trabajo',
          description: 'Comprende la diferencia entre copilotos pasivos y desarrollo agéntico autónomo, configuración de workspace y reglas de proyecto persistentes.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Arquitectura del planificador agéntico, modos de ejecución (Planning Mode vs. Fast Mode) y configuración de .antigravity/rules.',
          content_text: '### Módulo 01: Fundamentos de Google Antigravity\n\n1. Arquitectura de planificación y ejecución agéntica autónoma.\n2. Configuración de workspace, permisos seguros y atajos de teclado.\n3. Implementación de reglas maestras en .antigravity/rules.',
          prompts: [
            'Actúa como un Arquitecto de Software Senior y Tutor de Antigravity. Analiza la siguiente idea de aplicación para mi negocio...',
            'Escribe un archivo de Reglas de Proyecto (.antigravity/rules/code-standards.md) profesional para mi aplicación...',
          ],
          downloads: [
            { name: 'Guia_Fundamentos_Google_Antigravity.pdf', type: 'PDF', url: '#' },
            { name: 'CheatSheet_Atajos_SlashCommands_Antigravity.pdf', type: 'PDF', url: '#' },
            { name: 'Template_Project_Rules_Maestro.md', type: 'Markdown', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Cuál es la diferencia principal entre un copiloto tradicional y el sistema agéntico de Google Antigravity?',
                options: [
                  'Antigravity planifica de forma autónoma, edita múltiples archivos coordinadamente, ejecuta comandos y verifica los resultados en tiempo real.',
                  'Los copilotos tradicionales solo funcionan en teléfonos móviles.',
                  'Antigravity no utiliza modelos de inteligencia artificial.',
                ],
                correctIndex: 0,
                explanation: 'Antigravity es un entorno agéntico completo capaz de investigar, planificar, ejecutar y auto-corregir código sin requerir constantes intervenciones manuales.',
              },
            ],
          },
        },
        {
          week_label: '02',
          title: 'Módulo 02: Orquestación de Subagentes & Delegación Concurrente',
          description: 'Delegación de tareas pesadas en paralelo con subagentes aislados, definición de roles especializados y comunicación inter-agéntica.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Invocación de subagentes (invoke_subagent), definición con define_subagent y mensajería reactiva con send_message.',
          content_text: '### Módulo 02: Orquestación de Subagentes\n\n1. Patrón Director de Proyecto vs. Subagentes Especialistas.\n2. Creación de subagentes de investigación, seguridad y base de datos.\n3. Gestión de tareas asíncronas y reactividad sin bloqueo.',
          prompts: [
            'Configura una instrucción para que el agente invoque un subagente de investigación...',
            'Escribe la definición de un subagente especializado llamado \'SQL_Optimizer\'...',
          ],
          downloads: [
            { name: 'Diagrama_Arquitectura_Subagentes.png', type: 'Imagen', url: '#' },
            { name: 'Banco_Definiciones_Subagentes_Especializados.json', type: 'JSON', url: '#' },
            { name: 'Guia_Coordinacion_Equipos_Agenticos.pdf', type: 'PDF', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Qué ventaja principal aporta el uso de Subagentes (invoke_subagent) en Antigravity?',
                options: [
                  'Permite delegar tareas pesadas de investigación y pruebas en paralelo sin saturar la memoria de contexto del agente principal.',
                  'Hace que la computadora consuma menos electricidad de la pared.',
                  'Convierte archivos TypeScript en archivos de texto sin formato.',
                ],
                correctIndex: 0,
                explanation: 'Los subagentes operan con contextos independientes, aislando la exploración y permitiendo paralelismo eficiente de tareas.',
              },
            ],
          },
        },
        {
          week_label: '03',
          title: 'Módulo 03: Custom Skills, Hooks & Conectividad Externa (MCP)',
          description: 'Creación de Skills modulares reutilizables, blindaje de calidad con Hooks pre/post ejecución e integración con servidores MCP.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Estructura SKILL.md, validadores automáticos post-edición y conexión universal con bases de datos y APIs mediante MCP.',
          content_text: '### Módulo 03: Custom Skills, Hooks y Protocolo MCP\n\n1. Creación y estructura de paquetes de conocimiento SKILL.md.\n2. Configuración de interceptores automáticos de linter y tests.\n3. Integración de servidores MCP de PostgreSQL, GitHub y APIs.',
          prompts: [
            'Escribe un archivo SKILL.md completo para una nueva habilidad llamada \'seo-geo-audit\'...',
            'Configura el archivo mcp_config.json para Antigravity con servidores PostgreSQL y GitHub...',
          ],
          downloads: [
            { name: 'Estructura_Base_Skill_Template.zip', type: 'ZIP', url: '#' },
            { name: 'Configuracion_Hooks_Produccion.json', type: 'JSON', url: '#' },
            { name: 'mcp_servers_config_template.json', type: 'JSON', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Qué ventaja ofrece el sistema de Skills (SKILL.md) frente a incluir todas las instrucciones en el prompt inicial?',
                options: [
                  'Permite empaquetar conocimientos especializados que solo se cargan en memoria cuando la tarea lo requiere, ahorrando tokens y manteniendo el contexto limpio.',
                  'Hace que el editor de código sea más pesado.',
                  'Impide que el agente use internet.',
                ],
                correctIndex: 0,
                explanation: 'Las Skills proporcionan modularidad y eficiencia extrema, activando capacidades avanzadas solo cuando son pertinentes.',
              },
            ],
          },
        },
        {
          week_label: '04',
          title: 'Módulo 04: Generative UI, Artefactos Interactivos & Navegación Web en Vivo',
          description: 'Renderizado de componentes HTML/React interactivos inline, diseño de planes y walkthroughs ejecutivos, y navegación web en tiempo real.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Prototipado a la velocidad del pensamiento con Generative UI, diagramas Mermaid y extracción RAG de documentación web actualizada.',
          content_text: '### Módulo 04: Generative UI y Artefactos\n\n1. Validación visual interactiva de componentes sin levantar servidor local.\n2. Redacción de implementation_plan.md y walkthroughs con diagramas Mermaid.\n3. Navegación en vivo para alimentar al agente con documentación sin alucinaciones.',
          prompts: [
            'Utiliza Generative UI para crear un widget interactivo de cálculo de ROI para mi SaaS...',
            'Genera un implementation_plan.md profesional para añadir autenticación OAuth con Google...',
          ],
          downloads: [
            { name: 'Catalogo_Componentes_GenerativeUI.html', type: 'HTML', url: '#' },
            { name: 'Plantilla_Implementation_Plan_Ejecutivo.md', type: 'Markdown', url: '#' },
            { name: 'Guia_Investigacion_Web_Segura.pdf', type: 'PDF', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Qué valor aporta la capacidad de \'Generative UI\' durante la fase de desarrollo?',
                options: [
                  'Permite visualizar e interactuar con componentes y prototipos en tiempo real dentro del chat antes de integrarlos al código final.',
                  'Hace que la pantalla de la computadora brille más.',
                  'Reemplaza la necesidad de tener un navegador web para siempre.',
                ],
                correctIndex: 0,
                explanation: 'Generative UI acelera el ciclo de diseño y aprobación, permitiendo validar la experiencia de usuario de forma interactiva.',
              },
            ],
          },
        },
        {
          week_label: '05',
          title: 'Módulo 05: Construcción de una Aplicación Web Fullstack de Extremo a Extremo',
          description: 'Construcción paso a paso de un SaaS real con Next.js 14, Tailwind, Supabase PostgreSQL, pagos con Stripe/LemonSqueezy y despliegue en Vercel.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'De la idea al MVP desplegado: base de datos relacional, pasarela de pagos con verificación de firma HMAC y pipeline de CI/CD.',
          content_text: '### Módulo 05: Aplicación Fullstack Desplegada\n\n1. Modelado de datos y maquetación de UI con Next.js y Tailwind.\n2. Integración de pagos con webhooks seguros y firma criptográfica.\n3. Pipeline de despliegue continuo con GitHub y Vercel en 90 segundos.',
          prompts: [
            'Construye el esquema inicial para una plataforma SaaS de gestión de membresías...',
            'Crea el Route Handler /api/webhooks/lemonsqueezy en Next.js App Router...',
          ],
          downloads: [
            { name: 'Starter_Kit_Fullstack_SaaS_Next14.zip', type: 'ZIP', url: '#' },
            { name: 'Webhook_LemonSqueezy_Stripe_Handler.ts', type: 'TypeScript', url: '#' },
            { name: 'Checklist_Despliegue_Produccion_Vercel.pdf', type: 'PDF', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Por qué es crucial validar la firma criptográfica (HMAC) en los Webhooks de pago (Stripe/LemonSqueezy)?',
                options: [
                  'Para verificar con 100% de certeza que el mensaje proviene legítimamente de la pasarela de pagos y no de un atacante intentando activar cuentas gratis.',
                  'Para que el banco no cobre comisiones de transferencia.',
                  'Para cambiar el color de la página web.',
                ],
                correctIndex: 0,
                explanation: 'La validación criptográfica de la firma del webhook es el estándar de oro de seguridad financiera para evitar ataques de suplantación.',
              },
            ],
          },
        },
        {
          week_label: '06',
          title: 'Módulo 06: Auditoría de Seguridad, Optimización de Contexto & Certificación Oficial',
          description: 'Auditoría estática de vulnerabilidades, optimización de consumo de tokens en repositorios masivos y entrega del proyecto de graduación.',
          video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
          summary: 'Decálogo de seguridad OWASP, mapas de arquitectura y emisión del Diploma Oficial con Código QR de verificación digital.',
          content_text: '### Módulo 06: Seguridad, Rendimiento y Certificación\n\n1. Análisis estático de vulnerabilidades y sanitización de inputs.\n2. Gestión eficiente de memoria y tokens en bases de código corporativas.\n3. Defensa del proyecto final y emisión del Certificado Oficial.',
          prompts: [
            'Actúa como un Auditor de Ciberseguridad OWASP. Revisa el código de mis rutas de API...',
            'Eres el Tutor Académico de Inteligencia Neuronal. Evalúa la entrega de mi proyecto final...',
          ],
          downloads: [
            { name: 'Guia_Seguridad_OWASP_Agentic_Coding.pdf', type: 'PDF', url: '#' },
            { name: 'Manual_Optimizacion_Contexto_Grandes_Codebases.pdf', type: 'PDF', url: '#' },
            { name: 'Guia_Proyecto_Final_Antigravity.pdf', type: 'PDF', url: '#' },
          ],
          quiz: {
            enabled: true,
            passing_score: 75,
            questions: [
              {
                question: '¿Cuál es la principal ventaja de utilizar Google Antigravity para el desarrollo de software frente a la programación manual tradicional?',
                options: [
                  'Multiplica la velocidad de desarrollo x10 permitiendo a emprendedores y desarrolladores planificar, construir, auditar y desplegar aplicaciones completas con soporte agéntico continuo.',
                  'Elimina la necesidad de tener computadoras para programar.',
                  'Hace que los programas funcionen sin conexión a internet en cualquier lugar.',
                ],
                correctIndex: 0,
                explanation: 'Antigravity democratiza y acelera el desarrollo de software profesional, uniendo planificación inteligente, ejecución autónoma y verificación en tiempo real.',
              },
            ],
          },
        },
      ],
    },
  ]);

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [courseFormData, setCourseFormData] = useState<Partial<CourseItem> & { modules?: CourseModuleForm[] }>({
    title: '',
    badge: 'NUEVO',
    level: 'Intermedio',
    price: '$97 USD',
    duration: '4 Semanas',
    tagline: '',
    previewImage: '',
    tools: ['OpenAI', 'WhatsApp API'],
    modulesCount: 4,
    ctaUrl: '',
    status: 'ACTIVO',
    modules: [],
  });

  const [courseModalTab, setCourseModalTab] = useState<'general' | 'modules' | 'quizes'>('general');
  const [selectedModuleQuizIndex, setSelectedModuleQuizIndex] = useState<number>(0);
  const [newOutcome, setNewOutcome] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newAudience, setNewAudience] = useState('');
  const [newInclude, setNewInclude] = useState('');

  const handleAddOutcome = () => {
    if (!newOutcome.trim()) return;
    setCourseFormData((prev) => ({
      ...prev,
      outcomes: [...(prev.outcomes || []), newOutcome.trim()],
    }));
    setNewOutcome('');
  };
  const handleRemoveOutcome = (idx: number) => {
    setCourseFormData((prev) => ({
      ...prev,
      outcomes: (prev.outcomes || []).filter((_, i) => i !== idx),
    }));
  };

  const handleAddRequirement = () => {
    if (!newRequirement.trim()) return;
    setCourseFormData((prev) => ({
      ...prev,
      requirements: [...(prev.requirements || []), newRequirement.trim()],
    }));
    setNewRequirement('');
  };
  const handleRemoveRequirement = (idx: number) => {
    setCourseFormData((prev) => ({
      ...prev,
      requirements: (prev.requirements || []).filter((_, i) => i !== idx),
    }));
  };

  const handleAddAudience = () => {
    if (!newAudience.trim()) return;
    setCourseFormData((prev) => ({
      ...prev,
      audience: [...(prev.audience || []), newAudience.trim()],
    }));
    setNewAudience('');
  };
  const handleRemoveAudience = (idx: number) => {
    setCourseFormData((prev) => ({
      ...prev,
      audience: (prev.audience || []).filter((_, i) => i !== idx),
    }));
  };

  const handleAddInclude = () => {
    if (!newInclude.trim()) return;
    setCourseFormData((prev) => ({
      ...prev,
      includes: [...(prev.includes || []), newInclude.trim()],
    }));
    setNewInclude('');
  };
  const handleRemoveInclude = (idx: number) => {
    setCourseFormData((prev) => ({
      ...prev,
      includes: (prev.includes || []).filter((_, i) => i !== idx),
    }));
  };

  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseModalTab('general');
    setSelectedModuleQuizIndex(0);
    setNewOutcome('');
    setNewRequirement('');
    setNewAudience('');
    setNewInclude('');
    setCourseFormData({
      title: '',
      badge: 'Lo más vendido',
      level: 'Intermedio a Avanzado',
      price: '$97 USD',
      originalPrice: '$197 USD',
      discount: '50% OFF',
      rating: 4.9,
      reviewsCount: 0,
      duration: '4 Módulos Intensivos',
      tagline: '',
      description: '',
      previewImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
      stripeColor: 'from-[#1DACE3] via-[#0284c7] to-[#4f46e5]',
      tools: ['Claude Code', 'n8n', 'Python', 'Docker'],
      modulesCount: 2,
      ctaUrl: '',
      status: 'ACTIVO',
      studentsEnrolled: 0,
      instructorName: 'Julio Daza',
      instructorRole: 'Arquitecto de Sistemas & Fundador',
      instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      hoursVideo: '12 horas de video bajo demanda',
      articlesCount: 20,
      resourcesCount: 25,
      lastUpdated: '8/2026',
      language: 'Español',
      outcomes: [
        'Dominar herramientas agénticas desde cero hasta nivel profesional.',
        'Construir y desplegar proyectos reales con seguridad y robustez.',
      ],
      includes: [
        '12 horas de vídeo bajo demanda',
        '20 artículos y guías de arquitectura',
        '25 recursos descargables',
        'Acceso de por vida',
        'Certificado oficial de finalización con código QR',
      ],
      requirements: [
        'Una computadora con conexión a Internet.',
        'Ganas de experimentar y construir con IA aplicada.',
      ],
      audience: [
        'Desarrolladores, programadores y consultores técnicos.',
        'Emprendedores que buscan acelerar el desarrollo de sus productos.',
      ],
      modules: [
        {
          week_label: '01',
          title: 'Módulo 01: Fundamentos & Arquitectura',
          description: 'Introducción y primeros despliegues de prueba',
          video_url: '',
          summary: 'Configuración inicial y primeros pasos',
          prompts: [],
          downloads: [],
          quiz: { enabled: false, passing_score: 80, questions: [] },
        },
      ],
    });
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course: CourseItem) => {
    setEditingCourse(course);
    setCourseModalTab('general');
    setSelectedModuleQuizIndex(0);
    setNewOutcome('');
    setNewRequirement('');
    setNewAudience('');
    setNewInclude('');
    setCourseFormData({
      ...course,
      badge: course.badge || 'Lo más vendido',
      originalPrice: course.originalPrice || `$${(Number(course.price?.replace(/[^0-9.]/g, '')) || 97) * 2} USD`,
      discount: course.discount || '50% OFF',
      rating: course.rating || 4.9,
      reviewsCount: course.reviewsCount || 0,
      instructorName: course.instructorName || 'Julio Daza',
      instructorRole: course.instructorRole || 'Arquitecto de Sistemas & Fundador',
      instructorAvatar: course.instructorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      hoursVideo: course.hoursVideo || '12 horas de video bajo demanda',
      articlesCount: course.articlesCount || 20,
      resourcesCount: course.resourcesCount || 25,
      lastUpdated: course.lastUpdated || '8/2026',
      language: course.language || 'Español',
      outcomes: course.outcomes && course.outcomes.length > 0 ? course.outcomes : ['Aprender habilidades de alta demanda'],
      includes: course.includes && course.includes.length > 0 ? course.includes : ['Video bajo demanda', 'Recursos descargables', 'Certificado'],
      requirements: course.requirements && course.requirements.length > 0 ? course.requirements : ['Conexión a Internet'],
      audience: course.audience && course.audience.length > 0 ? course.audience : ['Profesionales y desarrolladores'],
      modules: course.modules && course.modules.length > 0 ? course.modules : [
        {
          week_label: '01',
          title: 'Módulo 01: Fundamentos',
          description: '',
          video_url: '',
          summary: '',
          prompts: [],
          downloads: [],
          quiz: { enabled: false, passing_score: 80, questions: [] },
        },
      ],
    });
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseFormData.title) return;

    try {
      const payload = {
        id: editingCourse ? editingCourse.id : undefined,
        title: courseFormData.title,
        badge: courseFormData.badge || 'Lo más vendido',
        level: courseFormData.level || 'Intermedio',
        price_display: courseFormData.price || '$97 USD',
        price_usd: Number(courseFormData.price?.replace(/[^0-9.]/g, '')) || 97,
        original_price: courseFormData.originalPrice,
        discount: courseFormData.discount || '50% OFF',
        rating: courseFormData.rating !== undefined ? Number(courseFormData.rating) : 4.9,
        reviews_count: courseFormData.reviewsCount !== undefined ? Number(courseFormData.reviewsCount) : 0,
        duration: courseFormData.duration || '4 Semanas',
        tagline: courseFormData.tagline || '',
        description: courseFormData.description || '',
        preview_image: courseFormData.previewImage,
        stripe_color: courseFormData.stripeColor || 'from-[#1DACE3] via-[#0284c7] to-[#4f46e5]',
        tools: courseFormData.tools || ['IA', 'Automatización'],
        cta_url: courseFormData.ctaUrl || '#',
        status: courseFormData.status || 'ACTIVO',
        students_enrolled: courseFormData.studentsEnrolled || 0,
        instructor: {
          name: courseFormData.instructorName || 'Julio Daza',
          role: courseFormData.instructorRole || 'Arquitecto de Sistemas & Fundador',
          avatar: courseFormData.instructorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        },
        learning_outcomes: courseFormData.outcomes || [],
        course_includes: courseFormData.includes || [],
        requirements: courseFormData.requirements || [],
        target_audience: courseFormData.audience || [],
        hours_video: courseFormData.hoursVideo || '12 horas de video bajo demanda',
        articles_count: courseFormData.articlesCount || 20,
        resources_count: courseFormData.resourcesCount || 25,
        last_updated: courseFormData.lastUpdated || '8/2026',
        language: courseFormData.language || 'Español',
        modules: courseFormData.modules || [],
      };

      if (editingCourse) {
        await fetch('/api/courses', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      setIsCourseModalOpen(false);
      fetchAllData();
    } catch (err) {
      console.error('[Save Course Error]', err);
    }
  };

  const handleDeleteCourse = async (id: string, title: string) => {
    if (confirm(`¿Estás seguro de eliminar el curso: "${title}" de la base de datos?`)) {
      try {
        await fetch(`/api/courses?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
        fetchAllData();
      } catch (err) {
        console.error('[Delete Course Error]', err);
      }
    }
  };

  // ── 3. GESTOR DE RECURSOS STATE & CRUD ──
  const [resourcesList, setResourcesList] = useState<ResourceItem[]>([
    {
      id: 'sops',
      name: 'Framework de Manuales Operativos (SOPs) y Checklists',
      format: 'Plantilla Notion Duplicable',
      access: 'GRATUITO (LEAD)',
      price: 'GRATIS',
      downloads: 0,
      tag: 'WORKSPACE NOTION',
      fileUrl: 'https://notion.so/',
      previewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      description: 'Estructura modular en Notion para estandarizar procesos de cocina, compras, servicio y apertura/cierre antes de integrar automatizaciones agénticas.',
    },
    {
      id: 'haccp',
      name: 'Checklist de Auditoría de Puntos Críticos HACCP',
      format: 'Guía de Auditoría PDF',
      access: 'GRATUITO (LEAD)',
      price: 'GRATIS',
      downloads: 0,
      tag: 'PDF INTERACTIVO',
      fileUrl: '/downloads/checklist-haccp.pdf',
      previewImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      description: 'Plantilla interactiva de control de temperaturas, rotación FIFO/PEPS, matriz de límites críticos y protocolos de inocuidad según estándares internacionales.',
    },
    {
      id: 'aeo-rag',
      name: 'Guía de Indexación para Motores de Respuesta IA (AEO & RAG)',
      format: 'Manual de Arquitectura AEO',
      access: 'PREMIUM (PAGO)',
      price: '$5 USD',
      downloads: 0,
      tag: 'GUÍA TÉCNICA',
      fileUrl: '/downloads/guia-aeo-rag.pdf',
      previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      description: 'Manual de arquitectura técnica para estructurar microdatos JSON-LD y Schema.org para que ChatGPT, Gemini y Perplexity indexen y citen tu negocio.',
    },
    {
      id: 'escandallos',
      name: 'Matriz Maestra de Escandallos & Costos Gastronómicos',
      format: 'Plantilla Excel Parametrizada',
      access: 'GRATUITO (LEAD)',
      price: 'GRATIS',
      downloads: 0,
      tag: 'XLSX PARAMETRIZADO',
      fileUrl: '/downloads/matriz-escandallos.xlsx',
      previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      description: 'Plantilla en Excel totalmente formulada para costeo crudo/cocido, factor de rendimiento, mermas técnicas y cálculo de precio sugerido por Food Cost.',
    },
  ]);

  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [resourceFormData, setResourceFormData] = useState<Partial<ResourceItem>>({
    name: '',
    format: 'PDF / Documento',
    access: 'GRATUITO (LEAD)',
    price: 'GRATIS',
    tag: 'RECURSO',
    downloads: 0,
    fileUrl: '',
    previewImage: '',
    description: '',
  });

  const handleOpenAddResource = () => {
    setEditingResource(null);
    setResourceFormData({
      name: '',
      format: 'PDF / Documento',
      access: 'GRATUITO (LEAD)',
      price: 'GRATIS',
      tag: 'RECURSO',
      downloads: 0,
      fileUrl: '',
      previewImage: '',
      description: '',
    });
    setIsResourceModalOpen(true);
  };

  const handleOpenEditResource = (item: ResourceItem) => {
    setEditingResource(item);
    setResourceFormData({ ...item });
    setIsResourceModalOpen(true);
  };

  const handleSaveResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceFormData.name) return;

    try {
      if (editingResource) {
        // Update via API (Supabase)
        await fetch('/api/resources', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingResource.id,
            title: resourceFormData.name,
            format: resourceFormData.format,
            access_type: resourceFormData.access,
            price_display: resourceFormData.access === 'PREMIUM (PAGO)' ? (resourceFormData.price || '$5 USD') : 'GRATIS',
            price_usd: resourceFormData.access === 'PREMIUM (PAGO)' ? (Number(resourceFormData.price?.replace(/[^0-9.]/g, '')) || 5) : 0,
            tag: resourceFormData.tag,
            downloads_count: resourceFormData.downloads,
            file_url: resourceFormData.fileUrl,
            preview_image: resourceFormData.previewImage,
            description: resourceFormData.description,
          }),
        });
      } else {
        // Create via API (Supabase)
        await fetch('/api/resources', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: resourceFormData.name,
            format: resourceFormData.format || 'PDF / Documento',
            access_type: resourceFormData.access || 'GRATUITO (LEAD)',
            price_display: resourceFormData.access === 'PREMIUM (PAGO)' ? (resourceFormData.price || '$5 USD') : 'GRATIS',
            price_usd: resourceFormData.access === 'PREMIUM (PAGO)' ? (Number(resourceFormData.price?.replace(/[^0-9.]/g, '')) || 5) : 0,
            tag: resourceFormData.tag || 'RECURSO',
            downloads_count: resourceFormData.downloads || 0,
            file_url: resourceFormData.fileUrl || '#',
            preview_image: resourceFormData.previewImage,
            description: resourceFormData.description,
          }),
        });
      }
      fetchAllData();
    } catch (err) {
      console.error('[Save Resource Error]', err);
    }
    setIsResourceModalOpen(false);
  };

  const handleDeleteResource = async (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar el activo: "${name}" de la base de datos?`)) {
      try {
        await fetch(`/api/resources?id=${encodeURIComponent(id)}`, { method: 'DELETE' });
        fetchAllData();
      } catch (err) {
        console.error('[Delete Resource Error]', err);
      }
    }
  };

  // ── 4. RED AGÉNTICA STATE (DATOS REALES) ──
  const [agents, setAgents] = useState<AgentData[]>([
    { id: 'ag-1', name: 'Agente Ventas & WhatsApp', trigger: 'Meta Webhook', status: 'ONLINE', executionsToday: 0, errorRate: '0.0%', tokensConsumed: '0k' },
    { id: 'ag-2', name: 'Agente Ingesta de Leads & Toolkit', trigger: 'Formulario Web API', status: 'ONLINE', executionsToday: 0, errorRate: '0.0%', tokensConsumed: '0k' },
    { id: 'ag-3', name: 'Agente Calibración & Abastecimiento', trigger: 'Cron Diario (04:00 AM)', status: 'IDLE', executionsToday: 0, errorRate: '0.0%', tokensConsumed: '0k' },
    { id: 'ag-4', name: 'Agente Notificaciones Telegram', trigger: 'Event Bus', status: 'ONLINE', executionsToday: 0, errorRate: '0.0%', tokensConsumed: '0k' },
  ]);

  const toggleAgentStatus = (id: string) => {
    setAgents((prev) =>
      prev.map((ag) => {
        if (ag.id === id) {
          const nextStatus = ag.status === 'ONLINE' ? 'OFFLINE' : 'ONLINE';
          return { ...ag, status: nextStatus };
        }
        return ag;
      })
    );
  };

  // ── 5. CRM LEADS STATE ──
  const [leadsList, setLeadsList] = useState<any[]>([]);

  const handleUpdateAuditStatus = async (id: string, newStatus: AuditNotification['status']) => {
    setNotifications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    try {
      await fetch('/api/leads', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
    } catch (err) {
      console.error('[Update Lead Status Error]', err);
    }
  };

  const handleSyncN8n = () => {
    setSyncingN8n(true);
    setTimeout(() => {
      setSyncingN8n(false);
    }, 700);
  };

  const handleSyncAllCoursesWithSupabase = async () => {
    setSyncingCourses(true);
    setSyncMessage(null);
    try {
      const res = await fetch('/api/courses/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSyncMessage('¡Catálogo de cursos (4 cursos con temarios completos) sincronizado exitosamente con Supabase!');
        fetchAllData();
      } else {
        alert(`Error al sincronizar cursos: ${data.message}`);
      }
    } catch (err: any) {
      alert(`Error de red al sincronizar cursos: ${err.message}`);
    } finally {
      setSyncingCourses(false);
      setTimeout(() => setSyncMessage(null), 6000);
    }
  };

  const handleSyncAllResourcesWithSupabase = async () => {
    setSyncingResources(true);
    setSyncMessage(null);
    try {
      const res = await fetch('/api/resources/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setSyncMessage('¡Catálogo de 4 recursos operativos sincronizado exitosamente con Supabase!');
        fetchAllData();
      } else {
        alert(`Error al sincronizar recursos: ${data.message}`);
      }
    } catch (err: any) {
      alert(`Error de red al sincronizar recursos: ${err.message}`);
    } finally {
      setSyncingResources(false);
      setTimeout(() => setSyncMessage(null), 6000);
    }
  };

  // ── 6. CONFIGURACIÓN DE PASARELAS & PAGO MÓVIL STATE ──
  const [paymentSettings, setPaymentSettings] = useState({
    pagoMovil: {
      banco: "Banesco",
      bancoCodigo: "0134",
      cedulaRif: "V-12.345.678",
      telefono: "0414-881-7137",
      whatsapp: "584148817137",
      tasaInfo: "Calculado a Tasa Oficial BCV del día",
    },
    lemonSqueezy: {
      storeName: "Inteligencia Neuronal",
      storeUrl: "https://inteligencia-neuronal.lemonsqueezy.com",
      courseLinks: {
        iaRestaurantes: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
        bootcampN8n: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
        crecimientoAeo: "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407",
      },
    },
  });

  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsSuccessMsg, setSettingsSuccessMsg] = useState<string | null>(null);

  const handleSavePaymentSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSettings(true);
    setSettingsSuccessMsg(null);
    if (typeof window !== 'undefined') {
      localStorage.setItem('in_admin_payment_settings', JSON.stringify(paymentSettings));
    }
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentSettings),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSuccessMsg("¡Configuración de pasarelas y Pago Móvil guardada con éxito!");
        setTimeout(() => setSettingsSuccessMsg(null), 4000);
      }
    } catch (err) {
      console.error("[Save Payment Settings Error]", err);
    } finally {
      setIsSavingSettings(false);
    }
  };

  // ── 7. ALUMNOS & MATRÍCULA CAMPUS STATE ──
  const [studentsList, setStudentsList] = useState<any[]>([]);
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const [enrollFormData, setEnrollFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseTitle: "Masterclass: Inteligencia Artificial para Restaurantes & Food Cost",
    courseId: "masterclass-ia-restaurantes",
    sendEmail: true,
  });
  const [isEnrollingStudent, setIsEnrollingStudent] = useState(false);
  const [enrollSuccessMsg, setEnrollSuccessMsg] = useState<string | null>(null);

  const handleEnrollStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEnrollingStudent(true);
    try {
      const res = await fetch("/api/campus/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enrollFormData),
      });
      const data = await res.json();
      if (data.success) {
        setEnrollSuccessMsg(data.message || "Alumno matriculado con éxito.");
        setTimeout(() => {
          setEnrollSuccessMsg(null);
          setIsEnrollModalOpen(false);
        }, 2000);
        fetchAllData();
      }
    } catch (err) {
      console.error("[Enroll Student Error]", err);
    } finally {
      setIsEnrollingStudent(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      // ignore
    }
    router.push('/admin/login');
    router.refresh();
  };

  // CSV Exports
  const exportLeadsCSV = () => {
    const headers = ['Email', 'Recurso', 'Fecha', 'Fuente', 'Estado'];
    const rows = leadsList.map((l) => [l.email, l.resource, l.date, l.source, l.status]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'leads_crm_inteligencia_neuronal.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportNotificationsCSV = () => {
    const headers = ['Folio', 'Nombre', 'Empresa', 'Email', 'Telefono', 'Servicio', 'Volumen', 'ERP', 'CuelloBotella', 'Estado', 'Fecha'];
    const rows = notifications.map((a) => [
      a.id,
      a.fullName,
      a.companyName,
      a.corporateEmail,
      a.phoneWhatsApp,
      a.serviceNeeded,
      a.dailyVolume,
      a.currentERP,
      `"${a.primaryBottleneck?.replace(/"/g, '""')}"`,
      a.status,
      a.createdAt,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'notificaciones_diagnosticos_inteligencia_neuronal.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered lists
  const filteredCourses = coursesList.filter((c) =>
    (c.title || '').toLowerCase().includes(searchCourse.toLowerCase()) ||
    (c.badge || '').toLowerCase().includes(searchCourse.toLowerCase()) ||
    (c.level || '').toLowerCase().includes(searchCourse.toLowerCase())
  );

  const filteredResources = resourcesList.filter((r) =>
    r.name.toLowerCase().includes(searchResource.toLowerCase()) ||
    r.tag.toLowerCase().includes(searchResource.toLowerCase())
  );

  const filteredNotifications = notifications.filter((a) =>
    a.fullName.toLowerCase().includes(searchAudit.toLowerCase()) ||
    a.companyName.toLowerCase().includes(searchAudit.toLowerCase()) ||
    a.corporateEmail.toLowerCase().includes(searchAudit.toLowerCase()) ||
    a.serviceNeeded.toLowerCase().includes(searchAudit.toLowerCase())
  );

  const filteredLeads = leadsList.filter((l) =>
    l.email.toLowerCase().includes(searchLead.toLowerCase()) ||
    l.resource.toLowerCase().includes(searchLead.toLowerCase())
  );

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#F8F9FA] text-zinc-900 font-sans selection:bg-[#EA0C7F] selection:text-white">
      
      {/* ── BARRA LATERAL (DARK SIDEBAR CONTRAST #1F242D) ── */}
      <aside className="w-full lg:w-64 bg-[#1F242D] text-white flex flex-col justify-between p-4 lg:p-5 shrink-0 shadow-2xl z-30">
        <div>
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between lg:block mb-6 lg:mb-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#971B8D] to-[#EA0C7F] flex items-center justify-center text-white shadow-lg shadow-[#971B8D]/30">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <span className="font-heading text-base font-bold tracking-tight text-white block leading-tight">
                  Inteligencia Neuronal
                </span>
                <span className="font-mono text-[9px] font-bold text-[#1DACE3] tracking-wider uppercase block">
                  SaaS Control Suite
                </span>
              </div>
            </Link>
          </div>

          {/* Menú de Navegación */}
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {[
              { id: 'overview', label: 'Métricas Generales', icon: LayoutDashboard, color: '#1DACE3' },
              { id: 'courses', label: 'Gestor de Cursos', icon: GraduationCap, badge: coursesList.length.toString(), color: '#EA0C7F' },
              { id: 'resources', label: 'Gestor de Recursos', icon: FolderDown, badge: resourcesList.length.toString(), color: '#FEAD2B' },
              { id: 'leads', label: 'Base de Leads (CRM)', icon: Users, color: '#86C537' },
              { id: 'billing', label: 'Pasarelas & Pagos', icon: CreditCard, color: '#1DACE3' },
              { id: 'agents', label: 'Red Agéntica', icon: Bot, color: '#971B8D' },
              { id: 'audits', label: 'Notificaciones', icon: Bell, badge: notifications.length.toString(), color: '#EA0C7F' },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap lg:whitespace-normal transition-all shrink-0 lg:shrink ${
                    isActive
                      ? 'bg-[#971B8D] text-white shadow-lg shadow-[#971B8D]/40'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 lg:ml-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-zinc-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Sidebar */}
        <div className="hidden lg:block border-t border-white/10 pt-4 space-y-3 text-xs text-zinc-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#86C537] animate-pulse" />
              <span className="text-[11px] font-mono text-zinc-300">VPS: En Línea (24/7)</span>
            </div>
            <Link href="/" target="_blank" className="hover:text-white transition-colors" title="Ver Landing">
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs transition-all font-bold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ── ÁREA DE TRABAJO PRINCIPAL (LIGHT CLEAN UI) ── */}
      <main className="flex-1 overflow-y-auto p-6 sm:p-8 lg:p-10 bg-[#F8F9FA]">
        
        {/* HEADER SUPERIOR CON CONTROLES SEGMENTADOS */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-[#EA0C7F]" />
              <span className="font-mono text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                CENTRO DE MANDO // SaaS ENTERPRISE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              {activeTab === 'overview' && 'Métricas Generales & Telemetría'}
              {activeTab === 'courses' && 'Gestor de Cursos & Campus Virtual'}
              {activeTab === 'resources' && 'Gestor de Recursos & Toolkit'}
              {activeTab === 'leads' && 'Base de Leads CRM & Nutrición'}
              {activeTab === 'billing' && 'Pasarelas de Pago & Configuración'}
              {activeTab === 'agents' && 'Red Agéntica & Monitoreo'}
              {activeTab === 'audits' && 'Notificaciones & Solicitudes de Diagnóstico'}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Segmented Control Filter */}
            <div className="flex items-center bg-zinc-200/80 p-1 rounded-xl text-xs font-bold text-zinc-600">
              {(['today', '7d', '30d', 'all'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTimeFilter(t)}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    timeFilter === t
                      ? 'bg-white text-[#971B8D] shadow-sm'
                      : 'hover:text-zinc-900'
                  }`}
                >
                  {t === 'today' ? 'Hoy' : t === '7d' ? '7 Días' : t === '30d' ? '30 Días' : 'Año'}
                </button>
              ))}
            </div>

            <button
              onClick={handleSyncN8n}
              disabled={syncingN8n}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-xs font-bold text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncingN8n ? 'animate-spin text-[#971B8D]' : ''}`} />
              <span>{syncingN8n ? 'Sincronizando...' : 'Sincronizar'}</span>
            </button>
          </div>
        </header>

        {/* CONTENIDO SEGÚN PESTAÑA */}
        <AnimatePresence mode="wait">
          
          {/* ── TAB 1: OVERVIEW ── */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              
              {/* Tarjetas de Métricas Clave con Franja Superior */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Facturación Bruta (Stripe)', val: '$0.00 USD', change: '0 transacciones', icon: TrendingUp, stripe: 'from-[#971B8D] to-[#EA0C7F]', bgTint: 'to-pink-50/40', badge: 'STRIPE LIVE' },
                  { label: 'Notificaciones & Diagnósticos', val: `${notifications.length} Solicitudes`, change: `${notifications.length} activas`, icon: Bell, stripe: 'from-[#1DACE3] to-[#0284c7]', bgTint: 'to-sky-50/40', badge: 'PIPELINE' },
                  { label: 'Cursos & Alumnos Activos', val: `${coursesList.reduce((acc, c) => acc + (c.studentsEnrolled || 0), 0)} Alumnos`, change: `${coursesList.length} cursos`, icon: GraduationCap, stripe: 'from-[#FEAD2B] to-[#c2410c]', bgTint: 'to-amber-50/40', badge: 'CAMPUS' },
                  { label: 'Leads Capturados (Toolkit)', val: `${leadsList.length} Registros`, change: `${leadsList.length} descargas`, icon: Users, stripe: 'from-[#86C537] to-[#059669]', bgTint: 'to-emerald-50/40', badge: 'CRM LEADS' },
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={idx} className={`p-6 rounded-2xl border border-zinc-200 bg-gradient-to-br from-white ${kpi.bgTint} shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all`}>
                      {/* Top Color Stripe */}
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${kpi.stripe}`} />

                      <div>
                        <div className="flex items-center justify-between text-zinc-500 mb-3">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-zinc-200 text-zinc-700 shadow-xs">
                            {kpi.badge}
                          </span>
                          <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 shadow-xs">
                            <Icon className="w-4 h-4 text-[#971B8D]" />
                          </div>
                        </div>
                        <div className="text-3xl font-extrabold text-zinc-900 tracking-tight">{kpi.val}</div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs">
                        <span className="text-zinc-500 font-medium">{kpi.label}</span>
                        <span className="font-mono font-bold text-[#86C537] flex items-center gap-0.5">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Paneles Recientes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Notificaciones Recientes */}
                <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1DACE3] to-[#971B8D]" />
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#1DACE3]" />
                      <span>Notificaciones de Diagnósticos Recientes</span>
                    </h3>
                    <button onClick={() => setActiveTab('audits')} className="font-mono text-xs font-bold text-[#971B8D] hover:underline">
                      Ver todas ({notifications.length}) ▹
                    </button>
                  </div>
                  <div className="space-y-3">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8 text-xs text-zinc-400 font-mono">
                        No hay solicitudes de diagnóstico registradas aún.
                      </div>
                    ) : (
                      notifications.slice(0, 3).map((lead) => (
                        <div key={lead.id} className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs hover:bg-zinc-100/60 transition-colors">
                          <div>
                            <div className="font-bold text-zinc-900">{lead.companyName}</div>
                            <div className="text-[11px] text-zinc-500 mt-0.5">{lead.fullName} • {lead.serviceNeeded}</div>
                          </div>
                          <div className="text-right">
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EA0C7F]/10 text-[#EA0C7F] border border-[#EA0C7F]/20">
                              {lead.status}
                            </span>
                            <div className="text-[10px] text-zinc-400 mt-1 font-mono">{lead.createdAt.split(',')[0]}</div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Transacciones Recientes */}
                <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FEAD2B] to-[#EA0C7F]" />
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#FEAD2B]" />
                      <span>Transacciones Recientes (Stripe)</span>
                    </h3>
                    <button onClick={() => setActiveTab('billing')} className="font-mono text-xs font-bold text-[#971B8D] hover:underline">
                      Panel Stripe ▹
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="text-center py-8 text-xs text-zinc-400 font-mono">
                      No hay transacciones registradas aún.
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ── TAB 2: GESTOR DE CURSOS (NUEVA PESTAÑA CON CRUD Y PREVIEWS) ── */}
          {activeTab === 'courses' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              
              {syncMessage && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2.5 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{syncMessage}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#EA0C7F]" />
                    <span>Gestor de Cursos & Campus Virtual</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Crea, edita, elimina y gestiona los 4 programas formativos, precios y matrículas del Campus Virtual.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleSyncAllCoursesWithSupabase}
                    disabled={syncingCourses}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#1DACE3]/40 bg-[#1DACE3]/10 hover:bg-[#1DACE3]/20 px-3.5 py-2.5 text-xs font-bold text-[#0284c7] transition-all shadow-sm shrink-0 cursor-pointer disabled:opacity-50"
                    title="Sincronizar y sembrar los 4 cursos oficiales y sus módulos en Supabase"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncingCourses ? 'animate-spin' : ''}`} />
                    <span>{syncingCourses ? 'Sincronizando...' : 'Sincronizar Catálogo con Supabase'}</span>
                  </button>

                  <button
                    onClick={() => setIsEnrollModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-emerald-600/20 shrink-0 cursor-pointer"
                  >
                    <UserPlus className="w-4 h-4" /> Matricular Alumno
                  </button>

                  <button
                    onClick={handleOpenAddCourse}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#971B8D] hover:bg-[#801676] px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-[#971B8D]/30 shrink-0 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Crear Nuevo Curso
                  </button>
                </div>
              </div>

              {/* Buscador de Cursos */}
              <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm space-y-6">
                <div className="relative max-w-sm">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Buscar curso por título o nivel..."
                    value={searchCourse}
                    onChange={(e) => setSearchCourse(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 pl-10 pr-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Grid de Tarjetas de Cursos con Franja Superior */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course, idx) => {
                    const stripes = [
                      'from-[#EA0C7F] to-[#971B8D]',
                      'from-[#1DACE3] to-[#6366f1]',
                      'from-[#FEAD2B] to-[#EA0C7F]',
                    ];
                    const stripe = stripes[idx % stripes.length];

                    return (
                      <div
                        key={course.id}
                        className="rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group"
                      >
                        {/* Top Color Stripe */}
                        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stripe}`} />

                        <div>
                          {/* Preview Image */}
                          <div className="h-40 w-full bg-zinc-100 relative overflow-hidden border-b border-zinc-100">
                            {course.previewImage ? (
                              <img
                                src={course.previewImage}
                                alt={course.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                <ImageIcon className="w-8 h-8" />
                              </div>
                            )}
                            <div className="absolute top-3 left-3">
                              <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-zinc-800 border border-zinc-200 shadow-xs">
                                {course.badge}
                              </span>
                            </div>
                            <div className="absolute top-3 right-3">
                              <span className="font-mono text-[9px] font-bold px-2.5 py-1 rounded-full bg-zinc-900/85 text-white">
                                {course.price}
                              </span>
                            </div>
                          </div>

                          <div className="p-5">
                            <span className="text-[10px] font-mono font-bold text-[#1DACE3] uppercase tracking-wider block mb-1">
                              {course.level} • {course.duration}
                            </span>
                            <h3 className="text-base font-bold text-zinc-900 mb-1.5 leading-snug">
                              {course.title}
                            </h3>
                            <p className="text-xs text-zinc-600 line-clamp-2 mb-4">
                              {course.tagline}
                            </p>

                            <div className="flex flex-wrap gap-1.5 mb-2">
                              {course.tools.map((t, i) => (
                                <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-700">
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Footer Controls */}
                        <div className="p-4 pt-3 border-t border-zinc-100 bg-zinc-50/60 flex items-center justify-between">
                          <span className="text-[11px] font-mono text-zinc-500 font-bold">
                            {course.studentsEnrolled} inscritos
                          </span>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleOpenEditCourse(course)}
                              className="p-1.5 rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:text-[#971B8D] hover:border-[#971B8D] transition-colors"
                              title="Editar Curso"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(course.id, course.title)}
                              className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                              title="Eliminar Curso"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── SECCIÓN DE ALUMNOS MATRICULADOS EN EL CAMPUS ── */}
              <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 bg-white shadow-sm space-y-5 text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#971B8D]/10 text-[#971B8D] flex items-center justify-center">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-zinc-900">Alumnos Matriculados en el Campus Virtual</h3>
                      <p className="text-xs text-zinc-500">Gestión de accesos y matrículas activas en la plataforma</p>
                    </div>
                  </div>

                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 w-fit">
                    {studentsList.length} Alumnos Activos
                  </span>
                </div>

                {studentsList.length === 0 ? (
                  <div className="text-center py-10 space-y-2">
                    <GraduationCap className="w-8 h-8 text-zinc-300 mx-auto" />
                    <p className="text-xs text-zinc-400 font-mono">No hay alumnos matriculados aún.</p>
                    <button
                      onClick={() => setIsEnrollModalOpen(true)}
                      className="text-xs font-bold text-[#971B8D] hover:underline"
                    >
                      + Matricular primer alumno ahora
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-zinc-200 text-zinc-500 font-mono">
                          <th className="pb-3">ALUMNO</th>
                          <th className="pb-3">EMAIL DE ACCESO</th>
                          <th className="pb-3">PROGRAMA MATRICULADO</th>
                          <th className="pb-3">TELÉFONO</th>
                          <th className="pb-3">ESTADO</th>
                          <th className="pb-3">FECHA</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100">
                        {studentsList.map((st, i) => (
                          <tr key={st.id || i} className="text-zinc-700 hover:bg-zinc-50/80 transition-colors">
                            <td className="py-3.5 font-bold text-zinc-900">{st.full_name || st.name || 'Alumno'}</td>
                            <td className="py-3.5 font-mono text-zinc-800">{st.email}</td>
                            <td className="py-3.5 font-medium text-zinc-800">
                              <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-700 font-mono text-[11px]">
                                {st.course_id || 'Masterclass IA'}
                              </span>
                            </td>
                            <td className="py-3.5 font-mono text-zinc-600">{st.phone || 'Sin teléfono'}</td>
                            <td className="py-3.5">
                              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#86C537]/15 text-[#639922] border border-[#86C537]/30">
                                {st.status || 'Activo'}
                              </span>
                            </td>
                            <td className="py-3.5 font-mono text-zinc-500 text-[11px]">
                              {st.created_at ? new Date(st.created_at).toLocaleDateString() : 'Reciente'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

            </motion.div>
          )}

          {/* ── TAB 3: GESTOR DE RECURSOS (CON ADJUNTAR ARCHIVO E IMAGEN PREVIA) ── */}
          {activeTab === 'resources' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              
              {syncMessage && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2.5 shadow-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{syncMessage}</span>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <FolderDown className="w-5 h-5 text-[#FEAD2B]" />
                    <span>Repositorio de Activos Operativos</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Gestiona matrices, checklists y plantillas con soporte para adjuntar archivos reales y capturas previas.
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    onClick={handleSyncAllResourcesWithSupabase}
                    disabled={syncingResources}
                    className="inline-flex items-center gap-2 rounded-xl border border-[#FEAD2B]/40 bg-[#FEAD2B]/10 hover:bg-[#FEAD2B]/20 px-3.5 py-2.5 text-xs font-bold text-[#ea580c] transition-all shadow-sm shrink-0 cursor-pointer disabled:opacity-50"
                    title="Sincronizar y sembrar los 4 recursos operativos oficiales en Supabase"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${syncingResources ? 'animate-spin' : ''}`} />
                    <span>{syncingResources ? 'Sincronizando...' : 'Sincronizar Recursos con Supabase'}</span>
                  </button>

                  <button
                    onClick={handleOpenAddResource}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#971B8D] hover:bg-[#801676] px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-[#971B8D]/30 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Cargar Nuevo Activo
                  </button>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm space-y-6">
                <div className="relative max-w-sm">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Buscar activo por nombre o tag..."
                    value={searchResource}
                    onChange={(e) => setSearchResource(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 pl-10 pr-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[800px]">
                    <thead>
                      <tr className="border-b border-zinc-200 text-zinc-500 font-mono">
                        <th className="pb-3">PREVIEW</th>
                        <th className="pb-3">NOMBRE DEL ACTIVO</th>
                        <th className="pb-3">TIPO / FORMATO</th>
                        <th className="pb-3">ARCHIVO ADJUNTO</th>
                        <th className="pb-3">ACCESO</th>
                        <th className="pb-3">DESCARGAS</th>
                        <th className="pb-3 text-right">ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filteredResources.map((res) => (
                        <tr key={res.id} className="text-zinc-700 hover:bg-zinc-50/80 transition-colors">
                          <td className="py-3.5">
                            <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200 overflow-hidden shrink-0">
                              {res.previewImage ? (
                                <img src={res.previewImage} alt={res.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                  <ImageIcon className="w-4 h-4" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5">
                            <div className="font-bold text-zinc-900 max-w-sm">{res.name}</div>
                            <span className="font-mono text-[9px] font-bold text-[#EA0C7F]">{res.tag}</span>
                          </td>
                          <td className="py-3.5 font-mono text-zinc-500">{res.format}</td>
                          <td className="py-3.5">
                            {res.fileUrl ? (
                              <a
                                href={res.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 font-mono text-[10px] text-[#1DACE3] hover:underline"
                              >
                                <Paperclip className="w-3 h-3" />
                                <span>{res.fileUrl.split('/').pop() || 'Archivo Adjunto'}</span>
                              </a>
                            ) : (
                              <span className="text-zinc-400 font-mono text-[10px]">Sin archivo</span>
                            )}
                          </td>
                          <td className="py-3.5">
                            <span className="font-mono text-[10px] font-bold bg-[#86C537]/15 text-[#639922] border border-[#86C537]/30 px-2.5 py-0.5 rounded-full">
                              {res.access}
                            </span>
                          </td>
                          <td className="py-3.5 font-mono text-zinc-900 font-bold">{res.downloads}</td>
                          <td className="py-3.5 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditResource(res)}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-zinc-300 bg-white text-zinc-800 hover:text-[#971B8D] hover:border-[#971B8D] transition-colors text-xs font-semibold shadow-xs"
                            >
                              <Edit2 className="w-3 h-3 text-zinc-600" />
                              <span>Editar</span>
                            </button>
                            <button
                              onClick={() => handleDeleteResource(res.id, res.name)}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors text-xs font-semibold"
                            >
                              <Trash2 className="w-3 h-3 text-red-600" />
                              <span>Eliminar</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── TAB 4: LEADS CRM ── */}
          {activeTab === 'leads' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#86C537]" />
                    <span>Base de Leads Capturados (CRM Toolkit)</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Contactos registrados desde la landing, toolkit y descargas individuales.</p>
                </div>
                <button
                  onClick={exportLeadsCSV}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-50 transition-all shadow-sm"
                >
                  <DownloadCloud className="w-4 h-4 text-[#86C537]" /> Exportar a CSV
                </button>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#86C537] to-[#1DACE3]" />
                
                <div className="mb-4 relative max-w-sm">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Buscar por correo o recurso..."
                    value={searchLead}
                    onChange={(e) => setSearchLead(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 pl-10 pr-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[650px]">
                    <thead>
                      <tr className="border-b border-zinc-200 text-zinc-500 font-mono">
                        <th className="pb-3">EMAIL / CONTACTO</th>
                        <th className="pb-3">RECURSO SOLICITADO</th>
                        <th className="pb-3">FECHA</th>
                        <th className="pb-3">ORIGEN</th>
                        <th className="pb-3">ESTADO DE NUTRICIÓN</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="text-zinc-700 hover:bg-zinc-50/80 transition-colors">
                          <td className="py-3.5 font-bold text-zinc-900">{lead.email}</td>
                          <td className="py-3.5 font-medium text-zinc-800">{lead.resource}</td>
                          <td className="py-3.5 font-mono text-zinc-500">{lead.date}</td>
                          <td className="py-3.5 font-mono text-zinc-500">{lead.source}</td>
                          <td className="py-3.5">
                            <span className="font-mono text-[10px] font-bold bg-[#86C537]/15 text-[#639922] border border-[#86C537]/30 px-2.5 py-0.5 rounded-full">
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {/* ── TAB 5: PASARELAS DE PAGO & PAGO MÓVIL ── */}
          {activeTab === 'billing' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#1DACE3]" />
                    <span>Configuración de Pasarelas & Coordenadas de Cobro</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Edita en tiempo real los datos de Pago Móvil (Venezuela) y enlaces de Lemon Squeezy que se muestran en el checkout de la plataforma.
                  </p>
                </div>

                <button
                  onClick={handleSavePaymentSettings}
                  disabled={isSavingSettings}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#971B8D] hover:bg-[#801676] px-5 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-[#971B8D]/30 disabled:opacity-50 shrink-0 cursor-pointer"
                >
                  {isSavingSettings ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Guardar Configuración</span>
                    </>
                  )}
                </button>
              </div>

              {/* Success Notification Alert */}
              {settingsSuccessMsg && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm animate-in fade-in">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{settingsSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleSavePaymentSettings} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Col: Pago Móvil Settings (7 cols) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* PAGO MÓVIL CARD */}
                  <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 bg-white shadow-sm space-y-6 relative overflow-hidden text-left">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#86C537] via-[#1DACE3] to-[#971B8D]" />

                    <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-zinc-900">Coordenadas de Pago Móvil (Venezuela)</h3>
                          <p className="text-[11px] text-zinc-500 font-mono">Datos bancarios mostrados a alumnos en Bolívares</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                        Activo en Modal
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Banco Name */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1.5">
                          Banco Receptor *
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentSettings.pagoMovil.banco}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              pagoMovil: { ...prev.pagoMovil, banco: e.target.value },
                            }))
                          }
                          placeholder="Ej: Banesco, Mercantil, BDV"
                          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                        />
                      </div>

                      {/* Banco Código */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1.5">
                          Código de Banco (4 dígitos)
                        </label>
                        <input
                          type="text"
                          value={paymentSettings.pagoMovil.bancoCodigo}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              pagoMovil: { ...prev.pagoMovil, bancoCodigo: e.target.value },
                            }))
                          }
                          placeholder="Ej: 0134, 0105, 0102"
                          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                        />
                      </div>

                      {/* Cédula / RIF */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1.5">
                          Cédula de Identidad / RIF *
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentSettings.pagoMovil.cedulaRif}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              pagoMovil: { ...prev.pagoMovil, cedulaRif: e.target.value },
                            }))
                          }
                          placeholder="Ej: V-12345678 o J-12345678-0"
                          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                        />
                      </div>

                      {/* Teléfono Pago Móvil */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1.5">
                          Teléfono de Pago Móvil *
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentSettings.pagoMovil.telefono}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              pagoMovil: { ...prev.pagoMovil, telefono: e.target.value },
                            }))
                          }
                          placeholder="Ej: 0414-881-7137"
                          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                        />
                      </div>

                      {/* WhatsApp para Reportar */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1.5">
                          WhatsApp Receptor de Comprobantes *
                        </label>
                        <input
                          type="text"
                          required
                          value={paymentSettings.pagoMovil.whatsapp}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              pagoMovil: { ...prev.pagoMovil, whatsapp: e.target.value },
                            }))
                          }
                          placeholder="Ej: 584148817137 (código país + número)"
                          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                        />
                      </div>

                      {/* Tasa Info */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1.5">
                          Instrucción de Tasa de Cambio
                        </label>
                        <input
                          type="text"
                          value={paymentSettings.pagoMovil.tasaInfo}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              pagoMovil: { ...prev.pagoMovil, tasaInfo: e.target.value },
                            }))
                          }
                          placeholder="Ej: Calculado a Tasa Oficial BCV del día"
                          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* LEMON SQUEEZY CARD */}
                  <div className="p-6 sm:p-8 rounded-3xl border border-zinc-200 bg-white shadow-sm space-y-6 relative overflow-hidden text-left">
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FEAD2B] via-[#EA0C7F] to-[#971B8D]" />

                    <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                          <CreditCard className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-zinc-900">Lemon Squeezy (Pagos Internacionales USD)</h3>
                          <p className="text-[11px] text-zinc-500 font-mono">Tarjetas de crédito/débito, Apple Pay, PayPal</p>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                        Checkout Links
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1.5">
                          Enlace Checkout: Masterclass IA para Restaurantes ($97 USD)
                        </label>
                        <input
                          type="url"
                          value={paymentSettings.lemonSqueezy.courseLinks.iaRestaurantes}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              lemonSqueezy: {
                                ...prev.lemonSqueezy,
                                courseLinks: {
                                  ...prev.lemonSqueezy.courseLinks,
                                  iaRestaurantes: e.target.value,
                                },
                              },
                            }))
                          }
                          placeholder="https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/..."
                          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 font-mono focus:border-[#971B8D] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1.5">
                          Enlace Checkout: Bootcamp Técnico n8n ($197 USD)
                        </label>
                        <input
                          type="url"
                          value={paymentSettings.lemonSqueezy.courseLinks.bootcampN8n}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              lemonSqueezy: {
                                ...prev.lemonSqueezy,
                                courseLinks: {
                                  ...prev.lemonSqueezy.courseLinks,
                                  bootcampN8n: e.target.value,
                                },
                              },
                            }))
                          }
                          placeholder="https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/..."
                          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 font-mono focus:border-[#971B8D] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-zinc-700 uppercase mb-1.5">
                          Enlace Checkout: Dominio Local SEO/AEO ($67 USD)
                        </label>
                        <input
                          type="url"
                          value={paymentSettings.lemonSqueezy.courseLinks.crecimientoAeo}
                          onChange={(e) =>
                            setPaymentSettings((prev) => ({
                              ...prev,
                              lemonSqueezy: {
                                ...prev.lemonSqueezy,
                                courseLinks: {
                                  ...prev.lemonSqueezy.courseLinks,
                                  crecimientoAeo: e.target.value,
                                },
                              },
                            }))
                          }
                          placeholder="https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/..."
                          className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-xs text-zinc-900 font-mono focus:border-[#971B8D] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSavingSettings}
                      className="w-full py-3.5 px-6 rounded-2xl bg-[#971B8D] hover:bg-[#801676] text-white text-xs font-bold shadow-lg shadow-[#971B8D]/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSavingSettings ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Guardando cambios...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Guardar Todos los Cambios de Pasarela</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Right Col: Live Preview Mockup (5 cols) */}
                <div className="lg:col-span-5 space-y-4 text-left">
                  <div className="p-6 rounded-3xl border border-zinc-200 bg-zinc-900 text-white shadow-xl space-y-4 sticky top-6">
                    <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                          Vista Previa en Vivo (Modal)
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">Auto-actualizado</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-800/90 border border-zinc-700 space-y-3 font-mono text-xs">
                      <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" />
                        <span>Pago Móvil (Bolívares)</span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-zinc-700/60 text-[11px]">
                        <span className="text-zinc-400 font-sans">Banco:</span>
                        <span className="text-white font-bold">
                          {paymentSettings.pagoMovil.banco} ({paymentSettings.pagoMovil.bancoCodigo || '0134'})
                        </span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-zinc-700/60 text-[11px]">
                        <span className="text-zinc-400 font-sans">Cédula / RIF:</span>
                        <span className="text-cyan-300 font-bold">{paymentSettings.pagoMovil.cedulaRif}</span>
                      </div>

                      <div className="flex justify-between py-1 border-b border-zinc-700/60 text-[11px]">
                        <span className="text-zinc-400 font-sans">Teléfono:</span>
                        <span className="text-cyan-300 font-bold">{paymentSettings.pagoMovil.telefono}</span>
                      </div>

                      <div className="flex justify-between py-1 text-[11px]">
                        <span className="text-zinc-400 font-sans">Tasa:</span>
                        <span className="text-amber-300 font-bold">{paymentSettings.pagoMovil.tasaInfo}</span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-zinc-400 leading-relaxed font-sans">
                      💡 Al presionar <strong>"Guardar Configuración"</strong>, cualquier cambio en tu banco, cédula, teléfono o links de Lemon Squeezy se reflejará al instante para todos los alumnos que abran el modal de checkout.
                    </div>
                  </div>
                </div>

              </form>
            </motion.div>
          )}

          {/* ── TAB 6: RED AGÉNTICA (ACTUALIZADO) ── */}
          {activeTab === 'agents' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-[#971B8D]" />
                    <span>Red Agéntica & Pipelines n8n</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Control de ejecución, latencias, kill-switch y consumo de tokens LLM.</p>
                </div>
                <a
                  href="https://n8n.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-xs font-bold text-zinc-800 hover:bg-zinc-50 transition-all shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-[#971B8D]" />
                  Abrir Editor n8n
                </a>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {agents.map((ag, idx) => {
                  const stripes = ['from-[#971B8D] to-[#EA0C7F]', 'from-[#1DACE3] to-[#86C537]', 'from-[#FEAD2B] to-[#971B8D]'];
                  const stripe = stripes[idx % stripes.length];

                  return (
                    <div key={ag.id} className="p-6 rounded-2xl border border-zinc-200 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm relative overflow-hidden">
                      <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stripe}`} />

                      <div className="flex items-start gap-3.5">
                        <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 text-[#971B8D]">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-zinc-900">{ag.name}</h4>
                            <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                              ag.status === 'ONLINE'
                                ? 'bg-[#86C537]/15 border-[#86C537]/30 text-[#639922]'
                                : ag.status === 'IDLE'
                                ? 'bg-[#FEAD2B]/15 border-[#FEAD2B]/30 text-[#b57311]'
                                : 'bg-red-50 border-red-300 text-red-800'
                            }`}>
                              {ag.status}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-500 mt-1">
                            Disparador: <span className="font-mono text-zinc-700 font-medium">{ag.trigger}</span>
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
                        <div>
                          <span className="text-zinc-400 block text-[10px] font-bold">EJECUCIONES HOY</span>
                          <span className="text-zinc-900 font-bold">{ag.executionsToday}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[10px] font-bold">TASA DE ERROR</span>
                          <span className="text-[#86C537] font-bold">{ag.errorRate}</span>
                        </div>
                        <div>
                          <span className="text-zinc-400 block text-[10px] font-bold">TOKENS CONSUMIDOS</span>
                          <span className="text-[#971B8D] font-bold">{ag.tokensConsumed}</span>
                        </div>

                        {/* Kill Switch Toggle */}
                        <button
                          onClick={() => toggleAgentStatus(ag.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-sans font-bold transition-all ${
                            ag.status === 'ONLINE'
                              ? 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
                              : 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          }`}
                        >
                          <Power className="w-3.5 h-3.5" />
                          <span>{ag.status === 'ONLINE' ? 'Pausar' : 'Activar'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ── TAB 7: NOTIFICACIONES (ACTUALIZADO) ── */}
          {activeTab === 'audits' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-[#EA0C7F]" />
                    <span>Notificaciones & Solicitudes de Diagnóstico</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Recepción de solicitudes directas de clientes gastronómicos para evaluación técnica y automatización.
                  </p>
                </div>

                <button
                  onClick={exportNotificationsCSV}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-50 transition-all shadow-sm"
                >
                  <DownloadCloud className="w-4 h-4 text-[#EA0C7F]" /> Exportar Notificaciones (CSV)
                </button>
              </div>

              {/* Status Alert */}
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#EA0C7F] to-[#971B8D]" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#EA0C7F]/10 border border-[#EA0C7F]/20 flex items-center justify-center text-[#EA0C7F] shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900">Pipeline de Notificaciones Transaccionales:</span>
                    <span className="text-zinc-500 block text-[11px]">
                      Conectado a `/api/leads` y listo para envío de correos por Resend y alertas a Telegram.
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#86C537]/15 text-[#639922] border border-[#86C537]/30 shrink-0 w-fit">
                  ● Endpoint Activo
                </span>
              </div>

              {/* Tabla de Notificaciones */}
              <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm">
                <div className="mb-5 relative max-w-sm">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Buscar por prospecto, empresa o email..."
                    value={searchAudit}
                    onChange={(e) => setSearchAudit(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 pl-10 pr-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[850px]">
                    <thead>
                      <tr className="border-b border-zinc-200 text-zinc-500 font-mono">
                        <th className="pb-3">FOLIO / EMPRESA</th>
                        <th className="pb-3">CONTACTO</th>
                        <th className="pb-3">SERVICIO SOLICITADO</th>
                        <th className="pb-3">VOLUMEN & ERP</th>
                        <th className="pb-3">FECHA</th>
                        <th className="pb-3">ESTADO</th>
                        <th className="pb-3 text-right">ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filteredNotifications.map((notif) => (
                        <tr key={notif.id} className="text-zinc-700 hover:bg-zinc-50/80 transition-colors">
                          <td className="py-3.5">
                            <div className="font-bold text-zinc-900">{notif.companyName}</div>
                            <div className="font-mono text-[10px] text-[#971B8D] font-bold">{notif.id}</div>
                          </td>
                          <td className="py-3.5">
                            <div className="font-bold text-zinc-900">{notif.fullName}</div>
                            <div className="text-[11px] text-zinc-500">{notif.corporateEmail}</div>
                            <a
                              href={`https://wa.me/${notif.phoneWhatsApp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-[#86C537] font-bold hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <Phone className="w-3 h-3" /> {notif.phoneWhatsApp}
                            </a>
                          </td>
                          <td className="py-3.5">
                            <span className="text-zinc-900 font-semibold">{notif.serviceNeeded}</span>
                            <div className="text-[10px] text-zinc-500">{notif.businessType}</div>
                          </td>
                          <td className="py-3.5">
                            <div className="text-zinc-800 font-mono text-[11px]">{notif.dailyVolume}</div>
                            <div className="text-zinc-500 text-[10px]">ERP: {notif.currentERP}</div>
                          </td>
                          <td className="py-3.5 font-mono text-zinc-500 text-[11px]">{notif.createdAt}</td>
                          <td className="py-3.5">
                            <select
                              value={notif.status}
                              onChange={(e) => handleUpdateAuditStatus(notif.id, e.target.value as any)}
                              className="bg-white border border-zinc-300 rounded-lg px-2.5 py-1 text-[11px] font-mono font-bold text-zinc-800 focus:outline-none focus:border-[#971B8D] shadow-xs"
                            >
                              <option value="Nuevo">Nuevo</option>
                              <option value="En Evaluación">En Evaluación</option>
                              <option value="Contactado">Contactado</option>
                              <option value="Cerrado / Pagado">Cerrado / Pagado</option>
                            </select>
                          </td>
                          <td className="py-3.5 text-right">
                            <button
                              onClick={() => setSelectedNotificationForModal(notif)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-800 transition-all shadow-xs"
                            >
                              <Eye className="w-3.5 h-3.5 text-zinc-600" />
                              <span>Ficha</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── MODAL: CREAR / EDITAR CURSO CON CREADOR DE MÓDULOS & QUIZES APROBATORIOS ── */}
        {isCourseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-4xl rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-2xl space-y-6 text-zinc-900 max-h-[92vh] flex flex-col justify-between">
              
              {/* Header Modal */}
              <div className="flex items-center justify-between border-b border-zinc-100 pb-4 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#971B8D] to-[#EA0C7F] text-white flex items-center justify-center shadow-md shadow-[#971B8D]/20">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900">
                      {editingCourse ? 'Configurador de Programa: ' + (courseFormData.title || 'Curso') : 'Crear Nuevo Programa Formativo'}
                    </h3>
                    <p className="text-xs text-zinc-500">Configura datos generales, lecciones en texto, prompts, descargas y quizes</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCourseModalOpen(false)}
                  className="text-zinc-400 hover:text-zinc-900 p-1.5 rounded-xl hover:bg-zinc-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Tabs de Navegación del Modal */}
              <div className="flex items-center gap-2 border-b border-zinc-200 pb-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setCourseModalTab('general')}
                  className={'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ' + (courseModalTab === 'general' ? 'bg-zinc-900 text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100')}
                >
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>1. Panel Comercial & Ventas</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCourseModalTab('modules')}
                  className={'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ' + (courseModalTab === 'modules' ? 'bg-[#971B8D] text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100')}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>2. Módulos & Temario ({courseFormData.modules?.length || 0})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCourseModalTab('quizes')}
                  className={'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ' + (courseModalTab === 'quizes' ? 'bg-[#EA0C7F] text-white shadow-xs' : 'text-zinc-600 hover:bg-zinc-100')}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>3. Quizes Evaluativos</span>
                </button>
              </div>

              {/* Contenido scrolleable del Modal */}
              <form onSubmit={handleSaveCourse} className="flex-1 overflow-y-auto pr-1 space-y-6 text-xs">
                
                {/* ── TAB 1: PANEL COMERCIAL & VENTAS ── */}
                {courseModalTab === 'general' && (
                  <div className="space-y-6">
                    {/* A. Datos Básicos */}
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                        <span className="font-mono text-xs font-bold text-zinc-800 uppercase flex items-center gap-1.5">
                          <Layers className="w-4 h-4 text-[#0284c7]" />
                          <span>A. Identidad y Posicionamiento del Curso</span>
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">Datos públicos visibles en catálogo</span>
                      </div>

                      <div>
                        <label className="block text-zinc-700 font-mono font-bold mb-1">TÍTULO DEL CURSO *</label>
                        <input
                          type="text"
                          required
                          value={courseFormData.title || ''}
                          onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                          placeholder="Ej. Curso Completo de Claude Code: Crea Aplicaciones con IA"
                          className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2.5 text-zinc-900 font-bold focus:border-[#0284c7] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-zinc-700 font-mono font-bold mb-1">SUBTÍTULO / TAGLINE COMERCIAL</label>
                        <textarea
                          rows={2}
                          value={courseFormData.tagline || ''}
                          onChange={(e) => setCourseFormData({ ...courseFormData, tagline: e.target.value })}
                          placeholder="Domina Claude Code a nivel profesional y crea aplicaciones reales y seguras con Agentes de IA..."
                          className="w-full rounded-xl border border-zinc-300 bg-white px-3.5 py-2 text-zinc-900 focus:border-[#0284c7] focus:outline-none resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">INSIGNIA (BADGE)</label>
                          <input
                            type="text"
                            value={courseFormData.badge || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, badge: e.target.value })}
                            placeholder="Ej. Lo más vendido"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 font-bold text-emerald-800 focus:border-[#0284c7] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">NIVEL</label>
                          <input
                            type="text"
                            value={courseFormData.level || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, level: e.target.value })}
                            placeholder="Ej. Desarrollo & Automatización"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-[#0284c7] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">DURACIÓN</label>
                          <input
                            type="text"
                            value={courseFormData.duration || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                            placeholder="Ej. 12 Secciones • 15 h 7 m"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-[#0284c7] focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">ACTUALIZACIÓN</label>
                          <input
                            type="text"
                            value={courseFormData.lastUpdated || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, lastUpdated: e.target.value })}
                            placeholder="Ej. 8/2026"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:border-[#0284c7] focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* B. Precios y Métricas de Conversión */}
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                        <span className="font-mono text-xs font-bold text-zinc-800 uppercase flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4 text-emerald-600" />
                          <span>B. Estrategia de Precios, Descuentos & Métricas</span>
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">Precios y prueba social</span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-zinc-700 font-mono font-bold mb-1">PRECIO ACTUAL ($ USD)</label>
                          <input
                            type="text"
                            value={courseFormData.price || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, price: e.target.value })}
                            placeholder="Ej. $97 USD"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 font-bold text-zinc-900 focus:border-emerald-600 focus:outline-none"
                          />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-zinc-700 font-mono font-bold mb-1">PRECIO ORIGINAL (TACHADO)</label>
                          <input
                            type="text"
                            value={courseFormData.originalPrice || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, originalPrice: e.target.value })}
                            placeholder="Ej. $197 USD"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-500 font-mono focus:border-emerald-600 focus:outline-none"
                          />
                        </div>
                        <div className="col-span-1 sm:col-span-2">
                          <label className="block text-zinc-700 font-mono font-bold mb-1">DESCUENTO (TAG)</label>
                          <input
                            type="text"
                            value={courseFormData.discount || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, discount: e.target.value })}
                            placeholder="Ej. 50% OFF"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-emerald-700 font-bold focus:border-emerald-600 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">CALIFICACIÓN (STARS)</label>
                          <input
                            type="number"
                            step="0.1"
                            min="1"
                            max="5"
                            value={courseFormData.rating || 4.9}
                            onChange={(e) => setCourseFormData({ ...courseFormData, rating: parseFloat(e.target.value) })}
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 font-bold text-amber-700 focus:border-amber-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">NÚMERO DE RESEÑAS</label>
                          <input
                            type="number"
                            value={courseFormData.reviewsCount || 0}
                            onChange={(e) => setCourseFormData({ ...courseFormData, reviewsCount: parseInt(e.target.value) || 0 })}
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-800 focus:border-zinc-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">ALUMNOS INSCRITOS</label>
                          <input
                            type="number"
                            value={courseFormData.studentsEnrolled || 0}
                            onChange={(e) => setCourseFormData({ ...courseFormData, studentsEnrolled: parseInt(e.target.value) || 0 })}
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-800 focus:border-zinc-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* C. Instructor */}
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                      <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                        <span className="font-mono text-xs font-bold text-zinc-800 uppercase flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-purple-600" />
                          <span>C. Instructor y Autoridad</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">NOMBRE DEL INSTRUCTOR</label>
                          <input
                            type="text"
                            value={courseFormData.instructorName || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, instructorName: e.target.value })}
                            placeholder="Julio Daza"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 font-bold focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">CARGO / ROL</label>
                          <input
                            type="text"
                            value={courseFormData.instructorRole || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, instructorRole: e.target.value })}
                            placeholder="Arquitecto de Sistemas & Fundador"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-800 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">URL FOTO AVATAR</label>
                          <input
                            type="url"
                            value={courseFormData.instructorAvatar || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, instructorAvatar: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-800 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* D. Lo que aprenderás (Competencias con Checkmarks) */}
                    <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-3">
                      <div className="flex items-center justify-between border-b border-sky-200/60 pb-2">
                        <span className="font-mono text-xs font-bold text-[#0284c7] uppercase flex items-center gap-1.5">
                          <CheckCircle className="w-4 h-4" />
                          <span>D. Lo que aprenderás ({courseFormData.outcomes?.length || 0} Competencias)</span>
                        </span>
                        <span className="text-[10px] text-sky-700">Sección destacada superior estilo Udemy</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={newOutcome}
                          onChange={(e) => setNewOutcome(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddOutcome(); } }}
                          placeholder="Escribe una competencia y presiona Enter o Agregar..."
                          className="flex-1 rounded-xl border border-sky-300 bg-white px-3.5 py-2 text-zinc-900 focus:border-[#0284c7] focus:outline-none text-xs"
                        />
                        <button
                          type="button"
                          onClick={handleAddOutcome}
                          className="px-4 py-2 rounded-xl bg-[#0284c7] text-white font-bold text-xs hover:bg-[#0369a1] transition-colors"
                        >
                          + Agregar
                        </button>
                      </div>

                      <div className="space-y-1.5 pt-1 max-h-48 overflow-y-auto">
                        {courseFormData.outcomes?.map((outcome, idx) => (
                          <div key={idx} className="flex items-start justify-between gap-2 p-2 rounded-lg bg-white border border-sky-100 text-zinc-800">
                            <div className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold">✓</span>
                              <span className="text-xs leading-snug">{outcome}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveOutcome(idx)}
                              className="text-zinc-400 hover:text-red-600 font-bold text-xs shrink-0 px-1"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* E. Este curso incluye */}
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
                      <span className="font-mono text-xs font-bold text-zinc-800 uppercase flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>E. Este Curso Incluye (Materiales & Entregables)</span>
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">HORAS DE VIDEO</label>
                          <input
                            type="text"
                            value={courseFormData.hoursVideo || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, hoursVideo: e.target.value })}
                            placeholder="13 horas de vídeo bajo demanda"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">CANTIDAD DE ARTÍCULOS</label>
                          <input
                            type="number"
                            value={courseFormData.articlesCount || 20}
                            onChange={(e) => setCourseFormData({ ...courseFormData, articlesCount: parseInt(e.target.value) || 0 })}
                            placeholder="26 artículos"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">RECURSOS DESCARGABLES</label>
                          <input
                            type="number"
                            value={courseFormData.resourcesCount || 25}
                            onChange={(e) => setCourseFormData({ ...courseFormData, resourcesCount: parseInt(e.target.value) || 0 })}
                            placeholder="49 recursos descargables"
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* F. Requisitos & Audiencia */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Requisitos */}
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                        <span className="font-mono text-xs font-bold text-zinc-800 uppercase flex items-center gap-1.5">
                          <span>Requisitos Previos ({courseFormData.requirements?.length || 0})</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newRequirement}
                            onChange={(e) => setNewRequirement(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddRequirement(); } }}
                            placeholder="Nuevo requisito..."
                            className="flex-1 rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-900 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleAddRequirement}
                            className="px-3 py-1.5 rounded-xl bg-zinc-800 text-white text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                        <div className="space-y-1 max-h-36 overflow-y-auto">
                          {courseFormData.requirements?.map((req, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs p-1.5 bg-white rounded-lg border border-zinc-200">
                              <span>• {req}</span>
                              <button type="button" onClick={() => handleRemoveRequirement(idx)} className="text-zinc-400 hover:text-red-600 px-1">✕</button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Audiencia */}
                      <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                        <span className="font-mono text-xs font-bold text-zinc-800 uppercase flex items-center gap-1.5">
                          <span>¿Para quién es este curso? ({courseFormData.audience?.length || 0})</span>
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={newAudience}
                            onChange={(e) => setNewAudience(e.target.value)}
                            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddAudience(); } }}
                            placeholder="Perfil de alumno..."
                            className="flex-1 rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-900 focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={handleAddAudience}
                            className="px-3 py-1.5 rounded-xl bg-zinc-800 text-white text-xs font-bold"
                          >
                            +
                          </button>
                        </div>
                        <div className="space-y-1 max-h-36 overflow-y-auto">
                          {courseFormData.audience?.map((aud, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs p-1.5 bg-white rounded-lg border border-zinc-200">
                              <span>• {aud}</span>
                              <button type="button" onClick={() => handleRemoveAudience(idx)} className="text-zinc-400 hover:text-red-600 px-1">✕</button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* G. Descripción Completa / Carta de Ventas */}
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                      <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                        <span className="font-mono text-xs font-bold text-zinc-800 uppercase flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <span>G. Descripción Detallada / Carta de Ventas Pedagógica</span>
                        </span>
                        <span className="text-[10px] text-zinc-400">Texto completo desplegado en el temario</span>
                      </div>

                      <textarea
                        rows={8}
                        value={courseFormData.description || ''}
                        onChange={(e) => setCourseFormData({ ...courseFormData, description: e.target.value })}
                        placeholder="Escribe la carta de ventas completa del curso con secciones: ¿Qué lograrás con este curso?, Tecnologías que dominarás, Transformación garantizada..."
                        className="w-full rounded-xl border border-zinc-300 bg-white p-3 text-xs text-zinc-900 leading-relaxed focus:border-[#0284c7] focus:outline-none font-mono"
                      />
                    </div>

                    {/* H. Activos Visuales, Checkout y Estado */}
                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                      <span className="font-mono text-xs font-bold text-zinc-800 uppercase">
                        H. Activos Visuales, Enlace de Pago & Estado
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">URL IMAGEN DE PORTADA</label>
                          <input
                            type="url"
                            value={courseFormData.previewImage || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, previewImage: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">ENLACE DE CHECKOUT</label>
                          <input
                            type="text"
                            value={courseFormData.ctaUrl || ''}
                            onChange={(e) => setCourseFormData({ ...courseFormData, ctaUrl: e.target.value })}
                            placeholder="https://inteligencia-neuronal.lemonsqueezy.com/..."
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-zinc-700 font-mono font-bold mb-1">ESTADO DEL CURSO</label>
                          <select
                            value={courseFormData.status || 'ACTIVO'}
                            onChange={(e) => setCourseFormData({ ...courseFormData, status: e.target.value as any })}
                            className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 font-bold focus:outline-none"
                          >
                            <option value="ACTIVO">ACTIVO (Público)</option>
                            <option value="BORRADOR">BORRADOR (Oculto)</option>
                            <option value="ARCHIVADO">ARCHIVADO</option>
                          </select>
                        </div>
                      </div>
                    </div>

                  </div>
                )}

                {/* ── TAB 2: GESTOR DE MÓDULOS, LECCIONES, TEXTO COMPLETO, PROMPTS Y DESCARGAS ── */}
                {courseModalTab === 'modules' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-xs font-bold text-zinc-900 uppercase font-mono">
                          Módulos & Contenido Pedagógico
                        </h4>
                        <p className="text-[11px] text-zinc-500">
                          Redacta el texto de la lección, videos, prompts de IA y adjunta descargables/blueprints
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const currentMods = courseFormData.modules || [];
                          const nextIdx = currentMods.length + 1;
                          const newMod: CourseModuleForm = {
                            week_label: `0${nextIdx}`,
                            title: `Módulo ${nextIdx}: Nuevo Módulo`,
                            description: 'Descripción breve de la sección',
                            video_url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            summary: 'Resumen técnico de la clase',
                            content_text: '### Guía Paso a Paso de la Unidad\n\nEscribe aquí la explicación detallada, comandos bash, arquitectura y consideraciones técnicas...',
                            prompts: ['Actúa como un Ingeniero de Automatización y genera...'],
                            downloads: [{ name: 'Blueprint_Flujo_n8n.json', type: 'JSON / n8n', url: '#' }],
                            quiz: { enabled: true, passing_score: 80, questions: [] },
                          };
                          setCourseFormData({ ...courseFormData, modules: [...currentMods, newMod] });
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#971B8D] text-white text-xs font-bold hover:bg-[#801676] shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Agregar Módulo</span>
                      </button>
                    </div>

                    <div className="space-y-6">
                      {courseFormData.modules?.map((mod, mIdx) => (
                        <div key={mIdx} className="p-5 rounded-2xl border border-zinc-200 bg-zinc-50 space-y-4">
                          
                          {/* Header del Módulo */}
                          <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
                            <span className="font-mono text-[10px] font-bold text-[#971B8D] bg-purple-50 px-2.5 py-0.5 rounded border border-purple-200">
                              MÓDULO #{mIdx + 1}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...(courseFormData.modules || [])];
                                updated.splice(mIdx, 1);
                                setCourseFormData({ ...courseFormData, modules: updated });
                              }}
                              className="text-red-600 hover:text-red-800 text-[11px] font-bold"
                            >
                              Eliminar Módulo ✕
                            </button>
                          </div>

                          {/* Título y Código */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                            <div className="sm:col-span-1">
                              <label className="block text-zinc-600 font-mono text-[10px] font-bold mb-1">ETIQUETA</label>
                              <input
                                type="text"
                                value={mod.week_label || ''}
                                onChange={(e) => {
                                  const updated = [...(courseFormData.modules || [])];
                                  updated[mIdx].week_label = e.target.value;
                                  setCourseFormData({ ...courseFormData, modules: updated });
                                }}
                                placeholder="01"
                                className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs text-zinc-900"
                              />
                            </div>

                            <div className="sm:col-span-3">
                              <label className="block text-zinc-600 font-mono text-[10px] font-bold mb-1">TÍTULO DEL MÓDULO</label>
                              <input
                                type="text"
                                value={mod.title || ''}
                                onChange={(e) => {
                                  const updated = [...(courseFormData.modules || [])];
                                  updated[mIdx].title = e.target.value;
                                  setCourseFormData({ ...courseFormData, modules: updated });
                                }}
                                placeholder="Módulo 01: Arquitectura & Setup"
                                className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs text-zinc-900 font-bold"
                              />
                            </div>
                          </div>

                          {/* Video URL & Resumen */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-zinc-600 font-mono text-[10px] font-bold mb-1">URL DEL VIDEO (YouTube / Loom / Vimeo)</label>
                              <input
                                type="text"
                                value={mod.video_url || ''}
                                onChange={(e) => {
                                  const updated = [...(courseFormData.modules || [])];
                                  updated[mIdx].video_url = e.target.value;
                                  setCourseFormData({ ...courseFormData, modules: updated });
                                }}
                                placeholder="https://www.youtube.com/embed/..."
                                className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs text-zinc-900 font-mono"
                              />
                            </div>
                            <div>
                              <label className="block text-zinc-600 font-mono text-[10px] font-bold mb-1">RESUMEN CORTO</label>
                              <input
                                type="text"
                                value={mod.summary || ''}
                                onChange={(e) => {
                                  const updated = [...(courseFormData.modules || [])];
                                  updated[mIdx].summary = e.target.value;
                                  setCourseFormData({ ...courseFormData, modules: updated });
                                }}
                                placeholder="Breve sinopsis para la cabecera..."
                                className="w-full rounded-lg border border-zinc-300 bg-white px-2.5 py-1.5 text-xs text-zinc-900"
                              />
                            </div>
                          </div>

                          {/* 📝 EDITOR DE CONTENIDO ESCRITO / UNIDAD FORMATO TEXTO */}
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <label className="block text-zinc-700 font-mono text-[10px] font-bold uppercase flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5 text-[#1DACE3]" />
                                <span>Contenido de la Unidad en Formato Texto (Guía / Manual Completo)</span>
                              </label>
                              <span className="text-[10px] text-zinc-400 font-mono">Soporta Markdown & Código</span>
                            </div>
                            <textarea
                              rows={5}
                              value={mod.content_text || ''}
                              onChange={(e) => {
                                const updated = [...(courseFormData.modules || [])];
                                updated[mIdx].content_text = e.target.value;
                                setCourseFormData({ ...courseFormData, modules: updated });
                              }}
                              placeholder="Redacta la guía completa de la lección, comandos, explicaciones y manual paso a paso..."
                              className="w-full rounded-xl border border-zinc-300 bg-white p-3 text-xs text-zinc-900 font-mono focus:border-[#971B8D] focus:outline-none"
                            />
                          </div>

                          {/* 🤖 GESTOR DE PROMPTS DE IA */}
                          <div className="p-3.5 bg-white rounded-xl border border-zinc-200 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] font-bold text-[#0284c7] uppercase">
                                Prompts de IA ({mod.prompts?.length || 0})
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(courseFormData.modules || [])];
                                  const list = updated[mIdx].prompts || [];
                                  updated[mIdx].prompts = [...list, 'Nuevo prompt para copiar y pegar...'];
                                  setCourseFormData({ ...courseFormData, modules: updated });
                                }}
                                className="text-[11px] font-bold text-[#0284c7] hover:underline"
                              >
                                + Agregar Prompt
                              </button>
                            </div>

                            {mod.prompts?.map((pr, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-2">
                                <textarea
                                  rows={2}
                                  value={pr}
                                  onChange={(e) => {
                                    const updated = [...(courseFormData.modules || [])];
                                    updated[mIdx].prompts![pIdx] = e.target.value;
                                    setCourseFormData({ ...courseFormData, modules: updated });
                                  }}
                                  className="w-full rounded-lg border border-zinc-300 p-2 text-xs font-mono text-zinc-800"
                                  placeholder="Escribe el prompt aquí..."
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...(courseFormData.modules || [])];
                                    updated[mIdx].prompts!.splice(pIdx, 1);
                                    setCourseFormData({ ...courseFormData, modules: updated });
                                  }}
                                  className="text-red-500 hover:text-red-700 text-xs font-bold p-1"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* 📥 GESTOR DE DESCARGAS / BLUEPRINTS */}
                          <div className="p-3.5 bg-white rounded-xl border border-zinc-200 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] font-bold text-emerald-700 uppercase">
                                Blueprints & Archivos Descargables ({mod.downloads?.length || 0})
                              </span>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...(courseFormData.modules || [])];
                                  const list = updated[mIdx].downloads || [];
                                  updated[mIdx].downloads = [...list, { name: 'Plantilla.xlsx', type: 'Excel', url: '#' }];
                                  setCourseFormData({ ...courseFormData, modules: updated });
                                }}
                                className="text-[11px] font-bold text-emerald-700 hover:underline"
                              >
                                + Agregar Archivo
                              </button>
                            </div>

                            {mod.downloads?.map((dl, dIdx) => (
                              <div key={dIdx} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
                                <input
                                  type="text"
                                  value={dl.name}
                                  onChange={(e) => {
                                    const updated = [...(courseFormData.modules || [])];
                                    updated[mIdx].downloads![dIdx].name = e.target.value;
                                    setCourseFormData({ ...courseFormData, modules: updated });
                                  }}
                                  placeholder="Nombre del archivo (ej. Flujo_n8n.json)"
                                  className="sm:col-span-5 rounded-lg border border-zinc-300 px-2.5 py-1.5 text-xs"
                                />
                                <input
                                  type="text"
                                  value={dl.type || ''}
                                  onChange={(e) => {
                                    const updated = [...(courseFormData.modules || [])];
                                    updated[mIdx].downloads![dIdx].type = e.target.value;
                                    setCourseFormData({ ...courseFormData, modules: updated });
                                  }}
                                  placeholder="Tipo (ej. JSON)"
                                  className="sm:col-span-3 rounded-lg border border-zinc-300 px-2.5 py-1.5 text-xs"
                                />
                                <input
                                  type="text"
                                  value={dl.url}
                                  onChange={(e) => {
                                    const updated = [...(courseFormData.modules || [])];
                                    updated[mIdx].downloads![dIdx].url = e.target.value;
                                    setCourseFormData({ ...courseFormData, modules: updated });
                                  }}
                                  placeholder="URL / Ruta de descarga"
                                  className="sm:col-span-3 rounded-lg border border-zinc-300 px-2.5 py-1.5 text-xs font-mono"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...(courseFormData.modules || [])];
                                    updated[mIdx].downloads!.splice(dIdx, 1);
                                    setCourseFormData({ ...courseFormData, modules: updated });
                                  }}
                                  className="sm:col-span-1 text-red-500 hover:text-red-700 text-xs font-bold text-center"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── TAB 3: CONFIGURADOR DE QUIZES APROBATORIOS & % PERSONALIZABLE ── */}
                {courseModalTab === 'quizes' && (
                  <div className="space-y-6">
                    
                    {/* Selector de Módulo para el Quiz */}
                    <div className="p-4 rounded-2xl bg-pink-50/50 border border-pink-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="font-mono text-[10px] font-bold text-[#EA0C7F] uppercase tracking-wider block">
                          MÓDULO A EVALUAR
                        </span>
                        <div className="flex items-center gap-2 mt-1">
                          <select
                            value={selectedModuleQuizIndex}
                            onChange={(e) => setSelectedModuleQuizIndex(Number(e.target.value))}
                            className="px-3 py-1.5 rounded-xl border border-pink-200 bg-white text-xs font-bold text-zinc-900 focus:outline-none"
                          >
                            {courseFormData.modules?.map((m, idx) => (
                              <option key={idx} value={idx}>
                                {m.title || 'Módulo ' + (idx + 1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Switch de Activación */}
                      {courseFormData.modules && courseFormData.modules[selectedModuleQuizIndex] && (
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 text-xs font-bold text-zinc-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={courseFormData.modules[selectedModuleQuizIndex]?.quiz?.enabled ?? true}
                              onChange={(e) => {
                                const updated = [...(courseFormData.modules || [])];
                                if (!updated[selectedModuleQuizIndex].quiz) {
                                  updated[selectedModuleQuizIndex].quiz = { enabled: true, passing_score: 80, questions: [] };
                                }
                                updated[selectedModuleQuizIndex].quiz!.enabled = e.target.checked;
                                setCourseFormData({ ...courseFormData, modules: updated });
                              }}
                              className="rounded text-[#EA0C7F] focus:ring-[#EA0C7F] w-4 h-4"
                            />
                            <span>Activar Quiz Aprobatorio</span>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* Editor del Quiz del Módulo Seleccionado */}
                    {courseFormData.modules && courseFormData.modules[selectedModuleQuizIndex] && (
                      <div className="space-y-6">
                        
                        {/* 🎯 CONTROL DEL NIVEL DE APROBACIÓN (% PERSONALIZABLE) */}
                        <div className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Sliders className="w-4 h-4 text-[#EA0C7F]" />
                              <span className="font-mono text-xs font-bold text-zinc-900 uppercase">
                                Nivel Mínimo de Aprobación Requerido:
                              </span>
                            </div>
                            <span className="font-mono text-sm font-extrabold text-[#EA0C7F] bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
                              {courseFormData.modules[selectedModuleQuizIndex]?.quiz?.passing_score || 80}% MÍNIMO
                            </span>
                          </div>

                          <div className="flex items-center gap-4">
                            <input
                              type="range"
                              min={50}
                              max={100}
                              step={5}
                              value={courseFormData.modules[selectedModuleQuizIndex]?.quiz?.passing_score || 80}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                const updated = [...(courseFormData.modules || [])];
                                if (!updated[selectedModuleQuizIndex].quiz) {
                                  updated[selectedModuleQuizIndex].quiz = { enabled: true, passing_score: 80, questions: [] };
                                }
                                updated[selectedModuleQuizIndex].quiz!.passing_score = val;
                                setCourseFormData({ ...courseFormData, modules: updated });
                              }}
                              className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#EA0C7F]"
                            />
                            <input
                              type="number"
                              min={50}
                              max={100}
                              value={courseFormData.modules[selectedModuleQuizIndex]?.quiz?.passing_score || 80}
                              onChange={(e) => {
                                const val = Number(e.target.value);
                                const updated = [...(courseFormData.modules || [])];
                                if (!updated[selectedModuleQuizIndex].quiz) {
                                  updated[selectedModuleQuizIndex].quiz = { enabled: true, passing_score: 80, questions: [] };
                                }
                                updated[selectedModuleQuizIndex].quiz!.passing_score = val;
                                setCourseFormData({ ...courseFormData, modules: updated });
                              }}
                              className="w-16 px-2 py-1 rounded-lg border border-zinc-300 text-center font-mono font-bold text-xs"
                            />
                          </div>

                          <p className="text-[11px] text-zinc-500">
                            El alumno deberá acertar este porcentaje de preguntas para que el módulo cuente como superado y se habilite el certificado.
                          </p>
                        </div>

                        {/* Preguntas del Quiz */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs font-bold text-zinc-900 uppercase">
                              Preguntas de Evaluación ({courseFormData.modules[selectedModuleQuizIndex]?.quiz?.questions?.length || 0})
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const updated = [...(courseFormData.modules || [])];
                                const currentQuiz = updated[selectedModuleQuizIndex].quiz || { enabled: true, passing_score: 80, questions: [] };
                                const newQ: QuizQuestionForm = {
                                  question: 'Nueva Pregunta Técnica',
                                  options: ['Opción A', 'Opción B', 'Opción C'],
                                  correctIndex: 0,
                                  explanation: 'Explicación del por qué es la respuesta correcta.',
                                };
                                currentQuiz.questions.push(newQ);
                                updated[selectedModuleQuizIndex].quiz = currentQuiz;
                                setCourseFormData({ ...courseFormData, modules: updated });
                              }}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EA0C7F] text-white text-xs font-bold hover:bg-[#c7096b] shadow-xs"
                            >
                              <Plus className="w-3.5 h-3.5" />
                              <span>Agregar Pregunta</span>
                            </button>
                          </div>

                          {courseFormData.modules[selectedModuleQuizIndex]?.quiz?.questions?.map((q, qIdx) => (
                            <div key={qIdx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] font-bold text-[#EA0C7F]">
                                  PREGUNTA #{qIdx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    const updated = [...(courseFormData.modules || [])];
                                    updated[selectedModuleQuizIndex].quiz!.questions.splice(qIdx, 1);
                                    setCourseFormData({ ...courseFormData, modules: updated });
                                  }}
                                  className="text-red-600 hover:text-red-800 text-[11px] font-bold"
                                >
                                  Eliminar Pregunta ✕
                                </button>
                              </div>

                              <div>
                                <label className="block text-zinc-700 font-mono text-[10px] font-bold mb-1">ENUNCIADO DE LA PREGUNTA</label>
                                <input
                                  type="text"
                                  value={q.question}
                                  onChange={(e) => {
                                    const updated = [...(courseFormData.modules || [])];
                                    updated[selectedModuleQuizIndex].quiz!.questions[qIdx].question = e.target.value;
                                    setCourseFormData({ ...courseFormData, modules: updated });
                                  }}
                                  placeholder="¿Qué parámetro debe enviarse en...?"
                                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-xs font-bold text-zinc-900"
                                />
                              </div>

                              {/* Opciones de Respuesta & Radio de Opción Correcta */}
                              <div className="space-y-2 pt-1">
                                <label className="block text-zinc-700 font-mono text-[10px] font-bold">
                                  OPCIONES (Marca con el círculo verde la respuesta correcta):
                                </label>
                                {q.options.map((opt, oIdx) => (
                                  <div key={oIdx} className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name={'correct_' + selectedModuleQuizIndex + '_' + qIdx}
                                      checked={q.correctIndex === oIdx}
                                      onChange={() => {
                                        const updated = [...(courseFormData.modules || [])];
                                        updated[selectedModuleQuizIndex].quiz!.questions[qIdx].correctIndex = oIdx;
                                        setCourseFormData({ ...courseFormData, modules: updated });
                                      }}
                                      className="w-4 h-4 accent-emerald-600 cursor-pointer"
                                      title="Marcar como respuesta correcta"
                                    />
                                    <input
                                      type="text"
                                      value={opt}
                                      onChange={(e) => {
                                        const updated = [...(courseFormData.modules || [])];
                                        updated[selectedModuleQuizIndex].quiz!.questions[qIdx].options[oIdx] = e.target.value;
                                        setCourseFormData({ ...courseFormData, modules: updated });
                                      }}
                                      placeholder={'Opción ' + (oIdx + 1)}
                                      className={'w-full rounded-lg border px-3 py-1.5 text-xs ' + (q.correctIndex === oIdx ? 'border-emerald-400 bg-emerald-50/50 font-semibold text-emerald-900' : 'border-zinc-300 bg-white text-zinc-800')}
                                    />
                                  </div>
                                ))}
                              </div>

                              <div>
                                <label className="block text-zinc-700 font-mono text-[10px] font-bold mb-1">
                                  💡 EXPLICACIÓN TÉCNICA (Feedback para el Alumno)
                                </label>
                                <textarea
                                  rows={2}
                                  value={q.explanation}
                                  onChange={(e) => {
                                    const updated = [...(courseFormData.modules || [])];
                                    updated[selectedModuleQuizIndex].quiz!.questions[qIdx].explanation = e.target.value;
                                    setCourseFormData({ ...courseFormData, modules: updated });
                                  }}
                                  placeholder="Explica por qué esta es la respuesta correcta para enriquecer el aprendizaje..."
                                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-xs text-zinc-800 resize-none"
                                />
                              </div>

                            </div>
                          ))}
                        </div>

                      </div>
                    )}

                  </div>
                )}

                {/* Footer Modal con Botón de Guardar */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-100 shrink-0">
                  <div className="text-[11px] text-zinc-500 font-mono">
                    Los cambios se sincronizan en tiempo real con Supabase y el Campus.
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsCourseModalOpen(false)}
                      className="px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors font-semibold text-xs"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#971B8D] to-[#EA0C7F] hover:opacity-95 text-white font-bold text-xs transition-all shadow-md shadow-[#971B8D]/30"
                    >
                      Guardar Programa & Quizes
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        )}

        {/* ── MODAL: AGREGAR / EDITAR ACTIVO OPERATIVO (CON ADJUNTOS E IMAGEN) ── */}
        {isResourceModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-7 sm:p-9 shadow-2xl space-y-5 text-zinc-900 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#FEAD2B]/15 text-[#b57311] flex items-center justify-center">
                    <FolderDown className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">
                    {editingResource ? 'Editar Activo Operativo' : 'Cargar Nuevo Activo'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsResourceModalOpen(false)}
                  className="text-zinc-400 hover:text-zinc-900 p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveResource} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-700 font-mono font-bold mb-1">NOMBRE DEL ACTIVO *</label>
                  <input
                    type="text"
                    required
                    value={resourceFormData.name}
                    onChange={(e) => setResourceFormData({ ...resourceFormData, name: e.target.value })}
                    placeholder="Ej. Matriz de Rentabilidad & Food Cost 2026"
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-mono font-bold mb-1">DESCRIPCIÓN DEL RECURSO</label>
                  <textarea
                    rows={2}
                    value={resourceFormData.description}
                    onChange={(e) => setResourceFormData({ ...resourceFormData, description: e.target.value })}
                    placeholder="Detalles sobre lo que incluye la plantilla o matriz..."
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1 flex items-center gap-1">
                      <Paperclip className="w-3.5 h-3.5 text-[#1DACE3]" /> ENLACE / ARCHIVO A DESCARGAR
                    </label>
                    <input
                      type="text"
                      value={resourceFormData.fileUrl}
                      onChange={(e) => setResourceFormData({ ...resourceFormData, fileUrl: e.target.value })}
                      placeholder="/downloads/mi-plantilla.xlsx o URL"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1 flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5 text-[#EA0C7F]" /> URL DE CAPTURA / PREVIEW
                    </label>
                    <input
                      type="url"
                      value={resourceFormData.previewImage}
                      onChange={(e) => setResourceFormData({ ...resourceFormData, previewImage: e.target.value })}
                      placeholder="https://ejemplo.com/captura.png"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">FORMATO</label>
                    <input
                      type="text"
                      value={resourceFormData.format}
                      onChange={(e) => setResourceFormData({ ...resourceFormData, format: e.target.value })}
                      placeholder="Ej. XLSX / PDF / Notion"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">CATEGORÍA / TAG</label>
                    <input
                      type="text"
                      value={resourceFormData.tag}
                      onChange={(e) => setResourceFormData({ ...resourceFormData, tag: e.target.value })}
                      placeholder="Ej. FINANZAS / AEO"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">MODELO DE ACCESO</label>
                    <select
                      value={resourceFormData.access || "GRATUITO (LEAD)"}
                      onChange={(e) => {
                        const val = e.target.value;
                        setResourceFormData({
                          ...resourceFormData,
                          access: val,
                          price: val === "PREMIUM (PAGO)" ? (resourceFormData.price && resourceFormData.price !== "GRATIS" ? resourceFormData.price : "$27 USD") : "GRATIS",
                        });
                      }}
                      className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-zinc-900 font-bold focus:border-[#971B8D] focus:outline-none"
                    >
                      <option value="GRATUITO (LEAD)">🎁 GRATUITO (Captura Lead)</option>
                      <option value="PREMIUM (PAGO)">💎 PREMIUM (De Pago)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1 flex items-center justify-between">
                      <span>PRECIO (USD)</span>
                      {resourceFormData.access === "PREMIUM (PAGO)" && (
                        <span className="text-[10px] text-amber-600 font-bold">DE PAGO</span>
                      )}
                    </label>
                    <input
                      type="text"
                      disabled={resourceFormData.access !== "PREMIUM (PAGO)"}
                      value={resourceFormData.access === "PREMIUM (PAGO)" ? (resourceFormData.price || "$27 USD") : "GRATIS"}
                      onChange={(e) => setResourceFormData({ ...resourceFormData, price: e.target.value })}
                      placeholder="Ej. $27 USD"
                      className={"w-full rounded-xl border px-3 py-2 text-zinc-900 font-bold focus:outline-none " + (resourceFormData.access === "PREMIUM (PAGO)" ? "border-amber-400 bg-amber-50/50 text-amber-900 focus:border-[#971B8D]" : "border-zinc-300 bg-zinc-100 text-zinc-400 opacity-60")}
                    />
                  </div>
                </div>

                {resourceFormData.previewImage && (
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                    <span className="text-[10px] font-mono text-zinc-400 block mb-1.5 font-bold">CAPTURA PREVIA:</span>
                    <div className="h-24 w-full rounded-lg overflow-hidden bg-zinc-200">
                      <img src={resourceFormData.previewImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
                  <button
                    type="button"
                    onClick={() => setIsResourceModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#971B8D] hover:bg-[#801676] text-white font-bold transition-all shadow-md shadow-[#971B8D]/30"
                  >
                    Guardar Activo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── MODAL: FICHA TÉCNICA DE NOTIFICACIÓN & DIAGNÓSTICO ── */}
        {selectedNotificationForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl space-y-6 text-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EA0C7F]" />
                  <h3 className="text-base font-bold text-zinc-900">
                    Ficha de Notificación: {selectedNotificationForModal.id}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedNotificationForModal(null)}
                  className="text-zinc-400 hover:text-zinc-900 p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Empresa / Marca:</span>
                    <span className="text-zinc-900 font-bold">{selectedNotificationForModal.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Responsable / Solicitante:</span>
                    <span className="text-zinc-800 font-semibold">{selectedNotificationForModal.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Email Corporativo:</span>
                    <span className="text-zinc-900 font-bold">{selectedNotificationForModal.corporateEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">WhatsApp Directo:</span>
                    <a
                      href={`https://wa.me/${selectedNotificationForModal.phoneWhatsApp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#86C537] font-bold underline"
                    >
                      {selectedNotificationForModal.phoneWhatsApp}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200">
                    <span className="text-zinc-400 block text-[10px] font-bold">MODELO OPERATIVO</span>
                    <span className="text-zinc-900 font-bold">{selectedNotificationForModal.businessType}</span>
                  </div>
                  <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200">
                    <span className="text-zinc-400 block text-[10px] font-bold">VOLUMEN DIARIO</span>
                    <span className="text-zinc-900 font-bold">{selectedNotificationForModal.dailyVolume}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <span className="text-zinc-400 block text-[10px] font-bold">SISTEMA POS / ERP ACTUAL</span>
                  <span className="text-zinc-900 font-bold">{selectedNotificationForModal.currentERP}</span>
                </div>

                <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <span className="text-zinc-400 block text-[10px] font-bold mb-1">CUELLO DE BOTELLA / FUGAS DECLARADAS</span>
                  <p className="text-zinc-700 font-sans text-xs leading-relaxed">
                    {selectedNotificationForModal.primaryBottleneck || 'No especificado'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                <a
                  href={`mailto:${selectedNotificationForModal.corporateEmail}?subject=Diagnóstico de Automatización - Inteligencia Neuronal`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#971B8D] text-white font-bold text-xs hover:bg-[#801676] transition-all shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Enviar Correo</span>
                </a>
                <button
                  onClick={() => setSelectedNotificationForModal(null)}
                  className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 text-xs font-semibold transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── MODAL: MATRICULAR ALUMNO EN EL CAMPUS ── */}
        {isEnrollModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-7 sm:p-9 shadow-2xl space-y-5 text-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-zinc-900">Matricular Alumno en Campus Virtual</h3>
                    <p className="text-[11px] text-zinc-500 font-mono">Alta manual de acceso y envío de bienvenida</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEnrollModalOpen(false)}
                  className="text-zinc-400 hover:text-zinc-900 p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {enrollSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{enrollSuccessMsg}</span>
                </div>
              )}

              <form onSubmit={handleEnrollStudent} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-700 font-mono font-bold mb-1">NOMBRE COMPLETO DEL ALUMNO *</label>
                  <input
                    type="text"
                    required
                    value={enrollFormData.fullName}
                    onChange={(e) => setEnrollFormData({ ...enrollFormData, fullName: e.target.value })}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-mono font-bold mb-1">CORREO ELECTRÓNICO (USUARIO) *</label>
                  <input
                    type="email"
                    required
                    value={enrollFormData.email}
                    onChange={(e) => setEnrollFormData({ ...enrollFormData, email: e.target.value })}
                    placeholder="carlos@restaurant.com"
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">TELÉFONO / WHATSAPP</label>
                    <input
                      type="text"
                      value={enrollFormData.phone}
                      onChange={(e) => setEnrollFormData({ ...enrollFormData, phone: e.target.value })}
                      placeholder="0414-1234567"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">CURSO / PROGRAMA *</label>
                    <select
                      value={enrollFormData.courseId}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        const titleMap: Record<string, string> = {
                          "masterclass-ia-restaurantes": "Masterclass: Inteligencia Artificial para Restaurantes & Food Cost",
                          "bootcamp-n8n-ia": "Bootcamp Técnico: Arquitectura de Agentes & n8n",
                          "crecimiento-aeo-local": "Dominio Local & AEO Gastronómico",
                        };
                        setEnrollFormData({
                          ...enrollFormData,
                          courseId: selectedId,
                          courseTitle: titleMap[selectedId] || "Programa Academy",
                        });
                      }}
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    >
                      <option value="masterclass-ia-restaurantes">Masterclass IA Restaurantes ($97)</option>
                      <option value="bootcamp-n8n-ia">Bootcamp n8n ($197)</option>
                      <option value="crecimiento-aeo-local">Dominio Local AEO ($67)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
                  <input
                    type="checkbox"
                    id="sendEmailCheck"
                    checked={enrollFormData.sendEmail}
                    onChange={(e) => setEnrollFormData({ ...enrollFormData, sendEmail: e.target.checked })}
                    className="rounded text-[#971B8D] focus:ring-[#971B8D] w-4 h-4"
                  />
                  <label htmlFor="sendEmailCheck" className="text-zinc-700 font-semibold cursor-pointer">
                    Enviar correo automático de bienvenida y acceso vía Resend
                  </label>
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEnrollModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 font-semibold text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isEnrollingStudent}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isEnrollingStudent ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Matriculando...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Confirmar Matrícula</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
