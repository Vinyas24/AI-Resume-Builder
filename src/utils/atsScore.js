/**
 * ATS Score v1 — Deterministic scoring (0–100)
 * Returns { score, suggestions }
 */
export function computeATSScore(resumeData) {
  const { personal, summary, experience, education, skills, projects } = resumeData;
  let score = 0;
  const suggestions = [];

  // 1. Name (+10)
  if (personal.fullName?.trim()) {
    score += 10;
  } else {
    suggestions.push({ text: 'Add your full name', points: 10 });
  }

  // 2. Email (+10)
  if (personal.email?.trim()) {
    score += 10;
  } else {
    suggestions.push({ text: 'Add your email address', points: 10 });
  }

  // 3. Summary Length (+10 if > 50 chars)
  if (summary?.trim().length > 50) {
    score += 10;
  } else {
    suggestions.push({ text: 'Add a professional summary (> 50 chars)', points: 10 });
  }

  // 4. Summary Action Verbs (+10)
  const actionVerbs = ['built', 'led', 'designed', 'improved', 'developed', 'implemented', 'created', 'optimized', 'managed'];
  const hasActionVerb = actionVerbs.some(verb => summary?.toLowerCase().includes(verb));
  if (hasActionVerb) {
    score += 10;
  } else {
    suggestions.push({ text: 'Use action verbs in your summary (built, led, designed, etc.)', points: 10 });
  }

  // 5. Experience (+15 if at least 1 with bullets)
  if (experience.length > 0) {
    const hasBullets = experience.some(exp => exp.description?.includes('\n') || exp.description?.includes('•'));
    if (hasBullets) {
      score += 15;
    } else {
      suggestions.push({ text: 'Add bullet points to your experience descriptions', points: 15 });
    }
  } else {
    suggestions.push({ text: 'Add at least one work experience entry', points: 15 });
  }

  // 6. Education (+10)
  if (education.length > 0) {
    score += 10;
  } else {
    suggestions.push({ text: 'Add your education details', points: 10 });
  }

  // 7. Skills (+10 if >= 5)
  const allSkills = typeof skills === 'object'
    ? [...(skills.technical || []), ...(skills.soft || []), ...(skills.tools || [])]
    : (skills ? skills.split(',').map(s => s.trim()).filter(Boolean) : []);

  if (allSkills.length >= 5) {
    score += 10;
  } else {
    suggestions.push({ text: 'Add at least 5 skills (Technical, Soft, or Tools)', points: 10 });
  }

  // 8. Projects (+10)
  if (projects.length > 0) {
    score += 10;
  } else {
    suggestions.push({ text: 'Add at least one personal or professional project', points: 10 });
  }

  // 9. Phone (+5)
  if (personal.phone?.trim()) {
    score += 5;
  } else {
    suggestions.push({ text: 'Add your phone number', points: 5 });
  }

  // 10. LinkedIn (+5)
  if (personal.linkedin?.trim()) {
    score += 5;
  } else {
    suggestions.push({ text: 'Add your LinkedIn profile link', points: 5 });
  }

  // 11. GitHub (+5)
  if (personal.website?.trim() || personal.github?.trim()) {
    // Note: website field is used for GitHub/Portfolio in some contexts
    score += 5;
  } else {
    suggestions.push({ text: 'Add your GitHub or Portfolio link', points: 5 });
  }

  return {
    score: Math.min(score, 100),
    suggestions
  };
}
