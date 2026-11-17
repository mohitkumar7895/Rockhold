from PIL import Image

p7 = Image.open("extracted_assets/images/extracted_img_p7_0_52.jpeg")
# On page 7:
# Product 1: R301 LW+ jerrycan is on the right side:
# The yellow handle starts at y=360.
# The leftmost part of the handle is around x=1110.
# The rightmost part of the jerrycan is around x=1485.
# The top is at y=350.
# The bottom is at y=1130.

im_lw = p7.crop((1100, 350, 1490, 1130))
im_lw.save("public/images/products/r301-lw-plus.png")

# Product 2: R302 SBR jerrycan:
# Top is around y=1220.
# Bottom is around y=2000.
im_sbr = p7.crop((1100, 1220, 1490, 2000))
im_sbr.save("public/images/products/r302-sbr.png")

print("Saved clean jerrycans without masks.")
