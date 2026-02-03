import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://swastika.live';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/', '/wallet/', '/ticket/'],
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
