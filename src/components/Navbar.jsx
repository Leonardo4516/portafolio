import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { VitruvianLogo, GithubIcon } from './Icons'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navLinks = [
    { href: '#inicio', label: t.nav.home },
    { href: '#sobre-mi', label: t.nav.about },
    { href: '#stack', label: t.nav.skills },
    { href: '#proyectos', label: t.nav.projects },
    { href: '#terminal', label: t.nav.terminal },
    { href: '#contacto', label: t.nav.contact },
  ]

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-950/85 backdrop-blur-xl border-b border-cyan-500/20 py-2.5 shadow-[0_4px_30px_rgba(0,243,255,0.08)]' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand with Vitruvian Man Logo */}
        <a 
          href="#inicio" 
          onClick={() => setMobileMenuOpen(false)}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/30 to-purple-600/30 p-[1px] border border-cyan-400/40 shadow-[0_0_20px_rgba(0,243,255,0.2)] group-hover:shadow-[0_0_25px_rgba(0,243,255,0.4)] transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center group-hover:bg-slate-900 transition-colors">
              <VitruvianLogo className="w-7 h-7 group-hover:scale-105 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-base sm:text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">
              Leonardo DaVinci
            </span>
            <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {t.nav.status}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-mono text-gray-300">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className="hover:text-cyan-400 transition-colors py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Right Actions: Language Switch + GitHub */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700/80 hover:border-cyan-400/60 text-xs font-mono text-slate-300 hover:text-cyan-300 transition-all shadow-sm"
            title="Cambiar idioma / Switch language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span className={language === 'es' ? 'text-cyan-300 font-bold' : 'text-slate-500'}>ES</span>
            <span className="text-slate-600">|</span>
            <span className={language === 'en' ? 'text-cyan-300 font-bold' : 'text-slate-500'}>EN</span>
          </button>

          {/* GitHub Profile */}
          <a
            href="https://github.com/Leonardo4516"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-white/5 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(0,243,255,0.1)]"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>@Leonardo4516</span>
          </a>
        </div>

        {/* Mobile Hamburger Button + Mobile Lang Button */}
        <div className="flex md:hidden items-center gap-2">
          {/* Quick Lang Toggle on Mobile */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-lg bg-slate-900/80 border border-slate-700 text-xs font-mono text-cyan-300"
            aria-label="Toggle language"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>

          {/* Hamburger Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-slate-900/80 border border-cyan-500/30 text-cyan-300 hover:text-white transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-cyan-500/20 px-6 py-6 overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-4 font-mono text-sm text-slate-200">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 px-3 rounded-lg hover:bg-cyan-500/10 hover:text-cyan-300 border-l-2 border-transparent hover:border-cyan-400 transition-all"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <a
                  href="https://github.com/Leonardo4516"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-lg bg-white/5 border border-cyan-500/30 text-cyan-300"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub @Leonardo4516</span>
                </a>

                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{language === 'es' ? 'Switch to English' : 'Cambiar a Español'}</span>
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
