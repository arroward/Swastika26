import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
            <div className="pointer-events-auto font-display font-bold text-2xl tracking-tighter mix-blend-difference">swastika<span className="text-[var(--accent-main)]">.</span>live</div>
            <div className="pointer-events-auto w-12 md:w-16 opacity-80 hover:opacity-100 transition-opacity">
                <img src="/logo/WH_LOGO.svg" alt="Swastika Logo" className="w-full h-auto object-contain" />
            </div>
        </nav>
    );
}
