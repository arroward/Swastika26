'use client';

import { siteConfig } from '@/config/site.config';

export default function NoiseOverlay() {
    if (!siteConfig.effects.noise.enabled) return null;

    return (
        <div
            className="fixed top-[-50%] left-[-50%] w-[200%] h-[200%] pointer-events-none z-50 mix-blend-overlay"
            style={{
                opacity: siteConfig.effects.noise.opacity,
                backgroundImage: `url("${siteConfig.effects.noise.pattern}")`,
                animation: 'noise-move 0.2s infinite'
            }}
        />
    );
}
