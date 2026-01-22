'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Terminal, Cpu, Zap, Globe } from 'lucide-react';
import VariableProximity from '@/components/VariableProximity';
import { SkeletonImage } from '@/components/Skeleton';

export default function About() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });
    const [imageLoaded, setImageLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

    const stats = [
        { label: "Events", value: "20+", icon: Terminal },
        { label: "Footfall", value: "5K+", icon: Globe },
        { label: "Prize Pool", value: "10L+", icon: Zap },
        { label: "Workshops", value: "10+", icon: Cpu },
    ];

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen py-16 md:py-24 flex items-center justify-center overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-4 md:space-y-6 lg:space-y-8 order-2 lg:order-1"
                >
                    <div className="space-y-3 md:space-y-4">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="inline-block py-1 px-3 rounded-full border border-accent-main/30 bg-accent-main/10 text-accent-main text-xs md:text-sm font-mono tracking-widest uppercase"
                        >
                            About The Fest
                        </motion.span>

                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-black font-syne leading-tight cursor-default">
                            <div className="inline-block mr-2 md:mr-3">
                                <VariableProximity label="WHERE" className="font-syne" fromFontVariationSettings="'wght' 400" toFontVariationSettings="'wght' 900" radius={100} />
                            </div>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 font-cinzel inline-block mr-2 md:mr-3">CULTURE</span>
                            <div className="inline-block mr-2 md:mr-3">
                                <VariableProximity label="MEETS" className="font-syne" fromFontVariationSettings="'wght' 400" toFontVariationSettings="'wght' 900" radius={100} />
                            </div>
                            <span className="text-accent-main font-cinzel inline-block">FUTURE</span>
                        </h2>

                        <p className="text-base md:text-lg text-white/60 leading-relaxed font-light font-jost max-w-xl">
                            Swastika 2026 is the ultimate convergence of technology, art, and innovation.
                            We are crafting an experience that transcends the ordinary—a two-day saga of
                            relentless competition, electrifying performances, and groundbreaking ideas.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6 pt-2 md:pt-4">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="p-3 md:p-4 border border-white/5 bg-white/5 backdrop-blur-sm rounded-xl hover:border-accent-main/40 transition-colors group"
                            >
                                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-accent-main mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl md:text-3xl font-bold font-syne">{stat.value}</h3>
                                <p className="text-xs md:text-sm text-white/40 uppercase tracking-wider">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Visual Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1, type: "spring" }}
                    className="relative h-[300px] min-h-[300px] lg:h-full lg:min-h-[500px] w-full order-1 lg:order-2 flex justify-center"
                >
                    {/* Abstract 3D-like Composition */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-80 h-96 bg-gradient-to-tr from-accent-main to-purple-900 rounded-[2rem] rotate-6 group">
                            <div className="absolute inset-0 bg-black/10 backdrop-blur-xl border border-white/10 rounded-[2rem]" />
                            {!imageLoaded && <SkeletonImage className="w-full h-full rounded-[2rem]" />}
                            <img
                                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop"
                                alt="Tech Festival"
                                loading="lazy"
                                onLoad={() => setImageLoaded(true)}
                                className={`w-full h-full object-cover rounded-[2rem] opacity-60 mix-blend-overlay group-hover:opacity-100 transition-opacity duration-500 ${imageLoaded ? 'block' : 'hidden'}`}
                            />
                        </div>

                        <div className="absolute w-72 h-80 border-2 border-white/20 rounded-[2rem] -rotate-6 backdrop-blur-sm z-10" />

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -bottom-10 -left-10 bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl shadow-2xl z-20"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full bg-accent-main flex items-center justify-center font-black text-black text-xl font-syne">
                                    26
                                </div>
                                <div>
                                    <p className="text-white font-black text-lg tracking-tight font-syne">FEB 20-21</p>
                                    <p className="text-white/50 text-xs uppercase tracking-[0.15em] font-jost font-light">Save the dates</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
