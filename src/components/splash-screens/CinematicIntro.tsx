'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface CinematicIntroProps {
    onComplete?: () => void;
    progress?: number;
}

const TEXT = 'SWASTIKA';

export default function CinematicIntro({ onComplete, progress = 0 }: CinematicIntroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const finalRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const mainLogoRef = useRef<HTMLImageElement>(null);
    const vignetteRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                onComplete?.();
                return;
            }

            const ctx = gsap.context(() => {
                const chars = gsap.utils.toArray<HTMLSpanElement>('.rapid-char');

                const tl = gsap.timeline({
                    defaults: { ease: 'power3.out' },
                    onComplete: () => {
                        const target = document.querySelector('.hero-logo-img');

                        if (target && mainLogoRef.current) {
                            const targetRect = target.getBoundingClientRect();
                            const initialRect = mainLogoRef.current.getBoundingClientRect();

                            const x = (targetRect.left + targetRect.width / 2) - (initialRect.left + initialRect.width / 2);
                            const y = (targetRect.top + targetRect.height / 2) - (initialRect.top + initialRect.height / 2);
                            const scale = targetRect.width / initialRect.width;

                            // Slide up background and other elements
                            gsap.to([bgRef.current, vignetteRef.current, logoRef.current], {
                                yPercent: -100,
                                duration: 1.2,
                                ease: 'power2.inOut'
                            });

                            gsap.to([yearRef.current, '.main-title', progressRef.current], {
                                y: -window.innerHeight,
                                duration: 1.2,
                                ease: 'power2.inOut'
                            });

                            // Animate main logo to target position
                            gsap.to(mainLogoRef.current, {
                                x: x,
                                y: y,
                                scale: scale,
                                filter: 'brightness(100%)', // Match target brightness
                                duration: 1.2,
                                ease: 'expo.inOut',
                                onComplete
                            });
                        } else {
                            // Fallback if target not found
                            gsap.to(containerRef.current, {
                                autoAlpha: 0,
                                duration: 1.2,
                                ease: 'power2.inOut',
                                onComplete
                            });
                        }
                    }
                });

                // Initial states
                gsap.set(chars, {
                    opacity: 0,
                    scale: 3,
                    filter: 'blur(15px)',
                    z: 200, // Start closer to camera
                    rotation: () => Math.random() * 20 - 10, // Subtle random rotation
                    willChange: 'transform, opacity, filter'
                });

                gsap.set([finalRef.current, yearRef.current], { autoAlpha: 0 });
                gsap.set(logoRef.current, {
                    autoAlpha: 0,
                    scale: 0.6,
                    filter: 'blur(20px)'
                });


                // Rapid letter blast
                tl.to(chars, {
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px) brightness(1.5)',
                    z: 0,
                    rotation: 0,
                    duration: 0.2,
                    stagger: {
                        each: 0.1,
                        from: "start",
                    }
                })
                    .to(chars, {
                        opacity: 0,
                        scale: 0.5,
                        filter: 'blur(10px) brightness(1)',
                        z: -100,
                        duration: 0.15,
                        stagger: {
                            each: 0.1,
                            from: "start",
                        }
                    }, '<+=0.05');

                // Reveal main logo & title
                tl.to(finalRef.current, { autoAlpha: 1 }, '+=0.3')
                    .fromTo(
                        '.main-title',
                        { scale: 1.8, filter: 'blur(30px)', opacity: 0 },
                        { scale: 1, filter: 'blur(0px)', opacity: 1, duration: 1.2, ease: 'expo.out' }
                    );

                // Year reveal
                tl.fromTo(
                    yearRef.current,
                    { autoAlpha: 0, letterSpacing: '2em', y: 30 },
                    { autoAlpha: 1, letterSpacing: '1em', y: 0, duration: 1.8, ease: 'power4.out' },
                    '-=1'
                );

                // Hold frame
                tl.to({}, { duration: 2 });

                // Subtle cinematic zoom
                gsap.to(containerRef.current, {
                    scale: 1.05,
                    duration: 12,
                    ease: 'sine.inOut'
                });
            }, containerRef);

            return () => ctx.revert();
        },
        { scope: containerRef }
    );

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden select-none"
        >
            {/* Black Background */}
            <div ref={bgRef} className="absolute inset-0 bg-black -z-10" />

            {/* Vignette */}
            <div ref={vignetteRef} className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,black_120%)] z-40" />

            {/* Background logo */}
            <div ref={logoRef} className="absolute inset-0 flex items-center justify-center z-0 opacity-0 invisible">
                <img
                    src="/logo/WH_LOGO.svg"
                    className="w-[70vw] max-w-[600px] opacity-10 invert"
                    alt=""
                />
            </div>

            {/* Minimal Loading Indicator */}
            <div
                ref={progressRef}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[100] flex items-baseline gap-1 mix-blend-difference"
            >
                <span className="text-4xl md:text-6xl font-['Syne'] font-bold text-white leading-none tracking-tighter">
                    {progress}
                </span>
                <span className="text-base md:text-lg text-red-600 font-bold">%</span>
            </div>

            {/* Rapid letters - Moved z-index to 50 to sit ABOVE vignette */}
            <div className="absolute inset-0 z-50 pointer-events-none perspective-[1000px]">
                {TEXT.split('').map((char, i) => (
                    <span
                        key={i}
                        className="rapid-char absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                       font-['Cinzel'] font-black text-white opacity-0
                       text-[20vw] md:text-[15vw] leading-none"
                    >
                        {char}
                    </span>
                ))}
            </div>

            {/* Final reveal */}
            <div ref={finalRef} className="relative z-30 text-center opacity-0 invisible">
                <img
                    ref={mainLogoRef}
                    src="/logo/WH_LOGO.svg"
                    className="w-16 mx-auto mb-6 brightness-150"
                    alt="Emblem"
                />

                <h1 className="main-title font-['Cinzel'] font-black tracking-[0.25em] uppercase">
                    <span className="block text-[12vw] md:text-[6vw] bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                        Swastika
                    </span>
                </h1>

                <div ref={yearRef} className="mt-6">
                    <span className="font-mono text-red-600 tracking-[1em] text-lg md:text-xl">
                        2026
                    </span>
                </div>
            </div>
        </div>
    );
}
