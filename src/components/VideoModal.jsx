import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Play, ExternalLink, Sparkles, AlertCircle } from 'lucide-react'
import { GithubIcon } from './Icons'
import { useLanguage } from '../context/LanguageContext'

export default function VideoModal({ project, onClose }) {
  const { t } = useLanguage()
  const videoRef = useRef(null)

  // Handle ESC key press and body scroll lock
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
      >
        {/* Backdrop with organic blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={onClose}
          className="fixed inset-0 bg-black/90 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-neutral-950 border border-neutral-800 hover:border-red-500/40 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(239,68,68,0.15)] flex flex-col z-10 my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-neutral-800/90 bg-neutral-950/80 sticky top-0 z-20 backdrop-blur-md">
            <div className="flex items-center gap-2.5 min-w-0 pr-3">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)] animate-pulse shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-red-400 block truncate">
                  {t.projects.videoModal.badge}
                </span>
                <h3 id="video-modal-title" className="text-sm sm:text-lg font-bold font-mono text-white truncate">
                  {project.title}
                </h3>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-red-500/50 hover:bg-neutral-850 transition-colors duration-150 active:scale-95 shrink-0"
              aria-label={t.projects.videoModal.close}
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Main Video Viewport */}
          <div className="p-4 sm:p-6 bg-black flex flex-col items-center justify-center">
            {project.videoUrl ? (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-neutral-800 shadow-2xl">
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  poster={project.videoThumbnail}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                >
                  Tu navegador no soporta reproducción de video HTML5.
                </video>
              </div>
            ) : (
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-b from-neutral-900/90 to-black border border-neutral-800/80 flex flex-col items-center justify-center p-6 text-center relative group">
                <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400 mb-4 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                  <Play className="w-7 h-7 fill-red-400 translate-x-0.5" />
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider bg-red-500/20 text-red-300 border border-red-500/30 mb-2">
                  {t.projects.videoModal.inProgressBadge}
                </span>
                <h4 className="text-base sm:text-lg font-bold font-mono text-white mb-2">
                  {project.title}
                </h4>
                <p className="max-w-lg text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed mb-4">
                  {t.projects.videoModal.inProgressNotice}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-mono bg-white/5 border border-white/10 text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Business Value & Highlights Section */}
          <div className="px-5 sm:px-7 py-5 bg-neutral-950/95 border-t border-neutral-800/80 flex flex-col gap-4">
            <div>
              <h4 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-wider text-red-400 mb-2.5 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>{t.projects.videoModal.businessValue}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
                {(project.videoHighlights && project.videoHighlights.length > 0 ? project.videoHighlights : [
                  { title: "Arquitectura Desacoplada", desc: "Diseño modular preparado para escalar en entornos de producción con alta consistencia." },
                  { title: "Lógica de Negocio Probada", desc: "Validación de reglas críticas, transacciones atómicas y seguridad de datos." },
                  { title: "Experiencia Intuitiva", desc: "Flujos de usuario rápidos, feedback instantáneo y reducción de errores operativos." }
                ]).map((hl, idx) => (
                  <div 
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800/70 hover:border-red-500/30 transition-colors"
                  >
                    <div className="flex items-start gap-2 mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                      <span className="text-xs font-mono font-bold text-neutral-100">
                        {typeof hl === 'string' ? hl : hl.title}
                      </span>
                    </div>
                    {typeof hl === 'object' && hl.desc && (
                      <p className="text-[11px] font-sans text-neutral-400 pl-5 leading-relaxed">
                        {hl.desc}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-3 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[10px] font-mono text-neutral-500 mr-1">Stack:</span>
                {project.tags.slice(0, 5).map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2.5 ml-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-mono px-4 py-2 rounded-xl bg-neutral-900 hover:bg-red-600 hover:text-white text-neutral-200 border border-neutral-800 hover:border-red-500/50 transition-colors duration-150 active:scale-95 font-semibold"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>{t.projects.videoModal.viewCode}</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
