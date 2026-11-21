import React from 'react';

export const MadhubaniBorder: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 100,
      }}
    >
      <svg width="1080" height="1920" viewBox="0 0 1080 1920" fill="none">
        <defs>
          {/* Traditional Madhubani geometric triangle pattern */}
          <pattern id="borderTriangleTop" width="30" height="20" patternUnits="userSpaceOnUse">
            <polygon points="0,20 15,0 30,20" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2" />
            <line x1="15" y1="0" x2="15" y2="20" stroke="#1A1A1A" strokeWidth="1.5" />
          </pattern>
        </defs>

        {/* Outer Heavy Black Line */}
        <rect x="15" y="15" width="1050" height="1890" stroke="#1A1A1A" strokeWidth="6" fill="none" />

        {/* Inner Red Band */}
        <rect x="25" y="25" width="1030" height="1870" stroke="#D32F2F" strokeWidth="12" fill="none" />

        {/* Second Black Contour (Double Outline) */}
        <rect x="35" y="35" width="1010" height="1850" stroke="#1A1A1A" strokeWidth="4" fill="none" />

        {/* Fine Fishnet / Hatching Accent in Outer Margins */}
        <rect x="42" y="42" width="996" height="1836" stroke="#1A1A1A" strokeWidth="2" strokeDasharray="6 4" fill="none" />

        {/* 4 Traditional Madhubani Corner Lotus/Kachni Rosettes */}
        {[
          { cx: 55, cy: 55 },
          { cx: 1025, cy: 55 },
          { cx: 55, cy: 1865 },
          { cx: 1025, cy: 1865 },
        ].map((c, idx) => (
          <g key={idx} transform={`translate(${c.cx}, ${c.cy})`}>
            <circle cx="0" cy="0" r="24" fill="#FBC02D" stroke="#1A1A1A" strokeWidth="3" />
            <circle cx="0" cy="0" r="14" fill="#D32F2F" stroke="#1A1A1A" strokeWidth="2" />
            <circle cx="0" cy="0" r="6" fill="#1565C0" stroke="#1A1A1A" strokeWidth="1.5" />
            {/* 8 Radial Petals */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, pIdx) => (
              <line
                key={pIdx}
                x1="0"
                y1="0"
                x2={Math.cos((angle * Math.PI) / 180) * 24}
                y2={Math.sin((angle * Math.PI) / 180) * 24}
                stroke="#1A1A1A"
                strokeWidth="2"
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};
