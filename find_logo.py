from PIL import Image

im1 = Image.open("extracted_assets/images/extracted_img_p1_0_14.jpeg")
w, h = im1.size

# Let's crop several potential logo areas on cover:
# Top center
crop1 = im1.crop((int(w * 0.1), int(h * 0.05), int(w * 0.9), int(h * 0.35)))
crop1.save("extracted_assets/thumbs/p1_logo_candidate1.jpg")

# Center
crop2 = im1.crop((int(w * 0.1), int(h * 0.3), int(w * 0.9), int(h * 0.6)))
crop2.save("extracted_assets/thumbs/p1_center.jpg")

# Bottom
crop3 = im1.crop((int(w * 0.1), int(h * 0.6), int(w * 0.9), int(h * 0.95)))
crop3.save("extracted_assets/thumbs/p1_bottom_candidate.jpg")

print("Saved logo candidates.")
