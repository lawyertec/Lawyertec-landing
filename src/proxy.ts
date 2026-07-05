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
    connectSrc.push("https://vitals.vercel-insights.com");
  }

  const directives = [
    "default-src 'self'",
    `script-src 'self'${isDev ? " 'unsafe-eval'" : ""} 'unsafe-inline'`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
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

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  const isDev = process.env.NODE_ENV === "development";
  const hostname = request.nextUrl.hostname;
  const local = isLocalHost(hostname);

  for (const [key, value] of Object.entries(securityHeaders)) {
    if (key === "Strict-Transport-Security" && (isDev || local)) continue;
    response.headers.set(key, value);
  }

  response.headers.set("Content-Security-Policy", buildCsp(isDev, hostname));

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
