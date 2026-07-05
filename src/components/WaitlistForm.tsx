"use client";

import { useState } from "react";
import { PRACTICE_AREAS, type PracticeArea } from "@/lib/practice-areas";

type Status = "idle" | "loading" | "success" | "error";
type FormTheme = "dark" | "light";

const themeStyles = {
  dark: {
    field:
      "border-white/10 bg-navy-900/80 text-white focus:border-silver/40 focus:ring-silver/20",
    placeholder: "placeholder:text-silver-muted",
    selectEmpty: "text-silver-muted",
    selectFilled: "text-white",
    option: "bg-navy-900 text-white",
    chevron: "text-silver-muted",
    button: "bg-white text-navy-950 hover:bg-silver",
    success: "border-white/10 bg-navy-800/60 text-white",
    error: "text-red-400",
  },
  light: {
    field:
      "border-navy-950/10 bg-white text-navy-950 shadow-sm focus:border-accent/40 focus:ring-accent/20",
    placeholder: "placeholder:text-navy-muted/70",
    selectEmpty: "text-navy-muted/70",
    selectFilled: "text-navy-950",
    option: "bg-white text-navy-950",
    chevron: "text-navy-muted",
    button: "bg-navy-950 text-white hover:bg-navy-800",
    success: "border-navy-950/10 bg-navy-950/[0.04] text-navy-950",
    error: "text-red-600",
  },
} as const;

const fieldBase =
  "w-full min-h-[46px] rounded-lg border px-4 py-3 text-sm leading-normal outline-none transition focus:ring-1";

function PracticeAreaSelect({
  value,
  onChange,
  theme,
}: {
  value: PracticeArea | "";
  onChange: (value: PracticeArea | "") => void;
  theme: FormTheme;
}) {
  const styles = themeStyles[theme];

  return (
    <div className="relative w-full">
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value as PracticeArea | "")}
        aria-label="Área de práctica"
        className={`${fieldBase} ${styles.field} appearance-none pr-10 ${
          value === "" ? styles.selectEmpty : styles.selectFilled
        }`}
      >
        <option value="" disabled>
          Área de práctica
        </option>
        {PRACTICE_AREAS.map((area) => (
          <option key={area.value} value={area.value} className={styles.option}>
            {area.label}
          </option>
        ))}
      </select>
      <svg
        className={`pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 ${styles.chevron}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  );
}

export default function WaitlistForm({
  compact = false,
  theme = "dark",
}: {
  compact?: boolean;
  theme?: FormTheme;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [practiceArea, setPracticeArea] = useState<PracticeArea | "">("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const styles = themeStyles[theme];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, practiceArea, website }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Algo salió mal.");
        return;
      }

      setStatus("success");
      setMessage("Listo. Te avisaremos cuando abramos acceso.");
      setEmail("");
      setName("");
      setPracticeArea("");
      setWebsite("");
    } catch {
      setStatus("error");
      setMessage("Error de conexión. Intenta de nuevo.");
    }
  }

  if (status === "success") {
    return (
      <div
        className={`rounded-lg border px-6 py-5 text-center ${styles.success} ${
          compact ? "max-w-md" : "max-w-lg"
        }`}
      >
        <p className="text-sm font-medium">{message}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-3 ${compact ? "max-w-md" : "max-w-lg"}`}
    >
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="pointer-events-none absolute h-0 w-0 opacity-0"
      />
      {!compact && (
        <input
          type="text"
          placeholder="Nombre (opcional)"
          value={name}
          maxLength={100}
          autoComplete="name"
          onChange={(e) => setName(e.target.value)}
          className={`${fieldBase} ${styles.field} ${styles.placeholder}`}
        />
      )}
      <PracticeAreaSelect value={practiceArea} onChange={setPracticeArea} theme={theme} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          type="email"
          required
          placeholder="tu@correo.com"
          value={email}
          maxLength={254}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          className={`${fieldBase} ${styles.field} ${styles.placeholder} flex-1`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`min-h-[46px] shrink-0 rounded-lg px-6 py-3 text-sm font-semibold transition disabled:opacity-60 ${styles.button}`}
        >
          {status === "loading" ? "Enviando…" : "Unirme"}
        </button>
      </div>
      {status === "error" && (
        <p className={`text-sm ${styles.error}`}>{message}</p>
      )}
    </form>
  );
}
