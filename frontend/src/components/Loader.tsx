import { Html, useProgress } from '@react-three/drei';
import { motion } from 'framer-motion';

export default function Loader() {
  const { progress } = useProgress();
  
  return (
    <Html center>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-display)',
          color: 'var(--hud-accent)',
          letterSpacing: '0.2em',
          background: 'rgba(3, 5, 8, 0.9)',
          padding: '40px',
          border: '1px solid var(--hud-accent)',
          width: '300px',
          clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
        }}
      >
        <div style={{ fontSize: '0.8rem', marginBottom: '16px' }}>INITIALIZING ENGINE</div>
        <div style={{ fontSize: '2rem', fontWeight: 900 }}>{Math.max(0, Math.min(100, Math.round(progress)))}%</div>
        <div style={{ width: '100%', height: '2px', background: 'rgba(53, 192, 255, 0.2)', marginTop: '20px', position: 'relative' }}>
          <motion.div 
            style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: 'var(--hud-accent)' }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
          />
        </div>
      </motion.div>
    </Html>
  );
}
