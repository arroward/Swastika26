'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { autoShowContent } from '@/data/content';

export default function AutoShow() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);

    // Automatic slideshow
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIdx((prev) => (prev + 1) % autoShowContent.images.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (textRef.current) {
            gsap.from(textRef.current.children, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 60%",
                    toggleActions: "play none none reverse"
                }
            });
        }
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            id="autoshow"
            className="w-full relative h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] flex items-center justify-center overflow-hidden bg-black panel snap-start snap-always"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

            {/* Content Flex Container */}
            <div className="relative z-10 container mx-auto px-6 h-full flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-12">

                {/* Image Side - Slideshow */}
                <div className="w-full md:w-3/5 relative h-[50vh] md:h-[75vh] overflow-hidden rounded-xl group shadow-2xl shadow-red-900/10">
                    <div className="absolute inset-0 border border-white/10 rounded-xl z-20 pointer-events-none" />

                    {autoShowContent.images.map((src, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImageIdx ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={src}
                                alt={`Auto Show ${index + 1}`}
                                className="w-full h-full object-cover filter brightness-[0.8] contrast-125 group-hover:brightness-100 transition-all duration-700"
                            />
                        </div>
                    ))}

                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-30 bg-red-600 px-3 py-1 transform -skew-x-12 shadow-lg">
                        <span className="block transform skew-x-12 font-mono font-bold text-black tracking-widest text-xs">
                            {autoShowContent.date}
                        </span>
                    </div>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                        {autoShowContent.images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1 rounded-full transition-all duration-300 ${idx === currentImageIdx ? 'w-6 bg-red-600' : 'w-2 bg-white/50'}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Text Side */}
                <div ref={textRef} className="w-full md:w-2/5 flex flex-col items-start text-left justify-center pb-8 md:pb-0">
                    <span className="text-red-500 font-mono tracking-widest text-xs md:text-sm mb-2 block">
                        // {autoShowContent.location}
                    </span>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black font-cinzel text-white tracking-tighter leading-none mb-4 drop-shadow-lg">
                        AUTO<br className="hidden md:block" /> <span className="text-transparent stroke-text-lg inline-block md:block">SHOW</span>
                    </h2>

                    <p className="text-white/60 text-sm md:text-base lg:text-lg font-jost font-light leading-relaxed max-w-lg">
                        {autoShowContent.description}
                    </p>
                </div>
            </div>

            {/* Decorative Noise */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-0" />
        </section>
    );
}
