
import { Trophy, Users, GraduationCap, BookOpen, LucideIcon } from 'lucide-react';

// Import split JSON files from config folder
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

const R2_BASE = "https://pub-6ed865235e424323859b654769c59e4e.r2.dev";

// Static mapping for environment variables to prevent hydration mismatch
// Next.js requires literal access to bundle NEXT_PUBLIC_ variables to the client
const envMap: Record<string, string | undefined> = {
    "NEXT_PUBLIC_ABOUT_EVENT_IMAGE_URL": process.env.NEXT_PUBLIC_ABOUT_EVENT_IMAGE_URL,
    "NEXT_PUBLIC_PROSHOW_1": process.env.NEXT_PUBLIC_PROSHOW_1,
    "NEXT_PUBLIC_PROSHOW_2": process.env.NEXT_PUBLIC_PROSHOW_2,
    "NEXT_PUBLIC_R2_PUBLIC_URL": process.env.NEXT_PUBLIC_R2_PUBLIC_URL,
};

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
const withBase = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${R2_BASE}${path.startsWith('/') ? '' : '/'}${path}`;
};

// Proshows
export const proshowContent = {
    ...proshows.proshowContent,
    artists: proshows.proshowContent.artists.map(artist => ({
        ...artist,
        image: envMap[artist.envKey] || withBase(artist.imagePath)
    }))
};

// About Event
export const aboutEventContent = {
    ...about.aboutEventContent,
    image: envMap[about.aboutEventContent.envKey] || withBase(about.aboutEventContent.imagePath)
};

// About College
export const aboutCollegeContent = {
    ...about.aboutCollegeContent,
    images: {
        campus: envMap[about.aboutCollegeContent.images.envKey] || withBase(about.aboutCollegeContent.images.campusPath)
    },
    stats: about.aboutCollegeContent.stats.map(stat => ({
        ...stat,
        icon: iconMap[stat.icon] || Trophy // Fallback icon
    }))
};

// Auto Show
export const autoShowContent = {
    ...autoshow.autoShowContent,
    images: autoshow.autoShowContent.images.map(path => withBase(path))
};

// Developers
export const developers = developersData.developers.map(dev => ({
    ...dev,
    image: withBase(dev.image)
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
