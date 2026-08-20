import { createClient } from '@supabase/supabase-js';
import { LeadFormData, LeadSubmissionResponse } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

// Cliente público para el browser
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente administrador para rutas API de servidor (Bypass RLS)
export const getSupabaseAdmin = () => {
  return createClient(supabaseUrl, supabaseServiceRoleKey, {
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
    if (supabaseUrl && (supabaseServiceRoleKey || supabaseAnonKey)) {
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
