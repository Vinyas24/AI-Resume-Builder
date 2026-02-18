import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ResumePreview from '../components/resume/ResumePreview';
import TemplateSelector from '../components/resume/TemplateSelector';
import { ArrowLeft, Printer, Copy, AlertCircle, Check } from 'lucide-react';
import { useResume } from '../context/ResumeContext';
import { generatePlainText, copyToClipboard } from '../utils/exportUtils';

const Preview = () => {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const [copied, setCopied] = useState(false);

  const { personal, experience, projects } = resumeData;
  const isMissingCrucialInfo = !personal.fullName || (experience.length === 0 && projects.length === 0);

  const handlePrint = () => {
    window.print();
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
      backgroundColor: '#525659',
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
        gap: '16px',
        marginBottom: '24px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => navigate('/builder')}
              className="back-button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '0 16px',
                height: '40px',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: 500,
                boxSizing: 'border-box',
              }}
            >
              <ArrowLeft size={14} /> Back to Builder
            </button>
            <div className="template-selector" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>
              <TemplateSelector />
            </div>
          </div>

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
                border: '1px solid rgba(255,255,255,0.2)',
                background: copied ? 'var(--color-success)' : 'rgba(255,255,255,0.1)',
                color: '#fff',
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
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                boxSizing: 'border-box',
              }}
            >
              <Printer size={16} />
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      {/* Resume Sheet */}
      <div className="preview-container" style={{
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
