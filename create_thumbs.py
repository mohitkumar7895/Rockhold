from PIL import Image
import os

images = [
    "extracted_assets/images/extracted_img_p1_0_14.jpeg",
    "extracted_assets/images/extracted_img_p2_0_22.jpeg",
    "extracted_assets/images/extracted_img_p3_0_28.jpeg",
    "extracted_assets/images/extracted_img_p4_0_34.jpeg",
    "extracted_assets/images/extracted_img_p5_0_40.jpeg",
    "extracted_assets/images/extracted_img_p6_0_46.jpeg",
    "extracted_assets/images/extracted_img_p7_0_52.jpeg",
    "extracted_assets/images/extracted_img_p8_0_58.jpeg"
]

os.makedirs("extracted_assets/thumbs", exist_ok=True)
for i, img_path in enumerate(images):
    im = Image.open(img_path)
    im_thumb = im.resize((412, 550), Image.Resampling.LANCZOS)
    im_thumb.save(f"extracted_assets/thumbs/p{i+1}_thumb.jpg", quality=85)

print("Saved thumbnails.")
