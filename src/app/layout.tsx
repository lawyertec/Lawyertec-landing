import type { Metadata, Viewport } from "next";
import { Elms_Sans, Inter } from "next/font/google";
import { rootMetadata } from "@/lib/metadata";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  fallback: ["system-ui", "sans-serif"],
});

const elmsSans = Elms_Sans({
  variable: "--font-elms",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  fallback: ["Inter", "system-ui", "sans-serif"],
  adjustFontFallback: false,
});

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  themeColor: "#040810",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-MX"
      className={`${inter.variable} ${elmsSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy-950 font-sans text-white">
        {children}
      </body>
    </html>
  );
}
