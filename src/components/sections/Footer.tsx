'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, ArrowUpRight, Copy, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
    return (
        <footer className="relative h-auto lg:h-[calc(100dvh-5rem)] w-full bg-[#050505] overflow-hidden flex flex-col pt-10 px-4 md:px-6 lg:px-12 pb-6 border-t border-white/10">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

            {/* Top Section: Header & CTA */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-10 lg:mb-auto">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs font-mono text-green-500 tracking-widest uppercase">System Status: Online</span>
                    </div>
                    <h2 className="text-6xl md:text-8xl lg:text-[9rem] font-black font-cinzel text-white leading-[0.8] tracking-tighter">
                        SWAS<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">TIKA.</span>26
                    </h2>
                </div>

                <div className="mt-8 md:mt-0">
                    <button className="group relative px-8 py-4 bg-white text-black overflow-hidden rounded-full font-bold font-syne text-lg tracking-wide hover:scale-105 transition-transform duration-300">
                        <span className="relative z-10 flex items-center gap-2">
                            Secure Your Spot <ArrowUpRight size={20} />
                        </span>
                        <div className="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="absolute relative z-10 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex justify-center items-center">
                            Secure Your Spot <ArrowUpRight size={20} />
                        </span>
                    </button>
                    <p className="text-white/40 font-mono text-xs mt-3 text-right">Limited Early Bird Tickets Available</p>
                </div>
            </div>

            {/* Middle Section: Links & Info Grid */}
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-10 border-t border-white/10">

                {/* Column 1: Navigation */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-2">[ Navigation ]</h3>
                    {['Home', 'Events', 'Proshow', 'Gallery'].map((item) => (
                        <Link key={item} href={`#${item.toLowerCase()}`} className="text-2xl font-syne font-bold text-white hover:text-red-500 hover:pl-4 transition-all duration-300 flex items-center gap-2 group">
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-sm font-mono text-red-500">0{1}</span>
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Column 2: Legal/Support */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-2">[ Legal ]</h3>
                    {['Sponsorship', 'Privacy Policy', 'Terms & Conditions', 'Code of Conduct'].map((item) => (
                        <Link key={item} href="#" className="text-base font-jost text-white/70 hover:text-white transition-colors">
                            {item}
                        </Link>
                    ))}
                </div>

                {/* Column 3: Contact */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-2">[ Contact ]</h3>

                    <div className="flex items-start gap-3">
                        <MapPin className="text-red-500 mt-1 shrink-0" size={18} />
                        <p className="text-white/80 font-jost text-sm leading-relaxed">
                            Mar Baselios Christian College of Engineering & Technology,<br />
                            Peermade, Kerala - 685531
                        </p>
                    </div>

                    <div className="flex items-center gap-3 group cursor-pointer">
                        <Mail className="text-red-500 shrink-0" size={18} />
                        <span className="text-white/80 font-jost text-sm group-hover:text-white transition-colors">info@swastika26.in</span>
                    </div>
                </div>

                {/* Column 4: Socials */}
                <div className="flex flex-col justify-between">
                    <h3 className="text-sm font-mono text-white/50 uppercase tracking-widest mb-2">[ Social ]</h3>
                    <div className="flex gap-2 flex-wrap">
                        {[Instagram, Twitter, Linkedin, Facebook].map((Icon, i) => (
                            <a key={i} href="#" className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500 hover:border-red-500 hover:text-white transition-all duration-300 group">
                                <Icon size={20} className="group-hover:scale-110 transition-transform" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section: Footer Note */}
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10 mt-auto">
                <p className="text-white/30 text-xs font-mono uppercase">
                    © 2026 Swastika x MBCET. All Rights Reserved.
                </p>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <div className="w-2 h-2 bg-white/20 rounded-full" />
                    <p className="text-white/30 text-xs font-mono uppercase">
                        Designed by Tech Team 26
                    </p>
                </div>
            </div>

            {/* Decorative Big Text to fill space */}
            <div className="absolute top-[20%] right-[-5%] rotate-90 origin-center opacity-[0.02] pointer-events-none select-none">
                <span className="text-[20vh] font-black font-display text-white whitespace-nowrap">TECHNO CULTURE</span>
            </div>
        </footer>
    );
}
