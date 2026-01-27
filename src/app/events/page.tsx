import EventList from "@/components/EventList";
import { getEvents } from "@/lib/db";
import LightRays from "@/components/LightRays";


export default async function Home() {
  // Fetch events from database
  const events = await getEvents();

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-black via-red-950/5 to-black overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 w-screen h-screen">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ff0000"
          raysSpeed={0.8}
          lightSpread={0.6}
          rayLength={3.5}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.1}
          distortion={0.05}
          className="w-full h-full opacity-40"
          pulsating={true}
          fadeDistance={1.2}
          saturation={1.2}
        />

        {/* Additional decorative elements */}
        <div className="absolute top-16 left-6 sm:top-20 sm:left-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-16 right-6 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-red-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-20 lg:py-24 relative z-10 max-w-7xl">
        {/* Hero Section - Compact */}
<<<<<<< HEAD
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-white mb-3 tracking-tight leading-tight">
=======
        <div className="text-center mb-8 md:mb-12">


          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-white mb-3 tracking-tight leading-tight">
>>>>>>> bibin
            Discover Events
          </h1>
        </div>

        {/* Events Section */}
        {events.length === 0 ? (
          <div className="max-w-xl mx-auto px-4 sm:px-0">
            <div className="bg-gradient-to-br from-red-900/20 to-black/40 backdrop-blur-xl border border-red-500/20 rounded-2xl p-6 sm:p-8 md:p-12 text-center shadow-2xl">
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-cinzel">
                Coming Soon
              </h3>
              <p className="text-white/60 text-sm md:text-base font-jost">
                No events available at the moment. Check back soon for exciting
                new events!
              </p>
            </div>
          </div>
        ) : (
          <EventList events={events} />
        )}
<<<<<<< HEAD
=======


>>>>>>> bibin
      </div>
    </div>
  );
}
