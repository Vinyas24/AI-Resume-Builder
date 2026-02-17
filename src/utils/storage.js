// Storage utility functions for AI Resume Builder

const ARTIFACT_PREFIX = 'rb_step_';
const ARTIFACT_SUFFIX = '_artifact';
const SUBMISSION_KEY = 'rb_final_submission';

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
