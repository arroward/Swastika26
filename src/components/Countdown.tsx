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

    return (
        <div className="flex gap-4 md:gap-12 justify-center mt-12 mb-8 hero-sub">
            {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Minutes', value: timeLeft.minutes },
                { label: 'Seconds', value: timeLeft.seconds }
            ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                    <span className="text-3xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                        {item.value < 10 ? `0${item.value}` : item.value}
                    </span>
                    <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-[var(--accent-blue)] mt-2">
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
