'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ClassicSplashProps {
    progress: number;
    isLoaded: boolean;
    onComplete?: () => void;
}

export default function ClassicSplash({ progress, isLoaded, onComplete }: ClassicSplashProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Initial Entrance Animations
        const tl = gsap.timeline();

        // Logo Entrance
        tl.fromTo(logoRef.current,
            { scale: 0.5, opacity: 0, rotation: 0 },
            {
                scale: 1,
                opacity: 1,
                rotation: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            }
        ).to(logoRef.current, {
            rotation: 5,
            yoyo: true,
            repeat: 1,
            duration: 0.2,
            ease: "power1.inOut"
        }, "-=0.5");


        // Content Reveal
        tl.fromTo(contentRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
            "-=1"
        );

        // Continuous Logo Pulse (using a separate tween/timeline to not block main)
        gsap.to(logoRef.current, {
            filter: "drop-shadow(0 0 40px rgba(220, 38, 38, 0.8))",
            duration: 2,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    // Handle Exit on Loaded
    useGSAP(() => {
        if (!isLoaded) return;

        // Find Hero Logo Target
        const heroLogo = document.querySelector('.hero-logo-img');
        const targetRect = heroLogo?.getBoundingClientRect();

        const exitTl = gsap.timeline({
            onComplete: () => {
                onComplete?.();
            }
        });

        // Fade out content
        exitTl.to(contentRef.current, {
            opacity: 0,
            scale: 0.9,
            duration: 0.5,
            ease: "power2.in"
        });

        if (targetRect && logoRef.current) {
            // Calculate position relative to viewport (fixed)
            const currentRect = logoRef.current.getBoundingClientRect();


            const x = targetRect.left - currentRect.left;
            const y = targetRect.top - currentRect.top;

            // Animate Logo to Target
            exitTl.to(logoRef.current, {
                x: x,
                y: y,
                width: targetRect.width,
                height: targetRect.height,
                duration: 1.5,
                ease: "expo.inOut"
            }, "<");
        } else {
            // Fallback exit if no target
            exitTl.to(logoRef.current, {
                opacity: 0,
                scale: 3,
                duration: 0.8,
                ease: "power2.in"
            }, "<");
        }

        // Fade out background slightly after logo starts moving
        exitTl.to(bgRef.current, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut"
        }, "-=0.5");

    }, { scope: containerRef, dependencies: [isLoaded] });

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] flex items-center justify-center">
            {/* Background Layer */}
            <div ref={bgRef} className="absolute inset-0 bg-black" />

            {/* Logo - Fixed at top */}
            <div className="absolute top-[20vh] left-1/2 -translate-x-1/2 z-50">
                <img
                    ref={logoRef}
                    src="/logo/WH_LOGO.svg"
                    alt="Swastika Logo"
                    className="w-24 h-24 md:w-32 md:h-32 object-contain"
                />
            </div>

            {/* Title - Centered */}
            <div ref={contentRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-20 z-10 opacity-0">
                <h1 className="text-4xl md:text-6xl font-cinzel font-black text-white tracking-tight">
                    SWASTIKA<span className="text-accent-main">.</span>26
                </h1>

                <div className="flex flex-col items-center gap-6">
                    {/* Progress Bar */}
                    <div className="w-40 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-accent-main to-red-600 transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    {/* Loading Dots */}
                    <div className="flex gap-2">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-2 h-2 bg-accent-main rounded-full animate-bounce"
                                style={{ animationDelay: `${i * 0.1}s` }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
