import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | Inteligencia Neuronal",
  description:
    "Política de Privacidad y Protección de Datos Personales de Inteligencia Neuronal. Cumplimiento estricto con normativas internacionales y políticas de plataformas de Meta.",
};

export default function PrivacidadPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      <Navbar />

      <div className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <div className="border-b border-slate-200 pb-8 mb-10">
          <span className="text-xs font-bold tracking-widest text-[#0284c7] uppercase bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
            Legal & Privacidad
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Política de Privacidad
          </h1>
          <p className="text-slate-500 mt-2 text-sm">
            Última actualización: 22 de Agosto de 2026 | Responsable: Inteligencia Neuronal
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              1. Identidad y Compromiso del Responsable
            </h2>
            <p>
              <strong>Inteligencia Neuronal</strong> (en adelante, &quot;la Empresa&quot; o &quot;nosotros&quot;), con sitio web oficial en{" "}
              <a href="https://www.inteligencianeuronal.com" className="text-[#0284c7] underline font-medium">
                www.inteligencianeuronal.com
              </a>
              , es una firma de consultoría y desarrollo de software especializada en automatizaciones empresariales, inteligencia operativa, integración de agentes autónomos y APIs.
            </p>
            <p className="mt-2">
              Nos comprometemos rigurosamente a salvaguardar la privacidad y la confidencialidad de la información personal de nuestros clientes, usuarios, visitantes web y usuarios que interactúan con nuestras integraciones en plataformas de terceros (incluyendo Meta Platforms, Inc., WhatsApp Cloud API e Instagram Graph API).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              2. Datos Personales que Recopilamos
            </h2>
            <p>Recopilamos únicamente los datos necesarios para brindar nuestros servicios de consultoría, diagnóstico y automatización:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Datos de Identificación y Contacto:</strong> Nombre, apellido, dirección de correo electrónico corporativo, número de teléfono/WhatsApp, nombre de la empresa y cargo.</li>
              <li><strong>Datos Operativos y de Negocio:</strong> Información provista voluntariamente en nuestros diagnósticos (porcentajes de costos, volumen de ventas, número de sucursales).</li>
              <li><strong>Datos de Plataformas y Redes Sociales (Meta / Instagram):</strong> Identificadores de usuario públicos (IG User ID), nombre de usuario público y contenido de comentarios o mensajes directos cuando interactúas con nuestras cuentas oficiales o agentes automatizados autorizados.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              3. Finalidad del Tratamiento de los Datos
            </h2>
            <p>Utilizamos la información recopilada exclusivamente para:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Responder a solicitudes de consultoría, presupuestos y diagnósticos operativos.</li>
              <li>Automatizar la atención de comentarios, soporte y envío de recursos educativos o blueprints solicitados vía mensaje directo (DM).</li>
              <li>Proveer acceso a nuestra plataforma de formación (Academy) y servicios de arquitectura n8n / APIs.</li>
              <li>Cumplir con obligaciones legales, tributarias y contractuales aplicables.</li>
            </ul>
            <p className="mt-3 text-slate-900 font-semibold">
              Bajo ninguna circunstancia vendemos, alquilamos ni comercializamos tus datos personales con terceros para fines publicitarios ajenos a nuestra actividad.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              4. Integración con Meta Platforms (Instagram y WhatsApp API)
            </h2>
            <p>
              Nuestra aplicación utiliza las APIs oficiales de Meta for Developers (Graph API) bajo estricto cumplimiento de las <em>Políticas de la Plataforma de Meta</em>. Los datos procesados a través de webhooks (comentarios y mensajes directos) se emplean en tiempo real para generar respuestas automatizadas pertinentes y no se almacenan de forma permanente a menos que exista un consentimiento expreso para una relación comercial directa.
            </p>
          </section>

          <section className="bg-sky-50 border border-sky-200 rounded-xl p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              5. Instrucciones para la Eliminación de Datos de Usuario (User Data Deletion)
            </h2>
            <p className="text-sm mb-3">
              En cumplimiento con los requerimientos de privacidad de Meta y las normativas internacionales de protección de datos (RGPD / CCPA), cualquier usuario puede solicitar la eliminación total de sus datos de nuestros registros en cualquier momento.
            </p>
            <p className="text-sm font-semibold mb-2">Pasos para solicitar la eliminación de datos:</p>
            <ol className="list-decimal pl-6 text-sm space-y-1">
              <li>Envía un correo electrónico a: <a href="mailto:soporte@inteligencianeuronal.com" className="text-[#0284c7] underline font-bold">soporte@inteligencianeuronal.com</a> o <a href="mailto:contacto@dazajulio.com" className="text-[#0284c7] underline font-bold">contacto@dazajulio.com</a>.</li>
              <li>Coloca en el asunto: <strong>&quot;Solicitud de Eliminación de Datos Personales&quot;</strong>.</li>
              <li>Indica tu nombre, correo o identificador de Instagram asociado.</li>
            </ol>
            <p className="text-xs text-slate-500 mt-3">
              Nuestro equipo procesará tu solicitud y eliminará permanentemente todos tus registros asociados en un plazo máximo de 48 horas hábiles, emitiendo una confirmación de cumplimiento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              6. Seguridad y Confidencialidad
            </h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas de nivel empresarial, incluyendo cifrado SSL/TLS en tránsito, autenticación segura basada en tokens y arquitecturas con Row-Level Security (RLS) en bases de datos PostgreSQL para impedir el acceso no autorizado, alteración o divulgación indebida de tus datos.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              7. Contacto y Consultas
            </h2>
            <p>
              Para cualquier consulta relacionada con esta Política de Privacidad o el tratamiento de tus datos personales, puedes comunicarte con nuestro equipo legal y de seguridad en:
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 mt-3 text-sm space-y-1">
              <p><strong>Inteligencia Neuronal</strong></p>
              <p>Sitio Web: <a href="https://www.inteligencianeuronal.com" className="text-[#0284c7] underline">www.inteligencianeuronal.com</a></p>
              <p>Correo de Soporte: <a href="mailto:soporte@inteligencianeuronal.com" className="text-[#0284c7] underline">soporte@inteligencianeuronal.com</a></p>
              <p>Responsable de Operaciones: Julio Daza (<a href="https://www.dazajulio.com" className="text-[#0284c7] underline">www.dazajulio.com</a>)</p>
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  );
}
