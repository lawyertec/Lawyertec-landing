"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function WaitlistForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
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
        body: JSON.stringify({ email, name }),
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
      {!compact && (
        <input
          type="text"
          placeholder="Nombre (opcional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder:text-silver-muted outline-none transition focus:border-silver/40 focus:ring-1 focus:ring-silver/20"
        />
      )}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 rounded-lg border border-white/10 bg-navy-900/80 px-4 py-3 text-sm text-white placeholder:text-silver-muted outline-none transition focus:border-silver/40 focus:ring-1 focus:ring-silver/20"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-navy-950 transition hover:bg-silver disabled:opacity-60"
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
