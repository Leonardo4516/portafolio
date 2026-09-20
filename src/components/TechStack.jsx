import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Server, Bot, Terminal, Code2, Database, Workflow, Cpu, Layers } from 'lucide-react'

const CATEGORIES = [
  { id: 'backend', label: 'Backend & Data', icon: Server },
  { id: 'ai', label: 'IA & Automatización', icon: Bot },
  { id: 'devops', label: 'DevOps & Herramientas', icon: Terminal },
  { id: 'frontend', label: 'Frontend & UI', icon: Code2 },
]

const SKILLS = {
  backend: [
    { name: 'Python', level: 'Avanzado', desc: 'Desarrollo de lógica backend, scripts de gestión y automatización.', tag: 'Language' },
    { name: 'PostgreSQL', level: 'Avanzado', desc: 'Consultas DateTime complejas, intervalos, normalización y tuning.', tag: 'Database' },
    { name: 'MySQL', level: 'Intermedio+', desc: 'Modelado relacional, constraints, vistas y optimización de esquemas.', tag: 'Database' },
    { name: 'Node.js', level: 'Intermedio+', desc: 'APIs RESTful, arquitectura modular y gestión asíncrona de I/O.', tag: 'Runtime' },
    { name: 'Arquitectura REST', level: 'Avanzado', desc: 'Diseño de endpoints consistentes, códigos de estado y serialización.', tag: 'Concept' },
    { name: 'Procesamiento de Datos', level: 'Avanzado', desc: 'Volcado, limpieza y validación de datasets estructurados.', tag: 'Data Engineering' }
  ],
  ai: [
    { name: 'Prompt Engineering', level: 'Avanzado', desc: 'Diseño de zero-shot, few-shot y chain-of-thought para código robusto.', tag: 'GenAI' },
    { name: 'n8n Workflow Automation', level: 'Avanzado', desc: 'Orquestación de bots, webhooks y automatización de procesos empresariales.', tag: 'Automation' },
    { name: 'Promptfoo', level: 'Intermedio+', desc: 'Testeo automatizado y benchmarking de salidas de modelos de IA.', tag: 'Testing AI' },
    { name: 'Agentic AI Workflows', level: 'Intermedio+', desc: 'Implementación de agentes que investigan, planifican y ejecutan tareas.', tag: 'Agents' },
    { name: 'GitHub Copilot & AI IDEs', level: 'Avanzado', desc: 'Flujo de trabajo de programación acelerado y refactorización inteligente.', tag: 'Productivity' }
  ],
  devops: [
    { name: 'Docker', level: 'Intermedio+', desc: 'Contenerización de bases de datos, redes locales y entornos aislados.', tag: 'Container' },
    { name: 'Git & GitHub', level: 'Avanzado', desc: 'Flujos colaborativos, git-flow, hooks, GitHub Actions y CI/CD básico.', tag: 'VCS' },
    { name: 'Linux / Bash', level: 'Intermedio+', desc: 'Manejo de terminal, scripts shell, permisos y administración básica.', tag: 'OS' },
    { name: 'Gestión de Paquetes', level: 'Avanzado', desc: 'npm, pip, yarn y configuración de dependencias limpias.', tag: 'Tools' }
  ],
  frontend: [
    { name: 'JavaScript ES6+', level: 'Avanzado', desc: 'Vanilla JS, manipulación avanzada de DOM, async/await y APIs nativas.', tag: 'Core' },
    { name: 'React.js', level: 'Intermedio', desc: 'Componentes funcionales, hooks, estado y consumo de APIs.', tag: 'Framework' },
    { name: 'HTML5 & CSS3', level: 'Avanzado', desc: 'HTML semántico, accesibilidad (a11y), CSS Grid y Flexbox responsivo.', tag: 'Web' },
    { name: 'Tailwind CSS', level: 'Avanzado', desc: 'Estilizado atómico, diseño responsivo y efectos visuales modernos.', tag: 'Styling' }
  ]
}

export default function TechStack() {
  const [activeTab, setActiveTab] = useState('backend')

  return (
    <section id="stack" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-950/40 border border-purple-500/20 px-4 py-1.5 rounded-full">
            03. // ARSENAL TÉCNICO
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-4 mb-4">
            Habilidades & <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Tecnologías</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base font-sans">
            Herramientas que domino para diseñar arquitecturas confiables, acelerar el ciclo de desarrollo y automatizar tareas operativas.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            const isActive = activeTab === cat.id
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-xs sm:text-sm transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,243,255,0.2)]'
                    : 'bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>

        {/* Skills Cards Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {SKILLS[activeTab].map((skill, index) => (
              <div
                key={index}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/80 hover:border-cyan-500/40 p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,243,255,0.1)] group hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-mono font-bold text-lg text-slate-100 group-hover:text-cyan-300 transition-colors">
                      {skill.name}
                    </h3>
                    <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-400">
                      {skill.tag}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                    {skill.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500">Nivel de dominio:</span>
                  <span className="text-cyan-400 font-semibold">{skill.level}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
