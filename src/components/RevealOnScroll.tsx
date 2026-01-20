'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export default function RevealOnScroll({ children, className = "", delay = 0 }: RevealOnScrollProps) {
    const el = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!el.current) return;

        gsap.fromTo(el.current,
            {
                y: 50,
                opacity: 0,
                filter: "blur(10px)",
            },
            {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1.2,
                ease: "power3.out",
                delay: delay,
                scrollTrigger: {
                    trigger: el.current,
                    start: "top 85%", // Start animation when top of element hits 85% of viewport height
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, { scope: el });

    return (
        <div ref={el} className={className}>
            {children}
        </div>
    );
}
