import { motion } from 'framer-motion'
import { 
  Server, 
  Database, 
  Bot, 
  MessageSquareCode, 
  SearchCheck, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  const pillarIcons = [Server, Database, Bot]
  const pillarColors = [
    { bg: 'from-red-600 to-rose-900', border: 'border-red-500/30' },
    { bg: 'from-rose-600 to-red-950', border: 'border-red-500/30' },
    { bg: 'from-red-700 to-neutral-900', border: 'border-red-500/30' }
  ]

  const softSkillIcons = [MessageSquareCode, SearchCheck, Compass, Sparkles]

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
    <section id="sobre-mi" className="py-24 px-4 sm:px-6 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center">
          <span className="text-xs font-mono uppercase tracking-widest text-red-400 bg-red-950/40 border border-red-500/30 px-4 py-1.5 rounded-full inline-block">
            {t.about.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 mt-4 mb-4">
            {t.about.title} <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text text-transparent">{t.about.titleHighlight}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-400 text-xs sm:text-sm md:text-base font-sans leading-relaxed">
            {t.about.desc}
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.about.pillars.map((item, idx) => {
            const Icon = pillarIcons[idx]
            const color = pillarColors[idx]
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.12, duration: 0.5 }}
                className={`relative bg-neutral-950/70 backdrop-blur-xl border ${color.border} p-6 sm:p-8 rounded-2xl group hover:shadow-[0_10px_35px_rgba(239,68,68,0.2)] hover:border-red-500/60 transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color.bg} p-2.5 flex items-center justify-center text-white mb-5 shadow-lg shadow-red-950/50 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-100 mb-3 font-mono">
                  {item.title}
                </h3>
                <p className="text-neutral-300/80 text-xs sm:text-sm leading-relaxed font-sans">
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Engineering Standards & Quality Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-950/80 border border-neutral-800 hover:border-red-500/40 transition-all rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-neutral-800/80">
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-red-400 bg-red-950/50 border border-red-500/30 px-3 py-1 rounded-md inline-block mb-2">
                {t.about.standardsBadge}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-mono text-white">
                {t.about.standardsTitle}
              </h3>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-sans">
              {t.about.standardsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.about.standards.map((standard, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-black/60 border border-neutral-800/70 hover:border-red-500/40 hover:bg-neutral-900/50 transition-all group"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] group-hover:scale-125 transition-transform" />
                  <h4 className="text-xs sm:text-sm font-semibold font-mono text-neutral-200 group-hover:text-red-300 transition-colors">
                    {standard.label}
                  </h4>
                </div>
                <p className="text-xs text-neutral-400 leading-relaxed pl-4 font-sans">
                  {standard.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Soft Skills & Work Dynamics with Verifiable Code Evidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-neutral-950/80 border border-neutral-800 hover:border-red-500/40 transition-all rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-5 border-b border-neutral-800/80">
            <div>
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-red-400 bg-red-950/50 border border-red-500/30 px-3 py-1 rounded-md inline-block mb-2">
                {t.about.softSkillsBadge}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-mono text-white">
                {t.about.softSkillsTitle}{' '}
                <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text text-transparent">
                  {t.about.softSkillsHighlight}
                </span>
              </h3>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-md font-sans">
              {t.about.softSkillsDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.about.softSkills.map((skill, idx) => {
              const Icon = softSkillIcons[idx]
              return (
                <div
                  key={skill.id}
                  className="p-5 sm:p-6 rounded-2xl bg-black/60 border border-neutral-800 hover:border-red-500/50 hover:bg-neutral-950/60 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-950/50 border border-red-500/30 flex items-center justify-center text-red-400 group-hover:scale-105 group-hover:border-red-400 transition-all shadow-[0_0_12px_rgba(239,68,68,0.2)]">
                          <Icon className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold font-mono text-white group-hover:text-red-300 transition-colors">
                            {skill.title}
                          </h4>
                          <span className="text-[11px] font-mono text-red-400/90 block">
                            {skill.subtitle}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300/90 font-sans leading-relaxed mb-4">
                      {skill.desc}
                    </p>
                  </div>

                  {/* Verifiable Evidence Callout Box */}
                  <div className="pt-3 border-t border-neutral-800/80">
                    <div className="p-3 rounded-xl bg-neutral-950/90 border border-red-500/25 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-neutral-400 font-medium flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-400" />
                          <span>{t.about.evidenceLabel}</span>
                        </span>
                        <a
                          href="#proyectos"
                          onClick={handleScrollToProjects}
                          className="inline-flex items-center gap-1 text-red-400 hover:text-red-300 font-semibold cursor-pointer group/link"
                        >
                          <span>{t.about.viewProjectAction}</span>
                          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                      <div className="text-xs font-mono font-bold text-white">
                        {skill.evidenceProject}
                      </div>
                      <div className="text-[11px] font-sans text-neutral-400">
                        {skill.evidenceDetails}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

