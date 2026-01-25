'use client';

import { useState } from "react";

import { motion } from "framer-motion";



interface ImageRowProps {
    images: string[];
    direction?: number;
    speed?: number;
}

const GalleryImage = ({ src }: { src: string }) => {
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <motion.img
            src={imgSrc}
            alt="Gallery Item"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full object-cover transition-opacity duration-300"
            onError={() => {
                setImgSrc(process.env.NEXT_PUBLIC_FALLBACK_IMAGE_URL || '/placeholder.jpg');
            }}
        />
    );
};

const ImageRow = ({ images, direction = 1, speed = 20 }: ImageRowProps) => {
    return (
        <div className="flex overflow-hidden whitespace-nowrap gap-2 select-none">
            <motion.div
                className="flex gap-2 min-w-full shrink-0 items-center"
                style={{ willChange: "transform" }}
                initial={{ x: direction === 1 ? "0%" : "-100%" }}
                animate={{ x: direction === 1 ? "-100%" : "0%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {images.map((src, idx) => (
                    <div
                        key={`img-1-${idx}`}
                        className="relative h-[20vh] md:h-[28vh] aspect-[16/10] overflow-hidden border border-white/5 bg-gray-900 group"
                    >
                        <motion.div
                            className="w-full h-full"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <GalleryImage src={src} />
                        </motion.div>

                        {/* Tech Overlays */}
                        <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.8)_2px)] bg-[size:100%_4px] opacity-10 pointer-events-none" />

                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300" />
                    </div>
                ))}
            </motion.div>
            <motion.div
                className="flex gap-2 min-w-full shrink-0 items-center"
                style={{ willChange: "transform" }}
                initial={{ x: direction === 1 ? "0%" : "-100%" }}
                animate={{ x: direction === 1 ? "-100%" : "0%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {images.map((src, idx) => (
                    <div
                        key={`img-2-${idx}`}
                        className="relative h-[20vh] md:h-[28vh] aspect-[16/10] overflow-hidden border border-white/5 bg-gray-900 group"
                    >
                        <motion.div
                            className="w-full h-full"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <GalleryImage src={src} />
                        </motion.div>

                        {/* Tech Overlays */}
                        <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                        <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div className="absolute inset-0 bg-[linear-gradient(transparent_2px,rgba(0,0,0,0.8)_2px)] bg-[size:100%_4px] opacity-10 pointer-events-none" />

                        {/* Corner Accents */}
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-red-500/0 group-hover:border-red-500/50 transition-colors duration-300" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default function SlantedImageGallery({ images = [] }: { images: string[] }) {
    // Distribute images uniquely across rows using modulo to ensure balance and no duplicates
    const row1 = images.filter((_, i) => i % 3 === 0);
    const row2 = images.filter((_, i) => i % 3 === 1);
    const row3 = images.filter((_, i) => i % 3 === 2);

    return (
        <div className="flex flex-col gap-[2px] w-full">
            <ImageRow images={row1} direction={1} speed={50} />
            <ImageRow images={row2} direction={-1} speed={40} />
            <ImageRow images={row3} direction={1} speed={60} />
        </div>
    );
}

