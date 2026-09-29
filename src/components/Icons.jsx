// Iconic Anatomical Vitruvian Man (Leonardo da Vinci inspired) SVG in Cyber Crimson
// Features sculpted muscular contours, dual-limb kinematics, and sacred golden geometry.
export function BrandLogo({ className = "w-7 h-7", showGlow = true }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Primary Crimson Red Linear Gradient */}
        <linearGradient id="vitruviusRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff2a4d" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>

        {/* Secondary Radiant Crimson Gradient */}
        <linearGradient id="vitruviusRadiant" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#b91c1c" />
          <stop offset="50%" stopColor="#ff1a40" />
          <stop offset="100%" stopColor="#fca5a5" />
        </linearGradient>

        {/* Anatomical Body Translucent Fill */}
        <linearGradient id="vitruviusBodyFill" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ff2a4d" stopOpacity="0.35" />
          <stop offset="50%" stopColor="#dc2626" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.12" />
        </linearGradient>

        {/* Ambient Neon Filter for Logo Glow */}
        {showGlow && (
          <filter id="crimsonNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        )}
      </defs>

      {/* ================================================================= */}
      {/* 1. SACRED GEOMETRY (Leonardo da Vinci Circle & Square Architecture) */}
      {/* ================================================================= */}
      
      {/* Concentric Golden Outer Guides */}
      <circle 
        cx="50" 
        cy="50" 
        r="47.5" 
        stroke="#ef4444" 
        strokeWidth="0.5" 
        strokeDasharray="1 3"
        opacity="0.3"
      />

      {/* Da Vinci Circumscribed Circle (Navel Centered) */}
      <circle 
        cx="50" 
        cy="50" 
        r="45" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1.2" 
        strokeDasharray="4 2"
        opacity="0.85"
      />
      
      {/* Da Vinci Architectural Square (Base of Standing Figure) */}
      <rect 
        x="15" 
        y="15" 
        width="70" 
        height="70" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1" 
        opacity="0.6"
      />

      {/* Architectural Corner Registration Crosshairs */}
      <path d="M12 15H18 M15 12V18" stroke="#ef4444" strokeWidth="0.8" opacity="0.7" />
      <path d="M82 15H88 M85 12V18" stroke="#ef4444" strokeWidth="0.8" opacity="0.7" />
      <path d="M12 85H18 M15 82V88" stroke="#ef4444" strokeWidth="0.8" opacity="0.7" />
      <path d="M82 85H88 M85 82V88" stroke="#ef4444" strokeWidth="0.8" opacity="0.7" />

      {/* Central Axis Precision Grid */}
      <line x1="50" y1="2" x2="50" y2="98" stroke="url(#vitruviusRedGrad)" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />
      <line x1="2" y1="50" x2="98" y2="50" stroke="url(#vitruviusRedGrad)" strokeWidth="0.6" strokeDasharray="3 3" opacity="0.4" />

      {/* Diagonal Golden Ratio Sightlines */}
      <line x1="15" y1="15" x2="85" y2="85" stroke="#ef4444" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.25" />
      <line x1="85" y1="15" x2="15" y2="85" stroke="#ef4444" strokeWidth="0.4" strokeDasharray="2 4" opacity="0.25" />

      {/* ================================================================= */}
      {/* 2. ANATOMICAL SILHOUETTES (Muscular mass & definition - No stickman) */}
      {/* ================================================================= */}

      {/* --- LIMB SET B: RAISED ARMS & SPREAD LEGS (Circle Kinematics) --- */}
      <g opacity="0.9">
        {/* Left Raised Arm (Contoured shoulder, bicep, forearm, wrist, hand) */}
        <path
          d="M44 30.5 C38 25.5 32 20.5 25.5 15.5 C22 13 18.5 10.5 16 9 C15 8.5 14 9.5 14.5 10.5 C16.5 13 20 16 23.5 19 C29.5 24.5 36 29.5 41.5 33.5 Z"
          fill="url(#vitruviusBodyFill)"
          stroke="url(#vitruviusRadiant)"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />

        {/* Right Raised Arm (Contoured shoulder, bicep, forearm, wrist, hand) */}
        <path
          d="M56 30.5 C62 25.5 68 20.5 74.5 15.5 C78 13 81.5 10.5 84 9 C85 8.5 86 9.5 85.5 10.5 C83.5 13 80 16 76.5 19 C70.5 24.5 64 29.5 58.5 33.5 Z"
          fill="url(#vitruviusBodyFill)"
          stroke="url(#vitruviusRadiant)"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />

        {/* Left Spread Leg (Contoured quadriceps, knee, gastrocnemius calf, ankle, foot) */}
        <path
          d="M45.5 53 C39.5 60 34 68 28.5 75.5 C25.5 79.5 22.5 83 20 86.5 C19 88 21.5 89 23 88 C26 84.5 29.5 80.5 33 75.5 C38.5 68.5 43.5 61 49 54.5 Z"
          fill="url(#vitruviusBodyFill)"
          stroke="url(#vitruviusRadiant)"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />

        {/* Right Spread Leg (Contoured quadriceps, knee, gastrocnemius calf, ankle, foot) */}
        <path
          d="M54.5 53 C60.5 60 66 68 71.5 75.5 C74.5 79.5 77.5 83 80 86.5 C81 88 78.5 89 77 88 C74 84.5 70.5 80.5 67 75.5 C61.5 68.5 56.5 61 51 54.5 Z"
          fill="url(#vitruviusBodyFill)"
          stroke="url(#vitruviusRadiant)"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
      </g>

      {/* --- LIMB SET A: HORIZONTAL ARMS & STANDING LEGS (Square Kinematics) --- */}
      <g>
        {/* Left Horizontal Arm (Muscular shoulder deltoid, tricep, forearm, wrist, open hand) */}
        <path
          d="M43 30.5 C37 29.5 32 29.5 26 30 C20.5 30.3 17 30.5 13.5 30.5 C12 30.5 11.5 31.5 11.5 32 C11.5 32.5 12 33.5 13.5 33.5 C17 33.5 20.5 33.7 26 34 C32 34.5 37 34.5 43 33.5 Z"
          fill="url(#vitruviusBodyFill)"
          stroke="url(#vitruviusRedGrad)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* Right Horizontal Arm (Muscular shoulder deltoid, tricep, forearm, wrist, open hand) */}
        <path
          d="M57 30.5 C63 29.5 68 29.5 74 30 C79.5 30.3 83 30.5 86.5 30.5 C88 30.5 88.5 31.5 88.5 32 C88.5 32.5 88 33.5 86.5 33.5 C83 33.5 79.5 33.7 74 34 C68 34.5 63 34.5 57 33.5 Z"
          fill="url(#vitruviusBodyFill)"
          stroke="url(#vitruviusRedGrad)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* Left Straight Leg (Contoured quad, patella knee, muscular calf, heel, planted foot) */}
        <path
          d="M45 52.5 C44 60 43.5 68 44 75 C44.3 80 44.5 84 43.5 87 C43 88.5 45.5 89 47 88.5 C47.5 86 47 82 46.8 76 C46.5 69.5 47.5 61.5 49.5 54 Z"
          fill="url(#vitruviusBodyFill)"
          stroke="url(#vitruviusRedGrad)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />

        {/* Right Straight Leg (Contoured quad, patella knee, muscular calf, heel, planted foot) */}
        <path
          d="M55 52.5 C56 60 56.5 68 56 75 C55.7 80 55.5 84 56.5 87 C57 88.5 54.5 89 53 88.5 C52.5 86 53 82 53.2 76 C53.5 69.5 52.5 61.5 50.5 54 Z"
          fill="url(#vitruviusBodyFill)"
          stroke="url(#vitruviusRedGrad)"
          strokeWidth="1.1"
          strokeLinejoin="round"
        />
      </g>

      {/* --- CORE TORSO & ABDOMEN (Sculpted Muscular Cuirass) --- */}
      {/* Torso main muscular contour (Chest to waist taper to hips) */}
      <path
        d="M46 29 C43 31.5 41.5 35 42 41 C42.5 45 44 48.5 44.5 52.5 L49.5 54.5 L50.5 54.5 L55.5 52.5 C56 48.5 57.5 45 58 41 C58.5 35 57 31.5 54 29 Z"
        fill="url(#vitruviusBodyFill)"
        stroke="url(#vitruviusRedGrad)"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />

      {/* Pectoral Muscle Definition */}
      <path 
        d="M43 32.5 C45 36.5 48.5 36.5 49.5 34.5" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1" 
        strokeLinecap="round" 
      />
      <path 
        d="M57 32.5 C55 36.5 51.5 36.5 50.5 34.5" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1" 
        strokeLinecap="round" 
      />

      {/* Sternum Linea Alba & Abdominal Muscle Tiers */}
      <line x1="50" y1="29" x2="50" y2="52" stroke="url(#vitruviusRedGrad)" strokeWidth="0.8" opacity="0.85" />
      <path d="M46 38.5 Q50 40 54 38.5" stroke="url(#vitruviusRedGrad)" strokeWidth="0.7" opacity="0.75" />
      <path d="M46.5 43 Q50 44.5 53.5 43" stroke="url(#vitruviusRedGrad)" strokeWidth="0.7" opacity="0.75" />
      <path d="M47 47.5 Q50 48.5 53 47.5" stroke="url(#vitruviusRedGrad)" strokeWidth="0.7" opacity="0.75" />

      {/* --- SCULPTED HEAD & CRANIUM --- */}
      {/* Neck / Trapezius Connection */}
      <path d="M47.5 25 L46 29 L54 29 L52.5 25 Z" fill="#050507" stroke="url(#vitruviusRedGrad)" strokeWidth="1" />

      {/* Cranium and Jaw Silhouette */}
      <path
        d="M50 14.5 C46.5 14.5 44 17.5 44 21 C44 24.5 46.5 27 50 27 C53.5 27 56 24.5 56 21 C56 17.5 53.5 14.5 50 14.5 Z"
        fill="#050507"
        stroke="url(#vitruviusRedGrad)"
        strokeWidth="1.3"
      />
      {/* Classical Crown / Forehead Brow Arc */}
      <path d="M46.5 18 C48 16.8 52 16.8 53.5 18" stroke="#fca5a5" strokeWidth="0.9" strokeLinecap="round" />
      {/* Cyber Vision / Neural Visor Horizontal Accent */}
      <line x1="47.5" y1="20" x2="52.5" y2="20" stroke="#ff1a40" strokeWidth="1.2" strokeLinecap="round" />

      {/* ================================================================= */}
      {/* 3. GOLDEN RATIO ANCHORS & GLOWING NODES */}
      {/* ================================================================= */}
      {/* Center of the World (Da Vinci Navel Center) */}
      <circle cx="50" cy="50" r="1.8" fill="#ff1a40" />
      <circle cx="50" cy="50" r="3.2" stroke="#ff1a40" strokeWidth="0.5" strokeDasharray="1.5 1.5" opacity="0.6" />

      {/* Terminal Vector Nodes (Hands) */}
      <circle cx="12" cy="32" r="1.3" fill="#ff1a40" />
      <circle cx="88" cy="32" r="1.3" fill="#ff1a40" />
      <circle cx="15" cy="10" r="1.3" fill="#fca5a5" />
      <circle cx="85" cy="10" r="1.3" fill="#fca5a5" />

      {/* Terminal Vector Nodes (Feet) */}
      <circle cx="45" cy="88" r="1.3" fill="#ff1a40" />
      <circle cx="55" cy="88" r="1.3" fill="#ff1a40" />
      <circle cx="21" cy="87.5" r="1.3" fill="#fca5a5" />
      <circle cx="79" cy="87.5" r="1.3" fill="#fca5a5" />
    </svg>
  )
}

export function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

export function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  )
}
