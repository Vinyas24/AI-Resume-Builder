import React, { useState, useEffect } from 'react';
import TopBar from '../../components/layout/TopBar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { CheckCircle, Circle, Copy, Trophy, ShieldCheck, ExternalLink, Github, Globe } from 'lucide-react';
import { hasArtifact, getSubmissionLinks, setSubmissionLinks, areAllTestsPassed, getChecklist } from '../../utils/storage';

const STEPS = [
  { id: 1, label: 'Problem Definition' },
  { id: 2, label: 'Market Research' },
  { id: 3, label: 'Architecture Design' },
  { id: 4, label: 'High-Level Design' },
  { id: 5, label: 'Low-Level Design' },
  { id: 6, label: 'Build Implementation' },
  { id: 7, label: 'Testing & Checklist' },
  { id: 8, label: 'Ship' }
];

const Proof = () => {
  const [links, setLinks] = useState({ lovable: '', github: '', deployed: '' });
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);
  const [checklist, setChecklist] = useState(new Array(10).fill(false));

  useEffect(() => {
    const savedLinks = getSubmissionLinks();
    setLinks(savedLinks);
    setChecklist(getChecklist());
  }, []);

  const validateUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return url.startsWith('http');
    } catch {
      return false;
    }
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...links, [name]: value };
    setLinks(updated);
    setSubmissionLinks(updated);

    if (validateUrl(value)) {
      setErrors(prev => ({ ...prev, [name]: null }));
    } else if (value) {
      setErrors(prev => ({ ...prev, [name]: 'Please enter a valid URL (starting with http:// or https://)' }));
    }
  };

  const areLinksProvided = links.lovable && links.github && links.deployed;
  const areLinksValid = 
    validateUrl(links.lovable) && 
    validateUrl(links.github) && 
    validateUrl(links.deployed);

  const allStepsComplete = STEPS.every(step => hasArtifact(step.id));
  const allTestsPassed = areAllTestsPassed();
  
  // Strict Shipping Rule
  const isShipped = allStepsComplete && allTestsPassed && areLinksValid;

  const handleCopy = () => {
    const text = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const testsCompleted = checklist.filter(Boolean).length;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <TopBar isComplete={isShipped} />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'var(--space-5)', paddingBottom: '80px' }}>
        
        {/* Header Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div>
            <h1 style={{ fontSize: '28px', margin: 0 }}>Final Proof</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Verify all requirements and collect artifacts for submission.
            </p>
          </div>
          <div style={{ 
            padding: '8px 20px', 
            borderRadius: '99px', 
            backgroundColor: isShipped ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            color: isShipped ? 'var(--color-success)' : 'var(--color-warning)',
            fontWeight: 700,
            border: `1px solid ${isShipped ? 'var(--color-success)' : 'var(--color-warning)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            letterSpacing: '0.05em'
          }}>
            {isShipped ? <ShieldCheck size={18} /> : <Circle size={18} />}
            {isShipped ? 'SHIPPED' : 'IN PROGRESS'}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'var(--space-5)', alignItems: 'start' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            {/* Steps & Checklist Summary */}
            <Card title="Step & Quality Overview">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Build Steps</h4>
                  {STEPS.map((step) => {
                    const completed = hasArtifact(step.id);
                    return (
                      <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                         <div style={{ color: completed ? 'var(--color-success)' : 'var(--color-text-tertiary)' }}>
                           {completed ? <CheckCircle size={16} /> : <Circle size={16} />}
                         </div>
                         <span style={{ color: completed ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
                           {step.label}
                         </span>
                      </div>
                    );
                  })}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: '1px solid #f1f5f9', paddingLeft: '24px' }}>
                   <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>Test Checklist</h4>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                      <div style={{ color: allTestsPassed ? 'var(--color-success)' : 'var(--color-warning)' }}>
                        {allTestsPassed ? <CheckCircle size={16} /> : <Circle size={16} />}
                      </div>
                      <span style={{ fontWeight: 600 }}>{testsCompleted}/10 Tests Passed</span>
                   </div>
                   <p style={{ fontSize: '11px', color: 'var(--color-text-tertiary)', lineHeight: 1.4 }}>
                     Ensure all 10 quality checks are completed in Step 7.
                   </p>
                </div>
              </div>
            </Card>

            {/* Artifact Collection */}
            <Card title="Artifact Collection">
               <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                 <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '12px', top: '38px', color: 'var(--color-text-tertiary)' }}><ExternalLink size={16} /></div>
                    <Input 
                      label="Lovable Project Link *"
                      name="lovable"
                      placeholder="https://lovable.dev/projects/..."
                      value={links.lovable}
                      onChange={handleLinkChange}
                      error={errors.lovable}
                      style={{ paddingLeft: '38px' }}
                    />
                 </div>
                 <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '12px', top: '38px', color: 'var(--color-text-tertiary)' }}><Github size={16} /></div>
                    <Input 
                      label="GitHub Repository Link *"
                      name="github"
                      placeholder="https://github.com/username/repo"
                      value={links.github}
                      onChange={handleLinkChange}
                      error={errors.github}
                      style={{ paddingLeft: '38px' }}
                    />
                 </div>
                 <div style={{ position: 'relative' }}>
                    <div style={{ position: 'absolute', left: '12px', top: '38px', color: 'var(--color-text-tertiary)' }}><Globe size={16} /></div>
                    <Input 
                      label="Deployed Application URL *"
                      name="deployed"
                      placeholder="https://your-project.vercel.app"
                      value={links.deployed}
                      onChange={handleLinkChange}
                      error={errors.deployed}
                      style={{ paddingLeft: '38px' }}
                    />
                 </div>
               </div>
            </Card>
          </div>

          {/* Right Column: Status & Export */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', position: 'sticky', top: '24px' }}>
            <Card style={{ 
              backgroundColor: isShipped ? 'rgba(16, 185, 129, 0.05)' : 'var(--color-surface)',
              border: isShipped ? '1px solid var(--color-success)' : '1px solid var(--color-border)'
            }}>
               <div style={{ textAlign: 'center', padding: 'var(--space-2)' }}>
                  <div style={{ 
                    color: isShipped ? 'var(--color-success)' : 'var(--color-text-tertiary)', 
                    marginBottom: 'var(--space-2)', 
                    display: 'flex', 
                    justifyContent: 'center' 
                  }}>
                    {isShipped ? <Trophy size={48} /> : <Rocket size={48} style={{ opacity: 0.2 }} />}
                  </div>
                  
                  {isShipped ? (
                    <>
                      <h3 style={{ fontSize: '18px', color: 'var(--color-success)', marginBottom: '8px' }}>
                        Project 3 Shipped Successfully.
                      </h3>
                      <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.5 }}>
                        All quality checks passed. Your submission packet is ready for export.
                      </p>
                      <Button onClick={handleCopy} style={{ width: '100%', height: '48px', fontSize: '14px', fontWeight: 700 }}>
                         {copied ? 'Submission Copied!' : (
                           <><Copy size={16} /> Copy Final Submission</>
                         )}
                      </Button>
                    </>
                  ) : (
                    <>
                      <h3 style={{ fontSize: '16px', color: 'var(--color-text-primary)', marginBottom: '8px' }}>
                        Ready to Ship?
                      </h3>
                      <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
                        <Requirement met={allStepsComplete} label="Complete all 8 build steps" />
                        <Requirement met={allTestsPassed} label="Pass all 10 test checklist items" />
                        <Requirement met={areLinksValid} label="Provide 3 valid artifact links" />
                      </div>
                    </>
                  )}
               </div>
            </Card>

            <div style={{ padding: '0 12px', fontSize: '12px', color: 'var(--color-text-tertiary)', lineHeight: 1.5 }}>
              The "Shipped" status is a permanent record of your project's completion state. 
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const Requirement = ({ met, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: met ? 'var(--color-success)' : 'var(--color-text-secondary)' }}>
    {met ? <CheckCircle size={14} /> : <Circle size={14} style={{ opacity: 0.5 }} />}
    <span style={{ fontWeight: met ? 600 : 400 }}>{label}</span>
  </div>
);

const Rocket = ({ size, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    style={style}
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
    <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
  </svg>
);

export default Proof;
