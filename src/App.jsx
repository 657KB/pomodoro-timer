import { Timer } from './components/Timer'

function App() {
  return (
    <div className="app">
      <h1>🍅 番茄钟</h1>
      <Timer 
        todayCount={0}
        onWorkComplete={() => console.log('Work complete!')}
        onBreakComplete={() => console.log('Break complete!')}
      />
    </div>
  )
}

export default App
