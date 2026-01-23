'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function LenisScroll() {
    useEffect(() => {
        const scrollContainer = document.querySelector('#main-container');

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            touchMultiplier: 2,
            wrapper: scrollContainer as HTMLElement,
            content: scrollContainer as HTMLElement,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return null;
}
