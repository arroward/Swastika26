import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google"; // Syne has a nice wide/geometric feel
import "./globals.css";
import LenisScroll from "@/components/LenisScroll";
import Preloader from "@/components/Preloader";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swastika '26 | The Future of Tech",
  description: "Join the revolution. National Level Techno-Cultural Fest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <LenisScroll />
      <body>
        <Preloader />
        {children}
      </body>
    </html>
  );
}
