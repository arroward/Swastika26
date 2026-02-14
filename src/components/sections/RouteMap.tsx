'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const COLLEGE_NAME = "Mar Baselios Christian College of Engineering and Technology";
const COLLEGE_LOCATION = "Kuttikkanam, Peermade, Kerala 685531";
const GOOGLE_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3934.8!2d76.9935!3d9.5735!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07c8d8e5f1a4c5%3A0x8e3c2a1b7d5e9f0a!2sMar%20Baselios%20Christian%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1700000000000";
const GOOGLE_MAPS_DIRECTION_URL = "https://www.google.com/maps/dir/?api=1&destination=Mar+Baselios+Christian+College+of+Engineering+and+Technology+Kuttikkanam+Peermade+Kerala";

const nearbyLandmarks = [
    { name: "Kochi Airport (COK)", distance: "130 km", time: "~3.5 hrs" },
    { name: "Kottayam Railway Stn", distance: "75 km", time: "~2 hrs" },
    { name: "Thekkady (Periyar)", distance: "50 km", time: "~1.5 hrs" },
    { name: "Munnar", distance: "90 km", time: "~3 hrs" },
];

export default function RouteMap() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 md:py-28 overflow-hidden bg-gradient-to-b from-black via-red-950/5 to-black"
        >
            {/* Decorative background elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
                <div className="absolute top-1/3 -left-32 w-64 h-64 bg-red-600/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-red-800/5 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-14"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-10 h-px bg-gradient-to-r from-transparent to-red-500/60"></span>
                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-400/80">Find Us</span>
                        <span className="w-10 h-px bg-gradient-to-l from-transparent to-red-500/60"></span>
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-white tracking-tight">
                        Route Map
                    </h2>
                    <p className="mt-3 text-white/40 text-sm md:text-base max-w-lg mx-auto">
                        Navigate your way to {COLLEGE_NAME}, nestled in the scenic hills of Peermade.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Map Embed */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-red-500/15 shadow-2xl group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 to-black/40 z-10 pointer-events-none group-hover:opacity-0 transition-opacity duration-500"></div>
                        <iframe
                            src={GOOGLE_MAPS_EMBED_URL}
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '400px' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="College Location Map"
                            className="w-full h-full"
                        ></iframe>
                        {/* Glow line at top */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent z-20"></div>
                    </motion.div>

                    {/* Info Panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.35 }}
                        className="flex flex-col gap-5"
                    >
                        {/* Venue Card */}
                        <div className="rounded-2xl border border-red-500/15 bg-gradient-to-br from-red-950/30 via-black/60 to-black/80 backdrop-blur-xl p-6 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/20 flex items-center justify-center shrink-0">
                                    <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">{COLLEGE_NAME}</h3>
                                    <p className="text-white/40 text-xs mt-0.5">{COLLEGE_LOCATION}</p>
                                </div>
                            </div>

                            <a
                                href={GOOGLE_MAPS_DIRECTION_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-600/20 border border-red-500/50"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                Get Directions
                            </a>
                        </div>

                        {/* Nearby Landmarks */}
                        <div className="rounded-2xl border border-red-500/15 bg-gradient-to-br from-red-950/20 via-black/60 to-black/80 backdrop-blur-xl p-6 flex-1">
                            <h4 className="text-xs font-mono tracking-[0.2em] uppercase text-red-400/70 mb-4">Nearby Landmarks</h4>
                            <div className="space-y-3">
                                {nearbyLandmarks.map((landmark, i) => (
                                    <motion.div
                                        key={landmark.name}
                                        initial={{ opacity: 0, x: 15 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                                        className="flex items-center justify-between py-2 border-b border-white/5 last:border-b-0"
                                    >
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                                            <span className="text-white/70 text-sm">{landmark.name}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-white/50 text-xs font-mono">{landmark.distance}</span>
                                            <span className="text-white/30 text-[10px] ml-1.5">{landmark.time}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
