import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { unstable_cache } from "next/cache";

if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    throw new Error("Missing R2 credentials");
}

const R2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
    requestHandler: {
        connectionTimeout: 5000, // 5 seconds timeout
    }
});

const fetchGalleryImages = async (): Promise<string[]> => {
    try {
        const bucket = process.env.R2_BUCKET_NAME || 'sw26';
        const r2Url = process.env.R2_PUBLIC_URL || process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

        // Try 'gallery/' first
        let command = new ListObjectsV2Command({
            Bucket: bucket,
            Prefix: 'gallery/',
        });

        let data = await R2.send(command);

        // If empty, try 'Gallery/'
        if (!data.Contents || data.Contents.length === 0) {
            command = new ListObjectsV2Command({
                Bucket: bucket,
                Prefix: 'Gallery/',
            });
            data = await R2.send(command);
        }

        const sortedContents = data.Contents?.sort((a, b) => (a.Key || '').localeCompare(b.Key || '')) || [];
        const images = sortedContents
            .map((item) => item.Key ? `${r2Url?.replace(/\/$/, '')}/${item.Key}` : null)
            .filter((url): url is string =>
                url !== null &&
                (url.toLowerCase().endsWith('.jpg') ||
                    url.toLowerCase().endsWith('.jpeg') ||
                    url.toLowerCase().endsWith('.png') ||
                    url.toLowerCase().endsWith('.webp'))
            );

        if (images.length > 0) return images;

        // Fallback images if R2 is empty or inaccessible
        console.warn("R2 Gallery empty, using fallback images");
        return [
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2000",
            "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000",
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000",
            "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=2000",
            "https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=2000",
            "https://images.unsplash.com/photo-1429962714451-bb934ecbb4ec?q=80&w=2000",
            "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2000",
            "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2000"
        ];
    } catch (error) {
        console.error("Error fetching gallery images from R2:", error);
        return [
            "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2000",
            "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2000",
            "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000"
        ];
    }
};

export const getGalleryImages = unstable_cache(
    fetchGalleryImages,
    ['gallery-images-list'],
    {
        revalidate: 3600, // Cache for 1 hour
        tags: ['gallery'],
    }
);
