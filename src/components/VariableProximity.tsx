'use client';

import { useRef, useEffect, useMemo } from 'react';

interface VariableProximityProps {
    label: string;
    className?: string;
    fromFontVariationSettings: string;
    toFontVariationSettings: string;
    radius?: number;
    falloff?: 'linear' | 'exponential' | 'gaussian';
    containerRef?: React.RefObject<HTMLElement | null>;
    onClick?: () => void;
}

function parseSettings(settings: string): Record<string, number> {
    return settings.split(',').reduce((acc, part) => {
        const [key, value] = part.trim().split(' ');
        if (key && value) {
            const cleanKey = key.replace(/['"]/g, '');
            acc[cleanKey] = parseFloat(value);
        }
        return acc;
    }, {} as Record<string, number>);
}

function stringifySettings(settings: Record<string, number>): string {
    return Object.entries(settings)
        .map(([key, value]) => `'${key}' ${value}`)
        .join(', ');
}

export default function VariableProximity({
    label,
    className = '',
    fromFontVariationSettings,
    toFontVariationSettings,
    radius = 100,
    falloff = 'linear',
    containerRef,
    onClick
}: VariableProximityProps) {
    const containerRefLocal = useRef<HTMLSpanElement>(null);
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const rafId = useRef<number | null>(null);

    // Parse settings once
    const fromSettings = useMemo(() => parseSettings(fromFontVariationSettings), [fromFontVariationSettings]);
    const toSettings = useMemo(() => parseSettings(toFontVariationSettings), [toFontVariationSettings]);
    const axes = useMemo(() => Object.keys(fromSettings), [fromSettings]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const animate = () => {
            if (!containerRefLocal.current) return;

            // Optimize: Only update if mouse is close to the container? 
            // For now, we update all letters as requested.

            letterRefs.current.forEach((span) => {
                if (!span) return;

                const rect = span.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const dist = Math.sqrt(
                    Math.pow(mouseRef.current.x - centerX, 2) +
                    Math.pow(mouseRef.current.y - centerY, 2)
                );

                if (dist > radius) {
                    // Reset to default if not already (check string to avoid style thrashing?)
                    // For performance, just setting it is usually okay, but we could cache.
                    // Doing a simple check might be slower than just setting.
                    span.style.fontVariationSettings = fromFontVariationSettings;
                    return;
                }

                let t = 1 - dist / radius;
                if (t < 0) t = 0;

                if (falloff === 'exponential') {
                    t = t * t;
                }

                const newSettings: Record<string, number> = {};
                axes.forEach((axis) => {
                    const min = fromSettings[axis];
                    const max = toSettings[axis];
                    newSettings[axis] = min + (max - min) * t;
                });

                span.style.fontVariationSettings = stringifySettings(newSettings);
            });

            rafId.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [radius, falloff, fromSettings, toSettings, axes, fromFontVariationSettings]);

    return (
        <span
            ref={containerRefLocal}
            className={`${className} inline-block whitespace-normal break-words`}
            onClick={onClick}
            style={{ display: 'inline' }}
        >
            {label.split('').map((char, index) => (
                <span
                    key={index}
                    ref={(el) => { letterRefs.current[index] = el; }}
                    className="inline-block transition-transform duration-75 will-change-transform"
                    style={{ fontVariationSettings: fromFontVariationSettings }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </span>
    );
}
