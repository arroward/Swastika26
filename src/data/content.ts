import { Trophy, Users, GraduationCap, BookOpen } from 'lucide-react';

export const proshowContent = {
    title: "PROSHOW",
    subtitle: "The Main Event",
    artists: [
        {
            name: "M-QUBE BAND",
            role: "Live Performance",
            date: "FEB 21",
            image: process.env.NEXT_PUBLIC_PROSHOW_1 || "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/Proshow/IMG_20260124_231343.jpg",
            tags: ["LIVE", "BAND", "FUSION"]
        },
        {
            name: "FEJO",
            role: "Rap Sensation",
            date: "FEB 22",
            image: process.env.NEXT_PUBLIC_PROSHOW_2 || "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/Proshow/572096521_18544823974041491_1124277227909786857_n.jpg",
            tags: ["RAP", "HIPHOP", "MALAYALAM"]
        }
    ]
};

export const aboutEventContent = {
    heading: {
        text: "THE",
        highlight: "SAGA"
    },
    label: "Details",
    description1: "Swastika is the National-Level Techno-Cultural Fest of Mar Baselios Christian College of Engineering and Technology, Peermade. It is a high-octane celebration of technology, creativity, and culture that brings together passionate students from across the country to compete, collaborate, and showcase their talent on a national stage.",
    description2: "With participants from diverse engineering streams and cultural backgrounds, Swastika becomes a vibrant melting pot of ideas, innovation, and energy. From intense technical challenges to electrifying cultural performances, the fest is designed to inspire, engage, and ignite the spirit of young innovators.",
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
    description: "A premier self-financing institution offering quality engineering education in a serene hill-station campus. Fostering innovation, research, and holistic development for the future generation.",
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
