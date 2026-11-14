import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ChevronRight, ChevronLeft } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function WorkflowView() {
  const { t, language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)

  const currentPhase = t.workflow.phases[activeStep]

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % t.workflow.phases.length)
  }

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + t.workflow.phases.length) % t.workflow.phases.length)
  }

  const handleScrollToProjects = (e) => {
    e.preventDefault()
    const element = document.querySelector('#proyectos')
    if (element) {
      const navHeight = 70
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      if (window.history.pushState) {
        window.history.pushState(null, null, '#proyectos')
      }
    }
  }

  return (
    <section id="metodologia" className="py-28 px-5 sm:px-8 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Las estrellas gemelas de esta sección están a la derecha: el texto va a la izquierda */}
        <div className="lg:w-[56%] sobre-espacio">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">
            {t.workflow.tag}
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4 mb-5">
            {t.workflow.title} <span className="text-violet-300">{t.workflow.titleHighlight}</span>
          </h2>
          <p className="text-neutral-200 text-base leading-relaxed max-w-xl">
            {t.workflow.desc}
          </p>

          {/* Fases como pestañas de texto */}
          <div className="grid grid-cols-2 sm:grid-cols-4 mt-12 border-b border-white/10">
            {t.workflow.phases.map((phase, idx) => {
              const isActive = activeStep === idx
              return (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`relative text-left pb-4 pr-3 pt-2 transition-colors cursor-pointer ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className={`block font-mono text-xs mb-1.5 ${isActive ? 'text-violet-300' : ''}`}>
                    {phase.step}
                  </span>
                  <span className="block text-sm font-medium leading-snug">{phase.phase}</span>
                  {isActive && (
                    <motion.span
                      layoutId="faseActiva"
                      className="absolute left-0 right-3 -bottom-px h-px bg-violet-400"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Detalle de la fase activa */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="pt-10"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
                {language === 'es' ? `Fase ${currentPhase.step} del pipeline` : `Pipeline stage ${currentPhase.step}`}
              </p>
              <h3 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white mt-3 mb-5">
                {currentPhase.title}
              </h3>
              <p className="text-neutral-200 text-base sm:text-lg leading-relaxed mb-8">
                {currentPhase.desc}
              </p>

              <dl className="divide-y divide-white/10 border-y border-white/10 text-[15px]">
                <div className="grid sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6 py-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-neutral-400 pt-1">
                    {language === 'es' ? 'Herramientas' : 'Tools'}
                  </dt>
                  <dd className="font-mono text-sm text-neutral-200">{currentPhase.tools.join('  ·  ')}</dd>
                </div>
                <div className="grid sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6 py-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-neutral-400 pt-1">
                    {language === 'es' ? 'Entregable' : 'Deliverable'}
                  </dt>
                  <dd className="text-neutral-200">{currentPhase.deliverable}</dd>
                </div>
                <div className="grid sm:grid-cols-[11rem_1fr] gap-1 sm:gap-6 py-4">
                  <dt className="font-mono text-xs uppercase tracking-wider text-neutral-400 pt-1">
                    {currentPhase.caseStudyLabel.replace(/:$/, '')}
                  </dt>
                  <dd>
                    <a
                      href="#proyectos"
                      onClick={handleScrollToProjects}
                      className="inline-flex items-center gap-2 text-violet-300 hover:text-white transition-colors group"
                    >
                      <span className="underline underline-offset-4 decoration-violet-400/40 group-hover:decoration-white">
                        {currentPhase.caseStudyProject}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </dd>
                </div>
              </dl>

              {/* Navegación entre fases */}
              <div className="flex items-center justify-between mt-8 font-mono text-sm">
                <button
                  onClick={handlePrev}
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{language === 'es' ? 'Anterior' : 'Previous'}</span>
                </button>
                <span className="text-neutral-400">
                  <span className="text-white">{activeStep + 1}</span> / {t.workflow.phases.length}
                </span>
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  <span>{language === 'es' ? 'Siguiente' : 'Next'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
