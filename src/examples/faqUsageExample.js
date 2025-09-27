// Example of how to use the FAQ utility functions

import { 
  groupFaqByCategory, 
  getFaqCategories, 
  getFaqByCategory, 
  sortFaqByOrder 
} from '../utils/faqUtils';

// Your FAQ data
const faqData = [
  {
    "title": "چطور می تونم در شبینجا ثبت نام کنم؟",
    "faqAnswer": "برای ثبت نام در شبینجا، کافیست در بالای صفحه روی گزینه «ورود یا ثبت نام» کلیک کنید و مراحل ثبت نام را تکمیل نمایید.",
    "category": "ثبت نام و ورود",
    "order": 1,
    "id": 1004,
    "guid": "5ddbc6af-779b-f011-97d3-005056ba6b8c"
  },
  {
    "title": "آیا می تونم با شماره موبایل ثبت نام کنم یا نیاز به ایمیل دارم؟",
    "faqAnswer": "بله، ثبت نام در شبینجا تنها از طریق شماره موبایل انجام می شود و نیازی به ایمیل نیست.",
    "category": "ثبت نام و ورود",
    "order": 2,
    "id": 1005,
    "guid": "5e1c8acb-779b-f011-97d3-005056ba6b8c"
  },
  {
    "title": "اگر رمز عبورم رو فراموش کنم، چطور باید بازیابی کنم؟",
    "faqAnswer": "در صفحه ورود می توانید با دریافت کد یک بارمصرف روی شماره موبایل خود وارد حساب شوید. سپس از طریق داشبورد کاربری امکان تغییر رمز عبور برای شما فراهم است.",
    "category": "ثبت نام و ورود",
    "order": 3,
    "id": 1006,
    "guid": "46f83ce4-779b-f011-97d3-005056ba6b8c"
  },
  {
    "title": "امکان ورود با شبکه های اجتماعی وجود داره؟",
    "faqAnswer": "خیر، ورود به شبینجا فعلاً فقط از طریق شماره موبایل امکان پذیر است.",
    "category": "ثبت نام و ورود",
    "order": 4,
    "id": 1007,
    "guid": "111c0d1f-789b-f011-97d3-005056ba6b8c"
  }
];

// Example 1: Group FAQ by category
const groupedFaq = groupFaqByCategory(faqData);
console.log('Grouped FAQ:', groupedFaq);
// Output: { "ثبت نام و ورود": [array of 4 items] }

// Example 2: Get all unique categories
const categories = getFaqCategories(faqData);
console.log('Categories:', categories);
// Output: ["ثبت نام و ورود"]

// Example 3: Get FAQ items for a specific category
const registrationFaq = getFaqByCategory(faqData, "ثبت نام و ورود");
console.log('Registration FAQ:', registrationFaq);
// Output: Array of 4 items in "ثبت نام و ورود" category

// Example 4: Sort FAQ by order
const sortedFaq = sortFaqByOrder(faqData);
console.log('Sorted FAQ:', sortedFaq);
// Output: Array sorted by order field (1, 2, 3, 4)

// Example 5: Complete workflow - group, sort, and display
const processFaqData = (data) => {
  // First sort by order
  const sorted = sortFaqByOrder(data);
  
  // Then group by category
  const grouped = groupFaqByCategory(sorted);
  
  return grouped;
};

const processedFaq = processFaqData(faqData);
console.log('Processed FAQ:', processedFaq);

export { processFaqData };
