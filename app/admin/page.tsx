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
  UploadCloud
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
  downloads: number;
  tag: string;
  fileUrl?: string;
  previewImage?: string;
  description?: string;
}

interface CourseItem {
  id: string;
  title: string;
  badge: string;
  level: string;
  price: string;
  duration: string;
  tagline: string;
  previewImage?: string;
  tools: string[];
  modulesCount: number;
  studentsEnrolled: number;
  ctaUrl: string;
  status: 'ACTIVO' | 'BORRADOR' | 'ARCHIVADO';
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
  const [timeFilter, setTimeFilter] = useState<'today' | '7d' | '30d' | 'all'>('30d');
  
  // Search Filters
  const [searchResource, setSearchResource] = useState('');
  const [searchCourse, setSearchCourse] = useState('');
  const [searchLead, setSearchLead] = useState('');
  const [searchAudit, setSearchAudit] = useState('');

  // ── 1. NOTIFICACIONES & AUDITORÍAS STATE ──
  const [notifications, setNotifications] = useState<AuditNotification[]>([
    {
      id: 'NOTIF-98214',
      fullName: 'Roberto Valenzuela',
      companyName: 'Grupo Gastronómico Altamira',
      corporateEmail: 'roberto@grupoaltamira.com',
      phoneWhatsApp: '+584148817137',
      businessType: 'Cadena de Restaurantes',
      dailyVolume: '2,000 - 10,000 órdenes / día',
      currentERP: 'Oracle Micros / Simphony',
      primaryBottleneck: 'Fugas en Food Cost de proteínas prime y lentitud en sincronización KDS con sala.',
      serviceNeeded: 'Auditoría de Ecosistema Digital ($450 USD)',
      status: 'Nuevo',
      source: 'solicitar_diagnostico',
      createdAt: '19 Ago 2026, 05:30 AM',
    },
    {
      id: 'NOTIF-98213',
      fullName: 'Carlos Mendoza',
      companyName: 'Bistro Gourmet 54',
      corporateEmail: 'gerencia@bistro54.mx',
      phoneWhatsApp: '+525549123456',
      businessType: 'Dark Kitchen / Cocina Central',
      dailyVolume: '500 - 2,000 órdenes / día',
      currentERP: 'Toast POS',
      primaryBottleneck: 'Demoras en WhatsApp y órdenes de compras manuales a proveedores sin predicción.',
      serviceNeeded: 'Sistemas Agénticos Autónomos',
      status: 'En Evaluación',
      source: 'hero_soy_empresa',
      createdAt: '18 Ago 2026, 08:45 PM',
    },
    {
      id: 'NOTIF-98212',
      fullName: 'Valeria Gómez',
      companyName: 'Burger Lab Express',
      corporateEmail: 'operaciones@burgerlab.co',
      phoneWhatsApp: '+573109876543',
      businessType: 'Franquicia Multisede',
      dailyVolume: '> 10,000 órdenes / día (Enterprise)',
      currentERP: 'Soft Restaurant',
      primaryBottleneck: 'Altas comisiones pagadas a plataformas de delivery externas (30% margen perdido).',
      serviceNeeded: 'Infraestructura & Plataformas FoodTech',
      status: 'Contactado',
      source: 'soluciones_card',
      createdAt: '18 Ago 2026, 02:15 PM',
    },
  ]);

  const [selectedNotificationForModal, setSelectedNotificationForModal] = useState<AuditNotification | null>(null);

  // Sync with API leads
  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads && Array.isArray(data.leads) && data.leads.length > 0) {
          const audits = data.leads.filter((l: any) => !l.fullName?.startsWith('Lead Toolkit'));
          if (audits.length > 0) {
            setNotifications(audits);
          }
        }
      })
      .catch((e) => console.warn('API leads fetch fallback', e));
  }, []);

  // ── 2. GESTOR DE CURSOS STATE & CRUD ──
  const [coursesList, setCoursesList] = useState<CourseItem[]>([
    {
      id: 'course-ia-restaurantes',
      title: 'Masterclass: Automatización Agéntica con IA',
      badge: 'MÁS POPULAR',
      level: 'Operativo & Estratégico',
      price: '$97 USD',
      duration: '4 Módulos Intensivos',
      tagline: 'Aprende a desplegar agentes de WhatsApp que atienden, venden y controlan recetas sin alucinaciones.',
      previewImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      tools: ['OpenAI API', 'Claude 3.5', 'WhatsApp Cloud API', 'Airtable'],
      modulesCount: 4,
      studentsEnrolled: 28,
      ctaUrl: 'https://buy.stripe.com/test_ia_restaurantes',
      status: 'ACTIVO',
    },
    {
      id: 'course-bootcamp-n8n',
      title: 'Bootcamp: Despliegue de Pipelines con n8n',
      badge: 'TÉCNICO / DEV',
      level: 'Avanzado',
      price: '$197 USD',
      duration: '6 Semanas en Vivo + Labs',
      tagline: 'Construye la infraestructura de automatización de un restaurante sobre servidores VPS dedicados con Docker.',
      previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      tools: ['n8n Self-Hosted', 'Docker', 'PostgreSQL', 'Meta Webhooks'],
      modulesCount: 6,
      studentsEnrolled: 14,
      ctaUrl: 'https://buy.stripe.com/test_bootcamp_n8n',
      status: 'ACTIVO',
    },
    {
      id: 'course-crecimiento-aeo',
      title: 'Dominio Local: SEO, AEO & Visibilidad IA',
      badge: 'CRECIMIENTO B2C',
      level: 'Marketing & Adquisición',
      price: '$67 USD',
      duration: 'Taller Práctico Grabado',
      tagline: 'Posiciona tu marca gastronómica en Google Maps y sé la opción prioritaria que ChatGPT y Gemini recomiendan.',
      previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      tools: ['Google Business', 'Schema.org', 'Perplexity Engine', 'JSON-LD'],
      modulesCount: 3,
      studentsEnrolled: 19,
      ctaUrl: 'https://buy.stripe.com/test_crecimiento_aeo',
      status: 'ACTIVO',
    },
  ]);

  const [isCourseModalOpen, setIsCourseModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseItem | null>(null);
  const [courseFormData, setCourseFormData] = useState<Partial<CourseItem>>({
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
  });

  const handleOpenAddCourse = () => {
    setEditingCourse(null);
    setCourseFormData({
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
    });
    setIsCourseModalOpen(true);
  };

  const handleOpenEditCourse = (course: CourseItem) => {
    setEditingCourse(course);
    setCourseFormData({ ...course });
    setIsCourseModalOpen(true);
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseFormData.title) return;

    if (editingCourse) {
      setCoursesList((prev) =>
        prev.map((c) => (c.id === editingCourse.id ? ({ ...c, ...courseFormData } as CourseItem) : c))
      );
    } else {
      const newCourse: CourseItem = {
        id: `course-${Date.now()}`,
        title: courseFormData.title || 'Nuevo Curso',
        badge: courseFormData.badge || 'NUEVO',
        level: courseFormData.level || 'Todos los niveles',
        price: courseFormData.price || '$97 USD',
        duration: courseFormData.duration || '4 Semanas',
        tagline: courseFormData.tagline || '',
        previewImage: courseFormData.previewImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
        tools: typeof courseFormData.tools === 'string' ? (courseFormData.tools as string).split(',').map((t: string) => t.trim()) : courseFormData.tools || [],
        modulesCount: Number(courseFormData.modulesCount) || 4,
        studentsEnrolled: 0,
        ctaUrl: courseFormData.ctaUrl || '#',
        status: courseFormData.status || 'ACTIVO',
      };
      setCoursesList((prev) => [newCourse, ...prev]);
    }
    setIsCourseModalOpen(false);
  };

  const handleDeleteCourse = (id: string, title: string) => {
    if (confirm(`¿Estás seguro de eliminar el curso: "${title}"?`)) {
      setCoursesList((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // ── 3. GESTOR DE RECURSOS STATE & CRUD (CON ADJUNTOS E IMÁGENES) ──
  const [resourcesList, setResourcesList] = useState<ResourceItem[]>([
    {
      id: 'res-aeo-rag',
      name: 'Optimización para Motores de Respuesta (AEO): Arquitectura de Contenido y Datos Estructurados para RAG',
      format: 'PDF / Framework AEO',
      access: 'GRATUITO (LEAD)',
      downloads: 168,
      tag: 'AEO & RAG',
      fileUrl: '/downloads/aeo-rag-architecture-2026.pdf',
      previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
      description: 'Guía técnica y arquitectura para estructurar datos con Schema.org, metadatos JSON-LD y bases vectoriales.',
    },
    {
      id: 'res-1',
      name: 'Matriz de Escandallos & Costos',
      format: 'XLSX / Template',
      access: 'GRATUITO (LEAD)',
      downloads: 218,
      tag: 'EXCEL',
      fileUrl: '/downloads/matriz-escandallos-foodcost.xlsx',
      previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
      description: 'Plantilla parametrizada para costeo en crudo/cocido, factor de rendimiento y mermas técnicas en cocina.',
    },
    {
      id: 'res-2',
      name: 'Checklist de Puntos Críticos HACCP',
      format: 'PDF Interactivo',
      access: 'GRATUITO (LEAD)',
      downloads: 145,
      tag: 'PDF',
      fileUrl: '/downloads/checklist-haccp-restaurantes.pdf',
      previewImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
      description: 'Auditoría de temperaturas, rotación de cámaras y protocolos de inocuidad y seguridad alimentaria.',
    },
    {
      id: 'res-3',
      name: 'Framework de SOPs para Cocina',
      format: 'Notion Template',
      access: 'GRATUITO (LEAD)',
      downloads: 98,
      tag: 'NOTION',
      fileUrl: 'https://notion.so/template-sops-inteligencia-neuronal',
      previewImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      description: 'Estructura modular para documentar recetas y compras antes de automatizar con IA.',
    },
    {
      id: 'res-4',
      name: 'Guía de Indexación Local & AEO',
      format: 'Guía Técnica',
      access: 'GRATUITO (LEAD)',
      downloads: 84,
      tag: 'GUÍA',
      fileUrl: '/downloads/guia-indexacion-local-google-maps.pdf',
      previewImage: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80',
      description: 'Configuración técnica de menús y Schema.org para Google Maps y motores de respuesta de IA.',
    },
  ]);

  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [resourceFormData, setResourceFormData] = useState<Partial<ResourceItem>>({
    name: '',
    format: 'PDF / Documento',
    access: 'GRATUITO (LEAD)',
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

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceFormData.name) return;

    if (editingResource) {
      setResourcesList((prev) =>
        prev.map((r) => (r.id === editingResource.id ? ({ ...r, ...resourceFormData } as ResourceItem) : r))
      );
    } else {
      const newAsset: ResourceItem = {
        id: `res-${Date.now()}`,
        name: resourceFormData.name || 'Nuevo Activo',
        format: resourceFormData.format || 'PDF / Documento',
        access: resourceFormData.access || 'GRATUITO (LEAD)',
        tag: (resourceFormData.tag || 'RECURSO').toUpperCase(),
        downloads: resourceFormData.downloads || 0,
        fileUrl: resourceFormData.fileUrl || '#download',
        previewImage: resourceFormData.previewImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
        description: resourceFormData.description || '',
      };
      setResourcesList((prev) => [newAsset, ...prev]);
    }
    setIsResourceModalOpen(false);
  };

  const handleDeleteResource = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar el activo: "${name}"?`)) {
      setResourcesList((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // ── 4. RED AGÉNTICA STATE ──
  const [agents, setAgents] = useState<AgentData[]>([
    { id: 'ag-1', name: 'Agente Ventas & WhatsApp', trigger: 'Meta Webhook', status: 'ONLINE', executionsToday: 1420, errorRate: '0.2%', tokensConsumed: '124.5k' },
    { id: 'ag-2', name: 'Agente Ingesta de Leads & Toolkit', trigger: 'Formulario Web API', status: 'ONLINE', executionsToday: 384, errorRate: '0.0%', tokensConsumed: '18.2k' },
    { id: 'ag-3', name: 'Agente Calibración & Abastecimiento', trigger: 'Cron Diario (04:00 AM)', status: 'IDLE', executionsToday: 24, errorRate: '0.0%', tokensConsumed: '45.0k' },
    { id: 'ag-4', name: 'Agente Notificaciones Telegram', trigger: 'Event Bus', status: 'ONLINE', executionsToday: 89, errorRate: '0.0%', tokensConsumed: '8.4k' },
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
  const [leadsList, setLeadsList] = useState([
    { id: 1, email: 'direccion@santorinifood.com', resource: 'AEO & RAG Architecture', date: '19 Ago 2026', source: 'Instagram Ads', status: 'Enviado Secuencia Email' },
    { id: 2, email: 'consultor@gastroexpert.mx', resource: 'Matriz Escandallos', date: '18 Ago 2026', source: 'Web Directo', status: 'Calificado para Diagnóstico' },
    { id: 3, email: 'gerencia@bistro54.co', resource: 'Checklist HACCP', date: '18 Ago 2026', source: 'Instagram Ads', status: 'Enviado Secuencia Email' },
    { id: 4, email: 'chef.alberto@bistro54.mx', resource: 'Framework SOPs', date: '18 Ago 2026', source: 'Web / Academy', status: 'Lead Caliente' },
    { id: 5, email: 'operaciones@burgerlab.co', resource: 'Guía Indexación Local', date: '17 Ago 2026', source: 'Web Directo', status: 'Enviado Secuencia Email' },
  ]);

  const handleUpdateAuditStatus = (id: string, newStatus: AuditNotification['status']) => {
    setNotifications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const handleSyncN8n = () => {
    setSyncingN8n(true);
    setTimeout(() => {
      setSyncingN8n(false);
    }, 700);
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
    c.title.toLowerCase().includes(searchCourse.toLowerCase()) ||
    c.badge.toLowerCase().includes(searchCourse.toLowerCase()) ||
    c.level.toLowerCase().includes(searchCourse.toLowerCase())
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
              { id: 'billing', label: 'Facturación & Stripe', icon: CreditCard, color: '#1DACE3' },
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
              {activeTab === 'billing' && 'Facturación & Pasarela Stripe'}
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
                  { label: 'Facturación Bruta (Stripe)', val: '$8,450 USD', change: '+24.8%', icon: TrendingUp, stripe: 'from-[#971B8D] to-[#EA0C7F]', bgTint: 'to-pink-50/40', badge: 'STRIPE LIVE' },
                  { label: 'Notificaciones & Diagnósticos', val: `${notifications.length} Solicitudes`, change: '+3 esta semana', icon: Bell, stripe: 'from-[#1DACE3] to-[#0284c7]', bgTint: 'to-sky-50/40', badge: 'PIPELINE' },
                  { label: 'Cursos & Alumnos Activos', val: '42 Alumnos', change: '+18 via IG', icon: GraduationCap, stripe: 'from-[#FEAD2B] to-[#c2410c]', bgTint: 'to-amber-50/40', badge: 'CAMPUS' },
                  { label: 'Leads Capturados (Toolkit)', val: '384 Registros', change: '+32 hoy', icon: Users, stripe: 'from-[#86C537] to-[#059669]', bgTint: 'to-emerald-50/40', badge: 'CRM LEADS' },
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
                    {notifications.slice(0, 3).map((lead) => (
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
                    ))}
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
                    {[
                      { concept: 'Diagnóstico de Ecosistema Digital', amount: '$450.00 USD', status: 'PAGADO', client: 'Restaurante Altamira' },
                      { concept: 'Masterclass: Automatización IA', amount: '$97.00 USD', status: 'PAGADO', client: 'Carlos Mendoza' },
                      { concept: 'Bootcamp: n8n Pipelines', amount: '$197.00 USD', status: 'PAGADO', client: 'DevLab FoodTech' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs hover:bg-zinc-100/60 transition-colors">
                        <div>
                          <div className="font-bold text-zinc-900">{tx.concept}</div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">{tx.client}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-zinc-900">{tx.amount}</div>
                          <span className="font-mono text-[9px] font-bold text-[#86C537] bg-[#86C537]/10 px-2 py-0.5 rounded border border-[#86C537]/20">{tx.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ── TAB 2: GESTOR DE CURSOS (NUEVA PESTAÑA CON CRUD Y PREVIEWS) ── */}
          {activeTab === 'courses' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-[#EA0C7F]" />
                    <span>Gestor de Cursos & Campus Virtual</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Crea, edita, elimina y gestiona los programas formativos, precios y vistas previas del Campus Academy.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddCourse}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#971B8D] hover:bg-[#801676] px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-[#971B8D]/30 shrink-0"
                >
                  <Plus className="w-4 h-4" /> Crear Nuevo Curso
                </button>
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
            </motion.div>
          )}

          {/* ── TAB 3: GESTOR DE RECURSOS (CON ADJUNTAR ARCHIVO E IMAGEN PREVIA) ── */}
          {activeTab === 'resources' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              
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
                <button
                  onClick={handleOpenAddResource}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#971B8D] hover:bg-[#801676] px-4 py-2.5 text-xs font-bold text-white transition-all shadow-md shadow-[#971B8D]/30 shrink-0"
                >
                  <Plus className="w-4 h-4" /> Cargar Nuevo Activo
                </button>
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

          {/* ── TAB 5: BILLING ── */}
          {activeTab === 'billing' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div>
                <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#1DACE3]" />
                  <span>Facturación & Pasarela Stripe</span>
                </h2>
                <p className="text-xs text-zinc-500 mt-0.5">Control de pagos por auditorías, diagnósticos y programas B2C.</p>
              </div>

              <div className="p-6 rounded-2xl border border-zinc-200 bg-white shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#1DACE3] to-[#971B8D]" />
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-100">
                  <div>
                    <span className="text-xs text-zinc-400 font-mono font-bold">CONEXIÓN STRIPE</span>
                    <div className="text-sm font-bold text-zinc-900 mt-0.5">Cuenta Conectada: Inteligencia Neuronal LLC</div>
                  </div>
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-[#86C537]/15 text-[#639922] border border-[#86C537]/30 w-fit">
                    Modo Producción (Live)
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { id: 'tx_9843', desc: 'Diagnóstico de Ecosistema Digital', amount: '$450.00 USD', customer: 'Restaurante Altamira', date: '19 Ago 2026', status: 'PAGADO' },
                    { id: 'tx_9842', desc: 'Masterclass: Automatización IA', amount: '$97.00 USD', customer: 'Carlos Mendoza', date: '19 Ago 2026', status: 'PAGADO' },
                    { id: 'tx_9841', desc: 'Bootcamp: n8n Pipelines', amount: '$197.00 USD', customer: 'DevLab FoodTech', date: '18 Ago 2026', status: 'PAGADO' },
                    { id: 'tx_9840', desc: 'Diagnóstico de Ecosistema Digital', amount: '$450.00 USD', customer: 'Bistro Gourmet 54', date: '17 Ago 2026', status: 'PAGADO' },
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
                      <div>
                        <div className="font-bold text-zinc-900">{tx.desc}</div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">{tx.customer} • ID: {tx.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-zinc-900">{tx.amount}</div>
                        <div className="font-mono text-[10px] font-bold text-[#86C537]">{tx.status} • {tx.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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

        {/* ── MODAL: CREAR / EDITAR CURSO ── */}
        {isCourseModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-7 sm:p-9 shadow-2xl space-y-5 text-zinc-900 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#EA0C7F]/10 text-[#EA0C7F] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900">
                    {editingCourse ? 'Editar Programa de Formación' : 'Crear Nuevo Programa'}
                  </h3>
                </div>
                <button
                  onClick={() => setIsCourseModalOpen(false)}
                  className="text-zinc-400 hover:text-zinc-900 p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
                <div>
                  <label className="block text-zinc-700 font-mono font-bold mb-1">TÍTULO DEL CURSO *</label>
                  <input
                    type="text"
                    required
                    value={courseFormData.title}
                    onChange={(e) => setCourseFormData({ ...courseFormData, title: e.target.value })}
                    placeholder="Ej. Masterclass de IA para Restaurantes"
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-zinc-700 font-mono font-bold mb-1">DESCRIPCIÓN / SUBTÍTULO</label>
                  <textarea
                    rows={2}
                    value={courseFormData.tagline}
                    onChange={(e) => setCourseFormData({ ...courseFormData, tagline: e.target.value })}
                    placeholder="Aprende a desplegar asistentes y automatizaciones..."
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">PRECIO</label>
                    <input
                      type="text"
                      value={courseFormData.price}
                      onChange={(e) => setCourseFormData({ ...courseFormData, price: e.target.value })}
                      placeholder="Ej. $97 USD"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">DURACIÓN</label>
                    <input
                      type="text"
                      value={courseFormData.duration}
                      onChange={(e) => setCourseFormData({ ...courseFormData, duration: e.target.value })}
                      placeholder="Ej. 4 Semanas"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">NIVEL</label>
                    <input
                      type="text"
                      value={courseFormData.level}
                      onChange={(e) => setCourseFormData({ ...courseFormData, level: e.target.value })}
                      placeholder="Ej. Avanzado"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1 flex items-center gap-1">
                      <ImageIcon className="w-3.5 h-3.5 text-[#1DACE3]" /> URL DE VISTA PREVIA (IMAGEN)
                    </label>
                    <input
                      type="url"
                      value={courseFormData.previewImage}
                      onChange={(e) => setCourseFormData({ ...courseFormData, previewImage: e.target.value })}
                      placeholder="https://ejemplo.com/preview.jpg"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1 flex items-center gap-1">
                      <Link2 className="w-3.5 h-3.5 text-[#86C537]" /> ENLACE DE PAGO / STRIPE
                    </label>
                    <input
                      type="text"
                      value={courseFormData.ctaUrl}
                      onChange={(e) => setCourseFormData({ ...courseFormData, ctaUrl: e.target.value })}
                      placeholder="https://buy.stripe.com/..."
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {courseFormData.previewImage && (
                  <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200">
                    <span className="text-[10px] font-mono text-zinc-400 block mb-1.5 font-bold">VISTA PREVIA CARGADA:</span>
                    <div className="h-28 w-full rounded-lg overflow-hidden bg-zinc-200">
                      <img src={courseFormData.previewImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
                  <button
                    type="button"
                    onClick={() => setIsCourseModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#971B8D] hover:bg-[#801676] text-white font-bold transition-all shadow-md shadow-[#971B8D]/30"
                  >
                    Guardar Curso
                  </button>
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    <label className="block text-zinc-700 font-mono font-bold mb-1">TAG</label>
                    <input
                      type="text"
                      value={resourceFormData.tag}
                      onChange={(e) => setResourceFormData({ ...resourceFormData, tag: e.target.value })}
                      placeholder="Ej. AEO, HACCP"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">ACCESO</label>
                    <select
                      value={resourceFormData.access}
                      onChange={(e) => setResourceFormData({ ...resourceFormData, access: e.target.value })}
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-[#971B8D] focus:bg-white focus:outline-none"
                    >
                      <option value="GRATUITO (LEAD)">GRATUITO (LEAD)</option>
                      <option value="EXCLUSIVO CURSO">EXCLUSIVO CURSO</option>
                      <option value="ACCESO PAGO">ACCESO PAGO</option>
                    </select>
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

      </main>
    </div>
  );
}
