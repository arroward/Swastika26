'use client';

import { useEffect, useRef } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { signInAnonymously } from 'firebase/auth';
import { db, auth } from '@/lib/firebase';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export default function VisitorLogger() {
    const loggedRef = useRef(false);

    useEffect(() => {
        // Prevent double execution in React Strict Mode (Development)
        if (loggedRef.current) return;
        loggedRef.current = true;

        const logVisitor = async () => {
            try {
                // Initialize FingerprintJS
                const fp = await FingerprintJS.load();
                const result = await fp.get();
                const visitorId = result.visitorId;

                // Authenticate anonymously first
                if (auth) {
                    try {
                        await signInAnonymously(auth);
                    } catch (authError: any) {
                        if (authError?.code !== 'auth/configuration-not-found') {
                            console.error("Auth Error:", authError);
                        }
                    }
                }

                if (db) {
                    // Check if this visitorId has been logged recently (e.g., today) or ever
                    // For "unique visitors", we usually check if they exist at all or per day. 
                    // Let's implement a 'per session' or 'per day' logic. 
                    // Here, we'll check if this specific visitorId has logged for THIS PATH today? 
                    // Or just log every unique session? 

                    // Intelligent Logging Logic
                    const STORAGE_KEY_PREFIX = 'sw_log_';
                    const lastLogTs = localStorage.getItem(`${STORAGE_KEY_PREFIX}ts`);
                    const visitCount = parseInt(localStorage.getItem(`${STORAGE_KEY_PREFIX}count`) || '0');

                    const now = Date.now();
                    const ONE_HOUR = 60 * 60 * 1000;

                    // If logged strictly less than 1 hour ago, skip to prevent spam
                    if (lastLogTs && (now - parseInt(lastLogTs)) < ONE_HOUR) {
                        return;
                    }

                    const isRevisit = visitCount > 0;
                    const newVisitCount = visitCount + 1;

                    // Determine collection based on environment
                    const isDev = process.env.NODE_ENV === 'development';

                    // Rule: Don't log localhost or local network IPs in Production
                    const hostname = window.location.hostname;
                    const isLocal = hostname === 'localhost' ||
                        hostname === '127.0.0.1' ||
                        hostname.startsWith('192.168.') ||
                        hostname.startsWith('10.') ||
                        /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname);

                    if (!isDev && isLocal) {
                        return;
                    }

                    const collectionName = isDev ? 'visitors_dev' : 'visitors';

                    // 1. Gather Rich Client Data
                    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
                    const networkInfo = conn ? {
                        effectiveType: conn.effectiveType, // '4g', '3g', etc.
                        rtt: conn.rtt,
                        downlink: conn.downlink,
                        saveData: conn.saveData
                    } : null;

                    const hardwareInfo = {
                        screen: `${window.innerWidth}x${window.innerHeight}`,
                        screenTotal: `${window.screen.width}x${window.screen.height}`,
                        pixelRatio: window.devicePixelRatio,
                        colorDepth: window.screen.colorDepth,
                        cores: navigator.hardwareConcurrency || 'unknown',
                        memory: (navigator as any).deviceMemory || 'unknown' // RAM in GB (approx)
                    };

                    // 2. Fetch IP & Geo Data (Client-side)
                    let geoData = {};
                    try {
                        const ipRes = await fetch('https://ipwho.is/');
                        if (ipRes.ok) {
                            const json = await ipRes.json();
                            if (json.success) {
                                geoData = {
                                    ip: json.ip,
                                    city: json.city,
                                    region: json.region,
                                    country: json.country,
                                    countryCode: json.country_code,
                                    isp: json.connection?.isp || json.isp, // ipwho.is structure varies slightly by endpoint version
                                    org: json.connection?.org || json.org,
                                    lat: json.latitude,
                                    lon: json.longitude,
                                    flag: json.flag?.img || null
                                };
                            }
                        }
                    } catch (err) {
                        console.warn('Geo fetch failed, continuing without IP data', err);
                    }

                    // 3. Write Comprehensive Log
                    await addDoc(collection(db, collectionName), {
                        // Core Identification
                        visitorId: visitorId,
                        timestamp: serverTimestamp(),
                        isRevisit: isRevisit,
                        visitCount: newVisitCount,

                        // Session Context
                        path: window.location.pathname,
                        referrer: document.referrer || 'direct',

                        // Environment
                        userAgent: navigator.userAgent,
                        platform: navigator.platform,
                        language: navigator.language,
                        languages: navigator.languages, // Full array of preferred languages
                        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,

                        // Rich Data
                        deviceType: /Mobi|Android/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
                        network: networkInfo,
                        hardware: hardwareInfo,
                        geo: geoData,

                        // Meta
                        v: 2, // Versioning schema for future stats parsing
                    });

                    // Update local storage
                    localStorage.setItem(`${STORAGE_KEY_PREFIX}ts`, now.toString());
                    localStorage.setItem(`${STORAGE_KEY_PREFIX}count`, newVisitCount.toString());
                    // console.log('Unique visitor logged:', visitorId);
                }
            } catch (error) {
                console.error("Error logging visitor:", error);
            }
        };

        logVisitor();
    }, []);

    return null;
}
