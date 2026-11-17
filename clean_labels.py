from PIL import Image, ImageDraw

def mask_text(path, rects):
    im = Image.open(path).convert("RGB")
    draw = ImageDraw.Draw(im)
    for r in rects:
        draw.rectangle(r, fill=(255, 255, 255))
    im.save(path)

# r301-lw-plus.png
mask_text("public/images/products/r301-lw-plus.png", [
    (0, 0, 130, 250),
    (310, 0, 405, 40)
])

# r302-sbr.png
mask_text("public/images/products/r302-sbr.png", [
    (0, 0, 140, 600),
    (310, 0, 405, 50)
])

print("Cleaned!")
