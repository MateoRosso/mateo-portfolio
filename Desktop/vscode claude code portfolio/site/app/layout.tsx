import type { Metadata } from "next";
import { Geist, Geist_Mono, EB_Garamond, Michroma } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-garamond",
  subsets: ["latin"],
});

const michroma = Michroma({
  variable: "--font-michroma",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MateoGraphics — Miniaturas que generan clics",
  description:
    "Portfolio de MateoGraphics. Editor de miniaturas para YouTube. Diseño impactante para creadores de contenido.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${ebGaramond.variable} ${michroma.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-hidden bg-[#030303]">{children}</body>
    </html>
  );
}
