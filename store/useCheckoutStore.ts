import { create } from "zustand";

export interface CheckoutCourse {
  id: string;
  title: string;
  price: string;
  priceAmount?: number;
  tagline?: string;
  duration?: string;
  badge?: string;
  lemonUrl?: string;
}

interface CheckoutStoreState {
  isCheckoutOpen: boolean;
  selectedCourse: CheckoutCourse | null;
  paymentMethod: "lemon" | "pagomovil";
  step: "form" | "pagomovil_instructions" | "success";
  
  // Form fields
  fullName: string;
  email: string;
  phone: string;
  referenceNumber: string;
  
  // Status
  isSubmitting: boolean;
  errorMessage: string | null;

  // Actions
  openCheckout: (course: CheckoutCourse) => void;
  closeCheckout: () => void;
  setPaymentMethod: (method: "lemon" | "pagomovil") => void;
  setFormField: (field: "fullName" | "email" | "phone" | "referenceNumber", value: string) => void;
  submitRegistration: () => Promise<boolean>;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStoreState>((set, get) => ({
  isCheckoutOpen: false,
  selectedCourse: null,
  paymentMethod: "lemon",
  step: "form",
  
  fullName: "",
  email: "",
  phone: "",
  referenceNumber: "",
  
  isSubmitting: false,
  errorMessage: null,

  openCheckout: (course) => {
    set({
      isCheckoutOpen: true,
      selectedCourse: course,
      step: "form",
      errorMessage: null,
    });
  },

  closeCheckout: () => {
    set({ isCheckoutOpen: false });
  },

  setPaymentMethod: (method) => {
    set({ paymentMethod: method });
  },

  setFormField: (field, value) => {
    set({ [field]: value, errorMessage: null });
  },

  reset: () => {
    set({
      isCheckoutOpen: false,
      selectedCourse: null,
      paymentMethod: "lemon",
      step: "form",
      fullName: "",
      email: "",
      phone: "",
      referenceNumber: "",
      isSubmitting: false,
      errorMessage: null,
    });
  },

  submitRegistration: async () => {
    const { fullName, email, phone, selectedCourse, paymentMethod, referenceNumber } = get();

    if (!fullName.trim()) {
      set({ errorMessage: "Por favor ingresa tu nombre completo" });
      return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
      set({ errorMessage: "Por favor ingresa un correo electrónico válido" });
      return false;
    }

    if (phone.trim().length < 7) {
      set({ errorMessage: "Por favor ingresa un número de teléfono o WhatsApp" });
      return false;
    }

    set({ isSubmitting: true, errorMessage: null });

    try {
      // 1. Guardar lead en la base de datos Supabase a través del endpoint
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: `Alumno: ${fullName}`,
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          companyName: `Inscripción: ${selectedCourse?.title || "Curso Academy"}`,
          businessSize: "Alumno Academy",
          serviceNeeded: `Inscripción Curso: ${selectedCourse?.title || "Curso"} (${selectedCourse?.price || ""}) - Vía ${paymentMethod === "lemon" ? "Lemon Squeezy (Tarjeta)" : "Pago Móvil (Bs.)"}`,
          currentChallenge: `Método de pago: ${paymentMethod.toUpperCase()} | Ref: ${referenceNumber || "Pendiente"}`,
          source: "academy_checkout",
        }),
      });

      const data = await res.json();

      if (!res.ok || data.success === false) {
        // En caso de que no sea fatal, continuamos con la experiencia de pago
        console.warn("[Lead capture warning]", data);
      }

      set({ isSubmitting: false });

      // 2. Transición según método de pago elegido
      if (paymentMethod === "lemon") {
        const baseLemonUrl =
          selectedCourse?.lemonUrl ||
          "https://inteligencia-neuronal.lemonsqueezy.com/checkout/buy/f1296f2f-a896-4fe3-87eb-0f8046fe1407";

        // Prellenar email y nombre en la URL de Lemon Squeezy
        const separator = baseLemonUrl.includes("?") ? "&" : "?";
        const prefilledUrl = `${baseLemonUrl}${separator}checkout[email]=${encodeURIComponent(
          email
        )}&checkout[name]=${encodeURIComponent(fullName)}&checkout[custom][phone]=${encodeURIComponent(phone)}`;

        window.location.href = prefilledUrl;
        return true;
      } else {
        // Pago Móvil: Pasar a la pantalla de instrucciones con QR y WhatsApp
        set({ step: "pagomovil_instructions" });
        return true;
      }
    } catch (err) {
      console.error("[Checkout submission error]", err);
      set({
        isSubmitting: false,
        errorMessage: "Hubo un problema al procesar el pre-registro. Por favor reintenta.",
      });
      return false;
    }
  },
}));
