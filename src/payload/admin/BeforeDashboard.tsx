import React from "react";

export function BeforeDashboard() {
  return (
    <div
      style={{
        background: "var(--theme-elevation-50)",
        border: "1px solid var(--theme-elevation-150)",
        borderRadius: "8px",
        marginBottom: "24px",
        padding: "24px 28px",
      }}
    >
      <h2 style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0 0 8px" }}>
        Bienvenido al CMS de Lawyertec
      </h2>
      <p style={{ color: "var(--theme-elevation-800)", lineHeight: 1.6, margin: "0 0 16px" }}>
        Edita la <strong>Página de inicio</strong>, haz clic en <strong>Guardar</strong>, y el sitio
        se reconstruye automáticamente en Vercel (1–3 minutos). Usa{" "}
        <strong>Vista previa en vivo</strong> para ver los cambios al instante, sin esperar al deploy.
      </p>
      <p style={{ color: "var(--theme-elevation-800)", lineHeight: 1.6, margin: 0 }}>
        <a href="/admin/globals/landing" style={{ fontWeight: 600 }}>
          Ir a Página de inicio →
        </a>
      </p>
    </div>
  );
}
