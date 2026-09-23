import React from 'react';
import './LaserBeam.css';

const LaserBeam = ({ color, isActive }) => {
  if (!isActive) return null;

  return (
    <div className="laser-beam-container">
      {/* The main beam uses a CSS animation to move a gradient, creating a particle effect */}
      <div 
        className="laser-beam-particles" 
        style={{ 
          '--beam-color': color,
          '--beam-glow': `${color}66` 
        }}
      >
        <div className="particle-overlay" />
      </div>
    </div>
  );
};

export default LaserBeam;