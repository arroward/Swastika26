'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TimeUnit = ({ value, label }: { value: number; label: string }) => {
    return (
        <div className="flex flex-col items-center mx-2 md:mx-4 relative group">
            {/* Outer Glow Ring - Rotates slowly */}
            <div className="absolute inset-[-4px] rounded-xl bg-gradient-to-tr from-transparent via-red-900/20 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />

            {/* Main Box */}
            <div className="relative overflow-hidden h-20 w-16 md:h-36 md:w-32 flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl">

                {/* Inner Cyber Grid (Decor) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px] opacity-20" />

                {/* Top Accent Line */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent opacity-50" />

                {/* Animated Number */}
                <AnimatePresence mode="popLayout">
                    <motion.span
                        key={value}
                        initial={{ y: 50, opacity: 0, filter: 'blur(10px)' }}
                        animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                        exit={{ y: -50, opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.4, ease: "backOut" }}
                        className="absolute text-3xl md:text-7xl font-cinzel font-bold text-white tracking-widest z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        {value < 10 ? `0${value}` : value}
                    </motion.span>
                </AnimatePresence>

                {/* Bottom Reflection */}
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none" />
            </div>

            {/* Label */}
            <span className="text-[10px] md:text-sm font-jost uppercase tracking-[0.4em] text-white/50 mt-4 group-hover:text-red-400 group-hover:tracking-[0.5em] transition-all duration-300">
                {label}
            </span>
        </div>
    );
};

const Separator = () => (
    <div className="hidden md:flex flex-col justify-center gap-3 opacity-30 h-20 md:h-36">
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
);

export default function Countdown() {
    // Target Date: Feb 20, 2026 at 00:00:00 IST
    // We use a constant here to avoid dependency changes, though strict primitive comparison would handle it.
    const targetDate = 1771525800000; // 2026-02-20T00:00:00+05:30 in ms

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            };
        };

        // Initial update
        setTimeLeft(calculateTimeLeft());

        // Sync to the exact second to avoid "middle of the second" ticks
        const now = new Date();
        const msUntilNextSecond = 1000 - now.getMilliseconds();

        let intervalId: NodeJS.Timeout;

        const timeoutId = setTimeout(() => {
            // Update immediately at the start of the next second
            setTimeLeft(calculateTimeLeft());

            // Then continue updating every second exactly on the beat
            intervalId = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
        }, msUntilNextSecond);

        return () => {
            clearTimeout(timeoutId);
            clearInterval(intervalId);
        };
    }, []); // Empty dependency array as targetDate is now a static constant inside

    if (!isMounted) return null;

    return (
        <div className="relative z-20 mt-12 mb-8">
            <div className="flex items-start justify-center p-4">
                <TimeUnit value={timeLeft.days} label="Days" />
                <Separator />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <Separator />
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <Separator />
                <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>

            {/* Decorative underline */}
            <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
    );
}
