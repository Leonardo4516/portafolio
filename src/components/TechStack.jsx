import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../context/LanguageContext'

export default function TechStack() {
  const { language, t } = useLanguage()
  const [activeLevel, setActiveLevel] = useState('all')

  const skillsData = [
    // Backend & Bases de Datos Core
    {
      name: 'Java (Java 17 / 21 LTS)',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'Backend Core',
      desc: language === 'es'
        ? 'Principios SOLID, Arquitectura Hexagonal / DDD, patrones de diseño (State, Factory, Strategy) y pruebas automatizadas con JUnit 5.'
        : 'SOLID principles, Hexagonal / DDD Architecture, design patterns (State, Factory, Strategy), and automated testing with JUnit 5.'
    },
    {
      name: 'Spring Boot 3 & Spring Security 6',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'Framework Core',
      desc: language === 'es'
        ? 'APIs RESTful multi-módulo desacopladas, autenticación stateless con JWT, control de acceso por roles (RBAC) y migraciones con Flyway.'
        : 'Decoupled multi-module RESTful APIs, stateless JWT authentication, Role-Based Access Control (RBAC), and Flyway database migrations.'
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
      name: 'Docker & Docker Compose',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'DevOps',
      desc: language === 'es'
        ? 'Contenerización de bases de datos relacionales (PostgreSQL/MySQL), volúmenes persistentes y redes aisladas para desarrollo.'
        : 'Containerization of relational databases (PostgreSQL/MySQL), persistent volumes, and isolated local networks.'
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

    // Inteligencia Artificial & Automatización
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

    // Lenguajes & Ecosistema
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
      name: 'Git & GitHub',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'VCS',
      desc: language === 'es'
        ? 'Control de versiones, flujo de ramas, resolución de merge conflicts, commits descriptivos y GitHub Actions básicos.'
        : 'Version control, branch management, merge conflict resolution, descriptive commits, and basic GitHub Actions.'
    },
    {
      name: 'Linux / Bash',
      level: 'basic',
      levelLabel: language === 'es' ? 'Básico' : 'Basic',
      tag: 'OS & CLI',
      desc: language === 'es'
        ? 'Navegación en consola, permisos de archivos, instalación de paquetes y ejecución de scripts shell básicos.'
        : 'Command-line navigation, file permissions, package installation, and execution of basic shell scripts.'
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
      name: 'GitHub Copilot & AI IDEs',
      level: 'intermediate',
      levelLabel: language === 'es' ? 'Intermedio' : 'Intermediate',
      tag: 'Tooling',
      desc: language === 'es'
        ? 'Integración en el flujo de trabajo para acelerar la escritura de código repetitivo, refactorización y depuración guiada.'
        : 'Integration into daily workflow for boilerplate acceleration, guided refactoring, and contextual debugging.'
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
      name: 'JavaScript (ES6+)',
      level: 'basic',
      levelLabel: language === 'es' ? 'Básico' : 'Basic',
      tag: 'Language',
      desc: language === 'es'
        ? 'Manipulación nativa del DOM, Web Components, promesas, async/await y consumo de endpoints REST.'
        : 'Native DOM manipulation, Web Components, promises, async/await, and REST endpoint consumption.'
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
    {
      name: 'Node.js',
      level: 'basic',
      levelLabel: language === 'es' ? 'Básico' : 'Basic',
      tag: 'Runtime',
      desc: language === 'es'
        ? 'Ejecución de scripts, uso de módulos npm, estructuras básicas de backend y manejo asíncrono.'
        : 'Script execution, npm module management, basic backend structures, and asynchronous flow.'
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
    <section id="stack" className="py-28 px-5 sm:px-8 relative z-10 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* El planeta azul con anillo de esta sección está a la derecha: el texto va a la izquierda */}
        <div className="lg:w-[56%] sobre-espacio">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">{t.skills.tag}</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4 mb-5">
            {t.skills.title} <span className="text-violet-300">{t.skills.titleHighlight}</span>
          </h2>
          <p className="text-neutral-200 text-base leading-relaxed max-w-xl">{t.skills.desc}</p>

          {/* Filtro por nivel como texto */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-10 border-b border-white/10">
            {levelFilters.map((tab) => {
              const isActive = activeLevel === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveLevel(tab.id)}
                  className={`relative pb-3 font-mono text-sm transition-colors cursor-pointer ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <motion.span layoutId="filtroNivel" className="absolute left-0 right-0 -bottom-px h-px bg-violet-400" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Lista de habilidades */}
          <motion.ul layout>
            <AnimatePresence initial={false}>
              {filteredSkills.map((skill) => (
                <motion.li
                  layout
                  key={skill.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="py-5 border-b border-white/10"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-lg sm:text-xl font-semibold text-white">{skill.name}</h3>
                    <p className="font-mono text-xs text-neutral-400">
                      {skill.tag}
                      <span className="mx-2">·</span>
                      <span className={skill.level === 'advanced' ? 'text-violet-300' : skill.level === 'intermediate' ? 'text-blue-300' : 'text-neutral-300'}>
                        {skill.levelLabel}
                      </span>
                    </p>
                  </div>
                  <p className="text-neutral-300 text-[15px] leading-relaxed mt-2">{skill.desc}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
