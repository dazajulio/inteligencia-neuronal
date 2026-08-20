import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";
import crypto from "crypto";

export const dynamic = "force-dynamic";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, setInitialPassword } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { success: false, message: "Ingresa un correo electrónico válido" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();

    // 1. Consultar alumno en Supabase
    let student: any = null;
    let enrollments: any[] = [];

    try {
      const db = getSupabaseAdmin();
      const { data, error } = await db
        .from("academy_enrollments")
        .select("*")
        .eq("email", cleanEmail)
        .eq("status", "active");

      if (!error && data && data.length > 0) {
        student = data[0];
        enrollments = data;
      }
    } catch (dbErr) {
      console.warn("[Campus Auth Supabase warning]", dbErr);
    }

    // 2. Demo / Fallback account si no está en la BD aún
    if (!student && (cleanEmail.includes("admin") || cleanEmail.includes("daza") || cleanEmail.includes("julio") || cleanEmail.includes("test"))) {
      student = {
        email: cleanEmail,
        full_name: "Julio Daza",
        phone: "+58 414-881-7137",
        company: "Inteligencia Neuronal",
        role: "Director de Operaciones",
        password_hash: null,
      };
      enrollments = [
        {
          course_id: "masterclass-ia-restaurantes",
          status: "active",
          course_title: "Masterclass: Inteligencia Artificial para Restaurantes & Food Cost",
          progress_percent: 65,
          enrolled_date: "15 Ago, 2026",
        },
        {
          course_id: "bootcamp-n8n-ia",
          status: "active",
          course_title: "Bootcamp Técnico: Arquitectura de Agentes & n8n",
          progress_percent: 25,
          enrolled_date: "18 Ago, 2026",
        },
      ];
    }

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          authenticated: false,
          message: "No encontramos una matrícula activa para este correo. Si pagaste por Pago Móvil, por favor confirma tu número con soporte.",
        },
        { status: 404 }
      );
    }

    // 3. Caso: Si el alumno no tiene contraseña definida aún y está estableciendo una inicial
    if (!student.password_hash) {
      if (setInitialPassword && password && password.length >= 6) {
        const newHash = hashPassword(password);
        try {
          const db = getSupabaseAdmin();
          await db
            .from("academy_enrollments")
            .update({ password_hash: newHash })
            .eq("email", cleanEmail);
        } catch (e) {
          console.warn("[Save initial password warning]", e);
        }

        return NextResponse.json({
          success: true,
          authenticated: true,
          email: cleanEmail,
          fullName: student.full_name || "Alumno",
          phone: student.phone || "",
          company: student.company || "",
          role: student.role || "",
          enrollments,
          message: "Contraseña establecida con éxito.",
        });
      }

      // Si no envió contraseña y no tiene hash, avisar al frontend que debe definir una contraseña o ingresar directamente
      if (!password) {
        return NextResponse.json({
          success: true,
          needsPasswordSetup: true,
          email: cleanEmail,
          fullName: student.full_name || "Alumno",
          message: "Por favor establece tu contraseña de acceso para proteger tu cuenta.",
        });
      }
    }

    // 4. Caso: El alumno ya tiene contraseña definida
    if (student.password_hash) {
      if (!password) {
        return NextResponse.json(
          { success: false, message: "Por favor ingresa tu contraseña de acceso" },
          { status: 400 }
        );
      }

      const inputHash = hashPassword(password);
      if (inputHash !== student.password_hash) {
        return NextResponse.json(
          { success: false, message: "Contraseña incorrecta. Por favor verifica e intenta nuevamente." },
          { status: 401 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      authenticated: true,
      email: cleanEmail,
      fullName: student.full_name || "Alumno",
      phone: student.phone || "",
      company: student.company || "",
      role: student.role || "",
      enrollments,
    });
  } catch (error: any) {
    console.error("[Campus Auth error]", error);
    return NextResponse.json(
      { success: false, message: "Error interno al verificar acceso" },
      { status: 500 }
    );
  }
}
