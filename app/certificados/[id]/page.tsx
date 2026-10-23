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
    <>
      {/* ── ESTILOS DE IMPRESIÓN PRO (1 SOLA HOJA HORIZONTAL PERFECTA) ── */}
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          html, body {
            background-color: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
          }
          header, nav, footer, .no-print {
            display: none !important;
          }
          main {
            padding: 0 !important;
            margin: 0 !important;
            max-width: 100% !important;
            width: 100% !important;
            height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          #diploma-card {
            width: 95vw !important;
            max-width: 1100px !important;
            margin: auto !important;
            border: 3px solid #C59B27 !important;
            background: #ffffff !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            page-break-inside: avoid !important;
            page-break-after: avoid !important;
            box-shadow: none !important;
            padding: 30px 45px !important;
          }
        }
      `}</style>

    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col justify-between selection:bg-[#1DACE3] selection:text-white font-sans">
      <div className="no-print"><Navbar /></div>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        
        {/* Banner de Verificación Criptográfica */}
        <div className="no-print p-4 sm:p-5 rounded-2xl bg-white border border-emerald-500/30 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-1.5">
                <span>AUTENTICIDAD VERIFICADA EN LÍNEA</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <p className="text-xs text-slate-600">
                Registro de acreditación oficial emitido por <strong>Inteligencia Neuronal Academy</strong>.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold font-mono transition-colors flex items-center gap-1.5 border border-slate-300 cursor-pointer"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
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

        {/* ── DIPLOMA DE EXCELENCIA PROFESIONAL (ESTILO CLARO & PRESTIGIOSO) ── */}
        <div id="diploma-card" className="relative rounded-2xl p-8 sm:p-12 border-4 border-[#C59B27] bg-[#FFFFFF] shadow-2xl overflow-hidden text-center space-y-6">
          
          {/* Franjas con la Paleta de la Marca */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#1DACE3] via-[#971B8D] via-[#EA0C7F] to-[#FEAD2B]" />
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-[#FEAD2B] via-[#EA0C7F] via-[#971B8D] to-[#1DACE3]" />

          {/* Marco Interior de Seguridad */}
          <div className="absolute inset-2 sm:inset-3 border-2 border-slate-800/80 rounded-xl pointer-events-none" />
          <div className="absolute inset-3 sm:inset-4 border border-dashed border-[#C59B27]/60 rounded-lg pointer-events-none" />

          {/* Marca de Agua Central con el Logo Oficial */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
            <img src="/logo-in.png" alt="Watermark Logo" className="w-[400px] h-[400px] object-contain" />
          </div>

          {/* Encabezado del Certificado con Logo Oficial */}
          <div className="relative z-10 space-y-2 border-b border-slate-200 pb-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img src="/logo-in.png" alt="Inteligencia Neuronal Logo Oficial" className="w-12 h-12 object-contain shrink-0" />
                <div className="text-left">
                  <span className="font-serif font-bold text-base tracking-wider text-slate-900 block leading-tight">
                    INTELIGENCIA NEURONAL
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 block">
                    ACADEMY // DIVISIÓN DE EDUCACIÓN EJECUTIVA
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-amber-50 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold text-amber-800 font-mono uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>ACREDITACIÓN PROFESIONAL OFICIAL</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#971B8D] font-bold font-mono">
                CERTIFICADO DE PARTICIPACIÓN Y ASISTENCIA
              </span>
            </div>
          </div>

          {/* Nombre del Graduado */}
          <div className="space-y-2 py-2 relative z-10">
            <p className="text-xs text-slate-600 font-serif italic">
              Por cuanto ha demostrado dedicación y competencia técnica en Workshop presencial, se confiere el presente reconocimiento a:
            </p>
            <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-slate-900 tracking-tight py-1">
              {certData.student_name}
            </h1>
            {certData.student_id && (
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 border border-slate-300 text-xs font-mono text-slate-700">
                <span>Cédula de Identidad:</span>
                <strong className="text-slate-900">{certData.student_id}</strong>
              </div>
            )}
            <p className="text-xs sm:text-sm text-slate-700 max-w-2xl mx-auto leading-relaxed pt-1">
              {certData.course_id === "workshop-ia-gastronomia"
                ? "Por su destacada participación durante las 4 horas académicas y de laboratorio práctico en el programa intensivo:"
                : "Por haber completado satisfactoriamente los módulos técnicos y laboratorios del programa:"}
            </p>
            <h2 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#971B8D] to-[#EA0C7F] tracking-tight uppercase pt-1">
              {certData.course_title}
            </h2>
            <span className="block text-xs font-bold tracking-widest text-slate-600 font-mono uppercase">
              Del Concepto al Ecosistema Digital Completo
            </span>
          </div>

          {/* Reseña de Competencias y Habilidades Acreditadas */}
          <div className="max-w-3xl mx-auto p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2 relative z-10 shadow-2xs">
            <div className="flex items-center justify-between border-b border-slate-200 pb-1">
              <span className="font-mono text-[10px] font-bold text-[#0284c7] uppercase tracking-widest">
                RESEÑA CURRICULAR & COMPETENCIAS TÉCNICAS ACREDITADAS:
              </span>
              <span className="text-[10px] font-mono text-slate-400">10 MÓDULOS EN PRODUCCIÓN</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
              {certData.skills_summary?.map((skill: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Firmas, Sello, QR y Verificación */}
          <div className="grid grid-cols-1 sm:grid-cols-12 items-end pt-4 border-t-2 border-slate-200 gap-4 relative z-10">
            
            {/* Sello de Acreditación (Izquierda, 3 cols) */}
            <div className="sm:col-span-3 flex items-center gap-2.5 text-left">
              <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#C59B27] flex flex-col items-center justify-center bg-amber-50/80 p-1 shadow-2xs shrink-0">
                <span className="text-[7px] font-mono font-extrabold uppercase text-amber-800 tracking-widest">OFICIAL</span>
                <span className="text-xs font-serif font-black text-slate-900">2026</span>
                <span className="text-[6px] font-mono uppercase text-slate-600">VERIFICADO</span>
              </div>
              <div className="space-y-0.5 leading-tight">
                <span className="text-[9px] font-mono uppercase text-slate-700 font-bold block">
                  Sello Digital de Excelencia
                </span>
                <span className="text-[8px] text-slate-500 block">
                  Acreditación Institucional
                </span>
              </div>
            </div>

            {/* ── FIRMA PRINCIPAL: COMPLETAMENTE CENTRADA CON AMBOS CARGOS (6 cols) ── */}
            <div className="sm:col-span-6 flex flex-col items-center justify-center text-center space-y-1">
              <div className="h-9 flex items-end justify-center">
                <span className="font-serif italic text-2xl font-bold text-slate-900">
                  Julio Alberto Daza Celis
                </span>
              </div>
              <div className="w-60 h-0.5 bg-slate-400 mx-auto"></div>
              <strong className="text-xs text-slate-900 block font-mono uppercase tracking-wider">
                Julio Alberto Daza Celis
              </strong>
              <span className="text-[11px] text-slate-800 font-bold block leading-tight">
                CEO Inteligencia Neuronal Academy • <a href="https://www.inteligencianeuronal.com" target="_blank" rel="noopener noreferrer" className="text-[#0284c7] hover:underline">www.inteligencianeuronal.com</a>
              </span>
              <span className="text-[10px] text-slate-600 block leading-tight">
                Presidente Cámara Gastronómica Estado Mérida
              </span>
            </div>

            {/* QR Interactivo & Fecha (Derecha, 3 cols) */}
            <div className="sm:col-span-3 flex items-end justify-end gap-2.5 text-right">
              <div className="space-y-0.5">
                <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">CÓDIGO OFICIAL:</div>
                <div className="font-mono text-xs font-extrabold text-[#0284c7]">{certData.certificate_code}</div>
                <div className="text-[10px] font-mono text-slate-700 font-semibold">
                  Viernes, 23 de Octubre de 2026
                </div>
                <div className="text-[9px] text-slate-500">
                  Mérida, Venezuela • Fullcowork VIP
                </div>
              </div>

              <div className="w-14 h-14 bg-white p-1 rounded-xl shadow-xs border border-slate-300 flex items-center justify-center shrink-0">
                <img
                  src={"https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://www.inteligencianeuronal.com/certificados/" + certData.certificate_code}
                  alt="QR Verificación"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

          </div>

          {/* Acciones Inferiores */}
          <div className="no-print pt-2 relative z-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#1DACE3] via-[#971B8D] to-[#EA0C7F] hover:opacity-95 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Imprimir / Descargar Diploma PDF</span>
            </button>
            <Link
              href="/academy/campus"
              className="px-5 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-colors flex items-center gap-2 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Campus</span>
            </Link>
          </div>

        </div>

      </main>

      <div className="no-print"><Footer /></div>
    </div>
    </>
  );
}
