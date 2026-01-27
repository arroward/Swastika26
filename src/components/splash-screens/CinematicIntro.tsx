'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface CinematicIntroProps {
    onComplete?: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const finalRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) {
                    gsap.delayedCall(1.5, onComplete);
                }
            }
        });

        const text = "SWASTIKA";
        const letters = text.split("");
        if (textRef.current) textRef.current.innerHTML = '';

        letters.forEach((char) => {
            const span = document.createElement("span");
            span.textContent = char;
            // Updated to Cinzel and adjusted font size for the rapid-fire sequence
            span.className = "rapid-char absolute font-['Cinzel'] font-black text-white opacity-0 text-[14vw] md:text-[10vw] leading-none pointer-events-none will-change-transform z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2";
            textRef.current?.appendChild(span);
        });

        const chars = gsap.utils.toArray('.rapid-char');

        tl.set([finalRef.current, yearRef.current], { autoAlpha: 0 });
        tl.set(logoRef.current, { autoAlpha: 0, scale: 0.5, filter: 'blur(20px)' });

        tl.to('.ambient-glow', {
            opacity: 0.8,
            scale: 1.2,
            duration: 2,
            ease: "sine.inOut",
            repeat: 1,
            yoyo: true
        }, 0);

        chars.forEach((char: any, i) => {
            const startTime = i * 0.08;
            tl.fromTo(char,
                { opacity: 0, scale: 2, filter: "blur(20px) brightness(2)", xPercent: -50, yPercent: -50 },
                {
                    opacity: 1,
                    scale: 0.9,
                    filter: "blur(0px) brightness(1)",
                    duration: 0.1,
                    ease: "power4.out"
                },
                startTime
            ).to(char, {
                opacity: 0,
                scale: 1.1,
                filter: "blur(10px)",
                duration: 0.1,
                ease: "power2.in"
            }, startTime + 0.1);
        });

        const revealTime = letters.length * 0.08 + 0.2;

        tl.to(containerRef.current, {
            x: () => (Math.random() - 0.5) * 20,
            y: () => (Math.random() - 0.5) * 20,
            duration: 0.05,
            repeat: 5,
            yoyo: true,
            ease: "none"
        }, revealTime);

        tl.to('.flash', { opacity: 1, duration: 0.05 }, revealTime);
        tl.to('.flash', { opacity: 0, duration: 1.5, ease: "power2.out" }, revealTime + 0.05);

        tl.set(finalRef.current, { autoAlpha: 1 }, revealTime);
        tl.fromTo('.main-title',
            { scale: 2, filter: "blur(30px)", opacity: 0 },
            { scale: 1, filter: "blur(0px)", opacity: 1, duration: 1.2, ease: "expo.out" },
            revealTime
        );

        tl.to(logoRef.current, {
            autoAlpha: 0.2,
            scale: 1.1,
            filter: 'blur(5px)',
            duration: 3,
            ease: "power2.out"
        }, revealTime);

        tl.fromTo(yearRef.current,
            { autoAlpha: 0, letterSpacing: "2em", y: 30 },
            { autoAlpha: 1, letterSpacing: "1em", y: 0, duration: 2, ease: "power4.out" },
            revealTime + 0.5
        );

        gsap.to(containerRef.current, {
            scale: 1.05,
            duration: 10,
            ease: "sine.inOut"
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-[#050505] overflow-hidden flex flex-col items-center justify-center px-4 select-none">
            {/* Updated Font Imports */}
            <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=JetBrains+Mono:wght@300;800&display=swap" rel="stylesheet" />

            <style jsx global>{`
                .text-gradient {
                    background: linear-gradient(180deg, #FFFFFF 0%, #888888 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .cinematic-vignette {
                    background: radial-gradient(circle, transparent 20%, black 120%);
                }
                .grain {
                    background-image: url("https://grainy-gradients.vercel.app/noise.svg");
                    opacity: 0.04;
                }
            `}</style>

            <div className="absolute inset-0 grain pointer-events-none" />
            <div className="absolute inset-0 cinematic-vignette pointer-events-none z-40" />
            <div className="ambient-glow absolute inset-0 bg-[radial-gradient(circle_at_center,_#3b0707_0%,_transparent_70%)] opacity-0 mix-blend-screen" />
            <div className="absolute inset-0 w-full h-full bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20" />
            <div className="flash absolute inset-0 bg-white opacity-0 pointer-events-none z-50 mix-blend-difference" />

            <div ref={logoRef} className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <img src="/logo/WH_LOGO.svg" alt="" className="w-[80vw] max-w-[600px] opacity-10 invert brightness-200" />
            </div>

            <div ref={textRef} className="absolute inset-0 pointer-events-none z-20" />

            <div ref={finalRef} className="relative z-30 flex flex-col items-center text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-red-600 blur-[40px] opacity-20 rounded-full animate-pulse" />
                    <img src="/logo/WH_LOGO.svg" alt="Emblem" className="w-12 h-12 md:w-20 md:h-20 relative z-10 brightness-150 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
                </div>

                {/* Smaller font size, removed italic, using Cinzel */}
                <h1 className="main-title font-['Cinzel'] font-black leading-none tracking-[0.2em] uppercase">
                    <span className="text-gradient text-[8vw] md:text-[6vw] lg:text-[4.5rem] block">
                        Swastika
                    </span>
                </h1>

                <div ref={yearRef} className="mt-6 flex items-center gap-4">
                    <span className="font-['JetBrains_Mono'] font-extrabold text-base md:text-xl tracking-[1em] text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]">
                        2026
                    </span>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[12vh] bg-black z-[60]" />
            <div className="absolute top-0 left-0 w-full h-[12vh] bg-black z-[60]" />
        </div>
    );
}