'use client';

import { useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';

// Dynamically import the heavy text component
const VariableProximity = dynamic(() => import('@/components/VariableProximity'), {
    ssr: false,
    loading: () => <span className="font-syne font-black text-5xl md:text-6xl lg:text-8xl opacity-0">DON'T MISS OUT</span>
});

const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };

export default function CTA() {
    const containerRef = useRef<HTMLElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-20%" }); // Delayed trigger for better performance

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

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
            className="relative py-32 flex items-center justify-center overflow-hidden bg-black text-white transform-gpu"
        >
            {/* Background Grid with Performant Spotlight */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

                <motion.div
                    className="absolute w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] will-change-transform"
                    style={{
                        x: smoothX,
                        y: smoothY,
                        translateX: "-50%",
                        translateY: "-50%",
                    }}
                />

                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />
            </div>

            <div className="container mx-auto px-4 z-10 text-center relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-8 will-change-transform"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-8xl font-black font-syne text-white tracking-tighter mix-blend-difference cursor-default flex flex-col items-center">
                        <div className="mb-4">
                            <VariableProximity
                                label="DON'T MISS OUT"
                                className="font-syne"
                                fromFontVariationSettings="'wght' 400"
                                toFontVariationSettings="'wght' 900"
                                radius={200}
                            />
                        </div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-gradient bg-[length:200%_auto] text-center font-cinzel font-bold">
                            BE PART OF SWASTIKA
                        </span>
                    </h2>
                    <p className="max-w-xl mx-auto text-xl text-white/70 font-jost font-light">
                        Join 5000+ students, 60+ events, and experience the future of culture and technology.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                        <button className="group relative px-12 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-transform will-change-transform shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]">
                            <span className="relative z-10 font-syne uppercase tracking-wider">Register Now</span>
                            <div className="absolute inset-0 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0" />
                            <span className="absolute inset-0 flex items-center justify-center text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-syne uppercase tracking-wider">
                                Let's Go
                            </span>
                        </button>
                        <button className="px-12 py-4 border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/5 transition-colors font-syne uppercase tracking-wider">
                            Download Brochure
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
