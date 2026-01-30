"use client";

import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowLeft, Bug, AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [blameCount, setBlameCount] = useState(0);
    const [message, setMessage] = useState("Even the Oracle didn't see this coming.");
    const [debris, setDebris] = useState<Array<{ id: number; left: number; top: number; x: number; y: number; size: number; duration: number }>>([]);

    // Debris generation
    useEffect(() => {
        setDebris(
            [...Array(5)].map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                x: Math.random() * 1000,
                y: Math.random() * 1000,
                size: 24 + Math.random() * 48,
                duration: 10 + Math.random() * 20
            }))
        );
    }, []);

    // Mouse follower effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const handleBlame = () => {
        setBlameCount(prev => prev + 1);
        const excuses = [
            "It works on my machine!",
            "Maybe if you refresh 5 more times?",
            "I swear it was here a second ago.",
            "A cosmic ray flipped a bit. Unlucky.",
            "The dog ate the servers.",
            "Have you tried turning it off and on again?",
            "Okay, now you're just being mean.",
        ];
        setMessage(excuses[blameCount % excuses.length]);
    };

    return (
        <main className="relative min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center overflow-hidden selection:bg-red-500/30 font-sans">

            {/* Background Grid & Noise */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] brightness-100 contrast-150" />
            </div>

            {/* Spotlight Effect */}
            <motion.div
                className="absolute w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-screen"
                animate={{
                    x: mousePosition.x - 300,
                    y: mousePosition.y - 300,
                }}
                transition={{ type: "spring", damping: 30, stiffness: 50, mass: 0.1 }}
            />

            <div className="relative z-10 flex flex-col items-center text-center px-4 w-full max-w-4xl mx-auto space-y-8">

                {/* 404 SVG or Text */}
                <div className="relative group perspective-1000">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[120px] md:text-[200px] font-black font-syne tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 leading-none select-none drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                    >
                        404
                    </motion.h1>
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                        className="absolute -top-6 -right-6 md:top-4 md:right-4 bg-red-600 text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full border border-red-400 transform rotate-12 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                    >
                        Oops!
                    </motion.div>
                </div>

                {/* Funny Message */}
                <div className="space-y-4 max-w-xl mx-auto">
                    <motion.div
                        key={message}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="min-h-[60px]"
                    >
                        <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-white mb-2">
                            Lost in the Void?
                        </h2>
                        <p className="text-red-400 font-mono text-sm md:text-base border border-red-900/50 bg-red-900/10 p-3 rounded-lg">
                            {`> ${message}`}
                        </p>
                    </motion.div>

                    <p className="text-white/50 font-jost text-sm leading-relaxed">
                        You've reached the edge of the internet. There's nothing here but pixels and regret.
                        Navigate back to safety before the bugs find you.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <Link href="/">
                        <button className="group relative px-8 py-3 bg-white text-black font-syne font-bold uppercase tracking-wider rounded-lg overflow-hidden transition-all hover:scale-105 active:scale-95">
                            <div className="absolute inset-0 bg-red-500 w-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left" />
                            <span className="relative group-hover:text-white flex items-center gap-2">
                                <Home size={18} />
                                Teleport Home
                            </span>
                        </button>
                    </Link>

                    <button
                        onClick={handleBlame}
                        className="px-8 py-3 border border-white/10 hover:bg-white/5 rounded-lg text-white/70 hover:text-white font-syne font-bold uppercase tracking-wider transition-all flex items-center gap-2 hover:border-red-500/50 hover:text-red-400"
                    >
                        <Bug size={18} />
                        Blame The Dev
                    </button>
                </div>

            </div>

            {/* Floating Elements (Space Debris) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {debris.map((item) => (
                    <motion.div
                        key={item.id}
                        className="absolute text-white/5"
                        initial={{
                            x: item.x,
                            y: item.y,
                            rotate: 0
                        }}
                        animate={{
                            y: [0, -100, 0],
                            rotate: 360,
                        }}
                        transition={{
                            duration: item.duration,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        style={{
                            left: `${item.left}%`,
                            top: `${item.top}%`,
                        }}
                    >
                        <AlertTriangle size={item.size} />
                    </motion.div>
                ))}
            </div>
        </main>
    );
}
