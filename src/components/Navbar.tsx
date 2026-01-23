'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

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
        { title: "Home", href: "#home" },
        { title: "About", href: "#about" },
        { title: "Events", href: "#events" },
        { title: "Proshows", href: "#proshow" },
        { title: "Gallery", href: "#gallery" },
        { title: "Sponsors", href: "#sponsors" },
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

            {/* FULLSCREEN MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-3xl z-[90] flex flex-col items-center justify-center"
                    >
                        {/* Menu Links */}
                        <div className="flex flex-col gap-6 md:gap-8 text-center">
                            {menuItems.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className="font-cinzel font-black text-3xl md:text-5xl text-transparent stroke-text hover:text-white transition-colors duration-300 uppercase relative group"
                                    >
                                        <span className="relative z-10">{item.title}</span>
                                        <span className="absolute inset-0 text-accent-main opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-300 transform scale-110">
                                            {item.title}
                                        </span>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer in Menu */}
                        <div className="absolute bottom-12 text-white/30 font-mono text-xs md:text-sm">
                            SWASTIKA 2026 • FEB 20-21
                        </div>

                        {/* Background Texture */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
