"use client";

import React from "react";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ServiceCardData } from "@/types";

export function ServicesGrid() {
  const services: ServiceCardData[] = [
    {
      id: "auditoria",
      badgeNumber: "01",
      title: "Auditoría y Estandarización Inteligente",
      description:
        "Diagnóstico de operaciones de cocina, parametrización de macronutrientes, ingeniería de menú y protección de costos bajo estrictos estándares HACCP.",
      bgCard: "bg-white",
      accentColor: "#52525b", // zinc-600
      borderColor: "border-zinc-200",
      iconType: "rentabilidad",
    },
    {
      id: "automatizacion",
      badgeNumber: "02",
      title: "Sistemas de Automatización (RPA & IA)",
      description:
        "Despliegue de flujos de trabajo en servidores dedicados con n8n, integración para reservas y pedidos, y sincronización de bases de datos operativas con CRM propio.",
      bgCard: "bg-zinc-50",
      accentColor: "#3f3f46", // zinc-700
      borderColor: "border-zinc-200",
      iconType: "compras",
    },
    {
      id: "infraestructura",
      badgeNumber: "03",
      title: "Desarrollo de Infraestructura (FoodTech)",
      description:
        "Creación de entornos digitales robustos, integraciones de pago fluidas (Stripe) y paneles de control (dashboards) en tiempo real para gerencia.",
      bgCard: "bg-zinc-100",
      accentColor: "#27272a", // zinc-800
      borderColor: "border-zinc-300",
      iconType: "kds",
    },
  ];

  return (
    <section id="servicios" className="pt-8 pb-20 sm:pt-12 sm:pb-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900">
            Nuestros Pilares
          </h2>
          <p className="text-base sm:text-lg text-zinc-500 leading-relaxed max-w-2xl">
            Arquitectura de servicios diseñados para escalar la operatividad corporativa de tu marca.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((svc) => (
            <ServiceCard key={svc.id} {...svc} />
          ))}
        </div>

      </div>
    </section>
  );
}
