'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Instagram, Twitter, Linkedin, MessageCircle, Github, Globe, Terminal, Mail, Activity, Wifi } from 'lucide-react';

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);

    const currentYear = new Date().getFullYear();

    // Smooth magnetic mouse effect
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
        <footer
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative bg-[#030303] text-white w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex flex-col justify-between overflow-hidden sm:pb-0 pb-10"
        >
            {/* 1. Dynamic Background Grid with Performant Spotlight */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                {/* Base Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

                <motion.div
                    className="absolute w-[600px] h-[600px] bg-red-600/05 rounded-full blur-[100px]"
                    style={{
                        x: smoothX,
                        y: smoothY,
                        translateX: "-50%",
                        translateY: "-50%",
                        willChange: "transform",
                    }}
                />

                {/* Animated Noise Texture */}
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />
            </div>

            {/* 2. Main Content Container */}
            <div className="relative z-10 w-full max-w-[1920px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col flex-grow justify-between pb-8 pt-20">
                {/* CREATIVE CENTERPIECE: TERMINAL & STATUS */}
                <div className="w-full flex-grow flex flex-col md:flex-row items-center justify-between gap-12 md:gap-24 mb-12">

                    {/* Left: System Diagnostics */}
                    <div className="hidden md:flex flex-col gap-4 w-64 opacity-50 font-mono text-xs text-red-500/80">
                        <div className="flex items-center gap-2 text-white/40">
                            <Activity className="w-4 h-4" />
                            <span>SYSTEM STATUS: ONLINE</span>
                        </div>
                        <div className="h-px w-full bg-white/10" />
                        <div className="space-y-1">
                            {["INIT_CORE_V.2.6", "PROTOCOL: OVERDRIVE", "UPLINK: SECURE", "LATENCY: 12ms"].map((text, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.2 + 0.5, duration: 0.5 }}
                                    className="flex justify-between"
                                >
                                    <span>{text}</span>
                                    <span className="text-white/20">OK</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Center: Hero Typography */}
                    <div className="text-center relative">
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="text-6xl md:text-8xl lg:text-9xl font-black font-syne tracking-tighter bg-gradient-to-b from-white via-white/80 to-transparent bg-clip-text text-transparent"
                        >
                            REVOLUTION
                        </motion.h1>
                        <div className="absolute top-0 right-0 -mr-4 -mt-2">
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="px-2 py-0.5 rounded border border-red-500 text-[10px] font-mono text-red-500 bg-red-500/10 tracking-widest"
                            >
                                LIVE
                            </motion.div>
                        </div>
                        <p className="mt-2 font-mono text-sm text-white/30 tracking-[0.5em] uppercase">Join the movement</p>
                    </div>

                    {/* Right: Data Visualizer */}
                    <div className="hidden md:flex flex-col items-end gap-4 w-64 opacity-50 font-mono text-xs text-white/40">
                        <div className="flex items-center gap-2 text-red-500/80">
                            <span>NETWORK TRAFFIC</span>
                            <Wifi className="w-4 h-4" />
                        </div>
                        <div className="flex gap-1 h-8 items-end">
                            {[40, 70, 30, 85, 50, 65, 45, 90, 60, 35].map((height, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [`${height}%`, `${Math.max(20, Math.random() * 100)}%`] }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
                                    className="w-1.5 bg-red-600 rounded-sm"
                                    style={{ height: `${height}%` }}
                                />
                            ))}
                        </div>
                        <div className="text-right">
                            <p>PACKETS: 8,492,104</p>
                            <p className="text-white/20">ENCRYPTION: AES-256</p>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom Bar */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <p className="font-mono text-xs text-white/30">
                            © {currentYear} Swastika 26.
                        </p>
                    </div>

                    <div className="flex items-center gap-6">
                        {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                            <a key={i} href="#" className="text-white/20 hover:text-red-500 transition-colors">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>

                    {/* Tech Team Pill */}
                    <Link href="/credits">
                        <div className="group relative px-4 py-1.5 rounded-full bg-[#0A0A0A] border border-white/10 flex items-center gap-3 overflow-hidden cursor-pointer hover:border-green-500/50 transition-colors">
                            <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <Terminal size={12} className="text-white/30 group-hover:text-green-400 transition-colors" />
                            <span className="font-mono text-[10px] text-white/30 group-hover:text-green-400 transition-colors uppercase tracking-wider">
                                System Architects
                            </span>
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
        </footer >
    );
}
