'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function DustParticles() {
    const [particles, setParticles] = useState<{ id: number; x: number; delay: number; duration: number }[]>([]);

    useEffect(() => {
        // Generate static dust particles on mount
        const count = 30;
        const newParticles = Array.from({ length: count }).map((_, i) => ({
            id: i,
            x: Math.random() * 100, // % width
            delay: Math.random() * 5,
            duration: 5 + Math.random() * 10,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: '110vh', opacity: 0 }}
                    animate={{ y: '-10vh', opacity: [0, 0.6, 0] }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                    style={{ left: `${p.x}%` }}
                    className="absolute w-1 h-1 bg-[--ancient-rust] rounded-full blur-[1px]"
                />
            ))}
        </div>
    );
}
