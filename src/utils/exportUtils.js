/**
 * Utility to generate a clean plain-text version of the resume
 */
export const generatePlainText = (data) => {
    const { personal, summary, experience, education, skills, projects } = data;

    let text = '';

    // Header
    text += `${personal.fullName.toUpperCase()}\n`;
    if (personal.jobTitle) text += `${personal.jobTitle}\n`;
    text += `${personal.email} | ${personal.phone} | ${personal.location}\n`;
    if (personal.linkedin || personal.website) {
        text += `${personal.linkedin ? 'LinkedIn: ' + personal.linkedin : ''}${personal.linkedin && personal.website ? ' | ' : ''}${personal.website ? 'Web: ' + personal.website : ''}\n`;
    }
    text += `\n${'='.repeat(20)}\n\n`;

    // Summary
    if (summary) {
        text += `SUMMARY\n${'-'.repeat(7)}\n`;
        text += `${summary}\n\n`;
    }

    // Experience
    if (experience && experience.length > 0) {
        text += `EXPERIENCE\n${'-'.repeat(10)}\n`;
        experience.forEach((exp) => {
            text += `${exp.company}\n`;
            text += `${exp.role} | ${exp.date}\n`;
            if (exp.description) {
                text += `${exp.description}\n`;
            }
            text += `\n`;
        });
    }

    // Education
    if (education && education.length > 0) {
        text += `EDUCATION\n${'-'.repeat(9)}\n`;
        education.forEach((edu) => {
            text += `${edu.school}\n`;
            text += `${edu.degree} | ${edu.date}\n`;
            if (edu.description) {
                text += `${edu.description}\n`;
            }
            text += `\n`;
        });
    }

    // Projects
    if (projects && projects.length > 0) {
        text += `PROJECTS\n${'-'.repeat(8)}\n`;
        projects.forEach((proj) => {
            text += `${proj.name}\n`;
            if (proj.liveUrl || proj.githubUrl) {
                const links = [proj.liveUrl, proj.githubUrl].filter(Boolean);
                text += `${links.join(' | ')}\n`;
            }
            if (proj.techStack && proj.techStack.length > 0) {
                text += `Tech: ${proj.techStack.join(', ')}\n`;
            }
            if (proj.description) {
                text += `${proj.description}\n`;
            }
            text += `\n`;
        });
    }

    // Skills
    if (skills) {
        text += `SKILLS\n${'-'.repeat(6)}\n`;
        if (typeof skills === 'object') {
            if (skills.technical?.length > 0) text += `Technical: ${skills.technical.join(', ')}\n`;
            if (skills.soft?.length > 0) text += `Soft Skills: ${skills.soft.join(', ')}\n`;
            if (skills.tools?.length > 0) text += `Tools: ${skills.tools.join(', ')}\n`;
        } else {
            text += `${skills}\n`;
        }
        text += `\n`;
    }

    return text.trim();
};

/**
 * Copy text to clipboard
 */
export const copyToClipboard = async (text) => {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Failed to copy text: ', err);
        return false;
    }
};
