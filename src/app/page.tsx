'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import Countdown from '@/components/Countdown';
import CursorSpotlight from '@/components/CursorSpotlight';

export default function Home() {
  const container = useRef(null);

  useGSAP(() => {
    // Hero Text Reveal
    gsap.from('.hero-char', {
      y: 100,
      opacity: 0,
      duration: 2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.5
    });

    // Subtitle Reveal
    gsap.from('.hero-sub', {
      y: 20,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 1.5
    });

  }, { scope: container });

  return (
    <main ref={container} className="bg-transparent min-h-screen text-white overflow-hidden selection:bg-[var(--accent-main)] selection:text-white relative cursor-default">

      {/* Premium Cursor Lighting */}
      <CursorSpotlight />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto font-display font-bold text-2xl tracking-tighter mix-blend-difference">swastika<span className="text-[var(--accent-main)]">.</span>live</div>
        <div className="pointer-events-auto w-12 md:w-16 opacity-80 hover:opacity-100 transition-opacity">
          <img src="/logo/WH_LOGO.svg" alt="Swastika Logo" className="w-full h-auto object-contain" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20">

        {/* Dynamic Background Glows (subtler now with spotlight) */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

        <div className="z-20 text-center relative max-w-[90vw]">
          <h1 className="text-[12vw] leading-none font-black font-cinzel tracking-normal flex justify-center drop-shadow-2xl">
            {"SWASTIKA".split('').map((c, i) => (
              <span key={i} className="hero-char inline-block transforn origin-bottom text-shimmer">{c}</span>
            ))}
          </h1>
        </div>

        <div className="w-full max-w-[90vw] md:max-w-[70vw] mx-auto">
          <Countdown />
        </div>

        <div className="mt-12 text-center z-20 relative">
          <p className="text-2xl md:text-3xl font-cinzel font-bold tracking-widest text-white/90 drop-shadow-lg">
            FEB 20 | 21
          </p>
        </div>

        <div className="hero-sub mt-4 w-full text-center px-4 z-20">
          <p className="text-sm md:text-lg text-white/80 font-cinzel tracking-widest font-light whitespace-nowrap">
            National Level Techno Cultural Fest
          </p>
        </div>

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-50 animate-bounce">
            <span className="text-[10px] tracking-[0.3em] font-jost mb-2">SCROLL</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white to-transparent" />
        </div> */}

      </section>

    </main>
  );
}
