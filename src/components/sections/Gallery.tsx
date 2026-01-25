import SlantedImageGallery from '@/components/SlantedImageGallery';
import { getGalleryImages } from '@/lib/r2';

export default async function Gallery() {
    const images = await getGalleryImages();

    return (
        <section id="gallery" className="relative w-full overflow-hidden bg-transparent py-4 h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] flex flex-col justify-center border-y border-red-900/20">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="w-full text-center mb-4 md:mb-16 z-20 relative shrink-0">
                <h2 className="text-4xl md:text-7xl font-cinzel font-black text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    GALLERY
                </h2>

                <p className="text-white/50 mt-1 md:mt-3 tracking-widest uppercase text-xs md:text-sm font-jost">
                    HIGHLIGHTS OF 2025
                </p>
            </div>

            <div className="flex-1 min-h-0 w-full relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_40%,#050505_100%)]" />
                <div className="w-[120%] h-[140%] -my-[15%] -rotate-6 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity duration-700">
                    <SlantedImageGallery images={images} />
                </div>
            </div>
        </section>
    );
}

