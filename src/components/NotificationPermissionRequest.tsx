"use client";

import { useFCM } from "@/hooks/use-fcm";
import { Bell, BellRing, Calendar, Zap, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site.config";

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
                        className="fixed inset-0 z-[9990] bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[95vw] md:w-full md:max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl"
                    >
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-red-900/40 via-red-900/10 to-transparent pointer-events-none" />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} // Smoother, slower breathing
                            className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full pointer-events-none will-change-transform"
                        />

                        <div className="relative p-5 md:p-8 flex flex-col items-center text-center">

                            {/* Animated Icon Container */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                                className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-4 md:mb-6 relative group border border-white/10 shadow-[0_0_30px_-10px_rgba(220,38,38,0.5)] will-change-transform"
                            >
                                <div className="absolute inset-0 rounded-2xl bg-red-500/20 animate-ping opacity-20 duration-1000" />
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ repeat: Infinity, repeatDelay: 2, duration: 1.5, ease: "easeInOut" }} // Smoother wobble
                                    className="will-change-transform"
                                >
                                    <img src={siteConfig.logos.main} alt="Swastika Logo" className="w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mb-2 md:mb-3"
                            >
                                <h3 className="text-xs font-mono tracking-[0.3em] text-red-500 uppercase mb-1">
                                    {siteConfig.year} Edition
                                </h3>
                                <h2 className="text-2xl md:text-3xl font-black font-cinzel text-white tracking-tight">
                                    DON'T MISS THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">ACTION</span>
                                </h2>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-xs md:text-sm text-white/60 font-jost mb-6 md:mb-8 leading-relaxed max-w-[280px] md:max-w-xs mx-auto"
                            >
                                Get instant updates on <b>Pro-shows</b>, <b>Event schedules</b>, and exclusive <b>Swastika</b> announcements.
                            </motion.p>

                            {/* Benefits Grid */}
                            <div className="w-full grid gap-2.5 md:gap-3 mb-6 md:mb-8">
                                <BenefitItem
                                    icon={<Zap size={16} className="md:w-[18px] md:h-[18px]" />}
                                    title="Instant Updates"
                                    desc="Real-time alerts for live events"
                                    color="bg-yellow-500/20 text-yellow-400"
                                    delay={0.4}
                                />
                                <BenefitItem
                                    icon={<Bell size={16} className="md:w-[18px] md:h-[18px]" />}
                                    title="Exclusive Reveals"
                                    desc="Artist announcements first"
                                    color="bg-red-500/20 text-red-400"
                                    delay={0.5}
                                />
                                <BenefitItem
                                    icon={<Calendar size={16} className="md:w-[18px] md:h-[18px]" />}
                                    title="Schedule Info"
                                    desc="Stay on track with timings"
                                    color="bg-blue-500/20 text-blue-400"
                                    delay={0.6}
                                />
                            </div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="w-full flex flex-col gap-2 md:gap-3"
                            >
                                <motion.button
                                    onClick={handleEnable}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-bold font-syne text-xs md:text-sm tracking-wider uppercase transition-all shadow-[0_4px_20px_-5px_rgba(220,38,38,0.5)] hover:shadow-[0_8px_30px_-5px_rgba(220,38,38,0.6)] flex items-center justify-center gap-2 group border border-red-500/20"
                                >
                                    <Bell size={16} className="group-hover:rotate-12 transition-transform md:w-[18px] md:h-[18px]" />
                                    Enable Notifications
                                </motion.button>
                                <motion.button
                                    onClick={handleDismiss}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-2.5 md:py-3 text-white/30 hover:text-white text-[10px] md:text-xs font-mono tracking-widest uppercase transition-colors"
                                >
                                    Skip for Now
                                </motion.button>
                            </motion.div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

function BenefitItem({ icon, title, desc, color, delay }: { icon: any, title: string, desc: string, color: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5, ease: "easeOut" }}
            className="flex items-center gap-3 md:gap-4 p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-left group"
        >
            <div className={`p-2 md:p-2.5 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div>
                <h4 className="text-white font-syne font-bold text-xs md:text-sm tracking-wide">{title}</h4>
                <p className="text-white/40 text-[10px] md:text-xs font-jost">{desc}</p>
            </div>
        </motion.div>
    );
}
