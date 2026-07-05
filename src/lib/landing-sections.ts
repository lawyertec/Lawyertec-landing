import type {
  ChatToolIcon,
  FeatureIcon,
  StepPreviewStyle,
} from "./landing-content";

export type FeaturesSection = {
  blockType: "features";
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Array<{
    title: string;
    description: string;
    icon: FeatureIcon;
  }>;
};

export type StatsSection = {
  blockType: "stats";
  items: Array<{ value: string; label: string }>;
};

export type UseCasesSectionData = {
  blockType: "useCases";
  eyebrow: string;
  title: string;
  subtitle: string;
  items: Array<{ image: string; title: string; caption: string }>;
};

export type HowItWorksSection = {
  blockType: "howItWorks";
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: Array<{
    num: string;
    title: string;
    text: string;
    previewStyle: StepPreviewStyle;
    previewText: string;
    previewHighlight?: string;
    previewTags?: string[];
  }>;
};

export type WaitlistSectionData = {
  blockType: "waitlist";
  title: string;
  titleHighlight: string;
  description: string;
  footnote: string;
};

export type LandingSection =
  | FeaturesSection
  | StatsSection
  | UseCasesSectionData
  | HowItWorksSection
  | WaitlistSectionData;

export type LandingSectionBlockType = LandingSection["blockType"];

export const defaultLandingSections: LandingSection[] = [
  {
    blockType: "features",
    eyebrow: "Lo que nos distingue",
    title: "No es otro chat genérico",
    subtitle: "Es un agente legal que trabaja como tú — con herramientas, fuentes y memoria.",
    items: [
      {
        title: "Investigación legal en vivo",
        description:
          "Consulta leyes, reglamentos y jurisprudencia mexicana con búsqueda y cálculos en tiempo real — no respuestas genéricas.",
        icon: "research",
      },
      {
        title: "Revisión de documentos",
        description:
          "Analiza contratos, demandas y dictámenes. El agente investiga, planifica y revisa con el rigor que exige tu práctica.",
        icon: "document",
      },
      {
        title: "Memoria legal personal",
        description:
          "Cada hallazgo se guarda en tu propio cerebro de conocimiento — referencias cruzadas y recall local antes de buscar en la web.",
        icon: "memory",
      },
      {
        title: "Proyectos y chats",
        description:
          "Interfaz familiar tipo ChatGPT, organizada por asuntos. Un flujo simple para revisiones legales serias, sin fricción.",
        icon: "projects",
      },
    ],
  },
  {
    blockType: "stats",
    items: [
      { value: "+300", label: "Ordenamientos y códigos" },
      { value: "24/7", label: "Investigación en vivo" },
      { value: "100%", label: "Respuestas citables" },
    ],
  },
  {
    blockType: "useCases",
    eyebrow: "Casos reales",
    title: "Hecho para la práctica diaria",
    subtitle:
      "Desde litigio y contratos hasta plazos urgentes — Lawyertec responde donde más lo necesitas.",
    items: [
      {
        image: "/images/optimized/timon-studler-ABGaVhJxwDQ-unsplash.jpg",
        title: "Plazos bajo presión",
        caption:
          "Calcula fechas límite y montos legales cuando el tiempo apremia y no puedes permitirte un error.",
      },
      {
        image: "/images/optimized/clarisse-meyer-jKU2NneZAbI-unsplash.jpg",
        title: "Investigación doctrinal",
        caption:
          "Encuentra artículos, reglamentos y criterios relevantes en minutos — con citas listas para tu escrito.",
      },
      {
        image: "/images/optimized/nastuh-abootalebi-eHD8Y1Znfpk-unsplash.jpg",
        title: "Consultas con clientes",
        caption:
          "Responde con artículos citables en la sala de juntas, sin pausar la conversación para buscar fuera.",
      },
      {
        image: "/images/optimized/matthew-henry-VviFtDJakYk-unsplash.jpg",
        title: "Derecho corporativo",
        caption:
          "Analiza cláusulas societarias y riesgos contractuales en operaciones de alto volumen con respuestas verificables.",
      },
      {
        image: "/images/optimized/sebastian-pichler-bAQH53VquTc-unsplash.jpg",
        title: "Jurisprudencia y precedentes",
        caption:
          "Localiza criterios de tribunales superiores para fundamentar tu estrategia antes de una audiencia clave.",
      },
      {
        image: "/images/optimized/harry-cao-DG87bwGRRqs-unsplash.jpg",
        title: "Equipos jurídicos",
        caption:
          "Estandariza la calidad de investigación de todo el despacho en casos complejos y de alto impacto.",
      },
      {
        image: "/images/optimized/juan-luis-alejos-KJgoOAxq9ns-unsplash.jpg",
        title: "Contratos en la Ciudad de México",
        caption:
          "Valida obligaciones mercantiles y plazos del Código de Comercio antes de una reunión con tu cliente en Reforma.",
      },
      {
        image: "/images/optimized/patrick-fore-H5Lf0nGyetk-unsplash.jpg",
        title: "Demandas y procedimientos",
        caption:
          "Confirma requisitos procesales, plazos y fundamento legal antes de presentar un escrito.",
      },
      {
        image: "/images/optimized/bhargava-marripati-7LDBKPWAHJ4-unsplash.jpg",
        title: "Legislación federal y local",
        caption:
          "Cruza la Constitución, leyes federales y ordenamientos locales sin saltar entre fuentes dispersas.",
      },
    ],
  },
  {
    blockType: "howItWorks",
    eyebrow: "Cómo funciona",
    title: "Así de simple",
    subtitle: "Un flujo limpio. Sin curva de aprendizaje.",
    steps: [
      {
        num: "01",
        title: "Describe tu asunto",
        text: "Abre un chat o proyecto y plantea tu consulta legal con el contexto que necesites.",
        previewStyle: "simple",
        previewText: "Revisa la cláusula de penalización del contrato de arrendamiento…",
      },
      {
        num: "02",
        title: "El agente investiga",
        text: "En segundo plano consulta fuentes, ejecuta cálculos y cruza referencias — todo en vivo.",
        previewStyle: "tags",
        previewText: "",
        previewTags: ["Código Civil", "Cálculo de plazos", "Jurisprudencia"],
      },
      {
        num: "03",
        title: "Recibe insight accionable",
        text: "Obtén respuestas citables, guardadas en tu memoria legal para futuras consultas.",
        previewStyle: "citation",
        previewHighlight: "Art. 1792 CCF",
        previewText: " — Penalización máxima del 2% mensual",
      },
    ],
  },
  {
    blockType: "waitlist",
    title: "Acceso",
    titleHighlight: "anticipado",
    description:
      "Estamos preparando el lanzamiento. Únete a la lista de espera y sé de los primeros abogados en probar Lawyertec.",
    footnote: "Sin spam. Solo te avisamos cuando abramos acceso.",
  },
];
