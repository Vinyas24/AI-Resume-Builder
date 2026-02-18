import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, FileText, CheckCircle, Layout } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  const NavLink = ({ path, icon, label }) => (
    <button
      onClick={() => navigate(path)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        borderRadius: 'var(--radius-sm)',
        background: isActive(path) ? 'var(--color-surface)' : 'transparent',
        color: isActive(path) ? 'var(--color-accent)' : 'var(--color-text-secondary)',
        border: isActive(path) ? '1px solid var(--color-border)' : '1px solid transparent',
        fontSize: '14px',
        fontWeight: 500,
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
      }}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <nav style={{
      height: '60px',
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 32px',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '17px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          cursor: 'pointer',
          fontFamily: 'var(--font-heading)',
          letterSpacing: '-0.3px',
        }}
      >
        <Sparkles size={18} style={{ color: 'var(--color-accent)' }} />
        AI Resume Builder
      </div>

      <div style={{ display: 'flex', gap: '4px' }}>
        <NavLink path="/builder" icon={<Layout size={15} />} label="Builder" />
        <NavLink path="/preview" icon={<FileText size={15} />} label="Preview" />
        <NavLink path="/proof" icon={<CheckCircle size={15} />} label="Proof" />
      </div>

      <div style={{ width: '160px' }} />
    </nav>
  );
};

export default Navbar;
