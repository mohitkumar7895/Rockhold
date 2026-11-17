from PIL import Image

p7 = Image.open("extracted_assets/images/extracted_img_p7_0_52.jpeg")
# Let's inspect where R302 SBR is
# Jerrycan x: from 1060 to 1490
# y: from 1230 to 2010
im_sbr = p7.crop((1060, 1225, 1495, 2010))
im_sbr.save("public/images/products/r302-sbr.png")
print("Re-cropped r302-sbr.png from original p7.")
