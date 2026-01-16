import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Swastika '26 – The Arena Awaits",
  description: "National Level Techno-Cultural Fest | Mar Baselios Christian College of Engineering and Technology, Peermade | February 20-21, 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
