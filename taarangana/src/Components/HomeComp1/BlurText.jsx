import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);
  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'word',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = [0.22, 1, 0.36, 1], // Better cinematic easing
  stepDuration = 0.4
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    setInView(true); // Force true for landing page consistency
  }, []);

  const defaultFrom = useMemo(() => ({
    filter: 'blur(15px)',
    opacity: 0,
    y: direction === 'top' ? -30 : 30
  }), [direction]);

  const defaultTo = useMemo(() => [
    { filter: 'blur(0px)', opacity: 1, y: 0 }
  ], []);

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;
  const totalDuration = stepDuration * toSnapshots.length;
  const times = [0, 1];

  return (
    <p ref={ref} className={className} style={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={{ duration: totalDuration, times, delay: (index * delay) / 1000, ease: easing }}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;