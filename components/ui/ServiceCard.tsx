"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useLeadStore } from "@/store/useLeadStore";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  bgCard: string;
  accentColor: string;
  borderColor: string;
  iconType: "compras" | "rentabilidad" | "kds" | "adquisicion";
}

export function ServiceCard({
  title,
  description,
  bgCard,
  accentColor,
  borderColor,
  iconType,
}: ServiceCardProps) {
  const { openModal } = useLeadStore();

  return (
    <div
      className={`group flex flex-col justify-between items-center text-center ${bgCard} ${borderColor} border rounded-3xl p-7 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-300 relative`}
    >
      <div className="flex flex-col items-center w-full">
        {/* Icon Container with Blueprint Schematic Vector */}
        <div className="w-20 h-20 rounded-2xl bg-white/80 backdrop-blur-sm border border-slate-200/80 flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform duration-300">
          {iconType === "compras" && (
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
              <rect x="4" y="16" width="24" height="16" rx="2" stroke={accentColor} strokeWidth="2.2" />
              <rect x="28" y="21" width="14" height="11" rx="2" stroke={accentColor} strokeWidth="2.2" />
              <circle cx="12" cy="34" r="3.5" stroke={accentColor} strokeWidth="2.2" fill="white" />
              <circle cx="34" cy="34" r="3.5" stroke={accentColor} strokeWidth="2.2" fill="white" />
              <circle cx="38" cy="11" r="5" stroke={accentColor} strokeWidth="1.8" />
              <path d="M38 6v2M38 14v2M33 11h2M41 11h2" stroke={accentColor} strokeWidth="1.6" strokeLinecap="round" />
              <line x1="8" y1="22" x2="20" y2="22" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
              <line x1="8" y1="26" x2="16" y2="26" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
            </svg>
          )}

          {iconType === "rentabilidad" && (
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
              <line x1="24" y1="8" x2="24" y2="40" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" />
              <line x1="16" y1="40" x2="32" y2="40" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
              <line x1="24" y1="12" x2="10" y2="20" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="12" x2="38" y2="20" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
              <path d="M6 20 Q10 28 14 20" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
              <path d="M34 20 Q38 28 42 20" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
              <rect x="18" y="16" width="12" height="15" rx="1.5" stroke={accentColor} strokeWidth="1.5" opacity="0.6" fill="white" />
              <line x1="21" y1="20" x2="27" y2="20" stroke={accentColor} strokeWidth="1.2" opacity="0.6" />
              <line x1="21" y1="23" x2="27" y2="23" stroke={accentColor} strokeWidth="1.2" opacity="0.6" />
            </svg>
          )}

          {iconType === "kds" && (
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
              <rect x="15" y="10" width="18" height="13" rx="2" stroke={accentColor} strokeWidth="2.2" fill="white" />
              <line x1="24" y1="23" x2="24" y2="28" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
              <rect x="4" y="25" width="13" height="10" rx="1.5" stroke={accentColor} strokeWidth="1.8" fill="white" />
              <line x1="10" y1="25" x2="16" y2="28" stroke={accentColor} strokeWidth="1.5" opacity="0.7" />
              <rect x="31" y="25" width="13" height="10" rx="1.5" stroke={accentColor} strokeWidth="1.8" fill="white" />
              <line x1="31" y1="28" x2="38" y2="25" stroke={accentColor} strokeWidth="1.5" opacity="0.7" />
              <circle cx="39" cy="10" r="4.5" stroke={accentColor} strokeWidth="1.5" fill="white" />
              <path d="M37 10l1.5 1.5 2.5-2.5" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}

          {iconType === "adquisicion" && (
            <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 6C19.03 6 15 10.03 15 15c0 7.5 9 18 9 18s9-10.5 9-18c0-4.97-4.03-9-9-9z" stroke={accentColor} strokeWidth="2.2" fill="white" />
              <circle cx="24" cy="15" r="3.5" stroke={accentColor} strokeWidth="1.8" />
              <path d="M8 38l9-8 7 5 12-13" stroke={accentColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M32 22l4-1-1 4" stroke={accentColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Card Title */}
        <h3 className="text-lg font-bold text-slate-900 tracking-tight leading-snug mb-3 min-h-[50px] flex items-center justify-center">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-sm text-slate-600 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {/* Footer Link */}
      <div className="pt-6 mt-4 border-t border-black/5 w-full flex justify-center">
        <button
          onClick={openModal}
          className="text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer group/btn"
          style={{ color: accentColor }}
        >
          <span>Solicitar Diagnóstico</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
