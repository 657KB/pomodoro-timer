import { Timer } from './components/Timer'
import { usePomodoro } from './hooks/usePomodoro'
import { playNotificationSound } from './utils/sound'

function App() {
  const { getTodayCount, recordPomodoro } = usePomodoro()

  const handleWorkComplete = () => {
    playNotificationSound()
    recordPomodoro()
  }

  const handleBreakComplete = () => {
    playNotificationSound()
  }

  return (
    <div className="app">
      <h1>🍅 番茄钟</h1>
      <Timer 
        todayCount={getTodayCount()}
        onWorkComplete={handleWorkComplete}
        onBreakComplete={handleBreakComplete}
      />
    </div>
  )
}

export default App
