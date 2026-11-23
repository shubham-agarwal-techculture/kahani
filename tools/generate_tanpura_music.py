import numpy as np
from scipy.io import wavfile
from scipy.signal import butter, sosfilt

def generate_tanpura(duration_sec=65, sample_rate=44100):
    """
    Synthesizes a sober, warm, meditative Indian Tanpura drone.
    Tuned to C#3 (138.59 Hz): Pa, Sa', Sa', Kharaj Sa.
    Gentle plucks, warm acoustic harmonic decay, soft roll-off, no piercing highs.
    """
    total_samples = int(duration_sec * sample_rate)
    audio = np.zeros(total_samples, dtype=np.float32)

    # Base pitch: C#3 = 138.59 Hz
    sa = 138.59
    pa = sa * 1.5           # 207.89 Hz (Pancham)
    sa_high = sa * 2.0      # 277.18 Hz (Tar Sa)
    sa_low = sa             # 138.59 Hz (Mandra Sa)

    # 4 strings cycle with relaxed, sober spacing
    # Pa -> Sa' -> Sa' -> Kharaj Sa
    strings = [
        (pa, 0.0, 0.22),
        (sa_high, 1.8, 0.18),
        (sa_high, 3.6, 0.18),
        (sa_low, 5.2, 0.26)
    ]
    cycle_period = 7.2

    t = np.linspace(0, duration_sec, total_samples, endpoint=False)
    num_cycles = int(np.ceil(duration_sec / cycle_period)) + 1

    # Warm, sober harmonic distribution (smooth natural acoustic decay, minimal harsh buzz)
    harmonics = [
        (1, 1.0),
        (2, 0.45),
        (3, 0.22),
        (4, 0.08),
        (5, 0.03),
    ]

    for c in range(num_cycles):
        for freq, offset_s, amp in strings:
            start_s = c * cycle_period + offset_s
            start_idx = int(start_s * sample_rate)
            if start_idx >= total_samples:
                continue

            # Sustain duration: 8 seconds smooth decay
            pluck_samples = min(int(8.0 * sample_rate), total_samples - start_idx)
            t_pluck = np.linspace(0, pluck_samples / sample_rate, pluck_samples, endpoint=False)

            # Soft, rounded attack (60ms) and gentle exponential decay
            env = (1.0 - np.exp(-t_pluck / 0.06)) * np.exp(-t_pluck / 3.0)

            string_signal = np.zeros(pluck_samples, dtype=np.float32)
            for h_num, h_weight in harmonics:
                # Very subtle natural phase modulation
                jawari_mod = 1.0 + 0.03 * np.sin(2 * np.pi * 1.0 * t_pluck + h_num)
                wave = np.sin(2 * np.pi * freq * h_num * t_pluck) * h_weight * jawari_mod
                string_signal += wave

            string_signal = string_signal * env * amp
            audio[start_idx : start_idx + pluck_samples] += string_signal

    # Add very soft deep foundational root drone (warmth, not melody)
    root_drone = 0.02 * np.sin(2 * np.pi * sa_low * t) + 0.015 * np.sin(2 * np.pi * pa * t)
    audio += root_drone

    # Low-pass filter at 1400 Hz for warm wooden resonance, removing all sharp/metallic frequencies
    sos = butter(4, 1400, btype='lowpass', fs=sample_rate, output='sos')
    audio = sosfilt(sos, audio)

    # Master normalization to moderate, gentle headroom
    max_val = np.max(np.abs(audio))
    if max_val > 0:
        audio = (audio / max_val) * 0.45

    audio_int16 = (audio * 32767).astype(np.int16)
    wavfile.write("music/bgm_tanpura.wav", sample_rate, audio_int16)
    print("Generated sober music/bgm_tanpura.wav successfully!")

if __name__ == "__main__":
    import os
    os.makedirs("music", exist_ok=True)
    generate_tanpura(duration_sec=65)
