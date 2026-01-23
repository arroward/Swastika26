'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import { ArrowUpRight, Instagram, Twitter, Linkedin, MessageCircle, Github, Globe, Code2, Terminal, Cpu, Zap, Mail } from 'lucide-react';

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const currentYear = new Date().getFullYear();

    // Smooth magnetic mouse effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <footer
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative bg-[#030303] text-white min-h-screen flex flex-col justify-between overflow-hidden sm:pb-0 pb-10"
        >
            {/* 1. Dynamic Background Grid with Mouse Spotlight */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Base Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

                {/* Mouse Follower Gradient using MotionTemplate */}
                <motion.div
                    className="absolute inset-0 opacity-100 transition-opacity duration-500"
                    style={{
                        background: useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(220, 38, 38, 0.06), transparent 80%)`
                    }}
                />

                {/* Animated Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />
            </div>

            {/* 2. Main Content Container */}
            <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 pt-32 flex-grow flex flex-col">

                {/* TOP SECTION: ACTION & HEADLINE */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24 lg:mb-32">

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

                {/* MIDDLE SECTION: LINKS & INFO */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-12 border-t border-white/10">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 group">
                            <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:border-red-500/50 transition-colors">
                                <Globe className="w-6 h-6 text-white group-hover:text-red-500 transition-colors" />
                            </div>
                            <span className="font-syne font-bold text-xl tracking-tight">SWASTIKA 26</span>
                        </div>
                        <p className="font-mono text-sm text-white/50 leading-relaxed max-w-xs">
                            The ultimate convergence of technology, culture, and innovation.
                            Redefining the future one line of code at a time.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-4">
                        <h4 className="font-mono text-xs text-white/30 uppercase tracking-widest mb-6">Navigation</h4>
                        <ul className="space-y-2">
                            {['About', 'Events', 'Sponsors', 'Gallery'].map((item) => (
                                <li key={item}>
                                    <Link href={`#${item.toLowerCase()}`} className="group flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-red-500 transition-colors" />
                                        <span className="font-syne text-lg text-white/60 group-hover:text-white transition-colors">{item}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="font-mono text-xs text-white/30 uppercase tracking-widest mb-6">Connect</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer">
                                <Mail size={16} />
                                <span className="font-mono text-sm">hello@swastika26.com</span>
                            </li>
                            <li className="flex items-center gap-3 text-white/60 hover:text-white transition-colors cursor-pointer">
                                <MessageCircle size={16} />
                                <span className="font-mono text-sm">Join Discord Server</span>
                            </li>
                        </ul>
                    </div>

                    {/* Socials */}
                    <div className="space-y-4">
                        <h4 className="font-mono text-xs text-white/30 uppercase tracking-widest mb-6">Socials</h4>
                        <div className="flex gap-4">
                            {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-red-600 hover:border-red-600 hover:scale-110 transition-all duration-300">
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* BOTTOM BAR: CREDITS & LEGAL */}
                <div className="mt-auto pt-12 pb-6 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5">
                    <p className="font-mono text-xs text-white/30">
                        © {currentYear} Swastika 26. All rights reserved.
                    </p>

                    {/* Tech Team Pill */}
                    <Link href="/credits">
                        <div className="group relative px-5 py-2 rounded-full bg-[#0A0A0A] border border-white/10 flex items-center gap-3 overflow-hidden cursor-pointer hover:border-green-500/50 transition-colors">
                            <div className="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Terminal size={14} className="text-white/40 group-hover:text-green-400 transition-colors" />
                            <span className="font-mono text-xs text-white/40 group-hover:text-green-400 transition-colors">
                                System Architects
                            </span>
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        </div>
                    </Link>
                </div>
            </div>

            {/* 3. Infinite Marquee Background (Low Opacity) */}
            <div className="absolute bottom-0 w-full overflow-hidden pointer-events-none opacity-[0.02]">
                <motion.div
                    className="whitespace-nowrap flex"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 30, ease: "linear", repeat: Infinity }}
                >
                    {[...Array(4)].map((_, i) => (
                        <h1 key={i} className="text-[15vw] font-black font-syne text-white px-12">
                            SWASTIKA 26 — INNOVATE — CREATE —
                        </h1>
                    ))}
                </motion.div>
            </div>
        </footer>
    );
}

// Helper Component for Magnetic Effect
function MagneticButton({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current!.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
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
