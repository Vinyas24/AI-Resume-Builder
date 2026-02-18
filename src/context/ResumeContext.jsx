import React, { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) throw new Error('useResume must be used within a ResumeProvider');
  return context;
};

const STORAGE_KEY = 'resumeBuilderData';
const TEMPLATE_KEY = 'resumeBuilderTemplate';

const defaultData = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
    tools: [],
  },
  projects: [],
};

const loadFromStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData;
    const parsed = JSON.parse(raw);
    
    // Migration: if skills is a string, move it to technical
    let finalSkills = parsed.skills;
    if (typeof parsed.skills === 'string') {
      finalSkills = {
        technical: parsed.skills.split(',').map(s => s.trim()).filter(Boolean),
        soft: [],
        tools: [],
      };
    }

    return {
      ...defaultData,
      ...parsed,
      personal: { ...defaultData.personal, ...(parsed.personal || {}) },
      skills: finalSkills || defaultData.skills,
    };
  } catch {
    return defaultData;
  }
};

const loadTemplateFromStorage = () => {
  return localStorage.getItem(TEMPLATE_KEY) || 'classic';
};

const THEME_COLOR_KEY = 'resumeBuilderThemeColor';

const loadThemeColorFromStorage = () => {
  return localStorage.getItem(THEME_COLOR_KEY) || 'hsl(168, 60%, 40%)';
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(loadFromStorage);
  const [template, setTemplate] = useState(loadTemplateFromStorage);
  const [themeColor, setThemeColor] = useState(loadThemeColorFromStorage);

  // Autosave data on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch {}
  }, [resumeData]);

  // Persist template choice
  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, template);
  }, [template]);

  // Persist theme color
  useEffect(() => {
    localStorage.setItem(THEME_COLOR_KEY, themeColor);
  }, [themeColor]);

  const updatePersonal = (field, value) =>
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));

  const updateSummary = (value) =>
    setResumeData(prev => ({ ...prev, summary: value }));

  const updateSkills = (category, value) =>
    setResumeData(prev => ({
      ...prev,
      skills: { ...prev.skills, [category]: value },
    }));

  // Experience
  const addExperience = () =>
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now(), company: '', role: '', date: '', description: '' }],
    }));

  const updateExperience = (id, field, value) =>
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e),
    }));

  const removeExperience = (id) =>
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));

  // Education
  const addEducation = () =>
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now(), school: '', degree: '', date: '', description: '' }],
    }));

  const updateEducation = (id, field, value) =>
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e),
    }));

  const removeEducation = (id) =>
    setResumeData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));

  // Projects
  const addProject = () =>
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { 
        id: Date.now(), 
        name: '', 
        description: '', 
        techStack: [], 
        liveUrl: '', 
        githubUrl: '' 
      }],
    }));

  const updateProject = (id, field, value) =>
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, [field]: value } : p),
    }));

  const removeProject = (id) =>
    setResumeData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));

  const loadSampleData = () => {
    setResumeData({
      personal: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        jobTitle: 'Senior Frontend Engineer',
        linkedin: 'linkedin.com/in/alexmorgan',
        website: 'github.com/alexmorgan',
      },
      summary: 'Experienced Frontend Engineer with 5+ years building scalable web applications using React, TypeScript, and modern state management. Passionate about performance optimization, accessible design, and shipping products that users love. Proven track record of reducing load times by 40% and leading cross-functional teams.',
      experience: [
        {
          id: 1,
          company: 'TechCorp Solutions',
          role: 'Senior Frontend Engineer',
          date: '2021 – Present',
          description: '• Led migration from monolith to micro-frontend architecture, reducing build times by 40%.\n• Mentored 4 junior developers and established team-wide code quality standards.\n• Shipped 12 features that increased user retention by 25%.',
        },
        {
          id: 2,
          company: 'Creative Agency',
          role: 'Frontend Developer',
          date: '2018 – 2021',
          description: '• Built high-performance landing pages for 8 Fortune 500 clients.\n• Improved page load speed by 60% through lazy loading and code splitting.',
        },
      ],
      education: [
        {
          id: 1,
          school: 'University of Technology',
          degree: 'B.S. Computer Science',
          date: '2014 – 2018',
          description: 'Graduated Cum Laude. Minor in Graphic Design.',
        },
      ],
      skills: {
        technical: ['JavaScript', 'React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL'],
        soft: ['Team Leadership', 'Problem Solving', 'Communication'],
        tools: ['Git', 'Docker', 'AWS', 'Jest', 'Cypress'],
      },
      projects: [
        {
          id: 1,
          name: 'E-commerce Platform',
          description: 'Full-stack e-commerce solution with Stripe integration. Processed 10k+ orders and achieved 99.9% uptime.',
          techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
          liveUrl: 'https://shop-demo.com',
          githubUrl: 'https://github.com/alex/shop',
        },
        {
          id: 2,
          name: 'AI Resume Builder',
          description: 'React-based resume builder with live preview, ATS scoring, and PDF export. 500+ users in first month.',
          techStack: ['React', 'TypeScript', 'Vite', 'Local Storage'],
          liveUrl: 'https://ai-resume-builder.com',
          githubUrl: 'https://github.com/alex/resume',
        },
      ],
    });
  };

  const value = {
    resumeData,
    template,
    setTemplate,
    themeColor,
    setThemeColor,
    updatePersonal,
    updateSummary,
    updateSkills,
    addExperience, updateExperience, removeExperience,
    addEducation, updateEducation, removeEducation,
    addProject, updateProject, removeProject,
    loadSampleData,
  };

  return <ResumeContext.Provider value={value}>{children}</ResumeContext.Provider>;
};
