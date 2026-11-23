/**
 * Memories Data for Santhoshi's Birthday Memory Lane
 * 
 * Configured with Santhoshi's real photos in `/public/images/` (moment1.jpg to moment11.jpg).
 * Dimensions and frames are dynamically inspected at runtime for perfect presentation.
 */

export const memoryCategories = [
  { id: 'all', label: 'All Memories 🌸' },
  { id: 'beautiful', label: 'Beautiful Moments ✨' },
  { id: 'crazy', label: 'Crazy Memories 🤪' },
  { id: 'unforgettable', label: 'Unforgettable Days 💖' },
  { id: 'little-things', label: 'Little Things That Matter 🌷' }
];

export const memories = [
  // Beautiful Moments
  {
    id: 1,
    category: "beautiful",
    image: "/images/moment1.jpg"
  },
  {
    id: 2,
    category: "beautiful",
    image: "/images/moment2.jpg"
  },
  {
    id: 3,
    category: "beautiful",
    image: "/images/moment3.jpg"
  },

  // Crazy Memories
  {
    id: 4,
    category: "crazy",
    image: "/images/moment4.jpg"
  },
  {
    id: 5,
    category: "crazy",
    image: "/images/moment5.jpg"
  },
  {
    id: 6,
    category: "crazy",
    image: "/images/moment6.jpg"
  },

  // Unforgettable Days
  {
    id: 7,
    category: "unforgettable",
    image: "/images/moment7.jpg"
  },
  {
    id: 8,
    category: "unforgettable",
    image: "/images/moment8.jpg"
  },
  {
    id: 9,
    category: "unforgettable",
    image: "/images/moment9.jpg"
  },

  // Little Things That Matter
  {
    id: 10,
    category: "little-things",
    image: "/images/moment10.jpg"
  },
  {
    id: 11,
    category: "little-things",
    image: "/images/moment11.jpg"
  }
];
