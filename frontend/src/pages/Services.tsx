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
        
        <div className="matrix-grid">
          <div className="matrix-card">
            <div>
              <div className="matrix-tag">[ ENG-01 ]</div>
              <h3 className="matrix-title">Engine prototyping sprints</h3>
              <p className="matrix-body">Integrate our modular spine to stress-test new mechanics, biomes, or encounter systems in days instead of quarters.</p>
            </div>
            <div className="matrix-telemetry">
              <span>STATUS: ONLINE</span>
              <span>LATENCY: &lt; 1.2ms</span>
              <span>FLOW: 94.2%</span>
            </div>
          </div>
          <div className="matrix-card">
            <div>
              <div className="matrix-tag">[ CO-02 ]</div>
              <h3 className="matrix-title">Creator co-pilot buildouts</h3>
              <p className="matrix-body">Deploy narrative and level-design copilots trained on your canon and guardrails, complete with human-in-the-loop checkpoints.</p>
            </div>
            <div className="matrix-telemetry">
              <span>STATUS: READY</span>
              <span>ALIGNMENT: 99.8%</span>
              <span>GEN: 400ms</span>
            </div>
          </div>
          <div className="matrix-card">
            <div>
              <div className="matrix-tag">[ LIVE-03 ]</div>
              <h3 className="matrix-title">Live-ops automation labs</h3>
              <p className="matrix-body">Wire observability pipelines, alerting policies, and content refresh automations that keep operators focused on player health.</p>
            </div>
            <div className="matrix-telemetry">
              <span>STATUS: ACTIVE</span>
              <span>CYCLE: 15s</span>
              <span>INTEGRITY: 100%</span>
            </div>
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
