import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { notificationSound } from '../utils/notificationSound'

const useGlobalAdminNotifications = () => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const { user, isAdmin } = useAuth()

  // Notification sound with fallback
  const playNotificationSound = () => {
    try {
      // Try the generated sound first
      notificationSound()
    } catch (error) {
      console.log('Generated sound failed, trying fallback:', error)
      
      // Fallback to system beep
      try {
        // Create a simple beep with different approach
        const audio = new Audio()
        audio.src = "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBAAAAABAAEAESsAABEsAAABAAgAZGF0YQ4AAACE"
        audio.volume = 0.5
        audio.play().catch(() => {
          // If all fails, at least vibrate on mobile
          if ('vibrate' in navigator) {
            navigator.vibrate([200, 100, 200])
          }
        })
      } catch (fallbackError) {
        console.log('All audio playback failed:', fallbackError)
        // Vibrate as last resort
        if ('vibrate' in navigator) {
          navigator.vibrate([200, 100, 200])
        }
      }
    }
  }

  useEffect(() => {
    if (!isAdmin || !user) {
      // Cleanup existing connection if user is not admin
      if (socket) {
        socket.close()
        setSocket(null)
        setIsConnected(false)
      }
      return
    }

    console.log('🔔 Initializing global admin notifications for:', user.full_name)

    // Initialize socket connection
    const newSocket = io(import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000', {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    })

    newSocket.on('connect', () => {
      console.log('🔌 Admin notifications connected')
      setIsConnected(true)
      
      // Identify as admin
      newSocket.emit('admin-connect', { 
        role: user.role, 
        userId: user.id,
        name: user.full_name 
      })
    })

    newSocket.on('disconnect', () => {
      console.log('❌ Admin notifications disconnected')
      setIsConnected(false)
    })

    // Listen for new order notifications
    newSocket.on('new-order', (notification) => {
      console.log('📦 New order notification received:', notification)
      
      // Play sound immediately
      playNotificationSound()
      
      // Show toast notification
      toast.success(
        `🎉 New Order Received!\nOrder #${notification.data.id}\nCustomer: ${notification.data.customer_name}\nTotal: $${notification.data.total_amount}`,
        { 
          duration: 6000,
          style: {
            whiteSpace: 'pre-line',
            background: '#10B981',
            color: 'white',
            minWidth: '300px'
          },
          position: 'top-right'
        }
      )

      // Browser notification (works even when tab is in background)
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          const browserNotification = new Notification('New Order Received! 🎉', {
            body: `Order #${notification.data.id} from ${notification.data.customer_name}\nTotal: $${notification.data.total_amount}`,
            icon: '/favicon.ico',
            badge: '/favicon.ico',
            tag: 'new-order',
            requireInteraction: true, // Keep notification until user interacts
            silent: false // Allow sound
          })

          // Auto-close after 10 seconds
          setTimeout(() => {
            browserNotification.close()
          }, 10000)

          // Handle click to go to admin orders
          browserNotification.onclick = () => {
            window.focus()
            window.location.href = '/admin/orders'
            browserNotification.close()
          }
        }
      }
    })

    // Listen for order status changes
    newSocket.on('order-status-change', (notification) => {
      toast.info(
        `Order #${notification.data?.id} status: ${notification.data?.status}`,
        { duration: 4000 }
      )
    })

    setSocket(newSocket)

    return () => {
      newSocket.close()
    }
  }, [user, isAdmin])

  // Request notification permission on mount
  useEffect(() => {
    if (!isAdmin) return

    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        console.log('🔔 Notification permission:', permission)
        if (permission === 'granted') {
          // Test notification
          new Notification('Admin Notifications Enabled! ✅', {
            body: 'You will now receive new order notifications everywhere',
            icon: '/favicon.ico'
          })
        }
      })
    }
  }, [isAdmin])

  return {
    socket,
    isConnected,
    playNotificationSound
  }
}

export default useGlobalAdminNotifications