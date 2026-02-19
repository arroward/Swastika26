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
            className="text-center mb-16"
          >
            <h1
              className="text-6xl md:text-7xl lg:text-8xl font-black font-cinzel text-white mb-4 tracking-tight"
              style={{
                textShadow:
                  "0 0 10px rgba(220, 38, 38, 0.5), 0 0 20px rgba(220, 38, 38, 0.3), 0 4px 2px rgba(0,0,0,0.5)",
              }}
            >
              Program Schedule
            </h1>
            <div className="flex items-center justify-center gap-4 text-white/60 font-jost text-sm md:text-base tracking-widest uppercase">
              <span className="w-12 h-[1px] bg-white/20"></span>
              Complete Event Timeline
              <span className="w-12 h-[1px] bg-white/20"></span>
            </div>
          </motion.div>

          {/* Day Selector */}
          {days.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-wrap justify-center gap-3 mb-12"
            >
              <button
                onClick={() => setSelectedDay("all")}
                className={`px-8 py-3 rounded-xl font-semibold font-inter transition-all duration-300 ${
                  selectedDay === "all"
                    ? "bg-[--accent-main] text-white shadow-lg shadow-red-600/50"
                    : "bg-[--bg-card] text-gray-300 hover:bg-gray-800/80 border border-white/10"
                }`}
              >
                All Days
              </button>
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-8 py-3 rounded-xl font-semibold font-inter transition-all duration-300 ${
                    selectedDay === day
                      ? "bg-[--accent-main] text-white shadow-lg shadow-red-600/50"
                      : "bg-[--bg-card] text-gray-300 hover:bg-gray-800/80 border border-white/10"
                  }`}
                >
                  Day {day}
                </button>
              ))}
            </motion.div>
          )}

          {/* Schedule Table */}
          <div className="space-y-12">
            {selectedDay === "all" ? (
              // Group by day when showing all
              days.map((day) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-[--bg-card]/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                >
                  <h2 className="text-4xl font-bold font-syne text-white mb-8 flex items-center gap-3">
                    <span className="w-2 h-10 bg-[--accent-main] rounded-full"></span>
                    Day {day}
                  </h2>
                  <ScheduleTable items={dayGroups[day]} />
                </motion.div>
              ))
            ) : (
              // Show filtered items
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[--bg-card]/40 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              >
                <ScheduleTable items={filteredItems} />
              </motion.div>
            )}
          </div>

          {filteredItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-400 py-20"
            >
              <p className="text-2xl font-inter">No schedule items found</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScheduleTable({ items }: { items: ProgramScheduleItem[] }) {
  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-white/10">
            <th className="text-left py-5 px-6 text-white font-semibold text-xs font-jost uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
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
                Time Slot
              </div>
            </th>
            <th className="text-left py-5 px-6 text-white font-semibold text-xs font-jost uppercase tracking-widest">
              Program / Activity
            </th>
            <th className="text-left py-5 px-6 text-white font-semibold text-xs font-jost uppercase tracking-widest">
              Participants / Performers
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {items.map((item, index) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="border-b border-white/5 hover:bg-white/5 transition-all duration-200"
            >
              {/* Time Slot */}
              <td className="py-5 px-6">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[--accent-main] flex-shrink-0"
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
                  <span className="inline-flex items-center px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-inter font-medium whitespace-nowrap">
                    {item.time_start} – {item.time_end}
                  </span>
                </div>
              </td>

              {/* Program */}
              <td className="py-5 px-6">
                <span className="text-white font-semibold text-base font-syne">
                  {item.program}
                </span>
              </td>

              {/* Participants */}
              <td className="py-5 px-6">
                {item.participants && item.participants.length > 0 ? (
                  item.participants.length === 1 ? (
                    <span className="text-white text-base font-inter">
                      {item.participants[0]}
                    </span>
                  ) : (
                    <ul className="space-y-1.5">
                      {item.participants.map((participant, idx) => (
                        <li
                          key={idx}
                          className="text-white text-base font-inter flex items-start"
                        >
                          <span className="text-[--accent-main] mr-2 mt-1">
                            •
                          </span>
                          <span>{participant}</span>
                        </li>
                      ))}
                    </ul>
                  )
                ) : (
                  <span className="text-white/30 text-base font-inter">—</span>
                )}
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
