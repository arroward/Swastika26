'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Globe, Code2, Terminal, Cpu, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { developers } from '@/data/content';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';

gsap.registerPlugin(ScrollTrigger);

// --- Types ---
interface Developer {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
    tech: string[];
    socials: {
        github?: string;
        linkedin?: string;
        portfolio?: string;
    };
}

export default function CreditsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLDivElement>(null);

    // Logging for Credits Page
    useEffect(() => {
        const logCreditsVisit = async () => {
            const sessionKey = 'credits_visited_logged';
            // Check if already logged in this session
            if (typeof window !== 'undefined' && sessionStorage.getItem(sessionKey)) return;

            try {
                // Ensure auth
                if (auth) {
                    try {
                        await signInAnonymously(auth);
                    } catch (authError: any) {
                        if (authError?.code !== 'auth/configuration-not-found') {
                            console.error("Auth Error:", authError);
                        }
                    }
                }

                if (db) {
                    await addDoc(collection(db, 'credits_visitors'), {
                        timestamp: serverTimestamp(),
                        userAgent: navigator.userAgent,
                        platform: navigator.platform, // Provides basic OS info
                        screenResolution: `${window.innerWidth}x${window.innerHeight}`,
                        referrer: document.referrer || 'direct',
                    });
                    sessionStorage.setItem(sessionKey, 'true');
                }
            } catch (error) {
                console.error("Failed to log credits visit:", error);
            }
        };

        logCreditsVisit();
    }, []);

    // Mouse movement for custom interactions
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;

        // Move generic cursor follower
        if (cursorRef.current) {
            gsap.to(cursorRef.current, {
                x: clientX,
                y: clientY,
                duration: 0.1,
                ease: "power2.out"
            });
        }
    };

    useGSAP(() => {
        // 1. Initial Reveal - Chaotic to Order
        const tl = gsap.timeline();

        // Background Grid Animation
        tl.fromTo(".bg-grid-line",
            { scaleY: 0, opacity: 0 },
            { scaleY: 1, opacity: 0.2, duration: 1.5, stagger: 0.1, ease: "expo.inOut" }
            , 0);

        // Hero Text - Split & Stagger
        tl.fromTo(".hero-char", {
            y: 150,
            opacity: 0,
            rotateX: -90
        }, {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.05,
            duration: 1.2,
            ease: "back.out(1.7)"
        }, 0.5);

    }, { scope: containerRef });

    return (
        <div
            ref={containerRef}
            className="relative w-full min-h-[100dvh] bg-black text-white overflow-x-hidden" // Removed perspective per user request
            onMouseMove={handleMouseMove}
        >
            {/* --- CUSTOM CURSOR GLOW --- */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/2 -translate-y-1/2 z-0 mix-blend-screen hidden md:block" // Hidden on mobile
            />

            {/* --- DYNAMIC BACKGROUND --- */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Vertical Lines */}
                <div className="absolute inset-0 flex justify-between px-4 md:px-10 opacity-20">
                    {[...Array(6)].map((_, i) => (
                        <div key={`v-${i}`} className="bg-grid-line w-[1px] h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                    ))}
                </div>
                {/* Horizontal Lines */}
                <div className="absolute inset-0 flex flex-col justify-between py-10 opacity-20">
                    {[...Array(6)].map((_, i) => (
                        <div key={`h-${i}`} className="bg-grid-line h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    ))}
                </div>
            </div>

            {/* --- CONTENT WRAPPER --- */}
            <div className="relative z-10 w-full h-full flex flex-col items-center pt-20 pb-10 px-4">

                {/* HERO TITLE */}
                <div ref={heroRef} className="mb-12 md:mb-20 text-center relative w-full px-2">
                    <div className="overflow-hidden mb-2">
                        <span className="inline-block text-accent-main font-mono text-[10px] md:text-sm tracking-[0.3em] md:tracking-[0.5em] uppercase hero-char">
                            Orchestrators of
                        </span>
                    </div>
                    <div className="relative">
                        <h1 className="text-[12vw] md:text-9xl font-black font-syne tracking-tighter leading-[0.85] uppercase mix-blend-difference break-words">
                            {"CODECRAFT".split("").map((char, i) => (
                                <span key={i} className="hero-char inline-block hover:text-red-500 transition-colors duration-300 cursor-default">{char}</span>
                            ))}
                        </h1>
                        <h1 className="text-[12vw] md:text-9xl font-black font-syne tracking-tighter leading-[0.85] uppercase text-transparent stroke-text opacity-50 absolute top-1 left-1 -z-10 blur-sm break-words select-none pointer-events-none">
                            CODECRAFT
                        </h1>
                    </div>
                </div>

                {/* CARDS CONTAINER - No 3D transform style */}
                <div
                    className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-2 md:px-4"
                >
                    {developers.map((dev) => (
                        <Card key={dev.id} dev={dev} />
                    ))}
                </div>

                {/* FOOTER TEXT */}
                <div className="mt-16 md:mt-20 text-center opacity-50 font-mono text-xs pb-10">
                    <p>ENGINEERED IN 2026</p>
                    <p className="mt-2 text-[10px] tracking-widest">SWASTIKA TECH TEAM</p>
                </div>

            </div>
        </div>
    );
}

// --- SUBMIT COMPONENT: Card ---
function Card({ dev }: { dev: Developer }) {
    // Removed GSAP Refs and Hover Handlers for cleaner static/CSS-only interaction

    return (
        <div
            className="dev-card group relative h-[400px] md:h-[500px] w-full bg-neutral-900 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 transition-all duration-500 hover:border-red-500/50 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
        >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img
                    src={dev.image}
                    alt={dev.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 md:via-black/20 to-transparent opacity-90 md:hover:opacity-70 transition-opacity duration-500" />
            </div>

            {/* Hover Tech Overlay */}
            <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-between z-20">
                {/* Top: Tech Stack Tags - Fade in on hover
                <div className="flex flex-wrap gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 transform translate-y-0 md:-translate-y-4 md:group-hover:translate-y-0">
                    {dev.tech.map((t, i) => (
                        <span key={i} className="px-2 py-1 text-[10px] bg-red-600/80 backdrop-blur-md rounded border border-red-500/30 font-mono text-white">
                            {t}
                        </span>
                    ))}
                </div> */}

                {/* Bottom: Info - Slide up slightly on hover */}
                <div className="transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-300">
                    {/* <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-1 bg-red-600 rounded-full" />
                        <span className="text-red-400 font-mono text-xs uppercase tracking-wider">{dev.role}</span>
                    </div> */}
                    <h2 className="text-2xl md:text-3xl font-black font-syne text-white mb-2 leading-none uppercase">
                        {dev.name.split(' ')[0]} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500 group-hover:from-red-500 group-hover:to-orange-500 transition-colors duration-300">
                            {dev.name.split(' ')[1]}
                        </span>
                    </h2>

                    {/* Bio Reveal - CSS Transition Only */}
                    <div className="h-auto md:h-0 md:group-hover:h-auto overflow-hidden transition-all duration-300">
                        {/* <p className="text-xs md:text-sm text-gray-300 font-jost mb-4 pt-2 border-t border-white/10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                            {dev.bio}
                        </p> */}

                        {/* Social Icons */}
                        <div className="flex gap-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 delay-200 pointer-events-auto md:pointer-events-none md:group-hover:pointer-events-auto">
                            {dev.socials.github && (
                                <Link href={dev.socials.github} className="hover:text-red-500 transition-colors"><Github size={18} /></Link>
                            )}
                            {dev.socials.linkedin && (
                                <Link href={dev.socials.linkedin} className="hover:text-red-500 transition-colors"><Linkedin size={18} /></Link>
                            )}
                            {dev.socials.portfolio && (
                                <Link href={dev.socials.portfolio} className="hover:text-red-500 transition-colors"><Globe size={18} /></Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 z-20">
                <Code2 className="text-white/20 w-5 h-5 md:w-6 md:h-6 rotate-12 group-hover:text-red-500 group-hover:rotate-0 transition-all duration-500" />
            </div>

            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-600 via-orange-500 to-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        </div>
    );
}

