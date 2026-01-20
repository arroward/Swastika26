'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Preloader() {
    const container = useRef(null);
    // We use a state to unmount it to allow mouse events to pass through if z-index fails or just for cleanup, 
    // though display:none or removal is better.
    const [complete, setComplete] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setComplete(true)
        });

        // Intro text
        tl.to(container.current, { autoAlpha: 1, duration: 0 })
            .from('.loader-char', {
                yPercent: 100,
                duration: 1.2,
                stagger: 0.05,
                ease: 'power4.out',
            })
            .to('.loader-char', {
                yPercent: -120,
                duration: 1,
                stagger: 0.05,
                ease: 'power4.in',
                delay: 0.5
            })
            .to(container.current, {
                yPercent: -100,
                duration: 1.2,
                ease: 'expo.inOut'
            }, "-=0.2");

    }, { scope: container });

    if (complete) return null;

    return (
        <div ref={container} className="fixed inset-0 z-[10000] bg-[#050505] text-[#e0e0e0] flex items-center justify-center opacity-0 invisible">
            <div className="flex overflow-hidden">
                {"SWASTIKA".split('').map((char, i) => (
                    <span key={i} className="loader-char text-[15vw] md:text-[10vw] font-display font-bold leading-none inline-block origin-bottom-left">
                        {char}
                    </span>
                ))}
            </div>
        </div>
    );
}
