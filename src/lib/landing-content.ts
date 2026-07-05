import { defaultLandingSections, type LandingSection } from "./landing-sections";

export type { LandingSection, LandingSectionBlockType } from "./landing-sections";
export {
  defaultLandingSections,
  type FeaturesSection,
  type StatsSection,
  type UseCasesSectionData,
  type HowItWorksSection,
  type WaitlistSectionData,
} from "./landing-sections";

export type FeatureIcon = "research" | "document" | "memory" | "projects";
export type ChatToolIcon = "search" | "calc" | "brain";
export type StepPreviewStyle = "simple" | "tags" | "citation";

export type LandingContent = {
  nav: {
    functionsLabel: string;
    howItWorksLabel: string;
    waitlistCta: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleHighlight: string;
    description: string;
  };
  marquee: {
    heading: string;
    sources: string[];
  };
  chatDemo: {
    projectTitle: string;
    question: string;
    tools: Array<{ label: string; icon: ChatToolIcon }>;
    answer: string;
    highlightTerms: string[];
    footerNote: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  sections: LandingSection[];
};

export const defaultLandingContent: LandingContent = {
  nav: {
    functionsLabel: "Funciones",
    howItWorksLabel: "Cómo funciona",
    waitlistCta: "Lista de espera",
  },
  hero: {
    badge: "IA legal para abogados en México",
    titleLine1: "Investigación legal seria.",
    titleHighlight: "En minutos, no horas.",
    description:
      "Lawyertec es tu agente especializado: busca leyes y reglamentos en vivo, calcula plazos y montos, y revisa documentos con respuestas citables — todo guardado en tu memoria legal personal.",
  },
  marquee: {
    heading: "Fundamentado en la legislación mexicana",
    sources: [
      "Código Civil Federal",
      "Código de Comercio",
      "Ley Federal del Trabajo",
      "Código Fiscal de la Federación",
      "Jurisprudencia SCJN",
      "Ley del Seguro Social",
      "Código Nacional de Procedimientos",
      "Ley de Amparo",
      "Constitución Política",
    ],
  },
  chatDemo: {
    projectTitle: "Revisión de contrato — Proyecto Mercantil",
    question:
      "¿Cuál es el plazo de prescripción para esta acción mercantil según el Código de Comercio?",
    tools: [
      { label: "Buscando en Código de Comercio", icon: "search" },
      { label: "Calculando plazo y fecha límite", icon: "calc" },
      { label: "Guardando en memoria legal", icon: "brain" },
    ],
    answer:
      "Según el art. 1043 del Código de Comercio, el plazo de prescripción es de 10 años. Con base en la fecha del acto (12 mar 2019), la fecha límite es el 12 mar 2029.",
    highlightTerms: ["10 años", "12 mar 2029", "art. 1043"],
    footerNote: "Guardado en memoria · 3 referencias cruzadas",
  },
  seo: {
    title: "Lawyertec — IA legal para abogados en México",
    description:
      "Agente de IA especializado en derecho mexicano. Investigación legal en vivo, cálculos de plazos y montos, revisión de documentos y memoria legal personal con respuestas citables.",
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
  },
  sections: defaultLandingSections,
};
