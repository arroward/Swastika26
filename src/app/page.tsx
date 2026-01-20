'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { events } from '@/data/events';
import Link from 'next/link';
import { ArrowRight, Calendar, MapPin, Clock, Users, Trophy, Zap, Download, Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import Countdown from '@/components/Countdown';
import RevealOnScroll from '@/components/RevealOnScroll';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);

  useGSAP(() => {
    // Hero Text Stagger
    const tl = gsap.timeline();
    tl.from('.hero-char', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      stagger: 0.05,
      ease: 'power4.out',
      delay: 0.2
    })
      .from('.hero-fade', {
        y: 20,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
      }, "-=1");

  }, { scope: container });

  return (
    <main ref={container} className="bg-[var(--bg-main)] min-h-screen text-white overflow-x-hidden selection:bg-[var(--accent-blue)] selection:text-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto font-display font-bold text-2xl tracking-tighter mix-blend-difference">Swastika<span className="text-[var(--accent-blue)]">.</span></div>
        <div className="pointer-events-auto hidden md:flex items-center gap-8 bg-black/20 backdrop-blur-md px-8 py-3 rounded-full border border-white/10 shadow-2xl">
          <Link href="#about" className="text-sm font-medium hover:text-[var(--accent-blue)] transition-colors">About</Link>
          <Link href="#events" className="text-sm font-medium hover:text-[var(--accent-blue)] transition-colors">Events</Link>
          <Link href="#why-attend" className="text-sm font-medium hover:text-[var(--accent-blue)] transition-colors">Why Attend</Link>
          <Link href="#contact" className="text-sm font-medium hover:text-[var(--accent-blue)] transition-colors">Contact</Link>
        </div>
        <div className="pointer-events-auto">
          <Link href="/events" className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
            Explore Events <ArrowRight size={16} />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">

        {/* Abstract Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-purple-600/10 rounded-full blur-[100px]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
        </div>

        <div className="z-10 text-center relative max-w-5xl mx-auto flex flex-col items-center">

          <div className="hero-fade mb-6 inline-flex items-center gap-2 border border-white/10 bg-white/5 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-[var(--accent-blue)] font-bold">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)] animate-pulse" />
            Feb 20-21, 2026
          </div>

          <h1 className="text-[13vw] md:text-[8rem] leading-[0.85] font-black font-display tracking-tighter mix-blend-screen flex justify-center flex-wrap overflow-hidden mb-6">
            {"SWASTIKA".split('').map((c, i) => (
              <span key={i} className="hero-char inline-block">{c}</span>
            ))}
          </h1>

          <p className="hero-fade text-xl md:text-2xl text-[var(--text-secondary)] font-light max-w-2xl mx-auto leading-relaxed mb-12">
            The ultimate convergence of <span className="text-white font-medium">Innovation</span>, <span className="text-white font-medium">Competition</span>, and <span className="text-white font-medium">Technology</span>.
          </p>

          <div className="hero-fade flex gap-4">
            <Link href="/events" className="group bg-[var(--accent-blue)] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-all hover:scale-105 flex items-center gap-2 shadow-[0_0_40px_-10px_var(--accent-blue)]">
              View Events <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link href="#about" className="px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/5 transition-all hover:border-white/50 text-[var(--text-secondary)] hover:text-white">
              Learn More
            </Link>
          </div>

          <div className="hero-fade mt-20 w-full max-w-4xl mx-auto">
            <Countdown />
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-6 md:px-24 relative overflow-hidden">
        <RevealOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h4 className="text-[var(--accent-blue)] text-sm font-bold tracking-widest uppercase mb-4">About The Event</h4>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                Where Future Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Reality.</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                Swastika is not just a tech fest; it's a movement. We bring together the brightest minds, the boldest ideas, and the most cutting-edge technologies under one roof. Whether you're a coder, a designer, or a visionary, this is your platform to shine.
              </p>

              <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-2">30+</div>
                  <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">Events & Workshops</div>
                </div>
                <div>
                  <div className="text-4xl font-display font-bold text-white mb-2">₹5L+</div>
                  <div className="text-sm text-[var(--text-secondary)] uppercase tracking-wider">Prize Pool</div>
                </div>
              </div>
            </div>

            {/* Decorative Visual */}
            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl opacity-50"></div>
              <div className="relative h-full w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 flex flex-col justify-between overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-[var(--accent-blue)] rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <Zap size={64} className="text-white/80" />
                <div className="text-2xl font-display font-bold text-white/50 group-hover:text-white transition-colors">
                  "Innovation distinguishes between a leader and a follower."
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Featured Events */}
      <section id="events" className="py-32 px-6 md:px-24 bg-black/40 relative">
        <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>

        <RevealOnScroll>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h4 className="text-[var(--accent-blue)] text-sm font-bold tracking-widest uppercase mb-4">Featured Events</h4>
              <h2 className="text-4xl md:text-5xl font-display font-bold"> compete. Create. Conquer.</h2>
            </div>
            <Link href="/events" className="text-sm font-bold uppercase tracking-widest border-b border-white/30 hover:border-white pb-1 hover:text-[var(--accent-blue)] transition-all">View All Events</Link>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.slice(0, 3).map((event, i) => (
            <RevealOnScroll key={event.slug} delay={i * 0.1} className="h-full">
              <Link href={`/events/${event.slug}`} className="group relative block h-full rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] hover:border-[var(--accent-blue)]/50 transition-all duration-500 hover:-translate-y-2">
                <div className="aspect-video w-full overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold px-3 py-1 bg-white/5 rounded-full text-[var(--accent-blue)] border border-white/5">{event.category}</span>
                    <span className="text-xs text-[var(--text-secondary)] flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                  </div>
                  <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-[var(--accent-blue)] transition-colors">{event.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4">{event.description}</p>

                  <div className="flex items-center text-xs font-bold uppercase tracking-wider text-white/50 group-hover:text-white transition-colors">
                    Read More <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Why Attend */}
      <section id="why-attend" className="py-32 px-6 md:px-24">
        <RevealOnScroll>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-20 text-center">Why You Should Attend</h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { icon: <Trophy size={40} />, title: "Win Big", desc: "Showcase your skills and walk away with exclusive prizes, certificates, and recognition from industry leaders." },
            { icon: <Users size={40} />, title: "Network", desc: "Connect with like-minded peers, mentors, and potential employers. Build relationships that last a lifetime." },
            { icon: <Zap size={40} />, title: "Learn & Grow", desc: "Participate in hands-on workshops and gaining insights from keynote speakers who are shaping the future." }
          ].map((item, i) => (
            <RevealOnScroll key={i} delay={i * 0.2}>
              <div className="flex flex-col items-center text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-20 h-20 rounded-full bg-[var(--accent-blue)]/20 flex items-center justify-center text-[var(--accent-blue)] mb-6">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{item.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t border-white/10 bg-[#050505] pt-20 pb-10 px-6 md:px-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="font-display font-bold text-3xl tracking-tighter mb-6 block">Swastika<span className="text-[var(--accent-blue)]">.</span></Link>
            <p className="text-[var(--text-secondary)] max-w-sm mb-8">
              The biggest tech fest of the year. Join us for 2 days of innovation, coding, and creativity.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-white transition-all"><Instagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-white transition-all"><Twitter size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[var(--accent-blue)] hover:text-white transition-all"><Linkedin size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4 text-[var(--text-secondary)] text-sm">
              <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Sponsors</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Contact</h4>
            <ul className="space-y-4 text-[var(--text-secondary)] text-sm">
              <li className="flex items-center gap-2"><Mail size={14} /> info@swastika.com</li>
              <li className="flex items-center gap-2"><MapPin size={14} /> NIT Delhi, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 rt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-[var(--text-secondary)]">
          <p>&copy; 2026 Swastika Event. All rights reserved.</p>
          <p>Designed by <span className="text-white">Swastika Design Team</span></p>
        </div>
      </footer>
    </main>
  );
}
