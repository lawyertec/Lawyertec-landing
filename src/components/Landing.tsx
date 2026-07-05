import Link from "next/link";
import dynamic from "next/dynamic";
import WaitlistForm from "./WaitlistForm";
import Reveal from "./Reveal";
import Logo from "./Logo";
import type { LandingContent, FeaturesSection, HowItWorksSection, StatsSection, WaitlistSectionData } from "@/lib/landing-content";

const ChatDemo = dynamic(() => import("./ChatDemo"), {
  loading: () => (
    <div
      className="min-h-[280px] rounded-lg bg-navy-900/60 motion-safe:animate-pulse"
      aria-hidden
    />
  ),
});

const FeaturesGrid = dynamic(() => import("./FeaturesGrid"), {
  loading: () => (
    <div className="mt-14 grid gap-6 sm:grid-cols-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="min-h-[360px] rounded-2xl bg-navy-900/40 motion-safe:animate-pulse"
          aria-hidden
        />
      ))}
    </div>
  ),
});

type LandingProps = {
  content: LandingContent;
};

function StepPreview({ step }: { step: HowItWorksSection["steps"][number] }) {
  if (step.previewStyle === "tags" && step.previewTags?.length) {
    return (
      <div className="flex min-h-[52px] w-full flex-wrap items-center justify-center gap-1.5 sm:justify-start">
        {step.previewTags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-navy-900/60 px-2 py-0.5 text-[10px] text-silver-muted"
          >
            {tag} ✓
          </span>
        ))}
      </div>
    );
  }

  if (step.previewStyle === "citation") {
    return (
      <div className="mx-auto w-full max-w-sm rounded-lg border border-white/5 bg-navy-900/60 p-3 text-center text-[11px] sm:mx-0 sm:text-left">
        {step.previewHighlight && <span className="text-gold">{step.previewHighlight}</span>}
        <span className="text-silver-muted">{step.previewText}</span>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-sm rounded-lg border border-white/5 bg-navy-900/60 p-3 sm:mx-0">
      <div className="rounded-md bg-navy-800/60 px-2.5 py-2 text-center text-[11px] text-silver-muted sm:text-left">
        {step.previewText}
      </div>
    </div>
  );
}

export default function Header({ content }: Pick<LandingProps, "content">) {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-navy-950/90 sm:bg-navy-950/70 sm:backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-[90rem] items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8">
        <Logo variant="wordmark" />
        <nav className="hidden items-center gap-8 sm:flex">
          <a href="#funciones" className="text-sm text-silver-muted transition hover:text-white">
            {content.nav.functionsLabel}
          </a>
          <a href="#como-funciona" className="text-sm text-silver-muted transition hover:text-white">
            {content.nav.howItWorksLabel}
          </a>
          <a
            href="#waitlist"
            className="btn-shine rounded-lg bg-white px-4 py-2 text-sm font-semibold text-navy-950 transition hover:bg-silver"
          >
            {content.nav.waitlistCta}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Hero({ content }: LandingProps) {
  const doubled = [...content.marquee.sources, ...content.marquee.sources];

  return (
    <section className="relative overflow-hidden pt-32 pb-0 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-grid" />
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden sm:block">
        <div className="animate-aurora absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-accent/12 blur-[120px]" />
        <div className="animate-aurora animation-delay-300 absolute top-1/3 -right-40 h-[420px] w-[420px] rounded-full bg-accent-soft/10 blur-[120px]" />
        <div className="animate-pulse-glow absolute -bottom-32 -left-32 h-[360px] w-[360px] rounded-full bg-white/[0.04] blur-[100px]" />
        <div className="absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin-slow h-full w-full rounded-full border border-white/[0.04]" />
          <div className="absolute inset-16 rounded-full border border-white/[0.03]" />
          <div className="absolute inset-32 rounded-full border border-white/[0.025]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[90rem] px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="animate-fade-up opacity-0-start mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium tracking-wide text-silver uppercase backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-soft" />
            {content.hero.badge}
          </p>
          <h1 className="animate-fade-up opacity-0-start animation-delay-100 text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
            {content.hero.titleLine1}
            <br />
            <span className="text-sheen">{content.hero.titleHighlight}</span>
          </h1>
          <p className="animate-fade-up opacity-0-start animation-delay-200 mx-auto mt-6 max-w-2xl text-base leading-relaxed text-silver-muted sm:text-lg">
            {content.hero.description}
          </p>
          <div className="animate-fade-up opacity-0-start animation-delay-300 mt-10 flex justify-center">
            <WaitlistForm compact />
          </div>
        </div>

        <div className="animate-fade-up opacity-0-start animation-delay-400 mx-auto mt-16 max-w-4xl">
          <div className="border-gradient rounded-2xl bg-navy-800/40 p-1 shadow-2xl shadow-black/50">
            <ChatDemo content={content.chatDemo} />
          </div>
        </div>
      </div>

      <div className="relative mt-14 overflow-hidden border-y border-white/5 py-5">
        <p className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-silver-muted/70">
          {content.marquee.heading}
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
    </section>
  );
}

export function Features({ section }: { section: FeaturesSection }) {
  return (
    <section id="funciones" className="section-deferred relative pt-16 pb-20 sm:pt-20 sm:pb-28">
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
            {section.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {section.title}
          </h2>
          <p className="mt-4 text-silver-muted">{section.subtitle}</p>
        </Reveal>

        <FeaturesGrid items={section.items} />
      </div>
    </section>
  );
}

export function Stats({ section }: { section: StatsSection }) {
  return (
    <section className="section-deferred relative overflow-hidden bg-white py-16">
      <div className="pointer-events-none absolute inset-0 bg-grid-light" />
      <div className="relative mx-auto w-full max-w-[90rem] px-5 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {section.items.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 100} className="text-center">
              <div className="text-4xl font-semibold tracking-tight text-sheen-navy sm:text-5xl">
                {stat.value}
              </div>
              <p className="mt-2 text-sm text-navy-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks({ section }: { section: HowItWorksSection }) {
  return (
    <section id="como-funciona" className="section-deferred relative border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[90rem] px-5 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent-soft">
            {section.eyebrow}
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {section.title}
          </h2>
          <p className="mt-4 text-silver-muted">{section.subtitle}</p>
        </Reveal>

        <div className="relative mt-16">
          <div className="gradient-divider pointer-events-none absolute left-0 right-0 top-7 hidden h-px sm:block" />
          <div className="grid gap-10 sm:grid-cols-3 sm:items-stretch">
            {section.steps.map((step, i) => (
              <Reveal
                key={step.num}
                delay={i * 120}
                className="relative flex h-full flex-col text-center sm:text-left"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-navy-950 text-lg font-bold text-sheen sm:mx-0">
                  {step.num}
                </div>
                <h3 className="text-lg font-medium text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-silver-muted">{step.text}</p>
                <div className="mt-auto w-full pt-4">
                  <StepPreview step={step} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WaitlistSection({ section }: { section: WaitlistSectionData }) {
  return (
    <section id="waitlist" className="section-deferred relative overflow-hidden bg-white py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-grid-light" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[320px] w-[480px] -translate-x-1/2 rounded-full bg-accent/10 blur-[100px]" />
      <div className="relative mx-auto w-full max-w-[90rem] px-5 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl">
          <div className="rounded-3xl border border-navy-950/10 bg-white px-6 py-12 text-center shadow-[0_24px_64px_-32px_rgba(4,8,16,0.18)] sm:px-12">
            <h2 className="text-3xl font-semibold tracking-tight text-navy-950 sm:text-4xl">
              {section.title}{" "}
              <span className="text-sheen-navy">{section.titleHighlight}</span>
            </h2>
            <p className="mt-4 text-navy-muted">{section.description}</p>
            <div className="mt-8 flex justify-center">
              <WaitlistForm theme="light" />
            </div>
            <p className="mt-4 text-xs text-navy-muted/80">{section.footnote}</p>
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
