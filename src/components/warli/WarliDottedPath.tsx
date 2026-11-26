import React from 'react';

export interface WarliDottedPathProps {
  d: string;
  strokeWidth?: number;
  dashArray?: string;
}

/**
 * Traditional Warli Dotted Path / Trail, symbolizing footsteps and the journey of life.
 */
export const WarliDottedPath: React.FC<WarliDottedPathProps> = ({
  d,
  strokeWidth = 4,
  dashArray = '3 14',
}) => {
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 1080,
        height: 1920,
        pointerEvents: 'none',
      }}
      viewBox="0 0 1080 1920"
    >
      {/* Underlying smooth line */}
      <path
        d={d}
        fill="none"
        stroke="#FBF8EE"
        strokeWidth="1.5"
        opacity="0.35"
      />
      {/* Prominent footprint dots */}
      <path
        d={d}
        fill="none"
        stroke="#FBF8EE"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={dashArray}
      />
    </svg>
  );
};
