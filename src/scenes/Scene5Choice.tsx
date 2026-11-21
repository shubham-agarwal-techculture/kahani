import React from 'react';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniVanar } from '../components/madhubani/MadhubaniVanar';
import { MadhubaniSquirrel } from '../components/madhubani/MadhubaniSquirrel';
import { MadhubaniWater } from '../components/madhubani/MadhubaniWater';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';


export const Scene5Choice: React.FC = () => {

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
      {/* Sandy Bank */}
      <div
        style={{
          position: 'absolute',
          top: 1150,
          left: 0,
          width: '100%',
          height: '270px',
          background: '#FFE082',
          borderTop: '5px solid #1A1A1A',
          zIndex: 10,
        }}
      />

      {/* Large Mocking Vanar pointing down at squirrel - feet resting on sand! */}
      <div style={{ position: 'absolute', zIndex: 25 }}>
        <MadhubaniVanar x={120} y={425} scale={1.35} action="pointing" />
      </div>

      {/* Tiny Squirrel standing firm, hands folded in Pranam / prayer - on sand! */}
      <div style={{ position: 'absolute', zIndex: 25 }}>
        <MadhubaniSquirrel x={680} y={885} scale={1.4} pose="praying" />
      </div>

      {/* Surging ocean waves below */}
      <MadhubaniWater y={1380} height={540} speed={1.3} />

      {/* Subtle dust particles */}
      <MadhubaniParticles dust={true} sparks={false} petals={false} />

      {/* Border */}
      <MadhubaniBorder />
    </div>
  );
};
