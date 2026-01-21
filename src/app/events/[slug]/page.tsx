'use client';

import { useParams } from 'next/navigation';
import { events } from '@/data/events';
import Link from 'next/link';
import {
    Calendar, MapPin, Clock, Users, Trophy, AlertCircle, FileText, CheckCircle,
    User, Phone, Mail, ArrowRight, Download
} from 'lucide-react';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function EventDetailPage() {
    const params = useParams();
    const slug = params?.slug as string;
    const event = events.find(e => e.slug === slug);

    if (!event) {
        return (
            <div className="min-h-screen bg-[var(--bg-main)] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-display font-bold mb-4">Event Not Found</h1>
                    <Link href="/events" className="text-[var(--accent-main)] hover:underline">Back to Events</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[var(--bg-main)] min-h-screen text-white overflow-x-hidden selection:bg-[var(--accent-main)] selection:text-white pb-20">

            {/* Navbar */}
            <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
                <Link href="/" className="pointer-events-auto font-display font-bold text-2xl tracking-tighter mix-blend-difference">Swastika<span className="text-[var(--accent-main)]">.</span>live</Link>
                <div className="pointer-events-auto flex items-center gap-4">
                    <Link href="/events" className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-white hover:text-black transition-all flex items-center gap-2">
                        All Events
                    </Link>
                    <div className="w-10 md:w-12 opacity-80 hover:opacity-100 transition-opacity">
                        <img src="/logo/WH_LOGO.svg" alt="Swastika Logo" className="w-full h-auto object-contain" />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-end pb-24 px-6 md:px-24">
                <div className="absolute inset-0 z-0">
                    <img src={event.image} className="w-full h-full object-cover opacity-40 mix-blend-overlay" alt={event.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)] via-[var(--bg-main)]/80 to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-6xl">
                    <RevealOnScroll>
                        <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-[var(--accent-main)] font-bold mb-6">
                            {event.category} Event
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black font-display tracking-tighter mb-4 leading-tight">{event.title}</h1>
                        <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light max-w-2xl mb-8">{event.tagline}</p>

                        <div className="flex flex-wrap gap-8 text-sm font-bold tracking-widest uppercase">
                            <div className="flex items-center gap-2"><Calendar className="text-[var(--accent-main)]" size={18} /> {event.date}</div>
                            <div className="flex items-center gap-2"><Clock className="text-[var(--accent-main)]" size={18} /> {event.time}</div>
                            <div className="flex items-center gap-2"><MapPin className="text-[var(--accent-main)]" size={18} /> {event.venue}</div>
                        </div>
                    </RevealOnScroll>
                </div>
            </section>

            <div className="px-6 md:px-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">

                {/* Main Content */}
                <div className="md:col-span-2 space-y-16">

                    {/* Description */}
                    <RevealOnScroll>
                        <section>
                            <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3"><FileText className="text-[var(--accent-main)]" /> Description</h3>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
                                {event.description}
                            </p>
                        </section>
                    </RevealOnScroll>

                    {/* Rules */}
                    <RevealOnScroll>
                        <section>
                            <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3"><AlertCircle className="text-[var(--accent-main)]" /> Rules & Guidelines</h3>
                            <ul className="grid gap-4">
                                {event.rules.map((rule, i) => (
                                    <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--accent-main)]/30 transition-colors">
                                        <span className="w-6 h-6 rounded-full bg-[var(--accent-main)]/20 text-[var(--accent-main)] flex items-center justify-center text-xs font-bold mt-0.5">{i + 1}</span>
                                        <span className="text-[var(--text-secondary)]">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </RevealOnScroll>

                    {/* Timeline */}
                    {event.timeline && (
                        <RevealOnScroll>
                            <section>
                                <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3"><Clock className="text-[var(--accent-main)]" /> Event Flow</h3>
                                <div className="border-l-2 border-white/10 ml-3 pl-8 space-y-8">
                                    {event.timeline.map((item: any, i: number) => (
                                        <div key={i} className="relative">
                                            <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-[var(--bg-main)] border-2 border-[var(--accent-main)] z-10 box-content"></div>
                                            <div className="text-lg font-bold text-white mb-1">{item.activity}</div>
                                            <div className="text-sm text-[var(--text-secondary)] font-mono">{item.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </RevealOnScroll>
                    )}

                    {/* Rewards */}
                    {event.prizes && (
                        <RevealOnScroll>
                            <section>
                                <h3 className="text-2xl font-display font-bold mb-6 flex items-center gap-3"><Trophy className="text-[var(--accent-main)]" /> Rewards</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {event.prizes.map((prize: string, i: number) => (
                                        <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 flex items-center gap-4">
                                            <Trophy size={24} className="text-yellow-500" />
                                            <span className="font-bold text-lg">{prize}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </RevealOnScroll>
                    )}

                </div>

                {/* Sidebar */}
                <div className="space-y-8">

                    <RevealOnScroll delay={0.2}>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6">
                            <h3 className="font-display font-bold text-xl mb-4">Event Details</h3>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-white/10">
                                    <span className="text-[var(--text-secondary)] flex items-center gap-2"><MapPin size={16} /> Mode</span>
                                    <span className="font-bold text-white">{event.mode}</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-white/10">
                                    <span className="text-[var(--text-secondary)] flex items-center gap-2"><Users size={16} /> Team Size</span>
                                    <span className="font-bold text-white">{event.teamSize}</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-white/10">
                                    <span className="text-[var(--text-secondary)] flex items-center gap-2"><CheckCircle size={16} /> Eligibility</span>
                                    <span className="font-bold text-white text-right max-w-[150px]">{event.eligibility}</span>
                                </div>
                                <div className="flex items-center justify-between py-3 border-b border-white/10">
                                    <span className="text-[var(--text-secondary)] flex items-center gap-2"><AlertCircle size={16} /> Deadline</span>
                                    <span className="font-bold text-red-400">{event.deadline}</span>
                                </div>
                            </div>

                            <button className="w-full bg-[var(--accent-main)] hover:bg-red-600 text-white font-bold py-4 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_-5px_var(--accent-main)] flex items-center justify-center gap-2">
                                Register Now <ArrowRight size={18} />
                            </button>

                            <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                                <Download size={18} /> Download Brochure
                            </button>
                        </div>
                    </RevealOnScroll>

                    <RevealOnScroll delay={0.4}>
                        <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="font-display font-bold text-xl mb-6">Contact Coordinator</h3>

                            {event.coordinator && (
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[var(--accent-main)]/20 flex items-center justify-center text-[var(--accent-main)]">
                                        <User size={24} />
                                    </div>
                                    <div>
                                        <div className="font-bold text-lg">{event.coordinator.name}</div>
                                        <div className="text-sm text-[var(--text-secondary)] mb-2">{event.coordinator.role}</div>
                                        <a href={`mailto:${event.coordinator.contact}`} className="text-sm flex items-center gap-2 hover:text-white text-[var(--accent-main)] transition-colors">
                                            <Mail size={14} /> {event.coordinator.contact}
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </RevealOnScroll>

                </div>
            </div>
        </main>
    );
}
