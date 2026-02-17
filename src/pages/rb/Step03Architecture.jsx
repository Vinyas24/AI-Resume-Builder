import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepLayout from '../../components/layout/StepLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { hasArtifact } from '../../utils/storage';

const Step03Architecture = () => {
  const navigate = useNavigate();
  const [canProceed, setCanProceed] = useState(false);

  const checkArtifact = () => {
    setCanProceed(hasArtifact(3));
  };

  useEffect(() => {
    checkArtifact();
  }, []);

  return (
    <StepLayout currentStep={3} onArtifactChange={checkArtifact}>
      <div style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>
          Step 3: Architecture Design
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
          Design the overall system architecture and technology stack.
        </p>

        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: '18px', marginTop: 0, marginBottom: 'var(--space-3)' }}>
            What to do:
          </h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <li>Choose your tech stack (React, Next.js, AI API, etc.)</li>
            <li>Define frontend and backend components</li>
            <li>Plan data flow and state management</li>
            <li>Identify third-party services (AI APIs, storage, etc.)</li>
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
            onClick={() => navigate('/rb/04-hld')}
            disabled={!canProceed}
          >
            Next Step <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </StepLayout>
  );
};

export default Step03Architecture;
