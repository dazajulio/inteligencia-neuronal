"use client";

import React, { useEffect } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  UtensilsCrossed,
  Building2,
  Factory,
  Store,
  Sparkles,
  Phone,
  Mail,
  Building,
  User,
} from "lucide-react";
import { useLeadStore } from "@/store/useLeadStore";
import { Button } from "./Button";

export function LeadModal() {
  const {
    isModalOpen,
    closeModal,
    activeStep,
    nextStep,
    prevStep,
    formData,
    updateField,
    isSubmitting,
    submitError,
    leadId,
    submitForm,
    resetForm,
  } = useLeadStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, closeModal]);

  if (!isModalOpen) return null;

  const handleClose = () => {
    closeModal();
    if (activeStep === 3) {
      resetForm();
    }
  };

  const businessTypes = [
    {
      value: "cadena_restaurantes",
      label: "Cadena de Restaurantes",
      icon: <UtensilsCrossed className="w-4 h-4 text-[#0284c7]" />,
      desc: "Multi-unidad, fast-casual o mesa",
    },
    {
      value: "dark_kitchen",
      label: "Dark Kitchen / Cocina Central",
      icon: <Building2 className="w-4 h-4 text-[#0284c7]" />,
      desc: "Producción concentrada para delivery",
    },
    {
      value: "planta_alimentos",
      label: "Planta de Alimentos / FoodTech",
      icon: <Factory className="w-4 h-4 text-[#c2410c]" />,
      desc: "Manufactura y distribución masiva",
    },
    {
      value: "franquicia",
      label: "Franquicia Multisede",
      icon: <Store className="w-4 h-4 text-emerald-600" />,
      desc: "Operaciones distribuidas multi-tenant",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              Auditoría & Diagnóstico de Automatización
            </span>
          </div>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200/80 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps indicator */}
        <div className="grid grid-cols-3 border-b border-slate-100 bg-slate-50/40 text-xs font-mono">
          <div
            className={`py-3 px-4 text-center border-r border-slate-100 transition-colors ${
              activeStep === 1
                ? "text-[#0284c7] bg-sky-50 font-bold border-b-2 border-b-[#0284c7]"
                : "text-slate-400"
            }`}
          >
            1. Perfil Operativo
          </div>
          <div
            className={`py-3 px-4 text-center border-r border-slate-100 transition-colors ${
              activeStep === 2
                ? "text-[#0284c7] bg-sky-50 font-bold border-b-2 border-b-[#0284c7]"
                : "text-slate-400"
            }`}
          >
            2. Datos de Contacto
          </div>
          <div
            className={`py-3 px-4 text-center transition-colors ${
              activeStep === 3
                ? "text-[#0284c7] bg-sky-50 font-bold border-b-2 border-b-[#0284c7]"
                : "text-slate-400"
            }`}
          >
            3. Confirmación
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-6">
          {submitError && (
            <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-600 font-medium">
              {submitError}
            </div>
          )}

          {/* STEP 1 */}
          {activeStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Mapeo de tu Operación Gastronómica
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Enfocaremos el diagnóstico en la reducción de mermas, órdenes automáticas y control de escandallos.
                </p>
              </div>

              {/* Business types */}
              <div className="space-y-2">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
                  Modelo de Operación
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {businessTypes.map((t) => (
                    <div
                      key={t.value}
                      onClick={() => updateField("businessType", t.value)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col gap-1.5 ${
                        formData.businessType === t.value
                          ? "bg-sky-50/80 border-[#0284c7] ring-2 ring-[#0284c7]/20 shadow-sm"
                          : "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
                        {t.icon}
                        <span>{t.label}</span>
                      </div>
                      <span className="text-xs text-slate-500">{t.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Volume and ERP */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 font-bold">
                    Volumen de Producción / Día
                  </label>
                  <select
                    value={formData.dailyVolume}
                    onChange={(e) => updateField("dailyVolume", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0284c7]"
                  >
                    <option value="menos_500">&lt; 500 órdenes / día</option>
                    <option value="500_2000">500 - 2,000 órdenes / día</option>
                    <option value="2000_10000">2,000 - 10,000 órdenes / día</option>
                    <option value="mas_10000">&gt; 10,000 órdenes / día (Enterprise)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 font-bold">
                    ERP / POS Principal
                  </label>
                  <select
                    value={formData.currentERP}
                    onChange={(e) => updateField("currentERP", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0284c7]"
                  >
                    <option value="oracle_micros">Oracle Micros / Simphony</option>
                    <option value="toast">Toast POS</option>
                    <option value="sap">SAP Business One / S4HANA</option>
                    <option value="soft_restaurant">Soft Restaurant</option>
                    <option value="icg_frontrest">ICG FrontRest</option>
                    <option value="custom">Sistema Propio / Custom</option>
                    <option value="otro">Otro / Hojas de Cálculo</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {activeStep === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Datos de Contacto Directo
                </h3>
                <p className="text-sm text-slate-600 mt-1">
                  Coordinaremos la sesión de diagnóstico técnico con un especialista en ingeniería operativa.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 font-bold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#0284c7]" /> Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Roberto Valenzuela"
                    value={formData.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0284c7] placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 font-bold flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-[#0284c7]" /> Empresa / Restaurante *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Grupo Gastronómico Premium"
                    value={formData.companyName}
                    onChange={(e) => updateField("companyName", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0284c7] placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 font-bold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#0284c7]" /> Email Corporativo *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="roberto@empresa.com"
                    value={formData.corporateEmail}
                    onChange={(e) => updateField("corporateEmail", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0284c7] placeholder-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-700 font-bold flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#0284c7]" /> WhatsApp / Teléfono *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+58 414 1234567"
                    value={formData.phoneWhatsApp}
                    onChange={(e) => updateField("phoneWhatsApp", e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0284c7] placeholder-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-700 font-bold">
                  Cuello de Botella Operativo Principal (Opcional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Ej. Fugas de Food Cost en proteínas, lentitud en KDS horas pico, compras urgentes a sobreprecio..."
                  value={formData.primaryBottleneck}
                  onChange={(e) => updateField("primaryBottleneck", e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#0284c7] placeholder-slate-400 resize-none"
                />
              </div>

              <div className="flex items-center gap-2.5 text-xs text-slate-600 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-[#0284c7] shrink-0" />
                <span>
                  <strong>NDA & Zero-Training:</strong> Tus escandallos, recetas maestras y proveedores quedan 100% protegidos bajo acuerdo corporativo de confidencialidad.
                </span>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {activeStep === 3 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 bg-sky-100 border border-sky-300 rounded-3xl flex items-center justify-center mx-auto text-[#0284c7] shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-mono uppercase text-[#0284c7] font-bold bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200">
                  SOLICITUD REGISTRADA CON ÉXITO
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  Protocolo de Diagnóstico Iniciado
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Hemos asignado tu solicitud al equipo técnico de Inteligencia Neuronal. Te contactaremos en menos de 4 horas hábiles.
                </p>
              </div>

              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 max-w-md mx-auto text-left font-mono text-xs space-y-2.5 shadow-inner">
                <div className="flex justify-between text-slate-600">
                  <span>Folio de Auditoría:</span>
                  <span className="text-[#0284c7] font-bold">{leadId || "IN-AUDIT-2026"}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Empresa:</span>
                  <span className="text-slate-900 font-bold">{formData.companyName}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Contacto:</span>
                  <span className="text-slate-900">{formData.fullName}</span>
                </div>
              </div>

              <Button variant="secondary" size="md" onClick={handleClose} className="mt-2">
                Cerrar y Volver a la Web
              </Button>
            </div>
          )}
        </div>

        {/* Footer controls */}
        {activeStep < 3 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/80">
            {activeStep > 1 ? (
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                onClick={prevStep}
              >
                Atrás
              </Button>
            ) : (
              <div />
            )}

            {activeStep === 1 ? (
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={nextStep}
              >
                Continuar a Contacto
              </Button>
            ) : (
              <Button
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                rightIcon={<ShieldCheck className="w-4 h-4" />}
                onClick={submitForm}
              >
                Confirmar y Agendar Diagnóstico
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
