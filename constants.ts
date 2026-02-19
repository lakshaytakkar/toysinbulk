import { Product, Category, NavItem, MegaMenuItem, Brand, Industry } from './types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Deals', isRed: true },
  { label: 'Christmas' },
  { label: "New Year's Eve" },
  { label: 'Party Supplies' },
  { label: 'Toys & Games' },
  { label: 'Crafts' },
  { label: 'Teaching Supplies' },
  { label: 'Faith' },
  { label: 'Candy & Snacks' },
  { label: 'Home & Decor' },
];

export const MAIN_PRODUCT: Product = {
  id: '13780504',
  name: '11" Christmas Brown Stuffed Dog with Red Plaid Winter Hat & Scarf',
  price: 4.48,
  originalPrice: 8.29,
  rating: 4.8,
  reviews: 27,
  image: 'https://s7.orientaltrading.com/is/image/OrientalTrading/13780504?$PDP_VIEWER_IMAGE$',
  badge: 'FLOS_DEAL',
  isSale: true,
  caseQuantity: 1,
  sku: '13780504',
  stockStatus: 'in_stock',
  description: 'STOCKING STUFFERS: Fill Christmas stockings with our compact and festive toys, adding excitement and surprise for kids on Christmas morning. PARTY FAVORS: Include our toy assortments in party favor bags or as giveaway items at your holiday event, leaving guests with memorable keepsakes.',
  specifications: {
    'Size': '11"',
    'Material': 'Plush',
    'Quantity': '1 Piece(s)',
    'Occasion': 'Christmas'
  }
};

export const RELATED_PRODUCTS: Product[] = [
  { id: 'r1', name: 'Soft Velour Stuffed Reindeer', price: 4.48, rating: 5, reviews: 5, image: 'https://s7.orientaltrading.com/is/image/OrientalTrading/13780502?$PDP_VIEWER_IMAGE$', badge: 'FLOS_DEAL', caseQuantity: 1 },
  { id: 'r2', name: '5" Holiday Stuffed Polar Bear', price: 2.98, rating: 4, reviews: 97, image: 'https://s7.orientaltrading.com/is/image/OrientalTrading/4_3981?$PDP_VIEWER_IMAGE$', badge: 'ON_SALE', caseQuantity: 1 },
  { id: 'r3', name: 'Mini Funny Face Stuffed Snowballs', price: 14.98, rating: 4.5, reviews: 341, image: 'https://s7.orientaltrading.com/is/image/OrientalTrading/13612809?$PDP_VIEWER_IMAGE$', badge: 'FLOS_DEAL', caseQuantity: 12 },
  { id: 'r4', name: 'Holiday Patchwork Stuffed Bears', price: 29.98, rating: 4.2, reviews: 35, image: 'https://s7.orientaltrading.com/is/image/OrientalTrading/13750438?$PDP_VIEWER_IMAGE$', badge: 'BUY_MORE_SAVE', caseQuantity: 12 }
];

export const COLLECTION_PRODUCTS: Product[] = [
  { ...MAIN_PRODUCT, id: 'c1' },
  {
    id: 'c2',
    name: '5" Small Holiday Stuffed Polar Bear with Winter Hat & Scarf',
    price: 2.98,
    originalPrice: 4.99,
    rating: 5,
    reviews: 97,
    image: 'https://s7.orientaltrading.com/is/image/OrientalTrading/4_3981?$PDP_VIEWER_IMAGE$',
    badge: 'ON_SALE',
    isSale: true,
    caseQuantity: 1
  },
  {
    id: 'c3',
    name: 'Reversible Sequin Stuffed Christmas Tree Ornaments - 12 Pc.',
    price: 15.88,
    originalPrice: 19.99,
    rating: 5,
    reviews: 10,
    image: 'https://s7.orientaltrading.com/is/image/OrientalTrading/13909171?$PDP_VIEWER_IMAGE$',
    badge: 'FLOS_DEAL',
    isSale: true,
    caseQuantity: 12
  },
  {
    id: 'c4',
    name: '11 3/4" - 13" Holiday Long Arm Stuffed Character Assortment - 12 Pc.',
    price: 21.99,
    originalPrice: 29.99,
    rating: 4,
    reviews: 107,
    image: 'https://s7.orientaltrading.com/is/image/OrientalTrading/4_3101?$PDP_VIEWER_IMAGE$',
    badge: 'BUY_MORE_SAVE',
    isSale: true,
    caseQuantity: 12
  }
];

export const CATEGORIES: Category[] = [
  { id: '1', name: 'Seasonal Toys', image: '/images/category-seasonal-toys.png' },
  { id: '2', name: 'Bulk Candy', image: '/images/category-bulk-candy.png' },
  { id: '3', name: 'Winter Decor', image: '/images/category-winter-decor.png' },
  { id: '4', name: 'Arts & Crafts', image: '/images/category-arts-crafts.png' },
  { id: '5', name: 'Party Supplies', image: '/images/category-party-supplies.png' },
  { id: '6', name: 'Plush Toys', image: '/images/category-plush-toys.png' },
  { id: '7', name: 'Wrapped Candy', image: '/images/category-wrapped-candy.png' },
  { id: '8', name: 'Novelty Items', image: '/images/category-novelty-items.png' },
];

export const MEGA_MENU_ITEMS: MegaMenuItem[] = [
  {
    category: "Toys & Games",
    items: ["Bulk Action Figures", "Plush Assortments", "Building Block Sets", "Die-Cast Vehicles", "Board Games & Puzzles", "Fidget & Sensory Toys", "Outdoor Play Equipment", "Educational STEM Kits"],
    image: "/images/mega-toys-games.png",
    featuredHeader: "Trending Now",
    featuredText: "Sensory Play Collection"
  },
  {
    category: "Party Supplies",
    items: ["Latex Balloons (144/Gross)", "Bulk Tableware & Cutlery", "Themed Party Decorations", "Party Favors & Bin Items", "Gift Bags & Tissue", "Costumes & Accessories", "Bulk Candy & Snacks", "Glow Sticks & Necklaces"],
    image: "/images/mega-party-supplies.png",
    featuredHeader: "Event Essentials",
    featuredText: "Biodegradable Balloon Packs"
  }
];

export const BRANDS: Brand[] = [
  { id: 'lego', name: 'LEGO', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/LEGO_logo.svg' },
  { id: 'mattel', name: 'Mattel', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Mattel_Logo.svg' },
  { id: 'hasbro', name: 'Hasbro', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Hasbro_logo.svg' },
  { id: 'disney', name: 'Disney', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney_2011.svg' },
  { id: 'nintendo', name: 'Nintendo', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Nintendo.svg' },
  { id: 'marvel', name: 'Marvel', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg' },
  { id: 'starwars', name: 'Star Wars', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Star_Wars_Logo.svg' },
  { id: 'pokemon', name: 'Pokemon', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg' }
];

export const INDUSTRIES: Industry[] = [
  {
    id: 'schools',
    name: 'Schools & Education',
    description: 'Bulk classroom prizes, teaching aids, and student incentives.',
    icon: 'School',
    image: '/images/industry-schools.png'
  },
  {
    id: 'nonprofits',
    name: 'Non-Profits & Charities',
    description: 'Low-cost donation items, gift bags, and outreach supplies.',
    icon: 'Heart',
    image: '/images/industry-nonprofits.png'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mini Snowman White Plastic Pull-Back Sled Toys - 144 Pc. Case',
    price: 49.99,
    originalPrice: 72.00,
    rating: 4.5,
    reviews: 11,
    image: 'https://s7.orientaltrading.com/is/image/OrientalTrading/13955610?$PDP_VIEWER_IMAGE$',
    badge: 'BEST VALUE',
    isSale: true,
    caseQuantity: 144
  }
];
