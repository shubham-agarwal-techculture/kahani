import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniSun } from '../components/madhubani/MadhubaniSun';
import { MadhubaniWater } from '../components/madhubani/MadhubaniWater';
import { MadhubaniSquirrel } from '../components/madhubani/MadhubaniSquirrel';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';
import { MadhubaniCaptions } from '../components/madhubani/MadhubaniCaptions';

export const Scene1Question: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, Math.max(0, frame / 180));

  // Subtle breathing and drift
  const boulderDrift = Math.sin(frame * 0.04) * 8;
  const squirrelHop = Math.abs(Math.sin(frame * 0.12)) * 5;

  const spokenText = "Kya ek mutthi-bhar gilahri vishaal samundar par pathar ka pul bana sakti hai?";

  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1920,
        backgroundColor: '#FFF8E7',
        overflow: 'hidden',
        fontFamily: "'Segoe UI', Roboto, sans-serif",
      }}
    >
      {/* Background Madhubani Sun with serene human face */}
      <MadhubaniSun x={840} y={320} size={250} />

      {/* Top Header Badge (Inside Safe Area > 160px from top) */}
      <div
        style={{
          position: 'absolute',
          top: 175,
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 80,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '10px 28px',
            background: '#D32F2F',
            color: '#FFF8E7',
            border: '2px solid #1A1A1A',
            borderRadius: '24px',
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}
        >
          ✦ RAM SETU KI KAHANI ✦
        </span>
      </div>

      {/* Giant Sacred Floating Setu Stone */}
      <div
        style={{
          position: 'absolute',
          top: 680 + boulderDrift,
          left: 450,
          zIndex: 10,
        }}
      >
        <svg width="420" height="260" viewBox="0 0 420 260" fill="none">
          <polygon
            points="20,120 80,40 280,20 380,80 400,190 280,240 60,220"
            fill="#78909C"
            stroke="#1A1A1A"
            strokeWidth="5"
          />
          <polygon
            points="32,120 88,52 274,32 368,88 388,185 274,228 72,210"
            fill="none"
            stroke="#1A1A1A"
            strokeWidth="2"
          />
          <text
            x="210"
            y="145"
            fill="#D32F2F"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            fontSize="48"
            fontWeight="900"
            textAnchor="middle"
          >
            श्री राम
          </text>
        </svg>
      </div>

      {/* The Sandy Coast Shoreline */}
      <div
        style={{
          position: 'absolute',
          top: 1180,
          left: 0,
          width: '100%',
          height: '220px',
          background: '#FFE082',
          borderTop: '5px solid #1A1A1A',
          zIndex: 15,
        }}
      >
        {/* Sandy texture lines */}
        <svg width="1080" height="60">
          {[40, 140, 260, 380, 520, 680, 820, 960].map((sx, i) => (
            <line
              key={i}
              x1={sx}
              y1="25"
              x2={sx + 40}
              y2="25"
              stroke="#D84315"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      {/* The Little Squirrel standing on shore, gazing up at giant boulder */}
      <div style={{ position: 'absolute', zIndex: 25 }}>
        <MadhubaniSquirrel x={200} y={945 - squirrelHop} scale={1.25} pose="standing" />
      </div>

      {/* Ocean Waves with swimming Mithila fish */}
      <MadhubaniWater y={1380} height={540} speed={1.2} />

      {/* Floating particles */}
      <MadhubaniParticles dust={true} sparks={false} petals={false} />

      {/* Dynamic 3-4 word captions inside safe zone */}
      <MadhubaniCaptions text={spokenText} progress={progress} />

      {/* Decorative Traditional Madhubani Double Border */}
      <MadhubaniBorder />
    </div>
  );
};
