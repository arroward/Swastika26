
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

// Hydration Functions

export const hydrateProshow = (content: any) => ({
    ...content,
    artists: content.artists.map((artist: any) => ({
        ...artist,
        image: (artist.envKey && process.env[artist.envKey]) || artist.imagePath
    }))
});

export const hydrateAboutEvent = (content: any) => ({
    ...content,
    image: (content.envKey && process.env[content.envKey]) || content.imagePath
});

export const hydrateAboutCollege = (content: any) => ({
    ...content,
    images: {
        campus: (content.images.envKey && process.env[content.images.envKey]) || content.images.campusPath
    },
    stats: content.stats.map((stat: any) => ({
        ...stat,
        icon: iconMap[stat.icon] || Trophy
    }))
});

export const hydrateAutoShow = (content: any) => ({
    ...content,
    images: content.images
});

export const hydratePassSection = (content: any) => ({
    ...content
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
