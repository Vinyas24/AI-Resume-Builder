import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepLayout from '../../components/layout/StepLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ArrowRight, AlertCircle, Rocket } from 'lucide-react';
import { hasArtifact } from '../../utils/storage';

const Step08Ship = () => {
  const navigate = useNavigate();
  const [canProceed, setCanProceed] = useState(false);

  const checkArtifact = () => {
    setCanProceed(hasArtifact(8));
  };

  useEffect(() => {
    checkArtifact();
  }, []);

  return (
    <StepLayout currentStep={8} onArtifactChange={checkArtifact}>
      <div style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>
          Step 8: Ship
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
          Deploy your AI Resume Builder and make it live!
        </p>

        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: '18px', marginTop: 0, marginBottom: 'var(--space-3)' }}>
            What to do:
          </h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <li>Deploy to a hosting platform (Vercel, Netlify, etc.)</li>
            <li>Push code to GitHub repository</li>
            <li>Test the live deployment</li>
            <li>Document deployment steps and environment variables</li>
          </ul>
        </Card>

        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <h3 style={{ fontSize: '18px', marginTop: 0, marginBottom: 'var(--space-3)' }}>
            Deployment Checklist:
          </h3>
          <ul style={{ paddingLeft: '20px', color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>
            <li>✓ Code pushed to GitHub</li>
            <li>✓ Environment variables configured</li>
            <li>✓ Application deployed and accessible</li>
            <li>✓ All features working in production</li>
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

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
          <Button
            onClick={() => navigate('/rb/proof')}
            disabled={!canProceed}
            variant="success"
          >
            <Rocket size={18} />
            Go to Proof Page
          </Button>
        </div>
      </div>
    </StepLayout>
  );
};

export default Step08Ship;
