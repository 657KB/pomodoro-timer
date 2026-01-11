import { useEffect, useRef, useCallback } from 'react'

export function useWakeLock(enabled) {
  const wakeLockRef = useRef(null)

  const requestWakeLock = useCallback(async () => {
    if (!('wakeLock' in navigator)) {
      return
    }

    try {
      wakeLockRef.current = await navigator.wakeLock.request('screen')
      wakeLockRef.current.addEventListener('release', () => {
        wakeLockRef.current = null
      })
    } catch { /* Wake lock request can fail silently */ }
  }, [])

  const releaseWakeLock = useCallback(async () => {
    if (wakeLockRef.current) {
      try {
        await wakeLockRef.current.release()
        wakeLockRef.current = null
      } catch { /* Release can fail silently */ }
    }
  }, [])

  useEffect(() => {
    if (enabled) {
      requestWakeLock()
    } else {
      releaseWakeLock()
    }

    return () => {
      releaseWakeLock()
    }
  }, [enabled, requestWakeLock, releaseWakeLock])

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (enabled && document.visibilityState === 'visible') {
        requestWakeLock()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [enabled, requestWakeLock])
}
