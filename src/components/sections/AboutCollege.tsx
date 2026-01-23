'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Users, Trophy, BookOpen } from 'lucide-react';

export default function AboutCollege() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-20%" });

    const collegeStats = [
        { label: "Legacy", value: "25+", icon: Trophy },
        { label: "Community", value: "10k", icon: Users },
        { label: "Programs", value: "50+", icon: GraduationCap },
        { label: "Research", value: "High", icon: BookOpen },
    ];

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex items-center justify-center overflow-hidden px-4 md:px-6 py-2 md:py-4"
        >
            <div className="w-full h-full flex flex-col lg:flex-row gap-2 relative">

                {/* Left Panel - Image Collage vibes */}
                <motion.div
                    initial={{ clipPath: 'inset(0 100% 0 0)' }}
                    animate={isInView ? { clipPath: 'inset(0 0 0 0)' } : {}}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex-1 h-[40%] lg:h-full relative rounded-[2rem] overflow-hidden group"
                >
                    <img
                        src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2586&auto=format&fit=crop"
                        alt="College Campus"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />

                    {/* Badge */}
                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 rounded-full">
                        <span className="text-xs font-mono text-white tracking-widest uppercase">Peermade, Kerala</span>
                    </div>
                </motion.div>

                {/* Right Panel - Content */}
                <div className="flex-[1.5] h-full flex flex-col gap-2">
                    {/* Top Right - Header Block */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : {}}
                        transition={{ delay: 0.2 }}
                        className="flex-1 bg-white/5 border border-white/5 rounded-[2rem] p-6 md:p-10 flex flex-col justify-center relative overflow-hidden group hover:bg-white/10 transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-syne uppercase text-white leading-[0.85] mb-4">
                            Mar Baselios <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Christian College</span>
                        </h2>

                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-20 bg-blue-500/50" />
                            <span className="text-sm font-mono text-blue-300 uppercase tracking-widest">Est. 2001</span>
                        </div>
                    </motion.div>

                    {/* Bottom Right - Info Split */}
                    <div className="flex-[0.8] flex flex-col md:flex-row gap-2">
                        {/* Description Box */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.3 }}
                            className="flex-[2] bg-black/40 border border-white/5 rounded-[2rem] p-6 md:p-8 flex items-center"
                        >
                            <p className="text-xs md:text-sm lg:text-base text-white/60 font-jost leading-relaxed">
                                A premier self-financing institution offering quality engineering education in a serene hill-station campus.
                                Fostering innovation, research, and holistic development for the future generation.
                            </p>
                        </motion.div>

                        {/* Stats Box */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : {}}
                            transition={{ delay: 0.4 }}
                            className="flex-1 bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-6 flex flex-col justify-between"
                        >
                            {collegeStats.map((stat, i) => (
                                <div key={i} className="flex justify-between items-end border-b border-blue-500/10 pb-2 last:border-0 last:pb-0">
                                    <span className="text-[10px] uppercase text-blue-200">{stat.label}</span>
                                    <span className="font-bold font-mono text-white">{stat.value}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
