import React, { useState, useEffect } from 'react';
import './HomeComp7.css';

// Assets
import taaranganaLogoImg from '../../assets/taarangana_logo.webp'; 
import ytIcon from '../../assets/yt.webp';
import inIcon from '../../assets/in.webp';
import fbIcon from '../../assets/fb.webp';
import webIcon from '../../assets/web.webp';
import gramIcon from '../../assets/gram.webp';

export default function HomeComp7() {
  const [isMobile, setIsMobile] = useState(false);

  // Window Resize Listener for mobile optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Listen for window resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <footer className={`homecomp7-footer ${isMobile ? 'is-mobile' : ''}`}>
      <div className="footer-main-content">
        
        {/* Centered Brand Container */}
        <div className="footer-brand-container">
          <img src={taaranganaLogoImg} alt="Taarangana Logo" className="footer-brand-logo" />
          <h2 className="footer-brand-heading">TAARANGANA</h2>
          <p className="footer-brand-subtitle">
            Presenting <span className="hl-code">Etherea:</span> Where the <span className="hl-circuit">Navrasa</span> Transcend
          </p>
        </div>

        <div className="footer-links-grid">
          {/* Coordinators */}
          <div className="footer-grid-col">
            <div className="coord-entry">
              <h4>Prof. Manoj Soni</h4>
              <p>Chief Coordinator @Taarangana2026</p>
              <p className="sub-dept">Dean Student Welfare</p>
            </div>
            <div className="coord-entry">
              <h4>Dr. Meha Joshi</h4>
              <p>Faculty Coordinator @Taarangana2026</p>
              <p className="sub-dept">HOD Management</p>
            </div>
          </div>

          {/* Location */}
          <div className="footer-grid-col col-center">
            <h4>LOCATION</h4>
            <a 
              href="https://www.google.com/maps/place/Indira+Gandhi+Delhi+Technical+University+for+Women/@28.6655361,77.229433,17z/data=!3m2!4b1!5s0x390cfd060656de59:0xb216080aec2ce673!4m6!3m5!1s0x390cfd0683919c3b:0xf5fc331b74c2b9e2!8m2!3d28.6655361!4d77.2320079!16s%2Fm%2F09gnfv8?entry=ttu&g_ep=EgoyMDI2MDMwMi4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noreferrer" 
              className="location-link"
            >
              <svg className="floating-pin" width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="pinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a7d3ff" />
                    <stop offset="100%" stopColor="#2e1065" />
                  </linearGradient>
                </defs>
                <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="url(#pinGradient)"/>
              </svg>
              <span>IGDTUW, New Delhi</span>
            </a>
          </div>

          {/* Socials */}
          <div className="footer-grid-col">
            <div className="social-set">
              <h4>TAARANGANA SOCIALS</h4>
              <div className="social-row">
                <a href="https://www.instagram.com/taarangana/"><img src={gramIcon} alt="IG" /></a>
                <a href="https://www.linkedin.com/company/taarangana-igdtuw/posts/?feedView=all"><img src={inIcon} alt="IN" /></a>
                <a href="https://www.youtube.com/@TaaranganaIGDTUW"><img src={ytIcon} alt="YT" /></a>
              </div>
            </div>
            <div className="social-set">
              <h4>IGDTUW SOCIALS</h4>
              <div className="social-row">
                <a href="https://www.instagram.com/igdtuw.official/"><img src={gramIcon} alt="IG" /></a>
                <a href="https://www.linkedin.com/school/indira-gandhi-delhi-technical-university-for-women-new-delhi/"><img src={inIcon} alt="IN" /></a>
                <a href="https://www.youtube.com/@IGDTUWDelhiChannel/featured"><img src={ytIcon} alt="YT" /></a>
                <a href="https://www.facebook.com/Igdtu/"><img src={fbIcon} alt="FB" /></a>
                <a href="https://www.igdtuw.ac.in/"><img src={webIcon} alt="WEB" /></a>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="footer-grid-col">
            <h4>CONTACT</h4>
            <div className="contact-links">
              <a href="mailto:taarangana@igdtuw.ac.in">taarangana@igdtuw.ac.in</a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-legal">
        <p>© 2026 TAARANGANA — IGDTUW. All rights reserved.</p>
        <p className="credits">
          Curated and Crafted by <a href="https://www.linkedin.com/in/ananya-ahuja01/">Ananya Ahuja</a> and <a href="https://www.linkedin.com/in/shreya-pandey-46346327b/">Shreya Pandey</a> under the guidance of Prof. Manoj Soni.
        </p>
      </div>
    </footer>
  );
}