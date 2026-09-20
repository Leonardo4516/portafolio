import { motion } from 'framer-motion'
import { Bot, Cpu, Database, GitBranch, Zap, Layers } from 'lucide-react'

export default function About() {
  const pillars = [
    {
      icon: Database,
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      title: 'Arquitectura Backend & Datos',
      desc: 'Dominio de PostgreSQL y MySQL con Docker. Modelado de datos relacionales, normalización de datos geográficos y consultas de alto rendimiento con intervalos de tiempo y optimización indexada.'
    },
    {
      icon: Bot,
      color: 'from-purple-500 to-pink-600',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      title: 'Desarrollo Asistido por IA',
      desc: 'Integración activa de modelos de lenguaje en el ciclo de vida del software: diseño de prompts rigurosos, evaluación continua con herramientas como Promptfoo y creación de agentes autónomos para acelerar entregas.'
    },
    {
      icon: Zap,
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      title: 'Automatización & Chatbots',
      desc: 'Construcción de pipelines sin fricción mediante n8n, integrando mensajería instantánea, webhooks y bases de datos para automatizar flujos de pedidos, notificaciones y procesos comerciales.'
    }
  ]

  return (
    <section id="sobre-mi" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-4 py-1.5 rounded-full">
            02. // ENFOQUE Y FILOSOFÍA
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-4 mb-4">
            Potenciando el Backend con <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Inteligencia Artificial</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base font-sans">
            No utilizo la IA como un simple buscador, sino como un copiloto de ingeniería sistemático para auditar seguridad, diseñar edge-cases, acelerar prototipado y mantener estándares de código impecables.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {pillars.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className={`relative bg-slate-900/60 backdrop-blur-xl border ${item.borderColor} p-8 rounded-2xl group hover:shadow-[0_10px_35px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} p-2.5 flex items-center justify-center text-slate-950 mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <item.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3 font-mono">
                {item.title}
              </h3>
              <p className="text-slate-300/80 text-sm leading-relaxed font-sans">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Philosophy Terminal snippet */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 font-mono text-xs sm:text-sm text-slate-300 backdrop-blur-md shadow-2xl overflow-x-auto">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-800/80 pb-3">
            <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
            <span className="text-slate-500 text-xs ml-2 font-mono">ai_workflow_pipeline.py</span>
          </div>
          <div className="space-y-1 text-slate-400">
            <p><span className="text-purple-400">class</span> <span className="text-cyan-300">SoftwareEngineer</span>:</p>
            <p className="pl-4"><span className="text-purple-400">def</span> <span className="text-blue-400">__init__</span>(self):</p>
            <p className="pl-8 text-slate-300">self.name = <span className="text-emerald-400">"Leonardo Hernández"</span></p>
            <p className="pl-8 text-slate-300">self.core_stack = [<span className="text-emerald-400">"Python"</span>, <span className="text-emerald-400">"Node.js"</span>, <span className="text-emerald-400">"PostgreSQL"</span>, <span className="text-emerald-400">"Docker"</span>]</p>
            <p className="pl-8 text-slate-300">self.ai_augmentation = [<span className="text-emerald-400">"n8n Automation"</span>, <span className="text-emerald-400">"Promptfoo"</span>, <span className="text-emerald-400">"Agentic AI Workflows"</span>]</p>
            <p className="pl-4"><span className="text-purple-400">def</span> <span className="text-blue-400">deliver_value</span>(self, problem):</p>
            <p className="pl-8 text-cyan-300">return <span className="text-slate-300">self.synthesize(problem, speed=<span className="text-amber-400">"10x"</span>, reliability=<span className="text-emerald-400">"enterprise"</span>)</span></p>
          </div>
        </div>
      </div>
    </section>
  )
}
