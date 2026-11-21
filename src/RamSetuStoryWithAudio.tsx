import React from 'react';
import { Audio, Series, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { Scene1Question } from './scenes/Scene1Question';
import { Scene2Setting } from './scenes/Scene2Setting';
import { Scene3Problem } from './scenes/Scene3Problem';
import { Scene4Turn } from './scenes/Scene4Turn';
import { Scene5Choice } from './scenes/Scene5Choice';
import { Scene6Answer } from './scenes/Scene6Answer';
import { Scene7Blessing } from './scenes/Scene7Blessing';
import { TimedCaptions, WordTiming } from './components/madhubani/TimedCaptions';

// --- Audio manifest (baked in from voice/audio_manifest.json) ---
// Scene durations based on actual TTS output with 300ms gap
const SCENE_MANIFEST: Array<{
  id: number;
  startMs: number;
  durationMs: number;
  startFrame: number;
  durationFrames: number;
  words: WordTiming[];
}> = [
  {
    id: 1, startMs: 0, durationMs: 5652,
    startFrame: 0, durationFrames: 170,
    words: [
      { text: 'क्या',      startMs: 0,    endMs: 380  },
      { text: 'एक',       startMs: 380,  endMs: 640  },
      { text: 'मुट्ठी',   startMs: 640,  endMs: 980  },
      { text: 'भर',       startMs: 980,  endMs: 1180 },
      { text: 'गिलहरी',   startMs: 1180, endMs: 1580 },
      { text: 'विशाल',    startMs: 1580, endMs: 1940 },
      { text: 'समुन्दर',  startMs: 1940, endMs: 2500 },
      { text: 'पत्थर',    startMs: 2500, endMs: 3060 },
      { text: 'का',       startMs: 3060, endMs: 3180 },
      { text: 'पुल',      startMs: 3180, endMs: 3420 },
      { text: 'बना',      startMs: 3420, endMs: 3580 },
      { text: 'सकती',     startMs: 3580, endMs: 4000 },
      { text: 'है?',      startMs: 4000, endMs: 4800 },
    ],
  },
  {
    id: 2, startMs: 5652, durationMs: 6540,
    startFrame: 170, durationFrames: 196,
    words: [
      { text: 'रामेश्वरम',startMs: 0,    endMs: 620  },
      { text: 'का',       startMs: 620,  endMs: 760  },
      { text: 'किनारा',   startMs: 760,  endMs: 1200 },
      { text: 'था,',      startMs: 1200, endMs: 1500 },
      { text: 'जहाँ',     startMs: 1500, endMs: 1900 },
      { text: 'वानर',     startMs: 1900, endMs: 2200 },
      { text: 'सेना',     startMs: 2200, endMs: 2600 },
      { text: 'विशाल',    startMs: 2600, endMs: 2960 },
      { text: 'पर्वत',    startMs: 2960, endMs: 3380 },
      { text: 'उठा',      startMs: 3380, endMs: 3700 },
      { text: 'कर',       startMs: 3700, endMs: 3920 },
      { text: 'समुन्दर',  startMs: 3920, endMs: 4600 },
      { text: 'में',       startMs: 4600, endMs: 4860 },
      { text: 'डाल',      startMs: 4860, endMs: 5200 },
      { text: 'रही थी।', startMs: 5200, endMs: 5900 },
    ],
  },
  {
    id: 3, startMs: 12192, durationMs: 5532,
    startFrame: 366, durationFrames: 166,
    words: [
      { text: 'हर',        startMs: 0,    endMs: 300  },
      { text: 'तरफ',       startMs: 300,  endMs: 680  },
      { text: 'धूल',       startMs: 680,  endMs: 1060 },
      { text: 'थी,',       startMs: 1060, endMs: 1440 },
      { text: 'गर्जना',    startMs: 1440, endMs: 1980 },
      { text: 'थी,',       startMs: 1980, endMs: 2340 },
      { text: 'और',        startMs: 2340, endMs: 2600 },
      { text: 'लंका',      startMs: 2600, endMs: 2960 },
      { text: 'तक',        startMs: 2960, endMs: 3200 },
      { text: 'पहुँचने',   startMs: 3200, endMs: 3800 },
      { text: 'की',        startMs: 3800, endMs: 4000 },
      { text: 'बेचैनी',    startMs: 4000, endMs: 4600 },
      { text: 'थी।',       startMs: 4600, endMs: 5100 },
    ],
  },
  {
    id: 4, startMs: 17724, durationMs: 7812,
    startFrame: 532, durationFrames: 234,
    words: [
      { text: 'तभी',       startMs: 0,    endMs: 380  },
      { text: 'एक',        startMs: 380,  endMs: 580  },
      { text: 'नन्ही',     startMs: 580,  endMs: 980  },
      { text: 'गिलहरी',    startMs: 980,  endMs: 1400 },
      { text: 'पानी',      startMs: 1400, endMs: 1760 },
      { text: 'में',        startMs: 1760, endMs: 2000 },
      { text: 'भीगती,',    startMs: 2000, endMs: 2560 },
      { text: 'रेत',       startMs: 2560, endMs: 2900 },
      { text: 'पर',        startMs: 2900, endMs: 3100 },
      { text: 'लोटती,',    startMs: 3100, endMs: 3800 },
      { text: 'और',        startMs: 3800, endMs: 4100 },
      { text: 'अपने',      startMs: 4100, endMs: 4480 },
      { text: 'शरीर',      startMs: 4480, endMs: 4880 },
      { text: 'से',         startMs: 4880, endMs: 5100 },
      { text: 'दो-दो',     startMs: 5100, endMs: 5600 },
      { text: 'दाने',      startMs: 5600, endMs: 5980 },
      { text: 'पुल',       startMs: 5980, endMs: 6300 },
      { text: 'पर',        startMs: 6300, endMs: 6520 },
      { text: 'झाड़',      startMs: 6520, endMs: 6940 },
      { text: 'आती।',      startMs: 6940, endMs: 7500 },
    ],
  },
  {
    id: 5, startMs: 25536, durationMs: 7788,
    startFrame: 766, durationFrames: 234,
    words: [
      { text: 'एक',        startMs: 0,    endMs: 300  },
      { text: 'बलवान',     startMs: 300,  endMs: 740  },
      { text: 'वानर',      startMs: 740,  endMs: 1120 },
      { text: 'ने',         startMs: 1120, endMs: 1300 },
      { text: 'गुस्से',    startMs: 1300, endMs: 1760 },
      { text: 'में',        startMs: 1760, endMs: 2000 },
      { text: 'कहा—',      startMs: 2000, endMs: 2460 },
      { text: "'ऐ",        startMs: 2460, endMs: 2800 },
      { text: 'छोटी!',     startMs: 2800, endMs: 3200 },
      { text: 'हट',        startMs: 3200, endMs: 3540 },
      { text: 'रास्ते',    startMs: 3540, endMs: 4020 },
      { text: 'से,',       startMs: 4020, endMs: 4360 },
      { text: 'तेरे',      startMs: 4360, endMs: 4700 },
      { text: 'दो',        startMs: 4700, endMs: 4940 },
      { text: 'दानों',     startMs: 4940, endMs: 5360 },
      { text: 'से',         startMs: 5360, endMs: 5600 },
      { text: 'क्या',      startMs: 5600, endMs: 5940 },
      { text: 'राम',       startMs: 5940, endMs: 6180 },
      { text: 'सेतु',      startMs: 6180, endMs: 6560 },
      { text: "बनेगा?'",   startMs: 6560, endMs: 7400 },
    ],
  },
  {
    id: 6, startMs: 33323, durationMs: 8556,
    startFrame: 1000, durationFrames: 257,
    words: [
      { text: 'तभी',       startMs: 0,    endMs: 380  },
      { text: 'श्री',      startMs: 380,  endMs: 660  },
      { text: 'राम',       startMs: 660,  endMs: 920  },
      { text: 'ने',         startMs: 920,  endMs: 1100 },
      { text: 'मुस्कुराकर',startMs: 1100, endMs: 1900 },
      { text: 'उसे',       startMs: 1900, endMs: 2200 },
      { text: 'अपनी',      startMs: 2200, endMs: 2600 },
      { text: 'हथेली',     startMs: 2600, endMs: 3060 },
      { text: 'पर',        startMs: 3060, endMs: 3280 },
      { text: 'उठा',       startMs: 3280, endMs: 3600 },
      { text: 'लिया,',     startMs: 3600, endMs: 4100 },
      { text: 'और',        startMs: 4100, endMs: 4400 },
      { text: 'बोले—',     startMs: 4400, endMs: 4860 },
      { text: "'सेवा",     startMs: 4860, endMs: 5260 },
      { text: 'में',        startMs: 5260, endMs: 5500 },
      { text: 'शक्ति',     startMs: 5500, endMs: 5940 },
      { text: 'नहीं,',     startMs: 5940, endMs: 6380 },
      { text: 'श्रद्धा',   startMs: 6380, endMs: 6900 },
      { text: 'देखी',      startMs: 6900, endMs: 7260 },
      { text: "जाती है।'", startMs: 7260, endMs: 8200 },
    ],
  },
  {
    id: 7, startMs: 41879, durationMs: 11820,
    startFrame: 1257, durationFrames: 355,
    words: [
      { text: 'राम',       startMs: 0,    endMs: 340  },
      { text: 'जी',        startMs: 340,  endMs: 540  },
      { text: 'ने',         startMs: 540,  endMs: 720  },
      { text: 'प्रेम',     startMs: 720,  endMs: 1100 },
      { text: 'से',         startMs: 1100, endMs: 1340 },
      { text: 'उसकी',      startMs: 1340, endMs: 1740 },
      { text: 'पीठ',       startMs: 1740, endMs: 2100 },
      { text: 'पर',        startMs: 2100, endMs: 2340 },
      { text: 'उँगलियाँ',  startMs: 2340, endMs: 2960 },
      { text: 'फेरीं,',    startMs: 2960, endMs: 3500 },
      { text: 'और',        startMs: 3500, endMs: 3760 },
      { text: 'तीन',       startMs: 3760, endMs: 4100 },
      { text: 'दिव्य',     startMs: 4100, endMs: 4560 },
      { text: 'लकीरें',    startMs: 4560, endMs: 5100 },
      { text: 'बन',        startMs: 5100, endMs: 5340 },
      { text: 'गईं।',      startMs: 5340, endMs: 5900 },
      { text: 'अगली',      startMs: 5900, endMs: 6260 },
      { text: 'बार',       startMs: 6260, endMs: 6540 },
      { text: 'जब',        startMs: 6540, endMs: 6780 },
      { text: 'तुम',       startMs: 6780, endMs: 7000 },
      { text: 'गिलहरी',    startMs: 7000, endMs: 7440 },
      { text: 'देखो,',     startMs: 7440, endMs: 7920 },
      { text: 'तो',        startMs: 7920, endMs: 8200 },
      { text: 'देखना—',    startMs: 8200, endMs: 8740 },
      { text: 'क्या',      startMs: 8740, endMs: 9060 },
      { text: 'वो',        startMs: 9060, endMs: 9280 },
      { text: 'लकीरें',    startMs: 9280, endMs: 9780 },
      { text: 'तुम्हें',   startMs: 9780, endMs: 10200 },
      { text: 'दिखती',     startMs: 10200, endMs: 10680 },
      { text: 'हैं?',      startMs: 10680, endMs: 11300 },
    ],
  },
];

const SceneComponents = [
  Scene1Question, Scene2Setting, Scene3Problem, Scene4Turn,
  Scene5Choice, Scene6Answer, Scene7Blessing,
];

// A scene wrapper that injects timed captions via absolute overlay
const SceneWithCaptions: React.FC<{ sceneIndex: number }> = ({ sceneIndex }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const currentMs = (frame / fps) * 1000;
  const SceneComp = SceneComponents[sceneIndex];
  const manifest = SCENE_MANIFEST[sceneIndex];

  return (
    <div style={{ position: 'relative', width: 1080, height: 1920 }}>
      <SceneComp />
      {/* Override captions with timed version */}
      <TimedCaptions words={manifest.words} currentMs={currentMs} />
    </div>
  );
};

export const RamSetuStoryWithAudio: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: 1080, height: 1920 }}>
      {/* Full mixed audio track (voice + BGM, -14 LUFS normalised) */}
      <Audio src={staticFile('final_audio.wav')} />

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
