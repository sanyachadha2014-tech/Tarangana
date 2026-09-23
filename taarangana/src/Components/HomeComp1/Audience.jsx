// --- Audience.jsx ---
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Audience({ leftSrc, rightSrc, swaySpeed = 20 }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const leftImageRef = useRef(null);
  const rightImageRef = useRef(null);
  const imagesLoadedRef = useRef(false);

  // Manage morph and sway states via a controlled GSAP timeline
  const morphValueRef = useRef(0); // 0 (left) to 1 (right)
  const swayOffsetRef = useRef({ x: 0, y: 0 });

  // Update canvas sizing
  const updateCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const { width, height } = containerRef.current.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    return { width, height };
  };

  // Load images and trigger canvas setup
  useEffect(() => {
    const leftImg = new Image();
    const rightImg = new Image();
    leftImg.src = leftSrc;
    rightImg.src = rightSrc;

    let loadedCount = 0;
    const handleLoad = () => {
      loadedCount++;
      if (loadedCount === 2) {
        leftImageRef.current = leftImg;
        rightImageRef.current = rightImg;
        imagesLoadedRef.current = true;
        updateCanvasSize();
      }
    };
    leftImg.onload = handleLoad;
    rightImg.onload = handleLoad;

    const handleResize = () => updateCanvasSize();
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [leftSrc, rightSrc]);

  // Main Drawing Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const draw = () => {
      if (!imagesLoadedRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      const leftImg = leftImageRef.current;
      const rightImg = rightImageRef.current;

      ctx.clearRect(0, 0, width, height);

      // --- Morph Calculation ---
      // We blend the two images based on morphValue (0 = left, 1 = right)
      // For a 'morph' look, we draw left image, then right image with dynamic globalAlpha
      
      const blendAmount = morphValueRef.current; // 0 to 1

      // 1. Draw Left Image (Base)
      ctx.globalAlpha = 1 - blendAmount;
      ctx.drawImage(leftImg, 0, 0, width, height);

      // 2. Draw Right Image (Overlay, with controlled blend)
      // Using 'source-over' by default, controlling opacity creates the match-and-move blend
      ctx.globalAlpha = blendAmount;
      ctx.drawImage(rightImg, 0, 0, width, height);

      // Reset alpha for safety
      ctx.globalAlpha = 1;

      // --- Sway Calculation (Match-and-Move) ---
      // Add subtle translation to the entire audience
      // We can skew the canvas as well for a PowerPoint morph look
      const swayX = swayOffsetRef.current.x;
      const swayY = swayOffsetRef.current.y;
      
      // We need to redraw the blended state with transformations
      // A performant way is to draw the combined state to an offscreen canvas and then transform that,
      // but for this scale, direct draw is fine. We will redraw with transformation applied.
      
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      
      // Apply sway (Translation)
      ctx.translate(swayX, swayY);
      
      // Draw blended state again
      ctx.globalAlpha = 1 - blendAmount;
      ctx.drawImage(leftImg, 0, 0, width, height);
      ctx.globalAlpha = blendAmount;
      ctx.drawImage(rightImg, 0, 0, width, height);
      
      ctx.restore();

      animationFrameId.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  // Control state animations via GSAP for controllable ease and speed
  useEffect(() => {
    if (!imagesLoadedRef.current) return;

    // --- GSAP Controlled Sway Timeline ---
    // Smooth match-and-move translation
    gsap.to(swayOffsetRef.current, {
        x: '+=10', // random-ish movement
        y: '+=5',
        duration: swaySpeed / 3, // dynamic duration
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });

    gsap.to(swayOffsetRef.current, {
        x: '-=15',
        y: '-=8',
        duration: swaySpeed / 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
        delay: 2 // offset movement
    });

    // --- GSAP Controlled Morph Timeline ---
    // Interpolate between the two states, creating the PowerPoint morph
    gsap.to(morphValueRef.current, {
        value: 1, // go to right
        duration: swaySpeed * 0.8,
        repeat: -1,
        yoyo: true,
        ease: "back.inOut(1.7)", // dramatic morph ease
        onUpdate: (self) => {
            morphValueRef.current = self.targets()[0].value;
        }
    });

    return () => {
        gsap.killTweensOf(morphValueRef.current);
        gsap.killTweensOf(swayOffsetRef.current);
    };
  }, [swaySpeed, imagesLoadedRef.current]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ pointerEvents: 'none' }} />
    </div>
  );
}