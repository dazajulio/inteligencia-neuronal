import { create } from "zustand";
import { LeadFormData } from "@/types";

interface LeadStoreState {
  isModalOpen: boolean;
  activeStep: number;
  formData: LeadFormData;
  isSubmitting: boolean;
  submitError: string | null;
  leadId: string | null;

  // Actions
  openModal: () => void;
  closeModal: () => void;
  nextStep: () => void;
  prevStep: () => void;
  updateField: (field: keyof LeadFormData, value: string) => void;
  resetForm: () => void;
  submitForm: () => Promise<boolean>;
}

const initialFormData: LeadFormData = {
  fullName: "",
  companyName: "",
  corporateEmail: "",
  phoneWhatsApp: "",
  businessType: "cadena_restaurantes",
  dailyVolume: "500_2000",
  currentERP: "oracle_micros",
  primaryBottleneck: "",
  source: "hero_cta",
};

export const useLeadStore = create<LeadStoreState>((set, get) => ({
  isModalOpen: false,
  activeStep: 1,
  formData: initialFormData,
  isSubmitting: false,
  submitError: null,
  leadId: null,

  openModal: () => set({ isModalOpen: true, submitError: null }),
  closeModal: () => set({ isModalOpen: false }),

  nextStep: () => {
    const { activeStep, formData } = get();
    if (activeStep === 1) {
      if (!formData.businessType || !formData.dailyVolume || !formData.currentERP) {
        set({ submitError: "Por favor completa los parámetros de tu operación" });
        return;
      }
      set({ activeStep: 2, submitError: null });
    }
  },

  prevStep: () => {
    const { activeStep } = get();
    if (activeStep > 1) {
      set({ activeStep: activeStep - 1, submitError: null });
    }
  },

  updateField: (field, value) => {
    set((state) => ({
      formData: { ...state.formData, [field]: value },
      submitError: null,
    }));
  },

  resetForm: () => {
    set({
      activeStep: 1,
      formData: initialFormData,
      isSubmitting: false,
      submitError: null,
      leadId: null,
    });
  },

  submitForm: async () => {
    const { formData } = get();

    // Client basic validation
    if (!formData.fullName.trim() || !formData.companyName.trim()) {
      set({ submitError: "Por favor ingresa tu nombre y empresa" });
      return false;
    }

    if (!formData.corporateEmail.includes("@") || !formData.corporateEmail.includes(".")) {
      set({ submitError: "Ingresa un correo electrónico corporativo válido" });
      return false;
    }

    if (formData.phoneWhatsApp.trim().length < 7) {
      set({ submitError: "Ingresa un número telefónico o WhatsApp de contacto" });
      return false;
    }

    set({ isSubmitting: true, submitError: null });

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error al registrar la solicitud");
      }

      set({
        isSubmitting: false,
        leadId: data.leadId || "IN-LEAD-2026",
        activeStep: 3,
      });

      return true;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error de conexión con el servidor";
      set({ isSubmitting: false, submitError: msg });
      return false;
    }
  },
}));
