import { Trophy, Users, GraduationCap, BookOpen } from 'lucide-react';

export const proshowContent = {
    title: "PROSHOW",
    subtitle: "CLASH OF CHAMPIONS",
    artists: [
        {
            name: "M-QUBE BAND",
            role: "SONIC ARTILLERY",
            date: "FEB 21",
            image: process.env.NEXT_PUBLIC_PROSHOW_1 || "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/Proshow/IMG_20260124_231343.jpg",
            tags: ["LIVE", "BAND", "FUSION"]
        },
        {
            name: "FEJO",
            role: "LYRICAL TITAN",
            date: "FEB 22",
            image: process.env.NEXT_PUBLIC_PROSHOW_2 || "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/Proshow/572096521_18544823974041491_1124277227909786857_n.jpg",
            tags: ["RAP", "HIPHOP", "MALAYALAM"]
        }
    ]
};

export const aboutEventContent = {
    heading: {
        text: "THE",
        highlight: "ODYSSEY"
    },
    label: "Details",
    description1: "Swastika is the National-Level Techno-Cultural Fest of Mar Baselios Christian College of Engineering and Technology, Peermade. It is a digital colosseum where 5000+ warriors from across the nation converge to test their mettle in a spectacle of code, culture, and conquest.",
    description2: "A melting pot of diverse engineering streams and cultural identities, Swastika transforms the campus into a citadel of innovation. From high-stakes technical duels to electrifying cultural showcases, every event is a battle for glory.",
    visualTitle: "SWASTIKA",
    yearText: "2026 EDITION",
    image: process.env.NEXT_PUBLIC_ABOUT_EVENT_IMAGE_URL
};

export const aboutCollegeContent = {
    location: "Peermade, Kerala",
    title: {
        line1: "Mar Baselios",
        highlight: "Christian College"
    },
    established: "2001",
    description: "A premier citadel of engineering education perched in the high ranges. We forge the next generation of innovators through rigorous academic discipline and holistic development.",
    images: {
        campus: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/about/DJI_0926.jpg`
    },
    stats: [
        { label: "Legacy", value: "25+", icon: Trophy },
        { label: "Community", value: "10k", icon: Users },
        { label: "Programs", value: "50+", icon: GraduationCap },
        { label: "Research", value: "High", icon: BookOpen }
    ]
};

export const footerContent = {
    brandTitle: "SWASTIKA",
    edition: "2026 EDITION",
    navLinks: [
        { name: 'Events', href: '/events' },
        { name: 'Proshow', href: '/proshow' },
        { name: 'Register', href: '/register' },
        { name: 'Gallery', href: '/gallery' }
    ],
    social: {
        instagram: {
            url: "https://instagram.com/swastika_2k26",
            handle: "@swastika_2k26"
        }
    },
    tickerText: "LEGACY BEYOND LIMITS —",
    credits: "SWASTIKA'26 Tech Team"
};
