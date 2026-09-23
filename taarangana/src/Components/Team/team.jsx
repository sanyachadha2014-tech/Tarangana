import React, { useState, useEffect, useRef } from 'react';
import './team.css';

export default function MemberCard({ member, isGrid, cardWidth, delay, config, glowColor, getAsset, isMobile }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    if (isMobile || !cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20; 
    const y = -(e.clientY - top - height / 2) / 20;
    setRotate({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    setIsHovered(false);
    setRotate({ x: 0, y: 0 }); 
  };

  return (
    <div
      ref={cardRef}
      className="member-card-outer"
      style={!isMobile ? {
        width: cardWidth, 
        height: isGrid ? config.gridCardHeight : '100%',
        maxWidth: isGrid ? 'none' : config.cardMaxWidth,
        maxHeight: isGrid ? 'none' : config.cardMaxHeight,
        padding: isGrid ? '0' : `0 ${config.cardPadding}`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
        transition: `opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s, transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}s`,
      } : {
        /* 🟢 Mobile strictly manages only opacity so scroll-snap doesn't jitter */
        opacity: isVisible ? 1 : 0,
        transition: `opacity 0.6s ease`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="member-card-visual"
        style={{
          transform: isMobile ? 'none' : `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${isHovered ? 1.02 : 1})`,
          boxShadow: (isHovered || isMobile)
            ? `0 20px 50px rgba(${glowColor}, 0.5), 0 0 20px rgba(${glowColor}, 0.3)` 
            : `0 10px 20px rgba(0,0,0,0.3), 0 0 10px rgba(${glowColor}, 0.2)`,       
          border: (isHovered || isMobile) ? `1px solid rgba(${glowColor}, 0.3)` : '1px solid transparent',
        }}
      >
        <div
          className="member-card-layer"
          style={{
            opacity: config.embroideryOpacity, 
            backgroundImage: `url(${getAsset(member.embroidery)})`,
          }}
        />

        <div className="member-content-wrapper">
          <div className="member-frame-assembly">
            <div className="member-photo-container" style={{
              clipPath: member.clipPath, 
              WebkitClipPath: member.clipPath,
              borderRadius: config.photoRadius
            }}>
              {getAsset(member.photo) ? (
                <img
                  src={getAsset(member.photo)}
                  alt={`Member ${member.id}`}
                  className="member-photo"
                  style={{ transform: (isHovered && !isMobile) ? 'scale(1.1)' : 'scale(1)' }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)' }} />
              )}
            </div>
            <img src={getAsset(member.frame)} alt="Frame" className="member-frame-image" />
          </div>

          <div className="member-plate-container">
            <img src={getAsset(member.plate)} alt="Info Plate" className="member-plate-image" />
          </div>
        </div>
      </div>
    </div>
  );
}