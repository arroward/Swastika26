"use client";

import { motion } from "framer-motion";
import { Hammer, Wrench, Power, Clock } from "lucide-react";

export default function MaintenancePage() {
    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center p-4">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-red-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-red-800/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-grid opacity-20" />
            </div>

            {/* Central Content */}
            <div className="relative z-10 max-w-2xl w-full text-center space-y-8">

                {/* Glitchy Text Header */}
                <div className="space-y-2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-cinzel text-5xl md:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 uppercase">
                            Under <br />
                            <span className="text-red-600 glow-text">Maintenance</span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="h-px w-32 bg-gradient-to-r from-transparent via-red-500 to-transparent mx-auto"
                    />
                </div>

                {/* Animated Icons */}
                <div className="flex justify-center gap-8 py-8">
                    <motion.div
                        animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <Wrench className="w-8 h-8 text-red-500" />
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm relative"
                    >
                        <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full animate-pulse" />
                        <Power className="w-8 h-8 text-white relative z-10" />
                    </motion.div>

                    <motion.div
                        animate={{
                            rotate: [0, -45, 0],
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            repeatType: "mirror"
                        }}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    >
                        <Hammer className="w-8 h-8 text-red-500" />
                    </motion.div>
                </div>

                {/* Status Message */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-4"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-900/20 border border-red-500/30 text-red-200 text-sm font-mono uppercase tracking-widest">
                        <Clock className="w-3 h-3 animate-spin duration-3000" />
                        <span>Estimated Return: Shortly</span>
                    </div>

                    <p className="text-white/60 font-jost text-lg max-w-md mx-auto leading-relaxed">
                        We are currently upgrading our systems to provide you with a smoother experience. The gates will reopen soon.
                    </p>
                </motion.div>

                {/* Contact Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="pt-12"
                >
                    <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-jost">
                        Swastika 2026 • System Upgrade In Progress
                    </p>
                </motion.div>
            </div>
        </main>
    );
}
