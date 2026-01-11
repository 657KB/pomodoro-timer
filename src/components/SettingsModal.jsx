import { useState, useEffect, useId, useCallback } from 'react'
import { useI18n } from '../hooks/useI18n.js'
import './SettingsModal.css'

function DurationInput({ id, label, value, onChange, max = 60, unit }) {
  function handleChange(e) {
    const raw = e.target.value
    if (raw === '') {
      onChange('')
      return
    }
    const numValue = Math.max(1, Math.min(max, parseInt(raw) || 1))
    onChange(numValue)
  }

  return (
    <div className="settings-group">
      <label className="settings-label" htmlFor={id}>{label}</label>
      <div className="settings-input-wrapper">
        <input
          id={id}
          type="number"
          min="1"
          max={max}
          value={value}
          onChange={handleChange}
          className="settings-input"
        />
        <span className="settings-unit">{unit}</span>
      </div>
    </div>
  )
}

function SettingsContent({ settings, onSave, onClose, defaultSettings }) {
  const { t, locale, changeLocale, supportedLocales } = useI18n()
  const [localSettings, setLocalSettings] = useState(settings)
  const [visible, setVisible] = useState(false)
  const formId = useId()

  const handleClose = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 250)
  }, [onClose])

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    
    function handleKeyDown(e) {
      if (e.key === 'Escape') handleClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleClose])

  const hasEmptyValue = localSettings.workDuration === '' || 
    localSettings.shortBreakDuration === '' || 
    localSettings.longBreakDuration === ''

  function handleSave() {
    if (hasEmptyValue) return
    setVisible(false)
    setTimeout(() => {
      onSave(localSettings)
      onClose()
    }, 250)
  }

  function updateField(field, value) {
    setLocalSettings(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div 
      className={`modal-overlay${visible ? ' visible' : ''}`} 
      onClick={handleClose}
    >
      <div className="modal settings-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t('settings.title')}</h2>
          <button className="modal-close" onClick={handleClose}>×</button>
        </div>
        
        <div className="settings-content">
          <div className="settings-group">
            <label className="settings-label">{t('settings.language')}</label>
            <div className="settings-language-buttons">
              {supportedLocales.map(loc => (
                <button
                  key={loc}
                  className={`lang-btn${locale === loc ? ' active' : ''}`}
                  onClick={() => changeLocale(loc)}
                >
                  {t(`languages.${loc}`)}
                </button>
              ))}
            </div>
          </div>

          <div className="settings-divider" />

          <DurationInput
            id={`${formId}-work`}
            label={t('settings.workDuration')}
            value={localSettings.workDuration}
            onChange={v => updateField('workDuration', v)}
            max={120}
            unit={t('settings.minutes')}
          />

          <DurationInput
            id={`${formId}-short`}
            label={t('settings.shortBreakDuration')}
            value={localSettings.shortBreakDuration}
            onChange={v => updateField('shortBreakDuration', v)}
            unit={t('settings.minutes')}
          />

          <DurationInput
            id={`${formId}-long`}
            label={t('settings.longBreakDuration')}
            value={localSettings.longBreakDuration}
            onChange={v => updateField('longBreakDuration', v)}
            unit={t('settings.minutes')}
          />
        </div>

        <div className="settings-footer">
          <button 
            className="settings-btn settings-btn-reset" 
            onClick={() => setLocalSettings(defaultSettings)}
          >
            {t('settings.reset')}
          </button>
          <div className="settings-footer-right">
            <button className="settings-btn settings-btn-cancel" onClick={handleClose}>
              {t('settings.cancel')}
            </button>
            <button 
              className="settings-btn settings-btn-save" 
              onClick={handleSave}
              disabled={hasEmptyValue}
            >
              {t('settings.save')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SettingsModal({ isOpen, onClose, settings, onSave, defaultSettings }) {
  if (!isOpen) return null
  
  return (
    <SettingsContent
      key={JSON.stringify(settings)}
      settings={settings}
      onSave={onSave}
      onClose={onClose}
      defaultSettings={defaultSettings}
    />
  )
}
