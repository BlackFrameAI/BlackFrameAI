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
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef}>
      {/* Hero Section */}
      <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
        {/* Background logo removed to maintain professional minimalist aesthetic against WebGL */}
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

          <Link to="/vault" className="vault-btn">
            EXPLORE THE VAULT
          </Link>
        </motion.div>
      </section>

      {/* Spacer for scrolling */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
