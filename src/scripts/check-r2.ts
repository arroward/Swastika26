import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const R2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
    },
});

async function checkGallery() {
    try {
        console.log("Checking bucket:", process.env.R2_BUCKET_NAME);
        const command = new ListObjectsV2Command({
            Bucket: process.env.R2_BUCKET_NAME || 'sw26',
            Prefix: 'gallery/',
        });

        const data = await R2.send(command);
        console.log("Objects found:", data.KeyCount);
        if (data.Contents) {
            data.Contents.forEach(obj => console.log("- ", obj.Key));
        } else {
            console.log("No contents found with prefix 'gallery/'");
        }
    } catch (err) {
        console.error("Error:", err);
    }
}

checkGallery();
