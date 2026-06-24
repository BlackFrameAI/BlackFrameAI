import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { Shield } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import HoloCat from './components/HoloCat';
import Home from './pages/Home';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';
import Playbooks from './pages/Playbooks';
import Vault from './pages/Vault';
import Services from './pages/Services';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <Router>
        <ScrollToTop />
        <CustomCursor />
        <div className="mesh-bg" />
      
      {/* 3D WebGL Canvas Layer */}
      <HoloCat />
      
      <div className="hud-viewport" ref={containerRef}>
        
        {/* Tactical Flank Left */}
        <aside className="desktop-flank" style={{ borderRight: '1px solid var(--hud-accent)', opacity: 0.3, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px' }}>
          <div style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', fontSize: '0.8rem', writingMode: 'vertical-rl', letterSpacing: '0.5em' }}>
            SYS.L // OVR
          </div>
          <div style={{ height: '100px', width: '1px', background: 'var(--hud-accent)', marginTop: '40px' }} />
        </aside>

        {/* Central Core */}
        <main style={{ position: 'relative', display: 'flex', flexDirection: 'column', width: '100%' }}>
          
          {/* Header */}
          <motion.header 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
              display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
              padding: '24px 0', borderBottom: '1px solid rgba(53, 192, 255, 0.2)',
              position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(10px)',
              flexWrap: 'wrap', gap: '16px'
            }}
          >
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '16px', textDecoration: 'none' }}>
              <Shield color="var(--hud-accent)" size={28} />
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', letterSpacing: '0.1em', color: 'var(--hud-text)' }}>BLACKFRAME AI</span>
            </Link>
            <nav className="nav-scroll">
              <Link to="/" style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link>
              <Link to="/services" style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', textDecoration: 'none' }}>Services</Link>
              <Link to="/playbooks" style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', textDecoration: 'none' }}>Playbooks</Link>
              <Link to="/vault" style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', textDecoration: 'none' }}>Vault</Link>
              <Link to="/blog" style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', textDecoration: 'none' }}>Blog</Link>
              <Link to="/contact" style={{ fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-secondary)', textDecoration: 'none' }}>Contact</Link>
            </nav>
          </motion.header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/playbooks" element={<Playbooks />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>

        </main>

        {/* Tactical Flank Right */}
        <aside className="desktop-flank" style={{ borderLeft: '1px solid var(--hud-accent)', opacity: 0.3, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '40px' }}>
          <div style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', fontSize: '0.8rem', writingMode: 'vertical-rl', letterSpacing: '0.5em' }}>
            SYS.R // OVR
          </div>
          <div style={{ height: '100px', width: '1px', background: 'var(--hud-accent)', marginTop: '40px' }} />
        </aside>

      </div>
    </Router>
    </ReactLenis>
  );
}

export default App;
