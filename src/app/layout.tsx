import type { Metadata } from "next";
import { Elms_Sans, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const elmsSans = Elms_Sans({
  variable: "--font-elms",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lawyertec — IA legal para abogados en México",
  description:
    "Agente de IA especializado en derecho mexicano. Investigación en vivo, cálculos legales, revisión de documentos y memoria legal personal.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
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
    <html
      lang="es"
      className={`${inter.variable} ${elmsSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-950 font-sans text-white">
        {children}
      </body>
    </html>
  );
}
