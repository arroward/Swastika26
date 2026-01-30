import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Cloudflare R2 configuration
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL;

if (
  !R2_ACCOUNT_ID ||
  !R2_ACCESS_KEY_ID ||
  !R2_SECRET_ACCESS_KEY ||
  !R2_BUCKET_NAME
) {
  console.warn(
    "Warning: Cloudflare R2 environment variables are not fully configured",
  );
}

const r2Client = R2_ACCOUNT_ID
  ? new S3Client({
    region: "auto",
    endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID!,
      secretAccessKey: R2_SECRET_ACCESS_KEY!,
    },
  })
  : null;

export async function getPresignedUrl(
  fileName: string,
  contentType: string,
  folder: string = "uploads",
): Promise<{ url: string; publicUrl: string; key: string }> {
  if (!r2Client || !R2_BUCKET_NAME) {
    throw new Error("Cloudflare R2 is not configured");
  }

  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 10);
  const fileExtension = fileName.split(".").pop();
  const key = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  // Presigned URL for uploading (valid for 1 hour)
  const url = await getSignedUrl(r2Client, command, { expiresIn: 3600 });

  // Public URL where the file will be accessible after upload
  const publicUrl = R2_PUBLIC_URL
    ? `${R2_PUBLIC_URL}/${key}`
    : `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${key}`;

  return { url, publicUrl, key };
}

export async function uploadToR2(
  file: File,
  folder: string = "uploads",
): Promise<string> {
  if (!r2Client || !R2_BUCKET_NAME) {
    throw new Error("Cloudflare R2 is not configured");
  }

  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split(".").pop();
    const fileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    });

    await r2Client.send(command);

    // Generate URLs - try custom domain first, with fallback to direct R2
    let publicUrl: string;

    if (R2_PUBLIC_URL) {
      publicUrl = `${R2_PUBLIC_URL}/${fileName}`;
    } else {
      // Default to direct R2 URL
      publicUrl = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${fileName}`;
    }

    console.log("File uploaded successfully to R2:", {
      fileName,
      publicUrl,
      hasCustomDomain: !!R2_PUBLIC_URL,
      directR2Url: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${fileName}`,
    });

    return publicUrl;
  } catch (error) {
    console.error("Error uploading to R2:", error);
    throw new Error("Failed to upload file to storage");
  }
}

export async function uploadBase64ToR2(
  base64Data: string,
  fileName: string,
  mimeType: string,
  folder: string = "uploads",
): Promise<string> {
  if (!r2Client || !R2_BUCKET_NAME) {
    throw new Error("Cloudflare R2 is not configured");
  }

  try {
    // Generate unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = fileName.split(".").pop();
    const newFileName = `${folder}/${timestamp}-${randomString}.${fileExtension}`;

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Upload to R2
    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: newFileName,
      Body: buffer,
      ContentType: mimeType,
    });

    await r2Client.send(command);

    // Generate URLs - try custom domain first, with fallback to direct R2
    let publicUrl: string;

    if (R2_PUBLIC_URL) {
      publicUrl = `${R2_PUBLIC_URL}/${newFileName}`;
    } else {
      // Default to direct R2 URL
      publicUrl = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${newFileName}`;
    }

    return publicUrl;
  } catch (error) {
    console.error("Error uploading to R2:", error);
    throw new Error("Failed to upload file to storage");
  }
}
