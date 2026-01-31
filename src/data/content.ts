
import { Trophy, Users, GraduationCap, BookOpen, LucideIcon } from 'lucide-react';

// Import split JSON files from ignored config folder
import site from './config/site.json';
import app from './config/app.json';
import hero from './config/hero.json';
import proshows from './config/proshows.json';
import about from './config/about.json';
import footer from './config/footer.json';
import autoshow from './config/autoshow.json';
import tickets from './config/tickets.json';
import developersData from './config/developers.json';
import pass from './config/pass.json';
import cta_marquee from './config/cta_marquee.json';
import eventsData from './config/events.json';

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

// Icon Map
const iconMap: { [key: string]: LucideIcon } = {
    Trophy,
    Users,
    GraduationCap,
    BookOpen
};

// 1. Initial Raw Content Extraction
export const siteConfig = site.siteConfig;
export const appConfig = app.appConfig;
export const heroContent = hero.heroContent;
export const footerContent = footer.footerContent;
export const ticketContent = tickets.ticketContent;
export const passSectionContent = pass.passSectionContent;
export const passPageContent = pass.passPageContent;
export const ctaContent = cta_marquee.ctaContent;
export const marqueeContent = cta_marquee.marqueeContent;
export const events = eventsData.events;
export const eventsSectionContent = eventsData.eventsSectionContent;

// 2. Hydration Logic
// Proshows
export const proshowContent = {
    ...proshows.proshowContent,
    artists: proshows.proshowContent.artists.map(artist => ({
        ...artist,
        image: process.env[artist.envKey as keyof NodeJS.ProcessEnv] || `${R2_BASE}${artist.imagePath}`
    }))
};

// About Event
export const aboutEventContent = {
    ...about.aboutEventContent,
    image: process.env[about.aboutEventContent.envKey as keyof NodeJS.ProcessEnv] || `${R2_BASE}${about.aboutEventContent.imagePath}`
};

// About College
export const aboutCollegeContent = {
    ...about.aboutCollegeContent,
    images: {
        campus: `${process.env[about.aboutCollegeContent.images.envKey as keyof NodeJS.ProcessEnv] || R2_BASE}${about.aboutCollegeContent.images.campusPath}`
    },
    stats: about.aboutCollegeContent.stats.map(stat => ({
        ...stat,
        icon: iconMap[stat.icon] || Trophy // Fallback icon
    }))
};

// Auto Show
export const autoShowContent = {
    ...autoshow.autoShowContent,
    images: autoshow.autoShowContent.images.map(path => `${R2_BASE}${path}`)
};

// Developers
export const developers = developersData.developers.map(dev => ({
    ...dev,
    image: `${R2_BASE}${dev.image}`
}));

// 3. Final Unified Export
const finalData = {
    siteConfig,
    appConfig,
    heroContent,
    proshowContent,
    aboutEventContent,
    aboutCollegeContent,
    footerContent,
    autoShowContent,
    ticketContent,
    developers,
    passSectionContent,
    passPageContent,
    ctaContent,
    marqueeContent,
    events,
    eventsSectionContent
};

export default finalData;
