import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Terminal, GraduationCap, Cpu, Database, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const roles = t.hero.typewriterRoles
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  // Reset or adjust index if language switches
  useEffect(() => {
    setRoleIndex(0)
    setDisplayText('')
    setIsDeleting(false)
  }, [t])

  useEffect(() => {
    const current = roles[roleIndex] || roles[0]
    let timer

    if (!isDeleting && displayText === current) {
      timer = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    } else {
      const speed = isDeleting ? 35 : 70
      timer = setTimeout(() => {
        setDisplayText(current.substring(0, displayText.length + (isDeleting ? -1 : 1)))
      }, speed)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex, roles])

  return (
    <section id="inicio" className="min-h-screen relative flex items-center justify-center pt-28 pb-16 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center flex flex-col items-center"
        >
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/85 border border-cyan-500/30 text-[11px] sm:text-xs font-mono text-cyan-300 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,243,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '9s' }} />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-3">
            <span className="block text-slate-200 text-2xl sm:text-4xl md:text-5xl font-light mb-1">
              {t.hero.greeting}
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,243,255,0.25)]">
              {t.hero.name}
            </span>
          </h1>

          {/* Role + Education Subtitle */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-mono text-purple-300 mb-6">
            <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/30 text-purple-300 font-semibold">
              {t.hero.role}
            </span>
            <span className="text-slate-500">•</span>
            <span className="flex items-center gap-1 text-slate-300">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              {t.hero.education}
            </span>
          </div>

          {/* Typewriter role */}
          <div className="h-10 sm:h-12 flex items-center justify-center font-mono text-base sm:text-xl md:text-2xl text-cyan-300/90 mb-8 max-w-full px-2 text-center">
            <span className="text-purple-400 mr-2">&gt;</span>
            <span className="truncate">{displayText}</span>
            <span className="w-2.5 h-5 sm:h-6 bg-cyan-400 ml-1 inline-block animate-pulse"></span>
          </div>

          {/* Grounded & Realistic Description */}
          <p className="max-w-2xl text-slate-300/85 text-sm sm:text-base leading-relaxed mb-9 font-sans px-2">
            {t.hero.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#proyectos"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold font-mono text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(0,243,255,0.3)] hover:shadow-[0_0_35px_rgba(0,243,255,0.5)] transition-all transform hover:-translate-y-0.5"
            >
              <span>{t.hero.btnProjects}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#terminal"
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 hover:border-purple-500/50 text-slate-200 font-mono text-xs sm:text-sm tracking-wide backdrop-blur-md transition-all shadow-[0_0_15px_rgba(188,19,254,0.1)] hover:shadow-[0_0_20px_rgba(188,19,254,0.25)]"
            >
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>{t.hero.btnTerminal}</span>
            </a>
          </div>

          {/* Micro stats banner */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl px-2">
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-3 sm:p-4 text-center">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 mx-auto mb-1.5" />
              <div className="text-base sm:text-lg font-bold font-mono text-slate-100">{t.hero.stats[0].value}</div>
              <div className="text-[10px] sm:text-xs font-mono text-slate-400">{t.hero.stats[0].label}</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-3 sm:p-4 text-center">
              <Database className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400 mx-auto mb-1.5" />
              <div className="text-base sm:text-lg font-bold font-mono text-slate-100">{t.hero.stats[1].value}</div>
              <div className="text-[10px] sm:text-xs font-mono text-slate-400">{t.hero.stats[1].label}</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-3 sm:p-4 text-center">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mx-auto mb-1.5" />
              <div className="text-base sm:text-lg font-bold font-mono text-slate-100">{t.hero.stats[2].value}</div>
              <div className="text-[10px] sm:text-xs font-mono text-slate-400">{t.hero.stats[2].label}</div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800/80 rounded-xl p-3 sm:p-4 text-center">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 mx-auto mb-1.5" />
              <div className="text-base sm:text-lg font-bold font-mono text-slate-100">{t.hero.stats[3].value}</div>
              <div className="text-[10px] sm:text-xs font-mono text-slate-400">{t.hero.stats[3].label}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
