import React from 'react';

export default function Logo({ size = 42, showText = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
      {/* Milano Official Vector Emblem */}
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 200 160" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.15))' }}
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FCD34D" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#957204" />
          </linearGradient>
        </defs>

        {/* Left Wing Feathers */}
        <g fill="url(#goldGrad)">
          <path d="M 60 55 L 10 55 L 35 68 L 60 68 Z" />
          <path d="M 60 72 L 20 72 L 40 85 L 60 85 Z" />
          <path d="M 60 89 L 30 89 L 45 102 L 60 102 Z" />
        </g>

        {/* Right Wing Feathers */}
        <g fill="url(#goldGrad)">
          <path d="M 140 55 L 190 55 L 165 68 L 140 68 Z" />
          <path d="M 140 72 L 180 72 L 160 85 L 140 85 Z" />
          <path d="M 140 89 L 170 89 L 155 102 L 140 102 Z" />
        </g>

        {/* Outer Gold Hexagon */}
        <polygon 
          points="100,10 155,42 155,118 100,150 45,118 45,42" 
          fill="url(#goldGrad)" 
        />

        {/* Inner White Hexagon Border */}
        <polygon 
          points="100,18 147,46 147,114 100,142 53,114 53,46" 
          fill="#FFFFFF" 
        />

        {/* Deep Navy Central Shield */}
        <polygon 
          points="100,24 140,50 140,110 100,136 60,110 60,50" 
          fill="#0A0B3D" 
        />

        {/* Central Bold White 'M' */}
        <text 
          x="100" 
          y="104" 
          fontFamily="Montserrat, 'Arial Black', sans-serif" 
          fontWeight="900" 
          fontSize="72" 
          fill="#FFFFFF" 
          textAnchor="middle"
        >
          M
        </text>
      </svg>

      {showText && (
        <div>
          <div style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: '900', fontSize: '1.25rem', color: '#0F172A', letterSpacing: '0.03em', lineHeight: '1' }}>
            MILANO <span style={{ color: '#D4AF37' }}>SECURITY</span>
          </div>
         
        </div>
      )}
    </div>
  );
}
