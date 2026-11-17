import os
import fitz # PyMuPDF

os.makedirs("public/datasheets", exist_ok=True)

products = [
    {
        "slug": "r-11-tile-adhesive",
        "title": "RockHold R-11 Tile Adhesive – Type 1",
        "code": "R-11 Type 1",
        "standard": "IS 15477: 2019 Type 1",
        "desc": "Polymer-modified cement-based powder tile adhesive for fixing ceramic and clay tiles on internal floors and walls.",
        "specs": [
            ("Appearance", "Grey / White Powder"),
            ("Open Time", "≥ 20 Minutes"),
            ("Adjustment Time", "≥ 25 Minutes"),
            ("Tensile Adhesion", "Min 0.5 MPa @ 28 Days"),
            ("Pot Life", "2 Hours @ 27°C"),
            ("Packaging", "20 kg Moisture-Resistant Bag"),
            ("Coverage", "Approx 50-60 sq. ft. at 3 mm thickness"),
            ("Water Demand", "5.0 - 5.5 Litres per 20 kg bag")
        ]
    },
    {
        "slug": "r-21-tile-adhesive",
        "title": "RockHold R-21 Tile Adhesive – Type 2",
        "code": "R-21 Type 2",
        "standard": "IS 15477: 2019 Type 2",
        "desc": "High-performance polymer-modified adhesive for vitrified tiles, terracotta, pavers, and tile-on-tile renovation.",
        "specs": [
            ("Appearance", "Grey / White Powder"),
            ("Open Time", "≥ 20 Minutes"),
            ("Adjustment Time", "≥ 25 Minutes"),
            ("Tensile Adhesion", "Min 0.5 MPa (Dry & Wet)"),
            ("Pot Life", "2 Hours @ 27°C"),
            ("Packaging", "20 kg Bag"),
            ("Coverage", "Approx 50-60 sq. ft. at 3 mm thickness"),
            ("Tile on Tile", "Yes (Interior / Exterior)")
        ]
    },
    {
        "slug": "r-51-tile-adhesive",
        "title": "RockHold R-51 Tile Adhesive – Type 3",
        "code": "R-51 Type 3",
        "standard": "IS 15477: 2019 Type 3",
        "desc": "Heavy-duty polymer-modified adhesive for large format vitrified tiles, glass mosaic, porcelain slabs, and natural stone.",
        "specs": [
            ("Appearance", "Grey / White Powder"),
            ("Open Time", "≥ 20 Minutes"),
            ("Adjustment Time", "≥ 25 Minutes"),
            ("Tensile Strength", "Min 1.0 MPa"),
            ("Compressive Strength", "18.0 MPa"),
            ("Pot Life", "2 Hours @ 27°C"),
            ("Packaging", "20 kg Bag"),
            ("Application", "Floors & Walls, Interior & Exterior")
        ]
    },
    {
        "slug": "epoxy-grout",
        "title": "RockHold Stain-Free Epoxy Grout",
        "code": "Epoxy Grout",
        "standard": "ISO 13007 RG / ANSI A118.3",
        "desc": "Stain-free 3-component impervious tile joint epoxy grout for high-traffic, chemical-resistant, and hygienic areas.",
        "specs": [
            ("Base Resin", "Epoxy Resin & Polyamide Hardener"),
            ("Mixing Ratio", "0.9 : 0.1 (Resin : Hardener)"),
            ("Pot Life", "35 - 45 Minutes"),
            ("Working Time", "1 Hour"),
            ("Tack Free Time", "6 - 7 Hours"),
            ("Heavy Traffic", "72 Hours"),
            ("Bond Strength", "7.55 MPa"),
            ("Compressive Strength", "50.45 MPa"),
            ("Tensile Strength", "15.25 MPa")
        ]
    },
    {
        "slug": "tile-grout",
        "title": "RockHold Cementitious Tile Grout",
        "code": "Tile Grout",
        "standard": "IS 15477: 2019",
        "desc": "Water-resistant polymer-modified cementitious tile joint grout for ceramic, porcelain, and stone tile joints.",
        "specs": [
            ("Base Material", "Polymer-modified cement"),
            ("Joint Width", "1 mm to 5 mm"),
            ("Pot Life", "1.5 Hours"),
            ("Packaging", "1 kg Pouch"),
            ("Water Demand", "Approx 300 ml per 1 kg pouch")
        ]
    },
    {
        "slug": "r01-tile-cleaner",
        "title": "RockHold R01 Rapid Active Tile Cleaner",
        "code": "R01 Tile Cleaner",
        "standard": "Quality Assured",
        "desc": "Rapid active cleaner and degreasing solution to remove tough whitish spots, bathroom scaling, and cement residue.",
        "specs": [
            ("Form", "Active concentrated liquid"),
            ("Pack Sizes", "1 Litre and 5 Litres"),
            ("Dilution", "1:1 for heavy stains; 1:2 to 1:4 general"),
            ("Action Time", "3 - 5 Minutes")
        ]
    },
    {
        "slug": "tap-cleaner",
        "title": "RockHold Eco-Friendly Tap Cleaner",
        "code": "Tap Cleaner",
        "standard": "Non-Corrosive Eco Formulated",
        "desc": "Removes hard water stains, calcium deposits, and limescale without damaging chrome or stainless steel fixtures.",
        "specs": [
            ("Form", "Trigger spray liquid"),
            ("Pack Size", "500 ml trigger bottle"),
            ("Corrosiveness", "Non-corrosive / safe on chrome"),
            ("Dwell Time", "2 to 3 minutes")
        ]
    },
    {
        "slug": "r301-lw-plus",
        "title": "RockHold R301 LW+ Integral Waterproofing Compound",
        "code": "R301 LW+",
        "standard": "IS 2645: 2003",
        "desc": "Integral liquid waterproofing compound for concrete and mortar that makes concrete cohesive and prevents segregation.",
        "specs": [
            ("Form", "Dark brown free-flowing liquid"),
            ("Dosage", "200 ml per 50 kg cement bag"),
            ("Chloride Content", "Nil (Zero Chloride)"),
            ("Packaging", "200 ml, 1 L, 5 L, 10 L, 20 L & 100 Litres")
        ]
    },
    {
        "slug": "r302-sbr",
        "title": "RockHold R302 SBR Bonding Latex",
        "code": "R302 SBR",
        "standard": "ASTM C 1059 Type II",
        "desc": "Modified styrene butadiene rubber latex used for waterproofing, structural concrete repair, bond coats, and spalled concrete.",
        "specs": [
            ("Polymer Base", "Modified SBR Latex"),
            ("Total Solids", "38% - 42%"),
            ("Bond Strength", "≥ 2.5 MPa to concrete"),
            ("Packaging", "200 g, 500 g, 1 kg, 5 kg & 20 kg")
        ]
    }
]

for prod in products:
    doc = fitz.open()
    page = doc.new_page(width=595, height=842) # A4
    
    # Header banner (Navy)
    navy_rect = fitz.Rect(0, 0, 595, 90)
    page.draw_rect(navy_rect, color=None, fill=(0.063, 0.212, 0.357)) # #10365B
    
    # Teal accent line
    teal_rect = fitz.Rect(0, 88, 595, 93)
    page.draw_rect(teal_rect, color=None, fill=(0.0, 0.663, 0.718)) # #00A9B7
    
    # Header Text
    page.insert_text(fitz.Point(40, 42), "ROCKHOLD", fontname="helv", fontsize=22, color=(1, 1, 1))
    page.insert_text(fitz.Point(40, 62), "PREMIUM CONSTRUCTION CHEMICALS | ISO 9001:2015 CERTIFIED", fontname="helv", fontsize=9, color=(0.8, 0.9, 0.95))
    page.insert_text(fitz.Point(420, 52), "TECHNICAL DATA SHEET", fontname="helv", fontsize=10, color=(1, 1, 1))
    
    # Title & Code
    y = 130
    page.insert_text(fitz.Point(40, y), prod["title"], fontname="helv", fontsize=18, color=(0.06, 0.21, 0.36))
    y += 20
    page.insert_text(fitz.Point(40, y), f"Product Standard: {prod['standard']}", fontname="helv", fontsize=10, color=(0.0, 0.66, 0.72))
    
    # Description
    y += 30
    page.insert_text(fitz.Point(40, y), "PRODUCT DESCRIPTION", fontname="helv", fontsize=12, color=(0.06, 0.21, 0.36))
    page.draw_line(fitz.Point(40, y + 4), fitz.Point(555, y + 4), color=(0.85, 0.88, 0.92))
    
    y += 24
    # Multiline desc
    rect_desc = fitz.Rect(40, y, 555, y + 60)
    page.insert_textbox(rect_desc, prod["desc"], fontname="helv", fontsize=10, color=(0.2, 0.25, 0.3))
    
    # Technical Specifications Table
    y += 70
    page.insert_text(fitz.Point(40, y), "TECHNICAL SPECIFICATIONS", fontname="helv", fontsize=12, color=(0.06, 0.21, 0.36))
    page.draw_line(fitz.Point(40, y + 4), fitz.Point(555, y + 4), color=(0.85, 0.88, 0.92))
    
    y += 18
    # Table header
    header_rect = fitz.Rect(40, y, 555, y + 22)
    page.draw_rect(header_rect, color=None, fill=(0.95, 0.97, 0.98))
    page.insert_text(fitz.Point(50, y + 15), "Property / Parameter", fontname="helv", fontsize=9, color=(0.1, 0.15, 0.2))
    page.insert_text(fitz.Point(300, y + 15), "Specification / Value", fontname="helv", fontsize=9, color=(0.1, 0.15, 0.2))
    
    y += 22
    for idx, (k, v) in enumerate(prod["specs"]):
        row_rect = fitz.Rect(40, y, 555, y + 22)
        if idx % 2 == 1:
            page.draw_rect(row_rect, color=None, fill=(0.98, 0.99, 1.0))
        page.draw_line(fitz.Point(40, y + 22), fitz.Point(555, y + 22), color=(0.9, 0.92, 0.95))
        page.insert_text(fitz.Point(50, y + 15), k, fontname="helv", fontsize=9, color=(0.2, 0.25, 0.3))
        page.insert_text(fitz.Point(300, y + 15), v, fontname="helv", fontsize=9, color=(0.06, 0.21, 0.36))
        y += 22
    
    # Footer
    footer_rect = fitz.Rect(0, 780, 595, 842)
    page.draw_rect(footer_rect, color=None, fill=(0.04, 0.17, 0.3))
    page.insert_text(fitz.Point(40, 804), "RockHold - Strong Bonds. Superior Performance.", fontname="helv", fontsize=10, color=(1, 1, 1))
    page.insert_text(fitz.Point(40, 822), "Contact: Manoj Prajapat | +91 90016 67917 | Manojsardarshar11@gmail.com | Sardarshahr, Rajasthan - 331403", fontname="helv", fontsize=8, color=(0.7, 0.8, 0.9))
    page.insert_text(fitz.Point(420, 822), "www.rockhold.in", fontname="helv", fontsize=9, color=(0.0, 0.8, 0.9))
    
    pdf_path = f"public/datasheets/{prod['slug']}-technical-data-sheet.pdf"
    doc.save(pdf_path)
    doc.close()

print("Generated 9 branded product datasheets!")
