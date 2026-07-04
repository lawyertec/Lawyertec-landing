import Link from "next/link";
import type { Metadata } from "next";
import Header, { Footer } from "@/components/Landing";

export const metadata: Metadata = {
  title: "Privacidad — Lawyertec",
  description: "Política de privacidad de Lawyertec.",
};

export default function PrivacidadPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 pt-32 pb-20">
        <h1 className="text-3xl font-semibold text-white">Política de privacidad</h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-silver-muted">
          <p>
            En Lawyertec respetamos tu privacidad. Esta página describe cómo
            recopilamos y usamos la información que nos proporcionas.
          </p>
          <section>
            <h2 className="mb-2 text-base font-medium text-white">Datos que recopilamos</h2>
            <p>
              Al unirte a la lista de espera, recopilamos tu correo electrónico
              y, opcionalmente, tu nombre. Estos datos se usan únicamente para
              comunicarte sobre el lanzamiento de Lawyertec.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-base font-medium text-white">Almacenamiento</h2>
            <p>
              Los datos se almacenan de forma segura en Supabase (PostgreSQL
              alojado). No vendemos ni compartimos tu información con terceros
              con fines comerciales.
            </p>
          </section>
          <section>
            <h2 className="mb-2 text-base font-medium text-white">Tus derechos</h2>
            <p>
              Puedes solicitar la eliminación de tus datos en cualquier momento
              escribiéndonos a{" "}
              <a href="mailto:privacidad@lawyertec.com" className="text-silver underline">
                privacidad@lawyertec.com
              </a>
              .
            </p>
          </section>
        </div>
        <Link
          href="/"
          className="mt-10 inline-block text-sm text-silver transition hover:text-white"
        >
          ← Volver al inicio
        </Link>
      </main>
      <Footer />
    </>
  );
}
