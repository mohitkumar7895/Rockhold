from PIL import Image, ImageDraw

def clean_edges(img_path, left_bleed_w, top_bleed_h):
    im = Image.open(img_path).convert("RGB")
    draw = ImageDraw.Draw(im)
    # Fill white over stray brochure text on top-left
    draw.rectangle([0, 0, left_bleed_w, top_bleed_h], fill=(255, 255, 255))
    im.save(img_path)

clean_edges("public/images/products/r301-lw-plus.png", 30, 240)
clean_edges("public/images/products/r302-sbr.png", 35, 300)
print("Cleaned edge bleeds on jerrycans.")
