import React from 'react';
import { Audio, Series, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { WarliScene1Question } from './scenes/warli/WarliScene1Question';
import { WarliScene2Setting } from './scenes/warli/WarliScene2Setting';
import { WarliScene3Encounter } from './scenes/warli/WarliScene3Encounter';
import { WarliScene4Action } from './scenes/warli/WarliScene4Action';
import { WarliScene5Turmoil } from './scenes/warli/WarliScene5Turmoil';
import { WarliScene6Questioning } from './scenes/warli/WarliScene6Questioning';
import { WarliScene7Answer } from './scenes/warli/WarliScene7Answer';
import { WarliTimedCaptions, CaptionChunk } from './components/warli/WarliTimedCaptions';

interface SceneData {
  id: number;
  durationFrames: number;
  chunks: CaptionChunk[];
}

const SCENE_MANIFEST: SceneData[] = [
  {
    id: 1,
    durationFrames: 180,
    chunks: [
      { text: "अगर चोट सिर्फ एक बार लगी थी,", startMs: 0, endMs: 2100 },
      { text: "तो उसका दर्द मन में", startMs: 2100, endMs: 3700 },
      { text: "सौ बार क्यों दोहराते हो?", startMs: 3700, endMs: 5600 }
    ]
  },
  {
    id: 2,
    durationFrames: 250,
    chunks: [
      { text: "दो भिक्षु जंगल के रास्ते से", startMs: 0, endMs: 2400 },
      { text: "अपने आश्रम लौट रहे थे।", startMs: 2400, endMs: 4400 },
      { text: "सामने एक उफनती हुई", startMs: 4400, endMs: 6100 },
      { text: "कीचड़ भरी नदी थी।", startMs: 6100, endMs: 8000 }
    ]
  },
  {
    id: 3,
    durationFrames: 185,
    chunks: [
      { text: "किनारे पर एक युवती खड़ी थी,", startMs: 0, endMs: 2600 },
      { text: "जो उस तेज़ बहाव को", startMs: 2600, endMs: 4200 },
      { text: "पार करने से डर रही थी।", startMs: 4200, endMs: 5800 }
    ]
  },
  {
    id: 4,
    durationFrames: 249,
    chunks: [
      { text: "बिना कुछ कहे, बड़े भिक्षु ने", startMs: 0, endMs: 2300 },
      { text: "उसे अपनी पीठ पर उठाया,", startMs: 2300, endMs: 4300 },
      { text: "नदी पार कराई,", startMs: 4300, endMs: 5600 },
      { text: "और नीचे उतारकर आगे बढ़ गए।", startMs: 5600, endMs: 7900 }
    ]
  },
  {
    id: 5,
    durationFrames: 234,
    chunks: [
      { text: "घंटों तक दोनों चुपचाप चलते रहे।", startMs: 0, endMs: 2800 },
      { text: "पर छोटे भिक्षु का मन", startMs: 2800, endMs: 4700 },
      { text: "गुस्से और बेचैनी से उबल रहा था।", startMs: 4700, endMs: 7500 }
    ]
  },
  {
    id: 6,
    durationFrames: 231,
    chunks: [
      { text: "आखिरकार उसने चिल्लाकर कहा—", startMs: 0, endMs: 2400 },
      { text: "‘हमारे नियमों में स्त्री को छूना मना है,", startMs: 2400, endMs: 4800 },
      { text: "फिर आपने उसे पीठ पर क्यों उठाया?’", startMs: 4800, endMs: 7300 }
    ]
  },
  {
    id: 7,
    durationFrames: 304,
    chunks: [
      { text: "बड़े भिक्षु मुस्कुराए और बोले—", startMs: 0, endMs: 2500 },
      { text: "‘वत्स, मैंने तो उसे नदी किनारे ही छोड़ दिया था।", startMs: 2500, endMs: 5600 },
      { text: "तुम अब तक उसे अपने सिर पर", startMs: 5600, endMs: 7400 },
      { text: "क्यों उठाए घूम रहे हो?’", startMs: 7400, endMs: 9800 }
    ]
  }
];

const SceneComponents = [
  WarliScene1Question,
  WarliScene2Setting,
  WarliScene3Encounter,
  WarliScene4Action,
  WarliScene5Turmoil,
  WarliScene6Questioning,
  WarliScene7Answer,
];

const SceneWithCaptions: React.FC<{ sceneIndex: number }> = ({ sceneIndex }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const currentMs = (frame / fps) * 1000;
  const SceneComp = SceneComponents[sceneIndex];
  const manifest = SCENE_MANIFEST[sceneIndex];

  return (
    <div style={{ position: 'relative', width: 1080, height: 1920 }}>
      <SceneComp />
      <WarliTimedCaptions chunks={manifest.chunks} currentMs={currentMs} />
    </div>
  );
};

export const WarliStoryWithAudio: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: 1080, height: 1920, backgroundColor: '#7D2D20' }}>
      {/* Insightful Tibetan Singing Bowl + Meditative drone BGM & Hindi Voiceover */}
      <Audio src={staticFile('story_02_final_audio.wav')} />

      <Series>
        {SCENE_MANIFEST.map((scene, i) => (
          <Series.Sequence key={scene.id} durationInFrames={scene.durationFrames}>
            <SceneWithCaptions sceneIndex={i} />
          </Series.Sequence>
        ))}
      </Series>
    </div>
  );
};
