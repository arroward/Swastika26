import { NextResponse } from 'next/server';
import { getGalleryImages } from '@/lib/r2';

export async function GET() {
    try {
        const images = await getGalleryImages();
        return NextResponse.json(images);
    } catch (error) {
        console.error('Failed to fetch gallery images API:', error);
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
    }
}
