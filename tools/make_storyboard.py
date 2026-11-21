import os
from PIL import Image, ImageDraw, ImageFont

def make_storyboard():
    scenes = [
        ("Scene 1", "Question: Gilhari ki 3 dharrian?", "out/storyboard/scene-1.png"),
        ("Scene 2", "Setting: Ram Setu nirman", "out/storyboard/scene-2.png"),
        ("Scene 3", "Problem: Vanaron ki hansi", "out/storyboard/scene-3.png"),
        ("Scene 4", "Turn: Ret me lotna", "out/storyboard/scene-4.png"),
        ("Scene 5", "Choice: Chhote kadam, bada sankalp", "out/storyboard/scene-5.png"),
        ("Scene 6", "Answer: Shri Ram ka aashirvaad", "out/storyboard/scene-6.png"),
        ("Scene 7", "Next Part: Teesri dharri ka rahasya", "out/storyboard/scene-7.png"),
    ]

    target_w = 480
    target_h = 853  # ~16:9 ratio (1080x1920 scaled)
    padding = 20
    header_h = 60
    footer_h = 40
    gap = 16

    num_panels = len(scenes)
    total_w = padding * 2 + num_panels * target_w + (num_panels - 1) * gap
    total_h = padding * 2 + header_h + target_h + footer_h

    # Create canvas with traditional Madhubani deep madder/charcoal background (#18110e)
    canvas = Image.new("RGB", (total_w, total_h), color=(24, 17, 14))
    draw = ImageDraw.Draw(canvas)

    # Outer decorative double border
    draw.rectangle([6, 6, total_w - 7, total_h - 7], outline=(220, 168, 60), width=3)
    draw.rectangle([12, 12, total_w - 13, total_h - 13], outline=(180, 50, 40), width=2)

    # Title header
    title_text = "RAM SETU AUR CHHOTI GILHARI — MADHUBANI STORYBOARD (7 BEATS)"
    draw.text((total_w // 2, padding + 15), title_text, fill=(245, 235, 215), anchor="mm")

    for i, (label, desc, img_path) in enumerate(scenes):
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
        draw.rectangle([x - 2, y - 2, x + target_w + 1, y + target_h + 1], outline=(220, 168, 60), width=2)
        draw.rectangle([x - 5, y - 5, x + target_w + 4, y + target_h + 4], outline=(180, 50, 40), width=1)

        # Scene label below panel
        draw.text((x + target_w // 2, y + target_h + 15), label, fill=(240, 200, 80), anchor="mm")
        draw.text((x + target_w // 2, y + target_h + 30), desc, fill=(220, 215, 200), anchor="mm")

    out_path = "out/storyboard.jpg"
    canvas.save(out_path, quality=95)
    print(f"Storyboard saved successfully to {out_path} ({total_w}x{total_h})")

if __name__ == "__main__":
    make_storyboard()

