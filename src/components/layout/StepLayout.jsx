import React from 'react';
import TopBar from './TopBar';
import BuildPanel from './BuildPanel';

const StepLayout = ({ currentStep, totalSteps = 8, isComplete = false, children, onArtifactChange }) => {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <TopBar currentStep={currentStep} totalSteps={totalSteps} isComplete={isComplete} />
      
      <div style={{ display: 'flex' }}>
        {/* Main Workspace - 70% */}
        <div style={{
          flex: 1,
          padding: 'var(--space-5)',
          maxWidth: '70%'
        }}>
          {children}
        </div>

        {/* Build Panel - 30% */}
        <BuildPanel stepNumber={currentStep} onArtifactChange={onArtifactChange} />
      </div>
    </div>
  );
};

export default StepLayout;
