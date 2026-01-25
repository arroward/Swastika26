'use client';

import Link from 'next/link';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, ArrowUpRight } from 'lucide-react';

import { footerContent } from '@/data/content';

export default function Footer() {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const tickerRef = useRef<HTMLDivElement>(null);

    // Refs for quick setters (Mouse Follow)
    const xTo = useRef<((value: number) => void) | null>(null);
    const yTo = useRef<((value: number) => void) | null>(null);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger);

        if (glowRef.current) {
            // Setup QuickTo for performant mouse following
            xTo.current = gsap.quickTo(glowRef.current, "x", { duration: 0.8, ease: "power3" });
            yTo.current = gsap.quickTo(glowRef.current, "y", { duration: 0.8, ease: "power3" });
        }

        // Staggered Entrance Animation
        const elements = contentRef.current?.querySelectorAll('.animate-item');
        if (elements) {
            gsap.fromTo(elements,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%", // Start when top of footer hits 80% viewport height
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }

        // Ticker Animation
        if (tickerRef.current) {
            gsap.to(tickerRef.current, {
                xPercent: -50,
                duration: 25,
                ease: "none",
                repeat: -1
            });
        }

    }, { scope: containerRef });

    const handleMouseMove = ({ clientX, clientY }: React.MouseEvent) => {
        if (!xTo.current || !yTo.current || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        // Calculate relative position within the footer
        const x = clientX - rect.left;
        const y = clientY - rect.top;

        xTo.current(x);
        yTo.current(y);
    };

    return (
        <footer
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative bg-[#050505] text-white w-full min-h-[calc(100dvh-5rem)] md:min-h-[calc(100dvh-6rem)] lg:min-h-[calc(100dvh-8rem)] flex flex-col justify-between overflow-hidden py-[4vh] md:py-[6vh]"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none transform-gpu">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />

                {/* Glow Following Mouse */}
                <div
                    ref={glowRef}
                    className="absolute w-[800px] h-[800px] pointer-events-none will-change-transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                        background: "radial-gradient(circle closest-side, rgba(220,38,38,0.25), transparent)",
                        left: 0,
                        top: 0
                    }}
                />
            </div>

            <div
                ref={contentRef}
                className="relative z-10 container mx-auto px-[4vw] h-full flex flex-col justify-between"
            >
                {/* Upper Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-[4vh] lg:gap-[5vw]">

                    {/* Brand / Title */}
                    <div className="lg:col-span-8 flex flex-col justify-center space-y-[4vh]">
                        <h1 className="animate-item text-[10vw] md:text-[8vw] leading-[0.8] font-bold font-cinzel tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/20 will-change-transform">
                            {footerContent.brandTitle}
                            <span className="block text-[3vw] font-jost font-light tracking-[0.2em] text-white/40 mt-[2vh]">
                                {footerContent.edition}
                            </span>
                        </h1>
                    </div>

                    {/* Navigation & Info */}
                    <div className="lg:col-span-4 flex flex-col justify-between gap-[4vh] pt-[1vh]">
                        <div className="animate-item space-y-[2vh]">
                            <h3 className="font-jost text-sm uppercase tracking-[0.2em] text-red-500 font-semibold">Menu</h3>
                            <nav className="flex flex-col gap-[1vh]">
                                {footerContent.navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="group flex items-center gap-2 text-[clamp(1.2rem,2vw,2rem)] font-jost font-light text-white/70 hover:text-white transition-colors w-fit"
                                    >
                                        <ArrowUpRight className="w-[1em] h-[1em] opacity-0 -ml-[1em] group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-red-500" />
                                        {link.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>

                        <div className="animate-item space-y-[2vh]">
                            <h3 className="font-jost text-sm uppercase tracking-[0.2em] text-red-500 font-semibold">Connect</h3>

                            {/* Email Link */}
                            <a
                                href={`mailto:${footerContent.email}`}
                                className="group flex items-center gap-[1.5vw] p-[2vh] border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500 hover:border-red-500/30 w-full mb-[1vh]"
                            >
                                <div className="p-2 rounded-full bg-white/10 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 font-jost uppercase tracking-wider mb-1">Email us</p>
                                    <p className="text-[clamp(0.9rem,1.2vw,1.2rem)] text-white font-mono group-hover:text-red-100 transition-colors uppercase">{footerContent.email}</p>
                                </div>
                            </a>

                            <a
                                href={footerContent.social.instagram.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-[1.5vw] p-[2vh] border border-white/10 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-500 hover:border-red-500/30 w-full md:w-auto"
                            >
                                <div className="p-[1vh] rounded-full bg-white/10 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
                                    <Instagram size={24} />
                                </div>
                                <div>
                                    <p className="text-xs text-white/40 font-jost uppercase tracking-wider mb-1">Follow us on</p>
                                    <p className="text-[clamp(1rem,1.5vw,1.5rem)] text-white font-cinzel font-bold group-hover:text-red-100 transition-colors">{footerContent.social.instagram.handle}</p>
                                </div>
                                <ArrowUpRight className="ml-auto w-6 h-6 text-white/30 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="animate-item relative mt-[6vh] py-[3vh] border-t border-white/10 flex items-center justify-center text-xs md:text-sm font-jost text-white/30 uppercase tracking-widest overflow-hidden">
                    <div className="absolute inset-0 flex items-center w-full overflow-hidden pointer-events-none opacity-20 select-none">
                        <div
                            ref={tickerRef}
                            className="whitespace-nowrap flex will-change-transform"
                        >
                            {[...Array(10)].map((_, i) => (
                                <span key={i} className="text-[8vh] md:text-[10vh] font-black font-cinzel leading-none px-[2vw] text-white/5">
                                    {footerContent.tickerText}
                                </span>
                            ))}
                        </div>
                    </div>

                    <p className="group relative z-10">
                        Crafted by <Link href="/credits" className="text-white/60 group-hover:text-red-500 transition-colors cursor-pointer">{footerContent.credits}</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}
