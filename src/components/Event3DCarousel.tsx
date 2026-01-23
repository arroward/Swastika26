'use client';

import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselItem {
    image: string;
    text: string;
}

interface Event3DCarouselProps {
    items: CarouselItem[];
}

export default function Event3DCarousel({ items }: Event3DCarouselProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Create 3 sets of items for true infinite scrolling illusion
    // Set 1 (Prefix), Set 2 (Main), Set 3 (Suffix)
    const extendedItems = [...items, ...items, ...items];
    const totalItemsCount = items.length;

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Initial center scroll position
    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            // Calculate width of one set.
            // Best determined by total scroll width / 3, but initially we might need to wait for render.
            // A simple timeout helps ensure layout is ready.
            setTimeout(() => {
                const singleSetWidth = container.scrollWidth / 3;
                container.scrollLeft = singleSetWidth;
            }, 100);
        }
    }, [items]);

    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const singleSetWidth = scrollWidth / 3;

        // Tolerance for floating point/pixel variations
        const padding = 50;

        // If we scrolled past the 2nd set (into the 3rd), jump back to 2nd start
        if (scrollLeft >= singleSetWidth * 2 - padding) {
            container.scrollLeft = scrollLeft - singleSetWidth;
        }
        // If we scrolled back into the 1st set, jump forward to 2nd set
        else if (scrollLeft <= padding) {
            container.scrollLeft = scrollLeft + singleSetWidth;
        }
    };

    const scrollNext = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        // Roughly width of one card + margin
        // Using scrollBy with behavior smooth snaps to the nearest snap point
        const cardWidth = isMobile ? window.innerWidth * 0.8 : 350;
        // Add approx margin (Mobile 24px total, Desktop 48px)
        const scrollAmount = cardWidth + (isMobile ? 24 : 48);

        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    };

    const scrollPrev = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const cardWidth = isMobile ? window.innerWidth * 0.8 : 350;
        const scrollAmount = cardWidth + (isMobile ? 24 : 48);

        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    };

    return (
        <div className="relative w-full h-full flex items-center group/nav">
            {/* Scroll Container */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="relative w-full h-full flex items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-4 md:px-[30vw] space-x-0"
            >
                {extendedItems.map((item, index) => (
                    <CarouselCard key={`${index}-${item.text}`} item={item} index={index % totalItemsCount} />
                ))}
            </div>

            {/* Navigation Arrows - Left */}
            <button
                onClick={scrollPrev}
                className="absolute left-2 md:left-8 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all flex"
            >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Navigation Arrows - Right */}
            <button
                onClick={scrollNext}
                className="absolute right-2 md:right-8 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all flex"
            >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            {/* Mobile Nav Overlay Hints (Optional, can just rely on swipe) */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/50 to-transparent pointer-events-none md:hidden" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/50 to-transparent pointer-events-none md:hidden" />
        </div>
    );
}

function CarouselCard({ item, index }: { item: CarouselItem; index: number }) {
    return (
        <div className="snap-center shrink-0 w-[80vw] md:w-[350px] h-full mx-3 md:mx-6 relative group rounded-[2rem] overflow-hidden border border-white/10 bg-black/50">
            {/* Image */}
            <img
                src={item.image}
                alt={item.text}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <span className="text-[10px] md:text-xs font-mono text-accent-main tracking-widest uppercase mb-2">
                    Event 0{index + 1}
                </span>
                <h3 className="text-3xl md:text-5xl font-black font-cinzel text-white leading-none">
                    {item.text}
                </h3>
            </div>

            {/* Interactive Border */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-accent-main/50 transition-colors duration-500 rounded-[2rem] pointer-events-none" />
        </div>
    );
}
