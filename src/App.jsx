import { Timer } from './components/Timer'
import { HeatMap } from './components/HeatMap'
import { usePomodoro } from './hooks/usePomodoro'
import { playNotificationSound } from './utils/sound'

function App() {
  const { history, getTodayCount, recordPomodoro } = usePomodoro()

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
      <section className="stats">
        <h2>活动记录</h2>
        <HeatMap history={history} />
      </section>
    </div>
  )
}

export default App
