"use client";

import { useState } from "react";
import { PRACTICE_AREAS, type PracticeArea } from "@/lib/practice-areas";

type Status = "idle" | "loading" | "success" | "error";

const fieldClassName =
  "w-full min-h-[46px] rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm leading-normal text-white outline-none transition focus:border-silver/40 focus:ring-1 focus:ring-silver/20";

function PracticeAreaSelect({
  value,
  onChange,
}: {
  value: PracticeArea | "";
  onChange: (value: PracticeArea | "") => void;
}) {
  return (
    <div className="relative w-full">
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value as PracticeArea | "")}
        aria-label="Área de práctica"
        className={`${fieldClassName} appearance-none pr-10 ${
          value === "" ? "text-silver-muted" : "text-white"
        }`}
      >
        <option value="" disabled>
          Área de práctica
        </option>
        {PRACTICE_AREAS.map((area) => (
          <option key={area.value} value={area.value} className="bg-navy-900 text-white">
            {area.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute top-1/2 right-4 h-4 w-4 -translate-y-1/2 text-silver-muted"
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

export default function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [practiceArea, setPracticeArea] = useState<PracticeArea | "">("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

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
        className={`rounded-lg border border-white/10 bg-navy-800/60 px-6 py-5 text-center ${
          compact ? "max-w-md" : "max-w-lg"
        }`}
      >
        <p className="text-sm font-medium text-white">{message}</p>
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
          className={`${fieldClassName} placeholder:text-silver-muted`}
        />
      )}
      <PracticeAreaSelect value={practiceArea} onChange={setPracticeArea} />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <input
          type="email"
          required
          placeholder="tu@correo.com"
          value={email}
          maxLength={254}
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          className={`${fieldClassName} flex-1 placeholder:text-silver-muted`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="min-h-[46px] shrink-0 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-silver disabled:opacity-60"
        >
          {status === "loading" ? "Enviando…" : "Unirme"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-sm text-red-400">{message}</p>
      )}
    </form>
  );
}
