import React from 'react';
import { Composition } from 'remotion';
import { ReelScene } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="StoryReel"
        component={ReelScene}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
