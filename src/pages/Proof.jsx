import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

const Proof = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      backgroundColor: 'var(--color-background)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <div style={{
        maxWidth: '560px',
        width: '100%',
        textAlign: 'center',
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          <FileText size={28} style={{ color: 'var(--color-text-tertiary)' }} />
        </div>

        <h1 style={{
          fontSize: '28px',
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: '12px',
          letterSpacing: '-0.5px',
        }}>
          Proof of Work
        </h1>

        <p style={{
          fontSize: '15px',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          marginBottom: '32px',
        }}>
          This section will display your submission artifacts — screenshots, links, and completion status — once the project is shipped.
        </p>

        <div style={{
          padding: '24px',
          border: '1px dashed var(--color-border)',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text-tertiary)',
          fontSize: '13px',
          marginBottom: '32px',
        }}>
          Artifacts will appear here · Coming soon
        </div>

        <button
          onClick={() => navigate('/builder')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-sm)',
            background: 'none',
            fontSize: '14px',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          <ArrowLeft size={14} /> Back to Builder
        </button>
      </div>
    </div>
  );
};

export default Proof;
