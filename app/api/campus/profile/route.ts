import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, fullName, phone, password } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email es requerido para actualizar perfil" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const db = getSupabaseAdmin();
    const updatePayload: Record<string, any> = {};

    if (fullName && fullName.trim()) updatePayload.full_name = fullName.trim();
    if (phone && phone.trim()) updatePayload.phone = phone.trim();
    if (password && password.trim()) updatePayload.password = password.trim();

    try {
      await db
        .from("academy_enrollments")
        .update(updatePayload)
        .eq("email", cleanEmail);

      await db
        .from("academy_orders")
        .update({ customer_name: fullName.trim() })
        .eq("customer_email", cleanEmail);
    } catch (dbErr) {
      console.warn("[Profile Update Supabase warning]", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: "¡Datos de tu cuenta actualizados exitosamente!",
    });
  } catch (error: any) {
    console.error("[Campus Profile error]", error);
    return NextResponse.json(
      { success: false, message: "Error al actualizar perfil" },
      { status: 500 }
    );
  }
}
