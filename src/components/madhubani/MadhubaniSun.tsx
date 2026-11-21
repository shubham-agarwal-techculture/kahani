import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface MadhubaniSunProps {
  x?: number;
  y?: number;
  size?: number;
}

export const MadhubaniSun: React.FC<MadhubaniSunProps> = ({
  x = 820,
  y = 280,
  size = 220,
}) => {
  const frame = useCurrentFrame();

  // Subtle breathing rotation
  const rayAngle = Math.sin(frame * 0.04) * 4;

  const totalRays = 16;
  const rayList = Array.from({ length: totalRays }, (_, i) => (i * 360) / totalRays);

  return (
    <div
      style={{
        position: 'absolute',
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        pointerEvents: 'none',
      }}
    >
      <svg width={size} height={size} viewBox="0 0 200 200" fill="none">
        {/* ================= RAYS (Rotating subtle drift) ================= */}
        <g transform={`translate(100, 100) rotate(${rayAngle}) translate(-100, -100)`}>
          {rayList.map((angle, idx) => {
            const isAlt = idx % 2 === 1;
            const rayColor = isAlt ? '#D32F2F' : '#FBC02D';
            const rayLen = isAlt ? 96 : 88;

            return (
              <g key={idx} transform={`rotate(${angle} 100 100)`}>
                {/* Petal/Spoke Ray with double black contour */}
                <path
                  d={`M 92 48 Q 100 ${100 - rayLen} 108 48 Q 100 56 92 48 Z`}
                  fill={rayColor}
                  stroke="#1A1A1A"
                  strokeWidth="2.5"
                />
                {/* Central Kachni Spine */}
                <line x1="100" y1="52" x2="100" y2={100 - rayLen + 6} stroke="#1A1A1A" strokeWidth="1.8" />
              </g>
            );
          })}
        </g>

        {/* ================= MAIN SUN DISC ================= */}
        {/* Outer Rim Double Outline */}
        <circle cx="100" cy="100" r="54" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="4" />
        <circle cx="100" cy="100" r="50" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="4 3" />

        {/* Inner Face Disc */}
        <circle cx="100" cy="100" r="44" fill="#FFF8E7" stroke="#1A1A1A" strokeWidth="3" />

        {/* ================= TRADITIONAL MITHILA FACE ================= */}
        {/* Sacred Sun Tilak */}
        <path d="M 97 66 L 97 78 Q 100 81 103 78 L 103 66 Z" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="1.5" />
        <circle cx="100" cy="74" r="2" fill="#FBC02D" />

        {/* Arched Distinctive Eyebrows */}
        <path d="M 76 84 Q 85 78 94 82" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M 106 82 Q 115 78 124 84" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

        {/* Large Almond-Shaped Madhubani Eyes */}
        {/* Left Eye */}
        <path d="M 74 90 Q 85 82 95 90 Q 85 97 74 90 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
        <circle cx="86" cy="90" r="4" fill="#1A1A1A" />
        <circle cx="87" cy="89" r="1.5" fill="#FFFFFF" />

        {/* Right Eye */}
        <path d="M 105 90 Q 115 82 126 90 Q 115 97 105 90 Z" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="2.5" />
        <circle cx="114" cy="90" r="4" fill="#1A1A1A" />
        <circle cx="115" cy="89" r="1.5" fill="#FFFFFF" />

        {/* Traditional Nose Line with Nostril Ring */}
        <path d="M 100 82 L 98 106 Q 103 108 104 105" stroke="#1A1A1A" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <circle cx="95" cy="105" r="2.5" stroke="#1A1A1A" strokeWidth="1.5" fill="#D32F2F" />

        {/* Calm, Serene Red Lips */}
        <path d="M 88 118 Q 100 125 112 118 Q 100 128 88 118 Z" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2" />
        <line x1="89" y1="118" x2="111" y2="118" stroke="#1A1A1A" strokeWidth="1.5" />

        {/* Cheek Rosettes (Mithila Bindi details) */}
        <circle cx="76" cy="108" r="3" fill="#D32F2F" />
        <circle cx="124" cy="108" r="3" fill="#D32F2F" />
      </svg>
    </div>
  );
};

