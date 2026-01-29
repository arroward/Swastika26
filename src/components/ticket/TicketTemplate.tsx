import React, { useRef, useState } from 'react';
import { Ticket, Calendar, Clock, MapPin, User, Hash, Download, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Individual Ticket Card Component ---

interface TicketCardProps {
    userName: string;
    bookingId: string;
    ticketType: 'combo' | 'day1' | 'day2' | 'mixed' | 'unknown';
    index: number;
    totalTickets: number;
}

const TicketCard: React.FC<TicketCardProps> = ({
    userName,
    bookingId,
    ticketType,
    index,
    totalTickets
}) => {
    const getTicketLabel = (type: string) => {
        switch (type) {
            case 'combo': return 'ALL ACCESS PASS';
            case 'day1': return 'DAY 1 PASS';
            case 'day2': return 'DAY 2 PASS';
            default: return 'EVENT PASS';
        }
    };

    const getDateLabel = (type: string) => {
        switch (type) {
            case 'combo': return 'FEB 20-21';
            case 'day1': return 'FEB 20';
            case 'day2': return 'FEB 21';
            default: return 'FEB 20-21';
        }
    };

    // Generate unique visuals based on type
    const getGradient = (type: string) => {
        switch (type) {
            case 'combo': return 'from-amber-900/40 to-black'; // Gold/Premium feel
            case 'day1': return 'from-blue-900/40 to-black';
            case 'day2': return 'from-purple-900/40 to-black';
            default: return 'from-neutral-900 to-black';
        }
    };

    const uniqueId = `${bookingId}-${index + 1}`;

    return (
        <div className="relative w-full max-w-sm mx-auto flex-shrink-0 snap-center">
            <div
                className={`relative w-full rounded-3xl bg-gradient-to-br ${getGradient(ticketType)} border border-white/10 overflow-hidden shadow-2xl transition-all duration-300`}
                style={{ minHeight: '580px' }}
            >
                {/* Background decorations */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                {/* Holographic noise texture overlay */}
                <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay pointer-events-none" />

                {/* Content */}
                <div className="relative z-10 p-6 flex flex-col h-full justify-between">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div className="bg-white/5 border border-white/10 p-2 rounded-xl backdrop-blur-md">
                            <Ticket className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-right">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/5">
                                <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                                    Ticket {index + 1} of {totalTickets}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Main Title Area */}
                    <div className="mt-8">
                        <p className="text-white/50 text-xs font-mono tracking-widest uppercase mb-2">SWASTIKA 26</p>
                        <h2 className="text-3xl font-black text-white leading-none tracking-tighter uppercase break-words drop-shadow-lg">
                            {getTicketLabel(ticketType)}
                        </h2>
                    </div>

                    {/* QR Placeholder / Visual */}
                    <div className="flex-1 flex items-center justify-center py-6">
                        <div className="relative w-48 h-48 bg-white p-2 rounded-xl shadow-lg rotate-0 sm:rotate-0 transition-transform hover:rotate-2">
                            <div className="w-full h-full bg-black flex items-center justify-center rounded-lg overflow-hidden relative">
                                {/* Simulated QR */}
                                <div className="absolute inset-0 bg-white p-1 flex flex-wrap content-start">
                                    {Array.from({ length: 120 }).map((_, i) => (
                                        <div key={i} className={`w-[8.33%] h-[8.33%] ${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`} />
                                    ))}
                                    <div className="absolute top-0 left-0 w-8 h-8 border-4 border-black bg-white z-10">
                                        <div className="absolute inset-1 bg-black"></div>
                                    </div>
                                    <div className="absolute top-0 right-0 w-8 h-8 border-4 border-black bg-white z-10">
                                        <div className="absolute inset-1 bg-black"></div>
                                    </div>
                                    <div className="absolute bottom-0 left-0 w-8 h-8 border-4 border-black bg-white z-10">
                                        <div className="absolute inset-1 bg-black"></div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white p-1 rounded">
                                        <Ticket className="w-6 h-6 text-black" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                                    <User className="w-3 h-3" /> Name
                                </p>
                                <p className="text-white text-sm font-bold truncate">{userName}</p>
                            </div>

                            <div>
                                <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                                    <Calendar className="w-3 h-3" /> Date
                                </p>
                                <p className="text-white text-sm font-bold">{getDateLabel(ticketType)}</p>
                            </div>

                            <div className="col-span-2 pt-2 border-t border-white/5 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1 flex items-center gap-1">
                                        <Clock className="w-3 h-3" /> Time
                                    </p>
                                    <p className="text-white text-sm font-bold">09:00 AM</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                                        Venue
                                    </p>
                                    <p className="text-white text-sm font-bold">MBCET</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Barcode Strip */}
                    <div className="mt-6 flex flex-col items-center">
                        <p className="font-mono text-[10px] text-white/40 tracking-wider mb-1">BOOKING ID</p>
                        <p className="text-center text-sm text-white font-mono tracking-widest">{uniqueId}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Main Wallet Wrapper Component ---

interface TicketTemplateProps {
    userName: string;
    bookingId: string;
    totalAmount: number;
    ticketType: 'combo' | 'day1' | 'day2' | 'mixed' | 'unknown';
    count: number;
    tickets?: {
        day1: number;
        day2: number;
        combo: number;
    };
}

const TicketWallet: React.FC<TicketTemplateProps> = ({
    userName,
    bookingId,
    ticketType,
    count,
    tickets
}) => {
    // 1. Expand tickets into a flat array
    const expandedTickets: Array<{ type: string; id: string }> = [];

    if (tickets) {
        // New schema
        const types = ['combo', 'day1', 'day2'] as const;
        types.forEach(type => {
            const qty = tickets[type] || 0;
            for (let i = 0; i < qty; i++) {
                expandedTickets.push({ type, id: `${bookingId}-${type}-${i}` });
            }
        });
    } else {
        // Legacy fallback
        for (let i = 0; i < count; i++) {
            expandedTickets.push({ type: ticketType, id: `${bookingId}-${i}` });
        }
    }

    // Default if something is wrong
    if (expandedTickets.length === 0) {
        expandedTickets.push({ type: ticketType, id: bookingId });
    }

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
            <div className="w-full text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-black text-white mb-2">YOUR WALLET</h1>
                <p className="text-white/50 text-sm">Swipe to view your passes</p>
            </div>

            {/* Scrollable Container (Horizontal Snap) */}
            <div className="relative w-full overflow-hidden pb-8">
                <div
                    className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-8 pb-8 no-scrollbar touch-pan-x"
                    style={{ scrollPaddingLeft: '2rem', scrollPaddingRight: '2rem' }}
                >
                    {expandedTickets.map((ticket, idx) => (
                        <TicketCard
                            key={idx}
                            userName={userName}
                            bookingId={bookingId}
                            ticketType={ticket.type as any}
                            index={idx}
                            totalTickets={expandedTickets.length}
                        />
                    ))}
                </div>

                {/* Fade Gradients for visual scrolling cues if needed */}
                <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black to-transparent pointer-events-none md:w-32" />
                <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-black to-transparent pointer-events-none md:w-32" />
            </div>

            {/* Pagination Indicators */}
            {expandedTickets.length > 1 && (
                <div className="flex gap-2 mb-8">
                    {/* Note: Active index tracking with native scroll is tricky without listeners, so we use simplified dots here or user interaction */}
                    {/* For a true sync, we'd need intersection observer. For now, simple static dots or just text is fine. */}
                    <p className="text-white/30 text-xs font-mono">{expandedTickets.length} Passes Available</p>
                </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-4 w-full justify-center max-w-sm px-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                    <Download className="w-5 h-5" /> Download All
                </button>
            </div>
            <p className="text-white/40 text-xs text-center mt-6 max-w-md px-4">
                Verify each ticket at the entrance. Swiping works best on mobile devices.
            </p>
        </div>
    );
};

export default TicketWallet;
