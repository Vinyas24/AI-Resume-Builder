import React from 'react';
import { computeATSScore } from '../../utils/atsScore';
import { useResume } from '../../context/ResumeContext';

const ATSScore = () => {
  const { resumeData } = useResume();
  const { score, suggestions } = computeATSScore(resumeData);

  const getScoreColor = (s) => {
    if (s >= 75) return '#4B7F52'; // success green
    if (s >= 45) return '#D97706'; // warning amber
    return '#DC2626';              // error red
  };

  const getScoreLabel = (s) => {
    if (s >= 75) return 'Strong';
    if (s >= 45) return 'Fair';
    return 'Needs Work';
  };

  const color = getScoreColor(score);
  const pct = score; // 0–100

  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      padding: '20px 24px',
      marginBottom: '16px',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: '12px',
      }}>
        <span style={{
          fontSize: '12px',
          fontWeight: 700,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: 'var(--color-text-secondary)',
        }}>
          ATS Readiness Score
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
          <span style={{ fontSize: '28px', fontWeight: 700, color, lineHeight: 1 }}>
            {score}
          </span>
          <span style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>/100</span>
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            color,
            backgroundColor: `${color}18`,
            padding: '2px 8px',
            borderRadius: '99px',
            marginLeft: '4px',
          }}>
            {getScoreLabel(score)}
          </span>
        </div>
      </div>

      {/* Score Bar */}
      <div style={{
        height: '6px',
        backgroundColor: 'var(--color-border)',
        borderRadius: '99px',
        overflow: 'hidden',
        marginBottom: '24px',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          backgroundColor: color,
          borderRadius: '99px',
          transition: 'width 0.4s ease, background-color 0.3s ease',
        }} />
      </div>

      {/* Top 3 Improvements */}
      <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px' }}>
        <h4 style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
          color: 'var(--color-text-tertiary)',
          marginBottom: '12px',
        }}>
          Top 3 Improvements
        </h4>
        {suggestions.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {suggestions.map((s, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
              }}>
                <div style={{
                  marginTop: '4px',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-warning)',
                  flexShrink: 0,
                }} />
                {s}
              </div>
            ))}
          </div>
        ) : (
          <div style={{
            fontSize: '13px',
            color: 'var(--color-success)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ fontSize: '16px' }}>✓</span> Your resume is in excellent shape!
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSScore;
