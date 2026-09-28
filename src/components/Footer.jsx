import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="py-8 px-6 border-t border-neutral-900 bg-black/90 text-center text-xs font-mono text-neutral-500 relative z-10">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <p>{t.footer.copyright.replace('{year}', year)}</p>
      </div>
    </footer>
  )
}
