'use client';


import Navbar from '@/components/Navbar';
import Hero from '@/components/sections/Hero';
import About from '../components/sections/About';
import MarqueeSection from '../components/sections/MarqueeSection';
import Proshow from '@/components/sections/Proshow';
import Events from '@/components/sections/Events';
import Gallery from '@/components/sections/Gallery';
import CTA from '@/components/sections/CTA';
import Footer from '@/components/sections/Footer';


export default function Home() {
  return (
    <main className="bg-transparent min-h-screen w-full text-white overflow-x-hidden selection:bg-[var(--accent-main)] selection:text-white relative">

      {/* Premium Cursor Lighting */}


      <Navbar />


      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <MarqueeSection />
      <div id="proshow"><Proshow /></div>
      <div id="events"><Events /></div>
      <div id="gallery" className="relative w-full overflow-hidden my-20">
        <div className="-rotate-3 scale-105">
          <Gallery />
        </div>
      </div>
      <CTA />
      <div id="footer"><Footer /></div>

    </main>
  );
}
