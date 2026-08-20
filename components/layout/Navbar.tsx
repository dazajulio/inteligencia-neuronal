"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Timer, Phone, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLeadStore } from "@/store/useLeadStore";

export function Navbar() {
  const { openModal } = useLeadStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm py-0"
          : "bg-transparent border-b border-transparent py-1"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 relative flex items-center justify-center transition-transform group-hover:scale-105">
            <Image src="/logo.png" alt="Inteligencia Neuronal Logo" fill className="object-contain" />
          </div>
          <span className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 select-none group-hover:text-zinc-600 transition-colors leading-none">
            Inteligencia Neuronal
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-zinc-800">
          <a href="#soluciones" className="hover:text-zinc-500 transition-colors">
            Soluciones
          </a>
          <a href="#desarrollo" className="hover:text-zinc-500 transition-colors">
            Desarrollo
          </a>
          <a href="#agencia" className="hover:text-zinc-500 transition-colors">
            Agencia IA
          </a>
          <Link href="/academy" className="hover:text-zinc-500 transition-colors">
            Academy
          </Link>
          <Link
            href="/academy/campus"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all shadow-xs"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#1DACE3] animate-pulse" />
            <span>Campus</span>
          </Link>
        </nav>

        {/* Right: Phone Line & Primary Button */}
        <div className="hidden lg:flex items-center gap-6">
          <a
            href="tel:+584148817137"
            className="flex items-center gap-2 text-sm font-semibold text-slate-800 hover:text-[#0284c7] transition-colors"
          >
            <Phone className="w-4 h-4 text-slate-700" />
            <span>+58(414) 881-7137</span>
          </a>

          <Button
            variant="gradient"
            size="md"
            onClick={openModal}
            className="rounded-xl px-6 py-2.5 text-sm"
          >
            Contacto
          </Button>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-800 hover:bg-slate-100 transition-colors"
          aria-label="Abrir menú"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-5 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 text-base font-semibold text-slate-800">
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
              className="text-[#971B8D] font-bold py-1 transition-colors flex items-center justify-between"
            >
              <span>Campus Virtual (Alumnos)</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#971B8D]/10">ACCESO</span>
            </Link>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-3">
            <a
              href="tel:+584148817137"
              className="flex items-center gap-2 text-sm font-semibold text-slate-800"
            >
              <Phone className="w-4 h-4 text-slate-700" />
              <span>+58(414) 881-7137</span>
            </a>

            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                openModal();
              }}
            >
              Contacto / Agendar
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
