'use client';

import SlantedMarquee from '@/components/SlantedMarquee';

export default function MarqueeSection() {
    return (
        <section className="h-screen w-full relative overflow-hidden backdrop-blur-sm">
            <SlantedMarquee />
        </section>
    );
}
