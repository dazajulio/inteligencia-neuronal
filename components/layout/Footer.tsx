"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, ShieldCheck, Lock, ExternalLink, X, FileText, CheckCircle2, Cookie } from "lucide-react";

export function Footer() {
  const [legalModal, setLegalModal] = useState<"terms" | "privacy" | "cookies" | null>(null);

  return (
    <footer className="w-full bg-zinc-50 text-zinc-600 font-sans pt-16 pb-12 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-zinc-200">
          
          {/* Brand Col (Col 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 relative flex items-center justify-center">
                <Image src="/logo.png" alt="Inteligencia Neuronal Logo" fill className="object-contain" />
              </div>
              <span className="font-heading text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-zinc-700 transition-colors">
                Inteligencia Neuronal
              </span>
            </Link>
            
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-md">
              Firma de arquitectura tecnológica, automatización agéntica y optimización operativa para cadenas de restaurantes, dark kitchens y plantas de alimentos.
            </p>

            {/* Corporate Emails & Phone */}
            <div className="space-y-2 pt-2 text-xs font-mono text-zinc-700">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span>Soporte Técnico: </span>
                <a href="mailto:soporte@inteligencianeuronal.com" className="font-bold text-zinc-900 hover:underline">
                  soporte@inteligencianeuronal.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-zinc-500" />
                <span>Campus Academy: </span>
                <a href="mailto:academy@inteligencianeuronal.com" className="font-bold text-zinc-900 hover:underline">
                  academy@inteligencianeuronal.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Línea Directa / WhatsApp: </span>
                <a href="tel:+584148817137" className="font-bold text-zinc-900 hover:underline">
                  +58(414) 881-7137
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Soluciones & Metodología (Col 6-7) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-900 font-bold">
              Ecosistema B2B
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#soluciones" className="hover:text-zinc-900 transition-colors">
                  Auditoría de Ecosistema
                </a>
              </li>
              <li>
                <a href="#soluciones" className="hover:text-zinc-900 transition-colors">
                  Sistemas Agénticos IA & RPA
                </a>
              </li>
              <li>
                <a href="#soluciones" className="hover:text-zinc-900 transition-colors">
                  Plataformas FoodTech (KDS)
                </a>
              </li>
              <li>
                <a href="#desarrollo" className="hover:text-zinc-900 transition-colors">
                  Metodología de Desarrollo
                </a>
              </li>
              <li>
                <a href="#agencia" className="hover:text-zinc-900 transition-colors">
                  Agencia & Liderazgo
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Campus Academy (Col 8-9) */}
          <div className="lg:col-span-2 space-y-3 text-xs">
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-900 font-bold">
              Campus Academy
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/academy#programas" className="hover:text-zinc-900 transition-colors">
                  Masterclass Automatización IA
                </Link>
              </li>
              <li>
                <Link href="/academy#programas" className="hover:text-zinc-900 transition-colors">
                  Bootcamp n8n Pipelines
                </Link>
              </li>
              <li>
                <Link href="/academy#programas" className="hover:text-zinc-900 transition-colors">
                  Dominio Local & SEO/AEO
                </Link>
              </li>
              <li>
                <Link href="/academy#toolkit" className="font-bold text-sky-600 hover:underline">
                  Descarga Toolkit Gratis
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-zinc-500 hover:text-zinc-900 transition-colors">
                  Acceso Super Admin
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Cumplimiento (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-900 font-bold">
              Seguridad & Cumplimiento
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => setLegalModal("terms")}
                  className="hover:text-zinc-900 transition-colors text-left hover:underline"
                >
                  Términos y Condiciones de Servicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal("privacy")}
                  className="hover:text-zinc-900 transition-colors text-left hover:underline"
                >
                  Políticas de Privacidad & Datos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setLegalModal("cookies")}
                  className="hover:text-zinc-900 transition-colors text-left hover:underline"
                >
                  Política de Cookies
                </button>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-600 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>NDA & Zero-Training Policy</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-600">
                <Lock className="w-3.5 h-3.5 text-zinc-500" />
                <span>Aislamiento de Servidor RLS</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} Inteligencia Neuronal LLC. Todos los derechos reservados.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-bold text-zinc-700">Inteligencia Neuronal Group</span>
            <span>&bull;</span>
            <a
              href="https://www.dazajulio.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-full transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 font-bold"
            >
              <span>Desarrollado por dazajulio.com</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      {/* ── MODALES LEGALES INTERACTIVOS ── */}
      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-7 sm:p-9 shadow-2xl space-y-6 text-zinc-900 max-h-[85vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-800">
                  {legalModal === "terms" && <FileText className="w-4 h-4" />}
                  {legalModal === "privacy" && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                  {legalModal === "cookies" && <Cookie className="w-4 h-4 text-amber-600" />}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-900">
                  {legalModal === "terms" && "Términos y Condiciones de Servicio"}
                  {legalModal === "privacy" && "Políticas de Privacidad y Protección de Datos"}
                  {legalModal === "cookies" && "Política de Cookies y Almacenamiento"}
                </h3>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                className="text-zinc-400 hover:text-zinc-900 p-1.5 rounded-lg hover:bg-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="text-xs sm:text-sm text-zinc-600 leading-relaxed space-y-4">
              {legalModal === "terms" && (
                <>
                  <p>
                    <strong>1. Objeto y Alcance:</strong> Los presentes términos regulan la contratación de servicios de auditoría tecnológica, despliegue de sistemas agénticos con IA y suscripciones a programas educativos en el campus virtual de <strong>Inteligencia Neuronal LLC</strong>.
                  </p>
                  <p>
                    <strong>2. Acuerdos de Confidencialidad (NDA):</strong> Toda información técnica, escandallos, recetas maestras, costos y datos operativos compartidos durante las auditorías están protegidos bajo estricto secreto profesional y nunca serán utilizados para entrenar modelos públicos de Inteligencia Artificial (Zero-Training Policy).
                  </p>
                  <p>
                    <strong>3. Disponibilidad y Soporte:</strong> Los sistemas en producción cuentan con soporte técnico continuo a través de <code>soporte@inteligencianeuronal.com</code>.
                  </p>
                </>
              )}

              {legalModal === "privacy" && (
                <>
                  <p>
                    <strong>1. Responsable del Tratamiento:</strong> Inteligencia Neuronal LLC respeta la privacidad de sus clientes y alumnos de acuerdo con estándares internacionales de protección de datos (GDPR / LOPD).
                  </p>
                  <p>
                    <strong>2. Uso de Datos Capturados:</strong> Los correos electrónicos y números de WhatsApp recolectados a través de solicitudes de auditoría o descargas de toolkits son utilizados exclusivamente para la entrega del servicio y comunicaciones técnicas solicitadas.
                  </p>
                  <p>
                    <strong>3. Derechos ARCO:</strong> Puedes solicitar la modificación o eliminación total de tus datos en cualquier momento enviando un correo a <code>soporte@inteligencianeuronal.com</code>.
                  </p>
                </>
              )}

              {legalModal === "cookies" && (
                <>
                  <p>
                    <strong>1. ¿Qué cookies utilizamos?:</strong> Utilizamos cookies técnicas estrictamente necesarias para la autenticación en el panel de administración (<code>httpOnly</code>, <code>Secure</code>, <code>SameSite=Strict</code>) y analítica anónima para optimizar la velocidad de carga de la web.
                  </p>
                  <p>
                    <strong>2. Sin Cookies de Terceros Invasivas:</strong> No vendemos datos de navegación a redes publicitarias externas.
                  </p>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-zinc-100 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-6 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs transition-all shadow-sm"
              >
                Entendido y Aceptar
              </button>
            </div>

          </div>
        </div>
      )}

    </footer>
  );
}
