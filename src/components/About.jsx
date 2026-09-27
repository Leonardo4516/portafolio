import { motion } from 'framer-motion'
import { Server, Database, Bot } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  const pillarIcons = [Server, Database, Bot]
  const pillarColors = [
    { bg: 'from-red-600 to-rose-900', border: 'border-red-500/30' },
    { bg: 'from-rose-600 to-red-950', border: 'border-red-500/30' },
    { bg: 'from-red-700 to-neutral-900', border: 'border-red-500/30' }
  ]

  return (
    <section id="sobre-mi" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
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

        {/* Code snippet reflecting realistic developer profile */}
        <div className="bg-black/90 border border-neutral-800 hover:border-red-500/30 transition-colors rounded-2xl p-5 sm:p-7 font-mono text-xs sm:text-sm text-neutral-300 backdrop-blur-md shadow-2xl overflow-x-auto">
          <div className="flex items-center gap-2 mb-4 border-b border-neutral-800/80 pb-3">
            <div className="w-3 h-3 rounded-full bg-red-600/80"></div>
            <div className="w-3 h-3 rounded-full bg-rose-600/80"></div>
            <div className="w-3 h-3 rounded-full bg-neutral-600/80"></div>
            <span className="text-neutral-500 text-xs ml-2 font-mono">{t.about.codeSnippetTitle}</span>
          </div>
          <div className="space-y-1 text-neutral-400 font-mono">
            <p><span className="text-red-400">class</span> <span className="text-rose-300">JuniorSoftwareDeveloper</span>:</p>
            <p className="pl-4"><span className="text-red-400">def</span> <span className="text-red-300">__init__</span>(self):</p>
            <p className="pl-8 text-neutral-300">self.name = <span className="text-rose-400">"Leonardo Hernández"</span></p>
            <p className="pl-8 text-neutral-300">self.education = <span className="text-rose-400">"Técnico en Desarrollo de Software"</span></p>
            <p className="pl-8 text-neutral-300">self.focus = [<span className="text-red-400">"Java"</span>, <span className="text-red-400">"PostgreSQL"</span>, <span className="text-red-400">"MySQL"</span>, <span className="text-red-400">"Docker"</span>]</p>
            <p className="pl-8 text-neutral-300">self.ai_skills = [<span className="text-red-400">"Prompt Engineering"</span>, <span className="text-red-400">"Agentic Workflows"</span>, <span className="text-red-400">"n8n"</span>]</p>
            <p className="pl-4"><span className="text-red-400">def</span> <span className="text-red-300">solve_problem</span>(self, task):</p>
            <p className="pl-8 text-red-400">return <span className="text-neutral-300">self.apply_clean_code(task, assisted_by_ai=<span className="text-rose-400">True</span>)</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}
