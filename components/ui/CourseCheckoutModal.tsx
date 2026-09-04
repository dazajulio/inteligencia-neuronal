"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  CreditCard,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Lock,
  Copy,
  Check,
  Sparkles,
  Loader2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { useCheckoutStore } from "@/store/useCheckoutStore";

export function CourseCheckoutModal() {
  const {
    isCheckoutOpen,
    closeCheckout,
    selectedCourse,
    paymentMethod,
    setPaymentMethod,
    step,
    fullName,
    email,
    phone,
    referenceNumber,
    setFormField,
    submitRegistration,
    isSubmitting,
    errorMessage,
  } = useCheckoutStore();

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [paymentSettings, setPaymentSettings] = useState<{
    pagoMovil: {
      banco: string;
      bancoCodigo: string;
      cedulaRif: string;
      telefono: string;
      whatsapp: string;
      tasaInfo: string;
    };
  }>({
    pagoMovil: {
      banco: "Banesco",
      bancoCodigo: "0134",
      cedulaRif: "V-12.345.678",
      telefono: "0414-881-7137",
      whatsapp: "584148817137",
      tasaInfo: "Calculado a Tasa Oficial BCV del día",
    },
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.settings?.pagoMovil) {
          setPaymentSettings(data.settings);
        }
      })
      .catch((e) => console.warn("[Settings fetch fallback]", e));
  }, [isCheckoutOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isCheckoutOpen) {
        closeCheckout();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCheckoutOpen, closeCheckout]);

  if (!isCheckoutOpen || !selectedCourse) return null;

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleWhatsAppReport = () => {
    const cleanWhatsApp = (paymentSettings.pagoMovil.whatsapp || "584148817137").replace(/\D/g, "");
    const message = `👋 Hola, acabo de realizar el Pago Móvil para inscribirme al curso *${selectedCourse.title}* (${selectedCourse.price}).\n\n*Datos del Alumno:*\n• Nombre: ${fullName}\n• Correo: ${email}\n• Teléfono: ${phone}\n• Nro. de Referencia: ${referenceNumber || "Adjunto comprobante"}\n\nQuedo atento a la confirmación y acceso al campus.`;
    const whatsappUrl = `https://wa.me/${cleanWhatsApp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeCheckout}
    >
      <div
        className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-700 font-bold">
              Inscripción // Inteligencia Neuronal Academy
            </span>
          </div>

          <button
            onClick={closeCheckout}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Selected Course Summary Header */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-sm flex items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 text-cyan-300 border border-cyan-400/20">
                {selectedCourse.badge || "PROGRAMA OFICIAL"}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                {selectedCourse.title}
              </h3>
              <p className="text-xs text-slate-300 line-clamp-1">
                Acceso de por vida • Actualizaciones • Certificado
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xl sm:text-2xl font-black font-mono text-cyan-300">
                {selectedCourse.price}
              </div>
              <span className="text-[10px] font-mono text-slate-400">Pago único</span>
            </div>
          </div>

          {step === "form" ? (
            <div className="space-y-6">
              {/* Form Fields */}
              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1.5">
                    Nombre Completo del Alumno *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFormField("fullName", e.target.value)}
                    placeholder="Ej: Julio Daza"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1.5">
                      Correo de Acceso *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setFormField("email", e.target.value)}
                      placeholder="tu@empresa.com"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1.5">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setFormField("phone", e.target.value)}
                      placeholder="+58 414 1234567"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-600 focus:outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3 text-left">
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase">
                  Selecciona la Vía de Pago:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Option 1: Lemon Squeezy */}
                  <div
                    onClick={() => setPaymentMethod("lemon")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                      paymentMethod === "lemon"
                        ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-bold text-slate-900">Internacional (USD)</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "lemon" ? "border-indigo-600 bg-indigo-600" : "border-slate-300"}`}>
                        {paymentMethod === "lemon" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Tarjeta de Crédito/Débito, Apple Pay, PayPal vía Lemon Squeezy.
                    </p>
                  </div>

                  {/* Option 2: Pago Móvil */}
                  <div
                    onClick={() => setPaymentMethod("pagomovil")}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-2 ${
                      paymentMethod === "pagomovil"
                        ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-600/20 shadow-sm"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-emerald-600" />
                        <span className="text-xs font-bold text-slate-900">Pago Móvil (Bs.)</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === "pagomovil" ? "border-indigo-600 bg-indigo-600" : "border-slate-300"}`}>
                        {paymentMethod === "pagomovil" && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Transferencia bancaria o Pago Móvil en Venezuela a Tasa Oficial BCV.
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium text-left">
                  {errorMessage}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={submitRegistration}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284c7] via-[#6366f1] to-[#d946ef] hover:from-[#0369a1] hover:via-[#4f46e5] hover:to-[#c026d3] text-white text-sm font-bold shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Procesando inscripción...</span>
                    </>
                  ) : paymentMethod === "lemon" ? (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Continuar al Pago Seguro (Lemon Squeezy)</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <Smartphone className="w-4 h-4" />
                      <span>Ver Coordenadas de Pago Móvil</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-mono mt-3">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Garantía de satisfacción 7 días
                  </span>
                  <span>•</span>
                  <span>🔒 Conexión Cifrada SSL 256-bit</span>
                </div>
              </div>
            </div>
          ) : (
            /* ── PAGO MÓVIL INSTRUCTIONS STEP ── */
            <div className="space-y-6 text-left animate-in fade-in slide-in-from-right-4 duration-200">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-bold border border-emerald-200">
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>COORDENADAS DE PAGO MÓVIL (VENEZUELA)</span>
                </div>
                <p className="text-xs text-slate-600">
                  Realiza el pago móvil calculando el monto en Bolívares a la <strong>Tasa Oficial BCV del día</strong>.
                </p>
              </div>

              {/* Data Card with Copy Buttons */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-sans">Banco:</span>
                  <span className="font-bold text-slate-900">
                    {paymentSettings.pagoMovil.banco}{" "}
                    {paymentSettings.pagoMovil.bancoCodigo ? `(${paymentSettings.pagoMovil.bancoCodigo})` : ""}
                  </span>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-sans">Cédula / RIF:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{paymentSettings.pagoMovil.cedulaRif}</span>
                    <button
                      onClick={() => copyToClipboard(paymentSettings.pagoMovil.cedulaRif.replace(/\D/g, ""), "ci")}
                      className="text-indigo-600 hover:text-indigo-800 p-1 hover:bg-slate-200 rounded"
                    >
                      {copiedField === "ci" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-500 font-sans">Teléfono:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{paymentSettings.pagoMovil.telefono}</span>
                    <button
                      onClick={() => copyToClipboard(paymentSettings.pagoMovil.telefono.replace(/\D/g, ""), "phone")}
                      className="text-indigo-600 hover:text-indigo-800 p-1 hover:bg-slate-200 rounded"
                    >
                      {copiedField === "phone" ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1.5">
                  <span className="text-slate-500 font-sans">Tasa / Monto:</span>
                  <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {selectedCourse.price} ({paymentSettings.pagoMovil.tasaInfo || "al cambio BCV"})
                  </span>
                </div>
              </div>

              {/* Reference Input */}
              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase mb-1.5 flex items-center justify-between">
                  <span>Número de Referencia de Pago Móvil *</span>
                  <span className="text-[10px] text-indigo-600 font-sans font-medium">Validación instantánea</span>
                </label>
                <input
                  type="text"
                  required
                  value={referenceNumber}
                  onChange={(e) => setFormField("referenceNumber", e.target.value)}
                  placeholder="Ej: 849201 ó últimos 6 dígitos"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-600 focus:outline-none transition-all font-mono"
                />
              </div>

              {/* Automated Registration Banner */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 flex items-start gap-2.5 text-xs text-indigo-950">
                <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-bold block">Acceso Inmediato y Automatizado:</span>
                  <p className="text-[11px] text-indigo-800 leading-relaxed">
                    Al confirmar, tu matrícula quedará <strong>ACTIVA</strong> de inmediato. Serás redirigido al Campus Virtual y recibirás tus credenciales en <strong>{email}</strong>.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={useCheckoutStore.getState().confirmPagoMovil}
                  className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#1DACE3] via-[#971B8D] to-[#EA0C7F] hover:opacity-95 text-white text-sm font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Validando y activando Campus...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                      <span>Confirmar Pago & Acceder al Campus</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => useCheckoutStore.setState({ step: "form" })}
                  className="w-full py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Modificar datos o vía de pago</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
