import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'pomodoro-theme'

const THEME_CONFIG = {
  light: { next: 'dark', icon: '☀️', label: '浅色' },
  dark: { next: 'system', icon: '🌙', label: '深色' },
  system: { next: 'light', icon: '💻', label: '跟随系统' }
}

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'system'
  })

  useEffect(() => {
    const root = document.documentElement
    localStorage.setItem(STORAGE_KEY, theme)

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      function updateSystemTheme() {
        root.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light')
      }
      
      updateSystemTheme()
      mediaQuery.addEventListener('change', updateSystemTheme)
      return () => mediaQuery.removeEventListener('change', updateSystemTheme)
    } else {
      root.setAttribute('data-theme', theme)
    }
  }, [theme])

  useEffect(() => {
    requestAnimationFrame(() => {
      document.body.classList.add('transitions-enabled')
    })
  }, [])

  const toggle = useCallback(() => {
    setTheme(prev => THEME_CONFIG[prev].next)
  }, [])

  const config = THEME_CONFIG[theme]

  return {
    theme,
    icon: config.icon,
    label: config.label,
    toggle
  }
}
