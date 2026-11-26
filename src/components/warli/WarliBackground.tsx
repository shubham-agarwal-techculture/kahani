import React from 'react';

export interface WarliBackgroundProps {
  children?: React.ReactNode;
}

/**
 * Terracotta mud-wall background representing traditional 'geru' clay plastering
 * with subtle natural stippling and earthy warmth.
 */
export const WarliBackground: React.FC<WarliBackgroundProps> = ({ children }) => {
  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1920,
        backgroundColor: '#7D2D20', // Deep authentic terracotta mud
        backgroundImage: `
          radial-gradient(#8C3526 15%, transparent 16%),
          radial-gradient(#6E2519 15%, transparent 16%)
        `,
        backgroundSize: '60px 60px',
        backgroundPosition: '0 0, 30px 30px',
        overflow: 'hidden',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Organic earthen clay wash overlay */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.18,
        }}
      >
        <filter id="mudNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#mudNoise)" fill="#FFF" />
      </svg>

      {children}
    </div>
  );
};
