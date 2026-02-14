

import { Suspense } from "react";
import Hero from "@/components/sections/Hero";
import AboutEvent from "@/components/sections/AboutEvent";
import AboutCollege from "@/components/sections/AboutCollege";
import MarqueeSection from "@/components/sections/MarqueeSection";
import Proshow from "@/components/sections/Proshow";
import AutoShow from "@/components/sections/AutoShow";
import OnlineEvents from "@/components/sections/OnlineEvents";
import MainstageEvents from "@/components/sections/MainstageEvents";
import Gallery from "@/components/sections/Gallery";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import ScrollManager from "@/components/ScrollManager";
import PassSection from "@/components/sections/PassSection";
import RouteMap from "@/components/sections/RouteMap";

export default function Home() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": "Swastika 2026",
        "startDate": "2026-02-20T09:00:00+05:30",
        "endDate": "2026-02-21T22:00:00+05:30",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "location": {
            "@type": "Place",
            "name": "Mar Baselios Christian College of Engineering and Technology",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Kuttikkanam",
                "addressLocality": "Peermade",
                "postalCode": "685531",
                "addressRegion": "Kerala",
                "addressCountry": "IN"
            }
        },
        "image": [
            "https://swastika.live/logo/wh_sw.png"
        ],
        "description": "National Level Techno-Cultural Fest featuring pro shows, tech events, and workshops.",
        "organizer": {
            "@type": "Organization",
            "name": "MBC College of Engineering",
            "url": "https://mbcpeermade.com"
        },
        "offers": [
            {
                "@type": "Offer",
                "name": "Day 1 Pass",
                "url": "https://swastika.live/pass",
                "price": "50",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-01-01T00:00:00+05:30",
                "description": "Access to Day 1 proshows and events"
            },
            {
                "@type": "Offer",
                "name": "Day 2 Pass",
                "url": "https://swastika.live/pass",
                "price": "60",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-01-01T00:00:00+05:30",
                "description": "Access to Day 2 proshows and events"
            },
            {
                "@type": "Offer",
                "name": "Both Days Combo Pass",
                "url": "https://swastika.live/pass",
                "price": "110",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock",
                "validFrom": "2026-01-01T00:00:00+05:30",
                "description": "Complete access to both Day 1 and Day 2 proshows"
            }
        ]
    };

    return (
        <main className="bg-transparent w-full text-white contents">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
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

            <OnlineEvents />
            <MainstageEvents />
            <Suspense fallback={<div className="h-[50vh] flex items-center justify-center font-cinzel text-white/20 uppercase tracking-widest">Initialising Gallery Assets...</div>}>
                <Gallery />
            </Suspense>

            <CTA />

            <section id="route" className="panel snap-start snap-always w-full h-auto">
                <RouteMap />
            </section>

            <section id="footer" className="panel snap-start snap-always w-full h-auto">
                <Footer />
            </section>
        </main>
    );
}
