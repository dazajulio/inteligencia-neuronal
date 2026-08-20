import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { sendAcademyWelcomeEmail } from "@/lib/resend/client";

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
      const phone = customData.phone || "";

      if (customerEmail) {
        // 1. Guardar en Supabase
        try {
          const db = getSupabaseAdmin();
          await db.from("academy_enrollments").upsert({
            email: customerEmail,
            full_name: customerName,
            phone: phone || null,
            course_id: courseId,
            status: "active",
            created_at: new Date().toISOString(),
          });

          // Actualizar lead status si existía en leads
          await db
            .from("leads")
            .update({ status: "Cerrado / Pagado" })
            .eq("corporate_email", customerEmail);
        } catch (dbErr) {
          console.warn("[Lemon Squeezy Supabase Enroll Warning]", dbErr);
        }

        // 2. Enviar correo de bienvenida por Resend
        await sendAcademyWelcomeEmail({
          to: customerEmail,
          fullName: customerName,
          courseTitle: courseTitle,
          campusUrl: "https://inteligencianeuronal.com/academy/campus",
          whatsappVipUrl: "https://wa.me/584148817137?text=" + encodeURIComponent(`Hola Julio, acabo de pagar en Lemon Squeezy el curso ${courseTitle}.`),
        });
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
