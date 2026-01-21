import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between">
            <Link href="/" className="font-display font-bold text-2xl tracking-tighter hover:text-[var(--accent-blue)] transition-colors">
                Swastika<span className="text-[var(--accent-blue)]">.</span>
            </Link>

            <div className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-xl px-2 py-1.5 rounded-full border border-white/10 shadow-lg shadow-black/20">
                {[
                    { name: 'Speakers', href: '#speakers' },
                    { name: 'Agenda', href: '#agenda' },
                    { name: 'Venue', href: '#venue' },
                    { name: 'Contact', href: '#contact' }
                ].map((link, i) => (
                    <a key={i} href={link.href} className="px-5 py-2 rounded-full text-sm font-medium hover:bg-white/10 hover:text-white text-[var(--text-secondary)] transition-all">
                        {link.name}
                    </a>
                ))}
            </div>

            <button className="group bg-white text-black pl-5 pr-2 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                Get Ticket
                <div className="bg-black group-hover:bg-[var(--accent-blue)] transition-colors rounded-full p-1.5 text-white">
                    <ArrowUpRight size={14} />
                </div>
            </button>
        </nav>
    );
}
