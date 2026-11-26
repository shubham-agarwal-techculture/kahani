import React from 'react';
import { WarliBackground } from '../../components/warli/WarliBackground';
import { WarliBorder } from '../../components/warli/WarliBorder';
import { WarliTree } from '../../components/warli/WarliTree';
import { WarliHut } from '../../components/warli/WarliHut';
import { WarliFigure } from '../../components/warli/WarliFigure';

export const WarliScene6Questioning: React.FC = () => {
  return (
    <WarliBackground>
      {/* Village Ashram Hut in background */}
      <WarliHut x={120} y={480} scale={1.2} />

      {/* Tree of Life */}
      <WarliTree x={680} y={420} scale={1.2} />

      {/* Ground baseline */}
      <div
        style={{
          position: 'absolute',
          top: 1140,
          left: 0,
          width: '100%',
        }}
      >
        <svg width="1080" height="40">
          <line x1="0" y1="15" x2="1080" y2="15" stroke="#FBF8EE" strokeWidth="3" />
          {Array.from({ length: 44 }).map((_, i) => (
            <circle key={i} cx={12 + i * 25} cy="28" r="2.5" fill="#FBF8EE" />
          ))}
        </svg>
      </div>

      {/* Younger Monk stopped in his tracks, gesturing emphatically / accusingly */}
      <WarliFigure x={300} y={940} scale={1.5} pose="questioning" facing="right" />

      {/* Elder Monk turned around, listening calmly with upright walking staff */}
      <WarliFigure x={640} y={930} scale={1.6} pose="standing" facing="left" hasStaff={true} />

      {/* Dynamic exclamation / question tribal symbol between them */}
      <svg
        style={{
          position: 'absolute',
          top: 860,
          left: 480,
          width: 120,
          height: 120,
          pointerEvents: 'none',
        }}
        viewBox="0 0 120 120"
      >
        <circle cx="60" cy="40" r="12" fill="none" stroke="#FBF8EE" strokeWidth="3" strokeDasharray="4 3" />
        <line x1="60" y1="60" x2="60" y2="85" stroke="#FBF8EE" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="60" cy="100" r="4.5" fill="#FBF8EE" />
      </svg>

      {/* Border */}
      <WarliBorder />
    </WarliBackground>
  );
};
