import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 border-t border-slate-900 bg-slate-950/80 text-center text-xs font-mono text-slate-500 relative z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <p>{t.footer.copyright.replace('{year}', year)}</p>
      </div>
    </footer>
  )
}
