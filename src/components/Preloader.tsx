'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLoading } from '@/components/LoadingProvider';

export default function Preloader() {
    const { isLoading, setIsLoading } = useLoading();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // List of all images to preload
        const imagesToPreload = [
            '/logo/WH_LOGO.svg',
            '/logo/BL_LOGO.svg',
            '/logo/wh_sw.png',
            'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1000&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1514525253440-b393452e8d26?q=80&w=1000&auto=format&fit=crop',
        ];

        let loadedCount = 0;
        const totalResources = imagesToPreload.length;

        // Preload images
        const preloadImages = imagesToPreload.map((src) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    setProgress(Math.round((loadedCount / totalResources) * 100));
                    resolve(src);
                };
                img.onerror = () => {
                    loadedCount++;
                    setProgress(Math.round((loadedCount / totalResources) * 100));
                    resolve(src); // Resolve anyway to not block
                };
                img.src = src;
            });
        });

        // Wait for all resources and minimum display time
        Promise.all([
            Promise.all(preloadImages),
            new Promise(resolve => setTimeout(resolve, 2500)) // Minimum 2.5s display
        ]).then(() => {
            setTimeout(() => {
                setIsLoading(false);
            }, 500);
        });

        // Preload fonts
        if (document.fonts) {
            document.fonts.ready.then(() => {
                console.log('Fonts loaded');
            });
        }
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
                >
                    {/* Background Layer */}
                    <motion.div
                        className="absolute inset-0 bg-black"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                    />

                    {/* Animated Logo - Absolutely Positioned for Seamless Transition */}
                    <motion.div
                        className="absolute top-[30vh] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{
                            scale: [0.5, 1.1, 1],
                            opacity: 1,
                            rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                            duration: 1.5,
                            times: [0, 0.6, 0.8, 1],
                            ease: "easeOut"
                        }}
                    >
                        <motion.img
                            layoutId="shared-logo"
                            src="/logo/WH_LOGO.svg"
                            alt="Swastika Logo"
                            className="w-24 h-24 md:w-32 md:h-32"
                            animate={{
                                filter: [
                                    'drop-shadow(0 0 20px rgba(220, 38, 38, 0.5))',
                                    'drop-shadow(0 0 40px rgba(220, 38, 38, 0.8))',
                                    'drop-shadow(0 0 20px rgba(220, 38, 38, 0.5))',
                                ]
                            }}
                            transition={{
                                layout: { duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] },
                                filter: {
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }
                            }}
                        />
                    </motion.div>

                    {/* Content Container - Pushed down */}
                    <motion.div
                        className="flex flex-col items-center mt-[20vh] relative z-10"
                        exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.5 } }}
                    >
                        {/* Brand Name */}
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-4xl md:text-6xl font-cinzel font-black text-white tracking-tight mb-2"
                        >
                            SWASTIKA<span className="text-accent-main">.</span>26
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7, duration: 0.8 }}
                            className="text-white/60 font-jost text-sm md:text-base tracking-widest uppercase mb-12"
                        >
                            Refining the Future
                        </motion.p>

                        {/* Progress Bar */}
                        <div className="w-64 md:w-80 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-accent-main to-red-600"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>

                        {/* Progress Text */}
                        {/* <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="text-white/40 font-mono text-xs mt-4"
                    >
                        {progress}%
                    </motion.p> */}

                        {/* Loading Dots */}
                        <div className="flex gap-2 mt-8">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 bg-accent-main rounded-full"
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
