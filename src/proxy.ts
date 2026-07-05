import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const securityHeaders: Record<string, string> = {
  "X-DNS-Prefetch-Control": "on",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin",
  "X-Permitted-Cross-Domain-Policies": "none",
};

/** Safe headers for Payload admin — no strict script CSP (admin UI needs inline scripts). */
const adminSafeHeaders: Record<string, string> = {
  "X-DNS-Prefetch-Control": "on",
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  "X-Permitted-Cross-Domain-Policies": "none",
};

function isLocalHost(hostname: string): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname === "[::1]" ||
    hostname.endsWith(".local")
  );
}

function buildCsp(isDev: boolean, hostname: string): string {
  const connectSrc = ["'self'"];

  if (isDev) {
    connectSrc.push("ws://127.0.0.1:*", "ws://localhost:*");
  } else {
    connectSrc.push("https://vitals.vercel-analytics.com", "https://vitals.vercel-insights.com");
  }

  const directives = [
    "default-src 'self'",
    `script-src 'self'${isDev ? " 'unsafe-eval'" : ""} 'unsafe-inline'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https:",
    "font-src 'self' data:",
    `connect-src ${connectSrc.join(" ")}`,
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "object-src 'none'",
  ];

  // upgrade-insecure-requests breaks local `next start` over http://localhost
  if (!isDev && !isLocalHost(hostname)) {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

function applyHeaders(
  response: NextResponse,
  headers: Record<string, string>,
  options: { isDev: boolean; local: boolean },
) {
  for (const [key, value] of Object.entries(headers)) {
    if (key === "Strict-Transport-Security" && (options.isDev || options.local)) continue;
    response.headers.set(key, value);
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isDev = process.env.NODE_ENV === "development";
  const hostname = request.nextUrl.hostname;
  const local = isLocalHost(hostname);
  const isPreview = pathname.startsWith("/preview");

  // Payload admin: safe headers only (no strict CSP — admin UI requires inline scripts)
  if (pathname.startsWith("/admin")) {
    const response = NextResponse.next();
    applyHeaders(response, adminSafeHeaders, { isDev, local });
    return response;
  }

  const response = NextResponse.next();

  for (const [key, value] of Object.entries(securityHeaders)) {
    if (key === "Strict-Transport-Security" && (isDev || local)) continue;
    if (key === "X-Frame-Options" && isPreview) continue;
    response.headers.set(key, value);
  }

  if (isPreview) {
    response.headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        `script-src 'self'${isDev ? " 'unsafe-eval'" : ""} 'unsafe-inline'`,
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: blob: https:",
        "font-src 'self' data:",
        "connect-src 'self'",
        "frame-ancestors 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
      ].join("; "),
    );
  } else {
    response.headers.set("Content-Security-Policy", buildCsp(isDev, hostname));
  }

  if (request.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set("Cache-Control", "no-store");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
