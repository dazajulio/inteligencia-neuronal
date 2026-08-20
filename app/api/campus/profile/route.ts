import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export async function PUT(req: NextRequest) {
  try {
    const { email, fullName, phone, company, role } = await req.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Email es requerido" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    try {
      const db = getSupabaseAdmin();
      await db
        .from("academy_enrollments")
        .update({
          full_name: fullName?.trim(),
          phone: phone?.trim(),
          company: company?.trim(),
          role: role?.trim(),
        })
        .eq("email", cleanEmail);
    } catch (e) {
      console.warn("[Profile update Supabase warning]", e);
    }

    return NextResponse.json({
      success: true,
      message: "Perfil actualizado con éxito.",
      profile: { email: cleanEmail, fullName, phone, company, role },
    });
  } catch (error: any) {
    console.error("[Profile Update Error]", error);
    return NextResponse.json(
      { success: false, message: "Error al actualizar el perfil" },
      { status: 500 }
    );
  }
}
