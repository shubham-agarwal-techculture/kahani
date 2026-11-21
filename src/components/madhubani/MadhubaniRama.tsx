import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface MadhubaniRamaProps {
  x?: number;
  y?: number;
  scale?: number;
  holdingSquirrel?: boolean;
  isBlessing?: boolean;
}

export const MadhubaniRama: React.FC<MadhubaniRamaProps> = ({
  x = 300,
  y = 450,
  scale = 1,
  holdingSquirrel = true,
  isBlessing = false,
}) => {
  const frame = useCurrentFrame();

  const breath = Math.sin(frame * 0.08) * 2;
  const isBlinking = frame % 90 > 84;
  const blessingStroke = isBlessing ? Math.sin(frame * 0.2) * 5 : 0;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y + breath,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        zIndex: 25,
        pointerEvents: 'none',
      }}
    >
      <svg width="480" height="680" viewBox="0 0 480 680" fill="none">
        {/* ================= 1. DIVINE GOLDEN HALO (Prabhavali) ================= */}
        <g id="halo" transform="translate(240, 140)">
          <circle cx="0" cy="0" r="110" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="4" />
          <circle cx="0" cy="0" r="102" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="5 4" />
          <circle cx="0" cy="0" r="92" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="3" />
          <circle cx="0" cy="0" r="82" fill="#FFF8E7" stroke="#1A1A1A" strokeWidth="2.5" />
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((ang, i) => (
            <line
              key={i}
              x1={Math.cos((ang * Math.PI) / 180) * 82}
              y1={Math.sin((ang * Math.PI) / 180) * 82}
              x2={Math.cos((ang * Math.PI) / 180) * 110}
              y2={Math.sin((ang * Math.PI) / 180) * 110}
              stroke="#1A1A1A"
              strokeWidth="2"
            />
          ))}
        </g>

        {/* ================= 2. SACRED BOW (Kodanda) SLUNG ON SHOULDER ================= */}
        <g id="kodanda-bow">
          <path
            d="M 125 50 Q 95 310 120 580"
            stroke="#1A1A1A"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 125 50 Q 95 310 120 580"
            stroke="#FBC02D"
            strokeWidth="3.5"
            fill="none"
          />
          <line x1="125" y1="55" x2="120" y2="575" stroke="#FFF8E7" strokeWidth="2" />
          <circle cx="125" cy="52" r="8" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="120" cy="578" r="8" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
        </g>

        {/* ================= 3. LEGS & FEET (Feet end at y=610) ================= */}
        <path
          d="M 190 420 Q 180 520 205 580 L 235 580 Q 230 500 225 420 Z"
          fill="#42A5F5"
          stroke="#1A1A1A"
          strokeWidth="3.5"
        />
        <path
          d="M 255 420 Q 250 520 275 580 L 305 580 Q 300 500 290 420 Z"
          fill="#42A5F5"
          stroke="#1A1A1A"
          strokeWidth="3.5"
        />
        {/* Feet with Red Alta Dye on border */}
        <path d="M 205 580 L 195 610 L 245 610 L 235 580 Z" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="3" />
        <path d="M 195 605 L 245 605" stroke="#D32F2F" strokeWidth="3" />
        <path d="M 275 580 L 265 610 L 315 610 L 305 580 Z" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="3" />
        <path d="M 265 605 L 315 605" stroke="#D32F2F" strokeWidth="3" />

        {/* ================= 4. PITAMBARA (Yellow Silk Dhoti with Kachni) ================= */}
        <path
          d="M 175 360 Q 160 450 185 520 L 295 520 Q 320 450 305 360 Z"
          fill="#FBC02D"
          stroke="#1A1A1A"
          strokeWidth="4"
        />
        <path
          d="M 183 365 Q 170 445 193 510 L 287 510 Q 310 445 297 365"
          stroke="#1A1A1A"
          strokeWidth="2"
          fill="none"
        />
        {[390, 420, 450, 480, 505].map((dy, i) => (
          <line key={i} x1="180" y1={dy} x2="300" y2={dy + 8} stroke="#1A1A1A" strokeWidth="2" />
        ))}
        <path d="M 185 520 L 295 520" stroke="#D32F2F" strokeWidth="6" />

        {/* Kamarband */}
        <rect x="172" y="355" width="136" height="18" rx="4" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="3" />
        <circle cx="240" cy="364" r="10" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2.5" />
        <circle cx="240" cy="364" r="4" fill="#1565C0" />

        {/* ================= 5. TORSO & NATURAL PROPORTIONED NECK ================= */}
        {/* Neel-Varna Torso */}
        <path
          d="M 180 205 Q 165 280 178 365 L 302 365 Q 315 280 300 205 Z"
          fill="#42A5F5"
          stroke="#1A1A1A"
          strokeWidth="4"
        />
        <path
          d="M 188 210 Q 175 280 188 358 L 292 358 Q 305 280 292 210"
          stroke="#1A1A1A"
          strokeWidth="2"
          fill="none"
        />

        {/* Sturdy Neel Neck connecting smoothly into chin at y=175 */}
        <path d="M 226 160 L 226 210 L 254 210 L 254 160 Z" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="3" />

        {/* Sacred Thread (Yajnopavita / Janeu) */}
        <path
          d="M 195 205 Q 235 275 255 365"
          stroke="#FFF8E7"
          strokeWidth="3.5"
          strokeDasharray="6 3"
          fill="none"
        />
        <path
          d="M 195 205 Q 235 275 255 365"
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeDasharray="6 3"
          fill="none"
        />

        {/* Angavastram (Saffron cloth) */}
        <path
          d="M 180 205 Q 225 255 302 365 L 282 370 Q 205 270 170 210 Z"
          fill="#E65100"
          stroke="#1A1A1A"
          strokeWidth="3"
        />

        {/* Gold Kantha (Necklace) */}
        <path
          d="M 205 205 Q 240 230 275 205"
          stroke="#FBC02D"
          strokeWidth="9"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 205 205 Q 240 230 275 205"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeDasharray="4 3"
          fill="none"
        />
        <circle cx="240" cy="220" r="6" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2" />

        {/* ================= 6. SACRED FACE (Calm, Serene, Respectful) ================= */}
        <g id="rama-face" transform="translate(240, 140)">
          {/* Head Base: Chin at y=35 (y=175 absolute) */}
          <path
            d="M -30 -35 C -30 -10 -25 35 0 35 C 25 35 30 -10 30 -35 C 30 -60 -30 -60 -30 -35 Z"
            fill="#42A5F5"
            stroke="#1A1A1A"
            strokeWidth="3.5"
          />

          {/* Kundalas */}
          <ellipse cx="-32" cy="-6" rx="6" ry="10" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="2" />
          <ellipse cx="32" cy="-6" rx="6" ry="10" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="-32" cy="6" r="7" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="32" cy="6" r="7" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />

          {/* Eyebrows */}
          <path d="M -24 -15 Q -14 -22 -4 -15" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 4 -15 Q 14 -22 24 -15" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Serene Lotus Eyes */}
          {isBlinking ? (
            <>
              <path d="M -22 -8 Q -14 -2 -6 -8" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 6 -8 Q 14 -2 22 -8" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M -24 -8 Q -14 -16 -4 -8 Q -14 0 -24 -8 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
              <circle cx="-13" cy="-8" r="4" fill="#1A1A1A" />
              <circle cx="-12" cy="-9" r="1.2" fill="#FFFFFF" />

              <path d="M 4 -8 Q 14 -16 24 -8 Q 14 0 4 -8 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
              <circle cx="13" cy="-8" r="4" fill="#1A1A1A" />
              <circle cx="14" cy="-9" r="1.2" fill="#FFFFFF" />
            </>
          )}

          {/* Calm Nose */}
          <path d="M 0 -14 L -2 6 Q 3 9 4 6" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Infinitely Calm, Compassionate Smile */}
          <path d="M -10 18 Q 0 25 10 18 Q 0 22 -10 18 Z" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2" />

          {/* Chandan Tilak */}
          <path d="M -4 -42 L -4 -20 Q 0 -15 4 -20 L 4 -42 Z" fill="#FFF8E7" stroke="#1A1A1A" strokeWidth="1.5" />
          <line x1="0" y1="-38" x2="0" y2="-18" stroke="#D32F2F" strokeWidth="2.5" />

          {/* Ornate Mukut with Peacock Feather */}
          <path d="M -28 -35 L -32 -60 L 0 -85 L 32 -60 L 28 -35 Z" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="3.5" />
          <circle cx="0" cy="-60" r="7" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="-16" cy="-50" r="5" fill="#2E7D32" stroke="#1A1A1A" strokeWidth="1.5" />
          <circle cx="16" cy="-50" r="5" fill="#2E7D32" stroke="#1A1A1A" strokeWidth="1.5" />
          <g transform="translate(0, -90)">
            <ellipse cx="0" cy="-14" rx="12" ry="18" fill="#1565C0" stroke="#1A1A1A" strokeWidth="2.5" />
            <ellipse cx="0" cy="-14" rx="8" ry="12" fill="#2E7D32" stroke="#1A1A1A" strokeWidth="1.8" />
            <circle cx="0" cy="-14" r="5" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="1.5" />
            <circle cx="0" cy="-14" r="2.5" fill="#1A1A1A" />
          </g>
        </g>

        {/* ================= 7. ARMS & CRADLED SQUIRREL ================= */}
        {holdingSquirrel && (
          <g id="arms-and-squirrel">
            {/* Left Arm: From left shoulder (180, 210) down to palm at (265, 310) */}
            <path
              d="M 180 215 Q 150 290 220 310 L 260 310 Q 210 270 200 215 Z"
              fill="#42A5F5"
              stroke="#1A1A1A"
              strokeWidth="3.5"
            />
            <rect x="165" y="245" width="16" height="6" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />

            {/* Sacred Open Palm with Red Alta Border */}
            <ellipse cx="265" cy="305" rx="30" ry="14" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M 238 305 Q 265 314 292 305" stroke="#D32F2F" strokeWidth="3" fill="none" />

            {/* The Tiny Squirrel Resting Safely in Shri Rama's Palm */}
            <g transform="translate(245, 250) scale(0.42)">
              <path
                d="M 30 60 C 20 40 30 10 60 20 C 80 15 90 40 85 65 C 80 90 40 95 30 60 Z"
                fill="#E65100"
                stroke="#1A1A1A"
                strokeWidth="4"
              />
              <path
                d="M 30 65 C 10 50 -10 20 15 5 C 30 -5 40 15 35 35 Z"
                fill="#D32F2F"
                stroke="#1A1A1A"
                strokeWidth="4"
              />
              <circle cx="70" cy="30" r="5" fill="#1A1A1A" />
              <circle cx="72" cy="28" r="1.5" fill="#FFFFFF" />

              {/* Three Blessed Stripes */}
              {isBlessing && (
                <>
                  <path d="M 45 35 Q 52 50 50 68" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 55 32 Q 62 50 60 70" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
                  <path d="M 65 35 Q 72 50 70 68" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                </>
              )}
            </g>

            {/* Right Arm: From right shoulder (300, 215) down to stroke the squirrel */}
            <g id="right-arm-stroking">
              <path
                d="M 300 215 Q 325 275 290 290 L 275 280 Q 305 245 285 215 Z"
                fill="#42A5F5"
                stroke="#1A1A1A"
                strokeWidth="3.5"
              />
              <rect x="295" y="245" width="16" height="6" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
              {/* Three divine gentle fingertips touching the squirrel */}
              <g transform={`translate(${blessingStroke}, 0)`}>
                <path d="M 275 280 Q 265 270 255 265" stroke="#42A5F5" strokeWidth="7" strokeLinecap="round" />
                <path d="M 275 280 Q 265 270 255 265" stroke="#1A1A1A" strokeWidth="2" fill="none" />
                <path d="M 278 283 Q 268 273 258 268" stroke="#42A5F5" strokeWidth="6" strokeLinecap="round" />
                <path d="M 281 286 Q 271 276 261 271" stroke="#42A5F5" strokeWidth="5" strokeLinecap="round" />
              </g>
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};
