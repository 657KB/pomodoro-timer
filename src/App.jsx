import { useTimer } from './hooks/useTimer'

function App() {
  const { timeLeft, isRunning, mode, start, pause, reset, skip } = useTimer(
    () => console.log('Work complete!'),
    () => console.log('Break complete!')
  )
  
  const minutes = Math.floor(timeLeft / 60)
  const seconds = Math.floor(timeLeft % 60)
  
  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <p>Mode: {mode}</p>
      <p>{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</p>
      <button onClick={isRunning ? pause : start}>{isRunning ? 'Pause' : 'Start'}</button>
      <button onClick={reset}>Reset</button>
      <button onClick={skip}>Skip</button>
    </div>
  )
}

export default App
