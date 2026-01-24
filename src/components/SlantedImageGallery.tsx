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
        <div className="flex overflow-hidden whitespace-nowrap gap-[2px] select-none">
            <motion.div
                className="flex gap-[2px] min-w-full shrink-0 items-center"
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
                        className="relative h-[16vh] md:h-[24vh] aspect-[16/10] rounded-xl overflow-hidden hover:scale-105 border border-white/10 transition-all duration-500"
                    >
                        <GalleryImage src={src} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                ))}
            </motion.div>
            <motion.div
                className="flex gap-[2px] min-w-full shrink-0 items-center"
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
                        className="relative h-[16vh] md:h-[24vh] aspect-[16/10] rounded-xl overflow-hidden hover:scale-105 border border-white/10 transition-all duration-500"
                    >
                        <GalleryImage src={src} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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

