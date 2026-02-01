"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Ticket, Share2, Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";

interface TicketData {
    ticketId: string;
    purchaseId: string;
    type: "DAY_1" | "DAY_2" | "BOTH_DAYS";
    status: "ACTIVE" | "USED" | "CANCELLED";
    scans: Array<{
        day: "DAY_1" | "DAY_2";
        timestamp: string;
        location: string;
    }>;
}

interface WalletData {
    purchaseId: string;
    email: string;
    totalAmount: number;
    tickets: TicketData[];
    purchaseDate: string;
}

const TICKET_CONFIG = {
    DAY_1: {
        label: "Day 1 Pass",
        price: 50,
        color: "from-blue-500 to-blue-700",
        days: ["DAY_1"],
    },
    DAY_2: {
        label: "Day 2 Pass",
        price: 60,
        color: "from-purple-500 to-purple-700",
        days: ["DAY_2"],
    },
    BOTH_DAYS: {
        label: "Both Days Pass",
        price: 110,
        color: "from-red-500 to-red-700",
        days: ["DAY_1", "DAY_2"],
    },
};

export default function WalletPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const [walletData, setWalletData] = useState<WalletData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        // TODO: Replace with actual API call
        // fetch(`/api/wallet/${id}`)
        //     .then(res => res.json())
        //     .then(data => setWalletData(data))
        //     .catch(err => setError(err.message))
        //     .finally(() => setLoading(false));

        // Mock data reflecting a full purchase with multiple ticket types
        setTimeout(() => {
            setWalletData({
                purchaseId: "SW-WLT-99X-8B2-V02",
                email: "bibinraju451@gmail.com",
                totalAmount: 380, // (110*2) + (50*2) + (60*1) = 380
                purchaseDate: new Date().toISOString(),
                tickets: [
                    {
                        ticketId: "SW26-CM-7F1A-B2D4-9E0C",
                        purchaseId: "SW-WLT-99X-8B2-V02",
                        type: "BOTH_DAYS",
                        status: "ACTIVE",
                        scans: [],
                    },
                    {
                        ticketId: "SW26-CM-8H2B-C3E5-A1FD",
                        purchaseId: "SW-WLT-99X-8B2-V02",
                        type: "BOTH_DAYS",
                        status: "USED",
                        scans: [
                            { day: "DAY_1", timestamp: new Date().toISOString(), location: "Main Gate" },
                            { day: "DAY_2", timestamp: new Date().toISOString(), location: "VIP Gate" }
                        ],
                    },
                    {
                        ticketId: "SW26-D1-3A9F-1C88-5D2B",
                        purchaseId: "SW-WLT-99X-8B2-V02",
                        type: "DAY_1",
                        status: "ACTIVE",
                        scans: [],
                    },
                    {
                        ticketId: "SW26-D1-4B0G-2D99-6E3C",
                        purchaseId: "SW-WLT-99X-8B2-V02",
                        type: "DAY_1",
                        status: "ACTIVE",
                        scans: [],
                    },
                    {
                        ticketId: "SW26-D2-5C1H-3E00-7F4D",
                        purchaseId: "SW-WLT-99X-8B2-V02",
                        type: "DAY_2",
                        status: "ACTIVE",
                        scans: [],
                    },
                ],
            });
            setLoading(false);
        }, 500);
    }, [id]);

    const getTicketStatus = (ticket: TicketData, day: "DAY_1" | "DAY_2") => {
        const config = TICKET_CONFIG[ticket.type];
        if (!config.days.includes(day)) {
            return { icon: XCircle, text: "Not Valid", color: "text-gray-500" };
        }

        const scanned = ticket.scans.find((s) => s.day === day);
        if (scanned) {
            return { icon: CheckCircle2, text: "Used", color: "text-green-500" };
        }

        return { icon: Clock, text: "Ready", color: "text-blue-500" };
    };

    const shareTicket = (ticketId: string) => {
        const url = `${window.location.origin}/ticket/view/${ticketId}`;
        if (navigator.share) {
            navigator.share({
                title: "Swastika 2026 Ticket",
                text: "Here's your ticket for Swastika 2026!",
                url: url,
            });
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url);
            alert("Ticket link copied to clipboard!");
        } else {
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                alert("Ticket link copied!");
            } catch (err) {
                alert("URL: " + url);
            }
            document.body.removeChild(textArea);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-white text-center">
                    <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-gray-400">Loading your wallet...</p>
                </div>
            </div>
        );
    }

    if (error || !walletData) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white p-4">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-500 mb-2">Wallet Not Found</h1>
                    <p className="text-gray-400">{error || "Unable to load wallet"}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />

            {/* Header */}
            <div className="relative pt-12 pb-8 px-6 text-center border-b border-white/5 bg-black/40 backdrop-blur-md">
                <div className="max-w-4xl mx-auto">
                    <h1 className="font-cinzel text-2xl font-black tracking-[0.3em] uppercase glow-text mb-2">
                        My Wallet
                    </h1>
                    <div className="flex flex-col items-center gap-1">
                        <p className="font-jost text-[10px] text-zinc-500 uppercase tracking-widest bg-zinc-900/50 px-3 py-1 rounded-full border border-white/5">
                            Order #{walletData.purchaseId}
                        </p>
                        <p className="font-jost text-xs text-zinc-400 mt-2">
                            Purchased on {new Date(walletData.purchaseDate).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tickets Grid */}
            <div className="max-w-4xl mx-auto p-6 space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {walletData.tickets.map((ticket, index) => {
                        const config = TICKET_CONFIG[ticket.type];
                        const StatusDay1 = getTicketStatus(ticket, "DAY_1");
                        const StatusDay2 = getTicketStatus(ticket, "DAY_2");

                        return (
                            <div
                                key={ticket.ticketId}
                                className="group relative overflow-hidden rounded-[2rem] transition-all duration-500 hover:scale-[1.02]"
                            >
                                {/* Glow Background */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-br ${config.color} opacity-10 group-hover:opacity-25 blur-xl transition-opacity animate-pulse`} />

                                <div className="relative glass-panel rounded-[2rem] border border-white/10 overflow-hidden flex flex-col h-full">
                                    {/* Ticket Header */}
                                    <div className={`bg-gradient-to-r ${config.color} p-6 pb-12`}>
                                        <div className="flex items-start justify-between">
                                            <div className="space-y-1">
                                                <div className="bg-white/20 w-fit p-2 rounded-xl backdrop-blur-md mb-3 border border-white/10">
                                                    <Ticket className="w-5 h-5 text-white" />
                                                </div>
                                                <h3 className="font-syne font-black text-2xl tracking-tighter uppercase italic leading-none">
                                                    {config.label}
                                                </h3>
                                                <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest font-jost">
                                                    Pass #{index + 1} • {ticket.ticketId}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-syne font-black text-2xl italic tracking-tighter glow-text">₹{config.price}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Ticket Content (Negative margin to overlap header) */}
                                    <div className="flex-1 p-6 -mt-6 bg-[#0a0a0a] rounded-t-[2.5rem] border-t border-white/5 space-y-6">

                                        {/* Status Row */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-zinc-900/50 rounded-2xl p-3 border border-white/5">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <StatusDay1.icon className={`w-3.5 h-3.5 ${StatusDay1.color}`} />
                                                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Day 1</span>
                                                </div>
                                                <p className={`text-xs font-black italic uppercase ${StatusDay1.color}`}>{StatusDay1.text}</p>
                                            </div>
                                            <div className="bg-zinc-900/50 rounded-2xl p-3 border border-white/5">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <StatusDay2.icon className={`w-3.5 h-3.5 ${StatusDay2.color}`} />
                                                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Day 2</span>
                                                </div>
                                                <p className={`text-xs font-black italic uppercase ${StatusDay2.color}`}>{StatusDay2.text}</p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3 pt-2">
                                            <Link
                                                href={`/ticket/view/${ticket.ticketId}`}
                                                className="flex-1 bg-white text-black font-syne font-black uppercase italic text-sm py-4 rounded-2xl text-center transition-all hover:bg-zinc-200 active:scale-95 shadow-xl"
                                            >
                                                View QR Code
                                            </Link>
                                            <button
                                                onClick={() => shareTicket(ticket.ticketId)}
                                                className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-white p-4 rounded-2xl transition-all active:scale-95"
                                            >
                                                <Share2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary Section */}
                <div className="mt-12 group">
                    <div className="relative glass-panel rounded-[2rem] border border-white/5 p-8 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 blur-[80px] rounded-full -mr-32 -mt-32" />
                        <div className="relative flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left space-y-1">
                                <h4 className="font-syne font-black text-xl uppercase italic tracking-tighter">Order Summary</h4>
                                <p className="font-jost text-sm text-zinc-500 italic uppercase tracking-widest">Payment completed successfully</p>
                            </div>
                            <div className="flex flex-col items-center md:items-end">
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] font-jost mb-1">Total Amount Paid</p>
                                <p className="font-syne font-black text-5xl text-red-500 italic glow-text tracking-tighter">
                                    ₹{walletData.totalAmount}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Support Link */}
                    <div className="mt-8 text-center pb-12">
                        <p className="font-jost text-[10px] text-zinc-600 uppercase tracking-[0.3em]">
                            Need assistance with your purchase?
                            <a href="mailto:swastika26@mbcpeermade.com" className="text-zinc-400 ml-2 hover:text-white transition-colors">Contact Support</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
