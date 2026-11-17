import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs("public/images/testimonials", exist_ok=True)

avatars = [
    ("avatar-1.jpg", "VR", (16, 54, 91), (255, 255, 255)), # Vikramaditya Rathore
    ("avatar-2.jpg", "SS", (0, 169, 183), (255, 255, 255)), # Sunil Sharma
    ("avatar-3.jpg", "RP", (9, 43, 76), (255, 255, 255)), # Rajesh Pareek
    ("avatar-4.jpg", "DJ", (16, 54, 91), (255, 255, 255)), # Dharmendra Jangid
]

for filename, initials, bg, fg in avatars:
    im = Image.new("RGB", (200, 200), color=bg)
    draw = ImageDraw.Draw(im)
    # Draw subtle gradient circle
    draw.ellipse([10, 10, 190, 190], outline=(255, 255, 255, 80), width=3)
    # Draw simple initials
    # Since default font might not have sizing, let's draw decorative monogram
    draw.text((75, 85), initials, fill=fg)
    im.save(f"public/images/testimonials/{filename}", quality=95)

print("Saved testimonial avatars.")
