'use client';

import Hero from '@/components/sections/Hero';
import AboutEvent from '@/components/sections/AboutEvent';
import AboutCollege from '@/components/sections/AboutCollege';
import MarqueeSection from '@/components/sections/MarqueeSection';
import Proshow from '@/components/sections/Proshow';
import Events from '@/components/sections/Events';
import Gallery from '@/components/sections/Gallery';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';


export default function Home() {
  return (
    <main className="bg-transparent min-h-screen w-full text-white overflow-x-hidden selection:bg-[var(--accent-main)] selection:text-white relative">
      {/* Premium Cursor Lighting */}

      <div id="home"><Hero /></div>
      <div id="about"><AboutEvent /></div>
      <AboutCollege />
      <MarqueeSection />
      <div id="proshow"><Proshow /></div>
      <div id="events"><Events /></div>
      <Gallery />
      <CTA />
      <div id="footer"><Footer /></div>

    </main>
  );
}
