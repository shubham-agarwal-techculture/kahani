import React from 'react';
import { WarliBackground } from '../../components/warli/WarliBackground';
import { WarliBorder } from '../../components/warli/WarliBorder';
import { WarliSun } from '../../components/warli/WarliSun';
import { WarliFigure } from '../../components/warli/WarliFigure';
import { WarliRiver } from '../../components/warli/WarliRiver';

export const WarliScene4Action: React.FC = () => {
  return (
    <WarliBackground>
      {/* Sun blessing the selfless act */}
      <WarliSun x={880} y={260} size={180} />

      {/* Stepping stones across the river */}
      <div
        style={{
          position: 'absolute',
          top: 960,
          left: 0,
          width: '100%',
          height: '320px',
        }}
      >
        <svg width="1080" height="320">
          {[160, 320, 500, 680, 860].map((sx, i) => (
            <ellipse key={i} cx={sx} cy="180" rx="45" ry="18" fill="#FBF8EE" opacity="0.35" stroke="#FBF8EE" strokeWidth="2.5" />
          ))}
        </svg>
      </div>

      {/* Younger Monk watching from the left shore with crossed arms / disbelief */}
      <WarliFigure x={100} y={850} scale={1.3} pose="questioning" facing="right" />

      {/* Central Heroic Beat: Elder Monk carrying the woman across the river on his back */}
      {/* Elder Monk in walking/carrying posture */}
      <WarliFigure x={490} y={830} scale={1.5} pose="carrying" facing="right" />

      {/* Woman figure riding on his back */}
      <WarliFigure x={460} y={770} scale={1.15} pose="standing" gender="female" facing="right" />

      {/* Flowing river currents all around */}
      <WarliRiver y={1180} height={640} />

      {/* Border */}
      <WarliBorder />
    </WarliBackground>
  );
};
