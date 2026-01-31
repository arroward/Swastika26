'use client';

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ImageRowProps {
    images: string[];
    direction?: number; // 1 for left, -1 for right
    speed?: number; // Duration in seconds
}

const GalleryImage = ({ src, fallback }: { src: string, fallback: string }) => {
    return (
        <img
            src={src}
            alt="Gallery Item"
            className="w-full h-full object-cover transition-opacity duration-500"
            loading="lazy"
            decoding="async"
            onError={(e) => {
                e.currentTarget.src = fallback;
            }}
        />
    );
};

const ImageRow = ({ images, direction = 1, speed = 20, fallback }: ImageRowProps & { fallback: string }) => {
    const rowRef = useRef<HTMLDivElement>(null);
    const firstPartRef = useRef<HTMLDivElement>(null);
    const secondPartRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!firstPartRef.current || !secondPartRef.current) return;

        // Reset positions
        gsap.set([firstPartRef.current, secondPartRef.current], { xPercent: 0 });

        // Calculate target xPercent based on direction
        // If direction is 1 (move left): animate to -100%
        // If direction is -1 (move right): animate to 100% (but we need to start at -100%?)

        // Actually, easiest seamless loop for infinite scroll:
        // Move both parts to the left (-100%). When one completes, it wraps?
        // Standard approach: 
        // Part 1 starts at 0. Part 2 starts at 100.
        // Animate both to -100 (part 1) and 0 (part 2).

        // Let's mimic the Framer Motion logic which was:
        // initial={{ x: direction === 1 ? "0%" : "-100%" }}
        // animate={{ x: direction === 1 ? "-100%" : "0%" }}

        const start = direction === 1 ? 0 : -100;
        const end = direction === 1 ? -100 : 0;

        // Apply animation to both specialized container divs
        [firstPartRef.current, secondPartRef.current].forEach((el) => {
            gsap.fromTo(el,
                { xPercent: start },
                {
                    xPercent: end,
                    duration: speed,
                    ease: "none",
                    repeat: -1,
                    force3D: true
                }
            );
        });

    }, { scope: rowRef, dependencies: [direction, speed, images.length] });

    return (
        <div ref={rowRef} className="flex overflow-hidden whitespace-nowrap gap-0 select-none w-full">
            {/* Part 1 */}
            <div
                ref={firstPartRef}
                className="flex gap-0 min-w-full shrink-0 items-center justify-around"
                style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
                {images.map((src, idx) => (
                    <div
                        key={`img-1-${idx}`}
                        className="relative h-[40vh] min-h-[220px] md:h-[45vh] aspect-[16/10] overflow-hidden border border-white/5 bg-gray-900 group"
                    >
                        <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
                            <GalleryImage src={src} fallback={fallback} />
                        </div>

                        {/* Tech Overlays */}
                        <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.8)_2px)] bg-[size:100%_4px] opacity-10 pointer-events-none" />

                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300" />
                    </div>
                ))}
            </div>

            {/* Part 2 (Duplicate for loop) */}
            <div
                ref={secondPartRef}
                className="flex gap-0 min-w-full shrink-0 items-center justify-around"
                style={{ willChange: "transform", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
                {images.map((src, idx) => (
                    <div
                        key={`img-2-${idx}`}
                        className="relative h-[40vh] min-h-[220px] md:h-[45vh] aspect-[16/10] overflow-hidden border border-white/5 bg-gray-900 group"
                    >
                        <div className="w-full h-full transition-transform duration-500 group-hover:scale-110">
                            <GalleryImage src={src} fallback={fallback} />
                        </div>

                        {/* Tech Overlays */}
                        <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.8)_2px)] bg-[size:100%_4px] opacity-10 pointer-events-none" />

                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300" />
                    </div>
                ))}
            </div>
        </div>
    );
};

import { useConfig } from '@/contexts/ConfigContext';

export default function SlantedImageGallery({ images = [] }: { images: string[] }) {
    const { config } = useConfig();
    const { siteConfig } = config;
    const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

    // Simplified: Just use the images directly, the GalleryImage component handles lazy loading anyway
    const visibleImages = images;

    // Distribute images uniquely across rows using modulo to ensure balance and no duplicates
    const row1 = visibleImages.filter((_, i) => i % 3 === 0);
    const row2 = visibleImages.filter((_, i) => i % 3 === 1);
    const row3 = visibleImages.filter((_, i) => i % 3 === 2);

    const baseSpeed = siteConfig.gallery.speed || 1;

    if (visibleImages.length === 0) {
        // Fallback gallery images if R2 list is taking too long or empty
        const fallbacks = [
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2000",
            "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000",
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000"
        ];
        return (
            <div className="flex flex-col gap-0 w-full h-full justify-center">
                <ImageRow images={fallbacks} direction={1} speed={50} fallback={siteConfig.logos.fallback} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-0 w-full h-full justify-center">
            {row1.length > 0 && <ImageRow images={row1} direction={1} speed={50 * baseSpeed} fallback={siteConfig.logos.fallback} />}
            {row2.length > 0 && <ImageRow images={row2} direction={-1} speed={40 * baseSpeed} fallback={siteConfig.logos.fallback} />}
            {row3.length > 0 && <ImageRow images={row3} direction={1} speed={60 * baseSpeed} fallback={siteConfig.logos.fallback} />}
        </div>
    );
}
