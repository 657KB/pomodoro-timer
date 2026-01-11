import { useState, useRef, useEffect, useCallback } from 'react'

const POMODOROS_UNTIL_LONG_BREAK = 4

const DEFAULT_DURATIONS = {
  workTime: 25 * 60,
  shortBreakTime: 5 * 60,
  longBreakTime: 15 * 60,
}

export function useTimer(onWorkComplete, onBreakComplete, durations = DEFAULT_DURATIONS) {
  const { workTime, shortBreakTime, longBreakTime } = durations

  const [timeLeft, setTimeLeft] = useState(workTime)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('work')
  const [pomodoroCount, setPomodoroCount] = useState(0)

  const startTimeRef = useRef(null)
  const remainingAtStartRef = useRef(workTime)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    startTimeRef.current = Date.now()
    remainingAtStartRef.current = timeLeft

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000
      const newTime = Math.max(0, remainingAtStartRef.current - elapsed)
      setTimeLeft(newTime)

      if (newTime <= 0) {
        setIsRunning(false)
        clearInterval(intervalRef.current)
        intervalRef.current = null

        if (mode === 'work') {
          const newCount = pomodoroCount + 1
          const isLongBreak = newCount % POMODOROS_UNTIL_LONG_BREAK === 0
          setPomodoroCount(newCount)
          setMode('break')
          setTimeLeft(isLongBreak ? longBreakTime : shortBreakTime)
          onWorkComplete?.()
        } else {
          setMode('work')
          setTimeLeft(workTime)
          onBreakComplete?.()
        }
      }
    }, 100)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isRunning, mode, timeLeft, workTime, shortBreakTime, longBreakTime, onWorkComplete, onBreakComplete, pomodoroCount])

  const start = useCallback(() => setIsRunning(true), [])
  const pause = useCallback(() => setIsRunning(false), [])

  const reset = useCallback(() => {
    setIsRunning(false)
    setMode('work')
    setTimeLeft(workTime)
    setPomodoroCount(0)
    remainingAtStartRef.current = workTime
  }, [workTime])

  const skip = useCallback(() => {
    setIsRunning(false)
    if (mode === 'work') {
      const newCount = pomodoroCount + 1
      const isLongBreak = newCount % POMODOROS_UNTIL_LONG_BREAK === 0
      const breakTime = isLongBreak ? longBreakTime : shortBreakTime
      setPomodoroCount(newCount)
      setMode('break')
      setTimeLeft(breakTime)
      remainingAtStartRef.current = breakTime
    } else {
      setMode('work')
      setTimeLeft(workTime)
      remainingAtStartRef.current = workTime
    }
  }, [mode, pomodoroCount, workTime, shortBreakTime, longBreakTime])

  return { timeLeft, isRunning, mode, pomodoroCount, start, pause, reset, skip }
}
