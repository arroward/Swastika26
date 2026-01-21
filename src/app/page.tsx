'use client';

import CursorSpotlight from '@/components/CursorSpotlight';
import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Proshow from '@/components/sections/Proshow';
import Events from '@/components/sections/Events';
import Gallery from '@/components/sections/Gallery';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="bg-transparent min-h-screen w-full text-white overflow-x-hidden selection:bg-[var(--accent-main)] selection:text-white relative cursor-default">

      {/* Premium Cursor Lighting */}
      <CursorSpotlight />

      <Navbar />

      <Hero />
      <About />
      <Proshow />
      <Events />
      <Gallery />
      <CTA />
      <Footer />

    </main>
  );
}
