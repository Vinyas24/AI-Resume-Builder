import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepLayout from '../../components/layout/StepLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { hasArtifact } from '../../utils/storage';

const Step01Problem = () => {
  const navigate = useNavigate();
  const [canProceed, setCanProceed] = useState(false);

  const checkArtifact = () => {
    setCanProceed(hasArtifact(1));
  };

  useEffect(() => {
    checkArtifact();
  }, []);

  return (
    <StepLayout currentStep={1} onArtifactChange={checkArtifact}>
      <div style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>
          Step 1: Problem Definition
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
          Define the core problem your AI Resume Builder will solve.
        </p>

        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: '18px', marginTop: 0, marginBottom: 'var(--space-3)' }}>
            What to do:
          </h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <li>Identify the pain points in traditional resume building</li>
            <li>Define your target audience (students, professionals, career changers)</li>
            <li>Outline the key value proposition</li>
            <li>Document the problem statement clearly</li>
          </ul>
        </Card>

        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: '18px', marginTop: 0, marginBottom: 'var(--space-3)' }}>
            Instructions:
          </h3>
          <ol style={{ paddingLeft: '20px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <li>Write your problem definition in the Build Panel</li>
            <li>Click "Copy" and paste into Lovable or your notes</li>
            <li>Click "It Worked" to save your artifact</li>
            <li>The "Next" button will unlock</li>
          </ol>
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
            onClick={() => navigate('/rb/02-market')}
            disabled={!canProceed}
          >
            Next Step <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </StepLayout>
  );
};

export default Step01Problem;
