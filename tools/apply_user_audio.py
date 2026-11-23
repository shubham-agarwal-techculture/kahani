import shutil
import os
import json
import numpy as np
from pydub import AudioSegment
from faster_whisper import WhisperModel

USER_MEDIA_DIR = r"C:/Users/Pc/.gemini/antigravity/brain/e308d87a-38ff-4465-83e0-5ff0ac89f337/.user_uploaded"

MAPPING = {
    1: "uploaded_media_6_1795430794926.mp3",
    2: "uploaded_media_5_1795430794926.mp3",
    3: "uploaded_media_4_1795430794926.mp3",
    4: "uploaded_media_3_1795430794926.mp3",
    5: "uploaded_media_2_1795430794926.mp3",
    6: "uploaded_media_1_1795430794926.mp3",
    7: "uploaded_media_0_1795430794926.mp3"
}

# 1. Copy user files into voice/scene_N.mp3
for scene_id, src_name in MAPPING.items():
    src_path = os.path.join(USER_MEDIA_DIR, src_name)
    dst_path = f"voice/scene_{scene_id}.mp3"
    shutil.copy2(src_path, dst_path)
    print(f"Copied {src_name} -> {dst_path}")

# 2. Extract word timings using faster-whisper
print("\nExtracting precise word timings...")
model = WhisperModel("base", device="cpu", compute_type="int8")

scene_words = {}
for scene_id in range(1, 8):
    mp3 = f"voice/scene_{scene_id}.mp3"
    tfile = f"voice/scene_{scene_id}.timings.json"
    seg = AudioSegment.from_file(mp3).set_frame_rate(16000).set_channels(1)
    audio = np.array(seg.get_array_of_samples(), dtype=np.float32) / 32768.0
    segs, info = model.transcribe(audio, word_timestamps=True, language="hi")
    
    words = []
    for s in segs:
        for w in (s.words or []):
            t = w.word.strip()
            if t:
                words.append({
                    "text": t,
                    "start": round(w.start, 3),
                    "end": round(w.end, 3),
                    "startMs": int(round(w.start * 1000)),
                    "endMs": int(round(w.end * 1000))
                })
    
    result = {
        "scene": scene_id,
        "audio": mp3,
        "durationMs": int(round(info.duration * 1000)),
        "words": words
    }
    with open(tfile, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    print(f"Scene {scene_id}: {len(words)} words ({info.duration:.2f}s)")
    scene_words[scene_id] = result

print("Word extraction complete!")
