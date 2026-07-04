"use client";

import { useEffect, useRef, useState } from "react";

const PREVIEW_MIN_H = "min-h-[220px]";

function PreviewShell({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-full w-full ${PREVIEW_MIN_H} flex-col overflow-hidden rounded-xl border border-white/5 bg-navy-950/60`}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-white/5 px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="ml-1 truncate text-[10px] text-silver-muted">{title}</span>
      </div>
      <div className="flex flex-1 flex-col p-3">{children}</div>
    </div>
  );
}

function usePlayOnce() {
  const ref = useRef<HTMLDivElement>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || played) return;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = requestAnimationFrame(() => setPlayed(true));
      return () => cancelAnimationFrame(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          requestAnimationFrame(() => setPlayed(true));
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [played]);

  return { ref, played };
}

export function ResearchPreview() {
  const { ref, played } = usePlayOnce();
  const results = [
    { code: "Art. 1043", source: "Código de Comercio", match: "Prescripción mercantil" },
    { code: "Art. 1076", source: "Código de Comercio", match: "Plazo de 10 años" },
    { code: "Tesis I.3o.C.45", source: "SCJN", match: "Cómputo de plazos" },
  ];

  return (
    <div ref={ref} className="h-full w-full">
      <PreviewShell title="Búsqueda — Prescripción mercantil">
        <div className="flex h-full w-full flex-col gap-2">
          <div className="flex w-full shrink-0 items-center gap-2 rounded-lg border border-white/5 bg-navy-900/80 px-2.5 py-1.5">
            <svg className="h-3 w-3 shrink-0 text-silver-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3m1.8-4.7a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" />
            </svg>
            <span className="truncate text-[11px] text-silver-muted">
              prescripción acción mercantil
            </span>
          </div>
          <div className="flex w-full flex-1 flex-col justify-evenly gap-1.5">
            {results.map((r, i) => (
              <div
                key={r.code}
                className={`w-full rounded-lg border border-white/5 px-2.5 py-2 transition-all duration-500 ${
                  played ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: played ? `${i * 120}ms` : "0ms" }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-medium text-gold">{r.code}</span>
                  <span className="truncate text-[10px] text-silver-muted">{r.source}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-silver-muted/80">{r.match}</p>
              </div>
            ))}
          </div>
        </div>
      </PreviewShell>
    </div>
  );
}

export function DocumentPreview() {
  const { ref, played } = usePlayOnce();
  const clauses = [
    { text: "Cláusula 4.2 — Plazo de entrega: 30 días naturales", ok: true },
    { text: "Cláusula 7.1 — Penalización: 2% mensual sobre saldo", ok: false },
    { text: "Cláusula 9.3 — Jurisdicción: tribunales de CDMX", ok: true },
  ];

  return (
    <div ref={ref} className="h-full w-full">
      <PreviewShell title="Contrato de arrendamiento.pdf">
        <div className="flex h-full w-full flex-col justify-between gap-3">
          <div className="w-full border-b border-white/5 pb-2">
            <p className="text-[10px] font-medium uppercase tracking-wide text-silver-muted/70">
              Contrato de arrendamiento
            </p>
            <p className="mt-0.5 text-[9px] text-silver-muted/50">
              12 páginas · 3 cláusulas analizadas
            </p>
          </div>
          <div className="flex w-full flex-1 flex-col justify-evenly gap-1.5 font-mono text-[10px] leading-relaxed">
            {clauses.map((c, i) => (
              <div
                key={i}
                className={`w-full rounded px-2 py-1.5 transition-colors duration-700 ${
                  played
                    ? c.ok
                      ? "bg-emerald-500/10 text-silver-muted"
                      : "bg-amber-500/10 text-silver"
                    : "text-silver-muted/50"
                }`}
                style={{ transitionDelay: played ? `${i * 200}ms` : "0ms" }}
              >
                <span className="mr-1.5">{c.ok ? "✓" : "⚠"}</span>
                {c.text}
              </div>
            ))}
          </div>
          <p
            className={`w-full text-[10px] transition-opacity duration-500 ${
              played ? "text-amber-400/90 opacity-100" : "text-transparent opacity-0"
            }`}
          >
            ⚠ Cláusula 7.1 excede el límite legal (Art. 1792 CCF)
          </p>
        </div>
      </PreviewShell>
    </div>
  );
}

export function MemoryPreview() {
  const { ref, played } = usePlayOnce();
  const nodes = [
    { label: "Art. 1043 CCom" },
    { label: "Prescripción 10 años" },
    { label: "Proyecto Mercantil" },
  ];

  return (
    <div ref={ref} className="h-full w-full">
      <PreviewShell title="Memoria legal — Proyecto Mercantil">
        <div className="flex h-full w-full flex-col items-center justify-center gap-3">
          <div className="relative flex w-full items-center justify-between px-2 py-1">
            <div
              className={`absolute left-[12%] right-[12%] top-[18px] h-px bg-accent/30 transition-all duration-700 ${
                played ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0"
              }`}
            />
            {nodes.map((n, i) => (
              <div
                key={n.label}
                className={`relative z-10 flex flex-1 flex-col items-center transition-all duration-500 ${
                  played ? "scale-100 opacity-100" : "scale-90 opacity-0"
                }`}
                style={{ transitionDelay: played ? `${i * 150}ms` : "0ms" }}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-[9px] font-bold text-accent-soft">
                  {i + 1}
                </div>
                <span className="mt-1.5 w-full max-w-[80px] text-center text-[9px] leading-tight text-silver-muted">
                  {n.label}
                </span>
              </div>
            ))}
          </div>
          <p
            className={`text-center text-[10px] text-silver-muted transition-opacity duration-500 ${
              played ? "opacity-100" : "opacity-0"
            }`}
          >
            3 referencias cruzadas · recall instantáneo
          </p>
        </div>
      </PreviewShell>
    </div>
  );
}

export function ProjectsPreview() {
  return (
    <div className="h-full w-full">
      <PreviewShell title="Lawyertec">
        <div className="flex h-full w-full items-stretch gap-2">
          <div className="flex w-[38%] shrink-0 flex-col border-r border-white/5 pr-2">
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-wider text-silver-muted/60">
              Proyectos
            </p>
            <div className="flex flex-1 flex-col justify-center gap-1">
              {["Mercantil", "Laboral", "Fiscal"].map((p, i) => (
                <div
                  key={p}
                  className={`rounded-md px-2 py-1.5 text-[10px] ${
                    i === 0
                      ? "bg-accent/15 font-medium text-accent-soft"
                      : "text-silver-muted/70"
                  }`}
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5">
            <p className="text-[9px] text-silver-muted/60">Mercantil · Prescripción</p>
            <div className="w-full rounded-lg bg-navy-800/60 px-2 py-2 text-[10px] text-silver-muted">
              ¿Plazo de prescripción mercantil?
            </div>
            <div className="w-full rounded-lg border border-white/5 bg-navy-950/60 px-2 py-2 text-[10px] text-white">
              <span className="text-gold">10 años</span> · Art. 1043 CCom
            </div>
          </div>
        </div>
      </PreviewShell>
    </div>
  );
}
