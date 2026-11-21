import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniTree } from '../components/madhubani/MadhubaniTree';
import { MadhubaniWater } from '../components/madhubani/MadhubaniWater';
import { MadhubaniVanar } from '../components/madhubani/MadhubaniVanar';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';
import { MadhubaniCaptions } from '../components/madhubani/MadhubaniCaptions';

export const Scene3Problem: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, Math.max(0, frame / 180));

  // Dynamic rock splash falling
  const rockY = Math.min(420, frame * 6);

  const spokenText = "Har taraf dhool thi, garjana thi, aur Lanka tak pahunchne ki bechaini thi.";

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

      {/* Vanar 1 (Left background) */}
      <MadhubaniVanar x={120} y={800} scale={0.95} action="lifting" boulderText="जय श्री राम" />

      {/* Vanar 2 (Right midground) */}
      <MadhubaniVanar x={580} y={760} scale={1.15} action="lifting" boulderText="श्री राम" />

      {/* Rock crashing into sea with stylized splash */}
      <div
        style={{
          position: 'absolute',
          top: 980 + rockY,
          left: 420,
          zIndex: 18,
        }}
      >
        <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
          <polygon points="20,80 80,20 180,40 220,110 160,160 40,140" fill="#78909C" stroke="#1A1A1A" strokeWidth="4" />
          {/* Splash droplets in Madhubani style */}
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

      {/* Captions inside safe zone */}
      <MadhubaniCaptions text={spokenText} progress={progress} />

      {/* Border */}
      <MadhubaniBorder />
    </div>
  );
};

