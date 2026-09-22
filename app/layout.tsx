import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";

// Archivo Expanded-ish weight for headlines — a geometric, slightly
// industrial grotesk that reads "workshop signage" rather than
// "startup landing page." Inter carries body copy and the price list,
// where tabular figures and long-run legibility matter more.
const display = Archivo({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Avtochexol.uz — Surxondaryo avtomobil saloni ustaxonasi",
  description:
    "Shumoizolyatsiya, chexol qayta tikish, suv o'tkazmaydigan salon poliki va potolok almashtirish — har bir avtomobil modeliga moslashtirilgan xizmatlar, aniq narxlar bilan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${display.variable} ${body.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
