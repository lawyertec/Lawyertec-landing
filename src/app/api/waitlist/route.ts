import { createSupabaseServerClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Ingresa un correo electrónico válido." },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();

    if (!supabase) {
      return NextResponse.json(
        { error: "El servicio no está configurado. Intenta más tarde." },
        { status: 503 }
      );
    }

    const { error } = await supabase.from("waitlist").insert({
      email,
      name: name || null,
    });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Este correo ya está en la lista de espera." },
          { status: 409 }
        );
      }

      console.error("Waitlist insert error:", error);
      return NextResponse.json(
        { error: "No pudimos registrar tu correo. Intenta de nuevo." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Ocurrió un error inesperado." },
      { status: 500 }
    );
  }
}
