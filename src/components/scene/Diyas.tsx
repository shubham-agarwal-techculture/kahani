import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface DiyasProps {
  scrollSpeed?: number;
}

export const Diyas: React.FC<DiyasProps> = ({ scrollSpeed = 1.2 }) => {
  const frame = useCurrentFrame();

  // Diyas placed along the foreground path
  const shift = (frame * scrollSpeed * 1.8) % 1080;

  // Diya positions relative to path
  const diyaPoints = [180, 520, 890, 1260, 1600, 1970];

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 155,
        left: -shift,
        width: '2160px',
        height: '90px',
        pointerEvents: 'none',
      }}
    >
      {diyaPoints.map((x, idx) => {
        // Individual flame flicker frequency
        const flicker = Math.sin(frame * 0.45 + idx * 2.3) * 3 + Math.cos(frame * 0.25 + idx) * 1.5;
        const flameHeight = 22 + flicker;
        const glowOpacity = 0.55 + Math.sin(frame * 0.35 + idx) * 0.2;

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              left: x,
              bottom: 0,
              width: '60px',
              height: '70px',
            }}
          >
            {/* Ambient Warm Golden Glow Halo */}
            <div
              style={{
                position: 'absolute',
                top: 5 - flicker,
                left: 5,
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255, 179, 0, 0.75) 0%, rgba(255, 111, 0, 0.25) 50%, rgba(0,0,0,0) 75%)',
                filter: 'blur(6px)',
                opacity: glowOpacity,
              }}
            />

            <svg width="60" height="70" viewBox="0 0 60 70" fill="none">
              <defs>
                {/* Terracotta Clay Diya Gradient */}
                <linearGradient id={`diyaClay-${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#D84315" />
                  <stop offset="100%" stopColor="#4E1A0C" />
                </linearGradient>

                {/* Holy Flame Gradient */}
                <linearGradient id={`flameGrad-${idx}`} x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#FF3D00" />
                  <stop offset="35%" stopColor="#FF9100" />
                  <stop offset="70%" stopColor="#FFEA00" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>

              {/* Terracotta Earthen Diya Base */}
              <ellipse cx="30" cy="52" rx="20" ry="8" fill={`url(#diyaClay-${idx})`} />
              <path
                d="M 10 52 C 10 62 50 62 50 52 C 50 48 10 48 10 52 Z"
                fill="#3E1508"
              />
              {/* Diya Rim Highlight */}
              <ellipse cx="30" cy="50" rx="18" ry="5" fill="#BF360C" stroke="#FFAB91" strokeWidth="1" />

              {/* Dynamic Flickering Holy Jyoti (Flame) */}
              <g transform={`translate(30, 48)`}>
                {/* Outer Flame */}
                <path
                  d={`M -6 0 C -10 -12 0 -${flameHeight} 0 -${flameHeight + 4} C 0 -${flameHeight} 10 -12 6 0 Z`}
                  fill={`url(#flameGrad-${idx})`}
                  filter="drop-shadow(0 -2px 6px rgba(255, 183, 77, 0.9))"
                />
                {/* Inner Bright White Core */}
                <path
                  d={`M -2.5 0 C -4 -6 0 -${flameHeight * 0.55} 0 -${flameHeight * 0.55} C 0 -${flameHeight * 0.55} 4 -6 2.5 0 Z`}
                  fill="#FFFFFF"
                />
              </g>
            </svg>
          </div>
        );
      })}
    </div>
  );
};

