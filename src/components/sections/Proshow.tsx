'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import VariableProximity from '@/components/VariableProximity';
import { ShaderAnimation } from '@/components/shader-animation';
import { SkeletonCard } from '@/components/Skeleton';

const artists = [
    {
        name: "DJ ALOK",
        role: "International Headliner",
        date: "Feb 20",
        image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop",
        color: "from-blue-600 to-purple-600"
    },
    {
        name: "PRITAM",
        role: "Bollywood Sensation",
        date: "Feb 21",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2670&auto=format&fit=crop",
        color: "from-red-600 to-orange-600"
    }
];

export default function Proshow() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const titleY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={containerRef} className="relative w-full py-16 md:py-24 overflow-hidden">

            {/* Shader Background with Loop & Delay */}
            <motion.div
                className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* <ShaderAnimation /> */}
            </motion.div>

            <div className="container mx-auto px-4 md:px-6 z-10 relative">
                <motion.div style={{ y: titleY, opacity }} className="mb-12 md:mb-20 text-center">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <img
                            src="/logo/WH_LOGO.svg"
                            alt="Swastika Logo"
                            className="w-8 h-8 md:w-10 md:h-10 opacity-80"
                        />
                        <span className="text-accent-main font-mono uppercase tracking-widest text-xs md:text-sm">The Main Event</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-8xl font-black font-syne text-white leading-none cursor-default">
                        <div className="inline-block mr-2 md:mr-4">
                            <VariableProximity label="STAR" className="font-syne" fromFontVariationSettings="'wght' 400" toFontVariationSettings="'wght' 900" radius={150} />
                        </div>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-main to-purple-500">NIGHTS</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
                    {artists.map((artist, i) => (
                        <Card key={i} artist={artist} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Card({ artist, index }: { artist: any, index: number }) {
    const cardRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    const { scrollYProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "end center"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);

    return (
        <motion.div
            ref={cardRef}
            style={{ y, scale, opacity: scale, willChange: 'transform' }}
            className="group relative h-[400px] md:h-[500px] lg:h-[600px] w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/10"
        >
            {!imageLoaded && <SkeletonCard />}

            <div className={`absolute inset-0 bg-gradient-to-t ${artist.color} opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />

            <img
                src={artist.image}
                alt={artist.name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />

            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 lg:p-12 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="overflow-hidden">
                    <p className="text-white/70 font-jost text-xs md:text-sm mb-2 md:mb-3 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100 tracking-[0.2em] uppercase font-light">{artist.date} • {artist.role}</p>
                </div>
                <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black font-cinzel text-white mb-3 md:mb-4 tracking-tight leading-none">{artist.name}</h3>
                <button className="mt-1 md:mt-2 px-6 md:px-8 py-2.5 md:py-3 rounded-full border-2 border-white/40 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 font-bold tracking-[0.15em] uppercase text-xs md:text-sm font-syne">
                    Get Passes
                </button>
            </div>
        </motion.div>
    );
}
