import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Database, 
  Cpu, 
  Workflow as WorkflowIcon, 
  Boxes, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Layers,
  ShieldCheck
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function WorkflowView() {
  const { t, language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)

  const phaseIcons = [Database, Cpu, WorkflowIcon, Boxes]

  const currentPhase = t.workflow.phases[activeStep]
  const CurrentIcon = phaseIcons[activeStep]

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % t.workflow.phases.length)
  }

  const handlePrev = () => {
    setActiveStep((prev) => (prev - 1 + t.workflow.phases.length) % t.workflow.phases.length)
  }

  return (
    <section id="metodologia" className="py-24 px-4 sm:px-6 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-red-400 bg-red-950/40 border border-red-500/30 px-4 py-1.5 rounded-full inline-block">
            {t.workflow.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 mt-4 mb-3 font-mono">
            {t.workflow.title}{' '}
            <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text text-transparent">
              {t.workflow.titleHighlight}
            </span>
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-400 text-xs sm:text-sm font-sans leading-relaxed">
            {t.workflow.desc}
          </p>
        </div>

        {/* Pipeline Step Navigation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mb-8">
          {t.workflow.phases.map((phase, idx) => {
            const Icon = phaseIcons[idx]
            const isActive = activeStep === idx

            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`relative text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 backdrop-blur-xl group flex flex-col justify-between ${
                  isActive
                    ? 'bg-neutral-950/90 border-red-500/60 shadow-[0_0_25px_rgba(239,68,68,0.25)]'
                    : 'bg-neutral-950/50 border-neutral-800/80 hover:border-red-500/30 hover:bg-neutral-900/40'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeWorkflowIndicator"
                    className="absolute -top-px -left-px -right-px h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 rounded-t-2xl"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <div className="flex items-center justify-between mb-3 w-full">
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded-md ${
                    isActive 
                      ? 'bg-red-600 text-white shadow-[0_0_10px_rgba(239,68,68,0.6)]' 
                      : 'bg-neutral-900 text-neutral-400 group-hover:text-red-400'
                  }`}>
                    {phase.step}
                  </span>
                  <Icon className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    isActive ? 'text-red-400' : 'text-neutral-500 group-hover:text-neutral-300'
                  }`} />
                </div>

                <div>
                  <div className={`text-xs font-mono font-semibold transition-colors ${
                    isActive ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                  }`}>
                    {phase.phase}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Detailed Phase Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.28 }}
            className="bg-neutral-950/80 backdrop-blur-2xl border border-neutral-800/90 hover:border-red-500/40 rounded-3xl p-6 sm:p-9 shadow-[0_0_40px_rgba(239,68,68,0.12)] transition-all"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Phase Information */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/30 to-rose-950/30 border border-red-500/40 flex items-center justify-center text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                    <CurrentIcon className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-red-400 font-bold">
                      {language === 'es' ? `FASE ${currentPhase.step} DEL PIPELINE` : `PIPELINE STAGE ${currentPhase.step}`}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-mono text-white">
                      {currentPhase.title}
                    </h3>
                  </div>
                </div>

                <p className="text-neutral-300 text-xs sm:text-sm md:text-base leading-relaxed font-sans mb-6">
                  {currentPhase.desc}
                </p>

                {/* Tools & Stack in this Phase */}
                <div className="mb-6">
                  <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-red-400" />
                    <span>{language === 'es' ? 'Herramientas y Tecnologías:' : 'Tools & Technologies:'}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {currentPhase.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-black/80 border border-neutral-800 text-neutral-300 hover:border-red-500/40 hover:text-red-300 transition-colors"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Deliverable result */}
                <div className="p-4 rounded-xl bg-black/60 border border-neutral-800/80 flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm text-neutral-300 font-mono">
                    <span className="text-red-400 font-semibold">{language === 'es' ? 'Entregable Técnico: ' : 'Technical Deliverable: '}</span>
                    {currentPhase.deliverable}
                  </div>
                </div>
              </div>

              {/* Right Column: Real Case Study Connection & Controls */}
              <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-red-950/20 via-black to-neutral-950 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 bg-red-950/50 border border-red-500/30 px-2.5 py-1 rounded-md">
                      {currentPhase.caseStudyLabel}
                    </span>
                    <ShieldCheck className="w-4 h-4 text-red-400" />
                  </div>

                  <h4 className="text-base sm:text-lg font-bold font-mono text-white mb-2">
                    {currentPhase.caseStudyProject}
                  </h4>

                  <p className="text-xs text-neutral-400 font-sans leading-relaxed mb-4">
                    {language === 'es' 
                      ? 'Este principio se encuentra implementado y documentado con rigor en el código fuente de mis proyectos públicos.'
                      : 'This engineering principle is strictly implemented and documented within the source code of my public repositories.'}
                  </p>

                  <a
                    href="#proyectos"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-red-400 hover:text-red-300 transition-colors group"
                  >
                    <span>{language === 'es' ? 'Ver en proyectos destacados' : 'View in featured projects'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Pipeline Navigation Arrows */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-800/80">
                  <button
                    onClick={handlePrev}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-500/40 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{language === 'es' ? 'Fase Anterior' : 'Previous Stage'}</span>
                  </button>

                  <div className="font-mono text-xs text-neutral-500">
                    <span className="text-red-400 font-bold">{activeStep + 1}</span> / {t.workflow.phases.length}
                  </div>

                  <button
                    onClick={handleNext}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-red-500/40 text-xs font-mono text-neutral-400 hover:text-white transition-colors"
                  >
                    <span>{language === 'es' ? 'Siguiente Fase' : 'Next Stage'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
