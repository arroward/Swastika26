'use client';

import SlantedImageGallery from '@/components/SlantedImageGallery';

export default function Gallery() {
    return (
        <section id="gallery" className="relative w-full overflow-hidden bg-transparent py-12 md:py-20">
            <div className="w-full text-center mb-12 md:mb-16 z-20 relative">
                <h2 className="text-4xl md:text-6xl font-cinzel font-black text-white tracking-widest uppercase glow-text">
                    Gallery
                </h2>
                <p className="text-white/70 mt-3 tracking-widest uppercase text-sm font-jost">Highlights of 2025</p>
            </div>

            <SlantedImageGallery />
        </section>
    );
}

