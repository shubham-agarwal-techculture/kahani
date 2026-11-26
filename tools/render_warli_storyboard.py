import os
import subprocess
from PIL import Image, ImageDraw, ImageFont

os.makedirs("out/storyboard_warli", exist_ok=True)

scenes = [
    ("WarliScene1", "out/storyboard_warli/scene-1.png", "Scene 1: Sawaal - Mann Ka Bhojh"),
    ("WarliScene2", "out/storyboard_warli/scene-2.png", "Scene 2: Prishthbhoomi - Do Bhikshu"),
    ("WarliScene3", "out/storyboard_warli/scene-3.png", "Scene 3: Nadi Kinare Yuvati"),
    ("WarliScene4", "out/storyboard_warli/scene-4.png", "Scene 4: Nadi Paar Karana"),
    ("WarliScene5", "out/storyboard_warli/scene-5.png", "Scene 5: Chhote Bhikshu Ka Gussa"),
    ("WarliScene6", "out/storyboard_warli/scene-6.png", "Scene 6: Aarop Aur Prashna"),
    ("WarliScene7", "out/storyboard_warli/scene-7.png", "Scene 7: Bada Bodh - Chhod Do"),
]

# 1. Render each still
for comp, out_png, title in scenes:
    print(f"Rendering still for {comp} -> {out_png}...")
    cmd = ["npx", "remotion", "still", comp, out_png, "--frame=90", "--overwrite"]
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error rendering {comp}: {res.stderr}")
    else:
        print(f"Rendered {out_png}")

# 2. Composite side-by-side into out/storyboard_warli.jpg
target_w = 480
target_h = 853  # ~9:16 ratio (1080x1920 scaled)
padding = 24
header_h = 65
footer_h = 45
gap = 18

num_panels = len(scenes)
total_w = padding * 2 + num_panels * target_w + (num_panels - 1) * gap
total_h = padding * 2 + header_h + target_h + footer_h

# Canvas with authentic Warli terracotta clay background (#7D2D20)
canvas = Image.new("RGB", (total_w, total_h), color=(125, 45, 32))
draw = ImageDraw.Draw(canvas)

# Decorative Warli style border on the canvas
draw.rectangle([8, 8, total_w - 9, total_h - 9], outline=(251, 248, 238), width=3)
draw.rectangle([14, 14, total_w - 15, total_h - 15], outline=(230, 167, 66), width=2)

# Title Header
title_text = "DO BHIKSHU AUR BEHTI NADI — WARLI TRIBAL STORYBOARD (7 SCENES)"
draw.text((total_w // 2, padding + 20), title_text, fill=(251, 248, 238), anchor="mm")

for i, (comp, img_path, desc) in enumerate(scenes):
    if not os.path.exists(img_path):
        print(f"Warning: {img_path} not found!")
        continue

    img = Image.open(img_path).convert("RGB")
    resized = img.resize((target_w, target_h), Image.Resampling.LANCZOS)

    x = padding + i * (target_w + gap)
    y = padding + header_h

    # Paste panel
    canvas.paste(resized, (x, y))

    # Border around each panel
    draw.rectangle([x - 2, y - 2, x + target_w + 1, y + target_h + 1], outline=(251, 248, 238), width=2)
    draw.rectangle([x - 5, y - 5, x + target_w + 4, y + target_h + 4], outline=(84, 30, 21), width=1)

    # Scene label below panel
    draw.text((x + target_w // 2, y + target_h + 16), f"Scene {i+1}", fill=(240, 200, 80), anchor="mm")
    draw.text((x + target_w // 2, y + target_h + 32), desc, fill=(251, 248, 238), anchor="mm")

out_jpg = "out/storyboard_warli.jpg"
canvas.save(out_jpg, quality=95)
print(f"\nStoryboard saved successfully to {out_jpg} ({total_w}x{total_h})")
