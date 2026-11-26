import React from 'react';

export interface WarliFigureProps {
  x: number;
  y: number;
  scale?: number;
  pose?: 'walking' | 'standing' | 'carrying' | 'questioning' | 'bowing' | 'sitting';
  gender?: 'male' | 'female';
  facing?: 'left' | 'right';
  hasStaff?: boolean;
  hasCrown?: boolean;
  color?: string;
}

/**
 * Authentic Warli Figure:
 * - Circle head (with hair bun for women, topknot for monks)
 * - Two triangles touching apex-to-apex (torso & hips)
 * - Line arms and legs with natural tribal joint articulation
 * - Hand gestures and props (staff, carried weight)
 */
export const WarliFigure: React.FC<WarliFigureProps> = ({
  x,
  y,
  scale = 1,
  pose = 'standing',
  gender = 'male',
  facing = 'right',
  hasStaff = false,
  hasCrown = false,
  color = '#FBF8EE',
}) => {
  const width = 120 * scale;
  const height = 180 * scale;
  const isFlipped = facing === 'left';

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        transform: isFlipped ? 'scaleX(-1)' : 'none',
        transformOrigin: 'center bottom',
        pointerEvents: 'none',
      }}
    >
      <svg width={width} height={height} viewBox="0 0 120 180">
        {/* Crown as small triangle (if enabled) */}
        {hasCrown && (
          <polygon points="60,8 54,20 66,20" fill={color} />
        )}

        {/* Head Circle */}
        <circle cx="60" cy="30" r="14" fill={color} />

        {/* Topknot for male / monk, or Bun for female */}
        {gender === 'female' ? (
          // Traditional Warli side bun
          <g>
            <circle cx="44" cy="32" r="9" fill={color} />
            <circle cx="44" cy="32" r="4" fill="#7D2D20" />
          </g>
        ) : (
          // Simple ascetic topknot / tuft
          <circle cx="56" cy="14" r="5" fill={color} />
        )}

        {/* Neck */}
        <line x1="60" y1="44" x2="60" y2="48" stroke={color} strokeWidth="4" />

        {/* Body: Two Triangles meeting at apex (y = 80) */}
        {/* Upper Triangle (Chest / Shoulders): base 48 to apex 80 */}
        <polygon points="36,50 84,50 60,80" fill={color} />

        {/* Lower Triangle (Hips / Pelvis): apex 80 to base 110 */}
        <polygon points="60,80 38,110 82,110" fill={color} />

        {/* Waist accent dot */}
        <circle cx="60" cy="80" r="3" fill="#7D2D20" />

        {/* Limbs according to Pose */}
        {pose === 'standing' && (
          <g stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Left Arm: gently resting at side */}
            <polyline points="40,52 30,76 36,98" />
            {/* Right Arm: slightly gesturing */}
            <polyline points="80,52 92,74 88,96" />
            {/* Left Leg */}
            <polyline points="46,110 44,140 40,172" />
            {/* Right Leg */}
            <polyline points="74,110 76,140 80,172" />
          </g>
        )}

        {pose === 'walking' && (
          <g stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Left Arm swinging back */}
            <polyline points="40,52 26,72 20,92" />
            {/* Right Arm swinging forward */}
            <polyline points="80,52 96,72 108,86" />
            {/* Left Leg extended back */}
            <polyline points="46,110 32,136 22,170" />
            {/* Right Leg stepping forward */}
            <polyline points="74,110 88,138 98,170" />
          </g>
        )}

        {pose === 'carrying' && (
          <g stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Arms reaching back to support load on back */}
            <polyline points="40,52 28,68 34,82" />
            {/* Right Arm gripping */}
            <polyline points="80,52 90,68 84,82" />
            {/* Deep grounded walking legs */}
            <polyline points="46,110 34,138 24,170" />
            <polyline points="74,110 86,138 96,170" />
          </g>
        )}

        {pose === 'questioning' && (
          <g stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Left Hand on hip */}
            <polyline points="40,52 26,66 40,78" />
            {/* Right Arm extended emphatically in question / pointing */}
            <polyline points="80,52 100,56 116,42" />
            {/* Forward braced stance */}
            <polyline points="46,110 38,138 32,172" />
            <polyline points="74,110 84,138 94,172" />
          </g>
        )}

        {pose === 'sitting' && (
          <g stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Hands clutching head / overthinking posture */}
            <polyline points="40,52 32,40 48,32" />
            <polyline points="80,52 88,40 72,32" />
            {/* Crossed / bent knees sitting on ground */}
            <polyline points="46,110 28,126 50,140" />
            <polyline points="74,110 92,126 70,140" />
          </g>
        )}

        {pose === 'bowing' && (
          <g stroke={color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Hands joined in Pranam / respectful gesture */}
            <polyline points="40,52 56,64 60,60" />
            <polyline points="80,52 64,64 60,60" />
            {/* Gentle upright feet */}
            <polyline points="46,110 46,140 44,172" />
            <polyline points="74,110 74,140 76,172" />
          </g>
        )}

        {/* Walking Staff (if enabled) */}
        {hasStaff && (
          <line
            x1="104"
            y1="25"
            x2="104"
            y2="175"
            stroke={color}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        )}
      </svg>
    </div>
  );
};
