import { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '../translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  // Default to Spanish, persist preference in localStorage
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('portfolio_lang') || 'es'
  })

  useEffect(() => {
    localStorage.setItem('portfolio_lang', language)
    document.documentElement.lang = language
  }, [language])

  const t = translations[language] || translations.es

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'es' ? 'en' : 'es'))
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
