# SWASTIKA '26 🔱

> **National Level Techno-Cultural Fest**  
> Mar Baselios Christian College of Engineering and Technology (MBCCET), Peermade

---

## 📅 Event Details

- **Event Name**: Swastika '26
- **Theme**: *Ancient Arena, Future Fighters*
- **Dates**: February 20-21, 2026
- **Venue**: MBCCET, Peermade, Idukki
- **Website**: [Live Site Link]

---

## 🚀 Overview

Swastika '26 is the flagship techno-cultural fest of MBCCET. This repository houses the official web application for the event, featuring a high-performance, immersive 3D experience.

### Key Highlights
- **Immersive 3D UI**: Built with React Three Fiber & Drei for 3D carousels and interactive backgrounds.
- **Advanced Animations**: Powered by GSAP and Framer Motion for smooth scroll and entry animations.
- **Event Management**: Complete system for browsing events, proshows, and workshops.
- **Registration System**: Secure user registration and admin management using Firebase & NeonDB.
- **Real-time Updates**: Push notifications and dynamic content delivery.

---

## 🛠 Tech Stack

### Frontend Core
- **Next.js 16.1**: Framework with App Router and Server Components.
- **TypeScript**: For type-safe code.
- **Tailwind CSS v4**: Utility-first styling.
- **Lightswind**: Lightweight UI components.

### 3D & Animation
- **Three.js / React Three Fiber**: Core 3D rendering.
- **Drei**: Useful helpers for R3F.
- **GSAP**: Performance-critical animations.
- **Framer Motion**: Gesture-driven interactions.
- **Lenis**: Smooth scrolling.

### Backend & Data
- **Firebase**: Auth & Realtime Database.
- **NeonDB**: Serverless Postgres for relational data.

### Utilities
- **PWA**: Progressive Web App support.
- **JSPDF**: PDF generation for tickets/receipts.
- **Lucide React**: Iconography.

---

## 🌟 Features

### User Interface
- **Premium Splash Screens**: Initial load experience.
- **3D Event Carousel**: Interactive rotating event showcase.
- **Slanted Marquee**: Dynamic scrolling text effects.
- **Shader Backgrounds**: GPU-accelerated visual effects.
- **Responsive Design**: Mobile-first approach.

### Functionality
- **Admin Dashboard**: backend management for admins.
- **Visitor Logger**: Interaction tracking.
- **Proshow Showcase**: Special section for celebrity performers.
- **Auto Show**: Dedicated section for automotive exhibitions.
- **Gallery**: Masonry/Slanted image galleries.

---

## 📂 Project Structure

```
Swastika26/
├── public/              # Static assets (images, models)
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   │   ├── sections/    # Page sections (Hero, Events, etc.)
│   │   ├── ui/          # Reusable UI elements
│   │   └── ...
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility libraries
│   ├── scripts/         # Database maintenance scripts
│   └── styles/          # Global styles
└── ...
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arroward/Swastika26.git
   cd Swastika26
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root with the following:
   ```env
   # Database
   DATABASE_URL=...
   
   # Firebase
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   
   # App Config
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Run Development Server**
   ```bash
   npm run dev
   ```

---

## 📜 Scripts

| Script | Description |
| :--- | :--- |
| `npm run dev` | Starts development server |
| `npm run build` | Builds for production |
| `npm run start` | runs production server |
| `npm run seed` | Seeds initial data |
| `npm run check-env` | Validates environment variables |
| `npm run verify-db` | Verifies database connection |

---

## 🤝 Contributing

1. Fork the repo.
2. Create your feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

## 📞 Contact

**MBCCET Tech Team**  
Mar Baselios Christian College of Engineering and Technology  
Peermade, Idukki, Kerala

---

© 2026 Swastika. All rights reserved.
