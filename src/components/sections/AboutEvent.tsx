'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutEventContent } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function AboutEvent() {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const yearRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(titleRef.current, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(yearRef.current, {
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.6");

    }, { scope: containerRef });

    return (
        <section
            id="about"
            ref={containerRef}
            className="relative w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex items-center justify-center overflow-hidden px-4 md:px-6 py-2 md:py-4 panel snap-start snap-always"
        >
            {/* Main Grid Container */}
            <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-4">

                {/* 1. Left Panel / Top Mobile Header */}
                <div className="lg:col-span-3 lg:h-full bg-[#111] rounded-[var(--site-radius)] border border-white/10 p-5 lg:p-6 flex flex-col justify-between items-start shrink-0 relative overflow-hidden group gap-4 lg:gap-0">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex flex-col gap-1 z-10">
                        <div className="flex items-center gap-2 mb-1 lg:mb-6">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">{aboutEventContent.label}</span>
                        </div>
                        <h2 className="text-2xl lg:text-4xl font-black font-syne text-white leading-none">
                            {aboutEventContent.heading.text} <span className="text-red-500">{aboutEventContent.heading.highlight}</span>
                        </h2>
                    </div>

                    <div className="w-full space-y-4">
                        <div className="h-[1px] w-full bg-white/10" />
                        <p className="text-sm text-white/60 font-jost leading-relaxed text-justify">
                            {aboutEventContent.description1}
                        </p>
                        <p className="hidden lg:block text-sm text-white/60 font-jost leading-relaxed text-justify">
                            {aboutEventContent.description2}
                        </p>
                    </div>
                </div>

                {/* 2. Center Panel - Hero Visual */}
                <div className="flex-1 lg:col-span-9 min-h-0 relative rounded-[var(--site-radius)] overflow-hidden group border border-white/10">
                    <img
                        src={aboutEventContent.image}
                        alt="Event Main"
                        className="w-full h-full object-cover  transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Floating Big Title */}
                    <div className="absolute bottom-4 left-4 lg:bottom-10 lg:left-10 z-10 text-left">
                        <h1
                            ref={titleRef}
                            className="text-5xl md:text-7xl xl:text-8xl font-black font-cinzel text-white leading-none tracking-tight mix-blend-overlay"
                        >
                            {aboutEventContent.visualTitle}
                        </h1>
                        <p
                            ref={yearRef}
                            className="text-sm md:text-xl font-mono text-red-500 tracking-widest mt-1 lg:mt-2 ml-1"
                        >
                            {aboutEventContent.yearText}
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
