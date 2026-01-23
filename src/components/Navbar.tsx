'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    useEffect(() => {
        const container = document.getElementById('main-container');
        const handleScroll = () => {
            if (container) {
                // Check if scrolled past the Hero section (height roughly 100vh)
                // Using window.innerHeight as proxy for Hero height
                const heroHeight = window.innerHeight * 0.9;
                setIsScrolled(container.scrollTop > heroHeight);
            }
        };

        handleScroll(); // Initial check
        container?.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll); // Check on resize too
        return () => {
            container?.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // Menu Items
    const menuItems = [
        { title: "Home", href: "#home", src: "/EVENTS/6.jpeg" },
        { title: "About", href: "#about", src: "/EVENTS/1.jpeg" },
        { title: "Events", href: "#events", src: "/EVENTS/2.jpeg" },
        { title: "Proshows", href: "#proshow", src: "/EVENTS/3.jpeg" },
        { title: "Gallery", href: "#gallery", src: "/EVENTS/4.jpeg" },
        { title: "Sponsors", href: "#sponsors", src: "/EVENTS/5.jpeg" },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`w-full z-[100] px-4 py-3 md:px-6 md:py-4 flex items-center justify-between transition-all duration-500 rounded-[2rem] shrink-0
                    bg-black/20 backdrop-blur-md border border-white/10 shadow-lg`}
            >
                {/* LOGO */}
                <Link href="/" onClick={() => setIsOpen(false)} className="pointer-events-auto group flex items-center gap-2 md:gap-3 relative z-[110]">
                    <img
                        src="/logo/WH_LOGO.svg"
                        alt="Swastika Logo"
                        className="w-7 h-7 md:w-8 md:h-8 opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="font-cinzel font-black text-lg md:text-xl tracking-tighter text-white group-hover:text-accent-main transition-colors duration-300">
                        SWASTIKA<span className="text-accent-main text-2xl md:text-3xl leading-none">.</span>26
                    </span>
                </Link>

                {/* MORPHING HAMBURGER BUTTON - ALWAYS VISIBLE */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="pointer-events-auto relative z-[110] p-2 hover:bg-white/10 rounded-full transition-colors group"
                >
                    <div className="flex flex-col gap-1.5 w-8 items-end justify-center">
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="w-8 h-0.5 bg-white block origin-center transition-colors group-hover:bg-accent-main"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                            className="w-6 h-0.5 bg-white block transition-all group-hover:bg-accent-main"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                            className="w-8 h-0.5 bg-white block origin-center transition-colors group-hover:bg-accent-main"
                        />
                    </div>
                </button>
            </motion.nav>

            {/* CREATIVE FULLSCREEN MENU OVERLAY */}
            <AnimatePresence mode="wait">
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 bg-black z-[90] flex md:flex-row flex-col overflow-hidden"
                    >
                        {/* LEFT SIDE - LIST */}
                        <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-20 relative z-20 bg-black/90 md:bg-black">
                            <div className="flex flex-col gap-2 md:gap-4">
                                {menuItems.map((item, i) => (
                                    <div key={i} className="overflow-hidden">
                                        <motion.div
                                            initial={{ y: 100 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: 100 }}
                                            transition={{ delay: 0.1 + (i * 0.05), duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                onMouseEnter={() => setHoveredIdx(i)}
                                                onMouseLeave={() => setHoveredIdx(null)}
                                                className="group flex items-center gap-4 py-2"
                                            >
                                                <span className={`font-mono text-sm md:text-base text-accent-main transition-all duration-300 ${hoveredIdx === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                                    0{i + 1}
                                                </span>
                                                <span className={`font-cinzel font-black text-4xl md:text-7xl uppercase transition-all duration-500 ${hoveredIdx === i ? 'text-white translate-x-2' : 'text-transparent stroke-text hover:text-white/50'}`}>
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                            {/* Footer Info */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="absolute bottom-10 left-6 md:left-20 flex gap-8 text-white/40 font-mono text-xs md:text-sm"
                            >
                                <div className="flex flex-col">
                                    <span className="text-white mb-1">CONTACT</span>
                                    <a href="#" className="hover:text-accent-main transition-colors">swastika@event.com</a>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-white mb-1">FOLLOW US</span>
                                    <div className="flex gap-4">
                                        <a href="#" className="hover:text-accent-main transition-colors">IG</a>
                                        <a href="#" className="hover:text-accent-main transition-colors">TW</a>
                                        <a href="#" className="hover:text-accent-main transition-colors">YT</a>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* RIGHT SIDE - IMAGE REVEAL */}
                        <div className="absolute inset-0 md:static md:w-1/2 h-full bg-neutral-900 pointer-events-none">
                            <AnimatePresence mode="wait">
                                {hoveredIdx !== null ? (
                                    <motion.div
                                        key={hoveredIdx}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 0.4, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.6 }}
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${menuItems[hoveredIdx].src})` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-l from-black/0 to-black translate-x-[-1px]" />
                                    </motion.div>
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                        {/* Default Abstract Pattern or Logo when nothing hovered */}
                                        <div className="font-cinzel font-black text-[20vw] text-white leading-none tracking-tighter mix-blend-overlay">
                                            26
                                        </div>
                                    </div>
                                )}
                            </AnimatePresence>

                            {/* Decorative Grid */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
