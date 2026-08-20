import React from "react";

export function DiagnosisSection() {
  return (
    <section className="w-full pt-16 pb-8 lg:pt-24 lg:pb-12 bg-white flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-900 leading-tight">
          El crecimiento en la industria gastronómica colapsa sin sistemas.
        </h2>
        <p className="text-lg sm:text-xl text-zinc-600 font-medium leading-relaxed max-w-3xl mx-auto">
          El talento humano se desgasta en tareas repetitivas, el control falla y la experiencia del cliente se fractura. Nosotros construimos la <span className="font-semibold text-zinc-900">infraestructura invisible</span> que sostiene la expansión.
        </p>
      </div>
    </section>
  );
}
