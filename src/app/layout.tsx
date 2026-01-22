import type { Metadata } from "next";
import { Syne, Inter, Cinzel_Decorative, Jost } from "next/font/google";
import "./globals.css";
import "./tw-animate.css";
import LenisScroll from "@/components/LenisScroll";
import Preloader from "@/components/Preloader";
import GradientBackground from "@/components/GradientBackground";

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

const cinzel = Cinzel_Decorative({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Swastika.26",
  description: "Join the revolution. National Level Techno-Cultural Fest.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Swastika.26",
  },
};

export const viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${cinzel.variable} ${jost.variable}`} suppressHydrationWarning>
      <body className="bg-noise bg-black">
        <LenisScroll />
        <GradientBackground />
        <Preloader />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
