import React, { useState, useEffect } from 'react';
import TopBar from '../../components/layout/TopBar';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { CheckCircle, Circle, Copy, Trophy, ShieldCheck } from 'lucide-react';
import { hasArtifact, getSubmissionLinks, setSubmissionLinks } from '../../utils/storage';

const STEPS = [
  { id: 1, label: 'Problem Definition' },
  { id: 2, label: 'Market Research' },
  { id: 3, label: 'Architecture Design' },
  { id: 4, label: 'High-Level Design' },
  { id: 5, label: 'Low-Level Design' },
  { id: 6, label: 'Build Implementation' },
  { id: 7, label: 'Testing' },
  { id: 8, label: 'Ship' }
];

const Proof = () => {
  const [links, setLinks] = useState({ lovable: '', github: '', deployed: '' });
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const savedLinks = getSubmissionLinks();
    setLinks(savedLinks);
  }, []);

  const validateUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
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
      setErrors(prev => ({ ...prev, [name]: 'Invalid URL format' }));
    }
  };

  const areLinksValid = 
    validateUrl(links.lovable) && 
    validateUrl(links.github) && 
    validateUrl(links.deployed);

  const allStepsComplete = STEPS.every(step => hasArtifact(step.id));
  const isShipped = allStepsComplete && areLinksValid;

  const handleCopy = () => {
    const text = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- AI-powered resume generation
- Smart content optimization
- Professional templates
- Real-time preview
- Export functionality
------------------------------------------`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-background)' }}>
      <TopBar isComplete={isShipped} />
      
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'var(--space-5)', paddingBottom: '60px' }}>
        
        {/* Header Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div>
            <h1 style={{ fontSize: '28px', margin: 0 }}>Proof of Work</h1>
            <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Final verification and submission packet.
            </p>
          </div>
          <div style={{ 
            padding: '8px 16px', 
            borderRadius: '99px', 
            backgroundColor: isShipped ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
            color: isShipped ? 'var(--color-success)' : 'var(--color-text-secondary)',
            fontWeight: 'bold',
            border: `1px solid ${isShipped ? 'var(--color-success)' : 'var(--color-border)'}`,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            {isShipped ? <ShieldCheck size={18} /> : <Circle size={18} />}
            {isShipped ? 'SHIPPED' : 'IN PROGRESS'}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-5)' }}>
          
          {/* Left Column: steps */}
          <Card title="Step Completion">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {STEPS.map((step) => {
                const completed = hasArtifact(step.id);

                return (
                  <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                     <div style={{ color: completed ? 'var(--color-success)' : 'var(--color-text-tertiary)' }}>
                       {completed ? <CheckCircle size={18} /> : <Circle size={18} />}
                     </div>
                     <span style={{ 
                       color: completed ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'
                     }}>
                       {step.label}
                     </span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Right Column: Artifacts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Card title="Artifact Submission">
               <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                 <Input 
                   label="Lovable Project Link *"
                   name="lovable"
                   placeholder="https://lovable.dev/..."
                   value={links.lovable}
                   onChange={handleLinkChange}
                   error={errors.lovable}
                 />
                 <Input 
                   label="GitHub Repository Link *"
                   name="github"
                   placeholder="https://github.com/..."
                   value={links.github}
                   onChange={handleLinkChange}
                   error={errors.github}
                 />
                 <Input 
                   label="Deployed Application URL *"
                   name="deployed"
                   placeholder="https://vercel.app/..."
                   value={links.deployed}
                   onChange={handleLinkChange}
                   error={errors.deployed}
                 />
               </div>
            </Card>

            {isShipped && (
              <Card style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--color-success)' }}>
                 <div style={{ textAlign: 'center', padding: 'var(--space-2)' }}>
                    <div style={{ color: 'var(--color-success)', marginBottom: 'var(--space-2)', display: 'flex', justifyContent: 'center' }}>
                      <Trophy size={32} />
                    </div>
                    <h3 style={{ fontSize: '18px', color: 'var(--color-success)', marginBottom: '8px' }}>
                      You built a real product.
                    </h3>
                    <p style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                      "Not a tutorial. Not a clone.<br/>
                      A structured tool that solves a real problem.<br/>
                      This is your proof of work."
                    </p>
                    
                    <Button onClick={handleCopy} style={{ width: '100%' }}>
                       {copied ? 'Copied!' : (
                         <>
                           <Copy size={16} /> Copy Final Submission
                         </>
                       )}
                    </Button>
                 </div>
              </Card>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Proof;
