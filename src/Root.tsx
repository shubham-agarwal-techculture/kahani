import React from 'react';
import { Composition } from 'remotion';
import { ReelScene } from './Composition';
import { RamSetuStory } from './RamSetuStory';
import { RamSetuStoryWithAudio } from './RamSetuStoryWithAudio';
import { Scene1Question } from './scenes/Scene1Question';
import { Scene2Setting } from './scenes/Scene2Setting';
import { Scene3Problem } from './scenes/Scene3Problem';
import { Scene4Turn } from './scenes/Scene4Turn';
import { Scene5Choice } from './scenes/Scene5Choice';
import { Scene6Answer } from './scenes/Scene6Answer';
import { Scene7Blessing } from './scenes/Scene7Blessing';
import { WarliScene1Question } from './scenes/warli/WarliScene1Question';
import { WarliScene2Setting } from './scenes/warli/WarliScene2Setting';
import { WarliScene3Encounter } from './scenes/warli/WarliScene3Encounter';
import { WarliScene4Action } from './scenes/warli/WarliScene4Action';
import { WarliScene5Turmoil } from './scenes/warli/WarliScene5Turmoil';
import { WarliScene6Questioning } from './scenes/warli/WarliScene6Questioning';
import { WarliScene7Answer } from './scenes/warli/WarliScene7Answer';
import { WarliStoryWithAudio } from './WarliStoryWithAudio';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── FINAL REEL WITH AUDIO + TIMED CAPTIONS (57.7s / 1732 frames) ── */}
      <Composition
        id="RamSetuReelFinal"
        component={RamSetuStoryWithAudio}
        durationInFrames={1732}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* ── STORY 02: WARLI REEL WITH AUDIO + TIMED CAPTIONS (54.4s / 1633 frames) ── */}
      <Composition
        id="WarliReelFinal"
        component={WarliStoryWithAudio}
        durationInFrames={1633}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />

      {/* 45-Second mute master (original, no audio) */}
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

      {/* ── STORY 02: WARLI TRIBAL STORYBOARD SCENES ── */}
      <Composition
        id="WarliScene1"
        component={WarliScene1Question}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      <Composition
        id="WarliScene2"
        component={WarliScene2Setting}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      <Composition
        id="WarliScene3"
        component={WarliScene3Encounter}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      <Composition
        id="WarliScene4"
        component={WarliScene4Action}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      <Composition
        id="WarliScene5"
        component={WarliScene5Turmoil}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      <Composition
        id="WarliScene6"
        component={WarliScene6Questioning}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
      <Composition
        id="WarliScene7"
        component={WarliScene7Answer}
        durationInFrames={180}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{}}
      />
    </>
  );
};
