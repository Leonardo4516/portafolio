import { motion } from 'framer-motion'
import { Server, Database, Bot } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function About() {
  const { t } = useLanguage()

  const pillarIcons = [Server, Database, Bot]
  const pillarColors = [
    { bg: 'from-cyan-500 to-blue-600', border: 'border-cyan-500/30' },
    { bg: 'from-purple-500 to-pink-600', border: 'border-purple-500/30' },
    { bg: 'from-emerald-500 to-teal-600', border: 'border-emerald-500/30' }
  ]

  return (
    <section id="sobre-mi" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-4 py-1.5 rounded-full inline-block">
            {t.about.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 mt-4 mb-4">
            {t.about.title} <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{t.about.titleHighlight}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-xs sm:text-sm md:text-base font-sans leading-relaxed">
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
                className={`relative bg-slate-900/60 backdrop-blur-xl border ${color.border} p-6 sm:p-8 rounded-2xl group hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color.bg} p-2.5 flex items-center justify-center text-slate-950 mb-5 shadow-lg group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-3 font-mono">
                  {item.title}
                </h3>
                <p className="text-slate-300/80 text-xs sm:text-sm leading-relaxed font-sans">
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Code snippet reflecting realistic developer profile */}
        <div className="bg-slate-950/85 border border-slate-800 rounded-2xl p-5 sm:p-7 font-mono text-xs sm:text-sm text-slate-300 backdrop-blur-md shadow-2xl overflow-x-auto">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800/80 pb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="text-slate-500 text-xs ml-2 font-mono">{t.about.codeSnippetTitle}</span>
          </div>
          <div className="space-y-1 text-slate-400 font-mono">
            <p><span className="text-purple-400">class</span> <span className="text-cyan-300">JuniorSoftwareDeveloper</span>:</p>
            <p className="pl-4"><span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(self):</p>
            <p className="pl-8 text-slate-300">self.name = <span className="text-emerald-400">"Leonardo Hernández"</span></p>
            <p className="pl-8 text-slate-300">self.education = <span className="text-emerald-400">"Técnico en Desarrollo de Software"</span></p>
            <p className="pl-8 text-slate-300">self.focus = [<span className="text-emerald-400">"Java"</span>, <span className="text-emerald-400">"PostgreSQL"</span>, <span className="text-emerald-400">"MySQL"</span>, <span className="text-emerald-400">"Docker"</span>]</p>
            <p className="pl-8 text-slate-300">self.ai_skills = [<span className="text-emerald-400">"Prompt Engineering"</span>, <span className="text-emerald-400">"Agentic Workflows"</span>, <span className="text-emerald-400">"n8n"</span>]</p>
            <p className="pl-4"><span className="text-purple-400">def</span> <span className="text-blue-400">solve_problem</span>(self, task):</p>
            <p className="pl-8 text-cyan-300">return <span className="text-slate-300">self.apply_clean_code(task, assisted_by_ai=<span className="text-amber-400">True</span>)</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}
