'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useConfig } from '@/contexts/ConfigContext';

export default function AutoShow() {
    const { config } = useConfig();
    const { autoShowContent } = config;
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

    // Automatic slideshow logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIdx((prev) => (prev + 1) % autoShowContent.images.length);
        }, 4000); // 4 seconds feels more cinematic than 3
        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (textRef.current) {
            // Animate each text element with a "staggered lift"
            gsap.from(textRef.current.children, {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            id="autoshow"
            className="w-full relative h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] flex items-center justify-center overflow-hidden bg-[#050505] panel snap-start snap-always"
        >
            {/* Background Grid - Darkened for contrast */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

            {/* Content Flex Container */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20">

                {/* Image Side - Slideshow */}
                <div className="w-full md:w-[55%] relative h-[45vh] md:h-[70vh] overflow-hidden rounded-[var(--site-radius)] group shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    {/* Inner Border Glow */}
                    <div className="absolute inset-0 border border-white/10 rounded-[var(--site-radius)] z-20 pointer-events-none group-hover:border-red-600/30 transition-colors duration-700" />

                    {autoShowContent.images.map((src, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${index === currentImageIdx ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                }`}
                        >
                            <img
                                src={src}
                                alt={`Auto Show ${index + 1}`}
                                className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] group-hover:brightness-90 transition-all duration-1000"
                            />
                        </div>
                    ))}

                    {/* Scarlet Badge */}
                    <div className="absolute top-6 left-6 z-30 bg-[#FF3131] px-4 py-1.5 transform -skew-x-12 shadow-[0_0_20px_rgba(255,49,49,0.4)]">
                        <span className="block transform skew-x-12 font-jost font-black text-black tracking-[0.2em] text-[10px] md:text-xs uppercase">
                            {autoShowContent.date}
                        </span>
                    </div>

                    {/* Dots Indicator - Refined */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
                        {autoShowContent.images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-500 ${idx === currentImageIdx ? 'w-8 bg-[#FF3131]' : 'w-2 bg-white/20'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Text Side - High Readability */}
                <div ref={textRef} className="w-full md:w-[40%] flex flex-col items-start text-left justify-center">
                    <span className="text-[#FF3131] font-jost font-bold tracking-[0.4em] text-[10px] md:text-xs mb-4 block uppercase">
                        // {autoShowContent.location}
                    </span>

                    <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-cinzel text-white tracking-tighter leading-[0.85] mb-6">
                        {autoShowContent.displayTitle.line1}<br className="hidden md:block" />
                        <span
                            className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20"
                            style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}
                        >
                            {autoShowContent.displayTitle.line2}
                        </span>
                    </h2>

                    <span className="text-white/40 font-jost tracking-[0.3em] text-[10px] md:text-xs uppercase mb-6 block font-bold border-l-2 border-red-600 pl-4">
                        {autoShowContent.organizer}
                    </span>

                    <p className="text-white/60 text-sm md:text-base lg:text-lg font-jost font-light leading-relaxed max-w-md">
                        {autoShowContent.description}
                    </p>
                </div>
            </div>

            {/* Decorative Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />

            {/* Bottom Vignette for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
        </section>
    );
}