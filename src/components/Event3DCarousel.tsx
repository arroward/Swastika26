'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, PanInfo, AnimatePresence } from 'framer-motion';

interface CarouselItem {
    image: string;
    text: string;
}

interface Event3DCarouselProps {
    items: CarouselItem[];
}

export default function Event3DCarousel({ items }: Event3DCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(1000); // Default to desktop width to avoid hydration mismatch
    const [isMobile, setIsMobile] = useState(false);

    // Rotation state
    const rotation = useMotionValue(0);
    const springConfig = { damping: 20, stiffness: 100, mass: 1 };
    const smoothRotation = useSpring(rotation, springConfig);

    useEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth);
            setIsMobile(window.innerWidth < 768);
        }
        const handleResize = () => {
            if (containerRef.current) {
                setWidth(containerRef.current.offsetWidth);
                setIsMobile(window.innerWidth < 768);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Responsive Calculations
    const cardWidth = isMobile ? 220 : 280;
    const cardHeight = isMobile ? 320 : 400;
    const gap = isMobile ? 20 : 40;

    // Calculate radius based on number of items to form a circle
    const count = items.length;
    const circumference = count * (cardWidth + gap);
    const rawRadius = circumference / (2 * Math.PI);

    // Ensure minimum radius prevents overlapping too much, but adapts to screen
    const radius = Math.max(rawRadius, isMobile ? 200 : 350);
    const anglePerItem = 360 / count;

    const handleDrag = (_: any, info: PanInfo) => {
        const moveScale = isMobile ? 0.4 : 0.2; // More sensitive on mobile
        const currentRotation = rotation.get();
        rotation.set(currentRotation + info.delta.x * moveScale);
    };

    const handleDragEnd = (_: any, info: PanInfo) => {
        const currentRotation = rotation.get();
        const velocity = info.velocity.x * (isMobile ? 0.2 : 0.1);

        const snapAngle = anglePerItem;
        const predictedRotation = currentRotation + velocity;
        const nearestSnap = Math.round(predictedRotation / snapAngle) * snapAngle;

        rotation.set(nearestSnap);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden perspective-[1000px] cursor-grab active:cursor-grabbing"
            style={{ perspective: isMobile ? '800px' : '1200px' }}
        >
            {/* Background enhancement */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-transparent pointer-events-none" />

            <motion.div
                className="relative preserve-3d"
                style={{
                    width: cardWidth,
                    height: cardHeight,
                    rotateY: smoothRotation,
                    transformStyle: 'preserve-3d',
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.01}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
            >
                {items.map((item, index) => {
                    const angle = index * anglePerItem;

                    return (
                        <CarouselItemCard
                            key={index}
                            item={item}
                            index={index}
                            angle={angle}
                            radius={radius}
                            width={cardWidth}
                            height={cardHeight}
                        />
                    );
                })}
            </motion.div>

            {/* Drag Hint */}
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 pointer-events-none">
                <div className="w-12 h-1 bg-white/20 rounded-full overflow-hidden">
                    <motion.div
                        className="w-1/3 h-full bg-white rounded-full"
                        animate={{ x: [-10, 30, -10] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>
                <span className="text-[10px] uppercase tracking-widest font-mono">
                    {isMobile ? 'Swipe to Explore' : 'Drag to Rotate'}
                </span>
            </div>
        </div>
    );
}

function CarouselItemCard({
    item,
    index,
    angle,
    radius,
    width,
    height
}: {
    item: CarouselItem,
    index: number,
    angle: number,
    radius: number,
    width: number,
    height: number
}) {
    return (
        <motion.div
            className="absolute top-0 left-0 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden group shadow-2xl"
            style={{
                width: width,
                height: height,
                transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
            }}
        >
            {/* Image Layer */}
            <div className="absolute inset-0">
                <img
                    src={item.image}
                    alt={item.text}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
            </div>

            {/* Poster Content */}
            <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl md:text-3xl font-black font-cinzel text-white mb-1 md:mb-2 leading-none">
                        {item.text}
                    </h3>
                    <p className="text-[10px] md:text-xs font-mono text-red-500 tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        Event Category 0{index + 1}
                    </p>
                </div>
            </div>

            {/* Reflection / Shine */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Border Glow */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-red-500/50 transition-colors duration-500 rounded-2xl pointer-events-none" />
        </motion.div>
    );
}
