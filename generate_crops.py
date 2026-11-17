from PIL import Image

# Let's inspect page 2 to 7
# We can slice each page into:
# 1. Header/Logo region
# 2. Product hero packshot region
# 3. Features & specs region

for p in range(1, 9):
    fname = f"extracted_assets/images/extracted_img_p{p}_0_{14 if p==1 else 22 if p==2 else 28 if p==3 else 34 if p==4 else 40 if p==5 else 46 if p==6 else 52 if p==7 else 58}.jpeg"
    im = Image.open(fname)
    w, h = im.size
    
    # Save top header (y: 0 to 450)
    im.crop((0, 0, w, 450)).save(f"extracted_assets/thumbs/p{p}_top.jpg")
    # Save middle left (x: 0 to w//2, y: 400 to 1400)
    im.crop((0, 400, w//2, 1400)).save(f"extracted_assets/thumbs/p{p}_mid_left.jpg")
    # Save middle right (x: w//2 to w, y: 400 to 1400)
    im.crop((w//2, 400, w, 1400)).save(f"extracted_assets/thumbs/p{p}_mid_right.jpg")
    # Save bottom (y: 1300 to h)
    im.crop((0, 1300, w, h)).save(f"extracted_assets/thumbs/p{p}_bottom.jpg")

print("Generated sliced inspection crops.")
