import { notFound } from "next/navigation";
import Link from "next/link";
import EventRegistrationForm from "@/components/EventRegistrationForm";
import { getEventById } from "@/lib/db";
import LightRays from "@/components/LightRays";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventRegisterPage({ params }: PageProps) {
  const { id } = await params;

  // Fetch event from database
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  const isFullyBooked = event.registeredCount >= event.capacity;
  const percentageBooked = Math.round(
    (event.registeredCount / event.capacity) * 100,
  );

  return (
    <div className="min-h-screen relative bg-black">
      <div className="fixed inset-0 z-0 w-screen h-screen">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          className="w-full h-full"
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      <div className="container mx-auto px-3 md:px-4 relative z-10 py-6 md:py-10">
        {/* Back Button */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4 md:mb-6 font-semibold transition-all duration-300 hover:gap-3 group text-xs md:text-sm"
        >
          <svg
            className="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span>Return to Events</span>
        </Link>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 md:gap-6 lg:gap-8 items-start">
          {/* Event Info Card */}
          <div className="lg:col-span-2">
            <div className="group">
              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-red-900/10 to-black/40 backdrop-blur-xl rounded-xl md:rounded-2xl border border-red-500/10 overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-2xl hover:border-red-500/20">
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-900/0 group-hover:from-red-500/10 group-hover:to-red-900/10 transition-all duration-500 pointer-events-none"></div>

                {/* Image Container */}
                <div className="relative h-48 sm:h-64 lg:h-72 overflow-hidden">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-red-600/40 to-red-900/40 backdrop-blur-md text-red-100 rounded-full text-[10px] md:text-xs font-bold border border-red-400/60 hover:border-red-300/80 transition-all hover:bg-gradient-to-r hover:from-red-600/50 hover:to-red-800/50">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                      {event.category}
                    </span>
                  </div>

                  {/* Fully Booked Badge */}
                  {isFullyBooked && (
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-red-600/70 to-red-700/70 backdrop-blur-md text-white rounded-full text-[10px] md:text-xs font-bold border border-red-400/60 animate-pulse">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M13.477 14.89A6 6 0 0 1 5.11 2.523a6 6 0 0 1 8.367 8.367z"
                          />
                        </svg>
                        Full
                      </span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="relative p-4 md:p-6">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black font-cinzel text-white mb-2 leading-tight tracking-tight">
                    {event.title}
                  </h1>

                  <p className="text-white/70 text-xs md:text-sm font-jost leading-relaxed mb-4 md:mb-6 line-clamp-3 hover:line-clamp-none transition-all">
                    {event.description}
                  </p>

                  {/* Premium Details Grid */}
                  <div className="space-y-3 md:space-y-4 font-jost">
                    {/* Date Detail */}
                    <div className="flex gap-3 items-start group/item cursor-default">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-red-600/10 flex items-center justify-center border border-red-400/30 group-hover/item:border-red-300/60 transition-all duration-300 group-hover/item:from-red-500/30 group-hover/item:to-red-600/20">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 text-red-400"
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
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white/70 text-[10px] md:text-xs uppercase tracking-wide">
                          Date & Time
                        </p>
                        <p className="text-white font-bold mt-0.5 md:mt-1 text-xs md:text-sm break-words">
                          {new Date(event.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Location Detail */}
                    <div className="flex gap-3 items-start group/item cursor-default">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/20 group-hover/item:border-white/40 transition-all duration-300 group-hover/item:from-white/15 group-hover/item:to-white/10">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-white/70 text-[10px] md:text-xs uppercase tracking-wide">
                          Location
                        </p>
                        <p className="text-white font-bold mt-0.5 md:mt-1 text-xs md:text-sm break-words">
                          {event.location}
                        </p>
                      </div>
                    </div>

                    {/* Capacity Detail with Progress Bar */}
                    <div className="flex gap-3 items-start group/item cursor-default">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center border border-white/20 group-hover/item:border-white/40 transition-all duration-300 group-hover/item:from-white/15 group-hover/item:to-white/10">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white/70 text-[10px] md:text-xs uppercase tracking-wide">
                          Capacity
                        </p>
                        <p className="text-white font-bold mt-0.5 md:mt-1 text-xs md:text-sm">
                          {event.registeredCount} / {event.capacity} registered
                        </p>
                        {!isFullyBooked && (
                          <div className="mt-1.5 md:mt-2 space-y-1">
                            <div className="w-full bg-white/5 rounded-full h-1 md:h-1.5 border border-white/10 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-red-500 via-red-600 to-red-700 transition-all duration-500 rounded-full"
                                style={{
                                  width: `${percentageBooked}%`,
                                  boxShadow: "0 0 20px rgba(220, 38, 38, 0.5)",
                                }}
                              ></div>
                            </div>
                            <p className="text-red-400 text-[10px] font-semibold">
                              {event.capacity - event.registeredCount} spots
                              left
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Price Detail */}
                    <div className="flex gap-3 items-start group/item cursor-default">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center border border-green-400/30 group-hover/item:border-green-300/60 transition-all duration-300 group-hover/item:from-green-500/30 group-hover/item:to-green-600/20">
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-white/70 text-[10px] md:text-xs uppercase tracking-wide">
                          Registration Fee
                        </p>
                        <p className="text-white font-bold mt-0.5 md:mt-1 text-xs md:text-sm">
                          {event.registrationFee && event.registrationFee > 0
                            ? `₹${event.registrationFee}`
                            : "Free"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Rules Section */}
                  {event.rules && event.rules.length > 0 && (
                    <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/10">
                      <h3 className="text-sm md:text-base font-bold text-white mb-2 md:mb-3 flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        Rules & Guidelines
                      </h3>
                      <ul className="space-y-1.5">
                        {event.rules.map((rule, index) => (
                          <li
                            key={index}
                            className="flex gap-2 text-white/70 text-xs md:text-sm group/rule cursor-default"
                          >
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 group-hover/rule:scale-125 transition-transform duration-300"></span>
                            <span className="group-hover/rule:text-white/90 transition-colors duration-300 leading-snug">
                              {rule}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {isFullyBooked && (
                    <div className="mt-4 md:mt-6 bg-gradient-to-r from-red-600/20 to-red-700/10 border border-red-500/30 rounded-xl p-3 md:p-4 backdrop-blur-md text-center">
                      <p className="text-red-200 font-bold text-xs md:text-sm">
                        This event has reached maximum capacity.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Registration Form Section */}
          <div className="lg:col-span-3">
            {isFullyBooked ? (
              <div className="lg:sticky lg:top-6">
                <div className="relative bg-gradient-to-br from-red-900/10 to-black/40 backdrop-blur-xl rounded-xl md:rounded-2xl border border-red-500/10 p-6 md:p-8 shadow-2xl text-center group">
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-900/0 group-hover:from-red-500/10 group-hover:to-red-900/10 transition-all duration-500 rounded-3xl pointer-events-none"></div>

                  <div className="relative z-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-red-600/30 to-red-700/20 rounded-xl mb-3 md:mb-4 border border-red-500/50">
                      <svg
                        className="w-6 h-6 md:w-8 md:h-8 text-red-400"
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
                    </div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent mb-2 md:mb-3">
                      Registration Closed
                    </h2>
                    <p className="text-white/70 mb-4 md:mb-6 text-xs md:text-base leading-relaxed">
                      Unfortunately, this event has reached its maximum
                      capacity. Registration is no longer available.
                    </p>
                    <div className="flex justify-center">
                      <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-5 py-2.5 md:px-6 md:py-3 rounded-lg font-bold transition-all duration-300 border border-red-500/50 hover:border-red-400/80 group/btn shadow-lg hover:shadow-red-500/25 text-xs md:text-sm"
                      >
                        <svg
                          className="w-3.5 h-3.5 md:w-4 md:h-4 transition-transform group-hover/btn:rotate-12"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                        Browse Other Events
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="lg:sticky lg:top-6">
                <EventRegistrationForm event={event} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
