import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getSupabaseAdmin();
    const { data: courses, error } = await db
      .from("courses")
      .select(`
        *,
        course_modules (
          id,
          week_label,
          title,
          description,
          order_index,
          video_url,
          summary,
          content_text,
          prompts,
          downloads,
          quiz_data
        )
      `)
      .order("order_index", { ascending: true });

    if (error) {
      console.error("[GET /api/courses Supabase Error]", error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    const formatted = (courses || []).map((c) => {
      const toolsObj = typeof c.tools === "object" && !Array.isArray(c.tools) && c.tools !== null ? c.tools : {};
      const toolsArray = Array.isArray(c.tools) ? c.tools : (toolsObj.stack || []);

      return {
        ...c,
        tools: toolsArray,
        stack: toolsArray,
        commercial: toolsObj,
        learning_outcomes: toolsObj.outcomes || [],
        course_includes: toolsObj.includes || [],
        requirements: toolsObj.requirements || [],
        target_audience: toolsObj.audience || [],
        instructor: toolsObj.instructor || {
          name: "Julio Daza",
          role: "Arquitecto de Sistemas & Fundador",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
        },
        original_price: toolsObj.original_price || `$${(Number(c.price_usd) || 97) * 2} USD`,
        discount: toolsObj.discount || "50% OFF",
        rating: Number(toolsObj.rating) || 4.9,
        reviews_count: Number(toolsObj.reviews_count) || (c.students_enrolled ? Math.round(c.students_enrolled * 0.4) : 0),
        hours_video: toolsObj.hours_video || "12 horas de video bajo demanda",
        articles_count: toolsObj.articles_count || 20,
        resources_count: toolsObj.resources_count || 25,
        last_updated: toolsObj.last_updated || "8/2026",
        language: toolsObj.language || "Español",
        modules: (c.course_modules || []).sort((a: any, b: any) => (a.order_index || 0) - (b.order_index || 0)),
      };
    });

    return NextResponse.json({ success: true, courses: formatted });
  } catch (err: any) {
    console.error("[GET /api/courses Error]", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

function buildToolsPayload(body: any, existingToolsRaw?: any) {
  const existingTools = typeof existingToolsRaw === "object" && !Array.isArray(existingToolsRaw) && existingToolsRaw !== null ? { ...existingToolsRaw } : {};
  const bodyTools = typeof body.tools === "object" && !Array.isArray(body.tools) && body.tools !== null ? { ...body.tools } : {};

  const stack = Array.isArray(body.tools)
    ? body.tools
    : typeof body.tools === "string"
    ? body.tools.split(",").map((t: string) => t.trim()).filter(Boolean)
    : (bodyTools.stack || existingTools.stack || ["IA", "Automatización"]);

  return {
    ...existingTools,
    ...bodyTools,
    stack,
    outcomes: body.learning_outcomes || body.outcomes || bodyTools.outcomes || existingTools.outcomes || [],
    includes: body.course_includes || body.includes || bodyTools.includes || existingTools.includes || [],
    requirements: body.requirements || bodyTools.requirements || existingTools.requirements || [],
    audience: body.target_audience || body.audience || bodyTools.audience || existingTools.audience || [],
    instructor: body.instructor || bodyTools.instructor || existingTools.instructor || {
      name: "Julio Daza",
      role: "Arquitecto de Sistemas & Fundador",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
    original_price: body.original_price || bodyTools.original_price || existingTools.original_price || `$${(Number(body.price_usd) || 97) * 2} USD`,
    discount: body.discount || bodyTools.discount || existingTools.discount || "50% OFF",
    rating: body.rating !== undefined ? Number(body.rating) : (bodyTools.rating || existingTools.rating || 4.9),
    reviews_count: body.reviews_count !== undefined ? Number(body.reviews_count) : (bodyTools.reviews_count || existingTools.reviews_count || 0),
    hours_video: body.hours_video || bodyTools.hours_video || existingTools.hours_video || "12 horas de video bajo demanda",
    articles_count: body.articles_count !== undefined ? Number(body.articles_count) : (bodyTools.articles_count || existingTools.articles_count || 20),
    resources_count: body.resources_count !== undefined ? Number(body.resources_count) : (bodyTools.resources_count || existingTools.resources_count || 25),
    last_updated: body.last_updated || bodyTools.last_updated || existingTools.last_updated || "8/2026",
    language: body.language || bodyTools.language || existingTools.language || "Español",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = getSupabaseAdmin();

    const rawId = body.id || `course-${Date.now()}`;
    const id = rawId.replace(/^course-/, "");
    const slug = body.slug || id;

    const { data: newCourse, error } = await db
      .from("courses")
      .insert([
        {
          id,
          slug,
          title: body.title,
          badge: body.badge || "NUEVO",
          level: body.level || "Intermedio",
          tagline: body.tagline || "",
          description: body.description || "",
          duration: body.duration || "4 Módulos Intensivos",
          price_usd: Number(body.price_usd) || 97.0,
          price_display: body.price_display || `$${body.price_usd || 97} USD`,
          preview_image: body.preview_image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
          stripe_color: body.stripe_color || "from-[#EA0C7F] via-[#971B8D] to-[#6366f1]",
          tools: buildToolsPayload(body),
          cta_url: body.cta_url || "#",
          status: body.status || "ACTIVO",
          students_enrolled: Number(body.students_enrolled) || 0,
          order_index: Number(body.order_index) || 0,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    if (body.modules && Array.isArray(body.modules)) {
      const moduleInserts = body.modules.map((m: any, idx: number) => ({
        course_id: id,
        week_label: m.week_label || m.week || `0${idx + 1}`,
        title: m.title || `Módulo ${idx + 1}`,
        description: m.description || m.desc || "",
        video_url: m.video_url || m.videoUrl || "",
        summary: m.summary || m.description || "",
        content_text: m.content_text || "",
        prompts: Array.isArray(m.prompts) ? m.prompts : [],
        downloads: Array.isArray(m.downloads) ? m.downloads : [],
        quiz_data: m.quiz_data || m.quiz || { enabled: false, passing_score: 80, questions: [] },
        order_index: idx + 1,
      }));

      await db.from("course_modules").insert(moduleInserts);
    }

    return NextResponse.json({ success: true, course: newCourse }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, message: "ID del curso requerido" }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const id = body.id;
    const cleanId = id.replace(/^course-/, "");

    const updatePayload: any = {
      title: body.title,
      badge: body.badge,
      level: body.level,
      tagline: body.tagline,
      description: body.description,
      duration: body.duration,
      preview_image: body.preview_image || body.previewImage,
      stripe_color: body.stripe_color || body.stripeColor,
      cta_url: body.cta_url || body.ctaUrl,
      status: body.status,
    };

    if (body.price_display) updatePayload.price_display = body.price_display;
    if (body.price_usd !== undefined) updatePayload.price_usd = Number(body.price_usd);
    if (body.students_enrolled !== undefined) updatePayload.students_enrolled = Number(body.students_enrolled);
    if (body.order_index !== undefined) updatePayload.order_index = Number(body.order_index);

    // Fetch existing tools to preserve nested commercial metadata if not provided
    const { data: existingCourse } = await db.from("courses").select("tools").or(`id.eq.${id},id.eq.${cleanId},slug.eq.${id},slug.eq.${cleanId}`).maybeSingle();
    updatePayload.tools = buildToolsPayload(body, existingCourse?.tools);

    const { data: updatedCourse, error } = await db
      .from("courses")
      .update(updatePayload)
      .or(`id.eq.${id},id.eq.${cleanId},slug.eq.${id},slug.eq.${cleanId}`)
      .select();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    // Si se enviaron módulos para actualizar
    if (body.modules && Array.isArray(body.modules)) {
      await db.from("course_modules").delete().or(`course_id.eq.${id},course_id.eq.${cleanId}`);
      
      const moduleInserts = body.modules.map((m: any, idx: number) => ({
        course_id: cleanId,
        week_label: m.week_label || m.week || `0${idx + 1}`,
        title: m.title || `Módulo ${idx + 1}`,
        description: m.description || m.desc || "",
        video_url: m.video_url || m.videoUrl || "",
        summary: m.summary || m.description || "",
        content_text: m.content_text || "",
        prompts: Array.isArray(m.prompts) ? m.prompts : [],
        downloads: Array.isArray(m.downloads) ? m.downloads : [],
        quiz_data: m.quiz_data || m.quiz || { enabled: false, passing_score: 80, questions: [] },
        order_index: idx + 1,
      }));

      await db.from("course_modules").insert(moduleInserts);
    }

    return NextResponse.json({ success: true, course: updatedCourse?.[0] });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID requerido para eliminar" }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const cleanId = id.replace(/^course-/, "");

    const { error } = await db
      .from("courses")
      .delete()
      .or(`id.eq.${id},id.eq.${cleanId},slug.eq.${id},slug.eq.${cleanId}`);

    if (error) {
      console.error("[DELETE /api/courses Error]", error);
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Curso eliminado con éxito de Supabase" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
