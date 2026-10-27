import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExternalLink, 
  ShieldCheck, 
  Database, 
  Server, 
  Cpu, 
  Bot, 
  Globe, 
  Activity, 
  Wrench, 
  Play, 
  ChevronDown, 
  ChevronUp 
} from 'lucide-react'
import { GithubIcon } from './Icons'
import { useLanguage } from '../context/LanguageContext'
import VideoModal from './VideoModal'

export default function Projects() {
  const { language, t } = useLanguage()
  const [filter, setFilter] = useState('all')
  const [highlightedId, setHighlightedId] = useState(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [selectedVideoProject, setSelectedVideoProject] = useState(null)

  useEffect(() => {
    const handleHighlight = (e) => {
      const targetId = e.detail?.projectId
      if (!targetId) return

      setFilter('all')
      setShowAllProjects(true)
      setHighlightedId(targetId)

      setTimeout(() => {
        const el = document.getElementById(`project-${targetId}`)
        if (el) {
          const navHeight = 80
          const elementPosition = el.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - navHeight
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }, 150)

      const timer = setTimeout(() => {
        setHighlightedId(null)
      }, 3200)

      return () => clearTimeout(timer)
    }

    window.addEventListener('highlight-project', handleHighlight)
    return () => window.removeEventListener('highlight-project', handleHighlight)
  }, [])

  const projectsData = [
    {
      id: 'telemedicina-security',
      category: 'java',
      featured: true,
      icon: Activity,
      title: language === 'es' ? 'Telemedicina & Triaje Clínico IA' : 'Telemedicine & AI Clinical Triage',
      subtitle: language === 'es' ? 'Java 21, Spring Boot 3, DDD Multi-Módulo, Spring Security 6 & Flyway' : 'Java 21, Spring Boot 3, Multi-Module DDD, Spring Security 6 & Flyway',
      desc: language === 'es'
        ? 'Plataforma empresarial de salud mental y triaje clínico con IA. Arquitectura multi-módulo basada en Domain-Driven Design (DDD), autenticación stateless con Spring Security 6 y JWT (HMAC-SHA512), persistencia relacional con más de 35 tablas en PostgreSQL versionadas con Flyway (UUID y JSONB) y documentación OpenAPI 3 / Swagger.'
        : 'Enterprise mental health and AI clinical triage platform. Multi-module Domain-Driven Design (DDD) architecture, stateless authentication with Spring Security 6 and JWT (HMAC-SHA512), 35+ PostgreSQL relational tables versioned via Flyway (UUID and JSONB), and OpenAPI 3 / Swagger documentation.',
      tags: ['Java 21', 'Spring Boot 3', 'Spring Security 6', 'JWT', 'Flyway', 'PostgreSQL', 'DDD', 'Swagger'],
      github: 'https://github.com/Leonardo4516/telemedicina-security',
      demo: null,
      videoUrl: null,
      videoHighlights: language === 'es' ? [
        { title: "Seguridad JWT Stateless", desc: "Autenticación robusta con HMAC-SHA512, refresh tokens y roles RBAC (Admin, Profesional, Paciente)." },
        { title: "Triaje Clínico con IA", desc: "Evaluación interactiva de riesgo, toma de signos y categorización asistida en salud mental." },
        { title: "Flyway +35 Tablas", desc: "Evolución controlada de esquema PostgreSQL con UUIDs y mensajería en formato JSONB." }
      ] : [
        { title: "Stateless JWT Security", desc: "Robust authentication with HMAC-SHA512, refresh tokens, and RBAC roles (Admin, Provider, Patient)." },
        { title: "AI Clinical Triage", desc: "Interactive risk assessment, vital signs intake, and AI-assisted mental health classification." },
        { title: "Flyway 35+ Tables", desc: "Managed PostgreSQL relational schema evolution with UUID primary keys and JSONB messaging." }
      ]
    },
    {
      id: 'Proyecto_RentaHerramientas',
      category: 'java',
      featured: true,
      icon: Wrench,
      title: language === 'es' ? 'RentaTools // Marketplace de Maquinaria' : 'RentaTools // Machinery Marketplace',
      subtitle: language === 'es' ? 'Java 21, Spring Boot 3.4, DDD Hexagonal, PostgreSQL (4FN) & WebSockets' : 'Java 21, Spring Boot 3.4, Hexagonal DDD, 4NF PostgreSQL & WebSockets',
      desc: language === 'es'
        ? 'Marketplace B2B/B2C para alquiler, inspección y facturación de maquinaria pesada. Implementa arquitectura hexagonal DDD desacoplada, control de acceso por roles (RBAC: Admin, Proveedor, Cliente), base de datos en 4FN con Docker Compose, geolocalización interactiva con mapas y eventos en tiempo real con Spring WebSocket + STOMP.'
        : 'B2B/B2C marketplace for heavy machinery rental, inspection, and billing. Implements decoupled Hexagonal DDD architecture, Role-Based Access Control (RBAC: Admin, Provider, Client), 4NF normalized PostgreSQL stack via Docker Compose, interactive map geolocation, and real-time events via Spring WebSocket + STOMP.',
      tags: ['Java 21', 'Spring Boot 3.4', 'DDD Hexagonal', 'PostgreSQL (4FN)', 'WebSockets', 'Docker Compose', 'Spring Security'],
      github: 'https://github.com/Leonardo4516/Proyecto_RentaHerramientas',
      demo: null,
      videoUrl: null,
      videoHighlights: language === 'es' ? [
        { title: "Geolocalización en Mapa", desc: "Búsqueda interactiva de maquinaria pesada por proximidad geográfica con Leaflet.js." },
        { title: "Reserva Anti-Solapes", desc: "Algoritmo de disponibilidad temporal estricto para evitar colisiones de alquiler entre usuarios." },
        { title: "WebSockets & Factura PDF", desc: "Notificaciones en tiempo real al proveedor y generación automática de factura comercial." }
      ] : [
        { title: "Map-Based Geolocation", desc: "Interactive heavy machinery search filtered by proximity radius using Leaflet.js." },
        { title: "Non-Overlapping Booking", desc: "Strict temporal availability algorithm preventing multi-tenant booking collisions." },
        { title: "WebSockets & PDF Invoicing", desc: "Real-time alerts sent to providers via STOMP and automated commercial invoice generation." }
      ]
    },
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
      videoUrl: null,
      videoHighlights: language === 'es' ? [
        { title: "Terminal Garita JavaFX", desc: "Interfaz táctil de alta velocidad para validación vehicular y peatonal en tiempo real." },
        { title: "Control de Acceso RBAC", desc: "Permisos diferenciados por roles y registro de auditoría en base de datos PostgreSQL." },
        { title: "Entorno Dockerizado", desc: "Despliegue reproducible con persistencia y suites de pruebas automatizadas con JUnit 5." }
      ] : [
        { title: "JavaFX Gatehouse UI", desc: "High-speed touchscreen terminal for real-time vehicular and pedestrian credential validation." },
        { title: "RBAC Access Control", desc: "Role-differentiated permissions and automated audit logging directly in PostgreSQL." },
        { title: "Dockerized Stacks", desc: "Reproducible containerized deployment with volume persistence and JUnit 5 test suites." }
      ]
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
      videoUrl: null,
      videoHighlights: language === 'es' ? [
        { title: "Saneamiento UTF-8", desc: "Recuperación de más de 700 registros con corrupción de caracteres en datasets geográficos." },
        { title: "Normalización Estricta 3NF", desc: "Eliminación de dependencias circulares complejas entre tablas y claves foráneas." },
        { title: "Consultas de Alta Integridad", desc: "Vistas y procedimientos almacenados en PostgreSQL contenerizado con Docker Compose." }
      ] : [
        { title: "UTF-8 Data Sanitization", desc: "Recovery of 700+ corrupted character records in large-scale geographic datasets." },
        { title: "Strict 3NF Normalization", desc: "Resolution of complex circular foreign key dependencies into third normal form." },
        { title: "High-Integrity Queries", desc: "Analytical views and stored procedures executed in containerized PostgreSQL." }
      ]
    },
    {
      id: 'f1-project',
      category: 'java',
      featured: false,
      icon: Cpu,
      title: language === 'es' ? 'Simulador F1 & Motor de Telemetría' : 'F1 Simulator & Telemetry Engine',
      subtitle: language === 'es' ? 'Java 17 bajo Arquitectura Hexagonal y APIs de Clima' : 'Java 17 with Hexagonal Architecture and Live Weather API',
      desc: language === 'es'
        ? 'Simulador de carreras multi-vehículo y mini-juego arcade en Java 17. Consume datos en tiempo real de la API meteorológica (wttr.in), calcula telemetría matemática (desgaste de neumáticos, degradación, incidentes) y renderiza interfaz reactiva con Swing y FlatLaf Dark.'
        : 'Multi-vehicle racing simulator and arcade engine in Java 17. Integrates live external weather API (wttr.in), calculates physics telemetry (tire wear, pit stops, degradation), and renders responsive UI with Swing and FlatLaf.',
      tags: ['Java 17', 'Arquitectura Hexagonal', 'REST API', 'Swing / FlatLaf', 'JUnit 5', 'Maven'],
      github: 'https://github.com/Leonardo4516/f1-project',
      demo: null,
      videoUrl: null,
      videoHighlights: language === 'es' ? [
        { title: "Clima en Tiempo Real", desc: "Integración con API meteorológica externa para alterar la física y adherencia de pista." },
        { title: "Motor de Telemetría", desc: "Cálculo de degradación de compuestos, paradas en pits y incidentes de carrera en vivo." },
        { title: "Arquitectura Hexagonal", desc: "Desacoplamiento total del núcleo respecto a la interfaz visual Swing / FlatLaf Dark." }
      ] : [
        { title: "Live Meteorological API", desc: "External weather API integration dynamically modifying track grip and physics." },
        { title: "Telemetry Engine", desc: "Real-time calculation of tire degradation, pit stop strategies, and race incident dynamics." },
        { title: "Hexagonal Architecture", desc: "Decoupled domain core isolated from Swing / FlatLaf Dark presentation adapters." }
      ]
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
      videoUrl: '/videos/task_admin_demo.mp4',
      videoHighlights: language === 'es' ? [
        { title: "Metodología Formal SDD", desc: "Especificación formal de requisitos y contratos de datos previo a la programación Java." },
        { title: "Máquina de Estados Kanban", desc: "Ciclo de vida auditado de tareas con arrastre interactivo y validación de transiciones." },
        { title: "Persistencia JDBC Directa", desc: "Conexión relacional de alto rendimiento sobre motor de base de datos MySQL / MariaDB." }
      ] : [
        { title: "Formal SDD Methodology", desc: "Contract and requirement specifications finalized before writing Java and JDBC code." },
        { title: "Kanban State Machine", desc: "Audited task lifecycle state machine with interactive drag-and-drop transitions." },
        { title: "Direct JDBC Persistence", desc: "High-throughput relational persistence directly connected to MySQL / MariaDB." }
      ]
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
      videoUrl: null,
      videoHighlights: language === 'es' ? [
        { title: "Bot Telegram Interactivo", desc: "Catálogo conversacional con botones inline para pedidos comerciales sin intermediarios." },
        { title: "Orquestación en n8n", desc: "Manejo de flujos de eventos sin servidor y transformación de datos mediante nodos JavaScript." },
        { title: "Sincronización en Google Sheets", desc: "Registro inmediato de órdenes y cálculo automatizado de puntos de fidelización." }
      ] : [
        { title: "Interactive Telegram Bot", desc: "Conversational catalog with inline keyboard actions for direct zero-commission ordering." },
        { title: "n8n Serverless Workflows", desc: "Event-driven workflow orchestration and JSON data transformation via JavaScript nodes." },
        { title: "Google Sheets Cloud Sync", desc: "Immediate order ingestion and automated customer loyalty point calculations." }
      ]
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
      videoUrl: null,
      videoHighlights: language === 'es' ? [
        { title: "Cero Dependencias Externas", desc: "Plataforma construida en JavaScript Vanilla puro (ES6+) con Web Components nativos." },
        { title: "Validación de Saldo en Vivo", desc: "Control instantáneo de retiros, consignaciones y manejo de sesiones de usuario." },
        { title: "Extracto Dinámico", desc: "Actualización en tiempo real del historial de movimientos y persistencia Web Storage." }
      ] : [
        { title: "Zero Dependencies", desc: "Engineered with native JavaScript (ES6+) and reusable Web Components without frameworks." },
        { title: "Real-Time Balance Check", desc: "Instantaneous balance checks, withdrawals, deposits, and session security handling." },
        { title: "Dynamic Statement History", desc: "Live updating transaction history ledger persisted via the Web Storage API." }
      ]
    }
  ]

  const categoryFilters = [
    { id: 'all', label: t.projects.filters.all },
    { id: 'java', label: t.projects.filters.java },
    { id: 'data', label: t.projects.filters.data },
    { id: 'automation', label: t.projects.filters.automation },
  ]

  const categoryProjects = filter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === filter)

  // Curated showcase: in 'all' view, show top 4 initially unless user expands
  const displayedProjects = (filter === 'all' && !showAllProjects)
    ? categoryProjects.slice(0, 4)
    : categoryProjects

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
              onClick={() => {
                setFilter(cat.id)
                if (cat.id !== 'all') setShowAllProjects(true)
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono transition-colors duration-200 active:scale-[0.98] ${
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
            {displayedProjects.map((item) => {
              const Icon = item.icon
              const isHighlighted = highlightedId === item.id
              return (
                <motion.div
                  layout
                  key={item.id}
                  id={`project-${item.id}`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className={`bg-neutral-950/60 backdrop-blur-xl rounded-2xl p-6 sm:p-7 flex flex-col justify-between group transition-colors duration-200 scroll-mt-28 ${
                    isHighlighted
                      ? 'border-2 border-red-500 shadow-[0_0_50px_rgba(239,68,68,0.5)] ring-4 ring-red-500/20 -translate-y-1'
                      : 'border border-neutral-800/90 hover:border-red-500/50 hover:shadow-[0_10px_40px_rgba(239,68,68,0.12)] hover:-translate-y-1.5'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center group-hover:border-red-500/50 group-hover:scale-105 transition-transform duration-200">
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

                    {/* Twin Action Buttons: Ver Código & Ver Demo */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-neutral-800/80">
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 text-xs font-mono px-3.5 py-2.5 rounded-xl bg-neutral-900/90 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 hover:text-white transition-colors duration-200 active:scale-[0.98] font-semibold"
                      >
                        <GithubIcon className="w-4 h-4 text-red-400" />
                        <span>{t.projects.btnCode}</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => setSelectedVideoProject(item)}
                        className="flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-colors duration-200 active:scale-[0.98] shadow-[0_0_20px_rgba(239,68,68,0.3)] hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current text-white" />
                        <span>{t.projects.btnDemoVideo || "Ver Demo"}</span>
                      </button>

                      {item.demo && (
                        <a
                          href={item.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-1.5 text-xs font-mono px-3 py-2.5 rounded-xl text-neutral-400 hover:text-red-300 hover:bg-neutral-900/60 border border-neutral-800/80 transition-colors ml-auto"
                          title={t.projects.btnDemo}
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">{t.projects.btnDemo}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Progressive Expansion Toggle (Top 4 -> All 8) */}
        {filter === 'all' && projectsData.length > 4 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowAllProjects(!showAllProjects)}
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-neutral-950/80 hover:bg-neutral-900 border border-neutral-800 hover:border-red-500/50 text-neutral-200 hover:text-white font-mono text-xs sm:text-sm tracking-wide backdrop-blur-md transition-colors duration-200 active:scale-[0.98] shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:shadow-[0_0_25px_rgba(239,68,68,0.25)] cursor-pointer group"
            >
              {showAllProjects ? (
                <>
                  <span>{t.projects.btnShowLess}</span>
                  <ChevronUp className="w-4 h-4 text-red-400 group-hover:-translate-y-0.5 transition-transform" />
                </>
              ) : (
                <>
                  <span>{t.projects.btnShowMore.replace('{count}', projectsData.length - 4)}</span>
                  <ChevronDown className="w-4 h-4 text-red-400 group-hover:translate-y-0.5 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Video Demo Modal */}
      <VideoModal
        project={selectedVideoProject}
        onClose={() => setSelectedVideoProject(null)}
      />
    </section>
  )
}
