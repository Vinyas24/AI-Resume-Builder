import React from 'react';
import { useResume } from '../../context/ResumeContext';

import { Check } from 'lucide-react';

const TemplateSelector = () => {
  const { template, setTemplate, themeColor, setThemeColor } = useResume();

  const templates = [
    { 
      id: 'classic', 
      label: 'Classic',
      preview: (
        <div style={{ width: '100%', height: '100%', padding: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ height: '4px', background: '#333', width: '40%', margin: '0 auto' }} />
          <div style={{ height: '1.5px', background: '#ddd', width: '100%' }} />
          <div style={{ height: '1.5px', background: '#eee', width: '80%' }} />
          <div style={{ height: '1.5px', background: '#ddd', width: '100%' }} />
          <div style={{ height: '1.5px', background: '#eee', width: '90%' }} />
        </div>
      )
    },
    { 
      id: 'modern', 
      label: 'Modern',
      preview: (
        <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '30% 1fr', gap: '6px', padding: '6px' }}>
          <div style={{ background: themeColor, opacity: 0.2, borderRadius: '2px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ height: '4px', background: '#333', width: '60%' }} />
            <div style={{ height: '1.5px', background: '#eee', width: '100%' }} />
            <div style={{ height: '1.5px', background: '#eee', width: '90%' }} />
            <div style={{ height: '1.5px', background: '#eee', width: '100%' }} />
          </div>
        </div>
      )
    },
    { 
      id: 'minimal', 
      label: 'Minimal',
      preview: (
        <div style={{ width: '100%', height: '100%', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ height: '4px', background: '#333', width: '30%' }} />
          <div style={{ height: '1.5px', background: '#f5f5f5', width: '100%' }} />
          <div style={{ height: '1.5px', background: '#f5f5f5', width: '100%' }} />
          <div style={{ height: '1.5px', background: '#f5f5f5', width: '100%' }} />
        </div>
      )
    },
  ];

  const colors = [
    { name: 'Teal', value: 'hsl(168, 60%, 40%)' },
    { name: 'Navy', value: 'hsl(220, 60%, 35%)' },
    { name: 'Burgundy', value: 'hsl(345, 60%, 35%)' },
    { name: 'Forest', value: 'hsl(150, 50%, 30%)' },
    { name: 'Charcoal', value: 'hsl(0, 0%, 25%)' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Template Picker */}
      <div>
        <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Layout Template
        </h4>
        <div style={{ display: 'flex', gap: '16px' }}>
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemplate(t.id)}
              style={{
                width: '120px',
                padding: 0,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                position: 'relative'
              }}
            >
              <div style={{
                aspectRatio: '1 / 1.4',
                background: '#fff',
                borderRadius: '8px',
                border: template === t.id ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                boxShadow: template === t.id ? '0 4px 12px rgba(59, 130, 246, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)',
                marginBottom: '8px',
                overflow: 'hidden',
                transition: 'all 0.2s ease'
              }}>
                {t.preview}
                {template === t.id && (
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    background: '#3b82f6',
                    color: '#fff',
                    borderRadius: '50%',
                    width: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <Check size={12} strokeWidth={4} />
                  </div>
                )}
              </div>
              <span style={{ 
                fontSize: '13px', 
                fontWeight: template === t.id ? 600 : 500,
                color: template === t.id ? '#1e293b' : '#64748b'
              }}>
                {t.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Picker */}
      <div>
        <h4 style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Theme Color
        </h4>
        <div style={{ display: 'flex', gap: '12px' }}>
          {colors.map((c) => (
            <button
              key={c.value}
              onClick={() => setThemeColor(c.value)}
              title={c.name}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: c.value,
                border: themeColor === c.value ? '2px solid #fff' : 'none',
                boxShadow: themeColor === c.value ? `0 0 0 2px ${c.value}, 0 4px 8px rgba(0,0,0,0.2)` : '0 2px 4px rgba(0,0,0,0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: themeColor === c.value ? 'scale(1.1)' : 'scale(1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {themeColor === c.value && <Check size={16} color="#fff" strokeWidth={3} />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;
