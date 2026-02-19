"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message?: string;
}

export default function AlertModal({ isOpen, onClose, title, message }: AlertModalProps) {
    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                        className="relative w-full max-w-sm bg-gradient-to-b from-[#1a1a1a] to-black border border-red-500/20 rounded-2xl overflow-hidden shadow-2xl"
                    >
                        {/* Top accent line */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

                        <div className="p-6 text-center">
                            {/* Icon Container */}
                            <div className="mx-auto w-16 h-16 bg-red-600/10 rounded-full flex items-center justify-center mb-4 border border-red-500/20">
                                <AlertCircle className="w-8 h-8 text-red-500" />
                            </div>

                            {/* Text */}
                            <h3 className="text-2xl font-black font-cinzel text-white mb-2 tracking-tight">
                                {title}
                            </h3>
                            {message && (
                                <p className="text-white/60 font-jost text-sm mb-6">
                                    {message}
                                </p>
                            )}

                            {/* Action Button */}
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold font-syne text-sm uppercase tracking-wider transition-all shadow-[0_4px_20px_-5px_rgba(220,38,38,0.5)] active:scale-95"
                            >
                                Got it
                            </button>
                        </div>

                        {/* Close button (top right) */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors p-1"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
