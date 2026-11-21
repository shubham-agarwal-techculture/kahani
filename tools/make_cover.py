"""
tools/make_cover.py
Generates a polished 1080x1920 cover.jpg from out/cover.png,
adding a Madhubani-style title overlay band and IG-safe caption.
"""
from PIL import Image, ImageDraw
import os

src = "out/cover.png"
dst = "out/cover.jpg"

img = Image.open(src).convert("RGB")

draw = ImageDraw.Draw(img)
W, H = img.size

# --- Top title band (safe zone: top 160-350px) ---
band_top = 155
band_bot = 350
# Semi-transparent dark band
overlay = Image.new("RGBA", (W, band_bot - band_top), (24, 17, 14, 215))
img.paste(Image.new("RGB", (W, band_bot - band_top), (24, 17, 14)), (0, band_top), overlay)

draw = ImageDraw.Draw(img)

# Red border lines on band
draw.rectangle([0, band_top, W, band_top+5], fill="#D32F2F")
draw.rectangle([0, band_bot-5, W, band_bot], fill="#D32F2F")
draw.rectangle([0, band_top+10, W, band_top+13], fill="#FBC02D")

# Channel label
draw.text((W//2, band_top+42), "✦ KAHANI STUDIO ✦", fill="#FBC02D", anchor="mm")

# Devanagari title (large)
draw.text((W//2, band_top+88), "राम सेतु और नन्ही गिलहरी", fill="#FFF8E7", anchor="mm")

# --- Bottom caption band (safe zone: bottom 160-340px) ---
cap_top = H - 340
cap_bot = H - 165
overlay2 = Image.new("RGBA", (W, cap_bot - cap_top), (24, 17, 14, 200))
img.paste(Image.new("RGB", (W, cap_bot - cap_top), (24, 17, 14)), (0, cap_top), overlay2)

draw = ImageDraw.Draw(img)
draw.rectangle([0, cap_top, W, cap_top+4], fill="#D32F2F")
draw.rectangle([0, cap_bot-4, W, cap_bot], fill="#D32F2F")

draw.text((W//2, cap_top + (cap_bot-cap_top)//2 - 20),
          "क्या एक मुट्ठी-भर गिलहरी", fill="#FBC02D", anchor="mm")
draw.text((W//2, cap_top + (cap_bot-cap_top)//2 + 20),
          "पत्थर का पुल बना सकती है?", fill="#FFF8E7", anchor="mm")

# --- Outer decorative border ---
for offset, color in [(6, "#1A1A1A"), (12, "#D32F2F"), (18, "#1A1A1A")]:
    draw.rectangle([offset, offset, W-offset, H-offset], outline=color, width=3)

img.save(dst, quality=95)
print(f"Cover saved → {dst}  ({W}×{H})")

