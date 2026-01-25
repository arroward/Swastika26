'use client';

import { useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Github, Linkedin, Globe, Zap, Cpu, Terminal, Shield, Code, Palette, LucideIcon } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface Developer {
    id: string;
    name: string;
    realName: string;
    role: string;
    image: string;
    tags: string[];
    stats: {
        label: string;
        value: number;
        icon: LucideIcon;
    }[];
    socials: {
        platform: string;
        url: string;
        icon: LucideIcon;
    }[];
}

const developers: Developer[] = [
    {
        id: "01",
        name: "CYBER_ARCHITECT",
        realName: "Ambareesh P",
        role: "System Architecture & Lead",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&fit=crop",
        tags: ["Architecture", "Production", "Scale"],
        stats: [
            { label: "Stability", value: 98, icon: Shield },
            { label: "Efficiency", value: 95, icon: Zap },
        ],
        socials: [
            { platform: "GitHub", url: "#", icon: Github },
            { platform: "LinkedIn", url: "#", icon: Linkedin },
        ]
    },
    {
        id: "02",
        name: "PIXEL_WEAVER",
        realName: "Sarah Chen",
        role: "Lead UI/UX Designer",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&fit=crop",
        tags: ["Canvas", "Motion", "Design"],
        stats: [
            { label: "Precision", value: 99, icon: Palette },
            { label: "Creativity", value: 94, icon: Cpu },
        ],
        socials: [
            { platform: "GitHub", url: "#", icon: Github },
            { platform: "Globe", url: "#", icon: Globe },
        ]
    },
    {
        id: "03",
        name: "LOGIC_CORE",
        realName: "Marcus Thorne",
        role: "Backend Infrastructure",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&fit=crop",
        tags: ["Database", "Security", "Real-time"],
        stats: [
            { label: "Logic", value: 96, icon: Code },
            { label: "Integration", value: 92, icon: Terminal },
        ],
        socials: [
            { platform: "GitHub", url: "#", icon: Github },
            { platform: "LinkedIn", url: "#", icon: Linkedin },
        ]
    },
    {
        id: "04",
        name: "VOX_OPERATOR",
        realName: "Elena Rodriguez",
        role: "DevOps & Cloud Systems",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&fit=crop",
        tags: ["Cloud", "CI/CD", "Performance"],
        stats: [
            { label: "Uptime", value: 100, icon: Shield },
            { label: "Speed", value: 89, icon: Zap },
        ],
        socials: [
            { platform: "LinkedIn", url: "#", icon: Linkedin },
            { platform: "Globe", url: "#", icon: Globe },
        ]
    },
    {
        id: "05",
        name: "VOID_WALKER",
        realName: "Alex Rivera",
        role: "Full Stack Integration",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&fit=crop",
        tags: ["Connect", "API", "Auth"],
        stats: [
            { label: "Versatility", value: 94, icon: Code },
            { label: "Sanity", value: 42, icon: Zap },
        ],
        socials: [
            { platform: "GitHub", url: "#", icon: Github },
            { platform: "LinkedIn", url: "#", icon: Linkedin },
        ]
    }
];

export default function CreditsPage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        // Reveal header text with a split-like effect
        tl.from(".char", {
            opacity: 0,
            y: 100,
            duration: 0.8,
            stagger: 0.05,
            ease: "expo.out"
        });

        tl.from(".header-line", {
            width: 0,
            duration: 1,
            ease: "power3.inOut"
        }, "-=0.5");

        tl.from(".header-sub", {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.3");

        // Staggered entrance for cards
        gsap.from(".dev-card", {
            scrollTrigger: {
                trigger: ".dev-card",
                start: "top bottom-=100",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            rotateX: 10,
            scale: 0.95,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out"
        });

        // Floating background elements
        gsap.to(".bg-orb", {
            y: "random(-50, 50)",
            x: "random(-50, 50)",
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: {
                amount: 2,
                from: "random"
            }
        });
    }, { scope: containerRef });

    return (
        <main ref={containerRef} className="min-h-screen bg-[#020202] text-white selection:bg-red-500/30 overflow-x-hidden">
            {/* Ambient Background */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-red-600/10 blur-[120px] bg-orb" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40vw] h-[40vw] rounded-full bg-blue-600/5 blur-[120px] bg-orb" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] contrast-150" />
                <div className="absolute inset-0 border-[1px] border-white/5 m-4 pointer-events-none" />
            </div>

            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-6 md:p-10 flex justify-between items-center">
                <Link href="/" className="group flex items-center gap-4 text-white/40 hover:text-white transition-all duration-300">
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-red-500/50 group-hover:bg-red-500/10 transition-colors">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase hidden sm:block">Return Home</span>
                </Link>

                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] animate-pulse" />
                    <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest">Protocol: Redline</span>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 pt-40 pb-20 px-6 container mx-auto">
                {/* Hero Header */}
                <header ref={headerRef} className="mb-32 max-w-5xl mx-auto">
                    <div className="overflow-hidden mb-4">
                        <h1 className="text-7xl md:text-[12rem] font-black font-syne leading-[0.85] tracking-tighter flex flex-wrap gap-x-8">
                            {"THE".split("").map((c, i) => (
                                <span key={i} className="char inline-block">{c}</span>
                            ))}
                            <span className="text-red-600">
                                {"CREATORS".split("").map((c, i) => (
                                    <span key={i} className="char inline-block">{c}</span>
                                ))}
                            </span>
                        </h1>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center gap-8 mt-12">
                        <div className="header-line h-[1px] flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        <div className="header-sub max-w-md">
                            <p className="font-mono text-xs md:text-sm text-white/50 leading-relaxed uppercase tracking-wider">
                                // The architects of the digital anomaly. A collective of engineers, designers, and visionaries pushing the limits of the web.
                            </p>
                        </div>
                    </div>
                </header>

                {/* Grid */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 max-w-7xl mx-auto">
                    {developers.map((dev) => (
                        <DeveloperCard key={dev.id} dev={dev} />
                    ))}

                    {/* Recruiting Card */}
                    <div className="dev-card group relative aspect-[16/10] md:aspect-square flex flex-col items-center justify-center border border-white/5 bg-white/[0.02] backdrop-blur-3xl rounded-3xl p-12 overflow-hidden hover:border-red-500/30 transition-all duration-700">
                        <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative z-10 text-center">
                            <div className="w-24 h-24 rounded-full border border-white/10 flex items-center justify-center mx-auto mb-8 group-hover:scale-110 group-hover:border-red-500/50 transition-all duration-700">
                                <Zap className="text-white/20 group-hover:text-red-500 transition-colors duration-700" size={40} />
                            </div>
                            <h3 className="text-4xl font-syne font-bold mb-4 tracking-tight">JOIN THE FORCE</h3>
                            <p className="font-mono text-xs text-white/40 uppercase tracking-widest max-w-[240px] mx-auto leading-loose">
                                We are always scouting for top talent to join our specialized units.
                            </p>
                            <Link href="#" className="mt-8 inline-flex items-center gap-2 font-mono text-[10px] text-red-500 border border-red-500/30 px-6 py-3 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300">
                                <Terminal size={12} />
                                OPEN_APPLICATIONS
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer Section */}
                <footer className="mt-60 border-t border-white/5 pt-20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Code size={24} className="text-red-600" />
                                <h4 className="text-2xl font-syne font-bold">SYSTEM_LOGS</h4>
                            </div>
                            <div className="font-mono text-[10px] text-white/30 space-y-2 uppercase tracking-[0.2em]">
                                <p>_Build: v2.6.0-stable</p>
                                <p>_Kernel: NextJS 16.1.4</p>
                                <p>_UI: GSAP + Tailwind CSS</p>
                            </div>
                        </div>
                        <div className="flex gap-8">
                            <a href="#" className="flex items-center gap-2 group">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                    <Github size={20} />
                                </div>
                            </a>
                            <a href="#" className="flex items-center gap-2 group">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                    <Linkedin size={20} />
                                </div>
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    );
}

function DeveloperCard({ dev }: { dev: Developer }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current || window.matchMedia('(hover: none)').matches) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        gsap.to(cardRef.current, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.5,
            ease: "power2.out"
        });

        gsap.to(imageRef.current, {
            x: (x - centerX) / 10,
            y: (y - centerY) / 10,
            duration: 0.5,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
        });
        gsap.to(imageRef.current, {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.3)"
        });
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="dev-card group relative aspect-[16/10] md:aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 bg-[#080808] cursor-crosshair [perspective:1000px]"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    ref={imageRef as any}
                    src={dev.image}
                    alt={dev.name}
                    fill
                    className="object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-1000 scale-110 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-[#020202]/50 to-transparent" />
            </div>

            {/* Content Layer */}
            <div ref={contentRef} className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start mb-8">
                        <span className="font-mono text-[10px] text-red-500 border border-red-500/30 px-2 py-1 rounded">ID_{dev.id}</span>
                        <div className="flex gap-2">
                            {dev.tags.map(tag => (
                                <span key={tag} className="font-mono text-[8px] bg-white/5 border border-white/10 px-2 py-1 rounded uppercase tracking-widest text-white/40">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black font-syne leading-none tracking-tight group-hover:text-red-500 transition-colors duration-500">
                        {dev.name.split("_").map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </h2>
                    <p className="mt-4 font-mono text-xs text-white/50 uppercase tracking-[0.2em]">{dev.role}</p>
                </div>

                <div className="space-y-6">
                    {/* Stats revealed on hover */}
                    <div className="grid grid-cols-2 gap-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        {dev.stats.map((stat, i) => (
                            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                                <div className="flex items-center gap-2 mb-2">
                                    <stat.icon size={12} className="text-red-500" />
                                    <span className="font-mono text-[8px] text-white/30 uppercase">{stat.label}</span>
                                </div>
                                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-red-600 transition-all duration-1000 ease-out"
                                        style={{ width: `${stat.value}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                        <p className="text-xl font-bold font-syne opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                            {dev.realName}
                        </p>

                        <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {dev.socials.map((social, i) => (
                                <a
                                    key={i}
                                    href={social.url}
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white hover:text-black border border-white/10 flex items-center justify-center transition-all"
                                >
                                    <social.icon size={16} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t border-l border-white/10 m-4 rounded-tl-3xl pointer-events-none group-hover:border-red-500/50 transition-colors" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b border-r border-white/10 m-4 rounded-br-3xl pointer-events-none group-hover:border-red-500/50 transition-colors" />
        </div>
    );
}
