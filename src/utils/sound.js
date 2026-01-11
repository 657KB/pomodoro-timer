export function playNotificationSound() {
  const audio = new Audio('/finished.wav')
  audio.play().catch(err => console.warn('Failed to play sound:', err))
}
