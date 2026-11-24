import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.16)',
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
      className={`relative overflow-hidden transition-all duration-300 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(450px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 65%)`
        }}
      />
      {children}
    </div>
  );
}

export function CountUp({ to, suffix = '', duration = 1.1 }) {
  const spanRef = useRef(null);

  useEffect(() => {
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: to,
        duration,
        ease: 'power3.out',
        onUpdate: () => {
          if (spanRef.current) {
            spanRef.current.textContent = `${Math.round(obj.val)}${suffix}`;
          }
        }
      });
    });
    return () => ctx.revert();
  }, [to, suffix, duration]);

  return <span ref={spanRef}>0{suffix}</span>;
}

export function GlassyCard({ children, className = '' }) {
  return (
    <div className={`glass-v5 rounded-2xl transition-all duration-200 ${className}`}>
      {children}
    </div>
  );
}
