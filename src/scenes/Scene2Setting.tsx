import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniSun } from '../components/madhubani/MadhubaniSun';
import { MadhubaniTree } from '../components/madhubani/MadhubaniTree';
import { MadhubaniWater } from '../components/madhubani/MadhubaniWater';
import { MadhubaniVanar } from '../components/madhubani/MadhubaniVanar';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';
import { MadhubaniCaptions } from '../components/madhubani/MadhubaniCaptions';

export const Scene2Setting: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, Math.max(0, frame / 180));

  const spokenText = "Rameshwaram ka kinara tha, jahan vanar sena vishaal parvat utha kar samundar mein daal rahi thi.";

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
      <MadhubaniSun x={220} y={280} size={220} />

      {/* Sacred Tree of Life on the Shore with perched birds */}
      <MadhubaniTree x={-40} y={720} scale={1.05} />

      {/* Sandy Bank */}
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

      {/* Powerful Vanar Warrior lifting mountain rock with "श्री राम" - feet on sand! */}
      <div style={{ position: 'absolute', zIndex: 25 }}>
        <MadhubaniVanar x={480} y={545} scale={1.25} action="lifting" boulderText="श्री राम" />
      </div>

      {/* Ocean with patterned swimming fish */}
      <MadhubaniWater y={1380} height={540} speed={1.5} />

      {/* Floating dust & spark particles */}
      <MadhubaniParticles dust={true} sparks={true} petals={false} />

      {/* Captions inside safe zone */}
      <MadhubaniCaptions text={spokenText} progress={progress} />

      {/* Madhubani Frame Border */}
      <MadhubaniBorder />
    </div>
  );
};
