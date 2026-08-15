import { z } from "zod";

export const leadSchema = z.object({
  fullName: z
    .string()
    .min(2, "El nombre completo debe tener al menos 2 caracteres")
    .max(100, "Nombre demasiado largo"),
  companyName: z
    .string()
    .min(2, "El nombre de la empresa es requerido")
    .max(100, "Nombre de empresa demasiado largo"),
  corporateEmail: z
    .string()
    .email("Ingresa un correo electrónico corporativo válido"),
  phoneWhatsApp: z
    .string()
    .min(7, "Ingresa un número de contacto válido")
    .max(30, "Número de teléfono demasiado largo"),
  businessType: z
    .string()
    .min(1, "Selecciona el modelo de negocio"),
  dailyVolume: z
    .string()
    .min(1, "Selecciona el volumen operativo"),
  currentERP: z
    .string()
    .min(1, "Selecciona el ERP o sistema actual"),
  primaryBottleneck: z
    .string()
    .max(500, "El texto del cuello de botella no debe exceder 500 caracteres")
    .optional(),
  source: z.string().optional().default("hero_cta"),
});

export type LeadInput = z.infer<typeof leadSchema>;
