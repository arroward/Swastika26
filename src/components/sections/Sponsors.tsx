export default function Sponsors() {
    const sponsors = [
        "Google", "Microsoft", "Amazon", "Tesla", "SpaceX", "Nvidia", "Intel", "AMD"
    ];

    return (
        <section className="py-24 border-y border-white/5 bg-black/50 backdrop-blur-sm relative overflow-hidden">

            <div className="text-center mb-12">
                <span className="text-[var(--accent-main)] text-xs font-bold uppercase tracking-[0.3em] glow-text">Supported By</span>
            </div>

            {/* Infinite Scroll Marquee Left */}
            <div className="marquee-container opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="marquee-content flex gap-16 md:gap-32 items-center text-2xl md:text-4xl font-display font-bold text-white/40">
                    {[...sponsors, ...sponsors].map((s, i) => (
                        <span key={i} className="hover:text-white transition-colors cursor-pointer">{s}</span>
                    ))}
                </div>
            </div>
        </section>
    );
}
