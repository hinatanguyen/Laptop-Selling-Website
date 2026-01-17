// Admin notification sound - simple beep tone
export const notificationSound = () => {
  // Create AudioContext for better browser support
  const audioContext = new (window.AudioContext || window.webkitAudioContext)()
  
  // Create a simple beep sound
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  // Set sound properties - pleasant notification tone
  oscillator.type = 'sine'
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime) // High pitch
  oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1) // Sweep down
  
  // Volume envelope
  gainNode.gain.setValueAtTime(0, audioContext.currentTime)
  gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3)
  
  // Play the sound
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + 0.3)
  
  // Cleanup
  setTimeout(() => {
    audioContext.close()
  }, 500)
}