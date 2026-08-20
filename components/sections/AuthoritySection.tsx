import React from "react";
import Image from "next/image";

export function AuthoritySection() {
  return (
    <section id="agencia" className="w-full py-24 lg:py-32 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col space-y-8 text-center sm:text-left">
          
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 tracking-tight">
            Agencia IA.
          </h2>
          
          <div className="space-y-6 text-lg sm:text-xl text-zinc-600 font-medium leading-relaxed max-w-4xl">
            <p>
              Inteligencia Neuronal no es una agencia de marketing tradicional. Es un híbrido nacido de la intersección entre la alta gerencia corporativa, la cocina, y la ingeniería de software de vanguardia.
            </p>
            <p>
              Hablamos el lenguaje de la operación día a día y el código de las nuevas tecnologías que impulsan los negocios. Inteligencia Neuronal es el resultado de décadas de experiencia ejecutiva dentro de las cocinas y la gestión de restaurantes, dirigida por <a href="https://www.dazajulio.com" target="_blank" rel="noopener noreferrer" className="text-zinc-900 font-bold underline underline-offset-4 hover:text-zinc-600 transition-colors">Julio Alberto Daza Celis</a>.
            </p>
            <p>
              Entendemos exactamente dónde se quiebra un negocio durante el servicio; por eso, cada arquitectura que diseñamos está milimétricamente ajustada a la realidad de su marca. Hoy, respaldados por certificaciones de élite en Inteligencia Artificial y desarrollo de software, no solo entregamos herramientas digitales: construimos ecosistemas tecnológicos que protegen sus márgenes, estandarizan sus procesos y multiplican sus resultados.
            </p>
          </div>
          
          {/* Trust Assurances / Badges */}
          <div className="pt-10 mt-10 border-t border-zinc-200/80 text-center">
            <p className="text-xs sm:text-sm font-bold text-zinc-400 uppercase tracking-widest mb-8 text-center">
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

      </div>
    </section>
  );
}
