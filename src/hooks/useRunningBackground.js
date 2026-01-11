import { useState, useEffect, useCallback } from 'react'

export function useRunningBackground() {
  const [timerState, setTimerState] = useState({ isRunning: false, mode: 'work' })

  useEffect(() => {
    const { isRunning, mode } = timerState
    document.body.classList.remove('is-running-work', 'is-running-break')
    
    if (isRunning) {
      document.body.classList.add(`is-running-${mode}`)
    }

    return () => {
      document.body.classList.remove('is-running-work', 'is-running-break')
    }
  }, [timerState])

  const updateTimerState = useCallback((newState) => {
    setTimerState(newState)
  }, [])

  return updateTimerState
}
