"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Event3DCarousel from "@/components/Event3DCarousel";
import { Event } from "@/types/event";
import { useConfig } from "@/contexts/ConfigContext";

gsap.registerPlugin(ScrollTrigger);

export default function MainstageEvents() {
    const { config } = useConfig();
    const { eventsSectionContent } = config; // We might want specific content for mainstage eventually
    const containerRef = useRef(null);
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort("Request took too long"), 20000);

        const fetchEvents = async () => {
            try {
                const response = await fetch("/events/api/events", { signal: controller.signal });
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                // Filter mainly for mainstage events locally if API returns all
                setEvents(data.filter((e: Event) => !e.isOnline));
            } catch (error: any) {
                if (error.name === 'AbortError' || error.message === 'Component unmounted') {
                    console.warn("Mainstage Events fetch aborted:", controller.signal.reason || error.message);
                } else {
                    console.error("Error loading events:", error);
                }
            } finally {
                clearTimeout(timeoutId);
                setIsLoading(false);
            }
        };

        fetchEvents();

        return () => {
            clearTimeout(timeoutId);
            controller.abort("Component unmounted");
        };
    }, []);

    useGSAP(() => {
        gsap.from(".mainstage-header", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse"
            }
        });
    }, { scope: containerRef });

    return (
        <section
            id="mainstage-events"
            ref={containerRef}
            className="relative py-24 min-h-[80vh] flex flex-col justify-center bg-transparent panel snap-start snap-always"
        >
            <div className="container mx-auto px-4 md:px-6 z-10 relative h-full flex flex-col">

                {/* Mainstage Header */}
                <div className="mainstage-header text-center mb-12 md:mb-16">
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-red-200 via-white to-red-200 drop-shadow-2xl">
                        Mainstage Events
                    </h2>
                    <div className="h-1 w-32 bg-red-600 mx-auto mt-6 rounded-full blur-[2px] animate-pulse"></div>
                </div>

                {isLoading ? (
                    <div className="text-white text-center text-xl">Loading mainstage events...</div>
                ) : (
                    <div className="h-[50vh] md:h-[60vh] w-full">
                        {events.length > 0 ? (
                            <Event3DCarousel events={events} />
                        ) : (
                            <div className="text-center text-white/50 py-10">No mainstage events scheduled yet.</div>
                        )}
                    </div>
                )}

            </div>
        </section>
    );
}
