import { events } from '@/data/events';
import { notFound } from 'next/navigation';
import EventClient from './EventClient';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const event = events.find(e => e.slug === slug);
    if (!event) return { title: 'Event Not Found | Swastika \'26' };
    return {
        title: `${event.title} | Swastika '26`,
        description: event.description,
    };
}

export async function generateStaticParams() {
    return events.map(event => ({
        slug: event.slug,
    }));
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const event = events.find(e => e.slug === slug);

    if (!event) {
        notFound();
    }

    return <EventClient event={event} />;
}
