import os
from PIL import Image, ImageDraw, ImageFont

def make_warli_cover():
    os.makedirs("out", exist_ok=True)
    # Use Scene 7 still as the base if present, else Scene 1
    base_path = "out/storyboard_warli/scene-7.png"
    if not os.path.exists(base_path):
        base_path = "out/storyboard_warli/scene-1.png"
        
    img = Image.open(base_path).convert("RGB")
    draw = ImageDraw.Draw(img)
    w, h = img.size
    
    # Try finding an Indian/Devanagari font or fall back to system font
    font_candidates = [
        "C:/Windows/Fonts/mangal.ttf",
        "C:/Windows/Fonts/aparaj.ttf",
        "C:/Windows/Fonts/Nirmala.ttf",
        "C:/Windows/Fonts/seguiemj.ttf",
        "C:/Windows/Fonts/arial.ttf"
    ]
    font_title = None
    font_sub = None
    for f in font_candidates:
        if os.path.exists(f):
            try:
                font_title = ImageFont.truetype(f, 62)
                font_sub = ImageFont.truetype(f, 34)
                break
            except Exception:
                continue
                
    if not font_title:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    # Draw semi-transparent header banner
    # Instagram safe area: 240px - 440px
    banner_y1 = 230
    banner_y2 = 460
    draw.rectangle([60, banner_y1, w - 60, banner_y2], fill=(42, 14, 10), outline=(251, 248, 238), width=3)
    
    title_text = "दो भिक्षु और बहती नदी"
    sub_text = "✦ मन का बोझ छोड़ना सीखो ✦"
    
    draw.text((w // 2, banner_y1 + 45), title_text, fill=(251, 248, 238), font=font_title, anchor="mm")
    draw.text((w // 2, banner_y1 + 140), sub_text, fill=(255, 224, 130), font=font_sub, anchor="mm")
    
    # Save as high-quality cover
    out_path = "out/do-bhikshu-cover.jpg"
    img.save(out_path, "JPEG", quality=92)
    print(f"Cover created -> {out_path}")

if __name__ == "__main__":
    make_warli_cover()
