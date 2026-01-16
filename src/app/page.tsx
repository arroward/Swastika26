"use client";

import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-02-20T00:00:00").getTime();

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isLive, setIsLive] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; left: string; delay: string; duration: string }>>([]);

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      delay: `${Math.random() * 2}s`,
      duration: `${4 + Math.random() * 4}s`,
    }));
    setParticles(initialParticles);

    // Add new particles periodically
    const particleInterval = setInterval(() => {
      setParticles(prev => [
        ...prev,
        {
          id: Date.now(),
          left: `${Math.random() * 100}vw`,
          delay: '0s',
          duration: `${4 + Math.random() * 4}s`,
        },
      ]);
    }, 800);

    return () => clearInterval(particleInterval);
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = TARGET_DATE - now;

      if (diff <= 0) {
        setIsLive(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  // Clean up old particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(-30)); // Keep only last 30 particles
    }, 10000);
    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      <div className="bg-layer">
        <div className="gradient-mesh"></div>
        <div className="grid-overlay"></div>
        <div className="vignette"></div>
      </div>

      <div className="container">
        <div className="header-section">
          <div className="event-badge">National Level Techno-Cultural Fest</div>
          <h1 className="main-title">SWASTIKA '26</h1>
          <p className="subtitle-line">MAR BASELIOS CHRISTIAN COLLEGE OF ENGINEERING AND TECHNOLOGY</p>
          <p className="subtitle-line">PEERMADE</p>
          <p className="date-line">FEBRUARY 20 – 21, 2026</p>
        </div>

        <div className="theme-statement">
          <h2 className="theme-title">Ancient Arena, Future Fighters</h2>
          <p className="theme-subtitle">
            Battles never stopped—only weapons changed. From swords to skills, from warriors to innovators.
          </p>
        </div>

        <div className="countdown-wrapper">
          <div className="countdown-label">{isLive ? "Event is Live" : "Event Begins In"}</div>
          <div className="countdown-grid">
            <div className="time-block">
              <div className="time-value">{String(timeLeft.days).padStart(2, '0')}</div>
              <div className="time-unit">Days</div>
            </div>
            <div className="time-block">
              <div className="time-value">{String(timeLeft.hours).padStart(2, '0')}</div>
              <div className="time-unit">Hours</div>
            </div>
            <div className="time-block">
              <div className="time-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
              <div className="time-unit">Minutes</div>
            </div>
            <div className="time-block">
              <div className="time-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
              <div className="time-unit">Seconds</div>
            </div>
          </div>
        </div>

        <div className="accent-line"></div>

        <div className="status-message">
          <div className="status-text">{isLive ? "The Battle Has Begun" : "The Arena Awaits"}</div>
        </div>

        <div className="footer-info">
          <p className="college-name">
            Mar Baselios Christian College of Engineering and Technology, Peermade
          </p>
        </div>
      </div>

      {/* Floating Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            bottom: '0',
            animationDuration: particle.duration,
            animationDelay: particle.delay,
          }}
        />
      ))}
    </>
  );
}
