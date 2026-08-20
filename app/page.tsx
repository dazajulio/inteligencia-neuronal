import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { MobileSectionNav } from "@/components/layout/MobileSectionNav";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { DiagnosisSection } from "@/components/sections/DiagnosisSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { AuthoritySection } from "@/components/sections/AuthoritySection";
import { AcademySection } from "@/components/sections/AcademySection";
import { GroupSection } from "@/components/sections/GroupSection";
import { LeadModal } from "@/components/ui/LeadModal";
import { CourseCheckoutModal } from "@/components/ui/CourseCheckoutModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-800 selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar />
      <MobileSectionNav />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. El Diagnóstico (El Dolor del Sector) */}
      <DiagnosisSection />

      {/* 4. Pilares de Servicios / Soluciones (High-Ticket con 3D Flip Cards) */}
      <ServicesGrid />

      {/* 5. Metodología de Desarrollo ("Desarrollo") */}
      <ProcessSection />

      {/* 6. El Foso de Autoridad (Julio Daza) */}
      <AuthoritySection />

      {/* 7. Inteligencia Neuronal Academy */}
      <AcademySection />

      {/* 8. Inteligencia Neuronal Group (Ecosistema de Empresas) */}
      <GroupSection />

      {/* 9. Corporate Technical Footer Elegante y Ligero */}
      <Footer />

      {/* 10. Multi-step Qualification & Lead Capture Modal */}
      <LeadModal />

      {/* 11. Course Pre-Checkout & Payment Modal */}
      <CourseCheckoutModal />
    </main>
  );
}
