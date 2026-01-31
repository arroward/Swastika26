'use client';

import { useState, useEffect } from 'react';
import { useLoading } from '@/components/LoadingProvider';
import { useConfig } from '@/contexts/ConfigContext';
import { usePathname } from 'next/navigation';
import CinematicIntro from '@/components/splash-screens/CinematicIntro';
import ClassicSplash from '@/components/splash-screens/ClassicSplash';

import { proshowContent, aboutEventContent, aboutCollegeContent, autoShowContent, appConfig } from '@/data/content';
import { events } from '@/data/events';

export default function Preloader() {
    const { isLoading, setIsLoading } = useLoading();
    const { refreshConfig } = useConfig();
    const pathname = usePathname();
    const [introType, setIntroType] = useState<'classic' | 'cinematic'>(() => {
        if (appConfig.splashScreen.type === 'cinematic') return 'cinematic';
        return 'classic';
    });
    const [progress, setProgress] = useState(0);
    const [isAssetsLoaded, setIsAssetsLoaded] = useState(false);

    // Handle Random Splash Selection
    useEffect(() => {
        if (appConfig.splashScreen.type === 'random') {
            const lastType = localStorage.getItem('last_splash_type') as 'classic' | 'cinematic' | null;
            // Alternate between cinematic and classic
            const nextType = lastType === 'cinematic' ? 'classic' : 'cinematic';
            setIntroType(nextType);
            localStorage.setItem('last_splash_type', nextType);
        }
    }, []);

    // Skip preloader on dev route
    useEffect(() => {
        if (pathname?.startsWith('/dev')) {
            setIsLoading(false);
        }
    }, [pathname, setIsLoading]);

    // Asset Loading Logic (Runs regardless of intro type, but mainly drives Classic)
    useEffect(() => {
        if (!isLoading) return;

        const loadAssets = async () => {
            const imagesToPreload = [
                '/logo/WH_LOGO.svg',
                '/logo/BL_LOGO.svg',
                '/logo/wh_sw.png',
                ...(proshowContent.artists.map((a) => a.image).filter(Boolean) as string[]),
                aboutEventContent.image,
                aboutCollegeContent.images.campus,
                ...autoShowContent.images,
                ...events.map((e) => e.image),
            ].filter(Boolean) as string[];

            let loadedCount = 0;
            const totalResources = imagesToPreload.length;

            const preloadImages = imagesToPreload.map((src) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.onload = () => {
                        loadedCount++;
                        setProgress(Math.round((loadedCount / totalResources) * 100));
                        resolve(src);
                    };
                    img.onerror = () => {
                        loadedCount++;
                        setProgress(Math.round((loadedCount / totalResources) * 100));
                        resolve(src);
                    };
                    img.src = src;
                });
            });

            const windowLoad = new Promise((resolve) => {
                if (document.readyState === 'complete') {
                    resolve(true);
                } else {
                    window.addEventListener('load', () => resolve(true));
                }
            });

            await Promise.all([
                refreshConfig(), // Fetch dynamic config while preloading assets
                Promise.all(preloadImages),
                windowLoad,
                new Promise(resolve => setTimeout(resolve, 2500)) // Min wait time
            ]);

            setIsAssetsLoaded(true);
        };

        loadAssets();
    }, [isLoading]);

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
