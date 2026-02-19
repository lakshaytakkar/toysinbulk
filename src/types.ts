export interface Product {
  id: string;
  sku?: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  costPerUnit?: number;
  rating: number;
  reviews: number;
  image: string;
  images?: ProductImage[];
  badge?: string;
  isSale?: boolean;
  isFeatured?: boolean;
  caseQuantity?: number;
  description?: string;
  specifications?: Record<string, string>;
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
  categoryId?: string;
  categoryName?: string;
}

export interface ProductImage {
  id: string;
  imageUrl: string;
  altText?: string;
  isPrimary: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo: string;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  image: string;
}

export interface NavItem {
  id: string;
  label: string;
  slug: string;
  isRed?: boolean;
}

export interface MegaMenuItem {
  id: string;
  category: string;
  items: string[];
  image: string;
  featuredHeader?: string;
  featuredText?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  bannerType: 'hero' | 'promo' | 'character_shop' | 'category_promo';
}

export interface SiteSetting {
  key: string;
  value: string;
  type: string;
}
