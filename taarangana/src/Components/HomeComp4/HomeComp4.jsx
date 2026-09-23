import React, { useState, useEffect, useRef, useCallback } from "react";
import "./HomeComp4.css";

// Assets
import imgBack from "../../assets/back2.webp"; 
import imgEmbroidery from "../../assets/embroidery2.webp";
import imgPatronsHeading from "../../assets/faculty.webp"; 
import imgFrame from "../../assets/frame2.webp";
import imgWheel4 from "../../assets/wheel4.webp";

// Member Assets
import imgDeanPhoto from "../../assets/dean.webp";
import imgDeanPlate from "../../assets/deanp.webp";
import imgAdvisorPhoto from "../../assets/advisor.webp";
import imgAdvisorPlate from "../../assets/advisorp.webp";
import imgAsdwPhoto from "../../assets/asdw.webp";
import imgAsdwPlate from "../../assets/asdwp.webp";
import imgCoordinatorPhoto from "../../assets/coordinator.webp";
import imgCoordinatorPlate from "../../assets/coordinatorp.webp";

const GlitterParticle = ({ x, y, size, color, delay }) => {
  return (
    <div 
      className="glitter-particle" 
      style={{ 
        left: x, 
        top: y, 
        width: `${size}px`, 
        height: `${size}px`,
        backgroundColor: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        animationDelay: `${delay}s`
      }} 
    />
  );
};

const MemberCard = ({ photo, plate, name, delay, isParentVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleInteractionMove = (e) => {
    if (!cardRef.current) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 25;
    const y = -(clientY - top - height / 2) / 25;
    
    // Disable heavy 3D rotation when in carousel mode to prevent swipe jitter
    if (window.innerWidth > 1400) {
      setRotate({ x: y, y: x });
    }
  };

  const handleInteractionEnd = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className={`homecomp4-card-outer ${isParentVisible ? "is-visible" : ""}`}
      style={{ transitionDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleInteractionMove}
      onMouseLeave={handleInteractionEnd}
      onTouchStart={() => setIsHovered(true)}
      onTouchMove={handleInteractionMove}
      onTouchEnd={handleInteractionEnd}
      onTouchCancel={handleInteractionEnd}
    >
      <div
        className={`homecomp4-card-visual ${isHovered ? "is-hovered" : ""}`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.05 : 1})`,
        }}
      >
        <div className="homecomp4-solid-bg" />
        <div
          className="homecomp4-embroidery-layer"
          style={{ backgroundImage: `url(${imgEmbroidery})` }}
        />
        <div className="homecomp4-assembly">
          <div className="homecomp4-frame-container">
            <div className="homecomp4-photo-clip">
              <img
                src={photo}
                alt={name}
                className="homecomp4-member-photo"
                style={{ transform: isHovered ? "scale(1.15)" : "scale(1)" }}
              />
            </div>
            <img src={imgFrame} alt="Frame" className="homecomp4-frame-img" />
          </div>
          <div className="homecomp4-plate-wrapper">
            <img src={plate} alt={name} className="homecomp4-plate-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeComp4() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [maskPos, setMaskPos] = useState({ x: -1000, y: -9999 }); 
  const [glitter, setGlitter] = useState([]);
  const sectionRef = useRef(null);

  const members = [
    { photo: imgDeanPhoto, plate: imgDeanPlate, name: "Dean", delay: 0.1 },
    { photo: imgAdvisorPhoto, plate: imgAdvisorPlate, name: "Advisor", delay: 0.2 },
    { photo: imgAsdwPhoto, plate: imgAsdwPlate, name: "ASDW", delay: 0.3 },
    { photo: imgCoordinatorPhoto, plate: imgCoordinatorPlate, name: "Coordinator", delay: 0.4 },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleInteractionMove = useCallback((e) => {
    if (!sectionRef.current) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const rect = sectionRef.current.getBoundingClientRect();
    const relX = clientX - rect.left;
    const relY = clientY - rect.top;
    setMaskPos({ x: relX, y: relY });

    if (window.innerWidth > 1400 || Math.random() > 0.5) {
      const colors = ["#ffffff", "#ffd700", "#e0e0e0", "#b794f4"];
      const newParticles = Array.from({ length: window.innerWidth > 1400 ? 5 : 2 }).map(() => ({
        id: Math.random(),
        x: clientX + (Math.random() * 30 - 15),
        y: clientY + (Math.random() * 30 - 15),
        size: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.1
      }));

      setGlitter((prev) => [...prev.slice(-60), ...newParticles]);
    }
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="homecomp4-viewport"
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseMove={handleInteractionMove}
      onMouseLeave={() => setIsMouseInside(false)}
      onTouchStart={(e) => {
        setIsMouseInside(true);
        handleInteractionMove(e);
      }}
      onTouchMove={handleInteractionMove}
      onTouchEnd={() => setIsMouseInside(false)}
      style={{ backgroundImage: `url(${imgBack})` }} 
    >
      <div 
        className={`homecomp4-spotlight-layer ${isMouseInside ? 'is-active' : ''}`}
        style={{
          maskImage: `radial-gradient(circle 300px at ${maskPos.x}px ${maskPos.y}px, black 0%, transparent 85%)`,
          WebkitMaskImage: `radial-gradient(circle 300px at ${maskPos.x}px ${maskPos.y}px, black 0%, transparent 85%)`
        }}
      >
        <img src={imgWheel4} className="corner-wheel wheel-tl" alt="" />
        <img src={imgWheel4} className="corner-wheel wheel-tr" alt="" />
        <img src={imgWheel4} className="corner-wheel wheel-bl" alt="" />
        <img src={imgWheel4} className="corner-wheel wheel-br" alt="" />
      </div>

      {glitter.map((g) => (
        <GlitterParticle key={g.id} {...g} />
      ))}

      <div className="homecomp4-center-content">
        <header className={`homecomp4-header ${isVisible ? 'is-visible' : ''}`}>
          <img src={imgPatronsHeading} alt="Our Faculty" className="homecomp4-title-img" />
        </header>

        <div className="homecomp4-grid">
          {members.map((m, idx) => (
            <MemberCard key={idx} {...m} isParentVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}