import { useTimer } from '../hooks/useTimer'
import './Timer.css'

export function Timer({ todayCount = 0, onWorkComplete, onBreakComplete }) {
  const { timeLeft, isRunning, mode, start, pause, reset, skip } = useTimer(
    onWorkComplete,
    onBreakComplete
  )
  
  const minutes = Math.floor(timeLeft / 60)
  const seconds = Math.floor(timeLeft % 60)
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  
  return (
    <div className={`timer ${mode}`}>
      <div className="timer-mode">
        {mode === 'work' ? '工作中 🍅' : '休息中 ☕'}
      </div>
      <div className="timer-display">{formattedTime}</div>
      <div className="timer-count">今日完成: {todayCount} 个番茄钟</div>
      <div className="timer-controls">
        <button onClick={isRunning ? pause : start} className="btn btn-primary">
          {isRunning ? '暂停' : '开始'}
        </button>
        <button onClick={reset} className="btn btn-secondary">重置</button>
        <button onClick={skip} className="btn btn-secondary">跳过</button>
      </div>
    </div>
  )
}
