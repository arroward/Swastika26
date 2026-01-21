'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PillNav from './PillNav';

export default function ScrollNav() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeSection, setActiveSection] = useState('#home');

    useEffect(() => {
        const handleScroll = () => {
            // Show nav when scrolled past 80% of the viewport height
            const threshold = window.innerHeight * 0.8;
            setIsVisible(window.scrollY > threshold);

            // Determine active section
            const sections = [
                { id: 'home', href: '#home' },
                { id: 'about', href: '#about' }, // About section
                { id: 'events', href: '#events' }, // Maps to Services
                { id: 'footer', href: '#footer' } // Maps to Contact
            ];

            let current = '#home';

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // If section is roughly in view (taking up the middle of the screen)
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        current = section.href;
                    }
                }
            }

            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const refinedItems = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Services', href: '#events' },
        { label: 'Contact', href: '#footer' }
    ];

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="fixed bottom-8 left-0 right-0 z-50 flex justify-center pointer-events-none"
                >
                    <div className="pointer-events-auto">
                        <PillNav
                            logo="/w-logo_n.svg"
                            logoAlt="Swastika Logo"
                            items={refinedItems}
                            activeHref={activeSection}
                            className="custom-nav"
                            ease="power2.easeOut"
                            baseColor="rgba(0, 0, 0, 0.8)"
                            pillColor="#ffffff"
                            hoveredPillTextColor="#ffffff"
                            pillTextColor="#000000"
                            theme="dark"
                            initialLoadAnimation={false}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
