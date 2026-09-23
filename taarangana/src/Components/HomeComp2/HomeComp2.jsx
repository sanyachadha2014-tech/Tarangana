import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './HomeComp2.css';

import wheelImg from '../../assets/wheel2.webp';
import upImg from '../../assets/up.webp';
import downImg from '../../assets/down.webp';

const HomeComp2 = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { amount: 0.3, once: false });

  const [showWheel, setShowWheel] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const wheelHasPlayed = useRef(false);

  useEffect(() => {
    let timer;
    if (isInView) {
      if (!wheelHasPlayed.current) {
        setShowWheel(true);
        timer = setTimeout(() => {
          setShowWheel(false);
          setShowContent(true);
          wheelHasPlayed.current = true;
        }, 2200); // Loader duration
      } else {
        setShowContent(true);
      }
    } else {
      setShowContent(false);
      setShowWheel(false);
      // Optional: Reset if you want the loader to play every time it scrolls into view
      // wheelHasPlayed.current = false; 
    }
    return () => clearTimeout(timer);
  }, [isInView]);

  return (
    <section className="hc2-wrapper" ref={containerRef}>
      <div className="hc2-texture-overlay" />
      
      <motion.div 
        className="hc2-parallax-bg"
        animate={{ 
          scale: isInView ? 1 : 1.1,
          opacity: isInView ? 1 : 0 
        }}
        transition={{ duration: 1.2 }}
      />

      <div className="hc2-animation-area">
        <AnimatePresence mode="wait">
          {showWheel && (
            <motion.img
              key="wheel-loader"
              src={wheelImg}
              className="hc2-wheel"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: 360 }}
              exit={{ 
                opacity: 0, 
                scale: 1.8, 
                filter: "blur(40px)",
                transition: { duration: 0.8, ease: "easeInOut" } 
              }}
              transition={{
                opacity: { duration: 0.5 },
                rotate: { duration: 3, ease: "linear", repeat: Infinity },
                scale: { duration: 0.5 }
              }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContent && (
            <motion.div key="content-main" className="hc2-content-inner">
              {/* Top Image: Slid up from center */}
              <motion.img
                src={upImg}
                className="hc2-split-image"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: "-38vh", opacity: 0.7 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Text Content: Fade and Rise */}
              <motion.div
                className="hc2-text-content"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.9, delay: 0.3 }}
              >
                <h1 className="hc2-heading">Welcome to Etherea</h1>
                <p className="hc2-description">
                  Culture isn’t a relic; it’s a frequency. 
                  <strong> Etherea</strong> is the space where the nine emotions—the <em>Navrasas</em>—stop being tradition and start being transcendence. 
                  It’s the realization that the fierce soul of an ancient mudra and the high-octane roar of a concert crowd are built from the exact same DNA.
                  <br /><br />
                  We’re bridging the gap between heritage and the hype. The "glitch" isn't a break in the system; it’s the evolution. Old soul. New signal. Welcome to the transcendence.
                </p>
              </motion.div>

              {/* Bottom Image: Slid down from center */}
              <motion.img
                src={downImg}
                className="hc2-split-image"
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: "38vh", opacity: 0.7 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HomeComp2;