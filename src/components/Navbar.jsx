import { useState, useEffect } from 'react'
import { Terminal, Sparkles } from 'lucide-react'
import { GithubIcon } from './Icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-cyan-500/20 py-3 shadow-[0_4px_30px_rgba(0,243,255,0.07)]' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand */}
        <a href="#inicio" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center group-hover:bg-slate-900 transition-colors">
              <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <span className="font-mono font-bold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
              Leonardo.dev
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              AI Core Online
            </span>
          </div>
        </a>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-mono text-gray-300">
          <a href="#inicio" className="hover:text-cyan-400 transition-colors">01. // inicio</a>
          <a href="#sobre-mi" className="hover:text-cyan-400 transition-colors">02. // filosofia-ia</a>
          <a href="#stack" className="hover:text-cyan-400 transition-colors">03. // stack</a>
          <a href="#proyectos" className="hover:text-cyan-400 transition-colors">04. // proyectos</a>
          <a href="#terminal" className="hover:text-cyan-400 transition-colors">05. // terminal</a>
          <a href="#contacto" className="hover:text-cyan-400 transition-colors">06. // contacto</a>
        </nav>

        {/* Action */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Leonardo4516"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-lg bg-white/5 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,243,255,0.1)]"
          >
            <GithubIcon className="w-4 h-4" />
            <span>@Leonardo4516</span>
          </a>
        </div>
      </div>
    </header>
  )
}
