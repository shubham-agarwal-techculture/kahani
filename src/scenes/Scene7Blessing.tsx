import React from 'react';
import { useCurrentFrame } from 'remotion';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniRama } from '../components/madhubani/MadhubaniRama';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';
import { MadhubaniCaptions } from '../components/madhubani/MadhubaniCaptions';

export const Scene7Blessing: React.FC = () => {
  const frame = useCurrentFrame();
  const progress = Math.min(1, Math.max(0, frame / 180));

  const spokenText = "Ram ji ne prem se uski peeth par ungliyan pheri, aur teen divya lakirein ban gayi. Agli baar jab tum gilahri dekho, to dekhna—kya wo lakirein tumhe dikhti hain?";

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
      {/* Divine Light Rosette in background */}
      <div
        style={{
          position: 'absolute',
          top: 360,
          left: 240,
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '6px double #D32F2F',
          outline: '3px dashed #FBC02D',
          outlineOffset: '8px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* Close-Up Focus: Shri Ram stroking the Squirrel leaving 3 glowing white stripes */}
      <MadhubaniRama x={220} y={660} scale={1.5} holdingSquirrel={true} isBlessing={true} />

      {/* Floating Lotus & Marigold Petals */}
      <MadhubaniParticles dust={false} sparks={true} petals={true} />

      {/* Final Closing Philosophy Card (Top Safe Zone) */}
      <div
        style={{
          position: 'absolute',
          top: 175,
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 85,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '12px 32px',
            background: '#FBC02D',
            color: '#1A1A1A',
            border: '3px solid #1A1A1A',
            borderRadius: '28px',
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '2px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
          }}
        >
          ✦ DIL KA SAMARPAN HI SABSE BADA HAI ✦
        </span>
      </div>

      {/* Captions inside safe zone */}
      <MadhubaniCaptions text={spokenText} progress={progress} />

      {/* Border */}
      <MadhubaniBorder />
    </div>
  );
};

