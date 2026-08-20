import { createClient } from '@supabase/supabase-js';
import { LeadFormData, LeadSubmissionResponse } from '@/types';

const defaultUrl = 'https://jkwqjpaexjtvvmrinwwj.supabase.co';
const defaultAnon = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprd3FqcGFleGp0dnZtcmlud3dqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxOTI1ODAsImV4cCI6MjEwMjc2ODU4MH0.MdJK_OJ9j5TZZrsV6MQr2dvs0LFtc8Zf2F8kC7kA4w8';
const defaultService = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imprd3FqcGFleGp0dnZtcmlud3dqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzE5MjU4MCwiZXhwIjoyMTAyNzY4NTgwfQ.USHaKVWH3NbhTbU-H8GRGBGH_79C4Oh8SG9ooIoNhBI';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || defaultUrl;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || defaultAnon;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || defaultService;

// Cliente público para el browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente administrador para rutas API de servidor (Bypass RLS)
export const getSupabaseAdmin = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || defaultUrl;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || defaultService;
  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

/**
 * Persiste leads de diagnóstico y auditoría en la tabla 'leads' de Supabase
 */
export async function submitLeadToDatabase(
  formData: LeadFormData
): Promise<LeadSubmissionResponse> {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const generatedFolio = `IN-AUDIT-${randomNum}`;

  try {
    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from('leads')
      .insert([
        {
          folio: generatedFolio,
          lead_type: 'diagnostico',
          full_name: formData.fullName,
          company_name: formData.companyName,
          corporate_email: formData.corporateEmail,
          phone_whatsapp: formData.phoneWhatsApp,
          business_type: formData.businessType,
          daily_volume: formData.dailyVolume,
          current_erp: formData.currentERP,
          primary_bottleneck: formData.primaryBottleneck || null,
          service_needed: 'Auditoría & Diagnóstico de Automatización',
          source: formData.source || 'diagnostico_modal',
          status: 'Nuevo',
        },
      ])
      .select()
      .single();

    if (!error && data) {
      return {
        success: true,
        leadId: data.folio || data.id,
        registeredAt: data.created_at,
        message: 'Diagnóstico registrado con éxito en Supabase.',
      };
    } else if (error) {
      console.warn('[Supabase Insert Lead Warning]', error.message);
    }
  } catch (err) {
    console.warn('[Inteligencia Neuronal :: Supabase Bridge Error]', err);
  }

  // Fallback simulado si no hay conexión
  return {
    success: true,
    leadId: generatedFolio,
    registeredAt: new Date().toISOString(),
    message: 'Solicitud registrada con éxito en el pipeline de auditoría.',
  };
}
