import React from 'react';
import { Series } from 'remotion';
import { Scene1Question } from './scenes/Scene1Question';
import { Scene2Setting } from './scenes/Scene2Setting';
import { Scene3Problem } from './scenes/Scene3Problem';
import { Scene4Turn } from './scenes/Scene4Turn';
import { Scene5Choice } from './scenes/Scene5Choice';
import { Scene6Answer } from './scenes/Scene6Answer';
import { Scene7Blessing } from './scenes/Scene7Blessing';

export const RamSetuStory: React.FC = () => {
  return (
    <Series>
      {/* Scene 1: The Question (0s - 6s) */}
      <Series.Sequence durationInFrames={180}>
        <Scene1Question />
      </Series.Sequence>

      {/* Scene 2: Setting (6s - 12s) */}
      <Series.Sequence durationInFrames={180}>
        <Scene2Setting />
      </Series.Sequence>

      {/* Scene 3: Problem (12s - 18s) */}
      <Series.Sequence durationInFrames={180}>
        <Scene3Problem />
      </Series.Sequence>

      {/* Scene 4: The Turn (18s - 25s) */}
      <Series.Sequence durationInFrames={210}>
        <Scene4Turn />
      </Series.Sequence>

      {/* Scene 5: Choice / Scorn (25s - 31s) */}
      <Series.Sequence durationInFrames={180}>
        <Scene5Choice />
      </Series.Sequence>

      {/* Scene 6: The Answer (31s - 39s) */}
      <Series.Sequence durationInFrames={240}>
        <Scene6Answer />
      </Series.Sequence>

      {/* Scene 7: The Blessing (39s - 45s) */}
      <Series.Sequence durationInFrames={180}>
        <Scene7Blessing />
      </Series.Sequence>
    </Series>
  );
};

