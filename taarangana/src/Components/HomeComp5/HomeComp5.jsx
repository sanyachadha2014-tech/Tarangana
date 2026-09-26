import React, { useState, useEffect, useRef, useMemo } from 'react';
import './HomeComp5.css';

// Assets
import smaranHeadingImg from '../../assets/smaran.webp';
import backgroundImage from '../../assets/wheel5.webp';

const imageModules = import.meta.glob('../../assets/photos/*.{png,jpg,jpeg,svg,webp,JPG}', { eager: true });
const importedImages = Object.values(imageModules).map((mod) => mod.default);

const GLOW_COLORS = [
  "rgba(205, 92, 92, 0.5)",
  "rgba(255, 215, 0, 0.5)",
  "rgba(64, 224, 208, 0.5)",
  "rgba(65, 105, 225, 0.5)",
  "rgba(138, 43, 226, 0.5)"
];

export default function HomeComp5() {
  const [activeGlow, setActiveGlow] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileCenterIndex, setMobileCenterIndex] = useState(null);

  // Arrow visibility states
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Refs
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const cardRefs = useRef([]);

  const smaranCards = useMemo(() => {
    return importedImages.map((img, index) => ({
      id: (index + 1).toString().padStart(2, '0'),
      image: img,
      glow: GLOW_COLORS[index % GLOW_COLORS.length]
    }));
  }, []);

  // 1. Preloader & Mobile Detector
  useEffect(() => {
    const wheelImg = new Image();
    wheelImg.src = backgroundImage;
    importedImages.forEach((src) => { const img = new Image(); img.src = src; });

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Track scroll boundaries to toggle arrows dynamically
  const checkScrollPosition = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    
    // Tolerance buffer of 5px for precision calculation across screen types
    const isAtStart = scrollLeft <= 5;
    const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 5;

    setShowLeftArrow(!isAtStart);
    setShowRightArrow(!isAtEnd);
  };

  useEffect(() => {
    // Initial position check
    checkScrollPosition();
  }, []);

  // 3. Active Card Intersection Observer (Applies Glow & Scale on scroll/swipe)
  useEffect(() => {
    if (!trackRef.current) return;

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setActiveGlow(smaranCards[index].glow);
          if (isMobile) {
            setMobileCenterIndex(index);
          }
        }
      });
    }, {
      root: trackRef.current,
      threshold: 0.6
    });

    cardRefs.current.forEach(card => {
      if (card) cardObserver.observe(card);
    });

    return () => cardObserver.disconnect();
  }, [isMobile, smaranCards]);

  // 4. Scroll Left / Right button handlers
  const scrollLeft = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <div className="hc5-root" ref={rootRef}>
      <div className="hc5-black-fix" />
      <div className="hc5-background-img" style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div 
        className={`hc5-dynamic-glow ${activeGlow ? 'visible' : ''}`}
        style={{ background: activeGlow ? `radial-gradient(circle at center, ${activeGlow} 0%, transparent 70%)` : 'transparent' }}
      />

      <section className="hc5-content-layer">
        <header className="hc5-header">
          <img src={smaranHeadingImg} alt="Smaran" className="hc5-logo" />
          <p className="hc5-tagline">A RETROSPECTIVE</p>
        </header>

        <div className="hc5-carousel-viewport">
          {/* Left Arrow Button (Hides automatically at start) */}
          <button 
            className={`hc5-arrow-btn hc5-arrow-left ${!showLeftArrow ? 'hidden' : ''}`} 
            onClick={scrollLeft} 
            aria-label="Scroll Left"
          >
            &#10094;
          </button>

          <div className="hc5-carousel-blur" />

          <div 
            ref={trackRef}
            className="hc5-carousel-track"
            onScroll={checkScrollPosition}
          >
            {smaranCards.map((card, index) => {
              const isActiveMobile = isMobile && mobileCenterIndex === index;
              return (
                <div 
                  key={`${card.id}-${index}`} 
                  data-index={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`hc5-card ${isActiveMobile ? 'active-mobile' : ''}`}
                  onMouseEnter={() => {
                    if (!isMobile) setActiveGlow(card.glow);
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) setActiveGlow(null);
                  }}
                >
                  <img src={card.image} alt="Gallery" className="hc5-card-img" />
                  <div className="hc5-card-id">{card.id}</div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button (Hides automatically at end) */}
          <button 
            className={`hc5-arrow-btn hc5-arrow-right ${!showRightArrow ? 'hidden' : ''}`} 
            onClick={scrollRight} 
            aria-label="Scroll Right"
          >
            &#10095;
          </button>
        </div>
      </section>
    </div>
  );
}