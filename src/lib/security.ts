const DEFAULT_MAX_BODY_BYTES = 1024;

export function isAllowedOrigin(request: Request): boolean {
  const allowed = process.env.ALLOWED_ORIGINS;
  if (!allowed) return true;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  const allowedOrigins = allowed.split(",").map((o) => o.trim());
  return allowedOrigins.includes(origin);
}

export async function parseJsonBody(
  request: Request,
  maxBytes = DEFAULT_MAX_BODY_BYTES
): Promise<unknown | null> {
  const contentLength = request.headers.get("content-length");
  if (contentLength && Number(contentLength) > maxBytes) {
    return null;
  }

  const text = await request.text();
  if (text.length > maxBytes) return null;

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}
