import { NextResponse } from 'next/server';
import { adminMessaging, adminFirestore } from '@/lib/firebase-admin';

export async function POST(request: Request) {
    try {
        const { title, body, imageUrl } = await request.json();

        if (!title || !body) {
            return NextResponse.json({ error: 'Title and body are required' }, { status: 400 });
        }

        if (!adminMessaging || !adminFirestore) {
            return NextResponse.json({ error: 'Firebase Admin not initialized (check env vars)' }, { status: 500 });
        }

        // 1. Save Notification to Firestore 'notifications' collection
        await adminFirestore.collection('notifications').add({
            title,
            body,
            imageUrl: imageUrl || null,
            createdAt: new Date(),
            status: 'sending'
        });

        // 2. Fetch all tokens from 'fcm_tokens' collection
        const snapshot = await adminFirestore.collection('fcm_tokens').get();

        if (snapshot.empty) {
            return NextResponse.json({ message: 'No subscribers found' });
        }

        const tokens = snapshot.docs.map(doc => doc.data().token).filter(Boolean);

        if (tokens.length === 0) {
            return NextResponse.json({ message: 'No valid tokens found' });
        }

        // 3. Send Multicast Message
        // Batching logic: sendEachForMulticast handles up to 500 tokens.

        const message = {
            notification: {
                title,
                body,
                imageUrl: imageUrl || undefined,
                icon: '/logo/wh_sw.png',
            },
            data: {
                url: '/',
            },
            tokens,
        };

        // Note: If tokens > 500, we'd need to chunk the array.
        // For MVP, assuming < 500.
        const response = await adminMessaging.sendEachForMulticast(message);

        // Clean up invalid tokens
        if (response.failureCount > 0) {
            const failedTokens: string[] = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success) {
                    failedTokens.push(tokens[idx]);
                }
            });
            // Optionally delete failed tokens from DB
            // const batch = adminFirestore.batch();
            // failedTokens.forEach(t => batch.delete(adminFirestore.collection('fcm_tokens').doc(t)));
            // await batch.commit();
            console.log(`Failed to send to ${response.failureCount} tokens. Cleanup pending.`);
        }

        return NextResponse.json({
            success: true,
            successCount: response.successCount,
            failureCount: response.failureCount
        });

    } catch (error) {
        console.error('Error broadcasting notification:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
    }
}
