export interface LeadFormData {
  fullName: string;
  companyName: string;
  corporateEmail: string;
  phoneWhatsApp: string;
  businessType: string;
  dailyVolume: string;
  currentERP: string;
  primaryBottleneck?: string;
  source?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  leadId?: string;
  message?: string;
  registeredAt?: string;
}

export interface ServiceCardData {
  id: string;
  badgeNumber: string;
  title: string;
  description: string;
  bgCard: string;
  accentColor: string;
  borderColor: string;
  iconType: "compras" | "rentabilidad" | "kds" | "adquisicion";
}
