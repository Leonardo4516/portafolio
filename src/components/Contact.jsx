import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'
import { useLanguage } from '../context/LanguageContext'

export default function Contact() {
  const { language, t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)

  const getEncodedData = () => {
    const defaultSub = language === 'es' 
      ? `Contacto desde Portafolio - ${formData.name || 'Interesado'}`
      : `Portfolio Inquiry - ${formData.name || 'Visitor'}`

    const subject = encodeURIComponent(formData.subject || defaultSub)
    const rawBody = language === 'es'
      ? `Hola Leonardo, mi nombre es ${formData.name || 'un visitante de tu portafolio'}.\n\n${formData.message}\n`
      : `Hello Leonardo, my name is ${formData.name || 'a visitor to your portfolio'}.\n\n${formData.message}\n`

    const body = encodeURIComponent(rawBody)
    return { subject, body, rawBody }
  }

  const getGmailWebUrl = () => {
    const { subject, body } = getEncodedData()
    return `https://mail.google.com/mail/?view=cm&fs=1&to=lehernan.07@gmail.com&su=${subject}&body=${body}`
  }

  const getMailtoUrl = () => {
    const { subject, body } = getEncodedData()
    return `mailto:lehernan.07@gmail.com?subject=${subject}&body=${body}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.message) return

    window.open(getGmailWebUrl(), '_blank', 'noopener,noreferrer')
    setSubmitted(true)
  }

  const handleCopyMessage = () => {
    const { rawBody } = getEncodedData()
    navigator.clipboard.writeText(rawBody)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  // Campos sin caja: solo una línea inferior que se ilumina al escribir
  const estiloCampo = "w-full bg-transparent border-0 border-b border-white/20 focus:border-violet-300 px-0 py-2.5 text-white placeholder-neutral-500 focus:outline-none focus:ring-0 transition-colors"
  const enlace = 'underline underline-offset-4 decoration-white/20 hover:decoration-white'

  return (
    <section id="contacto" className="min-h-[calc(100svh-5rem)] pt-24 pb-40 px-5 sm:px-8 relative z-10 scroll-mt-16">
      {/* La sección ocupa la pantalla menos el pie (h-20): al terminar el scroll el título queda
          bajo la barra y el planeta gigante sube en el espacio libre de abajo */}
      <div className="max-w-5xl mx-auto sobre-espacio">
        <div className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-violet-300">{t.contact.tag}</p>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-white mt-4 mb-5">
            {t.contact.title} <span className="text-violet-300">{t.contact.titleHighlight}</span>
          </h2>
          <p className="max-w-xl mx-auto text-neutral-200 text-base leading-relaxed">{t.contact.desc}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-14 gap-y-14">
          {/* Mensaje directo */}
          <div className="lg:col-span-7">
            <h3 className="font-display text-2xl font-semibold text-white mb-2">
              {language === 'es' ? 'Escríbame directamente' : 'Write to me directly'}
            </h3>
            <p className="text-neutral-300 text-[15px] leading-relaxed mb-8">
              {language === 'es'
                ? 'Al enviar se abre Gmail en su navegador con el asunto y el mensaje listos.'
                : 'Sending opens Gmail in your browser with the subject and message ready.'}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block font-mono text-xs uppercase tracking-wider text-neutral-400">
                    {t.contact.form.nameLabel} *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.form.namePlaceholder}
                    className={estiloCampo}
                  />
                </div>
                <div>
                  <label htmlFor="contact-subject" className="block font-mono text-xs uppercase tracking-wider text-neutral-400">
                    {t.contact.form.subjectLabel}
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={t.contact.form.subjectPlaceholder}
                    className={estiloCampo}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block font-mono text-xs uppercase tracking-wider text-neutral-400">
                  {t.contact.form.messageLabel} *
                </label>
                <textarea
                  id="contact-message"
                  rows="3"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.form.messagePlaceholder}
                  className={`${estiloCampo} resize-none`}
                ></textarea>
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white text-black font-medium text-sm hover:bg-violet-200 transition-colors cursor-pointer"
              >
                <span>{language === 'es' ? 'Abrir y enviar en Gmail' : 'Open & send in Gmail'}</span>
                <ExternalLink className="w-4 h-4" />
              </button>

              {/* Alternativas si el navegador bloqueó la ventana */}
              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="pt-2 text-sm"
                  >
                    <p className="text-neutral-200 mb-3">
                      {language === 'es'
                        ? 'Se abrió Gmail. Si su navegador bloqueó la ventana, use otra opción:'
                        : 'Gmail opened. If your browser blocked the window, use another option:'}
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-neutral-300">
                      <a href={getGmailWebUrl()} target="_blank" rel="noreferrer" className={`hover:text-white ${enlace}`}>
                        Gmail Web
                      </a>
                      <a href={getMailtoUrl()} className={`hover:text-white ${enlace}`}>
                        {language === 'es' ? 'App de correo' : 'Mail app'}
                      </a>
                      <button type="button" onClick={handleCopyMessage} className={`hover:text-white cursor-pointer ${enlace}`}>
                        {copied ? (language === 'es' ? 'Copiado' : 'Copied') : (language === 'es' ? 'Copiar texto' : 'Copy text')}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>

          {/* Datos de contacto y disponibilidad */}
          <div className="lg:col-span-5">
            <dl className="border-t border-white/10 text-[15px]">
              <div className="py-5 border-b border-white/10">
                <dt className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-1.5">Email</dt>
                <dd>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=lehernan.07@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className={`font-display text-lg font-semibold text-white hover:text-violet-200 ${enlace}`}
                  >
                    lehernan.07@gmail.com
                  </a>
                </dd>
              </div>
              <div className="py-5 border-b border-white/10">
                <dt className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  {t.contact.cards.availabilityTitle}
                </dt>
                <dd className="text-neutral-200 space-y-1">
                  <p className="text-violet-300">{t.contact.cards.availabilityStatus}</p>
                  <p>{t.contact.cards.modalityLabel} {t.contact.cards.modalityValue}</p>
                  <p>{t.contact.cards.responseTimeLabel} {t.contact.cards.responseTimeValue}</p>
                  <p>{language === 'es' ? 'Ubicación:' : 'Location:'} Colombia (GMT-5) / {language === 'es' ? 'Remoto global' : 'Global remote'}</p>
                </dd>
              </div>
              <div className="py-5 border-b border-white/10">
                <dt className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-1.5">
                  {t.contact.cards.networksTitle}
                </dt>
                <dd className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-sm text-neutral-200">
                  <a href="https://github.com/Leonardo4516" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 hover:text-white ${enlace}`}>
                    <GithubIcon className="w-4 h-4" />
                    <span>{t.contact.github}</span>
                  </a>
                  <a href="https://www.linkedin.com/in/leonardo-hernández-2a6a66389" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 hover:text-white ${enlace}`}>
                    <LinkedinIcon className="w-4 h-4" />
                    <span>{t.contact.linkedin}</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
