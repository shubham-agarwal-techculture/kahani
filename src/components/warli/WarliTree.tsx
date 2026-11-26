import React from 'react';

export interface WarliTreeProps {
  x: number;
  y: number;
  scale?: number;
  type?: 'concentric' | 'dense' | 'spiral';
}

/**
 * Authentic Warli Tree with rhythmic branching patterns, triangular leaves,
 * and small perched tribal birds.
 */
export const WarliTree: React.FC<WarliTreeProps> = ({
  x,
  y,
  scale = 1,
}) => {
  const width = 360 * scale;
  const height = 520 * scale;

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
      <svg width={width} height={height} viewBox="0 0 360 520">
        {/* Tree Trunk with cross-hatching */}
        <polygon points="160,510 200,510 186,180 174,180" fill="#FBF8EE" />
        <polygon points="164,510 196,510 184,200 176,200" fill="#7D2D20" />
        {/* Trunk Hatching Lines */}
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={`trunk-${i}`}
            x1="170"
            y1={220 + i * 20}
            x2="190"
            y2={210 + i * 20}
            stroke="#FBF8EE"
            strokeWidth="2"
          />
        ))}

        {/* Ground roots */}
        <line x1="160" y1="510" x2="130" y2="520" stroke="#FBF8EE" strokeWidth="4" strokeLinecap="round" />
        <line x1="200" y1="510" x2="230" y2="520" stroke="#FBF8EE" strokeWidth="4" strokeLinecap="round" />

        {/* Concentric Arcs of Triangular Foliage */}
        {/* Tier 1 (Lowest branches) */}
        <path d="M 70 340 Q 180 250 290 340" fill="none" stroke="#FBF8EE" strokeWidth="3" />
        {Array.from({ length: 11 }).map((_, i) => {
          const t = i / 10;
          const bx = 70 + t * 220;
          const by = 340 - Math.sin(t * Math.PI) * 90;
          return (
            <polygon
              key={`t1-${i}`}
              points={`${bx - 8},${by} ${bx + 8},${by} ${bx},${by - 24}`}
              fill="#FBF8EE"
            />
          );
        })}

        {/* Tier 2 (Middle branches) */}
        <path d="M 90 260 Q 180 180 270 260" fill="none" stroke="#FBF8EE" strokeWidth="3" />
        {Array.from({ length: 9 }).map((_, i) => {
          const t = i / 8;
          const bx = 90 + t * 180;
          const by = 260 - Math.sin(t * Math.PI) * 80;
          return (
            <polygon
              key={`t2-${i}`}
              points={`${bx - 7},${by} ${bx + 7},${by} ${bx},${by - 22}`}
              fill="#FBF8EE"
            />
          );
        })}

        {/* Tier 3 (Upper branches) */}
        <path d="M 115 190 Q 180 120 245 190" fill="none" stroke="#FBF8EE" strokeWidth="3" />
        {Array.from({ length: 7 }).map((_, i) => {
          const t = i / 6;
          const bx = 115 + t * 130;
          const by = 190 - Math.sin(t * Math.PI) * 70;
          return (
            <polygon
              key={`t3-${i}`}
              points={`${bx - 6},${by} ${bx + 6},${by} ${bx},${by - 20}`}
              fill="#FBF8EE"
            />
          );
        })}

        {/* Tier 4 (Top crown) */}
        <path d="M 140 130 Q 180 80 220 130" fill="none" stroke="#FBF8EE" strokeWidth="3" />
        {Array.from({ length: 5 }).map((_, i) => {
          const t = i / 4;
          const bx = 140 + t * 80;
          const by = 130 - Math.sin(t * Math.PI) * 50;
          return (
            <polygon
              key={`t4-${i}`}
              points={`${bx - 6},${by} ${bx + 6},${by} ${bx},${by - 18}`}
              fill="#FBF8EE"
            />
          );
        })}

        {/* Perched Tribal Birds */}
        {/* Bird on Left Branch */}
        <g transform="translate(85, 305)">
          <polygon points="0,0 20,-8 15,4" fill="#FBF8EE" /> {/* body */}
          <circle cx="24" cy="-10" r="5" fill="#FBF8EE" /> {/* head */}
          <line x1="28" y1="-10" x2="34" y2="-9" stroke="#FBF8EE" strokeWidth="1.5" /> {/* beak */}
          <line x1="0" y1="0" x2="-10" y2="4" stroke="#FBF8EE" strokeWidth="1.5" /> {/* tail */}
        </g>

        {/* Bird on Right Branch */}
        <g transform="translate(265, 230) scale(-1, 1)">
          <polygon points="0,0 20,-8 15,4" fill="#FBF8EE" />
          <circle cx="24" cy="-10" r="5" fill="#FBF8EE" />
          <line x1="28" y1="-10" x2="34" y2="-9" stroke="#FBF8EE" strokeWidth="1.5" />
          <line x1="0" y1="0" x2="-10" y2="4" stroke="#FBF8EE" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
};
