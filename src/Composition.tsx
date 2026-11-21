import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { CharacterRig } from './components/CharacterRig';
import { Sky, Clouds, Hills, Trees, Diyas, SparksAndPetals } from './components/scene';

export const ReelScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Character walking translation across screen
  // 90 frames (3 seconds): enters from left, walks across foreground
  const characterX = interpolate(
    frame,
    [0, 60, 90],
    [260, 520, 600],
    { extrapolateRight: 'clamp' }
  );

  // Character walking state: walks for first 2 seconds, waves at the viewer in last second
  const isWalking = frame < 65;
  const isWaving = frame >= 65;

  // Title fade and scale animation within the safe zone
  const titleOpacity = interpolate(frame, [0, 20, 75, 90], [0, 1, 1, 0.9], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const titleTranslateY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'relative',
        width: 1080,
        height: 1920,
        overflow: 'hidden',
        backgroundColor: '#090A1A',
        fontFamily: "'Segoe UI', Roboto, 'Noto Sans', sans-serif",
      }}
    >
      {/* 1. Deep Celestial Twilight Sky with Crescent Moon & Stars */}
      <Sky theme="twilight" celestial="moon" moonPhase="crescent" starDensity={50} />

      {/* 2. Soft Atmospheric Billowing Clouds */}
      <Clouds count={4} speedMultiplier={1.2} />

      {/* 3. Three Depth Layers of Rolling Parallax Hills */}
      <Hills scrollSpeed={1.4} palette="twilight" />

      {/* 4. Ancient Banyan & Sacred Tree Silhouettes */}
      <Trees scrollSpeed={1.4} />

      {/* 5. Character Rig Walking Across Foreground Path */}
      <div
        style={{
          position: 'absolute',
          bottom: 230,
          left: characterX,
          zIndex: 10,
        }}
      >
        <CharacterRig
          skinColor="#E0A96D"
          clothColor="#E65100"
          dhotiColor="#F57C00"
          accentColor="#FFD700"
          headwear="mukut"
          hasTilak={true}
          hasGarland={true}
          isWalking={isWalking}
          isWaving={isWaving}
          walkSpeed={1.1}
          scale={1.25}
          facing="right"
        />
      </div>

      {/* 6. Sacred Terracotta Diyas with Dynamic Flickering Flame */}
      <Diyas scrollSpeed={1.4} />

      {/* 7. Divine Rising Golden Sparks & Floating Sacred Petals */}
      <SparksAndPetals sparksCount={30} petalsCount={20} />

      {/* 8. Top & Bottom Title-Safe Overlay Elements (Compliant with RULES.md) */}
      {/* Header Badge (Top Safe Area > 160px) */}
      <div
        style={{
          position: 'absolute',
          top: 180,
          left: 0,
          width: '100%',
          textAlign: 'center',
          opacity: titleOpacity,
          transform: `translateY(${titleTranslateY}px)`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            padding: '8px 24px',
            borderRadius: '24px',
            background: 'rgba(230, 81, 0, 0.35)',
            border: '1px solid rgba(255, 215, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            color: '#FFE082',
            fontSize: '22px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          ✦ KAHANI ANIMATED STUDIO ✦
        </div>

        <h1
          style={{
            margin: '20px 60px 0',
            color: '#FFFFFF',
            fontSize: '52px',
            fontWeight: 800,
            letterSpacing: '1px',
            textShadow: '0 4px 20px rgba(0,0,0,0.8), 0 0 30px rgba(255, 179, 0, 0.4)',
          }}
        >
          The Journey Begins
        </h1>
      </div>

      {/* Bottom Safe Zone Caption (Bottom Safe Area > 320px) */}
      <div
        style={{
          position: 'absolute',
          bottom: 340,
          left: 0,
          width: '100%',
          textAlign: 'center',
          zIndex: 20,
          opacity: titleOpacity,
        }}
      >
        <div
          style={{
            display: 'inline-block',
            maxWidth: '820px',
            padding: '14px 32px',
            borderRadius: '16px',
            background: 'rgba(10, 8, 24, 0.65)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <p
            style={{
              margin: 0,
              color: '#FFF8E1',
              fontSize: '32px',
              fontWeight: 500,
              lineHeight: 1.4,
            }}
          >
            "Every sacred legend begins with a single step into the unknown..."
          </p>
        </div>
      </div>
    </div>
  );
};
