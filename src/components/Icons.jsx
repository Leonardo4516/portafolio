// Refined, high-detail geometric Vitruvian Man (Leonardo da Vinci inspired) SVG in Crimson Red
export function BrandLogo({ className = "w-7 h-7" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vitruviusRedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff1a40" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#991b1b" />
        </linearGradient>
        <linearGradient id="glowRedGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7f1d1d" />
          <stop offset="100%" stopColor="#ff1a40" />
        </linearGradient>
      </defs>

      {/* --- Da Vinci Sacred Geometry --- */}
      {/* Precision Outer Circle */}
      <circle 
        cx="50" 
        cy="50" 
        r="46" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1.2" 
        strokeDasharray="4 2"
        opacity="0.8"
      />
      
      {/* Precision Square */}
      <rect 
        x="15" 
        y="15" 
        width="70" 
        height="70" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1" 
        opacity="0.5"
      />

      {/* Subtle Axis Grid Lines */}
      <line x1="50" y1="4" x2="50" y2="96" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />
      <line x1="4" y1="50" x2="96" y2="50" stroke="#ef4444" strokeWidth="0.5" strokeDasharray="2 3" opacity="0.3" />

      {/* --- Anatomical / Contoured Body Silhouette --- */}
      
      {/* Head with classical chin and hair contour */}
      <ellipse cx="50" cy="22" rx="4.5" ry="5.8" stroke="url(#vitruviusRedGrad)" strokeWidth="1.3" fill="#050507" />
      <path d="M47 18.5C48 17.5 52 17.5 53 18.5" stroke="#fca5a5" strokeWidth="1" strokeLinecap="round" />
      
      {/* Neck & Trapezius */}
      <path d="M46.5 27.5L44 31M53.5 27.5L56 31" stroke="url(#vitruviusRedGrad)" strokeWidth="1.2" strokeLinecap="round" />

      {/* Torso: Pectorals & Ribcage definition */}
      <path 
        d="M44 31C44 34 46.5 37 50 37C53.5 37 56 34 56 31" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1.3" 
        strokeLinecap="round"
      />
      <line x1="50" y1="28" x2="50" y2="48" stroke="url(#vitruviusRedGrad)" strokeWidth="1" opacity="0.7" />
      
      {/* Abdomen / Waist curvature */}
      <path 
        d="M44 34C43 40 45 46 45 50L50 52L55 50C55 46 57 40 56 34" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1.2" 
        strokeLinejoin="round"
      />

      {/* --- Arms: Set 1 (Horizontal - touching the Square) --- */}
      <path 
        d="M44 31L32 31.5C27 31.5 21 32 15 32" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M56 31L68 31.5C73 31.5 79 32 85 32" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />

      {/* --- Arms: Set 2 (Angled / Raised - touching the Circle) --- */}
      <path 
        d="M44 30L33 24C26 20 21 16 18 14" 
        stroke="url(#glowRedGrad)" 
        strokeWidth="1.4" 
        strokeLinecap="round"
      />
      <path 
        d="M56 30L67 24C74 20 79 16 82 14" 
        stroke="url(#glowRedGrad)" 
        strokeWidth="1.4" 
        strokeLinecap="round"
      />

      {/* Hand nodes */}
      <circle cx="15" cy="32" r="1.2" fill="#ff1a40" />
      <circle cx="85" cy="32" r="1.2" fill="#ff1a40" />
      <circle cx="18" cy="14" r="1.2" fill="#ef4444" />
      <circle cx="82" cy="14" r="1.2" fill="#ef4444" />

      {/* --- Legs: Set 1 (Straight / Standing - touching base of Square) --- */}
      <path 
        d="M46 51C45 60 45 70 44 85" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1.6" 
        strokeLinecap="round"
      />
      <path 
        d="M54 51C55 60 55 70 56 85" 
        stroke="url(#vitruviusRedGrad)" 
        strokeWidth="1.6" 
        strokeLinecap="round"
      />

      {/* --- Legs: Set 2 (Spread / Angled - touching the Circle) --- */}
      <path 
        d="M46 51C41 62 34 72 26 84" 
        stroke="url(#glowRedGrad)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />
      <path 
        d="M54 51C59 62 66 72 74 84" 
        stroke="url(#glowRedGrad)" 
        strokeWidth="1.5" 
        strokeLinecap="round"
      />

      {/* Feet nodes */}
      <circle cx="44" cy="85" r="1.2" fill="#ff1a40" />
      <circle cx="56" cy="85" r="1.2" fill="#ff1a40" />
      <circle cx="26" cy="84" r="1.2" fill="#ef4444" />
      <circle cx="74" cy="84" r="1.2" fill="#ef4444" />

      {/* Core Center Navel Node */}
      <circle cx="50" cy="50" r="1.8" fill="#ff1a40" />
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
