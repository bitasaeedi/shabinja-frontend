/**
 * Utility functions for FAQ data manipulation
 */

/**
 * Groups FAQ items by category
 * @param {Array} faqData - Array of FAQ items
 * @returns {Object} - Object with categories as keys and arrays of FAQ items as values
 */
export const groupFaqByCategory = (faqData) => {
  if (!Array.isArray(faqData)) {
    return {};
  }

  const grouped = {};
  
  faqData.forEach((item) => {
    const category = item.category || "سایر";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(item);
  });

  return grouped;
};

/**
 * Gets unique categories from FAQ data
 * @param {Array} faqData - Array of FAQ items
 * @returns {Array} - Array of unique category names
 */
export const getFaqCategories = (faqData) => {
  if (!Array.isArray(faqData)) {
    return [];
  }

  const categories = [...new Set(faqData.map(item => item.category || "سایر"))];
  return categories;
};

/**
 * Filters FAQ items by category
 * @param {Array} faqData - Array of FAQ items
 * @param {String} category - Category name to filter by
 * @returns {Array} - Array of FAQ items in the specified category
 */
export const getFaqByCategory = (faqData, category) => {
  if (!Array.isArray(faqData)) {
    return [];
  }

  return faqData.filter(item => (item.category || "سایر") === category);
};

/**
 * Sorts FAQ items by order field
 * @param {Array} faqData - Array of FAQ items
 * @returns {Array} - Sorted array of FAQ items
 */
export const sortFaqByOrder = (faqData) => {
  if (!Array.isArray(faqData)) {
    return [];
  }

  return faqData.sort((a, b) => (a.order || 0) - (b.order || 0));
};
