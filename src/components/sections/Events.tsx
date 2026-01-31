"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Event3DCarousel from "@/components/Event3DCarousel";
import { Event } from "@/types/event";
import { useConfig } from "@/contexts/ConfigContext";

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const { config } = useConfig();
  const { eventsSectionContent, siteConfig } = config;
  const containerRef = useRef(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort("Request took too long"), 20000); // Increased to 20s for slow DB cold starts

    const fetchEvents = async () => {
      try {
        const response = await fetch("/events/api/events", { signal: controller.signal });
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data);
      } catch (error: any) {
        if (error.name === 'AbortError') {
          console.warn("Events fetch aborted:", controller.signal.reason);
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
    gsap.from(".events-badge", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });

    gsap.from(".events-title", {
      scale: 0.9,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
        toggleActions: "play none none reverse"
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="events"
      ref={containerRef}
      className="relative py-0 overflow-hidden h-[calc(100dvh-5rem)] md:h-[calc(100dvh-7rem)] lg:h-[calc(100dvh-8rem)] flex flex-col justify-center panel snap-start snap-always"
    >
      <div className="container mx-auto px-4 md:px-6 z-10 relative h-full flex flex-col">
        <div className="text-center pt-4 md:pt-6 mb-2 md:mb-4 lg:mb-6 space-y-2 shrink-0">
          <div className="inline-block events-badge">
            <div className="flex items-center justify-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
              <img
                src={siteConfig.logos.main}
                alt={siteConfig.name}
                className="w-4 h-4 md:w-5 md:h-5 opacity-80"
              />
              <span className="text-xs font-mono text-accent-main uppercase tracking-widest">
                {eventsSectionContent.badge}
              </span>
            </div>
          </div>

          <h2 className="events-title text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-cinzel text-white drop-shadow-2xl">
            {eventsSectionContent.title}{" "}
            <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
              {eventsSectionContent.highlight}
            </span>
          </h2>
        </div>

        <div className="w-full relative z-20 flex-1 min-h-0 flex items-center justify-center pb-4">
          <div className="w-full h-full flex items-center justify-center">
            {/* Linear Carousel */}
            {isLoading ? (
              <div className="text-white text-xl">Loading events...</div>
            ) : (
              <Event3DCarousel events={events} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
