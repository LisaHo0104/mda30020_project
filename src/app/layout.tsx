import type { Metadata } from "next";
import { Cormorant_Garamond, Parisienne } from "next/font/google";
import "./globals.css";
import "@/components/dome-gallery.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const parisienne = Parisienne({
  variable: "--font-parisienne",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Love Shield | HPV Green Flag Campaign",
  description:
    "A Gen Z-friendly HPV awareness campaign for care, confidence, and shared responsibility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${parisienne.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
