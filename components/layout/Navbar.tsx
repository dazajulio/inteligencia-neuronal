"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Menu, X, GraduationCap, ArrowUpRight } from "lucide-react";
import { useLeadStore } from "@/store/useLeadStore";

export function Navbar() {
  const pathname = usePathname();
  const { openModal } = useLeadStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isDarkHero = pathname === "/academy" || pathname?.startsWith("/certificados");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 transition-all duration-300 pointer-events-none">
      <div
        className={`max-w-7xl mx-auto pointer-events-auto transition-all duration-300 rounded-2xl sm:rounded-full px-4 sm:px-6 h-16 sm:h-[4.25rem] flex items-center justify-between ${
          isScrolled
            ? "bg-white/90 backdrop-blur-xl border border-zinc-200/90 shadow-[0_8px_30px_rgba(15,23,42,0.06)] text-zinc-900"
            : isDarkHero
            ? "bg-zinc-950/65 backdrop-blur-xl border border-white/15 text-white shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
            : "bg-white/75 backdrop-blur-xl border border-zinc-200/80 text-zinc-900 shadow-[0_4px_20px_rgba(15,23,42,0.03)]"
        }`}
      >
        {/* Left: Brand Logo + Technical Descriptor (TIDY Style) */}
        <div className="flex items-center gap-3.5 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Inteligencia Neuronal Logo"
                fill
                className="object-contain"
              />
            </div>
            <span
              className={`font-heading text-lg sm:text-xl font-bold tracking-tight select-none transition-colors leading-none ${
                isDarkHero && !isScrolled
                  ? "text-white group-hover:text-zinc-300"
                  : "text-zinc-900 group-hover:text-zinc-600"
              }`}
            >
              Inteligencia Neuronal
            </span>
          </Link>

          {/* Vertical Divider + 2-Line Micro Tagline */}
          <div
            className={`hidden xl:flex items-center gap-3 pl-3.5 border-l ${
              isDarkHero && !isScrolled ? "border-white/15" : "border-zinc-300/80"
            }`}
          >
            <span
              className={`font-mono text-[9px] leading-[1.25] tracking-[0.08em] uppercase select-none ${
                isDarkHero && !isScrolled ? "text-zinc-400" : "text-zinc-500"
              }`}
            >
              ARQUITECTURA TECNOLÓGICA
              <br />
              &amp; IA OPERATIVA B2B
            </span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav
          className={`hidden md:flex items-center gap-6 lg:gap-7 text-xs font-mono uppercase tracking-[0.06em] font-semibold ${
            isDarkHero && !isScrolled ? "text-zinc-300" : "text-zinc-700"
          }`}
        >
          <a
            href="#soluciones"
            className={`transition-colors ${
              isDarkHero && !isScrolled ? "hover:text-white" : "hover:text-zinc-950"
            }`}
          >
            Soluciones
          </a>
          <a
            href="#desarrollo"
            className={`transition-colors ${
              isDarkHero && !isScrolled ? "hover:text-white" : "hover:text-zinc-950"
            }`}
          >
            Desarrollo
          </a>
          <a
            href="#agencia"
            className={`transition-colors ${
              isDarkHero && !isScrolled ? "hover:text-white" : "hover:text-zinc-950"
            }`}
          >
            Agencia IA
          </a>
          <Link
            href="/academy"
            className={`transition-colors ${
              isDarkHero && !isScrolled ? "hover:text-white" : "hover:text-zinc-950"
            }`}
          >
            Academy
          </Link>
          <Link
            href="/academy/campus"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border transition-all ${
              isDarkHero && !isScrolled
                ? "text-zinc-200 border-white/20 hover:text-white hover:border-white/40 bg-white/5"
                : "text-zinc-700 border-zinc-200/90 hover:text-zinc-950 hover:border-zinc-300 bg-zinc-100/70"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#1DACE3]" />
            <span>Campus</span>
          </Link>
        </nav>

        {/* Right: Phone Line & Bracketed / Pill CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+584148817137"
            className={`flex items-center gap-1.5 text-xs font-mono font-medium transition-colors ${
              isDarkHero && !isScrolled
                ? "text-zinc-300 hover:text-white"
                : "text-zinc-600 hover:text-zinc-950"
            }`}
          >
            <Phone
              className={`w-3.5 h-3.5 ${
                isDarkHero && !isScrolled ? "text-zinc-400" : "text-zinc-500"
              }`}
            />
            <span>+58(414) 881-7137</span>
          </a>

          <button
            type="button"
            onClick={openModal}
            className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer active:scale-95 ${
              isDarkHero && !isScrolled
                ? "bg-white text-zinc-950 hover:bg-zinc-100 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                : "bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm hover:shadow-md"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#86C537]" />
            <span>[ CONTACTO ]</span>
            <ArrowUpRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 rounded-xl transition-colors ${
            isDarkHero && !isScrolled
              ? "text-white hover:bg-white/10"
              : "text-zinc-800 hover:bg-zinc-100"
          }`}
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden pointer-events-auto mt-2 mx-auto max-w-7xl bg-white/95 backdrop-blur-xl border border-zinc-200/90 rounded-2xl px-6 py-5 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="pb-2 border-b border-zinc-100">
            <span className="font-mono text-[10px] tracking-widest uppercase text-zinc-400">
              ARQUITECTURA TECNOLÓGICA &amp; IA OPERATIVA
            </span>
          </div>

          <div className="flex flex-col space-y-2.5 text-sm font-mono uppercase tracking-wider font-semibold text-zinc-800">
            <a
              href="#soluciones"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-500 py-1 transition-colors"
            >
              Soluciones
            </a>
            <a
              href="#desarrollo"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-500 py-1 transition-colors"
            >
              Desarrollo
            </a>
            <a
              href="#agencia"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-500 py-1 transition-colors"
            >
              Agencia IA
            </a>
            <Link
              href="/academy"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-500 py-1 transition-colors"
            >
              Academy
            </Link>
            <a
              href="#grupo"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-zinc-500 py-1 transition-colors"
            >
              Grupo
            </a>
            <Link
              href="/academy/campus"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-700 font-semibold py-1.5 transition-colors flex items-center justify-between hover:text-zinc-900"
            >
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#1DACE3]" />
                <span>Campus Virtual</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                ACCESO
              </span>
            </Link>
          </div>

          <div className="pt-3 border-t border-zinc-100 flex flex-col gap-3">
            <a
              href="tel:+584148817137"
              className="flex items-center gap-2 text-xs font-mono font-semibold text-zinc-700"
            >
              <Phone className="w-3.5 h-3.5 text-zinc-500" />
              <span>+58(414) 881-7137</span>
            </a>

            <button
              type="button"
              className="w-full py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md"
              onClick={() => {
                setMobileMenuOpen(false);
                openModal();
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#86C537]" />
              <span>[ CONTACTO / AGENDAR ]</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
