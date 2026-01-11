import { useState, useCallback, useMemo, useEffect } from 'react'

const STORAGE_KEY = 'pomodoro-settings'

const DEFAULT_SETTINGS = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
}

function loadSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...DEFAULT_SETTINGS, ...parsed }
    }
  } catch (e) {
    console.warn('Failed to load settings:', e)
  }
  return DEFAULT_SETTINGS
}

export function useSettings() {
  const [settings, setSettings] = useState(loadSettings)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
  }, [settings])

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }, [])

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
  }, [])

  const durationsInSeconds = useMemo(() => ({
    workTime: settings.workDuration * 60,
    shortBreakTime: settings.shortBreakDuration * 60,
    longBreakTime: settings.longBreakDuration * 60,
  }), [settings])

  return {
    settings,
    updateSettings,
    resetSettings,
    durationsInSeconds,
    DEFAULT_SETTINGS,
  }
}
