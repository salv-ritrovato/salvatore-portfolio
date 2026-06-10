import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultLocale, storageKey, translations } from './translations'

const LanguageContext = createContext(null)

function readStoredLocale() {
  try {
    const stored = localStorage.getItem(storageKey)
    if (stored && translations[stored]) return stored
  } catch {
    // localStorage non disponibile
  }
  return defaultLocale
}

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(readStoredLocale)

  const setLocale = (next) => {
    if (!translations[next]) return
    setLocaleState(next)
    try {
      localStorage.setItem(storageKey, next)
    } catch {
      // ignore
    }
  }

  const t = useMemo(() => translations[locale], [locale])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t.meta.title

    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', t.meta.description)
  }, [locale, t])

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
