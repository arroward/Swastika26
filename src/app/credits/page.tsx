'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Github, Linkedin, Twitter, Code2, Terminal, Cpu, Globe, Zap } from 'lucide-react';

const developers = [
    {
        id: 1,
        name: "CYBER_ARCHITECT",
        realName: "Lead Developer",
        role: "System Architecture",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop",
        github: "#",
        linkedin: "#",
        stats: { coding: 98, caffeine: 100, sanity: 45 }
    },
    {
        id: 2,
        name: "PIXEL_WEAVER",
        realName: "UI/UX Designer",
        role: "Visual Interface",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop",
        github: "#",
        linkedin: "#",
        stats: { coding: 75, caffeine: 60, sanity: 90 }
    },
    {
        id: 3,
        name: "LOGIC_CORE",
        realName: "Backend Dev",
        role: "Server Operations",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop",
        github: "#",
        linkedin: "#",
        stats: { coding: 95, caffeine: 85, sanity: 60 }
    },
    {
        id: 4,
        name: "BUG_HUNTER",
        realName: "QA Specialist",
        role: "Quality Assurance",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=500&fit=crop",
        github: "#",
        linkedin: "#",
        stats: { coding: 80, caffeine: 65, sanity: 70 }
    },
    {
        id: 5,
        name: "VOID_WALKER",
        realName: "Full Stack",
        role: "Integration Lead",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop",
        github: "#",
        linkedin: "#",
        stats: { coding: 92, caffeine: 95, sanity: 40 }
    },
];

export default function CreditsPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden selection:bg-red-500/30">
            {/* Ambient System Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.05),transparent_70%)]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-100 contrast-150" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent animate-scan" />
            </div>

            {/* Navigation Header */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference">
                <Link href="/" className="group flex items-center gap-3 text-white/50 hover:text-red-500 transition-colors">
                    <div className="relative p-2 border border-current rounded-full overflow-hidden">
                        <ArrowLeft size={16} className="relative z-10 group-hover:-translate-x-1 transition-transform" />
                        <div className="absolute inset-0 bg-current opacity-10 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="font-mono text-xs tracking-[0.2em] uppercase hidden md:block">Abort Mission</span>
                </Link>

                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-mono text-xs text-red-500 uppercase tracking-widest">System Override: Active</span>
                </div>
            </nav>

            <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
                {/* Header Section */}
                <header className="mb-24 text-center relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-9xl font-black font-syne tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
                            THE <span className="text-red-600">CREATORS</span>
                        </h1>
                        <p className="font-mono text-red-400/60 uppercase tracking-widest text-sm md:text-base max-w-xl mx-auto border-y border-red-500/10 py-4">
                            // Architects of the digital revolution. <br className="md:hidden" /> Authorized Personnel Only.
                        </p>
                    </motion.div>
                </header>

                {/* Developer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto [perspective:1000px]">
                    {developers.map((dev, index) => (
                        <DeveloperCard key={dev.id} dev={dev} index={index} />
                    ))}

                    {/* Join Us Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                        className="group relative h-[450px] border border-dashed border-white/20 rounded-xl flex flex-col items-center justify-center p-6 text-center hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300 cursor-pointer"
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Zap size={32} className="text-white/30 group-hover:text-red-500 transition-colors" />
                        </div>
                        <h3 className="font-syne font-bold text-2xl text-white mb-2">YOU?</h3>
                        <p className="font-mono text-xs text-white/50 max-w-[200px]">
                            We are always looking for new anomalies. Join the collective.
                        </p>
                    </motion.div>
                </div>

                {/* Footer Info */}
                <footer className="mt-32 text-center border-t border-white/10 pt-12">
                    <div className="inline-flex items-center gap-6 px-6 py-3 rounded-full border border-white/5 bg-white/5 backdrop-blur-md">
                        <Terminal size={14} className="text-red-500" />
                        <span className="font-mono text-xs text-white/40 uppercase tracking-widest">
                            Build v2.6.0 • Crafted with Next.js & Framer Motion
                        </span>
                    </div>
                </footer>
            </div>
        </main>
    );
}

function DeveloperCard({ dev, index }: { dev: any, index: number }) {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useTransform(y, [-100, 100], [30, -30]);
    const rotateY = useTransform(x, [-100, 100], [-30, 30]);

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const rect = event.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct * 200);
        y.set(yPct * 200);
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{
                rotateX: useSpring(rotateX),
                rotateY: useSpring(rotateY),
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative h-[450px] w-full rounded-xl bg-[#0a0a0a] border border-white/10 group overflow-hidden"
        >
            {/* Holographic Overlay on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/5 to-transparent" style={{ transform: "translateZ(50px)" }} />

            {/* Image Container with Glitch Effect */}
            <div className="absolute inset-0 h-full w-full overflow-hidden">
                <div className="relative h-full w-full group-hover:scale-110 transition-transform duration-700">
                    <Image
                        src={dev.image}
                        alt={dev.name}
                        fill
                        className="object-cover opacity-60 group-hover:opacity-40 transition-opacity grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                </div>
            </div>

            {/* Content Content (Floating) */}
            <div className="absolute inset-x-0 bottom-0 p-6 z-30 flex flex-col justify-end h-full" style={{ transform: "translateZ(60px)" }}>
                {/* ID Badge */}
                <div className="flex justify-between items-start mb-auto pt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                    <Cpu className="text-red-500 animate-pulse" size={20} />
                    <span className="font-mono text-[10px] text-red-500 border border-red-500 px-1">ID: 00{dev.id}</span>
                </div>

                <div className="space-y-1">
                    <h2 className="text-3xl font-black font-syne text-white uppercase leading-none tracking-tight group-hover:text-red-500 transition-colors">
                        {dev.name}
                    </h2>
                    <p className="font-mono text-xs text-white/50 uppercase tracking-widest">{dev.role}</p>
                    <p className="text-white font-bold text-lg pt-2 opacity-100 group-hover:opacity-0 transition-opacity absolute bottom-6">{dev.realName}</p>
                </div>

                {/* Stats Panel (Reveals on Hover) */}
                <div className="mt-6 space-y-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-10 group-hover:translate-y-0 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/10">
                    <StatBar label="CODE_EFFICIENCY" value={dev.stats.coding} />
                    <StatBar label="CAFFEINE_LEVEL" value={dev.stats.caffeine} />

                    <div className="flex gap-4 mt-4 pt-4 border-t border-white/10 justify-center">
                        <SocialLink href={dev.github} icon={Github} />
                        <SocialLink href={dev.linkedin} icon={Linkedin} />
                        <SocialLink href="#" icon={Globe} />
                    </div>
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-4 left-4 w-2 h-2 border-t border-l border-white/30 group-hover:border-red-500 transition-colors z-40" />
            <div className="absolute bottom-4 right-4 w-2 h-2 border-b border-r border-white/30 group-hover:border-red-500 transition-colors z-40" />
        </motion.div>
    );
}

function StatBar({ label, value }: { label: string, value: number }) {
    return (
        <div className="flex items-center gap-2">
            <span className="font-mono text-[8px] text-white/40 w-24">{label}</span>
            <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-red-600 to-red-400"
                />
            </div>
        </div>
    );
}

function SocialLink({ href, icon: Icon }: { href: string, icon: any }) {
    return (
        <a href={href} className="text-white/40 hover:text-white hover:scale-110 transition-all duration-300">
            <Icon size={18} />
        </a>
    );
}
