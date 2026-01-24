"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Event } from "@/types/event";

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative h-full"
    >
      <div className="h-full bg-gradient-to-br from-red-900/20 to-black/40 backdrop-blur-xl border border-red-500/20 rounded-xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-red-600/20 transition-all duration-300">
        {/* Image Section - Compact */}
        <div className="relative h-40 md:h-48 overflow-hidden bg-gradient-to-br from-red-900/30 to-black">
          {event.imageUrl ? (
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-red-500/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

          {/* Category Badge */}
          {event.category && (
            <div className="absolute top-3 left-3">
              <span className="px-2.5 py-1 bg-red-600/90 backdrop-blur-sm text-white text-xs font-bold rounded-md uppercase tracking-wider">
                {event.category}
              </span>
            </div>
          )}
        </div>

        {/* Content Section - Compact */}
        <div className="p-4 space-y-3">
          <h3 className="text-lg md:text-xl font-bold text-white font-cinzel group-hover:text-red-400 transition-colors line-clamp-2">
            {event.title}
          </h3>

          <p className="text-white/60 text-xs md:text-sm leading-relaxed line-clamp-2 font-jost">
            {event.description}
          </p>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs md:text-sm">
              <svg
                className="w-4 h-4 text-red-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div className="flex-1 min-w-0">
                <p className="text-white/80 font-medium truncate">
                  {formatDate(event.date)}
                </p>
              </div>
            </div>

            {event.registrationFee !== undefined && (
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-white/60 text-xs">Fee</span>
                <span className="text-lg font-bold text-red-400">
                  {event.registrationFee === 0
                    ? "FREE"
                    : `₹${event.registrationFee}`}
                </span>
              </div>
            )}
          </div>

          {/* CTA Button - Use Link with nested div (not button) for valid HTML and proper redirection */}
          <Link href={`/events/${event.id}/register`} className="block mt-3">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-sm rounded-lg font-bold transition-all shadow-lg shadow-red-600/20 border border-red-500/50 flex items-center justify-center gap-2 group/btn cursor-pointer"
            >
              <span>View Details</span>
              <svg
                className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
