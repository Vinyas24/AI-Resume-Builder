import React from 'react';
import { useResume } from '../../context/ResumeContext';

const Section = ({ title, children }) => (
  <div style={{ marginBottom: '20px' }}>
    <h3 style={{
      fontSize: '11px',
      fontWeight: 700,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      color: '#111',
      borderBottom: '1.5px solid #111',
      paddingBottom: '4px',
      marginBottom: '10px',
    }}>
      {title}
    </h3>
    {children}
  </div>
);

const ResumePreview = () => {
  const { resumeData } = useResume();
  const { personal, summary, experience, education, skills, projects } = resumeData;

  const skillList = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div style={{
      width: '100%',
      minHeight: '1056px',
      backgroundColor: '#fff',
      color: '#111',
      fontFamily: '"Times New Roman", Times, serif',
      fontSize: '12px',
      lineHeight: '1.5',
      padding: '48px 52px',
      boxSizing: 'border-box',
    }}>
      {/* Header */}
      {(personal.fullName || personal.jobTitle || personal.email || personal.phone || personal.location || personal.linkedin || personal.website) && (
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          {personal.fullName && (
            <h1 style={{
              fontSize: '28px',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              color: '#000',
              marginBottom: '6px',
              fontFamily: '"Times New Roman", Times, serif',
            }}>
              {personal.fullName}
            </h1>
          )}
          {personal.jobTitle && (
            <p style={{ fontSize: '14px', color: '#444', marginBottom: '8px' }}>
              {personal.jobTitle}
            </p>
          )}
          <div style={{ fontSize: '11px', color: '#555', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '4px 12px' }}>
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.location && <span>{personal.location}</span>}
            {personal.linkedin && <span>{personal.linkedin}</span>}
            {personal.website && <span>{personal.website}</span>}
          </div>
        </div>
      )}

      {/* Summary */}
      {summary && (
        <Section title="Summary">
          <p style={{ color: '#333' }}>{summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Experience">
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '13px' }}>{exp.company || 'Company'}</strong>
                <span style={{ fontSize: '11px', color: '#555' }}>{exp.date}</span>
              </div>
              <div style={{ fontStyle: 'italic', color: '#444', marginBottom: '4px' }}>{exp.role}</div>
              {exp.description && (
                <p style={{ color: '#333', whiteSpace: 'pre-line' }}>{exp.description}</p>
              )}
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education">
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '13px' }}>{edu.school || 'School'}</strong>
                <span style={{ fontSize: '11px', color: '#555' }}>{edu.date}</span>
              </div>
              <div style={{ fontStyle: 'italic', color: '#444' }}>{edu.degree}</div>
              {edu.description && <p style={{ color: '#333' }}>{edu.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <Section title="Projects">
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '13px' }}>{proj.name || 'Project'}</strong>
                {proj.link && <span style={{ fontSize: '11px', color: '#555' }}>{proj.link}</span>}
              </div>
              {proj.description && <p style={{ color: '#333' }}>{proj.description}</p>}
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skillList.length > 0 && (
        <Section title="Skills">
          <p style={{ color: '#333' }}>{skillList.join(' · ')}</p>
        </Section>
      )}

      {/* Empty state */}
      {!personal.fullName && !summary && experience.length === 0 && education.length === 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '400px',
          color: '#aaa',
          gap: '12px',
        }}>
          <div style={{ fontSize: '36px' }}>📄</div>
          <p style={{ fontSize: '14px' }}>Your resume preview will appear here.</p>
          <p style={{ fontSize: '12px' }}>Fill in the form or load sample data to get started.</p>
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
