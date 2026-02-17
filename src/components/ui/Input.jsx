import React from 'react';

const Input = ({ label, error, style = {}, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{
          fontSize: '14px',
          fontWeight: 500,
          color: 'var(--color-text-secondary)'
        }}>
          {label}
        </label>
      )}
      <input
        {...props}
        style={{
          padding: '10px 12px',
          backgroundColor: 'var(--color-background)',
          border: `1px solid ${error ? 'var(--color-error)' : 'var(--color-border)'}`,
          borderRadius: 'var(--radius-sm)',
          color: 'var(--color-text-primary)',
          fontSize: '14px',
          outline: 'none',
          transition: 'border-color var(--transition-normal)',
          ...style
        }}
        onFocus={(e) => {
          if (!error) e.target.style.borderColor = 'var(--color-accent)';
        }}
        onBlur={(e) => {
          if (!error) e.target.style.borderColor = 'var(--color-border)';
        }}
      />
      {error && (
        <span style={{ fontSize: '12px', color: 'var(--color-error)' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
