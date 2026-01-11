import { useEffect } from 'react'
import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react'
import { useTimer } from '../hooks/useTimer'
import { useI18n } from '../hooks/useI18n.js'
import './Timer.css'

export function Timer({ onWorkComplete, onBreakComplete, onStateChange, durations }) {
  const { t } = useI18n()
  const { timeLeft, isRunning, mode, start, pause, reset, skip } = useTimer(
    onWorkComplete,
    onBreakComplete,
    durations
  )
  
  useEffect(() => {
    onStateChange?.({ isRunning, mode })
  }, [isRunning, mode, onStateChange])
  
  const minutes = Math.floor(timeLeft / 60)
  const seconds = Math.floor(timeLeft % 60)
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  
  return (
    <div className={`timer ${mode}`}>
      <div className="timer-display">{formattedTime}</div>
      <div className="timer-controls">
        <button onClick={reset} className="btn btn-icon" aria-label={t('timer.reset')}>
          <RotateCcw size={18} />
        </button>
        <button onClick={isRunning ? pause : start} className="btn btn-primary" aria-label={isRunning ? t('timer.pause') : t('timer.start')}>
          {isRunning ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={skip} className="btn btn-icon" aria-label={t('timer.skip')}>
          <SkipForward size={18} />
        </button>
      </div>
    </div>
  )
}
