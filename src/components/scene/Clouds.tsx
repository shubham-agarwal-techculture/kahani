import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface CloudsProps {
  color?: string;
  count?: number;
  speedMultiplier?: number;
}

export const Clouds: React.FC<CloudsProps> = ({
  color = 'rgba(255, 240, 245, 0.28)',
  count = 4,
  speedMultiplier = 1,
}) => {
  const frame = useCurrentFrame();

  // Cloud presets with varying elevations and drift speeds
  const cloudConfigs = [
    { y: 380, width: 340, height: 110, speed: 0.6 * speedMultiplier, opacity: 0.35, offset: 50 },
    { y: 520, width: 420, height: 130, speed: 1.1 * speedMultiplier, opacity: 0.28, offset: 480 },
    { y: 680, width: 310, height: 95, speed: 0.85 * speedMultiplier, opacity: 0.22, offset: 220 },
    { y: 820, width: 460, height: 140, speed: 1.4 * speedMultiplier, opacity: 0.18, offset: 700 },
  ].slice(0, count);

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
      {cloudConfigs.map((c, i) => {
        // Continuous wrapping drift across 1080px width
        const totalSpan = 1080 + c.width + 100;
        const xPos = ((frame * c.speed + c.offset) % totalSpan) - c.width;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: c.y,
              left: xPos,
              width: c.width,
              height: c.height,
              opacity: c.opacity,
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 200 70"
              fill={color}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Soft organic cloud puffs */}
              <ellipse cx="60" cy="45" rx="45" ry="22" />
              <ellipse cx="100" cy="35" rx="42" ry="28" />
              <ellipse cx="140" cy="45" rx="40" ry="20" />
              <ellipse cx="90" cy="52" rx="75" ry="16" />
            </svg>
          </div>
        );
      })}
    </div>
  );
};

