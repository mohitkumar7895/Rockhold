from PIL import Image, ImageDraw

def mask_text_precise(path):
    im = Image.open(path).convert("RGB")
    draw = ImageDraw.Draw(im)
    # x < 110, y < 200
    draw.rectangle([0, 0, 110, 200], fill=(255, 255, 255))
    # top right bleed dot
    draw.rectangle([340, 0, 390, 20], fill=(255, 255, 255))
    im.save(path)

mask_text_precise("public/images/products/r301-lw-plus.png")

def mask_sbr(path):
    im = Image.open(path).convert("RGB")
    draw = ImageDraw.Draw(im)
    draw.rectangle([0, 0, 110, 400], fill=(255, 255, 255))
    draw.rectangle([340, 0, 390, 20], fill=(255, 255, 255))
    im.save(path)

mask_sbr("public/images/products/r302-sbr.png")
print("Precise clean done!")
