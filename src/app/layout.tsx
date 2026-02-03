import type { Metadata } from "next";
import { Syne, Inter, Cinzel_Decorative, Jost } from "next/font/google";
import "./globals.css";
import "./tw-animate.css";

import ClientLayout from "@/components/ClientLayout";
import { LoadingProvider } from "@/components/LoadingProvider";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://swastika.live"),
  title: {
    default: "Swastika 2026 - National Level Techno-Cultural Fest",
    template: "%s | Swastika 2026",
  },
  description: "Join the revolution at Swastika 2026, the National Level Techno-Cultural Fest at Mar Baselios Christian College of Engineering and Technology. Experience innovation, culture, and technology like never before.",
  keywords: ["Swastika", "Swastika 2026", "Techno-Cultural Fest", "College Fest", "Kerala", "Engineering", "Technology", "Culture", "MBC", "Peermade"],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Swastika 2026",
  },
  icons: {
    icon: "/logo/wh_sw.png",
    apple: "/logo/wh_sw.png",
  },
  openGraph: {
    title: "Swastika 2026 - Techno Cultural Fest",
    description: "National Level Techno-Cultural Fest - Join the revolution",
    type: "website",
    url: "https://swastika.live",
    siteName: "Swastika 2026",
    images: [{
      url: "/logo/wh_sw.png",
      width: 800,
      height: 600,
      alt: "Swastika 2026 Logo",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swastika 2026",
    description: "National Level Techno-Cultural Fest",
    images: ["/logo/wh_sw.png"],
  },
  alternates: {
    canonical: './',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
      <body className="bg-transparent h-[100dvh] w-full overflow-hidden">
        <LoadingProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LoadingProvider>
      </body>
    </html>
  );
}
