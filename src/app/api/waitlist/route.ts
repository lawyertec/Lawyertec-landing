import { createSupabaseServerClient } from "@/lib/supabase";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { isAllowedOrigin, parseJsonBody } from "@/lib/security";
import {
  isHoneypotTripped,
  sanitizeEmail,
  sanitizeName,
  sanitizePracticeArea,
} from "@/lib/validation";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function jsonError(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json({ error: message }, { status, headers });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return jsonError("Solicitud no permitida.", 403);
  }

  const ip = getClientIp(request);
  const rate = checkRateLimit(`waitlist:${ip}`, 5, 60_000);

  if (!rate.allowed) {
    return jsonError("Demasiados intentos. Espera un momento.", 429, {
      "Retry-After": String(rate.retryAfter ?? 60),
    });
  }

  const body = await parseJsonBody(request);
  if (!body || typeof body !== "object") {
    return jsonError("Solicitud inválida.", 400);
  }

  const payload = body as Record<string, unknown>;

  if (isHoneypotTripped(payload.website)) {
    return NextResponse.json({ success: true });
  }

  const email = sanitizeEmail(payload.email);
  if (!email) {
    return jsonError("Ingresa un correo electrónico válido.", 400);
  }

  const name = sanitizeName(payload.name);

  const practiceArea = sanitizePracticeArea(payload.practiceArea);
  if (!practiceArea) {
    return jsonError("Selecciona un área de práctica.", 400);
  }

  const supabase = createSupabaseServerClient();
  if (!supabase) {
    return jsonError("El servicio no está configurado. Intenta más tarde.", 503);
  }

  const { error } = await supabase.from("waitlist").insert({
    email,
    name,
    practice_area: practiceArea,
  });

  if (error) {
    if (error.code === "23505") {
      return jsonError("Este correo ya está en la lista de espera.", 409);
    }

    console.error("Waitlist insert error:", error.code);
    return jsonError("No pudimos registrar tu correo. Intenta de nuevo.", 500);
  }

  return NextResponse.json({ success: true });
}

export async function GET() {
  return jsonError("Método no permitido.", 405);
}

export async function PUT() {
  return jsonError("Método no permitido.", 405);
}

export async function DELETE() {
  return jsonError("Método no permitido.", 405);
}

export async function PATCH() {
  return jsonError("Método no permitido.", 405);
}
