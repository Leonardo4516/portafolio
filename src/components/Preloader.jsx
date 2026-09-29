import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BrandLogo } from './Icons'
import { useLanguage } from '../context/LanguageContext'

export default function Preloader({ onComplete }) {
  const { language } = useLanguage()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const startTime = performance.now()
    const targetDuration = 1350 // ~1.35 seconds for crisp, snappy cyber entrance

    let animationFrameId
    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime
      const rawProgress = Math.min((elapsed / targetDuration) * 100, 100)
      
      // Eased progress curve for natural tech acceleration
      const eased = Math.round(
        rawProgress < 50
          ? 2 * Math.pow(rawProgress / 100, 1.8) * 100
          : (1 - Math.pow(-2 * (rawProgress / 100) + 2, 2) / 2) * 100
      )
      
      setProgress(Math.min(eased, 100))

      if (rawProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress)
      } else {
        setTimeout(() => {
          if (onComplete) onComplete()
        }, 180)
      }
    }

    animationFrameId = requestAnimationFrame(updateProgress)

    // Fail-safe timeout to ensure preloader never hangs under any device circumstance
    const fallbackTimer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 2200)

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
        <div className="w-56 sm:w-64 space-y-2.5">
          <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span className="text-neutral-500 text-[10px]">PROGRESS</span>
            <span className="text-red-400 font-bold tracking-wider">{progress}%</span>
          </div>

          {/* High-tech Crimson Loading Bar */}
          <div className="relative h-[3px] w-full bg-neutral-900 rounded-full overflow-hidden border border-red-950/60 p-[0.5px]">
            <motion.div 
              className="h-full bg-gradient-to-r from-red-700 via-red-500 to-rose-400 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.8)]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Dynamic Diagnostic Status */}
          <p className="text-[9px] font-mono text-neutral-500 tracking-wider truncate h-4">
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
