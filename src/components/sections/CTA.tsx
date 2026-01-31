'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useConfig } from '@/contexts/ConfigContext';

export default function CTA() {
    const { config } = useConfig();
    const { ctaContent } = config;
    const containerRef = useRef<HTMLElement>(null);
    const textContainerRef = useRef<HTMLDivElement>(null);

    // Refs for individual elements if needed for specific animations
    const titleRef = useRef<HTMLHeadingElement>(null);

    // Refs for quick setters
    const xTo = useRef<((value: number) => void) | null>(null);
    const yTo = useRef<((value: number) => void) | null>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        // QuickTo setup for parallax
        if (textContainerRef.current) {
            xTo.current = gsap.quickTo(textContainerRef.current, "x", { duration: 0.5, ease: "power3" });
            yTo.current = gsap.quickTo(textContainerRef.current, "y", { duration: 0.5, ease: "power3" });
        }

        // Entrance Animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(textContainerRef.current?.children || [], {
            y: 100,
            opacity: 0,
            duration: 1.2,
            stagger: 0.15,
            ease: "power3.out"
        });

    }, { scope: containerRef });

    const handleMove = (e: React.MouseEvent) => {
        if (!xTo.current || !yTo.current) return;

        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;

        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        // Move text slightly with mouse
        xTo.current(relX * 30);
        yTo.current(relY * 30);

        // Move background glows opposite
        gsap.to('.glow-bg', {
            x: relX * -60,
            y: relY * -60,
            duration: 1.5,
            ease: "power2.out",
            overwrite: "auto"
        });
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMove}
            className="relative w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex items-center justify-center overflow-hidden bg-black panel select-none cursor-default snap-start snap-always"
        >
            {/* Background Atmosphere */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-red-900/10 rounded-full blur-[100px] glow-bg transform-gpu" />
                <div className="absolute top-1/4 left-1/3 w-[40vw] h-[40vw] bg-orange-900/5 rounded-full blur-[80px] glow-bg animate-pulse-slow transform-gpu" />
            </div>

            {/* Main Content - Fully Visible Stack */}
            <div
                ref={textContainerRef}
                className="relative z-10 flex flex-col items-center justify-center text-center gap-2 md:gap-4 w-full"
            >
                {/* 1. DON'T MISS OUT */}
                <div className="overflow-hidden w-full">
                    <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-8xl font-black font-syne text-white tracking-tighter mix-blend-difference hover:text-red-500 transition-colors duration-500">
                        {ctaContent.line1}
                    </h2>
                </div>

                {/* 2. BE PART OF */}
                <div className="overflow-hidden mt-2 md:mt-6">
                    <p className="text-lg md:text-2xl font-cinzel text-red-500 font-bold tracking-[0.3em] uppercase">
                        {ctaContent.line2}
                    </p>
                </div>

                {/* 3. SWASTIKA */}
                <div className="overflow-hidden w-full">
                    <h1 className="text-5xl md:text-8xl lg:text-[11rem] font-black font-syne text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-500 tracking-tighter leading-none glow-text drop-shadow-2xl">
                        {ctaContent.main}
                    </h1>
                </div>
            </div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none z-0" />
        </section>
    );
}
