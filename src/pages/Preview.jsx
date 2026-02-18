import React from 'react';
import { useNavigate } from 'react-router-dom';
import ResumePreview from '../components/resume/ResumePreview';
import TemplateSelector from '../components/resume/TemplateSelector';
import { ArrowLeft } from 'lucide-react';

const Preview = () => {
  const navigate = useNavigate();

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      backgroundColor: '#525659',
      padding: '40px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Toolbar */}
      <div style={{
        width: '100%',
        maxWidth: '760px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => navigate('/builder')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255,255,255,0.1)',
              color: '#fff',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: 500,
            }}
          >
            <ArrowLeft size={14} /> Back to Builder
          </button>
          <TemplateSelector />
        </div>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>
          Preview Mode — Export coming soon
        </span>
      </div>

      {/* Resume Sheet */}
      <div style={{
        width: '100%',
        maxWidth: '760px',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}>
        <ResumePreview />
      </div>
    </div>
  );
};

export default Preview;
