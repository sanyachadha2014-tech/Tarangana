import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import "./CountdownClock.css";

// Import Assets
import logoImg from "../../assets/countdown.webp";
import segmentsImg from "../../assets/clock_segments.webp";
import ringImg from "../../assets/clock_ring.webp";
import frameImg from "../../assets/clock_frame.webp";
import handImg from "../../assets/clock_hand.webp";
import longHandImg from "../../assets/long_clock_hand.webp";
import gearsImg from "../../assets/clock_gears.webp";

import { 
  getClockRotation, 
  getCurrentSecond, 
  getInitialRotation,
  getTimeRemaining, 
  TICK_SETTINGS 
} from "./timeConfig"; 

export default function CountdownClock() {
  // Radial Clock Refs
  const containerRef = useRef(null);
  const mainHandRef = useRef(null);
  const minuteHandRef = useRef(null);
  const gearRef = useRef(null);
  const segmentsRef = useRef(null);

  // Digital Clock Refs
  const daysRef = useRef(null);
  const hoursRef = useRef(null);
  const minsRef = useRef(null);
  const secsRef = useRef(null);

  const lastSecond = useRef(getCurrentSecond());
  const visualRotation = useRef(getInitialRotation());

  useEffect(() => {
    // Initialize digital clock immediately
    const initTime = getTimeRemaining();
    if (daysRef.current) daysRef.current.innerText = initTime.days;
    if (hoursRef.current) hoursRef.current.innerText = initTime.hours;
    if (minsRef.current) minsRef.current.innerText = initTime.minutes;
    if (secsRef.current) secsRef.current.innerText = initTime.seconds;

    // Entry Animation
    gsap.fromTo(containerRef.current,
      { opacity: 0, scale: 0.95 }, 
      { opacity: 1, scale: 1, duration: 2.5, ease: "power2.out", delay: 0.2 }
    );

    gsap.set(minuteHandRef.current, { rotation: visualRotation.current });

    const tick = () => {
      // 1. Radial: Progress Hand
      const mainRotation = getClockRotation("A Distant Moment", "The Moment You've Waited For...");
      if (mainHandRef.current) gsap.set(mainHandRef.current, { rotation: mainRotation });

      const currentSecond = getCurrentSecond();
      if (currentSecond !== lastSecond.current) {
        
        // 2. Radial: Ticking Hand
        visualRotation.current += TICK_SETTINGS.DEGREES_PER_TICK;
        gsap.to(minuteHandRef.current, {
          rotation: visualRotation.current,
          duration: TICK_SETTINGS.DURATION,    
          ease: `back.out(${TICK_SETTINGS.ELASTICITY})`,
          overwrite: true,
        });

        // 3. Digital: Update text safely
        const remaining = getTimeRemaining();
        if (daysRef.current) daysRef.current.innerText = remaining.days;
        if (hoursRef.current) hoursRef.current.innerText = remaining.hours;
        if (minsRef.current) minsRef.current.innerText = remaining.minutes;
        if (secsRef.current) secsRef.current.innerText = remaining.seconds;

        lastSecond.current = currentSecond;
      }

      // Ambient Movement
      if (gearRef.current) gsap.set(gearRef.current, { rotation: "+=0.5" });
      if (segmentsRef.current) gsap.set(segmentsRef.current, { rotation: "-=0.05" }); 
    };

    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <div className="clock-overlay-container">
      <div ref={containerRef} className="clock-content-group">
        
        {/* --- HEADING --- */}
        <div className="heading-container">
          <div className="heading-glow" />
          <img src={logoImg} alt="Countdown" className="heading-img" />
        </div>

        {/* --- RADIAL CLOCK --- */}
        <div className="clock-wrapper">
          <div className="layer-container layer-segments">
            <img ref={segmentsRef} src={segmentsImg} alt="Segments" className="image-fit" />
          </div>
          <div className="layer-container layer-ring">
            <img src={ringImg} alt="Ring" className="image-fit" />
          </div>
          <div className="layer-container layer-frame">
            <img src={frameImg} alt="Frame" className="image-fit" />
          </div>
          <div ref={mainHandRef} className="hand-container">
            <img src={handImg} alt="Main Hand" className="hand-img main-hand" />
          </div>
          <div ref={minuteHandRef} className="hand-container">
            <img src={longHandImg} alt="Minute Hand" className="hand-img minute-hand" />
          </div>
          <div className="layer-container layer-gears">
            <img ref={gearRef} src={gearsImg} alt="Gears" className="image-fit" />
          </div>
        </div>

        {/* --- 🟢 DIGITAL CLOCK (MOBILE ONLY) --- */}
        <div className="digital-clock-wrapper">
          <div className="digital-segment">
            <span className="digital-number" ref={daysRef}>00</span>
            <span className="digital-label">DAYS</span>
          </div>
          <div className="digital-segment">
            <span className="digital-number" ref={hoursRef}>00</span>
            <span className="digital-label">HRS</span>
          </div>
          <div className="digital-segment">
            <span className="digital-number" ref={minsRef}>00</span>
            <span className="digital-label">MINS</span>
          </div>
          <div className="digital-segment">
            <span className="digital-number" ref={secsRef}>00</span>
            <span className="digital-label">SECS</span>
          </div>
        </div>

      </div>
    </div>
  );
}