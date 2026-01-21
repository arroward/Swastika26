'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import Countdown from '@/components/Countdown';

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
        <main ref={container} className="bg-transparent min-h-screen text-white overflow-hidden selection:bg-[var(--accent-main)] selection:text-white relative">

            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between">
                <div className="font-display font-bold text-2xl tracking-tighter">Swastika<span className="text-[var(--accent-main)]">.</span>live</div>
                <div className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
                    <a href="#speakers" className="text-sm font-medium hover:text-[var(--accent-main)] transition-colors">Speakers</a>
                    <a href="#agenda" className="text-sm font-medium hover:text-[var(--accent-main)] transition-colors">Agenda</a>
                    <a href="#venue" className="text-sm font-medium hover:text-[var(--accent-main)] transition-colors">Venue</a>
                    <a href="#contact" className="text-sm font-medium hover:text-[var(--accent-main)] transition-colors">Contact</a>
                </div>
                <div className="w-12 md:w-16 opacity-80 hover:opacity-100 transition-opacity">
                    <img src="/logo/WH_LOGO.svg" alt="Swastika Logo" className="w-full h-auto object-contain" />
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-screen flex flex-col items-center justify-center pt-20">

                {/* Background Glows */}
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] pointer-events-none" />

                <div className="z-10 text-center relative max-w-[90vw]">
                    <h1 className="text-[12vw] leading-none font-black font-cinzel tracking-normal flex justify-center">
                        {"SWASTIKA".split('').map((c, i) => (
                            <span key={i} className="hero-char inline-block transform origin-bottom">{c}</span>
                        ))}
                    </h1>
                </div>

                <Countdown />

                <div className="mt-8 text-center z-20 relative">
                    <p className="text-2xl md:text-3xl font-cinzel font-bold tracking-widest text-white">
                        FEB 20 | 21
                    </p>
                </div>

                <div className="hero-sub mt-4 text-center max-w-xl mx-auto px-4 z-20">
                    <p className="text-xl md:text-2xl text-white font-cinzel tracking-wide">
                        National Level Techno Cultural Fest
                    </p>
                </div>
            </section>

        </main>
    );
}
