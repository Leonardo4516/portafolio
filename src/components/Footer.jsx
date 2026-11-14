import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="h-20 px-6 border-t border-white/10 bg-black/90 text-xs font-mono text-neutral-500 relative z-10">
      <div className="max-w-6xl mx-auto h-full flex items-center justify-center">
        <p>{t.footer.copyright.replace('{year}', year)}</p>
      </div>
    </footer>
  )
}
