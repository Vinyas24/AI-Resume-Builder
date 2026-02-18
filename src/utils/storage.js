// Storage utility functions for AI Resume Builder

const ARTIFACT_PREFIX = 'rb_step_';
const ARTIFACT_SUFFIX = '_artifact';
const SUBMISSION_KEY = 'rb_final_submission';
const CHECKLIST_KEY = 'rb_test_checklist';

/**
 * Get artifact content for a specific step
 * @param {number} stepNumber - Step number (1-8)
 * @returns {string|null} - Artifact content or null if not found
 */
export const getArtifact = (stepNumber) => {
  const key = `${ARTIFACT_PREFIX}${stepNumber}${ARTIFACT_SUFFIX}`;
  return localStorage.getItem(key);
};

/**
 * Save artifact content for a specific step
 * @param {number} stepNumber - Step number (1-8)
 * @param {string} content - Artifact content to save
 */
export const setArtifact = (stepNumber, content) => {
  const key = `${ARTIFACT_PREFIX}${stepNumber}${ARTIFACT_SUFFIX}`;
  localStorage.setItem(key, content);
};

/**
 * Check if artifact exists for a specific step
 * @param {number} stepNumber - Step number (1-8)
 * @returns {boolean} - True if artifact exists
 */
export const hasArtifact = (stepNumber) => {
  return getArtifact(stepNumber) !== null;
};

/**
 * Get submission links from localStorage
 * @returns {Object} - Object with lovable, github, deployed links
 */
export const getSubmissionLinks = () => {
  const saved = localStorage.getItem(SUBMISSION_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse submission links', e);
    }
  }
  return { lovable: '', github: '', deployed: '' };
};

/**
 * Save submission links to localStorage
 * @param {Object} links - Object with lovable, github, deployed links
 */
export const setSubmissionLinks = (links) => {
  localStorage.setItem(SUBMISSION_KEY, JSON.stringify(links));
};
/**
 * Get the 10-item test checklist state
 * @returns {Array<boolean>} - Array of 10 booleans
 */
export const getChecklist = () => {
  const saved = localStorage.getItem(CHECKLIST_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length === 10) return parsed;
    } catch (e) {
      console.error('Failed to parse checklist', e);
    }
  }
  return new Array(10).fill(false);
};

/**
 * Toggle a checklist item
 * @param {number} index - Item index (0-9)
 */
export const toggleChecklistItem = (index) => {
  const checklist = getChecklist();
  checklist[index] = !checklist[index];
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist));
  return checklist;
};

/**
 * Check if all 10 tests passed
 * @returns {boolean} - True if all items are true
 */
export const areAllTestsPassed = () => {
  return getChecklist().every(item => item === true);
};

/**
 * Reset the test checklist
 */
export const resetChecklist = () => {
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(new Array(10).fill(false)));
};
