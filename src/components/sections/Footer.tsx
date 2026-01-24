'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useInView, Variants } from 'framer-motion';
import { Instagram, ArrowUpRight } from 'lucide-react';

// Extracted constants for better performance
const navLinks = [
    { name: 'Events', href: '/events' },
    { name: 'Proshow', href: '/proshow' },
    { name: 'Register', href: '/register' },
    { name: 'Gallery', href: '/gallery' }
];

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    }
};

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const currentYear = new Date().getFullYear();
    const isInView = useInView(containerRef, { once: true, margin: "-10%" });

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Optimized spring config
    const smoothX = useSpring(mouseX, { damping: 20, stiffness: 100, mass: 0.5 });
    const smoothY = useSpring(mouseY, { damping: 20, stiffness: 100, mass: 0.5 });

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <footer
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative bg-[#050505] text-white w-full h-auto flex flex-col justify-start overflow-hidden pt-12 pb-6"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <motion.div
                    className="absolute w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px] will-change-transform"
                    style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
                />
                <div className="absolute inset-0 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-between"
            >
                {/* Upper Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

                    {/* Brand / Title */}
                    <div className="lg:col-span-8 space-y-8">
                        <motion.h1
                            variants={itemVariants}
                            className="text-[10vw] leading-[0.8] font-bold font-cinzel tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 will-change-transform"
                        >
                            SWASTIKA
                            <span className="block text-[3vw] font-jost font-light tracking-[0.2em] text-white/40 mt-2">
                                2026 EDITION
                            </span>
                        </motion.h1>
                    </div>

                    {/* Navigation & Info */}
                    <div className="lg:col-span-4 flex flex-col justify-between gap-12 pt-4">
                        <motion.div variants={itemVariants} className="space-y-6">
                            <h3 className="font-jost text-sm uppercase tracking-[0.2em] text-red-500 font-semibold">Menu</h3>
                            <nav className="flex flex-col gap-2">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="group flex items-center gap-2 text-2xl md:text-3xl font-jost font-light text-white/70 hover:text-white transition-colors w-fit"
                                    >
                                        <ArrowUpRight className="w-5 h-5 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" />
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </motion.div>

                        <motion.div variants={itemVariants} className="space-y-6">
                            <h3 className="font-jost text-sm uppercase tracking-[0.2em] text-red-500 font-semibold">Connect</h3>
                            <a
                                href="https://instagram.com/swastika_2k26"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-4 p-6 border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500 hover:border-red-500/30 w-full md:w-auto"
                            >
                                <div className="p-3 rounded-full bg-white/10 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                                    <Instagram size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 font-jost uppercase tracking-wider mb-1">Follow us on</p>
                                    <p className="text-xl text-white font-cinzel font-bold group-hover:text-red-100 transition-colors">@swastika_2k26</p>
                                </div>
                                <ArrowUpRight className="ml-auto w-6 h-6 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                            </a>
                        </motion.div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <motion.div
                    variants={itemVariants}
                    className="mt-12 md:mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm font-jost text-white/30 uppercase tracking-widest"
                >

                    <p className="group">
                        Crafted by <span className="text-white/60 group-hover:text-red-500 transition-colors cursor-default">SWASTIKA'26 Tech Team</span>
                    </p>
                </motion.div>
            </motion.div>

            {/* Marquee Background
            <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-[0.03] select-none">
                <motion.div
                    className="whitespace-nowrap flex will-change-transform"
                    animate={{ x: ["0%", "-30%"] }}
                    transition={{ duration: 40, ease: "linear", repeat: Infinity }}
                >
                    {[...Array(3)].map((_, i) => (
                        <span key={i} className="text-[20vw] font-black font-cinzel leading-none px-12 text-white">
                            LEGACY BEYOND LIMITS —
                        </span>
                    ))}
                </motion.div>
            </div> */}
        </footer>
    );
}
