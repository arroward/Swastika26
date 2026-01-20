'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { events } from '@/data/events';
import Link from 'next/link';
import { ArrowUpRight, Monitor, Users, Wallet, Code, Rocket } from 'lucide-react';
import Countdown from '@/components/Countdown';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef(null);

  useGSAP(() => {
    // Hero Text Reveal
    gsap.from('.hero-char', {
      y: 100,
      opacity: 0,
      duration: 2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.5
    });

    // Subtitle Reveal
    gsap.from('.hero-sub', {
      y: 20,
      opacity: 0,
      duration: 1.5,
      ease: 'power3.out',
      delay: 1.5
    });

    // Glass objects float
    gsap.to('.glass-object', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 1
    });

    // Infinite Marquee
    // (CSS handles this, but GSAP could enhance it. Sticking to CSS for perf)

  }, { scope: container });

  return (
    <main ref={container} className="bg-[var(--bg-main)] min-h-screen text-white overflow-x-hidden selection:bg-[var(--accent-blue)] selection:text-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-between">
        <div className="font-display font-bold text-2xl tracking-tighter">Swastika<span className="text-[var(--accent-blue)]">.</span></div>
        <div className="hidden md:flex items-center gap-8 bg-white/5 backdrop-blur-md px-8 py-3 rounded-full border border-white/10">
          <a href="#speakers" className="text-sm font-medium hover:text-[var(--accent-blue)] transition-colors">Speakers</a>
          <a href="#agenda" className="text-sm font-medium hover:text-[var(--accent-blue)] transition-colors">Agenda</a>
          <a href="#venue" className="text-sm font-medium hover:text-[var(--accent-blue)] transition-colors">Venue</a>
          <a href="#contact" className="text-sm font-medium hover:text-[var(--accent-blue)] transition-colors">Contact</a>
        </div>
        <button className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform flex items-center gap-2">
          Get Ticket <div className="bg-blue-600 rounded-full p-1 text-white"><ArrowUpRight size={14} /></div>
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-20">

        {/* Background Glows */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="z-10 text-center relative max-w-[90vw]">
          <h1 className="text-[12vw] leading-[0.85] font-black font-display tracking-tighter mix-blend-screen flex justify-center overflow-hidden">
            {"SWASTIKA".split('').map((c, i) => (
              <span key={i} className="hero-char inline-block transform origin-bottom">{c}</span>
            ))}
          </h1>
        </div>

        <Countdown />

        <div className="hero-sub mt-4 text-center max-w-xl mx-auto px-4 z-20">
          <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-normal">
            NexGen Tech Summit for <span className="text-white font-bold">Innovators</span>
          </p>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-12 border-y border-white/5 bg-black/50 backdrop-blur-sm z-20 relative">
        <div className="marquee-container font-display text-4xl md:text-6xl font-bold text-transparent stroke-text opacity-50">
          <div className="marquee-content flex gap-12 text-white/20">
            <span>INNOVATION</span><span>•</span><span>NETWORKING</span><span>•</span><span>MARKETING</span><span>•</span><span>LEADERSHIP</span><span>•</span>
            <span>INNOVATION</span><span>•</span><span>NETWORKING</span><span>•</span><span>MARKETING</span><span>•</span><span>LEADERSHIP</span><span>•</span>
          </div>
        </div>
      </div>

      {/* Why Attend Section (Crystal Cards) */}
      <section className="py-32 px-6 md:px-24">
        <div className="flex flex-col md:flex-row items-end gap-6 mb-20">
          <div className="h-[2px] w-12 bg-white/50 mb-4" />
          <h2 className="text-4xl md:text-6xl font-display font-bold max-w-3xl">
            Why You Absolutely Should Attend <span className="text-[var(--text-secondary)]">Swastika Tech Summit</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Abstract 3D representations using gradients */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="glass-object aspect-square rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 p-1 relative overflow-hidden group">
              {/* Inner Glow */}
              <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Fake 3D Shape */}
              <div className="absolute inset-4 md:inset-12 rounded-2xl bg-gradient-to-tr from-white/5 to-white/0 border-t border-l border-white/20 backdrop-blur-md shadow-2xl flex items-center justify-center">
                <div className={`w-24 h-24 rounded-full bg-gradient-to-r ${item === 1 ? 'from-blue-500 to-purple-500' : item === 2 ? 'from-cyan-400 to-blue-600' : 'from-purple-500 to-pink-500'} blur-xl opacity-60`} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 text-[var(--text-secondary)] text-lg leading-relaxed">
          <p>The Swastika Tech Summit is the ultimate gathering for tech enthusiasts, industry leaders, and innovators to delve into the world of AI, machine learning, and the future of emerging technologies.</p>
          <p>You'll have the chance to explore real-world use cases, witness cutting-edge demos, and connect with others who are driving change in the tech world.</p>
        </div>
      </section>

      {/* Who Should Attend */}
      <section className="py-32 px-6 md:px-24 bg-[#050505]">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-20 text-center">
          Who Should Definitely Attend
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { icon: <Wallet size={40} />, label: "Investors" },
            { icon: <Rocket size={40} />, label: "Founders" },
            { icon: <Code size={40} />, label: "Developers" },
            { icon: <Users size={40} />, label: "Students" },
          ].map((role, i) => (
            <div key={i} className="hover-card-glow h-[350px] rounded-[3rem] border border-white/10 flex flex-col items-center justify-center gap-6 bg-black group hover:bg-white/5 cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 text-[var(--text-secondary)] group-hover:text-white transition-colors">
                {role.icon}
              </div>
              <span className="relative z-10 font-display text-xl font-bold">{role.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Speakers Preview */}
      <section id="speakers" className="py-32 px-6 md:px-24">
        <div className="flex items-center justify-between mb-16">
          <h2 className="text-4xl font-display font-bold">Industry Leaders</h2>
          <button className="text-sm font-bold uppercase tracking-widest hover:text-[var(--accent-blue)]">View All</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Dr. Emma Parker', 'John Mitchell', 'Samantha Hayes'].map((name, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden aspect-[4/5] bg-gray-900 border border-white/10">
              {/* Placeholder for speaker image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
              <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                <h3 className="text-2xl font-display font-bold mb-1">{name}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">Chief AI Scientist</p>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 duration-300">
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">in</div>
                  <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">x</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 border-t border-white/10 text-center text-white/30 text-sm">
        <p>© 2026 Swastika. All rights reserved.</p>
      </footer>
    </main>
  );
}
