export function playNotificationSound() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  const gainNode = audioCtx.createGain()
  gainNode.connect(audioCtx.destination)
  gainNode.gain.value = 0.3

  const oscillator1 = audioCtx.createOscillator()
  oscillator1.connect(gainNode)
  oscillator1.frequency.value = 880
  oscillator1.type = 'sine'
  oscillator1.start()
  oscillator1.stop(audioCtx.currentTime + 0.15)

  setTimeout(() => {
    const oscillator2 = audioCtx.createOscillator()
    oscillator2.connect(gainNode)
    oscillator2.frequency.value = 1100
    oscillator2.type = 'sine'
    oscillator2.start()
    oscillator2.stop(audioCtx.currentTime + 0.15)
  }, 150)
}
