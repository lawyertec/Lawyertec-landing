import { getSiteUrl } from "./site";

export function getPayloadServerURL(): string {
  const explicit = process.env.NEXT_PUBLIC_SERVER_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const site = getSiteUrl();
  if (site && site !== "https://lawyertec.com") return site;

  if (process.env.VERCEL_URL?.trim()) {
    return `https://${process.env.VERCEL_URL.trim()}`;
  }

  return "http://127.0.0.1:3000";
}
