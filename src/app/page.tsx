'use client';

import CursorSpotlight from '@/components/CursorSpotlight';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';

export default function Home() {
  return (
    <main className="bg-transparent h-screen w-screen text-white overflow-hidden selection:bg-[var(--accent-main)] selection:text-white relative cursor-default">

      {/* Premium Cursor Lighting */}
      <CursorSpotlight />

      <Navbar />

      <Hero />

    </main>
  );
}
