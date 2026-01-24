'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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

export default function ProshowPanel({ artist, index, hoveredIndex, setHoveredIndex }: ProshowPanelProps) {
    const isHovered = hoveredIndex === index;
    const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

    // Calculate flex grow values
    // Hovered: 30 (Dominates space ~97%)
    // Other Hovered: 0 (Collapses completely)
    // Neutral: 1 (Equal split)
    const flexVal = isHovered ? 30 : (isOtherHovered ? 0 : 1);
    const minHeightVal = isOtherHovered ? 0 : '15%';

    return (
        <motion.div
            layout
            className="relative border-b md:border-b-0 md:border-r border-white/10 overflow-hidden cursor-pointer group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setHoveredIndex(isHovered ? null : index)} // Tap to toggle on mobile
            initial={false}
            animate={{ flex: flexVal }}
            transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1 }}
            style={{
                // Default flex behavior, will be overridden by animate
                flexGrow: 1,
                flexBasis: 0,
                minHeight: minHeightVal // Shrink to 0 when other is active to allow full height expansion
            }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                    transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
                >
                    <img
                        src={artist.image}
                        alt={artist.name}
                        className="w-full h-full object-cover grayscale transition-all duration-1000 ease-in-out"
                        style={{ filter: isHovered ? 'grayscale(0%)' : 'grayscale(100%)' }}
                    />
                </motion.div>
                <div className={`absolute inset-0 transition-colors duration-1000 ease-in-out ${isHovered ? 'bg-black/10' : 'bg-black/60'}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 pb-12 md:pb-20 z-20 pointer-events-none">
                <motion.div
                    className="flex flex-col h-full justify-end"
                    layout // Animate layout changes smoothly
                    transition={{ type: "spring", stiffness: 150, damping: 25 }}
                >
                    {/* Tags */}
                    <motion.div
                        className="flex gap-2 mb-2 md:mb-4 overflow-hidden"
                        animate={{
                            opacity: isHovered ? 1 : 0.7,
                            height: 'auto'
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {artist.tags.map((tag) => (
                            <span key={tag} className="border border-white/30 px-2 md:px-3 py-1 rounded-full text-[10px] md:text-xs font-mono text-white/70 uppercase backdrop-blur-sm bg-black/20">
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                    <motion.h3
                        className="text-4xl md:text-7xl lg:text-8xl font-black font-cinzel text-white leading-none mb-2 origin-bottom-left"
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        {artist.name}
                    </motion.h3>

                    {/* Details - Collapsible on mobile/desktop when not hovered to save space */}
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: isHovered ? 1 : (isOtherHovered ? 0.3 : 0.8),
                            height: isHovered ? 'auto' : (isOtherHovered ? 0 : 'auto')
                        }}
                        transition={{ type: "spring", stiffness: 150, damping: 25 }}
                        className="overflow-hidden"
                    >
                        <div className="flex items-center justify-between border-t border-white/30 pt-4 mt-4 max-w-md">
                            <div className="flex flex-col">
                                <span className="text-accent-main font-bold font-syne text-xl md:text-2xl">{artist.date}</span>
                                <span className="text-white/60 font-jost text-xs md:text-sm uppercase tracking-widest">{artist.role}</span>
                            </div>
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full bg-white text-black flex items-center justify-center transform transition-all duration-700 ease-out ${isHovered ? 'rotate-45 scale-100 opacity-100' : 'rotate-0 scale-75 opacity-0'}`}>
                                <ArrowUpRight size={24} />
                            </div>
                        </div>

                        <motion.button
                            // Pointer events auto only on button so clicks pass through container
                            className="mt-6 px-8 py-3 bg-[var(--accent-main)] text-white font-syne font-bold uppercase tracking-wider rounded-full hover:bg-white hover:text-black transition-colors pointer-events-auto"
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                height: isHovered ? 'auto' : 0,
                                marginTop: isHovered ? 24 : 0
                            }}
                            transition={{ type: "spring", stiffness: 150, damping: 20, delay: isHovered ? 0.1 : 0 }}
                        >
                            Book Tickets
                        </motion.button>
                    </motion.div>
                </motion.div>
            </div>
        </motion.div>
    );
}
