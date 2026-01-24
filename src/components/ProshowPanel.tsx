'use client';

import { motion } from 'framer-motion';

interface ProshowPanelProps {
    artist: {
        name: string;
        role: string;
        date: string;
        image: string;
        tags: string[];
    };
    index: number;
    hoveredIndex: number | null;
    setHoveredIndex: (index: number | null) => void;
}

export default function ProshowPanel({
    artist,
    index,
    hoveredIndex,
    setHoveredIndex
}: ProshowPanelProps) {
    const isActive = hoveredIndex === index;

    return (
        <motion.div
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
                filter: hoveredIndex === null
                    ? 'brightness(1) blur(0px)'
                    : isActive
                        ? 'brightness(1.15) blur(0px)'
                        : 'brightness(0.6) blur(2px)',
            }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden cursor-pointer will-change-[filter] group transform-gpu"
        >
            {/* Background Image - Optimized with motion.img */}
            <div className="absolute inset-0 overflow-hidden">
                <motion.img
                    src={artist.image}
                    alt={artist.name}
                    className="w-full h-full object-cover will-change-transform"
                    animate={{ scale: isActive ? 1.08 : 1.02 }}
                    transition={{ duration: 1.2, ease: "easeOut" }} // Smoother, faster reaction than 8s
                />
            </div>

            {/* Dark Gradient Overlay - Optimized for visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

            {/* Grain */}
            <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-10 text-white">

                {/* Date */}
                <span className="font-syne text-sm font-bold tracking-widest text-white/80 mb-2 block drop-shadow-md">
                    {artist.date}
                </span>

                {/* Name */}
                <h3 className="font-cinzel font-black text-4xl md:text-6xl tracking-tight leading-none drop-shadow-lg">
                    {artist.name}
                </h3>

                {/* Role */}
                <p className="mt-2 text-white/70 font-jost font-light">
                    {artist.role}
                </p>

                {/* Tags */}
                <div className="flex gap-2 mt-5 flex-wrap">
                    {artist.tags.map((tag, i) => (
                        <span
                            key={i}
                            className="px-3 py-1 text-[10px] uppercase tracking-widest font-jost font-medium border border-white/20 rounded-full text-white/70"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Ceremonial Edge */}
            <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-red-500 to-transparent"
            />
        </motion.div>
    );
}
