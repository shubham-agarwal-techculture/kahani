import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface HillsProps {
  scrollSpeed?: number;
  palette?: 'twilight' | 'emerald' | 'golden' | 'night';
}

export const Hills: React.FC<HillsProps> = ({
  scrollSpeed = 1.2,
  palette = 'twilight',
}) => {
  const frame = useCurrentFrame();

  const palettes = {
    twilight: {
      back: '#231B42',
      mid: '#3A1E4A',
      front: '#1B142F',
      path: '#2C1B2D',
      grassAccent: '#542E5E',
    },
    emerald: {
      back: '#1B4332',
      mid: '#2D6A4F',
      front: '#081C15',
      path: '#1F3A2B',
      grassAccent: '#40916C',
    },
    golden: {
      back: '#4E342E',
      mid: '#5D4037',
      front: '#261C14',
      path: '#3E2723',
      grassAccent: '#8D6E63',
    },
    night: {
      back: '#0F1626',
      mid: '#1E2A38',
      front: '#070D18',
      path: '#111B29',
      grassAccent: '#2B3A4F',
    },
  };

  const colors = palettes[palette];

  // Parallax shifts: back moves slowest, front moves fastest
  const backShift = (frame * scrollSpeed * 0.4) % 1080;
  const midShift = (frame * scrollSpeed * 0.9) % 1080;
  const frontShift = (frame * scrollSpeed * 1.8) % 1080;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* ================= 1. BACKGROUND HILLS (Distant Mountains) ================= */}
      <svg
        style={{
          position: 'absolute',
          bottom: 420,
          left: -backShift,
          width: '2160px',
          height: '420px',
        }}
        viewBox="0 0 2160 420"
        fill="none"
      >
        <path
          d="M 0 350 Q 280 180 540 290 Q 820 120 1080 270 Q 1360 180 1620 290 Q 1900 120 2160 270 L 2160 420 L 0 420 Z"
          fill={colors.back}
          opacity="0.85"
        />
      </svg>

      {/* ================= 2. MIDGROUND HILLS (Rolling Slopes) ================= */}
      <svg
        style={{
          position: 'absolute',
          bottom: 240,
          left: -midShift,
          width: '2160px',
          height: '440px',
        }}
        viewBox="0 0 2160 440"
        fill="none"
      >
        <path
          d="M 0 320 Q 320 160 620 280 Q 880 210 1080 340 Q 1400 160 1700 280 Q 1960 210 2160 340 L 2160 440 L 0 440 Z"
          fill={colors.mid}
        />
        {/* Subtle ridge highlights */}
        <path
          d="M 0 320 Q 320 160 620 280 Q 880 210 1080 340 Q 1400 160 1700 280 Q 1960 210 2160 340"
          stroke={colors.grassAccent}
          strokeWidth="3"
          opacity="0.6"
          fill="none"
        />
      </svg>

      {/* ================= 3. FOREGROUND HILL & WALKING PATH ================= */}
      <svg
        style={{
          position: 'absolute',
          bottom: 0,
          left: -frontShift,
          width: '2160px',
          height: '480px',
        }}
        viewBox="0 0 2160 480"
        fill="none"
      >
        {/* Foreground main ground */}
        <path
          d="M 0 160 Q 360 90 720 140 Q 940 180 1080 150 Q 1440 90 1800 140 Q 2020 180 2160 150 L 2160 480 L 0 480 Z"
          fill={colors.front}
        />

        {/* Earthen sacred walkway / trail */}
        <path
          d="M 0 210 Q 360 145 720 195 Q 940 230 1080 200 Q 1440 145 1800 195 Q 2020 230 2160 200 L 2160 480 L 0 480 Z"
          fill={colors.path}
          opacity="0.9"
        />

        {/* Gentle grass foliage tufts on path edge */}
        <g stroke={colors.grassAccent} strokeWidth="2.5" strokeLinecap="round" opacity="0.75">
          <path d="M 120 170 L 115 155 M 120 170 L 123 150 M 120 170 L 128 158" />
          <path d="M 440 135 L 436 122 M 440 135 L 442 118 M 440 135 L 448 124" />
          <path d="M 860 178 L 855 163 M 860 178 L 863 158 M 860 178 L 868 165" />
          <path d="M 1200 170 L 1195 155 M 1200 170 L 1203 150 M 1200 170 L 1208 158" />
          <path d="M 1520 135 L 1516 122 M 1520 135 L 1522 118 M 1520 135 L 1528 124" />
          <path d="M 1940 178 L 1935 163 M 1940 178 L 1943 158 M 1940 178 L 1948 165" />
        </g>
      </svg>
    </div>
  );
};

