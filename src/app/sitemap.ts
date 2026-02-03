import { MetadataRoute } from 'next';
import { getEvents } from '@/lib/db';
import { createSlug } from '@/lib/utils'; // Assuming this import works in server context, which it should

// Re-implement createSlug if import fails or to be safe (it's a simple function)
const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/--+/g, '-')
        .trim();
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swastika.live';

    // Static routes
    const routes = [
        '',
        '/events',
        '/events/mainstage',
        '/events/online',
        '/pass',
        '/credits',
        '/ticket',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes (Events)
    let eventRoutes: MetadataRoute.Sitemap = [];
    try {
        const events = await getEvents();

        eventRoutes = events.map((event) => {
            const slug = slugify(event.title);
            // Determine the path based on event type
            // Check logic in Event3DCarousel.tsx: event.isOnline ? '/events/online/...' : '/events/mainstage/...'
            const path = event.isOnline
                ? `/events/online/${slug}`
                : `/events/mainstage/${slug}`;

            return {
                url: `${baseUrl}${path}`,
                lastModified: new Date(event.date), // Use event date or current date
                changeFrequency: 'weekly' as const,
                priority: 0.7,
            };
        });
    } catch (error) {
        console.error('Error generating event routes for sitemap:', error);
    }

    return [...routes, ...eventRoutes];
}
