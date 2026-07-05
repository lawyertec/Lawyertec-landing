"use client";

import Reveal from "./Reveal";
import SpotlightCard from "./SpotlightCard";
import {
  ResearchPreview,
  DocumentPreview,
  MemoryPreview,
  ProjectsPreview,
} from "./FeaturePreviews";

const features = [
  {
    title: "Investigación legal en vivo",
    description:
      "Consulta leyes, reglamentos y jurisprudencia mexicana con búsqueda y cálculos en tiempo real — no respuestas genéricas.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
    preview: <ResearchPreview />,
  },
  {
    title: "Revisión de documentos",
    description:
      "Analiza contratos, demandas y dictámenes. El agente investiga, planifica y revisa con el rigor que exige tu práctica.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    preview: <DocumentPreview />,
  },
  {
    title: "Memoria legal personal",
    description:
      "Cada hallazgo se guarda en tu propio cerebro de conocimiento — referencias cruzadas y recall local antes de buscar en la web.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
    preview: <MemoryPreview />,
  },
  {
    title: "Proyectos y chats",
    description:
      "Interfaz familiar tipo ChatGPT, organizada por asuntos. Un flujo simple para revisiones legales serias, sin fricción.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
    preview: <ProjectsPreview />,
  },
];

export default function FeaturesGrid() {
  return (
    <div className="mt-14 grid gap-6 sm:grid-cols-2 sm:items-stretch">
      {features.map((f, i) => (
        <Reveal key={f.title} delay={i * 90} className="h-full">
          <SpotlightCard className="group flex h-full flex-col rounded-2xl bg-navy-900/40 p-6 transition-colors duration-300 hover:bg-navy-800/40">
            <div className="mb-4 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-navy-800 to-navy-900 text-silver shadow-inner transition-all duration-300 group-hover:border-accent/40 group-hover:text-accent-soft group-hover:shadow-[0_0_22px_-6px_rgba(79,125,255,0.7)]">
              {f.icon}
            </div>
            <h3 className="text-lg font-medium text-white">{f.title}</h3>
            <p className="mt-2 shrink-0 text-sm leading-relaxed text-silver-muted">
              {f.description}
            </p>
            <div className="mt-auto flex min-h-[220px] w-full flex-1 flex-col pt-5">
              {f.preview}
            </div>
          </SpotlightCard>
        </Reveal>
      ))}
    </div>
  );
}
