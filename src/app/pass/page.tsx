'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase'; // Ensure this path is correct based on previous view_file
import Link from 'next/link';
import { proshowContent } from '@/data/content';

export default function PassPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeInfo, setActiveInfo] = useState<'day1' | 'day2' | 'combo' | null>(null);
    const [showPaymentReminder, setShowPaymentReminder] = useState(false);

    // Selection State: Cart
    const [cart, setCart] = useState<{ day1: number; day2: number; combo: number }>({
        day1: 0,
        day2: 0,
        combo: 0
    });

    const PASS_DETAILS = {
        day1: {
            title: `Day 1 Access - ${proshowContent.artists[0].date}`,
            artist: proshowContent.artists[0].name,
            genre: proshowContent.artists[0].role,
            description: `Experience the energy of ${proshowContent.artists[0].name} live! Your pass grants you entry to the Day 1 Proshow.`,
           
        },
        day2: {
            title: `Day 2 Access - ${proshowContent.artists[1].date}`,
            artist: proshowContent.artists[1].name,
            genre: proshowContent.artists[1].role,
            description: `Get ready for the electrifying performance of ${proshowContent.artists[1].name}! Don't miss the biggest night of Swastika '26.`,
            
        },
        combo: {
            title: "All Access Combo",
            artist: `${proshowContent.artists[0].name} + ${proshowContent.artists[1].name}`,
            genre: "Full Event Experience",
            description: "The ultimate Swastika experience! Get seamless access to both proshows.",
           
        }
    };

    // User Data State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        transactionId: ''
    });

    // Pricing Constants
    const PRICES = {
        day1: 50,
        day2: 60,
        combo: 110
    };

    const currentPrice = (cart.day1 * PRICES.day1) + (cart.day2 * PRICES.day2) + (cart.combo * PRICES.combo);
    const totalTickets = cart.day1 + cart.day2 + cart.combo;

    const upiId = "swastika26@ybl";
    const payeeName = "Swastika26";
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${currentPrice}&cu=INR&tn=SWASTIKA26-PASS`;

    const updateCart = (type: 'day1' | 'day2' | 'combo', delta: number) => {
        setCart(prev => ({
            ...prev,
            [type]: Math.max(0, prev[type] + delta)
        }));
    };

    const handleNext = () => {
        setError('');
        if (step === 1) {
            if (totalTickets === 0) {
                setError('Please select at least one ticket.');
                return;
            }
            setStep(2);
        } else if (step === 2) {
            if (!formData.name || !formData.email || !formData.phone) {
                setError('Please fill in all details.');
                return;
            }
            setStep(3);
        } else if (step === 3) {
            setStep(4);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.transactionId) {
            setError('Please enter the transaction ID.');
            return;
        }

        setLoading(true);

        try {
            // Add to Firebase with new schema
            await addDoc(collection(db, 'proshow_passes'), {
                ...formData,
                tickets: cart, // Store the breakdown
                totalAmount: currentPrice,
                status: 'pending',
                admitted: {
                    day1: 0, // Integer counter
                    day2: 0  // Integer counter
                },
                createdAt: serverTimestamp(),
            });

            setStep(5); // Success
        } catch (err) {
            console.error('Error submitting pass:', err);
            setError('Something went wrong. Please try again or contact support.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen pt-24 pb-12 px-4 md:px-8 bg-black text-white selection:bg-red-500/30">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-5xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                        Get Your Pass
                    </h1>
                    <p className="text-white/40 font-jost uppercase tracking-widest text-sm">
                        Proshow Access • Swastika '26
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="flex justify-center items-center gap-4 text-sm font-mono text-white/30 hidden md:flex">
                    <span className={step >= 1 ? "text-red-500" : ""}>01 Selection</span>
                    <span>→</span>
                    <span className={step >= 2 ? "text-red-500" : ""}>02 Details</span>
                    <span>→</span>
                    <span className={step >= 3 ? "text-red-500" : ""}>03 Preview</span>
                    <span>→</span>
                    <span className={step >= 4 ? "text-red-500" : ""}>04 Payment</span>
                </div>
                {/* Mobile Progress */}
                <div className="flex justify-center items-center gap-2 text-xs font-mono text-white/30 md:hidden md:mb-0 mb-4">
                    Step <span className="text-red-500">{step}</span> of 4
                </div>

                {/* Content Container */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-sm">

                    {step === 1 && (
                        <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center space-y-2 mb-2">
                                <h2 className="text-2xl font-cinzel text-white">Select Tickets</h2>
                                <p className="text-white/40 text-xs">Choose passes for you and your friends</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {/* Day 1 Option */}
                                <div className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 text-center relative group/card ${cart.day1 > 0 ? 'bg-red-900/20 border-red-500' : 'bg-white/5 border-white/10'}`}>
                                    <button
                                        onClick={() => setActiveInfo('day1')}
                                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center text-xs text-white/60 hover:text-white transition-colors z-20"
                                        title="View Details"
                                    >
                                        i
                                    </button>
                                    <div>
                                        <span className="text-sm font-jost font-bold uppercase text-white/80 block">Day 1</span>
                                        <span className="text-2xl font-cinzel font-black text-white block">₹{PRICES.day1}</span>
                                       
                                    </div>
                                    <div className="flex items-center gap-3 bg-black/40 rounded-full p-1 border border-white/10">
                                        <button onClick={() => updateCart('day1', -1)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white">-</button>
                                        <span className="text-lg font-mono font-bold w-6">{cart.day1}</span>
                                        <button onClick={() => updateCart('day1', 1)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white">+</button>
                                    </div>
                                </div>

                                {/* Day 2 Option */}
                                <div className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 text-center relative group/card ${cart.day2 > 0 ? 'bg-red-900/20 border-red-500' : 'bg-white/5 border-white/10'}`}>
                                    <button
                                        onClick={() => setActiveInfo('day2')}
                                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center text-xs text-white/60 hover:text-white transition-colors z-20"
                                        title="View Details"
                                    >
                                        i
                                    </button>
                                    <div>
                                        <span className="text-sm font-jost font-bold uppercase text-white/80 block">Day 2</span>
                                        <span className="text-2xl font-cinzel font-black text-white block">₹{PRICES.day2}</span>
                                        
                                    </div>
                                    <div className="flex items-center gap-3 bg-black/40 rounded-full p-1 border border-white/10">
                                        <button onClick={() => updateCart('day2', -1)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white">-</button>
                                        <span className="text-lg font-mono font-bold w-6">{cart.day2}</span>
                                        <button onClick={() => updateCart('day2', 1)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white">+</button>
                                    </div>
                                </div>

                                {/* Combo Option */}
                                <div className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center gap-3 text-center relative overflow-hidden group/card ${cart.combo > 0 ? 'bg-gradient-to-br from-red-900/40 to-black border-red-500' : 'bg-white/5 border-white/10'}`}>
                                    <button
                                        onClick={() => setActiveInfo('combo')}
                                        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-white/10 hover:bg-white/30 flex items-center justify-center text-xs text-white/60 hover:text-white transition-colors z-20"
                                        title="View Details"
                                    >
                                        i
                                    </button>
                                    <div className="relative z-10">
                                        <span className="text-sm font-jost font-bold uppercase text-white/80 block">Both Days</span>
                                        <span className="text-2xl font-cinzel font-black text-white block">₹{PRICES.combo}</span>
                                    </div>
                                    <div className="flex items-center gap-3 bg-black/40 rounded-full p-1 border border-white/10 relative z-10">
                                        <button onClick={() => updateCart('combo', -1)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white">-</button>
                                        <span className="text-lg font-mono font-bold w-6">{cart.combo}</span>
                                        <button onClick={() => updateCart('combo', 1)} className="w-8 h-8 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white">+</button>
                                    </div>
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                            {/* Total & Action */}
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                                <div className="text-center md:text-left">
                                    <p className="text-white/40 text-xs uppercase mb-0.5">Total Amount</p>
                                    <p className="text-3xl font-cinzel font-bold text-red-500">₹{currentPrice}</p>
                                </div>
                                <button
                                    onClick={handleNext}
                                    disabled={totalTickets === 0}
                                    className="px-8 py-3 bg-white text-black text-sm font-bold uppercase tracking-wider rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100"
                                >
                                    Continue ({totalTickets})
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <h2 className="text-2xl font-cinzel text-white mb-6">Your Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder="Enter your email"
                                    />
                                    <p className="text-xs text-white/30 mt-2">Your pass will be sent here.</p>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                                        placeholder="Enter your number"
                                    />
                                </div>
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-colors"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="flex-1 px-8 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-colors"
                                >
                                    Proceed to Review
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="text-center space-y-2 mb-6">
                                <h2 className="text-2xl font-cinzel text-white">Order Summary</h2>
                                <p className="text-white/40 text-xs">Please review your details before payment</p>
                            </div>

                            <div className="space-y-4">
                                {/* Ticket Breakdown */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                                    <h3 className="text-xs uppercase tracking-widest text-white/60 font-bold border-b border-white/10 pb-2">Pass Details</h3>

                                    {cart.day1 > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/80">
                                                <span className="text-white font-bold">{cart.day1}x</span> Day 1 Pass
                                            </span>
                                            <span className="font-mono text-white/60">₹{cart.day1 * PRICES.day1}</span>
                                        </div>
                                    )}
                                    {cart.day2 > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/80">
                                                <span className="text-white font-bold">{cart.day2}x</span> Day 2 Pass
                                            </span>
                                            <span className="font-mono text-white/60">₹{cart.day2 * PRICES.day2}</span>
                                        </div>
                                    )}
                                    {cart.combo > 0 && (
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/80">
                                                <span className="text-white font-bold">{cart.combo}x</span> All Access Combo
                                            </span>
                                            <span className="font-mono text-white/60">₹{cart.combo * PRICES.combo}</span>
                                        </div>
                                    )}

                                    <div className="pt-2 mt-2 border-t border-white/10 flex justify-between items-center text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-red-500">₹{currentPrice}</span>
                                    </div>
                                </div>

                                {/* User Details Summary */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                                    <h3 className="text-xs uppercase tracking-widest text-white/60 font-bold border-b border-white/10 pb-2">Attendee Info</h3>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-white/40 text-xs">Name</p>
                                            <p className="text-white">{formData.name}</p>
                                        </div>
                                        <div>
                                            <p className="text-white/40 text-xs">Phone</p>
                                            <p className="text-white">{formData.phone}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-white/40 text-xs">Email</p>
                                            <p className="text-white">{formData.email}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    onClick={() => setStep(2)}
                                    className="px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 transition-colors"
                                >
                                    Edit Details
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="flex-1 px-8 py-3 bg-red-600 text-white font-bold uppercase tracking-wider rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                                >
                                    Proceed to Pay
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                            <div className="text-center space-y-4">
                                <h2 className="text-2xl font-cinzel text-white">Payment</h2>
                                <p className="text-white/60">Scan the QR or click below to pay <span className="text-white font-bold">₹{currentPrice}</span></p>
                            </div>

                            <div className="flex flex-col items-center gap-6">
                                {/* QR Code Placeholder */}
                                <div className="w-64 h-64 bg-white p-4 rounded-xl flex items-center justify-center shadow-2xl">
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`}
                                        alt="UPI QR Code"
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                {/* Pay Button for Mobile */}
                                {/* Pay Button for Mobile */}
                                <div className="w-full max-w-xs md:hidden">
                                    <button
                                        onClick={() => setShowPaymentReminder(true)}
                                        className="w-full px-6 py-3 bg-white text-black font-bold uppercase tracking-wider rounded-full hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <span>Pay Now via App</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(upiId);
                                        // Optional: Visual feedback could be added here
                                    }}
                                    className="group flex items-center gap-2 text-xs text-white/30 font-mono hover:text-white transition-colors mx-auto"
                                    title="Click to copy UPI ID"
                                >
                                    <span>UPI ID: {upiId}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-4 max-w-md mx-auto border-t border-white/10 pt-6">
                                <div>
                                    <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Transaction ID / UTR</label>
                                    <input
                                        type="text"
                                        value={formData.transactionId}
                                        onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                                        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 transition-colors font-mono text-center tracking-widest"
                                        placeholder="Enter 12-digit UTR"
                                    />
                                    <p className="text-[10px] text-white/30 text-center mt-2">
                                        After payment, enter the Reference ID / UTR number found in your UPI app.
                                    </p>
                                </div>

                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep(3)}
                                        className="px-6 py-3 border border-white/10 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors"
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        className="flex-1 px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-wider rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Verifying...' : 'Complete Booking'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="text-center space-y-6 py-10 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-cinzel font-bold text-white">Booking Submitted!</h2>
                            <p className="text-white/60 max-w-md mx-auto">
                                Thank you, {formData.name}. We have received your payment details.
                                <br /><br />
                                Your pass will be sent to <span className="text-white">{formData.email}</span> within 24 hours after verification.
                            </p>
                            <Link href="/">
                                <button className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                                    Return Home
                                </button>
                            </Link>
                        </div>
                    )}

                </div>
            </div>

            {/* Payment Reminder Modal */}
            {showPaymentReminder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-sm w-full relative space-y-4 shadow-2xl animate-in zoom-in-95 duration-300 text-center">
                        <div className="w-16 h-16 bg-yellow-500/20 text-yellow-500 rounded-full flex items-center justify-center mx-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-xl font-cinzel font-bold text-white">Important Reminder</h3>
                            <p className="text-white/70 text-sm">
                                After completing the payment, please <span className="text-white font-bold underline">COPY the Transaction ID / UTR</span> from your UPI app.
                            </p>
                            <p className="text-white/70 text-sm">
                                You must enter this ID in the input box on the next screen to confirm your booking.
                            </p>
                        </div>

                        <div className="pt-4 flex flex-col gap-3">
                            <a href={upiLink} onClick={() => setShowPaymentReminder(false)} className="w-full">
                                <button className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-colors">
                                    Proceed to Pay
                                </button>
                            </a>
                            <button
                                onClick={() => setShowPaymentReminder(false)}
                                className="w-full py-3 border border-white/10 text-white font-bold uppercase tracking-wider rounded-xl hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Info Modal */}
            {activeInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-[#111] border border-white/10 rounded-2xl p-6 max-w-md w-full relative space-y-4 shadow-2xl animate-in zoom-in-95 duration-300">
                        <button
                            onClick={() => setActiveInfo(null)}
                            className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="space-y-1">
                            <h3 className="text-xl font-cinzel font-bold text-white">{PASS_DETAILS[activeInfo].title}</h3>
                            <p className="text-red-500 font-medium text-sm">{PASS_DETAILS[activeInfo].artist}</p>
                        </div>

                        <div className="py-2">
                            <p className="text-white/70 text-sm leading-relaxed">
                                {PASS_DETAILS[activeInfo].description}
                            </p>
                        </div>

                        

                        <div className="pt-4 mt-2 border-t border-white/10">
                            <button
                                onClick={() => setActiveInfo(null)}
                                className="w-full py-3 bg-white text-black font-bold uppercase tracking-wider rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
