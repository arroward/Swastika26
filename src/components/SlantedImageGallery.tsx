'use client';

import { motion } from "framer-motion";

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
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1485120750507-a3bf477acd63?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?q=80&w=1000&auto=format&fit=crop",
];

interface ImageRowProps {
    images: string[];
    direction?: number;
    speed?: number;
}

const ImageRow = ({ images, direction = 1, speed = 20 }: ImageRowProps) => {
    return (
        <div className="flex overflow-hidden whitespace-nowrap gap-4 select-none">
            <motion.div
                className="flex gap-4 min-w-full shrink-0 items-center"
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
                        className="relative w-[180px] h-[120px] md:w-[280px] md:h-[180px] rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 border border-white/10"
                    >
                        <img
                            src={src}
                            alt="Gallery Item"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                ))}
            </motion.div>
            <motion.div
                className="flex gap-4 min-w-full shrink-0 items-center"
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
                        className="relative w-[180px] h-[120px] md:w-[280px] md:h-[180px] rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 border border-white/10"
                    >
                        <img
                            src={src}
                            alt="Gallery Item"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default function SlantedImageGallery() {
    return (
        <div className="flex flex-col gap-6 md:gap-10 w-full">
            <ImageRow images={galleryItems} direction={1} speed={50} />
            <ImageRow images={[...galleryItems].reverse()} direction={-1} speed={40} />
            <ImageRow images={galleryItems} direction={1} speed={60} />
        </div>
    );
}

