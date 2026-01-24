'use client';

import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

// Helper Component for Magnetic Effect
function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        if (ref.current) {
            const { height, width, left, top } = ref.current.getBoundingClientRect();
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);
            setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
        }
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;
    return (
        <motion.div
            style={{ position: "relative" }}
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
}

export default function CTA() {
    const containerRef = useRef<HTMLElement>(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 }; // Smooth lag
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <section
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative bg-black text-white w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex flex-col justify-center overflow-hidden py-20"
        >
            {/* Background Grid with Performant Spotlight */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

                <motion.div
                    className="absolute w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px]"
                    style={{
                        x: smoothX,
                        y: smoothY,
                        translateX: "-50%",
                        translateY: "-50%",
                        willChange: "transform",
                    }}
                />

                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col justify-center h-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">

                    {/* Left: Headline */}
                    <div className="lg:col-span-8 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                                </span>
                                <span className="font-mono text-sm text-red-500 tracking-[0.2em] font-semibold">PARTICIPATION STATUS: OPEN</span>
                            </div>

                            <h2 className="text-7xl md:text-9xl lg:text-[10rem] font-black font-syne leading-[0.85] tracking-tighter mix-blend-difference text-white">
                                CREATE <br />
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 bg-[length:200%_auto] animate-gradient">
                                    LEGACY
                                </span>
                            </h2>
                        </motion.div>
                    </div>

                    {/* Right: Magnetic CTA */}
                    <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
                        <MagneticButton>
                            <Link href="/register" className="group relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden transition-all duration-500 hover:bg-neutral-900 hover:border-red-500/50">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <span className="relative z-10 font-syne font-bold text-2xl md:text-3xl mix-blend-overlay group-hover:mix-blend-normal group-hover:text-white transition-colors">
                                    GET PASSES
                                </span>
                                <ArrowUpRight className="relative z-10 mt-2 w-8 h-8 md:w-10 md:h-10 text-white/50 group-hover:text-red-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />

                                {/* Background Ring Animation */}
                                <div className="absolute inset-2 rounded-full border border-dashed border-white/10 group-hover:border-red-500/20 group-hover:rotate-180 transition-all duration-1000 ease-in-out" />
                            </Link>
                        </MagneticButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
