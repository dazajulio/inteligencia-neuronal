-- ============================================================================
-- INTELIGENCIA NEURONAL — ESQUEMA COMPLETO DE BASE DE DATOS SUPABASE
-- Plataforma B2B de Inteligencia Operativa, Campus Virtual y Red Agentica
-- ============================================================================

-- 0. Habilitar extensiones
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Funcion para auto-actualizar timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
AS 
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
;

-- 1. TABLA: CURSOS & PROGRAMAS (CAMPUS VIRTUAL)
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    badge TEXT NOT NULL DEFAULT 'NUEVO',
    level TEXT NOT NULL DEFAULT 'Intermedio',
    tagline TEXT,
    description TEXT,
    duration TEXT NOT NULL DEFAULT '4 Modulos Intensivos',
    price_usd NUMERIC(10, 2) NOT NULL DEFAULT 97.00,
    price_display TEXT NOT NULL DEFAULT ' USD',
    preview_image TEXT,
    stripe_color TEXT DEFAULT 'from-[#EA0C7F] via-[#971B8D] to-[#6366f1]',
    tools JSONB DEFAULT '[]'::jsonb,
    cta_url TEXT DEFAULT '#',
    status TEXT NOT NULL DEFAULT 'ACTIVO' CHECK (status IN ('ACTIVO', 'BORRADOR', 'ARCHIVADO')),
    students_enrolled INTEGER DEFAULT 0,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

DROP TRIGGER IF EXISTS update_courses_updated_at ON public.courses;
CREATE TRIGGER update_courses_updated_at
    BEFORE UPDATE ON public.courses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 2. TABLA: MODULOS DE LOS CURSOS (SYLLABUS / TEMARIO)
CREATE TABLE IF NOT EXISTS public.course_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    week_label TEXT NOT NULL DEFAULT '01',
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_course_modules_course_id ON public.course_modules(course_id);

-- 3. TABLA: RECURSOS DEL TOOLKIT (LEAD MAGNETS & ACTIVOS OPERATIVOS)
CREATE TABLE IF NOT EXISTS public.academy_resources (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    tag TEXT NOT NULL DEFAULT 'RECURSO',
    format TEXT NOT NULL DEFAULT 'PDF / Guia',
    preview_image TEXT,
    stripe_color TEXT DEFAULT 'from-[#1DACE3] to-[#0284c7]',
    file_url TEXT,
    access_type TEXT DEFAULT 'GRATUITO (LEAD)',
    downloads_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

DROP TRIGGER IF EXISTS update_academy_resources_updated_at ON public.academy_resources;
CREATE TRIGGER update_academy_resources_updated_at
    BEFORE UPDATE ON public.academy_resources
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 4. TABLA: LEADS, AUDITORIAS & DIAGNOSTICOS B2B
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    folio TEXT UNIQUE NOT NULL,
    lead_type TEXT NOT NULL DEFAULT 'diagnostico' CHECK (lead_type IN ('diagnostico', 'auditoria', 'toolkit_download', 'contacto_general', 'calculadora_foodcost')),
    full_name TEXT NOT NULL,
    company_name TEXT NOT NULL,
    corporate_email TEXT NOT NULL,
    phone_whatsapp TEXT NOT NULL,
    business_type TEXT DEFAULT 'Restaurante / Hosteleria',
    daily_volume TEXT DEFAULT '-',
    current_erp TEXT DEFAULT '-',
    primary_bottleneck TEXT,
    service_needed TEXT DEFAULT 'Auditoria & Diagnostico de Automatizacion',
    resource_id TEXT REFERENCES public.academy_resources(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'Nuevo' CHECK (status IN ('Nuevo', 'En Evaluacion', 'Contactado', 'Enviado Secuencia Email', 'Lead Caliente', 'Cerrado / Pagado', 'Descartado')),
    source TEXT DEFAULT 'web',
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_leads_corporate_email ON public.leads(corporate_email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);

DROP TRIGGER IF EXISTS update_leads_updated_at ON public.leads;
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 5. TABLA: DESCARGAS INDIVIDUALES DE RECURSOS (LOGS DE TOOLKIT)
CREATE TABLE IF NOT EXISTS public.resource_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource_id TEXT NOT NULL REFERENCES public.academy_resources(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    email TEXT NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    downloaded_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_resource_downloads_resource_id ON public.resource_downloads(resource_id);
CREATE INDEX IF NOT EXISTS idx_resource_downloads_email ON public.resource_downloads(email);

-- 6. TABLA: VENTAS, FACTURACION & TRANSACCIONES (STRIPE)
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number TEXT UNIQUE NOT NULL,
    stripe_session_id TEXT UNIQUE,
    stripe_payment_intent_id TEXT,
    stripe_customer_id TEXT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT,
    company_name TEXT,
    item_type TEXT NOT NULL CHECK (item_type IN ('curso', 'auditoria', 'consultoria', 'suscripcion_saas')),
    course_id TEXT REFERENCES public.courses(id) ON DELETE SET NULL,
    concept TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    status TEXT NOT NULL DEFAULT 'PAGADO' CHECK (status IN ('PENDIENTE', 'PAGADO', 'REEMBOLSADO', 'FALLIDO')),
    payment_method TEXT DEFAULT 'stripe',
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON public.orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 7. TABLA: ESTUDIANTES / INSCRIPCIONES A CURSOS
CREATE TABLE IF NOT EXISTS public.course_enrollments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
    student_name TEXT NOT NULL,
    student_email TEXT NOT NULL,
    access_status TEXT DEFAULT 'ACTIVO' CHECK (access_status IN ('ACTIVO', 'SUSPENDIDO', 'COMPLETADO')),
    progress_percent INTEGER DEFAULT 0 CHECK (progress_percent BETWEEN 0 AND 100),
    enrolled_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    expires_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_enrollments_student_email ON public.course_enrollments(student_email);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.course_enrollments(course_id);

-- 8. TABLA: SIMULACIONES CALCULADORA FOOD COST & EBITDA
CREATE TABLE IF NOT EXISTS public.food_cost_simulations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
    monthly_sales NUMERIC(12, 2) NOT NULL,
    current_food_cost_pct NUMERIC(5, 2) NOT NULL,
    target_food_cost_pct NUMERIC(5, 2) NOT NULL,
    monthly_waste_pct NUMERIC(5, 2) DEFAULT 0,
    estimated_monthly_savings NUMERIC(12, 2) NOT NULL,
    estimated_annual_ebitda_increase NUMERIC(12, 2) NOT NULL,
    email TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 9. TABLA: RED AGENTICA & MONITOREO (ORQUESTACION N8N & IA)
CREATE TABLE IF NOT EXISTS public.agents (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    trigger_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'ONLINE' CHECK (status IN ('ONLINE', 'IDLE', 'OFFLINE', 'ERROR')),
    executions_today INTEGER DEFAULT 0,
    total_executions BIGINT DEFAULT 0,
    error_rate TEXT DEFAULT '0.0%',
    tokens_consumed TEXT DEFAULT '0k',
    last_active_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS public.agent_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id TEXT NOT NULL REFERENCES public.agents(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL,
    payload JSONB DEFAULT '{}'::jsonb,
    status TEXT DEFAULT 'SUCCESS' CHECK (status IN ('SUCCESS', 'WARNING', 'ERROR')),
    tokens_used INTEGER DEFAULT 0,
    execution_time_ms INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_agent_logs_agent_id ON public.agent_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_logs_created_at ON public.agent_logs(created_at DESC);

-- 10. SEGURIDAD & POLITICAS ROW LEVEL SECURITY (RLS)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.academy_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_cost_simulations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_logs ENABLE ROW LEVEL SECURITY;

-- POLITICAS PUBLICAS (Lectura)
DROP POLICY IF EXISTS "Lectura publica de cursos activos" ON public.courses;
CREATE POLICY "Lectura publica de cursos activos" ON public.courses FOR SELECT USING (status = 'ACTIVO');

DROP POLICY IF EXISTS "Lectura publica de temarios de cursos" ON public.course_modules;
CREATE POLICY "Lectura publica de temarios de cursos" ON public.course_modules FOR SELECT USING (true);

DROP POLICY IF EXISTS "Lectura publica de recursos activos" ON public.academy_resources;
CREATE POLICY "Lectura publica de recursos activos" ON public.academy_resources FOR SELECT USING (is_active = true);

-- POLITICAS DE INSERCION PUBLICA
DROP POLICY IF EXISTS "Insercion publica de leads" ON public.leads;
CREATE POLICY "Insercion publica de leads" ON public.leads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Insercion publica de descargas de toolkit" ON public.resource_downloads;
CREATE POLICY "Insercion publica de descargas de toolkit" ON public.resource_downloads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Insercion publica de simulaciones food cost" ON public.food_cost_simulations;
CREATE POLICY "Insercion publica de simulaciones food cost" ON public.food_cost_simulations FOR INSERT WITH CHECK (true);

-- POLITICAS ADMIN / SERVICE ROLE
DROP POLICY IF EXISTS "Acceso total admin a courses" ON public.courses;
CREATE POLICY "Acceso total admin a courses" ON public.courses FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Acceso total admin a course_modules" ON public.course_modules;
CREATE POLICY "Acceso total admin a course_modules" ON public.course_modules FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Acceso total admin a academy_resources" ON public.academy_resources;
CREATE POLICY "Acceso total admin a academy_resources" ON public.academy_resources FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Acceso total admin a leads" ON public.leads;
CREATE POLICY "Acceso total admin a leads" ON public.leads FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Acceso total admin a orders" ON public.orders;
CREATE POLICY "Acceso total admin a orders" ON public.orders FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Acceso total admin a enrollments" ON public.course_enrollments;
CREATE POLICY "Acceso total admin a enrollments" ON public.course_enrollments FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Acceso total admin a agents" ON public.agents;
CREATE POLICY "Acceso total admin a agents" ON public.agents FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Acceso total admin a agent_logs" ON public.agent_logs;
CREATE POLICY "Acceso total admin a agent_logs" ON public.agent_logs FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

-- 11. STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) 
VALUES 
    ('academy-files', 'academy-files', true),
    ('course-previews', 'course-previews', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Descarga publica de archivos de academy" ON storage.objects;
CREATE POLICY "Descarga publica de archivos de academy" ON storage.objects FOR SELECT USING (bucket_id IN ('academy-files', 'course-previews'));

DROP POLICY IF EXISTS "Subida de archivos por administradores" ON storage.objects;
CREATE POLICY "Subida de archivos por administradores" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('academy-files', 'course-previews'));

-- 12. SEED DATA (DATOS INICIALES DEL PROYECTO)
INSERT INTO public.courses (id, slug, badge, level, title, tagline, description, duration, price_usd, price_display, preview_image, stripe_color, tools, cta_url, status, students_enrolled, order_index)
VALUES 
(
    'ia-restaurantes',
    'ia-restaurantes',
    'MAS POPULAR',
    'Operativo & Estrategico',
    'Masterclass: Automatizacion Agentica con IA',
    'Aprende a desplegar agentes de WhatsApp que atienden, venden y controlan recetas sin alucinaciones.',
    'Aprende a desplegar asistentes de IA que atienden clientes por WhatsApp, toman pedidos directos, controlan mermas de cocina y blindan tus recetas.',
    '4 Modulos Intensivos • Acceso de por vida',
    97.00,
    ' USD',
    'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    'from-[#EA0C7F] via-[#971B8D] to-[#6366f1]',
    '["OpenAI API", "Claude 3.5", "WhatsApp Cloud API", "Airtable"]'::jsonb,
    'https://buy.stripe.com/test_ia_restaurantes',
    'ACTIVO',
    28,
    1
),
(
    'bootcamp-n8n',
    'bootcamp-n8n',
    'TECNICO / DEV',
    'Avanzado',
    'Bootcamp: Despliegue de Pipelines con n8n',
    'Construye la infraestructura de automatizacion de un restaurante sobre servidores VPS dedicados.',
    'Aprende a montar la infraestructura digital y de automatizacion sobre servidores VPS propios con Docker, bases de datos PostgreSQL y webhooks de Meta.',
    '6 Semanas en Vivo + Laboratorios',
    197.00,
    ' USD',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'from-[#1DACE3] via-[#0284c7] to-[#4f46e5]',
    '["n8n Self-Hosted", "Docker", "PostgreSQL", "Meta Webhooks"]'::jsonb,
    'https://buy.stripe.com/test_bootcamp_n8n',
    'ACTIVO',
    14,
    2
),
(
    'crecimiento-aeo',
    'crecimiento-aeo',
    'CRECIMIENTO B2C',
    'Marketing & Adquisicion',
    'Dominio Local: SEO, AEO & Visibilidad IA',
    'Posiciona tu marca gastronomica en Google Maps y se la respuesta que ChatGPT y Gemini recomiendan.',
    'Domina la presencia de tu restaurante en Google Maps y se la opcion prioritaria recomendada por motores de Inteligencia Artificial como ChatGPT y Gemini.',
    'Taller Practico Grabado',
    67.00,
    '$67 USD',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    'from-[#FEAD2B] via-[#ea580c] to-[#EA0C7F]',
    '["Google Business", "Schema.org", "Perplexity Engine", "JSON-LD"]'::jsonb,
    'https://buy.stripe.com/test_crecimiento_aeo',
    'ACTIVO',
    19,
    3
),
(
    'claude-code',
    'claude-code',
    'MAS POPULAR',
    'Desarrollo & Automatizacion',
    'Curso Completo de Claude Code: Crea Aplicaciones con IA',
    'Domina Claude Code a nivel profesional y crea aplicaciones reales y seguras con Agentes de IA, MCP, Hooks, Skills y terminal autonoma.',
    'Domina Claude Code a nivel profesional y crea aplicaciones reales y seguras con Agentes de IA, MCP, Hooks, Skills y terminal autonoma.',
    '12 Secciones • 15h 7m',
    97.00,
    '$97 USD',
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    'from-[#EA0C7F] via-[#971B8D] to-[#1DACE3]',
    '["Claude Code CLI", "Claude 3.7 Sonnet", "Node.js", "Git & GitHub", "Docker"]'::jsonb,
    'https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407',
    'ACTIVO',
    42,
    4
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    tagline = EXCLUDED.tagline,
    price_display = EXCLUDED.price_display,
    preview_image = EXCLUDED.preview_image,
    tools = EXCLUDED.tools;

INSERT INTO public.course_modules (course_id, week_label, title, description, order_index)
VALUES 
    ('ia-restaurantes', '01', 'Arquitectura de Prompts & Escandallos', 'Control de costos, ingenieria de menu y calibracion de recetas sin margen de error.', 1),
    ('ia-restaurantes', '02', 'Agente de Ventas & Reservas 24/7', 'Configuracion de asistentes conversacionales con menus dinamicos y cobros.', 2),
    ('ia-restaurantes', '03', 'Supervision & Mitigacion de Alucinaciones', 'Protocolos de seguridad para que la IA no invente datos ni comprometa precios.', 3),
    ('ia-restaurantes', '04', 'Integracion en el Negocio Real', 'Puesta en marcha con clientes reales y metricas de conversion en vivo.', 4),
    
    ('bootcamp-n8n', '01', 'Despliegue VPS con Docker & Caddy', 'Instalacion segura de n8n en servidores en la nube con certificados SSL.', 1),
    ('bootcamp-n8n', '02', 'Meta Cloud API & Webhooks Reversos', 'Recepcion y procesamiento de eventos transaccionales de WhatsApp.', 2),
    ('bootcamp-n8n', '03', 'Conexion a Bases de Datos Relacionales', 'Persistencia de pedidos, clientes y stock con PostgreSQL/Supabase.', 3),
    ('bootcamp-n8n', '04', 'Alertas Criticas y Monitoreo 24/7', 'Integracion de bots de Telegram para fallas de servidor y cuellos de botella.', 4),

    ('crecimiento-aeo', '01', 'Indexacion de Menus para Motores IA (AEO)', 'Estructuracion de microdatos para que los LLMs recomienden tus platos.', 1),
    ('crecimiento-aeo', '02', 'Autoridad Local & Google Business 360', 'Estrategias de posicionamiento en el mapa y reputacion sin pagar pauta.', 2),
    ('crecimiento-aeo', '03', 'Embudos de Trafico Directo a WhatsApp', 'Conversion de busquedas organicas en pedidos sin pagar comisiones.', 3),

    ('claude-code', '01', 'Configuracion de Entorno & Claude CLI', 'Instalacion, claves de API, configuracion de permisos y seguridad.', 1),
    ('claude-code', '02', 'Ingenieria de Prompts en Terminal & Multi-Turn', 'Direccion precisa de agentes para tareas de programacion complejas.', 2),
    ('claude-code', '03', 'Integracion con Git, CI/CD y APIs Externas', 'Agentes que revisan pull requests y despliegan a produccion.', 3),
    ('claude-code', '04', 'Proyecto Practico: Agente Fullstack Desplegado', 'Construccion completa de una aplicacion interactiva guiada por IA.', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.academy_resources (id, slug, title, description, tag, format, preview_image, stripe_color, file_url, downloads_count, order_index)
VALUES
(
    'aeo-rag',
    'aeo-rag',
    'Optimizacion para Motores de Respuesta (AEO): Arquitectura de Contenido y Datos Estructurados para RAG',
    'Guia tecnica y arquitectura para estructurar datos con Schema.org, metadatos JSON-LD y bases vectoriales para que ChatGPT, Gemini y Perplexity indexen y citen tu restaurante.',
    'AEO & RAG // NUEVO',
    'PDF / Arquitectura AEO',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80',
    'from-[#EA0C7F] to-[#971B8D]',
    '/downloads/aeo-rag-architecture-2026.pdf',
    168,
    1
),
(
    'escandallos',
    'escandallos',
    'Matriz de Escandallos & Costos',
    'Plantilla en Excel para costeo crudo/cocido, factor de rendimiento y mermas tecnicas en cocina.',
    'XLSX / EXCEL',
    'Plantilla XLSX Parametrizada',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    'from-[#1DACE3] to-[#0284c7]',
    '/downloads/matriz-escandallos-foodcost.xlsx',
    218,
    2
),
(
    'haccp',
    'haccp',
    'Checklist de Puntos Criticos HACCP',
    'Auditoria de temperaturas, rotacion de camaras y protocolos de inocuidad y seguridad alimentaria.',
    'PDF INTERACTIVO',
    'Checklist PDF Interactivo',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
    'from-[#86C537] to-[#059669]',
    '/downloads/checklist-haccp-restaurantes.pdf',
    145,
    3
),
(
    'sops',
    'sops',
    'Framework de SOPs para Restaurantes',
    'Estructura modular para documentar recetas y compras antes de automatizar con IA.',
    'NOTION TEMPLATE',
    'Notion Workspace Duplicable',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
    'from-[#FEAD2B] to-[#d97706]',
    'https://notion.so/template-sops-inteligencia-neuronal',
    98,
    4
),
(
    'aeo',
    'aeo',
    'Guia de Indexacion Local & AEO',
    'Configuracion tecnica de menus y Schema.org para Google Maps y motores de respuesta de IA.',
    'GUIA TECNICA',
    'Guia Tecnica PDF',
    'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80',
    'from-[#971B8D] to-[#1DACE3]',
    '/downloads/guia-indexacion-local-google-maps.pdf',
    84,
    5
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    tag = EXCLUDED.tag,
    preview_image = EXCLUDED.preview_image;

INSERT INTO public.agents (id, name, trigger_type, status, executions_today, total_executions, error_rate, tokens_consumed)
VALUES
    ('ag-1', 'Agente Ventas & WhatsApp', 'Meta Webhook', 'ONLINE', 1420, 48290, '0.2%', '124.5k'),
    ('ag-2', 'Agente Ingesta de Leads & Toolkit', 'Formulario Web API', 'ONLINE', 384, 12900, '0.0%', '18.2k'),
    ('ag-3', 'Agente Calibracion & Abastecimiento', 'Cron Diario (04:00 AM)', 'IDLE', 24, 820, '0.0%', '45.0k'),
    ('ag-4', 'Agente Notificaciones Telegram', 'Event Bus', 'ONLINE', 89, 3100, '0.0%', '8.4k')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.leads (folio, lead_type, full_name, company_name, corporate_email, phone_whatsapp, business_type, daily_volume, current_erp, primary_bottleneck, service_needed, status, source)
VALUES
    ('IN-AUDIT-98214', 'diagnostico', 'Roberto Valenzuela', 'Grupo Gastronomico Altamira', 'roberto@grupoaltamira.com', '+584148817137', 'Cadena de Restaurantes', '2,000 - 10,000 ordenes / dia', 'Oracle Micros / Simphony', 'Fugas en Food Cost de proteinas prime y lentitud en sincronizacion KDS con sala.', 'Auditoria de Ecosistema Digital ( USD)', 'Nuevo', 'solicitar_diagnostico'),
    ('IN-AUDIT-98213', 'diagnostico', 'Carlos Mendoza', 'Bistro Gourmet 54', 'gerencia@bistro54.mx', '+525549123456', 'Dark Kitchen / Cocina Central', '500 - 2,000 ordenes / dia', 'Toast POS', 'Demoras en WhatsApp y ordenes de compras manuales a proveedores sin prediccion.', 'Sistemas Agenticos Autonomos', 'En Evaluacion', 'hero_soy_empresa'),
    ('IN-AUDIT-98212', 'diagnostico', 'Valeria Gomez', 'Burger Lab Express', 'operaciones@burgerlab.co', '+573109876543', 'Franquicia Multisede', '> 10,000 ordenes / dia (Enterprise)', 'Soft Restaurant', 'Altas comisiones pagadas a plataformas de delivery externas (30% margen perdido).', 'Infraestructura & Plataformas FoodTech', 'Contactado', 'soluciones_card')
ON CONFLICT (folio) DO NOTHING;
