import Link from "next/link";
import WaitlistForm from "./WaitlistForm";

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
  },
];

const steps = [
  {
    num: "01",
    title: "Describe tu asunto",
    text: "Abre un chat o proyecto y plantea tu consulta legal con el contexto que necesites.",
  },
  {
    num: "02",
    title: "El agente investiga",
    text: "En segundo plano consulta fuentes, ejecuta cálculos y cruza referencias — todo en vivo.",
  },
  {
    num: "03",
    title: "Recibe insight accionable",
    text: "Obtén respuestas citables, guardadas en tu memoria legal para futuras consultas.",
  },
];

export default function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/5 bg-navy-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          Lawyer<span className="text-silver">tec</span>
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          <a href="#funciones" className="text-sm text-silver-muted transition hover:text-white">
            Funciones
          </a>
          <a href="#como-funciona" className="text-sm text-silver-muted transition hover:text-white">
            Cómo funciona
          </a>
          <a
            href="#waitlist"
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-navy-950 transition hover:bg-silver"
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
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="animate-pulse-glow absolute -top-32 left-1/2 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
        <div className="animate-pulse-glow absolute top-1/2 -right-32 h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl animation-delay-300" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="animate-fade-up opacity-0-start mb-6 inline-block rounded-full border border-white/10 px-4 py-1.5 text-xs font-medium tracking-wide text-silver uppercase">
            IA legal para abogados en México
          </p>
          <h1 className="animate-fade-up opacity-0-start animation-delay-100 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Investigación legal seria.
            <br />
            <span className="text-silver">En minutos, no horas.</span>
          </h1>
          <p className="animate-fade-up opacity-0-start animation-delay-200 mx-auto mt-6 max-w-xl text-base leading-relaxed text-silver-muted sm:text-lg">
            Lawyertec es tu agente especializado: busca leyes y reglamentos en vivo,
            calcula plazos y montos, y revisa documentos con respuestas citables —
            todo guardado en tu memoria legal personal.
          </p>
          <div className="animate-fade-up opacity-0-start animation-delay-300 mt-10 flex justify-center">
            <WaitlistForm compact />
          </div>
        </div>

        <div className="animate-fade-up opacity-0-start animation-delay-400 mx-auto mt-16 max-w-2xl">
          <div className="animate-float rounded-xl border border-white/10 bg-navy-800/40 p-1 shadow-2xl shadow-black/40">
            <div className="rounded-lg bg-navy-900/80 p-5">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-2 text-xs text-silver-muted">Revisión de contrato — Proyecto Mercantil</span>
              </div>
              <div className="space-y-3 text-sm">
                <div className="rounded-lg bg-navy-800/60 px-4 py-3 text-silver-muted">
                  ¿Cuál es el plazo de prescripción para esta acción mercantil según el Código de Comercio?
                </div>
                <div className="rounded-lg border border-white/5 bg-navy-950/60 px-4 py-3">
                  <p className="text-white">
                    Según el art. 1076 CCom, el plazo es de <span className="font-medium text-silver">10 años</span>.
                    Calculé la fecha límite: <span className="font-medium text-silver">12 mar 2029</span>.
                  </p>
                  <p className="mt-2 text-xs text-silver-muted">
                    ↳ Guardado en memoria · 3 referencias cruzadas
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section id="funciones" className="border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Lo que nos distingue
          </h2>
          <p className="mt-4 text-silver-muted">
            No es otro chat genérico. Es un agente legal que trabaja como tú —
            con herramientas, fuentes y memoria.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-white/5 bg-navy-900/40 p-6 transition hover:border-white/10 hover:bg-navy-800/40"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-silver transition group-hover:border-silver/30 group-hover:text-white">
                {f.icon}
              </div>
              <h3 className="text-lg font-medium text-white">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-muted">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section id="como-funciona" className="border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Así de simple
          </h2>
          <p className="mt-4 text-silver-muted">
            Un flujo limpio. Sin curva de aprendizaje.
          </p>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.num} className="relative">
              <span className="text-4xl font-bold text-white/10">{s.num}</span>
              <h3 className="mt-2 text-lg font-medium text-white">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-silver-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WaitlistSection() {
  return (
    <section id="waitlist" className="border-t border-white/5 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Acceso anticipado
          </h2>
          <p className="mt-4 text-silver-muted">
            Estamos preparando el lanzamiento. Únete a la lista de espera y sé de
            los primeros abogados en probar Lawyertec.
          </p>
          <div className="mt-8 flex justify-center">
            <WaitlistForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <p className="text-sm text-silver-muted">
          © {new Date().getFullYear()} Lawyertec. Todos los derechos reservados.
        </p>
        <div className="flex gap-6">
          <Link href="/privacidad" className="text-sm text-silver-muted transition hover:text-white">
            Privacidad
          </Link>
        </div>
      </div>
    </footer>
  );
}
