'use client';

import SlantedImageGallery from '@/components/SlantedImageGallery';

export default function Gallery() {
    return (
        <section id="gallery" className="relative w-full overflow-hidden bg-transparent py-4 md:py-8 h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex flex-col justify-center">
            <div className="w-full text-center mb-4 md:mb-16 z-20 relative shrink-0">
                <h2 className="text-3xl md:text-6xl font-cinzel font-black text-white tracking-widest uppercase glow-text">
                    Gallery
                </h2>
                <p className="text-white/70 mt-1 md:mt-3 tracking-widest uppercase text-xs md:text-sm font-jost">Highlights of 2025</p>
            </div>

            <div className="flex-1 min-h-0 w-full relative flex items-center justify-center overflow-hidden">
                <div className="w-[120%] -rotate-6 scale-110">
                    <SlantedImageGallery />
                </div>
            </div>
        </section>
    );
}

