import Link from "next/link";
import WaitlistForm from "./WaitlistForm";
import Reveal from "./Reveal";
import ChatDemo from "./ChatDemo";
import SpotlightCard from "./SpotlightCard";
import Logo from "./Logo";
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

const steps = [
  {
    num: "01",
    title: "Describe tu asunto",
    text: "Abre un chat o proyecto y plantea tu consulta legal con el contexto que necesites.",
    preview: (
      <div className="mx-auto w-full max-w-sm rounded-lg border border-white/5 bg-navy-900/60 p-3 sm:mx-0">
        <div className="rounded-md bg-navy-800/60 px-2.5 py-2 text-center text-[11px] text-silver-muted sm:text-left">
          Revisa la cláusula de penalización del contrato de arrendamiento…
        </div>
      </div>
    ),
  },
  {
    num: "02",
    title: "El agente investiga",
    text: "En segundo plano consulta fuentes, ejecuta cálculos y cruza referencias — todo en vivo.",
    preview: (
      <div className="flex min-h-[52px] w-full flex-wrap items-center justify-center gap-1.5 sm:justify-start">
        {["Código Civil", "Cálculo de plazos", "Jurisprudencia"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-white/10 bg-navy-900/60 px-2 py-0.5 text-[10px] text-silver-muted"
          >
            {t} ✓
          </span>
        ))}
      </div>
    ),
  },
  {
    num: "03",
    title: "Recibe insight accionable",
    text: "Obtén respuestas citables, guardadas en tu memoria legal para futuras consultas.",
    preview: (
      <div className="mx-auto w-full max-w-sm rounded-lg border border-white/5 bg-navy-900/60 p-3 text-center text-[11px] sm:mx-0 sm:text-left">
        <span className="text-gold">Art. 1792 CCF</span>
        <span className="text-silver-muted"> — Penalización máxima del 2% mensual</span>
      </div>
    ),
  },
];

const sources = [
  "Código Civil Federal",
  "Código de Comercio",
  "Ley Federal del Trabajo",
  "Código Fiscal de la Federación",
  "Jurisprudencia SCJN",
  "Ley del Seguro Social",
  "Código Nacional de Procedimientos",
  "Ley de Amparo",
  "Constitución Política",
];

const stats = [
  { value: "+300", label: "Ordenamientos y códigos" },
  { value: "24/7", label: "Investigación en vivo" },
  { value: "100%", label: "Respuestas citables" },
];

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-navy-950/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8">
        <Logo variant="wordmark" />
        <nav className="hidden items-center gap-8 sm:flex">
          <a href="#funciones" className="text-sm text-silver-muted transition hover:text-white">
            Funciones
          </a>
          <a href="#como-funciona" className="text-sm text-silver-muted transition hover:text-white">
            Cómo funciona
          </a>
          <a
            href="#waitlist"
            className="btn-shine rounded-lg bg-white px-4 py-2 text-sm font-semibold text-navy-950 transition hover:bg-silver"
          >
            Lista de espera
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-0 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-aurora absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-accent/12 blur-[120px]" />
        <div className="animate-aurora animation-delay-300 absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-accent-soft/10 blur-[120px]" />
        <div className="animate-pulse-glow absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full bg-white/[0.04] blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin-slow h-full w-full rounded-full border border-white/[0.04]" />
          <div className="absolute inset-16 rounded-full border border-white/[0.03]" />
          <div className="absolute inset-32 rounded-full border border-white/[0.025]" />
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[90rem] px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-fade-up opacity-0-start mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-silver uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-soft" />
            IA legal para abogados en México
          </p>
          <h1 className="animate-fade-up opacity-0-start animation-delay-100 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Investigación legal seria.
            <br />
            <span className="text-sheen">En minutos, no horas.</span>
          </h1>
          <p className="animate-fade-up opacity-0-start animation-delay-200 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-silver-muted sm:text-lg">
            Lawyertec es tu agente especializado: busca leyes y reglamentos en vivo,
            calcula plazos y montos, y revisa documentos con respuestas citables —
            todo guardado en tu memoria legal personal.
          </p>
          <div className="animate-fade-up opacity-0-start animation-delay-300 mt-10 flex justify-center">
            <WaitlistForm compact />
          </div>
        </div>

        <div className="animate-fade-up opacity-0-start animation-delay-400 mx-auto mt-16 max-w-4xl">
          <div className="border-gradient rounded-2xl bg-navy-800/40 p-1 shadow-2xl shadow-black/50">
            <ChatDemo />
          </div>
        </div>
      </div>

      <SourcesMarquee />
    </section>
  );
}

function SourcesMarquee() {
  const doubled = [...sources, ...sources];
  return (
    <div className="relative mt-14 overflow-hidden border-y border-white/5 py-5">
      <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-silver-muted/70">
        Fundamentado en la legislación mexicana
      </p>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {doubled.map((source, i) => (
            <span
              key={`${source}-${i}`}
              className="whitespace-nowrap text-sm font-medium text-silver-muted/60"
            >
              {source}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Features() {
  return (
    <section id="funciones" className="relative pt-16 pb-20 sm:pt-20 sm:pb-28">
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
            Lo que nos distingue
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            No es otro chat genérico
          </h2>
          <p className="mt-4 text-silver-muted">
            Es un agente legal que trabaja como tú — con herramientas, fuentes y memoria.
          </p>
        </Reveal>

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
      </div>
    </section>
  );
}

export function Stats() {
  return (
    <section className="relative border-t border-white/5 py-16">
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="text-center">
              <div className="text-4xl font-semibold tracking-tight text-sheen sm:text-5xl">
                {s.value}
              </div>
              <p className="mt-2 text-sm text-silver-muted">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="relative border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
            Cómo funciona
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Así de simple
          </h2>
          <p className="mt-4 text-silver-muted">Un flujo limpio. Sin curva de aprendizaje.</p>
        </Reveal>

        <div className="relative mt-16">
          <div className="gradient-divider pointer-events-none absolute left-0 right-0 top-7 hidden h-px sm:block" />
          <div className="grid gap-10 sm:grid-cols-3 sm:items-stretch">
            {steps.map((s, i) => (
              <Reveal
                key={s.num}
                delay={i * 120}
                className="relative flex h-full flex-col text-center sm:text-left"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-navy-950 text-lg font-bold text-sheen sm:mx-0">
                  {s.num}
                </div>
                <h3 className="text-lg font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-muted">{s.text}</p>
                <div className="mt-auto w-full pt-4">{s.preview}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WaitlistSection() {
  return (
    <section id="waitlist" className="relative overflow-hidden border-t border-white/5 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-aurora absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>
      <div className="relative mx-auto w-full max-w-[90rem] px-5 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl">
          <div className="border-gradient rounded-3xl bg-navy-900/50 px-6 py-12 text-center backdrop-blur-sm sm:px-12">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Acceso <span className="text-sheen">anticipado</span>
            </h2>
            <p className="mt-4 text-silver-muted">
              Estamos preparando el lanzamiento. Únete a la lista de espera y sé de
              los primeros abogados en probar Lawyertec.
            </p>
            <div className="mt-8 flex justify-center">
              <WaitlistForm />
            </div>
            <p className="mt-4 text-xs text-silver-muted/70">
              Sin spam. Solo te avisamos cuando abramos acceso.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex w-full max-w-[90rem] flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Logo variant="mark" link={false} className="h-7 w-7" />
          <p className="text-sm text-silver-muted">
            © {new Date().getFullYear()} Lawyertec. Todos los derechos reservados.
          </p>
        </div>
        <div className="flex gap-6">
          <Link href="/privacidad" className="text-sm text-silver-muted transition hover:text-white">
            Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
