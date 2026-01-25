import { Trophy, Users, GraduationCap, BookOpen } from 'lucide-react';

export const proshowContent = {
    title: "PROSHOW",
    subtitle: "Featured Performances",
    artists: [
        {
            name: "MQUBE BAND",
            role: "Live Music Performance",
            date: "February 20",
            image:
                process.env.NEXT_PUBLIC_PROSHOW_1 ||
                "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/Proshow/IMG_20260124_231343.jpg",
            tags: ["Live", "Band", "Fusion"]
        },
        {
            name: "FEJO",
            role: "Rap Music Performance",
            date: "February 21",
            image:
                process.env.NEXT_PUBLIC_PROSHOW_2 ||
                "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/Proshow/572096521_18544823974041491_1124277227909786857_n.jpg",
            tags: ["Rap", "Hip Hop", "Malayalam"]
        }
    ]
};

export const aboutEventContent = {
    heading: {
        text: "THE",
        highlight: "EVENT"
    },
    label: "Overview",
    description1:
        "Swastika is a national-level techno-cultural festival organized by Mar Baselios Christian College of Engineering and Technology, Peermade. The event brings together students from institutions across India to participate in a wide range of technical and cultural activities.",
    description2:
        "The festival provides a platform for collaboration, creativity, and knowledge sharing among participants from various engineering disciplines. It includes technical competitions, cultural programs, and interactive sessions designed to encourage innovation and teamwork.",
    visualTitle: "SWASTIKA",
    yearText: "2026 Edition",
    image: process.env.NEXT_PUBLIC_ABOUT_EVENT_IMAGE_URL
};

export const aboutCollegeContent = {
    location: "Peermade, Kerala",
    title: {
        line1: "Mar Baselios",
        highlight: "Christian College of Engineering and Technology"
    },
    established: "2001",
    description:
        "Mar Baselios Christian College of Engineering and Technology is an institution dedicated to providing quality engineering education. The college emphasizes academic excellence, research, and the overall development of students.",
    images: {
        campus: `${process.env.NEXT_PUBLIC_R2_PUBLIC_URL}/about/DJI_0926.jpg`
    },
    stats: [
        { label: "Years of Operation", value: "25+", icon: Trophy },
        { label: "Students and Alumni", value: "10,000+", icon: Users },
        { label: "Academic Programs", value: "50+", icon: GraduationCap },
        { label: "Research Focus", value: "Strong", icon: BookOpen }
    ]
};

export const footerContent = {
    brandTitle: "SWASTIKA",
    edition: "2026 Edition",
    navLinks: [
        { name: "Events", href: "/events" },
        { name: "Proshow", href: "/#proshow" },
        { name: "Register", href: "/#events" },
        { name: "Gallery", href: "/#gallery" }
    ],
    email: "swastika26@mbcpeermade.com",
    social: {
        instagram: {
            url: "https://instagram.com/swastika_2k26",
            handle: "@swastika_2k26"
        }
    },
    tickerText: "Swastika 2026 —",
    credits: "Swastika 2026 Technical Team"
};

export const autoShowContent = {
    title: "AUTO SHOW",
    description: "Experience the adrenaline of precision driving and automotive excellence. Witness the finest collection of modified cars.",
    images: [
        "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/autoshow/AU-(1).jpeg",
        "https://pub-6ed865235e424323859b654769c59e4e.r2.dev/autoshow/AU.jpeg"
    ],
    location: "Main Ground",
    date: "February 20"
};
