import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import { Canvas } from '@react-three/fiber'
import { LanguageProvider } from './context/LanguageContext'
import Scene3D from './components/Scene3D'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import WorkflowView from './components/WorkflowView'
import Contact from './components/Contact'
import Footer from './components/Footer'

function PortfolioContent() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="relative min-h-screen bg-black text-neutral-100 selection:bg-red-600 selection:text-white overflow-x-hidden font-sans">
      {/* Fixed 3D Canvas in background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Scene3D />
        </Canvas>
      </div>

      {/* Cyber Grid Background Overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* Radial ambient crimson glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] bg-gradient-to-b from-red-600/15 via-rose-950/10 to-transparent rounded-full blur-3xl pointer-events-none z-0" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col">
        <Navbar />
        <main>
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <WorkflowView />
          <Contact />
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
            className="fixed bottom-6 right-6 z-40 p-3 rounded-xl bg-neutral-950/90 border border-red-500/40 hover:border-red-400 text-red-400 hover:text-white backdrop-blur-xl shadow-[0_0_20px_rgba(239,68,68,0.25)] hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] transition-all cursor-pointer group"
          >
            <ChevronUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
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
