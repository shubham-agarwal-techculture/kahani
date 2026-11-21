import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniTree } from '../components/madhubani/MadhubaniTree';
import { MadhubaniWater } from '../components/madhubani/MadhubaniWater';
import { MadhubaniVanar } from '../components/madhubani/MadhubaniVanar';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';


export const Scene3Problem: React.FC = () => {
  const frame = useCurrentFrame();

  // Dynamic rock splash falling
  const rockY = Math.min(380, frame * 5.5);

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
      {/* Dynamic Dramatic Red/Ochre Sky Accents */}
      <div
        style={{
          position: 'absolute',
          top: 80,
          left: 100,
          width: '880px',
          height: '240px',
          border: '3px dashed #D32F2F',
          borderRadius: '30px',
          opacity: 0.35,
        }}
      />

      {/* Sandy Ground */}
      <div
        style={{
          position: 'absolute',
          top: 1180,
          left: 0,
          width: '100%',
          height: '220px',
          background: '#FFE082',
          borderTop: '5px solid #1A1A1A',
          zIndex: 10,
        }}
      />

      {/* Vanar 1 (Left background) - Standing on sand */}
      <div style={{ position: 'absolute', zIndex: 25 }}>
        <MadhubaniVanar x={100} y={640} scale={1.0} action="lifting" boulderText="जय श्री राम" />
      </div>

      {/* Vanar 2 (Right midground) - Standing on sand */}
      <div style={{ position: 'absolute', zIndex: 25 }}>
        <MadhubaniVanar x={540} y={560} scale={1.15} action="lifting" boulderText="श्री राम" />
      </div>

      {/* Rock crashing into sea with stylized splash */}
      <div
        style={{
          position: 'absolute',
          top: 1020 + rockY,
          left: 380,
          zIndex: 28,
        }}
      >
        <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
          <polygon points="20,80 80,20 180,40 220,110 160,160 40,140" fill="#78909C" stroke="#1A1A1A" strokeWidth="4" />
          <circle cx="20" cy="30" r="8" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="220" cy="20" r="10" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="2" />
          <circle cx="120" cy="-10" r="9" fill="#42A5F5" stroke="#1A1A1A" strokeWidth="2" />
        </svg>
      </div>

      {/* Tree with fluttering birds */}
      <MadhubaniTree x={760} y={640} scale={0.9} flip={true} />

      {/* Ocean water with surging waves */}
      <MadhubaniWater y={1380} height={540} speed={2} />

      {/* Heavy dust and spark motion */}
      <MadhubaniParticles dust={true} sparks={true} petals={false} />

      {/* Border */}
      <MadhubaniBorder />
    </div>
  );
};
