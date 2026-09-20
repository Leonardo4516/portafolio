import { useState } from 'react'
import { Mail, Copy, Check, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('lehernan.07@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contacto" className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-purple-950/40 border border-slate-800/80 rounded-3xl p-8 sm:p-14 text-center backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-4 py-1.5 rounded-full inline-block mb-6">
            06. // CONTACTO & COLABORACIÓN
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-100 mb-6 font-mono">
            ¿Listo para construir el <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">siguiente nivel</span>?
          </h2>

          <p className="max-w-xl mx-auto text-slate-400 text-sm sm:text-base leading-relaxed mb-10 font-sans">
            Estoy disponible para proyectos desafiantes en desarrollo backend, arquitectura de bases de datos o implementación de pipelines automatizados con Inteligencia Artificial.
          </p>

          {/* Contact Box */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <a
              href="mailto:lehernan.07@gmail.com"
              className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-sm tracking-wide shadow-[0_0_30px_rgba(0,243,255,0.3)] hover:shadow-[0_0_40px_rgba(0,243,255,0.5)] transition-all transform hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" />
              <span>Enviar un Correo</span>
            </a>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-6 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 text-slate-200 font-mono text-sm transition-all"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? '¡Email Copiado!' : 'Copiar: lehernan.07@gmail.com'}</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-8 border-t border-slate-800/80">
            <a
              href="https://github.com/Leonardo4516"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors font-mono text-xs"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="https://www.linkedin.com/in/leonardo-hernández-2a6a66389"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors font-mono text-xs"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="mailto:lehernan.07@gmail.com"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors font-mono text-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Gmail Directo</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
