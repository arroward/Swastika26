"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EventCard from "./EventCard";
import { Event } from "@/types/event";

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter events based on search
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Search Bar - Compact */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 md:w-5 md:h-5 text-white/40 group-focus-within:text-red-400 transition-colors"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 md:pl-12 pr-10 py-3 md:py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm md:text-base text-white placeholder-white/40 outline-none focus:border-red-500/50 focus:ring-2 focus:ring-red-500/10 transition-all backdrop-blur-sm font-jost"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/40 hover:text-white transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between text-xs md:text-sm">
        <p className="text-white/50">
          <span className="text-red-400 font-semibold">
            {filteredEvents.length}
          </span>{" "}
          of <span className="text-white/70">{events.length}</span> events
        </p>
        {searchQuery && (
          <p className="text-white/50">
            "<span className="text-white">{searchQuery}</span>"
          </p>
        )}
      </div>

      {/* Events Grid */}
      <AnimatePresence mode="wait">
        {filteredEvents.length === 0 ? (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-xl mx-auto"
          >
            <div className="bg-gradient-to-br from-red-900/20 to-black/40 backdrop-blur-xl border border-red-500/20 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-red-600/10 rounded-full mb-4 border-2 border-red-500/20">
                <svg
                  className="w-8 h-8 md:w-10 md:h-10 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-cinzel">
                No Events Found
              </h3>
              <p className="text-white/60 text-sm md:text-base font-jost mb-4">
                Try adjusting your search terms.
              </p>
              <button
                onClick={() => setSearchQuery("")}
                className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg font-semibold transition-all"
              >
                Clear Search
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {filteredEvents.map((event) => (
              <motion.div key={event.id} variants={itemVariants}>
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
