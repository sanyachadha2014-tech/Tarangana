import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import './HomeComp1.css';
import LightRays from './LightRays';
import BlurText from './BlurText';
import ModernScene from './ModernScene';

// Assets for Traditional Scene
import curtainImg from './assets/traditional/curtain_half.webp';
import scene1 from './assets/traditional/scene_1.webp';
import scene2 from './assets/traditional/scene_2.webp';
import scene3 from './assets/traditional/scene_3.webp';
import scene4 from './assets/traditional/scene_4.webp';
import scene5 from './assets/traditional/scene_5.webp';
import scene6 from './assets/traditional/scene_6.webp';
import scene7 from './assets/traditional/scene_7.webp';
import scene8 from './assets/traditional/scene_8.webp';
import scene9 from './assets/traditional/scene_9.webp';

const SCENES = [scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9];
const NAVARASA = ['Shringara', 'Bhayanaka', 'Raudra', 'Karuna', 'Vira', 'Hasya', 'Bibhatsa', 'Adbhuta', 'Shanta'];
const RASA_COLORS = ['#dc15cf', '#61028e', '#ff0000', '#34399b', '#00a2ff', '#ffc400', '#03ad00', '#00ddff', '#fff9e6'];

const CYCLE_MS = 2000;
const TRANSITION_MS = 1000;

function TraditionalScene({ onEtherefy }) {
  const [curtainOpen, setCurtainOpen] = useState(false);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [rasaVisible, setRasaVisible] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const update = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentIndex = Math.floor(elapsed / CYCLE_MS) % SCENES.length;
      setSceneIndex((prev) => {
        if (prev !== currentIndex) {
          setPrevIndex(prev);
          return currentIndex;
        }
        return prev;
      });
      requestAnimationFrame(update);
    };
    const frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    setCurtainOpen(true);
    const t = setTimeout(() => setRasaVisible(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="trad-scene-container">
      <div className="homecomp1-scene-stack">
        {SCENES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className={`homecomp1-scene-layer ${i === sceneIndex ? 'active' : ''} ${i === prevIndex ? 'previous' : ''}`}
            style={{
              transitionDuration: `${TRANSITION_MS}ms`,
              zIndex: i === sceneIndex ? 3 : (i === prevIndex ? 2 : 1)
            }}
          />
        ))}
      </div>
      <LightRays color={RASA_COLORS[sceneIndex]} intensity={0.7} />
      <div className="homecomp1-rasa-label">
        {rasaVisible && (
          <BlurText key={sceneIndex} text={NAVARASA[sceneIndex]} delay={500} animateBy="words" direction="bottom" />
        )}
      </div>
      <div className="homecomp1-cta-wrap">
        <button 
          className="homecomp1-cta" 
          type="button" 
          onClick={onEtherefy}
          onTouchEnd={(e) => {
            e.preventDefault(); 
            onEtherefy();
          }}
        >
          Let's Etherefy!
        </button>
      </div>
      <div className={`homecomp1-curtains${curtainOpen ? ' opening' : ''}`}>
        <div className="homecomp1-curtain-left"><img src={curtainImg} alt="" /></div>
        <div className="homecomp1-curtain-right"><img src={curtainImg} alt="" /></div>
      </div>
    </div>
  );
}

function ChromaGlitchFilter() {
  return (
    <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
      <defs>
        <filter id="chroma-glitch">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="0" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="distorted" />
          <feColorMatrix in="distorted" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red"/>
          <feColorMatrix in="distorted" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green"/>
          <feColorMatrix in="distorted" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue"/>
          <feOffset in="red" dx="-5" dy="0" result="redShifted" />
          <feOffset in="green" dx="0" dy="0" result="greenShifted" />
          <feOffset in="blue" dx="5" dy="0" result="blueShifted" />
          <feBlend in="redShifted" in2="blueShifted" mode="screen" result="rb"/>
          <feBlend in="rb" in2="greenShifted" mode="screen" />
        </filter>
      </defs>
    </svg>
  );
}

export default function HomeComp1() {
  const [currentScene, setCurrentScene] = useState('traditional');
  const [visitCount, setVisitCount] = useState(0);
  const rootRef = useRef(null);
  const glitchOverlayRef = useRef(null);

  useEffect(() => {
    const storedCount = localStorage.getItem('taarangana_visits');
    const newCount = storedCount ? parseInt(storedCount, 10) + 1 : 1;
    localStorage.setItem('taarangana_visits', newCount);
    setVisitCount(newCount);
  }, []);

  const startTransition = () => {
    if (currentScene !== 'traditional') return;

    // Detect if we are on mobile to reduce iterations
    const isMobile = window.innerWidth <= 768;
    const glitchIterations = isMobile ? 4 : 8;

    const tl = gsap.timeline({
      onStart: () => rootRef.current.classList.add('glitching')
    });

    const displacementMap = document.querySelector('#chroma-glitch feDisplacementMap');
    const offsets = document.querySelectorAll('#chroma-glitch feOffset');

    tl.to(glitchOverlayRef.current, { opacity: 1, duration: 0.1 });

    for (let i = 0; i < glitchIterations; i++) {
      const time = i * 0.05;
      tl.to(displacementMap, { attr: { scale: gsap.utils.random(80, 220) }, duration: 0.03 }, time);
      tl.to(offsets[0], { attr: { dx: gsap.utils.random(-50, 50) }, duration: 0.03 }, time);
      tl.to(offsets[2], { attr: { dx: gsap.utils.random(-50, 50) }, duration: 0.03 }, time);
    }

    // Adjust timing slightly to match the reduced iterations on mobile
    const transitionTime = isMobile ? 0.25 : 0.4;
    const cleanupTime = isMobile ? 0.35 : 0.5;

    tl.add(() => {
      setCurrentScene('modern');
    }, transitionTime);

    tl.to(glitchOverlayRef.current, { opacity: 0, duration: 0.3, ease: "power2.out" }, cleanupTime);
    tl.to(displacementMap, { attr: { scale: 0 }, duration: 0.4, ease: "back.out(2)" }, cleanupTime);
    tl.to(offsets[0], { attr: { dx: -5 }, duration: 0.4 }, cleanupTime);
    tl.to(offsets[2], { attr: { dx: 5 }, duration: 0.4 }, cleanupTime);

    tl.set(rootRef.current, { className: "homecomp1-root" }, cleanupTime + 0.4);
  };

  return (
    <div className={`homecomp1-root scene-${currentScene}`} ref={rootRef}>
      <ChromaGlitchFilter />
      <div className="chroma-glitch-overlay" ref={glitchOverlayRef} />

      <div className={`site-visit-counter ${currentScene}-counter`}>
        <span className="counter-label">Visits</span>
        <span className="counter-number">{visitCount.toLocaleString()}</span>
      </div>

      <div className="scene-main-content">
        {currentScene === 'traditional' ? (
          <TraditionalScene onEtherefy={startTransition} />
        ) : (
          <ModernScene />
        )}
      </div>
    </div>
  );
}