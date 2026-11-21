import React from 'react';
import { Composition } from 'remotion';
import { ReelScene } from './Composition';
import { RamSetuStory } from './RamSetuStory';
import { Scene1Question } from './scenes/Scene1Question';
import { Scene2Setting } from './scenes/Scene2Setting';
import { Scene3Problem } from './scenes/Scene3Problem';
import { Scene4Turn } from './scenes/Scene4Turn';
import { Scene5Choice } from './scenes/Scene5Choice';
import { Scene6Answer } from './scenes/Scene6Answer';
import { Scene7Blessing } from './scenes/Scene7Blessing';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* 45-Second Master Reel (1350 frames @ 30fps) */}
      <Composition
        id="RamSetuReel"
        component={RamSetuStory}
        durationInFrames={1350}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Individual Storyboard Scene Compositions */}
      <Composition
        id="StoryboardScene1"
        component={Scene1Question}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      <Composition
        id="StoryboardScene2"
        component={Scene2Setting}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      <Composition
        id="StoryboardScene3"
        component={Scene3Problem}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      <Composition
        id="StoryboardScene4"
        component={Scene4Turn}
        durationInFrames={210}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      <Composition
        id="StoryboardScene5"
        component={Scene5Choice}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      <Composition
        id="StoryboardScene6"
        component={Scene6Answer}
        durationInFrames={240}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      <Composition
        id="StoryboardScene7"
        component={Scene7Blessing}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* Studio Baseline Test Reel */}
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
