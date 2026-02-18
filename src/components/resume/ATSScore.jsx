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
        marginBottom: suggestions.length > 0 ? '16px' : '0',
      }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          backgroundColor: color,
          borderRadius: '99px',
          transition: 'width 0.4s ease, background-color 0.3s ease',
        }} />
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {suggestions.map((s, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              fontSize: '12px',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.4,
            }}>
              <span style={{ color: 'var(--color-warning)', flexShrink: 0, marginTop: '1px' }}>→</span>
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ATSScore;
