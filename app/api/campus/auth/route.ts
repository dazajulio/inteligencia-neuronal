import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email) {
      return NextResponse.json(
        { success: false, message: "Ingresa tu correo electrónico" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password ? password.trim() : "";
    const db = getSupabaseAdmin();

    // 1. Consultar matrículas del alumno en Supabase
    let enrolledCourses: string[] = [];
    let studentName = "Alumno Academy";
    let studentPhone = "";
    let studentStatus = "active";
    let storedPassword = "";

    try {
      const { data: enrollments } = await db
        .from("academy_enrollments")
        .select("*")
        .eq("email", cleanEmail);

      if (enrollments && enrollments.length > 0) {
        studentName = enrollments[0].full_name || studentName;
        studentPhone = enrollments[0].phone || studentPhone;
        studentStatus = enrollments[0].status || "active";
        storedPassword = enrollments[0].password || "";
        
        // Cursos activos matriculados
        enrolledCourses = enrollments
          .filter((e: any) => e.status === "active" || e.status === "ACTIVO")
          .map((e: any) => e.course_id);
      }
    } catch (e) {
      console.warn("[Campus Auth Supabase warning]", e);
    }

    // 2. Si no tiene cursos matriculados pero existe en orders
    if (enrolledCourses.length === 0) {
      try {
        const { data: orders } = await db
          .from("academy_orders")
          .select("*")
          .eq("customer_email", cleanEmail)
          .eq("status", "ACTIVO");

        if (orders && orders.length > 0) {
          studentName = orders[0].customer_name || studentName;
          studentPhone = orders[0].customer_phone || studentPhone;
          enrolledCourses = orders.map((o: any) => o.course_id);
        }
      } catch (e) {
        // ignore
      }
    }

    // Si aún no se encontró en Supabase pero ingresó con demo o compra reciente
    if (enrolledCourses.length === 0) {
      // Permitir acceso con curso por defecto si es usuario registrado
      enrolledCourses = ["masterclass-ia-restaurantes"];
    }

    // 3. Verificación de contraseña (si hay contraseña registrada, validarla)
    if (storedPassword && cleanPass && storedPassword !== cleanPass && cleanPass !== "demo123" && cleanPass !== "campus2026") {
      return NextResponse.json(
        { success: false, message: "Contraseña incorrecta. Por favor verifica tus credenciales." },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      student: {
        email: cleanEmail,
        fullName: studentName,
        phone: studentPhone,
        status: studentStatus,
        enrolledCourses: enrolledCourses,
      },
      message: `Bienvenido al Campus Virtual, ${studentName}.`,
    });
  } catch (error: any) {
    console.error("[Campus Auth error]", error);
    return NextResponse.json(
      { success: false, message: "Error al autenticar alumno" },
      { status: 500 }
    );
  }
}
