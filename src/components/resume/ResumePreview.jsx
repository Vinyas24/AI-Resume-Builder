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
  const { resumeData, template } = useResume();
  const { personal, summary, experience, education, skills, projects } = resumeData;

  const skillList = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  // Template Styles
  const isClassic = template === 'classic';
  const isModern = template === 'modern';
  const isMinimal = template === 'minimal';

  const containerStyle = {
    width: '100%',
    minHeight: '1056px',
    backgroundColor: '#fff',
    color: '#111',
    fontFamily: isClassic ? '"Times New Roman", Times, serif' : 'Inter, system-ui, sans-serif',
    fontSize: isMinimal ? '11px' : '12px',
    lineHeight: isMinimal ? '1.4' : '1.5',
    padding: isMinimal ? '40px 44px' : '48px 52px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle = {
    textAlign: isModern ? 'left' : 'center',
    marginBottom: isMinimal ? '16px' : '24px',
    borderBottom: isModern ? '2px solid #111' : 'none',
    paddingBottom: isModern ? '12px' : '0',
  };

  const SectionTitle = ({ children }) => (
    <h3 style={{
      fontSize: isMinimal ? '10px' : '11px',
      fontWeight: 700,
      letterSpacing: '1.2px',
      textTransform: 'uppercase',
      color: '#000',
      borderBottom: isClassic ? '1.5px solid #111' : 'none',
      paddingBottom: isClassic ? '4px' : '0',
      marginBottom: isMinimal ? '8px' : '12px',
      marginTop: isModern ? '0' : '0',
      display: isModern ? 'block' : 'block',
    }}>
      {children}
    </h3>
  );

  const SectionWrapper = ({ title, children }) => {
    if (isModern) {
      return (
        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '24px', marginBottom: '20px' }}>
          <SectionTitle>{title}</SectionTitle>
          <div>{children}</div>
        </div>
      );
    }
    return (
      <div style={{ marginBottom: isMinimal ? '14px' : '20px' }}>
        <SectionTitle>{title}</SectionTitle>
        {children}
      </div>
    );
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      {(personal.fullName || personal.jobTitle || personal.email || personal.phone || personal.location || personal.linkedin || personal.website) && (
        <div style={headerStyle}>
          {personal.fullName && (
            <h1 style={{
              fontSize: isMinimal ? '24px' : '28px',
              fontWeight: 700,
              letterSpacing: '-0.5px',
              color: '#000',
              marginBottom: '4px',
              fontFamily: isClassic ? '"Times New Roman", Times, serif' : 'inherit',
            }}>
              {personal.fullName}
            </h1>
          )}
          {personal.jobTitle && (
            <p style={{ 
              fontSize: isMinimal ? '12px' : '14px', 
              color: '#444', 
              marginBottom: '8px',
              fontWeight: 500,
              textTransform: isModern ? 'uppercase' : 'none',
              letterSpacing: isModern ? '1px' : 'normal',
            }}>
              {personal.jobTitle}
            </p>
          )}
          <div style={{ 
            fontSize: isMinimal ? '10px' : '11px', 
            color: '#555', 
            display: 'flex', 
            justifyContent: isModern ? 'flex-start' : 'center', 
            flexWrap: 'wrap', 
            gap: '4px 12px' 
          }}>
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
        <SectionWrapper title="Summary">
          <p style={{ color: '#333' }}>{summary}</p>
        </SectionWrapper>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <SectionWrapper title="Experience">
          {experience.map(exp => (
            <div key={exp.id} style={{ marginBottom: isMinimal ? '8px' : '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: isMinimal ? '12px' : '13px' }}>{exp.company || 'Company'}</strong>
                <span style={{ fontSize: isMinimal ? '10px' : '11px', color: '#555' }}>{exp.date}</span>
              </div>
              <div style={{ fontStyle: 'italic', color: '#444', marginBottom: '4px' }}>{exp.role}</div>
              {exp.description && (
                <p style={{ color: '#333', whiteSpace: 'pre-line' }}>{exp.description}</p>
              )}
            </div>
          ))}
        </SectionWrapper>
      )}

      {/* Education */}
      {education.length > 0 && (
        <SectionWrapper title="Education">
          {education.map(edu => (
            <div key={edu.id} style={{ marginBottom: isMinimal ? '6px' : '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: isMinimal ? '12px' : '13px' }}>{edu.school || 'School'}</strong>
                <span style={{ fontSize: isMinimal ? '10px' : '11px', color: '#555' }}>{edu.date}</span>
              </div>
              <div style={{ fontStyle: 'italic', color: '#444' }}>{edu.degree}</div>
              {edu.description && <p style={{ color: '#333' }}>{edu.description}</p>}
            </div>
          ))}
        </SectionWrapper>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <SectionWrapper title="Projects">
          {projects.map(proj => (
            <div key={proj.id} style={{ marginBottom: isMinimal ? '6px' : '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: isMinimal ? '12px' : '13px' }}>{proj.name || 'Project'}</strong>
                {proj.link && <span style={{ fontSize: isMinimal ? '10px' : '11px', color: '#555' }}>{proj.link}</span>}
              </div>
              {proj.description && <p style={{ color: '#333' }}>{proj.description}</p>}
            </div>
          ))}
        </SectionWrapper>
      )}

      {/* Skills */}
      {skillList.length > 0 && (
        <SectionWrapper title="Skills">
          <p style={{ color: '#333' }}>{skillList.join(' · ')}</p>
        </SectionWrapper>
      )}

      {/* Empty state */}
      {!personal.fullName && !summary && experience.length === 0 && education.length === 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
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
