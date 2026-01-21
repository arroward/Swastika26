'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Countdown from '../Countdown';

export default function Hero() {
    const container = useRef(null);

    useGSAP(() => {
        // Hero Text Stagger
        gsap.from('.hero-char', {
            yPercent: 120,
            opacity: 0,
            duration: 1.5,
            stagger: 0.04,
            ease: 'power4.out',
            delay: 0.2
        });

        // Subtitle Fade
        gsap.from('.hero-content', {
            y: 30,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out',
            delay: 1.2
        });

    }, { scope: container });

    return (
        <section ref={container} className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden bg-grid">

            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
            </div>

            {/* Main Heading */}
            <div className="z-10 text-center relative w-full px-4">
                <div className="flex justify-center overflow-hidden mb-8 md:mb-12">
                    <h1 className="text-[13vw] md:text-[14vw] leading-[0.8] font-black font-display tracking-tighter text-white mix-blend-difference selection:bg-white selection:text-black">
                        {"SWASTIKA".split('').map((c, i) => (
                            <span key={i} className="hero-char inline-block transform origin-bottom">{c}</span>
                        ))}
                    </h1>
                </div>

                {/* Massive Countdown */}
                <div className="hero-content">
                    <Countdown />
                </div>

                {/* Subtext */}
                <div className="hero-content mt-12 md:mt-16 flex flex-col items-center gap-4">
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                    <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light max-w-md text-center leading-relaxed">
                        The <span className="text-white font-medium">NexGen</span> Tech Summit <br />
                        Where <span className="text-[var(--accent-blue)]">Innovation</span> Meets <span className="text-[var(--accent-purple)]">Reality</span>.
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
                <span className="text-[10px] uppercase tracking-widest text-white/50">Scroll</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
            </div>
        </section>
    );
}
