import { useState, useCallback } from 'react'

const STORAGE_KEY = 'pomodoro-history'

function getToday() {
  return new Date().toISOString().split('T')[0]
}

export function usePomodoro() {
  const [history, setHistory] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  })

  const recordPomodoro = useCallback(() => {
    const today = getToday()
    setHistory(prev => {
      const updated = { ...prev, [today]: (prev[today] || 0) + 1 }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
      return updated
    })
  }, [])

  const getTodayCount = useCallback(() => {
    return history[getToday()] || 0
  }, [history])

  const getHistory = useCallback(() => {
    return history
  }, [history])

  return { history, recordPomodoro, getTodayCount, getHistory }
}
