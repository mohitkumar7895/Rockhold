import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { query } from '@/lib/db';
import { BlogPost } from '@/types';
import { BlogArticleView } from '@/components/blog/BlogArticleView';

interface BlogPageProps {
  params: { slug: string };
}

export const revalidate = 5;

// Fallback technical articles with complete content in case database is cold/offline
const FALLBACK_ARTICLES: Record<string, Partial<BlogPost>> = {
  'tile-adhesive-type-1-type-2-type-3-guide': {
    id: 1,
    title: 'Tile Adhesive Guide: Understanding Type 1 vs Type 2 vs Type 3 (IS 15477:2019)',
    slug: 'tile-adhesive-type-1-type-2-type-3-guide',
    excerpt:
      'Learn how polymer-modified tile adhesives are classified under IS 15477:2019 and how choosing the right type prevents hollow debonding on vitrified and natural stone tiles.',
    category: 'Tile Installation',
    tags: 'Tile Adhesive, IS 15477, Construction Chemicals, R-11, R-21, R-51',
    author: 'Manoj Prajapat (RockHold Technical Team)',
    reading_time: '6 min read',
    featured_image: '/images/gallery/luxury-interior-flooring.jpg',
    seo_title: 'Tile Adhesive Type 1 vs Type 2 vs Type 3 Guide | RockHold',
    seo_description:
      'Comprehensive guide to IS 15477:2019 tile adhesive classifications. Understand when to use Type 1 (R-11), Type 2 (R-21), and Type 3 (R-51) for zero debonding.',
    published_at: '2026-11-15T10:00:00.000Z',
    content: `
# Tile Adhesive Guide: Understanding Type 1 vs Type 2 vs Type 3 (IS 15477:2019)

Selecting the proper tile adhesive is the single most critical structural decision in modern tiling. Traditional sand-cement mortar beds frequently lead to hollow debonding, hairline cracking, and acoustic reverberation under foot traffic. The Bureau of Indian Standards (BIS) revised standard **IS 15477:2019** precisely to establish rigorous performance tiers for polymer-modified cementitious adhesives.

In this engineering guide, we break down what separates Type 1, Type 2, and Type 3 adhesives, and how to match your substrate with the optimal RockHold formulation.

---

## 1. What is IS 15477:2019?

IS 15477:2019 defines adhesives for fixing tiles and stone slabs. The standard classifies products by tensile adhesion strength, shear strength, open time, and adjustment time under both dry and wet environmental conditions:

- **Type 1 Adhesive (RockHold R-11):** Formulated for interior porous tiles (such as ceramic wall tiles, clay terracotta, and small vitrified tiles). Minimum tensile strength requirement: **≥ 0.5 MPa**.
- **Type 2 Adhesive (RockHold R-21):** Polymer-enhanced for non-porous and low-porosity vitrified tiles, porcelain tiles, and tile-on-tile renovation work. Handles internal shaded spaces and light external areas. Minimum tensile strength requirement: **≥ 0.5 MPa** with elevated shear bond resistance.
- **Type 3 Adhesive (RockHold R-51):** Heavy-duty polymer modification for large format porcelain slabs (up to 1200x2400 mm), glass mosaics, marble, and natural stone installations on exterior building facades and heavily trafficked commercial floors. Minimum tensile strength requirement: **≥ 1.0 MPa**.

---

## 2. Why Conventional Cement-Sand Fails on Vitrified Tiles

Modern vitrified tiles are engineered with a water absorption rate of less than **0.05% to 0.5%**. Because the tile body is practically impermeable, traditional wet cement mortar cannot penetrate into microscopic pores to create a mechanical anchor. Over 1 to 2 years, thermal expansion and structural settlement cause the tiles to pop up with a telltale hollow sound.

**RockHold Polymer Chemistry:** RockHold adhesives contain synthetic re-dispersible polymer powders that form chemical cross-linked bridges between the impervious tile backing and the concrete screed, ensuring permanent adhesion regardless of porosity.

---

## 3. Comparison Matrix: RockHold R-Series

| Parameter | RockHold R-11 (Type 1) | RockHold R-21 (Type 2) | RockHold R-51 (Type 3) |
| :--- | :--- | :--- | :--- |
| **Recommended Tiles** | Ceramic, Terracotta, Small Vitrified | Medium & Large Vitrified, Tile-on-Tile | XL Porcelain Slabs, Marble, Granite |
| **Location** | Interior Floors & Walls | Interior & Covered Outdoor | Interior, Exterior Facades, Heavy Footfall |
| **Open Time** | ≥ 20 Minutes | ≥ 20 Minutes | ≥ 20 Minutes |
| **Adjustment Time** | ≥ 25 Minutes | ≥ 25 Minutes | ≥ 25 Minutes |
| **Pot Life** | 2 Hours | 2 Hours | 2 Hours |
| **Tensile Strength** | Min 0.5 MPa | Min 0.5 MPa (High Shear) | Min 1.0 - 1.5 MPa |
| **Packaging** | 20 kg Bag | 20 kg Bag | 20 kg Bag |
| **Coverage** | 50–60 sq.ft @ 3mm | 50–60 sq.ft @ 3mm | 50–60 sq.ft @ 3mm |

---

## 4. Key Installation Best Practices

1. **Substrate Preparation:** Ensure the screed is fully cured (minimum 28 days for new concrete), level, dry, and free from oil, dust, or curing compounds.
2. **Proper Water Ratio:** Mix each 20kg bag of RockHold adhesive with 5.0 to 5.5 litres of clean potable water. Always add powder to water, never vice versa, using a mechanical slow-speed stirrer (300-400 RPM) for 3–5 minutes until lump-free.
3. **Slake Time:** Allow the mixture to slake for 5 minutes before re-mixing for 1 minute. This activates the polymer chains.
4. **Notch Trowel Selection:** Use a 6mm x 6mm notched trowel for tiles up to 600x600mm. For large format slabs (1200mm+), utilize a 10mm or 12mm trowel and back-butter the tile reverse to achieve 100% bed contact.

---

## Conclusion

Choosing the right adhesive grade eliminates catastrophic debonding risks and ensures architectural tile work remains pristine for decades. For technical inquiries or bulk project supply across Rajasthan and North India, contact RockHold at **+91 90016 67917**.
    `.trim(),
  },
  'why-epoxy-grout-is-essential-for-swimming-pools-and-bathrooms': {
    id: 2,
    title: 'Why Epoxy Grout is Essential for Swimming Pools, Kitchens & Luxury Bathrooms',
    slug: 'why-epoxy-grout-is-essential-for-swimming-pools-and-bathrooms',
    excerpt:
      'Discover why cementitious grout fails under continuous water exposure and how RockHold 3-component impervious epoxy grout provides 100% stain-proof, acid-resistant joints.',
    category: 'Epoxy Grouts',
    tags: 'Epoxy Grout, Swimming Pools, Waterproof Jointing, Hygiene',
    author: 'RockHold Technical Laboratory',
    reading_time: '5 min read',
    featured_image: '/images/gallery/epoxy-living-room.jpg',
    seo_title: 'Why Epoxy Grout is Essential for Pools & Wet Areas | RockHold',
    seo_description:
      'Explore the advantages of 3-component epoxy grout over traditional cement grout. 50.45 MPa compressive strength, 100% stain-proof, and impervious to chemicals.',
    published_at: '2026-11-14T09:30:00.000Z',
    content: `
# Why Epoxy Grout is Essential for Swimming Pools, Kitchens & Luxury Bathrooms

Tile grouting is often treated as an aesthetic afterthought, yet it represents the first line of defense against structural water penetration, fungal colonization, and joint erosion. In wet environments like swimming pools, walk-in showers, commercial food prep areas, and luxury bathrooms, conventional cement-based grout is fundamentally inadequate.

Here is why structural engineers, hotel developers, and luxury architects consistently mandate **RockHold 3-Component Epoxy Grout**.

---

## 1. The Critical Flaw of Cementitious Grout

Standard cement grout is inherently porous. Under a microscope, cured cement looks like a sponge filled with microscopic capillary tunnels. When exposed to continuous moisture, bath oils, chlorine, or cooking grease:

- Water wicks behind the tiles, soaking the substrate screed and rotting waterproofing membranes.
- Dark black mold and bacteria colonize the interior pores, resisting surface scrub detergents.
- Household descaling acids leach calcium hydroxide from the grout, causing gradual powdery degradation and crumbly joints.

---

## 2. The Science of RockHold 3-Component Epoxy Grout

RockHold Epoxy Grout is formulated using a cross-linked thermosetting polymer matrix:
1. **Component A:** High-grade bisphenol epoxy resin.
2. **Component B:** Polyamide curing hardener.
3. **Component C:** Selectively graded, coated spherical silica aggregates with UV-stable color pigments.

### Certified Mechanical Performance:
- **Compressive Strength:** **50.45 MPa** (Compared to 10–12 MPa for cement grout).
- **Bond Adhesion Strength:** **7.55 MPa**.
- **Tensile Strength:** **15.25 MPa**.
- **Water Absorption:** **0.00%** (100% Impervious barrier).
- **Chemical Resistance:** Fully resistant to pool chlorine, dilute acids, alkaline cleaners, and organic stains.

---

## 3. Top Applications Where Epoxy Grout is Mandatory

### A. Swimming Pools & Water Features
Pool water contains dissolved chlorine, algaecides, and acidic sanitizers that degrade standard cement in 6 to 12 months. RockHold Epoxy Grout withstands continuous submersion and backwash pressure without dissolving.

### B. Walk-In Showers & Wet Rooms
Zero water ingress prevents unpleasant damp odors and peeling paint on adjacent bedroom walls.

### C. Commercial Kitchens & Dining
Resistant to cooking oils, vinegar, turmeric stains, and high-temperature pressure washing.

---

## 4. Application Tips for Flawless Results

- **Pot Life Awareness:** RockHold Epoxy Grout has a pot life of 35–45 minutes at 27°C. Mix only what can be comfortably applied within this window.
- **Diagonal Grouting:** Pack the joints using a clean, firm rubber grout float held at a 45-degree angle.
- **Initial Sponge Wash:** Emulsify excess surface resin after 30–45 minutes using warm water and an abrasive scrubbing pad, followed by a damp cellulose sponge.
- **Full Cure:** The joints achieve tack-free status in 6–7 hours, light foot traffic after 24 hours, and full chemical/heavy traffic resistance after 72 hours.
    `.trim(),
  },
  'preventing-water-seepage-integral-waterproofing-admixtures': {
    id: 3,
    title: 'Combating Water Seepage: The Power of Integral Waterproofing Admixtures',
    slug: 'preventing-water-seepage-integral-waterproofing-admixtures',
    excerpt:
      'How RockHold R301 LW+ and R302 SBR bonding latex modify the pore structure of concrete and mortar, permanently sealing capillaries against moisture ingress and efflorescence.',
    category: 'Waterproofing',
    tags: 'Waterproofing, R301 LW+, SBR Latex, Concrete Admixtures',
    author: 'Civil Engineering Insights',
    reading_time: '7 min read',
    featured_image: '/images/gallery/concrete-waterproofing-application.jpg',
    seo_title: 'Preventing Water Seepage with Integral Waterproofing Admixtures | RockHold',
    seo_description:
      'Detailed engineering analysis of integral liquid waterproofing compounds and SBR latex. How capillary pore blocking prevents structural dampness and salt leeching.',
    published_at: '2026-11-12T11:00:00.000Z',
    content: `
# Combating Water Seepage: The Power of Integral Waterproofing Admixtures

Water seepage and dampness are among the most persistent and costly structural problems facing buildings across India. From peeling wall plaster and blistered paint to rusted internal reinforcement rebars (spalling), water ingress degrades the structural lifespan of residential and commercial properties.

While surface coatings provide temporary defense, true long-term durability requires **Integral Waterproofing** — modifying the microscopic pore structure of concrete and plaster during the batching phase itself.

---

## 1. How Capillary Seepage Happens in Concrete & Plaster

Concrete and cement plaster require water to hydrate cement particles (typically a water-cement ratio of 0.25 to 0.30). However, to make the fresh mix workable for site masons, excess water is added (raising the ratio to 0.50–0.60).

As the concrete cures, this surplus water evaporates, leaving behind millions of interconnected microscopic tunnels known as **capillaries**. Through capillary suction, groundwater and rainwater penetrate deep into structural elements, carrying dissolved mineral salts that cause efflorescence (shora).

---

## 2. Enter RockHold R301 LW+ Integral Waterproofing

**RockHold R301 LW+** is a specially synthesized liquid chemical compound designed to be introduced directly into the mixing water of concrete and plaster:

1. **Plasticizing Effect:** Increases workability and cohesion of concrete without requiring additional water.
2. **Capillary Pore Disruption:** Disperses fine hydrophobic chemical particles that fill and break the continuity of capillary channels.
3. **Anti-Bleed Formulation:** Prevents segregation of heavy aggregates, delivering a uniform, dense concrete mass.
4. **Dosage:** Only **100 ml to 200 ml per 50 kg bag of cement**, making it exceptionally economical.

---

## 3. The Role of RockHold R302 SBR Bonding Latex

For repair works, waterproof slurry coatings, and bonding old concrete to new screeds, **RockHold R302 SBR** (Styrene Butadiene Rubber Latex) is the industry benchmark:

- **Polymer Bond Slurry:** 1 part R302 SBR + 1.5 parts cement creates a tenacious, flexible bond coat that stops cold joints from leaking.
- **Waterproof Polymer Plaster:** Adding R302 SBR to 1:3 cement mortar creates an impervious render for basements, water tanks, and exterior facades exposed to monsoon rains.
- **Crack Bridging & Flexibility:** Dampens structural vibrations and thermal stresses that would otherwise crack standard mortar.

---

## 4. Best Practice Engineering Checklist

- Never mix liquid waterproofing directly with dry cement powder; always dilute in gauging water first.
- Ensure thorough curing for at least 7 to 10 days to maximize hydration density.
- Treat cold construction joints with an SBR bonding slurry coat before pouring subsequent concrete lifts.
    `.trim(),
  },
  'how-to-remove-grout-haze-and-limescale-from-tiles': {
    id: 4,
    title: 'How to Remove Tough Grout Haze & Limescale from Tiles Without Damaging Glaze',
    slug: 'how-to-remove-grout-haze-and-limescale-from-tiles',
    excerpt:
      'A step-by-step guide to tackling stubborn whitish mineral scaling, plastic bucket ring marks, and post-construction cement haze using active, safe chemical descalers.',
    category: 'Surface Maintenance',
    tags: 'Tile Cleaner, Tap Cleaner, Descaling, R01, Maintenance',
    author: 'RockHold Surface Care Division',
    reading_time: '4 min read',
    featured_image: '/images/gallery/cleaner-application.jpg',
    seo_title: 'How to Clean Tough Grout Haze & Limescale from Tiles | RockHold R01',
    seo_description:
      'Step-by-step guide for removing stubborn cement haze, bathroom bucket stains, and hard water limescale using active, non-corrosive descaling chemicals.',
    published_at: '2026-11-10T14:15:00.000Z',
    content: `
# How to Remove Tough Grout Haze & Limescale from Tiles Without Damaging Glaze

After a new tiling project or several years of hard water usage in bathrooms, tiles often develop an unsightly whitish film. Masons refer to this as cement/grout haze, while homeowners battle stubborn round white rings under plastic bathroom buckets.

Using crude hydrochloric acid or bathroom toilet cleaners can permanently burn the tile glaze, etch polished porcelain, and ruin chrome sanitaryware. Here is the professional method for restoring surfaces using **RockHold R01 Tile Cleaner** and **RockHold Tap Cleaner**.

---

## 1. What Causes the Whitish Layer?

1. **Grout & Cement Haze:** Residual portland cement polymers left behind after grouting that have cured onto the tile surface.
2. **Hard Water Limescale:** Calcium and magnesium carbonates deposited by hard tap water when droplets evaporate on warm tiles and faucets.
3. **Soap Scum:** Fatty acids from soaps binding with mineral deposits, creating an insoluble sticky coating.

---

## 2. The Solution: RockHold R01 Rapid Active Tile Cleaner

Unlike crude corrosive acids, **RockHold R01 Tile Cleaner** is a formulated blend of active organic and inorganic surfactants engineered specifically to break down mineral salts while preserving the underlying glaze:

- **Dilution for Regular Maintenance:** Dilute 1 part R01 with 2 parts clean water.
- **For Heavy Construction Haze:** Use neat or dilute 1:1 with water.
- **Application Method:**
  1. Wet the tiled surface with clean water first to protect porous joint cement.
  2. Apply the diluted solution using a sponge or soft brush.
  3. Allow to react for **5 to 10 minutes** (you will observe light effervescence as mineral salts dissolve).
  4. Scrub gently with a nylon scouring pad.
  5. Rinse thoroughly with copious clean water and wipe dry.

---

## 3. Protecting Chrome Sanitaryware: RockHold Tap Cleaner

Never use aggressive tile cleaners or harsh abrasives on chrome basin mixers, shower heads, or brass valves! The thin chrome electroplating will turn yellow, bubble, or peel permanently.

**RockHold Tap Cleaner** is an eco-safe, non-corrosive descaling spray:
- Spray directly onto faucets, shower arms, and stainless steel gratings.
- Wait **3 to 5 minutes** for the active formulation to soften limescale.
- Wipe clean with a microfiber cloth and rinse with water.
- Delivers an instant, mirror-like showroom shine with zero scratching.

---

## Summary

Regular care with scientific formulations keeps luxury tiles looking brand new for decades. For distributor inquiries or retail orders of RockHold R01 Tile Cleaner and Tap Cleaner, contact us at **+91 90016 67917**.
    `.trim(),
  },
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = params;
  try {
    const rows = await query<any[]>(
      'SELECT title, excerpt, seo_title, seo_description, featured_image, published_at FROM blog_posts WHERE slug = ? AND is_published = 1 LIMIT 1',
      [slug]
    );

    let post = rows && rows.length > 0 ? rows[0] : FALLBACK_ARTICLES[slug];

    if (!post) {
      return { title: 'Article Not Found | RockHold' };
    }

    const title = post.seo_title || `${post.title} | RockHold Technical Blog`;
    const description = post.seo_description || post.excerpt;
    const image = post.featured_image || '/images/gallery/luxury-interior-flooring.jpg';

    return {
      title,
      description,
      alternates: {
        canonical: `https://rockhold.in/blog/${slug}`,
      },
      openGraph: {
        title,
        description,
        url: `https://rockhold.in/blog/${slug}`,
        type: 'article',
        publishedTime: post.published_at,
        images: [{ url: image, width: 1200, height: 630, alt: post.title }],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
    };
  } catch (error) {
    const fallback = FALLBACK_ARTICLES[slug];
    if (fallback) {
      return {
        title: `${fallback.title} | RockHold Technical Blog`,
        description: fallback.excerpt,
      };
    }
    return { title: 'Technical Guide | RockHold' };
  }
}

async function getBlogPost(slug: string) {
  try {
    const [postRows, relatedRows] = await Promise.all([
      query<any[]>('SELECT * FROM blog_posts WHERE slug = ? AND is_published = 1 LIMIT 1', [slug]),
      query<any[]>('SELECT * FROM blog_posts WHERE slug != ? AND is_published = 1 ORDER BY id DESC LIMIT 3', [slug]),
    ]);

    if (postRows && postRows.length > 0) {
      // Increment view counter async
      query('UPDATE blog_posts SET views_count = views_count + 1 WHERE id = ?', [postRows[0].id]).catch(() => {});

      return {
        post: postRows[0] as BlogPost,
        related: (relatedRows || []) as BlogPost[],
      };
    }
  } catch (error) {
    console.error('Fetch single blog error, using fallback:', error);
  }

  // Fallback
  if (FALLBACK_ARTICLES[slug]) {
    const post = FALLBACK_ARTICLES[slug] as BlogPost;
    const related = Object.keys(FALLBACK_ARTICLES)
      .filter((s) => s !== slug)
      .map((s) => FALLBACK_ARTICLES[s] as BlogPost);
    return { post, related };
  }

  return null;
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const data = await getBlogPost(params.slug);
  if (!data) notFound();

  const { post, related } = data;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featured_image
      ? `https://rockhold.in${post.featured_image}`
      : 'https://rockhold.in/images/gallery/luxury-interior-flooring.jpg',
    datePublished: post.published_at || post.created_at,
    author: {
      '@type': 'Organization',
      name: post.author || 'RockHold Technical Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'RockHold',
      logo: {
        '@type': 'ImageObject',
        url: 'https://rockhold.in/images/logo/rockhold-mark.jpg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://rockhold.in/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogArticleView post={post} related={related} />
    </>
  );
}
