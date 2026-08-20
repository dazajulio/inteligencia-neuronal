import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getSupabaseAdmin();
    const { data: resources, error } = await db
      .from("academy_resources")
      .select("*")
      .order("order_index", { ascending: true });

    if (error) {
      console.error("[GET /api/resources Supabase Error]", error);
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, resources: resources || [] });
  } catch (err: any) {
    console.error("[GET /api/resources Error]", err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = getSupabaseAdmin();

    const rawId = body.id || `res-${Date.now()}`;
    const id = rawId.replace(/^res-/, "");
    const slug = body.slug || id;

    const { data: newResource, error } = await db
      .from("academy_resources")
      .insert([
        {
          id,
          slug,
          title: body.title || body.name,
          description: body.description || "",
          tag: (body.tag || "RECURSO").toUpperCase(),
          format: body.format || "PDF / Guía",
          preview_image: body.preview_image || body.previewImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
          stripe_color: body.stripe_color || body.stripeColor || "from-[#1DACE3] to-[#0284c7]",
          file_url: body.file_url || body.fileUrl || "#",
          access_type: body.access_type || body.access || "GRATUITO (LEAD)",
          downloads_count: Number(body.downloads_count || body.downloads) || 0,
          is_active: body.is_active !== undefined ? body.is_active : true,
          order_index: Number(body.order_index) || 0,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, resource: newResource }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ success: false, message: "ID del recurso requerido" }, { status: 400 });
    }

    const db = getSupabaseAdmin();
    const id = body.id;
    const cleanId = id.replace(/^res-/, "");

    const updatePayload: any = {
      title: body.title || body.name,
      description: body.description,
      format: body.format,
      tag: body.tag ? body.tag.toUpperCase() : undefined,
      preview_image: body.preview_image || body.previewImage,
      stripe_color: body.stripe_color || body.stripeColor,
      file_url: body.file_url || body.fileUrl,
      access_type: body.access_type || body.access,
      is_active: body.is_active,
    };

    if (body.downloads_count !== undefined) updatePayload.downloads_count = Number(body.downloads_count);
    if (body.downloads !== undefined) updatePayload.downloads_count = Number(body.downloads);
    if (body.order_index !== undefined) updatePayload.order_index = Number(body.order_index);

    const { data: updatedResource, error } = await db
      .from("academy_resources")
      .update(updatePayload)
      .or(`id.eq.${id},id.eq.${cleanId},slug.eq.${id},slug.eq.${cleanId}`)
      .select();

    if (error) {
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, resource: updatedResource?.[0] });
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
    const cleanId = id.replace(/^res-/, "");

    const { error } = await db
      .from("academy_resources")
      .delete()
      .or(`id.eq.${id},id.eq.${cleanId},slug.eq.${id},slug.eq.${cleanId}`);

    if (error) {
      console.error("[DELETE /api/resources Error]", error);
      return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Recurso eliminado con éxito de Supabase" });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
