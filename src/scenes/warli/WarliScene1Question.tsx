import React from 'react';
import { WarliBackground } from '../../components/warli/WarliBackground';
import { WarliBorder } from '../../components/warli/WarliBorder';
import { WarliSun } from '../../components/warli/WarliSun';
import { WarliTree } from '../../components/warli/WarliTree';
import { WarliFigure } from '../../components/warli/WarliFigure';

export const WarliScene1Question: React.FC = () => {
  return (
    <WarliBackground>
      {/* Radiant Warli Sun with geometric rays */}
      <WarliSun x={840} y={320} size={220} />

      {/* Top Header Badge (Inside Safe Area > 160px from top) */}
      <div
        style={{
          position: 'absolute',
          top: 175,
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 80,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '10px 30px',
            background: '#FBF8EE',
            color: '#7D2D20',
            border: '2px solid #541E15',
            borderRadius: '24px',
            fontSize: '24px',
            fontWeight: 800,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          }}
        >
          ✦ MANN KA BHOJH ✦
        </span>
      </div>

      {/* Sacred Warli Tree on the left */}
      <WarliTree x={80} y={580} scale={1.25} />

      {/* Concentric Dotted Whirlpool of Overthinking around the sitting figure */}
      <svg
        style={{
          position: 'absolute',
          top: 860,
          left: 360,
          width: 540,
          height: 540,
          pointerEvents: 'none',
        }}
        viewBox="0 0 540 540"
      >
        <circle cx="270" cy="270" r="80" fill="none" stroke="#FBF8EE" strokeWidth="2.5" strokeDasharray="6 8" opacity="0.6" />
        <circle cx="270" cy="270" r="140" fill="none" stroke="#FBF8EE" strokeWidth="2.5" strokeDasharray="8 10" opacity="0.5" />
        <circle cx="270" cy="270" r="200" fill="none" stroke="#FBF8EE" strokeWidth="2.5" strokeDasharray="10 12" opacity="0.35" />
        <circle cx="270" cy="270" r="250" fill="none" stroke="#FBF8EE" strokeWidth="2" strokeDasharray="6 14" opacity="0.25" />
      </svg>

      {/* Solitary Warli Figure clutching head in deep thought / mental anguish */}
      <WarliFigure x={570} y={1050} scale={1.7} pose="sitting" facing="right" />

      {/* Ground horizon line with Warli dots */}
      <div
        style={{
          position: 'absolute',
          top: 1300,
          left: 0,
          width: '100%',
          height: '10px',
        }}
      >
        <svg width="1080" height="40">
          <line x1="0" y1="10" x2="1080" y2="10" stroke="#FBF8EE" strokeWidth="3" />
          {Array.from({ length: 44 }).map((_, i) => (
            <circle key={i} cx={12 + i * 25} cy="25" r="2.5" fill="#FBF8EE" />
          ))}
        </svg>
      </div>

      {/* Outer Sawtooth Warli Border */}
      <WarliBorder />
    </WarliBackground>
  );
};
