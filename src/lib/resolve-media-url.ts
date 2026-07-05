export type PayloadMedia = {
  id?: string | number;
  url?: string | null;
  alt?: string | null;
  filename?: string | null;
};

export function resolveMediaUrl(
  image: string | number | PayloadMedia | null | undefined,
): string | undefined {
  if (!image) return undefined;
  if (typeof image === "number") return undefined;
  if (typeof image === "string") return image;
  if (typeof image.url === "string" && image.url.trim()) return image.url;
  return undefined;
}
