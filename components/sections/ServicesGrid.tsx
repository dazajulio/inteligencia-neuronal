"use client";

import React from "react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ServiceCardData } from "@/types";

export function ServicesGrid() {
  const services: ServiceCardData[] = [
    {
      id: "compras",
      badgeNumber: "01",
      title: "Automatización de Compras y Abastecimiento",
      description:
        "Elimina el error humano y controla tus costos en tiempo real. Implementamos sistemas inteligentes que monitorean tu inventario y coordinan con proveedores en piloto automático.",
      bgCard: "bg-[#ede9fe]", // Lavanda pastel
      accentColor: "#4f46e5", // Indigo
      borderColor: "border-indigo-200/80",
      iconType: "compras",
    },
    {
      id: "rentabilidad",
      badgeNumber: "02",
      title: "Rentabilidad y Estandarización",
      description:
        "Blindamos tu margen de ganancia. Desarrollamos recetarios exactos y manuales operativos que calculan rendimientos reales de cocción para protegerte de la inflación.",
      bgCard: "bg-[#fff7ed]", // Naranja pastel
      accentColor: "#ea580c", // Naranja
      borderColor: "border-orange-200/80",
      iconType: "rentabilidad",
    },
    {
      id: "kds",
      badgeNumber: "03",
      title: "Ecosistemas Tecnológicos Propios",
      description:
        "Unifica tus pedidos, salón y pantallas de cocina. Toma el control absoluto de tus sucursales con plataformas independientes, sin pagar comisiones abusivas a terceros.",
      bgCard: "bg-[#f1f5f9]", // Gris claro
      accentColor: "#475569", // Slate
      borderColor: "border-slate-300/80",
      iconType: "kds",
    },
    {
      id: "adquisicion",
      badgeNumber: "04",
      title: "Motores de Adquisición de Clientes",
      description:
        "Multiplicamos tu facturación y visibilidad. Optimizamos tu presencia digital para dominar tu zona y convertir búsquedas locales en comensales recurrentes.",
      bgCard: "bg-[#e0f2fe]", // Azul claro
      accentColor: "#0284c7", // Azure
      borderColor: "border-sky-200/80",
      iconType: "adquisicion",
    },
  ];

  return (
    <section id="servicios" className="py-20 sm:py-28 bg-[#f8fafc] border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900">
            Servicios
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed">
            Estructura de 4 pilares de ingeniería agéntica diseñada para resolver los puntos de dolor críticos en cocinas comerciales y cadenas de alimentos.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {services.map((svc) => (
            <ServiceCard key={svc.id} {...svc} />
          ))}
        </div>

      </div>
    </section>
  );
}
