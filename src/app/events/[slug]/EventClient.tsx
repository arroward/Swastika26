'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function EventClient({ event }: { event: any }) {
    const container = useRef(null);

    useGSAP(() => {
        // Title Reveal
        gsap.from('.event-title', {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: 'power4.out',
            delay: 0.2
        });

        gsap.from('.event-meta', {
            y: 50,
            opacity: 0,
            duration: 1.5,
            ease: 'power3.out',
            delay: 0.5
        });

        // Content Reveal
        gsap.utils.toArray('.content-section').forEach((section: any) => {
            gsap.from(section, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                }
            });
        });

        // Line drawing animation
        gsap.utils.toArray('.anim-line').forEach((line: any) => {
            gsap.fromTo(line,
                { scaleX: 0, transformOrigin: "left" },
                {
                    scaleX: 1,
                    duration: 1.5,
                    ease: "expo.out",
                    scrollTrigger: {
                        trigger: line,
                        start: "top 85%"
                    }
                }
            );
        });

    }, { scope: container });

    return (
        <main ref={container} className="bg-[var(--bg-main)] min-h-screen text-[var(--text-primary)] w-full overflow-x-hidden">
            {/* Navigation / Back Button */}
            <nav className="fixed top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between mix-blend-difference">
                <Link href="/" className="text-xs md:text-sm uppercase tracking-widest hover:text-[var(--accent-gold)] transition-colors flex items-center gap-2">
                    <span className="text-xl">←</span> Back
                </Link>
                <div className="text-xs md:text-sm font-bold uppercase tracking-widest opacity-80">{event.category}</div>
            </nav>

            {/* Hero */}
            <header className="relative h-screen flex flex-col justify-end pb-24 px-6 md:px-24 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                    <div className="absolute inset-0 bg-black/40 z-10" />
                    {/* Fallback image or actual if available */}
                    {event.image && <img src={event.image} alt={event.title} className="w-full h-full object-cover grayscale opacity-60" />}
                </div>

                <div className="relative z-20 w-full">
                    <div className="overflow-hidden mb-6">
                        <h1 className="event-title text-[10vw] md:text-[8vw] leading-[0.85] font-display font-bold uppercase text-white break-words">
                            {event.title}
                        </h1>
                    </div>

                    <div className="event-meta flex flex-wrap gap-8 md:gap-16 items-start md:items-end border-t border-[var(--accent-red-real)] pt-8 w-full max-w-4xl">
                        <div className="flex-1 min-w-[150px]">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#888] mb-2">Protocol Date</span>
                            <span className="text-xl md:text-3xl font-body font-light">{event.date}</span>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#888] mb-2">Sector</span>
                            <span className="text-xl md:text-3xl font-body font-light">{event.venue}</span>
                        </div>
                        <div className="flex-1 min-w-[150px]">
                            <span className="block text-[10px] uppercase tracking-[0.2em] text-[#888] mb-2">T-Minus</span>
                            <span className="text-xl md:text-3xl font-body font-light">{event.time}</span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <div className="max-w-6xl mx-auto px-6 py-24 md:py-32">

                <div className="content-section mb-32 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-3">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[var(--accent-gold)]"></span>
                            Briefing
                        </h2>
                    </div>
                    <div className="md:col-span-9">
                        <div className="anim-line h-[1px] w-full bg-white/10 mb-8" />
                        <p className="text-xl md:text-4xl font-light leading-relaxed text-[var(--text-secondary)]">
                            {event.description}
                        </p>
                    </div>
                </div>

                <div className="content-section mb-32 grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-3">
                        <h2 className="text-xs uppercase tracking-[0.3em] text-[var(--accent-gold)] flex items-center gap-4">
                            <span className="w-8 h-[1px] bg-[var(--accent-gold)]"></span>
                            Protocols
                        </h2>
                    </div>
                    <div className="md:col-span-9">
                        <div className="anim-line h-[1px] w-full bg-white/10 mb-8" />
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                            {event.rules.map((rule: string, i: number) => (
                                <li key={i} className="flex gap-6 items-baseline text-lg text-[#ccc] group">
                                    <span className="text-[var(--accent-red-real)] font-mono text-sm group-hover:translate-x-1 transition-transform">0{i + 1}/</span>
                                    <span className="font-light">{rule}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="content-section text-center pt-12 border-t border-white/5">
                    <button className="relative overflow-hidden px-16 py-6 bg-[var(--text-primary)] text-black font-bold uppercase tracking-widest hover:bg-[var(--accent-gold)] transition-colors duration-500">
                        Initiate Registration
                    </button>
                </div>
            </div>
        </main>
    );
}
