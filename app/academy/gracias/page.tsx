"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  PlayCircle,
  DownloadCloud,
  ShieldCheck,
  GraduationCap,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

function GraciasContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const course = searchParams.get("course") || "Masterclass: Inteligencia Artificial para Restaurantes & Food Cost";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between selection:bg-[#EA0C7F] selection:text-white">
      <Navbar />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center space-y-12">
        {/* Header Hero */}
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold tracking-wider uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Matrícula Validada con Éxito</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            ¡Bienvenido(a) a{" "}
            <span className="bg-gradient-to-r from-[#1DACE3] via-[#971B8D] to-[#EA0C7F] bg-clip-text text-transparent">
              Inteligencia Neuronal Academy
            </span>
            !
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Tu inscripción al programa <strong>{course}</strong> ha sido confirmada. Ya tienes acceso inmediato a todas las lecciones, grabaciones y recursos descargables.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left animate-in fade-in slide-in-from-bottom-6 duration-500">
          {/* Card 1: Ingresar al Campus */}
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-[#971B8D]/60 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#971B8D] to-[#EA0C7F]" />
            
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#971B8D]/20 border border-[#971B8D]/40 flex items-center justify-center text-[#EA0C7F]">
                <PlayCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Campus Virtual Nativo</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Ingresa directamente a tu aula virtual con tu correo registrado para ver las clases, prompts de ChatGPT y descargar los flujos de n8n.
              </p>
            </div>

            <Link
              href={`/academy/campus${email ? `?email=${encodeURIComponent(email)}` : ""}`}
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#971B8D] to-[#EA0C7F] text-white text-xs font-bold shadow-lg shadow-[#EA0C7F]/30 hover:opacity-95 transition-all"
            >
              <span>Ingresar al Campus Virtual</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: WhatsApp VIP */}
          <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/60 transition-all flex flex-col justify-between space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 to-[#1DACE3]" />
            
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-white">Comunidad VIP de Alumnos</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Conéctate al grupo privado de WhatsApp con Julio Daza y otros directores para resolver dudas técnicas y recibir asesoría directa.
              </p>
            </div>

            <a
              href="https://wa.me/584148817137?text=Hola%20Julio,%20ya%20me%20inscribí%20en%20el%20curso%20y%20quiero%20unirme%20al%20grupo%20VIP."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-500/30 transition-all"
            >
              <span>Unirme al Grupo VIP (WhatsApp)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* 3 Step Roadmap */}
        <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800/80 text-left space-y-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FEAD2B]" />
            <span>Guía Rápida para Iniciar tu Formación:</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-[#1DACE3]">PASO 01</span>
              <h4 className="font-bold text-white">Entra al Campus</h4>
              <p className="text-slate-400">Accede con tu correo y mira el Módulo 01 de introducción.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-[#EA0C7F]">PASO 02</span>
              <h4 className="font-bold text-white">Descarga los Blueprints</h4>
              <p className="text-slate-400">Copia los prompts y las plantillas de escandallo operativo.</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-[#86C537]">PASO 03</span>
              <h4 className="font-bold text-white">Implementa en tu Negocio</h4>
              <p className="text-slate-400">Consulta cualquier duda en el grupo de WhatsApp con Julio.</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function GraciasPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Cargando confirmación...</div>}>
      <GraciasContent />
    </Suspense>
  );
}
