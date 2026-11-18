import React from 'react';
import { query } from '@/lib/db';
import { Product, Category, Testimonial, GalleryItem } from '@/types';
import { HeroSection } from '@/components/home/HeroSection';
import { CategoryShowcase } from '@/components/home/CategoryShowcase';
import { AdhesiveCalculator } from '@/components/home/AdhesiveCalculator';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { BeforeAfterSlider } from '@/components/home/BeforeAfterSlider';
import { ManufacturingIntro } from '@/components/home/ManufacturingIntro';
import { ApplicationGallery } from '@/components/home/ApplicationGallery';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { EnquiryCTA } from '@/components/home/EnquiryCTA';

export const revalidate = 5; // Instant edge serving + automatic 5s background freshness

async function getHomeData() {
  try {
    const [productsRows, categoriesRows, testimonialsRows, galleryRows] = await Promise.all([
      query<any[]>(`
        SELECT p.*, c.name as category_name, c.slug as category_slug
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE p.is_published = 1
        ORDER BY p.display_order ASC, p.id ASC
      `),
      query<any[]>(`
        SELECT * FROM categories
        WHERE is_active = 1
        ORDER BY display_order ASC
      `),
      query<any[]>(`
        SELECT * FROM testimonials
        WHERE is_featured = 1
        ORDER BY display_order ASC
        LIMIT 3
      `),
      query<any[]>(`
        SELECT * FROM gallery
        WHERE is_active = 1
        ORDER BY display_order ASC, id DESC
        LIMIT 6
      `),
    ]);

    return {
      products: productsRows as Product[],
      categories: categoriesRows as Category[],
      testimonials: testimonialsRows as Testimonial[],
      gallery: galleryRows as GalleryItem[],
    };
  } catch (error) {
    console.error('Home data fetching error:', error);
    return {
      products: [],
      categories: [],
      testimonials: [],
      gallery: [],
    };
  }
}

export default async function HomePage() {
  const { products, categories, testimonials, gallery } = await getHomeData();
  const flagshipProduct =
    products.find((p) => p.slug === 'r-21-tile-adhesive') ||
    products.find((p) => p.is_featured) ||
    products[0];

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <HeroSection flagshipProduct={flagshipProduct} />

      {/* 2. Category Showcase */}
      <CategoryShowcase categories={categories} />

      {/* 3. Interactive Adhesive & Material Estimator */}
      <AdhesiveCalculator />

      {/* 4. Featured Catalogue Products */}
      <FeaturedProducts products={products} />

      {/* 5. Interactive Before/After Surface Cleaning Showcase */}
      <BeforeAfterSlider />

      {/* 6. Why Choose RockHold (Pillars & Performance) */}
      <WhyChooseUs />

      {/* 7. Manufacturing Facility & Quality Standards (Kritika Enterprises, Beekamsara, Churu) */}
      <ManufacturingIntro />

      {/* 8. Real-World Applications & Construction Gallery */}
      <ApplicationGallery items={gallery} />

      {/* 9. Industry Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 10. Direct Commercial Enquiry CTA */}
      <EnquiryCTA />
    </div>
  );
}
