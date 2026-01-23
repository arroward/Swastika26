import type { Metadata } from "next";
import { Syne, Inter, Cinzel_Decorative, Jost } from "next/font/google";
import "./globals.css";
import "./tw-animate.css";
import LenisScroll from "@/components/LenisScroll";
import Preloader from "@/components/Preloader";
import InteractiveRedGradient from "@/components/InteractiveRedGradient";
import GradientBackground from "@/components/GradientBackground";
import NoiseOverlay from "@/components/NoiseOverlay";
import { LoadingProvider } from "@/components/LoadingProvider";
import Navbar from "@/components/Navbar";
import MainContainer from "@/components/MainContainer";

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
  icons: {
    icon: "/logo/wh_sw.png",
    apple: "/logo/wh_sw.png",
  },
  openGraph: {
    title: "Swastika 2026 - Techno Cultural Fest",
    description: "National Level Techno-Cultural Fest - Join the revolution",
    type: "website",
    images: ["/logo/wh_sw.png"],
  },
};

export const viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${cinzel.variable} ${jost.variable}`} suppressHydrationWarning>
      <body className="bg-transparent h-[100dvh] w-full overflow-hidden p-2 md:p-4 lg:p-6 flex flex-col gap-2 md:gap-4">
        <LoadingProvider>
          <GradientBackground />
          <LenisScroll />
          {/* <InteractiveRedGradient /> */}
          <NoiseOverlay />
          <Preloader />
          <Navbar />
          <MainContainer>
            {children}
          </MainContainer>
        </LoadingProvider>
      </body>
    </html>
  );
}
