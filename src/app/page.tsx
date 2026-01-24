

import Hero from "@/components/sections/Hero";
import AboutEvent from "@/components/sections/AboutEvent";
import AboutCollege from "@/components/sections/AboutCollege";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Proshow from "@/components/sections/Proshow";
import Events from "@/components/sections/Events";
import Gallery from "@/components/sections/Gallery";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="bg-transparent w-full text-white relative">
      {/* Premium Cursor Lighting */}

      <section id="home" className="snap-start snap-always w-full h-auto">
        <Hero />
      </section>
      <section id="about" className="snap-start snap-always w-full h-auto">
        <AboutEvent />
      </section>
      <section className="snap-start snap-always w-full h-auto">
        <AboutCollege />
      </section>
      <section className="snap-start snap-always w-full h-auto">
        <MarqueeSection />
      </section>
      <section id="proshow" className="snap-start snap-always w-full h-auto">
        <Proshow />
      </section>
      <section id="events" className="snap-start snap-always w-full h-auto">
        <Events />
      </section>
      <section id="gallery" className="snap-start snap-always w-full h-auto">
        <Gallery />
      </section>
      <section className="snap-start snap-always w-full h-auto">
        <CTA />
      </section>
      <section id="footer" className="snap-start snap-always w-full h-auto">
        <Footer />
      </section>
    </main>
  );
}
