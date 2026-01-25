"use client";

import { useFCM } from "@/hooks/use-fcm";
import { Bell, Calendar, Zap } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useLoading } from "@/components/LoadingProvider";
import { siteConfig } from "@/config/site.config";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function NotificationPermissionRequest() {
    const { permission, requestPermission } = useFCM();
    const { isLoading } = useLoading();
    const [isDismissed, setIsDismissed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Refs for animation
    const containerRef = useRef<HTMLDivElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const blobRef = useRef<HTMLDivElement>(null);
    const iconContainerRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);

    // Delay showing the modal slightly after loading finishes
    useEffect(() => {
        if (!isLoading && permission === 'default' && !isDismissed) {
            const timer = setTimeout(() => setShowModal(true), 1500);
            return () => clearTimeout(timer);
        }
    }, [isLoading, permission, isDismissed]);


    // Animation Logic
    const { contextSafe } = useGSAP({ scope: containerRef });

    // Entrance Animation when modal shows
    useGSAP(() => {
        if (!showModal) return;

        const tl = gsap.timeline();

        // 1. Backdrop Fade In
        tl.fromTo(backdropRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.4 }
        );

        // 2. Modal Reveal
        tl.fromTo(modalRef.current,
            { opacity: 0, scale: 0.9, y: 30 },
            { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" },
            "-=0.2"
        );

        // 3. Blob Breathing (Infinite)
        gsap.to(blobRef.current, {
            scale: 1.2,
            opacity: 0.5,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // 4. Icon Container Pop
        tl.fromTo(iconContainerRef.current,
            { scale: 0 },
            { scale: 1, duration: 0.5, ease: "elastic.out(1, 0.5)" },
            "-=0.3"
        );

        // 5. Icon Wobble (Infinite)
        gsap.to(iconRef.current, {
            rotation: 10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // 6. Stagger Text & Benefits
        tl.fromTo(".animate-item",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" },
            "-=0.2"
        );

    }, [showModal]);

    // Exit Animation Handler
    const handleClose = contextSafe((onCompleteAction: () => void) => {
        const tl = gsap.timeline({
            onComplete: onCompleteAction
        });

        tl.to(modalRef.current, {
            opacity: 0,
            scale: 0.9,
            y: 30,
            duration: 0.3,
            ease: "power2.in"
        });

        tl.to(backdropRef.current, {
            opacity: 0,
            duration: 0.3
        }, "-=0.2");
    });

    const handleEnable = async () => {
        await requestPermission();
        handleClose(() => setShowModal(false));
    };

    const handleDismiss = () => {
        setIsDismissed(true);
        handleClose(() => setShowModal(false));
    };


    if (permission === 'granted' || permission === 'denied' || !showModal) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9990] flex items-center justify-center pointer-events-none">

            {/* Backdrop */}
            <div
                ref={backdropRef}
                onClick={handleDismiss}
                className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto opacity-0"
            />

            {/* Modal */}
            <div
                ref={modalRef}
                className="relative z-[9999] w-[95vw] md:w-full md:max-w-md bg-[#0a0a0a] border border-white/10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl pointer-events-auto opacity-0"
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-red-900/40 via-red-900/10 to-transparent pointer-events-none" />
                <div
                    ref={blobRef}
                    className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/20 blur-[80px] rounded-full pointer-events-none will-change-transform opacity-30"
                />

                <div className="relative p-5 md:p-8 flex flex-col items-center text-center">

                    {/* Animated Icon Container */}
                    <div
                        ref={iconContainerRef}
                        className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center mb-4 md:mb-6 relative group border border-white/10 shadow-[0_0_30px_-10px_rgba(220,38,38,0.5)] will-change-transform scale-0"
                    >
                        <div className="absolute inset-0 rounded-2xl bg-red-500/20 animate-ping opacity-20 duration-1000" />
                        <div ref={iconRef} className="will-change-transform">
                            <img src={siteConfig.logos.main} alt="Swastika Logo" className="w-8 h-8 md:w-10 md:h-10 drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]" />
                        </div>
                    </div>

                    <div className="animate-item mb-2 md:mb-3 opacity-0">
                        <h3 className="text-xs font-mono tracking-[0.3em] text-red-500 uppercase mb-1">
                            {siteConfig.year} Edition
                        </h3>
                        <h2 className="text-2xl md:text-3xl font-black font-cinzel text-white tracking-tight">
                            DON'T MISS THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">ACTION</span>
                        </h2>
                    </div>

                    <p className="animate-item text-xs md:text-sm text-white/60 font-jost mb-6 md:mb-8 leading-relaxed max-w-[280px] md:max-w-xs mx-auto opacity-0">
                        Get instant updates on <b>Pro-shows</b>, <b>Event schedules</b>, and exclusive <b>Swastika</b> announcements.
                    </p>

                    {/* Benefits Grid */}
                    <div className="w-full grid gap-2.5 md:gap-3 mb-6 md:mb-8">
                        <BenefitItem
                            icon={<Zap size={16} className="md:w-[18px] md:h-[18px]" />}
                            title="Instant Updates"
                            desc="Real-time alerts for live events"
                            color="bg-yellow-500/20 text-yellow-400"
                        />
                       
                        <BenefitItem
                            icon={<Calendar size={16} className="md:w-[18px] md:h-[18px]" />}
                            title="Schedule Info"
                            desc="Stay on track with timings"
                            color="bg-blue-500/20 text-blue-400"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="animate-item w-full flex flex-col gap-2 md:gap-3 opacity-0">
                        <button
                            onClick={handleEnable}
                            className="w-full py-3 md:py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-bold font-syne text-xs md:text-sm tracking-wider uppercase transition-all shadow-[0_4px_20px_-5px_rgba(220,38,38,0.5)] hover:shadow-[0_8px_30px_-5px_rgba(220,38,38,0.6)] flex items-center justify-center gap-2 group border border-red-500/20 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Bell size={16} className="group-hover:rotate-12 transition-transform md:w-[18px] md:h-[18px]" />
                            Enable Notifications
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="w-full py-2.5 md:py-3 text-white/30 hover:text-white text-[10px] md:text-xs font-mono tracking-widest uppercase transition-colors hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Skip for Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BenefitItem({ icon, title, desc, color }: { icon: any, title: string, desc: string, color: string }) {
    return (
        <div className="animate-item flex items-center gap-3 md:gap-4 p-2.5 md:p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-left group opacity-0">
            <div className={`p-2 md:p-2.5 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div>
                <h4 className="text-white font-syne font-bold text-xs md:text-sm tracking-wide">{title}</h4>
                <p className="text-white/40 text-[10px] md:text-xs font-jost">{desc}</p>
            </div>
        </div>
    );
}
