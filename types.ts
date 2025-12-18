export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  isSale?: boolean;
  caseQuantity?: number;
  description?: string;
  specifications?: Record<string, string>;
  sku?: string;
  stockStatus?: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  icon: string;
  image: string;
}

export interface NavItem {
  label: string;
  href: string;
  isRed?: boolean;
}

export interface MegaMenuItem {
  category: string;
  items: string[];
  image: string;
  featuredHeader?: string;
  featuredText?: string;
}

export interface GeneratorConfig {
    id: string;
    prompt: string;
    referenceImage?: string;
    aspectRatio: string;
}