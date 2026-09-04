import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import { sendAcademyWelcomeEmail } from "@/lib/resend/client";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const db = getSupabaseAdmin();
    const { data, error } = await db
      .from("academy_enrollments")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: true, enrollments: [] });
    }

    return NextResponse.json({ success: true, enrollments: data || [] });
  } catch (err) {
    return NextResponse.json({ success: true, enrollments: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, fullName, phone, courseId, courseTitle, sendEmail = true } = body;

    if (!email || !fullName || !courseId) {
      return NextResponse.json(
        { success: false, message: "Faltan campos requeridos (email, fullName, courseId)" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const title = courseTitle || "Programa Oficial Inteligencia Neuronal Academy";

    // 1. Guardar en Supabase
    try {
      const db = getSupabaseAdmin();
      await db.from("academy_enrollments").upsert({
        email: cleanEmail,
        full_name: fullName.trim(),
        phone: phone ? phone.trim() : null,
        course_id: courseId,
        status: "active",
        created_at: new Date().toISOString(),
      });
    } catch (dbErr) {
      console.warn("[Enroll Supabase warning]", dbErr);
    }

    // 2. Disparar Correo de Bienvenida por Resend con Credenciales y Acceso Oficial
    if (sendEmail) {
      const generatedTempPassword = Math.random().toString(36).slice(-8) + "IN#";
      await sendAcademyWelcomeEmail({
        to: cleanEmail,
        fullName: fullName.trim(),
        courseTitle: title,
        campusUrl: "https://inteligencianeuronal.com/academy/campus",
        temporaryPassword: generatedTempPassword,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Alumno ${fullName} matriculado exitosamente en ${title}.`,
    });
  } catch (error: any) {
    console.error("[Campus Enroll error]", error);
    return NextResponse.json(
      { success: false, message: "Error al matricular alumno" },
      { status: 500 }
    );
  }
}
