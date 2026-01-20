'use client';

import { useState, useEffect } from 'react';

export default function Countdown() {
    const targetDate = new Date('2026-02-20T00:00:00').getTime();
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const TimeBox = ({ value, label }: { value: number, label: string }) => (
        <div className="flex flex-col items-center group">
            <div className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl w-24 h-24 md:w-40 md:h-40 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-[var(--accent-blue)]/50 group-hover:bg-white/10">
                {/* Inner sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent skew-x-12 opacity-0 group-hover:opacity-100 transition-opacity" />

                <span className="text-4xl md:text-7xl font-display font-bold text-white z-10 tabular-nums tracking-tighter">
                    {value < 10 ? `0${value}` : value}
                </span>
            </div>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold text-[var(--text-secondary)] mt-4 group-hover:text-white transition-colors">
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex gap-4 md:gap-6 justify-center mt-16 mb-8 perspective-1000">
            <TimeBox value={timeLeft.days} label="Days" />
            <div className="hidden md:flex flex-col gap-4 py-8 justify-center">
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
            <TimeBox value={timeLeft.hours} label="Hours" />
            <div className="hidden md:flex flex-col gap-4 py-8 justify-center">
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
            <TimeBox value={timeLeft.minutes} label="Minutes" />
            <div className="hidden md:flex flex-col gap-4 py-8 justify-center">
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
                <div className="w-2 h-2 rounded-full bg-white/20"></div>
            </div>
            <TimeBox value={timeLeft.seconds} label="Seconds" />
        </div>
    );
}
