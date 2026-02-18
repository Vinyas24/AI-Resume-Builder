import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import ResumePreview from '../components/resume/ResumePreview';
import ATSScore from '../components/resume/ATSScore';
import { Plus, Trash2, ChevronDown, ChevronUp, Eye } from 'lucide-react';

const inputStyle = {
  width: '100%',
  padding: '9px 12px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  backgroundColor: 'var(--color-surface)',
  color: 'var(--color-text-primary)',
  fontSize: '14px',
  outline: 'none',
  boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
  minHeight: '80px',
  lineHeight: 1.5,
};

const labelStyle = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--color-text-secondary)',
  marginBottom: '6px',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
};

const Field = ({ label, children }) => (
  <div style={{ marginBottom: '16px' }}>
    <label style={labelStyle}>{label}</label>
    {children}
  </div>
);

const SectionHeader = ({ title, isOpen, onToggle, onAdd, addLabel }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-surface)',
  }}>
    <button
      onClick={onToggle}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'none',
        border: 'none',
        fontSize: '14px',
        fontWeight: 600,
        color: 'var(--color-text-primary)',
        cursor: 'pointer',
        padding: 0,
      }}
    >
      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      {title}
    </button>
    {onAdd && (
      <button
        onClick={onAdd}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '5px 10px',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-sm)',
          background: 'none',
          fontSize: '12px',
          color: 'var(--color-accent)',
          cursor: 'pointer',
          fontWeight: 500,
        }}
      >
        <Plus size={13} /> {addLabel}
      </button>
    )}
  </div>
);

const Builder = () => {
  const navigate = useNavigate();
  const {
    resumeData,
    updatePersonal,
    updateSummary,
    updateSkills,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addProject, updateProject, removeProject,
    loadSampleData,
  } = useResume();

  const [open, setOpen] = useState({
    personal: true,
    summary: true,
    experience: true,
    education: false,
    projects: false,
    skills: false,
    links: false,
  });

  const toggle = (key) => setOpen(prev => ({ ...prev, [key]: !prev[key] }));

  const { personal, summary, experience, education, skills, projects } = resumeData;

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 60px)', overflow: 'hidden' }}>

      {/* Left: Form Panel */}
      <div style={{
        width: '50%',
        borderRight: '1px solid var(--color-border)',
        overflowY: 'auto',
        backgroundColor: 'var(--color-background)',
      }}>
        {/* Toolbar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 20px',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}>
          <span style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            Fill in your details below
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={loadSampleData}
              style={{
                padding: '7px 14px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                background: 'none',
                fontSize: '13px',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              Load Sample Data
            </button>
            <button
              onClick={() => navigate('/preview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '7px 14px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--color-text-primary)',
                color: 'var(--color-background)',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: 500,
              }}
            >
              <Eye size={14} /> Preview
            </button>
          </div>
        </div>

        {/* Personal Info */}
        <SectionHeader title="Personal Info" isOpen={open.personal} onToggle={() => toggle('personal')} />
        {open.personal && (
          <div style={{ padding: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
              <Field label="Full Name">
                <input style={inputStyle} value={personal.fullName} onChange={e => updatePersonal('fullName', e.target.value)} placeholder="Alex Morgan" />
              </Field>
              <Field label="Job Title">
                <input style={inputStyle} value={personal.jobTitle} onChange={e => updatePersonal('jobTitle', e.target.value)} placeholder="Software Engineer" />
              </Field>
              <Field label="Email">
                <input style={inputStyle} value={personal.email} onChange={e => updatePersonal('email', e.target.value)} placeholder="alex@example.com" />
              </Field>
              <Field label="Phone">
                <input style={inputStyle} value={personal.phone} onChange={e => updatePersonal('phone', e.target.value)} placeholder="+1 555 000 0000" />
              </Field>
              <Field label="Location">
                <input style={inputStyle} value={personal.location} onChange={e => updatePersonal('location', e.target.value)} placeholder="San Francisco, CA" />
              </Field>
            </div>
          </div>
        )}

        {/* Summary */}
        <SectionHeader title="Summary" isOpen={open.summary} onToggle={() => toggle('summary')} />
        {open.summary && (
          <div style={{ padding: '20px' }}>
            <Field label="Professional Summary">
              <textarea style={textareaStyle} value={summary} onChange={e => updateSummary(e.target.value)} placeholder="A brief summary of your professional background and goals..." rows={4} />
            </Field>
          </div>
        )}

        {/* Experience */}
        <SectionHeader title="Experience" isOpen={open.experience} onToggle={() => toggle('experience')} onAdd={addExperience} addLabel="Add" />
        {open.experience && (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {experience.length === 0 && (
              <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', textAlign: 'center', padding: '16px 0' }}>
                No experience added yet. Click "Add" to get started.
              </p>
            )}
            {experience.map(exp => (
              <div key={exp.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', position: 'relative' }}>
                <button onClick={() => removeExperience(exp.id)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)' }}>
                  <Trash2 size={14} />
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <Field label="Company">
                    <input style={inputStyle} value={exp.company} onChange={e => updateExperience(exp.id, 'company', e.target.value)} placeholder="Company Name" />
                  </Field>
                  <Field label="Role">
                    <input style={inputStyle} value={exp.role} onChange={e => updateExperience(exp.id, 'role', e.target.value)} placeholder="Job Title" />
                  </Field>
                  <Field label="Date">
                    <input style={inputStyle} value={exp.date} onChange={e => updateExperience(exp.id, 'date', e.target.value)} placeholder="2021 - Present" />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea style={textareaStyle} value={exp.description} onChange={e => updateExperience(exp.id, 'description', e.target.value)} placeholder="Describe your responsibilities and achievements..." rows={3} />
                </Field>
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        <SectionHeader title="Education" isOpen={open.education} onToggle={() => toggle('education')} onAdd={addEducation} addLabel="Add" />
        {open.education && (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {education.length === 0 && (
              <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', textAlign: 'center', padding: '16px 0' }}>
                No education added yet.
              </p>
            )}
            {education.map(edu => (
              <div key={edu.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', position: 'relative' }}>
                <button onClick={() => removeEducation(edu.id)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)' }}>
                  <Trash2 size={14} />
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <Field label="School">
                    <input style={inputStyle} value={edu.school} onChange={e => updateEducation(edu.id, 'school', e.target.value)} placeholder="University Name" />
                  </Field>
                  <Field label="Degree">
                    <input style={inputStyle} value={edu.degree} onChange={e => updateEducation(edu.id, 'degree', e.target.value)} placeholder="B.S. Computer Science" />
                  </Field>
                  <Field label="Date">
                    <input style={inputStyle} value={edu.date} onChange={e => updateEducation(edu.id, 'date', e.target.value)} placeholder="2014 - 2018" />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea style={textareaStyle} value={edu.description} onChange={e => updateEducation(edu.id, 'description', e.target.value)} placeholder="Honors, activities, etc." rows={2} />
                </Field>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        <SectionHeader title="Projects" isOpen={open.projects} onToggle={() => toggle('projects')} onAdd={addProject} addLabel="Add" />
        {open.projects && (
          <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {projects.length === 0 && (
              <p style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', textAlign: 'center', padding: '16px 0' }}>
                No projects added yet.
              </p>
            )}
            {projects.map(proj => (
              <div key={proj.id} style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '16px', position: 'relative' }}>
                <button onClick={() => removeProject(proj.id)} style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-error)' }}>
                  <Trash2 size={14} />
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <Field label="Project Name">
                    <input style={inputStyle} value={proj.name} onChange={e => updateProject(proj.id, 'name', e.target.value)} placeholder="My Project" />
                  </Field>
                  <Field label="Link">
                    <input style={inputStyle} value={proj.link} onChange={e => updateProject(proj.id, 'link', e.target.value)} placeholder="github.com/you/project" />
                  </Field>
                </div>
                <Field label="Description">
                  <textarea style={textareaStyle} value={proj.description} onChange={e => updateProject(proj.id, 'description', e.target.value)} placeholder="What did you build and why?" rows={2} />
                </Field>
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        <SectionHeader title="Skills" isOpen={open.skills} onToggle={() => toggle('skills')} />
        {open.skills && (
          <div style={{ padding: '20px' }}>
            <Field label="Skills (comma-separated)">
              <textarea style={textareaStyle} value={skills} onChange={e => updateSkills(e.target.value)} placeholder="React, TypeScript, Node.js, Python..." rows={3} />
            </Field>
          </div>
        )}

        {/* Links */}
        <SectionHeader title="Links" isOpen={open.links} onToggle={() => toggle('links')} />
        {open.links && (
          <div style={{ padding: '20px' }}>
            <Field label="GitHub">
              <input style={inputStyle} value={personal.website} onChange={e => updatePersonal('website', e.target.value)} placeholder="github.com/yourusername" />
            </Field>
            <Field label="LinkedIn">
              <input style={inputStyle} value={personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} placeholder="linkedin.com/in/yourname" />
            </Field>
          </div>
        )}
      </div>

      {/* Right: Live Preview Panel */}
      <div style={{
        width: '50%',
        backgroundColor: '#e8e8e8',
        overflowY: 'auto',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '680px',
        }}>
          <ATSScore />
          <div style={{
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          }}>
            <ResumePreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builder;
