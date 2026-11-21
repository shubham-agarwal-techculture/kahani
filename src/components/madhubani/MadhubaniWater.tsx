import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface MadhubaniWaterProps {
  y?: number;
  height?: number;
  speed?: number;
}

export const MadhubaniWater: React.FC<MadhubaniWaterProps> = ({
  y = 1380,
  height = 540,
  speed = 1.2,
}) => {
  const frame = useCurrentFrame();

  // Wave horizontal scrolling offset
  const waveShift = (frame * speed * 2) % 360;
  const fishSwim1 = (frame * 1.5) % 1200;
  const fishSwim2 = (frame * 1.8 + 500) % 1200;
  const fishSwim3 = (frame * 1.2 + 850) % 1200;

  return (
    <div
      style={{
        position: 'absolute',
        top: y,
        left: 0,
        width: '100%',
        height: height,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      <svg width="1080" height={height} viewBox={`0 0 1080 ${height}`} fill="none">
        {/* ================= 1. DEEP INDIGO OCEAN BASE ================= */}
        <rect x="0" y="0" width="1080" height={height} fill="#0D47A1" />

        {/* ================= 2. RHYTHMIC SCROLLING LAHAR (WAVES) ================= */}
        {/* Layer 1: Stylized Wave Crests with Double Black Outlines */}
        <g transform={`translate(${-waveShift}, 0)`}>
          <path
            d="M -360 40 Q -270 0 -180 40 Q -90 80 0 40 Q 90 0 180 40 Q 270 80 360 40 Q 450 0 540 40 Q 630 80 720 40 Q 810 0 900 40 Q 990 80 1080 40 Q 1170 0 1260 40 Q 1350 80 1440 40 L 1440 600 L -360 600 Z"
            fill="#1565C0"
            stroke="#1A1A1A"
            strokeWidth="3.5"
          />
          {/* Wave inner ripple kachni line */}
          <path
            d="M -360 48 Q -270 10 -180 48 Q -90 88 0 48 Q 90 10 180 48 Q 270 88 360 48 Q 450 10 540 48 Q 630 88 720 48 Q 810 10 900 48 Q 990 88 1080 48 Q 1170 10 1260 48"
            stroke="#FFF8E7"
            strokeWidth="2.5"
            fill="none"
          />
        </g>

        {/* Layer 2: Mid Water Current */}
        <g transform={`translate(${waveShift * 0.8}, 110)`}>
          <path
            d="M -200 40 Q -100 0 0 40 Q 100 80 200 40 Q 300 0 400 40 Q 500 80 600 40 Q 700 0 800 40 Q 900 80 1000 40 Q 1100 0 1200 40 Q 1300 80 1400 40"
            stroke="#42A5F5"
            strokeWidth="3"
            strokeDasharray="14 10"
            fill="none"
          />
        </g>

        {/* ================= 3. TRADITIONAL MITHILA PATTERNED FISH (Machhli) ================= */}
        {/* Fish 1 (Red & Turmeric with Cross-Hatched Scales) */}
        <g transform={`translate(${1100 - fishSwim1}, 90) scale(0.95)`}>
          {/* Main Fish Body */}
          <path
            d="M 0 0 C 40 -35 110 -35 150 0 C 110 35 40 35 0 0 Z"
            fill="#D32F2F"
            stroke="#1A1A1A"
            strokeWidth="3"
          />
          {/* Inner Double Line */}
          <path
            d="M 6 0 C 42 -30 106 -30 144 0 C 106 30 42 30 6 0"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Head Division */}
          <path d="M 38 -24 Q 46 0 38 24" stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
          {/* Almond Eye with Pupil */}
          <ellipse cx="22" cy="-4" rx="7" ry="5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="20" cy="-4" r="3" fill="#1A1A1A" />
          {/* Cross-Hatched Fine Kachni Scales on Body */}
          <path
            d="M 50 -20 L 70 20 M 68 -24 L 88 18 M 86 -22 L 106 16 M 104 -18 L 120 12"
            stroke="#FBC02D"
            strokeWidth="2"
          />
          <path
            d="M 70 -20 L 50 20 M 88 -24 L 68 18 M 106 -22 L 86 16 M 120 -18 L 104 12"
            stroke="#FBC02D"
            strokeWidth="2"
          />
          {/* Spreading Tail Fin with Double Contour */}
          <path
            d="M 150 0 L 195 -28 Q 180 0 195 28 Z"
            fill="#FBC02D"
            stroke="#1A1A1A"
            strokeWidth="3"
          />
          {/* Tail Hatching */}
          <line x1="152" y1="0" x2="190" y2="-20" stroke="#1A1A1A" strokeWidth="1.8" />
          <line x1="152" y1="0" x2="180" y2="0" stroke="#1A1A1A" strokeWidth="1.8" />
          <line x1="152" y1="0" x2="190" y2="20" stroke="#1A1A1A" strokeWidth="1.8" />
        </g>

        {/* Fish 2 (Leaf Green & Gold Fish Swimming Deep) */}
        <g transform={`translate(${1150 - fishSwim2}, 230) scale(0.85)`}>
          <path
            d="M 0 0 C 40 -32 110 -32 145 0 C 110 32 40 32 0 0 Z"
            fill="#2E7D32"
            stroke="#1A1A1A"
            strokeWidth="3"
          />
          <path d="M 36 -22 Q 44 0 36 22" stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
          <ellipse cx="20" cy="-4" rx="6" ry="4" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="18" cy="-4" r="2.5" fill="#1A1A1A" />
          {/* Kachni Scales */}
          <line x1="55" y1="-18" x2="65" y2="18" stroke="#FFF8E7" strokeWidth="2" />
          <line x1="75" y1="-22" x2="85" y2="22" stroke="#FFF8E7" strokeWidth="2" />
          <line x1="95" y1="-20" x2="105" y2="20" stroke="#FFF8E7" strokeWidth="2" />
          <line x1="115" y1="-16" x2="123" y2="16" stroke="#FFF8E7" strokeWidth="2" />
          {/* Tail */}
          <path d="M 145 0 L 188 -24 Q 175 0 188 24 Z" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="3" />
        </g>

        {/* Fish 3 (Small Auspicious Yellow Fish in Foreground) */}
        <g transform={`translate(${1120 - fishSwim3}, 380) scale(0.7)`}>
          <path
            d="M 0 0 C 40 -30 110 -30 140 0 C 110 30 40 30 0 0 Z"
            fill="#FBC02D"
            stroke="#1A1A1A"
            strokeWidth="3"
          />
          <path d="M 34 -20 Q 42 0 34 20" stroke="#1A1A1A" strokeWidth="2" fill="none" />
          <ellipse cx="18" cy="-4" rx="5" ry="3.5" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.8" />
          <circle cx="16" cy="-4" r="2" fill="#1A1A1A" />
          <line x1="55" y1="-16" x2="55" y2="16" stroke="#D32F2F" strokeWidth="2" />
          <line x1="75" y1="-20" x2="75" y2="20" stroke="#D32F2F" strokeWidth="2" />
          <line x1="95" y1="-18" x2="95" y2="18" stroke="#D32F2F" strokeWidth="2" />
          <path d="M 140 0 L 180 -20 Q 168 0 180 20 Z" fill="#1565C0" stroke="#1A1A1A" strokeWidth="2.5" />
        </g>
      </svg>
    </div>
  );
};

