import React, { useRef, useState, useEffect } from 'react';

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(37, 99, 235, 0.08)',
  onClick
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden transition-colors duration-150 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-150"
        style={{
          opacity,
          background: `radial-gradient(360px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 65%)`
        }}
      />
      {children}
    </div>
  );
}

export function CountUp({ to = 0, suffix = '', duration = 0.6 }) {
  const [displayVal, setDisplayVal] = useState(Math.round(Number(to) || 0));

  useEffect(() => {
    const target = Number(to) || 0;
    const ms = Math.max(150, duration * 1000);
    let rafId = null;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayVal(Math.round(target * eased));
      if (t < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [to, duration]);

  return (
    <span>
      {displayVal}
      {suffix}
    </span>
  );
}

export function GlassyCard({ children, className = '' }) {
  return (
    <div className={`glass-v5 rounded-2xl transition-colors duration-150 ${className}`}>
      {children}
    </div>
  );
}
