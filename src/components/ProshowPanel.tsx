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
    const edgeRef = useRef<HTMLDivElement>(null);

    const isActive = hoveredIndex === index;
    const isSomeoneHovered = hoveredIndex !== null;

    useGSAP(() => {
        // Container Filter Animation
        let filterValue = 'brightness(1) blur(0px)';
        if (isSomeoneHovered) {
            filterValue = isActive
                ? 'brightness(1.15) blur(0px)'
                : 'brightness(0.6) blur(2px)';
        }

        gsap.to(containerRef.current, {
            filter: filterValue,
            duration: 0.3,
            ease: "power3.out",
            overwrite: true
        });

        // Image Scale Animation
        gsap.to(imageRef.current, {
            scale: isActive ? 1.08 : 1.02,
            duration: 0.8,
            ease: "power2.out",
            overwrite: true
        });

        // Ceremonial Edge Opacity
        gsap.to(edgeRef.current, {
            opacity: isActive ? 1 : 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true
        });

    }, { dependencies: [hoveredIndex, isActive, isSomeoneHovered], scope: containerRef });

    return (
        <div
            ref={containerRef}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden cursor-pointer will-change-[filter] group transform-gpu"
        >
            {/* Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <img
                    ref={imageRef}
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover will-change-transform"
                    style={{ transform: 'scale(1.02)' }} // Set initial scale to match logic
                />
            </div>

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent pointer-events-none" />

            {/* Grain */}
            <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 text-white pointer-events-none">

                {/* Date */}
                <span className="font-syne text-sm font-bold tracking-widest text-white/80 mb-2 block drop-shadow-md">
                    {artist.date}
                </span>

                {/* Name */}
                <h3 className="font-cinzel font-black text-4xl md:text-6xl tracking-tight leading-none drop-shadow-lg">
                    {artist.name}
                </h3>

                {/* Role */}
                <p className="mt-2 text-white/70 font-jost font-light">
                    {artist.role}
                </p>

                {/* Tags */}
                <div className="flex gap-2 mt-5 flex-wrap">
                    {artist.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-[10px] uppercase tracking-widest font-jost font-medium border border-white/20 rounded-full text-white/70"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Ceremonial Edge */}
            <div
                ref={edgeRef}
                className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-0"
            />
        </div>
    );
}
