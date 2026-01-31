
import { Trophy, Users, GraduationCap, BookOpen, LucideIcon } from 'lucide-react';

const R2_BASE = process.env.NEXT_PUBLIC_R2_PUBLIC_URL || '';

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



// Icon Map
const iconMap: { [key: string]: LucideIcon } = {
    Trophy,
    Users,
    GraduationCap,
    BookOpen
};

// Re-export combined static content
export const siteConfig = site.siteConfig;
export const appConfig = app.appConfig;
export const heroContent = hero.heroContent;
export const footerContent = footer.footerContent;
export const ticketContent = tickets.ticketContent;
const rawDevelopers = developersData.developers;
export const passSectionContent = pass.passSectionContent;
export const passPageContent = pass.passPageContent;
export const ctaContent = cta_marquee.ctaContent;
export const marqueeContent = cta_marquee.marqueeContent;
export const events = eventsData.events;
export const eventsSectionContent = eventsData.eventsSectionContent;

// Combined data object for the hydration utility
const data = {
    siteConfig,
    appConfig,
    heroContent,
    proshowContent: proshows.proshowContent,
    aboutEventContent: about.aboutEventContent,
    aboutCollegeContent: about.aboutCollegeContent,
    footerContent,
    autoShowContent: autoshow.autoShowContent,
    ticketContent,
    developers: rawDevelopers,
    passSectionContent,
    passPageContent,
    ctaContent,
    marqueeContent,
    events,
    eventsSectionContent
};

// Hydrate Proshow Content (Images + Env Vars)
export const proshowContent = {
    ...data.proshowContent,
    artists: data.proshowContent.artists.map(artist => ({
        ...artist,
        image: process.env[artist.envKey as keyof NodeJS.ProcessEnv] || `${R2_BASE}${artist.imagePath}`
    }))
};

// Hydrate About Event Content (Image + Env Var)
export const aboutEventContent = {
    ...data.aboutEventContent,
    image: process.env[data.aboutEventContent.envKey as keyof NodeJS.ProcessEnv] || `${R2_BASE}${data.aboutEventContent.imagePath}`
};

// Hydrate About College Content (Image + Icons)
export const aboutCollegeContent = {
    ...data.aboutCollegeContent,
    images: {
        campus: `${process.env[data.aboutCollegeContent.images.envKey as keyof NodeJS.ProcessEnv] || R2_BASE}${data.aboutCollegeContent.images.campusPath}`
    },
    stats: data.aboutCollegeContent.stats.map(stat => ({
        ...stat,
        icon: iconMap[stat.icon] || Trophy // Fallback icon
    }))
};

// Hydrate Auto Show Content (Images)
export const autoShowContent = {
    ...data.autoShowContent,
    images: data.autoShowContent.images.map(path => `${R2_BASE}${path}`)
};

// Hydrate Developers (Images)
export const developers = data.developers.map(dev => ({
    ...dev,
    image: `${R2_BASE}${dev.image}`
}));

const finalData = {
    ...data,
    proshowContent,
    aboutEventContent,
    aboutCollegeContent,
    autoShowContent,
    developers
};

export default finalData;
