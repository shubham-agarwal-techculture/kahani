import React from 'react';

export interface WarliSunProps {
  x: number;
  y: number;
  size?: number;
  rotation?: number;
}

/**
 * Traditional Warli Sun: concentric rings with geometric triangular rays,
 * symbolizing life and divine cosmic energy in tribal Maharashtra.
 */
export const WarliSun: React.FC<WarliSunProps> = ({
  x,
  y,
  size = 180,
  rotation = 0,
}) => {
  const radius = size / 2;
  const coreR = radius * 0.42;
  const numRays = 16;

  return (
    <div
      style={{
        position: 'absolute',
        left: x - radius,
        top: y - radius,
        width: size,
        height: size,
        transform: `rotate(${rotation}deg)`,
        pointerEvents: 'none',
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Core solid circle */}
        <circle cx={radius} cy={radius} r={coreR} fill="#FBF8EE" />
        <circle cx={radius} cy={radius} r={coreR * 0.65} fill="#7D2D20" />
        <circle cx={radius} cy={radius} r={coreR * 0.3} fill="#FBF8EE" />

        {/* Concentric dashed ring */}
        <circle
          cx={radius}
          cy={radius}
          r={radius * 0.62}
          fill="none"
          stroke="#FBF8EE"
          strokeWidth="2.5"
          strokeDasharray="4 4"
        />

        {/* Radiating triangular rays */}
        {Array.from({ length: numRays }).map((_, i) => {
          const angle = (i * 360) / numRays;
          const rad = (angle * Math.PI) / 180;
          const innerR = radius * 0.66;
          const outerR = radius * 0.96;

          // Triangle points
          const halfBaseAngle = 360 / (numRays * 2.2);
          const rad1 = ((angle - halfBaseAngle) * Math.PI) / 180;
          const rad2 = ((angle + halfBaseAngle) * Math.PI) / 180;

          const p1x = radius + innerR * Math.cos(rad1);
          const p1y = radius + innerR * Math.sin(rad1);
          const p2x = radius + innerR * Math.cos(rad2);
          const p2y = radius + innerR * Math.sin(rad2);
          const p3x = radius + outerR * Math.cos(rad);
          const p3y = radius + outerR * Math.sin(rad);

          return (
            <polygon
              key={i}
              points={`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y}`}
              fill="#FBF8EE"
            />
          );
        })}
      </svg>
    </div>
  );
};
