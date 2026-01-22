'use client';

import GridMotion from '@/components/GridMotion';

const galleryItems = [
    "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574482620826-406ce7560263?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1459749411177-8c46509887e1?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574482620826-406ce7560263?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop"
];

export default function Gallery() {
    return (
        <section id="gallery" className="h-screen w-full relative">
            <div className="absolute top-0 left-0 w-full z-20 p-8 md:p-12 text-center pointer-events-none">
                <h2 className="text-4xl md:text-6xl font-cinzel font-black text-white tracking-widest uppercase glow-text">
                    Gallery
                </h2>
                <p className="text-white/50 mt-2 tracking-widest uppercase text-sm">Highlights of 2025</p>
            </div>

            <GridMotion items={galleryItems} gradientColor="black" />
        </section>
    );
}
