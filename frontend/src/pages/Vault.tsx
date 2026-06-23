import { motion } from 'framer-motion';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import devlogs from '../data/devlogs.json';
import './BlogPost.css'; // Reuse the tactical markdown styling

export default function Vault() {
  const [activeLog, setActiveLog] = useState(devlogs[0]);

  return (
    <div style={{ padding: '40px 0', display: 'flex', gap: '40px', maxWidth: '1200px', margin: '0 auto', height: 'calc(100vh - 150px)' }}>
      
      {/* Sidebar: Log List */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        style={{ width: '300px', borderRight: '1px solid rgba(53, 192, 255, 0.2)', paddingRight: '24px', overflowY: 'auto' }}
      >
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', letterSpacing: '0.1em', fontSize: '1rem', marginTop: 0 }}>DEVLOG VAULT</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {devlogs.map(log => (
            <button
              key={log.slug}
              onClick={() => setActiveLog(log)}
              style={{
                textAlign: 'left',
                background: activeLog?.slug === log.slug ? 'rgba(53, 192, 255, 0.1)' : 'transparent',
                border: activeLog?.slug === log.slug ? '1px solid var(--hud-accent)' : '1px solid transparent',
                borderLeft: activeLog?.slug === log.slug ? '3px solid var(--hud-accent)' : '1px solid transparent',
                color: activeLog?.slug === log.slug ? 'var(--hud-text)' : 'var(--text-secondary)',
                padding: '12px 16px',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                letterSpacing: '0.05em',
                transition: 'all 0.2s ease',
              }}
            >
              {log.slug.toUpperCase()}
            </button>
          ))}
        </div>
      </motion.aside>

      {/* Main Content: Markdown Viewer */}
      <motion.main 
        key={activeLog?.slug}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{ flex: 1, overflowY: 'auto', paddingRight: '24px' }}
      >
        {activeLog ? (
          <div className="blog-content">
            <ReactMarkdown>{activeLog.content}</ReactMarkdown>
          </div>
        ) : (
          <div style={{ color: 'var(--text-secondary)' }}>Select a log to decrypt...</div>
        )}
      </motion.main>
    </div>
  );
}
