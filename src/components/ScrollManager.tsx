'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Observer removed as we rely on native CSS snap

gsap.registerPlugin(ScrollTrigger);

export default function ScrollManager() {
    useGSAP(() => {
        const scroller = document.querySelector('#main-container') as HTMLElement;
        if (!scroller) return;

        // We rely on CSS Scroll Snap (snap-y snap-mandatory) set in MainContainer
        // and snap-start set on sections.

        // This component now only ensures ScrollTrigger stays synced
        ScrollTrigger.defaults({
            scroller: scroller
        });

        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };

    }, { dependencies: [] });

    return null;
}
