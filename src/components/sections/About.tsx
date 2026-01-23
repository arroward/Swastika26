'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Cpu, Zap, Globe, GraduationCap, Users, Trophy, BookOpen } from 'lucide-react';
import VariableProximity from '@/components/VariableProximity';
import { SkeletonImage } from '@/components/Skeleton';

export default function About() {
    return (
        <div className="flex flex-col w-full">
            <AboutEvent />
            <AboutCollege />
        </div>
    );
}

function AboutEvent() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-20%" });
    const [imageLoaded, setImageLoaded] = useState(false);

    const stats = [
        { label: "Events", value: "20+", icon: Terminal },
        { label: "Footfall", value: "5K+", icon: Globe },
        { label: "Prize Pool", value: "10L+", icon: Zap },
        { label: "Workshops", value: "10+", icon: Cpu },
    ];

    return (
        <section
            ref={containerRef}
            className="relative w-full py-16 md:py-24 flex items-center justify-center overflow-hidden"
        >
            <div className="container mx-auto px-4 md:px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Text Content - Event */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col justify-center order-2 lg:order-1 h-full lg:h-auto py-6"
                >
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="inline-block py-1 px-3 rounded-full border border-accent-main/30 bg-accent-main/10 text-accent-main text-xs md:text-sm font-mono tracking-widest uppercase w-fit"
                        >
                            About The Fest
                        </motion.span>

                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-syne leading-none cursor-default">
                            <span className="block text-white">THE ULTIMATE</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent-main to-purple-600">TECH SAGA</span>
                        </h2>

                        <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed font-light font-jost max-w-xl">
                            Swastika is the National Level Techno-Cultural Fest of Mar Baselios Christian College of Engineering and Technology, Peermade — a high-octane celebration of technology, creativity, and culture. It brings together passionate students from across the country to compete, collaborate, and push the limits of innovation while showcasing their talents on a national stage.
                            With participants from diverse engineering streams and cultural backgrounds, Swastika becomes a melting pot of fresh ideas, brilliant minds, and unstoppable energy. From intense technical challenges to electrifying cultural performances, the fest is designed to inspire, engage, and ignite young innovators.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 lg:mt-10">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="p-3 border-l border-white/10 hover:border-accent-main/50 transition-colors pl-4"
                            >
                                <stat.icon className="w-5 h-5 text-accent-main mb-2" />
                                <h3 className="text-xl lg:text-2xl font-bold font-syne text-white">{stat.value}</h3>
                                <p className="text-[10px] lg:text-xs uppercase tracking-wider text-white/40">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Visual Content - Event */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1 }}
                    className="relative h-[35vh] lg:h-[65vh] w-full order-1 lg:order-2 flex items-center justify-center p-2 lg:p-0"
                >
                    <div className="relative w-full h-full lg:aspect-[4/3] rounded-[2rem] overflow-hidden group border border-white/10">
                        <div className="absolute inset-0 bg-accent-main/20 mix-blend-overlay z-10" />
                        {!imageLoaded && <SkeletonImage className="w-full h-full" />}
                        <img
                            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop"
                            alt="Tech Festival"
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imageLoaded ? 'block' : 'hidden'}`}
                        />

                        {/* Floating Date Badge */}
                        <div className="absolute bottom-0 right-0 bg-black/80 backdrop-blur-md p-4 lg:p-6 border-t border-l border-white/10 rounded-tl-3xl z-20">
                            <div className="text-right">
                                <p className="text-3xl lg:text-4xl font-black font-syne text-white leading-none">20-21</p>
                                <p className="text-accent-main text-xs font-bold tracking-[0.3em] font-jost uppercase mt-1">February</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function AboutCollege() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-20%" });
    const [imageLoaded, setImageLoaded] = useState(false);

    // Placeholder content for college - user can specific real details later
    const collegeStats = [
        { label: "Legacy", value: "25+ Yrs", icon: Trophy },
        { label: "Community", value: "10k+", icon: Users },
        { label: "Programs", value: "50+", icon: GraduationCap },
        { label: "Research", value: "High", icon: BookOpen },
    ];

    return (
        <section
            ref={containerRef}
            className="relative w-full py-16 md:py-24 flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-sm"
        >
            <div className="container mx-auto px-4 md:px-6 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Visual Content - College */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="relative h-[35vh] lg:h-[65vh] w-full flex items-center justify-center p-2 lg:p-0"
                >
                    <div className="relative w-full h-full lg:aspect-[4/3] rounded-[2rem] overflow-hidden group border border-white/10">
                        <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay z-10" />
                        {!imageLoaded && <SkeletonImage className="w-full h-full" />}
                        <img
                            src="https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2586&auto=format&fit=crop"
                            alt="College Campus"
                            loading="lazy"
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110 ${imageLoaded ? 'block' : 'hidden'}`}
                        />
                        <div className="absolute top-0 left-0 bg-black/80 backdrop-blur-md p-4 lg:p-6 border-b border-r border-white/10 rounded-br-3xl z-20">
                            <div className="text-left">
                                <p className="text-lg lg:text-xl font-bold font-cinzel text-white leading-none">ESTD.</p>
                                <p className="text-white/60 text-base font-mono mt-1">2001</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Text Content - College */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col justify-center h-full lg:h-auto py-6"
                >
                    <div className="space-y-4">
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.2 }}
                            className="inline-block py-1 px-3 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs md:text-sm font-mono tracking-widest uppercase w-fit"
                        >
                            The Institution
                        </motion.span>

                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black font-syne leading-none cursor-default">
                            <span className="block text-white">MAR BASELIOS</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">CHRISTIAN COLLEGE</span>
                        </h2>

                        <p className="text-sm md:text-base lg:text-lg text-white/70 leading-relaxed font-light font-jost max-w-xl">
                            Mar Baselios Christian College of Engineering & Technology (MBCET), Kuttikkanam, Peermade, is a premier self-financing institution offering quality engineering education in a serene hill-station campus. Established in 2001, the college is affiliated to Dr. APJ Abdul Kalam Technological University (KTU) and approved by AICTE, New Delhi. It is owned and managed by the Malankara Orthodox Syrian Church, ensuring strong leadership rooted in values and excellence.
                        </p>
                    </div>

                    {/* Stats Grid - College */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 lg:mt-10">
                        {collegeStats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="p-3 border-l border-white/10 hover:border-blue-500/50 transition-colors pl-4"
                            >
                                <stat.icon className="w-5 h-5 text-blue-400 mb-2" />
                                <h3 className="text-xl lg:text-2xl font-bold font-syne text-white">{stat.value}</h3>
                                <p className="text-[10px] lg:text-xs uppercase tracking-wider text-white/40">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
