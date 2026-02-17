import React, { useState } from 'react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Textarea from '../ui/Textarea';
import { Copy, ExternalLink, CheckCircle, XCircle, Camera } from 'lucide-react';

const BuildPanel = ({ stepNumber, onArtifactChange }) => {
  const [artifactContent, setArtifactContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error' | null

  const handleCopy = () => {
    if (artifactContent.trim()) {
      navigator.clipboard.writeText(artifactContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStatusClick = (newStatus) => {
    setStatus(newStatus);
    if (newStatus === 'success' && artifactContent.trim()) {
      // Save artifact to localStorage
      const key = `rb_step_${stepNumber}_artifact`;
      localStorage.setItem(key, artifactContent);
      if (onArtifactChange) onArtifactChange();
    }
  };

  return (
    <div style={{
      width: '30%',
      minWidth: '350px',
      height: 'calc(100vh - 60px)',
      position: 'sticky',
      top: '60px',
      overflowY: 'auto',
      padding: 'var(--space-4)',
      backgroundColor: 'var(--color-background)',
      borderLeft: '1px solid var(--color-border)'
    }}>
      <Card>
        <h3 style={{ fontSize: '16px', marginBottom: 'var(--space-3)', marginTop: 0 }}>
          Build Panel
        </h3>

        <Textarea
          label="Copy This Into Lovable"
          placeholder="Paste your prompt or code here..."
          rows={8}
          value={artifactContent}
          onChange={(e) => setArtifactContent(e.target.value)}
          style={{ marginBottom: 'var(--space-3)' }}
        />

        <Button
          onClick={handleCopy}
          variant="secondary"
          style={{ width: '100%', marginBottom: 'var(--space-3)' }}
          disabled={!artifactContent.trim()}
        >
          <Copy size={16} />
          {copied ? 'Copied!' : 'Copy'}
        </Button>

        <Button
          variant="primary"
          style={{ width: '100%', marginBottom: 'var(--space-4)' }}
          onClick={() => window.open('https://lovable.dev', '_blank')}
        >
          <ExternalLink size={16} />
          Build in Lovable
        </Button>

        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: 'var(--space-3)',
          marginTop: 'var(--space-3)'
        }}>
          <p style={{
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-2)'
          }}>
            Mark build status:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <Button
              variant="success"
              onClick={() => handleStatusClick('success')}
              style={{
                width: '100%',
                backgroundColor: status === 'success' ? 'var(--color-success)' : undefined
              }}
            >
              <CheckCircle size={16} />
              It Worked
            </Button>

            <Button
              variant="error"
              onClick={() => handleStatusClick('error')}
              style={{
                width: '100%',
                backgroundColor: status === 'error' ? 'var(--color-error)' : undefined
              }}
            >
              <XCircle size={16} />
              Error
            </Button>

            <Button
              variant="secondary"
              onClick={() => handleStatusClick('screenshot')}
            >
              <Camera size={16} />
              Add Screenshot
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BuildPanel;
