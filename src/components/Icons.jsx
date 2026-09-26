// Minimalist, geometric Vitruvian Man (Leonardo da Vinci inspired) SVG Logo
export function VitruvianLogo({ className = "w-6 h-6", strokeWidth = 1.6 }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vitruvianGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00f3ff" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#bc13fe" />
        </linearGradient>
      </defs>
      
      {/* Vitruvian Geometric Circle */}
      <circle 
        cx="24" 
        cy="24" 
        r="22" 
        stroke="url(#vitruvianGradient)" 
        strokeWidth={strokeWidth} 
        strokeDasharray="3 3"
        opacity="0.85"
      />

      {/* Vitruvian Geometric Square */}
      <rect 
        x="6" 
        y="6" 
        width="36" 
        height="36" 
        stroke="url(#vitruvianGradient)" 
        strokeWidth={strokeWidth * 0.8} 
        opacity="0.45"
      />

      {/* Head */}
      <circle cx="24" cy="11.5" r="3" stroke="#e0f2fe" strokeWidth={strokeWidth} fill="#030712" />

      {/* Torso */}
      <line x1="24" y1="14.5" x2="24" y2="28" stroke="#e0f2fe" strokeWidth={strokeWidth} strokeLinecap="round" />

      {/* Horizontal Arms (Square alignment) */}
      <line x1="8" y1="19" x2="40" y2="19" stroke="#00f3ff" strokeWidth={strokeWidth} strokeLinecap="round" />

      {/* Angled Arms (Circle alignment) */}
      <line x1="10" y1="13" x2="24" y2="19" stroke="#38bdf8" strokeWidth={strokeWidth * 0.9} strokeLinecap="round" opacity="0.85" />
      <line x1="38" y1="13" x2="24" y2="19" stroke="#38bdf8" strokeWidth={strokeWidth * 0.9} strokeLinecap="round" opacity="0.85" />

      {/* Standing Legs (Square alignment) */}
      <line x1="24" y1="28" x2="17" y2="42" stroke="#bc13fe" strokeWidth={strokeWidth} strokeLinecap="round" />
      <line x1="24" y1="28" x2="31" y2="42" stroke="#bc13fe" strokeWidth={strokeWidth} strokeLinecap="round" />

      {/* Spread Legs (Circle alignment) */}
      <line x1="24" y1="28" x2="10" y2="39" stroke="#c084fc" strokeWidth={strokeWidth * 0.9} strokeLinecap="round" opacity="0.8" />
      <line x1="24" y1="28" x2="38" y2="39" stroke="#c084fc" strokeWidth={strokeWidth * 0.9} strokeLinecap="round" opacity="0.8" />

      {/* Center Harmony Node */}
      <circle cx="24" cy="24" r="1.5" fill="#00f3ff" />
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
