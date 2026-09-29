import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BrandLogo } from './Icons'
import { useLanguage } from '../context/LanguageContext'

const PROGRESS_KEYFRAMES = [
  { t: 0.00, val: 0,   tangent: 105 }, // Swift initial burst
  { t: 0.28, val: 38,  tangent: 14 },  // Gentle deceleration into checkpoint 1
  { t: 0.44, val: 46,  tangent: 28 },  // Smooth progressive re-acceleration
  { t: 0.68, val: 76,  tangent: 16 },  // Gentle deceleration into checkpoint 2
  { t: 0.82, val: 84,  tangent: 32 },  // Smooth acceleration toward completion
  { t: 0.98, val: 100, tangent: 8 },   // Soft aerodynamic arrival at 100%
  { t: 1.00, val: 100, tangent: 0 }
]

function calculateHermiteProgress(u) {
  if (u <= 0) return 0
  if (u >= 1) return 100
  let i = 0
  while (i < PROGRESS_KEYFRAMES.length - 1 && PROGRESS_KEYFRAMES[i + 1].t < u) {
    i++
  }
  const k0 = PROGRESS_KEYFRAMES[i]
  const k1 = PROGRESS_KEYFRAMES[i + 1]
  const dt = k1.t - k0.t
  const s = (u - k0.t) / dt
  const s2 = s * s
  const s3 = s2 * s
  const h00 = 2 * s3 - 3 * s2 + 1
  const h10 = s3 - 2 * s2 + s
  const h01 = -2 * s3 + 3 * s2
  const h11 = s3 - s2
  const val = h00 * k0.val + h10 * dt * k0.tangent + h01 * k1.val + h11 * dt * k1.tangent
  return Math.min(Math.max(val, 0), 100)
}

export default function Preloader({ onComplete }) {
  const { language } = useLanguage()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = performance.now()
    const targetDuration = 3100 // ~3.1s for silky-smooth deceleration and cinematic pace

    let animationFrameId
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime
      const rawU = Math.min(elapsed / targetDuration, 1)
      const smoothedVal = calculateHermiteProgress(rawU)
      
      setProgress(smoothedVal)

      if (rawU < 1) {
        animationFrameId = requestAnimationFrame(updateProgress)
      } else {
        setTimeout(() => {
          if (onComplete) onComplete()
        }, 320)
      }
    }

    animationFrameId = requestAnimationFrame(updateProgress)

    // Fail-safe timeout to ensure preloader never hangs
    const fallbackTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 4200)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(fallbackTimer)
    }
  }, [onComplete])

  const getStatusText = () => {
    if (language === 'es') {
      if (progress < 25) return 'CALIBRANDO MATRIZ GEOMÉTRICA...'
      if (progress < 55) return 'CARGANDO ARQUITECTURA VITRUVIANA...'
      if (progress < 85) return 'OPTIMIZANDO RENDIMIENTO DE NAVEGACIÓN...'
      return 'SISTEMA LISTO // ENTRADA CONCEDIDA'
    } else {
      if (progress < 25) return 'CALIBRATING GEOMETRIC MATRIX...'
      if (progress < 55) return 'LOADING VITRUVIAN ARCHITECTURE...'
      if (progress < 85) return 'OPTIMIZING RUNTIME PIPELINE...'
      return 'SYSTEM READY // ACCESS GRANTED'
    }
  }

  return (
    <motion.aside 
      aria-label="Pantalla de carga / Loading screen"
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.04,
        filter: 'blur(8px)',
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
      }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden select-none"
    >
      {/* Background Cyber Ambient Glow */}
      <div 
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.16) 0%, rgba(153, 27, 27, 0.05) 45%, transparent 70%)'
        }}
      />

      {/* Cyber Grid Background Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '36px 36px'
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Vitruvian Man Logo Emblem Container */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center mb-8">
          
          {/* Outer Rotating Compass Reticle (Da Vinci Sacred Geometry) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 pointer-events-none"
          >
            <svg viewBox="0 0 200 200" className="w-full h-full text-red-500/25">
              <circle cx="100" cy="100" r="95" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 6" />
              <circle cx="100" cy="100" r="86" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 4" opacity="0.6" />
              {/* Compass ticks */}
              <line x1="100" y1="2" x2="100" y2="10" stroke="currentColor" strokeWidth="1.5" />
              <line x1="100" y1="190" x2="100" y2="198" stroke="currentColor" strokeWidth="1.5" />
              <line x1="2" y1="100" x2="10" y2="100" stroke="currentColor" strokeWidth="1.5" />
              <line x1="190" y1="100" x2="198" y2="100" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </motion.div>

          {/* Counter-rotating Inner Precision Ring */}
          <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-4 pointer-events-none opacity-40"
          >
            <svg viewBox="0 0 160 160" className="w-full h-full text-red-400">
              <circle cx="80" cy="80" r="76" fill="none" stroke="currentColor" strokeWidth="0.8" strokeDasharray="8 8" />
              <rect x="26" y="26" width="108" height="108" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
            </svg>
          </motion.div>

          {/* Pulsing Backlight Halo */}
          <motion.div 
            animate={{ scale: [0.96, 1.04, 0.96], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-8 rounded-full bg-red-600/15 filter blur-xl pointer-events-none"
          />

          {/* High-Resolution Vitruvian Man Logo */}
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center filter drop-shadow-[0_0_22px_rgba(255,26,64,0.45)]"
          >
            <BrandLogo className="w-full h-full" showGlow={true} />
          </motion.div>
        </div>

        {/* Identity & Subtitle */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="space-y-1 mb-6"
        >
          <div className="flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-[11px] font-mono tracking-[0.35em] text-neutral-400 uppercase font-semibold">
              LEONARDO HERNÁNDEZ
            </span>
          </div>
          <p className="text-[10px] font-mono tracking-[0.25em] text-red-500 uppercase">
            SOFTWARE ENGINEER // VITRUVIAN CODE
          </p>
        </motion.div>

        {/* Progress Bar Container */}
        <div className="w-64 sm:w-72 space-y-3">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span className="text-neutral-500 text-[10px] tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping inline-block" />
              SYSTEM LOAD
            </span>
            <span className="text-red-400 font-bold font-mono tracking-wider tabular-nums">{progress}%</span>
          </div>

          {/* High-tech Crimson Loading Bar with Active Fluid Motion */}
          <div className="relative h-2 w-full bg-neutral-950 rounded-full overflow-hidden border border-red-500/35 p-[1px] shadow-[inset_0_1px_4px_rgba(0,0,0,0.9),0_0_15px_rgba(239,68,68,0.15)]">
            
            {/* Ambient Background Track Pulse */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-red-600/20 to-transparent pointer-events-none"
            />

            {/* Filled Progress Bar with Continuous Traveling Energy Shimmer */}
            <div 
              className="h-full rounded-full relative overflow-hidden"
              style={{ 
                width: `${progress.toFixed(2)}%`,
                background: 'linear-gradient(90deg, #991b1b 0%, #ef4444 60%, #ff2a4d 100%)',
                boxShadow: '0 0 14px rgba(255, 26, 64, 0.75)'
              }}
            >
              {/* Continuous Waveform / Energy Stream Sweeping Forward */}
              <motion.div 
                animate={{ x: ['-100%', '150%'] }}
                transition={{ repeat: Infinity, duration: 0.9, ease: 'linear' }}
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none"
              />

              {/* Glowing Leading-Edge Laser Head */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_16px_#ff1a40] pointer-events-none" />
            </div>
          </div>

          {/* Dynamic Diagnostic Status with Subtle Cyber Pulse */}
          <p className="text-[10px] font-mono text-neutral-400 tracking-wider truncate h-4">
            {getStatusText()}
          </p>
        </div>
      </div>

      {/* Discreet Direct Skip Button in bottom corner for power users */}
      <button
        onClick={onComplete}
        className="absolute bottom-5 right-6 text-[10px] font-mono text-neutral-600 hover:text-neutral-300 transition-colors uppercase tracking-widest cursor-pointer px-2 py-1 rounded border border-neutral-900 hover:border-neutral-700"
      >
        {language === 'es' ? 'Saltar ▸' : 'Skip ▸'}
      </button>
    </motion.aside>
  )
}
