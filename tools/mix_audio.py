"""
tools/mix_audio.py
Assembles final audio mix:
 - Voice clips for each scene, back-to-back (MP3 → WAV)
 - Tanpura BGM under the voice at -10 dB relative, fade out last 4 s
 - Saves voice/full_voice.wav, music/bgm_mixed.wav, and out/final_audio_raw.wav
 - Runs ffmpeg loudnorm pass to reach -14 LUFS → out/final_audio.wav
 - Reports scene start times (ms) for Remotion syncing
"""
import json, os, subprocess, numpy as np
from pathlib import Path
from pydub import AudioSegment, effects

SR = 44100

# ── 1. Collect scene durations from timings ───────────────────────────────
scene_data = []
for i in range(1, 8):
    mp3 = f"voice/scene_{i}.mp3"
    tfile = f"voice/scene_{i}.timings.json"
    seg = AudioSegment.from_file(mp3)
    with open(tfile, encoding="utf-8") as f:
        timings = json.load(f)
    scene_data.append({"id": i, "seg": seg, "timings": timings})

# ── 2. Build full voice track (scenes concatenated, 300 ms gap between) ───
GAP_MS = 300
voice_track = AudioSegment.silent(duration=0)
scene_offsets_ms = []   # start time of each scene voice within full track

for d in scene_data:
    scene_offsets_ms.append(len(voice_track))
    voice_track += d["seg"]
    voice_track += AudioSegment.silent(duration=GAP_MS)

total_ms = len(voice_track)
print(f"Full voice track: {total_ms} ms  ({total_ms/1000:.2f} s)")
for i, off in enumerate(scene_offsets_ms, 1):
    print(f"  Scene {i} starts at: {off} ms")

voice_track.export("voice/full_voice.wav", format="wav")

# ── 3. Build BGM track: tanpura at -10 dB relative to voice peak, fade out last 4 s ──
bgm_raw = AudioSegment.from_file("music/bgm_tanpura.wav")

# Match or extend BGM to full track length
if len(bgm_raw) < total_ms:
    reps = (total_ms // len(bgm_raw)) + 2
    bgm_raw = bgm_raw * reps
bgm_trimmed = bgm_raw[:total_ms]

# -10 dB relative: lower BGM by 10 dB
bgm_low = bgm_trimmed - 10

# Fade out last 4 seconds
fade_ms = 4000
bgm_mixed = bgm_low.fade_out(fade_ms)
bgm_mixed.export("music/bgm_mixed.wav", format="wav")

# ── 4. Overlay BGM + voice ────────────────────────────────────────────────
final_raw = bgm_mixed.overlay(voice_track)
final_raw.export("out/final_audio_raw.wav", format="wav")
print("Exported out/final_audio_raw.wav")

# ── 5. Loudness normalisation to -14 LUFS via ffmpeg (EBU R128) ──────────
def run_loudnorm(src, dst):
    # Pass 1: measure
    r = subprocess.run(
        ["ffmpeg", "-y", "-i", src,
         "-af", "loudnorm=I=-14:TP=-1.5:LRA=11:print_format=json",
         "-f", "null", "-"],
        capture_output=True, text=True
    )
    # Parse JSON from stderr
    stderr = r.stderr
    start = stderr.rfind("{")
    end   = stderr.rfind("}") + 1
    info  = json.loads(stderr[start:end])
    # Pass 2: apply with measured values
    af = (
        f"loudnorm=I=-14:TP=-1.5:LRA=11:"
        f"measured_I={info['input_i']}:"
        f"measured_TP={info['input_tp']}:"
        f"measured_LRA={info['input_lra']}:"
        f"measured_thresh={info['input_thresh']}:"
        f"offset={info['target_offset']}:linear=true:print_format=summary"
    )
    subprocess.run(
        ["ffmpeg", "-y", "-i", src, "-af", af, "-ar", "44100", "-c:a", "pcm_s16le", dst],
        check=True
    )
    print(f"Loudness-normalised → {dst}")

run_loudnorm("out/final_audio_raw.wav", "out/final_audio.wav")

# ── 6. Write manifest for Remotion ───────────────────────────────────────
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
            "words": d["timings"]["words"]
        }
        for i, d in enumerate(scene_data)
    ]
}
with open("voice/audio_manifest.json", "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2, ensure_ascii=False)
print(f"\nManifest → voice/audio_manifest.json")
print(f"Total video duration: {manifest['totalDurationMs']} ms  ({manifest['totalFrames']} frames @ 30fps)")

