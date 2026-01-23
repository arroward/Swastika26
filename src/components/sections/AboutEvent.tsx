'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Cpu, Zap, Globe, ArrowRight } from 'lucide-react';

export default function AboutEvent() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    const stats = [
        { label: "Events", value: "20+", icon: Terminal },
        { label: "Footfall", value: "5K+", icon: Globe },
        { label: "Prize Pool", value: "10L+", icon: Zap },
        { label: "Workshops", value: "10+", icon: Cpu },
    ];

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex items-center justify-center overflow-hidden px-4 md:px-6 py-2 md:py-4"
        >
            {/* Main Grid Container */}
            <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-4">

                {/* 1. Left Panel / Top Mobile Header */}
                <div className="lg:col-span-3 lg:h-full bg-[#111] rounded-[2rem] border border-white/10 p-5 lg:p-6 flex flex-row lg:flex-col justify-between items-center lg:items-start shrink-0 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <div className="flex flex-col gap-1 z-10">
                        <div className="flex items-center gap-2 mb-1 lg:mb-6">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-white/50">Details</span>
                        </div>
                        <h2 className="text-2xl lg:text-4xl font-black font-syne text-white leading-none">
                            THE <span className="text-red-500">SAGA</span>
                        </h2>
                    </div>

                    <div className="hidden lg:block space-y-4 w-full">
                        <div className="h-[1px] w-full bg-white/10" />
                        <p className="text-sm text-white/60 font-jost leading-relaxed">
                            A high-octane celebration of technology, creativity, and culture.
                        </p>
                    </div>
                </div>

                {/* 2. Center Panel - Hero Visual */}
                <div className="flex-1 lg:col-span-6 min-h-0 relative rounded-[2rem] overflow-hidden group border border-white/10">
                    <img
                        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop"
                        alt="Event Main"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    {/* Floating Big Title */}
                    <div className="absolute bottom-4 left-4 lg:bottom-10 lg:left-10 z-10 text-left">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : {}}
                            className="text-5xl md:text-7xl xl:text-8xl font-black font-cinzel text-white leading-none tracking-tight mix-blend-overlay"
                        >
                            SWASTIKA
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.2 }}
                            className="text-sm md:text-xl font-mono text-red-500 tracking-widest mt-1 lg:mt-2 ml-1"
                        >
                            2026 EDITION
                        </motion.p>
                    </div>
                </div>

                {/* 3. Right Panel - Stats - Mobile Grid / Desktop Stack */}
                <div className="lg:col-span-3 lg:h-full grid grid-cols-2 lg:flex lg:flex-col gap-2 lg:gap-4 shrink-0">
                    {stats.map((stat, i) => (
                        <div key={i} className="flex-1 min-h-[60px] lg:min-h-[80px] bg-[#111] rounded-[1.5rem] border border-white/10 flex items-center px-4 lg:px-6 gap-3 lg:gap-4 hover:border-red-500/30 transition-colors group/stat">
                            <div className="p-2 lg:p-3 bg-white/5 rounded-full group-hover/stat:bg-red-500/10 transition-colors shrink-0">
                                <stat.icon className="w-4 h-4 lg:w-5 lg:h-5 text-white group-hover/stat:text-red-500 transition-colors" />
                            </div>
                            <div className="min-w-0">
                                <h3 className="text-lg lg:text-2xl font-bold font-syne text-white truncate leading-none">{stat.value}</h3>
                                <p className="text-[9px] lg:text-[10px] uppercase text-white/40 tracking-wider truncate mt-1">{stat.label}</p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
