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
  const { resumeData, template, themeColor } = useResume();
  const { personal, summary, experience, education, skills, projects } = resumeData;

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
    lineHeight: '1.5',
    padding: isMinimal ? '60px 64px' : '48px 52px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  };

  const SectionTitle = ({ children, style = {} }) => (
    <h3 style={{
      fontSize: isMinimal ? '10px' : '11px',
      fontWeight: 700,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      color: isModern ? '#fff' : themeColor,
      borderBottom: isClassic ? `1px solid ${themeColor}` : 'none',
      paddingBottom: isClassic ? '4px' : '0',
      marginBottom: '12px',
      ...style
    }}>
      {children}
    </h3>
  );

  const renderExperience = () => experience.length > 0 && (
    <div style={{ marginBottom: '24px' }}>
      <SectionTitle>Experience</SectionTitle>
      {experience.map(exp => (
        <div key={exp.id} style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
            <strong style={{ fontSize: '13px', color: '#000' }}>{exp.company}</strong>
            <span style={{ fontSize: '11px', color: '#666' }}>{exp.date}</span>
          </div>
          <div style={{ fontStyle: 'italic', color: '#444', marginBottom: '6px' }}>{exp.role}</div>
          <p style={{ whiteSpace: 'pre-line', fontSize: '12px', color: '#333' }}>{exp.description}</p>
        </div>
      ))}
    </div>
  );

  const renderEducation = () => education.length > 0 && (
    <div style={{ marginBottom: '24px' }}>
      <SectionTitle>Education</SectionTitle>
      {education.map(edu => (
        <div key={edu.id} style={{ marginBottom: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
            <strong style={{ fontSize: '13px', color: '#000' }}>{edu.school}</strong>
            <span style={{ fontSize: '11px', color: '#666' }}>{edu.date}</span>
          </div>
          <div style={{ fontStyle: 'italic', color: '#444' }}>{edu.degree}</div>
          {edu.description && <p style={{ fontSize: '12px', color: '#333', marginTop: '4px' }}>{edu.description}</p>}
        </div>
      ))}
    </div>
  );

  const renderProjects = () => projects.length > 0 && (
    <div style={{ marginBottom: '24px' }}>
      <SectionTitle>Projects</SectionTitle>
      {projects.map(proj => (
        <div key={proj.id} style={{ 
          marginBottom: '16px',
          padding: isClassic ? '0' : '0',
          borderLeft: isModern ? `2px solid ${themeColor}22` : 'none',
          paddingLeft: isModern ? '12px' : '0'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <strong style={{ fontSize: '13px', color: '#000' }}>{proj.name}</strong>
            <div style={{ display: 'flex', gap: '8px' }}>
              {proj.liveUrl && <span style={{ color: themeColor }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14L21 3"/></svg></span>}
              {proj.githubUrl && <span style={{ color: themeColor }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></span>}
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#333', marginBottom: '6px' }}>{proj.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {proj.techStack.map((tech, i) => (
              <span key={i} style={{ 
                fontSize: '10px', 
                background: `${themeColor}11`, 
                color: themeColor,
                padding: '1px 6px',
                borderRadius: '4px',
                fontWeight: 600
              }}>{tech}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkills = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {Object.entries(skills).map(([key, items]) => items.length > 0 && (
        <div key={key}>
          <div style={{ 
            fontSize: '10px', 
            fontWeight: 800, 
            color: isModern ? '#fff' : themeColor, 
            textTransform: 'uppercase', 
            marginBottom: '4px',
            opacity: isModern ? 0.7 : 1
          }}>
            {key}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {items.map((skill, i) => (
              <span key={i} style={{ 
                fontSize: '11px', 
                background: isModern ? 'rgba(255,255,255,0.1)' : `${themeColor}08`, 
                color: isModern ? '#fff' : '#333',
                padding: '2px 8px',
                borderRadius: '100px',
                border: isModern ? 'none' : `1px solid ${themeColor}15`
              }}>{skill}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  if (isModern) {
    return (
      <div className="resume-sheet" style={{ ...containerStyle, padding: 0, display: 'grid', gridTemplateColumns: '260px 1fr' }}>
        {/* Sidebar */}
        <div style={{ background: themeColor, color: '#fff', padding: '48px 32px' }}>
          {personal.fullName && (
            <h1 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '8px', lineHeight: '1.2' }}>{personal.fullName}</h1>
          )}
          {personal.jobTitle && (
            <div style={{ fontSize: '13px', fontWeight: 500, opacity: 0.9, marginBottom: '32px', textTransform: 'uppercase', letterSpacing: '1px' }}>{personal.jobTitle}</div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px', fontSize: '11px' }}>
            {personal.email && <div style={{ display: 'flex', gap: '8px' }}><span>✉</span> {personal.email}</div>}
            {personal.phone && <div style={{ display: 'flex', gap: '8px' }}><span>✆</span> {personal.phone}</div>}
            {personal.location && <div style={{ display: 'flex', gap: '8px' }}><span>📍</span> {personal.location}</div>}
            {personal.linkedin && <div style={{ display: 'flex', gap: '8px' }}><span>in</span> {personal.linkedin}</div>}
            {personal.website && <div style={{ display: 'flex', gap: '8px' }}><span>🌐</span> {personal.website}</div>}
          </div>

          <SectionTitle style={{ border: 'none', color: '#fff' }}>Skills</SectionTitle>
          {renderSkills()}
        </div>

        {/* Main Content */}
        <div style={{ padding: '48px 40px' }}>
          {summary && (
            <div style={{ marginBottom: '32px' }}>
              <SectionTitle>About Me</SectionTitle>
              <p style={{ fontSize: '12px', color: '#444' }}>{summary}</p>
            </div>
          )}
          {renderExperience()}
          {renderEducation()}
          {renderProjects()}
        </div>
      </div>
    );
  }

  // Classic or Minimal
  return (
    <div className="resume-sheet" style={containerStyle}>
      <div style={{ textAlign: isClassic ? 'center' : 'left', marginBottom: '32px' }}>
        <h1 style={{ 
          fontSize: isMinimal ? '32px' : '28px', 
          fontWeight: isMinimal ? 800 : 700, 
          color: themeColor,
          marginBottom: '8px'
        }}>{personal.fullName || 'Your Name'}</h1>
        <div style={{ fontSize: '14px', fontWeight: 500, color: '#444', marginBottom: '12px' }}>{personal.jobTitle}</div>
        <div style={{ 
          display: 'flex', 
          justifyContent: isClassic ? 'center' : 'flex-start', 
          gap: '12px', 
          fontSize: '11px', 
          color: '#666',
          flexWrap: 'wrap'
        }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
        </div>
      </div>

      {summary && (
        <div style={{ marginBottom: '24px' }}>
          <SectionTitle>Summary</SectionTitle>
          <p style={{ fontSize: '12px', color: '#333' }}>{summary}</p>
        </div>
      )}

      {renderExperience()}
      {renderEducation()}
      {renderProjects()}

      {!isModern && (
        <div>
          <SectionTitle>Skills</SectionTitle>
          {renderSkills()}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
