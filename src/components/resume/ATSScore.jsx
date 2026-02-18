import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { computeATSScore } from '../../utils/atsScore';
import { CheckCircle2, AlertCircle, XCircle, ChevronRight } from 'lucide-react';

const ATSScore = () => {
  const { resumeData, themeColor } = useResume();
  const { score, suggestions } = computeATSScore(resumeData);

  const getStatus = (s) => {
    if (s >= 71) return { label: 'Strong Resume', color: '#10b981', icon: <CheckCircle2 size={20} /> };
    if (s >= 41) return { label: 'Getting There', color: '#f59e0b', icon: <AlertCircle size={20} /> };
    return { label: 'Needs Work', color: '#ef4444', icon: <XCircle size={20} /> };
  };

  const status = getStatus(score);
  const strokeDasharray = 2 * Math.PI * 45;
  const strokeDashoffset = strokeDasharray - (score / 100) * strokeDasharray;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        {/* Circular Progress */}
        <div style={{ position: 'relative', width: '100px', height: '100px' }}>
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#eee"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke={status.color}
              strokeWidth="8"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>{score}</div>
            <div style={{ fontSize: '10px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Score</div>
          </div>
        </div>

        {/* Status Label */}
        <div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            color: status.color, 
            fontWeight: 700, 
            fontSize: '16px',
            marginBottom: '4px'
          }}>
            {status.icon}
            {status.label}
          </div>
          <p style={{ fontSize: '13px', color: '#64748b', maxWidth: '180px' }}>
            {score === 100 
              ? "Perfect! Your resume is highly optimized for ATS." 
              : "Follow the suggestions below to increase your score."}
          </p>
        </div>
      </div>

      {/* Improvement Suggestions */}
      {suggestions.length > 0 && (
        <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
          <h4 style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
            Improvement Suggestions
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto', paddingRight: '8px' }}>
            {suggestions.map((s, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '10px', 
                fontSize: '13px', 
                color: '#475569',
                padding: '8px',
                background: '#f8fafc',
                borderRadius: '6px',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{ 
                  color: themeColor, 
                  background: `${themeColor}15`, 
                  borderRadius: '4px', 
                  padding: '2px 6px', 
                  fontSize: '11px', 
                  fontWeight: 700,
                  whiteSpace: 'nowrap'
                }}>
                  +{s.points}
                </div>
                <span>{s.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSScore;
