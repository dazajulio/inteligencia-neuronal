"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Layers, Cpu, BookOpen, Building2, AlertCircle } from "lucide-react";

interface SectionItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const SECTIONS: SectionItem[] = [
  { id: "diagnostico", label: "Diagnóstico", icon: <AlertCircle className="w-3.5 h-3.5 text-amber-500" /> },
  { id: "soluciones", label: "Soluciones", icon: <Sparkles className="w-3.5 h-3.5 text-sky-500" /> },
  { id: "desarrollo", label: "Metodología", icon: <Layers className="w-3.5 h-3.5 text-indigo-500" /> },
  { id: "agencia", label: "Agencia IA", icon: <Cpu className="w-3.5 h-3.5 text-fuchsia-500" /> },
  { id: "academy", label: "Academy", icon: <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> },
  { id: "grupo", label: "Grupo", icon: <Building2 className="w-3.5 h-3.5 text-slate-700" /> },
];

export function MobileSectionNav() {
  const [activeSection, setActiveSection] = useState<string>("diagnostico");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only when scrolled past Hero (approx 350px)
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 350);

      // Determine current visible section
      const sectionElements = SECTIONS.map((sec) => ({
        id: sec.id,
        el: document.getElementById(sec.id),
      })).filter((s) => s.el !== null);

      const scrollPosition = scrollY + 180;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -110;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSection(id);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-20 left-0 right-0 z-30 px-3 py-2 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar py-0.5">
        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider shrink-0 hidden sm:inline-block pl-1">
          Navegación:
        </span>
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {SECTIONS.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => scrollTo(sec.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? "bg-zinc-900 text-white shadow-sm ring-1 ring-zinc-900"
                    : "bg-slate-100/90 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                <span className={isActive ? "brightness-125" : ""}>{sec.icon}</span>
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
