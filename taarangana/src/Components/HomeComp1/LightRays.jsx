import React, { useEffect, useRef } from 'react';
import './LightRays.css';

const LightRays = ({ color, intensity = 0.6 }) => {
  const canvasRef = useRef(null);
  const targetColorRef = useRef([255, 255, 255]);
  const currentColorRef = useRef([255, 255, 255]);

  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [255, 255, 255];
  };

  useEffect(() => {
    targetColorRef.current = hexToRgb(color);
  }, [color]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth color interpolation
      const current = currentColorRef.current;
      const target = targetColorRef.current;
      for (let i = 0; i < 3; i++) {
        current[i] += (target[i] - current[i]) * 0.05;
      }

      const rgb = `${Math.round(current[0])}, ${Math.round(current[1])}, ${Math.round(current[2])}`;

      ctx.save();
      // Using 'lighter' for additive blending within the canvas
      ctx.globalCompositeOperation = 'lighter';
      
      const centerX = canvas.width / 2;
      const rayCount = 5; // Added one more ray for fullness
      
      for (let i = 0; i < rayCount; i++) {
        const time = Date.now() * 0.0008;
        // Swaying motion
        const sway = Math.sin(time + i * 2) * 0.12;
        const angle = (Math.PI / 2) + (i - (rayCount - 1) / 2) * 0.35 + sway;
        
        const gradient = ctx.createRadialGradient(
          centerX, -50, 0, // Start slightly above screen
          centerX, -50, canvas.height * 1.2
        );
        
        // Brighter center, fading edges
        gradient.addColorStop(0, `rgba(${rgb}, ${intensity})`);
        gradient.addColorStop(0.4, `rgba(${rgb}, ${intensity * 0.4})`);
        gradient.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.moveTo(centerX, -50);
        // Wider arcs (0.15 instead of 0.1) for better visibility
        ctx.arc(centerX, -50, canvas.height * 1.5, angle - 0.15, angle + 0.15);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return <canvas ref={canvasRef} className="light-rays-canvas" />;
};

export default LightRays;