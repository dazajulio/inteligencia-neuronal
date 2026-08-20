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
  openGraph: {
    title: "Inteligencia Neuronal | Automatización Gastronómica",
    description:
      "Estandarizo y automatizo tus operaciones críticas. Reducción de mermas y control de costos en tiempo real.",
    type: "website",
    locale: "es_ES",
    siteName: "Inteligencia Neuronal",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
      </head>
      <body className="bg-white text-slate-900 font-sans antialiased selection:bg-[#0284c7] selection:text-white">
        {children}
      </body>
    </html>
  );
}
