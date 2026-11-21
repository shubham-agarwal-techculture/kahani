import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface MadhubaniVanarProps {
  x?: number;
  y?: number;
  scale?: number;
  action?: 'lifting' | 'pointing' | 'walking';
  boulderText?: string;
}

export const MadhubaniVanar: React.FC<MadhubaniVanarProps> = ({
  x = 380,
  y = 860,
  scale = 1,
  action = 'lifting',
  boulderText = 'श्री राम',
}) => {
  const frame = useCurrentFrame();

  const breath = Math.sin(frame * 0.1) * 3;
  const isBlinking = frame % 80 > 75;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + breath,
        transform: `scale(${scale})`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
      }}
    >
      <svg width="420" height="580" viewBox="0 0 420 580" fill="none">
        {/* ================= 1. MASSIVE STONE BOULDER (Floating with "श्री राम") ================= */}
        {action === 'lifting' && (
          <g transform={`translate(160, 40)`}>
            {/* Mountain Rock with double black outline */}
            <polygon
              points="0,80 40,20 140,0 200,40 220,110 160,160 30,150"
              fill="#78909C"
              stroke="#1A1A1A"
              strokeWidth="5"
            />
            {/* Rock internal cracks & texture */}
            <polygon
              points="10,80 46,28 136,12 190,48 208,110 152,150 36,142"
              fill="none"
              stroke="#1A1A1A"
              strokeWidth="2.5"
            />
            <line x1="40" y1="20" x2="80" y2="80" stroke="#1A1A1A" strokeWidth="2" />
            <line x1="140" y1="0" x2="110" y2="70" stroke="#1A1A1A" strokeWidth="2" />
            <line x1="110" y1="70" x2="160" y2="160" stroke="#1A1A1A" strokeWidth="2" />

            {/* Sacred Inscription "श्री राम" in bold Madhubani Red */}
            <text
              x="105"
              y="96"
              fill="#D32F2F"
              stroke="#1A1A1A"
              strokeWidth="1.5"
              fontSize="34"
              fontWeight="900"
              textAnchor="middle"
              fontFamily="'Segoe UI', Roboto, sans-serif"
            >
              {boulderText}
            </text>
          </g>
        )}

        {/* ================= 2. VANAR TAIL ================= */}
        {/* High S-Curving Tail with Sacred Rosette */}
        <path
          d="M 120 420 Q 40 380 30 250 Q 20 120 70 80 Q 110 50 120 90 Q 130 130 80 160 Q 60 250 130 380 Z"
          fill="#D84315"
          stroke="#1A1A1A"
          strokeWidth="4"
        />
        {/* Tail tip lotus bud */}
        <circle cx="108" cy="85" r="14" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="3" />

        {/* ================= 3. POWERFUL LEGS & DHOTI ================= */}
        {/* Dhoti in Turmeric Yellow with Red Kachni borders */}
        <path
          d="M 110 380 Q 90 480 120 520 L 150 520 Q 140 450 145 380 Z"
          fill="#FBC02D"
          stroke="#1A1A1A"
          strokeWidth="3.5"
        />
        <path
          d="M 170 380 Q 190 480 160 520 L 195 520 Q 205 450 185 380 Z"
          fill="#FBC02D"
          stroke="#1A1A1A"
          strokeWidth="3.5"
        />
        {/* Dhoti Central Pleats */}
        <path d="M 138 380 L 132 510 L 165 510 L 158 380 Z" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2.5" />

        {/* Feet */}
        <path d="M 120 520 L 110 540 L 155 540 L 150 520 Z" fill="#8D6E63" stroke="#1A1A1A" strokeWidth="3" />
        <path d="M 160 520 L 155 540 L 200 540 L 195 520 Z" fill="#8D6E63" stroke="#1A1A1A" strokeWidth="3" />

        {/* ================= 4. MUSCULAR TORSO WITH KACHNI ================= */}
        <path
          d="M 120 220 Q 95 300 115 390 L 185 390 Q 205 300 180 220 Z"
          fill="#8D6E63"
          stroke="#1A1A1A"
          strokeWidth="4"
        />
        {/* Chest Hatching */}
        <path d="M 132 260 Q 150 280 168 260" stroke="#1A1A1A" strokeWidth="2.5" fill="none" />
        <path d="M 132 290 Q 150 310 168 290" stroke="#1A1A1A" strokeWidth="2.5" fill="none" />

        {/* Gold Kamarband (Waist Sash) */}
        <rect x="112" y="375" width="76" height="15" rx="4" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="3" />
        <circle cx="150" cy="382" r="8" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />

        {/* ================= 5. ARMS ================= */}
        {action === 'lifting' ? (
          /* Arms Raised Overhead Holding Boulder */
          <>
            <path
              d="M 125 240 Q 110 160 170 120 L 185 130 Q 140 180 145 240 Z"
              fill="#8D6E63"
              stroke="#1A1A1A"
              strokeWidth="3.5"
            />
            <path
              d="M 175 240 Q 210 160 230 110 L 245 122 Q 220 180 195 240 Z"
              fill="#8D6E63"
              stroke="#1A1A1A"
              strokeWidth="3.5"
            />
            {/* Gold Bajuband (Armlets) */}
            <rect x="120" y="170" width="18" height="6" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
            <rect x="210" y="150" width="18" height="6" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
          </>
        ) : (
          /* Arm Pointing Mockingly at the Squirrel */
          <>
            <path
              d="M 125 240 Q 110 300 115 350 L 132 350 Q 130 300 145 240 Z"
              fill="#8D6E63"
              stroke="#1A1A1A"
              strokeWidth="3.5"
            />
            {/* Right Arm Extended Pointing Down */}
            <path
              d="M 180 240 Q 240 280 290 310 L 285 328 Q 230 290 175 255 Z"
              fill="#8D6E63"
              stroke="#1A1A1A"
              strokeWidth="3.5"
            />
            {/* Hand Pointing Index Finger */}
            <circle cx="295" cy="315" r="8" fill="#8D6E63" stroke="#1A1A1A" strokeWidth="2.5" />
            <line x1="298" y1="315" x2="318" y2="325" stroke="#1A1A1A" strokeWidth="4" strokeLinecap="round" />
          </>
        )}

        {/* ================= 6. HEAD & EXPRESSIVE FACE ================= */}
        <g id="vanar-head" transform="translate(150, 190)">
          {/* Head Base */}
          <circle cx="0" cy="0" r="32" fill="#8D6E63" stroke="#1A1A1A" strokeWidth="3.5" />
          {/* Muzzle / Jaw */}
          <ellipse cx="6" cy="12" rx="20" ry="15" fill="#D84315" stroke="#1A1A1A" strokeWidth="2.5" />
          {/* Mouth */}
          <path d="M -6 14 Q 6 22 18 14" stroke="#1A1A1A" strokeWidth="2.5" fill="none" />

          {/* Large Almond Eyes with Arched Brows */}
          {isBlinking ? (
            <path d="M -12 -4 Q 0 4 12 -4" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
          ) : (
            <>
              {/* Left Eye */}
              <path d="M -16 -6 Q -6 -12 2 -4 Q -6 2 -16 -6 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
              <circle cx="-7" cy="-5" r="3" fill="#1A1A1A" />
              {/* Right Eye */}
              <path d="M 6 -4 Q 14 -12 24 -6 Q 14 2 6 -4 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2" />
              <circle cx="15" cy="-5" r="3" fill="#1A1A1A" />
            </>
          )}

          {/* Crown / Mukut */}
          <polygon points="-24,-24 0,-48 24,-24" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="3" />
          <circle cx="0" cy="-34" r="5" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="1.5" />
          {/* Kundal (Earrings) */}
          <circle cx="-32" cy="6" r="6" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="32" cy="6" r="6" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
};

