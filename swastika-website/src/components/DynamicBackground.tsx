'use client';

import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DynamicBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position from -1 to 1
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: (e.clientY / window.innerHeight) * 2 - 1,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Smooth mouse parallax
    const x = useSpring(mousePosition.x * 15, { stiffness: 100, damping: 30 }); // Move 15px
    const y = useSpring(mousePosition.y * 15, { stiffness: 100, damping: 30 });

    return (
        <div className="fixed inset-0 z-0 bg-black overflow-hidden">
            <motion.div
                className="relative w-full h-full"
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1.05, opacity: 1 }} // Keep slightly zoomed for parallax room
                transition={{ duration: 2.5, ease: "easeOut" }}
                style={{ x, y }}
            >
                <img
                    src="/websitebackgroundimg1.png"
                    alt="Swastika 26 Dynamic Background"
                    className="w-full h-full object-cover opacity-60"
                    style={{ objectPosition: 'center', objectFit: 'cover' }}
                />

                {/* Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/80" />

                {/* Radial Vignette */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] opacity-70" />
            </motion.div>
        </div>
    );
}
