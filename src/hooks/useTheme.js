import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'pomodoro-theme'

const NEXT_THEME = {
  light: 'dark',
  dark: 'system',
  system: 'light'
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
    setTheme(prev => NEXT_THEME[prev])
  }, [])

  return { theme, toggle }
}
