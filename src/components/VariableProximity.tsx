'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

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

// Helper to parse settings string like "'wght' 400, 'opsz' 9" into object
function parseSettings(settings: string): Record<string, number> {
    return settings.split(',').reduce((acc, part) => {
        const [key, value] = part.trim().split(' ');
        if (key && value) {
            // Remove quotes from key
            const cleanKey = key.replace(/['"]/g, '');
            acc[cleanKey] = parseFloat(value);
        }
        return acc;
    }, {} as Record<string, number>);
}

// Helper to reconstruct settings string
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
    const localRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

    // If no containerRef provided, we track mouse globally or relative to this element
    // Ideally, if no containerRef, we might want window listeners or just this element hover.
    // Based on usage, containerRef is usually passed.

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Calculate mouse position relative to the viewport
            // Character positions calculate relative to viewport using getBoundingClientRect
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        // If containerRef is provided, we can attach listener there? 
        // Actually window listener is smoother for "proximity" that exceeds bounds
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const fromSettings = useMemo(() => parseSettings(fromFontVariationSettings), [fromFontVariationSettings]);
    const toSettings = useMemo(() => parseSettings(toFontVariationSettings), [toFontVariationSettings]);
    const axes = useMemo(() => Object.keys(fromSettings), [fromSettings]);

    return (
        <span
            ref={localRef}
            className={`${className} inline-block whitespace-normal break-words`}
            onClick={onClick}
            style={{ display: 'inline' }}
        >
            {label.split('').map((char, index) => (
                <Letter
                    key={index}
                    char={char}
                    index={index}
                    mousePosition={mousePosition}
                    radius={radius}
                    falloff={falloff}
                    fromSettings={fromSettings}
                    toSettings={toSettings}
                    axes={axes}
                />
            ))}
        </span>
    );
}

const Letter = ({
    char,
    mousePosition,
    radius,
    falloff,
    fromSettings,
    toSettings,
    axes
}: any) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [currentSettings, setCurrentSettings] = useState(stringifySettings(fromSettings));

    // Use requestAnimationFrame loop for performance or simpler direct calculation in render?
    // Direct render with state update on mouse move is expensive (react render cycle).
    // Ideally we bypass React render for individual letters using refs, but here we need to interpolate.
    // Using a ref to hold style is better.

    useEffect(() => {
        // We update the style directly on the ref to avoid re-renders
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dist = Math.sqrt(
            Math.pow(mousePosition.x - centerX, 2) +
            Math.pow(mousePosition.y - centerY, 2)
        );

        if (dist > radius) {
            ref.current.style.fontVariationSettings = stringifySettings(fromSettings);
            return;
        }

        // Calculate Interpolation Factor (0 to 1)
        let t = 1 - dist / radius;
        if (t < 0) t = 0;

        // Apply falloff curve
        if (falloff === 'exponential') {
            t = t * t;
        }
        // gaussian approximation? t = Math.exp(-dist*dist / (2*sigma*sigma)) mapping...

        const newSettings: Record<string, number> = {};
        axes.forEach((axis: string) => {
            const min = fromSettings[axis];
            const max = toSettings[axis];
            newSettings[axis] = min + (max - min) * t;
        });

        ref.current.style.fontVariationSettings = stringifySettings(newSettings);

    }, [mousePosition, radius, falloff, fromSettings, toSettings, axes]);

    if (char === ' ') return <span ref={ref} className="inline-block">&nbsp;</span>;

    return (
        <span ref={ref} className="inline-block transition-transform duration-75 will-change-transform">
            {char}
        </span>
    );
};
