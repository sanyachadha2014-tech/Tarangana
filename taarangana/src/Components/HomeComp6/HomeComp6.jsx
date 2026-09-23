import React, { useState, useRef, useEffect } from 'react';
import './HomeComp6.css';

// Assets
import questionsHeadingImg from '../../assets/faq.webp'; 
import barMaskImg from '../../assets/bar.webp';
import wheel6 from '../../assets/wheel6.webp';
import wheel7 from '../../assets/wheel7.webp';
import wheel8 from '../../assets/wheel8.webp';
import wheel9 from '../../assets/wheel9.webp';

const questions = [
  {
    q: "When and where is Etherea happening?",
    a: "Etherea takes over the IGDTUW campus on 18-19 March, 2026. Gates open at 11 AM and the fest runs till around 8:30 PM each day."
  },
  {
    q: "How do I register for competitions?",
    a: "Competition registrations happen through Google Forms. You’ll find the links for each event in the 'Events' section of the website."
  },
  {
    q: "Do I need a pass to enter?",
    a: " If you're from IGDTUW, your college ID card is all you need. Students from colleges other than IGDTUW will need a fest pass along with their college ID."
  },
  {
    q: "What’s the vibe for outfits?",
    a: "Lean into the Etherea energy: colourful, celestial, dramatic, a little theatrical."
  },
  {
    q: "What am I allowed to bring inside?",
    a: "Travel light. Only essentials like your phone and wallet are allowed. Bags, purses, and outside food or drinks (yes, even water bottles) won’t be permitted inside the venue."
  },
  {
    q: "Can students from other colleges attend?",
    a: "Absolutely. Taarangana is open to students from all colleges—just make sure you have your fest pass and college ID."
  },
  {
    q: "Will there be guest performances?",
    a: "Yes—but we’re keeping the lineup under wraps for now. Watch our socials for the reveal."
  },
  {
    q: "How do I stay updated about events and announcements?",
    a: "Follow Taarangana on Instagram and keep an eye on the website. That’s where all the updates drop first."
  }
];

export default function HomeComp6() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect(); 
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      className={`homecomp6-viewport ${inView ? "start-animation" : ""} ${isMobile ? "is-mobile" : ""}`}
    >
      {/* Decorative Elements - Wrapped for isolated centering */}
      <div className="wheel-wrapper wheel-top-left">
        <img src={wheel6} alt="" className="wheel-decor" />
      </div>
      <div className="wheel-wrapper wheel-mid-right">
        <img src={wheel7} alt="" className="wheel-decor" />
      </div>
      <div className="wheel-wrapper wheel-bottom-left">
        <img src={wheel8} alt="" className="wheel-decor" />
      </div>
      <div className="wheel-wrapper wheel-bottom-right">
        <img src={wheel9} alt="" className="wheel-decor" />
      </div>

      {/* Main FAQ Layout */}
      <div className="faq-internal-section">
        
        {/* Fixed Header */}
        <div className="homecomp6-header">
          <img src={questionsHeadingImg} alt="FAQ" className="homecomp6-heading-img" />
          <p className="homecomp6-text">The tea on everything Etherea</p>
        </div>

        {/* Scrollable Container just for the cards */}
        <div className="homecomp6-scroll-container">
          <div className="homecomp6-list">
            {questions.map((item, index) => (
              <div 
                key={index} 
                className={`homecomp6-item ${activeQuestion === index ? 'active' : ''}`}
                onClick={() => toggleQuestion(index)}
              >
                <div className="homecomp6-question">
                  <span>{item.q}</span>
                  <div className="homecomp6-chevron"></div>
                </div>
                <div className={`homecomp6-answer ${activeQuestion === index ? 'open' : ''}`}>
                  <p>{item.a}</p>
                </div>
                <div className="homecomp6-bar-overlay" style={{backgroundImage: `url(${barMaskImg})`}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}