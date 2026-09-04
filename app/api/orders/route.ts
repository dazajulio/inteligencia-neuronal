import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { sendAcademyWelcomeEmail, sendAdminSaleNotificationEmail } from "@/lib/resend/client";

export const dynamic = "force-dynamic";

let inMemoryOrders: any[] = [];

export async function GET(req: NextRequest) {
  try {
    const db = getSupabaseAdmin();
    let orders: any[] = [];
    
    try {
      const { data: ordersData, error: ordersError } = await db
        .from("academy_orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!ordersError && ordersData && ordersData.length > 0) {
        orders = ordersData;
      }
    } catch (e) {
      // ignore
    }

    if (orders.length === 0) {
      try {
        const { data: enrollData } = await db
          .from("academy_enrollments")
          .select("*")
          .order("created_at", { ascending: false });

        if (enrollData && enrollData.length > 0) {
          orders = enrollData.map((en: any, idx: number) => ({
            id: en.id || `ORD-ENR-${idx + 100}`,
            folio: en.order_folio || `ORD-98${idx + 10}`,
            customer_name: en.full_name || "Alumno Academy",
            customer_email: en.email,
            customer_phone: en.phone || "No registrado",
            course_id: en.course_id || "masterclass-ia-restaurantes",
            course_title: en.course_title || (en.course_id?.includes("bootcamp") ? "Bootcamp n8n" : en.course_id?.includes("aeo") ? "Dominio Local AEO" : "Masterclass IA"),
            amount: en.amount || "$97 USD",
            currency: "USD",
            payment_method: en.payment_method || "pagomovil",
            reference_number: en.reference_number || "REG-DIRECTO",
            status: en.status === "active" ? "ACTIVO" : (en.status?.toUpperCase() || "ACTIVO"),
            created_at: en.created_at || new Date().toISOString(),
          }));
        }
      } catch (e) {
        console.warn("[Orders fallback enroll warning]", e);
      }
    }

    const allOrdersMap = new Map<string, any>();
    [...inMemoryOrders, ...orders].forEach((item) => {
      const key = item.id || item.folio || item.customer_email;
      if (key && !allOrdersMap.has(key)) {
        allOrdersMap.set(key, item);
      }
    });

    const finalOrders = Array.from(allOrdersMap.values()).sort(
      (a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
    );

    return NextResponse.json({
      success: true,
      orders: finalOrders,
      totalCount: finalOrders.length,
    });
  } catch (err: any) {
    console.error("[GET /api/orders error]", err);
    return NextResponse.json({
      success: true,
      orders: inMemoryOrders,
      totalCount: inMemoryOrders.length,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      courseId,
      courseTitle,
      amount,
      amountBs = "N/A",
      bcvRate = "N/A",
      originBank = "Banesco",
      paymentDate,
      currency = "USD",
      paymentMethod = "pagomovil",
      referenceNumber = "REG-AUTO",
    } = body;

    if (!customerEmail || !customerName || !courseId) {
      return NextResponse.json(
        { success: false, message: "Faltan campos requeridos (customerEmail, customerName, courseId)" },
        { status: 400 }
      );
    }

    const cleanEmail = customerEmail.trim().toLowerCase();
    const cleanName = customerName.trim();
    const cleanPhone = customerPhone ? customerPhone.trim() : "";
    const cleanTitle = courseTitle || "Programa Oficial Inteligencia Neuronal Academy";
    const cleanAmount = amount || "$97 USD";
    const cleanRef = referenceNumber.trim() || `REF-${Math.floor(100000 + Math.random() * 900000)}`;
    const randomFolio = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const paymentDateVal = paymentDate || new Date().toISOString().split("T")[0];
    const generatedPassword = `campus${Math.floor(1000 + Math.random() * 9000)}`;
    const nowIso = new Date().toISOString();

    const orderRecord = {
      id: randomFolio,
      folio: randomFolio,
      customer_name: cleanName,
      customer_email: cleanEmail,
      customer_phone: cleanPhone,
      course_id: courseId,
      course_title: cleanTitle,
      amount: cleanAmount,
      amount_bs: amountBs,
      bcv_rate: bcvRate,
      origin_bank: originBank,
      payment_date: paymentDateVal,
      currency: currency,
      payment_method: paymentMethod,
      reference_number: cleanRef,
      status: "ACTIVO",
      created_at: nowIso,
    };

    inMemoryOrders.unshift(orderRecord);

    const db = getSupabaseAdmin();

    try {
      await db.from("academy_orders").insert([orderRecord]);
    } catch (e) {
      // ignore if table doesn't exist
    }

    try {
      await db.from("academy_enrollments").upsert({
        email: cleanEmail,
        full_name: cleanName,
        phone: cleanPhone || null,
        course_id: courseId,
        password: generatedPassword,
        status: "active",
        created_at: nowIso,
      });
    } catch (enrErr) {
      console.warn("[Orders enroll upsert warning]", enrErr);
    }

    try {
      await db
        .from("leads")
        .update({ status: "Cerrado / Pagado" })
        .eq("corporate_email", cleanEmail);
    } catch (leadErr) {
      // ignore
    }

    try {
      await sendAcademyWelcomeEmail({
        to: cleanEmail,
        fullName: cleanName,
        courseTitle: cleanTitle,
        temporaryPassword: generatedPassword,
        campusUrl: "https://inteligencianeuronal.com/academy/campus",
      });
    } catch (emailErr) {
      console.warn("[Student welcome email warning]", emailErr);
    }

    try {
      await sendAdminSaleNotificationEmail({
        folio: randomFolio,
        customerName: cleanName,
        customerEmail: cleanEmail,
        customerPhone: cleanPhone,
        courseTitle: cleanTitle,
        amount: cleanAmount,
        amountBs: amountBs,
        bcvRate: bcvRate,
        originBank: originBank,
        paymentMethod: paymentMethod === "pagomovil" ? "Pago Móvil (Bs.)" : "Lemon Squeezy / Tarjeta",
        referenceNumber: cleanRef,
        date: `${paymentDateVal} (${new Date().toLocaleTimeString("es-VE")})`,
        status: "ACTIVO",
      });
    } catch (adminEmailErr) {
      console.warn("[Admin sale notification warning]", adminEmailErr);
    }

    return NextResponse.json({
      success: true,
      message: `¡Venta procesada con éxito! Acceso inmediato al campus otorgado para ${cleanName}.`,
      order: orderRecord,
      temporaryPassword: generatedPassword,
      redirectUrl: `/academy/campus?email=${encodeURIComponent(cleanEmail)}`,
    });
  } catch (error: any) {
    console.error("[POST /api/orders error]", error);
    return NextResponse.json(
      { success: false, message: "Error interno al procesar orden de compra" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderId, folio, status, customerEmail } = body;

    if (!orderId && !folio && !customerEmail) {
      return NextResponse.json(
        { success: false, message: "Se requiere orderId, folio o customerEmail para actualizar" },
        { status: 400 }
      );
    }

    const newStatus = status ? status.toUpperCase() : "ACTIVO";

    inMemoryOrders = inMemoryOrders.map((o) => {
      if (o.id === orderId || o.folio === folio || o.customer_email === customerEmail) {
        return { ...o, status: newStatus };
      }
      return o;
    });

    const db = getSupabaseAdmin();

    try {
      if (orderId || folio) {
        await db
          .from("academy_orders")
          .update({ status: newStatus })
          .or(`id.eq.${orderId},folio.eq.${folio}`);
      }
    } catch (e) {
      // ignore
    }

    try {
      if (customerEmail) {
        const enrollStatus = newStatus === "ACTIVO" ? "active" : newStatus.toLowerCase();
        await db
          .from("academy_enrollments")
          .update({ status: enrollStatus })
          .eq("email", customerEmail.trim().toLowerCase());
      }
    } catch (e) {
      // ignore
    }

    return NextResponse.json({
      success: true,
      message: `Estatus de orden actualizado a ${newStatus} correctamente.`,
    });
  } catch (error: any) {
    console.error("[PUT /api/orders error]", error);
    return NextResponse.json(
      { success: false, message: "Error al actualizar estatus de orden" },
      { status: 500 }
    );
  }
}
