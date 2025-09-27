
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

export const getFaqCategories = (faqData) => {
  if (!Array.isArray(faqData)) {
    return [];
  }

  const categories = [...new Set(faqData.map(item => item.category || "سایر"))];
  return categories;
};

export const getFaqByCategory = (faqData, category) => {
  if (!Array.isArray(faqData)) {
    return [];
  }

  return faqData.filter(item => (item.category || "سایر") === category);
};

export const sortFaqByOrder = (faqData) => {
  if (!Array.isArray(faqData)) {
    return [];
  }

  return faqData.sort((a, b) => (a.order || 0) - (b.order || 0));
};
