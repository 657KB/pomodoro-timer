import { useMemo } from 'react'
import './HeatMap.css'

function getDateString(date) {
  return date.toISOString().split('T')[0]
}

function getDayOfWeek(date) {
  return date.getDay()
}

function generateLast12Weeks() {
  const days = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const todayDayOfWeek = getDayOfWeek(today)
  const endOfWeek = new Date(today)
  endOfWeek.setDate(today.getDate() + (6 - todayDayOfWeek))
  
  const startDate = new Date(endOfWeek)
  startDate.setDate(endOfWeek.getDate() - 83)
  
  for (let i = 0; i < 84; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    days.push({
      date: getDateString(date),
      dayOfWeek: getDayOfWeek(date),
      isFuture: date > today
    })
  }
  
  return days
}

function getLevel(count) {
  if (count === 0) return 0
  if (count === 1) return 1
  if (count === 2) return 2
  if (count <= 4) return 3
  return 4
}

export function HeatMap({ history = {} }) {
  const days = useMemo(() => generateLast12Weeks(), [])
  
  const weekLabels = ['日', '一', '二', '三', '四', '五', '六']
  
  return (
    <div className="heatmap-container">
      <div className="heatmap-wrapper">
        <div className="heatmap-labels">
          {weekLabels.map((label, i) => (
            <span key={i} className="heatmap-label">{i % 2 === 0 ? label : ''}</span>
          ))}
        </div>
        <div className="heatmap-grid">
          {days.map((day, i) => {
            const count = history[day.date] || 0
            const level = day.isFuture ? -1 : getLevel(count)
            return (
              <div
                key={i}
                className="heatmap-cell"
                data-level={level}
                title={day.isFuture ? '' : `${day.date}: ${count} 个番茄钟`}
              />
            )
          })}
        </div>
      </div>
      <div className="heatmap-legend">
        <span>少</span>
        <div className="heatmap-cell" data-level="0" />
        <div className="heatmap-cell" data-level="1" />
        <div className="heatmap-cell" data-level="2" />
        <div className="heatmap-cell" data-level="3" />
        <div className="heatmap-cell" data-level="4" />
        <span>多</span>
      </div>
    </div>
  )
}
