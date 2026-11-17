-- RockHold Seed Data
USE `rockhold`;

-- 1. Seed Admin User
-- Password is: Admin@123
INSERT INTO `admins` (`id`, `name`, `email`, `password`, `role`) VALUES
(1, 'Manoj Prajapat', 'admin@rockhold.com', '$2a$10$brf6AMYdNu.TlKJm60KBOOvHcDciiAPK34Y5L8IvhKe5jUXACdeZS', 'superadmin'),
(2, 'Operations Admin', 'manoj.prajapat@rockhold.com', '$2a$10$brf6AMYdNu.TlKJm60KBOOvHcDciiAPK34Y5L8IvhKe5jUXACdeZS', 'admin')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `password`=VALUES(`password`);

-- 2. Seed Categories
INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `display_order`, `is_active`) VALUES
(1, 'Tile Adhesives', 'tile-adhesives', 'High-performance polymer-modified cementitious adhesives engineered for ceramic, vitrified, glass mosaic, and natural stone installations.', '/images/products/r-11-tile-adhesive.png', 1, TRUE),
(2, 'Grouts & Joint Fillers', 'grouts-joint-fillers', 'Stain-free epoxy resin grouts and polymer-modified cementitious joint fillers providing impervious, crack-free, and hygienic tile joints.', '/images/products/epoxy-grout.png', 2, TRUE),
(3, 'Surface Cleaners', 'surface-cleaners', 'Specialized industrial tile cleaners and non-corrosive descalers for pristine, stain-free fixtures and long-lasting shine.', '/images/products/r01-tile-cleaner.png', 3, TRUE),
(4, 'Waterproofing & Admixtures', 'waterproofing-admixtures', 'Advanced integral waterproofing compounds and SBR bonding latex engineered for structural repairs, roofs, basements, and moisture protection.', '/images/products/r301-lw-plus.png', 4, TRUE)
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `description`=VALUES(`description`), `image`=VALUES(`image`), `display_order`=VALUES(`display_order`);

-- 3. Seed Products
INSERT INTO `products` (`id`, `category_id`, `name`, `slug`, `tagline`, `short_description`, `description`, `packaging_details`, `coverage`, `open_time`, `adjustment_time`, `pot_life`, `tensile_strength`, `compressive_strength`, `bond_strength`, `mixing_ratio`, `tack_free_time`, `traffic_time`, `colors`, `featured_image`, `datasheet_url`, `is_featured`, `is_published`, `display_order`, `seo_title`, `seo_description`) VALUES
(1, 1, 'R-11 Tile Adhesive – Type 1', 'r-11-tile-adhesive', 'Polymer-Modified Cement-Based Tile Adhesive for Ceramic & Clay Tiles', 
'Rockhold R-11 Type 1 is a polymer-modified cement-based powder tile adhesive for fixing all types of ceramic and clay tiles on internal floors and walls.',
'Rockhold R-11 Type 1 is a polymer-modified cement-based powder tile adhesive for fixing all types of ceramic, and clay tiles. It is suitable for both vertical and horizontal applications. It gives excellent bond on exterior cementitious surfaces like plaster or concrete etc. Engineered with advanced polymer technology for hassle-free mixing and self-curing properties.',
'20 kg Bag', 'Approx 50–60 sq. ft. at 3 mm thickness', '≥ 20 Min.', '≥ 25 Min.', '2 Hours', 'Min 0.5 MPa', '12.5 MPa', 'Min 0.5 MPa', '5.0–5.5 Litres water per 20 kg bag', NULL, '24 Hours', 'Grey & White', '/images/products/r-11-tile-adhesive.png', '/datasheets/r-11-technical-data-sheet.pdf', TRUE, TRUE, 1, 'RockHold R-11 Tile Adhesive Type 1 | Polymer Modified Tile Adhesive', 'Buy RockHold R-11 Type 1 polymer-modified cement-based tile adhesive for ceramic and clay tiles. Superior tensile strength and durable bonding.'),

(2, 1, 'R-21 Tile Adhesive – Type 2', 'r-21-tile-adhesive', 'High-Performance Polymer-Modified Adhesive for Vitrified, Terracotta & Tile-on-Tile',
'Rockhold R-21 Type 2 is a polymer-modified cement-based powder tile adhesive for fixing ceramic, vitrified tiles, terracotta, pavers, and tile-on-tile applications.',
'Rockhold R-21 Type 2 is a polymer-modified cement-based powder tile adhesive for fixing all types of ceramic tile, terracotta, pavers, brick vitrified tiles, and glass. Formulated with high-strength synthetic polymers offering exceptional slip resistance on vertical surfaces and outstanding water resistance for wet areas.',
'20 kg Bag', 'Approx 50–60 sq. ft. at 3 mm thickness', '≥ 20 Min.', '≥ 25 Min.', '2 Hours', 'Min 0.5 MPa', '15.0 MPa', 'Min 1.0 MPa', '5.0–5.5 Litres water per 20 kg bag', NULL, '24 Hours', 'Grey & White', '/images/products/r-21-tile-adhesive.png', '/datasheets/r-21-technical-data-sheet.pdf', TRUE, TRUE, 2, 'RockHold R-21 Tile Adhesive Type 2 | Vitrified & Tile on Tile Adhesive', 'RockHold R-21 Type 2 tile adhesive for ceramic, vitrified tiles, pavers, terracotta, and tile-on-tile renovation. Sag resistant with low VOC formula.'),

(3, 1, 'R-51 Tile Adhesive – Type 3', 'r-51-tile-adhesive', 'Heavy-Duty Polymer-Modified Cement Adhesive for Large Format & Natural Stone',
'Rockhold Type 3 is an ultra-strong polymer modified cement based powder tile adhesive for large vitrified tiles, porcelain slabs, and natural stone installations.',
'Rockhold Type 3 is a polymer modified cement based powder tile adhesive for fixing all types of ceramic tiles, clay tiles, basalt tiles, terracotta, pavers, brick, vitrified tiles, glass mosaic tiles, porcelain tiles, and all natural stone tiles. It is suitable for Flooring and walls, internal applications & external shaded areas, external areas, dry & wet areas, new construction & renovation, domestic applications, and commercial applications.',
'20 kg Bag', 'Approx 50–60 sq. ft. at 3 mm thickness', '≥ 20 Min.', '≥ 25 Min.', '2 Hours', 'Min 1.0 MPa', '18.0 MPa', 'Min 1.5 MPa', '5.0–5.5 Litres water per 20 kg bag', NULL, '24 Hours', 'Grey & White', '/images/products/r-51-tile-adhesive.png', '/datasheets/r-51-technical-data-sheet.pdf', TRUE, TRUE, 3, 'RockHold R-51 Tile Adhesive Type 3 | Large Format & Natural Stone Adhesive', 'RockHold R-51 Type 3 heavy-duty tile adhesive for porcelain slabs, glass mosaic, marble, granite, and natural stone in interior and exterior projects.'),

(4, 2, 'Epoxy Grout', 'epoxy-grout', 'Stain-Free 3-Component Impervious Tile Joint Epoxy Grout',
'Rockhold EPOXY GROUT is a high-performance two/three-component color-fast, chemical-resistant and stain-proof epoxy resin-based grout for heavy traffic areas.',
'Rockhold EPOXY GROUT is a two/three-component color-fast, stain and chemical resistance, hard wearing and impervious tile joint epoxy resin-based grout specifically designed for use in application of ceramic tiles, vitrified tiles, semi-vitrified tile, glass mosaic tiles, metal tiles. It effectively fills the gaps and levels itself to give a hard-wearing, dust & water proof tile joint.',
'3-Component Kit (Resin, Hardener & Pigmented Filler)', 'Depends on tile size & joint width (Approx 100–120 running ft/kg at 3mm)', '35–45 min Pot Life', '1 Hour Working Time', '35–45 min', '15.25 MPa', '50.45 MPa', '7.55 MPa', '0.9 : 0.1 (Resin to Hardener)', '6–7 Hours', '72 Hours (Heavy Traffic)', 'Available in Range of Premium Shades', '/images/products/epoxy-grout.png', '/datasheets/epoxy-grout-technical-data-sheet.pdf', TRUE, TRUE, 4, 'RockHold Stain-Free Epoxy Grout | High Strength Chemical Resistant Grout', 'RockHold 3-component stain-free epoxy grout for tile and stone joints. Impervious, acid-resistant, and high compressive strength for industrial and residential use.'),

(5, 2, 'Tile Grout', 'tile-grout', 'Water-Resistant Polymer-Modified Cementitious Tile Joint Grout',
'High-quality polymer-modified, water-resistant cement-based grout designed for grouting glazed wall tiles, porcelain, mosaic, and natural stones.',
'A high quality polymer-modified, water resistant, cement based grout designed for grouting glazed wall tiles, porcelain tiles, mosaic, vitrified & fully vitrified tiles, natural and engineered stones. Provides smooth, crack-resistant joints with excellent fungal resistance and color retention.',
'1 kg Pouch', 'Approx 40–50 sq. ft. per 1 kg pouch (tile size dependent)', '≥ 25 Min.', '≥ 30 Min.', '1.5 Hours', 'Min 0.5 MPa', '10.0 MPa', 'Min 0.8 MPa', 'Approx 300 ml water per 1 kg pouch', '4–5 Hours', '24 Hours', 'Available in a Range of Colours', '/images/products/tile-grout.png', '/datasheets/tile-grout-technical-data-sheet.pdf', FALSE, TRUE, 5, 'RockHold Tile Grout | Polymer-Modified Cementitious Joint Filler', 'RockHold water-resistant polymer-modified cementitious tile grout for wall and floor tiles, mosaics, and stone. Smooth finish with durable bond strength.'),

(6, 3, 'R01 Tile Cleaner', 'r01-tile-cleaner', 'Rapid Active Cleaner & Heavy-Duty Degreasing Solution',
'Strong performance rapid active cleaner and degreasing solution to remove cement residue, tough dirt, whitish bathroom scaling and mineral deposits.',
'R01 Tile cleaner is a strong performance rapid active cleaner and degreasing solution for use on tiles, bathtubs, washbasins, privy basins, concrete, etc. It is used to clean whitish spots/layers as normally observed in the bathroom under plastic/ metal buckets (normal detergent is not helpful) with ease.',
'1 Litre & 5 Litres', 'Approx 150–200 sq. ft. per Litre depending on dilution', NULL, NULL, NULL, NULL, NULL, NULL, 'Dilute 1:1 or 1:2 with water for regular cleaning', '5–10 Minutes Action Time', 'Immediate rinse', 'Greenish Liquid', '/images/products/r01-tile-cleaner.png', '/datasheets/r01-tile-cleaner-technical-data-sheet.pdf', TRUE, TRUE, 6, 'RockHold R01 Tile Cleaner | Heavy Duty Surface & Joint Cleaner', 'RockHold R01 Rapid Active Tile Cleaner removes white bucket stains, grout haze, efflorescence, and grease effortlessly. Safe on ceramics and porcelain.'),

(7, 3, 'Tap Cleaner', 'tap-cleaner', 'Non-Corrosive Hard Water Stain & Limescale Remover Spray',
'Advanced eco-friendly tap cleaner spray that removes hard water stains, calcium buildup, and limescale from bathroom fixtures without damaging chrome.',
'ROCKHOLD-powered tap cleaner removes hard water stains and limescale without corrosive chemicals. Ideal for Indian bathrooms, it keeps your fixtures gleaming and safe to touch. Formulated with organic descaling agents that restore factory shine to taps, showers, and fittings.',
'500 ml Trigger Spray Bottle', 'Covers up to 50–70 fittings per 500 ml bottle', NULL, NULL, NULL, NULL, NULL, NULL, 'Ready to use trigger spray', '2–3 Minutes dwell time', 'Rinse with clean water', 'Clear Liquid Spray', '/images/products/tap-cleaner.png', '/datasheets/tap-cleaner-technical-data-sheet.pdf', FALSE, TRUE, 7, 'RockHold Tap Cleaner | Eco-Friendly Hard Water & Limescale Remover', 'RockHold Tap Cleaner spray safely removes stubborn limescale, hard water stains, and soap scum from bathroom taps and chrome fittings.'),

(8, 4, 'R301 LW+ Waterproofing Compound', 'r301-lw-plus', 'Integral Liquid Waterproofing Compound for Concrete & Mortar',
'Specially formulated integral liquid waterproofing compound composed of surface-active plasticizing agents, polymers & additives for concrete, plaster & mortar.',
'Rockhold r301 lw plus is specially formulated integral liquid water proofing compound composed of surface active plasticising agents, polymers & additives. It is used as an additive for cement concrete, mortar & plasters. It makes concrete cohesive and prevents segregation.',
'200 ml, 1 L, 5 L, 10 L, 20 L & 100 Litres', '200 ml per 50 kg bag of cement', NULL, NULL, '3 Hours (in fresh mix)', NULL, 'Increases concrete compressive strength', 'Improves mortar bond', '200 ml per 50 kg cement bag', NULL, 'Normal concrete curing cycle', 'Dark Brown Free-Flowing Liquid', '/images/products/r301-lw-plus.png', '/datasheets/r301-lw-plus-technical-data-sheet.pdf', TRUE, TRUE, 8, 'RockHold R301 LW+ Integral Waterproofing Compound | Concrete Admixture', 'RockHold R301 LW+ integral liquid waterproofing compound for basements, roof slabs, screeds, water tanks, and exterior plastering. Prevents dampness and leaks.'),

(9, 4, 'R302 SBR', 'r302-sbr', 'Modified Styrene Butadiene Rubber Latex for Bonding & Waterproofing',
'High-performance modified Styrene Butadiene Rubber latex bonding agent and waterproofing polymer for concrete repair, screeds, and structural rehabilitation.',
'Rockhold R302 SBR is based on modified Styrene butadiene latex used for high performance applications in waterproofing and repairs. It is used for repairs of spalled concrete such as – floors, columns, beams, chhajjas, slabs & waterproofing of toilets & bathrooms & terraces. It bonds strongly to old & new concrete & plaster.',
'200 g, 500 g, 1 kg, 5 kg & 20 kg', 'Slurry: Approx 70–80 sq. ft./kg for 1 coat | Mortar: 5–7 kg per 50 kg cement', NULL, NULL, '30–45 min in mortar', 'Min 2.0 MPa (Flexural)', '30.0 MPa (Mortar)', 'Min 2.5 MPa to concrete', 'Bond Coat: 1:1.5 (SBR : Cement) | Mortar: 10% by cement wt', '45 Minutes', '24–48 Hours', 'Milky White Liquid', '/images/products/r302-sbr.png', '/datasheets/r302-sbr-technical-data-sheet.pdf', TRUE, TRUE, 9, 'RockHold R302 SBR Bonding Latex | Waterproofing & Structural Repair Polymer', 'RockHold R302 SBR styrene butadiene latex for spalled concrete repairs, bond coats, terrace waterproofing, and crack repairs. Superior adhesion.')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`), `tagline`=VALUES(`tagline`), `short_description`=VALUES(`short_description`), `description`=VALUES(`description`), `packaging_details`=VALUES(`packaging_details`), `coverage`=VALUES(`coverage`), `open_time`=VALUES(`open_time`), `adjustment_time`=VALUES(`adjustment_time`), `pot_life`=VALUES(`pot_life`), `tensile_strength`=VALUES(`tensile_strength`), `compressive_strength`=VALUES(`compressive_strength`), `bond_strength`=VALUES(`bond_strength`), `mixing_ratio`=VALUES(`mixing_ratio`), `tack_free_time`=VALUES(`tack_free_time`), `traffic_time`=VALUES(`traffic_time`), `colors`=VALUES(`colors`), `featured_image`=VALUES(`featured_image`), `is_featured`=VALUES(`is_featured`);

-- 4. Seed Product Images
INSERT INTO `product_images` (`product_id`, `image_url`, `alt_text`, `display_order`, `is_primary`) VALUES
(1, '/images/products/r-11-tile-adhesive.png', 'RockHold R-11 Type 1 Tile Adhesive 20kg Bag Pack', 1, TRUE),
(1, '/images/gallery/living-room-tiles.jpg', 'RockHold R-11 Ceramic Tile Flooring Application', 2, FALSE),
(2, '/images/products/r-21-tile-adhesive.png', 'RockHold R-21 Type 2 Tile Adhesive 20kg Bag Pack', 1, TRUE),
(2, '/images/gallery/outdoor-patio-tiles.jpg', 'RockHold R-21 Vitrified Tile on Patio Floor', 2, FALSE),
(3, '/images/products/r-51-tile-adhesive.png', 'RockHold R-51 Type 3 Tile Adhesive 20kg Bag Pack', 1, TRUE),
(3, '/images/gallery/luxury-interior-flooring.jpg', 'RockHold R-51 Large Format Porcelain Floor Installation', 2, FALSE),
(4, '/images/products/epoxy-grout.png', 'RockHold Epoxy Grout Stain-Free 3-Component Bucket', 1, TRUE),
(4, '/images/gallery/epoxy-living-room.jpg', 'RockHold Epoxy Grout Seamless Living Room Tile Joints', 2, FALSE),
(5, '/images/products/tile-grout.png', 'RockHold Cementitious Tile Grout 1kg Pouch', 1, TRUE),
(5, '/images/gallery/grouting-application.jpg', 'RockHold Tile Grouting Application with Rubber Float', 2, FALSE),
(6, '/images/products/r01-tile-cleaner.png', 'RockHold R01 Rapid Active Tile Cleaner Bottle', 1, TRUE),
(6, '/images/gallery/cleaner-application.jpg', 'RockHold R01 Tile Cleaner Removing Whitish Scaling', 2, FALSE),
(7, '/images/products/tap-cleaner.png', 'RockHold Tap Cleaner 500ml Spray Bottle', 1, TRUE),
(7, '/images/gallery/tap-cleaning-action.jpg', 'RockHold Tap Cleaner Removing Limescale from Chrome Faucet', 2, FALSE),
(8, '/images/products/r301-lw-plus.png', 'RockHold R301 LW+ Integral Liquid Waterproofing Jerrycan', 1, TRUE),
(8, '/images/gallery/concrete-waterproofing-application.jpg', 'RockHold R301 LW+ Concrete Pouring & Waterproofing Application', 2, FALSE),
(9, '/images/products/r302-sbr.png', 'RockHold R302 SBR Bonding Latex Jerrycan', 1, TRUE),
(9, '/images/gallery/rockhold-product-lineup.jpg', 'RockHold Comprehensive Construction Chemical Product Lineup', 2, FALSE);

-- 5. Seed Product Benefits
INSERT INTO `product_benefits` (`product_id`, `benefit`, `display_order`) VALUES
(1, 'Easy to use – Easily add water as per recommended W/P ratio on site and ready to use.', 1),
(1, 'Can be used in internal dry areas, for floor as well as wall application.', 2),
(1, 'Better adhesive bond strength & Bonds to various cement-based substrates.', 3),
(1, 'Self-curing properties requiring no external water curing.', 4),

(2, 'Easy to use - just add water on site, ready to use.', 1),
(2, 'Ideal product for tile-on-tile applications on existing floorings.', 2),
(2, 'Sag resistant formula: provides hassle-free application on vertical walls.', 3),
(2, 'Water resistant - suitable for interior and exterior wet areas.', 4),
(2, 'Good adhesive bond strength & bonds to various cement-based substrates.', 5),
(2, 'Low VOC formulation for healthy, odorless living environments.', 6),

(3, 'Easy to use – Easily add water as per recommended W/P ratio on site and ready to use.', 1),
(3, 'Can be used in internal and exterior shaded/exposed dry and wet areas for floor & wall.', 2),
(3, 'High polymer modification providing outstanding shear bond strength on non-porous tiles.', 3),
(3, 'Excellent slip resistance for heavy large format tiles and natural stone slabs.', 4),
(3, 'Accommodates thermal movement and structural vibrations in high footfall commercial zones.', 5),

(4, 'Prevents cracking in tile joints with flexible epoxy matrix.', 1),
(4, 'Stain & Acid Resistant Tile Joint Filler - immune to tea, coffee, wine, oils, and chemical spills.', 2),
(4, 'Waterproof Tile Joints - 100% impervious to moisture penetration.', 3),
(4, 'Easy to clean and maintain with standard cleaners.', 4),
(4, 'Highly durable and withstands heavy vehicular and pedestrian traffic.', 5),

(5, 'Good bond strength with cementitious tile bodies.', 1),
(5, 'Water resistant formula protects against dampness.', 2),
(5, 'Suitable for interior & exterior wall and floor joints.', 3),
(5, 'Non-shrinking, non-cracking uniform smooth finish.', 4),
(5, 'Available in diverse matching shades for seamless aesthetics.', 5),

(6, 'Just mix with water & clean the surface with sponge or brush.', 1),
(6, 'Removes difficult stains easily – fast, potent & effective.', 2),
(6, 'Degreases the tile surface easily for soaps, scum, efflorescence, and mineral deposits.', 3),
(6, 'Cleans all types of tile like ceramic, porcelain & vitrified tile and grout.', 4),
(6, 'Protects the color & natural shine of the tile without etching.', 5),

(7, 'Removes hard water stains and stubborn limescale instantly.', 1),
(7, 'Shine restoring formula that leaves metal fittings sparkling.', 2),
(7, 'Prevents future mineral scaling and water-spot buildup.', 3),
(7, 'Eco-friendly, non-corrosive formula safe for chrome, steel, and brass.', 4),

(8, 'Reduces permeability throughout concrete and plaster mass.', 1),
(8, 'Improves workability and cohesiveness without extra water.', 2),
(8, 'Prevents segregation and bleeding in fresh concrete mix.', 3),
(8, 'Protects reinforcing rebar steel from corrosion and rust attack.', 4),
(8, 'Significantly minimizes drying shrinkage cracks and efflorescence.', 5),

(9, 'Superb bonding strength to old concrete, brickwork, and steel reinforcement.', 1),
(9, 'Significantly enhances tensile and flexural strength of repair mortars.', 2),
(9, 'Excellent water resistance and protection against chemical and salt ingress.', 3),
(9, 'Reduces cracking, shrinkage, and dusting in screeds and patches.', 4),
(9, 'Ideal multi-purpose polymer for structural repair and waterproofing slurry.', 5);

-- 6. Seed Product Applications
INSERT INTO `product_applications` (`product_id`, `application`, `display_order`) VALUES
(1, 'Internal floor and wall ceramic tile installations', 1),
(1, 'Clay tiles and terracotta tile fixing', 2),
(1, 'Cementitious surfaces including cement plaster, screed, and concrete beds', 3),

(2, 'Vitrified tiles, ceramic tiles, and terracotta on floors and walls', 1),
(2, 'Tile-on-tile renovation over old ceramic or terrazzo surfaces', 2),
(2, 'Interlocking pavers, brick tiles, and glass tile fixing', 3),
(2, 'Internal and exterior wet zones like bathrooms, kitchens, and balconies', 4),

(3, 'Large format vitrified tiles and slim porcelain slabs', 1),
(3, 'Natural stone tiles including marble, granite, basalt, and slate', 2),
(3, 'Glass mosaic tiles in swimming pools, water bodies, and exterior facades', 3),
(3, 'Internal and external residential and heavy commercial projects', 4),

(4, 'Floor and wall tile joints in bathrooms, kitchens, and living rooms', 1),
(4, 'Terraces, balconies, and exterior patio tile joints', 2),
(4, 'Commercial kitchens, food processing plants, and restaurants', 3),
(4, 'Hospitals, laboratories, swimming pools, and industrial facilities', 4),

(5, 'Glazed ceramic wall tiles and vitrified floor tile joints up to 5 mm', 1),
(5, 'Mosaic tile and stone joints in dry and semi-wet internal areas', 2),
(5, 'Residential living rooms, bedrooms, and commercial corridors', 3),

(6, 'Bathroom floor and wall tile deep cleaning', 1),
(6, 'Removal of whitish bucket rings and mineral scum deposits', 2),
(6, 'Post-construction cleanup of cement haze and efflorescence', 3),
(6, 'Bathtubs, washbasins, privy basins, and glazed sanitaryware', 4),

(7, 'Bathroom chrome-plated taps, bib cocks, and shower heads', 1),
(7, 'Kitchen sinks, stainless steel faucets, and plumbing valves', 2),
(7, 'Glass shower partitions and mirror edge water stains', 3),

(8, 'Integral waterproofing for foundation concrete, basements, and retaining walls', 1),
(8, 'Roof slabs, parapets, and exterior wall plastering', 2),
(8, 'Overhead and underground water storage tanks and sumps', 3),
(8, 'Sunken floor slabs in bathrooms, wash areas, and balconies', 4),

(9, 'Bond coat for structural repairs of spalled concrete (beams, columns, slabs)', 1),
(9, 'Waterproofing slurry coating for terraces, sunken slabs, and bathrooms', 2),
(9, 'Polymer-modified repair mortar for structural rehabilitation and chhajjas', 3),
(9, 'Anti-corrosive primer coating for exposed rebar steel', 4),
(9, 'High-strength industrial floor screeds and tile bedding slurries', 5);

-- 7. Seed Product Specifications (Key/Value)
INSERT INTO `product_specifications` (`product_id`, `spec_key`, `spec_value`, `display_order`) VALUES
(1, 'Appearance', 'Free-flowing powder (Grey / White)', 1),
(1, 'Standard Compliance', 'IS 15477: 2019 Type 1', 2),
(1, 'Open Time', '≥ 20 Minutes', 3),
(1, 'Adjustment Time', '≥ 25 Minutes', 4),
(1, 'Tensile Adhesion Strength', '≥ 0.5 MPa @ 28 Days', 5),
(1, 'Pot Life', 'Approx 2 Hours @ 27°C', 6),
(1, 'Packaging', '20 kg moisture-resistant bag', 7),
(1, 'Coverage', '50–60 sq. ft. per 20 kg bag at 3mm bed thickness', 8),

(2, 'Appearance', 'Polymer powder (Grey / White)', 1),
(2, 'Standard Compliance', 'IS 15477: 2019 Type 2', 2),
(2, 'Open Time', '≥ 20 Minutes', 3),
(2, 'Adjustment Time', '≥ 25 Minutes', 4),
(2, 'Tensile Adhesion Strength', '≥ 0.5 MPa (Dry) & ≥ 0.5 MPa (Wet)', 5),
(2, 'Pot Life', 'Approx 2 Hours @ 27°C', 6),
(2, 'Tile-on-Tile Suitability', 'Yes (Floor & Wall)', 7),
(2, 'Packaging', '20 kg moisture-resistant bag', 8),

(3, 'Appearance', 'High-polymer powder (Grey / White)', 1),
(3, 'Standard Compliance', 'IS 15477: 2019 Type 3', 2),
(3, 'Open Time', '≥ 20 Minutes', 3),
(3, 'Adjustment Time', '≥ 25 Minutes', 4),
(3, 'Shear Adhesion Strength', '≥ 1.0 MPa @ 28 Days', 5),
(3, 'Pot Life', 'Approx 2 Hours @ 27°C', 6),
(3, 'Applications', 'Interior, Exterior, Dry, Wet, Facades', 7),
(3, 'Packaging', '20 kg moisture-resistant bag', 8),

(4, 'Base Resin', 'Epoxy Resin & Polyamide Hardener', 1),
(4, 'Mixing Ratio', '0.9 : 0.1 (Resin : Hardener)', 2),
(4, 'Pot Life', '35–45 Minutes @ 30°C', 3),
(4, 'Working Time', '1 Hour', 4),
(4, 'Tack Free Time', '6–7 Hours', 5),
(4, 'Full Cure / Heavy Traffic', '72 Hours', 6),
(4, 'Bond Strength', '7.55 MPa', 7),
(4, 'Compressive Strength', '50.45 MPa', 8),
(4, 'Tensile Strength', '15.25 MPa', 9),
(4, 'Chemical Resistance', 'Resistant to mild acids, alkalis, oils & detergents', 10),

(5, 'Base Material', 'Polymer-modified Portland Cement with additives', 1),
(5, 'Joint Width', '1 mm to 5 mm', 2),
(5, 'Pot Life', '1.5 Hours @ 27°C', 3),
(5, 'Compressive Strength', '≥ 10.0 MPa @ 28 Days', 4),
(5, 'Packaging', '1 kg Pouch', 5),
(5, 'Water Demand', 'Approx 280–320 ml per 1 kg pouch', 6),

(6, 'Form', 'Concentrated liquid', 1),
(6, 'Pack Sizes', '1 Litre and 5 Litres Jerrycan', 2),
(6, 'pH Level', 'Acidic formulation with surface active agents', 3),
(6, 'Dilution Ratio', '1:1 for severe stains; 1:2 to 1:4 for general cleaning', 4),
(6, 'Application', 'Apply, wait 3–5 min, scrub with nylon pad, rinse thoroughly', 5),

(7, 'Form', 'Ready-to-use liquid spray', 1),
(7, 'Pack Size', '500 ml bottle with ergonomic trigger spray', 2),
(7, 'Corrosiveness', 'Non-corrosive, safe on chrome plating and brass', 3),
(7, 'Action Time', '2 to 3 minutes dwell time before wiping', 4),
(7, 'Fragrance', 'Mild pleasant citrus aroma', 5),

(8, 'Form', 'Dark brown integral liquid', 1),
(8, 'Standard Compliance', 'IS 2645: 2003', 2),
(8, 'Dosage', '200 ml per 50 kg cement bag', 3),
(8, 'Chloride Content', 'Nil (Zero Chloride – 100% safe for steel reinforcement)', 4),
(8, 'Packaging', '200 ml, 1 L, 5 L, 10 L, 20 L & 100 Litres', 5),
(8, 'Specific Gravity', '1.05 ± 0.02 @ 27°C', 6),

(9, 'Polymer Base', 'Modified Styrene Butadiene Rubber (SBR) Latex', 1),
(9, 'Total Solid Content', 'Approx 38% – 42%', 2),
(9, 'Bond Strength', '≥ 2.5 MPa (Concrete failure mode)', 3),
(9, 'Dosage (Bond Coat)', '1 part SBR : 1.5 parts Cement by weight', 4),
(9, 'Dosage (Repair Mortar)', '10% – 15% SBR by weight of cement', 5),
(9, 'Packaging', '200 g, 500 g, 1 kg, 5 kg & 20 kg', 6);

-- 8. Seed Gallery Entries
INSERT INTO `gallery` (`title`, `description`, `category`, `image_url`, `display_order`, `is_active`) VALUES
('RockHold Complete Product Lineup', 'The full spectrum of RockHold high-performance tile adhesives, grouts, cleaners and waterproofing solutions.', 'products', '/images/gallery/rockhold-product-lineup.jpg', 1, TRUE),
('Premium Living Room Tiling', 'Modern geometrical vitrified tile flooring installed with RockHold R-11 tile adhesive.', 'applications', '/images/gallery/living-room-tiles.jpg', 2, TRUE),
('Outdoor Patio & Terrace Flooring', 'Heavy-duty weather-resistant tile installation using RockHold R-21 adhesive on outdoor patio.', 'projects', '/images/gallery/outdoor-patio-tiles.jpg', 3, TRUE),
('Luxury Interior Floor Tile Installation', 'Flawless large-format porcelain tile installation with RockHold R-51 adhesive in residential interior.', 'projects', '/images/gallery/luxury-interior-flooring.jpg', 4, TRUE),
('Epoxy Grout Stain-Free Joints', 'Precision colored tile joints with RockHold stain-free epoxy grout in contemporary lounge.', 'applications', '/images/gallery/epoxy-living-room.jpg', 5, TRUE),
('Tile Joint Grouting in Action', 'Professional application of RockHold tile grout using rubber float for smooth crack-free joint finish.', 'applications', '/images/gallery/grouting-application.jpg', 6, TRUE),
('R01 Active Tile Cleaning', 'Fast removal of tough scaling and mineral deposits on ceramic surfaces with RockHold R01 Cleaner.', 'applications', '/images/gallery/cleaner-application.jpg', 7, TRUE),
('Chrome Tap Descaling Action', 'Safe restoration of chrome fixtures and tap surfaces with RockHold non-corrosive tap cleaner.', 'applications', '/images/gallery/tap-cleaning-action.jpg', 8, TRUE),
('Structural Concrete Waterproofing', 'Ready-mix concrete placement enhanced with RockHold R301 LW+ integral waterproofing compound.', 'projects', '/images/gallery/concrete-waterproofing-application.jpg', 9, TRUE),
('R-11 Advanced Packaging 20kg', 'RockHold R-11 Type 1 moisture-sealed 20kg branded packaging.', 'packaging', '/images/products/r-11-tile-adhesive.png', 10, TRUE),
('R-21 High-Strength Packaging 20kg', 'RockHold R-21 Type 2 premium purple branded moisture-proof 20kg packaging.', 'packaging', '/images/products/r-21-tile-adhesive.png', 11, TRUE),
('R-51 Heavy-Duty Packaging 20kg', 'RockHold R-51 Type 3 industrial grade blue 20kg packaging.', 'packaging', '/images/products/r-51-tile-adhesive.png', 12, TRUE),
('Epoxy Grout 3-Component Container', 'Heavy-duty bucket pack for RockHold epoxy grout with resin, hardener, and colored filler.', 'packaging', '/images/products/epoxy-grout.png', 13, TRUE),
('R301 LW+ Ergonomic Jerrycan', 'Heavy-duty industrial jerrycan with safety handle for RockHold R301 LW+ liquid compound.', 'packaging', '/images/products/r301-lw-plus.png', 14, TRUE),
('R302 SBR Rubber Latex Jerrycan', 'Durable packaging for RockHold R302 SBR bonding latex with easy-pour spout.', 'packaging', '/images/products/r302-sbr.png', 15, TRUE);

-- 9. Seed Testimonials
INSERT INTO `testimonials` (`name`, `role_company`, `content`, `rating`, `image_url`, `is_featured`, `display_order`) VALUES
('Vikramaditya Rathore', 'Principal Architect, Rathore & Associates, Jaipur', 'We have specified RockHold R-51 and Epoxy Grout across multiple luxury villa projects in Rajasthan. The bonding strength, sag resistance, and color uniformity of their grouts are on par with international standards.', 5, '/images/testimonials/avatar-1.jpg', TRUE, 1),
('Sunil Sharma', 'Chief Project Engineer, Apex Infra Build, Churu', 'RockHold R301 LW+ and R302 SBR have become our default waterproofing specifications for roof slabs and basements. Excellent cohesion in concrete, zero segregation, and noticeable reduction in curing cracks.', 5, '/images/testimonials/avatar-2.jpg', TRUE, 2),
('Rajesh Pareek', 'Managing Director, Pareek Tile & Marble World, Sardarshahr', 'As a premier tile dealership, our customers demand adhesives that guarantee zero hollow sounds and zero debonding on large porcelain slabs. RockHold R-21 and R-51 have had a 100% positive feedback track record.', 5, '/images/testimonials/avatar-3.jpg', TRUE, 3),
('Dharmendra Jangid', 'Master Tile Contractor & Interior Specialist', 'The working time and open time of RockHold adhesives make life very easy on the job site. Even in hot summer conditions, it gives enough adjustment time and cures rock-solid. Best adhesive in this class.', 5, '/images/testimonials/avatar-4.jpg', TRUE, 4);

-- 10. Seed Website Settings
INSERT INTO `website_settings` (`setting_key`, `setting_value`, `setting_group`) VALUES
('company_name', 'RockHold', 'general'),
('brand_tagline', 'Strong Bonds. Superior Performance.', 'general'),
('brand_subheading', 'Premium Tile Adhesives & Construction Chemical Solutions', 'general'),
('contact_person', 'Manoj Prajapat', 'contact'),
('phone_number', '+91 90016 67917', 'contact'),
('whatsapp_number', '+919001667917', 'contact'),
('email_address', 'Manojsardarshar11@gmail.com', 'contact'),
('office_address', 'Shivani Bass, Ward No. 2, Sardarshahr, Rajasthan – 331403', 'contact'),
('manufacturer_name', 'Kritika Enterprises', 'manufacturer'),
('manufacturer_address', 'Khata No. 287, Khl. No. 662, Beekamsara, Churu, Rajasthan – 331403', 'manufacturer'),
('manufacturer_email', 'kritikaenterprises.sales@gmail.com', 'manufacturer'),
('iso_certification', 'ISO 9001:2015 Certified Company', 'general'),
('primary_color', '#10365B', 'design'),
('teal_color', '#00A9B7', 'design'),
('dark_navy_color', '#092B4C', 'design'),
('logo_url', '/images/logo/rockhold-logo-navy.png', 'design'),
('logo_mark_url', '/images/logo/rockhold-mark.png', 'design'),
('mascot_url', '/images/hero/crocodile-mascot.png', 'design'),
('facebook_url', 'https://facebook.com/rockholdchemicals', 'social'),
('instagram_url', 'https://instagram.com/rockholdchemicals', 'social'),
('linkedin_url', 'https://linkedin.com/company/rockhold-chemicals', 'social'),
('youtube_url', 'https://youtube.com/@rockholdchemicals', 'social'),
('footer_about_text', 'RockHold is a premier construction chemicals brand delivering high-performance tile adhesives, epoxy grouts, waterproofing compounds, and surface care solutions built for supreme endurance.', 'footer'),
('google_maps_embed', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14109.845347209647!2d74.4820846747683!3d28.43846614480749!2m3!1f0!2f0!3f0!3m2!1i1024!2f768!4f13.1!3m3!1m2!1s0x3914a1fca949a2a7%3A0xe54e19fb25265487!2sSardarshahr%2C%20Rajasthan%20331403!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin', 'contact'),
('hero_headline', 'Strong Bonds. Superior Performance.', 'home'),
('hero_subheadline', 'Engineered tile adhesives, impervious epoxy grouts, and advanced waterproofing compounds formulated for modern architectural resilience.', 'home'),
('hero_cta_primary_text', 'Explore Products', 'home'),
('hero_cta_secondary_text', 'Contact Us', 'home')
ON DUPLICATE KEY UPDATE `setting_value`=VALUES(`setting_value`);

-- 11. Seed SEO Pages
INSERT INTO `seo_pages` (`page_slug`, `page_name`, `meta_title`, `meta_description`, `keywords`, `canonical_url`, `og_image`) VALUES
('home', 'Home', 'RockHold | Premium Construction Chemicals & Tile Adhesives', 'RockHold is an ISO 9001:2015 certified manufacturer of premium tile adhesives, stain-free epoxy grouts, integral waterproofing compounds, and cleaners in Rajasthan.', 'rockhold, tile adhesive, epoxy grout, waterproofing chemicals, construction chemicals, tile cleaner, sbr latex, sardarshahr, churu', 'https://rockhold.in', '/images/gallery/rockhold-product-lineup.jpg'),
('about', 'About Us', 'About RockHold | ISO 9001:2015 Certified Construction Chemicals', 'Discover the story, mission, and quality standards behind RockHold and Kritika Enterprises. Learn how our polymer-modified chemicals set new standards in construction.', 'about rockhold, construction chemical manufacturer, kritika enterprises, manoj prajapat, tile adhesive factory, ISO 9001:2015', 'https://rockhold.in/about', '/images/gallery/rockhold-product-lineup.jpg'),
('products', 'Products', 'Products Range | RockHold Tile Adhesives, Grouts & Waterproofing', 'Explore the full range of RockHold construction chemicals: R-11, R-21, R-51 Tile Adhesives, Stain-Free Epoxy Grout, R01 Tile Cleaner, Tap Cleaner, and R301 LW+.', 'rockhold products, r11 tile adhesive, r21 adhesive, r51 adhesive, epoxy grout, r01 tile cleaner, r301 lw, r302 sbr', 'https://rockhold.in/products', '/images/gallery/rockhold-product-lineup.jpg'),
('gallery', 'Gallery', 'Project & Product Gallery | RockHold Construction Chemicals', 'View high-definition project photographs, packaging showcases, and practical application demonstrations of RockHold products across residential and commercial sites.', 'rockhold gallery, tile installation photos, epoxy grout application, construction site pictures', 'https://rockhold.in/gallery', '/images/gallery/living-room-tiles.jpg'),
('contact', 'Contact Us', 'Contact RockHold | Manoj Prajapat | Sardarshahr Rajasthan', 'Get in touch with RockHold for dealership enquiries, bulk orders, technical support, and architectural consultations in Sardarshahr, Churu, Rajasthan.', 'contact rockhold, manoj prajapat phone number, rockhold sardarshahr, tile adhesive dealership enquiry, kritika enterprises', 'https://rockhold.in/contact', '/images/gallery/rockhold-product-lineup.jpg')
ON DUPLICATE KEY UPDATE `meta_title`=VALUES(`meta_title`), `meta_description`=VALUES(`meta_description`);
