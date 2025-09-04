/**
 * Security utilities for input validation and sanitization
 * Bootcamp-appropriate security measures
 */

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input string
 * @returns {string} - Sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

/**
 * Validate search query input
 * @param {string} query - Search query
 * @returns {string} - Validated and sanitized query
 */
export const validateSearchQuery = (query) => {
  if (typeof query !== 'string') return '';
  
  // Limit length to prevent abuse
  const maxLength = 100;
  const sanitized = sanitizeInput(query);
  
  return sanitized.length > maxLength 
    ? sanitized.substring(0, maxLength)
    : sanitized;
};

/**
 * Validate and sanitize prompt content
 * @param {string} content - Prompt content
 * @returns {string} - Validated and sanitized content
 */
export const validatePromptContent = (content) => {
  if (typeof content !== 'string') return '';
  
  // Limit length for performance and security
  const maxLength = 10000;
  const sanitized = sanitizeInput(content);
  
  return sanitized.length > maxLength 
    ? sanitized.substring(0, maxLength)
    : sanitized;
};

/**
 * Validate localStorage key to prevent injection
 * @param {string} key - Storage key
 * @returns {string} - Safe storage key
 */
export const validateStorageKey = (key) => {
  if (typeof key !== 'string') return '';
  
  // Only allow alphanumeric characters, hyphens, and underscores
  return key.replace(/[^a-zA-Z0-9\-_]/g, '').substring(0, 50);
};

/**
 * Safely get item from localStorage with error handling
 * @param {string} key - Storage key
 * @returns {string|null} - Stored value or null
 */
export const safeGetLocalStorage = (key) => {
  try {
    const safeKey = validateStorageKey(key);
    if (!safeKey) return null;
    
    return localStorage.getItem(safeKey);
  } catch (error) {
    console.warn('LocalStorage access failed:', error);
    return null;
  }
};

/**
 * Safely set item in localStorage with error handling
 * @param {string} key - Storage key
 * @param {string} value - Value to store
 * @returns {boolean} - Success status
 */
export const safeSetLocalStorage = (key, value) => {
  try {
    const safeKey = validateStorageKey(key);
    if (!safeKey) return false;
    
    const safeValue = typeof value === 'string' ? sanitizeInput(value) : String(value);
    localStorage.setItem(safeKey, safeValue);
    return true;
  } catch (error) {
    console.warn('LocalStorage write failed:', error);
    return false;
  }
};

/**
 * Rate limiting for user actions (simple implementation)
 */
class SimpleRateLimit {
  constructor(maxAttempts = 10, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }
  
  isAllowed(identifier) {
    const now = Date.now();
    const userAttempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the window
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return true;
  }
}

// Export rate limiter instance for copy operations
export const copyRateLimit = new SimpleRateLimit(50, 60000); // 50 copies per minute
