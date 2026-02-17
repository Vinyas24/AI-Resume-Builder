import React from 'react';
import { Circle, CheckCircle } from 'lucide-react';

const TopBar = ({ currentStep, totalSteps = 8, isComplete = false }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'var(--space-3) var(--space-5)',
      backgroundColor: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      {/* Left: Project Name */}
      <div style={{
        fontSize: '18px',
        fontWeight: 600,
        color: 'var(--color-text-primary)'
      }}>
        AI Resume Builder
      </div>

      {/* Center: Step Counter */}
      {currentStep && (
        <div style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          fontWeight: 500
        }}>
          Project 3 — Step {currentStep} of {totalSteps}
        </div>
      )}

      {/* Right: Status Badge */}
      <div style={{
        padding: '6px 16px',
        borderRadius: '99px',
        backgroundColor: isComplete ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
        color: isComplete ? 'var(--color-success)' : 'var(--color-text-secondary)',
        fontWeight: 600,
        fontSize: '12px',
        border: `1px solid ${isComplete ? 'var(--color-success)' : 'var(--color-border)'}`,
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        {isComplete ? <CheckCircle size={14} /> : <Circle size={14} />}
        {isComplete ? 'COMPLETE' : 'IN PROGRESS'}
      </div>
    </div>
  );
};

export default TopBar;
