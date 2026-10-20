export type ProductCategory = 'electronics' | 'toys' | 'home' | 'lifestyle';

export interface ProductVariantOption {
  label: string;
  value: string;
  inStock: boolean;
  priceDiff?: number;
  image?: string;
  skuSuffix?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: ProductVariantOption[];
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: ProductCategory;
  categoryLabel: string;
  subcategory: string;
  brand: string;
  price: number;
  compareAtPrice: number | null;
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  badge?: string;
  stockCount: number;
  inStock: boolean;
  sku: string;
  images: string[];
  shortDescription: string;
  description: string;
  specifications: Record<string, string>;
  includedInBox: string[];
  deliveryInfo: string;
  warrantyInfo: string;
  variants?: ProductVariant[];
  faqs?: { question: string; answer: string }[];
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  productCount: number;
  featuredImage: string;
  subcategories: string[];
}
