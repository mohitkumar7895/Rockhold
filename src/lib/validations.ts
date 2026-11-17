import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number (at least 10 digits)'),
  company: z.string().optional(),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  product_id: z.number().nullable().optional(),
});

export const productEnquirySchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  company: z.string().optional(),
  product_id: z.number({ required_error: 'Product selection is required' }),
  message: z.string().min(5, 'Please provide enquiry details'),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const productSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  category_id: z.number({ required_error: 'Category is required' }),
  slug: z.string().min(2, 'Slug is required'),
  tagline: z.string().optional().nullable(),
  short_description: z.string().optional().nullable(),
  description: z.string().min(10, 'Detailed description is required'),
  packaging_details: z.string().optional().nullable(),
  coverage: z.string().optional().nullable(),
  open_time: z.string().optional().nullable(),
  adjustment_time: z.string().optional().nullable(),
  pot_life: z.string().optional().nullable(),
  tensile_strength: z.string().optional().nullable(),
  compressive_strength: z.string().optional().nullable(),
  bond_strength: z.string().optional().nullable(),
  mixing_ratio: z.string().optional().nullable(),
  tack_free_time: z.string().optional().nullable(),
  traffic_time: z.string().optional().nullable(),
  colors: z.string().optional().nullable(),
  featured_image: z.string().optional().nullable(),
  datasheet_url: z.string().optional().nullable(),
  is_featured: z.boolean().default(false),
  is_published: z.boolean().default(true),
  display_order: z.number().default(0),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
  benefits: z.array(z.string()).optional(),
  applications: z.array(z.string()).optional(),
  specifications: z
    .array(
      z.object({
        key: z.string().min(1, 'Key required'),
        value: z.string().min(1, 'Value required'),
      })
    )
    .optional(),
  images: z.array(z.string()).optional(),
});

export const categorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  slug: z.string().min(2, 'Slug is required'),
  description: z.string().optional().nullable(),
  image: z.string().optional().nullable(),
  display_order: z.number().default(0),
  is_active: z.boolean().default(true),
});

export const changePasswordSchema = z.object({
  current_password: z.string().min(6, 'Current password is required'),
  new_password: z.string().min(6, 'New password must be at least 6 characters'),
});

export const createAdminSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['admin', 'superadmin']).default('admin'),
});

export const blogPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  slug: z.string().min(3, 'Slug is required'),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  featured_image: z.string().optional().nullable(),
  category: z.string().default('Guides'),
  tags: z.string().optional().nullable(),
  author: z.string().default('RockHold Technical Team'),
  reading_time: z.string().default('5 min read'),
  is_published: z.boolean().default(true),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
});
