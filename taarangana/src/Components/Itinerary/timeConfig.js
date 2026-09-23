// src/config/timeConfig.js

// ==========================================
// 📅 TIME CONFIGURATION
// ==========================================

export const PREFEST_START = new Date("2026-03-01T00:00:00");
export const FEST_START = new Date("2026-03-18T11:00:00");

// ==========================================
// ⚙️ ANIMATION SETTINGS
// ==========================================

export const TICK_SETTINGS = {
  DURATION: 0.4,       
  ELASTICITY: 1.2,     
  DEGREES_PER_TICK: 6, 
};

// ==========================================
// 📐 ANGLE MAPPING
// ==========================================

const RING_SEGMENTS = {
  "The Moment You've Waited For...": 0,    
  "A Distant Moment": 45,                  
  "Beyond The Horizon": 90,
  "Taking Shape": 135,                     
  "Prefest: The Journey Begins...": 180,
  "On The Way": 225,
  "Almost There": 270,
  "At The Threshold": 315,
};

// ==========================================
// 🧮 HELPER FUNCTIONS
// ==========================================

export function getClockRotation(startSegmentText, endSegmentText) {
  const now = new Date();
  
  const startAngle = RING_SEGMENTS[startSegmentText] ?? 45; 
  let endAngle = RING_SEGMENTS[endSegmentText] ?? 0;

  if (endAngle < startAngle) {
    endAngle += 360;
  }

  const tStart = PREFEST_START.getTime();
  const tEnd = FEST_START.getTime();
  const tNow = now.getTime();
  
  const totalDuration = tEnd - tStart;
  const elapsed = tNow - tStart;

  let progress = elapsed / totalDuration;
  progress = Math.min(Math.max(progress, 0), 1); 

  const totalRotationSpan = endAngle - startAngle;
  
  return startAngle + (progress * totalRotationSpan);
}

export function getCurrentSecond() {
  return new Date().getSeconds();
}

export function getInitialRotation() {
  return new Date().getSeconds() * TICK_SETTINGS.DEGREES_PER_TICK;
}

export function getTimeRemaining() {
  const total = FEST_START.getTime() - new Date().getTime();
  if (total <= 0) return { days: '00', hours: '00', minutes: '00', seconds: '00' };

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    days: String(days).padStart(2, '0'),
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0')
  };
}