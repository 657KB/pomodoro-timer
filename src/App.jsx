import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor, Calendar, Settings } from 'lucide-react'
import { Timer } from './components/Timer'
import { HeatMap } from './components/HeatMap'
import { SettingsModal } from './components/SettingsModal'
import { usePomodoro } from './hooks/usePomodoro'
import { useTheme } from './hooks/useTheme'
import { useSettings } from './hooks/useSettings'
import { useRunningBackground } from './hooks/useRunningBackground'
import { useI18n } from './hooks/useI18n.js'
import { playNotificationSound } from './utils/sound'
import './App.css'

function App() {
  const { t } = useI18n()
  const { history, recordPomodoro } = usePomodoro()
  const { theme, toggle } = useTheme()
  const { settings, updateSettings, durationsInSeconds, DEFAULT_SETTINGS } = useSettings()
  const updateTimerState = useRunningBackground()
  
  const [showHistory, setShowHistory] = useState(false)
  const [historyVisible, setHistoryVisible] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    if (showHistory) {
      requestAnimationFrame(() => setHistoryVisible(true))
    }
  }, [showHistory])

  function closeHistory() {
    setHistoryVisible(false)
    setTimeout(() => setShowHistory(false), 250)
  }

  function handleWorkComplete() {
    playNotificationSound()
    recordPomodoro()
  }

  function handleBreakComplete() {
    playNotificationSound()
  }

  function getThemeIcon() {
    if (theme === 'light') return <Sun size={20} />
    if (theme === 'dark') return <Moon size={20} />
    return <Monitor size={20} />
  }

  function getThemeLabel() {
    if (theme === 'light') return t('theme.light')
    if (theme === 'dark') return t('theme.dark')
    return t('theme.system')
  }
  
  return (
    <div className="app">
      <div className="top-actions">
        <button 
          className="action-btn" 
          onClick={() => setShowHistory(true)}
          aria-label={t('history.viewHistory')}
        >
          <Calendar size={20} />
        </button>
        <button 
          className="action-btn" 
          onClick={toggle}
          title={`${t('theme.currentTheme')}: ${getThemeLabel()}`}
          aria-label={t('theme.currentTheme')}
        >
          {getThemeIcon()}
        </button>
        <button 
          className="action-btn" 
          onClick={() => setShowSettings(true)}
          aria-label={t('settings.title')}
        >
          <Settings size={20} />
        </button>
      </div>

      <main className="main-content">
        <Timer 
          onWorkComplete={handleWorkComplete}
          onBreakComplete={handleBreakComplete}
          onStateChange={updateTimerState}
          durations={durationsInSeconds}
        />
      </main>

      {showHistory && (
        <div className={`modal-overlay${historyVisible ? ' visible' : ''}`} onClick={closeHistory}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t('history.title')}</h2>
              <button className="modal-close" onClick={closeHistory}>
                ×
              </button>
            </div>
            <HeatMap history={history} />
          </div>
        </div>
      )}

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onSave={updateSettings}
        defaultSettings={DEFAULT_SETTINGS}
      />
    </div>
  )
}

export default App
