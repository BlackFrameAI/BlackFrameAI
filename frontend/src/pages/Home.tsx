import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../components/SpotlightCard';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    const media = window.matchMedia('(max-width: 768px)');
    if (media.addEventListener) {
      media.addEventListener('change', checkMobile);
    } else {
      media.addListener(checkMobile);
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call to set correct position on mount/refresh
    handleScroll();

    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', checkMobile);
      } else {
        media.removeListener(checkMobile);
      }
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Opacity: fades out completely within 100px on mobile, 300px on desktop
  const fadeDistance = isMobile ? 100 : 300;
  const opacityText = Math.max(1 - scrollY / fadeDistance, 0);

  // Parallax: lock to 0px on mobile, translate down up to 150px on desktop
  const yTextVal = isMobile ? 0 : Math.min(scrollY * 0.4, 150);
  const yText = `${yTextVal}px`;

  // Hard hide: set display to none when fully faded to clear layout space
  const displayStyle = opacityText === 0 ? 'none' : 'block';

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative', padding: '40px 20px' }}>
        <div className="hero-glow-container">
          <div className="hero-glass-orb" />
        </div>
        <motion.div style={{ transform: `translate3d(0, ${yText}, 0)`, opacity: opacityText, display: displayStyle, position: 'relative', zIndex: 10 }}>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ display: 'inline-block', padding: '8px 24px', border: '1px solid var(--hud-accent)', color: 'var(--hud-accent)', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '32px', clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
          >
            VERIFIABLE DUAL-USE ENGINE
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We built BlackFrame
          </motion.h1>
          
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', lineHeight: 1.8 }}
          >
            The world's first AI-generated dual use engine, with Codex writing the scaffolding, architecture, and subsystems while our team enforced audits, policy, direction, and red-team gates that kept the build verifiable.
          </motion.p>

          <Link to="/vault" className="vault-btn">
            EXPLORE THE VAULT
          </Link>
        </motion.div>
      </section>

      {/* Spacer for scrolling */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
          style={{ maxWidth: '800px', width: '100%' }}
        >
          <SpotlightCard>
            <h2>Quantum Simulators & Entropy Labs</h2>
            <p style={{ maxWidth: '600px' }}>The same runtime that renders stylized encounters also routes telemetry into our quantum simulator suite, giving partners a plug-ready path for hardware-in-the-loop experiments.</p>
          </SpotlightCard>
        </motion.div>
      </section>
    </div>
  );
}
