'use client';

import { motion } from 'framer-motion';
import CountdownTimer from '@/components/CountdownTimer';
import DynamicBackground from '@/components/DynamicBackground';
import DustParticles from '@/components/DustParticles';
import { Sparkles, Sword } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Cinematic Background */}
      <DynamicBackground />

      <DustParticles />

      {/* Main Content */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 border border-[--ancient-rust] bg-black/50 backdrop-blur-md rounded-none skew-x-[-10deg]">
            <Sword className="w-4 h-4 text-[--ancient-rust]" />
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-[--fg] font-bold skew-x-[10deg]">
              The Arena Awaits
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Glitch Effect Duplicate Layers */}
          <h1 className="text-6xl md:text-9xl font-cinzel font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#D4AF37] to-[#8B4513] drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] z-10 relative">
            SWASTIKA '26
          </h1>
        </motion.div>

        {/* HUD Wrapper for Countdown */}
        <div className="mt-12 relative p-1">
          {/* HUD Borders */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[--cyber-blue] opacity-70" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[--cyber-blue] opacity-70" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[--cyber-blue] opacity-70" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[--cyber-blue] opacity-70" />

          <CountdownTimer />
        </div>

      </div>

    </main>
  );
}
