import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniRama } from '../components/madhubani/MadhubaniRama';
import { MadhubaniTree } from '../components/madhubani/MadhubaniTree';
import { MadhubaniWater } from '../components/madhubani/MadhubaniWater';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';
import { MadhubaniCaptions } from '../components/madhubani/MadhubaniCaptions';

export const Scene6Answer: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, Math.max(0, frame / 240));

  const spokenText = "Tabhi Shri Ram ne muskurakar use apni hatheli par utha liya, aur bole—'Seva mein shakti nahi, shraddha dekhi jaati hai.'";

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
      <MadhubaniTree x={-100} y={680} scale={1.15} />

      {/* Divine Golden Rays radiating from Bhagwan Shri Ram */}
      <div
        style={{
          position: 'absolute',
          top: 240,
          left: 140,
          width: '800px',
          height: '800px',
          borderRadius: '50%',
          border: '4px dashed #FBC02D',
          opacity: 0.45,
          pointerEvents: 'none',
        }}
      />

      {/* Shore Base */}
      <div
        style={{
          position: 'absolute',
          top: 1240,
          left: 0,
          width: '100%',
          height: '180px',
          background: '#FFE082',
          borderTop: '5px solid #1A1A1A',
          zIndex: 10,
        }}
      />

      {/* Bhagwan Shri Ram holding the little squirrel in his palm */}
      <MadhubaniRama x={280} y={720} scale={1.35} holdingSquirrel={true} isBlessing={false} />

      {/* Sacred Ocean Waters below */}
      <MadhubaniWater y={1400} height={520} speed={0.9} />

      {/* Divine Falling Petals & Ascending Golden Sparks */}
      <MadhubaniParticles dust={false} sparks={true} petals={true} />

      {/* Captions inside safe zone */}
      <MadhubaniCaptions text={spokenText} progress={progress} />

      {/* Border */}
      <MadhubaniBorder />
    </div>
  );
};

