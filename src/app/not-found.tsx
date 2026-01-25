'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [glitchText, setGlitchText] = useState('404');

    // Mouse follower effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Random glitch effect
    useEffect(() => {
        const chars = '014XYZ!?#%';
        const interval = setInterval(() => {
            if (Math.random() > 0.9) {
                const r1 = chars[Math.floor(Math.random() * chars.length)];
                const r2 = chars[Math.floor(Math.random() * chars.length)];
                const r3 = chars[Math.floor(Math.random() * chars.length)];
                setGlitchText(`${r1}${r2}${r3}`);
                setTimeout(() => setGlitchText('404'), 100);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center overflow-hidden selection:bg-red-500/30">

            {/* Background Grid & Noise */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-100 contrast-150" />
            </div>

            {/* Spotlight Effect */}
            <motion.div
                className="absolute w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
                animate={{
                    x: mousePosition.x - 400,
                    y: mousePosition.y - 400,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 50, mass: 0.1 }}
            />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl mx-auto">

                {/* Glitchy 404 Header */}
                <div className="relative mb-6 md:mb-10 group">
                    <h1 className="text-[150px] md:text-[250px] leading-none font-black font-syne tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/80 to-white/10 select-none relative z-10">
                        {glitchText}
                    </h1>
                    {/* Shadow/Clone for Depth */}
                    <h1 className="absolute inset-0 text-[150px] md:text-[250px] leading-none font-black font-syne tracking-tighter text-red-600/20 blur-sm select-none z-0 ml-2 mt-2">
                        404
                    </h1>

                    {/* Floating Decorative Elements */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-10 -right-10 w-24 h-24 md:w-32 md:h-32 border border-red-500/20 rounded-full border-dashed"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-5 -left-5 w-16 h-16 md:w-24 md:h-24 border border-white/10 rounded-full border-dotted"
                    />
                </div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-6 max-w-lg"
                >
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[10px] md:text-xs font-mono text-red-400 uppercase tracking-widest">SECTOR UNCHARTED</span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white tracking-wide">
                            THE ORACLE IS SILENT HERE
                        </h2>
                        <p className="text-white/50 font-jost text-sm md:text-base leading-relaxed">
                            Even the mightiest warriors drift into the void. This realm is barren, lost to the sands of time and digital static. Realign your spark and return to the arena.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-4">
                        <Link href="/" className="group relative w-full md:w-auto">
                            <div className="absolute inset-0 bg-red-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity" />
                            <div className="relative flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white px-8 py-3.5 rounded-lg font-syne font-bold uppercase tracking-wide transition-all duration-300 transform group-hover:-translate-y-1">
                                <ArrowLeft size={18} />
                                <span>RETREAT TO SPARTA</span>
                            </div>
                        </Link>

                        <button
                            onClick={() => window.location.reload()}
                            className="group flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 text-white/70 hover:text-white font-syne font-bold uppercase tracking-wide transition-all duration-300 w-full md:w-auto"
                        >
                            <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                            <span>REALIGN SPARK</span>
                        </button>
                    </div>
                </motion.div>

            </div>

            {/* Footer Ticker */}
            <div className="absolute bottom-6 w-full overflow-hidden opacity-30 pointer-events-none select-none">
                <motion.div
                    className="flex whitespace-nowrap"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                >
                    {[...Array(20)].map((_, i) => (
                        <span key={i} className="text-[10px] md:text-xs font-mono mx-4 text-red-500/50">
                            :: SPARTAN_LEGACY :: TRANSFORM_AND_ROLL_OUT :: THE_ARENA_AWAITS :: NO_ENERGON_HERE :: GLORY_CALLS ::
                        </span>
                    ))}
                </motion.div>
            </div>
        </main>
    );
}

// Add strict Tailwind animation keyframes if needed in global.css, but standard classes usually suffice.
// For custom marquee, we might rely on Framer Motion or simple standard CSS if configured.
