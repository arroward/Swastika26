import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Helper to get __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from .env.local first, then .env
// We need to look up two levels from src/scripts to get to root
const rootDir = path.resolve(__dirname, '../../');

const loadEnv = (file: string) => {
    const envPath = path.join(rootDir, file);
    if (fs.existsSync(envPath)) {
        const result = dotenv.config({ path: envPath });
        if (result.error) {
            console.warn(`Warning: Failed to parse ${file}:`, result.error);
        } else {
            console.log(`Loaded environment from ${file}`);
        }
    }
};

// Load in order of priority (Next.js logic: .env.local overrides .env)
// Note: dotenv.config won't overwrite existing process.env vars, so we load .env.local first
loadEnv('.env.local');
loadEnv('.env');

const requiredVars = [
    "DATABASE_URL",
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET_NAME",
    "R2_PUBLIC_URL",
    "NEXT_PUBLIC_R2_PUBLIC_URL",
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
    "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
    "NEXT_PUBLIC_FIREBASE_VAPID_KEY",
    "FIREBASE_PROJECT_ID",
    "FIREBASE_CLIENT_EMAIL",
    "FIREBASE_PRIVATE_KEY",
];

const missing = requiredVars.filter(key => {
    const val = process.env[key];
    return !val || val.trim() === '';
});

if (missing.length > 0) {
    console.error('\x1b[31m%s\x1b[0m', 'Error: The following environment variables are missing or empty:');
    missing.forEach(key => console.error(` - ${key}`));
    console.error('\x1b[33m%s\x1b[0m', 'Please ensure .env.local or .env contains these variables.');
    process.exit(1);
}

console.log('\x1b[32m%s\x1b[0m', '✅ All required environment variables are present.');
