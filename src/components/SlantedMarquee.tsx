'use client';

import { motion } from "framer-motion";

const defaultItems = [
    "SWASTIKA.26",
    "2026",
    "FEB",
    "20",
    "21",
    "NATIONAL LEVEL TECH FEST",
    "MBCCET"
];

interface MarqueeRowProps {
    items: string[];
    direction?: number;
    speed?: number;
}

const MarqueeRow = ({ items, direction = 1, speed = 20 }: MarqueeRowProps) => {
    return (
        <div className="flex overflow-hidden whitespace-nowrap gap-8 select-none">
            <motion.div
                className="flex gap-8 min-w-full shrink-0 items-center"
                style={{ willChange: "transform" }}
                initial={{ x: direction === 1 ? "0%" : "-100%" }}
                animate={{ x: direction === 1 ? "-100%" : "0%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {items.map((item, idx) => (
                    <div
                        key={`mq-1-${idx}`}
                        className="text-7xl md:text-9xl font-bold text-white/20 font-cinzel tracking-tighter hover:text-[var(--accent-main)] transition-colors duration-300"
                    >
                        {item}
                    </div>
                ))}
            </motion.div>
            <motion.div
                className="flex gap-8 min-w-full shrink-0 items-center"
                style={{ willChange: "transform" }}
                initial={{ x: direction === 1 ? "0%" : "-100%" }}
                animate={{ x: direction === 1 ? "-100%" : "0%" }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
            >
                {items.map((item, idx) => (
                    <div
                        key={`mq-2-${idx}`}
                        className="text-7xl md:text-9xl font-bold text-white/20 font-cinzel tracking-tighter hover:text-[var(--accent-main)] transition-colors duration-300"
                    >
                        {item}
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default function SlantedMarquee() {
    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden relative bg-black/20">
            {/* Background enhancement */}
            <div className="absolute inset-0 z-0 pointer-events-none" />

            <div className="absolute inset-0 -rotate-12 transform scale-150 flex flex-col gap-6 justify-center z-10 opacity-60 hover:opacity-100 transition-opacity duration-700 transform-gpu">
                <MarqueeRow items={defaultItems} direction={1} speed={40} />
                <MarqueeRow items={[...defaultItems].reverse()} direction={-1} speed={35} />
                <MarqueeRow items={defaultItems} direction={1} speed={45} />
                <MarqueeRow items={[...defaultItems].reverse()} direction={-1} speed={30} />
                <MarqueeRow items={defaultItems} direction={1} speed={50} />
            </div>

            {/* Overlay Content */}
            <div className="relative z-20 text-center pointer-events-none mix-blend-difference">

            </div>
        </div>
    );
}
