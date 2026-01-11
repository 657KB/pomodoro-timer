import { useState, useCallback, useMemo, useEffect } from 'react'
import { I18nContext } from '../contexts/I18nContext.js'
import { translations, defaultLocale, supportedLocales } from '../i18n/index.js'

const STORAGE_KEY = 'pomodoro-locale'

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}

function detectBrowserLocale() {
  const browserLang = navigator.language.split('-')[0]
  return supportedLocales.includes(browserLang) ? browserLang : defaultLocale
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored && supportedLocales.includes(stored)) {
      return stored
    }
    return detectBrowserLocale()
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, locale)
    document.documentElement.lang = locale
  }, [locale])

  const t = useCallback((key) => {
    const value = getNestedValue(translations[locale], key)
    if (value !== undefined) return value
    
    const fallback = getNestedValue(translations[defaultLocale], key)
    return fallback !== undefined ? fallback : key
  }, [locale])

  const changeLocale = useCallback((newLocale) => {
    if (supportedLocales.includes(newLocale)) {
      setLocale(newLocale)
    }
  }, [])

  const value = useMemo(() => ({
    locale,
    t,
    changeLocale,
    supportedLocales,
  }), [locale, t, changeLocale])

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  )
}
