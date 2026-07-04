import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lawyertec — IA legal para abogados en México",
  description:
    "Agente de IA especializado en derecho mexicano. Investigación en vivo, cálculos legales, revisión de documentos y memoria legal personal.",
  openGraph: {
    title: "Lawyertec — IA legal para abogados en México",
    description:
      "Investigación legal seria en minutos. Búsqueda en vivo, cálculos y revisión de documentos con respuestas citables.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-navy-950 text-white">
        {children}
      </body>
    </html>
  );
}
