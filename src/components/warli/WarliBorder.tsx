import React from 'react';

/**
 * Traditional Warli border made of a continuous chain of small repeating triangles
 * pointing inward, bounded by double off-white rice-paste lines.
 */
export const WarliBorder: React.FC = () => {
  const width = 1080;
  const height = 1920;
  const margin = 28;
  const triSize = 16;

  // Generate top and bottom triangle chains
  const numHoriz = Math.floor((width - margin * 2) / triSize);
  const horizSpacing = (width - margin * 2) / numHoriz;

  // Generate left and right triangle chains
  const numVert = Math.floor((height - margin * 2) / triSize);
  const vertSpacing = (height - margin * 2) / numVert;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100,
      }}
      viewBox={`0 0 ${width} ${height}`}
    >
      {/* Outer bounding lines */}
      <rect
        x={margin - 12}
        y={margin - 12}
        width={width - (margin - 12) * 2}
        height={height - (margin - 12) * 2}
        fill="none"
        stroke="#FBF8EE"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <rect
        x={margin + triSize + 6}
        y={margin + triSize + 6}
        width={width - (margin + triSize + 6) * 2}
        height={height - (margin + triSize + 6) * 2}
        fill="none"
        stroke="#FBF8EE"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="6 4"
      />

      {/* Top Chain of Triangles (pointing down) */}
      {Array.from({ length: numHoriz }).map((_, i) => {
        const x = margin + i * horizSpacing;
        const y = margin;
        return (
          <polygon
            key={`top-${i}`}
            points={`${x},${y} ${x + horizSpacing},${y} ${x + horizSpacing / 2},${y + triSize}`}
            fill="#FBF8EE"
          />
        );
      })}

      {/* Bottom Chain of Triangles (pointing up) */}
      {Array.from({ length: numHoriz }).map((_, i) => {
        const x = margin + i * horizSpacing;
        const y = height - margin;
        return (
          <polygon
            key={`bot-${i}`}
            points={`${x},${y} ${x + horizSpacing},${y} ${x + horizSpacing / 2},${y - triSize}`}
            fill="#FBF8EE"
          />
        );
      })}

      {/* Left Chain of Triangles (pointing right) */}
      {Array.from({ length: numVert }).map((_, i) => {
        const x = margin;
        const y = margin + i * vertSpacing;
        return (
          <polygon
            key={`left-${i}`}
            points={`${x},${y} ${x},${y + vertSpacing} ${x + triSize},${y + vertSpacing / 2}`}
            fill="#FBF8EE"
          />
        );
      })}

      {/* Right Chain of Triangles (pointing left) */}
      {Array.from({ length: numVert }).map((_, i) => {
        const x = width - margin;
        const y = margin + i * vertSpacing;
        return (
          <polygon
            key={`right-${i}`}
            points={`${x},${y} ${x},${y + vertSpacing} ${x - triSize},${y + vertSpacing / 2}`}
            fill="#FBF8EE"
          />
        );
      })}

      {/* Four Corner Diamond Rosettes */}
      {[
        [margin, margin],
        [width - margin, margin],
        [margin, height - margin],
        [width - margin, height - margin],
      ].map(([cx, cy], i) => (
        <g key={`corner-${i}`}>
          <circle cx={cx} cy={cy} r={14} fill="#FBF8EE" />
          <circle cx={cx} cy={cy} r={6} fill="#7D2D20" />
        </g>
      ))}
    </svg>
  );
};
