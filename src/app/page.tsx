

import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import AboutEvent from "@/components/sections/AboutEvent";
import AboutCollege from "@/components/sections/AboutCollege";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Proshow from "@/components/sections/Proshow";
import AutoShow from "@/components/sections/AutoShow";
import Events from "@/components/sections/Events";
import Gallery from "@/components/sections/Gallery";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import ScrollManager from "@/components/ScrollManager";
import PassSection from "@/components/sections/PassSection";

export default function Home() {
    return (
        <main className="bg-transparent w-full text-white contents">
            <ScrollManager />
            {/* Premium Cursor Lighting */}

            <section id="home" className="panel snap-start snap-always w-full h-auto">
                <Hero />
            </section>
            <section id="about" className="panel snap-start snap-always w-full h-auto">
                <AboutEvent />
            </section>
            <section className="panel snap-start snap-always w-full h-auto">
                <AboutCollege />
            </section>
            <section className="panel snap-start snap-always w-full h-auto">
                <MarqueeSection />
            </section>

            <Proshow />

            <section id="pass" className="panel snap-start snap-always w-full h-auto">
                <PassSection />
            </section>

            <section id="autoshow" className="panel snap-start snap-always w-full h-auto">
                <AutoShow />
            </section>

            <section id="events" className="panel snap-start snap-always w-full h-auto">
                <Events />
            </section>
            <Suspense fallback={<div className="h-[50vh] flex items-center justify-center font-cinzel text-white/20 uppercase tracking-widest">Initialising Gallery Assets...</div>}>
                <Gallery />
            </Suspense>

            <CTA />

            <section id="footer" className="panel snap-start snap-always w-full h-auto">
                <Footer />
            </section>
        </main>
    );
}
