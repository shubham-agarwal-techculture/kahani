import React from 'react';
import { WarliBackground } from '../../components/warli/WarliBackground';
import { WarliBorder } from '../../components/warli/WarliBorder';
import { WarliSun } from '../../components/warli/WarliSun';
import { WarliTree } from '../../components/warli/WarliTree';
import { WarliHut } from '../../components/warli/WarliHut';
import { WarliFigure } from '../../components/warli/WarliFigure';
import { WarliDottedPath } from '../../components/warli/WarliDottedPath';
import { WarliRiver } from '../../components/warli/WarliRiver';

export const WarliScene2Setting: React.FC = () => {
  return (
    <WarliBackground>
      {/* Sun in sky */}
      <WarliSun x={240} y={280} size={190} />

      {/* Background Village Huts */}
      <WarliHut x={680} y={420} scale={1.1} />

      {/* Warli Tree */}
      <WarliTree x={-40} y={640} scale={1.1} />

      {/* Dotted path leading to the river */}
      <WarliDottedPath d="M 120 700 Q 380 840 540 1020 T 780 1340" />

      {/* Elder Monk walking forward with staff */}
      <WarliFigure x={480} y={870} scale={1.4} pose="walking" facing="right" hasStaff={true} />

      {/* Younger Monk walking behind */}
      <WarliFigure x={300} y={880} scale={1.3} pose="walking" facing="right" />

      {/* Swollen River flowing ahead in the foreground */}
      <WarliRiver y={1380} height={460} />

      {/* Border */}
      <WarliBorder />
    </WarliBackground>
  );
};
