'use client';

import { useState } from 'react';
import ProshowPanel from '@/components/ProshowPanel';

import { proshowContent } from '@/data/content';

const artists = proshowContent.artists;

export default function Proshow() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="proshow" className="relative w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex flex-col md:flex-row bg-black overflow-hidden panel snap-start snap-always">

            {/* CENTRAL TITLE OVERLAY */}
            {/* CENTRAL TITLE OVERLAY */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none text-center w-full">
                <div className="overflow-hidden">
                    <h2 className="text-6xl md:text-9xl font-black font-cinzel text-white tracking-tighter leading-none drop-shadow-2xl filter">
                        PRO<span className="text-transparent stroke-text-lg drop-shadow-sm">SHOW</span>
                    </h2>
                </div>
                {/* <div className="flex justify-center gap-4 mt-4">
                    <span className="bg-white text-black px-4 py-1 font-mono text-sm uppercase tracking-widest font-bold">The Main Event</span>
                </div> */}
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
