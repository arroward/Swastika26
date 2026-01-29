"use client";

import Link from "next/link";
import { ArrowRight, Ticket } from "lucide-react";

export default function PassSection() {
    return (
        // Changed: Removed min-h-screen on mobile (min-h-0) and set pb-0
        <section className="relative min-h-0 md:min-h-screen pt-10 pb-0 md:py-24 w-full bg-black text-white overflow-hidden flex items-start md:items-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 md:w-80 md:h-80 bg-red-600/10 blur-[80px] md:blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Changed: gap-6 for even tighter mobile layout */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12 lg:gap-20">

                    {/* Left Content */}
                    <div className="flex-1 text-center md:text-left space-y-4 md:space-y-8">
                        <div className="space-y-1">
                            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-cinzel font-black leading-tight md:leading-[0.9] tracking-tighter">
                                SECURE YOUR <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-600 to-red-900">
                                    ENTRY PASS
                                </span>
                            </h2>
                        </div>

                        <p className="text-xs md:text-lg text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed font-light px-4 md:px-0">
                            Experience the most electrifying nights of Swastika. Secure your spot for the ultimate musical journey.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center md:justify-start">
                            <Link
                                href="/pass"
                                className="w-full sm:w-auto bg-white text-black font-bold py-3 px-8 text-sm md:text-base flex items-center justify-center gap-2 rounded-full active:scale-95 transition-transform"
                            >
                                Get Tickets
                                <ArrowRight size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Right Visual / Card */}
                    {/* Changed: Removed pb-10 and ensured no bottom margin/padding */}
                    <div className="flex-1 w-full max-w-[220px] sm:max-w-sm relative group mb-0">
                        <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 opacity-20 blur-lg rounded-3xl" />

                        <Link href="/pass" className="block">
                            <div className="glass-panel p-4 md:p-8 rounded-2xl relative overflow-hidden flex flex-col items-center text-center space-y-3 md:space-y-5 border border-white/10 bg-white/5 backdrop-blur-sm">
                                
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" />

                                <div className="p-3 md:p-4 rounded-full bg-red-600/10 text-red-500 ring-1 ring-red-500/20">
                                    <Ticket className="w-8 h-8 md:w-12 md:h-12" strokeWidth={1} />
                                </div>

                                <h3 className="text-xl md:text-3xl font-cinzel font-bold text-white tracking-tight">Proshow Access</h3>

                                <div className="w-full h-px bg-white/10" />

                                <div className="grid grid-cols-2 gap-3 w-full">
                                    <div className="text-center p-2 md:p-3 rounded-xl bg-white/5 border border-white/5">
                                        <div className="text-xl md:text-3xl font-black text-white font-cinzel">02</div>
                                        <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-red-500 font-bold">Nights</div>
                                    </div>
                                    <div className="text-center p-2 md:p-3 rounded-xl bg-white/5 border border-white/5">
                                        <div className="text-xl md:text-3xl font-black text-white font-cinzel">ALL</div>
                                        <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-red-500 font-bold">Access</div>
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