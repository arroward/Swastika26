import { config } from "dotenv";
import { Client } from "pg";
import {
  S3Client,
  ListBucketsCommand,
  HeadBucketCommand,
} from "@aws-sdk/client-s3";
import * as admin from "firebase-admin";

// Load environment variables
config();

const REQUIRED_KEYS = [
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
  "NEXT_PUBLIC_FALLBACK_IMAGE_URL",
];

async function checkEnv() {
  console.log("🔍 Starting Environment Check...\n");

  let allPassed = true;

  // 1. Check for missing variables
  console.log("📋 Checking Variable Existence:");
  const missingKeys = REQUIRED_KEYS.filter((key) => !process.env[key]);
  if (missingKeys.length > 0) {
    console.log("  ❌ Missing the following environment variables:");
    missingKeys.forEach((key) => console.log(`     - ${key}`));
    allPassed = false;
  } else {
    console.log("  ✅ All required variables are present.");
  }
  console.log("");

  // 2. Test Database Connection
  if (process.env.DATABASE_URL) {
    console.log("🗄️  Testing Database Connection:");
    try {
      const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      });
      await client.connect();
      const result = await client.query("SELECT 1 as result");
      await client.end();

      if (result.rows[0].result === 1) {
        console.log("  ✅ Database connected successfully (PG)");
      } else {
        console.log("  ❌ Database connected but returned unexpected result.");
        allPassed = false;
      }
    } catch (error: any) {
      console.log(`  ❌ Database connection failed: ${error.message}`);
      allPassed = false;
    }
  } else {
    console.log("  ⚠️  Skipping DB check (missing DATABASE_URL)");
  }
  console.log("");

  // 3. Test R2 Connection
  if (
    process.env.R2_ACCOUNT_ID &&
    process.env.R2_ACCESS_KEY_ID &&
    process.env.R2_SECRET_ACCESS_KEY
  ) {
    console.log("☁️  Testing R2 Storage Connection:");
    try {
      const s3 = new S3Client({
        region: "auto",
        endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID,
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
        },
      });

      // Try to list buckets or head the specific bucket if provided
      if (process.env.R2_BUCKET_NAME) {
        try {
          await s3.send(
            new HeadBucketCommand({ Bucket: process.env.R2_BUCKET_NAME }),
          );
          console.log(
            `  ✅ R2 Connection successful & Bucket '${process.env.R2_BUCKET_NAME}' found.`,
          );
        } catch (bucketErr: any) {
          // If HeadBucket fails, it might be 403 or 404
          console.log(
            `  ❌ R2 Connected but Bucket check failed: ${bucketErr.message}`,
          );
          allPassed = false;
        }
      } else {
        await s3.send(new ListBucketsCommand({}));
        console.log("  ✅ R2 Connection successful (Buckets listed).");
      }
    } catch (error: any) {
      console.log(`  ❌ R2 connection failed: ${error.message}`);
      allPassed = false;
    }
  } else {
    console.log("  ⚠️  Skipping R2 check (missing R2 credentials)");
  }
  console.log("");

  // 4. Test Firebase Admin
  if (
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY
  ) {
    console.log("🔥 Testing Firebase Admin Connection:");
    try {
      // Initialize a temp app to avoid conflict if any global app exists (though in this script context it shouldn't)
      const appName = "env-check-app";
      // Ensure we handle existing apps if this script was somehow imported (unlikely but safe)
      if (admin.apps.some((app) => app?.name === appName)) {
        await admin.app(appName).delete();
      }

      const app = admin.initializeApp(
        {
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          }),
        },
        appName,
      );

      // Try a simple operation like getting a non-existent user or listing users (might need permission)
      // Or just successfully initializing is often a good enough check for format.
      // A better check is verifying the signature, but that requires an actual token minting or DB access.
      // Let's try to access Firestore as a connectivity check if possible, or just assume init success = credentials valid format.
      // Usually init doesn't throw until you use it.

      // Let's try generating a signed URL or accessing the Auth service.
      try {
        // Listing users requires permissions. If it fails with "insufficient permissions", the creds are likely valid but limited.
        // If it fails with "invalid credential", that's the check.
        await app.auth().listUsers(1);
        console.log(
          "  ✅ Firebase Admin initialized & Auth service reachable.",
        );
      } catch (innerErr: any) {
        if (innerErr.code === "auth/insufficient-permission") {
          console.log(
            "  ⚠️  Firebase Admin initialized but has limited permissions (Auth list failed). Credentials likely valid.",
          );
        } else if (innerErr.message.includes("credential")) {
          console.log(
            `  ❌ Firebase Admin credentials invalid: ${innerErr.message}`,
          );
          allPassed = false;
        } else {
          // Other errors might be network or project config. Warning is safer than fail if we aren't sure.
          console.log(
            `  ⚠️  Firebase Admin initialized but encountered error: ${innerErr.message}`,
          );
        }
      }
    } catch (error: any) {
      console.log(`  ❌ Firebase initialization failed: ${error.message}`);
      allPassed = false;
    }
  } else {
    console.log("  ⚠️  Skipping Firebase check (missing credentials)");
  }

  console.log("\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  if (allPassed) {
    console.log("✅ ALL CHECKS PASSED. SYSTEM READY.");
    process.exit(0);
  } else {
    console.log("❌ SOME CHECKS FAILED. PLEASE FIX ERRORS ABOVE.");
    process.exit(1);
  }
}

checkEnv().catch((err) => {
  console.error("Fatal script error:", err);
  process.exit(1);
});
