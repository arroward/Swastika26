"use client";

import { useEffect, useState } from "react";
import { messaging } from "@/lib/firebase";
import { getToken } from "firebase/messaging";

export function useFCM() {
    const [token, setToken] = useState<string | null>(null);
    const [permission, setPermission] = useState<NotificationPermission>('default');

    const requestPermission = async () => {
        try {
            if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

            const permission = await Notification.requestPermission();
            setPermission(permission);

            if (permission === "granted") {
                const msg = await messaging();
                if (msg) {
                    // Register service worker if not already registered
                    // We re-register to ensure the scope is correct
                    const swUrl = `/firebase-messaging-sw.js?apiKey=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}&authDomain=${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}&projectId=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}&storageBucket=${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}&messagingSenderId=${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}&appId=${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`;
                    const registration = await navigator.serviceWorker.register(swUrl);

                    const currentToken = await getToken(msg, {
                        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                        serviceWorkerRegistration: registration
                    });

                    if (currentToken) {
                        setToken(currentToken);

                        // Save token to Firestore via API (bypasses client rules)
                        await fetch('/api/notifications/subscribe', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ token: currentToken }),
                        });
                    }
                }
            }
        } catch (err) {
            console.log("An error occurred while retrieving token. ", err);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    return { token, permission, requestPermission };
}
