import React, { useState, useEffect } from "react";
import "./HeroSection.css";
import heading from "../../assets/EventsHeading.webp";

import vid1 from "../../assets/Untitled design (5).mp4";
import vid2 from "../../assets/Untitled design (6).mp4";
import vid3 from "../../assets/Untitled design (7).mp4";
import vid4 from "../../assets/Untitled design (8).mp4";
import vid5 from "../../assets/Untitled design (9).mp4";
import vid6 from "../../assets/Untitled design (14).mp4";
import vid7 from "../../assets/Untitled design (11).mp4";
import vid8 from "../../assets/Untitled design (12).mp4";
import vid9 from "../../assets/Untitled design (13).mp4";

const videos = [vid1, vid2, vid3, vid4, vid5, vid6, vid7, vid8, vid9];

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Switch to honeycomb at 768px and below
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const START_ANGLE = -Math.PI / 2;

  const honeycombPositions = videos.map((video, index) => {
    let x, y;

    if (isMobile) {
      // MOBILE: 1-2-3-2-1 Diamond Grid Base Coordinates
      const mobileGrid = [
        { x: 0, y: -2 },                            // Row 1
        { x: -1, y: -1 }, { x: 1, y: -1 },          // Row 2
        { x: -2, y: 0 }, { x: 0, y: 0 }, { x: 2, y: 0 }, // Row 3
        { x: -1, y: 1 }, { x: 1, y: 1 },            // Row 4
        { x: 0, y: 2 }                              // Row 5
      ];
      x = mobileGrid[index].x;
      y = mobileGrid[index].y;
    } else {
      // DESKTOP & TABLET: Normalized Elliptical Coordinates (-1 to 1)
      const angle = START_ANGLE + (index / videos.length) * (2 * Math.PI);
      x = Math.cos(angle);
      y = Math.sin(angle);
    }
    
    return {
      id: index + 1,
      type: "video",
      videoSrc: video,
      x: x,
      y: y,
    };
  });

  return (
    <section className="hero">
      <div className="hero-center-content">
        <img src={heading} alt="Events Heading" className="events-heading" />
      </div>

      <div className="hexagon-container">
        {honeycombPositions.map((hex) => {
          return (
            <div
              key={hex.id}
              className={`hexagon-wrapper ${hex.type}`}
              style={{
                "--hex-x": hex.x,
                "--hex-y": hex.y,
              }}
            >
              <div className="hexagon-border"></div>
              <div className="hexagon-inner">
                {hex.type === "video" ? (
                  <video
                    src={hex.videoSrc}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="hexagon-video"
                  />
                ) : (
                  <div className="plain-bg">
                    <div className="plain-dot top-dot"></div>
                    <div className="plain-dot bottom-dot"></div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}