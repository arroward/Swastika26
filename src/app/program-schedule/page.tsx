"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackgroundGlows from "@/components/BackgroundGlows";

interface ProgramScheduleItem {
  id: string;
  day: number;
  time_start: string;
  time_end: string;
  program: string;
  participants: string[];
  sort_order: number | null;
  created_at: string;
}

export default function ProgramSchedulePage() {
  const [scheduleItems, setScheduleItems] = useState<ProgramScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | "all">("all");

  useEffect(() => {
    fetchSchedule();
  }, []);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/program-schedule");
      const data = await response.json();

      if (data.success) {
        setScheduleItems(data.data);
        // Auto-select first day if available
        if (data.data.length > 0) {
          setSelectedDay(data.data[0].day);
        }
      } else {
        setError(data.error || "Failed to fetch schedule");
      }
    } catch (err) {
      setError("An error occurred while fetching the schedule");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Group items by day
  const dayGroups = scheduleItems.reduce(
    (acc, item) => {
      if (!acc[item.day]) {
        acc[item.day] = [];
      }
      acc[item.day].push(item);
      return acc;
    },
    {} as Record<number, ProgramScheduleItem[]>,
  );

  const days = Object.keys(dayGroups)
    .map(Number)
    .sort((a, b) => a - b);
  const filteredItems =
    selectedDay === "all"
      ? scheduleItems
      : scheduleItems.filter((item) => item.day === selectedDay);

  if (loading) {
    return (
      <div className="min-h-screen bg-[--bg-main] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-[--accent-main] border-r-transparent mb-4"></div>
          <p className="text-white text-xl font-inter">Loading Schedule...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[--bg-main] flex items-center justify-center">
        <div className="text-center text-red-400">
          <p className="text-xl mb-4 font-inter">⚠️ {error}</p>
          <button
            onClick={fetchSchedule}
            className="px-6 py-3 bg-[--accent-main] hover:bg-[--accent-glow] text-white rounded-xl transition-all font-inter font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[--bg-main] relative overflow-hidden">
      <BackgroundGlows />

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            {/* Section Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block mb-6"
            >
              <div className="flex items-center justify-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono text-[--accent-main] uppercase tracking-[0.2em]">
                  Event Timeline
                </span>
              </div>
            </motion.div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black font-cinzel text-white mb-6 tracking-tight leading-none"
              style={{
                textShadow:
                  "0 0 10px rgba(220, 38, 38, 0.5), 0 0 20px rgba(220, 38, 38, 0.3), 0 4px 2px rgba(0,0,0,0.5)",
              }}
            >
              Program Schedule
            </h1>
            <div className="flex items-center justify-center gap-4 text-white/50 font-jost text-xs md:text-sm tracking-widest uppercase">
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
              Complete Event Timeline
              <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></span>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/40 text-sm font-inter mt-4 max-w-2xl mx-auto"
            >
              Stay updated with the complete event timeline and never miss a
              moment
            </motion.p>
          </motion.div>

          {/* Day Selector */}
          {days.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-3 mb-10"
            >
              <button
                onClick={() => setSelectedDay("all")}
                className={`relative px-6 md:px-8 py-2.5 md:py-3 rounded-[var(--site-radius)] font-semibold font-inter text-sm md:text-base transition-all duration-300 overflow-hidden group ${
                  selectedDay === "all"
                    ? "bg-[--accent-main] text-white border border-red-500/50"
                    : "bg-[#111] text-white/70 hover:text-white border border-white/10 hover:border-white/20"
                }`}
              >
                {selectedDay === "all" && (
                  <div className="absolute inset-0 bg-red-600/20 rounded-[var(--site-radius)] blur-xl" />
                )}
                <span className="relative z-10">All Days</span>
              </button>
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`relative px-6 md:px-8 py-2.5 md:py-3 rounded-[var(--site-radius)] font-semibold font-inter text-sm md:text-base transition-all duration-300 overflow-hidden group ${
                    selectedDay === day
                      ? "bg-[--accent-main] text-white border border-red-500/50 shadow-lg shadow-red-600/30"
                      : "bg-[#111] text-white/70 hover:text-white border border-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-red-600/10"
                  }`}
                >
                  {selectedDay === day && (
                    <motion.div
                      layoutId="activeDay"
                      className="absolute inset-0 bg-red-600/20 rounded-[var(--site-radius)] blur-xl"
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${selectedDay === day ? "bg-white" : "bg-white/30"}`}
                    />
                    Day {day}
                    {selectedDay === day && (
                      <span className="text-xs opacity-60">
                        ({dayGroups[day]?.length || 0})
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </motion.div>
          )}

          {/* Schedule Table */}
          <div className="space-y-12">
            {selectedDay === "all" ? (
              // Group by day when showing all
              days.map((day, dayIndex) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: dayIndex * 0.1 }}
                  className="relative bg-[#111] rounded-[var(--site-radius)] p-5 md:p-8 border border-white/10 overflow-hidden group"
                >
                  {/* Decorative glow */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6 md:mb-8 pb-4 border-b border-white/5">
                      <div className="flex items-center gap-3">
                        <motion.div
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{
                            delay: dayIndex * 0.1 + 0.2,
                            duration: 0.5,
                          }}
                          className="w-1.5 h-12 bg-gradient-to-b from-[--accent-main] to-red-900 rounded-full shadow-lg shadow-red-600/50"
                        />
                        <div>
                          <h2 className="text-3xl md:text-4xl font-black font-syne text-white leading-none">
                            Day {day}
                          </h2>
                          <div className="flex items-center gap-3 mt-1">
                            <p className="text-xs text-white/40 font-mono uppercase tracking-wider">
                              {dayGroups[day]?.length || 0} event
                              {(dayGroups[day]?.length || 0) !== 1 ? "s" : ""}
                            </p>
                            {dayGroups[day] && dayGroups[day].length > 0 && (
                              <span className="text-xs text-white/30 font-mono">
                                • {dayGroups[day][0].time_start} -{" "}
                                {
                                  dayGroups[day][dayGroups[day].length - 1]
                                    .time_end
                                }
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <ScheduleTable items={dayGroups[day]} />
                  </div>
                </motion.div>
              ))
            ) : (
              // Show filtered items
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-[#111] rounded-[var(--site-radius)] p-5 md:p-8 border border-white/10 overflow-hidden"
              >
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                <div className="relative z-10">
                  {filteredItems.length > 0 && (
                    <div className="flex items-center justify-between mb-6 md:mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-12 bg-[--accent-main] rounded-full shadow-lg shadow-red-600/50"></div>
                        <div>
                          <h2 className="text-3xl md:text-4xl font-black font-syne text-white leading-none">
                            Day {selectedDay}
                          </h2>
                          <p className="text-xs text-white/40 font-mono uppercase tracking-wider mt-1">
                            {filteredItems.length} event
                            {filteredItems.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <ScheduleTable items={filteredItems} />
                </div>
              </motion.div>
            )}
          </div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative bg-[#111] rounded-[var(--site-radius)] p-12 md:p-16 border border-white/10 text-center overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/10 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-white/5 border border-white/10">
                  <svg
                    className="w-8 h-8 text-white/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-2xl font-bold font-syne text-white/80 mb-2">
                  No Events Found
                </p>
                <p className="text-sm text-white/40 font-inter">
                  No schedule items available at the moment
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScheduleTable({ items }: { items: ProgramScheduleItem[] }) {
  return (
    <div className="overflow-x-auto rounded-[var(--site-radius)] bg-black/20 border border-white/5 shadow-2xl">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead className="bg-black/40 backdrop-blur-sm">
          <tr className="border-b border-white/10">
            <th className="text-left py-4 px-4 md:px-6 text-white/60 font-semibold text-[10px] md:text-xs font-mono uppercase tracking-[0.15em]">
              <div className="flex items-center gap-2">
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="hidden sm:inline">Time Slot</span>
                <span className="sm:hidden">Time</span>
              </div>
            </th>
            <th className="text-left py-4 px-4 md:px-6 text-white/60 font-semibold text-[10px] md:text-xs font-mono uppercase tracking-[0.15em]">
              Program / Activity
            </th>
            <th className="text-left py-4 px-4 md:px-6 text-white/60 font-semibold text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] hidden md:table-cell">
              Participants
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="bg-black/10">
          {items.map((item, index) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="group border-b border-white/5 hover:bg-black/30 transition-all duration-300"
            >
              {/* Time Slot */}
              <td className="py-4 md:py-5 px-4 md:px-6 align-top">
                <div className="flex items-center gap-2 md:gap-3">
                  <motion.svg
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-4 h-4 md:w-5 md:h-5 text-[--accent-main] flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </motion.svg>
                  <span className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 rounded-[var(--site-radius)] bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 text-white text-xs md:text-sm font-inter font-medium whitespace-nowrap group-hover:border-red-500/30 group-hover:shadow-lg group-hover:shadow-red-600/10 transition-all">
                    {item.time_start} – {item.time_end}
                  </span>
                </div>
              </td>

              {/* Program */}
              <td className="py-4 md:py-5 px-4 md:px-6 align-top">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.03 + 0.1 }}
                      className="w-1.5 h-1.5 mt-1.5 bg-[--accent-main] rounded-full flex-shrink-0 group-hover:shadow-lg group-hover:shadow-red-600/50 transition-shadow"
                    />
                    <span className="text-white font-bold text-sm md:text-base font-syne block group-hover:text-[--accent-glow] transition-colors">
                      {item.program}
                    </span>
                  </div>
                  {/* Show participants on mobile */}
                  {item.participants && item.participants.length > 0 && (
                    <div className="md:hidden text-xs text-white/50 font-inter pl-3.5">
                      {item.participants.join(", ")}
                    </div>
                  )}
                </div>
              </td>

              {/* Participants - Hidden on mobile */}
              <td className="py-4 md:py-5 px-4 md:px-6 align-top hidden md:table-cell">
                {item.participants && item.participants.length > 0 ? (
                  item.participants.length === 1 ? (
                    <span className="text-white/80 text-sm md:text-base font-inter">
                      {item.participants[0]}
                    </span>
                  ) : (
                    <ul className="space-y-1.5">
                      {item.participants.map((participant, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.03 + idx * 0.05 }}
                          className="text-white/80 text-sm md:text-base font-inter flex items-start group/item"
                        >
                          <span className="text-[--accent-main] mr-2 mt-0.5 group-hover/item:scale-125 group-hover/item:rotate-90 transition-all duration-300">
                            •
                          </span>
                          <span className="group-hover/item:text-white transition-colors">
                            {participant}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  )
                ) : (
                  <span className="text-white/20 text-sm md:text-base font-inter">
                    —
                  </span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
