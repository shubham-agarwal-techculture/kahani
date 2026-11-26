import React from 'react';

export interface CaptionChunk {
  text: string;
  startMs: number;
  endMs: number;
}

export interface WarliTimedCaptionsProps {
  chunks?: CaptionChunk[];
  currentMs: number;
}

/**
 * Warli Tribal Art styled captions:
 * Deep terracotta background pill with rice-paste white border and golden glow.
 * Positioned at bottom: 360px within title-safe margin (bottom > 340px).
 */
export const WarliTimedCaptions: React.FC<WarliTimedCaptionsProps> = ({ chunks = [], currentMs }) => {
  const activeChunk = chunks.find((c) => currentMs >= c.startMs && currentMs <= c.endMs) ||
    chunks.slice().reverse().find((c) => currentMs >= c.startMs);

  if (!activeChunk) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 350,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 70px',
        zIndex: 95,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(50, 16, 12, 0.92)',
          border: '3px solid #FBF8EE',
          outline: '2px dashed #E65100',
          outlineOffset: '4px',
          borderRadius: '16px',
          padding: '16px 36px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.85), inset 0 0 15px rgba(0,0,0,0.5)',
          textAlign: 'center',
          maxWidth: '920px',
        }}
      >
        <div
          style={{
            fontFamily: "'Noto Sans Devanagari', 'Mangal', 'Segoe UI', Roboto, sans-serif",
            fontSize: '42px',
            fontWeight: 800,
            lineHeight: 1.45,
            color: '#FBF8EE',
            letterSpacing: '0.4px',
            textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 12px rgba(251, 248, 238, 0.3)',
          }}
        >
          {activeChunk.text}
        </div>
      </div>
    </div>
  );
};
