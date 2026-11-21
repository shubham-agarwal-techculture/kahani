import React from 'react';
import { useCurrentFrame } from 'remotion';

export interface SkyProps {
  theme?: 'twilight' | 'night' | 'sunset' | 'dawn' | 'day';
  celestial?: 'moon' | 'sun' | 'both';
  moonPhase?: 'crescent' | 'full';
  starDensity?: number;
}

export const Sky: React.FC<SkyProps> = ({
  theme = 'twilight',
  celestial = 'moon',
  moonPhase = 'crescent',
  starDensity = 45,
}) => {
  const frame = useCurrentFrame();

  // Gradients for different times of day
  const gradients = {
    twilight: 'linear-gradient(180deg, #090A1A 0%, #151838 35%, #2D2755 65%, #683B5E 85%, #B35452 100%)',
    night: 'linear-gradient(180deg, #030514 0%, #0A0F2D 50%, #171E47 100%)',
    sunset: 'linear-gradient(180deg, #1C1335 0%, #4A235A 30%, #9C27B0 60%, #E65100 85%, #FFB74D 100%)',
    dawn: 'linear-gradient(180deg, #1A1A3A 0%, #302B63 40%, #7E57C2 70%, #FF8A65 90%, #FFE082 100%)',
    day: 'linear-gradient(180deg, #1E88E5 0%, #42A5F5 40%, #90CAF9 75%, #E3F2FD 100%)',
  };

  // Fixed deterministic star positions with twinkling
  const stars = React.useMemo(() => {
    const list = [];
    for (let i = 0; i < starDensity; i++) {
      // Deterministic pseudo-randomness based on index
      const x = ((i * 137.5) % 1000) / 10;
      const y = ((i * 223.7) % 650) / 10; // Top 65% of screen
      const size = 1.5 + ((i * 7) % 3);
      const pulseSpeed = 0.04 + ((i * 3) % 5) * 0.01;
      const pulseOffset = (i * 11) % 10;
      list.push({ id: i, x, y, size, pulseSpeed, pulseOffset });
    }
    return list;
  }, [starDensity]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: gradients[theme],
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Stars Layer (for night, twilight, sunset, dawn) */}
      {theme !== 'day' && (
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          {stars.map((s) => {
            const twinkle = 0.4 + Math.sin(frame * s.pulseSpeed + s.pulseOffset) * 0.45;
            return (
              <circle
                key={s.id}
                cx={`${s.x}%`}
                cy={`${s.y}%`}
                r={s.size}
                fill="#FFF9E6"
                opacity={Math.max(0.1, Math.min(1, twinkle))}
              />
            );
          })}
        </svg>
      )}

      {/* Glowing Celestial Body: Moon or Sun */}
      {(celestial === 'moon' || celestial === 'both') && theme !== 'day' && (
        <div
          style={{
            position: 'absolute',
            top: 220,
            right: 140,
            width: 140,
            height: 140,
          }}
        >
          {/* Ambient Divine Glow */}
          <div
            style={{
              position: 'absolute',
              top: -40,
              left: -40,
              width: 220,
              height: 220,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 245, 204, 0.45) 0%, rgba(255, 235, 150, 0.15) 45%, rgba(0,0,0,0) 70%)',
              filter: 'blur(10px)',
            }}
          />

          {moonPhase === 'crescent' ? (
            <svg width="140" height="140" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFFEE6" />
                  <stop offset="85%" stopColor="#FFE082" />
                  <stop offset="100%" stopColor="#FFCA28" />
                </radialGradient>
              </defs>
              {/* Crescent Moon path */}
              <path
                d="M 68 15 C 32 20 20 60 48 85 C 22 75 16 35 52 18 C 58 16 63 15 68 15 Z"
                fill="url(#moonGlow)"
                filter="drop-shadow(0 0 14px rgba(255, 238, 140, 0.8))"
              />
            </svg>
          ) : (
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FFFDE7 40%, #FFF59D 80%, #FFE082 100%)',
                boxShadow: '0 0 35px rgba(255, 249, 196, 0.8), 0 0 75px rgba(255, 224, 130, 0.4)',
              }}
            />
          )}
        </div>
      )}

      {(celestial === 'sun' || celestial === 'both') && (theme === 'day' || theme === 'dawn' || theme === 'sunset') && (
        <div
          style={{
            position: 'absolute',
            top: 260,
            left: 180,
            width: 160,
            height: 160,
          }}
        >
          {/* Sun Rays & Aura */}
          <div
            style={{
              position: 'absolute',
              top: -60,
              left: -60,
              width: 280,
              height: 280,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255, 215, 64, 0.5) 0%, rgba(255, 143, 0, 0.2) 50%, rgba(0,0,0,0) 75%)',
              filter: 'blur(15px)',
            }}
          />
          <div
            style={{
              width: 130,
              height: 130,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 35%, #FFFFFF 0%, #FFF176 50%, #FFB300 100%)',
              boxShadow: '0 0 45px rgba(255, 215, 64, 0.9), 0 0 100px rgba(255, 152, 0, 0.5)',
            }}
          />
        </div>
      )}
    </div>
  );
};

