'use client';

import { useState } from 'react';
import ProshowPanel from '@/components/ProshowPanel';

const artists = [
    {
        name: "ALOK",
        role: "International Headliner",
        date: "FEB 20",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop",
        tags: ["EDM", "HOUSE", "BRAZIL"]
    },
    {
        name: "PRITAM",
        role: "Bollywood Sensation",
        date: "FEB 21",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2670&auto=format&fit=crop",
        tags: ["BOLLYWOOD", "MELODY", "INDIA"]
    }
];

export default function Proshow() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="relative w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex flex-col md:flex-row bg-black overflow-hidden">

            {/* CENTRAL TITLE OVERLAY */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none mix-blend-difference text-center w-full">
                <div className="overflow-hidden">
                    <h2 className="text-6xl md:text-9xl font-black font-syne text-white tracking-tighter leading-none opacity-80">
                        PRO<span className="text-transparent stroke-text">SHOW</span>
                    </h2>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                    <span className="bg-white text-black px-4 py-1 font-mono text-sm uppercase tracking-widest font-bold">The Main Event</span>
                </div>
            </div>

            {artists.map((artist, index) => (
                <ProshowPanel
                    key={index}
                    artist={artist}
                    index={index}
                    hoveredIndex={hoveredIndex}
                    setHoveredIndex={setHoveredIndex}
                />
            ))}
        </section>
    );
}
