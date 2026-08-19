'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderDown,
  Users,
  CreditCard,
  Bot,
  ClipboardCheck,
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
  Check
} from 'lucide-react';
import Link from 'next/link';

interface ResourceItem {
  id: string;
  name: string;
  format: string;
  access: string;
  downloads: number;
  tag: string;
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

interface AuditLead {
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
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'leads' | 'billing' | 'agents' | 'audits'>('overview');
  const [syncingN8n, setSyncingN8n] = useState(false);
  const [searchLead, setSearchLead] = useState('');
  const [searchAudit, setSearchAudit] = useState('');
  const [searchResource, setSearchResource] = useState('');

  // ── AUDITORÍAS & DIAGNÓSTICO STATE ──
  const [auditLeads, setAuditLeads] = useState<AuditLead[]>([
    {
      id: 'IN-AUDIT-98214',
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
      id: 'IN-AUDIT-98213',
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
      id: 'IN-AUDIT-98212',
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

  const [selectedAuditForModal, setSelectedAuditForModal] = useState<AuditLead | null>(null);

  // Fetch live leads from API on load
  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (data.leads && Array.isArray(data.leads) && data.leads.length > 0) {
          const audits = data.leads.filter((l: any) => !l.fullName?.startsWith('Lead Toolkit'));
          if (audits.length > 0) {
            setAuditLeads(audits);
          }
        }
      })
      .catch((e) => console.warn('API leads fetch fallback', e));
  }, []);

  // ── REPOSITORIO DE ACTIVOS OPERATIVOS STATE ──
  const [resourcesList, setResourcesList] = useState<ResourceItem[]>([
    {
      id: 'res-aeo-rag',
      name: 'Optimización para Motores de Respuesta (AEO): Arquitectura de Contenido y Datos Estructurados para RAG',
      format: 'PDF / Framework AEO',
      access: 'GRATUITO (LEAD)',
      downloads: 168,
      tag: 'AEO & RAG',
    },
    {
      id: 'res-1',
      name: 'Matriz de Escandallos & Costos',
      format: 'XLSX / Template',
      access: 'GRATUITO (LEAD)',
      downloads: 218,
      tag: 'EXCEL',
    },
    {
      id: 'res-2',
      name: 'Checklist de Puntos Críticos HACCP',
      format: 'PDF Interactivo',
      access: 'GRATUITO (LEAD)',
      downloads: 145,
      tag: 'PDF',
    },
    {
      id: 'res-3',
      name: 'Framework de SOPs para Cocina',
      format: 'Notion Template',
      access: 'GRATUITO (LEAD)',
      downloads: 98,
      tag: 'NOTION',
    },
    {
      id: 'res-4',
      name: 'Guía de Indexación Local & AEO',
      format: 'Guía Técnica',
      access: 'GRATUITO (LEAD)',
      downloads: 84,
      tag: 'GUÍA',
    },
    {
      id: 'res-5',
      name: 'Blueprint: Arquitectura de Pipelines n8n',
      format: 'JSON Workflow',
      access: 'EXCLUSIVO CURSO',
      downloads: 42,
      tag: 'JSON',
    },
  ]);

  // Modal states for Resources
  const [isAddResourceModalOpen, setIsAddResourceModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<ResourceItem | null>(null);
  const [resourceFormData, setResourceFormData] = useState({
    name: '',
    format: 'PDF / Documento',
    access: 'GRATUITO (LEAD)',
    tag: 'RECURSO',
    downloads: 0,
  });

  // ── AGENTES N8N STATE ──
  const [agents, setAgents] = useState<AgentData[]>([
    { id: 'ag-1', name: 'Agente Ventas & WhatsApp', trigger: 'Meta Webhook', status: 'ONLINE', executionsToday: 1420, errorRate: '0.2%', tokensConsumed: '124.5k' },
    { id: 'ag-2', name: 'Agente Ingesta de Leads & Toolkit', trigger: 'Formulario Web API', status: 'ONLINE', executionsToday: 384, errorRate: '0.0%', tokensConsumed: '18.2k' },
    { id: 'ag-3', name: 'Agente Calibración & Abastecimiento', trigger: 'Cron Diario (04:00 AM)', status: 'IDLE', executionsToday: 24, errorRate: '0.0%', tokensConsumed: '45.0k' },
    { id: 'ag-4', name: 'Agente Notificaciones Telegram', trigger: 'Event Bus', status: 'ONLINE', executionsToday: 89, errorRate: '0.0%', tokensConsumed: '8.4k' },
  ]);

  // ── CRM LEADS (TOOLKIT & B2C) STATE ──
  const [leadsList, setLeadsList] = useState([
    { id: 1, email: 'direccion@santorinifood.com', resource: 'AEO & RAG Architecture', date: '19 Ago 2026', source: 'Instagram Ads', status: 'Enviado Secuencia Email' },
    { id: 2, email: 'consultor@gastroexpert.mx', resource: 'Matriz Escandallos', date: '18 Ago 2026', source: 'Web Directo', status: 'Calificado para Diagnóstico' },
    { id: 3, email: 'gerencia@bistro54.co', resource: 'Checklist HACCP', date: '18 Ago 2026', source: 'Instagram Ads', status: 'Enviado Secuencia Email' },
    { id: 4, email: 'chef.alberto@bistro54.mx', resource: 'Framework SOPs', date: '18 Ago 2026', source: 'Web / Academy', status: 'Lead Caliente' },
    { id: 5, email: 'operaciones@burgerlab.co', resource: 'Guía Indexación Local', date: '17 Ago 2026', source: 'Web Directo', status: 'Enviado Secuencia Email' },
  ]);

  // ── HANDLERS PARA ACTIVOS ──
  const handleOpenAddResource = () => {
    setResourceFormData({
      name: '',
      format: 'PDF / Documento',
      access: 'GRATUITO (LEAD)',
      tag: 'RECURSO',
      downloads: 0,
    });
    setIsAddResourceModalOpen(true);
  };

  const handleOpenEditResource = (item: ResourceItem) => {
    setEditingResource(item);
    setResourceFormData({
      name: item.name,
      format: item.format,
      access: item.access,
      tag: item.tag,
      downloads: item.downloads,
    });
  };

  const handleSaveResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceFormData.name) return;

    if (editingResource) {
      setResourcesList((prev) =>
        prev.map((r) => (r.id === editingResource.id ? { ...r, ...resourceFormData } : r))
      );
      setEditingResource(null);
    } else {
      const newAsset: ResourceItem = {
        id: `res-${Date.now()}`,
        name: resourceFormData.name,
        format: resourceFormData.format,
        access: resourceFormData.access,
        tag: resourceFormData.tag.toUpperCase(),
        downloads: resourceFormData.downloads || 0,
      };
      setResourcesList((prev) => [newAsset, ...prev]);
      setIsAddResourceModalOpen(false);
    }
  };

  const handleDeleteResource = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar el activo: "${name}"?`)) {
      setResourcesList((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // ── HANDLERS PARA AGENTES & AUDITORÍAS ──
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

  const handleUpdateAuditStatus = (id: string, newStatus: AuditLead['status']) => {
    setAuditLeads((prev) =>
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

  const exportLeadsCSV = () => {
    const headers = ['Email', 'Recurso', 'Fecha', 'Fuente', 'Estado'];
    const rows = leadsList.map((l) => [l.email, l.resource, l.date, l.source, l.status]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'leads_toolkit_inteligencia_neuronal.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportAuditsCSV = () => {
    const headers = ['Folio', 'Nombre', 'Empresa', 'Email', 'Telefono', 'Servicio', 'Volumen', 'ERP', 'CuelloBotella', 'Estado', 'Fecha'];
    const rows = auditLeads.map((a) => [
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
    link.setAttribute('download', 'auditorias_diagnosticos_inteligencia_neuronal.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredResources = resourcesList.filter((r) =>
    r.name.toLowerCase().includes(searchResource.toLowerCase()) ||
    r.tag.toLowerCase().includes(searchResource.toLowerCase())
  );

  const filteredAudits = auditLeads.filter((a) =>
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
    <div className="flex flex-col lg:flex-row min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-zinc-800 selection:text-white">
      
      {/* ── BARRA LATERAL / SUPERIOR RESPONSIVA (SIDEBAR) ── */}
      <aside className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-zinc-200 bg-white flex flex-col justify-between p-4 lg:p-5 shrink-0 shadow-sm">
        <div>
          {/* Logo & Brand Header */}
          <div className="flex items-center justify-between lg:block mb-4 lg:mb-8">
            <Link href="/" className="flex items-center gap-2.5 group">
              <span className="font-heading text-lg font-bold tracking-tight text-zinc-900">
                Inteligencia Neuronal
              </span>
            </Link>
            <div className="flex items-center gap-2 lg:mt-2">
              <span className="font-mono text-[10px] font-bold text-zinc-800 bg-zinc-100 px-2.5 py-0.5 rounded-full border border-zinc-300">
                SUPER ADMIN
              </span>
              <span className="font-mono text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                v2.6 PROD
              </span>
            </div>
          </div>

          {/* Menú de Navegación con Scroll Horizontal en Móvil */}
          <nav className="flex lg:flex-col gap-1.5 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {[
              { id: 'overview', label: 'Métricas Generales', icon: LayoutDashboard },
              { id: 'resources', label: 'Gestor de Recursos', icon: FolderDown },
              { id: 'leads', label: 'Base de Leads (CRM)', icon: Users },
              { id: 'billing', label: 'Facturación & Stripe', icon: CreditCard },
              { id: 'agents', label: 'Red Agéntica (n8n)', icon: Bot },
              { id: 'audits', label: 'Auditorías & Diagnóstico', icon: ClipboardCheck, badge: auditLeads.length.toString() },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap lg:whitespace-normal transition-all shrink-0 lg:shrink ${
                    isActive
                      ? 'bg-zinc-900 text-white shadow-sm'
                      : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <div className="flex items-center gap-2.5 lg:gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-zinc-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-bold ml-2 lg:ml-0 ${
                      isActive ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-zinc-700 border border-zinc-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin (Oculto en barra móvil compacta, visible en desktop) */}
        <div className="hidden lg:block border-t border-zinc-200 pt-4 space-y-3 text-xs text-zinc-500">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-medium text-zinc-700">VPS: Conectado</span>
            </div>
            <Link href="/" target="_blank" className="hover:text-zinc-900 transition-colors" title="Ver Landing">
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </Link>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs transition-all font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* ── ÁREA PRINCIPAL DE CONTENIDO ── */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-10 bg-zinc-50">
        
        {/* HEADER SUPERIOR */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 pb-6 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Centro de Mando Operativo</h1>
            <p className="text-xs text-zinc-500 mt-1">Supervisión transaccional, gestión de auditorías, activos y flujos agénticos.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSyncN8n}
              disabled={syncingN8n}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-xs font-semibold text-zinc-700 hover:bg-zinc-50 transition-all shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncingN8n ? 'animate-spin text-zinc-900' : ''}`} />
              <span>{syncingN8n ? 'Sincronizando...' : 'Sincronizar n8n'}</span>
            </button>
            <div className="font-mono text-xs px-3 py-2 rounded-xl bg-white border border-zinc-200 text-zinc-600 shadow-sm">
              Terminal: <span className="text-emerald-600 font-bold">Admin Activo</span>
            </div>
          </div>
        </header>

        {/* CONTENIDO SEGÚN PESTAÑA */}
        <AnimatePresence mode="wait">
          
          {/* ── TAB 1: OVERVIEW ── */}
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-8">
              {/* Tarjetas de Métricas Clave */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { label: 'Facturación Bruta (Stripe)', val: '$8,450 USD', change: '+24.8%', icon: TrendingUp },
                  { label: 'Auditorías Solicitadas', val: `${auditLeads.length} Diagnósticos`, change: '+3 esta semana', icon: ClipboardCheck },
                  { label: 'Cursos & Masterclasses', val: '42 Alumnos', change: '+18 via IG', icon: FolderDown },
                  { label: 'Leads Capturados (Toolkit)', val: '384 Registros', change: '+32 hoy', icon: Users },
                ].map((kpi, idx) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={idx} className="p-6 rounded-3xl border border-zinc-200 bg-white shadow-sm">
                      <div className="flex items-center justify-between text-zinc-500 mb-3">
                        <span className="text-xs font-mono font-bold">{kpi.label}</span>
                        <Icon className="w-4 h-4 text-zinc-700" />
                      </div>
                      <div className="text-2xl font-extrabold text-zinc-900 tracking-tight">{kpi.val}</div>
                      <div className="mt-2 text-[11px] font-mono text-emerald-600 flex items-center gap-1 font-bold">
                        <ArrowUpRight className="w-3 h-3" />
                        {kpi.change}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Paneles Recientes */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Solicitudes de Auditoría Recientes */}
                <div className="p-6 rounded-3xl border border-zinc-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <ClipboardCheck className="w-4 h-4 text-zinc-700" />
                      <span>Últimas Solicitudes de Diagnóstico</span>
                    </h3>
                    <button onClick={() => setActiveTab('audits')} className="font-mono text-xs font-bold text-zinc-700 hover:text-zinc-900">
                      Ver todas ({auditLeads.length}) ▹
                    </button>
                  </div>
                  <div className="space-y-3">
                    {auditLeads.slice(0, 3).map((lead) => (
                      <div key={lead.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs">
                        <div>
                          <div className="font-bold text-zinc-900">{lead.companyName}</div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">{lead.fullName} • {lead.serviceNeeded}</div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-zinc-200 text-zinc-800">
                            {lead.status}
                          </span>
                          <div className="text-[10px] text-zinc-400 mt-1 font-mono">{lead.createdAt.split(',')[0]}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transacciones Recientes */}
                <div className="p-6 rounded-3xl border border-zinc-200 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-zinc-100">
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-zinc-700" />
                      <span>Transacciones Recientes (Stripe)</span>
                    </h3>
                    <button onClick={() => setActiveTab('billing')} className="font-mono text-xs font-bold text-zinc-700 hover:text-zinc-900">
                      Panel Stripe ▹
                    </button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { concept: 'Diagnóstico de Ecosistema Digital', amount: '$450.00 USD', status: 'PAGADO', client: 'Restaurante Altamira' },
                      { concept: 'Masterclass: Automatización IA', amount: '$97.00 USD', status: 'PAGADO', client: 'Carlos Mendoza' },
                      { concept: 'Bootcamp: n8n Pipelines', amount: '$197.00 USD', status: 'PAGADO', client: 'DevLab FoodTech' },
                    ].map((tx, i) => (
                      <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs">
                        <div>
                          <div className="font-bold text-zinc-900">{tx.concept}</div>
                          <div className="text-[11px] text-zinc-500 mt-0.5">{tx.client}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-zinc-900">{tx.amount}</div>
                          <span className="font-mono text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{tx.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* ── TAB: AUDITORÍAS & DIAGNÓSTICO DE AUTOMATIZACIÓN ── */}
          {activeTab === 'audits' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                    <ClipboardCheck className="w-5 h-5 text-zinc-800" />
                    <span>Auditoría & Diagnóstico de Automatización</span>
                  </h2>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Solicitudes directas de diagnósticos recibidas desde la web. Preparadas para calificación y seguimiento.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={exportAuditsCSV}
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-50 transition-all shadow-sm"
                  >
                    <DownloadCloud className="w-4 h-4 text-zinc-700" /> Exportar Auditorías (CSV)
                  </button>
                </div>
              </div>

              {/* Status Banner */}
              <div className="p-4 rounded-2xl bg-white border border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-300 flex items-center justify-center text-zinc-800 shrink-0">
                    <Send className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-zinc-900">Pipeline de Notificaciones & Correo (Resend):</span>
                    <span className="text-zinc-500 block text-[11px]">
                      Las solicitudes entrantes se procesan en `/api/leads` listas para integración de envíos y webhooks.
                    </span>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 shrink-0 w-fit">
                  ● Endpoint /api/leads Activo
                </span>
              </div>

              {/* Tabla de Auditorías */}
              <div className="p-6 rounded-3xl border border-zinc-200 bg-white shadow-sm">
                <div className="mb-5 relative max-w-sm">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Buscar por prospecto, empresa o email..."
                    value={searchAudit}
                    onChange={(e) => setSearchAudit(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 pl-10 pr-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
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
                      {filteredAudits.map((audit) => (
                        <tr key={audit.id} className="text-zinc-700 hover:bg-zinc-50/80 transition-colors">
                          <td className="py-3.5">
                            <div className="font-bold text-zinc-900">{audit.companyName}</div>
                            <div className="font-mono text-[10px] text-zinc-500 font-bold">{audit.id}</div>
                          </td>
                          <td className="py-3.5">
                            <div className="font-bold text-zinc-900">{audit.fullName}</div>
                            <div className="text-[11px] text-zinc-500">{audit.corporateEmail}</div>
                            <a
                              href={`https://wa.me/${audit.phoneWhatsApp.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-emerald-700 font-bold hover:underline flex items-center gap-1 mt-0.5"
                            >
                              <Phone className="w-3 h-3" /> {audit.phoneWhatsApp}
                            </a>
                          </td>
                          <td className="py-3.5">
                            <span className="text-zinc-900 font-semibold">{audit.serviceNeeded}</span>
                            <div className="text-[10px] text-zinc-500">{audit.businessType}</div>
                          </td>
                          <td className="py-3.5">
                            <div className="text-zinc-800 font-mono text-[11px]">{audit.dailyVolume}</div>
                            <div className="text-zinc-500 text-[10px]">ERP: {audit.currentERP}</div>
                          </td>
                          <td className="py-3.5 font-mono text-zinc-500 text-[11px]">{audit.createdAt}</td>
                          <td className="py-3.5">
                            <select
                              value={audit.status}
                              onChange={(e) => handleUpdateAuditStatus(audit.id, e.target.value as any)}
                              className="bg-white border border-zinc-300 rounded-lg px-2.5 py-1 text-[11px] font-mono font-bold text-zinc-800 focus:outline-none focus:border-zinc-900 shadow-sm"
                            >
                              <option value="Nuevo">Nuevo</option>
                              <option value="En Evaluación">En Evaluación</option>
                              <option value="Contactado">Contactado</option>
                              <option value="Cerrado / Pagado">Cerrado / Pagado</option>
                            </select>
                          </td>
                          <td className="py-3.5 text-right">
                            <button
                              onClick={() => setSelectedAuditForModal(audit)}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50 text-xs font-bold text-zinc-800 transition-all shadow-sm"
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

          {/* ── TAB 2: AGENTES (CONTROL N8N) ── */}
          {activeTab === 'agents' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900">Enjambre Agéntico & Pipelines n8n</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Control de ejecución, latencias, kill-switch y consumo de tokens LLM.</p>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="https://n8n.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-zinc-300 bg-white text-xs font-bold text-zinc-800 hover:bg-zinc-50 transition-all shadow-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Abrir Editor n8n
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {agents.map((ag) => (
                  <div key={ag.id} className="p-6 rounded-3xl border border-zinc-200 bg-white flex flex-col lg:flex-row lg:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-2xl bg-zinc-100 border border-zinc-200 flex items-center justify-center shrink-0 text-zinc-800">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-zinc-900">{ag.name}</h4>
                          <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                            ag.status === 'ONLINE'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                              : ag.status === 'IDLE'
                              ? 'bg-amber-50 border-amber-300 text-amber-800'
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
                        <span className="text-emerald-600 font-bold">{ag.errorRate}</span>
                      </div>
                      <div>
                        <span className="text-zinc-400 block text-[10px] font-bold">TOKENS CONSUMIDOS</span>
                        <span className="text-zinc-800 font-bold">{ag.tokensConsumed}</span>
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
                ))}
              </div>
            </motion.div>
          )}

          {/* ── TAB 3: GESTOR DE RECURSOS (CRUD COMPLETO) ── */}
          {activeTab === 'resources' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-zinc-900">Repositorio de Activos Operativos</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Administra, edita y sube nuevas matrices, escandallos y toolkits descargables.</p>
                </div>
                <button
                  onClick={handleOpenAddResource}
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition-all shadow-md shrink-0"
                >
                  <Plus className="w-4 h-4" /> Cargar Nuevo Activo
                </button>
              </div>

              <div className="p-6 rounded-3xl border border-zinc-200 bg-white shadow-sm">
                <div className="mb-4 relative max-w-sm">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Buscar activo por nombre o tag..."
                    value={searchResource}
                    onChange={(e) => setSearchResource(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 pl-10 pr-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs min-w-[700px]">
                    <thead>
                      <tr className="border-b border-zinc-200 text-zinc-500 font-mono">
                        <th className="pb-3">NOMBRE DEL ACTIVO</th>
                        <th className="pb-3">TIPO / FORMATO</th>
                        <th className="pb-3">ACCESO</th>
                        <th className="pb-3">DESCARGAS TOTALES</th>
                        <th className="pb-3 text-right">ACCIONES</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                      {filteredResources.map((res) => (
                        <tr key={res.id} className="text-zinc-700 hover:bg-zinc-50/80 transition-colors">
                          <td className="py-3.5">
                            <div className="font-bold text-zinc-900 max-w-md">{res.name}</div>
                            <span className="font-mono text-[9px] font-bold text-zinc-500">{res.tag}</span>
                          </td>
                          <td className="py-3.5 font-mono text-zinc-500">{res.format}</td>
                          <td className="py-3.5">
                            <span className="font-mono text-[10px] font-bold bg-zinc-100 text-zinc-800 border border-zinc-300 px-2.5 py-0.5 rounded-full">
                              {res.access}
                            </span>
                          </td>
                          <td className="py-3.5 font-mono text-zinc-900 font-bold">{res.downloads}</td>
                          <td className="py-3.5 text-right space-x-2">
                            <button
                              onClick={() => handleOpenEditResource(res)}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 transition-colors text-xs font-semibold shadow-sm"
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
                  <h2 className="text-lg font-bold text-zinc-900">Base de Leads Capturados (CRM Toolkit)</h2>
                  <p className="text-xs text-zinc-500 mt-0.5">Contactos registrados desde la landing, toolkit y descargas individuales.</p>
                </div>
                <button
                  onClick={exportLeadsCSV}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-xs font-bold text-zinc-800 hover:bg-zinc-50 transition-all shadow-sm"
                >
                  <DownloadCloud className="w-4 h-4 text-zinc-700" /> Exportar a CSV
                </button>
              </div>

              <div className="p-6 rounded-3xl border border-zinc-200 bg-white shadow-sm">
                <div className="mb-4 relative max-w-sm">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Buscar por correo o recurso..."
                    value={searchLead}
                    onChange={(e) => setSearchLead(e.target.value)}
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 pl-10 pr-3.5 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
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
                            <span className="font-mono text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
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
                <h2 className="text-lg font-bold text-zinc-900">Facturación & Pasarela Stripe</h2>
                <p className="text-xs text-zinc-500 mt-0.5">Control de pagos por auditorías, diagnósticos y programas B2C.</p>
              </div>

              <div className="p-6 rounded-3xl border border-zinc-200 bg-white shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-100">
                  <div>
                    <span className="text-xs text-zinc-400 font-mono font-bold">CONEXIÓN STRIPE</span>
                    <div className="text-sm font-bold text-zinc-900 mt-0.5">Cuenta Conectada: Inteligencia Neuronal LLC</div>
                  </div>
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 w-fit">
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
                    <div key={i} className="flex items-center justify-between p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 text-xs">
                      <div>
                        <div className="font-bold text-zinc-900">{tx.desc}</div>
                        <div className="text-[11px] text-zinc-500 mt-0.5">{tx.customer} • ID: {tx.id}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-zinc-900">{tx.amount}</div>
                        <div className="font-mono text-[10px] font-bold text-emerald-700">{tx.status} • {tx.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>

        {/* ── MODAL: AGREGAR / EDITAR ACTIVO OPERATIVO ── */}
        {(isAddResourceModalOpen || editingResource) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-lg rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl space-y-5 text-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <h3 className="text-base font-bold text-zinc-900">
                  {editingResource ? 'Editar Activo Operativo' : 'Cargar Nuevo Activo'}
                </h3>
                <button
                  onClick={() => {
                    setIsAddResourceModalOpen(false);
                    setEditingResource(null);
                  }}
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
                    className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2.5 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">FORMATO</label>
                    <input
                      type="text"
                      value={resourceFormData.format}
                      onChange={(e) => setResourceFormData({ ...resourceFormData, format: e.target.value })}
                      placeholder="Ej. PDF / XLSX / Notion"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">TAG / ETIQUETA</label>
                    <input
                      type="text"
                      value={resourceFormData.tag}
                      onChange={(e) => setResourceFormData({ ...resourceFormData, tag: e.target.value })}
                      placeholder="Ej. AEO, HACCP, EXCEL"
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">NIVEL DE ACCESO</label>
                    <select
                      value={resourceFormData.access}
                      onChange={(e) => setResourceFormData({ ...resourceFormData, access: e.target.value })}
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none"
                    >
                      <option value="GRATUITO (LEAD)">GRATUITO (LEAD)</option>
                      <option value="EXCLUSIVO CURSO">EXCLUSIVO CURSO</option>
                      <option value="ACCESO PAGO">ACCESO PAGO</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-zinc-700 font-mono font-bold mb-1">DESCARGAS INICIALES</label>
                    <input
                      type="number"
                      value={resourceFormData.downloads}
                      onChange={(e) => setResourceFormData({ ...resourceFormData, downloads: parseInt(e.target.value) || 0 })}
                      className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-3.5 py-2 text-zinc-900 focus:border-zinc-900 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddResourceModalOpen(false);
                      setEditingResource(null);
                    }}
                    className="px-4 py-2 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-50 transition-colors font-semibold"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold transition-all shadow-sm"
                  >
                    Guardar Activo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ── MODAL: FICHA TÉCNICA DE AUDITORÍA & DIAGNÓSTICO ── */}
        {selectedAuditForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-xl rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl space-y-6 text-zinc-900">
              <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-zinc-900" />
                  <h3 className="text-base font-bold text-zinc-900">
                    Ficha Técnica de Diagnóstico: {selectedAuditForModal.id}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedAuditForModal(null)}
                  className="text-zinc-400 hover:text-zinc-900 p-1 rounded-lg"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div className="bg-zinc-50 p-5 rounded-2xl border border-zinc-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Empresa / Marca:</span>
                    <span className="text-zinc-900 font-bold">{selectedAuditForModal.companyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Responsable / Solicitante:</span>
                    <span className="text-zinc-800 font-semibold">{selectedAuditForModal.fullName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Email Corporativo:</span>
                    <span className="text-zinc-900 font-bold">{selectedAuditForModal.corporateEmail}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">WhatsApp Directo:</span>
                    <a
                      href={`https://wa.me/${selectedAuditForModal.phoneWhatsApp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold underline"
                    >
                      {selectedAuditForModal.phoneWhatsApp}
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200">
                    <span className="text-zinc-400 block text-[10px] font-bold">MODELO OPERATIVO</span>
                    <span className="text-zinc-900 font-bold">{selectedAuditForModal.businessType}</span>
                  </div>
                  <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200">
                    <span className="text-zinc-400 block text-[10px] font-bold">VOLUMEN DIARIO</span>
                    <span className="text-zinc-900 font-bold">{selectedAuditForModal.dailyVolume}</span>
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <span className="text-zinc-400 block text-[10px] font-bold">SISTEMA POS / ERP ACTUAL</span>
                  <span className="text-zinc-900 font-bold">{selectedAuditForModal.currentERP}</span>
                </div>

                <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200">
                  <span className="text-zinc-400 block text-[10px] font-bold mb-1">CUELLO DE BOTELLA / FUGAS DECLARADAS</span>
                  <p className="text-zinc-700 font-sans text-xs leading-relaxed">
                    {selectedAuditForModal.primaryBottleneck || 'No especificado'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                <a
                  href={`mailto:${selectedAuditForModal.corporateEmail}?subject=Diagnóstico de Automatización - Inteligencia Neuronal`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-900 text-white font-bold text-xs hover:bg-zinc-800 transition-all shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Enviar Correo</span>
                </a>
                <button
                  onClick={() => setSelectedAuditForModal(null)}
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
