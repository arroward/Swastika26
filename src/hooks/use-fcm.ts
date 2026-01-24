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
                console.log("Notification permission granted, proceeding with FCM...");
                const msg = await messaging();
                if (msg) {
                    const swUrl = `/firebase-messaging-sw.js?apiKey=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}&authDomain=${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}&projectId=${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}&storageBucket=${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}&messagingSenderId=${process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}&appId=${process.env.NEXT_PUBLIC_FIREBASE_APP_ID}`;

                    console.log("Registering Service Worker...");
                    const registration = await navigator.serviceWorker.register(swUrl);
                    await navigator.serviceWorker.ready;
                    console.log("Service Worker ready.");

                    console.log("Fetching FCM token...");
                    const currentToken = await getToken(msg, {
                        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
                        serviceWorkerRegistration: registration
                    });

                    if (currentToken) {
                        setToken(currentToken);
                        console.log("FCM Token Generated:", currentToken);

                        console.log("Sending token to subscription API...");
                        const response = await fetch('/api/notifications/subscribe', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ token: currentToken }),
                        });

                        if (response.ok) {
                            console.log("Successfully subscribed via API.");
                        } else {
                            const errorData = await response.json();
                            console.error("API Subscription failed:", errorData);
                        }
                    } else {
                        console.warn("No registration token available. Check firebase console configuration.");
                    }
                } else {
                    console.error("Firebase Messaging could not be initialized.");
                }
            } else {
                console.warn("Permission not granted:", permission);
            }
        } catch (err) {
            console.error("FCM Subscription Error:", err);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && 'Notification' in window) {
            setPermission(Notification.permission);
        }
    }, []);

    return { token, permission, requestPermission };
}
