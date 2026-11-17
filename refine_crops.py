from PIL import Image

p6 = Image.open("extracted_assets/images/extracted_img_p6_0_46.jpeg")
p7 = Image.open("extracted_assets/images/extracted_img_p7_0_52.jpeg")

# Tap cleaner: capture full bottle down to shelf
tap_cleaner = p6.crop((1230, 1460, 1515, 1950))
tap_cleaner.save("public/images/products/tap-cleaner.png")

# R301 LW+: start x from 1095 to avoid left text, y from 350 to 1130
r301_lw = p7.crop((1095, 350, 1500, 1130))
r301_lw.save("public/images/products/r301-lw-plus.png")

# R302 SBR: start x from 1095 to avoid left text, y from 1220 to 2010
r302_sbr = p7.crop((1095, 1220, 1500, 2010))
r302_sbr.save("public/images/products/r302-sbr.png")

print("Refined tap cleaner, r301-lw-plus and r302-sbr crops.")
