'use client';

import SlantedMarquee from '@/components/SlantedMarquee';

export default function MarqueeSection() {
    return (
        <section className="relative w-full h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] overflow-hidden panel snap-start snap-always">
            <SlantedMarquee />
        </section>
    );
}
