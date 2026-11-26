import React from 'react';

export interface WarliRiverProps {
  y: number;
  height?: number;
}

/**
 * Traditional Warli River with rhythmic undulating waves,
 * triangular fish, and riverbank stone patterns.
 */
export const WarliRiver: React.FC<WarliRiverProps> = ({
  y,
  height = 360,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        top: y,
        width: 1080,
        height,
        pointerEvents: 'none',
      }}
    >
      <svg width="1080" height={height} viewBox={`0 0 1080 ${height}`}>
        {/* River bed subtle wash */}
        <rect x="0" y="0" width="1080" height={height} fill="#692418" opacity="0.6" />

        {/* Riverbank upper line with dots */}
        <line x1="0" y1="10" x2="1080" y2="10" stroke="#FBF8EE" strokeWidth="3" />
        {Array.from({ length: 44 }).map((_, i) => (
          <circle key={`top-dot-${i}`} cx={12 + i * 25} cy="22" r="2.5" fill="#FBF8EE" />
        ))}

        {/* Flowing Wave Lines */}
        {[60, 120, 180, 240, 300].map((wy, idx) => (
          <path
            key={`wave-${idx}`}
            d={`M 0 ${wy} 
                Q 135 ${wy - 18} 270 ${wy} 
                T 540 ${wy} 
                T 810 ${wy} 
                T 1080 ${wy}`}
            fill="none"
            stroke="#FBF8EE"
            strokeWidth="2.5"
            strokeDasharray={idx % 2 === 0 ? 'none' : '10 6'}
          />
        ))}

        {/* Tribal Swimming Fish (Geometric two triangles touching) */}
        {[
          { x: 180, y: 90, scale: 0.9 },
          { x: 440, y: 150, scale: 1.1 },
          { x: 760, y: 105, scale: 0.85 },
          { x: 300, y: 220, scale: 0.95 },
          { x: 880, y: 200, scale: 1.0 },
        ].map((f, i) => (
          <g key={`fish-${i}`} transform={`translate(${f.x}, ${f.y}) scale(${f.scale})`}>
            {/* Fish Body: Diamond / Two Triangles */}
            <polygon points="0,0 24,-10 32,0 24,10" fill="#FBF8EE" />
            {/* Tail Triangle */}
            <polygon points="32,0 46,-10 46,10" fill="#FBF8EE" />
            {/* Eye */}
            <circle cx="8" cy="0" r="1.5" fill="#7D2D20" />
          </g>
        ))}

        {/* Riverbank lower line with dots */}
        <line x1="0" y1={height - 10} x2="1080" y2={height - 10} stroke="#FBF8EE" strokeWidth="3" />
        {Array.from({ length: 44 }).map((_, i) => (
          <circle key={`bot-dot-${i}`} cx={12 + i * 25} cy={height - 22} r="2.5" fill="#FBF8EE" />
        ))}
      </svg>
    </div>
  );
};
