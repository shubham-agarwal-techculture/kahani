import React from 'react';
import { WarliBackground } from '../../components/warli/WarliBackground';
import { WarliBorder } from '../../components/warli/WarliBorder';
import { WarliSun } from '../../components/warli/WarliSun';
import { WarliFigure } from '../../components/warli/WarliFigure';

export const WarliScene7Answer: React.FC = () => {
  return (
    <WarliBackground>
      {/* Peaceful Sun shining overhead */}
      <WarliSun x={540} y={320} size={240} />

      {/* Top Philosophical Takeaway Banner (Safe Zone > 160px from top) */}
      <div
        style={{
          position: 'absolute',
          top: 175,
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 85,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            background: '#FBF8EE',
            color: '#7D2D20',
            border: '2px solid #541E15',
            borderRadius: '28px',
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '2.5px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.35)',
          }}
        >
          ✦ BEETI BAATON KO KINARE CHHOD DO ✦
        </span>
      </div>

      {/* Ground line */}
      <div
        style={{
          position: 'absolute',
          top: 1180,
          left: 0,
          width: '100%',
        }}
      >
        <svg width="1080" height="40">
          <line x1="0" y1="15" x2="1080" y2="15" stroke="#FBF8EE" strokeWidth="3" />
          {Array.from({ length: 44 }).map((_, i) => (
            <circle key={i} cx={12 + i * 25} cy="28" r="2.5" fill="#FBF8EE" />
          ))}
        </svg>
      </div>

      {/* Younger Monk: Now enlightened, head bowed respectfully in realization */}
      <WarliFigure x={320} y={990} scale={1.45} pose="bowing" facing="right" />

      {/* Ghostly Burden Dissolving over Younger Monk's Head */}
      <svg
        style={{
          position: 'absolute',
          top: 760,
          left: 280,
          width: 180,
          height: 180,
          pointerEvents: 'none',
        }}
        viewBox="0 0 180 180"
      >
        {/* Dissolving dotted woman figure burden */}
        <circle cx="90" cy="40" r="14" fill="none" stroke="#FBF8EE" strokeWidth="2" strokeDasharray="3 4" opacity="0.4" />
        <polygon points="66,60 114,60 90,90" fill="none" stroke="#FBF8EE" strokeWidth="2" strokeDasharray="3 4" opacity="0.4" />
        <polygon points="90,90 68,120 112,120" fill="none" stroke="#FBF8EE" strokeWidth="2" strokeDasharray="3 4" opacity="0.4" />
        {/* Floating dissipating dots */}
        {Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={i}
            cx={40 + (i % 4) * 35}
            cy={20 + Math.floor(i / 4) * 40}
            r="2"
            fill="#FBF8EE"
            opacity="0.5"
          />
        ))}
      </svg>

      {/* Elder Monk gesturing gently towards the open horizon with benevolent smile */}
      <WarliFigure x={650} y={980} scale={1.6} pose="standing" facing="left" hasStaff={true} />

      {/* Dotted path extending towards the infinite horizon */}
      <svg
        style={{
          position: 'absolute',
          top: 1220,
          left: 0,
          width: 1080,
          height: 300,
        }}
      >
        <path d="M 0 240 Q 540 180 1080 200" fill="none" stroke="#FBF8EE" strokeWidth="3" strokeDasharray="4 16" />
      </svg>

      {/* Border */}
      <WarliBorder />
    </WarliBackground>
  );
};
