import React from 'react';

export interface CaptionChunk {
  words: string[];
  activeWordIndex: number;
}

export interface MadhubaniCaptionsProps {
  text: string;
  progress: number; // 0 to 1 throughout the scene
}

export const MadhubaniCaptions: React.FC<MadhubaniCaptionsProps> = ({
  text,
  progress,
}) => {
  const words = React.useMemo(() => text.split(/\s+/).filter(Boolean), [text]);
  const totalWords = words.length;

  // Calculate current active word index based on progress (0 to 1)
  const activeWordIdx = Math.min(
    totalWords - 1,
    Math.max(0, Math.floor(progress * totalWords))
  );

  // Group into chunks of 3 to 4 words
  const chunkSize = 4;
  const chunkIndex = Math.floor(activeWordIdx / chunkSize);
  const startIdx = chunkIndex * chunkSize;
  const currentChunk = words.slice(startIdx, startIdx + chunkSize);
  const relativeActiveIdx = activeWordIdx - startIdx;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 350, // Inside Instagram Reels Title-Safe zone (> 340px from bottom)
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 80px',
        zIndex: 90,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(26, 26, 26, 0.92)',
          border: '3px solid #D32F2F',
          outline: '2px solid #FBC02D',
          outlineOffset: '3px',
          borderRadius: '16px',
          padding: '16px 36px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.7)',
          textAlign: 'center',
          maxWidth: '880px',
        }}
      >
        <span
          style={{
            fontFamily: "'Noto Sans', 'Segoe UI', Roboto, sans-serif",
            fontSize: '38px',
            fontWeight: 700,
            lineHeight: 1.4,
            letterSpacing: '0.5px',
          }}
        >
          {currentChunk.map((word, idx) => {
            const isHighlighted = idx === relativeActiveIdx;
            return (
              <span
                key={idx}
                style={{
                  margin: '0 8px',
                  display: 'inline-block',
                  color: isHighlighted ? '#FBC02D' : '#FFF8E7',
                  transform: isHighlighted ? 'scale(1.12)' : 'scale(1)',
                  textShadow: isHighlighted
                    ? '0 0 16px rgba(251, 192, 45, 0.8), 0 2px 4px rgba(0,0,0,0.9)'
                    : 'none',
                  transition: 'transform 0.1s ease',
                  borderBottom: isHighlighted ? '3px solid #FBC02D' : 'none',
                  paddingBottom: isHighlighted ? '2px' : '0',
                }}
              >
                {word}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};

