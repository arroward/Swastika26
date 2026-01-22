'use client';

import { useRef, useState, MouseEvent } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code, Music, Gamepad2, Wrench, Palette, Mic2, ArrowUpRight } from 'lucide-react';

const categories = [
    {
        id: 1,
        title: "Technical",
        desc: "Coding, Hackathons, & Robotics",
        icon: Code,
        accent: "from-blue-500 to-cyan-500",
        shadow: "shadow-blue-500/20"
    },
    {
        id: 2,
        title: "Cultural",
        desc: "Dance, Music, & Drama",
        icon: Music,
        accent: "from-pink-500 to-rose-500",
        shadow: "shadow-pink-500/20"
    },
    {
        id: 3,
        title: "Esports",
        desc: "Valorant, FIFA, & BGMI",
        icon: Gamepad2,
        accent: "from-green-500 to-emerald-500",
        shadow: "shadow-green-500/20"
    },
    {
        id: 4,
        title: "Workshops",
        desc: "Hands-on Learning Experience",
        icon: Wrench,
        accent: "from-yellow-500 to-orange-500",
        shadow: "shadow-yellow-500/20"
    },
    {
        id: 5,
        title: "Arts",
        desc: "Painting, Sketching & Digital",
        icon: Palette,
        accent: "from-purple-500 to-violet-500",
        shadow: "shadow-purple-500/20"
    },
    {
        id: 6,
        title: "Open Mic",
        desc: "Poetry, Standup & Singing",
        accent: "from-red-500 to-orange-500",
        icon: Mic2,
        shadow: "shadow-red-500/20"
    }
];

function TiltCard({ cat, index }: { cat: typeof categories[0], index: number }) {
    const ref = useRef<HTMLDivElement>(null);

    // Mouse position relative to card center
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics values for rotation
    const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), { damping: 15, stiffness: 200 });
    const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), { damping: 15, stiffness: 200 });

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct * 200); // 200 = Sensitivity factor
        y.set(yPct * 200);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            style={{
                perspective: 1000,
            }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
        >
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: rotateX,
                    rotateY: rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={`relative h-full min-h-[300px] w-full rounded-3xl bg-black/40 border border-white/10 p-8 flex flex-col justify-between group overflow-hidden hover:border-white/20 transition-colors ${cat.shadow} hover:shadow-2xl`}
            >
                {/* Spotlight Gradient using absolute positioning and opacity */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none mix-blend-soft-light`} />

                {/* Content Layer (elevated) */}
                <div style={{ transform: "translateZ(50px)" }} className="relative z-10 flex flex-col gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.accent} flex items-center justify-center text-white shadow-lg`}>
                        <cat.icon size={28} />
                    </div>

                    <div>
                        <h3 className="text-3xl font-black font-syne text-white mb-2">{cat.title}</h3>
                        <p className="text-white/60 font-jost text-sm leading-relaxed">{cat.desc}</p>
                    </div>
                </div>

                {/* Bottom Action (elevated same or less) */}
                <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex justify-between items-end mt-8 border-t border-white/5 pt-6">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/40 group-hover:text-white/80 transition-colors">Explore Category</span>
                    <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                        <ArrowUpRight size={18} />
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}

import { ShaderAnimation } from '@/components/shader-animation';

export default function Events() {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden">

            <div className="container mx-auto px-4 md:px-6 z-10 relative">
                <div className="text-center mb-12 md:mb-16 lg:mb-20 space-y-4 md:space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <div className="flex items-center justify-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                            <img
                                src="/logo/WH_LOGO.svg"
                                alt="Swastika Logo"
                                className="w-4 h-4 md:w-5 md:h-5 opacity-80"
                            />
                            <span className="text-xs font-mono text-accent-main uppercase tracking-widest">
                                Festival Highlights
                            </span>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-cinzel text-white"
                    >
                        DISCOVER <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">EVENTS</span>
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {categories.map((cat, i) => (
                        <TiltCard key={cat.id} cat={cat} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
