import React, { createContext, useContext, useState } from 'react';

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState({
    personal: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      jobTitle: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [],
    education: [],
    skills: '',
    projects: []
  });

  const updatePersonal = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personal: { ...prev.personal, [field]: value }
    }));
  };

  const updateSummary = (value) => {
    setResumeData(prev => ({ ...prev, summary: value }));
  };

  const updateSkills = (value) => {
    setResumeData(prev => ({ ...prev, skills: value }));
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: Date.now(),
          company: '',
          role: '',
          date: '',
          description: ''
        }
      ]
    }));
  };

  const updateExperience = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const removeExperience = (id) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: Date.now(),
          school: '',
          degree: '',
          date: '',
          description: ''
        }
      ]
    }));
  };

  const updateEducation = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const removeEducation = (id) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: Date.now(),
          name: '',
          link: '',
          description: ''
        }
      ]
    }));
  };

  const updateProject = (id, field, value) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    }));
  };

  const removeProject = (id) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  };

  const loadSampleData = () => {
    setResumeData({
      personal: {
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        jobTitle: 'Senior Frontend Engineer',
        linkedin: 'linkedin.com/in/alexmorgan',
        website: 'alexmorgan.dev'
      },
      summary: 'Experienced Frontend Engineer with 5+ years of expertise in building scalable web applications using React, TypeScript, and modern state management. Passionate about UI/UX performance optimization and accessible design.',
      experience: [
        {
          id: 1,
          company: 'TechCorp Solutions',
          role: 'Senior Frontend Engineer',
          date: '2021 - Present',
          description: '• Led the migration of legacy monolith to micro-frontend architecture, improving build times by 40%.\n• Mentored junior developers and established code quality standards.'
        },
        {
          id: 2,
          company: 'Creative Agency',
          role: 'Frontend Developer',
          date: '2018 - 2021',
          description: '• Developed high-performance landing pages for Fortune 500 clients.\n• Collaborated with designers to implement pixel-perfect responsive layouts.'
        }
      ],
      education: [
        {
          id: 1,
          school: 'University of Technology',
          degree: 'B.S. Computer Science',
          date: '2014 - 2018',
          description: 'Graduated Cum Laude. Minor in Graphic Design.'
        }
      ],
      skills: 'JavaScript (ES6+), React, TypeScript, Next.js, Node.js, GraphQL, TailwindCSS, Jest, Cypress, AWS',
      projects: [
        {
          id: 1,
          name: 'E-commerce Platform',
          link: 'github.com/alex/shop',
          description: 'Full-stack e-commerce solution with Stripe integration and real-time inventory management.'
        }
      ]
    });
  };

  const value = {
    resumeData,
    updatePersonal,
    updateSummary,
    updateSkills,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addProject,
    updateProject,
    removeProject,
    loadSampleData
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};
