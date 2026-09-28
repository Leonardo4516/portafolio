import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Workflow, GraduationCap, Cpu, Database, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Hero() {
  const { t } = useLanguage()
  const roles = t.hero.typewriterRoles
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const handleScrollTo = (e, targetId) => {
    e.preventDefault()
    const element = document.querySelector(targetId)
    if (element) {
      const navHeight = 70
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      if (window.history.pushState) {
        window.history.pushState(null, null, targetId)
      }
    }
  }

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
    <section id="inicio" className="min-h-screen relative flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 scroll-mt-24">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center flex flex-col items-center"
        >
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-950/90 border border-red-500/40 text-[11px] sm:text-xs font-mono text-red-300 mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(239,68,68,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-red-400 animate-spin" style={{ animationDuration: '9s' }} />
            <span>{t.hero.badge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-3">
            <span className="block text-neutral-200 text-2xl sm:text-4xl md:text-5xl font-light mb-1">
              {t.hero.greeting}
            </span>
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(239,68,68,0.4)]">
              {t.hero.name}
            </span>
          </h1>

          {/* Role + Education Subtitle */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-mono text-red-300 mb-6">
            <span className="px-2.5 py-1 rounded-md bg-red-500/10 border border-red-500/30 text-red-300 font-semibold">
              {t.hero.role}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="flex items-center gap-1 text-neutral-300">
              <GraduationCap className="w-3.5 h-3.5 text-red-400" />
              {t.hero.education}
            </span>
          </div>

          {/* Typewriter role */}
          <div className="h-10 sm:h-12 flex items-center justify-center font-mono text-base sm:text-xl md:text-2xl text-red-300/90 mb-8 max-w-full px-2 text-center">
            <span className="text-rose-500 mr-2">&gt;</span>
            <span className="truncate">{displayText}</span>
            <span className="w-2.5 h-5 sm:h-6 bg-red-500 ml-1 inline-block animate-pulse"></span>
          </div>

          {/* Description */}
          <p className="max-w-2xl text-neutral-300/85 text-sm sm:text-base leading-relaxed mb-9 font-sans px-2">
            {t.hero.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="#proyectos"
              onClick={(e) => handleScrollTo(e, '#proyectos')}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-500 hover:to-rose-500 text-white font-semibold font-mono text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.6)] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{t.hero.btnProjects}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#metodologia"
              onClick={(e) => handleScrollTo(e, '#metodologia')}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-800 hover:border-red-500/50 text-neutral-200 font-mono text-xs sm:text-sm tracking-wide backdrop-blur-md transition-all shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.25)] cursor-pointer"
            >
              <Workflow className="w-4 h-4 text-red-400" />
              <span>{t.hero.btnWorkflow}</span>
            </a>
          </div>

          {/* Micro stats banner */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-3xl px-2">
            <div className="bg-neutral-950/70 backdrop-blur-md border border-neutral-800/80 hover:border-red-500/30 rounded-xl p-3 sm:p-4 text-center transition-colors">
              <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mx-auto mb-1.5" />
              <div className="text-base sm:text-lg font-bold font-mono text-white">{t.hero.stats[0].value}</div>
              <div className="text-[10px] sm:text-xs font-mono text-neutral-400">{t.hero.stats[0].label}</div>
            </div>
            <div className="bg-neutral-950/70 backdrop-blur-md border border-neutral-800/80 hover:border-red-500/30 rounded-xl p-3 sm:p-4 text-center transition-colors">
              <Database className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 mx-auto mb-1.5" />
              <div className="text-base sm:text-lg font-bold font-mono text-white">{t.hero.stats[1].value}</div>
              <div className="text-[10px] sm:text-xs font-mono text-neutral-400">{t.hero.stats[1].label}</div>
            </div>
            <div className="bg-neutral-950/70 backdrop-blur-md border border-neutral-800/80 hover:border-red-500/30 rounded-xl p-3 sm:p-4 text-center transition-colors">
              <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 mx-auto mb-1.5" />
              <div className="text-base sm:text-lg font-bold font-mono text-white">{t.hero.stats[2].value}</div>
              <div className="text-[10px] sm:text-xs font-mono text-neutral-400">{t.hero.stats[2].label}</div>
            </div>
            <div className="bg-neutral-950/70 backdrop-blur-md border border-neutral-800/80 hover:border-red-500/30 rounded-xl p-3 sm:p-4 text-center transition-colors">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-rose-400 mx-auto mb-1.5" />
              <div className="text-base sm:text-lg font-bold font-mono text-white">{t.hero.stats[3].value}</div>
              <div className="text-[10px] sm:text-xs font-mono text-neutral-400">{t.hero.stats[3].label}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
