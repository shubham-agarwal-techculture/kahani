import os
import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

def generate_insightful_score(duration_sec=70, sample_rate=44100):
    """
    Synthesizes a contemplative, insightful background score for philosophical storytelling.
    Features:
    - Warm meditative tanpura/cello drone bed (C# tonic, Sa-Pa)
    - Resonant Tibetan singing bowl / monastery gong strikes with shimmering harmonics
    - Subtle acoustic breath pad
    - Pure, sober, and deeply peaceful
    """
    total_samples = int(duration_sec * sample_rate)
    audio = np.zeros(total_samples, dtype=np.float32)
    t = np.linspace(0, duration_sec, total_samples, endpoint=False)

    # 1. Warm Foundational Drone (C#3 = 138.59 Hz, G#3 = 207.89 Hz)
    sa = 138.59
    pa = sa * 1.5
    sa_octave = sa * 2.0
    sa_sub = sa * 0.5  # Sub-bass anchor 69.3 Hz

    # Gentle breathing swell (0.08 Hz slow breathing cycle)
    breath_lfo = 0.85 + 0.15 * np.sin(2 * np.pi * 0.08 * t)

    drone = (
        0.30 * np.sin(2 * np.pi * sa * t) +
        0.18 * np.sin(2 * np.pi * pa * t) +
        0.12 * np.sin(2 * np.pi * sa_octave * t) +
        0.15 * np.sin(2 * np.pi * sa_sub * t) +
        0.04 * np.sin(2 * np.pi * (sa * 3) * t)
    ) * breath_lfo
    audio += drone

    # 2. Singing Bowl Strikes at key dramatic beats:
    # Beat 1: Start (0.5s) - Awakening the question
    # Beat 2: The crossing (18.0s) - The selfless act
    # Beat 3: The realization (39.0s) - The master's insight
    strikes = [
        (0.6, 261.63, 0.40, 14.0),   # Strike 1: Middle C singing bowl
        (18.5, 329.63, 0.35, 12.0),  # Strike 2: E4 contemplative tone
        (39.5, 261.63, 0.45, 16.0),  # Strike 3: Deep grounding C bowl
        (48.0, 392.00, 0.25, 10.0),  # Strike 4: Gentle G4 closing shimmer
    ]

    for start_s, f0, amp, decay_time in strikes:
        start_idx = int(start_s * sample_rate)
        if start_idx >= total_samples:
            continue
        bowl_samples = min(int(decay_time * sample_rate), total_samples - start_idx)
        t_b = np.linspace(0, bowl_samples / sample_rate, bowl_samples, endpoint=False)

        # Singing bowl modes (inharmonic acoustic frequencies characteristic of bronze bells)
        # f0 (fundamental), 2.71*f0 (second mode), 4.9*f0 (third mode)
        env1 = np.exp(-t_b / (decay_time * 0.6))
        env2 = np.exp(-t_b / (decay_time * 0.35))
        env3 = np.exp(-t_b / (decay_time * 0.20))

        # Strike attack (soft felt mallet, 25ms swell)
        attack = 1.0 - np.exp(-t_b / 0.025)

        bowl_wave = (
            0.60 * np.sin(2 * np.pi * f0 * t_b) * env1 +
            0.28 * np.sin(2 * np.pi * (f0 * 2.712) * t_b) * env2 +
            0.12 * np.sin(2 * np.pi * (f0 * 4.92) * t_b) * env3
        ) * attack * amp

        audio[start_idx : start_idx + bowl_samples] += bowl_wave

    # 3. Soft Acoustic Low-Pass Filter (1100 Hz) for deep, warm, wooden stillness
    sos = butter(4, 1100, btype='lowpass', fs=sample_rate, output='sos')
    audio = sosfilt(sos, audio)

    # 4. Master Limiter & Headroom normalization (-3 dB peak)
    max_val = np.max(np.abs(audio))
    if max_val > 0:
        audio = (audio / max_val) * 0.65

    audio_int16 = (audio * 32767).astype(np.int16)
    os.makedirs("music", exist_ok=True)
    out_file = "music/insightful_meditation.wav"
    wavfile.write(out_file, sample_rate, audio_int16)
    print(f"Generated insightful score -> {out_file} ({duration_sec}s)")

if __name__ == "__main__":
    generate_insightful_score(duration_sec=70)
