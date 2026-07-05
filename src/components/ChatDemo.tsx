"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const QUESTION =
  "¿Cuál es el plazo de prescripción para esta acción mercantil según el Código de Comercio?";

const TOOLS = [
  { label: "Buscando en Código de Comercio", icon: "search" },
  { label: "Calculando plazo y fecha límite", icon: "calc" },
  { label: "Guardando en memoria legal", icon: "brain" },
] as const;

const ANSWER =
  "Según el art. 1043 del Código de Comercio, el plazo de prescripción es de 10 años. Con base en la fecha del acto (12 mar 2019), la fecha límite es el 12 mar 2029.";

type Phase = "asking" | "thinking" | "answering" | "done";

let animationStarted = false;

function ToolIcon({ name }: { name: string }) {
  const common = {
    className: "h-3.5 w-3.5",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    strokeWidth: 1.8,
  } as const;

  if (name === "search") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.3-4.3m1.8-4.7a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
        />
      </svg>
    );
  }
  if (name === "calc") {
    return (
      <svg {...common}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 7h6M9 11h6m-6 4h3M6 3h12a1 1 0 011 1v16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z"
        />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18v-5m0 0a5 5 0 10-3-9 5 5 0 00-3 9 3 3 0 00.9 5.6A5 5 0 0012 21a5 5 0 005.1-2.4A3 3 0 0018 13a5 5 0 00-3-9 5 5 0 00-3 9z"
      />
    </svg>
  );
}

export default function ChatDemo() {
  const [phase, setPhase] = useState<Phase>("asking");
  const [activeTool, setActiveTool] = useState(-1);
  const [typed, setTyped] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const finish = () => {
      setPhase("done");
      setActiveTool(TOOLS.length - 1);
      setTyped(ANSWER);
    };

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce || animationStarted) {
      finish();
      return;
    }

    animationStarted = true;

    const push = (fn: () => void, ms: number) => {
      timers.current.push(setTimeout(fn, ms));
    };

    push(() => setPhase("thinking"), 900);
    TOOLS.forEach((_, i) => push(() => setActiveTool(i), 1400 + i * 750));

    const answerStart = 1400 + TOOLS.length * 750 + 250;
    push(() => {
      setPhase("answering");
      setTyped(ANSWER);
    }, answerStart);

    push(() => setPhase("done"), answerStart + 500);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const highlightedAnswer = useMemo(
    () =>
      typed.split(/(10 años|12 mar 2029|art\. 1043)/g).map((part, i) =>
        part === "10 años" || part === "12 mar 2029" || part === "art. 1043" ? (
          <span key={i} className="font-semibold text-gold">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      ),
    [typed],
  );

  return (
    <div className="rounded-lg bg-navy-900/80 p-5">
      <div className="mb-4 flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
        <span className="ml-2 text-xs text-silver-muted">
          Revisión de contrato — Proyecto Mercantil
        </span>
      </div>

      <div className="space-y-3 text-sm">
        <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-navy-800/70 px-4 py-3 text-silver">
          {QUESTION}
        </div>

        <div className="flex flex-wrap gap-2">
          {TOOLS.map((tool, i) => {
            const state =
              activeTool > i ? "done" : activeTool === i ? "active" : "idle";
            return (
              <span
                key={tool.label}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-all duration-300 ${
                  state === "idle"
                    ? "border-white/5 text-silver-muted/40"
                    : state === "active"
                    ? "border-accent/50 bg-accent/10 text-accent-soft shadow-[0_0_18px_-4px_rgba(79,125,255,0.6)]"
                    : "border-white/10 text-silver-muted"
                }`}
              >
                <ToolIcon name={tool.icon} />
                {tool.label}
                {state === "done" && (
                  <span className="text-accent-soft">✓</span>
                )}
              </span>
            );
          })}
        </div>

        {(phase === "answering" || phase === "done") && (
          <div className="rounded-2xl rounded-bl-sm border border-white/5 bg-navy-950/60 px-4 py-3">
            <p
              className={`text-white ${
                phase === "answering" ? "animate-fade-in" : ""
              }`}
            >
              {highlightedAnswer}
            </p>
            {phase === "done" && (
              <p className="mt-2 flex items-center gap-1.5 text-xs text-silver-muted">
                <span className="text-accent-soft">↳</span>
                Guardado en memoria · 3 referencias cruzadas
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
