import os
import sys
import json
import shutil
import subprocess
from pydub import AudioSegment

sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
from generate_insightful_score import generate_insightful_score

def mix_story_02():
    print("1. Generating insightful score...")
    generate_insightful_score(duration_sec=70)
    
    print("2. Loading scene voice files and timings...")
    GAP_MS = 300
    scene_data = []
    
    for sid in range(1, 8):
        mp3_path = f"voice/story_02/scene_{sid}.mp3"
        timing_path = f"voice/story_02/scene_{sid}.timings.json"
        
        seg = AudioSegment.from_file(mp3_path)
        with open(timing_path, "r", encoding="utf-8") as f:
            timings = json.load(f)
            
        scene_data.append({
            "id": sid,
            "seg": seg,
            "timings": timings
        })
        print(f"Loaded Scene {sid}: {len(seg)}ms ({len(timings['words'])} words)")
        
    print("3. Building concatenated voice track...")
    voice_track = AudioSegment.silent(duration=0)
    scene_offsets_ms = []
    
    for d in scene_data:
        scene_offsets_ms.append(len(voice_track))
        voice_track += d["seg"]
        voice_track += AudioSegment.silent(duration=GAP_MS)
        
    total_ms = len(voice_track)
    print(f"Total voice track: {total_ms}ms ({total_ms/1000:.2f}s)")
    
    print("4. Mixing background score at sober level (-21 dB)...")
    bgm_raw = AudioSegment.from_file("music/insightful_meditation.wav")
    if len(bgm_raw) < total_ms:
        reps = (total_ms // len(bgm_raw)) + 2
        bgm_raw = bgm_raw * reps
    bgm_trimmed = bgm_raw[:total_ms]
    
    # Sober background level (-21 dB relative to narration)
    bgm_sober = bgm_trimmed - 21
    # Smooth 4.5s fade out at the end
    bgm_mixed = bgm_sober.fade_out(4500)
    
    # Overlay voice over BGM
    final_raw = bgm_mixed.overlay(voice_track)
    os.makedirs("out", exist_ok=True)
    raw_path = "out/story_02_raw.wav"
    final_raw.export(raw_path, format="wav")
    print(f"Exported raw mixed audio -> {raw_path}")
    
    print("5. Normalizing loudness with ffmpeg loudnorm (EBU R128)...")
    norm_path = "out/story_02_final_audio.wav"
    subprocess.run([
        "ffmpeg", "-y", "-i", raw_path,
        "-af", "loudnorm=I=-14.5:TP=-1.5:LRA=11",
        "-ar", "44100", "-c:a", "pcm_s16le", norm_path
    ], check=True)
    
    os.makedirs("public", exist_ok=True)
    shutil.copy2(norm_path, "public/story_02_final_audio.wav")
    print(f"Copied final audio -> public/story_02_final_audio.wav")
    
    manifest = {
        "totalDurationMs": total_ms,
        "totalFrames": int(round(total_ms / 1000 * 30)),
        "fps": 30,
        "scenes": [
            {
                "id": d["id"],
                "startMs": scene_offsets_ms[i],
                "durationMs": len(d["seg"]),
                "startFrame": int(round(scene_offsets_ms[i] / 1000 * 30)),
                "durationFrames": int(round((len(d["seg"]) + GAP_MS) / 1000 * 30)),
                "words": d["timings"]["words"]
            }
            for i, d in enumerate(scene_data)
        ]
    }
    
    # Adjust last scene duration to match exactly totalFrames
    accum_frames = sum(s["durationFrames"] for s in manifest["scenes"][:-1])
    manifest["scenes"][-1]["durationFrames"] = manifest["totalFrames"] - accum_frames
    
    with open("voice/story_02_manifest.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"Saved manifest -> voice/story_02_manifest.json ({manifest['totalFrames']} frames, {manifest['totalDurationMs']/1000:.2f}s)")
    return manifest

if __name__ == "__main__":
    mix_story_02()
