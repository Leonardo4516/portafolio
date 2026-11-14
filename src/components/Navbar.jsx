import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { GithubIcon } from './Icons'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('#inicio')
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY
          setScrolled(currentY > 30)

          // Accurate ScrollSpy using bounding client rect relative to viewport
          const sections = ['#inicio', '#sobre-mi', '#stack', '#proyectos', '#metodologia', '#contacto']
          if (currentY < 120) {
            setActiveSection('#inicio')
          } else {
            const viewportTarget = window.innerHeight * 0.38
            for (let i = sections.length - 1; i >= 0; i--) {
              const el = document.querySelector(sections[i])
              if (el) {
                const rect = el.getBoundingClientRect()
                if (rect.top <= viewportTarget) {
                  setActiveSection((prev) => (prev !== sections[i] ? sections[i] : prev))
                  break
                }
              }
            }
          }

          ticking = false
        })
        ticking = true
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-black/85 backdrop-blur-md border-b border-white/10' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Marca: el nombre */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, '#inicio')}
          className="font-display text-lg font-semibold tracking-tight text-white hover:text-violet-200 transition-colors"
        >
          Leonardo Hernández
        </a>

        {/* Enlaces de escritorio: el activo queda en blanco y subrayado */}
        <nav className="hidden lg:flex items-center gap-7 text-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative py-1 transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="enlaceActivo"
                    className="absolute left-0 right-0 -bottom-1 h-px bg-violet-300"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </a>
            )
          })}
        </nav>

        {/* Idioma y GitHub */}
        <div className="hidden md:flex items-center gap-5 font-mono text-xs">
          <button
            onClick={toggleLanguage}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Cambiar idioma / Switch language"
          >
            <span className={language === 'es' ? 'text-white' : ''}>ES</span>
            <span className="mx-1.5 text-neutral-600">/</span>
            <span className={language === 'en' ? 'text-white' : ''}>EN</span>
          </button>
          <a
            href="https://github.com/Leonardo4516"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="w-[18px] h-[18px]" />
          </a>
        </div>

        {/* Móvil: idioma y menú */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="font-mono text-xs text-neutral-300"
            aria-label="Toggle language"
          >
            {language === 'es' ? 'EN' : 'ES'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 text-neutral-200 hover:text-white transition-colors"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-black border-b border-white/10 px-5 overflow-hidden"
          >
            <nav className="flex flex-col py-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`font-display text-2xl py-2.5 transition-colors ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </a>
                )
              })}
              <a
                href="https://github.com/Leonardo4516"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-4 pt-4 border-t border-white/10 inline-flex items-center gap-2 font-mono text-sm text-neutral-300 hover:text-white"
              >
                <GithubIcon className="w-4 h-4" />
                <span>@Leonardo4516</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
