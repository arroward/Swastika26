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


        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-white mb-4 tracking-tight drop-shadow-2xl">
          Explore Events
        </h1>

        <p className="text-white/40 text-sm md:text-base max-w-md mx-auto mb-14 font-light">
          Choose your arena
        </p>

        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-stretch max-w-5xl mx-auto">
          {/* Online Events Card */}
          <Link
            href="/events/online"
            className="group relative w-full md:w-1/2 overflow-hidden rounded-2xl border border-red-500/15 backdrop-blur-xl transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_-10px_rgba(220,38,38,0.25)]"
          >
            {/* Card gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black/60 to-black/80 group-hover:from-red-950/50 group-hover:via-red-900/20 transition-all duration-700"></div>
            {/* Glow line at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent group-hover:via-red-400/70 transition-all duration-500"></div>
            {/* Animated corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full group-hover:from-red-500/20 transition-all duration-500"></div>

            <div className="relative z-10 p-8 sm:p-10 md:p-12 flex flex-col items-start text-left">


              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white group-hover:text-red-100 transition-colors leading-tight mb-3">
                Online<br />Events
              </h2>



              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm group-hover:bg-red-500/15 group-hover:border-red-500/30 group-hover:text-white transition-all duration-300">
                <span>Browse events</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
          </Link>

          {/* Mainstage Events Card */}
          <Link
            href="/events/mainstage"
            className="group relative w-full md:w-1/2 overflow-hidden rounded-2xl border border-red-500/15 backdrop-blur-xl transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_-10px_rgba(220,38,38,0.25)]"
          >
            {/* Card gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-black/60 to-black/80 group-hover:from-red-950/50 group-hover:via-red-900/20 transition-all duration-700"></div>
            {/* Glow line at top */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent group-hover:via-red-400/70 transition-all duration-500"></div>
            {/* Animated corner accent */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-red-500/10 to-transparent rounded-bl-full group-hover:from-red-500/20 transition-all duration-500"></div>

            <div className="relative z-10 p-8 sm:p-10 md:p-12 flex flex-col items-start text-left">
              <div className="flex items-center gap-2 mb-5">

              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cinzel text-white group-hover:text-red-100 transition-colors leading-tight mb-3">
                Mainstage<br />Events
              </h2>



              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm group-hover:bg-red-500/15 group-hover:border-red-500/30 group-hover:text-white transition-all duration-300">
                <span>Browse events</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500/30"></div>
          <div className="w-1 h-1 rounded-full bg-red-500/20"></div>
          <div className="w-0.5 h-0.5 rounded-full bg-red-500/10"></div>
        </div>
      </div>
    </div>
  );
}