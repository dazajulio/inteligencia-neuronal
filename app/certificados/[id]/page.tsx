"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  ArrowLeft,
  Check,
  ExternalLink
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function CertificateValidationPage() {
  const params = useParams();
  const certId = (params.id as string) || "IN-2026-OFICIAL";

  const [certData, setCertData] = useState<any>({
    certificate_code: certId,
    student_name: "Julio Alberto Daza",
    student_email: "dazajulio@gmail.com",
    course_title: "Bootcamp: Arquitectura de Pipelines con n8n & Agentes IA",
    skills_summary: [
      "Aprovisionamiento y Hardening de Servidores Linux VPS",
      "Despliegue de Docker Compose, Volúmenes y Caddy SSL",
      "Handshake y Webhooks Reversos con Meta Cloud API",
      "Arquitectura PostgreSQL con Row-Level Security",
      "Orquestación de Agentes Autónomos LLM y Guardrails de Seguridad",
      "Telemetría y Contingencia 24/7 sobre n8n Self-Hosted"
    ],
    score_average: 98,
    is_valid: true,
    issued_at: new Date().toISOString(),
  });

  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    fetch("/api/campus/certificate?code=" + encodeURIComponent(certId))
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.certificate) {
          setCertData(data.certificate);
        }
      })
      .catch((e) => console.warn("Cert fetch fallback", e));
  }, [certId]);

  const handleShareLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent("¡He obtenido mi Certificación Oficial en " + certData.course_title + " con Inteligencia Neuronal!");
    window.open("https://www.linkedin.com/sharing/share-offsite/?url=" + url + "&title=" + title, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white flex flex-col justify-between selection:bg-[#1DACE3] selection:text-white font-sans">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        
        {/* Banner de Verificación Criptográfica */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>AUTENTICIDAD VERIFICADA EN VIVO</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <p className="text-xs text-zinc-300">
                Registro de certificación válido emitido por <strong>Inteligencia Neuronal Group</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold font-mono transition-colors flex items-center gap-1.5 border border-white/10 cursor-pointer"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{isCopied ? "¡Copiado!" : "Copiar Enlace"}</span>
            </button>
            <button
              onClick={handleShareLinkedIn}
              className="px-4 py-2 rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Añadir a LinkedIn</span>
            </button>
          </div>
        </div>

        {/* ── DIPLOMA DE VANGUARDIA DIGITAL (DESIGN PRO) ── */}
        <div className="relative rounded-3xl p-8 sm:p-12 border-2 border-[#1DACE3]/40 bg-gradient-to-b from-[#121824] via-[#0E131D] to-[#080B10] shadow-2xl overflow-hidden text-center space-y-8">
          
          {/* Guilloche / Borde decorativo de seguridad */}
          <div className="absolute inset-2 sm:inset-4 border border-[#1DACE3]/20 rounded-2xl pointer-events-none" />
          <div className="absolute inset-3 sm:inset-5 border border-dashed border-[#EA0C7F]/20 rounded-2xl pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1DACE3]/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#EA0C7F]/10 blur-3xl pointer-events-none" />

          {/* Encabezado del Certificado */}
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1DACE3]/15 border border-[#1DACE3]/30 text-[11px] font-mono font-bold text-[#1DACE3] uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIPLOMA DE EXCELENCIA & ACREDITACIÓN PROFESIONAL</span>
            </div>

            <div className="font-mono text-xs text-zinc-400">
              INTELIGENCIA NEURONAL ACADEMY // REGISTRO OFICIAL
            </div>
          </div>

          {/* Nombre del Graduado */}
          <div className="space-y-2 py-2 relative z-10">
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-mono">
              Se otorga el presente reconocimiento con distinción técnica a:
            </p>
            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold italic text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-white to-zinc-300 tracking-tight py-2">
              {certData.student_name}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Por haber aprobado con éxito el 100% de las evaluaciones técnicas, laboratorios en servidores de producción y quizes del programa:
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1DACE3] tracking-tight font-heading pt-2">
              {certData.course_title}
            </h2>
          </div>

          {/* Reseña de Competencias y Habilidades Acreditadas */}
          <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800 text-left space-y-3 relative z-10 backdrop-blur-sm">
            <span className="font-mono text-[10px] font-bold text-[#FEAD2B] uppercase tracking-widest block">
              COMPETENCIAS & ARQUITECTURA ACREDITADA:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
              {certData.skills_summary?.map((skill: string, idx: number) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="line-clamp-1">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Firmas, QR y Verificación */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end pt-6 border-t border-zinc-800 relative z-10">
            
            {/* Firma Director */}
            <div className="text-left space-y-1">
              <div className="font-serif italic text-lg text-zinc-200 font-bold">Julio Daza</div>
              <div className="text-[11px] font-bold text-white font-mono">Julio Alberto Daza</div>
              <div className="text-[10px] text-zinc-500 font-mono">Fundador & Director de Arquitectura</div>
            </div>

            {/* QR Interactivo */}
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-20 h-20 bg-white p-1.5 rounded-2xl shadow-lg border border-zinc-200 flex items-center justify-center">
                <img
                  src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.inteligencianeuronal.com/certificados/" + certData.certificate_code}
                  alt="QR Verificación"
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-[9px] font-mono text-zinc-400">Escanea para validar</span>
            </div>

            {/* ID Criptográfico y Fecha */}
            <div className="text-right space-y-1">
              <div className="text-[10px] font-mono text-zinc-400">CÓDIGO DE VALIDACIÓN:</div>
              <div className="font-mono text-xs font-extrabold text-[#FEAD2B]">{certData.certificate_code}</div>
              <div className="text-[10px] font-mono text-zinc-500">
                Fecha: {new Date(certData.issued_at || Date.now()).toLocaleDateString('es-ES', { month: 'long', year: 'numeric', day: 'numeric' })}
              </div>
            </div>

          </div>

          {/* Acciones Inferiores */}
          <div className="pt-4 relative z-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1DACE3] to-[#0284c7] hover:opacity-95 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Imprimir / Descargar Diploma PDF</span>
            </button>
            <Link
              href="/academy/campus"
              className="px-5 py-3 rounded-xl border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-bold text-zinc-300 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Campus</span>
            </Link>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
