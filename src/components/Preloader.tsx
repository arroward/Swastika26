'use client';

import { useState, useEffect } from 'react';
import { useLoading } from '@/components/LoadingProvider';
import { useConfig } from '@/contexts/ConfigContext';
import { usePathname } from 'next/navigation';
import CinematicIntro from '@/components/splash-screens/CinematicIntro';
import ClassicSplash from '@/components/splash-screens/ClassicSplash';

import { proshowContent, aboutEventContent, aboutCollegeContent, autoShowContent, appConfig, events } from '@/data/content';

export default function Preloader() {
    const { isLoading, setIsLoading } = useLoading();
    const { config, refreshConfig } = useConfig();
    const pathname = usePathname();
    const [introType, setIntroType] = useState<'classic' | 'cinematic'>(() => {
        if (config.appConfig.splashScreen.type === 'cinematic') return 'cinematic';
        return 'classic';
    });
    const [progress, setProgress] = useState(0);
    const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

    // Handle Random Splash Selection
    useEffect(() => {
        if (config.appConfig.splashScreen.type === 'random') {
            const lastType = localStorage.getItem('last_splash_type') as 'classic' | 'cinematic' | null;
            const nextType = lastType === 'cinematic' ? 'classic' : 'cinematic';
            setIntroType(nextType);
            localStorage.setItem('last_splash_type', nextType);
        }
    }, [config.appConfig.splashScreen.type]);

    // Skip preloader on dev route
    useEffect(() => {
        if (pathname?.startsWith('/dev')) {
            setIsLoading(false);
        }
    }, [pathname, setIsLoading]);

    // Enhanced Asset Loading System
    useEffect(() => {
        if (!isLoading) return;

        const loadAllResources = async () => {
            try {
                // 1. First, sync the dynamic configuration (Data Preload)
                // This ensures we have the latest image URLs from R2 before we start preloading them

                const [refreshedConfig, galleryImages] = await Promise.all([
                    refreshConfig(),
                    fetch('/api/gallery').then(res => res.ok ? res.json() : []).catch(() => [])
                ]);

                const latestConfig = refreshedConfig || config;

                // 2. Extract all discoverable assets from the hydrated config
                const {
                    proshowContent,
                    aboutEventContent,
                    aboutCollegeContent,
                    autoShowContent,
                    events,
                    siteConfig
                } = latestConfig;

                const criticalAssets = new Set<string>([
                    siteConfig.logos.main,
                    siteConfig.logos.alt,
                    ...(siteConfig.logos.preload || []),
                    aboutEventContent.image,
                    aboutCollegeContent.images.campus,
                    ...(Array.isArray(galleryImages) ? galleryImages.slice(0, 15) : [])
                ]);

                // Add secondary assets
                proshowContent.artists.forEach(a => { if (a.image) criticalAssets.add(a.image); });
                autoShowContent.images.forEach(img => { if (img) criticalAssets.add(img); });
                events.forEach(e => { if (e.image) criticalAssets.add(e.image); });

                const assetsArray = Array.from(criticalAssets).filter(Boolean);
                const totalResources = assetsArray.length + 1; // +1 for fonts
                let loadedCount = 0;

                const updateProgress = () => {
                    loadedCount++;
                    setProgress(Math.round((loadedCount / totalResources) * 100));
                };

                // 3. Parallel Preloading: Images + Fonts + Min Wait
                const imagePromises = assetsArray.map(src => {
                    return new Promise((resolve) => {
                        const img = new Image();
                        img.src = src;

                        const handleLoad = async () => {
                            try {
                                // Modern browser optimization: pre-decode image to offload main thread
                                if ('decode' in img) {
                                    await img.decode();
                                }
                            } catch (e) {
                                // Ignore decode errors
                            }
                            updateProgress();
                            resolve(src);
                        };

                        img.onload = handleLoad;
                        img.onerror = () => {
                            updateProgress();
                            resolve(src);
                        };
                    });
                });

                const fontPromise = document.fonts ? document.fonts.ready.then(() => {
                    updateProgress();
                    return true;
                }) : Promise.resolve(true).then(updateProgress);

                const minWait = new Promise(resolve => setTimeout(resolve, 2800)); // Minimum cinematic beat

                await Promise.all([
                    ...imagePromises,
                    fontPromise,
                    minWait
                ]);

                setIsAssetsLoaded(true);
            } catch (err) {
                console.error("Critical preloading failure:", err);
                setIsAssetsLoaded(true); // Fallback to let user in
            }
        };

        loadAllResources();
    }, [isLoading, refreshConfig]); // refreshConfig is stable from context

    if (!isLoading) return null;

    if (introType === 'cinematic') {
        return (
            <div className="fixed inset-0 z-[9999]">
                <CinematicIntro onComplete={() => setIsLoading(false)} progress={progress} />
            </div>
        );
    }

    return (
        <ClassicSplash
            progress={progress}
            isLoaded={isAssetsLoaded}
            onComplete={() => setIsLoading(false)}
        />
    );
}
