'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface ProshowPanelProps {
    artist: {
        name: string;
        role: string;
        date: string;
        image: string;
        tags: string[];
    };
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
}

export default function ProshowPanel({
    artist,
    index,
    hoveredIndex,
    setHoveredIndex
}: ProshowPanelProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const edgeRef = useRef<HTMLDivElement>(null);

    const isActive = hoveredIndex === index;
    const isSomeoneHovered = hoveredIndex !== null;

    useGSAP(() => {
        // 1. Focus Effect: Dim and blur others, sharpen active
        let filterValue = 'brightness(1) saturate(1) blur(0px)';
        if (isSomeoneHovered) {
            filterValue = isActive
                ? 'brightness(1.1) saturate(1.1) blur(0px)'
                : 'brightness(0.3) saturate(0.4) blur(6px)';
        }

        gsap.to(containerRef.current, {
            filter: filterValue,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true
        });

        // 2. Smooth Image Zoom
        gsap.to(imageRef.current, {
            scale: isActive ? 1.1 : 1,
            duration: 1.5,
            ease: "power2.out",
            overwrite: true
        });

        // 3. Vertical Text Lift
        gsap.to(contentRef.current, {
            y: isActive ? -15 : 0,
            duration: 0.7,
            ease: "power3.out",
            overwrite: true
        });

        // 4. Glow Edge Visibility
        gsap.to(edgeRef.current, {
            opacity: isActive ? 1 : 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true
        });

    }, { dependencies: [hoveredIndex, isActive, isSomeoneHovered], scope: containerRef });

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden cursor-pointer will-change-[filter] transform-gpu border-b md:border-b-0 md:border-r border-white/5 last:border-0"
        >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    ref={imageRef}
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover will-change-transform"
                />
            </div>

            {/* High-Contrast Gradient: Critical for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none z-[5]" />

            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none z-[6]" />

            {/* Main Content */}
            <div 
                ref={contentRef}
                className="relative z-10 h-full flex flex-col justify-end p-8 md:p-14 text-white pointer-events-none"
            >
                {/* Date - Enhanced Scarlet Red with Glow */}
                <div className="mb-4">
                    <span 
                        className="font-jost text-xs md:text-sm font-black tracking-[0.4em] text-[#FF3131] uppercase block"
                        style={{
                            textShadow: '0 0 12px rgba(255, 49, 49, 0.6)'
                        }}
                    >
                        {artist.date}
                    </span>
                </div>

                {/* Name: Cinzel Font, Non-Italic */}
                <h3 className="font-cinzel font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-[0.85] mb-4">
                    {artist.name}
                </h3>

                {/* Role */}
                <p className="text-white/70 font-jost font-medium text-sm md:text-lg tracking-wide max-w-sm">
                    {artist.role}
                </p>

                {/* Tags */}
                <div className="flex gap-2 mt-8 flex-wrap">
                    {artist.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] font-jost font-bold border border-white/20 bg-black/40 backdrop-blur-md rounded-full text-white/80"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Animated Red Edge Detail */}
            <div
                ref={edgeRef}
                className="absolute inset-y-0 right-0 w-[3px] bg-gradient-to-b from-transparent via-red-600 to-transparent opacity-0 z-20 shadow-[0_0_20px_rgba(220,38,38,0.7)]"
            />
        </div>
    );
}