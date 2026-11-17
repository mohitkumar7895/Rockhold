export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  display_order: number;
  is_active: boolean | number;
  created_at?: string;
  updated_at?: string;
  product_count?: number;
}

export interface ProductImage {
  id: number;
  product_id: number;
  image_url: string;
  alt_text: string | null;
  display_order: number;
  is_primary: boolean | number;
  created_at?: string;
}

export interface ProductSpecification {
  id: number;
  product_id: number;
  spec_key: string;
  spec_value: string;
  display_order: number;
}

export interface ProductBenefit {
  id: number;
  product_id: number;
  benefit: string;
  display_order: number;
}

export interface ProductApplication {
  id: number;
  product_id: number;
  application: string;
  display_order: number;
}

export interface Product {
  id: number;
  category_id: number;
  category_name?: string;
  category_slug?: string;
  name: string;
  slug: string;
  tagline: string | null;
  short_description: string | null;
  description: string | null;
  packaging_details: string | null;
  coverage: string | null;
  open_time: string | null;
  adjustment_time: string | null;
  pot_life: string | null;
  tensile_strength: string | null;
  compressive_strength: string | null;
  bond_strength: string | null;
  mixing_ratio: string | null;
  tack_free_time: string | null;
  traffic_time: string | null;
  colors: string | null;
  featured_image: string | null;
  datasheet_url: string | null;
  is_featured: boolean | number;
  is_published: boolean | number;
  display_order: number;
  seo_title: string | null;
  seo_description: string | null;
  created_at?: string;
  updated_at?: string;
  images?: ProductImage[];
  specifications?: ProductSpecification[];
  benefits?: ProductBenefit[];
  applications?: ProductApplication[];
}

export interface Enquiry {
  id: number;
  product_id: number | null;
  product_name?: string | null;
  product_slug?: string | null;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  subject: string | null;
  message: string;
  status: 'pending' | 'contacted' | 'completed';
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  description: string | null;
  category: 'products' | 'packaging' | 'applications' | 'projects';
  image_url: string;
  display_order: number;
  is_active: boolean | number;
  created_at?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role_company: string;
  content: string;
  rating: number;
  image_url: string | null;
  is_featured: boolean | number;
  display_order: number;
  created_at?: string;
}

export interface WebsiteSetting {
  id: number;
  setting_key: string;
  setting_value: string;
  setting_group: string;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: 'superadmin' | 'admin';
  created_at?: string;
}

export interface SeoPage {
  id: number;
  page_slug: string;
  page_name: string;
  meta_title: string;
  meta_description: string;
  keywords: string | null;
  canonical_url: string | null;
  og_image: string | null;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  category: string;
  tags: string | null;
  author: string;
  reading_time: string;
  is_published: boolean | number;
  views_count: number;
  seo_title: string | null;
  seo_description: string | null;
  published_at?: string;
  created_at?: string;
  updated_at?: string;
}
