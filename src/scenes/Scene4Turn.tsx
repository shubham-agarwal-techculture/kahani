import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniSun } from '../components/madhubani/MadhubaniSun';
import { MadhubaniWater } from '../components/madhubani/MadhubaniWater';
import { MadhubaniSquirrel } from '../components/madhubani/MadhubaniSquirrel';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';


export const Scene4Turn: React.FC = () => {
  const frame = useCurrentFrame();

  // Determine squirrel action: 0-70 frames standing/dipping, 70-140 rolling, 140-210 shaking
  const squirrelPose = frame < 70 ? 'standing' : frame < 140 ? 'rolling' : 'shaking';
  const squirrelX = 360 + Math.sin(frame * 0.08) * 50;

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
      {/* Background Madhubani Sun */}
      <MadhubaniSun x={240} y={300} size={220} />

      {/* Floating Setu Boulder where squirrel deposits sand */}
      <div
        style={{
          position: 'absolute',
          top: 660,
          right: 80,
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

      {/* Golden Sand Bank with Sand Grains & Kachni Hatching */}
      <div
        style={{
          position: 'absolute',
          top: 1050,
          left: 0,
          width: '100%',
          height: '350px',
          background: '#FFE082',
          borderTop: '5px solid #1A1A1A',
          zIndex: 10,
        }}
      >
        <svg width="1080" height="350" viewBox="0 0 1080 350" fill="none">
          {[80, 160, 240, 320, 420, 500, 620, 700, 810, 920, 990].map((gx, idx) => (
            <g key={idx}>
              <circle cx={gx} cy={50 + (idx % 4) * 45} r="5" fill="#D84315" stroke="#1A1A1A" strokeWidth="1.5" />
              <circle cx={gx + 25} cy={75 + (idx % 3) * 55} r="4" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="1.5" />
            </g>
          ))}
        </svg>
      </div>

      {/* Close-up on the Energetic Little Squirrel - feet fully on top of sand! */}
      <div style={{ position: 'absolute', zIndex: 25 }}>
        <MadhubaniSquirrel x={squirrelX} y={725} scale={1.8} pose={squirrelPose} />
      </div>

      {/* Rhythmic Ocean Waters below */}
      <MadhubaniWater y={1380} height={540} speed={1.2} />

      {/* Sand Dust Particles */}
      <MadhubaniParticles dust={true} sparks={false} petals={false} />

      {/* Border */}
      <MadhubaniBorder />
    </div>
  );
};
