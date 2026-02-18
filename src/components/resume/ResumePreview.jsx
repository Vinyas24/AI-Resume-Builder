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
    <div className="resume-sheet" style={containerStyle}>
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
            <div key={exp.id} className="experience-item" style={{ marginBottom: isMinimal ? '8px' : '12px' }}>
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
            <div key={edu.id} className="education-item" style={{ marginBottom: isMinimal ? '6px' : '10px' }}>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {projects.map(proj => (
              <div key={proj.id} className="project-item" style={{ 
                border: isMinimal ? 'none' : '1px solid #eee',
                padding: isMinimal ? '0' : '12px',
                borderRadius: '4px',
                marginBottom: isMinimal ? '8px' : '0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ fontSize: isMinimal ? '12px' : '13px' }}>{proj.name || 'Project'}</strong>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {proj.liveUrl && (
                        <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#111' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#111' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                {proj.description && <p style={{ color: '#333', marginBottom: '8px' }}>{proj.description}</p>}
                {proj.techStack && proj.techStack.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                    {proj.techStack.map((tech, i) => (
                      <span key={i} style={{ 
                        fontSize: '9px', 
                        backgroundColor: '#f3f4f6', 
                        padding: '1px 6px', 
                        borderRadius: '2px',
                        color: '#444',
                        border: '1px solid #e5e7eb'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* Skills */}
      {(skills.technical?.length > 0 || skills.soft?.length > 0 || skills.tools?.length > 0) && (
        <SectionWrapper title="Skills">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Technical', items: skills.technical },
              { label: 'Soft Skills', items: skills.soft },
              { label: 'Tools', items: skills.tools },
            ].map(cat => cat.items?.length > 0 && (
              <div key={cat.label} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#111', textTransform: 'uppercase', minWidth: '70px' }}>
                  {cat.label}:
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {cat.items.map((skill, i) => (
                    <span key={i} style={{ 
                      fontSize: '10px', 
                      backgroundColor: '#f9fafb', 
                      padding: '2px 8px', 
                      borderRadius: '100px',
                      color: '#111',
                      border: '1px solid #eee'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
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
