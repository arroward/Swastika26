"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Users, Trophy, Code, Palette, Music, Clock, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";

const TARGET_DATE = new Date("2026-02-20T09:00:00").getTime();

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const diff = TARGET_DATE - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="arena-site">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid"></div>
        <div className="hero-content">
          <div className="arena-visual">
            <svg viewBox="0 0 400 400" className="arena-icon">
              {/* Colosseum arches */}
              <circle cx="200" cy="200" r="150" fill="none" stroke="#ff0000" strokeWidth="2" opacity="0.6" />
              <circle cx="200" cy="200" r="120" fill="none" stroke="#ff0000" strokeWidth="1" opacity="0.4" />
              {/* Tech circuits */}
              <path d="M 200 50 L 200 100" stroke="#ff0000" strokeWidth="2" />
              <path d="M 200 300 L 200 350" stroke="#ff0000" strokeWidth="2" />
              <path d="M 50 200 L 100 200" stroke="#ff0000" strokeWidth="2" />
              <path d="M 300 200 L 350 200" stroke="#ff0000" strokeWidth="2" />
              <circle cx="200" cy="100" r="5" fill="#ff0000" />
              <circle cx="200" cy="300" r="5" fill="#ff0000" />
              <circle cx="100" cy="200" r="5" fill="#ff0000" />
              <circle cx="300" cy="200" r="5" fill="#ff0000" />
            </svg>
          </div>

          <h1 className="hero-title glitch" data-text="SWASTIKA '26">
            SWASTIKA '26
          </h1>
          <p className="hero-subtitle">NATIONAL TECHNO-CULTURAL FEST</p>
          <p className="hero-date">FEBRUARY 20 & 21, 2026</p>

          <div className="hero-countdown">
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</span>
              <span className="countdown-label">DAYS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="countdown-label">HOURS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="countdown-label">MINS</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="countdown-label">SECS</span>
            </div>
          </div>

          <div className="hero-buttons">
            <button className="btn-primary">ENTER THE ARENA</button>
            <button className="btn-secondary">VIEW EVENTS</button>
          </div>
        </div>
        <div className="scan-line"></div>
      </section>

      {/* About Section */}
      <section className="about-section section-padding">
        <div className="container-grid">
          <div className="about-content">
            <h2 className="section-title">ABOUT SWASTIKA</h2>
            <p className="about-text">
              Swastika '26 is the National Level Techno-Cultural Fest of Mar Baselios Christian College of
              Engineering and Technology, Peermade. This is where coders become warriors, designers become
              creators, gamers become champions, and performers become legends.
            </p>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-value">50+</div>
                <div className="stat-label">Colleges</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">30+</div>
                <div className="stat-label">Events</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">2000+</div>
                <div className="stat-label">Participants</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">5</div>
                <div className="stat-label">Years Running</div>
              </div>
            </div>
          </div>
          <div className="about-visual">
            <div className="logo-glow"></div>
          </div>
        </div>
      </section>

      {/* Theme Section */}
      <section className="theme-section section-padding">
        <div className="container">
          <h2 className="section-title center">ANCIENT ARENA, FUTURE FIGHTERS</h2>
          <div className="theme-visual-wrapper">
            <div className="theme-visual left">
              <div className="colosseum-outline"></div>
              <span className="theme-label">FROM SWORDS</span>
            </div>
            <div className="circuit-connector"></div>
            <div className="theme-visual right">
              <div className="robot-outline"></div>
              <span className="theme-label">TO SKILLS</span>
            </div>
          </div>
          <p className="theme-description">
            Battles never stopped—only weapons changed. From warriors to innovators,
            the arena is digital, and you fight with brains.
          </p>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section section-padding">
        <div className="container">
          <h2 className="section-title center">BATTLEGROUNDS</h2>
          <div className="events-grid">
            <div className="event-card">
              <div className="card-side-text">TECHNICAL</div>
              <Code className="card-icon" />
              <h3 className="card-title">Technical Events</h3>
              <p className="card-desc">Coding, Hackathons, AI Challenges</p>
            </div>
            <div className="event-card">
              <div className="card-side-text">CULTURAL</div>
              <Music className="card-icon" />
              <h3 className="card-title">Cultural Events</h3>
              <p className="card-desc">Music, Dance, Drama, Fashion</p>
            </div>
            <div className="event-card">
              <div className="card-side-text">GAMING</div>
              <Trophy className="card-icon" />
              <h3 className="card-title">Gaming Arena</h3>
              <p className="card-desc">Esports, Tournaments, Competitions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="schedule-section section-padding">
        <div className="container">
          <h2 className="section-title center">ARENA SCHEDULE</h2>
          <div className="schedule-tabs">
            <button
              className={`tab ${activeDay === 'day1' ? 'active' : ''}`}
              onClick={() => setActiveDay('day1')}
            >
              DAY 1 - FEB 20
            </button>
            <button
              className={`tab ${activeDay === 'day2' ? 'active' : ''}`}
              onClick={() => setActiveDay('day2')}
            >
              DAY 2 - FEB 21
            </button>
          </div>
          <div className="timeline">
            {activeDay === 'day1' ? (
              <>
                <div className="timeline-item">
                  <div className="timeline-time">09:00 AM</div>
                  <div className="timeline-content">
                    <h4>Inauguration Ceremony</h4>
                    <p>Main Arena</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">11:00 AM</div>
                  <div className="timeline-content">
                    <h4>Technical Events Begin</h4>
                    <p>Tech Arena</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">02:00 PM</div>
                  <div className="timeline-content">
                    <h4>Cultural Performances</h4>
                    <p>Main Stage</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="timeline-item">
                  <div className="timeline-time">10:00 AM</div>
                  <div className="timeline-content">
                    <h4>Finals & Competitions</h4>
                    <p>All Arenas</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">04:00 PM</div>
                  <div className="timeline-content">
                    <h4>Prize Distribution</h4>
                    <p>Main Arena</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-time">06:00 PM</div>
                  <div className="timeline-content">
                    <h4>Closing Ceremony</h4>
                    <p>Main Arena</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section className="registration-section section-padding">
        <div className="container">
          <div className="terminal-box">
            <div className="terminal-header">
              <span className="terminal-title">ENTER THE ARENA</span>
            </div>
            <form className="terminal-form">
              <div className="form-group">
                <label>&gt; NAME:</label>
                <input type="text" placeholder="YOUR NAME" />
              </div>
              <div className="form-group">
                <label>&gt; EMAIL:</label>
                <input type="email" placeholder="YOUR EMAIL" />
              </div>
              <div className="form-group">
                <label>&gt; COLLEGE:</label>
                <input type="text" placeholder="YOUR COLLEGE" />
              </div>
              <div className="form-group">
                <label>&gt; PHONE:</label>
                <input type="tel" placeholder="YOUR PHONE" />
              </div>
              <button type="submit" className="btn-submit">JOIN THE BATTLE</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container footer-grid">
          <div className="footer-col">
            <h3 className="footer-title">SWASTIKA '26</h3>
            <p className="footer-text">
              Mar Baselios Christian College of<br />
              Engineering and Technology<br />
              Peermade, Idukki, Kerala
            </p>
            <div className="footer-social">
              <a href="#" className="social-icon"><Facebook size={20} /></a>
              <a href="#" className="social-icon"><Instagram size={20} /></a>
              <a href="#" className="social-icon"><Twitter size={20} /></a>
            </div>
          </div>
          <div className="footer-col">
            <h4 className="footer-subtitle">QUICK LINKS</h4>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#events">Events</a></li>
              <li><a href="#schedule">Schedule</a></li>
              <li><a href="#register">Register</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="footer-subtitle">CONTACT</h4>
            <div className="footer-contact">
              <div className="contact-item">
                <Mail size={16} />
                <span>swastika@mbccet.ac.in</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+91 XXXX XXXXXX</span>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 Swastika. All rights reserved. Built for the Arena.</p>
        </div>
      </footer>
    </main>
  );
}
