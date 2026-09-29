import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function TechStack() {
  const { language, t } = useLanguage()
  const [activeLevel, setActiveLevel] = useState('all')

  const skillsData = [
    // Avanzado
    {
      name: 'Prompt Engineering',
      level: 'advanced',
      levelLabel: language === 'es' ? 'Avanzado' : 'Advanced',
      tag: 'AI Core',
      desc: language === 'es' 
        ? 'Diseño riguroso de prompts estructurados (zero-shot, few-shot, chain-of-thought) con delimitadores, restricciones y formateo determinista.'
        : 'Rigorous prompt engineering (zero-shot, few-shot, chain-of-thought) with explicit delimiters, constraints, and deterministic outputs.'
    },
    {
      name: 'Agentic AI Workflows',
      level: 'advanced',
      levelLabel: language === 'es' ? 'Avanzado' : 'Advanced',
      tag: 'Autonomous AI',
      desc: language === 'es'
        ? 'Diseño de flujos agénticos donde modelos de lenguaje analizan, planifican y ejecutan tareas de desarrollo e investigación paso a paso.'
        : 'Designing agentic workflows where language models plan, research, and execute multi-step engineering tasks iteratively.'
    },

    // Intermedio
    {
      name: 'Java (Java 17+)',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'Backend Core',
      desc: language === 'es'
        ? 'Principios SOLID, Arquitectura Hexagonal, patrones de diseño (State, Factory, Strategy) y pruebas automatizadas con JUnit.'
        : 'SOLID principles, Hexagonal Architecture, design patterns (State, Factory, Strategy), and automated testing with JUnit.'
    },
    {
      name: 'PostgreSQL',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'Database',
      desc: language === 'es'
        ? 'Modelado relacional, consultas de fechas e intervalos, migraciones, normalización y entornos contenerizados con Docker.'
        : 'Relational modeling, date/interval queries, data migrations, normalization, and containerized Docker environments.'
    },
    {
      name: 'MySQL / MariaDB',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'Database',
      desc: language === 'es'
        ? 'Diseño de esquemas relacionales, triggers de control de inventario, procedimientos almacenados y vistas analíticas.'
        : 'Relational schema design, inventory triggers, stored procedures, and analytical views.'
    },
    {
      name: 'Python',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'Language',
      desc: language === 'es'
        ? 'Programación orientada a objetos, scripts de gestión de herramientas, persistencia en JSON y automatización.'
        : 'Object-oriented programming, tool management scripts, JSON persistence, and system automation.'
    },
    {
      name: 'Docker & Docker Compose',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'DevOps',
      desc: language === 'es'
        ? 'Contenerización de bases de datos relacionales (PostgreSQL/MySQL), volúmenes persistentes y redes aisladas para desarrollo.'
        : 'Containerization of relational databases (PostgreSQL/MySQL), persistent volumes, and isolated local networks.'
    },
    {
      name: 'GitHub Copilot & AI IDEs',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'Tooling',
      desc: language === 'es'
        ? 'Integración en el flujo de trabajo para acelerar la escritura de código repetitivo, refactorización y depuración guiada.'
        : 'Integration into daily workflow for boilerplate acceleration, guided refactoring, and contextual debugging.'
    },
    {
      name: 'Git & GitHub',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'VCS',
      desc: language === 'es'
        ? 'Control de versiones, flujo de ramas, resolución de merge conflicts, commits descriptivos y GitHub Actions básicos.'
        : 'Version control, branch management, merge conflict resolution, descriptive commits, and basic GitHub Actions.'
    },
    {
      name: 'HTML5 & CSS3',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'Web Base',
      desc: language === 'es'
        ? 'Estructura semántica del DOM, accesibilidad básica (a11y), maquetación con Flexbox y CSS Grid responsivo.'
        : 'Semantic DOM structure, basic accessibility (a11y), responsive layouts using Flexbox and CSS Grid.'
    },

    // Básico
    {
      name: 'JavaScript (ES6+)',
      level: 'basic',
      levelLabel: language === 'es' ? 'Básico' : 'Basic',
      tag: 'Language',
      desc: language === 'es'
        ? 'Manipulación nativa del DOM, Web Components, promesas, async/await y consumo de endpoints REST.'
        : 'Native DOM manipulation, Web Components, promises, async/await, and REST endpoint consumption.'
    },
    {
      name: 'Node.js',
      level: 'basic',
      levelLabel: language === 'es' ? 'Básico' : 'Basic',
      tag: 'Runtime',
      desc: language === 'es'
        ? 'Ejecución de scripts, uso de módulos npm, estructuras básicas de backend y manejo asíncrono.'
        : 'Script execution, npm module management, basic backend structures, and asynchronous flow.'
    },
    {
      name: 'n8n Workflow Automation',
      level: 'basic',
      levelLabel: language === 'es' ? 'Básico' : 'Basic',
      tag: 'Automation',
      desc: language === 'es'
        ? 'Creación de flujos sin servidor, nodos de código JS para transformación de datos y webhooks con Telegram y Google Sheets.'
        : 'Serverless workflow creation, JS code nodes for data transformation, and webhook integrations with Telegram and Google Sheets.'
    },
    {
      name: 'Promptfoo',
      level: 'basic',
      levelLabel: language === 'es' ? 'Básico' : 'Basic',
      tag: 'Testing AI',
      desc: language === 'es'
        ? 'Configuración básica de benchmarks y casos de prueba para validar que los modelos de lenguaje devuelvan respuestas válidas.'
        : 'Basic benchmark configuration and test cases to validate that language models output compliant responses.'
    },
    {
      name: 'Linux / Bash',
      level: 'basic',
      levelLabel: language === 'es' ? 'Básico' : 'Basic',
      tag: 'OS & CLI',
      desc: language === 'es'
        ? 'Navegación en consola, permisos de archivos, instalación de paquetes y ejecución de scripts shell básicos.'
        : 'Command-line navigation, file permissions, package installation, and execution of basic shell scripts.'
    }
  ]

  const levelFilters = [
    { id: 'all', label: language === 'es' ? 'Todas' : 'All' },
    { id: 'advanced', label: language === 'es' ? 'Avanzado' : 'Advanced' },
    { id: 'intermediate', label: language === 'es' ? 'Intermedio' : 'Intermediate' },
    { id: 'basic', label: language === 'es' ? 'Básico' : 'Basic' }
  ]

  const filteredSkills = activeLevel === 'all'
    ? skillsData
    : skillsData.filter(s => s.level === activeLevel)

  return (
    <section id="stack" className="py-24 px-4 sm:px-6 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-red-400 bg-red-950/40 border border-red-500/30 px-4 py-1.5 rounded-full inline-block">
            {t.skills.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 mt-4 mb-4">
            {t.skills.title} <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text text-transparent">{t.skills.titleHighlight}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-400 text-xs sm:text-sm md:text-base font-sans leading-relaxed">
            {t.skills.desc}
          </p>
        </div>

        {/* Level Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {levelFilters.map((tab) => {
            const isActive = activeLevel === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveLevel(tab.id)}
                className={`px-4 py-2 rounded-xl font-mono text-xs sm:text-sm transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-900 border border-red-500 text-red-300 shadow-[0_0_20px_rgba(239,68,68,0.3)] font-bold'
                    : 'bg-neutral-950/60 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Skills Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {filteredSkills.map((skill) => {
              const badgeStyle = 
                skill.level === 'advanced'
                  ? 'bg-red-500/20 text-red-300 border-red-500/40'
                  : skill.level === 'intermediate'
                  ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                  : 'bg-neutral-900 text-neutral-300 border-neutral-800'

              const levelCount = skill.level === 'advanced' ? 3 : skill.level === 'intermediate' ? 2 : 1

              return (
                <motion.div
                  layout
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="bg-neutral-950/60 backdrop-blur-xl border border-neutral-800/80 hover:border-red-500/50 p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(239,68,68,0.15)] group hover:-translate-y-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-mono font-bold text-base sm:text-lg text-neutral-100 group-hover:text-red-400 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-neutral-400 shrink-0">
                        {skill.tag}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4 font-sans">
                      {skill.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-1.5">
                      <span className="text-neutral-500 mr-1">{t.skills.levelLabel}</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3].map((step) => (
                          <div
                            key={step}
                            className={`w-2.5 h-1.5 rounded-sm transition-all ${
                              step <= levelCount
                                ? skill.level === 'advanced'
                                  ? 'bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]'
                                  : skill.level === 'intermediate'
                                  ? 'bg-rose-500'
                                  : 'bg-neutral-400'
                                : 'bg-neutral-800'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${badgeStyle}`}>
                      {skill.levelLabel}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
