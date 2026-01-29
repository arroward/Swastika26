"use client";

import Link from "next/link";
import { ArrowRight, Ticket, Globe } from "lucide-react";

export default function PassSection() {
    return (
        <section className="relative py-16 md:py-24 w-full bg-black text-white overflow-hidden flex items-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-red-600/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none mix-blend-screen" />
            <div className="absolute bottom-0 left-0 w-64 h-64 md:w-80 md:h-80 bg-white/5 blur-[60px] md:blur-[80px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 lg:gap-20">

                    {/* Left Content */}
                    <div className="flex-1 text-center md:text-left space-y-3 md:space-y-8">
                        <div className="space-y-2">
                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-cinzel font-black leading-[0.9] tracking-tighter">
                                SECURE YOUR <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-900 drop-shadow-md">
                                    ENTRY PASS
                                </span>
                            </h2>
                        </div>

                        <p className="text-sm md:text-lg text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed font-light px-2 md:px-0">
                            Experience the most electrifying nights of Swastika. Whether you&apos;re a student or visiting from outside, secure your spot for the ultimate musical journey.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-5 pt-2 justify-center md:justify-start">
                            <Link
                                href="/pass"
                                className="w-full sm:w-auto btn-primary py-4 px-10 text-base flex items-center justify-center gap-2 hover:gap-3 transition-all active:scale-95"
                            >
                                Get Tickets
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </div>

                    {/* Right Visual / Card */}
                    <div className="flex-1 w-full max-w-[280px] sm:max-w-sm relative group perspective-1000">
                        {/* Decorative Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-700 rounded-3xl" />

                        <Link href="/pass" className="block">
                            <div className="glass-panel p-6 md:p-8 rounded-2xl relative overflow-hidden flex flex-col items-center text-center space-y-5 transform transition-all duration-500 hover:scale-[1.02] cursor-pointer border border-white/10 hover:border-red-500/30">

                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />

                                <div className="p-4 rounded-full bg-red-600/10 text-red-500 ring-1 ring-red-500/20 shadow-[0_0_40px_-10px_rgba(220,38,38,0.4)]">
                                    <Ticket className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1} />
                                </div>

                                <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-white tracking-tight">Proshow Access</h3>

                                <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                <div className="grid grid-cols-2 gap-4 w-full">
                                    <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                                        <div className="text-2xl md:text-3xl font-black text-white font-cinzel">02</div>
                                        <div className="text-[10px] uppercase tracking-widest text-red-500 font-bold mt-1">Nights</div>
                                    </div>
                                    <div className="text-center p-3 rounded-xl bg-white/5 border border-white/5">
                                        <div className="text-2xl md:text-3xl font-black text-white font-cinzel">ALL</div>
                                        <div className="text-[10px] uppercase tracking-widest text-red-500 font-bold mt-1">Access</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}