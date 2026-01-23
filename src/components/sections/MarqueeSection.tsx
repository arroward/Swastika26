'use client';

import SlantedMarquee from '@/components/SlantedMarquee';

export default function MarqueeSection() {
    return (
        <section className="relative w-full overflow-hidden py-10 md:py-20">
            <SlantedMarquee />
        </section>
    );
}
