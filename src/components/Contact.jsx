import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, CheckCircle2, Clock, MapPin, Briefcase, ExternalLink } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [sentSuccess, setSentSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    // Prepare well-formatted mailto link
    const subject = encodeURIComponent(formData.subject || `Contacto desde Portafolio - ${formData.name}`)
    const body = encodeURIComponent(
      `Hola Leonardo,\n\nMi nombre es: ${formData.name}\nCorreo de contacto: ${formData.email}\n\nMensaje:\n${formData.message}\n`
    )
    window.location.href = `mailto:lehernan.07@gmail.com?subject=${subject}&body=${body}`

    setSentSuccess(true)
    setTimeout(() => setSentSuccess(false), 5000)
  }

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-4 py-1.5 rounded-full inline-block">
            {t.contact.tag}
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 mt-4 mb-3 font-mono">
            {t.contact.title} <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">{t.contact.titleHighlight}</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-xs sm:text-sm font-sans leading-relaxed">
            {t.contact.desc}
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Column 1: Interactive Message Box (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <h3 className="font-mono font-bold text-lg text-slate-100 mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span>{t.contact.form.submitBtn}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-sans">
              {t.contact.cards.directEmailSub}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs sm:text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 text-xs mb-1.5 font-medium">
                    {t.contact.form.nameLabel} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.form.namePlaceholder}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-xs mb-1.5 font-medium">
                    {t.contact.form.emailLabel} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.form.emailPlaceholder}
                    className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 text-xs mb-1.5 font-medium">
                  {t.contact.form.subjectLabel}
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder={t.contact.form.subjectPlaceholder}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-300 text-xs mb-1.5 font-medium">
                  {t.contact.form.messageLabel} *
                </label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.form.messagePlaceholder}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-cyan-400 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-600 focus:outline-none transition-colors resize-none font-sans"
                ></textarea>
              </div>

              {sentSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-sans">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Se ha generado el correo en tu aplicación predeterminada. ¡Gracias por escribir!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(0,243,255,0.25)] hover:shadow-[0_0_35px_rgba(0,243,255,0.45)] transition-all transform hover:-translate-y-0.5"
              >
                <Send className="w-4 h-4" />
                <span>{t.contact.form.submitBtn}</span>
              </button>
            </form>
          </div>

          {/* Column 2: Status, Availability & Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Status & Availability Card */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{t.contact.cards.availabilityStatus}</span>
              </div>
              <h4 className="font-mono font-bold text-base text-slate-100 mb-3">
                {t.contact.cards.availabilityTitle}
              </h4>
              <div className="space-y-2.5 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-slate-400">{t.contact.cards.modalityLabel}</span>
                  <span className="text-slate-200">{t.contact.cards.modalityValue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="text-slate-400">{t.contact.cards.responseTimeLabel}</span>
                  <span className="text-slate-200">{t.contact.cards.responseTimeValue}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-slate-400">Ubicación:</span>
                  <span className="text-slate-200">Colombia (GMT-5) / Remoto Global</span>
                </div>
              </div>
            </div>

            {/* Direct Email Quick Card */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/90 hover:border-cyan-500/40 rounded-3xl p-6 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400">{t.contact.cards.directEmailTitle}</span>
                <a
                  href={`mailto:${t.contact.directEmail}`}
                  className="text-xs font-mono text-slate-400 group-hover:text-cyan-300 flex items-center gap-1 transition-colors"
                >
                  <span>{t.contact.cards.directEmailAction}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <a
                href={`mailto:${t.contact.directEmail}`}
                className="font-mono font-bold text-base sm:text-lg text-slate-100 group-hover:text-cyan-300 transition-colors block truncate"
              >
                {t.contact.directEmail}
              </a>
            </div>

            {/* Professional Networks */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/90 rounded-3xl p-6">
              <div className="text-xs font-mono text-purple-400 mb-1">{t.contact.cards.networksTitle}</div>
              <p className="text-xs text-slate-400 mb-4 font-sans">{t.contact.cards.networksSub}</p>
              
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <a
                  href="https://github.com/Leonardo4516"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-300 transition-all"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>{t.contact.github}</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/leonardo-hernández-2a6a66389"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-3 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-purple-400/50 text-slate-300 hover:text-purple-300 transition-all"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>{t.contact.linkedin}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
