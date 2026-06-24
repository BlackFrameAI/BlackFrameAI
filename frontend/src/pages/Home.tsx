import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import SpotlightCard from '../components/SpotlightCard';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
        <motion.div style={{ y: yBg, position: 'absolute', top: '10%', zIndex: -1 }}>
          <img src="/assets/blackflamelogo.png" alt="BlackFrame" style={{ width: '600px', opacity: 0.1, filter: 'blur(10px)' }} />
        </motion.div>
        
        <motion.div style={{ y: yText, opacity: opacityText }}>
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

          <Link to="/vault" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(53, 192, 255, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              style={{
                marginTop: '40px', padding: '16px 32px', background: 'transparent',
                border: '1px solid var(--hud-accent)', color: 'var(--hud-accent)',
                fontFamily: 'var(--font-display)', fontSize: '1rem', letterSpacing: '0.1em',
                cursor: 'pointer', outline: 'none', transition: 'box-shadow 0.3s ease'
              }}
            >
              EXPLORE THE VAULT
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Spacer for scrolling */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
