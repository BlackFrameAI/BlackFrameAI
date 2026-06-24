import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import devlogs from '../data/devlogs.json';
import './BlogPost.css'; // Reuse the tactical markdown styling

export default function Vault() {
  const [activeLog, setActiveLog] = useState(devlogs[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'ARCHITECTURE' | 'SIMULATION' | 'GRAPHICS'>('ALL');
  const [isDecrypting, setIsDecrypting] = useState(false);

  // Helper to resolve categories dynamically
  const getCategory = (slug: string) => {
    if (slug.includes('render') || slug.includes('font') || slug.includes('frame') || slug.includes('procedural')) return 'GRAPHICS';
    if (slug.includes('physics') || slug.includes('entropy')) return 'SIMULATION';
    return 'ARCHITECTURE';
  };

  // Filter logs based on search and category
  const filteredLogs = useMemo(() => {
    return devlogs.filter(log => {
      const categoryMatches = selectedCategory === 'ALL' || getCategory(log.slug) === selectedCategory;
      const searchMatches = 
        log.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        log.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.slug.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatches && searchMatches;
    });
  }, [searchQuery, selectedCategory]);

  // Handle active log changes with a decryption delay
  const handleSelectLog = (log: typeof devlogs[0]) => {
    setIsDecrypting(true);
    const timer = setTimeout(() => {
      setActiveLog(log);
      setIsDecrypting(false);
    }, 450);
    return () => clearTimeout(timer);
  };

  // Generate a mock hash for the active log
  const activeLogHash = useMemo(() => {
    if (!activeLog) return '';
    let hash = 0;
    for (let i = 0; i < activeLog.slug.length; i++) {
      hash = (hash << 5) - hash + activeLog.slug.charCodeAt(i);
      hash |= 0;
    }
    return 'SHA256::' + Math.abs(hash).toString(16).padEnd(8, 'f').toUpperCase();
  }, [activeLog]);

  return (
    <div className="vault-layout">
      
      {/* Sidebar: Search & Filtering */}
      <motion.aside 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="vault-sidebar"
      >
        <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', letterSpacing: '0.15em', fontSize: '1rem', marginTop: 0, textTransform: 'uppercase' }}>
          DEVLOG VAULT
        </h2>

        {/* Search */}
        <input 
          type="text" 
          placeholder="SEARCH LOGS..." 
          className="vault-search-box"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Categories */}
        <div className="vault-category-row">
          {(['ALL', 'ARCHITECTURE', 'SIMULATION', 'GRAPHICS'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`vault-category-btn ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Log Buttons */}
        <div className="vault-list-container">
          {filteredLogs.map(log => {
            const cat = getCategory(log.slug);
            return (
              <button
                key={log.slug}
                onClick={() => handleSelectLog(log)}
                className={`vault-log-btn ${activeLog?.slug === log.slug ? 'active' : ''}`}
              >
                <span>{log.title.toUpperCase()}</span>
                <span className="vault-log-sec-badge">{cat.slice(0, 4)}</span>
              </button>
            );
          })}
          {filteredLogs.length === 0 && (
            <div style={{ color: 'var(--text-secondary)', padding: '16px', fontSize: '0.8rem', fontFamily: 'var(--font-display)' }}>
              NO TRANSMISSIONS FOUND
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content: Decrypted Document */}
      <div className="vault-decrypted-content">
        {isDecrypting ? (
          <div className="vault-loading-overlay">
            <div>DECRYPTING QUANTUM DATA CORE...</div>
            <div className="vault-scan-line" />
          </div>
        ) : activeLog ? (
          <motion.div
            key={activeLog.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Classified Telemetry Panel */}
            <div className="vault-header-panel">
              <div className="vault-header-stat">
                FILE REF: <strong>{activeLog.slug.toUpperCase()}</strong>
              </div>
              <div className="vault-header-stat">
                SIGNATURE: <strong>RED-TEAM VERIFIED</strong>
              </div>
              <div className="vault-header-stat">
                INTEGRITY: <strong>{activeLogHash}</strong>
              </div>
              <div className="vault-header-stat">
                ACCESS TIER: <strong>RESTRICTED // EYES ONLY</strong>
              </div>
            </div>

            {/* Document Content */}
            <div className="blog-content">
              <ReactMarkdown>{activeLog.content}</ReactMarkdown>
            </div>
          </motion.div>
        ) : (
          <div className="vault-loading-overlay" style={{ height: '100%' }}>
            <div>SELECT A NODE ENTRY TO RUN DECRYPTION...</div>
          </div>
        )}
      </div>
    </div>
  );
}
