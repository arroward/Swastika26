'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Users, Trophy, BookOpen } from 'lucide-react';

import { aboutCollegeContent } from '@/data/content';

gsap.registerPlugin(ScrollTrigger);

export default function AboutCollege() {
    const containerRef = useRef(null);

    useGSAP(() => {
        // Image Reveal (Clip Path)
        gsap.fromTo('.campus-image',
            { clipPath: 'inset(0 100% 0 0)' },
            {
                clipPath: 'inset(0 0 0 0)',
                duration: 1,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Content Stagger Reveal
        gsap.from('.reveal-item', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 60%",
                toggleActions: "play none none reverse"
            }
        });

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex items-center justify-center overflow-hidden px-4 md:px-6 py-2 md:py-4 panel snap-start snap-always"
        >
            <div className="w-full h-full flex flex-col lg:flex-row gap-2 relative">

                {/* Left Panel - Image Collage vibes */}
                <div
                    className="campus-image flex-1 h-[40%] lg:h-full relative rounded-[2rem] overflow-hidden group"
                >
                    <img
                        src={aboutCollegeContent.images.campus}
                        alt="College Campus"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />

                    {/* Badge */}
                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20 rounded-full">
                        <span className="text-xs font-mono text-white tracking-widest uppercase">{aboutCollegeContent.location}</span>
                    </div>
                </div>

                {/* Right Panel - Content */}
                <div className="flex-[1.5] h-full flex flex-col gap-2">
                    {/* Top Right - Header Block */}
                    <div
                        className="reveal-item flex-1 bg-white/5 border border-white/5 rounded-[2rem] p-6 md:p-10 flex flex-col justify-center relative overflow-hidden group hover:bg-white/10 transition-colors"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

                        <h2 className="text-2xl md:text-5xl lg:text-6xl font-black font-syne uppercase text-white leading-[0.85] mb-4">
                            {aboutCollegeContent.title.line1} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{aboutCollegeContent.title.highlight}</span>
                        </h2>

                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-20 bg-blue-500/50" />
                            <span className="text-sm font-mono text-blue-300 uppercase tracking-widest">Est. {aboutCollegeContent.established}</span>
                        </div>
                    </div>

                    {/* Bottom Right - Info Split */}
                    <div className="flex-[0.8] flex flex-col md:flex-row gap-2">
                        {/* Description Box */}
                        <div
                            className="reveal-item flex-[2] bg-black/40 border border-white/5 rounded-[2rem] p-6 md:p-8 flex items-center"
                        >
                            <p className="text-lg md:text-sm lg:text-base text-white/100 font-jost leading-relaxed">
                                {aboutCollegeContent.description}
                            </p>
                        </div>

                        {/* Stats Box (Commented out in original but keeping structure if re-enabled later) */}
                        {/* <div
                            className="reveal-item flex-1 bg-blue-600/10 border border-blue-500/20 rounded-[2rem] p-6 flex flex-col justify-between"
                        >
                             ...
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
