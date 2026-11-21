import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface MadhubaniParticlesProps {
  dust?: boolean;
  sparks?: boolean;
  petals?: boolean;
}

export const MadhubaniParticles: React.FC<MadhubaniParticlesProps> = ({
  dust = true,
  sparks = true,
  petals = true,
}) => {
  const frame = useCurrentFrame();

  // Floating geometric dust particles
  const dustParticles = React.useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: ((i * 47) % 980) + 50,
      baseY: (i * 79) % 1800,
      speed: 1.2 + (i % 3) * 0.4,
      size: 3 + (i % 3) * 2,
    }));
  }, []);

  // Golden Sparks (ascending small rhombuses / diamonds)
  const sparkParticles = React.useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: ((i * 59) % 960) + 60,
      speed: 2.2 + (i % 4) * 0.6,
      size: 5 + (i % 3) * 2,
      delay: (i * 35) % 180,
    }));
  }, []);

  // Sacred Folk Petals (Flat red and yellow stylized lotus petals)
  const petalParticles = React.useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: ((i * 61) % 960) + 60,
      fallSpeed: 1.5 + (i % 3) * 0.5,
      sway: 20 + (i % 4) * 8,
      size: 16 + (i % 3) * 4,
      color: i % 2 === 0 ? '#D32F2F' : '#FBC02D',
      delay: (i * 45) % 240,
    }));
  }, []);

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
        zIndex: 40,
      }}
    >
      {/* 1. Dust motes */}
      {dust &&
        dustParticles.map((d) => {
          const y = ((d.baseY + frame * d.speed) % 1920);
          const xDrift = Math.sin(frame * 0.05 + d.id) * 15;
          return (
            <div
              key={`dust-${d.id}`}
              style={{
                position: 'absolute',
                left: d.x + xDrift,
                top: y,
                width: d.size,
                height: d.size,
                borderRadius: '50%',
                backgroundColor: '#FFE082',
                border: '1px solid #1A1A1A',
                opacity: 0.65,
              }}
            />
          );
        })}

      {/* 2. Rising Divine Sparks (Flat Gold Rhombus) */}
      {sparks &&
        sparkParticles.map((s) => {
          const y = 1920 - (((frame + s.delay) * s.speed * 3) % 2000);
          const xDrift = Math.sin((frame + s.delay) * 0.08 + s.id) * 12;
          return (
            <div
              key={`spark-${s.id}`}
              style={{
                position: 'absolute',
                left: s.x + xDrift,
                top: y,
                width: s.size,
                height: s.size,
                backgroundColor: '#FBC02D',
                border: '1.5px solid #1A1A1A',
                transform: 'rotate(45deg)',
                opacity: 0.85,
              }}
            />
          );
        })}

      {/* 3. Falling Flat Madhubani Lotus / Marigold Petals */}
      {petals &&
        petalParticles.map((p) => {
          const y = (((frame + p.delay) * p.fallSpeed * 3) % 2050) - 50;
          const x = p.x + Math.sin(frame * 0.04 + p.id) * p.sway;
          const rot = (frame * 2 + p.id * 30) % 360;

          return (
            <div
              key={`petal-${p.id}`}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: p.size,
                height: p.size * 1.3,
                transform: `rotate(${rot}deg)`,
              }}
            >
              <svg width="100%" height="100%" viewBox="0 0 20 26" fill="none">
                {/* Teardrop flat petal with black double outline and spine */}
                <path
                  d="M 10 0 C 18 8 20 18 10 26 C 0 18 2 8 10 0 Z"
                  fill={p.color}
                  stroke="#1A1A1A"
                  strokeWidth="2"
                />
                <line x1="10" y1="3" x2="10" y2="22" stroke="#1A1A1A" strokeWidth="1.2" />
              </svg>
            </div>
          );
        })}
    </div>
  );
};

