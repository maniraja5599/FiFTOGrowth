import React from 'react';

// 3D Isometric Cursor / Code Crystal
export const Icon3DCursor = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cursorFront" x1="12" y1="8" x2="36" y2="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
      <linearGradient id="cursorSide" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#064E3B" />
        <stop offset="1" stopColor="#022C22" />
      </linearGradient>
      <filter id="cursorGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#10B981" floodOpacity="0.4" />
      </filter>
    </defs>
    <path d="M14 6L32 24L22 26L28 38L22 41L16 29L10 34L14 6Z" fill="url(#cursorFront)" filter="url(#cursorGlow)" />
    <path d="M14 6L16 29L22 41L25 40L19 28L25 25L32 24L14 6Z" fill="white" fillOpacity="0.25" />
    <polygon points="14,6 16,8 30,22 32,24" fill="#6EE7B7" fillOpacity="0.8" />
  </svg>
);

// 3D Isometric Lovable / Neural Heart Prism
export const Icon3DLovable = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="lovableFront" x1="8" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F43F5E" />
        <stop offset="0.6" stopColor="#10B981" />
        <stop offset="1" stopColor="#047857" />
      </linearGradient>
    </defs>
    <path d="M24 14C20 7 10 8 8 16C6 24 14 31 24 38C34 31 42 24 40 16C38 8 28 7 24 14Z" fill="url(#lovableFront)" />
    <path d="M24 14C20 7 10 8 8 16C9 20 12 25 18 30L24 14Z" fill="white" fillOpacity="0.3" />
    <path d="M24 14L24 38L30 33C36 28 41 22 40 16C38 8 28 7 24 14Z" fill="black" fillOpacity="0.25" />
  </svg>
);

// 3D Isometric v0 Monolith
export const Icon3DV0 = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,6 40,15 24,24 8,15" fill="#34D399" />
    <polygon points="8,15 24,24 24,42 8,33" fill="#059669" />
    <polygon points="40,15 24,24 24,42 40,33" fill="#047857" />
    <polygon points="24,12 34,18 24,24 14,18" fill="white" fillOpacity="0.4" />
  </svg>
);

// 3D Isometric Claude Neural Spark
export const Icon3DClaude = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="16" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
    <polygon points="24,10 27,21 38,24 27,27 24,38 21,27 10,24 21,21" fill="#34D399" />
    <polygon points="24,10 27,21 24,24 21,21" fill="white" fillOpacity="0.8" />
  </svg>
);

// 3D Isometric In-House Terminal Cube
export const Icon3DInHouse = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,8 38,16 24,24 10,16" fill="#1E293B" stroke="#10B981" strokeWidth="1" />
    <polygon points="10,16 24,24 24,40 10,32" fill="#0F172A" />
    <polygon points="38,16 24,24 24,40 38,32" fill="#020617" />
    <path d="M14 26L18 29L14 32" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="20" y1="32" x2="23" y2="32" stroke="#34D399" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// 3D Isometric FastAPI Lightning Cube
export const Icon3DFastAPI = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,6 42,16 24,26 6,16" fill="#059669" />
    <polygon points="6,16 24,26 24,42 6,32" fill="#047857" />
    <polygon points="42,16 24,26 24,42 42,32" fill="#064E3B" />
    <polygon points="24,6 42,16 24,18 6,16" fill="white" fillOpacity="0.3" />
    {/* Floating Lightning Bolt */}
    <path d="M26 12L17 25H23L21 34L30 21H24L26 12Z" fill="#FDE047" stroke="#F59E0B" strokeWidth="1" filter="drop-shadow(0 0 4px #FDE047)" />
  </svg>
);

// 3D Isometric Next.js Server Monolith
export const Icon3DNext = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,7 40,16 24,25 8,16" fill="#182234" stroke="#38BDF8" strokeWidth="1" />
    <polygon points="8,16 24,25 24,41 8,32" fill="#0F172A" />
    <polygon points="40,16 24,25 24,41 40,32" fill="#020617" />
    <line x1="12" y1="24" x2="20" y2="28" stroke="#38BDF8" strokeWidth="1.5" />
    <line x1="12" y1="28" x2="20" y2="32" stroke="#10B981" strokeWidth="1.5" />
    <line x1="12" y1="32" x2="17" y2="34" stroke="#F43F5E" strokeWidth="1.5" />
  </svg>
);

// 3D Isometric Node / Express Hex Node
export const Icon3DExpress = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,7 39,15 24,23 9,15" fill="#22C55E" />
    <polygon points="9,15 24,23 24,39 9,31" fill="#16A34A" />
    <polygon points="39,15 24,23 24,39 39,31" fill="#15803D" />
    <circle cx="24" cy="23" r="5" fill="#DCFCE7" />
  </svg>
);

// 3D Isometric Supabase Edge Card
export const Icon3DSupabase = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,8 39,16 24,24 9,16" fill="#10B981" />
    <polygon points="9,16 24,24 24,40 9,32" fill="#047857" />
    <polygon points="39,16 24,24 24,40 39,32" fill="#064E3B" />
    <path d="M23 14L16 24H23L20 32L30 21H24L27 14H23Z" fill="#34D399" />
  </svg>
);

// 3D Isometric No-API Crossed Block
export const Icon3DNoApi = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,8 38,16 24,24 10,16" fill="#334155" />
    <polygon points="10,16 24,24 24,40 10,32" fill="#1E293B" />
    <polygon points="38,16 24,24 24,40 38,32" fill="#0F172A" />
    <line x1="14" y1="18" x2="34" y2="34" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="34" y1="18" x2="14" y2="34" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// 3D Isometric PgBouncer / Pooled Database Cylinder with Laser Rings
export const Icon3DPgBouncer = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dbTop" x1="10" y1="8" x2="38" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#34D399" />
        <stop offset="1" stopColor="#059669" />
      </linearGradient>
      <linearGradient id="dbBody" x1="8" y1="14" x2="40" y2="38" gradientUnits="userSpaceOnUse">
        <stop stopColor="#064E3B" />
        <stop offset="1" stopColor="#022C22" />
      </linearGradient>
    </defs>
    {/* Base cylinder */}
    <ellipse cx="24" cy="36" rx="16" ry="6" fill="#022C22" />
    <path d="M8 26C8 29.3 15.2 32 24 32C32.8 32 40 29.3 40 26V36C40 39.3 32.8 42 24 42C15.2 42 8 39.3 8 36V26Z" fill="url(#dbBody)" />
    
    {/* Middle tier with laser glow */}
    <path d="M8 18C8 21.3 15.2 24 24 24C32.8 24 40 21.3 40 18V26C40 29.3 32.8 32 24 32C15.2 32 8 29.3 8 26V18Z" fill="#047857" />
    <ellipse cx="24" cy="24" rx="16" ry="6" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="2 2" />

    {/* Top Cap */}
    <path d="M8 12C8 15.3 15.2 18 24 18C32.8 18 40 15.3 40 12V18C40 21.3 32.8 24 24 24C15.2 24 8 21.3 8 18V12Z" fill="#059669" />
    <ellipse cx="24" cy="12" rx="16" ry="6" fill="url(#dbTop)" stroke="#6EE7B7" strokeWidth="1" />
    
    {/* Inner pooling core indicator */}
    <circle cx="24" cy="12" r="3" fill="#A7F3D0" />
  </svg>
);

// 3D Isometric Unpooled Postgres with Warning Glow
export const Icon3DUnpooledPostgres = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="24" cy="34" rx="15" ry="6" fill="#1E293B" />
    <path d="M9 16C9 19.3 15.7 22 24 22C32.3 22 39 19.3 39 16V34C39 37.3 32.3 40 24 40C15.7 40 9 37.3 9 34V16Z" fill="#0F172A" />
    <ellipse cx="24" cy="16" rx="15" ry="6" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
    {/* Warning Exclamation */}
    <circle cx="34" cy="16" r="6" fill="#EF4444" />
    <text x="34" y="19" fill="white" fontSize="9" fontWeight="bold" textAnchor="middle">!</text>
  </svg>
);

// 3D Isometric Firebase Flame
export const Icon3DFirebase = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,6 38,18 24,26 10,18" fill="#F59E0B" />
    <polygon points="10,18 24,26 24,40 10,32" fill="#D97706" />
    <polygon points="38,18 24,26 24,40 38,32" fill="#B45309" />
    <polygon points="24,14 30,22 24,28 18,22" fill="#FDE68A" />
  </svg>
);

// 3D Isometric Stacked Server Rack for 1,000 Users
export const Icon3DServerRack1k = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,6 40,14 24,22 8,14" fill="#059669" />
    <polygon points="8,14 24,22 24,30 8,22" fill="#047857" />
    <polygon points="40,14 24,22 24,30 40,22" fill="#064E3B" />
    
    <polygon points="8,24 24,32 24,40 8,32" fill="#022C22" />
    <polygon points="40,24 24,32 24,40 40,32" fill="#011B14" />
    <circle cx="14" cy="27" r="1.5" fill="#34D399" />
    <circle cx="18" cy="29" r="1.5" fill="#34D399" />
    <circle cx="14" cy="37" r="1.5" fill="#34D399" />
    <circle cx="18" cy="39" r="1.5" fill="#34D399" />
  </svg>
);

// 3D Isometric Micro Server for 100 Users
export const Icon3DMicroServer = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,12 38,19 24,26 10,19" fill="#1E293B" stroke="#10B981" strokeWidth="1" />
    <polygon points="10,19 24,26 24,36 10,29" fill="#0F172A" />
    <polygon points="38,19 24,26 24,36 38,29" fill="#020617" />
    <circle cx="15" cy="26" r="1.5" fill="#10B981" />
  </svg>
);

// 3D Isometric High-Density Cluster for 10,000+ Users
export const Icon3DCluster10k = ({ className = "w-7 h-7" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,4 42,13 24,22 6,13" fill="#10B981" />
    <polygon points="6,13 24,22 24,44 6,35" fill="#047857" />
    <polygon points="42,13 24,22 24,44 42,35" fill="#064E3B" />
    {/* Grid blades */}
    <line x1="12" y1="21" x2="12" y2="37" stroke="#34D399" strokeWidth="1.5" />
    <line x1="18" y1="24" x2="18" y2="40" stroke="#34D399" strokeWidth="1.5" />
    <line x1="30" y1="24" x2="30" y2="40" stroke="#6EE7B7" strokeWidth="1.5" />
    <line x1="36" y1="21" x2="36" y2="37" stroke="#6EE7B7" strokeWidth="1.5" />
  </svg>
);

// 3D Faceted Warning Prism
export const Icon3DWarningPrism = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="24,4 44,40 4,40" fill="#991B1B" />
    <polygon points="24,4 24,40 4,40" fill="#EF4444" />
    <polygon points="24,4 44,40 24,40" fill="#B91C1C" />
    <polygon points="24,10 38,38 10,38" fill="#F87171" fillOpacity="0.4" />
    <path d="M24 16V28" stroke="white" strokeWidth="3" strokeLinecap="round" />
    <circle cx="24" cy="34" r="2" fill="white" />
  </svg>
);

// 3D Metallic Emerald Armor Shield with Bolt
export const Icon3DShieldBolt = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 4L40 10V22C40 33 33 42 24 45C15 42 8 33 8 22V10L24 4Z" fill="#047857" stroke="#34D399" strokeWidth="1.5" />
    <path d="M24 4L24 45C33 42 40 33 40 22V10L24 4Z" fill="#064E3B" />
    <path d="M25 12L17 25H24L22 34L31 21H24L26 12H25Z" fill="#6EE7B7" stroke="#A7F3D0" strokeWidth="0.5" filter="drop-shadow(0 0 4px #34D399)" />
  </svg>
);

// 3D Isometric WhatsApp Floating Token
export const Icon3DWhatsApp = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="waGrad" x1="6" y1="6" x2="42" y2="42" gradientUnits="userSpaceOnUse">
        <stop stopColor="#25D366" />
        <stop offset="1" stopColor="#128C7E" />
      </linearGradient>
    </defs>
    <circle cx="24" cy="24" r="20" fill="url(#waGrad)" filter="drop-shadow(0 4px 10px rgba(37, 211, 102, 0.4))" />
    <path d="M32.5 28.5C32 29.8 29.8 30.9 28.5 31.1C27.6 31.3 26.5 31.3 22.8 29.8C18.1 27.8 15 23.1 14.8 22.8C14.5 22.5 13 20.5 13 18.5C13 16.5 14 15.5 14.5 15C14.8 14.6 15.3 14.5 15.8 14.5C16.3 14.5 16.8 14.5 17.2 15.5C17.6 16.5 18.6 19 18.7 19.3C18.8 19.6 18.8 19.9 18.6 20.3C18.4 20.6 18.2 20.9 17.9 21.2C17.6 21.5 17.4 21.8 17.7 22.3C18 22.8 19 24.5 20.6 25.9C22.6 27.7 24.3 28.3 24.8 28.5C25.3 28.7 25.6 28.7 25.9 28.3C26.3 27.9 27.4 26.6 27.8 26C28.2 25.4 28.6 25.5 29.1 25.7C29.6 25.9 32.2 27.2 32.7 27.5C33.2 27.8 33.6 28 33.7 28.2C33.6 28.5 33 29.5 32.5 28.5Z" fill="white" />
  </svg>
);
