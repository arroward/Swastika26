'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const calculateTimeLeft = () => {
    // Set target date to Feb 14, 2026 for demo purposes (or swap with real date)
    const difference = +new Date('2026-02-14') - +new Date();

    if (difference > 0) {
        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-4 md:mx-8">
        <span className="text-4xl md:text-7xl font-bold font-mono tracking-wider tabular-nums text-white/90">
            {String(value).padStart(2, '0')}
        </span>
        <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-gold mt-2 opacity-80">
            {label}
        </span>
    </div>
);

export default function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

    useEffect(() => {
        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Prevent hydration mismatch by not rendering numbers until mounted
    if (!timeLeft) return null; // Or return a loading skeleton if preferred

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-row justify-center items-center mt-12 bg-black/30 backdrop-blur-md p-6 md:p-10 rounded-2xl border border-white/5"
        >
            <TimeUnit value={timeLeft.days} label="Days" />
            <span className="text-2xl md:text-5xl text-gold/50 -mt-8">:</span>
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <span className="text-2xl md:text-5xl text-gold/50 -mt-8 hidden md:block">:</span>
            {/* On mobile we might stack, but for now flex-row works if small enough */}
            <TimeUnit value={timeLeft.minutes} label="Mins" />
            <span className="text-2xl md:text-5xl text-gold/50 -mt-8">:</span>
            <TimeUnit value={timeLeft.seconds} label="Secs" />
        </motion.div>
    );
}
