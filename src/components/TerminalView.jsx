import { useState, useRef, useEffect } from 'react'
import { Terminal, CornerDownLeft } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function TerminalView() {
  const { language, t } = useLanguage()

  const initialHistory = [
    { type: 'system', content: t.terminal.initialMsg1 },
    { type: 'system', content: t.terminal.initialMsg2 },
  ]

  const [history, setHistory] = useState(initialHistory)
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    setHistory([
      { type: 'system', content: t.terminal.initialMsg1 },
      { type: 'system', content: t.terminal.initialMsg2 },
    ])
  }, [language, t])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const executeCommand = (cmdStr) => {
    const cleanCmd = cmdStr.trim().toLowerCase()
    if (!cleanCmd) return

    const newHistory = [...history, { type: 'user', content: `$ ${cmdStr}` }]

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: language === 'es' ? `Comandos disponibles:
  • about     : Perfil profesional y formación técnica
  • skills    : Matriz de competencias según nivel (Básico/Intermedio/Avanzado)
  • projects  : Proyectos destacados (SICA, F1, Kanban, PostgreSQL, n8n)
  • contact   : Enlaces directos de contacto
  • clear     : Limpiar consola`
          : `Available commands:
  • about     : Professional background & technical education
  • skills    : Competency matrix by level (Basic/Intermediate/Advanced)
  • projects  : Featured projects (SICA, F1, Kanban, PostgreSQL, n8n)
  • contact   : Direct contact links
  • clear     : Clear console screen`
        })
        break

      case 'about':
        newHistory.push({
          type: 'output',
          content: language === 'es' ? `LEONARDO HERNÁNDEZ // DESARROLLADOR DE SOFTWARE JUNIOR
------------------------------------------------------
• Formación : Técnico en Desarrollo de Software
• Enfoque   : Backend con Java, bases de datos SQL y lógica estructurada
• Valor     : Buenas prácticas, persistencia relacional y uso ágil de IA como copiloto.`
          : `LEONARDO HERNÁNDEZ // JUNIOR SOFTWARE DEVELOPER
------------------------------------------------------
• Education : Associate Degree / Technician in Software Development
• Focus     : Java Backend, SQL databases, and structured object-oriented logic
• Value     : Solid fundamentals, clean persistence, and agile AI-assisted workflow.`
        })
        break

      case 'skills':
        newHistory.push({
          type: 'output',
          content: language === 'es' ? `MATRIZ DE HABILIDADES TÉCNICAS:
  [Avanzado]    Prompt Engineering, Agentic AI Workflows
  [Intermedio]  Java (17+), PostgreSQL, MySQL, Python, Docker, Git/GitHub, HTML/CSS, Copilot
  [Básico]      JavaScript, Node.js, n8n Automation, Promptfoo, Linux/Bash`
          : `TECHNICAL COMPETENCY MATRIX:
  [Advanced]    Prompt Engineering, Agentic AI Workflows
  [Intermediate] Java (17+), PostgreSQL, MySQL, Python, Docker, Git/GitHub, HTML/CSS, Copilot
  [Basic]       JavaScript, Node.js, n8n Automation, Promptfoo, Linux/Bash`
        })
        break

      case 'projects':
        newHistory.push({
          type: 'output',
          content: language === 'es' ? `PROYECTOS DESTACADOS:
  1. SICA (Sistema de Control de Acceso) : Java 17, JavaFX, PostgreSQL 15, Docker, RBAC, JUnit.
  2. Simulador F1 & Telemetría           : Java 17, Arquitectura Hexagonal, API wttr.in.
  3. Gestor de Tareas Kanban             : Java 17, JDBC/MySQL, SDD, puertos y adaptadores.
  4. ETL & Normalización PostgreSQL       : PostgreSQL 16, Docker Compose, 3NF, data cleaning.
  5. CafExpress (Bot n8n)                : Telegram Bot API, n8n, Google Sheets, JavaScript.
  6. Acme Bank                           : JavaScript Vanilla, Web Components, Netlify.`
          : `FEATURED PROJECTS:
  1. SICA (Access Control System)        : Java 17, JavaFX, PostgreSQL 15, Docker, RBAC, JUnit.
  2. F1 Simulator & Telemetry            : Java 17, Hexagonal Architecture, live weather API.
  3. Kanban Task Manager (SDD)           : Java 17, JDBC/MySQL, ports & adapters.
  4. ETL & Data Quality Pipeline         : PostgreSQL 16, Docker Compose, 3NF, UTF-8 recovery.
  5. CafExpress (n8n Order Bot)          : Telegram Bot API, n8n, Google Sheets, JavaScript.
  6. Acme Bank                           : Vanilla JavaScript, Web Components, Netlify.`
        })
        break

      case 'contact':
        newHistory.push({
          type: 'output',
          content: `CONTACT CHANNELS:
  • Email     : lehernan.07@gmail.com
  • GitHub    : https://github.com/Leonardo4516
  • LinkedIn  : https://www.linkedin.com/in/leonardo-hernández-2a6a66389`
        })
        break

      case 'clear':
        setHistory(initialHistory)
        setInput('')
        return

      default:
        newHistory.push({
          type: 'error',
          content: language === 'es' 
            ? `Comando no reconocido: "${cleanCmd}". Escribe "help" para ver las opciones.`
            : `Command not found: "${cleanCmd}". Type "help" to see available options.`
        })
        break
    }

    setHistory(newHistory)
    setInput('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    executeCommand(input)
  }

  return (
    <section id="terminal" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-red-400 bg-red-950/40 border border-red-500/30 px-4 py-1.5 rounded-full inline-block">
            {t.terminal.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 mt-4 mb-3 font-mono">
            {t.terminal.title} <span className="text-red-500">{t.terminal.titleHighlight}</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm font-sans max-w-xl mx-auto leading-relaxed">
            {t.terminal.desc}
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl border border-neutral-800 bg-black/90 shadow-[0_0_50px_rgba(239,68,68,0.15)] backdrop-blur-2xl overflow-hidden font-mono text-sm">
          {/* Title Bar */}
          <div className="bg-neutral-950 px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600/80"></div>
              <div className="w-3 h-3 rounded-full bg-rose-600/80"></div>
              <div className="w-3 h-3 rounded-full bg-neutral-700"></div>
              <span className="text-neutral-400 text-xs ml-2 font-mono flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-red-400" />
                {t.terminal.headerText}
              </span>
            </div>
            <span className="text-[11px] text-neutral-500 font-mono">bash 5.2</span>
          </div>

          {/* Console Body */}
          <div className="p-5 sm:p-6 max-h-[380px] min-h-[260px] overflow-y-auto space-y-3 font-mono text-xs sm:text-sm">
            {history.map((item, index) => (
              <div key={index}>
                {item.type === 'system' && (
                  <p className="text-red-400/90">{item.content}</p>
                )}
                {item.type === 'user' && (
                  <p className="text-rose-300 font-semibold">{item.content}</p>
                )}
                {item.type === 'output' && (
                  <pre className="text-neutral-300 whitespace-pre-wrap leading-relaxed font-mono">{item.content}</pre>
                )}
                {item.type === 'error' && (
                  <p className="text-red-400 font-bold">{item.content}</p>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick command buttons */}
          <div className="px-4 sm:px-6 py-2.5 bg-neutral-950/60 border-t border-neutral-800/80 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-neutral-500 mr-1 text-[11px]">{t.terminal.quickAccessLabel}</span>
            {['about', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded-md bg-neutral-900 hover:bg-red-600 text-neutral-300 hover:text-white border border-neutral-800 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Command Prompt Input */}
          <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-neutral-950 border-t border-neutral-800 flex items-center gap-3">
            <span className="text-red-500 font-bold text-base">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.terminal.inputPlaceholder}
              className="flex-1 bg-transparent text-neutral-100 placeholder-neutral-600 focus:outline-none font-mono text-xs sm:text-sm"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors"
              title="Execute"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
