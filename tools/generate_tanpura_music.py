import numpy as np
from scipy.io import wavfile

def generate_tanpura(duration_sec=65, sample_rate=44100):
    """
    Synthesizes an authentic meditative Indian Tanpura drone track.
    4 strings in traditional tuning: Pa (fifth), Sa' (high tonic), Sa' (high tonic), Kharaj Sa (low tonic).
    Each string has natural pluck attack, rich jawari overtones, and long exponential sustain.
    """
    total_samples = int(duration_sec * sample_rate)
    audio = np.zeros(total_samples, dtype=np.float32)

    # Base pitch: C#3 = 138.59 Hz
    sa = 138.59
    pa = sa * 1.5           # 207.89 Hz (Pancham)
    sa_high = sa * 2.0      # 277.18 Hz (Tar Sa)
    sa_low = sa             # 138.59 Hz (Mandra Sa)

    # Pluck timings (classic 4-string cycle every ~6.5 seconds)
    # String 1: Pa (0s), String 2: Sa' (1.6s), String 3: Sa' (3.2s), String 4: Kharaj Sa (4.8s)
    strings = [
        (pa, 0.0, 0.35),
        (sa_high, 1.6, 0.28),
        (sa_high, 3.2, 0.28),
        (sa_low, 4.8, 0.40)
    ]
    cycle_period = 6.5

    t = np.linspace(0, duration_sec, total_samples, endpoint=False)

    num_cycles = int(np.ceil(duration_sec / cycle_period)) + 1

    for c in range(num_cycles):
        for freq, offset_s, amp in strings:
            start_s = c * cycle_period + offset_s
            start_idx = int(start_s * sample_rate)
            if start_idx >= total_samples:
                continue

            # Sustain duration for each pluck: 8 seconds
            pluck_samples = min(int(8.5 * sample_rate), total_samples - start_idx)
            t_pluck = np.linspace(0, pluck_samples / sample_rate, pluck_samples, endpoint=False)

            # Pluck envelope: quick 20ms attack, long exponential decay
            env = (1.0 - np.exp(-t_pluck / 0.025)) * np.exp(-t_pluck / 3.2)

            # Jawari harmonics (rich acoustic spectrum with non-linear overtone resonance)
            string_signal = np.zeros(pluck_samples, dtype=np.float32)
            harmonics = [
                (1, 1.0),
                (2, 0.8),
                (3, 0.65),
                (4, 0.5),
                (5, 0.45),
                (6, 0.35),
                (7, 0.25),
                (8, 0.2),
                (9, 0.15),
                (10, 0.1)
            ]
            for h_idx, (h_num, h_weight) in enumerate(harmonics):
                # Subtle phase shimmer / chorus
                jawari_mod = 1.0 + 0.08 * np.sin(2 * np.pi * 1.5 * t_pluck + h_idx)
                wave = np.sin(2 * np.pi * freq * h_num * t_pluck) * h_weight * jawari_mod
                string_signal += wave

            string_signal = string_signal * env * amp
            audio[start_idx : start_idx + pluck_samples] += string_signal

    # Add gentle ambient flute-like drone harmonic (octave higher pad, serene)
    flute_pad = 0.06 * np.sin(2 * np.pi * sa_high * t) + 0.04 * np.sin(2 * np.pi * pa * 2.0 * t)
    audio += flute_pad

    # Soft master limiter & normalization to -3 dB peak
    max_val = np.max(np.abs(audio))
    if max_val > 0:
        audio = (audio / max_val) * 0.7

    audio_int16 = (audio * 32767).astype(np.int16)
    wavfile.write("music/bgm_tanpura.wav", sample_rate, audio_int16)
    print("Generated music/bgm_tanpura.wav successfully!")

if __name__ == "__main__":
    import os
    os.makedirs("music", exist_ok=True)
    generate_tanpura(duration_sec=65)

