import { Code, Rocket, Users, Wallet } from 'lucide-react';

const targets = [
    { icon: <Rocket className="w-8 h-8 md:w-12 md:h-12" />, label: "Founders", desc: "Showcase your MVP to investors" },
    { icon: <Code className="w-8 h-8 md:w-12 md:h-12" />, label: "Developers", desc: "Build the future in 24h Hackathons" },
    { icon: <Wallet className="w-8 h-8 md:w-12 md:h-12" />, label: "Investors", desc: "Find the next unicorn startup" },
    { icon: <Users className="w-8 h-8 md:w-12 md:h-12" />, label: "Students", desc: "Learn from industry experts" },
];

export default function WhoShouldAttend() {
    return (
        <section className="py-24 px-6 md:px-12 bg-white/5 mx-6 md:mx-12 rounded-[3rem] relative overflow-hidden">
            {/* Background Noise/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--accent-main)]/5 to-transparent pointer-events-none" />

            <div className="text-center mb-20 relative z-10">
                <h2 className="text-4xl md:text-6xl font-display font-bold">Who is this for?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-[1600px] mx-auto relative z-10">
                {targets.map((t, i) => (
                    <div key={i} className="group h-[300px] md:h-[400px] bg-black border border-white/10 rounded-2xl flex flex-col items-center justify-center gap-6 p-6 hover:border-[var(--accent-main)] transition-colors duration-500 relative overflow-hidden cursor-default">

                        {/* Hover Glow */}
                        <div className="absolute inset-0 bg-[var(--accent-main)] opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                        <div className="bg-white/5 p-6 rounded-full text-white group-hover:scale-110 group-hover:bg-[var(--accent-main)] group-hover:text-white transition-all duration-500">
                            {t.icon}
                        </div>

                        <div className="text-center">
                            <h3 className="font-display font-bold text-2xl mb-2">{t.label}</h3>
                            <p className="text-[var(--text-secondary)] text-sm">{t.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
