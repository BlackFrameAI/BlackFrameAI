import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <div style={{ padding: '60px 0', maxWidth: '800px', margin: '0 auto' }}>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ marginBottom: '60px', textAlign: 'center' }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Contact BlackFrame AI
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
          Reach the BlackFrame AI studio. We respond within two business days. Share your brief, collaboration idea, or press request and we’ll loop in the right engineers, producers, or storytellers.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gap: '32px', marginBottom: '60px' }}>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          style={{ border: '1px solid rgba(53, 192, 255, 0.2)', background: 'rgba(3, 5, 8, 0.6)', padding: '32px', backdropFilter: 'blur(10px)' }}
        >
          <h3 style={{ color: 'var(--hud-text)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginTop: 0 }}>Partnerships</h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Email <a href="mailto:studio@blackframeai.org" style={{ color: 'var(--hud-accent)' }}>studio@blackframeai.org</a> with your project scope, target dates, and team size.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          style={{ border: '1px solid rgba(53, 192, 255, 0.2)', background: 'rgba(3, 5, 8, 0.6)', padding: '32px', backdropFilter: 'blur(10px)' }}
        >
          <h3 style={{ color: 'var(--hud-text)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginTop: 0 }}>Media & Press</h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Send interview requests or speaking invites to <a href="mailto:press@blackframeai.org" style={{ color: 'var(--hud-accent)' }}>press@blackframeai.org</a>.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{ border: '1px solid rgba(53, 192, 255, 0.2)', background: 'rgba(3, 5, 8, 0.6)', padding: '32px', backdropFilter: 'blur(10px)' }}
        >
          <h3 style={{ color: 'var(--hud-text)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginTop: 0 }}>Community</h3>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Join the conversation on <a href="https://x.com/blackframeai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--hud-accent)' }}>X</a> or hop into our Discord to follow the build in real time.</p>
        </motion.div>
      </div>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ borderTop: '1px solid rgba(53, 192, 255, 0.2)', paddingTop: '60px', textAlign: 'center' }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', letterSpacing: '0.1em' }}>SIGNAL BOOST</h2>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '32px' }}>
          <a href="https://cal.com/blackframeai/partnership-intro" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '12px 24px', background: 'rgba(53, 192, 255, 0.1)', border: '1px solid var(--hud-accent)', color: 'var(--hud-text)', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>BOOK A CAPABILITIES CALL</a>
        </div>
      </motion.section>
    </div>
  );
}
