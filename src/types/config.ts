
export interface NavLink {
    title: string;
    href: string;
}

export interface SiteConfig {
    name: string;
    year: string;
    tagline: string;
    fullname: string;
    dates: {
        display: string;
        start: string;
        end: string;
    };
    logos: {
        main: string;
        alt: string;
        preload: string[];
    };
    meta: {
        title: string;
        description: string;
        themeColor: string;
    };
    effects: {
        noise: {
            enabled: boolean;
            opacity: number;
            pattern: string;
        };
    };
    gallery: {
        speed: number;
    };
    payment: {
        upiId: string;
    };
    contact: {
        email: string;
        phone: string;
    };
    navigation: NavLink[];
}

export interface AppConfig {
    splashScreen: {
        type: 'cinematic' | 'classic' | 'random';
    };
}

export interface HeroContent {
    title: string;
    year: string;
    subtitle: string;
    dates: string;
    label: string;
}

export interface Artist {
    name: string;
    role: string;
    date: string;
    imagePath: string;
    image?: string; // Hydrated
    envKey?: string;
    tags: string[];
}

export interface ProshowContent {
    title: string;
    subtitle: string;
    artists: Artist[];
}

export interface AboutEventContent {
    heading: {
        text: string;
        highlight: string;
    };
    label: string;
    description1: string;
    description2: string;
    visualTitle: string;
    yearText: string;
    imagePath: string;
    image?: string; // Hydrated
    envKey?: string;
}

export interface Stat {
    label: string;
    value: string;
    icon: string; // Icon name as string in JSON
}

export interface AboutCollegeContent {
    location: string;
    title: {
        line1: string;
        highlight: string;
    };
    established: string;
    labels: {
        est: string;
    };
    description: string;
    images: {
        campusPath: string;
        campus?: string; // Hydrated
        envKey?: string;
    };
    stats: Stat[];
}

export interface FooterContent {
    brandTitle: string;
    edition: string;
    navLinks: { name: string; href: string }[];
    email: string;
    labels: {
        menu: string;
        connect: string;
        email: string;
        follow: string;
        crafted: string;
    };
    social: {
        instagram: {
            url: string;
            handle: string;
        };
    };
    tickerText: string;
    credits: string;
}

export interface AutoShowContent {
    title: string;
    description: string;
    images: string[];
    location: string;
    date: string;
    organizer: string;
    displayTitle: {
        line1: string;
        line2: string;
    };
}

export interface TicketContent {
    walletTitle: string;
    walletSubtitle: string;
    downloadButton: string;
    footerMessage: string;
    eventTitle: string;
    venue: string;
    time: string;
    labels: {
        bookingId: string;
        venue: string;
        time: string;
        date: string;
        name: string;
        ticket: string;
    };
    types: {
        combo: string;
        day1: string;
        day2: string;
        default: string;
    };
    dates: {
        combo: string;
        day1: string;
        day2: string;
        day3?: string;
    };
}

export interface Developer {
    id: number;
    name: string;
    role: string;
    image: string;
    bio: string;
    tech: string[];
    socials: { [key: string]: string };
}

export interface PassSectionContent {
    badge: string;
    title: {
        line1: string;
        line2: string;
    };
    description: string;
    features: { icon: string; text: string }[];
    cta: string;
    card: {
        title: string;
        subtitle: string;
        nights: string;
        nightsLabel: string;
        badge: string;
    };
}

export interface PassPageContent {
    header: {
        title: string;
        subtitle: string;
    };
    steps: string[];
    selection: {
        title: string;
        subtitle: string;
        options: {
            [key: string]: {
                id: string;
                label: string;
                price: number;
                details: {
                    title: string;
                    artist: string;
                    genre: string;
                    description: string;
                };
            };
        };
    };
    details: {
        title: string;
        labels: {
            name: string;
            email: string;
            phone: string;
            emailHint: string;
        };
    };
    preview: {
        title: string;
        subtitle: string;
        passDetailsLabel: string;
        totalLabel: string;
        attendeeLabel: string;
    };
    payment: {
        title: string;
        instructions: string;
        transactionLabel: string;
        transactionHint: string;
        buttons: {
            verify: string;
            complete: string;
        };
    };
    success: {
        title: string;
        message: string;
        subMessage: string;
        homeButton: string;
    };
}

export interface CtaContent {
    line1: string;
    line2: string;
    main: string;
}

export interface Event {
    slug: string;
    title: string;
    tagline: string;
    category: string;
    date: string;
    time: string;
    venue: string;
    mode: string;
    teamSize: string;
    eligibility: string;
    deadline: string;
    description: string;
    rules: string[];
    timeline: { time: string; activity: string }[];
    prizes: string[];
    coordinator: {
        name: string;
        role: string;
        contact: string;
    };
    image: string;
}

export interface FullConfig {
    siteConfig: SiteConfig;
    appConfig: AppConfig;
    heroContent: HeroContent;
    proshowContent: ProshowContent;
    aboutEventContent: AboutEventContent;
    aboutCollegeContent: AboutCollegeContent;
    footerContent: FooterContent;
    autoShowContent: AutoShowContent;
    ticketContent: TicketContent;
    developers: Developer[];
    passSectionContent: PassSectionContent;
    passPageContent: PassPageContent;
    ctaContent: CtaContent;
    marqueeContent: string[];
    events: Event[];
}
