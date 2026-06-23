import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Playbooks() {
  return (
    <div style={{ padding: '60px 0', maxWidth: '1000px', margin: '0 auto' }}>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ marginBottom: '60px', textAlign: 'center' }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Partner Playbooks
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Blueprints that keep AI collaborations accountable. These playbooks translate our internal runbooks into shareable guides for studios, publishers, and creative labs.
        </p>
      </motion.div>

      <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', marginBottom: '60px' }}>
        {[
          { title: 'AI Engine Foundations', desc: 'Overview of the simulation spine, narrative codex, and co-pilot layers that power our internal stack.', slug: 'ai-engine-foundations' },
          { title: 'Blueprint Days Sprint Map', desc: 'Day-by-day breakdown of how Codex scaffolds a new build, including Markdown spec templates and QA hooks.', slug: 'blueprint-days' },
          { title: 'Vibe Coding Canon Pack', desc: 'Style, tone, and telemetry guardrails for keeping generative outputs consistent with your universe.', slug: 'birth-of-vibe-coding' }
        ].map((item, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              border: '1px solid rgba(53, 192, 255, 0.2)',
              background: 'rgba(3, 5, 8, 0.6)',
              padding: '32px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 style={{ color: 'var(--hud-text)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginTop: 0 }}>{item.title}</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '24px' }}>{item.desc}</p>
            <Link to={`/blog/${item.slug}`} style={{ color: 'var(--hud-accent)', textDecoration: 'none', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em', cursor: 'pointer', display: 'inline-block' }}>
              [ READ THE PILLAR GUIDE ]
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ borderTop: '1px solid rgba(53, 192, 255, 0.2)', paddingTop: '60px' }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', letterSpacing: '0.1em' }}>WHAT PARTNERS GAIN</h2>
        <ul style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', paddingLeft: '20px', display: 'grid', gap: '16px' }}>
          <li><strong style={{ color: 'var(--hud-text)' }}>Documented decision logs:</strong> Every automation change includes an audit trail, fallback plan, and escalation ladder.</li>
          <li><strong style={{ color: 'var(--hud-text)' }}>Integration scorecards:</strong> Shared dashboards track adoption, operator load, and days saved across each milestone.</li>
          <li><strong style={{ color: 'var(--hud-text)' }}>Training loops:</strong> Coached sessions with your leads to rehearse prompts, review outputs, and certify readiness.</li>
        </ul>
      </motion.section>
    </div>
  );
}
