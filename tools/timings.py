#!/usr/bin/env python3
"""
tools/timings.py - Word-Level Timing Generator for Animated Stories

Extracts precise word start and end timings from a voice-over audio file
using faster-whisper and saves the result as a JSON file formatted for
Remotion animations and caption synchronization.
"""

import argparse
import json
import os
import sys
from pathlib import Path


def extract_word_timings(
    audio_path: str,
    output_path: str = None,
    model_size: str = "base",
    language: str = None,
) -> dict:
    """
    Transcribes audio and extracts word-level timestamps.
    """
    if not os.path.exists(audio_path):
        raise FileNotFoundError(f"Audio file not found: {audio_path}")

    from faster_whisper import WhisperModel

    print(f"Loading faster-whisper model '{model_size}'...")
    model = WhisperModel(model_size, device="cpu", compute_type="int8")

    print(f"Transcribing '{audio_path}' with word timestamps...")
    from pydub import AudioSegment
    import numpy as np

    seg = AudioSegment.from_file(audio_path).set_frame_rate(16000).set_channels(1)
    audio_data = np.array(seg.get_array_of_samples(), dtype=np.float32) / 32768.0

    segments, info = model.transcribe(
        audio_data,
        word_timestamps=True,
        language=language,
    )

    words_list = []
    full_transcript = []

    for segment in segments:
        full_transcript.append(segment.text.strip())
        if segment.words:
            for w in segment.words:
                cleaned_text = w.word.strip()
                if not cleaned_text:
                    continue
                words_list.append({
                    "text": cleaned_text,
                    "start": round(w.start, 3),
                    "end": round(w.end, 3),
                    "startMs": int(round(w.start * 1000)),
                    "endMs": int(round(w.end * 1000)),
                    "durationMs": int(round((w.end - w.start) * 1000)),
                    "confidence": round(w.probability, 3),
                })

    result = {
        "audio_file": os.path.abspath(audio_path),
        "language": info.language,
        "language_probability": round(info.language_probability, 3),
        "duration": round(info.duration, 3),
        "durationMs": int(round(info.duration * 1000)),
        "transcript": " ".join(full_transcript),
        "word_count": len(words_list),
        "words": words_list,
    }

    if output_path:
        out_p = Path(output_path)
        out_p.parent.mkdir(parents=True, exist_ok=True)
        with open(out_p, "w", encoding="utf-8") as f:
            json.dump(result, f, indent=2, ensure_ascii=False)
        print(f"Saved word timings to '{output_path}' ({len(words_list)} words).")

    return result


def main():
    parser = argparse.ArgumentParser(
        description="Extract word timings from voiceover audio using faster-whisper."
    )
    parser.add_argument("audio", help="Path to voice-over audio file (wav, mp3, m4a, flac)")
    parser.add_argument("-o", "--output", help="Path for output JSON file (defaults to <audio>.json)")
    parser.add_argument(
        "-m", "--model",
        default="base",
        choices=["tiny", "base", "small", "medium", "large-v3"],
        help="Whisper model size (default: base)",
    )
    parser.add_argument("-l", "--language", help="Audio language code (e.g. en, hi, sa)")

    args = parser.parse_args()
    output = args.output or f"{os.path.splitext(args.audio)[0]}.timings.json"

    try:
        extract_word_timings(
            audio_path=args.audio,
            output_path=output,
            model_size=args.model,
            language=args.language,
        )
    except Exception as e:
        print(f"Error extracting timings: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()

