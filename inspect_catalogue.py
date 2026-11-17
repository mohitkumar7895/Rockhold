import fitz # PyMuPDF
import os
import json

doc = fitz.open("rockhold-catalogue.pdf")
print("Total pages:", len(doc))

out_pages_dir = "extracted_assets/pages"
out_img_dir = "extracted_assets/images"
os.makedirs(out_pages_dir, exist_ok=True)
os.makedirs(out_img_dir, exist_ok=True)

catalogue_data = []

img_counter = 0

for i, page in enumerate(doc):
    text = page.get_text()
    # Save high-res page image
    pix = page.get_pixmap(dpi=150)
    page_img_path = f"{out_pages_dir}/page_{i+1}.png"
    pix.save(page_img_path)
    
    # Extract embedded images
    page_images = []
    for img_index, img in enumerate(page.get_images(full=True)):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        img_filename = f"extracted_img_p{i+1}_{img_index}_{xref}.{image_ext}"
        img_save_path = f"{out_img_dir}/{img_filename}"
        with open(img_save_path, "wb") as f:
            f.write(image_bytes)
        page_images.append({
            "filename": img_filename,
            "width": base_image["width"],
            "height": base_image["height"],
            "ext": image_ext
        })
        img_counter += 1

    catalogue_data.append({
        "page": i + 1,
        "text": text,
        "page_image": page_img_path,
        "images": page_images
    })

with open("extracted_assets/catalogue_data.json", "w", encoding="utf-8") as f:
    json.dump(catalogue_data, f, indent=2, ensure_ascii=False)

print(f"Extracted {len(doc)} pages and {img_counter} images.")
