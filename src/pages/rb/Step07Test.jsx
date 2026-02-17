import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepLayout from '../../components/layout/StepLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { hasArtifact } from '../../utils/storage';

const Step07Test = () => {
  const navigate = useNavigate();
  const [canProceed, setCanProceed] = useState(false);

  const checkArtifact = () => {
    setCanProceed(hasArtifact(7));
  };

  useEffect(() => {
    checkArtifact();
  }, []);

  return (
    <StepLayout currentStep={7} onArtifactChange={checkArtifact}>
      <div style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>
          Step 7: Testing
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
          Test your application thoroughly before shipping.
        </p>

        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: '18px', marginTop: 0, marginBottom: 'var(--space-3)' }}>
            What to do:
          </h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <li>Test all core features (input validation, AI generation, preview)</li>
            <li>Check edge cases (empty inputs, long text, special characters)</li>
            <li>Verify responsive design on different screen sizes</li>
            <li>Test AI output quality and consistency</li>
            <li>Check for console errors and warnings</li>
          </ul>
        </Card>

        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: '18px', marginTop: 0, marginBottom: 'var(--space-3)' }}>
            Test Checklist:
          </h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <li>✓ Form validation works correctly</li>
            <li>✓ AI generates relevant resume content</li>
            <li>✓ Resume preview displays properly</li>
            <li>✓ Export/download functionality works</li>
            <li>✓ No console errors on main pages</li>
          </ul>
        </Card>

        {!canProceed && (
          <Card style={{ 
            backgroundColor: 'rgba(239, 68, 68, 0.05)', 
            border: '1px solid var(--color-error)',
            marginBottom: 'var(--space-4)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-error)' }}>
              <AlertCircle size={20} />
              <span>Complete this step by saving your artifact in the Build Panel</span>
            </div>
          </Card>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => navigate('/rb/08-ship')}
            disabled={!canProceed}
          >
            Next Step <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </StepLayout>
  );
};

export default Step07Test;
