"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowDown,
  ShieldCheck,
  Activity,
  Cpu,
  Sparkles,
} from "lucide-react";
import { useLeadStore } from "@/store/useLeadStore";

interface TelemetryNode {
  id: string;
  code: string;
  title: string;
  metric: string;
  subMetric: string;
  accentHex: string;
  sliceRange: [number, number];
}

interface WaveSlice {
  index: number;
  faceGradient: string;
  sideColor: string;
  topBorderColor: string;
  glowColor: string;
  baseRotateX: number;
  baseRotateY: number;
  baseRotateZ: number;
  baseTranslateY: number;
  baseTranslateZ: number;
  label?: string;
}

// Paleta Oficial de Inteligencia Neuronal aplicada en progresión cromática escultórica 3D (Inspiración TIDY)
const BRAND_SLICE_PALETTE = [
  {
    face: "linear-gradient(165deg, #334155 0%, #1e293b 65%, #0f172a 100%)",
    side: "#0f172a",
    top: "rgba(255,255,255,0.35)",
    glow: "rgba(30,41,59,0.22)",
  },
  {
    face: "linear-gradient(165deg, #38bdf8 0%, #1DACE3 55%, #0284c7 100%)",
    side: "#0369a1",
    top: "rgba(255,255,255,0.65)",
    glow: "rgba(29,172,227,0.32)",
  },
  {
    face: "linear-gradient(165deg, #60a5fa 0%, #3b82f6 55%, #1d4ed8 100%)",
    side: "#1e40af",
    top: "rgba(255,255,255,0.55)",
    glow: "rgba(59,130,246,0.28)",
  },
  {
    face: "linear-gradient(165deg, #a855f7 0%, #971B8D 55%, #6b1164 100%)",
    side: "#581c87",
    top: "rgba(255,255,255,0.55)",
    glow: "rgba(151,27,141,0.32)",
  },
  {
    face: "linear-gradient(165deg, #f43f5e 0%, #EA0C7F 55%, #be185d 100%)",
    side: "#9d174d",
    top: "rgba(255,255,255,0.65)",
    glow: "rgba(234,12,127,0.35)",
  },
  {
    face: "linear-gradient(165deg, #fb7185 0%, #e11d48 55%, #9f1239 100%)",
    side: "#881337",
    top: "rgba(255,255,255,0.55)",
    glow: "rgba(225,29,72,0.28)",
  },
  {
    face: "linear-gradient(165deg, #fcd34d 0%, #FEAD2B 55%, #d97706 100%)",
    side: "#b45309",
    top: "rgba(255,255,255,0.75)",
    glow: "rgba(254,173,43,0.32)",
  },
  {
    face: "linear-gradient(165deg, #a3e635 0%, #86C537 55%, #4d7c0f 100%)",
    side: "#3f6212",
    top: "rgba(255,255,255,0.65)",
    glow: "rgba(134,197,55,0.28)",
  },
];

const TOTAL_SLICES = 28;

const WAVE_SLICES: WaveSlice[] = Array.from({ length: TOTAL_SLICES }, (_, i) => {
  const progress = i / (TOTAL_SLICES - 1);
  // Torsión helicoidal inspirada en la onda 3D central de TIDY
  const wavePhase = progress * Math.PI * 2.35;
  const centerPeak = Math.exp(-Math.pow((progress - 0.48) * 4.2, 2));

  const baseRotateZ =
    Math.sin(wavePhase) * 32 + (progress > 0.42 && progress < 0.56 ? -22 : 0);
  const baseRotateX = Math.cos(wavePhase * 0.85) * 24 + centerPeak * 18;
  const baseRotateY = -28 + Math.sin(wavePhase) * 18;
  const baseTranslateY =
    Math.sin(wavePhase) * -22 - centerPeak * 28;
  const baseTranslateZ = Math.cos(wavePhase) * 26 + centerPeak * 34;

  // Selección armónica de la paleta de marca
  const paletteIdx = Math.floor(
    ((i + Math.floor(Math.sin(i * 0.6) * 2 + 2)) % BRAND_SLICE_PALETTE.length)
  );
  const swatch = BRAND_SLICE_PALETTE[paletteIdx];

  const microLabels: Record<number, string> = {
    3: "BoH_101",
    9: "28.2%",
    13: "AI_CORE",
    17: "BoH_103",
    22: "81.5%",
    25: "RLS_OK",
  };

  return {
    index: i,
    faceGradient: swatch.face,
    sideColor: swatch.side,
    topBorderColor: swatch.top,
    glowColor: swatch.glow,
    baseRotateX,
    baseRotateY,
    baseRotateZ,
    baseTranslateY,
    baseTranslateZ,
    label: microLabels[i],
  };
});

// Coordenadas técnicas flotantes en el lienzo (Estilo micro-índices de TIDY)
const FLOATING_COORDINATES = [
  { text: "01", top: "14%", left: "8%" },
  { text: "28.2%", top: "10%", left: "24%" },
  { text: "BoH_101", top: "20%", left: "34%" },
  { text: "KDS_RT", top: "8%", left: "49%" },
  { text: "16.5%", top: "16%", left: "66%" },
  { text: "PO_AUTO", top: "12%", left: "83%" },
  { text: "04", top: "22%", left: "92%" },
  { text: "SYS_OK", bottom: "18%", left: "6%" },
  { text: "4.2%", bottom: "12%", left: "19%" },
  { text: "26.4%", bottom: "16%", left: "39%" },
  { text: "RAG_V2", bottom: "8%", left: "55%" },
  { text: "81.5%", bottom: "14%", left: "74%" },
  { text: "NDA_RLS", bottom: "18%", left: "89%" },
];

export function HeroSection() {
  const { openModal } = useLeadStore();
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [activeNode, setActiveNode] = useState<string | null>(null);

  // Los 4 nodos gastronómicos reales conectados a la arquitectura central
  const telemetryNodes: TelemetryNode[] = [
    {
      id: "steak",
      code: "BoH_101",
      title: "Corte Steak Prime",
      metric: "Food Cost: 28.2%",
      subMetric: "Rendimiento: 88.8%",
      accentHex: "#1DACE3",
      sliceRange: [2, 7],
    },
    {
      id: "vegetables",
      code: "BoH_102",
      title: "Vegetales Glaseados",
      metric: "Food Cost: 16.5%",
      subMetric: "Merma Cocción: 4.2%",
      accentHex: "#971B8D",
      sliceRange: [8, 13],
    },
    {
      id: "seafood",
      code: "BoH_103",
      title: "Camarones & Mariscos",
      metric: "Food Cost: 26.4%",
      subMetric: "PO Auto a Proveedor",
      accentHex: "#EA0C7F",
      sliceRange: [14, 20],
    },
    {
      id: "dessert",
      code: "BoH_104",
      title: "Tarta Artesanal",
      metric: "Margen Bruto: 81.5%",
      subMetric: "Alérgenos Auditados OK",
      accentHex: "#86C537",
      sliceRange: [21, 26],
    },
  ];

  const isSliceHighlightedByNode = (sliceIdx: number) => {
    if (!activeNode) return false;
    const found = telemetryNodes.find((n) => n.id === activeNode);
    if (!found) return false;
    return sliceIdx >= found.sliceRange[0] && sliceIdx <= found.sliceRange[1];
  };

  return (
    <section className="relative w-full min-h-screen bg-[#F4F5F7] text-zinc-900 overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 select-none border-b border-zinc-200/90">
      {/* ── ILUMINACIÓN AMBIENTAL ARQUITECTÓNICA Y GRILLA SUTIL ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Textura de puntos técnicos imperceptible */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(15, 23, 42, 0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Halo volumétrico inferior en la paleta de Inteligencia Neuronal (Inspiración TIDY + Argus) */}
        <div className="absolute -bottom-28 left-1/2 -translate-x-1/2 w-[780px] h-[260px] bg-gradient-to-r from-[#1DACE3]/20 via-[#971B8D]/25 to-[#EA0C7F]/20 blur-[95px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[920px] h-[220px] bg-gradient-to-r from-[#1DACE3]/10 via-[#EA0C7F]/12 to-[#FEAD2B]/12 blur-[80px] rounded-full" />

        {/* Líneas arquitectónicas verticales de precisión */}
        <div className="max-w-7xl mx-auto h-full border-x border-zinc-200/60 relative">
          <div className="hidden lg:block absolute inset-y-0 left-7/12 w-[1px] bg-zinc-200/40" />
        </div>
      </div>

      {/* ── 1. FILA SUPERIOR: CABECERA EDITORIAL DIVIDIDA (ESTILO SWISS / TIDY) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-2 sm:pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Columna Izquierda (7 Cols): Índice Técnico + H1 + Indicador de Versión */}
          <div className="lg:col-span-7 space-y-4">
            {/* Índice numérico técnico estilo TIDY (001 — 004) */}
            <div className="flex items-center gap-3 text-[11px] font-mono font-bold tracking-[0.16em] text-zinc-500 uppercase">
              <span className="text-zinc-900">001 — 004</span>
              <span className="w-6 h-[1px] bg-zinc-400" />
              <span>SOLUCIONES FOODTECH &amp; IA OPERATIVA</span>
            </div>

            {/* H1 Principal con tipografía geométrica ejecutiva */}
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.65rem] xl:text-[2.95rem] font-bold tracking-[-0.03em] text-zinc-950 leading-[1.08]">
              Arquitectura Tecnológica y Automatización para la Industria
              Gastronómica.
            </h1>

            {/* Micro-status en vivo (equivalente a • V 1.4 NOW AVAILABLE en TIDY) */}
            <div className="pt-1 inline-flex items-center gap-2.5 text-[11px] font-mono font-bold tracking-[0.12em] uppercase text-zinc-700">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#86C537] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#86C537]" />
              </span>
              <span>SISTEMAS AGÉNTICOS EN PRODUCCIÓN</span>
              <span className="text-zinc-300">//</span>
              <span className="text-[#0284c7]">GLUBBI &amp; N8N PIPELINES</span>
            </div>
          </div>

          {/* Columna Derecha (5 Cols): Párrafo Ejecutivo + Garantías de Confianza */}
          <div className="lg:col-span-5 lg:pt-7 space-y-5 flex flex-col justify-between">
            <h2 className="text-sm sm:text-base lg:text-[15.5px] text-zinc-600 font-normal leading-[1.65]">
              Desarrollamos software inteligente a la medida, implementamos
              agentes de IA y capacitamos a tu equipo operativo para blindar
              márgenes y escalar tu negocio.
            </h2>

            {/* Píldoras técnicas de respaldo corporativo */}
            <div className="pt-3 border-t border-zinc-200/90 flex flex-wrap items-center gap-2.5 text-[11px] font-mono text-zinc-700">
              <span className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-md border border-zinc-200/90 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1DACE3]" />
                <span>NDA Confidencial</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-md border border-zinc-200/90 shadow-2xs">
                <Activity className="w-3.5 h-3.5 text-[#86C537]" />
                <span>Monitoreo 24/7</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/85 backdrop-blur-sm px-2.5 py-1 rounded-md border border-zinc-200/90 shadow-2xs">
                <Cpu className="w-3.5 h-3.5 text-[#971B8D]" />
                <span>Zero-Training Policy</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. CENTRO ESCULTÓRICO: ONDA MODULAR 3D + TELEMETRÍA OPERATIVA ── */}
      <div className="relative z-10 w-full my-4 sm:my-6 py-6 sm:py-10 flex flex-col items-center justify-center">
        {/* Micro-coordenadas flotantes distribuidas en el espacio (Estilo TIDY) */}
        <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none hidden md:block">
          {FLOATING_COORDINATES.map((coord, idx) => (
            <span
              key={idx}
              style={{
                top: coord.top,
                bottom: coord.bottom,
                left: coord.left,
              }}
              className="absolute font-mono text-[9px] tracking-[0.14em] text-zinc-400/90 font-semibold uppercase"
            >
              {coord.text}
            </span>
          ))}
        </div>

        {/* Escenario de Perspectiva 3D para la Onda Cinética */}
        <div
          className="relative w-full max-w-7xl mx-auto px-2 sm:px-6 flex items-center justify-center h-[210px] sm:h-[260px] lg:h-[290px]"
          style={{ perspective: "1400px" }}
        >
          {/* Sombra proyectada en el suelo arquitectónico */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-[82%] h-9 bg-gradient-to-r from-[#1DACE3]/20 via-[#971B8D]/30 to-[#EA0C7F]/20 blur-2xl rounded-full pointer-events-none" />

          {/* Hilera Helicoidal de 28 Bloques 3D */}
          <div
            className="relative flex items-center justify-center gap-1 sm:gap-1.5 lg:gap-2 w-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            {WAVE_SLICES.map((slice) => {
              const distanceFromHover =
                hoveredSlice !== null ? Math.abs(hoveredSlice - slice.index) : 99;
              const isDirectHover = hoveredSlice === slice.index;
              const isNearHover = distanceFromHover > 0 && distanceFromHover <= 3;
              const isNodeActive = isSliceHighlightedByNode(slice.index);

              const extraLift = isDirectHover
                ? -26
                : isNearHover
                ? -14 / distanceFromHover
                : isNodeActive
                ? -18
                : 0;

              const extraRotateZ = isDirectHover
                ? 8
                : isNearHover
                ? 4
                : isNodeActive
                ? 5
                : 0;

              return (
                <motion.div
                  key={slice.index}
                  onMouseEnter={() => setHoveredSlice(slice.index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  animate={{
                    y: [
                      slice.baseTranslateY + extraLift,
                      slice.baseTranslateY - 9 + extraLift,
                      slice.baseTranslateY + extraLift,
                    ],
                    rotateZ: [
                      slice.baseRotateZ + extraRotateZ,
                      slice.baseRotateZ + 4 + extraRotateZ,
                      slice.baseRotateZ + extraRotateZ,
                    ],
                    rotateX: [
                      slice.baseRotateX,
                      slice.baseRotateX + 5,
                      slice.baseRotateX,
                    ],
                    rotateY: slice.baseRotateY,
                    scale: isDirectHover || isNodeActive ? 1.09 : 1,
                  }}
                  transition={{
                    y: {
                      duration: 4.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: slice.index * 0.08,
                    },
                    rotateZ: {
                      duration: 5.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: slice.index * 0.07,
                    },
                    rotateX: {
                      duration: 4.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: slice.index * 0.06,
                    },
                    scale: { duration: 0.25 },
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className={`relative cursor-pointer shrink-0 w-3 sm:w-5 md:w-6 lg:w-7 xl:w-8 h-28 sm:h-36 md:h-44 lg:h-48 rounded-xl sm:rounded-2xl transition-shadow duration-300 ${
                    slice.index > 19 ? "hidden sm:block" : ""
                  } ${slice.index > 23 ? "sm:hidden lg:block" : ""}`}
                >
                  {/* Cara Frontal Biselada del Bloque 3D */}
                  <div
                    style={{
                      background: slice.faceGradient,
                      borderTop: `1.5px solid ${slice.topBorderColor}`,
                      borderLeft: "1px solid rgba(255,255,255,0.28)",
                      boxShadow:
                        isDirectHover || isNodeActive
                          ? `0 24px 38px -8px ${slice.glowColor}, inset 0 2px 6px rgba(255,255,255,0.45)`
                          : `0 16px 26px -10px rgba(15,23,42,0.38), inset 0 1px 3px rgba(255,255,255,0.3)`,
                    }}
                    className="w-full h-full rounded-xl sm:rounded-2xl relative overflow-hidden flex flex-col justify-between p-1.5"
                  >
                    {/* Brillo especular superior */}
                    <div className="w-full h-1/3 bg-gradient-to-b from-white/25 to-transparent rounded-t-xl pointer-events-none" />

                    {/* Micro-código grabado en el bloque */}
                    {slice.label && (
                      <span className="hidden lg:block font-mono text-[7px] tracking-tighter text-white/85 font-bold -rotate-90 origin-center whitespace-nowrap mb-3">
                        {slice.label}
                      </span>
                    )}

                    {/* Indicador luminoso inferior en el bloque */}
                    <div className="w-1 h-1 rounded-full bg-white/60 mx-auto" />
                  </div>

                  {/* Canto Lateral 3D (Grosor físico del bloque) */}
                  <div
                    style={{
                      backgroundColor: slice.sideColor,
                      transform: "translateX(4px) translateY(3px) translateZ(-6px)",
                    }}
                    className="absolute inset-0 rounded-xl sm:rounded-2xl -z-10 opacity-90"
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── 4 TARJETAS DE TELEMETRÍA GASTRONÓMICA CONECTADAS A LA ONDA ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-2 sm:mt-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
            {telemetryNodes.map((node) => {
              const isActive = activeNode === node.id;
              return (
                <div
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={`group relative rounded-2xl p-3 sm:p-3.5 transition-all duration-300 cursor-pointer border backdrop-blur-md ${
                    isActive
                      ? "bg-zinc-950 text-white border-zinc-800 shadow-xl -translate-y-1"
                      : "bg-white/80 hover:bg-white text-zinc-900 border-zinc-200/90 shadow-[0_2px_12px_rgba(15,23,42,0.03)]"
                  }`}
                >
                  {/* Línea conectora superior hacia la onda 3D */}
                  <div
                    style={{ backgroundColor: node.accentHex }}
                    className={`w-6 h-[2px] rounded-full mb-2 transition-all duration-300 ${
                      isActive ? "w-10" : "opacity-80"
                    }`}
                  />

                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span
                      style={{ color: isActive ? "#ffffff" : node.accentHex }}
                      className="font-bold tracking-wider uppercase"
                    >
                      {node.code} // SET
                    </span>
                    <span
                      style={{ backgroundColor: node.accentHex }}
                      className="w-1.5 h-1.5 rounded-full"
                    />
                  </div>

                  <div
                    className={`text-xs sm:text-sm font-bold tracking-tight mt-0.5 ${
                      isActive ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {node.title}
                  </div>

                  <div
                    className={`flex flex-wrap items-center justify-between gap-1 pt-2 mt-2 border-t text-[10px] font-mono ${
                      isActive
                        ? "border-white/15 text-zinc-300"
                        : "border-zinc-200/70 text-zinc-500"
                    }`}
                  >
                    <span
                      className={`font-bold ${
                        isActive ? "text-[#86C537]" : "text-zinc-800"
                      }`}
                    >
                      {node.metric}
                    </span>
                    <span>{node.subMetric}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── 3. BARRA INFERIOR DE CONVERSIÓN (ESTILO TIDY + ARGUS) ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-4 border-t border-zinc-200/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6">
          {/* Izquierda: Indicador de Scroll (↓ DESCUBRIR MÁS) */}
          <div className="lg:col-span-3 flex items-center justify-center lg:justify-start">
            <a
              href="#soluciones"
              className="group inline-flex items-center gap-2.5 text-[11px] font-mono font-bold tracking-[0.14em] uppercase text-zinc-500 hover:text-zinc-950 transition-colors"
            >
              <span className="w-7 h-7 rounded-full border border-zinc-300/90 bg-white/80 flex items-center justify-center group-hover:border-zinc-900 group-hover:translate-y-0.5 transition-all">
                <ArrowDown className="w-3.5 h-3.5 text-zinc-800" />
              </span>
              <span>DESCUBRIR SOLUCIONES</span>
            </a>
          </div>

          {/* Centro: Pregunta Ejecutiva + Botones Píldora (Inspiración TIDY & Argus) */}
          <div className="lg:col-span-6 flex flex-col items-center text-center space-y-3.5">
            <p className="text-xs sm:text-sm text-zinc-600 font-medium">
              ¿Listo para dar el primer paso y blindar la rentabilidad operativa
              de tu marca hoy?
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="#soluciones"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-[0.12em] text-white bg-gradient-to-r from-[#0284c7] via-[#971B8D] to-[#EA0C7F] hover:opacity-95 shadow-[0_10px_28px_-6px_rgba(151,27,141,0.45)] transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>EXPLORAR SOLUCIONES</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <Link
                href="/academy"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-[0.12em] text-zinc-900 bg-white hover:bg-zinc-100 border border-zinc-300/90 shadow-2xs transition-all duration-200 hover:-translate-y-0.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#971B8D]" />
                <span>ACADEMY</span>
              </Link>

              <button
                type="button"
                onClick={openModal}
                className="inline-flex items-center justify-center px-5 py-3 rounded-full text-xs font-mono font-bold uppercase tracking-[0.1em] text-zinc-700 hover:text-zinc-950 bg-zinc-200/60 hover:bg-zinc-200 transition-colors cursor-pointer"
              >
                <span>[ DIAGNÓSTICO ]</span>
              </button>
            </div>
          </div>

          {/* Derecha: Coordenada Técnica de Estado */}
          <div className="lg:col-span-3 hidden lg:flex flex-col items-end text-right font-mono text-[10px] text-zinc-400 tracking-wider uppercase">
            <span className="text-zinc-700 font-bold">
              ARQUITECTURA SOBERANA
            </span>
            <span>4 PILARES OPERATIVOS // B2B</span>
          </div>
        </div>
      </div>
    </section>
  );
}
