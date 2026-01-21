export default function Marquee() {
    return (
        <div className="py-8 bg-black/50 backdrop-blur-sm z-20 relative border-y border-white/5 overflow-hidden">
            <div className="marquee-container font-display text-4xl md:text-8xl font-black text-transparent stroke-text opacity-30 select-none pointer-events-none">
                <div className="marquee-content flex gap-12 md:gap-24 items-center">
                    <span>INNOVATE</span>
                    <div className="w-4 h-4 md:w-8 md:h-8 rounded-full border-2 border-white/20" />
                    <span>DISRUPT</span>
                    <div className="w-4 h-4 md:w-8 md:h-8 rounded-full border-2 border-white/20" />
                    <span>CREATE</span>
                    <div className="w-4 h-4 md:w-8 md:h-8 rounded-full border-2 border-white/20" />
                    <span>EVOLVE</span>
                    <div className="w-4 h-4 md:w-8 md:h-8 rounded-full border-2 border-white/20" />
                    <span>INNOVATE</span>
                    <div className="w-4 h-4 md:w-8 md:h-8 rounded-full border-2 border-white/20" />
                    <span>DISRUPT</span>
                </div>
            </div>
        </div>
    );
}
