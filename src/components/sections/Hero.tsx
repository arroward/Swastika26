'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { useLoading } from '@/components/LoadingProvider';
import Countdown from '@/components/Countdown';
import VariableProximity from '@/components/VariableProximity';
import BackgroundGlows from '@/components/BackgroundGlows';
import { siteConfig } from '@/config/site.config';
import { heroContent } from '@/data/hero';

export default function Hero() {
    const container = useRef(null);
    const { isLoading } = useLoading();


    useGSAP(() => {
        // Logo Reveal code removed to allow Framer Motion layoutId transition


        // Hero Text Reveal
        gsap.from('.hero-char', {
            y: 50,
            opacity: 0,
            duration: 1.5,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.5,
            clearProps: 'all'
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
        <section ref={container} className="relative min-h-screen flex flex-col items-center justify-center pt-20 md:pt-32 pb-12 md:pb-16 px-4 overflow-hidden">
            <BackgroundGlows />

            <div className="z-20 text-center relative max-w-[95vw] md:max-w-[90vw] flex flex-col items-center">

                {/* Logo from Splash Screen */}
                <div className="hero-logo mb-4 md:mb-6 w-24 h-24 md:w-32 md:h-32 relative z-50">
                    {!isLoading && (
                        <motion.img
                            layoutId="shared-logo"
                            src={siteConfig.logos.main}
                            alt={`${siteConfig.name} Logo`}
                            className="w-full h-full drop-shadow-[0_0_25px_rgba(220,38,38,0.6)] animate-pulse-slow will-change-transform"
                            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                        />
                    )}
                </div>

                {/* Overhead Label
                <div className="hero-sub mb-6 md:mb-8 overflow-hidden">
                    <p className="text-xs md:text-sm lg:text-base text-accent-main font-mono tracking-[0.3em] md:tracking-[0.5em] uppercase border border-accent-main/30 px-3 py-2 md:px-4 md:py-2 rounded-full backdrop-blur-md bg-black/30">
                        Techno Cultural Fest
                    </p>
                </div> */}

                {/* Main Title - Stacked for Impact */}
                <h1 className="flex flex-col items-center leading-none font-black font-cinzel tracking-tight relative z-20">
                    <span
                        className="hero-char text-[14vw] md:text-[10vw] lg:text-[9vw] text-white select-none will-change-transform"
                        style={{
                            textShadow: '0 0 10px rgba(220, 38, 38, 0.5), 0 0 20px rgba(220, 38, 38, 0.3), 0 4px 2px rgba(0,0,0,0.5)'
                        }}
                    >
                        {heroContent.title}
                    </span>
                    <span
                        className="hero-char text-[7vw] md:text-[5vw] lg:text-[4vw] text-white/90 mt-2 z-10 relative tracking-widest will-change-transform"
                        style={{
                            textShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                        }}
                    >
                        {heroContent.year}
                    </span>
                </h1>
            </div>

            <div className="w-full max-w-full md:max-w-[80vw] lg:max-w-[70vw] mx-auto mt-4 md:mt-6 lg:mt-8 mb-4 md:mb-6 scale-[0.85] md:scale-75 lg:scale-100 origin-center z-30 relative">
                <Countdown />
            </div>

            <div className="mt-4 md:mt-6 text-center z-20 relative">
                <div className="hero-sub flex items-center gap-3 md:gap-4 text-white/60 font-jost text-xs md:text-sm lg:text-lg tracking-widest uppercase">
                    <span className="w-8 md:w-12 h-[1px] bg-white/20"></span>
                    {heroContent.dates}
                    <span className="w-8 md:w-12 h-[1px] bg-white/20"></span>
                </div>
            </div>

        </section>
    );
}
