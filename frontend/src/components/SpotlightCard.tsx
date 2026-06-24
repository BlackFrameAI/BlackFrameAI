import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export default function SpotlightCard({ children, className = '', glowColor = 'rgba(53, 192, 255, 0.15)' }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);



  // Motion values for 3D tilt
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);

  // Smooth springs for tilt
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const smoothTiltX = useSpring(tiltX, springConfig);
  const smoothTiltY = useSpring(tiltY, springConfig);

  // Map to gentle rotation angles
  const rotateX = useTransform(smoothTiltY, [-1, 1], [5, -5]);
  const rotateY = useTransform(smoothTiltX, [-1, 1], [-5, 5]);

  // Hook into mouse move to update raw values manually, since useMotionTemplate needs raw strings
  // but framer motion's style prop handles raw motion values poorly inside complex strings sometimes.
  // Actually, we can use a state for the background style or just standard framer motion style block.
  // Let's use a state for the raw background string to be safe with gradients.
  const [gradientPos, setGradientPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate cursor position for glow
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGradientPos({ x, y });

    // Calculate normalized cursor position for tilt (-1 to 1)
    const xPct = x / rect.width;
    const yPct = y / rect.height;
    tiltX.set(xPct * 2 - 1);
    tiltY.set(yPct * 2 - 1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltX.set(0);
    tiltY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '12px',
        border: '1px solid rgba(53,192,255,0.1)',
        backgroundColor: '#050b14',
      }}
      className={className}
    >
      {/* Dynamic Hover Glow */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          pointerEvents: 'none',
          background: `radial-gradient(600px circle at ${gradientPos.x}px ${gradientPos.y}px, ${glowColor}, transparent 40%)`,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Content wrapper to float above glow */}
      <div 
        style={{ 
          transform: "translateZ(20px)",
          position: 'relative',
          zIndex: 10,
          height: '100%',
          width: '100%',
          padding: '24px'
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
