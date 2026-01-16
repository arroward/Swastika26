import type { Metadata } from "next";
import { Cinzel, Space_Grotesk } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export const metadata: Metadata = {
  title: "SWASTIKA '26 | The Portal Opens",
  description: "Official portal for Swastika 2026. The countdown begins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <div className="grain-overlay" />
        {children}
      </body>
    </html>
  );
}
