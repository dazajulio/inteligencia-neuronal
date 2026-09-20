import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  title: "Inteligencia Neuronal | Inteligencia Operativa y Automatización Gastronómica",
  description:
    "Estandarizo y automatizo tus operaciones críticas. Reducción de mermas y control de costos en tiempo real impulsado por agentes IA enterprise para el sector gastronómico.",
  keywords: [
    "Inteligencia Operativa Gastronómica",
    "Automatización de Compras Restaurantes",
    "Estandarización de Menús",
    "KDS Inteligente",
    "Adquisición de Clientes Gastronomía",
    "Control de Mermas Cocina Industrial",
  ],
  authors: [{ name: "Inteligencia Neuronal" }],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Inteligencia Neuronal | Automatización Gastronómica",
    description:
      "Estandarizo y automatizo tus operaciones críticas. Reducción de mermas y control de costos en tiempo real.",
    type: "website",
    locale: "es_ES",
    siteName: "Inteligencia Neuronal",
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.inteligencianeuronal.com/#organization",
      "name": "Inteligencia Neuronal",
      "url": "https://www.inteligencianeuronal.com",
      "logo": "https://www.inteligencianeuronal.com/logo.png",
      "description": "Firma de consultoría en Inteligencia Operativa, automatización agéntica con IA y plataformas FoodTech para marcas y cadenas gastronómicas.",
      "founder": {
        "@type": "Person",
        "name": "Julio Alberto Daza Celis",
        "url": "https://www.dazajulio.com"
      },
      "sameAs": [
        "https://www.dazajulio.com",
        "https://www.glubbi.app"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+584148817137",
        "contactType": "customer support",
        "areaServed": ["VE", "US", "ES", "LatAm"],
        "availableLanguage": ["Spanish"]
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://www.inteligencianeuronal.com/#service",
      "name": "Inteligencia Neuronal - Automatización e IA Gastronómica",
      "image": "https://www.inteligencianeuronal.com/logo.png",
      "url": "https://www.inteligencianeuronal.com",
      "telephone": "+584148817137",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mérida",
        "addressRegion": "Mérida",
        "addressCountry": "VE"
      },
      "priceRange": "$450 - $5000 USD",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios de Inteligencia Operativa y FoodTech",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Auditoría de Ecosistema Digital y AEO",
              "description": "Diagnóstico de infraestructura operativa, SEO/AEO local y mitigación de fricción en pedidos."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Sistemas Agénticos Autónomos de IA",
              "description": "Despliegue de agentes de IA para atención por WhatsApp, compras y sincronización de inventario."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Infraestructura & Plataformas FoodTech",
              "description": "Plataforma de canal directo, menús interactivos, KDS en tiempo real y dashboards gerenciales."
            }
          }
        ]
      }
    },
    {
      "@type": "Course",
      "@id": "https://www.inteligencianeuronal.com/academy#masterclass-ia",
      "name": "Masterclass de IA para Restaurantes",
      "description": "Automatización operativa con Inteligencia Artificial, agentes de WhatsApp y control de escandallos.",
      "provider": {
        "@type": "Organization",
        "name": "Inteligencia Neuronal Academy",
        "sameAs": "https://www.inteligencianeuronal.com/academy"
      }
    },
    {
      "@type": "Course",
      "@id": "https://www.inteligencianeuronal.com/academy#bootcamp-n8n",
      "name": "Bootcamp Técnico: Arquitectura de Pipelines con n8n & Agentes IA",
      "description": "Despliegue de infraestructura empresarial sobre servidores VPS con Docker, PostgreSQL y Meta APIs.",
      "provider": {
        "@type": "Organization",
        "name": "Inteligencia Neuronal Academy",
        "sameAs": "https://www.inteligencianeuronal.com/academy"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="bg-white text-slate-900 font-sans antialiased selection:bg-[#0284c7] selection:text-white">
        {children}
      </body>
    </html>
  );
}
