'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Preloader() {
    const container = useRef(null);
    const [complete, setComplete] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => setComplete(true)
        });

        // Intro Logo
        tl.to(container.current, { autoAlpha: 1, duration: 0 })
            .from('.loader-logo', {
                scale: 0.8,
                opacity: 0,
                duration: 1.5,
                ease: 'power3.out',
            })
            .to('.loader-logo', {
                scale: 1.2,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.in',
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
            <div className="flex overflow-hidden relative w-64 md:w-96">
                <img
                    src="/logo/WH_LOGO.svg"
                    alt="Swastika Logo"
                    className="loader-logo w-full h-auto object-contain"
                />
            </div>
        </div>
    );
}
