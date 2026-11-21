import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniWater } from '../components/madhubani/MadhubaniWater';
import { MadhubaniSquirrel } from '../components/madhubani/MadhubaniSquirrel';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';
import { MadhubaniCaptions } from '../components/madhubani/MadhubaniCaptions';

export const Scene4Turn: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, Math.max(0, frame / 210));

  // Determine squirrel action: 0-70 frames dipping, 70-140 rolling, 140-210 shaking
  const squirrelPose = frame < 80 ? 'standing' : frame < 150 ? 'rolling' : 'shaking';
  const squirrelX = 360 + Math.sin(frame * 0.08) * 60;

  const spokenText = "Tabhi ek nanhi gilahri paani mein bheegti, ret par lot ti . aur apne shareer se do-do daane pul par jhaad aati.";

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
      {/* Golden Sand Bank with Sand Grains & Kachni Hatching */}
      <div
        style={{
          position: 'absolute',
          top: 980,
          left: 0,
          width: '100%',
          height: '420px',
          background: '#FFE082',
          borderTop: '5px solid #1A1A1A',
          zIndex: 10,
        }}
      >
        {/* Decorative sand grains scattered */}
        <svg width="1080" height="420" viewBox="0 0 1080 420" fill="none">
          {[80, 160, 240, 320, 420, 500, 620, 700, 810, 920, 990].map((gx, idx) => (
            <g key={idx}>
              <circle cx={gx} cy={60 + (idx % 4) * 50} r="5" fill="#D84315" stroke="#1A1A1A" strokeWidth="1.5" />
              <circle cx={gx + 25} cy={90 + (idx % 3) * 60} r="4" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      </div>

      {/* Floating Setu Boulder where squirrel deposits sand */}
      <div
        style={{
          position: 'absolute',
          top: 860,
          right: 60,
          zIndex: 12,
        }}
      >
        <svg width="340" height="220" viewBox="0 0 340 220" fill="none">
          <polygon points="10,90 60,30 220,10 320,60 330,160 220,200 40,180" fill="#78909C" stroke="#1A1A1A" strokeWidth="4" />
          <text x="170" y="125" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="1.5" fontSize="38" fontWeight="900" textAnchor="middle">
            श्री राम
          </text>
        </svg>
      </div>

      {/* Close-up on the Energetic Little Squirrel */}
      <MadhubaniSquirrel x={squirrelX} y={1050} scale={1.8} pose={squirrelPose} />

      {/* Rhythmic Ocean Waters below */}
      <MadhubaniWater y={1380} height={540} speed={1.2} />

      {/* Sand Dust Particles */}
      <MadhubaniParticles dust={true} sparks={false} petals={false} />

      {/* Captions inside safe zone */}
      <MadhubaniCaptions text={spokenText} progress={progress} />

      {/* Border */}
      <MadhubaniBorder />
    </div>
  );
};

