import React from 'react';
import { useResume } from '../../context/ResumeContext';

const TemplateSelector = () => {
  const { template, setTemplate } = useResume();

  const templates = [
    { id: 'classic', label: 'Classic' },
    { id: 'modern', label: 'Modern' },
    { id: 'minimal', label: 'Minimal' },
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '8px',
      backgroundColor: 'var(--color-surface)',
      padding: '4px',
      borderRadius: 'var(--radius-sm)',
      border: '1px solid var(--color-border)',
      width: 'fit-content',
    }}>
      {templates.map((t) => (
        <button
          key={t.id}
          onClick={() => setTemplate(t.id)}
          style={{
            padding: '6px 16px',
            borderRadius: 'var(--radius-sm)',
            border: 'none',
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            backgroundColor: template === t.id ? 'var(--color-text-primary)' : 'transparent',
            color: template === t.id ? 'var(--color-background)' : 'var(--color-text-secondary)',
            transition: 'all 0.2s ease',
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
};

export default TemplateSelector;
