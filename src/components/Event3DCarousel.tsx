"use client";

import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { Event } from "@/types/event";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Event3DCarouselProps {
  events: Event[];
}

export default function Event3DCarousel({ events }: Event3DCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Extend items for infinite scroll effect (tripling the array)
  const extendedEvents = events?.length
    ? [...events, ...events, ...events]
    : [];
  const totalItemsCount = events?.length || 0;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      setTimeout(() => {
        const singleSetWidth = container.scrollWidth / 3;
        container.scrollLeft = singleSetWidth;
      }, 100);
    }
  }, [events]);

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollLeft = container.scrollLeft;
    const scrollWidth = container.scrollWidth;
    const singleSetWidth = scrollWidth / 3;
    const padding = 50;

    if (scrollLeft >= singleSetWidth * 2 - padding) {
      container.scrollLeft = scrollLeft - singleSetWidth;
    } else if (scrollLeft <= padding) {
      container.scrollLeft = scrollLeft + singleSetWidth;
    }
  };

  const scrollNext = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = isMobile ? window.innerWidth * 0.8 : 400;
    const scrollAmount = cardWidth + (isMobile ? 24 : 48);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollPrev = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = isMobile ? window.innerWidth * 0.8 : 400;
    const scrollAmount = cardWidth + (isMobile ? 24 : 48);
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-full flex items-center group/nav">
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative w-full h-full flex items-center overflow-x-auto overflow-y-hidden snap-x snap-mandatory scrollbar-hide px-4 md:px-[30vw]"
      >
        {extendedEvents.map((event, index) => (
          <CarouselCard
            key={`${index}-${event.id}`}
            event={event}
            index={index % totalItemsCount}
          />
        ))}
      </div>

      <button
        onClick={scrollPrev}
        className="absolute left-2 md:left-8 z-30 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all flex"
      >
        <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-2 md:right-8 z-30 p-3 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 hover:scale-110 active:scale-95 transition-all flex"
      >
        <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
      </button>
    </div>
  );
}

function CarouselCard({ event, index }: { event: Event; index: number }) {
  const title = event.title || "Event";

  return (
    <Link
      href={`/events/${event.id}/register`}
      className="snap-center shrink-0 w-[80vw] md:w-[400px] h-[75%] md:h-[90%] mx-3 md:mx-6 relative group rounded-3xl overflow-hidden cursor-pointer"
    >
      {/* Background Image with Zoom Effect */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        <img
          src={event.imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-100"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500" />

      {/* Animated Glow Border */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl border-2 border-transparent transition-all duration-300 pointer-events-none",
          "group-hover:border-white/20",
        )}
      >
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t opacity-0 group-hover:opacity-20 transition-opacity duration-500 from-white",
          )}
        />
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
        {/* Large Index Number */}
        <div className="absolute top-4 right-6 text-6xl md:text-8xl font-black text-white/5 font-cinzel select-none group-hover:text-white/10 transition-colors duration-500">
          {(index + 1).toString().padStart(2, "0")}
        </div>

        {/* Main Content */}
        <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
          <div className="flex items-center gap-3 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 -translate-x-4 group-hover:translate-x-0">
            <div
              className={cn(
                "h-[1px] w-12 bg-gradient-to-r from-white to-transparent",
              )}
            />
          </div>

          <h3 className="text-3xl md:text-5xl font-black font-cinzel text-white leading-none tracking-wide drop-shadow-lg">
            {title}
          </h3>

          <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
            <p className="text-sm md:text-base text-gray-300 mt-3 font-jost font-light leading-relaxed max-w-[90%] line-clamp-3">
              {event.description ||
                "Experience the best of innovation and creativity."}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
