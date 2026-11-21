import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface TreesProps {
  scrollSpeed?: number;
  silhouetteColor?: string;
}

export const Trees: React.FC<TreesProps> = ({
  scrollSpeed = 1.2,
  silhouetteColor = '#120D22',
}) => {
  const frame = useCurrentFrame();

  // Trees parallax at midground speed
  const shift = (frame * scrollSpeed * 0.9) % 1080;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 270,
        left: -shift,
        width: '2160px',
        height: '380px',
        pointerEvents: 'none',
      }}
    >
      <svg width="2160" height="380" viewBox="0 0 2160 380" fill="none">
        {/* Tree 1: Ancient Sacred Banyan / Neem Silhouette */}
        <g transform="translate(180, 20)">
          {/* Main Trunk */}
          <path
            d="M 60 290 Q 55 210 75 140 Q 85 100 95 80 L 105 80 Q 95 140 105 210 Q 115 250 125 290 Z"
            fill={silhouetteColor}
          />
          {/* Roots */}
          <path d="M 60 290 Q 40 310 15 320 M 125 290 Q 145 310 175 320" stroke={silhouetteColor} strokeWidth="6" />
          {/* Lush Canopy Tufts */}
          <circle cx="85" cy="85" r="55" fill={silhouetteColor} />
          <circle cx="130" cy="70" r="48" fill={silhouetteColor} />
          <circle cx="45" cy="115" r="42" fill={silhouetteColor} />
          <circle cx="115" cy="120" r="50" fill={silhouetteColor} />
        </g>

        {/* Tree 2: Slender Palm / Kadamba */}
        <g transform="translate(740, 50)">
          <path d="M 40 280 Q 45 180 32 80 L 38 80 Q 50 180 48 280 Z" fill={silhouetteColor} />
          {/* Fan leaves */}
          <ellipse cx="35" cy="65" rx="55" ry="32" fill={silhouetteColor} transform="rotate(-15 35 65)" />
          <ellipse cx="35" cy="65" rx="50" ry="28" fill={silhouetteColor} transform="rotate(25 35 65)" />
          <ellipse cx="35" cy="60" rx="45" ry="25" fill={silhouetteColor} transform="rotate(70 35 60)" />
        </g>

        {/* Tree 1 Duplicate for wrap */}
        <g transform="translate(1260, 20)">
          <path
            d="M 60 290 Q 55 210 75 140 Q 85 100 95 80 L 105 80 Q 95 140 105 210 Q 115 250 125 290 Z"
            fill={silhouetteColor}
          />
          <path d="M 60 290 Q 40 310 15 320 M 125 290 Q 145 310 175 320" stroke={silhouetteColor} strokeWidth="6" />
          <circle cx="85" cy="85" r="55" fill={silhouetteColor} />
          <circle cx="130" cy="70" r="48" fill={silhouetteColor} />
          <circle cx="45" cy="115" r="42" fill={silhouetteColor} />
          <circle cx="115" cy="120" r="50" fill={silhouetteColor} />
        </g>

        {/* Tree 2 Duplicate for wrap */}
        <g transform="translate(1820, 50)">
          <path d="M 40 280 Q 45 180 32 80 L 38 80 Q 50 180 48 280 Z" fill={silhouetteColor} />
          <ellipse cx="35" cy="65" rx="55" ry="32" fill={silhouetteColor} transform="rotate(-15 35 65)" />
          <ellipse cx="35" cy="65" rx="50" ry="28" fill={silhouetteColor} transform="rotate(25 35 65)" />
          <ellipse cx="35" cy="60" rx="45" ry="25" fill={silhouetteColor} transform="rotate(70 35 60)" />
        </g>
      </svg>
    </div>
  );
};

