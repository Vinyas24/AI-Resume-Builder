/**
 * ATS Score v1 — Deterministic scoring (0–100)
 * Returns { score, suggestions }
 */
export function computeATSScore(resumeData) {
  const { personal, summary, experience, education, skills, projects } = resumeData;
  let score = 0;
  const suggestions = [];

  // +15 if summary is 40–120 words
  const summaryWords = summary ? summary.trim().split(/\s+/).filter(Boolean).length : 0;
  if (summaryWords >= 40 && summaryWords <= 120) {
    score += 15;
  } else {
    if (summaryWords === 0) {
      suggestions.push('Write a professional summary (40–120 words).');
    } else if (summaryWords < 40) {
      suggestions.push(`Expand your summary — currently ${summaryWords} words, target 40–120.`);
    } else {
      suggestions.push('Shorten your summary to under 120 words for ATS readability.');
    }
  }

  // +10 if at least 2 projects
  if (projects.length >= 2) {
    score += 10;
  } else {
    suggestions.push(`Add at least 2 projects (you have ${projects.length}).`);
  }

  // +10 if at least 1 experience entry
  if (experience.length >= 1) {
    score += 10;
  } else {
    suggestions.push('Add at least one work experience entry.');
  }

  // +10 if skills list has ≥ 8 items
  const skillList = skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  if (skillList.length >= 8) {
    score += 10;
  } else {
    suggestions.push(`Add more skills — you have ${skillList.length}, target 8+.`);
  }

  // +10 if GitHub or LinkedIn link exists
  const hasLink = (personal.linkedin && personal.linkedin.trim()) ||
                  (personal.website && personal.website.trim());
  if (hasLink) {
    score += 10;
  } else {
    suggestions.push('Add your GitHub or LinkedIn profile link.');
  }

  // +15 if any experience/project bullet contains a number (%, X, k, numbers)
  const numberPattern = /(\d+%?|\d+k|\d+x|\bx\d+|\d+\+)/i;
  const allBullets = [
    ...experience.map(e => e.description || ''),
    ...projects.map(p => p.description || ''),
  ].join(' ');
  if (numberPattern.test(allBullets)) {
    score += 15;
  } else {
    suggestions.push('Add measurable impact in bullets (e.g. "improved speed by 40%").');
  }

  // +10 if education section has complete fields (school + degree + date)
  const hasCompleteEducation = education.some(
    edu => edu.school?.trim() && edu.degree?.trim() && edu.date?.trim()
  );
  if (hasCompleteEducation) {
    score += 10;
  } else {
    suggestions.push('Complete your education entry (school, degree, and date).');
  }

  return {
    score: Math.min(score, 100),
    suggestions: suggestions.slice(0, 3), // max 3 suggestions
  };
}
