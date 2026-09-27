import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Send, CheckCircle2, Clock, MapPin, Briefcase, ExternalLink, Copy, Check } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { language, t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  // Construct formatted subject & body
  const getEncodedData = () => {
    const defaultSub = language === 'es' 
      ? `Contacto desde Portafolio - ${formData.name || 'Interesado'}`
      : `Portfolio Inquiry - ${formData.name || 'Visitor'}`

    const subject = encodeURIComponent(formData.subject || defaultSub)
    const rawBody = language === 'es'
      ? `Hola Leonardo,\n\nMi nombre es: ${formData.name}\nMi correo de contacto es: ${formData.email}\n\nMensaje:\n${formData.message}\n`
      : `Hello Leonardo,\n\nMy name is: ${formData.name}\nMy contact email is: ${formData.email}\n\nMessage:\n${formData.message}\n`

    const body = encodeURIComponent(rawBody)
    return { subject, body, rawBody }
  }

  // Gmail Web Compose URL (Opens directly in Chrome/Firefox/Brave/Edge without local email app)
  const getGmailWebUrl = () => {
    const { subject, body } = getEncodedData()
    return `https://mail.google.com/mail/?view=cm&fs=1&to=lehernan.07@gmail.com&su=${subject}&body=${body}`
  }

  // Standard mailto fallback
  const getMailtoUrl = () => {
    const { subject, body } = getEncodedData()
    return `mailto:lehernan.07@gmail.com?subject=${subject}&body=${body}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    // Open Gmail web compose in a new tab by default
    window.open(getGmailWebUrl(), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const handleCopyMessage = () => {
    const { rawBody } = getEncodedData()
    navigator.clipboard.writeText(rawBody)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
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
          {/* Column 1: Interactive Message Composer */}
          <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-2xl border border-slate-800/90 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-mono font-bold text-lg text-slate-100 flex items-center gap-2">
                <Mail className="w-5 h-5 text-cyan-400" />
                <span>{language === 'es' ? 'Redactar Mensaje Directo' : 'Compose Direct Message'}</span>
              </h3>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-cyan-950/50 text-cyan-300 border border-cyan-500/20">
                {language === 'es' ? 'Gmail Web Directo' : 'Direct Gmail Web'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-6 font-sans">
              {language === 'es'
                ? 'Escribe tu mensaje y se abrirá directamente en Gmail en tu navegador, con el asunto y contenido listos para enviar en un clic.'
                : 'Type your message and it will open directly in Gmail on your web browser, pre-filled and ready to send with one click.'}
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

              {/* Submit Button (Opens Gmail Web) */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-mono text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(0,243,255,0.25)] hover:shadow-[0_0_35px_rgba(0,243,255,0.45)] transition-all transform hover:-translate-y-0.5"
              >
                <ExternalLink className="w-4 h-4" />
                <span>
                  {language === 'es' ? 'Abrir y Enviar en Gmail Web' : 'Open & Send via Gmail Web'}
                </span>
              </button>

              {/* Success / Fallback Action Box */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-2xl bg-slate-950/90 border border-cyan-500/30 text-xs space-y-3 font-sans"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>
                        {language === 'es' 
                          ? '¡Pestaña de Gmail generada con éxito!' 
                          : 'Gmail tab generated successfully!'}
                      </span>
                    </div>
                    <p className="text-slate-300 text-xs">
                      {language === 'es'
                        ? 'Si tu navegador bloqueó la ventana emergente o prefieres otra opción:'
                        : 'If your browser blocked the pop-up or you prefer another method:'}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1 font-mono text-xs">
                      {/* Direct Gmail Link */}
                      <a
                        href={getGmailWebUrl()}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Gmail Web</span>
                      </a>

                      {/* Mailto alternative */}
                      <a
                        href={getMailtoUrl()}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5 text-purple-400" />
                        <span>{language === 'es' ? 'App de Correo' : 'Mail App'}</span>
                      </a>

                      {/* Copy Formatted Text */}
                      <button
                        type="button"
                        onClick={handleCopyMessage}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                        <span>{copied ? (language === 'es' ? '¡Copiado!' : 'Copied!') : (language === 'es' ? 'Copiar Texto' : 'Copy Text')}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Column 2: Status, Availability & Quick Direct Channels */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Gmail Web Quick Card */}
            <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800/90 hover:border-cyan-500/40 rounded-3xl p-6 transition-all group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400">
                  {language === 'es' ? 'Gmail Directo en Navegador' : 'Direct Web Gmail'}
                </span>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=lehernan.07@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-mono text-cyan-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>{language === 'es' ? 'Abrir Gmail' : 'Open Gmail'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=lehernan.07@gmail.com"
                target="_blank"
                rel="noreferrer"
                className="font-mono font-bold text-base sm:text-lg text-slate-100 group-hover:text-cyan-300 transition-colors block truncate"
              >
                lehernan.07@gmail.com
              </a>
              <p className="text-[11px] text-slate-400 mt-2 font-sans">
                {language === 'es' 
                  ? 'Haz clic para redactar un correo directamente en la web de Gmail, sin necesidad de clientes instalados en Linux ni Windows.'
                  : 'Click to compose directly on Gmail Web, with no local desktop mail client required.'}
              </p>
            </div>

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
