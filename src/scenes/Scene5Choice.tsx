import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniVanar } from '../components/madhubani/MadhubaniVanar';
import { MadhubaniSquirrel } from '../components/madhubani/MadhubaniSquirrel';
import { MadhubaniWater } from '../components/madhubani/MadhubaniWater';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';
import { MadhubaniCaptions } from '../components/madhubani/MadhubaniCaptions';

export const Scene5Choice: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, Math.max(0, frame / 180));

  const spokenText = "Ek balwaan vanar ne gusse mein kaha—'Aye chhoti! Hat raste se, tere do daanon se kya Ram Setu banega?'";

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
          top: 1140,
          left: 0,
          width: '100%',
          height: '280px',
          background: '#FFE082',
          borderTop: '5px solid #1A1A1A',
          zIndex: 10,
        }}
      />

      {/* Large Mocking Vanar pointing down at squirrel */}
      <MadhubaniVanar x={160} y={720} scale={1.4} action="pointing" />

      {/* Tiny Squirrel standing firm, hands folded in Pranam / prayer */}
      <MadhubaniSquirrel x={680} y={1160} scale={1.4} pose="praying" />

      {/* Surging ocean waves below */}
      <MadhubaniWater y={1380} height={540} speed={1.3} />

      {/* Subtle dust particles */}
      <MadhubaniParticles dust={true} sparks={false} petals={false} />

      {/* Captions inside safe zone */}
      <MadhubaniCaptions text={spokenText} progress={progress} />

      {/* Border */}
      <MadhubaniBorder />
    </div>
  );
};

