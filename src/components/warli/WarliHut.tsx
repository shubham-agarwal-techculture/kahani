import React from 'react';

export interface WarliHutProps {
  x: number;
  y: number;
  scale?: number;
}

/**
 * Traditional Warli Village Hut with triangular thatched roof,
 * linear hatched walls, and rice-paste door patterns.
 */
export const WarliHut: React.FC<WarliHutProps> = ({ x, y, scale = 1 }) => {
  const width = 280 * scale;
  const height = 240 * scale;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        pointerEvents: 'none',
      }}
    >
      <svg width={width} height={height} viewBox="0 0 280 240">
        {/* Thatched Triangular Roof */}
        <polygon points="140,15 265,110 15,110" fill="#FBF8EE" />
        <polygon points="140,25 250,105 30,105" fill="#7D2D20" />

        {/* Roof Hatching lines */}
        {Array.from({ length: 9 }).map((_, i) => (
          <line
            key={`roof-${i}`}
            x1="140"
            y1="25"
            x2={40 + i * 25}
            y2="105"
            stroke="#FBF8EE"
            strokeWidth="2"
          />
        ))}

        {/* Eaves fringe dots */}
        {Array.from({ length: 15 }).map((_, i) => (
          <circle
            key={`fringe-${i}`}
            cx={25 + i * 16}
            cy="114"
            r="2.5"
            fill="#FBF8EE"
          />
        ))}

        {/* Rectangular Mud Base / Walls */}
        <rect
          x="40"
          y="110"
          width="200"
          height="120"
          fill="none"
          stroke="#FBF8EE"
          strokeWidth="3.5"
        />

        {/* Central Doorway */}
        <rect
          x="115"
          y="150"
          width="50"
          height="80"
          fill="#FBF8EE"
        />
        <path d="M 115 150 Q 140 135 165 150" fill="#FBF8EE" />

        {/* Side decorative windows (triangular lattice) */}
        <polygon points="65,140 85,140 75,160" fill="#FBF8EE" />
        <polygon points="65,180 85,180 75,160" fill="#FBF8EE" />

        <polygon points="195,140 215,140 205,160" fill="#FBF8EE" />
        <polygon points="195,180 215,180 205,160" fill="#FBF8EE" />
      </svg>
    </div>
  );
};
