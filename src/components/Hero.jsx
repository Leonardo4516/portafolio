import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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
    <section id="inicio" className="min-h-screen relative flex items-center pt-28 pb-16 px-5 sm:px-8 scroll-mt-24">
      <div className="max-w-6xl mx-auto w-full z-10">
        {/* El remanente del choque está a la derecha: el texto va a la izquierda */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="lg:w-[60%] sobre-espacio"
        >
          <div className="flex items-center gap-4 mb-8">
            <img
              src="/img/leonardo.jpeg"
              alt="Leonardo Hernández"
              width="64"
              height="64"
              className="w-16 h-16 rounded-full object-cover ring-1 ring-white/20"
            />
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">{t.hero.badge}</p>
          </div>

          <h1 className="font-display tracking-tight mb-6">
            <span className="block text-2xl sm:text-3xl font-medium text-neutral-200 mb-2">{t.hero.greeting}</span>
            <span className="block text-5xl sm:text-6xl md:text-7xl font-semibold text-white">{t.hero.name}</span>
          </h1>

          <p className="font-mono text-sm text-neutral-300 mb-3">
            <span className="text-white">{t.hero.role}</span>
            <span className="mx-2 text-neutral-500">·</span>
            {t.hero.education}
          </p>

          {/* Rol que se escribe solo */}
          <p className="h-8 font-mono text-lg sm:text-xl text-violet-300 mb-8 flex items-center">
            <span className="text-neutral-500 mr-2">&gt;</span>
            <span className="truncate">{displayText}</span>
            <span className="w-2 h-5 bg-violet-300 ml-1 inline-block animate-pulse"></span>
          </p>

          <p className="max-w-xl text-neutral-200 text-base sm:text-lg leading-relaxed mb-10">
            {t.hero.description}
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="#proyectos"
              onClick={(e) => handleScrollTo(e, '#proyectos')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-violet-200 transition-colors"
            >
              <span>{t.hero.btnProjects}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#metodologia"
              onClick={(e) => handleScrollTo(e, '#metodologia')}
              className="font-mono text-sm text-neutral-200 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
            >
              {t.hero.btnWorkflow}
            </a>
          </div>

          {/* Cifras rápidas */}
          <dl className="mt-14 grid grid-cols-2 sm:grid-cols-4 border-t border-white/10">
            {t.hero.stats.map((stat) => (
              <div key={stat.label} className="pt-5 pr-4">
                <dt className="font-display text-xl font-semibold text-white">{stat.value}</dt>
                <dd className="font-mono text-xs text-neutral-400 mt-1">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>

      {/* Indicador para bajar */}
      <button
        onClick={(e) => handleScrollTo(e, '#sobre-mi')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{t.hero.scrollCue || 'Explorar'}</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="block w-px h-6 bg-current"
        />
      </button>
    </section>
  )
}
