import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { LanguageProvider } from './context/LanguageContext'
import FondoEspacial from './components/espacio/FondoEspacial'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import WorkflowView from './components/WorkflowView'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Intro from './components/Intro'

// Cada sección entra desde abajo, con un leve zoom, cuando llega al viewport
function Revelar({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 90, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

function PortfolioContent() {
  const [isLoading, setIsLoading] = useState(true)
  // El fondo espacial empieza a dibujarse cuando la intro se desvanece
  const [introRevelando, setIntroRevelando] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()
  // El inicio se aleja hacia arriba y se desvanece al empezar el recorrido
  const inicioY = useTransform(scrollY, [0, 700], [0, -140])
  const inicioOpacidad = useTransform(scrollY, [0, 600], [1, 0.15])
  const progresoBarra = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY
          const shouldShow = currentY > 400
          setShowBackToTop((prev) => (prev !== shouldShow ? shouldShow : prev))

          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Intro key="portfolio-intro" onRevelar={() => setIntroRevelando(true)} onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className="relative min-h-screen bg-black text-neutral-100 selection:bg-violet-600 selection:text-white overflow-x-hidden font-sans">
      {/* Fondo espacial: la cámara viaja por el espacio con el scroll */}
      <FondoEspacial activo={!isLoading || introRevelando} />

      {/* Viñeta suave para que el texto se lea sobre el espacio */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* Barra de progreso del recorrido */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] z-50 origin-left bg-gradient-to-r from-violet-500 via-fuchsia-400 to-blue-500"
        style={{ scaleX: progresoBarra }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col">
        <Navbar />
        <main>
          <motion.div style={{ y: inicioY, opacity: inicioOpacidad }}>
            <Hero />
          </motion.div>
          <Revelar><About /></Revelar>
          <Revelar><TechStack /></Revelar>
          <Revelar><Projects /></Revelar>
          <Revelar><WorkflowView /></Revelar>
          <Revelar><Contact /></Revelar>
        </main>
        <Footer />
      </div>

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            aria-label="Volver arriba / Back to top"
            className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-neutral-950/90 border border-violet-500/40 hover:border-violet-400 text-violet-400 hover:text-white backdrop-blur-xl shadow-[0_0_20px_rgba(166,107,255,0.25)] hover:shadow-[0_0_30px_rgba(166,107,255,0.5)] transition-all cursor-pointer group"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
    </>
  )
}

function App() {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  )
}

export default App
