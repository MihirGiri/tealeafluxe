const products = [
  {
    id: "1",
    name: "Imperial Jade Green",
    category: "Green Tea",
    price: 1650,
    rating: 4.8,
    reviewCount: 142,
    /* Matcha green bowl */
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&q=80&auto=format&fit=crop",
    /* Loose tea leaves */
    hoverImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "Meticulously hand-picked first-flush Longjing leaves with a delicate, grassy sweetness and clean jade-green liquor.",
    healthBenefits: [
      "Rich in antioxidants",
      "Boosts metabolism",
      "Supports mental clarity",
      "Anti-inflammatory",
    ],
    featured: true,
    reviews: [
      {
        id: "r1",
        name: "Priya S.",
        rating: 5,
        date: "March 2026",
        comment:
          "The most refined green tea I have ever tasted. Truly exceptional.",
      },
      {
        id: "r2",
        name: "Arjun H.",
        rating: 5,
        date: "February 2026",
        comment: "Fragrant, smooth and absolutely delicious. Will order again.",
      },
    ],
  },
  {
    id: "2",
    name: "Yunnan Gold Black",
    category: "Black Tea",
    price: 1875,
    rating: 4.7,
    reviewCount: 98,
    /* Tea ceremony pour */
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=600&h=600&q=80&auto=format&fit=crop",
    /* Assam sunrise estate */
    hoverImage:
      "https://images.unsplash.com/photo-1464822756577-4f5d26ef5e75?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "Bold Yunnan black tea with natural golden tips, delivering a rich, malty character with hints of cocoa and sweet honey.",
    healthBenefits: [
      "Improves gut health",
      "Heart-healthy flavonoids",
      "Natural energy boost",
      "Rich in polyphenols",
    ],
    featured: true,
    reviews: [
      {
        id: "r3",
        name: "Rohan T.",
        rating: 5,
        date: "March 2026",
        comment:
          "My morning ritual is complete with this tea. Incredible depth.",
      },
      {
        id: "r4",
        name: "Nisha K.",
        rating: 4,
        date: "January 2026",
        comment: "Smooth and warming. A beautiful everyday black tea.",
      },
    ],
  },
  {
    id: "3",
    name: "Ceremonial Matcha",
    category: "Matcha",
    price: 2850,
    rating: 4.9,
    reviewCount: 215,
    /* Vivid matcha ceremonial */
    image:
      "https://images.unsplash.com/photo-1567922045116-2a00fae2ed03?w=600&h=600&q=80&auto=format&fit=crop",
    /* Matcha whisked bowl */
    hoverImage:
      "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "Stone-ground ceremonial grade matcha from Uji, Kyoto. Vivid emerald colour, umami-rich with a sweet lingering finish.",
    healthBenefits: [
      "High in L-theanine",
      "Sustained energy",
      "Detoxifying chlorophyll",
      "Immune support",
    ],
    featured: true,
    reviews: [
      {
        id: "r5",
        name: "Kavya M.",
        rating: 5,
        date: "March 2026",
        comment:
          "Authentic ceremonial quality. I will never go back to inferior matcha.",
      },
      {
        id: "r6",
        name: "Siddharth B.",
        rating: 5,
        date: "February 2026",
        comment: "Absolutely divine. Creamy, smooth, and beautifully balanced.",
      },
    ],
  },
  {
    id: "4",
    name: "Silver Needle White",
    category: "White Tea",
    price: 2350,
    rating: 4.7,
    reviewCount: 76,
    /* Silver needle buds */
    image:
      "https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=600&h=600&q=80&auto=format&fit=crop",
    /* White tea pouring */
    hoverImage:
      "https://images.unsplash.com/photo-1492778297155-7be4c83a4422?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "The pinnacle of white teas — silvery Bai Hao Yinzhen buds from Fujian, with a luminous, honey-sweet infusion.",
    healthBenefits: [
      "Highest antioxidant content",
      "Skin health",
      "Gentle caffeine",
      "Anti-aging properties",
    ],
    featured: false,
    reviews: [
      {
        id: "r7",
        name: "Ananya P.",
        rating: 5,
        date: "March 2026",
        comment:
          "Ethereal and delicate. The finest white tea I've experienced.",
      },
    ],
  },
  {
    id: "5",
    name: "Champagne Oolong",
    category: "Oolong",
    price: 2200,
    rating: 4.6,
    reviewCount: 64,
    /* Tea cup with steam — oolong steeping */
    image:
      "https://images.unsplash.com/photo-1515823064307-ef40c599ecb7?w=600&h=600&q=80&auto=format&fit=crop",
    /* Loose leaf tea artistry */
    hoverImage:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "Lightly oxidised Alishan high-mountain oolong with a floral, orchid-like aroma and a silky, buttery texture.",
    healthBenefits: [
      "Aids digestion",
      "Weight management support",
      "Rich in minerals",
      "Mood-enhancing",
    ],
    featured: false,
    reviews: [
      {
        id: "r8",
        name: "Vikram W.",
        rating: 5,
        date: "February 2026",
        comment: "A revelation. Floral notes I didn't know existed in tea.",
      },
    ],
  },
  {
    id: "6",
    name: "Himalayan Chamomile",
    category: "Herbal",
    price: 1350,
    rating: 4.5,
    reviewCount: 88,
    /* Herbs and spices */
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=600&q=80&auto=format&fit=crop",
    /* Tea leaves close-up */
    hoverImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "Wild-harvested chamomile blossoms from the Himalayan foothills, releasing a golden, apple-scented tisane of rare calm.",
    healthBenefits: [
      "Promotes deep sleep",
      "Reduces anxiety",
      "Soothes digestion",
      "Anti-inflammatory",
    ],
    featured: false,
    reviews: [
      {
        id: "r9",
        name: "Meera R.",
        rating: 5,
        date: "January 2026",
        comment: "My bedtime ritual. The most calming chamomile I have found.",
      },
    ],
  },
  {
    id: "7",
    name: "Masala Chai Reserve",
    category: "Chai",
    price: 1550,
    rating: 4.8,
    reviewCount: 112,
    /* Japanese tea ceremony setup */
    image:
      "https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=600&h=600&q=80&auto=format&fit=crop",
    /* Tea garden rows */
    hoverImage:
      "https://images.unsplash.com/photo-1566748963551-6f5b3fc0d5e1?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "A hand-blended masala chai using Assam CTC, true Ceylon cinnamon, Malabar cardamom, and hand-cracked black pepper.",
    healthBenefits: [
      "Warming digestive aid",
      "Antioxidant-rich spices",
      "Circulation support",
      "Natural pain relief",
    ],
    featured: true,
    reviews: [
      {
        id: "r10",
        name: "Deepika N.",
        rating: 5,
        date: "March 2026",
        comment:
          "Finally, a chai that tastes like home. Perfect spice balance.",
      },
    ],
  },
  {
    id: "8",
    name: "Sencha Morning Mist",
    category: "Green Tea",
    price: 1625,
    rating: 4.6,
    reviewCount: 93,
    /* Green tea leaves pile */
    image:
      "https://images.unsplash.com/photo-1582284540020-b7103ad7f551?w=600&h=600&q=80&auto=format&fit=crop",
    /* Nilgiri mountain landscape */
    hoverImage:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "First-flush Shizuoka sencha steamed to perfection, producing a brilliant green liquor with refreshing umami and grassy sweetness.",
    healthBenefits: [
      "Catechin-rich",
      "Focus and clarity",
      "Immune boosting",
      "Metabolism support",
    ],
    featured: false,
    reviews: [
      {
        id: "r11",
        name: "Takeshi O.",
        rating: 5,
        date: "February 2026",
        comment: "Authentic sencha with exceptional freshness and colour.",
      },
    ],
  },
  {
    id: "9",
    name: "Rose White Peony",
    category: "White Tea",
    price: 2000,
    rating: 4.7,
    reviewCount: 55,
    /* Loose leaf tea on wooden surface */
    image:
      "https://images.unsplash.com/photo-1600093462093-a140d4f557c6?w=600&h=600&q=80&auto=format&fit=crop",
    /* Tea leaves botanical */
    hoverImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "Bai Mudan white tea gracefully blended with dried rose petals for a floral, elegantly perfumed cup of pure refinement.",
    healthBenefits: [
      "Floral antioxidants",
      "Skin radiance",
      "Gentle relaxation",
      "Heart health",
    ],
    featured: false,
    reviews: [],
  },
  {
    id: "10",
    name: "Dark Roast Hojicha",
    category: "Green Tea",
    price: 1425,
    rating: 4.6,
    reviewCount: 71,
    /* Loose tea with wooden spoon */
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=600&q=80&auto=format&fit=crop",
    /* Morning mist estate */
    hoverImage:
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "Roasted Japanese hojicha with an inviting toasty, caramel aroma and a low-caffeine, deeply comforting amber liquor.",
    healthBenefits: [
      "Low caffeine",
      "Digestive comfort",
      "Rich in antioxidants",
      "Evening-friendly",
    ],
    featured: false,
    reviews: [],
  },
  {
    id: "11",
    name: "Darjeeling First Flush",
    category: "Black Tea",
    price: 2125,
    rating: 4.9,
    reviewCount: 132,
    /* Estate garden path */
    image:
      "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=600&h=600&q=80&auto=format&fit=crop",
    /* Misty tea estate rows */
    hoverImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "The 'Champagne of teas' — a delicate first-flush Darjeeling from Makaibari estate with muscatel character and golden-green liquor.",
    healthBenefits: [
      "Heart health",
      "Digestive enzymes",
      "Mood elevation",
      "Cognitive support",
    ],
    featured: false,
    reviews: [],
  },
  {
    id: "12",
    name: "Evening Wellness Blend",
    category: "Herbal",
    price: 1250,
    rating: 4.5,
    reviewCount: 66,
    /* Dried herbs botanical */
    image:
      "https://images.unsplash.com/photo-1543826173-70651703c5a4?w=600&h=600&q=80&auto=format&fit=crop",
    /* Tea leaves close-up */
    hoverImage:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=600&q=80&auto=format&fit=crop",
    description:
      "A serene evening blend of ashwagandha, brahmi, lemon balm, and passionflower — crafted for deep, restful Ayurvedic sleep.",
    healthBenefits: [
      "Sleep support",
      "Stress relief",
      "Hormone balance",
      "Muscle relaxation",
    ],
    featured: false,
    reviews: [],
  },
];

export default products;
