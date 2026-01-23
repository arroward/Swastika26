'use client';

import { useMotionValue, motion, useSpring, useMotionTemplate, useTransform } from 'framer-motion';
import { useEffect } from 'react';

export default function InteractiveRedGradient() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse follow
    const springConfig = { damping: 25, stiffness: 50 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
            const { innerWidth, innerHeight } = window;
            // Normalize to -0.5 to 0.5
            const x = (clientX / innerWidth) - 0.5;
            const y = (clientY / innerHeight) - 0.5;

            mouseX.set(x * 400); // reduced range for background
            mouseY.set(y * 400);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
            {/* Ambient Background moving slowly */}
            <motion.div
                className="absolute inset-[-50%] opacity-40 mix-blend-screen"
                animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-red-600/20 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-[120px]" />
            </motion.div>

            {/* Interactive Mouse Blob */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-red-500/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"
                style={{
                    x: springX,
                    y: springY,
                }}
            />

            {/* Secondary Interactive Blob (Inverse movement) */}
            <motion.div
                className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"
                style={{
                    x: useTransform(springX, (val) => val * -0.5),
                    y: useTransform(springY, (val) => val * -0.5),
                }}
            />

            {/* Grid Overlay for texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
        </div>
    );
}
