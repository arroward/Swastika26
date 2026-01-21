'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface GridMotionProps {
    items: (string | React.ReactNode)[];
    gradientColor?: string;
}

export default function GridMotion({ items, gradientColor = 'black' }: GridMotionProps) {
    const [columns, setColumns] = useState(4);

    // Responsive columns
    useEffect(() => {
        const updateColumns = () => {
            if (window.innerWidth < 640) setColumns(2);
            else if (window.innerWidth < 1024) setColumns(3);
            else setColumns(4);
        };
        updateColumns();
        window.addEventListener('resize', updateColumns);
        return () => window.removeEventListener('resize', updateColumns);
    }, []);

    // Distribute items into columns
    const distributeItems = () => {
        const cols: (string | React.ReactNode)[][] = Array.from({ length: columns }, () => []);
        items.forEach((item, i) => {
            // Duplicate items to ensure we have enough content for the loop
            cols[i % columns].push(item);
        });
        return cols;
    };

    const distributedColumns = distributeItems();

    return (
        <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">

            {/* Slanted Container - Rotated Grid matching reference */}
            <div
                className="flex gap-8 items-center -rotate-12 scale-150 origin-center bg-black"
                style={{ height: '150vh' }}
            >
                {distributedColumns.map((colItems, colIndex) => (
                    <div key={colIndex} className="relative h-full w-48 md:w-72 overflow-hidden flex-shrink-0">
                        {/* Infinite Loop Column */}
                        <motion.div
                            className="flex flex-col gap-8"
                            initial={{ y: colIndex % 2 === 0 ? "0%" : "-50%" }}
                            animate={{ y: colIndex % 2 === 0 ? "-50%" : "0%" }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 30, // Uniform slow speed for purely "sliding" grid effect
                            }}
                        >
                            {/* Quadruple content for seamless looping */}
                            {[...colItems, ...colItems, ...colItems, ...colItems].map((item, itemIndex) => (
                                <div
                                    key={`col-${colIndex}-item-${itemIndex}`}
                                    className="relative rounded-[2rem] overflow-hidden aspect-square w-full bg-neutral-900 border-[8px] border-black box-border shadow-2xl"
                                >
                                    {typeof item === 'string' && (item.startsWith('http') || item.startsWith('/')) ? (
                                        <img
                                            src={item}
                                            alt={`Gallery item`}
                                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 scale-105"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-white/20">
                                            {item}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                ))}
            </div>

            {/* Vignette / Gradient Overlay */}
            <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                    background: `radial-gradient(circle, transparent 40%, ${gradientColor} 100%)`
                }}
            />
        </div>
    );
}
