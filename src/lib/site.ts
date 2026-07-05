const DEFAULT_SITE_URL = "https://lawyertec.com";

export const siteConfig = {
  name: "Lawyertec",
  legalName: "Lawyertec",
  tagline: "IA legal para abogados en México",
  defaultTitle: "Lawyertec — IA legal para abogados en México",
  description:
    "Agente de IA especializado en derecho mexicano. Investigación legal en vivo, cálculos de plazos y montos, revisión de documentos y memoria legal personal con respuestas citables.",
  shortDescription:
    "Investigación legal seria en minutos. Búsqueda en vivo, cálculos y revisión de documentos con respuestas citables.",
  abstract:
    "Lawyertec es un agente de inteligencia artificial para abogados en México. Consulta leyes, reglamentos y jurisprudencia en tiempo real, calcula plazos legales, revisa contratos y demandas, y guarda hallazgos en una memoria legal personal.",
  locale: "es_MX",
  language: "es",
  country: "MX",
  category: "Legal Technology",
  applicationCategory: "BusinessApplication",
  emails: {
    privacy: "privacidad@lawyertec.com",
    security: "security@lawyertec.com",
  },
  keywords: [
    "IA legal",
    "inteligencia artificial legal",
    "abogados México",
    "investigación jurídica",
    "derecho mexicano",
    "jurisprudencia",
    "revisión de contratos",
    "agente legal",
    "legal tech México",
    "asistente legal",
    "cálculo de plazos legales",
    "memoria legal",
    "Lawyertec",
  ],
  features: [
    "Investigación legal en vivo sobre legislación mexicana",
    "Cálculo de plazos, fechas límite y montos legales",
    "Revisión de contratos, demandas y dictámenes",
    "Memoria legal personal con referencias cruzadas",
    "Organización por proyectos y chats legales",
    "Respuestas citables con fundamento normativo",
  ],
  sources: [
    "Código Civil Federal",
    "Código de Comercio",
    "Ley Federal del Trabajo",
    "Código Fiscal de la Federación",
    "Jurisprudencia SCJN",
    "Constitución Política de los Estados Unidos Mexicanos",
  ],
} as const;

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

export function absoluteUrl(path = "/"): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalized === "/" ? "" : normalized}`;
}
