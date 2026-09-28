import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ShieldCheck, Database, Server, Cpu, Bot, Globe } from 'lucide-react'
import { GithubIcon } from './Icons'
import { useLanguage } from '../context/LanguageContext'

export default function Projects() {
  const { language, t } = useLanguage()
  const [filter, setFilter] = useState('all')

  const projectsData = [
    {
      id: 'sica-project',
      category: 'java',
      featured: true,
      icon: ShieldCheck,
      title: language === 'es' ? 'SICA // Sistema de Control de Acceso' : 'SICA // Access Control System',
      subtitle: language === 'es' ? 'Java 17, PostgreSQL, Docker Compose, RBAC y Patrones de Diseño' : 'Java 17, PostgreSQL, Docker Compose, RBAC & Design Patterns',
      desc: language === 'es'
        ? 'Sistema integral de seguridad y control de acceso vehicular y peatonal. Implementa arquitectura en capas, control de acceso basado en roles (RBAC), encriptación BCrypt, patrones de diseño (State, Factory, Strategy) y suites de pruebas automatizadas con JUnit.'
        : 'Enterprise access and security control system for personnel and vehicles. Features layered architecture, Role-Based Access Control (RBAC), BCrypt hashing, design patterns (State, Factory, Strategy), and automated JUnit test suites.',
      tags: ['Java 17', 'PostgreSQL 15', 'Docker Compose', 'JavaFX', 'BCrypt', 'JUnit 5', 'RBAC'],
      github: 'https://github.com/Leonardo4516/Sica_project',
      demo: null,
    },
    {
      id: 'f1-project',
      category: 'java',
      featured: true,
      icon: Cpu,
      title: language === 'es' ? 'Simulador F1 & Motor de Telemetría' : 'F1 Simulator & Telemetry Engine',
      subtitle: language === 'es' ? 'Java 17 bajo Arquitectura Hexagonal y APIs de Clima' : 'Java 17 with Hexagonal Architecture and Live Weather API',
      desc: language === 'es'
        ? 'Simulador de carreras multi-vehículo y mini-juego arcade en Java 17. Consume datos en tiempo real de la API meteorológica (wttr.in), calcula telemetría matemática (desgaste de neumáticos, degradación, incidentes) y renderiza interfaz reactiva con Swing y FlatLaf Dark.'
        : 'Multi-vehicle racing simulator and arcade engine in Java 17. Integrates live external weather API (wttr.in), calculates physics telemetry (tire wear, pit stops, degradation), and renders responsive UI with Swing and FlatLaf.',
      tags: ['Java 17', 'Arquitectura Hexagonal', 'REST API', 'Swing / FlatLaf', 'JUnit 5', 'Maven'],
      github: 'https://github.com/Leonardo4516/f1-project',
      demo: null,
    },
    {
      id: 'volcado-datos-postgresql',
      category: 'data',
      featured: true,
      icon: Database,
      title: language === 'es' ? 'ETL, Normalización & Calidad de Datos' : 'ETL, Normalization & Data Quality',
      subtitle: language === 'es' ? 'Pipeline contenerizado en PostgreSQL 16 con Docker' : 'Containerized Pipeline in PostgreSQL 16 with Docker',
      desc: language === 'es'
        ? 'Pipeline de migración, normalización 3NF y saneamiento de datasets masivos (world_db). Resuelve dependencias circulares complejas entre claves foráneas y restaura más de 700 registros con corrupción de codificación UTF-8.'
        : 'Database migration, 3NF normalization, and data sanitization pipeline for massive geographic datasets. Resolves circular foreign key dependencies and recovers 700+ records corrupted by UTF-8 encoding.',
      tags: ['PostgreSQL 16', 'Docker Compose', 'SQL DDL/DML', 'Data Quality', 'pgAdmin 4'],
      github: 'https://github.com/Leonardo4516/volcado-datos-postgresql',
      demo: null,
    },
    {
      id: 'task-admin',
      category: 'java',
      featured: false,
      icon: Server,
      title: language === 'es' ? 'Gestor de Tareas Kanban (SDD)' : 'Kanban Task Manager (SDD)',
      subtitle: language === 'es' ? 'Java 17, JDBC/MySQL y Arquitectura Hexagonal' : 'Java 17, JDBC/MySQL and Hexagonal Architecture',
      desc: language === 'es'
        ? 'Sistema de productividad orientado al rol de Product Owner bajo metodología Spec-Driven Development (SDD). Persistencia relacional directa con JDBC sobre MySQL/MariaDB, máquina de estados para el ciclo de vida de tareas y tablero Kanban.'
        : 'Productivity management system modeled for Product Owners under Spec-Driven Development (SDD). Direct relational persistence via JDBC on MySQL/MariaDB, state machine for task lifecycles, and interactive Kanban board.',
      tags: ['Java 17', 'MySQL', 'JDBC', 'Arquitectura Hexagonal', 'UML / SDD', 'FlatLaf'],
      github: 'https://github.com/Leonardo4516/task-admin',
      demo: null,
    },
    {
      id: 'chatbot-gestor-pedidos',
      category: 'automation',
      featured: false,
      icon: Bot,
      title: language === 'es' ? 'CafExpress // Bot & Automatización n8n' : 'CafExpress // Bot & n8n Automation',
      subtitle: language === 'es' ? 'Telegram Bot con sincronización en Google Sheets' : 'Telegram Bot with Google Sheets Synchronization',
      desc: language === 'es'
        ? 'Automatización sin servidor en n8n para digitalizar el ciclo completo de pedidos institucionales. Manejo de estados de sesión, nodos de código en JavaScript y persistencia en Google Sheets API con cálculo de puntos de fidelización.'
        : 'Serverless workflow in n8n automating orders via Telegram Bot. Session state management, JavaScript code nodes, and bi-directional Google Sheets API synchronization with customer loyalty points calculation.',
      tags: ['n8n', 'Telegram Bot API', 'Google Sheets API', 'JavaScript', 'Webhooks'],
      github: 'https://github.com/Leonardo4516/chatbot-gestor-pedidos',
      demo: 'https://github.com/Leonardo4516/chatbot-gestor-pedidos/tree/main/Evidencias/Funcionamiento',
    },
    {
      id: 'acme-bank',
      category: 'fullstack',
      featured: false,
      icon: Globe,
      title: language === 'es' ? 'Acme Bank // Portal Transaccional' : 'Acme Bank // Transactional Portal',
      subtitle: language === 'es' ? 'JavaScript Vanilla (ES6+) con Web Components' : 'Vanilla JavaScript (ES6+) with Web Components',
      desc: language === 'es'
        ? 'Plataforma web de autogestión bancaria desarrollada con 0 dependencias externas. Módulos de autenticación, control de sesiones, validaciones instantáneas para retiros/consignaciones y persistencia con Web Storage API.'
        : 'Transactional self-service banking web application built with zero external dependencies. Features authentication modules, session handling, real-time balance validation, and Web Storage API persistence.',
      tags: ['JavaScript ES6+', 'Web Components', 'HTML5', 'CSS3', 'Web Storage API'],
      github: 'https://github.com/Leonardo4516/acme-bank',
      demo: 'https://auto-gestion-bancaria-acme.netlify.app',
    }
  ]

  const categoryFilters = [
    { id: 'all', label: t.projects.filters.all },
    { id: 'java', label: t.projects.filters.java },
    { id: 'data', label: t.projects.filters.data },
    { id: 'automation', label: t.projects.filters.automation },
  ]

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === filter)

  return (
    <section id="proyectos" className="py-24 px-4 sm:px-6 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-red-400 bg-red-950/40 border border-red-500/30 px-4 py-1.5 rounded-full inline-block">
            {t.projects.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 mt-4 mb-4">
            {t.projects.title} <span className="bg-gradient-to-r from-red-500 via-rose-400 to-red-600 bg-clip-text text-transparent">{t.projects.titleHighlight}</span>
          </h2>
          <p className="max-w-2xl mx-auto text-neutral-400 text-xs sm:text-sm md:text-base font-sans leading-relaxed">
            {t.projects.desc}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          {categoryFilters.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-red-600 text-white font-bold shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                  : 'bg-neutral-950/60 hover:bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence>
            {filteredProjects.map((item) => {
              const Icon = item.icon
              return (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="bg-neutral-950/60 backdrop-blur-xl border border-neutral-800/90 hover:border-red-500/50 rounded-2xl p-6 sm:p-7 flex flex-col justify-between group hover:shadow-[0_10px_40px_rgba(239,68,68,0.12)] transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center group-hover:border-red-500/50 group-hover:scale-105 transition-all">
                        <Icon className="w-6 h-6 text-red-400" />
                      </div>
                      {item.featured && (
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-red-500/20 text-red-300 border border-red-500/30">
                          {t.projects.badgeFeatured}
                        </span>
                      )}
                    </div>

                    <h3 className="font-mono font-bold text-lg sm:text-xl text-neutral-100 mb-1 group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-red-400/90 mb-3">{item.subtitle}</p>
                    <p className="text-neutral-300/80 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                      {item.desc}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/5 border border-white/10 text-neutral-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-3 pt-4 border-t border-neutral-800/80">
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-lg bg-neutral-900 hover:bg-red-600 hover:text-white text-neutral-300 transition-all font-semibold"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>{t.projects.btnCode}</span>
                      </a>

                      {item.demo && (
                        <a
                          href={item.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/30 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{t.projects.btnDemo}</span>
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
