
import {
    Trophy, Users, GraduationCap, BookOpen,
    Calendar, Music, MapPin, Clock, Ticket,
    LucideIcon
} from 'lucide-react';

// Base Maps for Hydration
const iconMap: { [key: string]: LucideIcon } = {
    Trophy, Users, GraduationCap, BookOpen,
    Calendar, Music, MapPin, Clock, Ticket
};

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

// Hydration Functions

export const hydrateProshow = (content: any) => ({
    ...content,
    artists: content.artists.map((artist: any) => ({
        ...artist,
        image: (artist.envKey && process.env[artist.envKey]) || (artist.imagePath.startsWith('http') ? artist.imagePath : `${R2_BASE}${artist.imagePath}`)
    }))
});

export const hydrateAboutEvent = (content: any) => ({
    ...content,
    image: (content.envKey && process.env[content.envKey]) || (content.imagePath.startsWith('http') ? content.imagePath : `${R2_BASE}${content.imagePath}`)
});

export const hydrateAboutCollege = (content: any) => ({
    ...content,
    images: {
        campus: (content.images.envKey && process.env[content.images.envKey]) || (content.images.campusPath.startsWith('http') ? content.images.campusPath : `${R2_BASE}${content.images.campusPath}`)
    },
    stats: content.stats.map((stat: any) => ({
        ...stat,
        icon: iconMap[stat.icon] || Trophy
    }))
});

export const hydrateAutoShow = (content: any) => ({
    ...content,
    images: content.images.map((path: string) => path.startsWith('http') ? path : `${R2_BASE}${path}`)
});

export const hydratePassSection = (content: any) => ({
    ...content
    // Add icon processing if needed later
});

export const hydrateAll = (data: any) => {
    return {
        ...data,
        proshowContent: hydrateProshow(data.proshowContent),
        aboutEventContent: hydrateAboutEvent(data.aboutEventContent),
        aboutCollegeContent: hydrateAboutCollege(data.aboutCollegeContent),
        autoShowContent: hydrateAutoShow(data.autoShowContent),
        passSectionContent: hydratePassSection(data.passSectionContent)
    };
};
