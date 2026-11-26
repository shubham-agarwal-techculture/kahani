import React from 'react';
import { WarliBackground } from '../../components/warli/WarliBackground';
import { WarliBorder } from '../../components/warli/WarliBorder';
import { WarliTree } from '../../components/warli/WarliTree';
import { WarliFigure } from '../../components/warli/WarliFigure';
import { WarliDottedPath } from '../../components/warli/WarliDottedPath';

export const WarliScene5Turmoil: React.FC = () => {
  return (
    <WarliBackground>
      {/* Winding mountain path */}
      <WarliDottedPath d="M 80 1250 Q 320 1100 560 980 T 960 740" />

      {/* Trees along the mountain ridge */}
      <WarliTree x={60} y={480} scale={0.9} />
      <WarliTree x={780} y={380} scale={1.05} />

      {/* Elder Monk walking calmly ahead with staff */}
      <WarliFigure x={640} y={820} scale={1.4} pose="walking" facing="right" hasStaff={true} />

      {/* Younger Monk walking behind with agitated mental storm above his head */}
      <WarliFigure x={340} y={920} scale={1.3} pose="walking" facing="right" />

      {/* Jagged Zigzag Lightning & Swirling Dots of Anger / Overthinking over young monk */}
      <svg
        style={{
          position: 'absolute',
          top: 760,
          left: 310,
          width: 220,
          height: 180,
          pointerEvents: 'none',
        }}
        viewBox="0 0 220 180"
      >
        {/* Agitated zigzags */}
        <polyline points="40,90 60,60 80,100 100,50 120,80 140,40" fill="none" stroke="#FBF8EE" strokeWidth="3" />
        <polyline points="60,110 80,85 100,120 120,75 140,110" fill="none" stroke="#FBF8EE" strokeWidth="2" strokeDasharray="4 4" />
        {/* Swirling dots */}
        <circle cx="50" cy="40" r="3" fill="#FBF8EE" />
        <circle cx="90" cy="30" r="4" fill="#FBF8EE" />
        <circle cx="130" cy="25" r="3" fill="#FBF8EE" />
        <circle cx="160" cy="45" r="3.5" fill="#FBF8EE" />
      </svg>

      {/* Ground line */}
      <div
        style={{
          position: 'absolute',
          top: 1320,
          left: 0,
          width: '100%',
        }}
      >
        <svg width="1080" height="30">
          <line x1="0" y1="10" x2="1080" y2="10" stroke="#FBF8EE" strokeWidth="3" />
        </svg>
      </div>

      {/* Border */}
      <WarliBorder />
    </WarliBackground>
  );
};
