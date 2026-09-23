import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

/**
 * Navbar component with scroll-aware visibility.
 * @param {boolean} isVisible - Controlled by Home.jsx via IntersectionObserver.
 */
export default function Navbar({ isVisible }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isHome = location.pathname === '/';
  const isItinerary = location.pathname.includes('schedule');
  const isTeam = location.pathname.includes('team');
  const isSponsi = location.pathname.includes('sponsi');
  const isEvents = location.pathname.includes('event');

  // Automatic Menu Management:
  // If the navbar is hidden by the scroll observer, force the mobile menu to close.
  useEffect(() => {
    if (!isVisible) {
      setIsMobileMenuOpen(false);
    }
  }, [isVisible]);

  // Determine dynamic page title for the mobile bar
  let pageTitle = "OUR LEGACY"; 
  if (isHome) pageTitle = "HOME";
  else if (isEvents) pageTitle = "EVENTS";
  else if (isItinerary) pageTitle = "ITINERARY";
  else if (isSponsi) pageTitle = "SPONSORS";
  else if (isTeam) pageTitle = "TEAM";

  // Interaction logic
  const closeMenu = () => setIsMobileMenuOpen(false);
  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Dynamic CSS Class
  const visibilityClass = isVisible ? 'nav-visible' : 'nav-hidden';

  return (
    <nav className={`global-navbar ${visibilityClass}`}>
      
      {/* 📱 MOBILE TITLE BAR */}
      <div className="mobile-title-bar">
        <span className="mobile-title">{pageTitle}</span>
        <button 
          className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* THE PILL / MOBILE DROPDOWN */}
      <div className={`navbar-pill ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/" className={`nav-link ${isHome ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
        <Link to="/events" className={`nav-link ${isEvents ? 'active' : ''}`} onClick={closeMenu}>Events</Link>
        <Link to="/schedule" className={`nav-link ${isItinerary ? 'active' : ''}`} onClick={closeMenu}>Itinerary</Link>
        <Link to="/sponsi" className={`nav-link ${isSponsi ? 'active' : ''}`} onClick={closeMenu}>Sponsors</Link>
        <Link to="/team" className={`nav-link ${isTeam ? 'active' : ''}`} onClick={closeMenu}>Team</Link>
      </div>
    </nav>
  );
}