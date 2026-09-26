import { Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-3xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900/90 via-slate-950/90 to-purple-950/40 border border-slate-800/80 rounded-3xl p-6 sm:p-12 text-center backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-4 py-1.5 rounded-full inline-block mb-5">
            {t.contact.tag}
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 mb-4 font-mono">
            {t.contact.title} <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{t.contact.titleHighlight}</span>
          </h2>

          <p className="max-w-lg mx-auto text-slate-400 text-xs sm:text-sm leading-relaxed mb-8 font-sans">
            {t.contact.desc}
          </p>

          {/* Elegant direct mail button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href="mailto:lehernan.07@gmail.com"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-600/20 hover:from-cyan-500/30 hover:to-purple-600/30 border border-cyan-400/50 hover:border-cyan-300 text-cyan-300 hover:text-white font-mono text-sm tracking-wide shadow-[0_0_25px_rgba(0,243,255,0.2)] hover:shadow-[0_0_35px_rgba(0,243,255,0.4)] transition-all transform hover:-translate-y-0.5"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                <Mail className="w-4 h-4 text-cyan-300" />
              </div>
              <span className="font-semibold">{t.contact.directEmail}</span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-6 pt-6 border-t border-slate-800/80">
            <a
              href="https://github.com/Leonardo4516"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors font-mono text-xs"
            >
              <GithubIcon className="w-4 h-4" />
              <span>{t.contact.github}</span>
            </a>
            <span className="text-slate-700">•</span>
            <a
              href="https://www.linkedin.com/in/leonardo-hernández-2a6a66389"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors font-mono text-xs"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>{t.contact.linkedin}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
