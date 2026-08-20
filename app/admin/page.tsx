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
    fetch('/api/courses')
      .then((res) => res.json())
      .then((data) => {
        if (data.courses && Array.isArray(data.courses)) {
          setCoursesList(
            data.courses.map((c: any) => ({
              id: c.id,
              title: c.title,
              badge: c.badge || 'NUEVO',
              level: c.level || 'Intermedio',
              price: c.price_display || `$${c.price_usd || 97} USD`,
              duration: c.duration || '4 Semanas',
              tagline: c.tagline || '',
              previewImage: c.preview_image || c.previewImage,
              tools: Array.isArray(c.tools) ? c.tools : [],
              modulesCount: c.modules?.length || 4,
              studentsEnrolled: c.students_enrolled || 0,
              ctaUrl: c.cta_url || c.ctaUrl || '#',
              status: c.status || 'ACTIVO',
            }))
          );
        }
      })
      .catch((e) => console.warn('API courses fetch fallback', e));

    // 3. Recursos
    fetch('/api/resources')
      .then((res) => res.json())
      .then((data) => {
        if (data.resources && Array.isArray(data.resources)) {
          setResourcesList(
            data.resources.map((r: any) => ({
              id: r.id,
              name: r.title || r.name,
              format: r.format,
              access: r.access_type || r.access || 'GRATUITO (LEAD)',
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
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  // ── 2. GESTOR DE CURSOS STATE & CRUD ──
  const [coursesList, setCoursesList] = useState<CourseItem[]>([]);

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

  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseFormData.title) return;

    try {
      if (editingCourse) {
        // Update via API (Supabase)
        await fetch('/api/courses', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingCourse.id,
            title: courseFormData.title,
            badge: courseFormData.badge,
            level: courseFormData.level,
            price_display: courseFormData.price,
            duration: courseFormData.duration,
            tagline: courseFormData.tagline,
            preview_image: courseFormData.previewImage,
            tools: courseFormData.tools,
            cta_url: courseFormData.ctaUrl,
            status: courseFormData.status,
            students_enrolled: courseFormData.studentsEnrolled,
          }),
        });
      } else {
        // Create via API (Supabase)
        await fetch('/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: courseFormData.title,
            badge: courseFormData.badge || 'NUEVO',
            level: courseFormData.level || 'Intermedio',
            price_display: courseFormData.price || '$97 USD',
            duration: courseFormData.duration || '4 Semanas',
            tagline: courseFormData.tagline || '',
            preview_image: courseFormData.previewImage,
            tools: courseFormData.tools,
            cta_url: courseFormData.ctaUrl || '#',
            status: courseFormData.status || 'ACTIVO',
          }),
        });
      }
      fetchAllData();
    } catch (err) {
      console.error('[Save Course Error]', err);
    }
    setIsCourseModalOpen(false);
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
  const [resourcesList, setResourcesList] = useState<ResourceItem[]>([]);

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
