'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import VariableProximity from '@/components/VariableProximity';

export default function CTA() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, margin: "-100px" });

    return (
        <section ref={containerRef} className="relative py-32 flex items-center justify-center overflow-hidden">

            <div className="container mx-auto px-4 z-10 text-center relative">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <h2 className="text-5xl md:text-6xl lg:text-8xl font-black font-syne text-white tracking-tighter mix-blend-difference cursor-default flex flex-col items-center">
                        <div className="mb-4">
                            <VariableProximity label="DON'T MISS OUT" className="font-syne" fromFontVariationSettings="'wght' 400" toFontVariationSettings="'wght' 900" radius={200} />
                        </div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 text-center">BE PART OF SWASTIKA</span>
                    </h2>

                    <p className="max-w-xl mx-auto text-xl text-white/70 font-display font-light">
                        Join 5000+ students, 60+ events, and experience the future of culture and technology.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                        <button className="group relative px-12 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-transform">
                            <span className="relative z-10 font-syne uppercase tracking-wider">Register Now</span>
                            <div className="absolute inset-0 bg-accent-main transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out -z-0" />
                            <span className="absolute inset-0 flex items-center justify-center text-white z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-syne uppercase tracking-wider">
                                Let's Go
                            </span>
                        </button>

                        <button className="px-12 py-4 border border-white/20 text-white font-bold text-lg rounded-full hover:bg-white/5 transition-colors font-syne uppercase tracking-wider">
                            Download Brochure
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
