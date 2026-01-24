"use client";

import { useFCM } from "@/hooks/use-fcm";
import { Bell, BellRing, Calendar, Zap, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationPermissionRequest() {
    const { permission, requestPermission } = useFCM();
    const [isDismissed, setIsDismissed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Delay showing the modal slightly to not overwhelm on load
    useEffect(() => {
        if (permission === 'default' && !isDismissed) {
            const timer = setTimeout(() => setShowModal(true), 3000);
            return () => clearTimeout(timer);
        }
    }, [permission, isDismissed]);

    const handleEnable = async () => {
        await requestPermission();
        setShowModal(false);
    };

    const handleDismiss = () => {
        setIsDismissed(true);
        setShowModal(false);
    };

    if (permission === 'granted' || permission === 'denied' || !showModal) return null;

    return (
        <AnimatePresence>
            {showModal && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleDismiss}
                        className="fixed inset-0 z-[9990] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90vw] max-w-sm bg-[#111] border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl"
                    >
                        {/* Header Decor */}
                        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-red-600/20 to-transparent pointer-events-none" />
                        <div className="absolute top-[-20%] left-[-20%] w-40 h-40 bg-red-500/30 blur-[60px] rounded-full pointer-events-none" />

                        <div className="relative p-6 md:p-8 flex flex-col items-center text-center">

                            {/* Icon */}
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 relative group border border-white/10">
                                <div className="absolute inset-0 rounded-full bg-red-500/20 animate-ping opacity-20" />
                                <BellRing className="w-8 h-8 text-red-500 relative z-10" />
                            </div>

                            <h2 className="text-2xl font-black font-syne text-white mb-2">
                                Stay Updated!
                            </h2>
                            <p className="text-sm text-white/60 font-jost mb-6 leading-relaxed">
                                Enable notifications to get the latest updates on events and announcements during Swastika 2026.
                            </p>

                            {/* Benefits */}
                            <div className="w-full flex flex-col gap-3 mb-8 text-left">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                        <Zap size={16} />
                                    </div>
                                    <span className="text-sm text-white/80 font-medium">Live Event Updates</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                                        <Bell size={16} />
                                    </div>
                                    <span className="text-sm text-white/80 font-medium">Pro-Show Announcements</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                                        <Calendar size={16} />
                                    </div>
                                    <span className="text-sm text-white/80 font-medium">Schedule Changes</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="w-full flex flex-col gap-3">
                                <button
                                    onClick={handleEnable}
                                    className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold font-syne tracking-wider uppercase transition-colors flex items-center justify-center gap-2"
                                >
                                    <Bell size={18} fill="currentColor" />
                                    Turn On
                                </button>
                                <button
                                    onClick={handleDismiss}
                                    className="w-full py-3 text-white/40 hover:text-white text-xs font-mono tracking-widest uppercase transition-colors"
                                >
                                    Maybe Later
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
