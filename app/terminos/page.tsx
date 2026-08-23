import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones de Servicio | Inteligencia Neuronal",
  description:
    "Términos y Condiciones de Uso y Contratación de Servicios de Inteligencia Neuronal.",
};

export default function TerminosPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <Navbar />

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <div className="border-b border-slate-200 pb-8 mb-10">
          <span className="text-xs font-bold tracking-widest text-[#0284c7] uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Legal & Contratación
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Términos y Condiciones del Servicio
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Última actualización: 22 de Agosto de 2026 | Inteligencia Neuronal
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              1. Aceptación de los Términos
            </h2>
            <p>
              Al acceder a nuestro sitio web (<a href="https://www.inteligencianeuronal.com" className="text-[#0284c7] underline font-medium">www.inteligencianeuronal.com</a>), contratar nuestros servicios de consultoría o interactuar con nuestros canales automatizados, aceptas estar legalmente sujeto a los presentes Términos y Condiciones.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              2. Descripción de los Servicios
            </h2>
            <p>
              <strong>Inteligencia Neuronal</strong> provee servicios de consultoría estratégica en inteligencia operativa, diseño e implementación de arquitecturas de automatización en n8n, orquestación de agentes autónomos, integraciones con WhatsApp Cloud API y programas de formación profesional a través de nuestra Academia (Academy).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              3. Propiedad Intelectual y Licencias
            </h2>
            <p>
              Todos los contenidos, metodologías, calculadoras de Food Cost, blueprints de n8n, código fuente propietario y marcas registradas exhibidas en este sitio son propiedad exclusiva de Inteligencia Neuronal y sus fundadores, protegidos por las leyes internacionales de propiedad intelectual.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              4. Uso de Canales y Automatizaciones de Redes Sociales
            </h2>
            <p>
              Nuestros sistemas de respuesta automatizada en Instagram y WhatsApp operan en estricta conformidad con las políticas de Meta Platforms. El uso indebido, intento de vulneración o spam hacia nuestros agentes automatizados resultará en el bloqueo inmediato del usuario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              5. Limitación de Responsabilidad
            </h2>
            <p>
              Inteligencia Neuronal implementa automatizaciones de la más alta calidad técnica y rigor de ingeniería. No obstante, la Empresa no se hace responsable por interrupciones atribuibles a caídas de servicios de terceros (Meta, Google, OpenAI, proveedores de hosting o caídas de conectividad externas).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              6. Ley Aplicable y Jurisdicción
            </h2>
            <p>
              Estos términos se rigen e interpretan de conformidad con las leyes mercantiles y de comercio electrónico vigentes. Para cualquier controversia, las partes acuerdan someterse a la jurisdicción de los tribunales competentes.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
