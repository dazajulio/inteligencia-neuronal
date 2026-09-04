import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { sendAcademyWelcomeEmail, sendAdminSaleNotificationEmail } from "@/lib/resend/client";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const event = JSON.parse(rawBody);

    const eventName = event.meta?.event_name;
    const customData = event.meta?.custom_data || {};
    const attributes = event.data?.attributes || {};

    console.log(`[Lemon Squeezy Webhook] Evento recibido: ${eventName}`);

    // Manejar orden creada o suscripción creada
    if (eventName === "order_created" || eventName === "subscription_created") {
      const customerEmail = attributes.user_email?.trim().toLowerCase();
      const customerName = attributes.user_name || "Alumno";
      const courseTitle = attributes.first_order_item?.product_name || "Programa Oficial Academy";
      const courseId = attributes.first_order_item?.product_id?.toString() || "masterclass-ia-restaurantes";
      const totalUsd = attributes.total_formatted || attributes.total_usd || "$97 USD";
      const phone = customData.phone || "";
      const orderIdentifier = attributes.identifier || `LS-${event.data?.id || Date.now().toString().slice(-6)}`;
      const nowIso = new Date().toISOString();

      if (customerEmail) {
        const db = getSupabaseAdmin();

        // 1. Guardar en academy_orders
        try {
          await db.from("academy_orders").insert([
            {
              id: orderIdentifier,
              folio: orderIdentifier,
              customer_name: customerName,
              customer_email: customerEmail,
              customer_phone: phone || null,
              course_id: courseId,
              course_title: courseTitle,
              amount: totalUsd,
              currency: "USD",
              payment_method: "lemon_squeezy",
              reference_number: orderIdentifier,
              status: "ACTIVO",
              created_at: nowIso,
            },
          ]);
        } catch (ordErr) {
          console.warn("[Lemon Squeezy Orders Insert Warning]", ordErr);
        }

        // 2. Guardar / Activar matrícula en academy_enrollments
        try {
          await db.from("academy_enrollments").upsert({
            email: customerEmail,
            full_name: customerName,
            phone: phone || null,
            course_id: courseId,
            status: "active",
            created_at: nowIso,
          });

          // Actualizar lead status si existía en leads
          await db
            .from("leads")
            .update({ status: "Cerrado / Pagado" })
            .eq("corporate_email", customerEmail);
        } catch (dbErr) {
          console.warn("[Lemon Squeezy Supabase Enroll Warning]", dbErr);
        }

        // 3. Enviar correo de bienvenida al alumno con acceso directo al Campus
        try {
          const generatedTempPass = Math.random().toString(36).slice(-8) + "IN#";
          await sendAcademyWelcomeEmail({
            to: customerEmail,
            fullName: customerName,
            courseTitle: courseTitle,
            campusUrl: "https://inteligencianeuronal.com/academy/campus",
            temporaryPassword: generatedTempPass,
          });
        } catch (emailErr) {
          console.warn("[Lemon Squeezy Welcome Email Warning]", emailErr);
        }

        // 4. Enviar notificación inmediata de venta al administrador
        try {
          await sendAdminSaleNotificationEmail({
            folio: orderIdentifier,
            customerName: customerName,
            customerEmail: customerEmail,
            customerPhone: phone || "No especificado",
            courseTitle: courseTitle,
            amount: totalUsd,
            paymentMethod: "Lemon Squeezy (Tarjeta / USD)",
            referenceNumber: orderIdentifier,
            date: new Date().toLocaleString("es-ES", { timeZone: "America/Caracas" }),
            status: "ACTIVO",
          });
        } catch (adminErr) {
          console.warn("[Lemon Squeezy Admin Sale Alert Warning]", adminErr);
        }
      }
    }

    return NextResponse.json({ success: true, message: "Webhook processed" });
  } catch (error: any) {
    console.error("[Lemon Squeezy Webhook Error]", error);
    return NextResponse.json(
      { success: false, message: "Webhook handler error" },
      { status: 400 }
    );
  }
}

