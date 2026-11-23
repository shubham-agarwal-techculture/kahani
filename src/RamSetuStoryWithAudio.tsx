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

// --- Audio manifest generated from user-provided voice clips ---
const SCENE_MANIFEST: Array<{
  id: number;
  startMs: number;
  durationMs: number;
  startFrame: number;
  durationFrames: number;
  words: WordTiming[];
}> = [
  {
    id: 1, startMs: 0, durationMs: 5550,
    startFrame: 0, durationFrames: 166,
    words: [
      { text: 'क्या',      startMs: 0,    endMs: 340  },
      { text: 'एक',       startMs: 340,  endMs: 620  },
      { text: 'मुट्ठी',   startMs: 620,  endMs: 1020 },
      { text: 'भर',       startMs: 1020, endMs: 1240 },
      { text: 'गिलहरी',   startMs: 1240, endMs: 1760 },
      { text: 'विशाल',    startMs: 1760, endMs: 2620 },
      { text: 'समुन्दर',  startMs: 2620, endMs: 3160 },
      { text: 'पर',       startMs: 3160, endMs: 3360 },
      { text: 'पत्थर',    startMs: 3360, endMs: 3800 },
      { text: 'का',       startMs: 3800, endMs: 3940 },
      { text: 'पुल',      startMs: 3940, endMs: 4200 },
      { text: 'बना',      startMs: 4200, endMs: 4440 },
      { text: 'सकती',     startMs: 4440, endMs: 4860 },
      { text: 'है?',      startMs: 4860, endMs: 5200 },
    ],
  },
  {
    id: 2, startMs: 5550, durationMs: 7380,
    startFrame: 166, durationFrames: 221,
    words: [
      { text: 'रामेश्वरम',startMs: 0,    endMs: 760  },
      { text: 'का',       startMs: 760,  endMs: 940  },
      { text: 'किनारा',   startMs: 940,  endMs: 1360 },
      { text: 'था,',      startMs: 1360, endMs: 1680 },
      { text: 'जहाँ',     startMs: 1680, endMs: 2460 },
      { text: 'वानर',     startMs: 2460, endMs: 2840 },
      { text: 'सेना',     startMs: 2840, endMs: 3320 },
      { text: 'विशाल',    startMs: 3320, endMs: 4060 },
      { text: 'पर्वत',    startMs: 4060, endMs: 4560 },
      { text: 'उठा',      startMs: 4560, endMs: 4880 },
      { text: 'कर',       startMs: 4880, endMs: 5140 },
      { text: 'समुन्दर',  startMs: 5140, endMs: 5920 },
      { text: 'में',       startMs: 5920, endMs: 6060 },
      { text: 'डाल',      startMs: 6060, endMs: 6260 },
      { text: 'रही',      startMs: 6260, endMs: 6500 },
      { text: 'थी।',      startMs: 6500, endMs: 7000 },
    ],
  },
  {
    id: 3, startMs: 12930, durationMs: 6412,
    startFrame: 387, durationFrames: 193,
    words: [
      { text: 'हर',        startMs: 0,    endMs: 300  },
      { text: 'तरफ',       startMs: 300,  endMs: 540  },
      { text: 'धूल',       startMs: 540,  endMs: 1120 },
      { text: 'थी,',       startMs: 1120, endMs: 1520 },
      { text: 'गर्जना',    startMs: 2020, endMs: 2460 },
      { text: 'थी,',       startMs: 2460, endMs: 2900 },
      { text: 'और',        startMs: 2900, endMs: 3540 },
      { text: 'लंका',      startMs: 3540, endMs: 4040 },
      { text: 'तक',        startMs: 4040, endMs: 4280 },
      { text: 'पहुँचने',   startMs: 4280, endMs: 4800 },
      { text: 'की',        startMs: 4800, endMs: 4940 },
      { text: 'बेचैनी',    startMs: 4940, endMs: 5580 },
      { text: 'थी।',       startMs: 5580, endMs: 6050 },
    ],
  },
  {
    id: 4, startMs: 19342, durationMs: 8973,
    startFrame: 580, durationFrames: 269,
    words: [
      { text: 'तभी',       startMs: 0,    endMs: 360  },
      { text: 'एक',        startMs: 360,  endMs: 680  },
      { text: 'नन्ही',     startMs: 680,  endMs: 1280 },
      { text: 'गिलहरी,',   startMs: 1280, endMs: 1620 },
      { text: 'पानी',      startMs: 2100, endMs: 2420 },
      { text: 'में',        startMs: 2420, endMs: 2580 },
      { text: 'भीगती,',    startMs: 2580, endMs: 3240 },
      { text: 'रेत',       startMs: 3700, endMs: 3920 },
      { text: 'पर',        startMs: 3920, endMs: 4160 },
      { text: 'लोटती,',    startMs: 4160, endMs: 4720 },
      { text: 'और',        startMs: 4720, endMs: 5200 },
      { text: 'अपने',      startMs: 5200, endMs: 5520 },
      { text: 'शरीर',      startMs: 5520, endMs: 5900 },
      { text: 'से',         startMs: 5900, endMs: 6120 },
      { text: 'दो-दो',     startMs: 6120, endMs: 6600 },
      { text: 'दाने',      startMs: 6600, endMs: 7060 },
      { text: 'पुल',       startMs: 7060, endMs: 7440 },
      { text: 'पर',        startMs: 7440, endMs: 7700 },
      { text: 'झाड़',      startMs: 7700, endMs: 8000 },
      { text: 'आती।',      startMs: 8000, endMs: 8600 },
    ],
  },
  {
    id: 5, startMs: 28315, durationMs: 7614,
    startFrame: 849, durationFrames: 228,
    words: [
      { text: 'एक',        startMs: 0,    endMs: 300  },
      { text: 'बलवान',     startMs: 300,  endMs: 820  },
      { text: 'वानर',      startMs: 820,  endMs: 1180 },
      { text: 'ने',         startMs: 1180, endMs: 1340 },
      { text: 'गुस्से',    startMs: 1340, endMs: 1820 },
      { text: 'में',        startMs: 1820, endMs: 1920 },
      { text: 'कहा—',      startMs: 1920, endMs: 2160 },
      { text: "'ऐ",        startMs: 2560, endMs: 3060 },
      { text: 'छोटी!',     startMs: 3060, endMs: 3280 },
      { text: 'हट',        startMs: 3740, endMs: 3940 },
      { text: 'रास्ते',    startMs: 3940, endMs: 4260 },
      { text: 'से,',       startMs: 4260, endMs: 4420 },
      { text: 'तेरे',      startMs: 4900, endMs: 5240 },
      { text: 'दो',        startMs: 5240, endMs: 5460 },
      { text: 'दानों',     startMs: 5460, endMs: 5780 },
      { text: 'से',         startMs: 5780, endMs: 5920 },
      { text: 'क्या',      startMs: 5920, endMs: 6120 },
      { text: 'राम',       startMs: 6120, endMs: 6400 },
      { text: 'सेतु',      startMs: 6400, endMs: 6600 },
      { text: "बनेगा?'",   startMs: 6600, endMs: 7250 },
    ],
  },
  {
    id: 6, startMs: 35929, durationMs: 9625,
    startFrame: 1077, durationFrames: 289,
    words: [
      { text: 'तभी',       startMs: 0,    endMs: 360  },
      { text: 'श्री',      startMs: 360,  endMs: 740  },
      { text: 'राम',       startMs: 740,  endMs: 940  },
      { text: 'ने',         startMs: 940,  endMs: 1080 },
      { text: 'मुस्कुराकर',startMs: 1080, endMs: 1800 },
      { text: 'उसे',       startMs: 1800, endMs: 2440 },
      { text: 'अपनी',      startMs: 2440, endMs: 2720 },
      { text: 'हथेली',     startMs: 2720, endMs: 3200 },
      { text: 'पर',        startMs: 3200, endMs: 3380 },
      { text: 'उठा',       startMs: 3380, endMs: 3640 },
      { text: 'लिया,',     startMs: 3640, endMs: 3900 },
      { text: 'और',        startMs: 3900, endMs: 4480 },
      { text: 'बोले—',     startMs: 4480, endMs: 4900 },
      { text: "'सेवा",     startMs: 4900, endMs: 5960 },
      { text: 'में',        startMs: 5960, endMs: 6160 },
      { text: 'शक्ति',     startMs: 6160, endMs: 6660 },
      { text: 'नहीं,',     startMs: 6660, endMs: 6840 },
      { text: 'श्रद्धा',   startMs: 6840, endMs: 8120 },
      { text: 'देखी',      startMs: 8120, endMs: 8440 },
      { text: 'जाती',      startMs: 8440, endMs: 8780 },
      { text: "है।'",      startMs: 8780, endMs: 9250 },
    ],
  },
  {
    id: 7, startMs: 45554, durationMs: 12186,
    startFrame: 1366, durationFrames: 366,
    words: [
      { text: 'राम',       startMs: 0,    endMs: 360  },
      { text: 'जी',        startMs: 360,  endMs: 560  },
      { text: 'ने',         startMs: 560,  endMs: 680  },
      { text: 'प्रेम',     startMs: 680,  endMs: 1160 },
      { text: 'से',         startMs: 1160, endMs: 1340 },
      { text: 'उसकी',      startMs: 1340, endMs: 1640 },
      { text: 'पीठ',       startMs: 1640, endMs: 2000 },
      { text: 'पर',        startMs: 2000, endMs: 2200 },
      { text: 'उँगलियाँ',  startMs: 2200, endMs: 2640 },
      { text: 'फेरीं,',    startMs: 2640, endMs: 3060 },
      { text: 'और',        startMs: 3500, endMs: 3800 },
      { text: 'तीन',       startMs: 3800, endMs: 4300 },
      { text: 'दिव्य',     startMs: 4300, endMs: 4820 },
      { text: 'लकीरें',    startMs: 4820, endMs: 5260 },
      { text: 'बन',        startMs: 5260, endMs: 5400 },
      { text: 'गईं।',      startMs: 5400, endMs: 5700 },
      { text: 'अगली',      startMs: 6320, endMs: 6920 },
      { text: 'बार',       startMs: 6920, endMs: 7120 },
      { text: 'जब',        startMs: 7120, endMs: 7300 },
      { text: 'तुम',       startMs: 7300, endMs: 7500 },
      { text: 'गिलहरी',    startMs: 7500, endMs: 7980 },
      { text: 'देखो,',     startMs: 7980, endMs: 8500 },
      { text: 'तो',        startMs: 8500, endMs: 8940 },
      { text: 'देखना—',    startMs: 8940, endMs: 9360 },
      { text: 'क्या',      startMs: 9360, endMs: 10080 },
      { text: 'वो',        startMs: 10080, endMs: 10200 },
      { text: 'लकीरें',    startMs: 10200, endMs: 10740 },
      { text: 'तुम्हें',   startMs: 10740, endMs: 11080 },
      { text: 'दिखती',     startMs: 11080, endMs: 11420 },
      { text: 'हैं?',      startMs: 11420, endMs: 11850 },
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
      {/* Overlays synchronized Devanagari captions with active word highlighted */}
      <TimedCaptions words={manifest.words} currentMs={currentMs} />
    </div>
  );
};

export const RamSetuStoryWithAudio: React.FC = () => {
  return (
    <div style={{ position: 'relative', width: 1080, height: 1920 }}>
      {/* Full mixed audio track (user voice narration + sober Tanpura BGM) */}
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
