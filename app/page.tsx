import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { FoodCostCalculator } from "@/components/sections/FoodCostCalculator";
import { LeadModal } from "@/components/ui/LeadModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 selection:bg-[#0284c7] selection:text-white">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Hero Section with Founder Staging & Holographic HUD */}
      <HeroSection />

      {/* 3. Four Services Grid */}
      <ServicesGrid />

      {/* 4. Process Methodology ("Como Trabajo") */}
      <ProcessSection />

      {/* 5. Interactive Food Cost & EBITDA Simulator */}
      <FoodCostCalculator />

      {/* 6. Corporate Technical Footer with Wide CTA */}
      <Footer />

      {/* 7. Multi-step Qualification & Lead Capture Modal */}
      <LeadModal />
    </main>
  );
}
