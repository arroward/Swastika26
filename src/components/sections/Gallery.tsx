import SlantedImageGallery from '@/components/SlantedImageGallery';
import { getGalleryImages } from '@/lib/r2';

export default async function Gallery() {
    const images = await getGalleryImages();

    // Maximize viewport usage
    return (
        <section id="gallery" className="relative w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] overflow-hidden bg-black flex flex-col justify-center border-y border-red-900/20 panel">
            {/* Background Texture */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Gallery Wrapper - Full Screen */}
            <div className="absolute inset-0 z-10 w-full h-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000000_120%)] opacity-80" />

                {/* Slanted Container - Scaled up to fill corners */}
                <div className="w-[150%] h-[150%] -rotate-6 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-700">
                    <SlantedImageGallery images={images} />
                </div>
            </div>
        </section>
    );
}
