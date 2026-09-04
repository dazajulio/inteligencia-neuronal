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
  originBank: string;
  paymentDate: string;
  paidAmountBs: string;
  bcvRate: number;
  isFetchingBcv: boolean;
  
  // Status
  isSubmitting: boolean;
  errorMessage: string | null;

  // Actions
  openCheckout: (course: CheckoutCourse) => void;
  closeCheckout: () => void;
  setPaymentMethod: (method: "lemon" | "pagomovil") => void;
  setFormField: (field: "fullName" | "email" | "phone" | "referenceNumber" | "originBank" | "paymentDate" | "paidAmountBs", value: string) => void;
  fetchBcvRate: () => Promise<void>;
  submitRegistration: () => Promise<boolean>;
  confirmPagoMovil: () => Promise<boolean>;
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
  originBank: "Banesco",
  paymentDate: new Date().toISOString().split("T")[0],
  paidAmountBs: "",
  bcvRate: 40.50,
  isFetchingBcv: false,
  
  isSubmitting: false,
  errorMessage: null,

  fetchBcvRate: async () => {
    try {
      set({ isFetchingBcv: true });
      const res = await fetch("/api/bcv");
      const data = await res.json();
      if (data.success && data.rate) {
        set({ bcvRate: data.rate });
      }
    } catch (e) {
      console.warn("[Fetch BCV Rate warning]", e);
    } finally {
      set({ isFetchingBcv: false });
    }
  },

  openCheckout: (course) => {
    get().fetchBcvRate();
    set({
      isCheckoutOpen: true,
      selectedCourse: course,
      step: "form",
      errorMessage: null,
      paymentDate: new Date().toISOString().split("T")[0],
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
        // Pago Móvil: Pasar a la pantalla de coordenadas con confirmación directa
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

  confirmPagoMovil: async () => {
    const {
      fullName,
      email,
      phone,
      referenceNumber,
      originBank,
      paymentDate,
      paidAmountBs,
      bcvRate,
      selectedCourse,
    } = get();

    if (!fullName.trim() || !email.includes("@")) {
      set({ errorMessage: "Faltan datos de contacto del alumno." });
      return false;
    }

    if (!referenceNumber.trim()) {
      set({ errorMessage: "Por favor ingresa el número de referencia del pago." });
      return false;
    }

    set({ isSubmitting: true, errorMessage: null });

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = fullName.trim();
      const cleanRef = referenceNumber.trim();

      // Calcular monto en Bs. si no está seteado
      const numPrice = parseFloat((selectedCourse?.price || "97").replace(/[^0-9.]/g, "")) || 97;
      const calculatedBs = paidAmountBs || `Bs. ${(numPrice * bcvRate).toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      // 1. Registrar venta y matrícula automática en /api/orders
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: cleanName,
          customerEmail: cleanEmail,
          customerPhone: phone.trim(),
          courseId: selectedCourse?.id || "masterclass-ia-restaurantes",
          courseTitle: selectedCourse?.title || "Programa Oficial Academy",
          amount: selectedCourse?.price || "$97 USD",
          amountBs: calculatedBs,
          bcvRate: `Bs. ${bcvRate.toFixed(2)}`,
          originBank: originBank || "Banesco",
          paymentDate: paymentDate || new Date().toISOString().split("T")[0],
          currency: "USD",
          paymentMethod: "pagomovil",
          referenceNumber: cleanRef,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Error al procesar la orden");
      }

      // 2. Establecer sesión del alumno en localStorage para acceso inmediato
      if (typeof window !== "undefined") {
        localStorage.setItem("in_student_email", cleanEmail);
        localStorage.setItem("in_student_name", cleanName);
        localStorage.setItem("in_enrolled_course", selectedCourse?.id || "masterclass-ia-restaurantes");
        if (data.temporaryPassword) {
          localStorage.setItem("in_student_temp_pass", data.temporaryPassword);
        }
      }

      set({ isSubmitting: false, isCheckoutOpen: false });

      // 3. Redirección instantánea al Campus Virtual
      const campusRedirect = data.redirectUrl || `/academy/campus?email=${encodeURIComponent(cleanEmail)}`;
      window.location.href = campusRedirect;
      return true;
    } catch (err: any) {
      console.error("[Confirm Pago Movil Error]", err);
      set({
        isSubmitting: false,
        errorMessage: err.message || "Error al confirmar el registro de Pago Móvil.",
      });
      return false;
    }
  },
}));


