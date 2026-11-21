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
  x = 360,
  y = 780,
  scale = 1,
  holdingSquirrel = true,
  isBlessing = false,
}) => {
  const frame = useCurrentFrame();

  // Subtle divine breathing
  const breath = Math.sin(frame * 0.08) * 2.5;
  const isBlinking = frame % 90 > 84;
  const blessingStroke = isBlessing ? Math.sin(frame * 0.15) * 6 : 0;

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
      <svg width="480" height="680" viewBox="0 0 480 680" fill="none">
        {/* ================= 1. DIVINE GOLDEN HALO (Prabhavali) ================= */}
        <g transform="translate(240, 150)">
          {/* Outer Sunburst Halo with Double Black Outlines */}
          <circle cx="0" cy="0" r="105" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="4" />
          <circle cx="0" cy="0" r="95" fill="none" stroke="#1A1A1A" strokeWidth="2.5" strokeDasharray="6 4" />
          <circle cx="0" cy="0" r="85" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="3" />
          <circle cx="0" cy="0" r="75" fill="#FFF8E7" stroke="#1A1A1A" strokeWidth="2.5" />
          {/* 16 Radial Kachni Spoke Rays */}
          {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((ang, i) => (
            <line
              key={i}
              x1={Math.cos((ang * Math.PI) / 180) * 85}
              y1={Math.sin((ang * Math.PI) / 180) * 85}
              x2={Math.cos((ang * Math.PI) / 180) * 105}
              y2={Math.sin((ang * Math.PI) / 180) * 105}
              stroke="#1A1A1A"
              strokeWidth="2"
            />
          ))}
        </g>

        {/* ================= 2. SACRED BOW (Kodanda) SLUNG ON SHOULDER ================= */}
        <g id="kodanda-bow">
          <path
            d="M 140 100 Q 110 320 135 560"
            stroke="#1A1A1A"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 140 100 Q 110 320 135 560"
            stroke="#FBC02D"
            strokeWidth="3.5"
            fill="none"
          />
          {/* Bowstring */}
          <line x1="140" y1="105" x2="135" y2="555" stroke="#FFF8E7" strokeWidth="2" />
          {/* Golden finials */}
          <circle cx="140" cy="102" r="8" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="135" cy="558" r="8" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
        </g>

        {/* ================= 3. LEGS & PITAMBARA (Yellow Silk with Kachni) ================= */}
        {/* Legs in traditional graceful standing posture */}
        <path
          d="M 195 440 Q 185 540 215 590 L 245 590 Q 235 510 230 440 Z"
          fill="#42A5F5"
          stroke="#1A1A1A"
          strokeWidth="3.5"
        />
        <path
          d="M 255 440 Q 245 540 275 590 L 305 590 Q 295 510 290 440 Z"
          fill="#42A5F5"
          stroke="#1A1A1A"
          strokeWidth="3.5"
        />
        {/* Feet with Red Alta Dye on border */}
        <path d="M 215 590 L 205 615 L 255 615 L 245 590 Z" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="3" />
        <path d="M 205 610 L 255 610" stroke="#D32F2F" strokeWidth="3" />
        <path d="M 275 590 L 265 615 L 315 615 L 305 590 Z" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="3" />
        <path d="M 265 610 L 315 610" stroke="#D32F2F" strokeWidth="3" />

        {/* Pitambara Dhoti (Bright Yellow with Red borders and dense black Kachni lines) */}
        <path
          d="M 180 380 Q 165 470 190 530 L 290 530 Q 315 470 300 380 Z"
          fill="#FBC02D"
          stroke="#1A1A1A"
          strokeWidth="4"
        />
        {/* Inner double outline */}
        <path
          d="M 188 385 Q 175 465 198 520 L 282 520 Q 305 465 292 385"
          stroke="#1A1A1A"
          strokeWidth="2"
          fill="none"
        />
        {/* Kachni Hatching on Dhoti */}
        {[410, 435, 460, 485, 510].map((dy, i) => (
          <line key={i} x1="185" y1={dy} x2="295" y2={dy + 8} stroke="#1A1A1A" strokeWidth="2" />
        ))}
        {/* Red border rim on Dhoti */}
        <path d="M 190 530 L 290 530" stroke="#D32F2F" strokeWidth="6" />

        {/* Kamarband (Royal Waist Sash) */}
        <rect x="178" y="375" width="124" height="18" rx="4" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="3" />
        <circle cx="240" cy="384" r="10" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2.5" />
        <circle cx="240" cy="384" r="4" fill="#1565C0" />

        {/* ================= 4. TORSO (Neel Varna - Blue with Sacred Thread) ================= */}
        <path
          d="M 190 220 Q 170 300 185 385 L 295 385 Q 310 300 290 220 Z"
          fill="#42A5F5"
          stroke="#1A1A1A"
          strokeWidth="4"
        />
        {/* Double contour on torso */}
        <path
          d="M 198 225 Q 180 300 195 378 L 285 378 Q 300 300 282 225"
          stroke="#1A1A1A"
          strokeWidth="1.8"
          fill="none"
        />

        {/* Sacred Thread (Yajnopavita / Janeu) */}
        <path
          d="M 205 220 Q 240 290 260 380"
          stroke="#FFF8E7"
          strokeWidth="3.5"
          strokeDasharray="6 3"
          fill="none"
        />
        <path
          d="M 205 220 Q 240 290 260 380"
          stroke="#1A1A1A"
          strokeWidth="1.5"
          strokeDasharray="6 3"
          fill="none"
        />

        {/* Angavastram (Saffron cloth draped over left shoulder) */}
        <path
          d="M 190 220 Q 230 270 295 380 L 275 385 Q 215 285 180 225 Z"
          fill="#E65100"
          stroke="#1A1A1A"
          strokeWidth="3"
        />

        {/* Gold Kantha (Royal Necklace) */}
        <path
          d="M 205 220 Q 240 245 275 220"
          stroke="#FBC02D"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M 205 220 Q 240 245 275 220"
          stroke="#1A1A1A"
          strokeWidth="2"
          strokeDasharray="4 3"
          fill="none"
        />
        <circle cx="240" cy="236" r="6" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2" />

        {/* ================= 5. SACRED FACE (Calm, Serene, Respectful) ================= */}
        <g id="rama-face" transform="translate(240, 150)">
          {/* Head Base */}
          <path
            d="M -30 -35 C -30 -10 -25 35 0 35 C 25 35 30 -10 30 -35 C 30 -60 -30 -60 -30 -35 Z"
            fill="#42A5F5"
            stroke="#1A1A1A"
            strokeWidth="3.5"
          />

          {/* Ears with Kundalas */}
          <ellipse cx="-32" cy="-8" rx="6" ry="10" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="2" />
          <ellipse cx="32" cy="-8" rx="6" ry="10" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="2" />
          {/* Gold Kundalas */}
          <circle cx="-32" cy="4" r="7" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="32" cy="4" r="7" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />

          {/* Calm, Graceful Eyebrows */}
          <path d="M -24 -15 Q -14 -22 -4 -15" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 4 -15 Q 14 -22 24 -15" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Serene, Compassionate Lotus-Petal Almond Eyes */}
          {isBlinking ? (
            <>
              <path d="M -22 -8 Q -14 -2 -6 -8" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 6 -8 Q 14 -2 22 -8" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" />
            </>
          ) : (
            <>
              {/* Left Eye */}
              <path d="M -24 -8 Q -14 -16 -4 -8 Q -14 0 -24 -8 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
              <circle cx="-13" cy="-8" r="4" fill="#1A1A1A" />
              <circle cx="-12" cy="-9" r="1.2" fill="#FFFFFF" />

              {/* Right Eye */}
              <path d="M 4 -8 Q 14 -16 24 -8 Q 14 0 4 -8 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
              <circle cx="13" cy="-8" r="4" fill="#1A1A1A" />
              <circle cx="14" cy="-9" r="1.2" fill="#FFFFFF" />
            </>
          )}

          {/* Aristocratic, Calm Nose */}
          <path d="M 0 -14 L -2 6 Q 3 9 4 6" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Infinitely Calm, Compassionate Smile */}
          <path d="M -10 18 Q 0 25 10 18 Q 0 22 -10 18 Z" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2" />

          {/* Sacred Chandan Tilak (Urdhva Pundra) */}
          <path d="M -4 -42 L -4 -20 Q 0 -15 4 -20 L 4 -42 Z" fill="#FFF8E7" stroke="#1A1A1A" strokeWidth="1.5" />
          <line x1="0" y1="-38" x2="0" y2="-18" stroke="#D32F2F" strokeWidth="2.5" />

          {/* ================= 6. ORNATE MUKUT WITH PEACOCK FEATHER ================= */}
          {/* Golden Crown Base */}
          <path d="M -28 -35 L -32 -60 L 0 -85 L 32 -60 L 28 -35 Z" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="3.5" />
          {/* Red and Green Jewels */}
          <circle cx="0" cy="-60" r="7" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="-16" cy="-50" r="5" fill="#2E7D32" stroke="#1A1A1A" strokeWidth="1.5" />
          <circle cx="16" cy="-50" r="5" fill="#2E7D32" stroke="#1A1A1A" strokeWidth="1.5" />
          {/* Peacock Feather (Mor-Pankh) */}
          <g transform="translate(0, -90)">
            <ellipse cx="0" cy="-14" rx="12" ry="18" fill="#1565C0" stroke="#1A1A1A" strokeWidth="2.5" />
            <ellipse cx="0" cy="-14" rx="8" ry="12" fill="#2E7D32" stroke="#1A1A1A" strokeWidth="1.8" />
            <circle cx="0" cy="-14" r="5" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="1.5" />
            <circle cx="0" cy="-14" r="2.5" fill="#1A1A1A" />
          </g>
        </g>

        {/* ================= 7. GENTLE PALM HOLDING / BLESSING THE SQUIRREL ================= */}
        {holdingSquirrel && (
          <g transform="translate(290, 290)">
            {/* Extended Divine Arm */}
            <path
              d="M -10 20 Q 40 40 70 80 L 85 70 Q 45 20 -5 10 Z"
              fill="#42A5F5"
              stroke="#1A1A1A"
              strokeWidth="3.5"
            />
            {/* Gold Bajuband */}
            <rect x="25" y="24" width="16" height="6" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" />

            {/* Sacred Open Palm with Red Alta Border */}
            <ellipse cx="78" cy="85" rx="28" ry="14" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M 54 85 Q 78 94 102 85" stroke="#D32F2F" strokeWidth="3" fill="none" />

            {/* The Tiny Squirrel Nestled Safely in Shri Rama's Palm! */}
            <g transform="translate(62, 45) scale(0.35)">
              {/* Squirrel body */}
              <path
                d="M 30 60 C 20 40 30 10 60 20 C 80 15 90 40 85 65 C 80 90 40 95 30 60 Z"
                fill="#E65100"
                stroke="#1A1A1A"
                strokeWidth="4"
              />
              {/* Squirrel tail */}
              <path
                d="M 30 65 C 10 50 -10 20 15 5 C 30 -5 40 15 35 35 Z"
                fill="#D32F2F"
                stroke="#1A1A1A"
                strokeWidth="4"
              />
              {/* Almond eye */}
              <circle cx="70" cy="30" r="5" fill="#1A1A1A" />
              <circle cx="72" cy="28" r="1.5" fill="#FFFFFF" />

              {/* Glowing Three Stripes if blessed */}
              {isBlessing && (
                <>
                  <path d="M 45 35 Q 52 50 50 68" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 55 32 Q 62 50 60 70" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
                  <path d="M 65 35 Q 72 50 70 68" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                </>
              )}
            </g>

            {/* Right Hand Gently Stroking with 3 Fingers (The Blessing Touch!) */}
            <g transform={`translate(${10 + blessingStroke}, -15)`}>
              {/* Forearm */}
              <path d="M -30 -40 Q 20 -20 65 30" stroke="#42A5F5" strokeWidth="22" strokeLinecap="round" />
              <path d="M -30 -40 Q 20 -20 65 30" stroke="#1A1A1A" strokeWidth="3.5" fill="none" />
              {/* Golden Kada on wrist */}
              <rect x="42" y="10" width="16" height="6" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="2" transform="rotate(35 42 10)" />
              {/* Three divine gentle fingertips touching the squirrel */}
              <path d="M 72 32 Q 85 45 92 52" stroke="#42A5F5" strokeWidth="6" strokeLinecap="round" />
              <path d="M 76 28 Q 88 42 96 48" stroke="#42A5F5" strokeWidth="6" strokeLinecap="round" />
              <path d="M 80 24 Q 92 38 100 44" stroke="#42A5F5" strokeWidth="6" strokeLinecap="round" />
            </g>
          </g>
        )}
      </svg>
    </div>
  );
};

