'use client';

import { events } from '@/data/events';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Clock } from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function EventsPage() {
    return (
        <main className="bg-[var(--bg-main)] min-h-screen text-white pt-24 px-6 md:px-24 pb-20 overflow-x-hidden selection:bg-[var(--accent-main)] selection:text-white">

            {/* Simple Navbar (Back to Home) */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
                <Link href="/" className="pointer-events-auto font-display font-bold text-2xl tracking-tighter mix-blend-difference">Swastika<span className="text-[var(--accent-main)]">.</span>live</Link>
                <div className="pointer-events-auto flex items-center gap-4">
                    <Link href="/" className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-white hover:text-black transition-all flex items-center gap-2">
                        Back to Home
                    </Link>
                    <div className="w-10 md:w-12 opacity-80 hover:opacity-100 transition-opacity">
                        <img src="/logo/WH_LOGO.svg" alt="Swastika Logo" className="w-full h-auto object-contain" />
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto">
                <RevealOnScroll>
                    <h1 className="text-5xl md:text-8xl font-black font-display tracking-tighter mb-4 text-center">ALL EVENTS</h1>
                    <p className="text-center text-[var(--text-secondary)] mb-20 text-lg">Competition. Innovation. Glory.</p>
                </RevealOnScroll>

                <div className="grid grid-cols-1 gap-8">
                    {events.map((event, i) => (
                        <RevealOnScroll key={event.slug} delay={i * 0.1}>
                            <div className="group relative rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-[var(--accent-main)]/50 transition-all hover:bg-white/5">
                                <div className="flex flex-col md:flex-row h-full">
                                    {/* Image Section */}
                                    <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden relative">
                                        <div className="absolute inset-0 bg-red-900/20 group-hover:bg-transparent transition-colors z-10" />
                                        <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute top-4 left-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold border border-white/10 text-[var(--accent-main)]">
                                            {event.category}
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="md:w-2/3 p-8 flex flex-col justify-center">
                                        <div className="flex flex-wrap gap-6 mb-4 text-sm text-[var(--text-secondary)] font-medium">
                                            <div className="flex items-center gap-2"><Calendar size={14} className="text-[var(--accent-main)]" /> {event.date}</div>
                                            <div className="flex items-center gap-2"><Clock size={14} className="text-[var(--accent-main)]" /> {event.time}</div>
                                            <div className="flex items-center gap-2"><MapPin size={14} className="text-[var(--accent-main)]" /> {event.venue}</div>
                                        </div>

                                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-3 group-hover:text-[var(--accent-main)] transition-colors">{event.title}</h2>
                                        <p className="text-[var(--text-secondary)] mb-8 max-w-2xl">{event.description}</p>

                                        <div className="flex items-center gap-4">
                                            <Link href={`/events/${event.slug}`} className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
                                                View Details <ArrowRight size={14} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>

        </main>
    );
}
