'use client';

import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, MessageCircle, Terminal, Code2, Globe, Cpu, Zap, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FooterContent() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative w-full bg-[#050505] text-white border-t border-white/5 overflow-hidden">

            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-30" />
                <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-red-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            </div>

            <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 py-16 lg:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">

                    {/* Brand Section */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <Activity className="text-red-500 animate-pulse" size={24} />
                                <span className="font-mono text-xs text-red-500 tracking-widest uppercase border border-red-500/20 px-2 py-1 rounded bg-red-500/5">
                                    System Active
                                </span>
                            </div>
                            <h3 className="font-syne font-bold text-4xl mb-4 tracking-tight text-white">
                                SWASTIKA<span className="text-red-600">26</span>
                            </h3>
                            <p className="font-mono text-white/40 text-xs leading-relaxed max-w-sm">
                                // INITIALIZING PROTOCOLS...<br />
                                // LOADING EXPERIENCE MODULES...<br />
                                // ESTABLISHING SECURE CONNECTION_
                            </p>
                        </div>

                        {/* Social Mini Matrix */}
                        <div className="flex gap-3 mt-8">
                            {[Instagram, Twitter, Linkedin, MessageCircle].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-md bg-white/5 border border-white/10 hover:bg-red-600 hover:border-red-600 hover:scale-105 transition-all duration-300 group">
                                    <Icon size={18} className="text-white/60 group-hover:text-white transition-colors" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="lg:col-span-4 flex gap-12 lg:gap-24">
                        <div className="flex flex-col gap-4">
                            <h4 className="font-mono text-xs text-white/30 uppercase tracking-widest mb-2">Explore</h4>
                            {['About', 'Events', 'Sponsors', 'Gallery'].map((link) => (
                                <Link key={link} href={`#${link.toLowerCase()}`} className="text-sm font-syne text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {link}
                                </Link>
                            ))}
                        </div>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-mono text-xs text-white/30 uppercase tracking-widest mb-2">Legal</h4>
                            {['Privacy', 'Terms', 'Code of Conduct'].map((link) => (
                                <Link key={link} href="#" className="text-sm font-syne text-white/60 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                                    <span className="w-1 h-1 rounded-full bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    {link}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter / Status */}
                    <div className="lg:col-span-4 flex flex-col justify-end">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group hover:border-red-500/30 transition-colors">
                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <h4 className="font-syne font-bold text-lg mb-2 relative z-10">Stay Updated</h4>
                            <p className="text-white/40 text-xs mb-4 relative z-10">Subscribe to our frequency for the latest transmission updates.</p>

                            <div className="flex gap-2 relative z-10">
                                <input
                                    type="email"
                                    placeholder="ENTER_EMAIL_ID"
                                    className="bg-black/50 border border-white/10 rounded px-4 py-2 text-xs font-mono text-white w-full focus:outline-none focus:border-red-500/50 transition-colors placeholder:text-white/20"
                                />
                                <button className="bg-white text-black px-4 py-2 rounded font-mono text-xs font-bold hover:bg-red-500 hover:text-white transition-colors">
                                    SEND
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="font-mono text-[10px] text-white/30 text-center md:text-left">
                        © {currentYear} Swastika 26. Crafted by the Algorithms.
                    </p>

                    <Link href="/credits" className="group flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 hover:border-green-500/30 hover:bg-green-900/10 transition-all duration-300">
                        <Code2 size={12} className="text-white/30 group-hover:text-green-400 transition-colors" />
                        <span className="font-mono text-[10px] text-white/30 group-hover:text-green-400 transition-colors uppercase tracking-wider">
                            Developed by Tech Team
                        </span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
