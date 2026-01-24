'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function AboutEvent() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex items-center justify-center overflow-hidden px-4 md:px-6 py-2 md:py-4"
        >
            {/* Main Grid Container */}
            <div className="w-full h-full flex flex-col lg:grid lg:grid-cols-12 gap-2 lg:gap-4">

                {/* 1. Left Panel / Top Mobile Header */}
                <div className="lg:col-span-3 lg:h-full bg-[#111] rounded-[2rem] border border-white/10 p-5 lg:p-6 flex flex-col justify-between items-start shrink-0 relative overflow-hidden group gap-4 lg:gap-0">
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

                    <div className="block space-y-4 w-full">
                        <div className="h-[1px] w-full bg-white/10" />
                        <p className="text-sm text-white/60 font-jost leading-relaxed text-justify">
                            Swastika is the National Level Techno-Cultural Fest of Mar Baselios Christian College of Engineering and Technology, Peermade — a high-octane celebration of technology, creativity, and culture. It brings together passionate students from across the country to compete, collaborate, and push the limits of innovation while showcasing their talents on a national stage.
                        </p>
                        <p className="text-sm text-white/60 font-jost leading-relaxed text-justify">
                            With participants from diverse engineering streams and cultural backgrounds, Swastika becomes a melting pot of fresh ideas, brilliant minds, and unstoppable energy. From intense technical challenges to electrifying cultural performances, the fest is designed to inspire, engage, and ignite young innovators.
                        </p>
                    </div>
                </div>

                {/* 2. Center Panel - Hero Visual */}
                <div className="flex-1 lg:col-span-9 min-h-0 relative rounded-[2rem] overflow-hidden group border border-white/10">
                    <img
                        src={process.env.NEXT_PUBLIC_ABOUT_EVENT_IMAGE_URL}
                        alt="Event Main"
                        className="w-full h-full object-cover  transition-all duration-700 scale-105 group-hover:scale-100"
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

            </div>
        </section>
    );
}
