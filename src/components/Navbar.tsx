'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

    // Refs
    const navRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const menuListRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLSpanElement>(null);
    const line2Ref = useRef<HTMLSpanElement>(null);
    const line3Ref = useRef<HTMLSpanElement>(null);

    const defaultPatternRef = useRef<HTMLDivElement>(null);

    // Timeline reference
    const tl = useRef<any>(null);



    // Menu Items
    const menuItems = [
        { title: "Home", href: "/#home" },
        { title: "About", href: "/#about" },
        { title: "Events", href: "/#events" },
        { title: "Proshows", href: "/#proshow" },
        { title: "Gallery", href: "/#gallery" },
        // { title: "Sponsors", href: "/#sponsors" },
    ];

    // Initial Entrance Animation
    useGSAP(() => {
        gsap.from(navRef.current, {
            y: -100,
            duration: 0.8,
            ease: "power3.out"
        });
    }, { scope: navRef });

    // Menu Open/Close Animation System
    useGSAP(() => {
        if (!overlayRef.current) return;

        // Create timeline only once
        if (!tl.current) {
            const menuLinks = menuListRef.current?.querySelectorAll('a');

            tl.current = gsap.timeline({ paused: true })
                .to(overlayRef.current, {
                    autoAlpha: 1,
                    duration: 0.4,
                    ease: "power2.inOut"
                })
                .fromTo(menuLinks || [],
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.4,
                        stagger: 0.05,
                        ease: "power3.out"
                    },
                    "-=0.15"
                )
                .fromTo(footerRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
                    "-=0.3"
                );
        }

        // Icon Animation
        if (isOpen) {
            tl.current.timeScale(1.5).play();
            gsap.to(line1Ref.current, { rotate: 45, y: 8, duration: 0.3, ease: "back.out(1.7)" });
            gsap.to(line2Ref.current, { opacity: 0, x: 20, duration: 0.2 });
            gsap.to(line3Ref.current, { rotate: -45, y: -8, duration: 0.3, ease: "back.out(1.7)" });
            document.body.style.overflow = 'hidden'; // Lock Body Scroll
        } else {
            tl.current.timeScale(2.0).reverse();
            gsap.to(line1Ref.current, { rotate: 0, y: 0, duration: 0.3, ease: "power2.out" });
            gsap.to(line2Ref.current, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" });
            gsap.to(line3Ref.current, { rotate: 0, y: 0, duration: 0.3, ease: "power2.out" });
            document.body.style.overflow = ''; // Unlock Body Scroll
        }

    }, { dependencies: [isOpen] });

    // Hover Image Reveal Animation
    useGSAP(() => {


        // Default Pattern Logic
        if (hoveredIdx === null) {
            gsap.to(defaultPatternRef.current, { opacity: 0.1, duration: 0.5, ease: "power2.out" });
        } else {
            gsap.to(defaultPatternRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" });
        }

    }, { dependencies: [hoveredIdx] });

    return (
        <>
            <nav
                ref={navRef}
                className={`w-full z-[100] px-4 py-3 md:px-6 md:py-4 flex items-center justify-between transition-all duration-500 rounded-[2rem] shrink-0
                    bg-black/20 backdrop-blur-md border border-white/10 shadow-lg`}
            >
                {/* LOGO */}
                <Link href="/" onClick={() => setIsOpen(false)} className="pointer-events-auto group flex items-center gap-2 md:gap-3 relative z-[110]">
                    <img
                        src="/logo/WH_LOGO.svg"
                        alt="Swastika Logo"
                        className="w-7 h-7 md:w-8 md:h-8 opacity-90 group-hover:opacity-100 transition-opacity"
                    />
                    <span className="font-cinzel font-black text-lg md:text-xl tracking-tighter text-white group-hover:text-accent-main transition-colors duration-300">
                        SWASTIKA<span className="text-accent-main text-2xl md:text-3xl leading-none">.</span>26
                    </span>
                </Link>

                {/* ANIMATED HAMBURGER BUTTON */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="pointer-events-auto relative z-[110] p-2 hover:bg-white/10 rounded-full transition-colors group"
                    aria-label="Toggle Menu"
                >
                    <div className="flex flex-col gap-1.5 w-8 items-end justify-center">
                        <span ref={line1Ref} className="w-8 h-0.5 bg-white block origin-center transition-colors group-hover:bg-accent-main" />
                        <span ref={line2Ref} className="w-6 h-0.5 bg-white block transition-all group-hover:bg-accent-main" />
                        <span ref={line3Ref} className="w-8 h-0.5 bg-white block origin-center transition-colors group-hover:bg-accent-main" />
                    </div>
                </button>
            </nav>

            {/* FULLSCREEN MENU OVERLAY */}
            <div
                ref={overlayRef}
                className="fixed inset-0 bg-black z-[90] flex md:flex-row flex-col overflow-hidden invisible opacity-0"
            >
                {/* LEFT SIDE - LIST */}
                <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-20 relative z-20 bg-black/85 md:bg-black">
                    <div ref={menuListRef} className="flex flex-col gap-2 md:gap-4">
                        {menuItems.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                onMouseEnter={() => setHoveredIdx(i)}
                                onMouseLeave={() => setHoveredIdx(null)}
                                className="group flex items-center gap-4 py-2 opacity-0 translate-y-4" // Initial state for animation
                            >
                                <span className={`font-mono text-sm md:text-base text-accent-main transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 ${hoveredIdx === i ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                    0{i + 1}
                                </span>
                                <span className={`font-cinzel font-black text-4xl md:text-6xl uppercase transition-all duration-300 ${hoveredIdx === i ? 'text-white translate-x-2' : 'text-transparent stroke-text hover:text-white/50'}`}>
                                    {item.title}
                                </span>
                            </Link>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div ref={footerRef} className="absolute bottom-10 left-6 md:left-20 flex gap-8 text-white/40 font-mono text-xs md:text-sm">
                        <div className="flex flex-col">
                            <span className="text-white mb-1">CONTACT</span>
                            <a href="mailto:swastika26@mbcpeermade.com" className="hover:text-accent-main transition-colors">swastika26@mbcpeermade.com</a>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white mb-1">FOLLOW US</span>
                            <div className="flex gap-4">
                                <a href="https://instagram.com/swastika_2k26" target="_blank" rel="noopener noreferrer" className="hover:text-accent-main transition-colors">IG</a>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}
