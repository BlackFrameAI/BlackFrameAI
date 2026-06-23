import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import blogs from '../data/blogs.json';

export default function BlogList() {
  return (
    <div style={{ padding: '60px 0' }}>
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ marginBottom: '60px', textAlign: 'center' }}
      >
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          Signal Array
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>Decrypted transmission logs and studio dispatches.</p>
      </motion.div>

      <div style={{ display: 'grid', gap: '32px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {blogs.map((post, i) => (
          <Link to={`/blog/${post.slug}`} key={post.slug} style={{ textDecoration: 'none' }}>
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                border: '1px solid rgba(53, 192, 255, 0.2)',
                background: 'rgba(3, 5, 8, 0.6)',
                padding: '24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid var(--hud-accent)';
                e.currentTarget.style.background = 'rgba(53, 192, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.border = '1px solid rgba(53, 192, 255, 0.2)';
                e.currentTarget.style.background = 'rgba(3, 5, 8, 0.6)';
              }}
            >
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontFamily: 'var(--font-display)', letterSpacing: '0.1em' }}>
                {new Date(post.date).toLocaleDateString()}
              </div>
              <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'var(--hud-text)', lineHeight: 1.4 }}>
                {post.title}
              </h2>
              {post.tldr && post.tldr.length > 0 && (
                <ul style={{ margin: 0, paddingLeft: '16px', color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1 }}>
                  {post.tldr.slice(0, 2).map((item, idx) => (
                    <li key={idx} style={{ marginBottom: '8px' }}>{item}</li>
                  ))}
                </ul>
              )}
              <div style={{ color: 'var(--hud-accent)', fontSize: '0.8rem', fontFamily: 'var(--font-display)', marginTop: 'auto' }}>
                [ READ TRANSMISSION ]
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </div>
  );
}
