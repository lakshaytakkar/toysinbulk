import { supabase } from '../lib/supabase';
import type { Product, Category, Brand, Industry, NavItem, MegaMenuItem, Banner, SiteSetting } from '../types';

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;

  return (data || []).map(row => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    image: row.image_url || '',
  }));
}

export async function fetchCategoryBySlug(slug: string): Promise<{ id: string; name: string; slug: string } | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('id, name, slug')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  return data;
}

export async function fetchBrands(): Promise<Brand[]> {
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;

  return (data || []).map(row => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    logo: row.logo_url || '',
  }));
}

export async function fetchIndustries(): Promise<Industry[]> {
  const { data, error } = await supabase
    .from('industries')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;

  return (data || []).map(row => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    icon: row.icon || '',
    image: row.image_url || '',
  }));
}

export async function fetchNavItems(): Promise<NavItem[]> {
  const { data, error } = await supabase
    .from('nav_items')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;

  return (data || []).map(row => ({
    id: row.id,
    label: row.label,
    slug: row.slug,
    isRed: row.is_red,
  }));
}

export async function fetchMegaMenuItems(): Promise<MegaMenuItem[]> {
  const { data, error } = await supabase
    .from('mega_menu_items')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;

  return (data || []).map(row => ({
    id: row.id,
    category: row.category_name,
    items: Array.isArray(row.items) ? row.items : JSON.parse(row.items || '[]'),
    image: row.image_url || '',
    featuredHeader: row.featured_header,
    featuredText: row.featured_text,
  }));
}

export async function fetchBanners(type?: string): Promise<Banner[]> {
  let query = supabase
    .from('banners')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (type) {
    query = query.eq('banner_type', type);
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map(row => ({
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    description: row.description,
    imageUrl: row.image_url,
    ctaText: row.cta_text,
    ctaLink: row.cta_link,
    bannerType: row.banner_type,
  }));
}

export async function fetchSiteSettings(): Promise<Record<string, string>> {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*');

  if (error) throw error;

  const settings: Record<string, string> = {};
  (data || []).forEach(row => {
    settings[row.setting_key] = row.setting_value;
  });
  return settings;
}

export async function fetchProducts(options?: {
  featured?: boolean;
  categoryId?: string;
  categorySlug?: string;
  limit?: number;
  offset?: number;
  search?: string;
  maxPrice?: number;
}): Promise<{ products: Product[]; total: number }> {
  let categoryId = options?.categoryId;

  if (!categoryId && options?.categorySlug) {
    const cat = await fetchCategoryBySlug(options.categorySlug);
    if (cat) {
      categoryId = cat.id;
    } else {
      return { products: [], total: 0 };
    }
  }

  let query = supabase
    .from('products')
    .select(`
      *,
      categories(name, slug),
      product_images(id, image_url, alt_text, is_primary, sort_order)
    `, { count: 'exact' })
    .eq('is_active', true);

  if (options?.featured) {
    query = query.eq('is_featured', true);
  }

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  if (options?.search) {
    query = query.ilike('name', `%${options.search}%`);
  }

  if (options?.maxPrice) {
    query = query.lte('price', options.maxPrice);
  }

  query = query.order('sort_order');

  const limit = options?.limit || 24;
  const offset = options?.offset || 0;
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;
  if (error) throw error;

  const products = (data || []).map(mapProductRow);
  return { products, total: count || 0 };
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select(`
      *,
      categories(name, slug),
      product_images(id, image_url, alt_text, is_primary, sort_order),
      product_specifications(spec_key, spec_value, sort_order)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }

  const product = mapProductRow(data);

  if (data.product_specifications) {
    const specs: Record<string, string> = {};
    const sortedSpecs = [...data.product_specifications].sort((a: any, b: any) => a.sort_order - b.sort_order);
    sortedSpecs.forEach((spec: any) => {
      if (spec.spec_key !== 'Short Description' && spec.spec_key !== 'Original SKU') {
        specs[spec.spec_key] = spec.spec_value;
      }
    });
    product.specifications = specs;
  }

  return product;
}

export async function fetchRelatedProducts(productId: string, categoryId?: string, limit = 4): Promise<Product[]> {
  let query = supabase
    .from('products')
    .select(`
      *,
      categories(name, slug),
      product_images(id, image_url, alt_text, is_primary, sort_order)
    `)
    .eq('is_active', true)
    .neq('id', productId)
    .order('sort_order')
    .limit(limit);

  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map(mapProductRow);
}

function mapProductRow(row: any): Product {
  const images = row.product_images || [];
  const sortedImages = [...images].sort((a: any, b: any) => a.sort_order - b.sort_order);
  const primaryImage = sortedImages.find((img: any) => img.is_primary) || sortedImages[0];

  return {
    id: row.id,
    sku: row.sku,
    name: row.name,
    slug: row.slug,
    price: parseFloat(row.price),
    originalPrice: row.original_price ? parseFloat(row.original_price) : undefined,
    costPerUnit: row.cost_per_unit ? parseFloat(row.cost_per_unit) : undefined,
    rating: parseFloat(row.rating || '0'),
    reviews: row.review_count || 0,
    image: primaryImage?.image_url || '/images/placeholder.png',
    images: sortedImages.map((img: any) => ({
      id: img.id,
      imageUrl: img.image_url,
      altText: img.alt_text,
      isPrimary: img.is_primary,
    })),
    badge: row.badge,
    isSale: row.is_sale,
    isFeatured: row.is_featured,
    caseQuantity: row.case_quantity,
    description: row.description,
    stockStatus: row.stock_status,
    categoryId: row.category_id,
    categoryName: row.categories?.name,
  };
}
