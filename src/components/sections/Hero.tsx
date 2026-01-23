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
        <section ref={container} className="relative h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex flex-col items-center justify-evenly pt-2 pb-4 px-1 md:px-4 overflow-hidden rounded-[2rem]">
            <BackgroundGlows />

            <div className="z-20 text-center relative max-w-full flex-shrink-0 flex flex-col items-center justify-center">

                {/* Logo from Splash Screen */}
                <div className="hero-logo w-24 h-24 md:w-28 md:h-28 lg:w-28 lg:h-28 relative z-50 mb-2">
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

                {/* Main Title - Stacked for Impact */}
                <h1 className="flex flex-col items-center leading-none font-black font-cinzel tracking-tight relative z-20 w-full max-w-[98vw]">
                    <span
                        className="hero-char text-[15vw] md:text-[11vw] lg:text-[7.5vw] text-white select-none will-change-transform"
                        style={{
                            textShadow: '0 0 10px rgba(220, 38, 38, 0.5), 0 0 20px rgba(220, 38, 38, 0.3), 0 4px 2px rgba(0,0,0,0.5)'
                        }}
                    >
                        {heroContent.title}
                    </span>
                    <span
                        className="hero-char text-[7vw] md:text-[5vw] lg:text-[3vw] text-white/90 mt-1 md:mt-2 z-10 relative tracking-widest will-change-transform"
                        style={{
                            textShadow: '0 0 15px rgba(220, 38, 38, 0.4)'
                        }}
                    >
                        {heroContent.year}
                    </span>
                </h1>
            </div>

            {/* Countdown - Adjusted scaling and margins */}
            <div className="w-full max-w-full md:max-w-[80vw] lg:max-w-[70vw] mx-auto scale-[0.95] md:scale-85 lg:scale-90 origin-center z-30 relative flex-shrink-0">
                <Countdown />
            </div>

            {/* Date/Subtitle */}
            <div className="text-center z-20 relative flex-shrink-0 pb-1">
                <div className="hero-sub flex items-center gap-3 md:gap-4 text-white/60 font-jost text-base md:text-sm lg:text-base tracking-widest uppercase">
                    <span className="w-8 md:w-12 h-[1px] bg-white/20"></span>
                    {heroContent.dates}
                    <span className="w-8 md:w-12 h-[1px] bg-white/20"></span>
                </div>
            </div>

        </section>
    );
}
