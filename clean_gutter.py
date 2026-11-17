from PIL import Image, ImageDraw

im = Image.open("public/images/products/r302-sbr.png").convert("RGB")
draw = ImageDraw.Draw(im)
draw.rectangle([0, 0, 70, im.height], fill=(255, 255, 255))
im.save("public/images/products/r302-sbr.png")
print("Cleaned left gutter x < 70 on r302-sbr.png")
