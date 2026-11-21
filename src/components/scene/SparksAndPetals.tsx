import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface SparksAndPetalsProps {
  sparksCount?: number;
  petalsCount?: number;
}

export const SparksAndPetals: React.FC<SparksAndPetalsProps> = ({
  sparksCount = 28,
  petalsCount = 18,
}) => {
  const frame = useCurrentFrame();

  // Floating Golden Sparks (Ember particles rising up from ground)
  const sparks = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < sparksCount; i++) {
      const baseX = (i * 47) % 1080;
      const speed = 1.6 + ((i * 3) % 4) * 0.5;
      const size = 2 + ((i * 5) % 4);
      const sway = 15 + (i % 25);
      const delay = (i * 23) % 120;
      list.push({ id: i, baseX, speed, size, sway, delay });
    }
    return list;
  }, [sparksCount]);

  // Sacred Lotus / Marigold Petals (Gently drifting downwards with air resistance)
  const petals = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < petalsCount; i++) {
      const baseX = (i * 73) % 1080;
      const fallSpeed = 1.2 + ((i * 2) % 3) * 0.6;
      const swayWidth = 35 + ((i * 7) % 30);
      const swaySpeed = 0.04 + ((i * 3) % 5) * 0.01;
      const startY = -120 - ((i * 85) % 600);
      const rotationSpeed = 1.2 + (i % 3);
      // Alternate between sacred pink lotus and golden marigold petals
      const colorType = i % 2 === 0 ? 'lotus' : 'marigold';
      list.push({ id: i, baseX, fallSpeed, swayWidth, swaySpeed, startY, rotationSpeed, colorType });
    }
    return list;
  }, [petalsCount]);

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
      {/* 1. RISING DIVINE SPARKS / GOLDEN EMBERS */}
      {sparks.map((s) => {
        // Continuous upward cycle over 1920px height
        const cycleFrame = frame + s.delay;
        const yPos = 1920 - ((cycleFrame * s.speed * 4) % 2100) + 100;
        const xOffset = Math.sin(cycleFrame * 0.06 + s.id) * s.sway;
        const opacity = Math.sin(((yPos - 100) / 1820) * Math.PI); // Fades in near bottom, fades out near top

        return (
          <div
            key={`spark-${s.id}`}
            style={{
              position: 'absolute',
              left: s.baseX + xOffset,
              top: yPos,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              backgroundColor: '#FFE082',
              boxShadow: `0 0 8px #FFB300, 0 0 16px #FF8F00`,
              opacity: Math.max(0, Math.min(1, opacity)),
            }}
          />
        );
      })}

      {/* 2. FALLING SACRED PETALS */}
      {petals.map((p) => {
        // Continuous falling cycle from top to bottom
        const totalTravel = 2100;
        const yPos = ((frame * p.fallSpeed * 3 + p.startY + 2100) % totalTravel) - 100;
        const xOffset = Math.sin(frame * p.swaySpeed + p.id) * p.swayWidth;
        const rotation = (frame * p.rotationSpeed) % 360;

        const isLotus = p.colorType === 'lotus';
        const petalColor = isLotus ? '#FF80AB' : '#FFB300';
        const petalShadow = isLotus ? '#C2185B' : '#E65100';

        return (
          <div
            key={`petal-${p.id}`}
            style={{
              position: 'absolute',
              left: p.baseX + xOffset,
              top: yPos,
              width: 22,
              height: 28,
              transform: `rotate(${rotation}deg)`,
              transformOrigin: 'center center',
              filter: `drop-shadow(0 2px 4px rgba(0,0,0,0.25))`,
            }}
          >
            <svg width="22" height="28" viewBox="0 0 22 28" fill="none">
              {/* Teardrop curved organic flower petal */}
              <path
                d="M 11 0 C 18 8 22 18 11 28 C 0 18 4 8 11 0 Z"
                fill={petalColor}
              />
              <path
                d="M 11 4 C 13 12 14 18 11 25"
                stroke={petalShadow}
                strokeWidth="1"
                opacity="0.6"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

