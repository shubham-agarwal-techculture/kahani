import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface MadhubaniTreeProps {
  x?: number;
  y?: number;
  scale?: number;
  flip?: boolean;
}

export const MadhubaniTree: React.FC<MadhubaniTreeProps> = ({
  x = 120,
  y = 880,
  scale = 1,
  flip = false,
}) => {
  const frame = useCurrentFrame();

  // Subtle branch sway
  const sway = Math.sin(frame * 0.05) * 2;
  const birdFlutter = Math.sin(frame * 0.15) * 3;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `scale(${scale}) scaleX(${flip ? -1 : 1})`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
      }}
    >
      <svg width="420" height="700" viewBox="0 0 420 700" fill="none">
        {/* ================= 1. TRUNK & ROOTS WITH KACHNI HATCHING ================= */}
        {/* Main Gnarled Trunk */}
        <path
          d="M 180 700 Q 170 540 190 400 Q 200 320 210 220 L 225 220 Q 220 320 235 400 Q 255 540 245 700 Z"
          fill="#5D4037"
          stroke="#1A1A1A"
          strokeWidth="4"
        />

        {/* Double contour on Trunk */}
        <path
          d="M 188 695 Q 178 545 198 405 Q 207 325 214 225 L 221 225 Q 214 325 228 405 Q 247 545 237 695"
          stroke="#1A1A1A"
          strokeWidth="2"
          fill="none"
        />

        {/* Kachni Horizontal Hatching lines on trunk */}
        {[420, 450, 480, 510, 540, 570, 600, 630, 660].map((ly, idx) => (
          <line
            key={idx}
            x1="185"
            y1={ly}
            x2="240"
            y2={ly + 4}
            stroke="#1A1A1A"
            strokeWidth="2"
          />
        ))}

        {/* Roots spreading on the sacred earth */}
        <path d="M 180 690 Q 130 705 90 710" stroke="#1A1A1A" strokeWidth="5" fill="none" />
        <path d="M 245 690 Q 295 705 340 710" stroke="#1A1A1A" strokeWidth="5" fill="none" />

        {/* ================= 2. CANOPY BRANCHES (Curving Mithila vines) ================= */}
        <g transform={`rotate(${sway} 210 350)`}>
          {/* Main Left Branch */}
          <path
            d="M 200 360 Q 130 320 80 230 Q 50 180 60 120"
            stroke="#1A1A1A"
            strokeWidth="6"
            fill="none"
          />
          <path
            d="M 200 360 Q 130 320 80 230 Q 50 180 60 120"
            stroke="#2E7D32"
            strokeWidth="3"
            fill="none"
          />

          {/* Main Right Branch */}
          <path
            d="M 220 340 Q 290 300 340 220 Q 370 160 350 110"
            stroke="#1A1A1A"
            strokeWidth="6"
            fill="none"
          />
          <path
            d="M 220 340 Q 290 300 340 220 Q 370 160 350 110"
            stroke="#2E7D32"
            strokeWidth="3"
            fill="none"
          />

          {/* Central Crown Branch */}
          <path
            d="M 210 220 Q 190 140 210 70"
            stroke="#1A1A1A"
            strokeWidth="6"
            fill="none"
          />

          {/* Stylized Madhubani Leaf Clusters (Almond / Teardrop shape with vein hatching) */}
          {[
            { cx: 60, cy: 120, r: 24, c: '#2E7D32' },
            { cx: 90, cy: 160, r: 26, c: '#D32F2F' },
            { cx: 130, cy: 190, r: 28, c: '#FBC02D' },
            { cx: 170, cy: 120, r: 24, c: '#2E7D32' },
            { cx: 210, cy: 65, r: 30, c: '#D32F2F' },
            { cx: 250, cy: 120, r: 25, c: '#FBC02D' },
            { cx: 290, cy: 180, r: 28, c: '#2E7D32' },
            { cx: 340, cy: 210, r: 26, c: '#D32F2F' },
            { cx: 350, cy: 110, r: 24, c: '#FBC02D' },
            { cx: 160, cy: 260, r: 22, c: '#2E7D32' },
            { cx: 260, cy: 250, r: 22, c: '#D32F2F' },
          ].map((l, i) => (
            <g key={i} transform={`translate(${l.cx}, ${l.cy})`}>
              {/* Outer double line leaf */}
              <ellipse cx="0" cy="0" rx={l.r} ry={l.r * 0.65} fill={l.c} stroke="#1A1A1A" strokeWidth="3" />
              <ellipse cx="0" cy="0" rx={l.r - 4} ry={l.r * 0.65 - 3} fill="none" stroke="#1A1A1A" strokeWidth="1.5" />
              {/* Central Spine & fine rib hatching */}
              <line x1={-l.r + 4} y1="0" x2={l.r - 4} y2="0" stroke="#1A1A1A" strokeWidth="2" />
              <line x1="-8" y1="-8" x2="0" y2="0" stroke="#1A1A1A" strokeWidth="1.5" />
              <line x1="8" y1="-8" x2="0" y2="0" stroke="#1A1A1A" strokeWidth="1.5" />
              <line x1="-8" y1="8" x2="0" y2="0" stroke="#1A1A1A" strokeWidth="1.5" />
              <line x1="8" y1="8" x2="0" y2="0" stroke="#1A1A1A" strokeWidth="1.5" />
            </g>
          ))}

          {/* ================= 3. PERCHED MITHILA BIRDS (Tota / Maina) ================= */}
          {/* Bird on Left Branch */}
          <g transform={`translate(95, 205) rotate(${-15 + birdFlutter})`}>
            {/* Body */}
            <path
              d="M 0 0 Q -25 -20 -40 -10 Q -45 10 -25 20 Q -5 20 0 0 Z"
              fill="#2E7D32"
              stroke="#1A1A1A"
              strokeWidth="2.5"
            />
            {/* Wing with Red & Yellow Kachni */}
            <path
              d="M -15 0 Q -30 -10 -35 10 Q -20 15 -15 0 Z"
              fill="#D32F2F"
              stroke="#1A1A1A"
              strokeWidth="2"
            />
            {/* Long Stylized Tail Feather */}
            <path d="M -38 12 Q -70 30 -85 50 L -75 42 Q -55 25 -32 18 Z" fill="#1565C0" stroke="#1A1A1A" strokeWidth="2" />
            {/* Head & Beak */}
            <circle cx="5" cy="-8" r="9" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
            <polygon points="12,-10 24,-7 12,-4" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="1.5" />
            {/* Almond Eye */}
            <circle cx="6" cy="-8" r="2.5" fill="#1A1A1A" />
            <circle cx="7" cy="-9" r="0.8" fill="#FFFFFF" />
          </g>

          {/* Bird on Right Branch */}
          <g transform={`translate(310, 240) scaleX(-1) rotate(${10 - birdFlutter})`}>
            <path
              d="M 0 0 Q -25 -20 -40 -10 Q -45 10 -25 20 Q -5 20 0 0 Z"
              fill="#1565C0"
              stroke="#1A1A1A"
              strokeWidth="2.5"
            />
            <path
              d="M -15 0 Q -30 -10 -35 10 Q -20 15 -15 0 Z"
              fill="#FBC02D"
              stroke="#1A1A1A"
              strokeWidth="2"
            />
            <path d="M -38 12 Q -65 28 -80 45 L -72 38 Q -55 25 -32 18 Z" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2" />
            <circle cx="5" cy="-8" r="9" fill="#2E7D32" stroke="#1A1A1A" strokeWidth="2" />
            <polygon points="12,-10 24,-7 12,-4" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="1.5" />
            <circle cx="6" cy="-8" r="2.5" fill="#1A1A1A" />
            <circle cx="7" cy="-9" r="0.8" fill="#FFFFFF" />
          </g>
        </g>
      </svg>
    </div>
  );
};

