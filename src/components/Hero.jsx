import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Terminal, Cpu, Database, ShieldCheck } from 'lucide-react'

const ROLES = [
  'Backend Developer',
  'AI-Augmented Programmer',
  'Prompt & Agents Architect',
  'Database & Workflow Engineer'
]

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIndex]
    let timer

    if (!isDeleting && displayText === current) {
      timer = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % ROLES.length)
    } else {
      const speed = isDeleting ? 40 : 80
      timer = setTimeout(() => {
        setDisplayText(current.substring(0, displayText.length + (isDeleting ? -1 : 1)))
      }, speed)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex])

  return (
    <section id="inicio" className="min-h-screen relative flex items-center justify-center pt-24 pb-16 px-6">
      <div className="max-w-5xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center flex flex-col items-center"
        >
          {/* Top pill badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6 backdrop-blur-md shadow-[0_0_25px_rgba(0,243,255,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>ARQUITECTURA DE SOFTWARE + INTELIGENCIA ARTIFICIAL</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
            <span className="block text-slate-100">Hola, soy</span>
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,243,255,0.25)]">
              Leonardo Hernández
            </span>
          </h1>

          {/* Typewriter role */}
          <div className="h-10 sm:h-12 flex items-center justify-center font-mono text-lg sm:text-2xl text-cyan-300/90 mb-8">
            <span className="text-purple-400 mr-2">&gt;</span>
            <span>{displayText}</span>
            <span className="w-2.5 h-6 bg-cyan-400 ml-1 inline-block animate-pulse"></span>
          </div>

          {/* Description */}
          <p className="max-w-2xl text-slate-300/80 text-base sm:text-lg leading-relaxed mb-10 font-sans">
            Especializado en construir sistemas backend robustos, pipelines de automatización con{' '}
            <span className="text-cyan-300 font-semibold">n8n</span> y flujos de trabajo acelerados con{' '}
            <span className="text-purple-300 font-semibold">Inteligencia Artificial</span> para entregar código de alto rendimiento y máxima calidad.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#proyectos"
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold font-mono text-sm tracking-wide shadow-[0_0_30px_rgba(0,243,255,0.35)] hover:shadow-[0_0_40px_rgba(0,243,255,0.6)] transition-all transform hover:-translate-y-0.5"
            >
              <span>Explorar Proyectos</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="#terminal"
              className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 hover:border-purple-500/50 text-slate-200 font-mono text-sm tracking-wide backdrop-blur-md transition-all shadow-[0_0_20px_rgba(188,19,254,0.1)] hover:shadow-[0_0_25px_rgba(188,19,254,0.25)]"
            >
              <Terminal className="w-4 h-4 text-purple-400" />
              <span>Abrir Consola Interactiva</span>
            </a>
          </div>

          {/* Micro stats banner */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 text-center">
              <Cpu className="w-5 h-5 text-cyan-400 mx-auto mb-1.5" />
              <div className="text-xl font-bold font-mono text-slate-100">+25</div>
              <div className="text-xs font-mono text-slate-400">Repositorios Creados</div>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 text-center">
              <Database className="w-5 h-5 text-purple-400 mx-auto mb-1.5" />
              <div className="text-xl font-bold font-mono text-slate-100">SQL & NoSQL</div>
              <div className="text-xs font-mono text-slate-400">PostgreSQL / MySQL</div>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 text-center">
              <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-1.5" />
              <div className="text-xl font-bold font-mono text-slate-100">AI-First</div>
              <div className="text-xs font-mono text-slate-400">Desarrollo Aumentado</div>
            </div>
            <div className="bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-xl p-4 text-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
              <div className="text-xl font-bold font-mono text-slate-100">Clean Code</div>
              <div className="text-xs font-mono text-slate-400">Patrones y Escalabilidad</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
