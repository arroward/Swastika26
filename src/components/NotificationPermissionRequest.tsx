"use client";

import { useFCM } from "@/hooks/use-fcm";
import { BellRing } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function NotificationPermissionRequest() {
    const { permission, requestPermission } = useFCM();
    const [isDismissed, setIsDismissed] = useState(false);

    // If already granted, or ignored, or denied, don't show floating button
    // Actually, user might want to manually enable it later if dismissed.
    // For now, let's hide if granted or explicitly dismissed in this session.
    if (permission === 'granted' || isDismissed || permission === 'denied') return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="fixed bottom-6 left-6 z-[9998] flex items-center gap-3 p-3 rounded-full bg-neutral-900/80 border border-white/10 backdrop-blur-md hover:bg-neutral-900 transition-colors cursor-pointer group"
                onClick={() => {
                    requestPermission();
                    setIsDismissed(true); // dismiss UI after click, regardless of outcome for now
                }}
            >
                <div className="p-2 rounded-full bg-white/10 group-hover:bg-red-600 group-hover:text-white transition-colors text-white/70">
                    <BellRing size={20} />
                </div>
                <span className="text-sm font-mono text-white/70 pr-2 group-hover:text-white transition-colors">
                    Enable Notifications
                </span>
            </motion.div>
        </AnimatePresence>
    );
}
