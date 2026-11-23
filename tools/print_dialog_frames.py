import json

# Load SCENE_MANIFEST from src/RamSetuStoryWithAudio.tsx logic
# In RamSetuStoryWithAudio.tsx, we defined SCENE_MANIFEST with exact words and timings.
import re

with open('src/RamSetuStoryWithAudio.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# We can parse the SCENE_MANIFEST array
scene_matches = re.findall(r'id:\s*(\d+),\s*startMs:\s*(\d+),\s*durationMs:\s*(\d+),\s*startFrame:\s*(\d+),\s*durationFrames:\s*(\d+),\s*words:\s*\[(.*?)\]', content, re.DOTALL)

FPS = 30

for match in scene_matches:
    scene_id, start_ms, dur_ms, start_frame, dur_frames, words_raw = match
    scene_id = int(scene_id)
    start_frame = int(start_frame)
    start_ms = int(start_ms)
    
    word_matches = re.findall(r"\{\s*text:\s*'([^']+)',\s*startMs:\s*(\d+),\s*endMs:\s*(\d+)\s*\}", words_raw)
    print(f"\n### Scene {scene_id} (Frames {start_frame} - {start_frame + int(dur_frames)} | {start_ms/1000:.2f}s - {(start_ms + int(dur_ms))/1000:.2f}s)")
    print("| Word | Start (s) | End (s) | Frame Range (@30fps) | Duration (frames) |")
    print("| :--- | :--- | :--- | :--- | :--- |")
    for text, w_start_ms, w_end_ms in word_matches:
        w_start = int(w_start_ms)
        w_end = int(w_end_ms)
        # Global frame
        global_start_frame = start_frame + int(round((w_start / 1000) * FPS))
        global_end_frame = start_frame + int(round((w_end / 1000) * FPS))
        frame_dur = global_end_frame - global_start_frame
        
        global_start_s = (start_ms + w_start) / 1000
        global_end_s = (start_ms + w_end) / 1000
        print(f"| **{text}** | {global_start_s:.2f}s | {global_end_s:.2f}s | **Frame {global_start_frame} – {global_end_frame}** | {frame_dur}f ({w_end - w_start}ms) |")
