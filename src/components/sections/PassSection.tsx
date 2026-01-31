"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, Ticket, Sparkles, Calendar, Music } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PassSection() {
    const container = useRef<HTMLElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(".pass-badge", { y: -20, opacity: 0, duration: 0.6, ease: "back.out(1.7)" })
            .from(".pass-title", { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
            .from(".pass-desc", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
            .from(".pass-feature", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "-=0.6")
            .from(".pass-cta", { scale: 0.9, opacity: 0, duration: 0.6, ease: "back.out(1.7)" }, "-=0.4")
            .from(".pass-card", { x: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8");
    }, { scope: container });

    return (
        <section ref={container} className="w-full relative h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] flex items-center justify-center overflow-hidden bg-[#050505] panel snap-start snap-always">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.15),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(153,27,27,0.12),transparent_50%)]" />

            {/* Animated Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

            {/* Floating Particles */}
            <div className="absolute top-20 left-[10%] w-2 h-2 bg-red-500/40 rounded-full animate-pulse" />
            <div className="absolute top-40 right-[15%] w-1.5 h-1.5 bg-red-400/30 rounded-full animate-pulse delay-300" />
            <div className="absolute bottom-32 left-[20%] w-2.5 h-2.5 bg-red-600/20 rounded-full animate-pulse delay-700" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 max-w-6xl mx-auto">

                    {/* Content */}
                    <div className="space-y-6 text-center md:text-left w-full md:w-1/2">
                        
                        {/* Heading */}
                        <h2 className="pass-title font-cinzel font-black text-3xl sm:text-4xl md:text-5xl leading-[0.95] tracking-tight">
                            UNLOCK THE
                            <br />
                            <span className="relative inline-block mt-1">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-800">
                                    EXPERIENCE
                                </span>
                                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-red-600 via-red-500 to-transparent rounded-full" />
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="pass-desc text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg mx-auto md:mx-0">
                            Join for two unforgettable nights of music, energy, and pure celebration at Swastika 2026.
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center md:justify-start">
                            <div className="pass-feature flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                <Calendar className="w-3.5 h-3.5 text-red-500" />
                                <span className="text-xs font-medium">2 Days</span>
                            </div>
                            <div className="pass-feature flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                <Music className="w-3.5 h-3.5 text-red-500" />
                                <span className="text-xs font-medium">All Access</span>
                            </div>
                        </div>

                        {/* CTA Button */}
                        <div className="pass-cta flex justify-center md:justify-start pt-2">
                            <Link
                                href="/pass"
                                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-700 font-bold text-sm overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:scale-105 active:scale-95"
                            >
                                <span className="relative z-10">Get Your Pass</span>
                                <ArrowRight className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-1" />
                                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </div>
                    </div>

                    {/* Ticket Card */}
                    <div className="pass-card flex justify-center items-center w-full md:w-1/2">
                        <div className="relative group">
                            {/* Glow Effect */}
                            <div className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-red-600 via-red-500 to-red-700 rounded-3xl opacity-30 blur-xl group-hover:opacity-50 transition-opacity duration-500" />

                            {/* Card */}
                            <Link href="/pass" className="relative block">
                                <div className="relative w-[260px] sm:w-[280px] bg-gradient-to-br from-zinc-900 via-black to-zinc-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105 hover:rotate-1">
                                    {/* Top Accent */}
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

                                    {/* Shimmer Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    <div className="relative p-5 space-y-3.5">
                                        {/* Icon */}
                                        <div className="flex justify-center">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-red-600/20 blur-lg rounded-full" />
                                                <div className="relative p-3 rounded-xl bg-gradient-to-br from-red-950/50 to-red-900/30 border border-red-500/30">
                                                    <Ticket className="w-10 h-10 text-red-500" strokeWidth={1.5} />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <div className="text-center space-y-0.5">
                                            <h3 className="font-cinzel font-bold text-2xl tracking-tight">
                                                Proshow Pass
                                            </h3>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-widest">Swastika 2026</p>
                                        </div>

                                        {/* Divider */}
                                        <div className="relative h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                        {/* Info Grid */}
                                        <div className="grid grid-cols-1 gap-2.5">
                                            <div className="relative group/card">
                                                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity" />
                                                <div className="relative p-2.5 rounded-xl bg-white/5 border border-white/10 text-center space-y-0.5 transition-transform hover:scale-105">
                                                    <div className="font-cinzel font-black text-2xl sm:text-3xl">02</div>
                                                    <div className="text-[9px] tracking-[0.2em] uppercase text-red-500 font-bold">Nights</div>
                                                </div>
                                            </div>


                                        </div>

                                        
                                    </div>

                                    {/* Bottom Accent */}
                                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
                                </div>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}