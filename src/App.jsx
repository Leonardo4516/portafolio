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
