# Inteligencia Neuronal — Landing Page & Funnel B2B

Embudo de ventas corporativo y plataforma de diagnóstico para **Inteligencia Neuronal**, firma de consultoría en Inteligencia Operativa y Automatización Gastronómica.

## Stack Tecnológico

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & Static Site Generation)
- **Lenguaje**: TypeScript 5 (Tipado estricto)
- **Estilos**: Tailwind CSS 3 con paleta personalizada HSL
- **Gestión de Estado**: Zustand
- **Validación Backend**: Zod
- **Base de Datos & Seguridad**: Supabase (PostgreSQL con Row Level Security - RLS)
- **Iconografía**: Lucide React + Blueprints SVG personalizados
- **Despliegue**: Vercel Serverless

---

## Estructura del Proyecto

```
inteligencia-neuronal/
├── app/
│   ├── api/leads/route.ts        # Endpoint server-side con validación Zod
│   ├── layout.tsx                # Fuentes Google (Caveat, Plus Jakarta Sans, JetBrains Mono)
│   ├── page.tsx                  # Ensamblado de secciones
│   └── globals.css               # Design tokens y scroll suave
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Header con logo cursivo y contacto telefónico
│   │   └── Footer.tsx            # Footer corporativo con botón ancho "Obtener IT Soporte"
│   ├── sections/
│   │   ├── HeroSection.tsx       # Hero 2 columnas con fundador y telemetría KDS
│   │   ├── ServicesGrid.tsx      # 4 tarjetas de servicios en paletas pastel
│   │   ├── ProcessSection.tsx    # Metodología de 4 fases
│   │   └── FoodCostCalculator.tsx # Simulador interactivo de Food Cost y EBITDA
│   └── ui/
│       ├── Button.tsx            # Botón con variantes y estados de carga
│       ├── ServiceCard.tsx       # Tarjeta reutilizable con vectores blueprint
│       └── LeadModal.tsx         # Modal multi-paso calificador
├── lib/
│   ├── supabase/client.ts        # Bridge de conexión a base de datos
│   └── validators/lead.ts        # Esquemas Zod
├── store/
│   └── useLeadStore.ts           # Store reactivo Zustand
└── types/
    └── index.ts                  # Interfaces TypeScript globales
```

---

## Ejecución Local

### 1. Clonar e Instalar Dependencias
```bash
npm install
```

### 2. Variables de Entorno (Opcionales para producción)
Crear un archivo `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
WEBHOOK_CRM_URL=https://your-crm-webhook-url.com
```

### 3. Iniciar Servidor de Desarrollo
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:3000`.

### 4. Compilar para Producción
```bash
npm run build
npm run start
```
