import React from 'react';
import { MadhubaniBorder } from '../components/madhubani/MadhubaniBorder';
import { MadhubaniRama } from '../components/madhubani/MadhubaniRama';
import { MadhubaniParticles } from '../components/madhubani/MadhubaniParticles';


export const Scene7Blessing: React.FC = () => {

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
          top: 320,
          left: 240,
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          border: '6px double #D32F2F',
          outline: '3px dashed #FBC02D',
          outlineOffset: '8px',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* Close-Up Focus: Shri Ram stroking the Squirrel leaving 3 glowing white stripes */}
      <MadhubaniRama x={220} y={430} scale={1.35} holdingSquirrel={true} isBlessing={true} />

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

      {/* Border */}
      <MadhubaniBorder />
    </div>
  );
};
