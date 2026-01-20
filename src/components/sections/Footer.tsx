import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, ArrowUpRight } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="relative bg-black pt-20 pb-12 px-6 md:px-12 border-t border-white/10 overflow-hidden">

            {/* Main Footer Content */}
            <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col gap-20">

                {/* Top Row: Brand & CTA */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-4xl font-display font-bold tracking-tighter text-white">Swastika<span className="text-[var(--accent-blue)]">.</span></h2>
                        <p className="text-[var(--text-secondary)] text-sm">Refining the Future.</p>
                    </div>

                    <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform flex items-center gap-2">
                        Get Your Ticket
                        <div className="bg-[var(--accent-blue)] rounded-full p-1 text-white">
                            <ArrowUpRight size={16} />
                        </div>
                    </button>
                </div>

                {/* Middle Row: Socials & Nav */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 border-b border-white/10 pb-12">
                    <div className="flex flex-col gap-4">
                        <span className="text-[var(--text-secondary)] text-sm uppercase tracking-widest">Connect</span>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-4 md:gap-8">
                        {['Speakers', 'Agenda', 'Venue', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="px-6 py-2 rounded-full border border-white/10 hover:border-[var(--accent-blue)] hover:text-white text-[var(--text-secondary)] transition-colors">
                                {item}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Row: Legal & Sub-text */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-[var(--text-secondary)]">
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                    <div className="flex gap-2 items-center">
                        <span>Designed by</span>
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
