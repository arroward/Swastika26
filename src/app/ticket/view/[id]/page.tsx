"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Ticket, Calendar, CheckCircle2, XCircle, Clock, Share2, Download } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site.config";

interface TicketData {
    ticketId: string;
    purchaseId: string;
    type: "DAY_1" | "DAY_2" | "BOTH_DAYS";
    status: "ACTIVE" | "USED" | "CANCELLED";
    scans: Array<{
        day: "DAY_1" | "DAY_2";
        timestamp: string;
        location: string;
        scannedBy: string;
    }>;
    qrCode: string;
}

const TICKET_CONFIG = {
    DAY_1: {
        label: "Day 1 Pass",
        date: "February 14, 2026",
        color: "from-blue-500 to-blue-700",
        bgGlow: "bg-blue-500/20",
    },
    DAY_2: {
        label: "Day 2 Pass",
        date: "February 15, 2026",
        color: "from-purple-500 to-purple-700",
        bgGlow: "bg-purple-500/20",
    },
    BOTH_DAYS: {
        label: "Both Days Pass",
        date: "Feb 14-15, 2026",
        color: "from-red-500 to-red-700",
        bgGlow: "bg-red-500/20",
    },
};

export default function TicketViewPage() {
    const params = useParams();
    const id = params?.id as string;

    const [ticketData, setTicketData] = useState<TicketData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isTearing, setIsTearing] = useState(false);

    // REAL-TIME LISTENER SIMULATION
    useEffect(() => {
        if (!id) return;

        // FETCH INITIAL DATA
        const fetchTicket = async () => {
            // TODO: Replace with your actual database fetch (e.g., Firestore getDoc)
            setTimeout(() => {
                setTicketData({
                    ticketId: id,
                    purchaseId: "SW-WLT-99X-8B2-V02",
                    type: id.includes("-D1-") ? "DAY_1" : "BOTH_DAYS",
                    status: "ACTIVE",
                    qrCode: id,
                    scans: [],
                });
                setLoading(false);
            }, 500);
        };

        fetchTicket();

        // SUBSCRIBE TO REAL-TIME UPDATES
        // If using Firestore:
        // const unsub = onSnapshot(doc(db, "tickets", id), (doc) => {
        //    const newData = doc.data();
        //    if(newData.status === "USED" && ticketData?.status === "ACTIVE") {
        //        setIsTearing(true);
        //    }
        //    setTicketData(newData);
        // });
        // return () => unsub();

        // FOR DEMO: Simulate a scan after 5 seconds to show real-time tear
        const demoTimer = setTimeout(() => {
            if (window.location.search.includes('demo=true')) {
                setTicketData(prev => {
                    if (prev && prev.status === "ACTIVE") {
                        setIsTearing(true);
                        return { ...prev, status: "USED" };
                    }
                    return prev;
                });
            }
        }, 5000);

        return () => clearTimeout(demoTimer);
    }, [id]);

    const handleScanSimulate = () => {
        if (ticketData?.status === "USED") return;

        const isBothDays = ticketData?.type === "BOTH_DAYS";
        const dayAlreadyScanned = ticketData?.scans.length || 0;

        // If it's a single day pass, or if it's the second scan of a 2-day pass, tear it.
        if (!isBothDays || dayAlreadyScanned >= 1) {
            setIsTearing(true);
        }

        setTimeout(() => {
            setTicketData(prev => {
                if (!prev) return null;
                const newScans = [...prev.scans, {
                    day: dayAlreadyScanned === 0 ? "DAY_1" : "DAY_2" as any,
                    timestamp: new Date().toISOString(),
                    location: "Main Gate",
                    scannedBy: "Digital Scan"
                }];

                return {
                    ...prev,
                    scans: newScans,
                    // Mark as USED only if all allowed days are spent
                    status: (!isBothDays || newScans.length >= 2) ? "USED" : "ACTIVE"
                };
            });
            setIsTearing(false);
        }, 800);
    };

    const getTicketStatus = (day: "DAY_1" | "DAY_2") => {
        if (!ticketData) return null;

        const config = TICKET_CONFIG[ticketData.type];
        const validDays = ticketData.type === "BOTH_DAYS" ? ["DAY_1", "DAY_2"] : [ticketData.type];

        if (!validDays.includes(day)) {
            return { icon: XCircle, text: "Not Valid", color: "text-gray-500", bg: "bg-gray-500/10" };
        }

        const scanned = ticketData.scans.find((s) => s.day === day);
        if (scanned || ticketData.status === "USED") {
            return {
                icon: CheckCircle2,
                text: "Scanned",
                color: "text-green-500",
                bg: "bg-green-500/10",
            };
        }

        return { icon: Clock, text: "Ready to Scan", color: "text-blue-500", bg: "bg-blue-500/10" };
    };

    const shareTicket = () => {
        const url = window.location.href;
        if (navigator.share) {
            navigator.share({
                title: "Swastika 2026 Ticket",
                text: "Here's your ticket for Swastika 2026!",
                url: url,
            });
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url);
            alert("Ticket link copied!");
        } else {
            // Fallback for non-secure contexts/older browsers
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                alert("Ticket link copied!");
            } catch (err) {
                alert("Please copy the link from your browser's address bar.");
            }
            document.body.removeChild(textArea);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading ticket...</p>
                </div>
            </div>
        );
    }

    if (error || !ticketData) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
                <div className="relative mb-8">
                    <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
                    <div className="relative border-2 border-dashed border-gray-700 p-8 rounded-2xl bg-zinc-900/50">
                        <Ticket className="w-20 h-20 text-zinc-500 mx-auto mb-4 opacity-50" />
                        <h2 className="text-3xl font-black tracking-tighter uppercase">Ticket Not Found</h2>
                    </div>
                </div>
                <p className="text-zinc-400 max-w-md">
                    We couldn't find a ticket with ID:{" "}
                    <span className="block mt-2 font-mono text-blue-400 bg-blue-400/10 py-1 px-2 rounded">
                        {id}
                    </span>
                </p>
            </div>
        );
    }

    const config = TICKET_CONFIG[ticketData.type];
    const day1Status = getTicketStatus("DAY_1");
    const day2Status = getTicketStatus("DAY_2");
    const isUsed = ticketData.status === "USED";

    return (
        <div className="min-h-screen bg-[#020202] text-white p-4 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-md relative z-10 transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
                {/* Header Branding */}
                <div className="text-center mb-8">
                    <h1 className="font-cinzel text-xl font-bold tracking-[0.2em] text-white glow-text uppercase">
                        Swastika 2026
                    </h1>
                    <div className="h-px w-12 bg-red-600 mx-auto mt-2" />
                </div>

                {/* Main Ticket Card Wrapper */}
                <div className="relative group">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={isUsed ? "used" : "active"}
                            className="relative"
                            initial={false}
                        >
                            {/* Perspective Glow */}
                            <div className={`absolute -inset-1 bg-gradient-to-r ${config.color} rounded-[2rem] opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500`} />

                            {/* Card Content with Tear Effect */}
                            <div className="relative overflow-hidden rounded-[2rem]">
                                {/* Top Half */}
                                <motion.div
                                    className="relative glass-panel rounded-t-[2rem] border-x border-t border-white/10 shadow-2xl bg-[#0a0a0a]"
                                    animate={isUsed ? {
                                        y: -10,
                                        rotateZ: -2,
                                        transition: { duration: 0.8, ease: "easeOut" }
                                    } : { y: 0, rotateZ: 0 }}
                                >
                                    <div className={`h-1.5 w-full bg-gradient-to-r ${config.color}`} />
                                    <div className="p-8 pb-4 space-y-6">
                                        <div className="text-center space-y-1">
                                            <h2 className="font-syne text-3xl font-black tracking-tighter uppercase italic">
                                                {config.label}
                                            </h2>
                                            <p className="font-jost text-red-500/80 font-bold tracking-widest text-xs uppercase">
                                                {config.date}
                                            </p>
                                        </div>

                                        <div className="relative p-2 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/10">
                                            <div className="relative bg-white p-6 rounded-2xl shadow-[0_0_50px_-12px_rgba(255,255,255,0.3)]">
                                                <QRCodeSVG
                                                    value={`swastika://ticket/${ticketData.ticketId}`}
                                                    size={256}
                                                    level="H"
                                                    className={`w-full h-auto mix-blend-multiply transition-opacity duration-1000 ${isUsed ? 'opacity-20 grayscale' : 'opacity-100'}`}
                                                />
                                                {isUsed && (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <motion.div
                                                            initial={{ scale: 3, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            className="border-4 border-red-600 rounded-lg px-4 py-2 rotate-[-20deg] bg-black/50"
                                                        >
                                                            <span className="text-red-500 font-black text-4xl uppercase font-syne">USED</span>
                                                        </motion.div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Jagged Tear Line (Top side) */}
                                    <div className="absolute bottom-0 left-0 w-full overflow-hidden h-4 pointer-events-none">
                                        <div className="w-full flex">
                                            {[...Array(20)].map((_, i) => (
                                                <div key={i} className="flex-1 h-4 bg-[#020202]" style={{
                                                    clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
                                                    marginLeft: '-1px'
                                                }} />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Bottom Half */}
                                <motion.div
                                    className="relative glass-panel rounded-b-[2rem] border-x border-b border-white/10 shadow-2xl bg-[#0a0a0a]"
                                    animate={isUsed ? {
                                        y: 20,
                                        rotateZ: 1,
                                        transition: { duration: 0.8, ease: "easeOut" }
                                    } : { y: 0, rotateZ: 0 }}
                                >
                                    {/* Jagged Tear Line (Bottom side) */}
                                    <div className="absolute top-0 left-0 w-full overflow-hidden h-4 pointer-events-none transform -translate-y-full">
                                        <div className="w-full h-full flex items-end">
                                            {[...Array(20)].map((_, i) => (
                                                <div key={i} className="flex-1 h-3 bg-[#0a0a0a]" style={{
                                                    clipPath: 'polygon(50% 0, 0 100%, 100% 100%)',
                                                    marginLeft: '-1px'
                                                }} />
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-8 pt-6 space-y-6">
                                        <div className="grid gap-3">
                                            {[day1Status, day2Status].filter(Boolean).map((status, i) => (
                                                <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${status?.bg} border-white/5`}>
                                                    <div className={`p-2 rounded-lg ${status?.color.replace('text-', 'bg-')}/10`}>
                                                        {status && <status.icon className={`w-5 h-5 ${status.color}`} />}
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-jost">
                                                            {i === 0 ? "Day 1 • Feb 14" : "Day 2 • Feb 15"}
                                                        </p>
                                                        <p className={`text-sm font-black italic uppercase ${status?.color}`}>
                                                            {status?.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Footer ID */}
                                        <div className="flex flex-col items-center gap-2 pt-2 opacity-30">
                                            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                                            <p className="text-[8px] font-mono tracking-[0.3em] uppercase">{ticketData.ticketId}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Main Actions */}
                <div className="mt-8 flex flex-col gap-3">
                    <button
                        onClick={shareTicket}
                        className="w-full flex items-center justify-center gap-3 bg-white text-black font-syne font-black uppercase italic py-4 px-6 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl hover:shadow-white/10"
                    >
                        <Share2 className="w-5 h-5" />
                        Share Pass Link
                    </button>

                    <button
                        className="w-full flex items-center justify-center gap-3 bg-zinc-900/50 hover:bg-zinc-800 border border-white/10 text-white font-jost font-bold py-4 px-6 rounded-2xl transition-all"
                    >
                        <Download className="w-5 h-5 text-red-500" />
                        Download PDF Pass
                    </button>

                    {!isUsed && (
                        <button
                            onClick={handleScanSimulate}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-syne font-black uppercase italic py-4 px-6 rounded-2xl transition-all animate-pulse"
                        >
                            Simulate Scan (Demo)
                        </button>
                    ) || (
                            <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                                <p className="text-green-500 font-syne font-bold uppercase italic tracking-wider">
                                    Entry Registered
                                </p>
                            </div>
                        )}
                </div>

                {/* Guidelines */}
                <div className="mt-8 p-6 glass-panel rounded-[2rem] border border-white/5">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-red-600/10 rounded-lg">
                            <Calendar className="w-5 h-5 text-red-500" />
                        </div>
                        <h3 className="font-syne font-bold text-sm uppercase tracking-wider">Entry Guidelines</h3>
                    </div>
                    <ul className="grid gap-3">
                        {[
                            "Present this QR code for verification",
                            "Torn or Scanned status is permanent",
                            "Screenshots are not recommended",
                            "Arrive 30 mins before sessions start"
                        ].map((text, i) => (
                            <li key={i} className="flex gap-3 text-xs text-gray-500 font-jost leading-relaxed">
                                <span className="text-red-600 font-bold">•</span>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Support & Wallet Link */}
                <div className="mt-8 flex flex-col items-center gap-4 pb-12">
                    <Link
                        href={`/wallet/${ticketData.purchaseId}`}
                        className="text-[10px] font-jost font-bold text-red-500/60 uppercase tracking-[0.2em] hover:text-red-500 transition-colors border-b border-red-500/20 pb-1"
                    >
                        View Order Details & Receipt
                    </Link>
                    <p className="text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-jost text-center">
                        Order ID: {ticketData.purchaseId} <br />
                        Need help? Contact <span className="text-zinc-400">{siteConfig.contact.email}</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
