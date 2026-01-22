import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative pt-20 pb-12 px-6 md:px-12 border-t border-white/10 overflow-hidden">

            {/* Main Footer Content */}
            <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col gap-20">

                {/* Top Row: Brand & CTA */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 group">
                    <div className="flex flex-col gap-3 transition-transform duration-500 group-hover:translate-x-2">
                        <div className="flex items-center gap-4">
                            <img src="/logo/WH_LOGO.svg" alt="Swastika Logo" className="w-14 h-14 md:w-20 md:h-20 opacity-90" />
                            <h2 className="text-5xl md:text-7xl font-cinzel font-black tracking-tighter text-white">Swastika<span className="text-[var(--accent-main)]">.</span>26</h2>
                        </div>
                        <p className="text-[var(--text-secondary)] text-base md:text-lg font-jost pl-0 md:pl-24 tracking-wide font-light">Refining the Future of Techno-Culture.</p>
                    </div>

                    <button className="bg-white text-black px-10 py-5 rounded-full font-black hover:bg-[var(--accent-main)] hover:text-white transition-all flex items-center gap-3 group/btn font-syne text-lg tracking-tight">
                        <span>Get Your Ticket</span>
                        <div className="bg-black text-white rounded-full p-2 group-hover/btn:bg-white group-hover/btn:text-black transition-colors rotate-45 group-hover/btn:rotate-0 duration-300">
                            <ArrowUpRight size={20} />
                        </div>
                    </button>
                </div>

                {/* Middle Row: Socials & Nav */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-white/10 pb-12">
                    <div className="flex flex-col gap-6">
                        <span className="text-[var(--text-secondary)] text-sm uppercase tracking-[0.2em] font-mono">Connect With Us</span>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
                                    <Icon size={24} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 md:gap-8">
                        {['Speakers', 'Agenda', 'Venue', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-lg px-6 py-2 rounded-full border border-white/5 bg-white/5 hover:border-[var(--accent-main)] hover:bg-[var(--accent-main)]/10 hover:text-white text-[var(--text-secondary)] transition-all font-syne">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Row: Legal & Sub-text */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[var(--text-secondary)] font-mono opacity-60">
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span>Designed & Developed by</span>
                        <span className="text-white font-bold">Tech Team '26</span>
                    </div>
                </div>

            </div>

            {/* Massive Footer Background Text */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-20 select-none">
                <h1 className="text-[25vw] font-black font-display text-transparent stroke-text text-center transform translate-y-[30%]">
                    SWASTIKA
                </h1>
            </div>
        </footer>
    );
}
