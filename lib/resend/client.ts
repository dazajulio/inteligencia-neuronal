import { Resend } from "resend";

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Resend] RESEND_API_KEY no está configurada en las variables de entorno.");
    return null;
  }
  return new Resend(apiKey);
}

// Remitente: Oficial de Inteligencia Neuronal
const DEFAULT_FROM = process.env.EMAIL_FROM || "Inteligencia Neuronal <recursos@inteligencianeuronal.com>";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@inteligencianeuronal.com";

interface ResourceEmailPayload {
  to: string;
  userName?: string;
  resourceTitle: string;
  resourceTag?: string;
  resourceFormat?: string;
  resourceDescription?: string;
  downloadUrl?: string;
}

interface DiagnosisEmailPayload {
  to: string;
  fullName: string;
  companyName: string;
  serviceNeeded?: string;
  folio: string;
  businessType?: string;
  dailyVolume?: string;
}

interface AdminLeadAlertPayload {
  folio: string;
  fullName: string;
  companyName: string;
  corporateEmail: string;
  phoneWhatsApp: string;
  businessType?: string;
  dailyVolume?: string;
  currentERP?: string;
  primaryBottleneck?: string;
  serviceNeeded?: string;
}

/**
 * 1. Envío de Recursos / Lead Magnet del Toolkit
 */
export async function sendResourceDeliveryEmail(payload: ResourceEmailPayload) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[Resend Resource Delivery] No se pudo enviar porque falta RESEND_API_KEY.");
    return { success: false, error: "Missing RESEND_API_KEY" };
  }

  const {
    to,
    resourceTitle,
    resourceTag = "TOOLKIT OPERATIVO",
    resourceFormat = "PDF / Hoja de Cálculo",
    resourceDescription = "Plantilla y arquitectura parametrizada para control operativo y estandarización.",
    downloadUrl = "https://inteligencianeuronal.com/academy#toolkit",
  } = payload;

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${resourceTitle} — Inteligencia Neuronal</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; }
    .wrapper { width: 100%; max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; margin-top: 30px; margin-bottom: 30px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .header { background-color: #1F242D; padding: 36px 32px; text-align: left; position: relative; border-bottom: 4px solid #EA0C7F; }
    .brand-logo { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; text-decoration: none; display: inline-block; }
    .brand-accent { background: linear-gradient(90deg, #1DACE3, #971B8D, #EA0C7F); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .badge { display: inline-block; padding: 4px 12px; background-color: rgba(29, 172, 227, 0.15); border: 1px solid #1DACE3; color: #1DACE3; border-radius: 9999px; font-size: 11px; font-weight: 700; font-family: monospace; text-transform: uppercase; margin-top: 8px; }
    .body-content { padding: 36px 32px; }
    .greeting { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
    .intro-text { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
    .resource-card { background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border: 1px solid #cbd5e1; border-radius: 16px; padding: 24px; margin-bottom: 28px; position: relative; }
    .resource-stripe { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, #EA0C7F, #971B8D, #1DACE3); border-radius: 16px 16px 0 0; }
    .resource-tag { font-family: monospace; font-size: 10px; font-weight: 700; color: #971B8D; text-transform: uppercase; margin-bottom: 6px; }
    .resource-title { font-size: 17px; font-weight: 800; color: #0f172a; line-height: 1.35; margin-bottom: 8px; }
    .resource-desc { font-size: 13px; color: #64748b; line-height: 1.5; margin-bottom: 16px; }
    .btn-download { display: block; width: 100%; box-sizing: border-box; text-align: center; background: linear-gradient(90deg, #971B8D, #EA0C7F); color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 14px 24px; border-radius: 12px; box-shadow: 0 4px 15px rgba(234, 12, 127, 0.3); }
    .advisory-box { background-color: #fdf2f8; border: 1px solid #fbcfe8; border-radius: 14px; padding: 20px; margin-top: 24px; }
    .advisory-title { font-size: 13px; font-weight: 800; color: #971B8D; margin-bottom: 6px; }
    .advisory-desc { font-size: 12px; color: #831843; line-height: 1.5; margin-bottom: 10px; }
    .advisory-link { font-size: 12px; font-weight: 700; color: #EA0C7F; text-decoration: none; }
    .footer { background-color: #f1f5f9; padding: 24px 32px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    .footer-links { margin-bottom: 10px; }
    .footer-links a { color: #64748b; text-decoration: none; margin: 0 8px; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="brand-logo">Inteligencia <span class="brand-accent">Neuronal</span></div>
      <div><span class="badge">ACTIVO OPERATIVO B2B</span></div>
    </div>
    <div class="body-content">
      <div class="greeting">¡Hola! Aquí tienes tu activo solicitado.</div>
      <p class="intro-text">
        Has solicitado acceso a una de las herramientas de nuestro <strong>Toolkit Operativo y de Arquitectura</strong>. Puedes descargar el archivo listo para usar en tu negocio haciendo clic en el botón a continuación.
      </p>

      <div class="resource-card">
        <div class="resource-stripe"></div>
        <div class="resource-tag">${resourceTag} • ${resourceFormat}</div>
        <div class="resource-title">${resourceTitle}</div>
        <div class="resource-desc">${resourceDescription}</div>
        <a href="${downloadUrl}" class="btn-download" target="_blank">
          ⬇️ Descargar Activo Inmediatamente
        </a>
      </div>

      <div class="advisory-box">
        <div class="advisory-title">¿Necesitas auditar tu operación o automatizar con IA?</div>
        <div class="advisory-desc">
          En Inteligencia Neuronal diseñamos arquitecturas de datos, escandallos predictivos y agentes autónomos de WhatsApp/KDS para optimizar tu Food Cost y EBITDA.
        </div>
        <a href="https://inteligencianeuronal.com#diagnostico" class="advisory-link" target="_blank">
          Agendar Diagnóstico Operativo →
        </a>
      </div>
    </div>

    <div class="footer">
      <div class="footer-links">
        <a href="https://inteligencianeuronal.com">Sitio Web</a> •
        <a href="https://inteligencianeuronal.com/academy">Campus Academy</a>
      </div>
      <p>© 2026 Inteligencia Neuronal LLC. Todos los derechos reservados.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const data = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [to],
      subject: `📥 Tu Recurso: ${resourceTitle} — Inteligencia Neuronal`,
      html: htmlContent,
    });
    return { success: true, data };
  } catch (error) {
    console.error("[Resend Resource Email Error]", error);
    return { success: false, error };
  }
}

/**
 * 2. Confirmación al Cliente de Diagnóstico / Auditoría Agendada
 */
export async function sendDiagnosisConfirmationEmail(payload: DiagnosisEmailPayload) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[Resend Diagnosis Confirmation] No se pudo enviar porque falta RESEND_API_KEY.");
    return { success: false, error: "Missing RESEND_API_KEY" };
  }

  const {
    to,
    fullName,
    companyName,
    serviceNeeded = "Auditoría de Ecosistema Digital",
    folio,
    businessType = "Empresa Gastronómica",
  } = payload;

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmación de Diagnóstico — ${folio}</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #1e293b; }
    .wrapper { width: 100%; max-width: 620px; margin: 30px auto; background-color: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
    .header { background-color: #1F242D; padding: 36px 32px; border-bottom: 4px solid #1DACE3; }
    .brand-logo { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
    .brand-accent { background: linear-gradient(90deg, #1DACE3, #971B8D, #EA0C7F); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .badge { display: inline-block; padding: 4px 12px; background-color: rgba(134, 197, 55, 0.15); border: 1px solid #86C537; color: #86C537; border-radius: 9999px; font-size: 11px; font-weight: 700; font-family: monospace; margin-top: 8px; }
    .body-content { padding: 36px 32px; }
    .greeting { font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
    .intro-text { font-size: 14px; line-height: 1.6; color: #475569; margin-bottom: 24px; }
    .summary-card { background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 16px; padding: 20px; margin-bottom: 24px; font-size: 13px; }
    .summary-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
    .summary-row:last-child { border-bottom: none; }
    .summary-label { color: #64748b; font-weight: 600; }
    .summary-value { color: #0f172a; font-weight: 700; }
    .folio-box { background: linear-gradient(135deg, #1F242D, #334155); color: #ffffff; padding: 18px; border-radius: 14px; text-align: center; margin-bottom: 24px; }
    .folio-title { font-size: 11px; font-family: monospace; color: #1DACE3; font-weight: 700; text-transform: uppercase; }
    .folio-number { font-size: 24px; font-family: monospace; font-weight: 900; color: #ffffff; letter-spacing: 2px; margin-top: 4px; }
    .next-steps { font-size: 13px; color: #475569; line-height: 1.6; padding: 16px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 14px; }
    .footer { background-color: #f1f5f9; padding: 24px 32px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="brand-logo">Inteligencia <span class="brand-accent">Neuronal</span></div>
      <div><span class="badge">SOLICITUD RECIBIDA</span></div>
    </div>
    <div class="body-content">
      <div class="greeting">Estimado(a) ${fullName},</div>
      <p class="intro-text">
        Hemos recibido tu solicitud de diagnóstico para <strong>${companyName}</strong>. Nuestro equipo de consultoría operativa está revisando los detalles técnicos para preparar la sesión de evaluación.
      </p>

      <div class="folio-box">
        <div class="folio-title">Folio Único de Seguimiento</div>
        <div class="folio-number">${folio}</div>
      </div>

      <div class="summary-card">
        <div class="summary-row">
          <span class="summary-label">Empresa:</span>
          <span class="summary-value">${companyName}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Servicio Solicitado:</span>
          <span class="summary-value">${serviceNeeded}</span>
        </div>
        <div class="summary-row">
          <span class="summary-label">Modelo Operativo:</span>
          <span class="summary-value">${businessType}</span>
        </div>
      </div>

      <div class="next-steps">
        <strong>📋 Próximos pasos:</strong><br>
        Uno de nuestros directores de consultoría se pondrá en contacto contigo a través de WhatsApp o correo electrónico corporativo dentro de las próximas 24 horas hábiles.
      </div>
    </div>
    <div class="footer">
      <p>© 2026 Inteligencia Neuronal LLC. Innovación y Eficiencia Operativa.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const data = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [to],
      subject: `📋 Solicitud de Diagnóstico Confirmada [${folio}] — Inteligencia Neuronal`,
      html: htmlContent,
    });
    return { success: true, data };
  } catch (error) {
    console.error("[Resend Diagnosis Confirmation Error]", error);
    return { success: false, error };
  }
}

/**
 * 3. Alerta Inmediata al Administrador por Nuevo Lead / Diagnóstico
 */
export async function sendAdminLeadAlertEmail(payload: AdminLeadAlertPayload) {
  const resend = getResendClient();
  if (!resend) {
    return;
  }

  const {
    folio,
    fullName,
    companyName,
    corporateEmail,
    phoneWhatsApp,
    businessType = "No especificado",
    dailyVolume = "No especificado",
    currentERP = "No especificado",
    primaryBottleneck = "No especificado",
    serviceNeeded = "Diagnóstico B2B",
  } = payload;

  const htmlContent = `
<!DOCTYPE html>
<html>
<body style="font-family: sans-serif; background-color: #f1f5f9; padding: 20px; color: #1e293b;">
  <div style="max-width: 600px; margin: auto; background: white; border-radius: 14px; border: 1px solid #cbd5e1; overflow: hidden;">
    <div style="background: #1F242D; padding: 24px; color: white; border-bottom: 4px solid #EA0C7F;">
      <h2 style="margin: 0; font-size: 18px;">🚨 Nuevo Prospecto / Lead Registrado</h2>
      <span style="font-family: monospace; font-size: 12px; color: #1DACE3;">Folio: ${folio}</span>
    </div>
    <div style="padding: 24px; font-size: 13px; line-height: 1.6;">
      <p><strong>Empresa:</strong> ${companyName}</p>
      <p><strong>Contacto:</strong> ${fullName}</p>
      <p><strong>Email:</strong> <a href="mailto:${corporateEmail}">${corporateEmail}</a></p>
      <p><strong>WhatsApp:</strong> <a href="https://wa.me/${phoneWhatsApp.replace(/[^0-9]/g, '')}">${phoneWhatsApp}</a></p>
      <p><strong>Servicio:</strong> ${serviceNeeded}</p>
      <p><strong>Modelo:</strong> ${businessType} | <strong>Volumen:</strong> ${dailyVolume}</p>
      <p><strong>ERP Actual:</strong> ${currentERP}</p>
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 10px; margin-top: 14px;">
        <strong>Cuello de Botella:</strong><br>
        ${primaryBottleneck}
      </div>
      <div style="margin-top: 20px; text-align: center;">
        <a href="https://inteligencianeuronal.com/admin" style="display: inline-block; background: #971B8D; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 12px;">
          Abrir Panel Admin ▹
        </a>
      </div>
    </div>
  </div>
</body>
</html>
  `;

  try {
    await resend.emails.send({
      from: DEFAULT_FROM,
      to: [ADMIN_EMAIL],
      subject: `🚨 [NUEVO LEAD] ${companyName} — ${fullName} (${folio})`,
      html: htmlContent,
    });
  } catch (error) {
    console.warn("[Resend Admin Alert Error]", error);
  }
}

export interface AcademyWelcomeEmailPayload {
  to: string;
  fullName: string;
  courseTitle: string;
  campusUrl?: string;
  whatsappVipUrl?: string;
}

/**
 * 4. Envío Automático de Bienvenida y Acceso al Campus Virtual
 */
export async function sendAcademyWelcomeEmail(payload: AcademyWelcomeEmailPayload) {
  const resend = getResendClient();
  if (!resend) {
    console.warn("[Resend Academy Welcome] No se pudo enviar porque falta RESEND_API_KEY.");
    return { success: false, error: "Missing RESEND_API_KEY" };
  }

  const {
    to,
    fullName,
    courseTitle,
    campusUrl = "https://inteligencianeuronal.com/academy/campus",
    whatsappVipUrl = "https://chat.whatsapp.com/sample-academy-vip",
  } = payload;

  const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>¡Bienvenido a ${courseTitle}! — Inteligencia Neuronal Academy</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0f172a; color: #f8fafc; }
    .wrapper { width: 100%; max-width: 620px; margin: 30px auto; background-color: #1e293b; border-radius: 24px; overflow: hidden; border: 1px solid #334155; box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
    .header { background: linear-gradient(135deg, #1F242D 0%, #0f172a 100%); padding: 36px 32px; border-bottom: 4px solid #971B8D; position: relative; }
    .brand-logo { font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; }
    .brand-accent { background: linear-gradient(90deg, #1DACE3, #971B8D, #EA0C7F); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .badge { display: inline-block; padding: 5px 14px; background-color: rgba(134, 197, 55, 0.15); border: 1px solid #86C537; color: #86C537; border-radius: 9999px; font-size: 11px; font-weight: 800; font-family: monospace; margin-top: 10px; }
    .body-content { padding: 36px 32px; }
    .greeting { font-size: 22px; font-weight: 800; color: #ffffff; margin-bottom: 12px; }
    .intro-text { font-size: 14px; line-height: 1.6; color: #cbd5e1; margin-bottom: 24px; }
    .course-card { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border: 1px solid #475569; border-radius: 18px; padding: 24px; margin-bottom: 28px; position: relative; }
    .course-tag { font-family: monospace; font-size: 10px; font-weight: 800; color: #1DACE3; text-transform: uppercase; margin-bottom: 6px; }
    .course-title { font-size: 18px; font-weight: 800; color: #ffffff; line-height: 1.35; margin-bottom: 8px; }
    .btn-campus { display: block; width: 100%; box-sizing: border-box; text-align: center; background: linear-gradient(90deg, #971B8D, #EA0C7F); color: #ffffff !important; font-size: 15px; font-weight: 800; text-decoration: none; padding: 16px 24px; border-radius: 14px; box-shadow: 0 4px 20px rgba(234, 12, 127, 0.4); margin-top: 16px; }
    .steps-box { background-color: #0f172a; border: 1px solid #334155; border-radius: 16px; padding: 20px; margin-top: 24px; }
    .steps-title { font-size: 14px; font-weight: 800; color: #FEAD2B; margin-bottom: 12px; }
    .step-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; font-size: 13px; color: #94a3b8; line-height: 1.5; }
    .step-num { background-color: #334155; color: #ffffff; font-weight: 800; font-family: monospace; width: 22px; height: 22px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 11px; shrink-0; }
    .btn-whatsapp { display: inline-block; background-color: #22c55e; color: #ffffff !important; font-size: 13px; font-weight: 700; text-decoration: none; padding: 10px 18px; border-radius: 10px; margin-top: 8px; }
    .footer { background-color: #0f172a; padding: 24px 32px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #334155; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="brand-logo">Inteligencia <span class="brand-accent">Neuronal</span> Academy</div>
      <div><span class="badge">MATRÍCULA CONFIRMADA</span></div>
    </div>
    <div class="body-content">
      <div class="greeting">¡Hola, ${fullName}! Te damos la bienvenida oficial.</div>
      <p class="intro-text">
        Tu inscripción al programa <strong>${courseTitle}</strong> ha sido validada con éxito. A partir de este momento tienes acceso exclusivo a los módulos grabados, arquitecturas de automatización en n8n y plantillas operativas.
      </p>

      <div class="course-card">
        <div class="course-tag">ACCESO PERMANENTE AL CAMPUS VIRTUAL</div>
        <div class="course-title">${courseTitle}</div>
        <p style="font-size: 12px; color: #94a3b8; margin: 0 0 12px 0;">Tu usuario de acceso es tu correo: <strong>${to}</strong></p>
        <a href="${campusUrl}?email=${encodeURIComponent(to)}" class="btn-campus" target="_blank">
          🚀 Ingresar al Campus Virtual
        </a>
      </div>

      <div class="steps-box">
        <div class="steps-title">Tus siguientes pasos recomendados:</div>
        <div class="step-item">
          <div class="step-num">1</div>
          <div><strong>Accede al Campus:</strong> Explora las lecciones y descarga los blueprints de n8n y prompts de ChatGPT.</div>
        </div>
        <div class="step-item">
          <div class="step-num">2</div>
          <div><strong>Únete a la Comunidad VIP:</strong> Conéctate directamente con Julio Daza y otros directores para resolver dudas técnicas.<br>
            <a href="${whatsappVipUrl}" class="btn-whatsapp" target="_blank">💬 Unirme al Grupo VIP de WhatsApp</a>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <p>© 2026 Inteligencia Neuronal LLC. Innovación y Eficiencia Operativa en Gastronomía.</p>
    </div>
  </div>
</body>
</html>
  `;

  try {
    const data = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [to],
      subject: `🎉 ¡Bienvenido(a) a ${courseTitle}! — Acceso a tu Campus Virtual`,
      html: htmlContent,
    });
    return { success: true, data };
  } catch (error) {
    console.error("[Resend Academy Welcome Email Error]", error);
    return { success: false, error };
  }
}

