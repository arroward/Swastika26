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

import AlertModal from "@/components/AlertModal";

export default function Event3DCarousel({ events, disableClick = false }: Event3DCarouselProps & { disableClick?: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showRegistrationAlert, setShowRegistrationAlert] = useState(false);

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
    const cardWidth = isMobile ? window.innerWidth * 0.8 : 360;
    const scrollAmount = cardWidth + (isMobile ? 24 : 48);
    container.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const scrollPrev = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const cardWidth = isMobile ? window.innerWidth * 0.8 : 360;
    const scrollAmount = cardWidth + (isMobile ? 24 : 48);
    container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  };

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <>
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
              disableClick={disableClick}
              onDisabledClick={() => setShowRegistrationAlert(true)}
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

      <AlertModal
        isOpen={showRegistrationAlert}
        onClose={() => setShowRegistrationAlert(false)}
        title="Registration Closed"
        message="Registration Closed"
      />
    </>
  );
}

import { createSlug } from "@/lib/utils";

function CarouselCard({ event, index, disableClick, onDisabledClick }: { event: Event; index: number; disableClick: boolean; onDisabledClick?: () => void }) {
  const title = event.title || "Event";

  const CardContent = (
    <>
      {/* Background Image with improved visibility */}
      <div className="absolute inset-0 overflow-hidden rounded-[var(--site-radius)] bg-gray-900">
        <img
          src={event.imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90 group-hover:brightness-110"
        />
      </div>

      {/* Refined Gradient Overlay - improved visibility of upper poster area */}
      {/* Refined Gradient Overlay - transparent top, black bottom, black till the title */}
      <div className="absolute inset-0 bg-gradient-to-t from-black from-20% via-black/50 to-transparent opacity-100 transition-opacity duration-500" />

      {/* Glassmorphism/Glow Border */}
      <div
        className={cn(
          "absolute inset-0 rounded-[var(--site-radius)] border border-white/10 transition-all duration-300 pointer-events-none",
          "group-hover:border-white/30 group-hover:shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]",
        )}
      />

      {/* Content Container */}
      <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
        {/* Large Index Number - slightly reduced and transparent */}
        <div className="absolute top-4 right-5 text-5xl md:text-7xl font-black text-white/10 font-cinzel select-none group-hover:text-white/20 transition-colors duration-500">
          {(index + 1).toString().padStart(2, "0")}
        </div>

        {/* Main Content */}
        <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
          {/* Decorative line */}
          <div className="flex items-center gap-2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 -translate-x-4 group-hover:translate-x-0">
            <div className="h-[2px] w-8 bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
          </div>

          <h3 className="text-xl md:text-3xl font-bold font-cinzel text-white leading-tight tracking-wide drop-shadow-md">
            {title}
          </h3>

          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
            <div className="overflow-hidden">
              <p className="text-xs md:text-sm text-gray-200 mt-2 font-jost font-light leading-relaxed opacity-90 line-clamp-3">
                {event.description ||
                  "Experience the best of innovation and creativity."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const containerClasses = "snap-center shrink-0 w-[80vw] md:w-[360px] h-[75%] md:h-[90%] mx-3 md:mx-6 relative group rounded-[var(--site-radius)] overflow-hidden cursor-pointer shadow-2xl ring-1 ring-white/10";

  if (disableClick) {
    return (
      <div
        className={containerClasses}
        onClick={onDisabledClick}
      >
        {CardContent}
      </div>
    );
  }

  return (
    <Link
      href={event.isOnline ? `/events/online/${createSlug(event.title)}` : `/events/mainstage/${createSlug(event.title)}`}
      className={containerClasses}
    >
      {CardContent}
    </Link>
  );
}
