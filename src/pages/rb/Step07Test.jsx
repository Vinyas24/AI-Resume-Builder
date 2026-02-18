import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StepLayout from '../../components/layout/StepLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { ArrowRight, AlertCircle, RotateCcw, CheckSquare, Square } from 'lucide-react';
import { hasArtifact, getChecklist, toggleChecklistItem, resetChecklist } from '../../utils/storage';

const CHECKLIST_ITEMS = [
  { text: "All form sections save to localStorage", hint: "Fill fields, refresh, check if data persists" },
  { text: "Live preview updates in real-time", hint: "Type in builder and watch the preview update" },
  { text: "Template switching preserves data", hint: "Switch between layouts, verify content is safe" },
  { text: "Color theme persists after refresh", hint: "Pick a color, refresh, verify it's still applied" },
  { text: "ATS score calculates correctly", hint: "Add/remove info and verify score changes" },
  { text: "Score updates live on edit", hint: "Confirm suggestions disappear as you fix issues" },
  { text: "Export buttons work (copy/download)", hint: "Verify 'Copy as Text' and 'Print' functionality" },
  { text: "Empty states handled gracefully", hint: "Ensure No-Data scenario doesn't crash the app" },
  { text: "Mobile responsive layout works", hint: "Check layout on smaller viewport widths" },
  { text: "No console errors on any page", hint: "Open DevTools (F12) and check for red errors" }
];

const Step07Test = () => {
  const navigate = useNavigate();
  const [canProceed, setCanProceed] = useState(false);
  const [checklist, setChecklist] = useState(new Array(10).fill(false));

  const loadData = () => {
    setCanProceed(hasArtifact(7));
    setChecklist(getChecklist());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggle = (index) => {
    const updated = toggleChecklistItem(index);
    setChecklist(updated);
  };

  const handleReset = () => {
    if (confirm("Reset all checklist items?")) {
      resetChecklist();
      setChecklist(new Array(10).fill(false));
    }
  };

  const completedCount = checklist.filter(Boolean).length;

  return (
    <StepLayout currentStep={7} onArtifactChange={loadData}>
      <div style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>
          Step 7: Testing
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-5)' }}>
          Verify all features against the 10-item quality checklist.
        </p>

        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>
              Test Checklist ({completedCount}/10)
            </h3>
            <button 
              onClick={handleReset}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: 'var(--color-text-tertiary)', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px',
                fontSize: '12px',
                cursor: 'pointer'
              }}
            >
              <RotateCcw size={12} /> Reset Checklist
            </button>
          </div>
          
          <div style={{ display: 'flex', marginBottom: 'var(--space-3)', height: '6px', backgroundColor: 'var(--color-border)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${(completedCount / 10) * 100}%`, 
              backgroundColor: completedCount === 10 ? 'var(--color-success)' : 'var(--color-accent)',
              transition: 'width 0.3s ease'
            }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {CHECKLIST_ITEMS.map((item, index) => (
              <div 
                key={index} 
                onClick={() => handleToggle(index)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '12px', 
                  padding: '12px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: checklist[index] ? 'rgba(75, 127, 82, 0.05)' : 'var(--color-surface-secondary)',
                  border: `1px solid ${checklist[index] ? 'var(--color-success)' : 'var(--color-border)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ color: checklist[index] ? 'var(--color-success)' : 'var(--color-text-tertiary)', marginTop: '2px' }}>
                  {checklist[index] ? <CheckSquare size={20} /> : <Square size={20} />}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: checklist[index] ? 'var(--color-success)' : 'var(--color-text-primary)' }}>
                    {item.text}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                    {item.hint}
                  </div>
                </div>
              </div>
            ))}
          </div>
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
