import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <div style={{ padding: '60px 0', maxWidth: '1000px', margin: '0 auto' }}>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ marginBottom: '60px', textAlign: 'center' }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Studio Services
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          Co-build AI-first universes without losing the craft. BlackFrame AI plugs into your production pipeline to accelerate what makes your worlds distinct. We prototype simulation spines, build creator co-pilots, and operationalize live-ops telemetry so your team can ship faster while keeping authorship intentional.
        </p>
        <div style={{ marginTop: '32px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <a href="https://cal.com/blackframeai/partnership-intro" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', padding: '12px 24px', background: 'rgba(53, 192, 255, 0.1)', border: '1px solid var(--hud-accent)', color: 'var(--hud-text)', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>SCHEDULE A FIT CALL</a>
          <Link to="/playbooks" style={{ textDecoration: 'none', padding: '12px 24px', border: '1px solid rgba(53, 192, 255, 0.3)', color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>VIEW PLAYBOOKS</Link>
        </div>
      </motion.div>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{ marginBottom: '60px' }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', letterSpacing: '0.1em' }}>CORE ENGAGEMENTS</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Every engagement is anchored in measurable outcomes. We ship working prototypes, reporting dashboards, and documentation your teams can reuse without us in the room.</p>
        
        <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div style={{ border: '1px solid rgba(53, 192, 255, 0.2)', background: 'rgba(3, 5, 8, 0.6)', padding: '32px', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ color: 'var(--hud-text)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginTop: 0 }}>Engine prototyping sprints</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>Integrate our modular spine to stress-test new mechanics, biomes, or encounter systems in days instead of quarters.</p>
          </div>
          <div style={{ border: '1px solid rgba(53, 192, 255, 0.2)', background: 'rgba(3, 5, 8, 0.6)', padding: '32px', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ color: 'var(--hud-text)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginTop: 0 }}>Creator co-pilot buildouts</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>Deploy narrative and level-design copilots trained on your canon and guardrails, complete with human-in-the-loop checkpoints.</p>
          </div>
          <div style={{ border: '1px solid rgba(53, 192, 255, 0.2)', background: 'rgba(3, 5, 8, 0.6)', padding: '32px', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ color: 'var(--hud-text)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginTop: 0 }}>Live-ops automation labs</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>Wire observability pipelines, alerting policies, and content refresh automations that keep operators focused on player health.</p>
          </div>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{ borderTop: '1px solid rgba(53, 192, 255, 0.2)', paddingTop: '60px' }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', letterSpacing: '0.1em' }}>HOW ENGAGEMENTS RUN</h2>
        <ol style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.1rem', paddingLeft: '20px', display: 'grid', gap: '16px' }}>
          <li><strong style={{ color: 'var(--hud-text)' }}>Discovery pulse:</strong> Map existing workflows, compliance needs, and bespoke datasets to scope impact areas.</li>
          <li><strong style={{ color: 'var(--hud-text)' }}>Sprint charter:</strong> Align on success metrics, evaluation cadence, and review rituals before a single ticket is touched.</li>
          <li><strong style={{ color: 'var(--hud-text)' }}>Build + calibrate:</strong> Ship a working loop every week, pairing human leads with Codex agents and telemetry dashboards.</li>
          <li><strong style={{ color: 'var(--hud-text)' }}>Transition playbook:</strong> Deliver integration docs, training sessions, and opt-in support tiers to keep momentum.</li>
        </ol>
      </motion.section>
    </div>
  );
}
