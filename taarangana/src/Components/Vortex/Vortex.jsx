import React, { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export const Vortex = ({
  particleCount = 400, // Lower count = cleaner look
  baseHue = 240,
  rangeHue = 80,
  backgroundColor = "#050505",
}) => {
  const canvasRef = useRef(null);
  const noise3D = createNoise3D();
  const particlePropCount = 9;
  const particlePropsLength = particleCount * particlePropCount;
  let particleProps = new Float32Array(particlePropsLength);
  let tick = 0;

  const initParticle = (i) => {
    let x = Math.random() * window.innerWidth;
    let y = Math.random() * window.innerHeight;
    let vx = 0, vy = 0;
    let life = 0;
    let ttl = 100 + Math.random() * 200; // Increased life for longer paths
    let speed = 0.1 + Math.random() * 0.3; // Much slower for "Cinematic" feel
    let radius = 1 + Math.random() * 3; // Varied sizes
    let hue = baseHue + Math.random() * rangeHue;

    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
  };

  const draw = (canvas, ctx) => {
    tick++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlePropsLength; i += particlePropCount) {
      updateParticle(i, canvas, ctx);
    }

    ctx.save();
    // This blur creates the cinematic "glow" around the particles
    ctx.filter = "blur(4px) brightness(120%)"; 
    ctx.globalCompositeOperation = "lighter";
    ctx.drawImage(canvas, 0, 0);
    ctx.restore();

    requestAnimationFrame(() => draw(canvas, ctx));
  };

  const updateParticle = (i, canvas, ctx) => {
    let [x, y, vx, vy, life, ttl, speed, radius, hue] = particleProps.slice(i, i + particlePropCount);
    
    // Slower noise frequency = smoother curves
    let n = noise3D(x * 0.0005, y * 0.0005, tick * 0.0002) * Math.PI * 4;
    vx = lerp(vx, Math.cos(n) * speed, 0.05);
    vy = lerp(vy, Math.sin(n) * speed, 0.05);
    x += vx;
    y += vy;
    life++;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    // Smooth fade out using life/ttl
    const opacity = Math.sin((life / ttl) * Math.PI) * 0.5; 
    ctx.fillStyle = `hsla(${hue}, 80%, 65%, ${opacity})`;
    ctx.fill();

    particleProps.set([x, y, vx, vy, life, ttl, speed, radius, hue], i);
    if (life > ttl || x > canvas.width || x < 0 || y > canvas.height || y < 0) initParticle(i);
  };

  const lerp = (n1, n2, speed) => (1 - speed) * n1 + speed * n2;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", resize);
    resize();
    for (let i = 0; i < particlePropsLength; i += particlePropCount) initParticle(i);
    draw(canvas, ctx);

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: 0, 
        pointerEvents: 'none',
        display: 'block' 
      }} 
    />
  );
};