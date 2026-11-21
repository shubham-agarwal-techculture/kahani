import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface CharacterProps {
  skinColor?: string;
  clothColor?: string;
  accentColor?: string;
  hairColor?: string;
  dhotiColor?: string;
  headwear?: 'mukut' | 'turban' | 'hair-bun' | 'none';
  clothStyle?: 'dhoti' | 'robe' | 'kurta';
  hasTilak?: boolean;
  hasGarland?: boolean;
  hasFlute?: boolean;
  eyeExpression?: 'calm' | 'happy' | 'closed';
  isWalking?: boolean;
  walkSpeed?: number;
  isWaving?: boolean;
  waveHand?: 'left' | 'right';
  facing?: 'left' | 'right';
  scale?: number;
  customFrame?: number;
}

export const CharacterRig: React.FC<CharacterProps> = ({
  skinColor = '#E0A96D',
  clothColor = '#E65100', // Saffron / Pitambara
  accentColor = '#FFD700', // Golden Zari & Jewelry
  hairColor = '#1F1B18',
  dhotiColor = '#F57C00',
  headwear = 'mukut',
  hasTilak = true,
  hasGarland = false,
  hasFlute = false,
  eyeExpression = 'calm',
  isWalking = true,
  walkSpeed = 1,
  isWaving = false,
  facing = 'right',
  scale = 1,
  customFrame,
}) => {
  const currentFrame = useCurrentFrame();
  const frame = customFrame !== undefined ? customFrame : currentFrame;

  // Breathing animation (subtle chest expand and head bob)
  const breathCycle = Math.sin(frame * 0.08) * 1.5;

  // Blinking cycle: eye closes every ~80 frames for ~5 frames
  const blinkCycle = frame % 85;
  const isBlinking = blinkCycle > 80 && blinkCycle <= 85;

  // Walk cycle (sinusoidal gait math)
  const walkTime = isWalking ? frame * 0.16 * walkSpeed : 0;
  const legAngleLeft = isWalking ? Math.sin(walkTime) * 26 : 0;
  const legAngleRight = isWalking ? Math.sin(walkTime + Math.PI) * 26 : 0;
  const bodyBob = isWalking ? Math.abs(Math.sin(walkTime * 2)) * 6 : breathCycle;

  // Arm swing (counter-phase to legs)
  const armSwingLeft = isWalking ? Math.sin(walkTime + Math.PI) * 22 : Math.sin(frame * 0.05) * 2;
  const normalArmRight = isWalking ? Math.sin(walkTime) * 22 : -Math.sin(frame * 0.05) * 2;

  // Wave animation
  const waveAngle = isWaving ? -110 + Math.sin(frame * 0.3) * 18 : normalArmRight;

  // Facing direction mirror
  const scaleX = facing === 'left' ? -1 : 1;

  return (
    <div
      style={{
        display: 'inline-block',
        transform: `scale(${scale}) scaleX(${scaleX}) translateY(${bodyBob}px)`,
        transformOrigin: 'bottom center',
        filter: 'drop-shadow(0px 12px 16px rgba(0,0,0,0.25))',
      }}
    >
      <svg
        width="260"
        height="440"
        viewBox="0 0 260 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Subtle gold gradient for jewels */}
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#C49B00" />
          </linearGradient>

          {/* Shading for cloth */}
          <linearGradient id="clothGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={clothColor} />
            <stop offset="100%" stopColor="#B23B00" />
          </linearGradient>

          {/* Shading for dhoti */}
          <linearGradient id="dhotiGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={dhotiColor} />
            <stop offset="100%" stopColor="#8C2D00" />
          </linearGradient>

          {/* Soft shadow */}
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(20,10,5,0.4)" />
            <stop offset="100%" stopColor="rgba(20,10,5,0)" />
          </radialGradient>
        </defs>

        {/* Dynamic Ground Shadow */}
        <ellipse
          cx="130"
          cy="430"
          rx={60 + (isWalking ? Math.sin(walkTime * 2) * 5 : 0)}
          ry="12"
          fill="url(#groundShadow)"
        />

        {/* ===================== BACK LEG ===================== */}
        <g
          transform={`translate(118, 280) rotate(${legAngleLeft}) translate(-118, -280)`}
          id="leg-left"
        >
          {/* Thigh / Upper Dhoti */}
          <path
            d="M 112 280 Q 106 330 110 355 L 126 355 Q 128 330 124 280 Z"
            fill="url(#dhotiGrad)"
            opacity="0.9"
          />
          {/* Calf / Shin */}
          <path
            d="M 111 350 Q 110 380 113 410 L 124 410 Q 126 380 125 350 Z"
            fill={skinColor}
            filter="brightness(0.85)"
          />
          {/* Ankle Kada / Payal */}
          <rect x="111" y="405" width="14" height="4" rx="2" fill="url(#goldGrad)" />
          {/* Foot */}
          <path
            d="M 112 410 Q 108 418 116 422 L 138 422 Q 138 414 125 410 Z"
            fill={skinColor}
            filter="brightness(0.85)"
          />
        </g>

        {/* ===================== BACK ARM ===================== */}
        <g
          transform={`translate(110, 160) rotate(${armSwingLeft}) translate(-110, -160)`}
          id="arm-left"
        >
          {/* Upper Arm */}
          <path
            d="M 104 160 Q 94 200 98 230 L 114 230 Q 118 200 116 160 Z"
            fill={skinColor}
            filter="brightness(0.9)"
          />
          {/* Armlet (Bajuband) */}
          <rect x="100" y="185" width="16" height="5" rx="2" fill="url(#goldGrad)" />
          {/* Forearm & Hand */}
          <path
            d="M 98 228 Q 94 265 96 285 L 109 285 Q 114 265 114 228 Z"
            fill={skinColor}
            filter="brightness(0.9)"
          />
          {/* Kada (Wristband) */}
          <rect x="96" y="278" width="14" height="4" rx="2" fill="url(#goldGrad)" />
          {/* Hand */}
          <ellipse cx="102" cy="292" rx="7" ry="9" fill={skinColor} filter="brightness(0.9)" />
        </g>

        {/* ===================== TORSO & BODY ===================== */}
        <g id="body" transform={`translate(0, ${breathCycle * 0.4})`}>
          {/* Main Torso */}
          <path
            d="M 108 152 Q 95 195 102 245 L 158 245 Q 165 195 152 152 Z"
            fill={skinColor}
          />

          {/* Sacred Thread (Yajnopavita / Janeu) */}
          <path
            d="M 116 154 Q 138 200 152 245"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            fill="none"
          />

          {/* Upper Body Cloth / Angavastram (draped diagonally) */}
          <path
            d="M 110 150 Q 132 185 154 246 L 140 248 Q 120 195 104 156 Z"
            fill="url(#clothGrad)"
          />
          <path
            d="M 110 150 Q 132 185 154 246"
            stroke="url(#goldGrad)"
            strokeWidth="3.5"
            fill="none"
          />

          {/* Dhoti / Lower Garment */}
          <path
            d="M 100 242 Q 88 315 104 365 Q 130 380 156 365 Q 172 315 160 242 Z"
            fill="url(#dhotiGrad)"
          />

          {/* Dhoti Central Pleats / Patka */}
          <path
            d="M 124 244 L 122 368 L 138 368 L 136 244 Z"
            fill="url(#clothGrad)"
          />
          <path
            d="M 122 368 L 138 368"
            stroke="url(#goldGrad)"
            strokeWidth="4"
          />

          {/* Gold Kamarband (Waist Sash) */}
          <rect x="98" y="240" width="64" height="10" rx="4" fill="url(#goldGrad)" />
          <circle cx="130" cy="245" r="7" fill="#E65100" stroke="url(#goldGrad)" strokeWidth="2" />

          {/* Garland (Vanamala) if enabled */}
          {hasGarland && (
            <path
              d="M 112 158 Q 130 220 130 270 Q 130 220 148 158"
              stroke="#FFF9C4"
              strokeWidth="7"
              strokeDasharray="5 3"
              fill="none"
            />
          )}

          {/* Flute if enabled (held diagonally) */}
          {hasFlute && (
            <g transform="translate(105, 175) rotate(-28)">
              <rect x="0" y="0" width="110" height="9" rx="3" fill="#FFE082" stroke="#B78103" strokeWidth="1.5" />
              <circle cx="25" cy="4.5" r="1.5" fill="#5D4037" />
              <circle cx="40" cy="4.5" r="1.5" fill="#5D4037" />
              <circle cx="55" cy="4.5" r="1.5" fill="#5D4037" />
              <circle cx="70" cy="4.5" r="1.5" fill="#5D4037" />
              <circle cx="85" cy="4.5" r="1.5" fill="#5D4037" />
              {/* Peacock feather / tassel */}
              <circle cx="106" cy="4.5" r="5" fill="#00897B" stroke="url(#goldGrad)" strokeWidth="1.5" />
            </g>
          )}
        </g>

        {/* ===================== FRONT LEG ===================== */}
        <g
          transform={`translate(142, 280) rotate(${legAngleRight}) translate(-142, -280)`}
          id="leg-right"
        >
          {/* Thigh / Dhoti Fold */}
          <path
            d="M 134 280 Q 130 330 136 355 L 152 355 Q 156 330 148 280 Z"
            fill="url(#dhotiGrad)"
          />
          {/* Calf / Shin */}
          <path
            d="M 137 350 Q 136 380 139 410 L 150 410 Q 152 380 151 350 Z"
            fill={skinColor}
          />
          {/* Ankle Kada / Payal */}
          <rect x="137" y="405" width="14" height="4" rx="2" fill="url(#goldGrad)" />
          {/* Foot */}
          <path
            d="M 138 410 Q 134 418 142 422 L 164 422 Q 164 414 151 410 Z"
            fill={skinColor}
          />
        </g>

        {/* ===================== NECK & HEAD ===================== */}
        <g id="head-group" transform={`translate(0, ${breathCycle * 0.6})`}>
          {/* Neck */}
          <path d="M 122 136 L 122 156 L 138 156 L 138 136 Z" fill={skinColor} />
          {/* Gold Kantha (Necklace) */}
          <path
            d="M 116 150 Q 130 162 144 150"
            stroke="url(#goldGrad)"
            strokeWidth="5"
            fill="none"
          />

          {/* Ears with Kundalas */}
          <ellipse cx="106" cy="116" rx="5" ry="9" fill={skinColor} />
          <ellipse cx="154" cy="116" rx="5" ry="9" fill={skinColor} />
          {/* Gold Earrings */}
          <circle cx="106" cy="125" r="4" fill="url(#goldGrad)" />
          <circle cx="154" cy="125" r="4" fill="url(#goldGrad)" />

          {/* Head Base / Face */}
          <path
            d="M 110 102 C 108 128 116 142 130 142 C 144 142 152 128 150 102 C 150 78 110 78 110 102 Z"
            fill={skinColor}
          />

          {/* Calm, Dignified Eyebrows */}
          <path
            d="M 114 98 Q 121 95 127 98"
            stroke="#2B2119"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 133 98 Q 139 95 146 98"
            stroke="#2B2119"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Serene Eyes (with gentle blink animation) */}
          {isBlinking || eyeExpression === 'closed' ? (
            <>
              {/* Closed gentle eyelids */}
              <path
                d="M 114 105 Q 120 109 126 105"
                stroke="#2B2119"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 134 105 Q 140 109 146 105"
                stroke="#2B2119"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
            </>
          ) : (
            <>
              {/* Calm open almond eyes */}
              <ellipse cx="120" cy="105" rx="5" ry="3.5" fill="#FFFFFF" />
              <ellipse cx="140" cy="105" rx="5" ry="3.5" fill="#FFFFFF" />
              {/* Dark irises */}
              <circle cx="121" cy="105" r="2.2" fill="#2B2119" />
              <circle cx="141" cy="105" r="2.2" fill="#2B2119" />
              {/* Soulful twinkle */}
              <circle cx="122" cy="104" r="0.8" fill="#FFFFFF" />
              <circle cx="142" cy="104" r="0.8" fill="#FFFFFF" />
            </>
          )}

          {/* Gentle, Respectful Nose */}
          <path
            d="M 130 102 L 129 116 L 133 117"
            stroke="#B5814C"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Calm, Compassionate Smile */}
          <path
            d="M 124 125 Q 130 130 136 125"
            stroke="#9C3A3A"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
          />

          {/* Sacred Tilak (Urdhva Pundra / Chandan) */}
          {hasTilak && (
            <g id="tilak">
              <path
                d="M 128 88 L 128 100 Q 130 104 132 100 L 132 88 Z"
                fill="#FFF9C4"
              />
              <circle cx="130" cy="100" r="1.5" fill="#D32F2F" />
            </g>
          )}

          {/* Hair / Headwear */}
          {headwear === 'mukut' && (
            <g id="mukut">
              {/* Flowing hair locks behind */}
              <path
                d="M 108 96 Q 102 120 104 140 L 109 135 Q 108 115 112 96 Z"
                fill={hairColor}
              />
              <path
                d="M 152 96 Q 158 120 156 140 L 151 135 Q 152 115 148 96 Z"
                fill={hairColor}
              />
              {/* Golden Crown / Mukut Base */}
              <path
                d="M 106 88 Q 130 82 154 88 L 156 74 Q 130 70 104 74 Z"
                fill="url(#goldGrad)"
              />
              {/* Ornate Crown Peaks */}
              <path
                d="M 106 74 L 115 50 L 130 30 L 145 50 L 154 74 Q 130 68 106 74 Z"
                fill="url(#goldGrad)"
              />
              {/* Red Gem Centerpiece */}
              <circle cx="130" cy="56" r="5" fill="#D32F2F" stroke="#FFF" strokeWidth="1" />
              {/* Emerald side gems */}
              <circle cx="118" cy="66" r="3" fill="#00796B" />
              <circle cx="142" cy="66" r="3" fill="#00796B" />
              {/* Mukut Top Kalash/Chintamani */}
              <ellipse cx="130" cy="27" rx="3.5" ry="5" fill="#FFF275" />
            </g>
          )}

          {headwear === 'turban' && (
            <g id="turban">
              {/* Royal Pagdi / Turban */}
              <ellipse cx="130" cy="80" rx="26" ry="18" fill="url(#clothGrad)" />
              <path
                d="M 104 84 Q 130 70 156 84 Q 130 96 104 84 Z"
                fill={accentColor}
                opacity="0.8"
              />
              {/* Turban brooch / sarpech */}
              <circle cx="130" cy="74" r="5" fill="url(#goldGrad)" />
              <circle cx="130" cy="74" r="2" fill="#D32F2F" />
            </g>
          )}

          {headwear === 'hair-bun' && (
            <g id="hair-bun">
              {/* Ascetic Jata / Rishi Bun */}
              <ellipse cx="130" cy="68" rx="16" ry="14" fill={hairColor} />
              <rect x="118" y="74" width="24" height="4" rx="2" fill="url(#goldGrad)" />
            </g>
          )}
        </g>

        {/* ===================== FRONT ARM ===================== */}
        <g
          transform={`translate(150, 160) rotate(${waveAngle}) translate(-150, -160)`}
          id="arm-right"
        >
          {/* Upper Arm */}
          <path
            d="M 144 160 Q 154 200 150 230 L 134 230 Q 130 200 132 160 Z"
            fill={skinColor}
          />
          {/* Armlet (Bajuband) */}
          <rect x="134" y="185" width="18" height="5" rx="2" fill="url(#goldGrad)" />
          {/* Forearm & Hand */}
          <path
            d="M 150 228 Q 154 265 152 285 L 138 285 Q 134 265 134 228 Z"
            fill={skinColor}
          />
          {/* Kada (Wristband) */}
          <rect x="138" y="278" width="14" height="4" rx="2" fill="url(#goldGrad)" />
          {/* Hand */}
          <ellipse cx="145" cy="292" rx="7" ry="9" fill={skinColor} />
        </g>
      </svg>
    </div>
  );
};
