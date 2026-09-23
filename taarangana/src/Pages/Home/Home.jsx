import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import HomeComp1 from '../../Components/HomeComp1/HomeComp1';
import HomeComp2 from '../../Components/HomeComp2/HomeComp2';
import HomeComp3 from '../../Components/HomeComp3/HomeComp3';
import HomeComp4 from '../../Components/HomeComp4/HomeComp4';
import HomeComp5 from '../../Components/HomeComp5/HomeComp5';
import HomeComp6 from '../../Components/HomeComp6/HomeComp6';
import HomeComp7 from '../../Components/HomeComp7/HomeComp7';
import { Vortex } from '../../Components/Vortex/Vortex';
import './Home.css'; 

export default function HomePage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showVortex, setShowVortex] = useState(false); 
  
  const homeComp1Ref = useRef(null);
  const homeComp2Ref = useRef(null);

  useEffect(() => {
    const navObserver = new IntersectionObserver(
      ([entry]) => {
        setShowNavbar(!entry.isIntersecting);
      },
      { threshold: 0.05 } 
    );

    const vortexObserver = new IntersectionObserver(
      ([entry]) => setShowVortex(entry.isIntersecting),
      { threshold: 0.3 } 
    );

    if (homeComp1Ref.current) navObserver.observe(homeComp1Ref.current);
    if (homeComp2Ref.current) vortexObserver.observe(homeComp2Ref.current);

    return () => {
      if (homeComp1Ref.current) navObserver.unobserve(homeComp1Ref.current);
      if (homeComp2Ref.current) vortexObserver.unobserve(homeComp2Ref.current);
    };
  }, []);

  return (
    <div className="home-page-wrapper">
      <Navbar isVisible={showNavbar} />

      {/* Vortex Background */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100dvh', /* Switched to dvh here too */
        zIndex: 0, 
        pointerEvents: 'none',
        opacity: showVortex ? 1 : 0, 
        transition: 'opacity 0.8s ease-in-out' 
      }}>
        {showVortex && (
          <Vortex 
            particleCount={350} 
            baseHue={250} 
            rangeHue={60} 
          />
        )}
      </div>

      {/* REMOVED the intermediate div. Sections are now direct children of the wrapper */}
      <section className="snap-section" ref={homeComp1Ref}>
        <HomeComp1 />
      </section>

      <section className="snap-section" ref={homeComp2Ref}>
        <HomeComp2 />
      </section>

      <section className="snap-section"><HomeComp3 /></section>
      <section className="snap-section"><HomeComp4 /></section>
      <section className="snap-section"><HomeComp5 /></section>
      <section className="snap-section"><HomeComp6 /></section>
      <section className="snap-section"><HomeComp7 /></section>
    </div>
  );
}