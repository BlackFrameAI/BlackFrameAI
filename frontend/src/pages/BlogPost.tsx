import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import blogs from '../data/blogs.json';
import './BlogPost.css';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogs.find(b => b.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <div style={{ padding: '40px 0', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--hud-accent)', textDecoration: 'none', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', fontSize: '0.8rem', marginBottom: '40px' }}>
        <ArrowLeft size={16} />
        BACK TO SIGNAL ARRAY
      </Link>

      <motion.article 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <header style={{ marginBottom: '40px', paddingBottom: '40px', borderBottom: '1px solid rgba(53, 192, 255, 0.2)' }}>
          <div style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-display)', letterSpacing: '0.1em', marginBottom: '16px' }}>
            [ LOG {new Date(post.date).toLocaleDateString()} ]
          </div>
          <h1 style={{ fontSize: '2.5rem', margin: '0 0 24px 0', color: 'var(--hud-text)', lineHeight: 1.2 }}>
            {post.title}
          </h1>
          
          {post.tldr && post.tldr.length > 0 && (
            <div style={{ background: 'rgba(53, 192, 255, 0.05)', border: '1px solid rgba(53, 192, 255, 0.2)', padding: '24px', borderRadius: '4px' }}>
              <div style={{ fontFamily: 'var(--font-display)', color: 'var(--hud-accent)', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '12px' }}>TL;DR</div>
              <ul style={{ margin: 0, paddingLeft: '20px', color: 'var(--text-secondary)', display: 'grid', gap: '8px' }}>
                {post.tldr.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </header>

        {/* We use dangerouslySetInnerHTML because we are migrating trusted legacy content */}
        <div 
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
        />
      </motion.article>
    </div>
  );
}
