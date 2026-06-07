import React from 'react';

export default function GaneshaLogo({ className = "" }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Crown (Kireetam) */}
      <path 
        d="M50 8L44 20H56L50 8Z" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M50 12L41 26H59L50 12Z" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M50 5L36 30H64L50 5Z" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        opacity="0.85"
      />
      
      {/* Crown top jewel */}
      <circle cx="50" cy="4" r="1.5" fill="url(#goldGradient)" />
      
      {/* Forehead / Tilak */}
      <path 
        d="M47 38C47 38 49 42 50 42C51 42 53 38 53 38" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      <line x1="50" y1="33" x2="50" y2="40" stroke="url(#goldGradient)" strokeWidth="2" strokeLinecap="round" />
      
      {/* Face Outline & Trunk */}
      <path 
        d="M43 38C38 43 37 50 44 55C47 57 48 59 47 62C46 64 42 66 40 68C38 70 38 73 41 74C44 75 48 74 50 71C52 68 53 62 53 58" 
        stroke="url(#goldGradient)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Trunk extension spiraling right */}
      <path 
        d="M50 71C53 74 58 75 62 72C65 69 64 65 60 64C57 63 55 65 56 68C57 70 59 70 60 69" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Right Ear */}
      <path 
        d="M55 33C64 33 67 36 67 43C67 50 62 53 54 53" 
        stroke="url(#goldGradient)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Left Ear */}
      <path 
        d="M45 33C36 33 33 36 33 43C33 50 38 53 46 53" 
        stroke="url(#goldGradient)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      
      {/* Left Trishula / Axe Accent in hand (Top Left) */}
      <path 
        d="M26 38V48" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M22 41C22 41 24 43 26 43C28 43 30 41 30 41" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      
      {/* Right Lotus Accent in hand (Top Right) */}
      <path 
        d="M74 38V48" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M70 42C72 40 74 40 74 40C74 40 76 40 78 42" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />
      <path 
        d="M71 45C72 44 74 44 74 44C74 44 76 44 77 45" 
        stroke="url(#goldGradient)" 
        strokeWidth="1.5" 
        strokeLinecap="round" 
      />

      {/* Halo / Aura Rings (Background) */}
      <circle 
        cx="50" 
        cy="43" 
        r="38" 
        stroke="url(#goldGradient)" 
        strokeWidth="0.8" 
        strokeDasharray="4 4" 
        opacity="0.5" 
      />
      <circle 
        cx="50" 
        cy="43" 
        r="44" 
        stroke="url(#goldGradient)" 
        strokeWidth="0.5" 
        opacity="0.3" 
      />
      
      {/* Gradients Definition */}
      <defs>
        <linearGradient id="goldGradient" x1="0" y1="0" x2="100" y2="100">
          <stop offset="0%" stopColor="#F0D58C" />
          <stop offset="50%" stopColor="#D4AF37" />
          <stop offset="100%" stopColor="#B89025" />
        </linearGradient>
      </defs>
    </svg>
  );
}
