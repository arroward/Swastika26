
import fs from 'fs';
import path from 'path';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { config } from 'dotenv';

// Load environment variables
config();

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY || !R2_BUCKET_NAME) {
    console.error('❌ Missing R2 environment variables');
    process.exit(1);
}

const s3 = new S3Client({
    region: 'auto',
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
});

const configDir = path.join(process.cwd(), 'src/data/config');
const outputFile = 'config/data.json';

async function mergeAndUpload() {
    try {
        console.log('🔄 Merging config files...');
        const files = fs.readdirSync(configDir).filter(f => f.endsWith('.json'));
        const mergedData: any = {};

        for (const file of files) {
            const content = JSON.parse(fs.readFileSync(path.join(configDir, file), 'utf-8'));
            // Merge keys into the root object
            Object.assign(mergedData, content);
        }

        const jsonContent = JSON.stringify(mergedData, null, 2);

        console.log(`🚀 Uploading to R2 bucket: ${R2_BUCKET_NAME}...`);

        await s3.send(new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: outputFile,
            Body: jsonContent,
            ContentType: 'application/json',
            CacheControl: 'no-cache',
        }));

        console.log('✅ Successfully merged and uploaded data.json to R2!');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

mergeAndUpload();
