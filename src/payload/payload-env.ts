import { getSiteUrl } from "../lib/site";

export function requireProductionEnv(name: string, value: string | undefined): string {
  const trimmed = value?.trim();
  if (trimmed) return trimmed;

  // GitHub Actions compile check — no secrets/DB (Vercel deploy sets VERCEL=1 and real env vars).
  if (process.env.CI === "true" && !process.env.VERCEL) {
    if (name === "PAYLOAD_SECRET") {
      return "ci-build-only-do-not-use-in-production-min-32-chars";
    }
    return "";
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return "";
}

export function getPayloadServerURL(): string {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");
  return getSiteUrl();
}

/** Origins allowed for Payload CORS and CSRF cookie validation. */
export function getPayloadAllowedOrigins(): string[] {
  const origins = new Set<string>();

  const add = (url: string | undefined) => {
    const normalized = url?.trim().replace(/\/+$/, "");
    if (normalized) origins.add(normalized);
  };

  add(getSiteUrl());
  add(process.env.NEXT_PUBLIC_SERVER_URL);

  if (process.env.ALLOWED_ORIGINS?.trim()) {
    for (const origin of process.env.ALLOWED_ORIGINS.split(",")) {
      add(origin);
    }
  }

  if (process.env.VERCEL_URL?.trim()) {
    add(`https://${process.env.VERCEL_URL.trim()}`);
  }

  if (process.env.NODE_ENV !== "production") {
    add("http://127.0.0.1:3000");
    add("http://localhost:3000");
  }

  return [...origins];
}
