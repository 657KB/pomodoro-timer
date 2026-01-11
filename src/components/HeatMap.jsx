import { useMemo, useRef, useState, useEffect, useCallback } from 'react'
import { useI18n } from '../hooks/useI18n.js'
import './HeatMap.css'

function getDateString(date) {
  return date.toISOString().split('T')[0]
}

function getDayOfWeek(date) {
  return date.getDay()
}

function generateLastYear() {
  const days = []
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const todayDayOfWeek = getDayOfWeek(today)
  const endOfWeek = new Date(today)
  endOfWeek.setDate(today.getDate() + (6 - todayDayOfWeek))
  
  const totalWeeks = 53
  const totalDays = totalWeeks * 7
  
  const startDate = new Date(endOfWeek)
  startDate.setDate(endOfWeek.getDate() - totalDays + 1)
  
  for (let i = 0; i < totalDays; i++) {
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
  const { t } = useI18n()
  const days = useMemo(() => generateLastYear(), [])
  const wrapperRef = useRef(null)
  const [showLeftMask, setShowLeftMask] = useState(false)
  const [showRightMask, setShowRightMask] = useState(false)

  const updateMasks = useCallback(() => {
    const el = wrapperRef.current
    if (!el) return
    
    const { scrollLeft, scrollWidth, clientWidth } = el
    const threshold = 5
    
    setShowLeftMask(scrollLeft > threshold)
    setShowRightMask(scrollLeft < scrollWidth - clientWidth - threshold)
  }, [])

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    updateMasks()
    
    el.addEventListener('scroll', updateMasks, { passive: true })
    window.addEventListener('resize', updateMasks)
    
    return () => {
      el.removeEventListener('scroll', updateMasks)
      window.removeEventListener('resize', updateMasks)
    }
  }, [updateMasks])
  
  return (
    <div className="heatmap-container">
      <div className="heatmap-scroll-area">
        {showLeftMask && <div className="heatmap-mask heatmap-mask-left" />}
        <div className="heatmap-wrapper" ref={wrapperRef}>
          <div className="heatmap-grid">
            {days.map((day, i) => {
              const count = history[day.date] || 0
              const level = day.isFuture ? -1 : getLevel(count)
              return (
                <div
                  key={i}
                  className="heatmap-cell"
                  data-level={level}
                  title={day.isFuture ? '' : `${day.date}: ${count} ${t('history.pomodoros')}`}
                />
              )
            })}
          </div>
        </div>
        {showRightMask && <div className="heatmap-mask heatmap-mask-right" />}
      </div>
      <div className="heatmap-legend">
        <div className="heatmap-cell" data-level="0" />
        <div className="heatmap-cell" data-level="1" />
        <div className="heatmap-cell" data-level="2" />
        <div className="heatmap-cell" data-level="3" />
        <div className="heatmap-cell" data-level="4" />
      </div>
    </div>
  )
}
