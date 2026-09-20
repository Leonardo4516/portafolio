import { useState, useRef, useEffect } from 'react'
import { Terminal, CornerDownLeft, Sparkles, Check, Copy } from 'lucide-react'

const INITIAL_HISTORY = [
  { type: 'system', content: 'Leonardo.AI Core Terminal v2.4.0 [x86_64-linux-gnu]' },
  { type: 'system', content: 'Escribe "help" para ver la lista de comandos disponibles, o pulsa un botón rápido.' },
]

export default function TerminalView() {
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const bottomRef = useRef(null)

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
          content: `Comandos disponibles:
  • about     : Resumen profesional y enfoque de ingeniería
  • skills    : Tecnologías primarias y secundarias
  • projects  : Lista de proyectos destacados en producción
  • ai        : Flujo de trabajo asistido por IA y automatización
  • contact   : Canales directos de comunicación
  • clear     : Limpiar la pantalla de la terminal`
        })
        break

      case 'about':
        newHistory.push({
          type: 'output',
          content: `LEONARDO HERNÁNDEZ // BACKEND & AI DEVELOPER
--------------------------------------------------
Desarrollador apasionado por el modelado de datos resiliente, arquitecturas
escalables y el uso estratégico de Inteligencia Artificial para acelerar
entregas y validar calidad de código a nivel enterprise.`
        })
        break

      case 'skills':
        newHistory.push({
          type: 'output',
          content: `STACK DE ESPECIALIDAD:
  [Backend]     Python, Node.js, PostgreSQL (Docker), MySQL, REST APIs
  [AI / Auto]   n8n, Prompt Engineering, Promptfoo, Agentic AI
  [DevOps]      Docker, Git/GitHub, Linux/Bash
  [Frontend]    JavaScript ES6+, React, Tailwind CSS`
        })
        break

      case 'projects':
        newHistory.push({
          type: 'output',
          content: `PROYECTOS DESTACADOS:
  1. volcado-datos-postgresql : Pipeline de normalización de datos geográficos con Docker.
  2. chatbot-gestor-pedidos   : Bot automatizado con n8n, Telegram y persistencia.
  3. f1-project               : Analítica y procesamiento de datos de Fórmula 1.
  4. acme-bank                : Simulación de transacciones y arquitectura bancaria.
  5. task-admin               : Sistema de gestión operativa con buenas prácticas.`
        })
        break

      case 'ai':
        newHistory.push({
          type: 'output',
          content: `FILOSOFÍA DE IA (AI-FIRST ENGINEERING):
  • Uso de LLMs como copiloto de arquitectura y generador de tests rigurosos.
  • Evaluación continua de prompts y respuestas mediante benchmarking.
  • Automatización de flujos repetitivos con n8n reduciendo tiempos en un 70%.`
        })
        break

      case 'contact':
        newHistory.push({
          type: 'output',
          content: `CANALES DE CONTACTO:
  • Email     : lehernan.07@gmail.com
  • GitHub    : https://github.com/Leonardo4516
  • LinkedIn  : https://www.linkedin.com/in/leonardo-hernández-2a6a66389`
        })
        break

      case 'clear':
        setHistory(INITIAL_HISTORY)
        setInput('')
        return

      default:
        newHistory.push({
          type: 'error',
          content: `Comando no reconocido: "${cleanCmd}". Escribe "help" para ver opciones válidas.`
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('lehernan.07@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="terminal" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-4 py-1.5 rounded-full">
            05. // TERMINAL INTERACTIVA
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mt-4 mb-3 font-mono">
            Explora mi perfil vía <span className="text-emerald-400">CLI</span>
          </h2>
          <p className="text-slate-400 text-sm font-sans max-w-xl mx-auto">
            Para reclutadores y desarrolladores técnicos: interactúa con mi perfil en tiempo real ejecutando comandos en esta consola simulada.
          </p>
        </div>

        {/* Terminal Window */}
        <div className="rounded-2xl border border-slate-700/80 bg-slate-950/90 shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl overflow-hidden font-mono text-sm">
          {/* Title Bar */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <span className="text-slate-400 text-xs ml-2 font-mono flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                leonardo@portfolio-core:~
              </span>
            </div>

            <button
              onClick={handleCopyEmail}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '¡Copiado!' : 'Copiar email'}</span>
            </button>
          </div>

          {/* Console Body */}
          <div className="p-6 max-h-[380px] min-h-[260px] overflow-y-auto space-y-3 font-mono text-xs sm:text-sm">
            {history.map((item, index) => (
              <div key={index}>
                {item.type === 'system' && (
                  <p className="text-cyan-400/80">{item.content}</p>
                )}
                {item.type === 'user' && (
                  <p className="text-purple-300 font-semibold">{item.content}</p>
                )}
                {item.type === 'output' && (
                  <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed">{item.content}</pre>
                )}
                {item.type === 'error' && (
                  <p className="text-rose-400">{item.content}</p>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Quick command pills */}
          <div className="px-6 py-2.5 bg-slate-900/40 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500 mr-1 text-[11px]">Accesos rápidos:</span>
            {['about', 'skills', 'projects', 'ai', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white border border-slate-700 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Command Prompt Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-slate-900/80 border-t border-slate-800 flex items-center gap-3">
            <span className="text-emerald-400 font-bold text-base">&gt;</span>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe un comando (ej: help, projects)..."
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none font-mono text-sm"
            />
            <button
              type="submit"
              className="p-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 transition-colors"
              title="Ejecutar"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
