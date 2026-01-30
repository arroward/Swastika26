import { NextRequest, NextResponse } from "next/server";
import { getPresignedUrl } from "@/lib/r2-storage";

export async function POST(request: NextRequest) {
    try {
        const { fileName, fileType, folder } = await request.json();

        if (!fileName || !fileType) {
            return NextResponse.json(
                { error: "fileName and fileType are required" },
                { status: 400 }
            );
        }

        const data = await getPresignedUrl(fileName, fileType, folder || "event-registrations");

        return NextResponse.json(data);
    } catch (error) {
        console.error("Presigned URL error:", error);
        return NextResponse.json(
            { error: "Failed to generate upload URL" },
            { status: 500 }
        );
    }
}
