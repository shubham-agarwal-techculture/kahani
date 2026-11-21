import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface MadhubaniSquirrelProps {
  x?: number;
  y?: number;
  scale?: number;
  pose?: 'standing' | 'rolling' | 'shaking' | 'praying' | 'blessed';
  hasThreeStripes?: boolean;
}

export const MadhubaniSquirrel: React.FC<MadhubaniSquirrelProps> = ({
  x = 540,
  y = 1200,
  scale = 1,
  pose = 'standing',
  hasThreeStripes = false,
}) => {
  const frame = useCurrentFrame();

  // Breathing and natural twitch
  const breath = Math.sin(frame * 0.12) * 2;
  const tailSway = Math.sin(frame * 0.18) * 6;
  const isBlinking = frame % 70 > 65;

  // Rolling motion (if pose === 'rolling')
  const rollAngle = pose === 'rolling' ? Math.sin(frame * 0.25) * 35 : 0;
  // Shaking motion (if pose === 'shaking')
  const shakeX = pose === 'shaking' ? Math.sin(frame * 0.8) * 8 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x + shakeX,
        top: y + breath,
        transform: `scale(${scale}) rotate(${rollAngle}deg)`,
        transformOrigin: 'bottom center',
        pointerEvents: 'none',
      }}
    >
      <svg width="240" height="240" viewBox="0 0 240 240" fill="none">
        {/* ================= 1. BUSHY STYLIZED MITHILA TAIL ================= */}
        <g transform={`rotate(${tailSway} 90 170)`}>
          {/* Main S-Curve Bushy Tail with Double Black Outline */}
          <path
            d="M 90 175 C 60 170 30 130 35 80 C 40 30 90 10 115 35 C 130 50 120 85 95 95 C 65 105 75 145 95 170 Z"
            fill="#D32F2F"
            stroke="#1A1A1A"
            strokeWidth="3.5"
          />
          {/* Tail Inner Contour */}
          <path
            d="M 88 168 C 65 160 42 125 45 82 C 48 40 88 22 108 42 C 120 54 112 80 92 88 C 68 98 78 138 92 165"
            stroke="#1A1A1A"
            strokeWidth="1.8"
            fill="none"
          />
          {/* Alternating Red / Yellow Kachni Hatching Segments inside tail */}
          {[45, 65, 85, 105, 125, 145].map((ty, i) => (
            <line
              key={i}
              x1="45"
              y1={ty}
              x2="95"
              y2={ty - 10}
              stroke="#FBC02D"
              strokeWidth="2.5"
            />
          ))}
          {/* Tail Tip Rosette */}
          <circle cx="112" cy="38" r="8" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
        </g>

        {/* ================= 2. SQUIRREL BODY ================= */}
        {/* Hind Leg / Haunch */}
        <ellipse cx="115" cy="175" rx="26" ry="18" fill="#F57C00" stroke="#1A1A1A" strokeWidth="3" />
        <path d="M 105 185 L 125 192 L 140 192" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />

        {/* Main Torso */}
        <path
          d="M 95 170 C 90 140 105 110 125 100 C 145 90 160 110 155 145 C 150 175 130 190 105 185 Z"
          fill="#E65100"
          stroke="#1A1A1A"
          strokeWidth="3.5"
        />
        {/* Belly Patch (Cream White) */}
        <path
          d="M 125 110 C 142 105 152 125 148 155 C 144 175 132 185 118 180 C 130 160 130 130 125 110 Z"
          fill="#FFF8E7"
          stroke="#1A1A1A"
          strokeWidth="2"
        />

        {/* ================= 3. THREE SACRED DIVINE STRIPES ================= */}
        {/* The three blessed stripes given by Shri Rama! */}
        {(hasThreeStripes || pose === 'blessed') && (
          <g id="sacred-stripes">
            {/* Stripe 1 */}
            <path
              d="M 102 125 Q 106 145 105 168"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px #FFF)"
            />
            {/* Stripe 2 (Center) */}
            <path
              d="M 112 120 Q 116 145 114 170"
              stroke="#FFFFFF"
              strokeWidth="6"
              strokeLinecap="round"
              filter="drop-shadow(0 0 8px #FFF)"
            />
            {/* Stripe 3 */}
            <path
              d="M 122 125 Q 126 145 124 168"
              stroke="#FFFFFF"
              strokeWidth="5"
              strokeLinecap="round"
              filter="drop-shadow(0 0 6px #FFF)"
            />
          </g>
        )}

        {/* Sand grains / pebbles sticking to body if rolling/shaking */}
        {(pose === 'rolling' || pose === 'shaking') && (
          <g id="sand-grains">
            <circle cx="102" cy="130" r="3" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="1" />
            <circle cx="112" cy="145" r="3.5" fill="#FFE082" stroke="#1A1A1A" strokeWidth="1" />
            <circle cx="120" cy="135" r="2.5" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="1" />
            <circle cx="108" cy="160" r="3" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="1" />
            <circle cx="126" cy="155" r="3" fill="#FFE082" stroke="#1A1A1A" strokeWidth="1" />
          </g>
        )}

        {/* ================= 4. SQUIRREL HEAD ================= */}
        {/* Head Contour */}
        <path
          d="M 125 102 C 120 75 145 60 162 70 C 178 80 180 102 165 115 C 150 125 130 120 125 102 Z"
          fill="#E65100"
          stroke="#1A1A1A"
          strokeWidth="3"
        />

        {/* Ears with Inner Pinkish Fill */}
        <polygon points="135,72 142,50 150,70" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2.5" />
        <polygon points="148,68 156,48 162,68" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2.5" />

        {/* Snout & Whiskers */}
        <path d="M 166 90 L 178 95 L 168 102 Z" fill="#FFF8E7" stroke="#1A1A1A" strokeWidth="2" />
        <circle cx="178" cy="95" r="2.5" fill="#1A1A1A" />
        {/* Whiskers */}
        <line x1="172" y1="92" x2="190" y2="86" stroke="#1A1A1A" strokeWidth="1.8" />
        <line x1="174" y1="96" x2="192" y2="96" stroke="#1A1A1A" strokeWidth="1.8" />
        <line x1="172" y1="100" x2="188" y2="106" stroke="#1A1A1A" strokeWidth="1.8" />

        {/* Large Almond-Shaped Madhubani Eye */}
        {isBlinking ? (
          <path d="M 144 86 Q 152 92 160 86" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" />
        ) : (
          <>
            <path
              d="M 142 86 Q 152 78 162 86 Q 152 94 142 86 Z"
              fill="#FFFFFF"
              stroke="#1A1A1A"
              strokeWidth="2.5"
            />
            <circle cx="152" cy="86" r="4.5" fill="#1A1A1A" />
            <circle cx="154" cy="84" r="1.5" fill="#FFFFFF" />
          </>
        )}

        {/* ================= 5. FOREPAWS ================= */}
        {pose === 'praying' ? (
          /* Paws respectfully folded together (Pranam) */
          <g transform="translate(155, 115)">
            <ellipse cx="6" cy="0" rx="9" ry="5" fill="#FFF8E7" stroke="#1A1A1A" strokeWidth="2.5" />
            <ellipse cx="6" cy="-4" rx="9" ry="5" fill="#FFF8E7" stroke="#1A1A1A" strokeWidth="2.5" />
          </g>
        ) : (
          /* Normal energetic little paws */
          <g transform="translate(150, 120)">
            <path d="M 0 0 Q 14 5 18 15 L 14 18" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" fill="none" />
            <circle cx="16" cy="16" r="4" fill="#FFF8E7" stroke="#1A1A1A" strokeWidth="1.5" />
          </g>
        )}
      </svg>
    </div>
  );
};

