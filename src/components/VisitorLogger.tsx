'use client';

import { useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';

export default function VisitorLogger() {
    const loggedRef = useRef(false);

    useEffect(() => {
        // Prevent double execution in React Strict Mode (Development)
        if (loggedRef.current) return;
        loggedRef.current = true;

        const logVisitor = async () => {
            try {
                // Use session storage to ensure we only count a "visit" once per browser session
                const sessionKey = 'swastika_visitor_logged';
                if (typeof window !== 'undefined' && sessionStorage.getItem(sessionKey)) {
                    return;
                }

                // Authenticate anonymously first
                if (auth) {
                    try {
                        await signInAnonymously(auth);
                    } catch (authError: any) {
                        // ignore config not found errors (dev hasn't enabled it yet)
                        if (authError?.code !== 'auth/configuration-not-found') {
                            console.error("Auth Error:", authError);
                        }
                    }
                }

                if (db) {
                    await addDoc(collection(db, 'visitors'), {
                        timestamp: serverTimestamp(),
                        userAgent: navigator.userAgent,
                        platform: navigator.platform,
                        language: navigator.language,
                        referrer: document.referrer || 'direct',
                        screenSize: `${window.innerWidth}x${window.innerHeight}`,
                        path: window.location.pathname
                    });

                    sessionStorage.setItem(sessionKey, 'true');
                    // console.log('Visitor logged successfully');
                }
            } catch (error) {
                console.error("Error logging visitor:", error);
            }
        };

        logVisitor();
    }, []);

    return null;
}
