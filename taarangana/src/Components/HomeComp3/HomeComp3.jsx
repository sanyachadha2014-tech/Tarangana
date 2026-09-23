import React, { useState, useEffect, useRef, useCallback } from "react";
import "./HomeComp3.css";

// Assets
import imgEmbroidery from "../../assets/embroidery2.webp";
import imgPatronsHeading from "../../assets/patrons.webp";
import imgFrame from "../../assets/frame2.webp";
import imgWheel from "../../assets/wheel3.webp";

// Member Assets
import imgVcPhoto from "../../assets/vc.webp";
import imgVcPlate from "../../assets/vcp.webp";
import imgRegistrarPhoto from "../../assets/registrar.webp";
import imgRegistrarPlate from "../../assets/registrarp.webp";

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

const PatronCard = ({ photo, plate, name, delay, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleInteractionMove = (e) => {
    if (!cardRef.current) return;
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) / 20;
    const y = -(clientY - top - height / 2) / 20;
    
    if (window.innerWidth > 800) {
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
      className={`homecomp3-card-outer ${isVisible ? "is-visible" : ""}`}
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
        className={`homecomp3-card-visual ${isHovered ? "is-hovered" : ""}`}
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.05 : 1})`,
        }}
      >
        <div className="homecomp3-solid-bg" />
        <div
          className="homecomp3-embroidery-layer"
          style={{ backgroundImage: `url(${imgEmbroidery})` }}
        />
        <div className="homecomp3-assembly">
          <div className="homecomp3-frame-container">
            <div className="homecomp3-photo-clip">
              <img
                src={photo}
                alt={name}
                className="homecomp3-member-photo"
                style={{ transform: isHovered ? "scale(1.15)" : "scale(1)" }}
              />
            </div>
            <img src={imgFrame} alt="Silver Frame" className="homecomp3-frame-img" />
          </div>
          <div className="homecomp3-plate-wrapper">
            <img src={plate} alt={name} className="homecomp3-plate-img" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function HomeComp3() {
  const [isVisible, setIsVisible] = useState(false);
  const [maskPos, setMaskPos] = useState({ x: -1000, y: -9999 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const [glitter, setGlitter] = useState([]);
  const sectionRef = useRef(null);

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

    if (window.innerWidth > 800 || Math.random() > 0.5) {
      const colors = ["#ffffff", "#ffd700", "#e0e0e0", "#b794f4"];
      const newParticles = Array.from({ length: window.innerWidth > 800 ? 6 : 2 }).map(() => ({
        id: Math.random(),
        x: clientX + (Math.random() * 30 - 15),
        y: clientY + (Math.random() * 30 - 15),
        size: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 0.1
      }));

      setGlitter((prev) => [...prev.slice(-60), ...newParticles]);
    }
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="homecomp3-viewport"
      onMouseEnter={() => setIsMouseInside(true)}
      onMouseMove={handleInteractionMove}
      onMouseLeave={() => setIsMouseInside(false)}
      onTouchStart={(e) => {
        setIsMouseInside(true);
        handleInteractionMove(e);
      }}
      onTouchMove={handleInteractionMove}
      onTouchEnd={() => setIsMouseInside(false)}
    >
      <div 
        className="homecomp3-spotlight-layer"
        style={{
          opacity: isMouseInside ? 1 : 0,
          transition: "opacity 0.3s ease",
          maskImage: `radial-gradient(circle 300px at ${maskPos.x}px ${maskPos.y}px, black 0%, transparent 85%)`,
          WebkitMaskImage: `radial-gradient(circle 300px at ${maskPos.x}px ${maskPos.y}px, black 0%, transparent 85%)`
        }}
      >
        <img src={imgWheel} className="spotlight-wheel wheel-left" alt="" />
        <img src={imgWheel} className="spotlight-wheel wheel-right" alt="" />
      </div>

      {glitter.map((g) => (
        <GlitterParticle key={g.id} {...g} />
      ))}

      <div className="homecomp3-center-content">
        <header className={`homecomp3-header ${isVisible ? 'is-visible' : ''}`}>
          <img src={imgPatronsHeading} alt="Our Patrons" className="homecomp3-title-img" />
        </header>

        <div className="homecomp3-grid">
          <PatronCard
            photo={imgVcPhoto}
            plate={imgVcPlate}
            name="Vice Chancellor"
            delay={0.2}
            isVisible={isVisible}
          />
          <PatronCard
            photo={imgRegistrarPhoto}
            plate={imgRegistrarPlate}
            name="Registrar"
            delay={0.4}
            isVisible={isVisible}
          />
        </div>
      </div>
    </section>
  );
}