import LightRays from "@/components/LightRays";
import Link from "next/link";

export default function EventsLandingPage() {
  return (
    <div className="min-h-screen relative bg-gradient-to-b from-black via-red-950/5 to-black overflow-hidden flex items-center justify-center">
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

        {/* Decorative blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-800/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-white mb-12 tracking-tight drop-shadow-2xl">
          Explore Events
        </h1>

        <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center items-center max-w-4xl mx-auto">
          <Link
            href="/events/online"
            className="group relative w-full md:w-1/2 overflow-hidden rounded-2xl bg-black/40 border border-red-500/20 backdrop-blur-md p-8 sm:p-12 hover:border-red-500/50 transition-all duration-500 hover:scale-[1.02] hover:bg-black/50"
          >
            <div className="absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors duration-500"></div>
            <div className="relative z-10">
              <span className="block text-sm font-mono text-red-400 mb-2 tracking-widest uppercase">Global</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white group-hover:text-red-200 transition-colors">Online Events</h2>
              <div className="mt-4 inline-flex items-center text-white/60 group-hover:text-white transition-colors">
                <span>View all</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
          </Link>

          <Link
            href="/events/mainstage"
            className="group relative w-full md:w-1/2 overflow-hidden rounded-2xl bg-black/40 border border-red-500/20 backdrop-blur-md p-8 sm:p-12 hover:border-red-500/50 transition-all duration-500 hover:scale-[1.02] hover:bg-black/50"
          >
            <div className="absolute inset-0 bg-red-600/5 group-hover:bg-red-600/10 transition-colors duration-500"></div>
            <div className="relative z-10">
              <span className="block text-sm font-mono text-red-400 mb-2 tracking-widest uppercase">Live</span>
              <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-white group-hover:text-red-200 transition-colors">Mainstage Events</h2>
              <div className="mt-4 inline-flex items-center text-white/60 group-hover:text-white transition-colors">
                <span>View all</span>
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}