import React from 'react';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniRama } from '../components/madhubani/MadhubaniRama';
import { MadhubaniTree } from '../components/madhubani/MadhubaniTree';
import { MadhubaniWater } from '../components/madhubani/MadhubaniWater';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';


export const Scene6Answer: React.FC = () => {

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
      {/* Sacred Tree of Life in Background */}
      <MadhubaniTree x={-100} y={640} scale={1.1} />

      {/* Shore Base */}
      <div
        style={{
          position: 'absolute',
          top: 1220,
          left: 0,
          width: '100%',
          height: '200px',
          background: '#FFE082',
          borderTop: '5px solid #1A1A1A',
          zIndex: 10,
        }}
      />

      {/* Bhagwan Shri Ram holding the little squirrel in his palm - standing on sand! */}
      <MadhubaniRama x={280} y={458} scale={1.25} holdingSquirrel={true} isBlessing={false} />

      {/* Sacred Ocean Waters below */}
      <MadhubaniWater y={1400} height={520} speed={0.9} />

      {/* Divine Falling Petals & Ascending Golden Sparks */}
      <MadhubaniParticles dust={false} sparks={true} petals={true} />

      {/* Border */}
      <MadhubaniBorder />
    </div>
  );
};
