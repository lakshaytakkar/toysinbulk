import type { NavItem, MegaMenuItem, Category, Brand, Industry, Banner } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'nav-1', label: 'Deals', slug: 'deals', isRed: true },
  { id: 'nav-2', label: 'Plush Toys', slug: 'plush-toys' },
  { id: 'nav-3', label: 'Fidget Toys', slug: 'fidget-toys' },
  { id: 'nav-4', label: 'Bath Toys', slug: 'bath-toys' },
  { id: 'nav-5', label: 'Puzzles', slug: 'puzzles' },
  { id: 'nav-6', label: 'Dolls & Figures', slug: 'dolls-figures' },
  { id: 'nav-7', label: 'Seasonal', slug: 'seasonal-toys' },
  { id: 'nav-8', label: 'Party Supplies', slug: 'party-supplies' },
  { id: 'nav-9', label: 'Arts & Crafts', slug: 'arts-crafts' },
  { id: 'nav-10', label: 'All Products', slug: '' },
];

export const MEGA_MENU_ITEMS: MegaMenuItem[] = [
  {
    id: 'mega-1',
    category: 'Toys & Games',
    items: ['Plush Toys', 'Fidget Toys', 'Bath Toys', 'Puzzles', 'Dolls & Figures', 'Seasonal Toys', 'Novelty Items', 'Other Toys'],
    image: '/images/mega-toys-games.png',
    featuredHeader: 'Trending Now',
    featuredText: 'Sensory Play Collection',
  },
  {
    id: 'mega-2',
    category: 'Party & Events',
    items: ['Party Supplies', 'Bulk Candy', 'Wrapped Candy', 'Arts & Crafts', 'Winter Decor', 'Novelty Items'],
    image: '/images/mega-party-supplies.png',
    featuredHeader: 'Event Essentials',
    featuredText: 'Bulk Party Favors',
  },
];

export const MEGA_MENU_SLUG_MAP: Record<string, string> = {
  'Plush Toys': 'plush-toys',
  'Fidget Toys': 'fidget-toys',
  'Bath Toys': 'bath-toys',
  'Puzzles': 'puzzles',
  'Dolls & Figures': 'dolls-figures',
  'Seasonal Toys': 'seasonal-toys',
  'Novelty Items': 'novelty-items',
  'Other Toys': 'other-toys',
  'Party Supplies': 'party-supplies',
  'Bulk Candy': 'bulk-candy',
  'Wrapped Candy': 'wrapped-candy',
  'Arts & Crafts': 'arts-crafts',
  'Winter Decor': 'winter-decor',
};

export const CATEGORIES: Category[] = [
  { id: 'cat-1', name: 'Other Toys', slug: 'other-toys', image: '/images/category-other-toys.png' },
  { id: 'cat-2', name: 'Fidget Toys', slug: 'fidget-toys', image: '/images/category-fidget-toys.png' },
  { id: 'cat-3', name: 'Plush Toys', slug: 'plush-toys', image: '/images/category-plush-toys.png' },
  { id: 'cat-4', name: 'Bath Toys', slug: 'bath-toys', image: '/images/category-bath-toys.png' },
  { id: 'cat-5', name: 'Puzzles', slug: 'puzzles', image: '/images/category-puzzles.png' },
  { id: 'cat-6', name: 'Seasonal Toys', slug: 'seasonal-toys', image: '/images/category-seasonal-toys.png' },
  { id: 'cat-7', name: 'Dolls & Figures', slug: 'dolls-figures', image: '/images/category-dolls-figures.png' },
  { id: 'cat-8', name: 'Party Supplies', slug: 'party-supplies', image: '/images/category-party-supplies.png' },
  { id: 'cat-9', name: 'Arts & Crafts', slug: 'arts-crafts', image: '/images/category-arts-crafts.png' },
  { id: 'cat-10', name: 'Bulk Candy', slug: 'bulk-candy', image: '/images/category-bulk-candy.png' },
  { id: 'cat-11', name: 'Winter Decor', slug: 'winter-decor', image: '/images/category-winter-decor.png' },
  { id: 'cat-12', name: 'Wrapped Candy', slug: 'wrapped-candy', image: '/images/category-wrapped-candy.png' },
  { id: 'cat-13', name: 'Novelty Items', slug: 'novelty-items', image: '/images/category-novelty-items.png' },
];

export const BRANDS: Brand[] = [
  { id: 'brand-1', name: 'LEGO', slug: 'lego', logo: '/images/brand-lego.png' },
  { id: 'brand-2', name: 'Mattel', slug: 'mattel', logo: '/images/brand-mattel.png' },
  { id: 'brand-3', name: 'Hasbro', slug: 'hasbro', logo: '/images/brand-hasbro.png' },
  { id: 'brand-4', name: 'Disney', slug: 'disney', logo: '/images/brand-disney.png' },
  { id: 'brand-5', name: 'Nintendo', slug: 'nintendo', logo: '/images/brand-nintendo.png' },
  { id: 'brand-6', name: 'Marvel', slug: 'marvel', logo: '/images/brand-marvel.png' },
  { id: 'brand-7', name: 'Star Wars', slug: 'star-wars', logo: '/images/brand-star-wars.png' },
  { id: 'brand-8', name: 'Pokemon', slug: 'pokemon', logo: '/images/brand-pokemon.png' },
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'ind-1',
    name: 'Schools & Education',
    slug: 'schools-education',
    description: 'Bulk classroom prizes, teaching aids, and student incentives.',
    icon: 'School',
    image: '/images/industry-schools.png',
  },
  {
    id: 'ind-2',
    name: 'Non-Profits & Charities',
    slug: 'nonprofits-charities',
    description: 'Low-cost donation items, gift bags, and outreach supplies.',
    icon: 'Heart',
    image: '/images/industry-nonprofits.png',
  },
];

export const HERO_BANNER: Banner = {
  id: 'hero-1',
  title: 'Maximize Your Retail Margins',
  subtitle: 'WHOLESALE ONLY',
  description: 'Direct-to-business pricing on over 500 SKUs. We supply schools, non-profits, and retailers across the USA.',
  imageUrl: '/images/hero-banner.png',
  ctaText: 'Shop All Products',
  ctaLink: 'collection',
  bannerType: 'hero',
};

export const CHARACTER_SHOP_BANNER: Banner = {
  id: 'char-1',
  title: 'Premium Licensed Brands',
  subtitle: 'Official Licensing Partner',
  description: 'Stock your shelves with the characters kids love. We are an authorized distributor for major entertainment brands, ensuring authentic merchandise at wholesale margins.',
  imageUrl: '/images/character-shop-banner.png',
  ctaText: 'View Licensed Catalog',
  ctaLink: 'collection',
  bannerType: 'character_shop',
};

export const PRICE_BANNERS: Banner[] = [
  { id: 'price-1', title: 'Under $1', subtitle: 'Dollar Store Items', description: 'Perfect impulse buys and bin fillers at incredible wholesale prices.', bannerType: 'promo' },
  { id: 'price-2', title: 'Under $5', subtitle: 'Bin Fillers & Gifts', description: 'Mid-range toys and party favors at wholesale case pricing.', bannerType: 'promo' },
  { id: 'price-3', title: 'Under $10', subtitle: 'Premium Toys', description: 'Higher-value toys and games with excellent retail margins.', bannerType: 'promo' },
  { id: 'price-4', title: 'BULK', subtitle: 'Case Pack Savings', description: 'Maximum savings on our largest case quantities.', bannerType: 'promo' },
];

export const SITE_SETTINGS = {
  phone_number: '1-888-TOYS-BULK',
  free_shipping_threshold: '250',
  company_name: 'ToysinBulk',
  company_tagline: "America's Wholesale Distributor",
  copyright_year: '2026',
  established_year: '1998',
  promo_bar_text: 'Free Shipping on Wholesale Orders Over $250',
};
