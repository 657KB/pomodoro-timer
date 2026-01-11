import { useState, useRef, useEffect, useCallback } from 'react'

const WORK_TIME = 25 * 60
const BREAK_TIME = 5 * 60

export function useTimer(onWorkComplete, onBreakComplete) {
  const [timeLeft, setTimeLeft] = useState(WORK_TIME)
  const [isRunning, setIsRunning] = useState(false)
  const [mode, setMode] = useState('work')
  
  const startTimeRef = useRef(null)
  const remainingAtStartRef = useRef(WORK_TIME)
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
          setMode('break')
          setTimeLeft(BREAK_TIME)
          onWorkComplete?.()
        } else {
          setMode('work')
          setTimeLeft(WORK_TIME)
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
  }, [isRunning, mode, timeLeft, onWorkComplete, onBreakComplete])
  
  const start = useCallback(() => {
    setIsRunning(true)
  }, [])
  
  const pause = useCallback(() => {
    setIsRunning(false)
  }, [])
  
  const reset = useCallback(() => {
    setIsRunning(false)
    setMode('work')
    setTimeLeft(WORK_TIME)
    remainingAtStartRef.current = WORK_TIME
  }, [])
  
  const skip = useCallback(() => {
    setIsRunning(false)
    if (mode === 'work') {
      setMode('break')
      setTimeLeft(BREAK_TIME)
      remainingAtStartRef.current = BREAK_TIME
    } else {
      setMode('work')
      setTimeLeft(WORK_TIME)
      remainingAtStartRef.current = WORK_TIME
    }
  }, [mode])
  
  return { timeLeft, isRunning, mode, start, pause, reset, skip }
}
