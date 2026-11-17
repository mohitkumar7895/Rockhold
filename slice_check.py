from PIL import Image

# Let's inspect page 1 (cover) to get the logo:
im1 = Image.open("extracted_assets/images/extracted_img_p1_0_14.jpeg")
w, h = im1.size

# In brochures, logo is typically top or center of cover
# Let's crop top half and center
logo_crop = im1.crop((0, 0, w, int(h * 0.45)))
logo_crop.save("extracted_assets/p1_top.jpg")

# Let's crop each page to save a high quality overview and identify each product
for p in range(1, 9):
    im = Image.open(f"extracted_assets/images/extracted_img_p{p}_0_{14 if p==1 else 22 if p==2 else 28 if p==3 else 34 if p==4 else 40 if p==5 else 46 if p==6 else 52 if p==7 else 58}.jpeg")
    # Save a clean preview
    im.resize((825, 1100)).save(f"extracted_assets/page_{p}_preview.jpg", quality=90)

print("Saved preview images for all 8 pages.")
