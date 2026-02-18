import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-background)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Hero */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
      }}>
        <div style={{
          display: 'inline-block',
          padding: '5px 14px',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '99px',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--color-accent)',
          letterSpacing: '0.5px',
          marginBottom: '32px',
          textTransform: 'uppercase',
        }}>
          AI-Powered · Free to Use
        </div>

        <h1 style={{
          fontSize: 'clamp(40px, 6vw, 72px)',
          lineHeight: 1.1,
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          maxWidth: '800px',
          marginBottom: '24px',
          letterSpacing: '-1px',
        }}>
          Build a Resume That<br />Gets Read.
        </h1>

        <p style={{
          fontSize: '18px',
          color: 'var(--color-text-secondary)',
          maxWidth: '520px',
          lineHeight: 1.7,
          marginBottom: '48px',
        }}>
          A clean, structured resume builder with live preview.
          No clutter. No distractions. Just your story, told well.
        </p>

        <button
          onClick={() => navigate('/builder')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '16px 36px',
            backgroundColor: 'var(--color-text-primary)',
            color: 'var(--color-background)',
            border: 'none',
            borderRadius: 'var(--radius-sm)',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity var(--transition-fast)',
            letterSpacing: '-0.2px',
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
          onMouseLeave={e => e.currentTarget.style.opacity = '1'}
        >
          Start Building <ArrowRight size={18} />
        </button>

        {/* Subtle feature hints */}
        <div style={{
          display: 'flex',
          gap: '32px',
          marginTop: '64px',
          color: 'var(--color-text-tertiary)',
          fontSize: '13px',
        }}>
          {['Live Preview', 'Sample Data', 'Clean Layout', 'Premium Typography'].map(f => (
            <span key={f} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ color: 'var(--color-success)' }}>✓</span> {f}
            </span>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '20px 32px',
        borderTop: '1px solid var(--color-border)',
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--color-text-tertiary)',
      }}>
        KodNest Premium Build System · AI Resume Builder
      </footer>
    </div>
  );
};

export default Landing;
