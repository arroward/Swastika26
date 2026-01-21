'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeatureCard = ({ title, desc, index }: { title: string, desc: string, index: number }) => (
    <div className="glass-panel p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-[var(--accent-blue)]/30 transition-colors duration-500">
        <div className="absolute top-0 right-0 p-6 md:p-8 opacity-20 text-6xl md:text-8xl font-black font-display text-white group-hover:opacity-10 transition-opacity">
            0{index}
        </div>

        <div className="relative z-10 h-full flex flex-col justify-end">
            <h3 className="text-2xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                {title}
            </h3>
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed">
                {desc}
            </p>
        </div>

        {/* Hover Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--accent-blue)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
);

export default function WhyAttend() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from('.feature-card-anim', {
            y: 100,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%"
            }
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto">
            <div className="mb-24 flex flex-col md:flex-row items-end justify-between gap-8 border-b border-white/10 pb-12">
                <h2 className="text-5xl md:text-7xl font-display font-black leading-none">
                    Future <br /> <span className="text-[var(--text-secondary)]">Ready</span>
                </h2>
                <p className="max-w-md text-lg text-[var(--text-secondary)] pb-2">
                    Experience the convergence of technology, art, and innovation. Swastika '26 is not just an event; it's a glimpse into tomorrow.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
                <div className="col-span-1 md:col-span-2 feature-card-anim">
                    <FeatureCard
                        title="Immersive Tech"
                        desc="Dive into AR/VR showcases, AI demonstrations, and robotics competitions that push the boundary of what's possible."
                        index={1}
                    />
                </div>
                <div className="col-span-1 feature-card-anim">
                    <div className="glass-panel h-full rounded-3xl relative overflow-hidden flex items-center justify-center p-8 group">
                        {/* Abstract Art */}
                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 blur-2xl opacity-60 group-hover:scale-125 transition-transform duration-1000" />
                        <div className="absolute bottom-8 left-8">
                            <h3 className="font-display font-bold text-2xl">Visual Art</h3>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 feature-card-anim">
                    <FeatureCard
                        title="Networking"
                        desc="Connect with 1000+ peers, industry mentors, and potential investors."
                        index={2}
                    />
                </div>
                <div className="col-span-1 md:col-span-2 feature-card-anim">
                    <FeatureCard
                        title="Competitions"
                        desc="Over ₹5 Lakhs in prize pool across hackathons, coding sprints, and design challenges."
                        index={3}
                    />
                </div>
            </div>
        </section>
    );
}
