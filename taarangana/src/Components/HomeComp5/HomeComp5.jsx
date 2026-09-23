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
  const [offset, setOffset] = useState(0);
  const [activeGlow, setActiveGlow] = useState(null);
  
  // Mobile specific states
  const [isMobile, setIsMobile] = useState(false);
  const [hasTouched, setHasTouched] = useState(false);
  const [mobileCenterIndex, setMobileCenterIndex] = useState(null);

  // Refs
  const requestRef = useRef();
  const isVisibleRef = useRef(false);
  const isPausedRef = useRef(false);
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

  const displayCards = useMemo(() => [...smaranCards, ...smaranCards, ...smaranCards], [smaranCards]);
  
  const cardWidth = 340; 
  const totalWidth = smaranCards.length * cardWidth;

  // 1. Preloader & Mobile Detector
  useEffect(() => {
    const wheelImg = new Image();
    wheelImg.src = backgroundImage;
    importedImages.forEach((src) => { const img = new Image(); img.src = src; });

    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile(); // Check immediately
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 2. Main Section Visibility Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, []);

  // 3. Desktop Animation Loop
  const animate = () => {
    if (!isMobile && !isPausedRef.current && isVisibleRef.current && totalWidth > 0) {
      setOffset((prev) => (prev + 0.8) % totalWidth);
    }
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isMobile, totalWidth]);

  // 4. Mobile: Center Card Observer (Applies Glow & Scale)
  useEffect(() => {
    if (!isMobile || !trackRef.current) return;

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.dataset.index);
          setActiveGlow(displayCards[index].glow);
          setMobileCenterIndex(index);
        }
      });
    }, {
      root: trackRef.current,
      threshold: 0.6 // Card must be 60% in view to become the "active" center card
    });

    cardRefs.current.forEach(card => {
      if (card) cardObserver.observe(card);
    });

    return () => cardObserver.disconnect();
  }, [isMobile, displayCards]);

  // 5. Mobile: Auto-Pan Interval (Clears on Touch)
  useEffect(() => {
    if (!isMobile || hasTouched) return;
    
    // Slowly advance the native scroll container
    const autoScroll = setInterval(() => {
      if (trackRef.current && isVisibleRef.current) {
        trackRef.current.scrollLeft += 1; 
      }
    }, 15);

    return () => clearInterval(autoScroll);
  }, [isMobile, hasTouched]);

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
          <div className="hc5-carousel-blur" />

          <div 
            ref={trackRef}
            // Add native scrolling classes for mobile, and determine if snapping should be active
            className={`hc5-carousel-track ${isMobile ? 'is-mobile' : ''} ${isMobile && hasTouched ? 'snap-enabled' : ''}`}
            style={{ transform: isMobile ? 'none' : `translate3d(${-offset}px, 0, 0)` }}
            onTouchStart={() => setHasTouched(true)} // Regain manual control permanently
          >
            {displayCards.map((card, index) => {
              const isActiveMobile = isMobile && mobileCenterIndex === index;
              return (
                <div 
                  key={`${card.id}-${index}`} 
                  data-index={index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`hc5-card ${isActiveMobile ? 'active-mobile' : ''}`}
                  onMouseEnter={() => {
                    if (!isMobile) { setActiveGlow(card.glow); isPausedRef.current = true; }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) { setActiveGlow(null); isPausedRef.current = false; }
                  }}
                >
                  <img src={card.image} alt="Gallery" className="hc5-card-img" />
                  <div className="hc5-card-id">{card.id}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  );
}