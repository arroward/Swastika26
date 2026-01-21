'use client';

import { useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CursorSpotlight() {
    // Initialize springs with 0 (center or off-screen)
    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const springX = useSpring(0, springConfig);
    const springY = useSpring(0, springConfig);

    // For the secondary highlight, we'll create separate springs that lag slightly (slower response)
    const secondarySpringX = useSpring(0, { ...springConfig, mass: 1, stiffness: 200 });
    const secondarySpringY = useSpring(0, { ...springConfig, mass: 1, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const targetX = e.clientX - 200; // 400px width/2
            const targetY = e.clientY - 200;

            // Update primary spring goals directly
            springX.set(targetX);
            springY.set(targetY);

            // Update secondary spring goals directly
            secondarySpringX.set(targetX);
            secondarySpringY.set(targetY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [springX, springY, secondarySpringX, secondarySpringY]);

    return (
        <>
            {/* Primary Spotlight */}
            <motion.div
                className="fixed top-0 left-0 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[80px] pointer-events-none z-10 mix-blend-screen"
                style={{
                    x: springX,
                    y: springY,
                }}
            />
            {/* Secondary Highlight (smaller, brighter) */}
            <motion.div
                className="fixed top-0 left-0 w-[100px] h-[100px] bg-white/5 rounded-full blur-[40px] pointer-events-none z-10 mix-blend-overlay"
                style={{
                    x: secondarySpringX,
                    y: secondarySpringY,
                }}
            />
        </>
    );
}
