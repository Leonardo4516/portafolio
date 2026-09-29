import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe } from 'lucide-react'
import { BrandLogo, GithubIcon } from './Icons'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#inicio')
  const [scrollProgress, setScrollProgress] = useState(0)
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100)
      }

      const sections = ['#inicio', '#sobre-mi', '#stack', '#proyectos', '#metodologia', '#contacto']
      const scrollPos = window.scrollY + 140

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
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
    { href: '#metodologia', label: t.nav.workflow },
    { href: '#contacto', label: t.nav.contact },
  ]

  const handleNavClick = (e, targetId) => {
    e.preventDefault()
    setMobileMenuOpen(false)
    setActiveSection(targetId)
    const element = document.querySelector(targetId)
    if (element) {
      const navHeight = 70
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      if (window.history.pushState) {
        window.history.pushState(null, null, targetId)
      }
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/95 backdrop-blur-xl border-b border-red-500/20 py-2.5 shadow-[0_4px_30px_rgba(239,68,68,0.15)]' 
        : 'bg-transparent py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand: ONLY the Vitruvian logo in Crimson */}
        <a 
          href="#inicio" 
          onClick={(e) => handleNavClick(e, '#inicio')}
          className="flex items-center group focus:outline-none"
          title="Inicio // Home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600/30 via-black to-rose-900/30 p-[1px] border border-red-500/40 shadow-[0_0_20px_rgba(239,68,68,0.25)] group-hover:shadow-[0_0_25px_rgba(239,68,68,0.5)] group-hover:border-red-400 transition-all">
            <div className="w-full h-full bg-black/95 rounded-[11px] flex items-center justify-center group-hover:bg-neutral-900 transition-colors">
              <BrandLogo className="w-7 h-7 group-hover:scale-105 transition-transform" />
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links with Active ScrollSpy */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 text-xs font-mono">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-red-400 font-bold bg-red-950/40 border border-red-500/35 shadow-[0_0_14px_rgba(239,68,68,0.22)]'
                    : 'text-neutral-400 hover:text-neutral-100 hover:bg-neutral-900/60'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        {/* Desktop Right Actions: Language Switch + GitHub */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-red-500/60 text-xs font-mono text-neutral-300 hover:text-red-300 transition-all shadow-sm"
            title="Cambiar idioma / Switch language"
          >
            <Globe className="w-3.5 h-3.5 text-red-400" />
            <span className={language === 'es' ? 'text-red-400 font-bold' : 'text-neutral-500'}>ES</span>
            <span className="text-neutral-700">|</span>
            <span className={language === 'en' ? 'text-red-400 font-bold' : 'text-neutral-500'}>EN</span>
          </button>

          {/* GitHub Profile */}
          <a
            href="https://github.com/Leonardo4516"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-lg bg-white/5 border border-red-500/30 text-red-300 hover:bg-red-500/10 hover:border-red-400 transition-all shadow-[0_0_15px_rgba(239,68,68,0.15)]"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>@Leonardo4516</span>
          </a>
        </div>

        {/* Mobile Hamburger Button + Mobile Lang Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-neutral-800 text-xs font-mono text-red-400"
            aria-label="Toggle language"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-neutral-950 border border-red-500/30 text-red-400 hover:text-white transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Reading Progress Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900/60 overflow-hidden pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-600 transition-all duration-150 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-red-500/20 px-6 py-6 overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-3 font-mono text-sm">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`py-2.5 px-3.5 rounded-xl border-l-2 transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-red-950/40 text-red-400 border-red-500 font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                        : 'text-neutral-300 hover:bg-red-500/10 hover:text-red-400 border-transparent'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />}
                  </a>
                )
              })}

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <a
                  href="https://github.com/Leonardo4516"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-lg bg-white/5 border border-red-500/30 text-red-300"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub @Leonardo4516</span>
                </a>

                <button
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300"
                >
                  <Globe className="w-3.5 h-3.5 text-red-400" />
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
