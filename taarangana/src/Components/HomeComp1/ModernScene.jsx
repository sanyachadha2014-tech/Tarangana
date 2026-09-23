import { useState, useEffect } from 'react';
import './ModernScene.css';
import LaserFlow from './LaserFlow';
import LaserBeam from './LaserBeam';
import LogoLoop from './LogoLoop';

// Assets
import stageModernBg from './assets/modern/stage_modern.webp';
import audienceLeft from './assets/modern/audience_left.webp';
import audienceRight from './assets/modern/audience_right.webp';
import taaranganaHeading from './assets/modern/taarangana_heading.webp';
import ethereaHeading from './assets/modern/etherea_heading.webp';
import taaranganaLogo from './assets/modern/taarangana_logo.webp';
import igdtuwLogo from './assets/modern/igdtuw_logo.webp';
import singer1 from './assets/modern/singer_1.webp';
import singer2 from './assets/modern/singer_2.webp';
import singer3 from './assets/modern/singer_3.webp';
import singer4 from './assets/modern/singer_4.webp';
import singer5 from './assets/modern/singer_5.webp';

import logo1 from './assets/logo1.webp';
import logo2 from './assets/logo2.webp';
import logo3 from './assets/logo3.webp';
import logo4 from './assets/logo4.webp';
import logo5 from './assets/logo5.webp';
import logo6 from './assets/logo6.webp';
import logo7 from './assets/logo7.webp';

const SINGER_DATA = [
  { img: singer1, className: 'singer-1', name: 'Darshan Raval', year: '2020', laser: '#ff0066' },
  { img: singer2, className: 'singer-2', name: 'Neeti Mohan', year: '2023', laser: '#fb7100' },
  { img: singer3, className: 'singer-3', name: 'Shaan', year: '2024', laser: '#00ff0d' },
  { img: singer4, className: 'singer-4', name: 'Mohit Chauhan', year: '2025', laser: '#01c8ff' },
  { img: singer5, className: 'singer-5', name: 'Last Singer', year: '?', laser: '#fc00fc', isQuestion: true },
];

const SPONSOR_LOGOS = [logo1, logo2, logo3, logo4, logo5, logo6, logo7];
const SPONSORS = SPONSOR_LOGOS.map((logo, i) => ({ src: logo, alt: `Sponsor ${i + 1}` }));

export default function ModernScene() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [autoIndex, setAutoIndex] = useState(0);

  // Detect Mobile device to switch interaction modes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Automatic looping logic for mobile (Carousel Queue)
  useEffect(() => {
    let interval;
    if (isMobile) {
      interval = setInterval(() => {
        setAutoIndex((prev) => (prev + 1) % SINGER_DATA.length);
      }, 3000); // Rotates every 3 seconds
    }
    return () => clearInterval(interval);
  }, [isMobile]);

  const activeIndex = isMobile ? autoIndex : hoveredIndex;
  const defaultLaserColor = '#790291'; 
  const activeColor = activeIndex !== null ? SINGER_DATA[activeIndex].laser : defaultLaserColor;

  // Calculates relative position for the 3D Carousel effect
  const getMobilePositionClass = (index) => {
    if (!isMobile) return '';
    const total = SINGER_DATA.length; // 5
    let diff = index - activeIndex;
    
    // Adjust logic to create a continuous wrap-around loop
    if (diff < -2) diff += total;
    if (diff > 2) diff -= total;

    if (diff === 0) return 'pos-center';
    if (diff === 1) return 'pos-right-1';
    if (diff === 2) return 'pos-right-2';
    if (diff === -1) return 'pos-left-1';
    if (diff === -2) return 'pos-left-2';
    return '';
  };

  return (
    <div className={`modern-scene-container ${activeIndex !== null ? 'lasers-active' : ''}`}>
      <img src={stageModernBg} alt="Modern Stage" className="modern-stage-bg" />
      
      <div className="text-layer">
        <img src={taaranganaHeading} alt="Taarangana Presents" className="taarangana-heading" />
        <img src={ethereaHeading} alt="Etherea" className="etherea-heading" />
        <p className="fest-subtitle">Where the Navrasa Transcend</p>
      </div>

      <div className="logo-layer">
        <img src={taaranganaLogo} alt="Taarangana Logo" className="taarangana-logo" />
        <img src={igdtuwLogo} alt="IGDTUW Logo" className="igdtuw-logo" />
      </div>

      <div className="lasers-layer">
        <LaserFlow color={activeColor} density={activeIndex !== null ? 100 : 60} pulseSpeed={activeIndex !== null ? 3 : 1} />
      </div>

      <div className="singers-layer">
        {SINGER_DATA.map((singer, index) => {
          const isActive = activeIndex === index;
          const mobilePosClass = getMobilePositionClass(index);
          
          return (
            <div 
              key={index} 
              // Combine standard desktop classes with dynamic mobile position classes
              className={`singer-wrapper ${singer.className} ${isActive ? 'is-active' : ''} ${mobilePosClass}`} 
              onMouseEnter={() => !isMobile && setHoveredIndex(index)} 
              onMouseLeave={() => !isMobile && setHoveredIndex(null)} 
              style={{ '--hover-color': singer.laser }}
            >
              <div className="singer-constant-glow" />
              <LaserBeam color={singer.laser} isActive={isActive} />

              <div className="singer-info">
                {singer.isQuestion ? (
                  <div className="mystery-reveal"><span className="question-mark">?</span></div>
                ) : (
                  <>
                    <div className="singer-info-name">{singer.name}</div>
                    <div className="singer-info-year">{singer.year}</div>
                  </>
                )}
              </div>
              <img src={singer.img} alt={singer.name} className="singer-image" />
            </div>
          );
        })}
      </div>

      <div className="audience-layer">
        <img src={audienceLeft} alt="" className="audience-left" />
        <img src={audienceRight} alt="" className="audience-right" />
      </div>

      <div className="homecomp2-scroll-explorer">
        <div className="explorer-overlay"></div>
        <span className="explorer-text">SCROLL TO EXPLORE</span>
        <div className="explorer-arrow">
          <svg width="45" height="15" viewBox="0 0 45 15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 2L22.5 12L43 2" /></svg>
        </div>
      </div>
      
      <div className="modern-footer">
        <LogoLoop logos={SPONSORS} speed={60} logoHeight={35} gap={60} className="modern-logos" />
      </div>
    </div>
  );
}