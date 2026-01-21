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
import ScrollNav from '@/components/ScrollNav';
import { SmoothCursor } from '@/components/lightswind/smooth-cursor'
export default function Home() {
  return (
    <main className="bg-transparent min-h-screen w-full text-white overflow-x-hidden selection:bg-[var(--accent-main)] selection:text-white relative cursor-none">

      {/* Premium Cursor Lighting */}
      {/* <CursorSpotlight /> */}
      <SmoothCursor size={15} color="#dc2626" />

      <Navbar />
      <ScrollNav />

      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <div id="proshow"><Proshow /></div>
      <div id="events"><Events /></div>
      <div id="gallery"><Gallery /></div>
      <CTA />
      <div id="footer"><Footer /></div>

    </main>
  );
}
