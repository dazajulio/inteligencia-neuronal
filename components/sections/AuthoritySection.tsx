import React from "react";
import Image from "next/image";
import { UtensilsCrossed, Cpu, ShieldCheck, Sparkles, ExternalLink, Award } from "lucide-react";

export function AuthoritySection() {
  const pillars = [
    {
      icon: <UtensilsCrossed className="w-5 h-5 text-amber-600" />,
      badge: "ADN Gastronómico Real",
      title: "De la Cocina al Código",
      description:
        "No somos teóricos ni una agencia tradicional de marketing. Nacimos dentro del calor de las cocinas y la alta dirección gastronómica, entendiendo exactamente dónde se quiebra la operación en el pase.",
    },
    {
      icon: <Cpu className="w-5 h-5 text-fuchsia-600" />,
      badge: "Ingeniería Enterprise",
      title: "Arquitecturas Agénticas & IA",
      description:
        "Desarrollamos software propietario, conectores de bases de datos y agentes autónomos configurados sobre infraestructura privada y segura sin depender de intermediarios.",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-sky-600" />,
      badge: "Soberanía Operativa",
      title: "Blindaje de Márgenes & EBITDA",
      description:
        "Cada línea de código y cada automatización tiene un único propósito: reducir costes, recuperar márgenes cedidos y sostener el crecimiento de tu marca sin colapsar al equipo humano.",
    },
  ];

  return (
    <section id="agencia" className="w-full py-16 sm:py-28 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuchsia-50 border border-fuchsia-200 text-xs font-mono font-bold text-fuchsia-800 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-fuchsia-600" />
            <span>03 // EL FOSO DE AUTORIDAD // AGENCIA IA</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Agencia IA & Ecosistemas
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
            El híbrido nacido de la intersección entre la alta gerencia corporativa, la experiencia de cocina y la ingeniería de software de vanguardia.
          </p>
        </div>

        {/* 3 Pillar Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
                    {pillar.icon}
                  </div>
                  <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Founder Leadership Quote Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-[11px] font-mono font-bold border border-cyan-400/20">
              <Award className="w-3.5 h-3.5" />
              <span>DIRECCIÓN EJECUTIVA & DEV</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Liderado por Julio Alberto Daza Celis
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Décadas de trayectoria operativa dentro de restaurantes de alto impacto unidas al desarrollo de arquitecturas de software e IA certificadas.
            </p>
          </div>

          <a
            href="https://www.dazajulio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-md transition-all"
          >
            <span>Ver Trayectoria & Dev</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        {/* Trust Assurances / Badges */}
        <div className="pt-8 border-t border-slate-200 text-center">
          <p className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest mb-6">
            Proyectos Desplegados, Experiencias y Certificaciones
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-10 grayscale hover:grayscale-0 transition-all duration-500 max-w-5xl mx-auto">
            <a href="https://www.glubbi.app" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/glubbi.png" alt="Glubbi" fill className="object-contain" />
            </a>
            <a href="https://www.briomealsonline.com" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/brio-meals.png" alt="Brio Meals" fill className="object-contain" />
            </a>
            <a href="https://www.sugachurros.com" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/suga-churros.png" alt="Suga Churros" fill className="object-contain" />
            </a>
            <a href="https://www.dulcilight.com" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/dulcilight.png" alt="Dulcilight" fill className="object-contain" />
            </a>
            <a href="https://caibok.org/" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/caibok.png" alt="Caibok" fill className="object-contain" />
            </a>
            <a href="https://blackbeltchef.com/" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/blackbeltchef.png" alt="BlackBeltChef" fill className="object-contain" />
            </a>
            <a href="https://pescaderiaelvelero.com/" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/elvelero.png" alt="El Velero" fill className="object-contain" />
            </a>
            <a href="https://www.toromccoy.com/" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/toromccoy.png" alt="Toro McCoy" fill className="object-contain" />
            </a>
            <a href="http://pcc.faces.ula.ve/gastronomia/index.html" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/ula.png" alt="Universidad de los Andes" fill className="object-contain" />
            </a>
            <a href="https://www.instagram.com/empanadasfactorycafe/?hl=es" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/empanadasfactory.png" alt="Empanadas Factory" fill className="object-contain" />
            </a>
            <a href="https://n8n.io" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/n8n.png" alt="n8n" fill className="object-contain" />
            </a>
            <a href="https://antigravity.google" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/antigravity.png" alt="Antigravity" fill className="object-contain" />
            </a>
            <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/claude.png" alt="Claude" fill className="object-contain" />
            </a>
            <a href="https://www.instagram.com/casa_sichuan/" target="_blank" rel="noopener noreferrer" className="relative w-24 h-12 sm:w-28 sm:h-14 hover:scale-105 transition-transform opacity-70 hover:opacity-100 flex items-center justify-center">
              <Image src="/projects/casasichuan.png" alt="Casa Sichuan" fill className="object-contain" />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
