'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Countdown from '@/components/Countdown';
import VariableProximity from '@/components/VariableProximity';

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
        <section ref={container} className="relative min-h-screen flex flex-col items-center justify-center pt-32 md:pt-40 pb-16 md:pb-20 px-4 overflow-hidden">

            <div className="z-20 text-center relative max-w-[95vw] md:max-w-[90vw] flex flex-col items-center">

                {/* Overhead Label */}
                <div className="hero-sub mb-6 md:mb-8 overflow-hidden">
                    <p className="text-xs md:text-sm lg:text-base text-accent-main font-mono tracking-[0.3em] md:tracking-[0.5em] uppercase border border-accent-main/30 px-3 py-2 md:px-4 md:py-2 rounded-full backdrop-blur-md bg-black/30">
                        Techno Cultural Fest
                    </p>
                </div>

                {/* Main Title - Stacked for Impact */}
                <h1 className="flex flex-col items-center leading-none font-black font-cinzel tracking-tight drop-shadow-2xl mix-blend-difference">
                    <span className="hero-char text-[18vw] md:text-[15vw] lg:text-[12vw] text-transparent stroke-text-lg hover:text-white transition-colors duration-700 select-none">SWASTIKA</span>
                    <span className="hero-char text-[10vw] md:text-[8vw] lg:text-[6vw] text-white -mt-[3vw] md:-mt-[2vw] z-10 relative">2026</span>
                </h1>
            </div>

            <div className="w-full max-w-full md:max-w-[80vw] lg:max-w-[70vw] mx-auto mt-6 md:mt-8 lg:mt-12 mb-6 md:mb-8 scale-[0.65] md:scale-75 lg:scale-100 origin-center z-30 relative">
                <Countdown />
            </div>

            <div className="mt-6 md:mt-8 text-center z-20 relative">
                <div className="hero-sub flex items-center gap-3 md:gap-4 text-white/60 font-jost text-xs md:text-sm lg:text-lg tracking-widest uppercase">
                    <span className="w-8 md:w-12 h-[1px] bg-white/20"></span>
                    Feb 20 • 21
                    <span className="w-8 md:w-12 h-[1px] bg-white/20"></span>
                </div>
            </div>

        </section>
    );
}
