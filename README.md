# SWASTIKA '26

**National Level Techno-Cultural Fest**  
Mar Baselios Christian College of Engineering and Technology (MBCCET), Peermade

---

## 📅 Event Details

- **Event Name:** Swastika '26
- **Dates:** February 20-21, 2026
- **Venue:** MBCCET, Peermade, Idukki
- **Type:** National Level Techno-Cultural Fest

---

## 🎯 Theme: Ancient Arena, Future Fighters

> *Battles never stopped—only weapons changed. From swords to skills, from warriors to innovators.*

This year's theme blends:
- **Ancient Arena** → Colosseum warriors, competition, honor
- **Future Fighters** → AI, tech, innovation, digital mastery

Swastika '26 is where coders become warriors, designers become creators, gamers become champions, and performers become legends.

---

## 🚀 About This Website

A sophisticated countdown page built with:

### **Tech Stack**
- **Framework:** Next.js 16.1.2 with Turbopack
- **Language:** TypeScript
- **Styling:** Pure CSS (no frameworks)
- **Animations:** CSS Keyframes
- **Fonts:** Google Fonts (Cinzel, Playfair Display, Orbitron, Space Grotesk)

### **Design Features**
✨ Royal typography with serif fonts for ancient elegance  
⚡ Futuristic Orbitron for tech elements  
🎨 Gradient mesh background with pulse animation  
🔲 Grid overlay and vignette effects  
✨ Shimmer animation on theme statement  
🎭 Floating particle system  
📱 Fully responsive design  
⏱️ Real-time countdown timer  

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 20+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/arroward/Swastika26.git

# Navigate to project
cd Swastika26

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

---

## 📂 Project Structure

```
Swastika26/
├── public/
│   └── logo.png              # Event logo
├── src/
│   └── app/
│       ├── globals.css       # Global styles & animations
│       ├── layout.tsx        # Root layout
│       └── page.tsx          # Main countdown page
├── package.json
├── next.config.ts
├── tsconfig.json
└── README.md
```

---

## 🎨 Design System

### Typography
- **Titles:** Cinzel (Royal serif)
- **Subtitles:** Playfair Display (Elegant serif)
- **Tech Elements:** Orbitron (Futuristic)
- **Body:** Space Grotesk (Modern sans-serif)

### Color Palette
- **Primary:** `#ff6b4a` (Warm red-orange)
- **Background:** `#0d0d0d` (Deep black)
- **Accents:** Gradient meshes with red tones
- **Text:** `#fff`, `#999`, `#666` (White to gray scale)

---

## ⚙️ Scripts

- `npm run dev` - Start development server (Turbopack)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

---

## 🌟 Features

### Live Countdown
Dynamic countdown showing:
- Days
- Hours
- Minutes
- Seconds

Until the event begins on **February 20, 2026 at 9:00 AM**

### Animations
- **Mesh Pulse:** 8s infinite background animation
- **Shimmer:** 3s infinite on theme box
- **Status Pulse:** 2s infinite on status text
- **Particle Float:** 6s linear floating particles
- **Hover Effects:** Smooth transitions on countdown cards

### Responsive Design
- Mobile: 2-column countdown grid
- Tablet/Desktop: 4-column countdown grid
- Fluid typography with `clamp()`
- Adaptive spacing

---

## 📝 Important Note

**The name "Swastika" has no connection to any ancient, religious, or cultural symbol.**  
It is simply the official name of our college tech fest.

---

## 👥 Contact

**Mar Baselios Christian College of Engineering and Technology**  
Peermade, Idukki, Kerala

For inquiries about Swastika '26, please contact the college administration.

---

## 📄 License

This project is for MBCCET's official tech fest. All rights reserved.

---

**Built with 💜 for Swastika '26 by the MBCCET Tech Team**

---

## 🔗 Proposed App Structure

```text
┌──────────────────────────────────────────────────────────┐
│                   INTRO / ENTRY SECTION                  │
│                                                          │
│                      [ LOGO MARK ]                       │
│                                                          │
│        Animated background (lines / noise / gradient)    │
│                                                          │
│               “Entering the Experience”                  │
│                                                          │
│           Progress bar / pulse / countdown               │
│                                                          │
│     (Scroll or auto-transition to next section)          │
└──────────────────────────────────────────────────────────┘


      ↓ User starts scrolling ↓
      ↓ Floating Navbar appears ↓


┌──────────────────────────────────────────────────────────┐
│                 FLOATING / STICKY NAVBAR                 │
│  Logo     About     Proshow     Events     Gallery       │
│  (Glass / Blur / Shadow | stays on top while scrolling)  │
└──────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────┐
│                       ABOUT SECTION                      │
│                                                          │
│   ┌──────────────────────┐   ┌──────────────────────┐  │
│   │   About Content      │   │   Visual / Motion     │  │
│   │   Event story        │   │   Graphic / Animation │  │
│   │   Highlights         │   │                      │  │
│   └──────────────────────┘   └──────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────┐
│                     PROSHOW SECTION                      │
│                                                          │
│   ┌──────────────────────────────────────────────────┐  │
│   │                                                  │  │
│   │                 PROSHOW TITLE                    │  │
│   │           Artist / Band / DJ Name                │  │
│   │           Date • Time • Venue                    │  │
│   │                                                  │  │
│   │                [ Know More ]                     │  │
│   │                                                  │  │
│   └──────────────────────────────────────────────────┘  │
│                                                          │
└──────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────┐
│                      EVENTS SECTION                      │
│                                                          │
│   ┌──────────────┐   ┌──────────────┐   ┌────────────┐ │
│   │   Event 1    │   │   Event 2    │   │  Event 3   │ │
│   │   Brief info │   │   Brief info │   │ Brief info │ │
│   │   Date/time  │   │   Date/time  │   │ Date/time  │ │
│   │  [ View → ]  │   │  [ View → ]  │   │ [ View → ] │ │
│   └──────────────┘   └──────────────┘   └────────────┘ │
│                                                          │
└──────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────┐
│                     GALLERY SECTION                     │
│                                                          │
│   ┌───────┐ ┌───────┐ ┌───────┐ ┌───────┐              │
│   │ Img   │ │ Img   │ │ Img   │ │ Img   │              │
│   └───────┘ └───────┘ └───────┘ └───────┘              │
│                                                          │
│   (Hover zoom / Lightbox / Horizontal scroll)            │
│                                                          │
└──────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────┐
│                    FINAL CTA SECTION                     │
│                                                          │
│              “Ready to be part of it?”                   │
│                                                          │
│                  [ Register Now ]                        │
│                                                          │
└──────────────────────────────────────────────────────────┘


┌──────────────────────────────────────────────────────────┐
│                          FOOTER                          │
│   Event Name | Social Links | Contact Info                │
│   © Year Event Name                                       │
└──────────────────────────────────────────────────────────┘
```

