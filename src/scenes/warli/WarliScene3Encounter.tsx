import React from 'react';
import { WarliBackground } from '../../components/warli/WarliBackground';
import { WarliBorder } from '../../components/warli/WarliBorder';
import { WarliTree } from '../../components/warli/WarliTree';
import { WarliFigure } from '../../components/warli/WarliFigure';
import { WarliRiver } from '../../components/warli/WarliRiver';

export const WarliScene3Encounter: React.FC = () => {
  return (
    <WarliBackground>
      {/* Ancient Tree on the riverbank */}
      <WarliTree x={760} y={540} scale={1.15} />

      {/* River bank rocky shore */}
      <div
        style={{
          position: 'absolute',
          top: 1080,
          left: 0,
          width: '100%',
          height: '240px',
        }}
      >
        <svg width="1080" height="240">
          <line x1="0" y1="180" x2="1080" y2="180" stroke="#FBF8EE" strokeWidth="3" />
          {/* Stepping stone circles */}
          {[120, 240, 380, 520, 680, 840, 980].map((sx, i) => (
            <ellipse key={i} cx={sx} cy="205" rx="35" ry="14" fill="#FBF8EE" opacity="0.3" stroke="#FBF8EE" strokeWidth="2" />
          ))}
        </svg>
      </div>

      {/* The Two Monks arriving at the left bank */}
      {/* Elder Monk */}
      <WarliFigure x={180} y={920} scale={1.4} pose="standing" facing="right" hasStaff={true} />
      {/* Younger Monk */}
      <WarliFigure x={60} y={930} scale={1.3} pose="standing" facing="right" />

      {/* Young Woman stranded at the edge of the rushing river, hands raised in distress */}
      <WarliFigure x={620} y={910} scale={1.35} pose="questioning" gender="female" facing="left" />

      {/* Surging River with waves and fish */}
      <WarliRiver y={1280} height={540} />

      {/* Border */}
      <WarliBorder />
    </WarliBackground>
  );
};
