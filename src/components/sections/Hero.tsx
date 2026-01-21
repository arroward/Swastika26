'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Countdown from '@/components/Countdown';

export default function Hero() {
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
        <section ref={container} className="relative h-screen flex flex-col items-center justify-center pt-20">

            {/* Dynamic Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none opacity-50" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none opacity-50" />

            <div className="z-20 text-center relative max-w-[90vw]">
                <h1 className="text-[12vw] leading-none font-black font-cinzel tracking-normal flex justify-center drop-shadow-2xl">
                    <span className="hero-char">SWASTIKA</span>
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
                <p className="text-[10px] md:text-lg text-white/80 font-jost tracking-[0.2em] font-light uppercase whitespace-nowrap">
                    National Level Techno Cultural Fest
                </p>
            </div>

        </section>
    );
}
