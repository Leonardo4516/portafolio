import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Bot, Database, Server, Cpu, Globe } from 'lucide-react'
import { GithubIcon } from './Icons'

const PROJECTS = [
  {
    id: 'chatbot-gestor-pedidos',
    title: 'CafExpress // Bot & Automatización n8n',
    category: 'ai',
    subtitle: 'Bot de Telegram con sincronización bidireccional en Google Sheets',
    desc: 'Sistema automatizado en n8n para digitalizar el ciclo completo de pedidos institucionales vía Telegram Bot. Enrutamiento condicional con nodos de código JavaScript, persistencia en Google Sheets y motor de puntos de lealtad.',
    tags: ['n8n', 'Telegram Bot API', 'Google Sheets API', 'JavaScript', 'Webhooks'],
    github: 'https://github.com/Leonardo4516/chatbot-gestor-pedidos',
    demo: 'https://github.com/Leonardo4516/chatbot-gestor-pedidos/tree/main/Evidencias/Funcionamiento',
    icon: Bot,
    featured: true,
  },
  {
    id: 'volcado-datos-postgresql',
    title: 'ETL, Normalización & Calidad de Datos',
    category: 'backend',
    subtitle: 'Pipeline contenerizado en PostgreSQL 16 con Docker',
    desc: 'Pipeline integral de migración y normalización de datasets geográficos masivos (world_db). Resuelve dependencias circulares complejas de FK y restaura más de 700 registros con corrupción de codificación UTF-8.',
    tags: ['PostgreSQL 16', 'Docker Compose', 'pgAdmin 4', 'SQL Tuning', 'Data Quality'],
    github: 'https://github.com/Leonardo4516/volcado-datos-postgresql',
    demo: null,
    icon: Database,
    featured: true,
  },
  {
    id: 'f1-project',
    title: 'Simulador de F1 & Telemetría en Vivo',
    category: 'fullstack',
    subtitle: 'Java 17 con Arquitectura Hexagonal y APIs de Clima',
    desc: 'Simulador de carreras multi-auto y mini-juego arcade en Java 17. Conexión en tiempo real con API meteorológica (wttr.in), motor matemático de degradación de neumáticos y telemetría, con UI reactiva Swing/FlatLaf.',
    tags: ['Java 17', 'Arquitectura Hexagonal', 'REST API', 'Swing / FlatLaf', 'JUnit 5'],
    github: 'https://github.com/Leonardo4516/f1-project',
    demo: null,
    icon: Cpu,
    featured: true,
  },
  {
    id: 'acme-bank',
    title: 'Acme Bank // Portal Transaccional',
    category: 'fullstack',
    subtitle: 'Web transaccional en JS Vanilla & Web Components',
    desc: 'Plataforma bancaria de autogestión desarrollada en JavaScript Vanilla (ES6+) con Web Components nativos y 0 dependencias. Módulo de autenticación, validaciones en tiempo real y persistencia con Storage APIs.',
    tags: ['JavaScript ES6+', 'Web Components', 'HTML5', 'CSS3 Responsive', 'Storage API'],
    github: 'https://github.com/Leonardo4516/acme-bank',
    demo: 'https://auto-gestion-bancaria-acme.netlify.app',
    icon: Globe,
    featured: false,
  },
  {
    id: 'task-admin',
    title: 'Administrador de Tareas Kanban',
    category: 'backend',
    subtitle: 'Java 17, JDBC/MySQL y metodología Spec-Driven Development',
    desc: 'Sistema de productividad orientado a Product Owners. Arquitectura Hexagonal desacoplada por puertos y adaptadores, persistencia JDBC sobre MySQL/MariaDB y máquina de estados para el ciclo de vida de tareas.',
    tags: ['Java 17', 'MySQL', 'JDBC', 'Arquitectura Hexagonal', 'Kanban'],
    github: 'https://github.com/Leonardo4516/task-admin',
    demo: null,
    icon: Server,
    featured: false,
  },
  {
    id: 'pizzeria-piccolo',
    title: 'Don Piccolo // Base de Datos & Logística',
    category: 'backend',
    subtitle: 'Modelado relacional en MySQL con Triggers y Vistas',
    desc: 'Diseño relacional en MySQL para trazabilidad punta a punta de pedidos y domicilios. Triggers para descuento automático y reversión de stock, procedimientos almacenados y vistas analíticas de desempeño por zonas.',
    tags: ['MySQL', 'Triggers', 'Stored Procedures', 'Vistas Analíticas', 'Normalización 3NF'],
    github: 'https://github.com/Leonardo4516/pizzeria-piccolo',
    demo: null,
    icon: Database,
    featured: false,
  },
]

const CATEGORY_FILTERS = [
  { id: 'all', label: 'Todos los Proyectos' },
  { id: 'backend', label: 'Backend & Bases de Datos' },
  { id: 'ai', label: 'IA & Automatización (n8n)' },
  { id: 'fullstack', label: 'Full Stack & Software' },
]

export default function Projects() {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === filter)

  return (
    <section id="proyectos" className="py-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-4 py-1.5 rounded-full">
            04. // CASOS DE ESTUDIO & REPOSITORIOS
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-4 mb-4">
            Proyectos de <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent">Alto Impacto</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-400 text-sm sm:text-base font-sans">
            Desarrollos reales con arquitecturas limpias, persistencia de datos robusta y pipelines automatizados.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-[0_0_20px_rgba(0,243,255,0.4)]'
                  : 'bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filtered.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/90 hover:border-cyan-500/50 rounded-2xl p-7 flex flex-col justify-between group hover:shadow-[0_10px_40px_rgba(0,243,255,0.08)] transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center group-hover:border-cyan-400/50 group-hover:scale-105 transition-all">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      {item.featured && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          ★ DESTACADO
                        </span>
                      )}
                    </div>

                    <h3 className="font-mono font-bold text-xl text-slate-100 mb-1 group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-400/80 mb-3">{item.subtitle}</p>
                    <p className="text-slate-300/80 text-sm leading-relaxed mb-6 font-sans">
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-all font-semibold"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>Ver Código</span>
                      </a>

                      {item.demo && (
                        <a
                          href={item.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40 border border-cyan-500/20 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Demo en Vivo</span>
                        </a>
                      )}
                    </div>
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
