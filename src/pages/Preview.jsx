import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumePreview from '../components/resume/ResumePreview';
import TemplateSelector from '../components/resume/TemplateSelector';
import { ArrowLeft, Printer, Copy, AlertCircle, Check } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { generatePlainText, copyToClipboard } from '../utils/exportUtils';
import ATSScore from '../components/resume/ATSScore';

const Preview = () => {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const { personal, experience, projects } = resumeData;
  const isMissingCrucialInfo = !personal.fullName || (experience.length === 0 && projects.length === 0);
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handlePrint = () => {
    window.print();
    setTimeout(() => {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 500);
  };

  const handleCopyText = async () => {
    const text = generatePlainText(resumeData);
    const success = await copyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      backgroundColor: 'var(--color-background)',
      padding: '40px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Toolbar */}
      <div className="no-print" style={{
        width: '100%',
        maxWidth: '820px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        marginBottom: '32px',
      }}>
        {isMissingCrucialInfo && (
          <div style={{
            backgroundColor: 'rgba(217, 119, 6, 0.1)',
            border: '1px solid rgba(217, 119, 6, 0.3)',
            borderRadius: 'var(--radius-sm)',
            padding: '12px 16px',
            color: '#FBBF24',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <AlertCircle size={18} />
            Your resume may look incomplete. Consider adding more details.
          </div>
        )}

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <button
            onClick={() => navigate('/builder')}
            className="back-button"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 16px',
              height: '40px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              fontSize: '13px',
              cursor: 'pointer',
              fontWeight: 500,
              boxSizing: 'border-box',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={14} /> Back to Builder
          </button>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <button
              onClick={handleCopyText}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 18px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--color-border)',
                background: copied ? 'var(--color-success)' : 'var(--color-surface)',
                color: copied ? '#fff' : 'var(--color-text-primary)',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxSizing: 'border-box',
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied!' : 'Copy as Text'}
            </button>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0 18px',
                height: '40px',
                borderRadius: 'var(--radius-sm)',
                border: 'none',
                background: 'var(--color-accent)',
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                boxSizing: 'border-box',
              }}
            >
              <Printer size={16} />
              Print / Save as PDF
            </button>
          </div>
        </div>


        <div className="customization-panel" style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          alignItems: 'start'
        }}>
          <div style={{ flex: '1 1 300px' }}>
            <TemplateSelector />
          </div>
          <div style={{ 
            flex: '0 0 340px',
            borderLeft: '1px solid #f1f5f9', 
            paddingLeft: '32px',
            minWidth: '300px'
          }} className="ats-panel">
            <ATSScore />
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .customization-panel { flex-direction: column; }
            .ats-panel { border-left: none !important; padding-left: 0 !important; width: 100% !important; flex: 1 1 auto !important; }
          }
        `}</style>
      </div>

        <div className="preview-container" style={{
        width: '100%',
        maxWidth: '760px',
        boxShadow: '0 12px 48px rgba(0,0,0,0.1)',
      }}>
        <ResumePreview />
      </div>

      {showToast && (
        <div style={{
          position: 'fixed',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--color-success)',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '100px',
          fontSize: '14px',
          fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          zIndex: 1000,
          animation: 'slideUp 0.3s ease'
        }}>
          <Check size={18} strokeWidth={3} />
          PDF export ready! Check your downloads.
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translate(-50%, 20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Preview;
