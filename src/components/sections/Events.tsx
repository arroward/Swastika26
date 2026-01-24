'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Music, Gamepad2, Wrench, Palette, Mic2 } from 'lucide-react';
import CircularGallery from '@/components/CircularGallery';
import Event3DCarousel from '@/components/Event3DCarousel';

const categories = [
    {
        id: 1,
        title: "Technical",
        desc: "Coding, Hackathons, & Robotics",
        icon: Code,
        accent: "from-blue-500 to-cyan-500",
        shadow: "shadow-blue-500/20",
        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 2,
        title: "Cultural",
        desc: "Dance, Music, & Drama",
        icon: Music,
        accent: "from-pink-500 to-rose-500",
        shadow: "shadow-pink-500/20",
        image: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 3,
        title: "Esports",
        desc: "Valorant, FIFA, & BGMI",
        icon: Gamepad2,
        accent: "from-green-500 to-emerald-500",
        shadow: "shadow-green-500/20",
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 4,
        title: "Workshops",
        desc: "Hands-on Learning Experience",
        icon: Wrench,
        accent: "from-yellow-500 to-orange-500",
        shadow: "shadow-yellow-500/20",
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 5,
        title: "Arts",
        desc: "Painting, Sketching & Digital",
        icon: Palette,
        accent: "from-purple-500 to-violet-500",
        shadow: "shadow-purple-500/20",
        image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=800&auto=format&fit=crop'
    },
    {
        id: 6,
        title: "Open Mic",
        desc: "Poetry, Standup & Singing",
        accent: "from-red-500 to-orange-500",
        icon: Mic2,
        shadow: "shadow-red-500/20",
        image: 'https://images.unsplash.com/photo-1590402494682-cd3fb5321c5e?q=80&w=800&auto=format&fit=crop'
    }
];



import { ShaderAnimation } from '@/components/shader-animation';

const galleryConfig = {
    bend: 0,
    textColor: "#ffffff",
    borderRadius: 0.05,
    scrollSpeed: 2,
    scrollEase: 0.05
};

export default function Events() {
    const containerRef = useRef(null);

    return (
        <section ref={containerRef} className="relative py-0 overflow-hidden h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex flex-col justify-center">

            <div className="container mx-auto px-4 md:px-6 z-10 relative h-full flex flex-col">
                <div className="text-center pt-4 md:pt-6 mb-2 md:mb-4 lg:mb-6 space-y-2 shrink-0">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block"
                    >
                        <div className="flex items-center justify-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                            <img
                                src="/logo/WH_LOGO.svg"
                                alt="Swastika Logo"
                                className="w-4 h-4 md:w-5 md:h-5 opacity-80"
                            />
                            <span className="text-xs font-mono text-accent-main uppercase tracking-widest">
                                Festival Highlights
                            </span>
                        </div>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-cinzel text-white drop-shadow-2xl"
                    >
                        DISCOVER <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">EVENTS</span>
                    </motion.h2>
                </div>

                <div className="w-full relative z-20 flex-1 min-h-0 flex items-center justify-center pb-4">
                    <div className="w-full h-full flex items-center justify-center">
                        {/* Linear Carousel */}
                        <Event3DCarousel items={categories} />
                    </div>
                </div>
            </div>
        </section>
    );
}
