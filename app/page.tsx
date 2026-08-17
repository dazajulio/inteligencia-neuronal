import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { DiagnosisSection } from "@/components/sections/DiagnosisSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AuthoritySection } from "@/components/sections/AuthoritySection";
import { AcademySection } from "@/components/sections/AcademySection";
import { LeadModal } from "@/components/ui/LeadModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-800 selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. El Diagnóstico (El Dolor del Sector) */}
      <DiagnosisSection />

      {/* 4. Pilares de Servicios (High-Ticket) */}
      <ServicesGrid />

      {/* 5. Process Methodology ("Como Trabajo") */}
      <ProcessSection />

      {/* 6. El Foso de Autoridad (Julio Daza) */}
      <AuthoritySection />

      {/* 7. Inteligencia Neuronal Academy */}
      <AcademySection />

      {/* 8. Corporate Technical Footer with Wide CTA y Salida B2C */}
      <Footer />

      {/* 9. Multi-step Qualification & Lead Capture Modal */}
      <LeadModal />
    </main>
  );
}
