import React from 'react';

export interface WordTiming {
  text: string;
  startMs: number;
  endMs: number;
}

export interface TimedCaptionsProps {
  /** All word timings from faster-whisper (times relative to scene start) */
  words: WordTiming[];
  /** Current time within the scene in milliseconds */
  currentMs: number;
}

/**
 * Displays 3–4 words at a time, the currently-speaking word highlighted in
 * turmeric yellow with a scale bounce, all inside the Instagram safe zone.
 * Uses real word-boundary timestamps from faster-whisper.
 */
export const TimedCaptions: React.FC<TimedCaptionsProps> = ({ words, currentMs }) => {
  // Find the index of the currently spoken word
  const activeIdx = React.useMemo(() => {
    let found = -1;
    for (let i = 0; i < words.length; i++) {
      if (currentMs >= words[i].startMs && currentMs < words[i].endMs) {
        found = i;
        break;
      }
    }
    // If between words, show the last word that has ended most recently
    if (found === -1) {
      for (let i = words.length - 1; i >= 0; i--) {
        if (currentMs >= words[i].startMs) {
          found = i;
          break;
        }
      }
    }
    return found;
  }, [words, currentMs]);

  // Group into chunks of 4 words, snap to the chunk containing activeIdx
  const CHUNK = 4;
  const chunkIndex = activeIdx >= 0 ? Math.floor(activeIdx / CHUNK) : 0;
  const startIdx = chunkIndex * CHUNK;
  const currentChunk = words.slice(startIdx, startIdx + CHUNK);
  const relativeActive = activeIdx - startIdx;

  if (currentChunk.length === 0) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 360,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 80px',
        zIndex: 95,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(26, 17, 14, 0.90)',
          border: '3px solid #D32F2F',
          outline: '2px solid #FBC02D',
          outlineOffset: '3px',
          borderRadius: '18px',
          padding: '18px 40px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.75)',
          textAlign: 'center',
          maxWidth: '900px',
        }}
      >
        <span
          style={{
            fontFamily: "'Noto Sans Devanagari', 'Noto Sans', 'Mangal', 'Segoe UI', Roboto, sans-serif",
            fontSize: '40px',
            fontWeight: 700,
            lineHeight: 1.5,
            letterSpacing: '0.3px',
          }}
        >
          {currentChunk.map((word, idx) => {
            const isActive = idx === relativeActive;
            return (
              <span
                key={`${startIdx + idx}`}
                style={{
                  margin: '0 7px',
                  display: 'inline-block',
                  color: isActive ? '#FBC02D' : '#FFF8E7',
                  transform: isActive ? 'scale(1.14)' : 'scale(1)',
                  textShadow: isActive
                    ? '0 0 18px rgba(251,192,45,0.9), 0 2px 6px rgba(0,0,0,0.9)'
                    : '0 2px 4px rgba(0,0,0,0.6)',
                  borderBottom: isActive ? '3px solid #FBC02D' : 'none',
                  paddingBottom: isActive ? '3px' : '0',
                  transition: 'transform 0.08s ease, color 0.08s ease',
                }}
              >
                {word.text}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};

