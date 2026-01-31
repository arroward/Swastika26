
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

const R2_BASE = "https://cdn.swastika.live/";

// Static mapping for environment variables to prevent hydration mismatch
const envMap: Record<string, string | undefined> = {
    "NEXT_PUBLIC_ABOUT_EVENT_IMAGE_URL": process.env.NEXT_PUBLIC_ABOUT_EVENT_IMAGE_URL,
    "NEXT_PUBLIC_PROSHOW_1": process.env.NEXT_PUBLIC_PROSHOW_1,
    "NEXT_PUBLIC_PROSHOW_2": process.env.NEXT_PUBLIC_PROSHOW_2,
    "NEXT_PUBLIC_R2_PUBLIC_URL": process.env.NEXT_PUBLIC_R2_PUBLIC_URL,
};

const withBase = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${R2_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Hydration Functions

export const hydrateProshow = (content: any) => ({
    ...content,
    artists: content.artists.map((artist: any) => ({
        ...artist,
        image: (artist.envKey && envMap[artist.envKey]) || withBase(artist.imagePath)
    }))
});

export const hydrateAboutEvent = (content: any) => ({
    ...content,
    image: (content.envKey && envMap[content.envKey]) || withBase(content.imagePath)
});

export const hydrateAboutCollege = (content: any) => ({
    ...content,
    images: {
        campus: (content.images.envKey && envMap[content.images.envKey]) || withBase(content.images.campusPath)
    },
    stats: content.stats.map((stat: any) => ({
        ...stat,
        icon: iconMap[stat.icon] || Trophy
    }))
});

export const hydrateAll = (data: any) => {
    return {
        ...data,
        proshowContent: hydrateProshow(data.proshowContent),
        aboutEventContent: hydrateAboutEvent(data.aboutEventContent),
        aboutCollegeContent: hydrateAboutCollege(data.aboutCollegeContent),
    };
};
