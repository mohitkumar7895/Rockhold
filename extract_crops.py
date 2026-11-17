import os
from PIL import Image

os.makedirs("public/images/products", exist_ok=True)
os.makedirs("public/images/logo", exist_ok=True)
os.makedirs("public/images/gallery", exist_ok=True)
os.makedirs("public/images/hero", exist_ok=True)

# Load full res pages
p1 = Image.open("extracted_assets/images/extracted_img_p1_0_14.jpeg") # 1650 x 2200
p2 = Image.open("extracted_assets/images/extracted_img_p2_0_22.jpeg") # 1651 x 2201
p3 = Image.open("extracted_assets/images/extracted_img_p3_0_28.jpeg") # 1651 x 2201
p4 = Image.open("extracted_assets/images/extracted_img_p4_0_34.jpeg") # 1651 x 2201
p5 = Image.open("extracted_assets/images/extracted_img_p5_0_40.jpeg") # 1651 x 2201
p6 = Image.open("extracted_assets/images/extracted_img_p6_0_46.jpeg") # 1651 x 2201
p7 = Image.open("extracted_assets/images/extracted_img_p7_0_52.jpeg") # 1651 x 2201
p8 = Image.open("extracted_assets/images/extracted_img_p8_0_58.jpeg") # 1650 x 2200

# 1. RockHold Logo (from P1: x: 300 to 1350, y: 100 to 520)
logo = p1.crop((300, 100, 1350, 520))
logo.save("public/images/logo/rockhold-logo-navy.png")

# Also let's extract the clean logo mark (the R symbol)
logo_mark = p1.crop((680, 110, 970, 310))
logo_mark.save("public/images/logo/rockhold-mark.png")

# 2. Crocodile Mascot (P1: x: 50 to 550, y: 1400 to 2070)
mascot = p1.crop((50, 1400, 560, 2070))
mascot.save("public/images/hero/crocodile-mascot.png")

# 3. Living Room Hero / Circular Interior (P1: x: 440 to 1250, y: 780 to 1580)
interior_hero = p1.crop((440, 780, 1250, 1580))
interior_hero.save("public/images/gallery/living-room-tiles.jpg")

# 4. R-11 Product Pack (P2: x: 170 to 920, y: 1070 to 1930)
r11 = p2.crop((170, 1070, 920, 1930))
r11.save("public/images/products/r-11-tile-adhesive.png")

# 5. R-21 Product Pack (P3: x: 860 to 1600, y: 590 to 1450)
r21 = p3.crop((860, 590, 1600, 1450))
r21.save("public/images/products/r-21-tile-adhesive.png")

# Outdoor patio background from P3 (x: 230 to 950, y: 640 to 1350)
patio = p3.crop((230, 640, 950, 1350))
patio.save("public/images/gallery/outdoor-patio-tiles.jpg")

# 6. R-51 Product Pack (P4: x: 170 to 920, y: 1070 to 1930)
r51 = p4.crop((170, 1070, 920, 1930))
r51.save("public/images/products/r-51-tile-adhesive.png")

# 7. Epoxy Grout Bucket (P5: x: 180 to 860, y: 1180 to 1830)
epoxy_grout = p5.crop((180, 1180, 860, 1830))
epoxy_grout.save("public/images/products/epoxy-grout.png")

# Living room with armchair (P5: x: 740 to 1450, y: 1080 to 1420)
epoxy_living = p5.crop((740, 1080, 1450, 1420))
epoxy_living.save("public/images/gallery/epoxy-living-room.jpg")

# 8. Tile Grout Pouch (P6: x: 1250 to 1570, y: 90 to 570)
tile_grout = p6.crop((1250, 90, 1570, 570))
tile_grout.save("public/images/products/tile-grout.png")

# Grouting application spatula (P6: x: 880 to 1250, y: 100 to 570)
grouting_action = p6.crop((880, 100, 1250, 570))
grouting_action.save("public/images/gallery/grouting-application.jpg")

# 9. R01 Tile Cleaner Bottle (P6: x: 1260 to 1560, y: 770 to 1270)
tile_cleaner = p6.crop((1260, 770, 1560, 1270))
tile_cleaner.save("public/images/products/r01-tile-cleaner.png")

# Tile cleaner application (P6: x: 1040 to 1290, y: 920 to 1200)
cleaner_action = p6.crop((1040, 920, 1290, 1200))
cleaner_action.save("public/images/gallery/cleaner-application.jpg")

# 10. Tap Cleaner Spray Bottle (P6: x: 1240 to 1500, y: 1470 to 1910)
tap_cleaner = p6.crop((1240, 1470, 1500, 1910))
tap_cleaner.save("public/images/products/tap-cleaner.png")

# Tap cleaner application (P6: x: 1030 to 1280, y: 1600 to 1890)
tap_action = p6.crop((1030, 1600, 1280, 1890))
tap_action.save("public/images/gallery/tap-cleaning-action.jpg")

# 11. R301 LW+ Jerrycan (P7: x: 1070 to 1500, y: 350 to 1130)
r301_lw = p7.crop((1070, 350, 1500, 1130))
r301_lw.save("public/images/products/r301-lw-plus.png")

# Cement mixer truck & concrete pouring (P7: x: 110 to 760, y: 690 to 1200)
concrete_action = p7.crop((110, 690, 760, 1200))
concrete_action.save("public/images/gallery/concrete-waterproofing-application.jpg")

# 12. R302 SBR Jerrycan (P7: x: 1070 to 1500, y: 1230 to 2010)
r302_sbr = p7.crop((1070, 1230, 1500, 2010))
r302_sbr.save("public/images/products/r302-sbr.png")

# 13. Full Product Lineup Range (P8: x: 70 to 1600, y: 1130 to 1980)
lineup = p8.crop((70, 1130, 1600, 1980))
lineup.save("public/images/gallery/rockhold-product-lineup.jpg")

# Living Room sofa hero (P8: x: 1000 to 1640, y: 0 to 800)
sofa_interior = p8.crop((1000, 0, 1640, 800))
sofa_interior.save("public/images/gallery/luxury-interior-flooring.jpg")

print("Successfully cropped and saved all 19 assets!")
