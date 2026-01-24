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
});

const fetchGalleryImages = async (): Promise<string[]> => {
    try {
        const command = new ListObjectsV2Command({
            Bucket: process.env.R2_BUCKET_NAME || 'sw26',
            Prefix: 'gallery/',
        });

        const data = await R2.send(command);
        const r2Url = process.env.R2_PUBLIC_URL || process.env.NEXT_PUBLIC_R2_PUBLIC_URL;

        // Sort contents by Key to maintain order (e.g. SW0001 then SW0002)
        const sortedContents = data.Contents?.sort((a, b) => (a.Key || '').localeCompare(b.Key || '')) || [];

        return sortedContents
            .map((item) => item.Key ? `${r2Url}/${item.Key}` : null)
            .filter((url): url is string => url !== null && (url.toLowerCase().endsWith('.jpg') || url.toLowerCase().endsWith('.jpeg') || url.toLowerCase().endsWith('.png') || url.toLowerCase().endsWith('.webp')));
    } catch (error) {
        console.error("Error fetching gallery images from R2:", error);
        return [];
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
