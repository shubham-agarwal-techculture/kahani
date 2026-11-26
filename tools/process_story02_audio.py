import asyncio
import os
import json
import subprocess
import shutil
import numpy as np
from pydub import AudioSegment
from faster_whisper import WhisperModel
import edge_tts

SCENES = [
    {
        "id": 1,
        "text": "अगर चोट सिर्फ एक बार लगी थी, तो उसका दर्द मन में सौ बार क्यों दोहराते हो?",
    },
    {
        "id": 2,
        "text": "दो भिक्षु जंगल के रास्ते से अपने आश्रम लौट रहे थे। सामने एक उफनती हुई कीचड़ भरी नदी थी।",
    },
    {
        "id": 3,
        "text": "किनारे पर एक युवती खड़ी थी, जो उस तेज़ बहाव को पार करने से डर रही थी।",
    },
    {
        "id": 4,
        "text": "बिना कुछ कहे, बड़े भिक्षु ने उसे अपनी पीठ पर उठाया, नदी पार कराई, और नीचे उतारकर आगे बढ़ गए।",
    },
    {
        "id": 5,
        "text": "घंटों तक दोनों चुपचाप चलते रहे। पर छोटे भिक्षु का मन गुस्से और बेचैनी से उबल रहा था।",
    },
    {
        "id": 6,
        "text": "आखिरकार उसने चिल्लाकर कहा—'हमारे नियमों में स्त्री को छूना मना है, फिर आपने उसे पीठ पर क्यों उठाया?'",
    },
    {
        "id": 7,
        "text": "बड़े भिक्षु मुस्कुराए और बोले—'वत्स, मैंने तो उसे नदी किनारे ही छोड़ दिया था। तुम अब तक उसे अपने सिर पर क्यों उठाए घूम रहे हो?'",
    }
]

async def step1_tts():
    voice = "hi-IN-MadhurNeural"
    rate = "+13%"
    os.makedirs("voice/story_02", exist_ok=True)
    
    for s in SCENES:
        out_f = f"voice/story_02/scene_{s['id']}.mp3"
        if os.path.exists(out_f) and os.path.getsize(out_f) > 1000:
            print(f"Voice already exists: {out_f}")
            continue
        print(f"Generating voice {out_f}...")
        comm = edge_tts.Communicate(s["text"], voice=voice, rate=rate)
        await comm.save(out_f)

def step2_timings():
    print("\nExtracting word timings with faster-whisper...")
    model = WhisperModel("base", device="cpu", compute_type="int8")
    
    scene_data = []
    for s in SCENES:
        sid = s["id"]
        mp3 = f"voice/story_02/scene_{sid}.mp3"
        tfile = f"voice/story_02/scene_{sid}.timings.json"
        
        seg = AudioSegment.from_file(mp3).set_frame_rate(16000).set_channels(1)
        audio = np.array(seg.get_array_of_samples(), dtype=np.float32) / 32768.0
        segs, info = model.transcribe(audio, word_timestamps=True, language="hi")
        
        words = []
        for segment in segs:
            for w in (segment.words or []):
                t = w.word.strip()
                if t:
                    words.append({
                        "text": t,
                        "startMs": int(round(w.start * 1000)),
                        "endMs": int(round(w.end * 1000)),
                    })
        
        res = {
            "scene": sid,
            "durationMs": int(round(info.duration * 1000)),
            "words": words
        }
        with open(tfile, "w", encoding="utf-8") as f:
            json.dump(res, f, indent=2, ensure_ascii=False)
        print(f"Scene {sid}: {len(words)} words ({info.duration:.2f}s)")
        
        raw_seg = AudioSegment.from_file(mp3)
        scene_data.append({"id": sid, "seg": raw_seg, "timings": res})
        
    return scene_data

def step3_mix_audio(scene_data):
    print("\nMixing voice + insightful score...")
    import sys
    sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))
    from generate_insightful_score import generate_insightful_score
    generate_insightful_score(duration_sec=70)
    
    GAP_MS = 300
    voice_track = AudioSegment.silent(duration=0)
    scene_offsets_ms = []
    
    for d in scene_data:
        scene_offsets_ms.append(len(voice_track))
        voice_track += d["seg"]
        voice_track += AudioSegment.silent(duration=GAP_MS)
        
    total_ms = len(voice_track)
    print(f"Total voice track: {total_ms} ms ({total_ms/1000:.2f}s)")
    
    # Load insightful score
    bgm_raw = AudioSegment.from_file("music/insightful_meditation.wav")
    if len(bgm_raw) < total_ms:
        reps = (total_ms // len(bgm_raw)) + 2
        bgm_raw = bgm_raw * reps
    bgm_trimmed = bgm_raw[:total_ms]
    
    # Sober background level (-21 dB relative to voice)
    bgm_sober = bgm_trimmed - 21
    # 4.5s fade out
    bgm_mixed = bgm_sober.fade_out(4500)
    
    # Overlay
    final_raw = bgm_mixed.overlay(voice_track)
    os.makedirs("out", exist_ok=True)
    raw_path = "out/story_02_raw.wav"
    final_raw.export(raw_path, format="wav")
    
    # Loudness normalization to -14.5 LUFS
    norm_path = "out/story_02_final_audio.wav"
    print("Normalizing loudness with ffmpeg loudnorm...")
    subprocess.run([
        "ffmpeg", "-y", "-i", raw_path,
        "-af", "loudnorm=I=-14.5:TP=-1.5:LRA=11",
        "-ar", "44100", "-c:a", "pcm_s16le", norm_path
    ], check=True)
    
    # Copy to Remotion public directory
    os.makedirs("public", exist_ok=True)
    shutil.copy2(norm_path, "public/story_02_final_audio.wav")
    print(f"Saved and copied to public/story_02_final_audio.wav")
    
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
    with open("voice/story_02_manifest.json", "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"Saved manifest -> voice/story_02_manifest.json ({manifest['totalFrames']} frames)")
    return manifest

if __name__ == "__main__":
    asyncio.run(step1_tts())
    s_data = step2_timings()
    step3_mix_audio(s_data)
